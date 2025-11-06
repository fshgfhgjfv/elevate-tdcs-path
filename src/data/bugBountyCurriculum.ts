export const bugBountyCurriculum = [
  {
    unit: "Module 1",
    title: "Bug Bounty Fundamentals & Methodology",
    topics: [
      {
        title: "Introduction to Bug Bounty Programs",
        details:
          "Learn what bug bounty programs are, how they work, and the difference between VDP (Vulnerability Disclosure Programs) and paid bug bounty platforms like HackerOne, Bugcrowd, and Synack.",
      },
      {
        title: "Understanding Bug Bounty Platforms",
        details:
          "Navigate major platforms, understand program scopes, rules of engagement, and how to choose the right programs to maximize your success and earnings.",
      },
      {
        title: "Reconnaissance & Information Gathering",
        details:
          "Master passive and active reconnaissance techniques using tools like Subfinder, Amass, Shodan, and Google Dorking to discover hidden assets and attack surfaces.",
      },
      {
        title: "Setting Up Your Bug Hunting Lab",
        details:
          "Configure a professional bug hunting environment with Burp Suite Pro, custom wordlists, automation scripts, and organizing your workflow for efficiency.",
      },
      {
        title: "Legal & Ethical Considerations",
        details:
          "Understand the legal boundaries of bug hunting, program policies, responsible disclosure, and how to avoid legal issues while testing.",
      },
    ],
  },
  {
    unit: "Module 2",
    title: "Web Application Security Testing",
    topics: [
      {
        title: "OWASP Top 10 Deep Dive",
        details:
          "Comprehensive coverage of the OWASP Top 10 vulnerabilities including Broken Access Control, Cryptographic Failures, Injection, Insecure Design, and more with real-world examples.",
      },
      {
        title: "Advanced SQL Injection Techniques",
        details:
          "Master blind SQLi, time-based SQLi, out-of-band SQLi, and bypassing WAFs. Learn to escalate from basic injection to full database compromise.",
      },
      {
        title: "Cross-Site Scripting (XSS) Mastery",
        details:
          "Deep dive into Reflected, Stored, and DOM-based XSS. Learn bypass techniques, filter evasion, and how to chain XSS with other vulnerabilities for maximum impact.",
      },
      {
        title: "Authentication & Authorization Flaws",
        details:
          "Identify and exploit broken authentication, session management issues, IDOR (Insecure Direct Object References), and privilege escalation vulnerabilities.",
      },
      {
        title: "Business Logic Vulnerabilities",
        details:
          "Learn to think like an attacker to find logic flaws in application workflows, payment systems, referral programs, and multi-step processes that automated scanners miss.",
      },
    ],
  },
  {
    unit: "Module 3",
    title: "API Security & Modern Web Technologies",
    topics: [
      {
        title: "API Security Testing (REST & GraphQL)",
        details:
          "Master testing REST and GraphQL APIs for authentication bypass, authorization flaws, mass assignment, rate limiting issues, and data exposure following the OWASP API Security Top 10.",
      },
      {
        title: "JWT & OAuth Security",
        details:
          "Understand JSON Web Tokens structure, common vulnerabilities (algorithm confusion, weak secrets), and OAuth 2.0 flows with practical exploitation techniques.",
      },
      {
        title: "Server-Side Request Forgery (SSRF)",
        details:
          "Learn to identify and exploit SSRF vulnerabilities to access internal services, cloud metadata, and bypass IP whitelisting with advanced bypass techniques.",
      },
      {
        title: "XML External Entity (XXE) Attacks",
        details:
          "Master XXE attacks to read local files, perform SSRF, and achieve remote code execution through file upload and XML parsing vulnerabilities.",
      },
      {
        title: "Insecure Deserialization",
        details:
          "Understand serialization formats (Java, PHP, Python), identify deserialization vulnerabilities, and create exploit chains leading to RCE.",
      },
    ],
  },
  {
    unit: "Module 4",
    title: "Mobile & Cloud Security",
    topics: [
      {
        title: "Android Application Security",
        details:
          "Learn to decompile APKs, analyze AndroidManifest.xml, test for insecure storage, hardcoded secrets, and intercept mobile API traffic.",
      },
      {
        title: "iOS Application Security",
        details:
          "Master iOS app testing using tools like Frida, Objection, and Burp Suite. Learn to bypass SSL pinning, analyze local storage, and test for common iOS vulnerabilities.",
      },
      {
        title: "AWS Security Misconfigurations",
        details:
          "Identify common AWS misconfigurations including open S3 buckets, overly permissive IAM policies, Lambda function vulnerabilities, and API Gateway issues.",
      },
      {
        title: "Azure & GCP Security",
        details:
          "Learn to test Azure and Google Cloud Platform for misconfigurations, storage account exposure, and cloud-specific vulnerability patterns.",
      },
      {
        title: "Container Security (Docker & Kubernetes)",
        details:
          "Understand container escape techniques, Kubernetes misconfiguration, exposed Docker APIs, and cloud-native security testing.",
      },
    ],
  },
  {
    unit: "Module 5",
    title: "Advanced Techniques & Professional Skills",
    topics: [
      {
        title: "Automation with Python & Bash",
        details:
          "Build custom tools and automation scripts for reconnaissance, vulnerability scanning, and exploitation to scale your bug hunting efforts.",
      },
      {
        title: "Vulnerability Chaining",
        details:
          "Learn to chain multiple low-severity vulnerabilities into critical findings. Real-world examples of turning XSS + CSRF into account takeover.",
      },
      {
        title: "Professional Report Writing",
        details:
          "Master the art of writing clear, professional vulnerability reports with proper impact analysis, steps to reproduce, and remediation recommendations to maximize payouts.",
      },
      {
        title: "Bug Bounty Tips & Strategies",
        details:
          "Learn proven strategies for finding high-value bugs, time management, program selection, building reputation, and maximizing earnings from experienced bug hunters.",
      },
      {
        title: "Career Path & Building Your Brand",
        details:
          "Understand how to transition from bug bounty to full-time security roles, build your professional brand, create a portfolio, and network in the security community.",
      },
    ],
  },
];
