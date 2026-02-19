const questions = {
  level1: [
    {
      id: 80,
      type: 1,
      question: "Which practice helps protect your computer and personal data?",
      options: [
        "A. Sharing your password with trusted friends",
        "B. Installing and updating antivirus software regularly",
        "C. Ignoring software update notifications",
        "D. Downloading files from unknown websites.",
      ],
      correct: "B",
    },
    {
      id: 77,
      type: 3,
      question:
        "For each item, select Yes if it is a valid Google search filter option, and No if it is not.",
      statements: ["Language", "File type", "Color", "Dates"],
      correct: [true, true, false, true],
    },
    {
      id: 54,
      type: 2,
      question:
        "Which two connections can be used to connect a monitor to a computer? (Choose two.)",
      options: ["A. HDMI", "B. Ethernet", "C. USB-C"],
      correct: ["A", "C"],
    },
    {
      id: 58,
      type: 3,
      question:
        "For each statement about Creative Commons, select True or False.",
      statements: [
        "Allows creators to grant licenses to only specific people",
        "Helps facilitate the sharing and discovery of creative works on the web",
        "Provides tools that allow creators to dedicate their works to the public domain",
      ],
      correct: [false, true, true],
    },
    {
      id: 72,
      type: 1,
      question:
        "Which hardware component does a desktop computer use for long-term data storage?",
      options: [
        "A. Central processing unit (CPU)",
        "B. Motherboard",
        "C. USB flash drive",
        "D. Hard disk drive",
      ],
      correct: "D",
    },
    {
      id: 74,
      type: 3,
      question:
        "For each statement about the differences between internet and intranet, select True or False.",
      statements: [
        "The internet is privately owned by a consortium of companies",
        "An intranet connection is more secure than an internet connection",
        "An intranet has an unlimited number of users and can be accessed by anyone",
      ],
      correct: [false, true, false],
    },
    {
      id: 73,
      type: 3,
      question:
        "You need to identify tools that help you to protect your digital privacy. For each statement, select Yes if the feature protects digital privacy and No if it does not.",
      statements: [
        "Disk defragmenter",
        "Password-management program",
        "Anti-tracking browser extension",
      ],
      correct: [false, true, true],
    },
    {
      id: 70,
      type: 3,
      question:
        "For each physical health risk, select Yes if it is associated with prolonged computer use or No if it is not.",
      statements: [
        "Discomfort in the neck",
        "Elevated blood pressure",
        "Eye strain",
        "Frequent headaches",
      ],
      correct: [true, false, true, true],
    },
    {
      id: 59,
      type: 1,
      question: "Which option is the best way to create a secure password?",
      options: [
        "A. Use your name and birthday",
        "B. Use your favorite movie title",
        'C. Use a mix of letters, numbers, and symbols, like "12345" or "p@ssword"',
        'D. Use something easy to remember, like "password"',
      ],
      correct: "C",
    },
    {
      id: 61,
      type: 3,
      question: "For each statement about copyright, select True or False.",
    //   img:"./img/e4.jpg",
      statements: [
        "Work must be registered with the copyright office to be protected by copyright",
        "Copyright laws protect the right to reproduce the copyrighted work",
        "Copyright laws protect only works of art, such as paintings and sculptures",
      ],
      correct: [false, true, false],
    },
    {
      id: 68,
      type: 3,
      question:
        "For each statement about citation practices, select True or False.",
      statements: [
        "If you quote directly from a speech, you must cite the source",
        "If you summarize someone else's work, you must cite the source",
        "If you paraphrase someone else's work, you must cite the source",
        "You should place quotation marks around phrases that you quote from someone else's work",
      ],
      correct: [true, true, true, true],
    },
    {
      id: 65,
      type: 1,
      question:
        "You are making suggestions, corrections, and comments on a classmate's research paper. What process are you performing?",
      options: [
        "A. Coauthoring",
        "B. Attributing",
        "C. Peer reviewing",
        "D. Fact checking",
      ],
      correct: "C",
    },
    {
      id: 57,
      type: 2,
      question:
        "You need to ensure the security of your passwords. Which three guidelines should you follow? (Choose three.)",
      options: [
        "A. Use the longest password or passphrase permissible by each password system.",
        "B. Use passwords that are based on private personal information.",
        "C. Use multi-factor authentication when available.",
        "D. Use words that can be found in the dictionary of a language other than your primary language.",
        "E. Use complex passwords and record them in a notebook that you keep with you at all times.",
        "F. Use a different password for each account.",
      ],
      correct: ["A", "C", "F"],
    },
    {
      id: 63,
      type: 3,
      question:
        "You are searching the web to gather information for a research paper. You need to identify webpages that are likely to contain accurate and unbiased information for your research. For each statement, select Yes if it indicates that a webpage meets the requirements or No if it does not.",
      statements: [
        "The webpage has misspelled words",
        "The webpage text is written objectively",
        "The webpage includes a list of references",
      ],
      correct: [false, true, true],
    },
    {
      id: 66,
      type: 1,
      question: 'What is a benefit of "in private" or "incognito" browsing?',
      options: [
        "A. Your web browser remembers the files you download",
        "B. Digital fingerprinting can't be used to track your browser activities",
        "C. Your web browser doesn't retain cookies",
        "D. Your web browser blocks advertisements.",
      ],
      correct: "C",
    },
    {
      id: 69,
      type: 1,
      question:
        "Your name is Sam Grey. You are updating a school project and want to save a new version. You need to choose a file name that clearly identifies the author, is easy to read, and supports web usability and cross-platform compatibility. Which file name should you use?",
      options: [
        "A. samgreyprojectoneversionthree04/15/2025.docx",
        "B. Sam Grey Project1-version3.docx",
        "C. SaaaamGreeey<project#1>V3.docx",
        "D. SamGreyProject1v3.docx",
      ],
      correct: "D",
    },
    {
      id: 79,
      type: 1,
      question: "What is a computer virus?",
      options: [
        "A. A program that is designed to look harmless but allows unauthorized access to your computer",
        "B. Content that tricks you into revealing account codes and passwords by pretending to be legitimate",
        "C. A program that installs itself on your system without your knowledge and tracks your computer usage",
        "D. A program that can copy itself and spread to other computers",
      ],
      correct: "D",
    },
    {
      id: 62,
      type: 1,
      question:
        "You are working on a research project. You locate a long online article that contains information related to your research topic. Which information can you locate on the webpage by using the browser's Find feature?",
      options: [
        "A. A list of secondary topics related to your primary research topic",
        "B. The number of times the article mentions a specific topic",
        "C. The answer to a specific Question related to the article topic",
        "D. Related comments on social media sites",
      ],
      correct: "B",
    },
    {
      id: 71,
      type: 2,
      question:
        "Which two methods should you use to avoid computer-related injuries? (Choose two.)",
      options: [
        "A. Use a mouse with a switch to adjust the DPI when needed",
        "B. Upgrade to a high-end graphics card to reduce eye strain",
        "C. Use an ergonomic keyboard so your wrists are in a more natural position",
        "D. Take frequent short breaks during which you walk around",
      ],
      correct: ["C", "D"],
    },
    {
      id: 60,
      type: 1,
      question: "Which statement about web-based applications is correct?",
      options: [
        "A. Web applications process information locally on your computer",
        "B. The web version of a desktop application has all the same features as the desktop version",
        "C. Before you can use a web application, you must install it on your computer",
        "D. You must have an internet connection to use a web application.",
      ],
      correct: "D",
    },
    {
      id: 78,
      type: 2,
      question:
        "You are writing a research paper. You gather information from various sources that you want to include in your paper. You need to reference your source material in your paper. For which two reasons should you reference your source material? (Choose two.)",
      options: [
        "A. It allows readers to find the original information source",
        "B. It establishes the research paper as your original work",
        "C. It gives credit to the people who did the research you're referencing",
        "D. It provides financial payment to the people who performed the research.",
      ],
      correct: ["A", "C"],
    },
    {
      id: 67,
      type: 3,
      question:
        "You need to add artwork to a presentation you're creating for your class. You do NOT have time to get permission to use the artwork. For each statement, select Yes if you may legally use the artwork without permission or No if you may not.",
      statements: [
        "The artist is your friend (Художник — ваш друг)",
        "The artwork is protected by copyright (Произведение защищено авторским правом)",
        "The copyright owner dedicated the artwork to the public domain (Владелец авторских прав передал произведение в общественное достояние)",
      ],
      correct: [false, false, true],
    },
    {
      id: 64,
      type: 3,
      question:
        "As an ethical computer user, you have a responsibility to practice good netiquette at all times. You need to identify examples of good netiquette in an office work environment. For each statement, select Yes if it is an example of good netiquette or No if it is not.",
      statements: [
        "Copy your coworkers on all email messages you send to keep them in the loop",
        "Share large files from a cloud storage location instead of attaching them to email messages",
        "Apply the same standards and values to online interactions that you do to face-to-face interactions",
      ],
      correct: [true, true, true],
    },
    {
      id: 76,
      type: 3,
      question:
        "Online messaging apps simplify the process of communicating with other people, whether they are next door or in another country. For each statement, select True or False.",
      statements: [
        "People with similar heritages have the same beliefs and priorities",
        "Respectful language conveys prejudices such as stereotypes, expectations and limitations",
        "Culture is a constantly changing concept that may not completely reflect someone's identity",
      ],
      correct: [false, false, true],
    },
    {
      id: 55,
      type: 1,
      question:
        "You see a post on social media that contains an article about a current event. You want to evaluate the credibility of the article. Which factor is most important?",
      options: [
        "A. The number of pictures included in the article",
        "B. The number of likes and shares the article has received",
        "C. The length of the article and the details it covers",
        "D. The news outlet's reputation and trustworthiness",
      ],
      correct: "D",
    },
    {
      id: 56,
      type: 1,
      question:
        "When assessing an online article's reliability, which is a critical step?",
      options: [
        "A. Verifying that the article includes multiple images",
        "B. Counting the article's words to determine depth of content",
        "C. Reviewing the article's publication date and checking for recent updates",
        "D. Confirming the author's popularity on social media",
      ],
      correct: "C",
    },
    {
      id: 51,
      type: 1,
      question:
        "You need to collaborate with your peers and share your class journal. Which digital platform is appropriate for this classroom activity?",
      options: ["A. Google Docs", "B. Facebook", "C. Instagram", "D. Twitter"],
      correct: "A",
    },
    {
      id: 52,
      type: 3,
      question: "Digital Privacy – True or False Statements",
      statements: [
        "Updating your browser every six months wipes your digital footprint clean",
        "Anonymous online comments you post cannot be traced back to you if you use a web filter",
        "Potential employers can find images and messages posted on social media by applicants under the age of 18",
        "Companies with which you share personal data in exchange for apps and services are not allowed to give the data to anyone else",
      ],
      correct: [false, false, true, false],
    },
    {
      id: 47,
      type: 3,
      question:
        "For each statement about printing documents, select True or False.",
      statements: [
        "You can change document margins from the Print settings",
        "Duplex printing prints file content on both sides of the paper",
        "You can only change the paper size from the Page Setup options",
        "To preserve file formatting when electronically distributing a document, print the document to a PDF file",
      ],
      correct: [false, true, false, true],
    },
    {
      id: 49,
      type: 1,
      question:
        "You and a partner are collaborating to create a science report. You create a shared document and save it to the cloud. You intend to work on the report at different times. What type of collaboration does this refer to?",
      options: [
        "A. Synchronous",
        "B. Offline",
        "C. Simultaneous",
        "D. Asynchronous",
      ],
      correct: "D",
    },
    {
      id: 46,
      type: 1,
      question: "Which backup method offers the best protection for your data?",
      options: [
        "A. Sending files to others through email",
        "B. Deleting files you don't need anymore",
        "C. Keeping files only on your computer's hard drive",
        "D. Using both cloud storage and an external hard drive",
      ],
      correct: "D",
    },
    {
      id: 53,
      type: 1,
      question:
        "Maddie uses social media to stay in touch with friends and family. She is planning to go on vacation next month. What is the safest way for Maddie to protect herself from online predators when posting information about her vacation activities?",
      options: [
        "A. Checking in online when she goes places so her parents know where she is",
        "B. Posting her vacation plans before she leaves so her friends know she is out of town",
        "C. Setting her social media location map to 'public'",
        "D. Waiting until she returns home to post vacation photos",
      ],
      correct: "D",
    },
    {
      id: 44,
      type: 2,
      question:
        "Which two technologies do websites use to track visitors' online browsing habits? (Choose two)",
      options: [
        "A. GPS locations",
        "B. First-party cookies",
        "C. In private/incognito browsing",
        "D. VPN tunneling",
      ],
      correct: ["A", "B"],
    },
    {
      id: 48,
      type: 5,
      question:
        "Move each computer hardware element from the list on the left to the corresponding image on the right.",
        img:"./img/e9.jpg",
      items: [
        "Motherboard",
        "Solid-state drive (SSD)",
        "Hard disk drive (HDD)",
        "Central processing unit (CPU)",
      ],
      targets: [
        "Motherboard → image of motherboard (blue circuit board with slots)",
        "Solid-state drive (SSD) → image of SSD (green circuit board with chips)",
        "Hard disk drive (HDD) → image of HDD (black box with disk inside)",
        "Central processing unit (CPU) → image of CPU (small square chip with pins)",
      ],
      correct: {
        Motherboard: "motherboard image",
        "Solid-state drive (SSD)": "SSD image",
        "Hard disk drive (HDD)": "HDD image",
        "Central processing unit (CPU)": "CPU image",
      },
    },
    {
      id: 50,
      type: 1,
      question:
        "You are working with other students on a science project. Your team will meet to discuss the project using the school's videoconferencing application. You act as the host. You need to ensure that each student can talk about the project without being interrupted by other students. What should each student do to meet this goal?",
      options: [
        "A. Sign in early to verify that the audio and video technology works",
        "B. Mute their microphone until you call on them",
        "C. Remain on camera throughout the conference",
        "D. Introduce themselves by name when they speak",
      ],
      correct: "B",
    },
    {
      id: 37,
      type: 5,
      question:
        "Move each cable from the list on the left to the best connection on the right.",
        img:"img/e10.jpg",
      items: ["Lightning", "USB-C", "USB A", "Micro USB"],
      targets: ["USB A", "USB-C", "Lightning", "Micro USB"],
      correct: {
        Lightning: "Lightning connector (Apple)",
        "USB-C": "USB-C connector",
        "USB A": "USB A connector",
        "Micro USB": "Micro USB connector",
      },
      note: "Match the cable heads to the port shapes shown (from images: left side cables to right side ports)",
    },
    {
      id: 45,
      type: 3,
      question:
        "You are searching the web for information about how to grow your own vegetables. ... select Yes if the page is relevant ... or No if it is not.",
      statements: [
        "A tabloid magazine article about celebrity gardens",
        "A how-to article published by a prestigious university",
        "An ad for a popular gardening blog",
      ],
      correct: [false, true, false],
    },
    {
      id: 43,
      type: 1,
      question: "Which symptom is associated with prolonged computer use?",
      options: [
        "A. Increased back pain",
        "B. Enhanced visual clarity",
        "C. Improved muscle tone",
        "D. Increased flexibility in joints",
      ],
      correct: "A",
    },
    {
      id: 39,
      type: 2,
      question:
        "Which three elements must you include in a citation that references a printed book? (Choose three.)",
      options: [
        "A. Book title",
        "B. Publication date",
        "C. Access date",
        "D. Copyright status",
        "E. Trademark status",
        "F. Author name",
      ],
      correct: ["A", "B", "F"],
    },
    {
      id: 38,
      type: 3,
      question:
        "You need to identify the functions that are managed by a computer operating system (not by an app). ... select OS if it is managed by the operating system and App if it is not.",
      statements: [
        "Edits text files",
        "Searches the internet",
        "Allocates hardware resources",
        "Communicates with peripheral devices",
      ],
      correct: ["App", "App", "OS", "OS"],
    },
    {
      id: 40,
      type: 3,
      question:
        "You are writing a research paper. ... select YES if you must add a reference or NO if you do not.",
      statements: [
        "You use an idea from a news article",
        "You write something new and original",
        "You pull a paragraph from a webpage",
        "You paraphrase content from a magazine article",
      ],
      correct: [true, false, true, true],
    },
    {
      id: 36,
      type: 2,
      question:
        "Which two options are benefits of digital collaboration? (Choose two.)",
      options: [
        "A. Collaborators can more easily avoid distractions while working",
        "B. Ideas and feedback can be shared quickly",
        "C. Collaborators can work with others from any geographic location",
        "D. Confidential data is safer from theft and intrusion",
      ],
      correct: ["B", "C"],
    },
    {
      id: 42,
      type: 1,
      question:
        "Juliana takes photos with her phone for the school yearbook. ... What should Juliana do?",
      options: [
        "A. Download the photos to a USB flash drive",
        "B. Email the photos to her teacher",
        "C. Sync her phone to cloud storage",
        "D. Delete only the photos she doesn't want to use",
      ],
      correct: "C",
    },
    {
      id: 32,
      type: 2,
      question:
        "Which two actions can you take to help maintain your digital privacy? (Choose two.)",
      options: [
        "A. Configure your web browser settings to block cookies",
        "B. Store your private documents in a cloud storage location",
        "C. Use only your school email to send private information",
        "D. Turn off GPS on your devices when you are not actively using it",
      ],
      correct: ["A", "D"],
    },
    {
      id: 33,
      type: 3,
      question:
        "Online messaging apps simplify the process of communicating... select True or False.",
      statements: [
        "People who use smart-messaging share the same beliefs and practices whether they are next door or in another country",
        "Communication through emojis reproduces social constructs such as stereotypes, prejudices, and limitations",
        "Emojis are a constantly changing concept that may not universally reflect sources of study",
      ],
      correct: [false, true, true],
    },
    {
      id: 34,
      type: 5,
      question:
        "Move each data storage device from the list on the left to the correct definition on the right.",
      items: [
        "A compact, lightweight external data storage device that uses flash memory",
        "An external data storage device powered through the USB port of the computer",
        "An internal data storage device that stores and retrieves data using flash memory",
        "An internal electromechanical data storage device that stores and retrieves data using a rapidly rotating platter",
      ],
      targets: [
        "USB flash drive",
        "Portable hard drive",
        "Solid-state drive",
        "Hard disk drive",
      ],
      correct: {
        "A compact, lightweight external...": "USB flash drive",
        "An external data storage device powered...": "Portable hard drive",
        "An internal data storage device that stores...": "Solid-state drive",
        "An internal electromechanical...": "Hard disk drive",
      },
    },
    {
      id: 22,
      type: 1,
      question:
        "A paper you are writing for a course needs to be printed double-sided. What is another term for double-sided printing?",
      options: [
        "Printing two lines at a time",
        "Simplex printing",
        "Duplex printing",
        "Printing with a gutter for binding books",
      ],
      correct: "Duplex printing",
    },
    {
      id: 9,
      type: 1,
      question:
        "The Windows operating system has a Taskbar that appears by default at the bottom of the screen. What is the purpose of the Windows operating system Taskbar?",
      options: [
        "Browses the contents stored on your computer",
        "Browses files stored on your computer",
        "Allows you to search for contents within a file",
        "Allows you to launch programs or view any program that is currently open",
      ],
      correct:
        "Allows you to launch programs or view any program that is currently open",
    },
    {
      id: 41,
      type: 2,
      question: "Which two are common print settings? (Choose two)",
      options: [
        "Printing three lines at a time",
        "Transparent printing",
        "Slides per page",
        "Pages per sheet",
        "Printing two lines at a time",
      ],
      correct: ["Slides per page", "Pages per sheet"],
    },
    {
      id: 24,
      type: 1,
      question:
        "You are writing a research paper and have been instructed to include attributions and referencing. What is the purpose of attribution and referencing?",
      options: [
        "The purpose is to acknowledge the authors and creators of work that didn't originate from you.",
        "The purpose is to purchase the work from the authors and creators.",
        "It helps the authors and creators maintain their copyrights.",
        "The more attributions and references an author or creator has, the more money they receive.",
      ],
      correct:
        "The purpose is to acknowledge the authors and creators of work that didn't originate from you.",
    },
    {
      id: 45,
      type: 1,
      question:
        "Why should you avoid posting demeaning photographs, harassing people, or advocating negative ideas like suicide or terrorism online?",
      options: [
        "You could be fined.",
        "You might anger the wrong people.",
        "Your online identity is formed by what you post.",
        "It is illegal.",
      ],
      correct: "Your online identity is formed by what you post.",
    },
    {
      id: 6,
      type: 5,
      question:
        "Rank each of the following computing devices from Most Powerful (#1) to Least Powerful (#4).",
      items: ["Smartphone", "Laptop", "Tablet", "Desktop Computer"],
      correct: ["Desktop Computer", "Laptop", "Tablet", "Smartphone"],
    },
    {
      id: 44,
      type: 1,
      question:
        "A post on Facebook makes some statements that are being shared by numerous people. How can you determine whether the statements are true?",
      options: [
        "Everything posted on the Internet is true.",
        "If I want to believe it, the information is true.",
        "Search for the information online and try to find the original source.",
        "If lots of people are sharing and commenting, the information must be true.",
      ],
      correct:
        "Search for the information online and try to find the original source.",
    },
    {
      id: 4,
      type: 2,
      question:
        "You've been assigned to write a research paper. What three types of information are required for you to complete this task? (Choose three)",
      options: [
        "Identify available resources",
        "Identify the topic or goal",
        "Get a partner",
        "Open a social media account",
        "Find a computer",
        "Establish a schedule",
      ],
      correct: [
        "Identify available resources",
        "Identify the topic or goal",
        "Establish a schedule",
      ],
    },
    {
      id: 39,
      type: 1,
      question: "What is your digital footprint?",
      options: [
        "Comments, images, and other information you post online",
        "Digital signature",
        "A biometric used to log in to an account",
        "Personal information about you, such as name, birth date, and phone number.",
      ],
      correct: "Comments, images, and other information you post online",
    },
    {
      id: 2,
      type: 3,
      question:
        "For each statement regarding file-naming conventions, select Yes if the statement is effective and No if the statement is ineffective.",
      statements: [
        "A filename should have spaces between key words.",
        "Do not use special characters.",
        "If the date is included, use the format: YYYY-MM-DD",
        "You cannot number files.",
        "Do not write the entire file name in all capital letters.",
      ],
      correct: [false, true, true, false, true],
    },
    {
      id: 43,
      type: 1,
      question: "Which of the following is an example of cyberbullying?",
      options: [
        "Writing an opinion article about the unfair requirements of cheerleader tryouts and submitting it to your school news website.",
        "Stealing someone's password and pretending to be that person while tweeting or posting things online.",
        "Posting songs of your favorite artists online and charging your friends money to download them.",
        "Helping a friend by posting researched articles about bullying to their blog.",
      ],
      correct:
        "Stealing someone's password and pretending to be that person while tweeting or posting things online.",
    },
    {
      id: 19,
      type: 2,
      question:
        "You've joined a gaming forum that discusses a number of popular digital games. Before you can post in the forum, you must create a username. What are two appropriate reasons for using an alias online rather than your actual name? (Choose two)",
      options: [
        "You have a common name, and an alias can set you apart from others.",
        "You are downloading pirated media.",
        "You are trying to keep your personal identity and business identities separate.",
        "You want to pretend to be someone else.",
        "You want to comment in a way which you normally wouldn't in person.",
      ],
      correct: [
        "You have a common name, and an alias can set you apart from others.",
        "You are trying to keep your personal identity and business identities separate.",
      ],
    },
    {
      id: 10,
      type: 5,
      question:
        "You want to clear your browser settings on your computer: cache, cookies, and history. How do you clear the browser settings on most browsers? Place the steps in the correct order.",
      items: [
        "Click the three-dot menu (…) in the upper-right corner of the browser.",
        "Choose which browser settings to clear.",
        "Select Settings (PC) or Options (MacOS).",
        "Select Privacy & Security.",
      ],
      correct: [
        "Click the three-dot menu (…) in the upper-right corner of the browser.",
        "Select Settings (PC) or Options (MacOS).",
        "Select Privacy & Security.",
        "Choose which browser settings to clear.",
      ],
    },
    {
      id: 7,
      type: 1,
      question:
        "You are participating in a virtual class meeting using a video technology. On the video, you can see your teacher and classmates, and they can all see you. Which of the following behaviors should you be careful about expressing?",
      options: [
        "Smiling too much that promotes your favorite sports team",
        "Wearing clothing that promotes your favorite sports team",
        "Spelling and handwriting",
        "Facial expressions and body language",
      ],
      correct: "Facial expressions and body language",
    },
    {
      id: 8,
      type: 1,
      question:
        "You have been troubled by a lot of malware infecting your computer. After cleaning the malware off your computer, you want to better your digital privacy and increase your security. Which of the following will protect your digital privacy and increase your security when browsing websites?",
      options: [
        "A Creative Commons license",
        "Switch to an open source browser to increase your digital privacy",
        "Anti-tracking browser extension",
        "Clearing your browser history",
      ],
      correct: "Anti-tracking browser extension",
    },
    {
      id: 5,
      type: 5,
      question:
        "Match each digital interaction to the scenario that demonstrates its proper use.",
      items: ["Video Conferencing", "Live chat", "Email", "Text message"],
      targets: [
        "Team meeting of members in different locations",
        "Contacting online support for assistance",
        "Delivering step-by-step instructions to a partner about a project",
        "Notifying friends you will be a few minutes late",
      ],
      correct: {
        "Video Conferencing": "Team meeting of members in different locations",
        "Live chat": "Contacting online support for assistance",
        Email:
          "Delivering step-by-step instructions to a partner about a project",
        "Text message": "Notifying friends you will be a few minutes late",
      },
    },
    {
      id: 21,
      type: 3,
      question:
        "For each statement regarding an Acceptable Use Policies for social media posting, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "Acceptable Use Policies in schools will generally include rules about cyberbullying.",
        "Acceptable Use Policies are rules about what you can and can't do online using a school or work computer.",
        "Acceptable Use Policies for schools and businesses generally include rules about using social media sites.",
        "Violating an Acceptable Use Policy usually results in having your account removed as a penalty.",
        "Acceptable Use Policies for adults are identical to policies for minors.",
        "Acceptable Use Policies cannot restrict you from posting whatever you want because you have 1st Amendment rights.",
      ],
      correct: [true, true, true, true, false, false],
    },
    {
      id: 3,
      type: 2,
      question:
        "You are writing a research paper and have been instructed to include attributions and referencing. Which are attributions and referencing? (Choose two)",
      options: [
        "Referencing is giving credit to the creator of an image or other material.",
        "Referencing is acknowledging your source in the body of your work and linking your citations to a bibliography.",
        "Attribution is acknowledging your source in the body of your work and linking your citations to a bibliography.",
        "Attribution is describing the type of image used.",
        "Attribution is giving credit to the creator of an image or other material.",
        "Referencing is when the creator of a work specifies how they want you to give them credit for their work.",
      ],
      correct: [
        "Referencing is acknowledging your source in the body of your work and linking your citations to a bibliography.",
        "Attribution is giving credit to the creator of an image or other material.",
      ],
    },
    {
      id: 1,
      type: 3,
      question:
        "You are searching the web to gather information for a slide show presentation... select Yes if it indicates that a web page is likely to contain accurate and unbiased information or No if it is likely to contain inaccurate and biased information.",
      statements: [
        "The web page has poor English grammar and states several unrealistic claims.",
        "The web page has a .gov or a .edu domain.",
        "The web page has a .com or a .org domain.",
        "The references on the web page go to similar websites of references instead of the original source of information.",
      ],
      correct: [false, true, false, false],
    },
    {
      id: 42,
      type: 3,
      question:
        "Refer to the image. For each statement, select Yes if the hardware component matches the description or No if it does not.",
      img:"img/e3.jpg",
        statements: [
        "Image A is a Solid State Drive (SSD).",
        "Image B is memory.",
        "Image C is a Central Processing Unit (CPU).",
      ],
      correct: [false, true, true],
    },
    {
      id: 37,
      type: 5,
      question: "Match each operating system concept to its definition.",
      items: ["Access token", "Open Source", "Boot", "Driver", "Daemon"],
      targets: [
        "Contains the security credentials for a login session and identifies the user, the user's groups and the user's privileges",
        "Anyone can obtain the source code and modify the software free of charge",
        "The process of starting an operating system. During this process, an operating system loads all of the software drivers that enable a computer's hardware components to communicate with each other.",
        "A small software program that enables the operating system and a device to communicate with each other",
        "Starts at boot time and runs as a background process to support multitasking",
      ],
      correct: {
        "Access token":
          "Contains the security credentials for a login session and identifies the user, the user's groups and the user's privileges",
        "Open Source":
          "Anyone can obtain the source code and modify the software free of charge",
        Boot: "The process of starting an operating system. During this process, an operating system loads all of the software drivers that enable a computer's hardware components to communicate with each other.",
        Driver:
          "A small software program that enables the operating system and a device to communicate with each other",
        Daemon:
          "Starts at boot time and runs as a background process to support multitasking",
      },
    },
    {
      id: 31,
      type: 1,
      question:
        "Which of the following would be a feature of a good network infrastructure for a school?",
      options: [
        "Easily scales the network as the student population grows",
        "Acceptable Use Policy is not required",
        "Allows anyone to access the network from anywhere",
        "Supports anonymous logins",
      ],
      correct: "Easily scales the network as the student population grows",
    },
    {
      id: 33,
      type: 2,
      question:
        "You take a lot of digital photos and need more storage space. You decide to expand the data storage on your computer. Which three are types of data storage? (Choose three)",
      options: [
        "Hard Disk Drive (HDD)",
        "ROM",
        "Solid State Drive (SSD)",
        "USB Flash Drive",
        "Flash ROM",
        "RAM",
      ],
      correct: [
        "Hard Disk Drive (HDD)",
        "Solid State Drive (SSD)",
        "USB Flash Drive",
      ],
    },
    {
      id: 36,
      type: 3,
      question:
        "Refer to the image. For each statement, select Yes if the type of USB matches the image or No if it does not.",
      img:"img/abcde.jpg",
        statements: [
        "Image A is a USB-C typically used on newer devices.",
        "Image B is a Micro USB typically used on phones, headphones, Bluetooth devices, and power banks.",
        "Image C is a Firewire connector used with iPhones.",
        "Image D is a Lightning connector used with Apple products.",
        "Image E is a USB-C typically used on newer devices.",
      ],
      correct: [false, true, false, true, true],
    },
    {
      id: 34,
      type: 3,
      question:
        "For each statement regarding the basic functions of web browsers, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "Web browsers are the Internet.",
        "Web browsers are search engines.",
        "Web browsers are software applications that retrieve and present information from the World Wide Web.",
        "Web browsers use URLs to connect to resources such as web pages, images, and videos.",
      ],
      correct: [false, false, true, true],
    },
    {
      id: 32,
      type: 2,
      question:
        "When citing information published on the web, you should include a retrieval statement indicating when and where on the web you accessed the information. Which three items should you include in your citation retrieval statement? (Choose three)",
      options: [
        "Date the page was posted",
        "Name of the author or organization",
        "Name of the website",
        "URL or web address of the site",
        "Topic you were searching",
        "Date you accessed the website",
      ],
      correct: [
        "Name of the website",
        "URL or web address of the site",
        "Date you accessed the website",
      ],
    },
    {
      id: 30,
      type: 1,
      question:
        "You have a smartphone. Your friends have discovered an app that can show on a map where the smartphone of each friend is located. They want you to download the same app so they can know your location at all times. What technology is used by an app that can map the location of your smartphone?",
      options: ["Navigation Tracking", "Spyware", "Social Media", "Mapping"],
      correct: "Navigation Tracking",
    },
    {
      id: 35,
      type: 3,
      question:
        "For each statement regarding proprietary vs. open source software, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "Open-source refers to software source code that is available for anybody to access and modify.",
        "Proprietary software refers to software that is owned by an individual or a company who developed it.",
        "Proprietary software is usually free.",
        "Open-source software is generally sold commercially.",
        "Proprietary software generally has technical support.",
        "Open-source software usually has no technical support or is only supported by community forums.",
      ],
      correct: [true, true, false, false, true, true],
    },
    {
      id: 7,
      type: 2,
      question: "Which two are printing methods? (Choose two)",
      options: [
        "Printing to a PDF file",
        "Printing from the web",
        "Print to a plotter",
        "Print to an email",
        "Print to a DVD",
      ],
      correct: ["Printing to a PDF file", "Printing from the web"],
    },
    {
      id: 22,
      type: 1,
      question:
        "Which of the following demonstrates the use of inclusive language?",
      options: [
        "Hey, bros! Where are we meeting?",
        "Hey, everyone! Where are we meeting?",
        "Hey, girlfriends! Where are we meeting?",
        "Hi, guys! Where are we meeting?",
      ],
      correct: "Hey, everyone! Where are we meeting?",
    },
    {
      id: 16,
      type: 1,
      question:
        "Why should you avoid posting derogatory memes on social media?",
      options: [
        "Not everyone shares your sense of humor.",
        "Negative effects remain permanently available online.",
        "It violates copyright.",
        "It is against social media Acceptable Use Policies.",
      ],
      correct: "Negative effects remain permanently available online.",
    },
    {
      id: 20,
      type: 1,
      question:
        "You're having difficulty sending and receiving information. How can you identify whether your device is connected to the Internet?",
      options: [
        "Open a browser",
        "Try sending a text",
        "Download a Speedtest app",
        "Try saving a file",
      ],
      correct: "Open a browser",
    },
    {
      id: 29,
      type: 2,
      question:
        "Your teacher has cautioned you about protecting your online identity. Which three activities help define your digital identity? (Choose three)",
      options: [
        "Having multiple email accounts",
        "Media posted by other people that you share with your friends",
        "Comments you post or tweet",
        "Only posting from a phone, never from a computer",
        "Your profile",
        "Using Twitter and Snapchat instead of Facebook",
      ],
      correct: [
        "Media posted by other people that you share with your friends",
        "Comments you post or tweet",
        "Your profile",
      ],
    },
    {
      id: 4,
      type: 2,
      question:
        "You just received a new smartphone and want to ensure that any personal files won't be lost if your phone becomes lost or damaged. You decide to enable auto backup using the cloud service that came with your phone. (choose three)",
      options: [
        "Text messages",
        "Apps",
        "Photos",
        "Contacts",
        "SIM card",
        "Operating system",
      ],
      correct: ["Text messages", "Photos", "Contacts"],
    },
    {
      id: 24,
      type: 3,
      question:
        "In which circumstances must you cite references? For each scenario, select Yes if you must add a reference or No if you do not.",
      statements: [
        "You are writing your opinion.",
        "You copy a paragraph from a web page.",
        "You describe a current event you saw on the news.",
        "You quote lyrics from a song.",
      ],
      correct: [false, true, false, true],
    },
    {
      id: 3,
      type: 1,
      question:
        "What is the best way to locate online referencing and attribution sources?",
      options: [
        "School library",
        "Someone else's research paper",
        "Search engines",
        "Social media sites",
      ],
      correct: "Search engines",
    },
    {
      id: 28,
      type: 1,
      question:
        "You are editing a document that you previously wrote. Now you want to save your changes. Click on the feature that will save the changes you made to this document.",
      img:"img/e7.jpg",
         options: [
        "1",
        "2",
        "3",
        "4",
      ],
      correct: "3",
    },
    {
      id: 14,
      type: 5,
      question:
        "Match each concept about software applications to its definition.",
      items: [
        "Application",
        "App",
        "Web-based Application",
        "Desktop Application",
      ],
      targets: [
        "Designed to perform a variety of functions.",
        "Designed for a single purpose and performs a single function.",
        "Runs from the Cloud.",
        "Must be installed on the computer before it can run.",
      ],
      correct: {
        Application: "Designed to perform a variety of functions.",
        App: "Designed for a single purpose and performs a single function.",
        "Web-based Application": "Runs from the Cloud.",
        "Desktop Application":
          "Must be installed on the computer before it can run.",
      },
    },
    {
      id: 11,
      type: 5,
      question:
        "You work in a school computer lab as an assistant to the network administrator. You arrive to the lab early before anyone else and notice you cannot access the Internet. You begin to troubleshoot the problem. Place the troubleshooting steps in the correct order.",
      items: [
        "Check the hardware",
        "Use ipconfig",
        "Use ping or tracert",
        "Perform a DNS check",
        "Contact your ISP",
        "Check on virus and malware protection",
      ],
      correct: [
        "Check the hardware",
        "Use ipconfig",
        "Use ping or tracert",
        "Perform a DNS check",
        "Check on virus and malware protection",
        "Contact your ISP",
      ],
    },
    {
      id: 25,
      type: 1,
      question:
        "You suspect that your favorite password has been compromised on one of your social media sites. You use the same password on multiple sites, including your banking site, so you want to reset your password. Click on the feature that will allow you to reset your password.",
      img:"img/e5.jpg",
         options: [
        "1",
        "2",
        "3",
        "4",
      ],
      correct: "3",
    },
    {
      id: 9,
      type: 1,
      question:
        "Which of the following is allowed with a CC-BY Creative Commons License?",
      options: [
        "Distributing someone's songs online without attribution.",
        "Entering someone else's artwork as your own in an art competition.",
        "Displaying a photograph in a classroom presentation without obtaining permission from the photographer.",
        "Writing your own opinion and submitting it to a community blog.",
      ],
      correct:
        "Writing your own opinion and submitting it to a community blog.",
    },
    {
      id: 27,
      type: 3,
      question:
        "For each statement about locating information in a file, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "The Search box in the upper-right corner of Windows Explorer (PC) or Finder (MacOS) can find content in a file.",
        "Internet Explorer (PC) or Safari (MacOS) can search content in an unopened file on your hard drive.",
        "Any user on the Internet can locate content information in a file stored on your computer.",
      ],
      correct: [true, false, false],
    },
    {
      id: 8,
      type: 3,
      question:
        "For each statement regarding digital collaboration, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "Digital collaboration saves money on travel costs.",
        "Digital collaboration is the best way to form close friendships.",
        "Digital collaboration makes it easier to involve people.",
        "Digital collaboration is less flexible than face-to-face meetings.",
      ],
      correct: [true, false, true, false],
    },
    {
      id: 23,
      type: 2,
      question:
        "There are three primary desktop computer operating systems: Windows, MacOS, and Linux. What are three main functions that all computer operating systems have in common? (Choose three)",
      options: [
        "Provide services for application software",
        "Provide 100% hack-proof security",
        "Manage resources, such as CPU, memory, disk drives, and peripherals",
        "Provide a user interface",
        "Manage telephone and messaging services",
        "Provide video gaming",
      ],
      correct: [
        "Provide services for application software",
        "Manage resources, such as CPU, memory, disk drives, and peripherals",
        "Provide a user interface",
      ],
    },
    {
      id: 18,
      type: 1,
      question:
        "It is the beginning of a new school year. You have been instructed to create a new password to use with your account on the school network. Which of the following should be included in your new password?",
      options: [
        "The name of your current best friend so you won't forget them.",
        "Your birthdate or social security number to uniquely identify you.",
        "The mascot of your favorite sports team to make it easy to remember.",
        "At least 8 characters of numbers, symbols, and a mix of uppercase and lowercase letters.",
      ],
      correct:
        "At least 8 characters of numbers, symbols, and a mix of uppercase and lowercase letters.",
    },
    {
      id: 21,
      type: 1,
      question:
        "One of your teachers said you should change your browser settings to use private mode browsing. What are the benefits of private mode browsing?",
      options: [
        "No history, cookies, passwords, or temporary files are recorded on the computer.",
        "Your computer login and password are disabled.",
        "The packets sent/received across your school network cannot be seen.",
        "Your name is kept private.",
      ],
      correct:
        "No history, cookies, passwords, or temporary files are recorded on the computer.",
    },
    {
      id: 2,
      type: 3,
      question:
        "For each statement about copyright, select Yes if you may legally use the creative work without permission or No if you may not.",
      statements: [
        "An image from a book you want to use was published in 1992.",
        "A photograph you want to use was created 100 years ago by a photographer who died 10 years later.",
        "The lyrics to a song you want to use were not registered as a copyright.",
      ],
      correct: [false, true, false],
    },
    {
      id: 15,
      type: 3,
      question:
        "For each statement regarding mobile device operating systems, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "The operating system on approximately 70% of the world's mobile devices is Android.",
        "There are more apps for iOS than for Android.",
        "Apps for iOS tends to have fewer security issues than apps for Android.",
        "The operating system on approximately 30% of the world's mobile devices is iOS.",
      ],
      correct: [true, false, true, true],
    },
    {
      id: 26,
      type: 2,
      question:
        "You have a smartphone. In class today, you and your friends learned about personal security issues associated with navigation tracking. Which two common online activities expose your personal security by navigation tracking? (Choose two)",
      options: [
        "Uploading a vacation photo from last summer",
        "Posting location information with a selfie you just photographed on social media sites",
        "Checking in your physical location on social media sites",
        "Posting to a blog",
        "Playing online games",
      ],
      correct: [
        "Posting location information with a selfie you just photographed on social media sites",
        "Checking in your physical location on social media sites",
      ],
    },
    {
      id: 10,
      type: 2,
      question:
        "You just created an account on a new social media site. Which two statements must you consider before posting and sharing on a social media site? (Choose two)",
      options: [
        "The minimum age requirement on all social media sites is 13 years old.",
        "Minimum age requirements may differ on each social media site.",
        "You can post and share anything you want on a social media site.",
        "All social media sites have the same guidelines you must follow.",
        "Each social media site has its own guidelines you must follow.",
      ],
      correct: [
        "Minimum age requirements may differ on each social media site.",
        "Each social media site has its own guidelines you must follow.",
      ],
    },
    {
      id: 13,
      type: 3,
      question:
        "For each statement regarding where you can post or share in the digital world, select Yes if the statement is true and No if the statement is false.",
      statements: [
        "Facebook is the most popular social media website for posting and sharing content.",
        "There are no minimum age requirements to have an account on YouTube.",
        "Instagram is only available to Apple iOS users.",
        "WeChat has been described as China's 'app for everything.'",
        "In Snapchat, pictures and messages are only available for a short time before becoming inaccessible.",
        "You can only share on Pinterest if you upload an image.",
      ],
      correct: [true, false, false, true, true, true],
    },
    {
      id: 5,
      type: 5,
      question:
        "Match each email response option to the scenario that demonstrates its proper use.",
      items: ["Cc", "Bcc", "Reply All", "Forward", "Reply", "To"],
      targets: [
        "Used when you want to include your boss in a response to a colleague's email",
        "Used when you want to send someone a copy of an email but don't want the other recipients to see they were included",
        "Used when all recipients of the original email need to see your response",
        "Used when you want to send an email you received to another person",
        "Used when you respond only to the sender of an email",
        "Used when you compose an email and address it to a recipient",
      ],
      correct: {
        Cc: "Used when you want to include your boss in a response to a colleague's email",
        Bcc: "Used when you want to send someone a copy of an email but don't want the other recipients to see they were included",
        "Reply All":
          "Used when all recipients of the original email need to see your response",
        Forward:
          "Used when you want to send an email you received to another person",
        Reply: "Used when you respond only to the sender of an email",
        To: "Used when you compose an email and address it to a recipient",
      },
    },
    {
      id: 6,
      type: 2,
      question:
        "You just signed up for an account on Google. Your new account uses Single Sign-On (SSO). Which three are benefits of Single Sign-On (SSO)? (Choose three)",
      options: [
        "You have stronger security.",
        "After signing on, you can access your email, document storage, apps, and other sites with full access.",
        "You only need to remember one set of login details.",
        "You can log in without using passwords.",
        "Credentials are stored on Amazon, Facebook, and Google.",
        "SSO is government owned and operated.",
      ],
      correct: [
        "After signing on, you can access your email, document storage, apps, and other sites with full access.",
        "You only need to remember one set of login details.",
        "You have stronger security.",
      ],
    },
    {
      id: 17,
      type: 2,
      question:
        "You have just opened a Facebook account. One of your friends claims she recently had her identity stolen on a social media site, and you don't want that happening to you. Which three precautions should you take to protect your personal data online? (Choose three)",
      options: [
        "Don't post your street address.",
        "Never use a credit card to pay for anything online.",
        "Don't post any photos of yourself.",
        "If the site requires your phone number, make sure it will be kept private.",
        "Don't make your birth year public.",
        "Use a fake name and location.",
      ],
      correct: [
        "Don't post your street address.",
        "If the site requires your phone number, make sure it will be kept private.",
        "Don't make your birth year public.",
      ],
    },
    {
      id: 1,
      type: 5,
      question: "Match each digital security threat to its definition.",
      items: [
        "Trojan",
        "Malware",
        "Spyware",
        "Ransomware",
        "Virus",
        "Phishing",
      ],
      targets: [
        "Malicious software that misrepresents itself to appear useful, routine, or interesting in order to persuade a victim to install it.",
        "A broad term that refers to a variety of malicious programs, such as adware, bots, bugs, rootkits, spyware, Trojan horses, viruses, and worms.",
        "Is installed on a computer without the knowledge of the owner in order to collect the owner's private information.",
        "Locks your private computer until a sum of money is paid.",
        "A malicious computer program that replicates by copying itself to another program.",
        "An attempt to deceive someone into sharing sensitive information like passwords and credit card numbers.",
      ],
      correct: {
        Trojan:
          "Malicious software that misrepresents itself to appear useful, routine, or interesting in order to persuade a victim to install it.",
        Malware:
          "A broad term that refers to a variety of malicious programs, such as adware, bots, bugs, rootkits, spyware, Trojan horses, viruses, and worms.",
        Spyware:
          "Is installed on a computer without the knowledge of the owner in order to collect the owner's private information.",
        Ransomware: "Locks your private computer until a sum of money is paid.",
        Virus:
          "A malicious computer program that replicates by copying itself to another program.",
        Phishing:
          "An attempt to deceive someone into sharing sensitive information like passwords and credit card numbers.",
      },
    },
  ],
  level2: [],
  level3: [],
};