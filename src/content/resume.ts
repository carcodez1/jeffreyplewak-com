/**
 * src/content/resume.ts
 *
 * SINGLE SOURCE OF TRUTH — Jeffrey R. Plewak
 * Last updated: 2026-03-02
 *
 * DATE CONFIDENCE KEY:
 *   // [CONFIRMED] — stated directly by Jeffrey or present on original PDF
 *   // [BEST-GUESS] — approximated from confirmed anchors; correct if you have records
 *
 * BEST-GUESS ASSUMPTIONS (keep for your own records):
 *   Fidelity 1 end    2016-10  → ~1.5 yr stint before leaving for Raytheon
 *   Raytheon start    2016-11  → month after Fidelity 1 ended
 *   Raytheon end      2017-09  → ~10-month FTE stint
 *   Fidelity 2 start  2017-10  → returned month after Raytheon ended
 *   Fidelity 2 end    2018-04  → ~6 months; ended before joining LM Fort Worth
 *   LM FW start       2018-05  → month after Fidelity 2 ended; LM FW end 2018-12 confirmed
 *
 * TODO before first deploy:
 *   - Replace all logo src "TODO_..." with real paths under /public/assets/logos/
 *   - Confirm or correct all [BEST-GUESS] dates using W2s or LinkedIn
 *   - Confirm pdfHref path once PDF is in /public
 *   - Add Raytheon highlights (currently sparse — ATS flags thin role entries)
 *   - Fill in MyGeo LLC employerUrl
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkType = "FTE" | "Contract" | "Consulting" | "Owner";

export type ResumeRole = {
  /** URL anchor + UI dedup key */
  id: string;
  /** One card per employerKey in ExperienceStrip */
  employerKey: string;
  employerName: string;
  employerUrl: string;
  title: string;
  workType: WorkType;
  /** "YYYY-MM" — ISO month, lexicographically sortable */
  start: string;
  /** "YYYY-MM" — omit for present role */
  end?: string;
  location: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
  highlights: readonly string[];
  technologies?: readonly string[];
};

export type ResumeData = {
  pdfHref: string;
  summary: string;
  roles: readonly ResumeRole[];
};

// ─── SSOT ─────────────────────────────────────────────────────────────────────

