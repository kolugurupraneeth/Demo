import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Rate limiting (in-memory, per serverless instance) ───────────────────────
// Vercel functions are stateless; this catches rapid abuse within one instance.
// For distributed enforcement, back this with Vercel KV.
const WINDOW_MS = 60_000   // 1-minute sliding window
const MAX_RPM   = 8        // max requests per IP per window
const ipLog     = new Map() // ip → timestamp[]

function checkRateLimit(ip) {
  const now        = Date.now()
  const cutoff     = now - WINDOW_MS
  const timestamps = (ipLog.get(ip) ?? []).filter(t => t > cutoff)

  if (timestamps.length >= MAX_RPM) {
    const retryAfter = Math.ceil((timestamps[0] - cutoff) / 1000)
    return { limited: true, retryAfter }
  }

  timestamps.push(now)
  ipLog.set(ip, timestamps)

  // Evict stale entries to keep memory bounded
  if (ipLog.size > 2000) {
    for (const [key, ts] of ipLog) {
      if (ts.every(t => t < cutoff)) ipLog.delete(key)
    }
  }

  return { limited: false }
}

// ─── Input limits ─────────────────────────────────────────────────────────────
const MAX_HISTORY_TURNS = 6    // last 6 messages sent to the API (3 full turns)
const MAX_MSG_CHARS     = 500  // per individual message
const MAX_TOTAL_CHARS   = 2500 // across all messages combined

const SYSTEM = `You are KJB AI, the intelligent assistant for KJB Solutions — a veteran-owned IT consulting firm serving the federal government.

## About KJB Solutions
KJB Solutions is a Service-Disabled Veteran-Owned Small Business (SDVOSB) delivering mission-critical technology solutions to federal agencies. Our primary client is the Department of Veterans Affairs (VA), and we are deeply committed to serving those who served.

## Core Services

**Program Management**
Certified program managers who plan, execute, and oversee complex IT programs for federal agencies. We deliver on time, on budget, and in scope — applying Agile, PMI, and federal acquisition best practices.

**Software Development**
Custom application development, legacy system modernization, and cloud-native solutions for federal agencies. We build secure, scalable software that meets stringent government standards including FedRAMP and FISMA.

**Infrastructure & Consulting**
IT infrastructure design, cloud migration, cybersecurity hardening, network solutions, and strategic technology consulting. We help agencies move faster, safer, and smarter.

## Key Facts
- Founded by veterans, mission-driven from day one
- Primary client: Department of Veterans Affairs (VA)
- SDVOSB (Service-Disabled Veteran-Owned Small Business) certification
- Based in the DC/Northern Virginia area
- Contact: 571-277-3586
- Email: kbjsolutions@kjbsolution.com
- Social: LinkedIn, Facebook, Twitter, Instagram (@kjb.solutions)
- Website: kjbsolution.com

## Tone & Behavior
- Professional, authoritative, warm, and mission-driven
- Answer questions about KJB Solutions' services, capabilities, history, career opportunities, and contact information
- For technical questions about a specific engagement or contract, invite them to reach out directly
- Keep responses concise (2–4 sentences max unless a list is clearly needed)
- Use **bold** for key terms
- Do not fabricate specific contract numbers, employee counts, or revenue figures
- If asked something outside KJB's scope, acknowledge it and redirect to contacting the team`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limit by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown'
  const { limited, retryAfter } = checkRateLimit(ip)
  if (limited) {
    res.setHeader('Retry-After', retryAfter)
    return res.status(429).json({
      error: `Too many requests. Please wait ${retryAfter} seconds and try again.`,
    })
  }

  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' })
  }

  // Sanitize and cap history
  const sanitized = messages
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }))
    .slice(-MAX_HISTORY_TURNS)

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Last message must be from user' })
  }

  const totalChars = sanitized.reduce((sum, m) => sum + m.content.length, 0)
  if (totalChars > MAX_TOTAL_CHARS) {
    return res.status(400).json({ error: 'Message history too long' })
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: SYSTEM,
      messages: sanitized,
    })

    const content = response.content[0]?.text ?? ''
    return res.status(200).json({ content })
  } catch (err) {
    console.error('chat error:', err)
    return res.status(500).json({ error: 'Failed to get AI response. Please try again.' })
  }
}
