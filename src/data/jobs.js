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
    description: [
      'KJB Solutions is seeking an experienced Program Manager to lead federal IT contracts at the Department of Veterans Affairs and across the civilian agency landscape. You will own end-to-end program delivery — from contract kickoff through closeout — ensuring scope, schedule, and budget integrity while building lasting relationships with government clients.',
    ],
    responsibilities: [
      'Lead program delivery across active VA and federal IT contracts',
      'Manage scope, schedule, budget, and risk across multiple concurrent work streams',
      'Serve as primary point of contact for contracting officer representatives (CORs) and program officers',
      'Build and maintain detailed project plans, status reports, and deliverable tracking',
      'Coordinate across internal technical teams, subcontractors, and government stakeholders',
      'Support business development including proposal writing and technical solutioning',
    ],
    qualifications: {
      required: [
        '5+ years federal IT program management experience',
        'Proven record managing VA or DoD programs end-to-end',
        'PMP certification or equivalent credential',
        'Experience with FAR/DFARS contract management',
        'U.S. citizenship required; clearance eligibility required',
      ],
      preferred: [
        'Active Secret or higher security clearance',
        'VA program experience (VBA, VHA, or NCA)',
        'Agile / SAFe program management experience',
        'Veteran status — KJB is committed to veteran-first hiring',
      ],
    },
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
    description: [
      'KJB Solutions is hiring a Software Developer to build and maintain mission-critical health IT systems at the Department of Veterans Affairs. You will contribute across the full software development lifecycle — from requirements and design through coding, testing, and production support — on systems that directly impact veteran care delivery.',
    ],
    responsibilities: [
      'Design, develop, test, and deploy software solutions for VA health IT systems',
      'Support integration with VistA, CPRS, and other VA enterprise platforms',
      'Participate in Agile ceremonies: sprint planning, standups, retrospectives, and demos',
      'Write clean, maintainable code following VA security and coding standards',
      'Contribute to code reviews, technical documentation, and system design discussions',
      'Troubleshoot production issues and implement root-cause fixes',
    ],
    qualifications: {
      required: [
        '3+ years software development experience in federal health systems',
        'Full SDLC experience from design through production operations',
        'Proficiency in at least one: Java, Python, JavaScript, or .NET',
        'Experience with secure coding practices and federal security standards',
        'Ability to obtain federal public trust clearance',
      ],
      preferred: [
        'VistA, HL7, or FHIR development experience',
        'Familiarity with VA DevSecOps pipeline (GitHub, Jenkins, SonarQube)',
        'Active clearance at Public Trust or higher',
        'Veteran status — KJB is committed to veteran-first hiring',
      ],
    },
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
    description: [
      'KJB Solutions is seeking a DevSecOps Engineer to design, build, and operate secure CI/CD pipelines for federal IT programs. You will embed security throughout the software delivery pipeline — from code commit to production deployment — ensuring our VA and federal clients meet ATO requirements without sacrificing deployment velocity.',
    ],
    responsibilities: [
      'Design and manage CI/CD pipelines for federal IT delivery teams',
      'Implement and maintain FIPS 140-2 compliant security controls in the pipeline',
      'Support NIST RMF processes including ATO documentation and continuous monitoring',
      'Automate security scanning, compliance checks, and vulnerability remediation',
      'Operate and maintain infrastructure across cloud and on-prem environments',
      'Partner with development teams to embed security practices from the start',
      'Maintain security documentation required for federal audits and assessments',
    ],
    qualifications: {
      required: [
        'Hands-on CI/CD pipeline design and management (Jenkins, GitLab CI, GitHub Actions)',
        'FIPS 140-2 and federal security compliance experience',
        'Working knowledge of NIST RMF or federal ATO processes',
        'Experience with container orchestration (Kubernetes, Docker)',
        'U.S. citizenship required; clearance eligibility required',
      ],
      preferred: [
        'Active Secret or TS/SCI clearance',
        'FedRAMP authorization experience',
        'Security certifications: CISSP, Security+, or equivalent',
        'Experience with VA or DoD cloud environments (AWS GovCloud, Azure Government)',
        'Veteran status — KJB is committed to veteran-first hiring',
      ],
    },
  },
  {
    id: 'senior-technical-analyst-hl7',
    title: 'Senior Technical Analyst — HL7 Integrations',
    dept: 'Software Development',
    location: 'Remote',
    type: 'Full-Time',
    compensation: '$120,000 – $140,000 / year',
    reqs: [
      '7–10+ years as a Technical/Systems Analyst in healthcare IT',
      'Deep HL7 v2.x mastery (ADT, ORM, ORU, DFT, SIU)',
      'Strong FHIR and VistA / Oracle Health Cerner knowledge',
      'Interface engine ownership (Rhapsody, Mirth, Cloverleaf, Ensemble)',
    ],
    companyIntro: 'KJB Solutions LLC is a Virginia-based technology and professional services firm that supports federal health IT modernization, including mission-critical systems for the U.S. Department of Veterans Affairs. Our engineers, architects, and analysts design, build, and sustain the secure, high-availability systems that exchange health, benefits, and administrative data across government and partner systems. We are a focused team of experienced technologists who value technical depth, ownership, and meaningful impact on systems that serve Veterans every day. We offer a fully remote work environment, competitive compensation, and a comprehensive benefits package built to support our people and their families.',
    positionSummary: 'We are seeking a Senior Technical Analyst with deep HL7 and healthcare systems integration expertise to support the U.S. Department of Veterans Affairs. This role will serve as the senior technical authority on a team responsible for designing, architecting, testing, and supporting complex interfaces between VA clinical and administrative systems, ensuring reliable, secure, and compliant data exchange across the VA health IT enterprise (including VistA, Cerner Millennium / Oracle Health, and related interface engines). The ideal candidate operates with minimal supervision, leads integration design decisions, mentors junior and mid-level analysts, and is comfortable serving as a trusted technical point of contact with VA clinical stakeholders and program leadership.',
    responsibilities: [
      'Lead the analysis, design, architecture, build, testing, and maintenance of HL7 (v2.x and/or FHIR) interfaces between VA clinical / administrative systems and internal or external partner systems, with minimal oversight.',
      'Serve as the primary technical liaison between clinical stakeholders, business analysts, and development teams, translating complex functional and interoperability requirements into robust interface specifications and architecture decisions.',
      'Mentor and provide technical guidance to junior and mid-level analysts, and review their interface designs, code, and documentation for quality and standards compliance.',
      'Lead technical design reviews and provide subject-matter expertise during proposal support, sprint planning, and architecture discussions with VA and program stakeholders.',
      'Configure, monitor, and troubleshoot interface engines (e.g. Rhapsody, Cloverleaf, Mirth, Ensemble, or VA-specific middleware) to ensure accurate, timely message routing and transformation.',
      'Own root-cause analysis of the most complex interface failures, data discrepancies, and message errors; drive corrective and preventive actions within defined service levels; serve as the escalation point for critical incidents.',
      'Support integration testing — unit, system, interface, and end-to-end — in coordination with VA test environments and release schedules.',
      'Document interface specifications, data mapping, message formats, system architecture diagrams, and standard operating procedures (SOPs).',
      'Ensure all integration work complies with VA information security requirements, HIPAA, and applicable federal health data standards (e.g. HL7, FHIR, C-CDA, X12).',
      'Participate in change management, configuration management, and release processes per VA and program governance requirements.',
      'Support Section 508 compliance and VA Technical Reference Model (TRM) standards where applicable.',
      'Provide status reporting, risk identification, and technical input to Program Management for program deliverables.',
      'Provide on-call or after-hours support for critical interface issues as required.',
    ],
    qualifications: {
      required: [
        "Bachelor's degree in Computer Science, Health Informatics, Information Systems, or a related field.",
        'Minimum 7–10+ years of progressive experience as a technical, systems, or interface analyst supporting healthcare IT integrations, including experience leading integration efforts on complex, multi-system projects.',
        'Demonstrated deep fluency and hands-on mastery of HL7 v2.x messaging (ADT, ORM, ORU, SIU, DFT, and similar), and strong working knowledge of HL7 FHIR.',
        'Extensive hands-on experience with one or more interface engines or integration platforms (e.g. Rhapsody, Cloverleaf, Mirth Connect, Ensemble / InterSystems, BizTalk), including architecture and configuration ownership.',
        'Strong working knowledge of healthcare data standards such as C-CDA, X12 (EDI), DICOM, or LOINC / SNOMED / ICD-10 code sets.',
        'Advanced experience with SQL and relational databases for data validation, extraction, performance troubleshooting, and root-cause analysis.',
        'Direct experience with VA systems (VistA, CPRS, Oracle Health / Cerner Millennium) or comparable large-scale federal / EHR environments is strongly preferred.',
        'Demonstrated ability to lead technical work streams, mentor junior and mid-level staff, and operate independently with minimal supervision.',
        'Strong understanding of SDLC, Agile / Scrum methodologies, and integration testing practices.',
        'Excellent written and verbal communication skills, with the ability to lead technical discussions with senior stakeholders.',
        'U.S. Citizenship is required.',
        'Ability to obtain and maintain a Public Trust or higher background investigation.',
      ],
      preferred: [
        'Prior direct experience on a VA, DoD, or other federal health IT contract, ideally in a lead or senior analyst capacity.',
        'Experience supporting proposal efforts, technical writing for deliverables, or acting as a technical lead on a federal task order.',
        'Experience with VA interoperability initiatives (e.g. VA/DoD data sharing, the Joint Health Information Exchange, or VistA Exchange).',
        'HL7 or FHIR certification (e.g. the HL7 FHIR Proficiency Certificate) or a relevant health IT certification such as CPHIMS or CAHIMS.',
        'Experience with ITIL-based service management (incident, problem, and change management) in a federal environment.',
        'Familiarity with cloud-hosted integration environments such as AWS GovCloud or Azure Government.',
        'Active or previously held federal government clearance or investigation (e.g. Public Trust, MBI, or NACI).',
      ],
    },
    benefits: [
      'Company-paid medical, dental, and vision insurance',
      '401(k) retirement plan with 5% company match, eligible immediately',
      '160 hours of Flexible Time Off (FTO) per year',
      '88 hours (11 days) of paid federal holidays per year',
      'Company-provided short-term and long-term disability coverage',
      'Reimbursement for pre-approved, work-related travel',
      '100% remote work environment',
    ],
    applyUrl: 'https://jobs.gusto.com/postings/kjb-solutions-llc-senior-technical-analyst-hl7-integrations-fluency-ba7743a0-ddb5-494d-b3d5-55e6e75ed781/applicants/new',
  },
]