export const RESUME: ResumeData = {
  pdfHref: "/downloads/jeffrey-plewak-resume.pdf", // TODO: confirm path in /public

  summary:
    "Senior software engineer with 10+ years designing and operating platform systems in compliance-critical, high-reliability environments. Specialized in Python-based distributed systems, cloud automation, and audit-ready delivery across financial, defense, and cloud platforms (J.P. Morgan Chase, Lockheed Martin, IBM). Focus on production correctness, observability, and trusted compliant AI workflows where traceability, security, and reliability are first-class requirements.",

  roles: [

    // ─────────────────────────────────────────────────────────────────────────
    // MSTRO / Think Systems
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "mstro-think-systems",
      employerKey: "mstro-think-systems",
      employerName: "MSTRO / Think Systems",
      employerUrl: "https://mstro.ai",
      title: "Senior SW R&D Lead",
      workType: "Consulting",
      start: "2024-09", // [CONFIRMED]
      end: "2025-11",   // [CONFIRMED]
      location: "Remote",
      logo: { src: "/assets/logos/mstro.png", width: 120, height: 32 },
      highlights: [
        "Led research and innovation for next-generation AI and platform capabilities, developing operational MVPs to evaluate production readiness, scalability, and compliance constraints prior to broader adoption.",
        "Evaluated and introduced LLM orchestration, vector databases, NLP pipelines, and containerized runtimes with emphasis on reproducibility, observability, and operational viability over experimental novelty.",
        "Guided architecture and implementation reviews across CI/CD, compliance, telemetry, and KPI instrumentation, supporting hardening of experimental systems for production use.",
        "Conducted technical interviews for platform engineering, CI/CD, compliance, and AI architecture roles; contributed to hiring decisions and technical standards.",
        "Designed cloud-agnostic workflows including GCP-based evaluations aligned with IAM, logging, security controls, and infrastructure-as-code parity across environments.",
      ],
      technologies: [
        "LLM orchestration", "Vector databases", "NLP", "CI/CD",
        "GCP", "IAM", "Observability", "Containerized runtimes",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MyGeo LLC
    // Sequential after JPMC: 2-month job search Dec 2023 – Feb 2024
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "mygeo-llc",
      employerKey: "mygeo-llc",
      employerName: "MyGeo LLC",
      employerUrl: "TODO_MYGEO_URL", // TODO: fill in
      title: "Python Developer / Member / Owner",
      workType: "Owner",
      start: "2024-02", // [CONFIRMED]
      end: "2024-09",   // [CONFIRMED]
      location: "West Palm Beach, FL",
      logo: { src: "/assets/logos/bae-systems.svg", width: 96, height: 32 },
      highlights: [
        "Delivered a cloud-based SEO and communications platform from concept through MVP and customer deployment, owning system architecture, implementation, and operations.",
        "Built full-stack systems using Python and Node.js with API-driven frontends, MongoDB-backed persistence, and automated ETL pipelines.",
        "Integrated AI-enabled workflows for content generation and communications use cases, emphasizing reproducibility and production stability over experimentation.",
        "Designed and delivered a real-time RTP/SIP push-to-talk system from prototype to customer deployment, including backend services, frontend integration, and architectural documentation.",
      ],
      technologies: ["Python", "Node.js", "MongoDB", "ETL", "AI workflows", "RTP", "SIP"],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // J.P. Morgan Chase
    // 4-month job search gap before this role: Mar 2022 – Jul 2022
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "jpmorgan-chase",
      employerKey: "jpmorgan-chase",
      employerName: "J.P. Morgan Chase",
      employerUrl: "https://www.jpmorganchase.com",
      title: "Senior Software Engineer",
      workType: "FTE",
      start: "2022-07", // [CONFIRMED]
      end: "2023-12",   // [CONFIRMED]
      location: "Plano, TX",
      logo: { src: "/assets/logos/jp-morgan-chase.svg", width: 120, height: 32 },
      highlights: [
        "Designed, led, and delivered cloud-native automation tools for regulated global banking environments.",
        "Reduced deployment risk by automating environment validation across staging and production under regulated change controls, improving release confidence.",
        "Served as production SRE for global banking systems on AWS and EKS under strict compliance, audit, and change-management requirements.",
        "Led development of internal microservices for firewall automation, owning service design, implementation, and platform integration.",
        "Contributed to hybrid and multi-cloud architectural evaluations across AWS, GCP, and Azure with focus on IAM, network segmentation, logging, and audit readiness.",
      ],
      technologies: [
        "Python", "AWS", "EKS", "SRE", "Microservices",
        "Firewall automation", "GCP", "Azure", "IAM", "CI/CD",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Independent Consulting — Nintendo, Raytheon, AWS, Northrop
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "consulting-multi-client",
      employerKey: "consulting-multi-client",
      employerName: "Sr. Consultant — Nintendo, Raytheon, AWS, Northrop",
      employerUrl: "",
      title: "Senior Consultant",
      workType: "Consulting",
      start: "2019-09", // [CONFIRMED]
      end: "2022-03",   // [CONFIRMED]
      location: "Remote",
      logo: { src: "/assets/logos/placeholder.svg", width: 96, height: 32 },
      highlights: [
        "Delivered backend services and ETL pipelines across engagements with Nintendo, Raytheon, AWS, and Northrop Grumman in Python, Java, and C++.",
        "Automated build pipelines, infrastructure provisioning, and AWS deployments across client environments, reducing delivery overhead.",
        "Served as senior technical point of contact for DOD software safety certification for Aviation; implemented processes and automation to improve software release cycle time.",
        "Led multi-client automation, hardening, and development activities spanning DoD contractors and AWS pipeline migrations.",
      ],
      technologies: [
        "Python", "Java", "C++", "AWS", "ETL", "CI/CD",
        "DO-178", "DoD safety certification", "Infrastructure automation",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // IBM Cloud
    // Sequential: LM FW ended 2018-12, IBM started 2019-01 [CONFIRMED]
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "ibm-cloud",
      employerKey: "ibm-cloud",
      employerName: "IBM Cloud",
      employerUrl: "https://www.ibm.com/cloud",
      title: "Senior Software Engineer",
      workType: "FTE",
      start: "2019-01", // [CONFIRMED]
      end: "2019-09",   // [CONFIRMED]
      location: "Austin, TX",
      logo: { src: "/assets/logos/ibm.svg", width: 64, height: 32 },
      highlights: [
        "Contributed to design and operation of Kubernetes-based microservices in Python and Go for IBM Cloud File and Block Storage production services with defined SLO/SLA targets.",
        "Owned CI/CD pipelines for containerized services, supporting build, deployment, and rollback workflows.",
        "Participated in on-call rotations, incident response, and root cause analysis, contributing to service stability and operational resilience.",
        "Implemented observability and reliability improvements to enhance incident detection and recovery.",
      ],
      technologies: [
        "Python", "Go", "Kubernetes", "Microservices",
        "CI/CD", "Observability", "SLO/SLA", "Incident response",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Lockheed Martin — Fort Worth (F-35 mission systems)
    // start [BEST-GUESS]: month after Fidelity 2 ended (2018-04)
    // end   [CONFIRMED]:  2018-12
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "lockheed-martin-fort-worth",
      employerKey: "lockheed-martin-fort-worth",
      employerName: "Lockheed Martin",
      employerUrl: "https://www.lockheedmartin.com",
      title: "Senior Software Engineer",
      workType: "FTE",
      start: "2018-05", // [BEST-GUESS]
      end: "2018-12",   // [CONFIRMED]
      location: "Fort Worth, TX",
      logo: { src: "/assets/logos/lockheed-martin.svg", width: 140, height: 32 },
      highlights: [
        "Developed real-time C++ avionics software for F-35 mission systems, supporting pilot-facing tactical displays in safety-critical, certification-aware environments.",
        "Led automation of build, test, and instrumentation pipelines improving DO-178 A/B compliance efficiency, reducing manual certification effort by approximately 20 hours per week.",
        "Established full statement and branch coverage with traceable artifacts via LDRA-based analysis and toolchain integration.",
        "Strengthened certification workflows across mixed-language environments (C++, Python, Perl, shell), increasing consistency and reliability across releases.",
      ],
      technologies: [
        "C++", "Python", "Perl", "DO-178 A/B", "LDRA",
        "F-35", "Safety-critical systems", "CI/CD", "Compliance automation",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Fidelity Investments — 2nd stint
    // start [BEST-GUESS]: month after Raytheon ended (2017-09)
    // end   [BEST-GUESS]: ~6 months before LM FW start
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "fidelity-investments-2",
      employerKey: "fidelity-investments-2",
      employerName: "Fidelity Investments",
      employerUrl: "https://www.fidelity.com",
      title: "Senior Python Engineer",
      workType: "FTE",
      start: "2017-10", // [BEST-GUESS]
      end: "2018-04",   // [BEST-GUESS]
      location: "Westlake, TX",
      logo: { src: "/assets/logos/fidelity.svg", width: 120, height: 32 },
      highlights: [
        "Returned to Fidelity to continue enterprise automation program work, maintaining service ownership of production backend systems with emphasis on reliability and rollback capability.",
        "Extended service-oriented architecture refactoring and API-based integration work initiated in first stint.",
        "Supported distributed teams through SDLC automation improvements and continued mentoring of engineers.",
      ],
      technologies: [
        "Python", "Service-oriented architecture", "API design",
        "SDLC automation", "Performance profiling",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Raytheon — McKinney TX  (FTE between two Fidelity stints)
    // start [BEST-GUESS]: month after Fidelity 1 ended (2016-10)
    // end   [BEST-GUESS]: ~10-month FTE stint
    // TODO: Add specific role highlights — ATS flags sparse entries
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "raytheon-mckinney",
      employerKey: "raytheon-mckinney",
      employerName: "Raytheon",
      employerUrl: "https://www.rtx.com",
      title: "Software Engineer",
      workType: "FTE",
      start: "2016-11", // [BEST-GUESS]
      end: "2017-09",   // [BEST-GUESS]
      location: "McKinney, TX",
      logo: { src: "/assets/logos/raytheon.svg", width: 120, height: 32 },
      highlights: [
        "Full-time software engineering role at Raytheon in McKinney, TX; contributed to defense software programs between two periods at Fidelity Investments.",
        // TODO: Replace with 2-3 specific bullets describing your actual work here.
      ],
      technologies: [],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Fidelity Investments — 1st stint
    // start [CONFIRMED]: 2015-04
    // end   [BEST-GUESS]: ~1.5 yr before leaving for Raytheon
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "fidelity-investments-1",
      employerKey: "fidelity-investments-1",
      employerName: "Fidelity Investments",
      employerUrl: "https://www.fidelity.com",
      title: "Senior Python Engineer",
      workType: "FTE",
      start: "2015-04", // [CONFIRMED]
      end: "2016-10",   // [BEST-GUESS]
      location: "Westlake, TX",
      logo: { src: "/assets/logos/fidelity.svg", width: 120, height: 32 },
      highlights: [
        "Built and operated backend systems supporting a large multi-year enterprise automation program, emphasizing reliability, rollback capability, and performance profiling in production environments.",
        "Led refactoring of monolithic applications into service-oriented architectures, introducing clearer service boundaries and API-based integrations to improve scalability and maintainability.",
        "Strengthened SDLC automation reducing friction in build, test, and deployment processes across distributed teams.",
        "Mentored and onboarded engineers, contributing to technical consistency, shared ownership of production systems, and team capability growth.",
      ],
      technologies: [
        "Python", "Service-oriented architecture", "API design",
        "SDLC automation", "Performance profiling",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Lockheed Martin — Liverpool NY
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "lockheed-martin-liverpool",
      employerKey: "lockheed-martin-liverpool",
      employerName: "Lockheed Martin",
      employerUrl: "https://www.lockheedmartin.com",
      title: "Software Engineer",
      workType: "FTE",
      start: "2012-06", // [CONFIRMED]
      end: "2015-04",   // [CONFIRMED]
      location: "Liverpool, NY",
      logo: { src: "/assets/logos/lockheed-martin.svg", width: 140, height: 32 },
      highlights: [
        "Developed and automated avionics simulation software under DO-178 compliance requirements, supporting verification and validation activities for safety-critical systems.",
        "Contributed to radar simulation and signal-processing systems including TPQ-53 and F-35-related programs supporting ballistics detection and operational field scenarios.",
        "Participated across the full SDLC including requirements, design, implementation, verification, and audit support within regulated environments.",
      ],
      technologies: [
        "C++", "DO-178", "Avionics simulation", "Radar simulation",
        "Signal processing", "TPQ-53", "F-35", "Verification & validation",
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // BAE Systems
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "bae-systems",
      employerKey: "bae-systems",
      employerName: "BAE Systems",
      employerUrl: "https://www.baesystems.com",
      title: "Software Engineer Associate",
      workType: "FTE",
      start: "2011-05", // [CONFIRMED]
      end: "2012-06",   // [CONFIRMED]
      location: "St. Inigoes, MD",
      logo: { src: "/assets/logos/bae-systems.svg", width: 96, height: 32 },
      highlights: [
        "Developed multithreaded radar simulation software in Java and C++ for U.S. Navy systems, supporting real-time signal processing and operational scenario modeling.",
        "Contributed across design, implementation, and baseline development activities within structured, defense-oriented engineering environments.",
        "Worked within formal SDLC and SCAMPI-aligned processes, gaining early exposure to disciplined development, documentation, and verification practices.",
      ],
      technologies: ["Java", "C++", "Multithreading", "Radar simulation", "Signal processing", "SCAMPI"],
    },

  ],
} as const;
