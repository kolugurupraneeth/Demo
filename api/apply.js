import { Resend } from 'resend'
import { put } from '@vercel/blob'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    jobId, jobTitle,
    name, email, phone, linkedin,
    yearsExp, clearance, usCitizen, veteranStatus,
    coverLetter,
    resumeBase64, resumeName, resumeType,
  } = req.body ?? {}

  if (!name || !email || !phone || !jobId || !resumeBase64 || !resumeName) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const resumeBuffer = Buffer.from(resumeBase64, 'base64')

    // Upload resume file to Vercel Blob
    const safeFilename = resumeName.replace(/[^a-zA-Z0-9._-]/g, '_')
    const timestamp = Date.now()
    const resumeBlob = await put(
      `resumes/${jobId}/${timestamp}-${safeFilename}`,
      resumeBuffer,
      { access: 'public', contentType: resumeType },
    )

    // Store application record as JSON in Vercel Blob
    const application = {
      id: `${timestamp}-${jobId}`,
      jobId,
      jobTitle,
      submittedAt: new Date().toISOString(),
      candidate: { name, email, phone, linkedin, yearsExp, clearance, usCitizen, veteranStatus },
      coverLetter: coverLetter || '',
      resumeUrl: resumeBlob.url,
      resumeName,
    }

    await put(
      `applications/${timestamp}-${jobId}.json`,
      JSON.stringify(application, null, 2),
      { access: 'public', contentType: 'application/json' },
    )

    // Send email notification via Resend
    await resend.emails.send({
      from: 'KJB Careers <onboarding@resend.dev>',
      to: 'kbjsolutions@kjbsolution.com',
      replyTo: email,
      subject: `New Application: ${jobTitle} — ${name}`,
      html: buildEmailHtml(application),
      attachments: [{ filename: resumeName, content: resumeBuffer }],
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('apply error:', err)
    return res.status(500).json({ error: 'Failed to submit application. Please try again.' })
  }
}

function buildEmailHtml({ jobTitle, submittedAt, candidate, coverLetter, resumeUrl, resumeName }) {
  const { name, email, phone, linkedin, yearsExp, clearance, usCitizen, veteranStatus } = candidate
  const submitted = new Date(submittedAt).toLocaleString('en-US', { timeZoneName: 'short' })

  const row = (label, value) => value
    ? `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#002a5c;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#475276;">${value}</td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f6f8;font-family:'Open Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e7ef;">
        <!-- Header -->
        <tr><td style="background:#002a5c;padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#961f21;">New Application</p>
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-.02em;">${jobTitle}</h1>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.55);">Submitted ${submitted}</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#002a5c;border-bottom:1px solid #e4e7ef;padding-bottom:10px;">Candidate Information</h2>
          <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
            ${row('Name', name)}
            ${row('Email', `<a href="mailto:${email}" style="color:#961f21;">${email}</a>`)}
            ${row('Phone', phone)}
            ${linkedin ? row('LinkedIn', `<a href="${linkedin}" style="color:#961f21;">${linkedin}</a>`) : ''}
            ${row('Experience', yearsExp)}
            ${row('Clearance', clearance)}
            ${row('Work Auth.', usCitizen)}
            ${row('Veteran Status', veteranStatus)}
          </table>
          ${coverLetter ? `
          <h2 style="margin:24px 0 12px;font-size:15px;font-weight:700;color:#002a5c;border-bottom:1px solid #e4e7ef;padding-bottom:10px;">Cover Letter</h2>
          <p style="font-size:14px;color:#475276;line-height:1.72;margin:0;white-space:pre-wrap;">${escapeHtml(coverLetter)}</p>` : ''}
          <h2 style="margin:24px 0 12px;font-size:15px;font-weight:700;color:#002a5c;border-bottom:1px solid #e4e7ef;padding-bottom:10px;">Resume</h2>
          <p style="font-size:14px;color:#475276;margin:0;">
            Attached as <strong>${resumeName}</strong> — also available at:<br>
            <a href="${resumeUrl}" style="color:#961f21;word-break:break-all;">${resumeUrl}</a>
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f5f6f8;padding:16px 32px;border-top:1px solid #e4e7ef;">
          <p style="margin:0;font-size:12px;color:#8890aa;">This email was sent automatically from the KJB Solutions careers portal.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