export function getJobById(id) {
  return JOBS.find(j => j.id === id) ?? null
}

// Shared legal disclosures — identical across all KJB job postings
export const JOB_LEGAL = [
  {
    heading: 'Conditions of Employment',
    body: 'Employment and continued employment are contingent upon: (1) proof of identity and authorization to work in the United States; (2) successful completion of any required suitability and background investigation, including a favorable fingerprint-based check; (3) client acceptance of the candidate\'s qualifications, where required; and (4) completion of any required systems-access provisioning, including PIV credentialing and mandatory training.',
  },
  {
    heading: 'Equal Employment Opportunity',
    body: 'KJB Solutions LLC is an Equal Opportunity Employer. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability, protected veteran status, or any other characteristic protected by applicable federal, state, or local law.',
  },
  {
    heading: 'Reasonable Accommodation',
    body: 'KJB Solutions is committed to providing reasonable accommodations to qualified individuals with disabilities. If you require an accommodation to participate in the application or interview process, or to perform the essential functions of this role, please contact Human Resources.',
  },
  {
    heading: 'Disclaimer',
    body: 'This job description is intended to describe the general nature and level of work being performed. It is not intended to be an exhaustive list of all duties, responsibilities, or qualifications. Duties may change at any time with or without notice. Employment with KJB Solutions is at-will.',
  },
]
