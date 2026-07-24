export const JOBS = [
  {
    id: 'program-manager-federal-it',
    title: 'Program Manager — Federal IT',
    dept: 'Program Management',
    location: 'DC Metro / Remote',
    type: 'Full-Time',
    reqs: [
      '5+ years federal IT program management',
      'Experience with VA or DoD programs',
      'PMP or equivalent preferred',
      'Active security clearance preferred',
    ],
  },
  {
    id: 'software-developer-va-systems',
    title: 'Software Developer — VA Systems',
    dept: 'Software Development',
    location: 'Remote',
    type: 'Full-Time',
    reqs: [
      '3+ years software development in federal health systems',
      'SDLC experience (design through production ops)',
      'VistA, HL7, or FHIR experience a plus',
      'Ability to obtain clearance',
    ],
  },
  {
    id: 'devsecops-engineer',
    title: 'DevSecOps Engineer',
    dept: 'Infrastructure & Security',
    location: 'Remote / Hybrid',
    type: 'Full-Time',
    reqs: [
      'CI/CD pipeline design and management',
      'FIPS 140-2 and federal security compliance',
      'Experience with NIST RMF or ATO processes',
      'Active security clearance preferred',
    ],
  },
  {
    id: 'it-infrastructure-consultant',
    title: 'IT Infrastructure Consultant',
    dept: 'Infrastructure & Consulting',
    location: 'DC Metro / Remote',
    type: 'Full-Time',
    reqs: [
      'SOA, middleware, and enterprise integration',
      'Production operations in federal environments',
      'Network and systems administration experience',
      'Clearance eligible',
    ],
  },
]

export function getJobById(id) {
  return JOBS.find(j => j.id === id) ?? null
}
