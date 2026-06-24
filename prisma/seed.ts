import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.resource.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.userTask.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.track.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@compscilearner.com', passwordHash: await bcrypt.hash('admin123', 12), role: 'ADMIN' }
  })

  // CYBERSECURITY TRACK
  await prisma.track.create({
    data: {
      name: 'Cybersecurity', slug: 'cybersecurity', description: 'From networking basics to bug bounty hunting. Learn to find and exploit vulnerabilities.', icon: 'Lock', color: '#8b5cf6', order: 0,
      modules: { create: [
        { name: 'Foundations of Cybersecurity', slug: 'foundations', description: 'Understand the core concepts: CIA triad, threat landscape, and security principles.', order: 0, difficulty: 'BEGINNER', estimatedHours: 4,
          lessons: { create: [
            { title: 'What is Cybersecurity?', slug: 'what-is-cybersecurity', description: 'An introduction to the field and its importance.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'VIDEO', title: 'Cybersecurity Full Course - NetworkChuck', url: 'https://www.youtube.com/watch?v=9GZlVOafYTg', order: 0 },
                { type: 'ARTICLE', title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', order: 1 },
              ]}},
            { title: 'The CIA Triad', slug: 'cia-triad', description: 'Confidentiality, Integrity, and Availability explained.', order: 1, contentType: 'READING',
              resources: { create: [
                { type: 'PDF', title: 'NIST SP 800-12 Rev 1', url: 'https://csrc.nist.gov/pubs/sp/800/12/r1/final', order: 0 },
                { type: 'ARTICLE', title: 'OWASP - CIA Triad', url: 'https://owasp.org/www-community/CIA_Triad', order: 1 },
              ]}},
            { title: 'Types of Cyber Threats', slug: 'types-of-threats', description: 'Malware, phishing, MITM, DDoS, and more.', order: 2, contentType: 'READING',
              resources: { create: [
                { type: 'VIDEO', title: 'Top 10 Cyber Attacks - John Hammond', url: 'https://www.youtube.com/watch?v=Fvk3_fGQmI0', order: 0 },
                { type: 'COURSE', title: 'Intro to Cyber Security - Coursera (NYU)', url: 'https://www.coursera.org/specializations/intro-cyber-security', order: 1 },
              ]}},
          ]}},
        { name: 'Networking Fundamentals', slug: 'networking', description: 'OSI model, TCP/IP, DNS, HTTP — the backbone of security.', order: 1, difficulty: 'BEGINNER', estimatedHours: 6,
          lessons: { create: [
            { title: 'OSI & TCP/IP Models', slug: 'osi-tcpip', description: 'Understanding the layers of network communication.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'VIDEO', title: 'OSI Model Explained - PowerCert', url: 'https://www.youtube.com/watch?v=vv4y_uOneC0', order: 0 },
                { type: 'ARTICLE', title: 'Cloudflare - What is the OSI Model?', url: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/', order: 1 },
              ]}},
            { title: 'DNS, HTTP, and HTTPS', slug: 'dns-http', description: 'How the web works under the hood.', order: 1, contentType: 'READING',
              resources: { create: [
                { type: 'ARTICLE', title: 'Cloudflare - What is DNS?', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/', order: 0 },
                { type: 'VIDEO', title: 'How HTTPS Works - Computerphile', url: 'https://www.youtube.com/watch?v=T4Df5_cojAs', order: 1 },
              ]}},
            { title: 'Subnetting & IP Addressing', slug: 'subnetting', description: 'Calculate subnets, understand CIDR notation.', order: 2, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'VIDEO', title: 'Subnetting Mastery - Practical Networking', url: 'https://www.youtube.com/watch?v=BWZ-MHIhqjk', order: 0 },
                { type: 'TOOL', title: 'Subnet Calculator', url: 'https://www.subnet-calculator.com/', order: 1 },
              ]}},
          ]}},
        { name: 'Linux for Security', slug: 'linux', description: 'Master the command line — the primary tool of every security professional.', order: 2, difficulty: 'BEGINNER', estimatedHours: 8,
          lessons: { create: [
            { title: 'Linux Command Line Basics', slug: 'cli-basics', description: 'Navigate, manipulate files, and run commands.', order: 0, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'CTF', title: 'OverTheWire Bandit', url: 'https://overthewire.org/wargames/bandit/', description: 'Learn Linux through CTF challenges', order: 0 },
                { type: 'PDF', title: 'The Linux Command Line (free book)', url: 'https://linuxcommand.org/tlcl.php', order: 1 },
                { type: 'VIDEO', title: 'Linux for Hackers - NetworkChuck', url: 'https://www.youtube.com/watch?v=VbEx7B_PTOE', order: 2 },
              ]}},
            { title: 'File Permissions & Users', slug: 'permissions', description: 'Understand chmod, chown, and the Linux permission model.', order: 1, contentType: 'READING',
              resources: { create: [
                { type: 'ARTICLE', title: 'Linux Permissions - DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/linux-permissions-basics-and-how-to-use-umask-on-a-vps', order: 0 },
              ]}},
          ]}},
        { name: 'Web Security Basics', slug: 'web-security', description: 'OWASP Top 10, XSS, SQLi, and authentication flaws.', order: 3, difficulty: 'BEGINNER', estimatedHours: 10,
          lessons: { create: [
            { title: 'OWASP Top 10', slug: 'owasp-top10', description: 'The most critical web application security risks.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'PDF', title: 'OWASP Top 10 (2021)', url: 'https://owasp.org/www-project-top-ten/', order: 0 },
                { type: 'COURSE', title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', description: 'Free, hands-on web security training', order: 1 },
              ]}},
            { title: 'XSS and Injection', slug: 'xss-injection', description: 'Cross-site scripting and code injection attacks.', order: 1, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'CTF', title: 'PortSwigger XSS Labs', url: 'https://portswigger.net/web-security/cross-site-scripting', order: 0 },
                { type: 'VIDEO', title: 'XSS Explained - PwnFunction', url: 'https://www.youtube.com/watch?v=EoaDgUgS6QA', order: 1 },
              ]}},
            { title: 'Authentication Flaws', slug: 'auth-flaws', description: 'Broken authentication, session management, and password attacks.', order: 2, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'CTF', title: 'PortSwigger Authentication Labs', url: 'https://portswigger.net/web-security/authentication', order: 0 },
                { type: 'ARTICLE', title: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', order: 1 },
              ]}},
          ]}},
        { name: 'Capture The Flag', slug: 'ctf', description: 'Learn by doing — solve real security challenges.', order: 4, difficulty: 'BEGINNER', estimatedHours: 12,
          lessons: { create: [
            { title: 'What are CTFs?', slug: 'what-are-ctfs', description: 'Introduction to Capture The Flag competitions.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'ARTICLE', title: 'CTFtime.org', url: 'https://ctftime.org/', order: 0 },
                { type: 'VIDEO', title: 'How to Get Started in CTF - LiveOverflow', url: 'https://www.youtube.com/watch?v=8ev9ZX9J45A', order: 1 },
              ]}},
            { title: 'Your First CTF', slug: 'first-ctf', description: 'Beginner-friendly platforms to practice on.', order: 1, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'CTF', title: 'PicoCTF', url: 'https://picoctf.org/', description: 'CMU\'s free beginner CTF platform', order: 0 },
                { type: 'CTF', title: 'TryHackMe - Complete Beginner', url: 'https://tryhackme.com/path/outline/beginner', description: 'Guided learning path', order: 1 },
              ]}},
          ]}},
        { name: 'Web Application Hacking', slug: 'web-hacking', description: 'Burp Suite, SSRF, IDOR — real-world web app exploitation.', order: 5, difficulty: 'INTERMEDIATE', estimatedHours: 15,
          lessons: { create: [
            { title: 'Burp Suite Essentials', slug: 'burp-suite', description: 'The industry-standard web proxy tool.', order: 0, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'COURSE', title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', order: 0 },
                { type: 'VIDEO', title: 'Burp Suite Tutorial - The Cyber Mentor', url: 'https://www.youtube.com/watch?v=G3hpAeoZ78c', order: 1 },
              ]}},
            { title: 'IDOR & Access Control', slug: 'idor', description: 'Insecure Direct Object References and broken authorization.', order: 1, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'CTF', title: 'PortSwigger Access Control Labs', url: 'https://portswigger.net/web-security/access-control', order: 0 },
                { type: 'ARTICLE', title: 'OWASP IDOR Prevention', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References', order: 1 },
              ]}},
          ]}},
        { name: 'Bug Bounty Hunting', slug: 'bug-bounty', description: 'Turn your skills into money — recon, reporting, and platforms.', order: 6, difficulty: 'INTERMEDIATE', estimatedHours: 10,
          lessons: { create: [
            { title: 'Getting Started with Bug Bounties', slug: 'getting-started', description: 'Platforms, scope, and responsible disclosure.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'COURSE', title: 'Hacker101', url: 'https://www.hacker101.com/', description: 'Free video lessons by HackerOne', order: 0 },
                { type: 'ARTICLE', title: 'HackerOne Hacker101', url: 'https://www.hackerone.com/hackers/hacker101', order: 1 },
              ]}},
            { title: 'Recon & Asset Discovery', slug: 'recon', description: 'Subdomain enumeration, port scanning, and tech fingerprinting.', order: 1, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'VIDEO', title: 'Bug Bounty Recon - Nahamsec', url: 'https://www.youtube.com/watch?v=MIujSpuDtFY', order: 0 },
                { type: 'TOOL', title: 'Subfinder', url: 'https://github.com/projectdiscovery/subfinder', order: 1 },
              ]}},
          ]}},
      ]}
    }
  })

  // SOFTWARE DESIGN TRACK
  await prisma.track.create({
    data: {
      name: 'Software Design', slug: 'software-design', description: 'From programming fundamentals to system architecture. Build software that scales.', icon: 'Code', color: '#06b6d4', order: 1,
      modules: { create: [
        { name: 'Programming Fundamentals', slug: 'programming-fundamentals', description: 'Think like a programmer — variables, control flow, functions.', order: 0, difficulty: 'BEGINNER', estimatedHours: 6,
          lessons: { create: [
            { title: 'Thinking Like a Programmer', slug: 'thinking-like-a-programmer', description: 'Problem decomposition and computational thinking.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'PDF', title: 'Think Python (free book)', url: 'https://greenteapress.com/thinkpython2/html/', order: 0 },
                { type: 'VIDEO', title: 'CS50 Lecture 0 - Harvard', url: 'https://www.youtube.com/watch?v=IDDmrzzB14M', order: 1 },
                { type: 'COURSE', title: 'freeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', order: 2 },
              ]}},
            { title: 'Data Types & Control Flow', slug: 'data-types', description: 'Variables, conditionals, loops, and type systems.', order: 1, contentType: 'READING',
              resources: { create: [
                { type: 'COURSE', title: 'The Odin Project - Foundations', url: 'https://www.theodinproject.com/paths/foundations', order: 0 },
                { type: 'ARTICLE', title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', order: 1 },
              ]}},
            { title: 'Functions & Decomposition', slug: 'functions', description: 'Writing reusable code and breaking problems down.', order: 2, contentType: 'READING',
              resources: { create: [
                { type: 'PDF', title: 'Eloquent JavaScript (free book)', url: 'https://eloquentjavascript.net/', order: 0 },
                { type: 'VIDEO', title: 'Fireship 100 Seconds Series', url: 'https://www.youtube.com/c/Fireship/videos', order: 1 },
              ]}},
          ]}},
        { name: 'Data Structures & Algorithms', slug: 'dsa', description: 'Arrays, trees, graphs, Big O — the foundation of efficient code.', order: 1, difficulty: 'BEGINNER', estimatedHours: 10,
          lessons: { create: [
            { title: 'Arrays & Linked Lists', slug: 'arrays-linked-lists', description: 'Linear data structures and their trade-offs.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'PDF', title: 'Open Data Structures (free book)', url: 'https://opendatastructures.org/', order: 0 },
                { type: 'COURSE', title: 'freeCodeCamp - JS Algorithms', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', order: 1 },
              ]}},
            { title: 'Big O Notation', slug: 'big-o', description: 'Analyzing time and space complexity.', order: 1, contentType: 'READING',
              resources: { create: [
                { type: 'VIDEO', title: 'Big O - Abdul Bari', url: 'https://www.youtube.com/watch?v=Mo4vesaut8g', order: 0 },
              ]}},
          ]}},
        { name: 'Version Control & Git', slug: 'git', description: 'Git, GitHub, branching, PRs — collaborate like a pro.', order: 2, difficulty: 'BEGINNER', estimatedHours: 4,
          lessons: { create: [
            { title: 'Git Basics', slug: 'git-basics', description: 'Init, add, commit, push, pull — the essentials.', order: 0, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'PDF', title: 'Pro Git (free book)', url: 'https://git-scm.com/book/en/v2', order: 0 },
                { type: 'CTF', title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', description: 'Interactive git tutorial', order: 1 },
                { type: 'COURSE', title: 'GitHub Skills', url: 'https://skills.github.com/', order: 2 },
              ]}},
          ]}},
        { name: 'Web Development', slug: 'web-dev', description: 'HTML, CSS, JavaScript, React — build for the web.', order: 3, difficulty: 'BEGINNER', estimatedHours: 12,
          lessons: { create: [
            { title: 'HTML, CSS & JavaScript', slug: 'html-css-js', description: 'The building blocks of every website.', order: 0, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'COURSE', title: 'The Odin Project - Full Stack JS', url: 'https://www.theodinproject.com/paths/full-stack-javascript', order: 0 },
                { type: 'VIDEO', title: 'CSS Tips - Kevin Powell', url: 'https://www.youtube.com/kepowob', order: 1 },
                { type: 'ARTICLE', title: 'web.dev by Google', url: 'https://web.dev/learn', order: 2 },
              ]}},
          ]}},
        { name: 'System Design Basics', slug: 'system-design', description: 'Load balancers, caching, databases, CAP theorem.', order: 4, difficulty: 'INTERMEDIATE', estimatedHours: 10,
          lessons: { create: [
            { title: 'Intro to System Design', slug: 'intro-system-design', description: 'How large-scale systems are architected.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'VIDEO', title: 'System Design Primer - Gaurav Sen', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0', order: 0 },
                { type: 'ARTICLE', title: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', order: 1 },
              ]}},
          ]}},
        { name: 'API Design', slug: 'api-design', description: 'REST, GraphQL, authentication, versioning.', order: 5, difficulty: 'INTERMEDIATE', estimatedHours: 8,
          lessons: { create: [
            { title: 'RESTful API Design', slug: 'rest-api', description: 'Designing clean, predictable APIs.', order: 0, contentType: 'READING',
              resources: { create: [
                { type: 'ARTICLE', title: 'Microsoft REST API Guidelines', url: 'https://github.com/microsoft/api-guidelines', order: 0 },
                { type: 'COURSE', title: 'Apollo GraphQL Tutorials', url: 'https://www.apollographql.com/tutorials/', order: 1 },
              ]}},
          ]}},
        { name: 'Database Design', slug: 'database-design', description: 'Normalization, indexing, SQL, NoSQL.', order: 6, difficulty: 'INTERMEDIATE', estimatedHours: 8,
          lessons: { create: [
            { title: 'SQL Fundamentals', slug: 'sql-fundamentals', description: 'Write queries, design schemas, understand joins.', order: 0, contentType: 'HANDS_ON',
              resources: { create: [
                { type: 'PDF', title: 'Use The Index, Luke (free book)', url: 'https://use-the-index-luke.com/', order: 0 },
                { type: 'CTF', title: 'SQLZoo', url: 'https://sqlzoo.net/', description: 'Interactive SQL exercises', order: 1 },
              ]}},
          ]}},
      ]}
    }
  })

  console.log('Seed complete!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
