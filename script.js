// ============================================
// XAVFSIZLIK MODULI
// ============================================

(function () {
  "use strict";

  // Device va login ma'lumotlari
  const ALLOWED_DEVICES = [
    "web-platform-demo-1",
    "web-platform-demo-2",
    "web-platform-demo-3",
    "test-device-2024",
    "device-a1b2c3",
    "device-x9y8z7",
    "chrome-windows-001",
    "firefox-mac-002",
    "device_1765658529081_fgn1uvpnj",
    "device-103fafd","device-9fb74da"
  ];

  const VALID_CREDENTIALS = {
    username: "student",
    password: "ic3gs6",
  };

  // Xavfsizlik monitoringi
  let securityViolations = 0;
  let isBlocked = false;
  let blockEndTime = null;
  let lastActivityTime = Date.now();

  // ============================================
  // SAVOLLAR MA'LUMOTLAR BAZASI
  // ============================================

  const questions = {
    1: [
      // Level 1 - Computing Fundamentals
      {
        id: 1,
        type: "single",
        question:
          "What is the best way to locate online referencing and attribution sources?",
        options: [
          "School library",
          "Someone else's research paper",
          "Search engines",
          "Social media sites",
        ],
        correct: 2,
        explanation:
          "Search engines like Google Scholar, Bing Academic, and specialized databases are the most effective way to find online referencing and attribution sources.",
        category: "Research Skills",
      },
      {
        id: 2,
        type: "multiple",
        question:
          "You just received a new smartphone and want to ensure that any personal files won't be lost if your phone becomes lost or damaged. You decide to enable auto backup using the cloud service that came with your phone. (Choose three)",
        options: [
          "Text messages",
          "Apps",
          "Photos",
          "Contacts",
          "SIM card",
          "Operating system",
        ],
        correct: [0, 1, 2],
        explanation:
          "Most cloud services automatically backup messages, apps data, and photos. Contacts are often synced separately, SIM card data is limited, and the OS is not typically backed up.",
        category: "Data Backup",
      },
      {
        id: 3,
        type: "multiple",
        question:
          "You just signed up for an account on Google. Your new account uses Single Sign-On (SSO). Which three are benefits of Single Sign-On (SSO)? (Choose three)",
        options: [
          "You have stronger security",
          "After signing on, you can access your email, document storage, apps, and other sites with full access",
          "You only need to remember one set of login details",
          "You can log in without using passwords",
          "Credentials are stored on Amazon, Facebook, and Google",
          "SSO is government owned and operated",
        ],
        correct: [0, 1, 2],
        explanation:
          "SSO provides stronger security through centralized authentication, allows access to multiple services after one login, and reduces password fatigue by requiring only one set of credentials.",
        category: "Authentication",
      },
      {
        id: 4,
        type: "multiple",
        question: "Which two are printing methods? (Choose two)",
        options: [
          "Printing to a PDF file",
          "Printing from the web",
          "Print to a plotter",
          "Print to an email",
          "Print to a DVD",
        ],
        correct: [0, 1],
        explanation:
          "Printing to PDF (creating digital documents) and printing from web browsers are common printing methods in modern computing.",
        category: "Printing",
      },
      {
        id: 5,
        type: "single",
        question:
          "Which of the following is allowed with a CC-BY Creative Commons License?",
        options: [
          "Distributing someone's songs online without attribution",
          "Entering someone else's artwork as your own in an art competition",
          "Displaying a photograph in a classroom presentation without obtaining permission from the photographer",
          "Writing your own opinion and submitting it to a community blog",
        ],
        correct: 2,
        explanation:
          "CC-BY (Creative Commons Attribution) allows you to use, share, and adapt the work as long as you give appropriate credit. Classroom presentation with attribution is acceptable without explicit permission.",
        category: "Copyright",
      },
      {
        id: 6,
        type: "multiple",
        question:
          "You just created an account on a new social media site. Which two statements must you consider before posting and sharing on a social media site? (Choose two)",
        options: [
          "The minimum age requirement on all social media sites is 13 years old",
          "Minimum age requirements may differ on each social media site",
          "You can post and share anything you want on a social media site",
          "All social media sites have the same guidelines you must follow",
          "Each social media site has its own guidelines you must follow",
        ],
        correct: [1, 4],
        explanation:
          "Different social media platforms have different minimum age requirements and unique community guidelines that users must follow.",
        category: "Social Media",
      },
      {
        id: 7,
        type: "multiple",
        question:
          "Why should you avoid posting derogatory memes on social media? (Choose two)",
        options: [
          "Not everyone shares your sense of humor",
          "Negative effects remain permanently available online",
          "It violates copyright",
          "It is against social media Acceptable Use Policies",
        ],
        correct: [0, 1],
        explanation:
          "Derogatory memes can offend others and once posted online, they can persist indefinitely through screenshots and archives, potentially damaging your reputation.",
        category: "Digital Citizenship",
      },
      {
        id: 8,
        type: "multiple",
        question:
          "You have just opened a Facebook account. One of your friends claims she recently had her identity stolen on a social media site, and you don't want that happening to you. Which three precautions should you take to protect your personal data online? (Choose three)",
        options: [
          "Don't post your street address",
          "Never use a credit card to pay for anything online",
          "Don't post any photos of yourself",
          "If the site requires your phone number, make sure it will be kept private",
          "Don't make your birth year public",
          "Use a fake name and location",
        ],
        correct: [0, 4, 5],
        explanation:
          "To protect your identity: avoid sharing your street address, keep birth year private (age can be inferred but exact year adds risk), and consider using pseudonyms to separate online presence from real identity.",
        category: "Privacy",
      },
      {
        id: 9,
        type: "single",
        question:
          "It is the beginning of a new school year. You have been instructed to create a new password to use with your account on the school network. Which of the following should be included in your new password?",
        options: [
          "The name of your current best friend so you won't forget them",
          "Your birthday or social security number to uniquely identify you",
          "The mascot of your favorite sports team to make it easy to remember",
          "At least 8 characters of numbers, symbols, and a mix of uppercase and lowercase letters",
        ],
        correct: 3,
        explanation:
          "Strong passwords should be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols to resist brute-force attacks.",
        category: "Security",
      },
      {
        id: 10,
        type: "single",
        question: "Which of the following is an example of textspeak?",
        options: [
          "Sending a quick text instead of a lengthy email",
          "RU coming 2",
          "Sending a photo as a response to a text message",
          "Speaking into your phone and letting it convert your speaking to text",
        ],
        correct: 1,
        explanation:
          "Textspeak uses abbreviations and shorthand like 'RU' for 'are you' and '2' for 'to' or 'too' to communicate quickly in text messages.",
        category: "Communication",
      },
      {
        id: 11,
        type: "single",
        question:
          "You're having difficulty sending and receiving information. How can you identify whether your device is connected to the Internet?",
        options: [
          "Open a browser and try to load a website",
          "Try sending a text message",
          "Download a Speedtest app",
          "Try saving a file to your hard drive",
        ],
        correct: 0,
        explanation:
          "Opening a browser and attempting to load a known website (like google.com) is the quickest and most reliable way to test internet connectivity.",
        category: "Networking",
      },
      {
        id: 12,
        type: "single",
        question:
          "One of your teachers said you should change your browser settings to use private mode browsing. What are the benefits of private mode browsing?",
        options: [
          "No history, cookies, passwords, or temporary files are recorded on the computer",
          "Your computer login and password are disabled",
          "The packets sent/received across your school network cannot be seen",
          "Your name is kept private from websites",
        ],
        correct: 0,
        explanation:
          "Private/Incognito mode prevents your browser from storing local data like history, cookies, and temporary files, but does not make you anonymous online.",
        category: "Privacy",
      },
      {
        id: 13,
        type: "single",
        question:
          "Which of the following demonstrates the use of inclusive language?",
        options: [
          "Hey, bros! Where are we meeting?",
          "Hey, everyone! Where are we meeting?",
          "Hey, girlfriends! Where are we meeting?",
          "Hi, guys! Where are we meeting?",
        ],
        correct: 1,
        explanation:
          "Inclusive language like 'everyone' avoids gender-specific terms and makes all participants feel welcome and included.",
        category: "Digital Etiquette",
      },
      {
        id: 14,
        type: "multiple",
        question:
          "There are three primary desktop computer operating systems: Windows, macOS, and Linux. What are three main functions that all computer operating systems have in common? (Choose three)",
        options: [
          "Provide services for application software",
          "Provide 100% hack-proof security",
          "Manage resources, such as CPU, memory, disk drives, and peripherals",
          "Provide a user interface",
          "Manage telephone and messaging services",
          "Provide video gaming capabilities",
        ],
        correct: [0, 2, 3],
        explanation:
          "All operating systems: 1) provide APIs and services for applications, 2) manage hardware resources, and 3) provide a user interface for interaction.",
        category: "Operating Systems",
      },
      {
        id: 15,
        type: "multiple",
        question:
          "You have a smartphone. In class today, you and your friends learned about personal security issues associated with navigation tracking. Which two common online activities expose your personal security by navigation tracking? (Choose two)",
        options: [
          "Uploading a vacation photo from last summer",
          "Posting location information with a selfie you just photographed",
          "'Checking in' your physical location on social media sites",
          "Posting to a blog about your hobbies",
          "Playing online games anonymously",
        ],
        correct: [1, 2],
        explanation:
          "Real-time location sharing through photo geotags and social media check-ins can expose your current location to potential threats.",
        category: "Location Privacy",
      },
      {
        id: 16,
        type: "multiple",
        question:
          "Your teacher has cautioned you about protecting your online identity. Which three activities help define your digital identity? (Choose three)",
        options: [
          "Having multiple email accounts",
          "Media posted by other people that you share with your friends",
          "Comments you post or tweet",
          "Only posting from a phone, never from a computer",
          "Your profile information on social networks",
          "Using Twitter and Snapchat instead of Facebook",
        ],
        correct: [1, 2, 4],
        explanation:
          "Your digital identity is shaped by content you share, comments you make, and your profile information across various platforms.",
        category: "Digital Identity",
      },
      {
        id: 17,
        type: "single",
        question:
          "You have a smartphone. Your friends have discovered an app that can show on a map where the smartphone of each friend is located. They want you to download the same app so they can know your location at all times. What technology is used by an app that can map the location of your smartphone?",
        options: [
          "Navigation Tracking (GPS)",
          "Spyware",
          "Social Media integration",
          "Cellular triangulation only",
        ],
        correct: 0,
        explanation:
          "Navigation tracking uses GPS (Global Positioning System) satellites to determine precise device location, often combined with Wi-Fi and cellular data for accuracy.",
        category: "Location Services",
      },
      {
        id: 18,
        type: "single",
        question:
          "Which of the following would be a feature of a good network infrastructure for a school?",
        options: [
          "Easily scales the network as the student population grows",
          "Acceptable Use Policy is not required",
          "Allows anyone to access the network from anywhere",
          "Supports anonymous logins for all users",
        ],
        correct: 0,
        explanation:
          "Scalability is crucial for school networks to accommodate growing numbers of devices and users without performance degradation.",
        category: "Networking",
      },
      {
        id: 19,
        type: "multiple",
        question:
          "When citing information published on the web, you should include a retrieval statement indicating when and where on the web you accessed the information. Which three items should you include in your citation retrieval statement? (Choose three)",
        options: [
          "Date the page was originally posted",
          "Name of the author or organization",
          "Name of the website",
          "URL or web address of the site",
          "Topic you were searching for",
          "Date you accessed the website",
        ],
        correct: [1, 2, 3],
        explanation:
          "Proper web citations typically include: author/organization name, website name, and the full URL where the information was found.",
        category: "Research",
      },
      {
        id: 20,
        type: "multiple",
        question:
          "You take a lot of digital photos and need more storage space. You decide to expand the data storage on your computer. Which three are types of data storage? (Choose three)",
        options: [
          "Hard Disk Drive (HDD)",
          "ROM (Read-Only Memory)",
          "Solid State Drive (SSD)",
          "USB Flash Drive",
          "Flash ROM",
          "RAM (Random Access Memory)",
        ],
        correct: [0, 2, 3],
        explanation:
          "HDDs, SSDs, and USB flash drives are persistent storage devices that retain data when powered off. ROM and RAM are not user-expandable storage for photos.",
        category: "Hardware",
      },
      {
        id: 21,
        type: "single",
        question:
          "A pandemic has temporarily closed your school, so your lessons are being taught online. Your teacher has scheduled classes using video software that displays each student on screen and allows the student to speak to the entire class. You are participating in these classroom sessions from your computer device at home. You must follow appropriate digital etiquette standards during these video classes. Which of the following demonstrates proper digital etiquette for visual collaboration?",
        options: [
          "Limit the use of emojis and emoticons",
          "Do not use textspeak in chat",
          "Do not use all caps when it is your turn to speak because it is like shouting",
          "When it is your turn to speak, introduce yourself and look at the onscreen image of the person you are addressing",
        ],
        correct: 3,
        explanation:
          "Proper video conference etiquette includes identifying yourself before speaking and maintaining eye contact by looking at the camera or the person you're addressing.",
        category: "Digital Etiquette",
      },
      {
        id: 22,
        type: "single",
        question: "What is your digital footprint?",
        options: [
          "Comments, images, and other information you post online",
          "Digital signature used for document authentication",
          "A biometric used to log in to an account",
          "Personal information about you stored in government databases",
        ],
        correct: 0,
        explanation:
          "Your digital footprint consists of all the traces you leave online through posts, comments, shares, and interactions on the internet.",
        category: "Digital Identity",
      },
      {
        id: 23,
        type: "multiple",
        question:
          "Which two statements about synchronous and asynchronous communication are true? (Choose two)",
        options: [
          "Asynchronous is more expensive than synchronous communication",
          "Asynchronous communication does not use real-time synchronization, such as email or texting",
          "Asynchronous communication is faster than synchronous",
          "Synchronous communication is in real-time, such as a phone call or video chat",
          "Synchronous communication is old technology and no longer used",
        ],
        correct: [1, 3],
        explanation:
          "Synchronous communication happens in real-time (phone calls, video chats). Asynchronous communication has delays between messages (email, forum posts).",
        category: "Communication",
      },
      {
        id: 24,
        type: "multiple",
        question: "Which two are common print settings? (Choose two)",
        options: [
          "Printing three lines at a time",
          "Transparent printing",
          "Slides per page",
          "Pages per sheet",
          "Printing two lines at a time",
        ],
        correct: [2, 3],
        explanation:
          "Common print settings include choosing how many slides per page (for presentations) and pages per sheet (to save paper by printing multiple pages on one sheet).",
        category: "Printing",
      },
      {
        id: 25,
        type: "single",
        question: "Which of the following is an example of cyberbullying?",
        options: [
          "Writing an opinion article about unfair requirements of cheerleader tryouts and submitting it to your school news website",
          "Stealing someone's password and pretending to be that person while tweeting or posting things online",
          "Posting songs of your favorite artists online and charging friends money to download them",
          "Helping a friend by posting researched articles about bullying to their blog",
        ],
        correct: 1,
        explanation:
          "Identity theft and impersonation online with intent to harm or embarrass someone is a form of cyberbullying and is illegal in many jurisdictions.",
        category: "Cyberbullying",
      },
      {
        id: 26,
        type: "single",
        question:
          "A post on Facebook makes some statements that are being shared by numerous people. How can you determine whether the statements are true?",
        options: [
          "Everything posted on the Internet is true",
          "If I want to believe it, the information must be true",
          "Search for the information online and try to find the original source",
          "If lots of people are sharing and commenting, the information must be true",
        ],
        correct: 2,
        explanation:
          "Verify information by cross-referencing multiple reliable sources and tracing claims back to their original source before accepting them as true.",
        category: "Information Literacy",
      },
      {
        id: 27,
        type: "single",
        question:
          "Why should you avoid posting demeaning photographs, harassing people, or advocating negative ideas like suicide or terrorism online?",
        options: [
          "You could be fined",
          "You might anger the wrong people",
          "Your online identity is formed by what you post",
          "It is illegal in most countries",
        ],
        correct: 2,
        explanation:
          "Everything you post contributes to your permanent digital reputation, which can affect future opportunities in education and employment.",
        category: "Digital Citizenship",
      },
      {
        id: 28,
        type: "multiple",
        question:
          "Your teacher instructs you to edit a classmate's research paper. Which two tools should you use? (Choose two)",
        options: [
          "Design mode",
          "Spelling and grammar checker",
          "Linked notes",
          "Comments and track changes",
        ],
        correct: [1, 3],
        explanation:
          "Use spelling/grammar checkers to catch errors and comments/track changes to provide feedback without altering the original text permanently.",
        category: "Productivity Tools",
      },
      {
        id: 29,
        type: "multiple",
        question:
          "When using an app, network, or service, you may be required to agree to an Acceptable Use Policy. What are two types of information that an Acceptable Use Policy describes? (Choose two)",
        options: [
          "The consequences of violating the policy",
          "Unacceptable uses of the app, network, or service",
          "Uncopyrighted data that you submit to the app, network, or service",
          "How to monetize information through the app, network, or service",
        ],
        correct: [0, 1],
        explanation:
          "An Acceptable Use Policy (AUP) outlines what constitutes unacceptable use and the consequences for violating those rules.",
        category: "Policies",
      },
      {
        id: 30,
        type: "single",
        question:
          "What mental health issue can excessive social media use potentially lead to?",
        options: [
          "Improved social connections",
          "Enhanced emotional resilience",
          "Increased risk of mood swings and anxiety",
          "Heightened feelings of happiness",
        ],
        correct: 2,
        explanation:
          "Excessive social media use has been linked to increased anxiety, depression, and mood swings due to social comparison and FOMO (fear of missing out).",
        category: "Digital Wellness",
      },
      {
        id: 31,
        type: "single",
        question: "What is a benefit of 'in private' or 'incognito' browsing?",
        options: [
          "Your web browser allows you to change your IP address",
          "Your web browser permits visits to websites that are normally blocked",
          "Your web browser blocks all advertisements",
          "Your web browser hides your browsing activity from other people who use the same device",
        ],
        correct: 3,
        explanation:
          "Private browsing only prevents local storage of history and cookies, making it useful for shared computers but does not provide anonymity online.",
        category: "Privacy",
      },
      {
        id: 32,
        type: "single",
        question:
          "You need to store a list of web pages so you can easily return to them later. What web browser feature or setting should you use?",
        options: [
          "Favorites or Bookmarks",
          "History or Timeline",
          "Tabbed Browsing",
          "Address box autocomplete",
        ],
        correct: 0,
        explanation:
          "Bookmarks (or Favorites) allow you to save and organize web addresses for quick access later.",
        category: "Web Browsing",
      },
      {
        id: 33,
        type: "multiple",
        question:
          "You are conducting online research. You need to refine your search to return results that are more relevant to your research subject. Which two techniques should you use? (Choose two)",
        options: [
          "Enclose multi-word search terms in quotation marks",
          "Search for generic terms only",
          "Capitalize important terms",
          "Use minus sign to exclude unwanted terms",
          "Always use full sentences",
        ],
        correct: [0, 3],
        explanation:
          "Use quotation marks for exact phrases and minus sign (-) to exclude unwanted terms for more precise search results.",
        category: "Research Skills",
      },
      {
        id: 34,
        type: "single",
        question:
          "You need to download a file to use on your Windows computer. Which file extension will work directly on your computer?",
        options: [
          ".pkg (macOS installer)",
          ".dmg (macOS disk image)",
          ".deb (Linux package)",
          ".exe (Windows executable)",
        ],
        correct: 3,
        explanation:
          "Windows computers run .exe (executable) files directly. Other extensions are specific to different operating systems.",
        category: "File Management",
      },
      {
        id: 35,
        type: "multiple",
        question:
          "You have written an original recipe that you want to share on social media. Your recipe includes a paragraph describing the dish, a list of ingredients, step-by-step instructions, and screen photos. Which guidelines will most likely impact where you are able to share your recipe online? (Choose two)",
        options: [
          "Some social media sites have character limits on posts",
          "Some social media sites do not allow formatted lists",
          "Some social media sites prohibit sharing recipes",
          "Some social media sites have video length restrictions",
        ],
        correct: [0, 1],
        explanation:
          "Platform limitations like character counts and formatting restrictions may affect how you can present your recipe content.",
        category: "Social Media",
      },
    ],
  };

  // ============================================
  // XAVFSIZLIK FUNKSIYALARI
  // ============================================

  // Nusxa olishni bloklash
  function preventCopy() {
    document.addEventListener("copy", function (e) {
      e.preventDefault();
      logSecurityViolation("COPY_ATTEMPT");
      showSecurityWarning("Nusxa olish taqiqlangan!");
      return false;
    });

    document.addEventListener("cut", function (e) {
      e.preventDefault();
      logSecurityViolation("CUT_ATTEMPT");
      showSecurityWarning("Kesib olish taqiqlangan!");
      return false;
    });

    document.addEventListener("paste", function (e) {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        e.preventDefault();
        logSecurityViolation("PASTE_ATTEMPT");
        showSecurityWarning("Yopishtirish taqiqlangan!");
        return false;
      }
    });

    document.addEventListener("contextmenu", function (e) {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        e.preventDefault();
        logSecurityViolation("CONTEXT_MENU_ATTEMPT");
        return false;
      }
    });

    // Keyboard shortcuts ni bloklash
    document.addEventListener("keydown", function (e) {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;

      // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, PrintScreen
      if (e.ctrlKey || e.metaKey) {
        if (
          e.key === "c" ||
          e.key === "C" ||
          e.key === "v" ||
          e.key === "V" ||
          e.key === "x" ||
          e.key === "X" ||
          e.key === "p" ||
          e.key === "P"
        ) {
          e.preventDefault();
          logSecurityViolation("KEYBOARD_SHORTCUT_" + e.key.toUpperCase());
          showSecurityWarning("Bu amal taqiqlangan!");
          return false;
        }
      }

      // PrintScreen
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        logSecurityViolation("PRINT_SCREEN_ATTEMPT");
        showSecurityWarning("Screenshot olish taqiqlangan!");
        return false;
      }
    });
  }

  // Ekran o'lchami o'zgarishini monitoring qilish (developer tools ochilganda)
  function detectDevTools() {
    let devToolsOpen = false;
    const threshold = 160;

    setInterval(function () {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;

      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          logSecurityViolation("DEV_TOOLS_DETECTED");
          handleDevToolsOpen();
        }
      } else {
        devToolsOpen = false;
      }
    }, 1000);
  }

  // Developer tools ochilganda
  function handleDevToolsOpen() {
    securityViolations += 2;
    showSecurityWarning("Xavfsizlik xatosi: Developer Tools aniqlangan!");

    if (securityViolations >= 5) {
      blockUser("Developer tools dan foydalanish");
    }
  }

  // Xavfsizlik buzilishini qayd etish
  function logSecurityViolation(type) {
    securityViolations++;
    console.warn(`[SECURITY] ${type} - Violation #${securityViolations}`);

    const violations = JSON.parse(
      localStorage.getItem("securityViolations") || "[]",
    );
    violations.push({
      type: type,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
    localStorage.setItem("securityViolations", JSON.stringify(violations));

    if (securityViolations >= 3) {
      blockUser("Haddan tashqari xavfsizlik buzilishi");
    }
  }

  // Foydalanuvchini bloklash
  function blockUser(reason) {
    if (isBlocked) return;

    isBlocked = true;
    blockEndTime = Date.now() + 5 * 60 * 1000; // 5 daqiqa blok

    localStorage.setItem("isBlocked", "true");
    localStorage.setItem("blockEndTime", blockEndTime);
    localStorage.setItem("blockReason", reason);

    // Bloklangan ekranini ko'rsatish
    showBlockScreen(reason);

    // Logout qilish
    currentUser = null;
    localStorage.removeItem("currentUser");
  }

  // Bloklangan ekranini ko'rsatish
  function showBlockScreen(reason) {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block-screen";
    blockDiv.innerHTML = `
            <div class="block-content">
                <i class="fas fa-shield-alt fa-4x" style="color: #e74c3c;"></i>
                <h2>Platforma bloklandi!</h2>
                <p>Sabab: ${reason}</p>
                <p>Blok vaqti: 5 daqiqa</p>
                <p class="small">Xavfsizlik qoidalarini buzganingiz uchun platformadan vaqtinchalik bloklandingiz.</p>
                <div class="countdown">00:05:00</div>
            </div>
        `;

    document.body.appendChild(blockDiv);

    // Countdown
    const countdownEl = blockDiv.querySelector(".countdown");
    const interval = setInterval(() => {
      const remaining = blockEndTime - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        blockDiv.remove();
        isBlocked = false;
        localStorage.removeItem("isBlocked");
        localStorage.removeItem("blockEndTime");
        showSection("login-section");
      } else {
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        countdownEl.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }, 1000);
  }

  // Xavfsizlik ogohlantirishi
  function showSecurityWarning(message) {
    const warning = document.createElement("div");
    warning.className = "security-warning";
    warning.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(warning);

    setTimeout(() => {
      warning.classList.add("fade-out");
      setTimeout(() => warning.remove(), 500);
    }, 2000);
  }

  // ============================================
  // PLATFORMA FUNKSIYALARI
  // ============================================

  let currentUser = null;
  let currentLevel = 1;
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let questionChecked = {};
  let testStartTime = null;
  let currentResults = {
    total: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    percentage: 0,
  };

  // Device ID generatsiya qilish
  function generateDeviceId() {
    const navigatorInfo =
      navigator.userAgent +
      navigator.language +
      screen.width +
      screen.height +
      new Date().getTimezoneOffset();
    let hash = 0;
    for (let i = 0; i < navigatorInfo.length; i++) {
      const char = navigatorInfo.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return "device-" + Math.abs(hash).toString(16).substring(0, 8);
  }

  // Device ID ni tekshirish
  function checkDevice() {
    const deviceId = localStorage.getItem("deviceId") || generateDeviceId();
    localStorage.setItem("deviceId", deviceId);
    document.getElementById("device-id-display").textContent = deviceId;

    const isAllowed = ALLOWED_DEVICES.some((device) =>
      deviceId.includes(device.substring(0, 8)),
    );
    return isAllowed;
  }

  // Login form
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Bloklanganligini tekshirish
      if (localStorage.getItem("isBlocked") === "true") {
        const blockEnd = parseInt(localStorage.getItem("blockEndTime"));
        if (Date.now() < blockEnd) {
          showBlockScreen(localStorage.getItem("blockReason"));
          return;
        } else {
          localStorage.removeItem("isBlocked");
          localStorage.removeItem("blockEndTime");
        }
      }

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const errorDiv = document.getElementById("login-error");

      if (!checkDevice()) {
        errorDiv.textContent = "⚠️ Bu qurilmadan kirish ruxsat etilmagan!";
        return;
      }

      if (
        username === VALID_CREDENTIALS.username &&
        password === VALID_CREDENTIALS.password
      ) {
        currentUser = {
          username,
          loginTime: new Date().toISOString(),
          deviceId: localStorage.getItem("deviceId"),
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showSection("level-section");
        errorDiv.textContent = "";

        // Xavfsizlik monitoringini boshlash
        startSecurityMonitoring();

        showNotification("success", "Tizimga muvaffaqiyatli kirdingiz!");
      } else {
        errorDiv.textContent = "❌ Login yoki parol noto'g'ri!";
        logSecurityViolation("INVALID_LOGIN_ATTEMPT");
      }
    });

  // Xavfsizlik monitoringini boshlash
  function startSecurityMonitoring() {
    preventCopy();
    detectDevTools();

    // Tab visibility change
    document.addEventListener("visibilitychange", function () {
      if (
        document.hidden &&
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("TAB_SWITCH");
        showSecurityWarning("Boshqa tabga o'tish aniqlandi!");
      }
    });

    // Window blur (boshqa oynaga o'tish)
    window.addEventListener("blur", function () {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("WINDOW_BLUR");
      }
    });

    // Mouse leaving window
    document.addEventListener("mouseleave", function () {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("MOUSE_LEAVE_WINDOW");
      }
    });
  }

  // Level tanlash
  document.querySelectorAll(".start-level-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const level = parseInt(this.dataset.level);
      startLevel(level);
    });
  });

  // Levelni boshlash
  function startLevel(level) {
    if (!questions[level]) {
      showNotification("error", `${level}-level uchun savollar topilmadi!`);
      return;
    }

    currentLevel = level;
    currentQuestionIndex = 0;
    userAnswers = {};
    questionChecked = {};
    testStartTime = Date.now();

    // document.getElementById("level-number").textContent = level;
    document.getElementById("current-level-title").innerHTML =
      `Level ${level}: ${getLevelName(level)}`;
    updateProgress();
    loadQuestion();
    showSection("test-section");

    showNotification(
      "info",
      `${getLevelName(level)} boshlandi. ${questions[level].length} ta savol mavjud.`,
    );
  }

  // Level nomini olish
  function getLevelName(level) {
    const names = {
      1: "Computing Fundamentals",
      2: "Key Applications",
      3: "Living Online",
    };
    return names[level] || `Level ${level}`;
  }

  // Savolni yuklash
  function loadQuestion() {
    const levelQuestions = questions[currentLevel];
    if (!levelQuestions || levelQuestions.length === 0) return;

    const question = levelQuestions[currentQuestionIndex];
    const optionsContainer = document.getElementById("options-container");
    const feedbackDiv = document.getElementById("feedback-message");

    // Reset
    optionsContainer.style.display = "flex";
    optionsContainer.innerHTML = "";
    // feedbackDiv.innerHTML = "";
    // feedbackDiv.className = "feedback-message";

    // Savol matni
    document.getElementById("question-text").textContent = question.question;

    // Kategoriya
    const categorySpan = document.getElementById("question-category");
    if (categorySpan) {
      categorySpan.textContent = question.category || "General";
    }

    // Savol raqami
    document.getElementById("question-counter").textContent =
      `${currentQuestionIndex + 1}/${levelQuestions.length}`;

    // Savol turi ikonkasi
    const typeIcon = document.getElementById("question-type-icon");
    typeIcon.innerHTML = getQuestionTypeIcon(question.type);

    // Variantlarni render qilish
    renderOptions(question);

    // Avvalgi javobni tiklash
    const savedAnswer = userAnswers[`${currentLevel}_${question.id}`];
    if (savedAnswer !== undefined) {
      restoreAnswer(question, savedAnswer);
    }

    // Tugmalarni yangilash
    updateNavButtons();

    // Tekshirish tugmasi
    document.getElementById("check-btn").disabled =
      !hasSelectedAnswer(question);
  }

  // Savol turi ikonkasi
  function getQuestionTypeIcon(type) {
    const icons = {
      single: '<i class="fas fa-dot-circle" style="color: #4a90e2;"></i>',
      multiple: '<i class="fas fa-check-square" style="color: #f39c12;"></i>',
      truefalse: '<i class="fas fa-toggle-on" style="color: #27ae60;"></i>',
    };
    return icons[type] || '<i class="fas fa-question-circle"></i>';
  }

  // Variantlarni render qilish
  function renderOptions(question) {
    const container = document.getElementById("options-container");

    question.options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option-item";

      const input = document.createElement("input");
      input.type = question.type === "multiple" ? "checkbox" : "radio";
      input.name = "question-option";
      input.value = index;
      input.id = `option-${index}`;

      if (question.type === "single" || question.type === "truefalse") {
        input.addEventListener("change", () => {
          document.querySelectorAll(".option-item").forEach((item) => {
            item.classList.remove("selected");
          });
          optionDiv.classList.add("selected");
          document.getElementById("check-btn").disabled = false;
        });
      } else {
        input.addEventListener("change", () => {
          if (input.checked) {
            optionDiv.classList.add("selected");
          } else {
            optionDiv.classList.remove("selected");
          }
          document.getElementById("check-btn").disabled =
            !hasSelectedAnswer(question);
        });
      }

      const label = document.createElement("label");
      label.htmlFor = `option-${index}`;
      label.className = "option-text";
      label.textContent = option;

      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      container.appendChild(optionDiv);
    });
  }

  // Javobni tekshirish
  document.getElementById("check-btn").addEventListener("click", function () {
    const levelQuestions = questions[currentLevel];
    const question = levelQuestions[currentQuestionIndex];
    const feedbackDiv = document.getElementById("feedback-message");

    let isCorrect = false;
    let userAnswer = null;

    switch (question.type) {
      case "single":
      case "truefalse":
        const selectedRadio = document.querySelector(
          'input[name="question-option"]:checked',
        );
        if (selectedRadio) {
          userAnswer = parseInt(selectedRadio.value);
          isCorrect = userAnswer === question.correct;
        }
        break;

      case "multiple":
        const selectedCheckboxes = Array.from(
          document.querySelectorAll('input[name="question-option"]:checked'),
        ).map((cb) => parseInt(cb.value));
        userAnswer = selectedCheckboxes.sort((a, b) => a - b);
        const correctSorted = question.correct.sort((a, b) => a - b);
        isCorrect =
          JSON.stringify(userAnswer) === JSON.stringify(correctSorted);
        break;
    }

    // Javobni saqlash
    userAnswers[`${currentLevel}_${question.id}`] = userAnswer;
    questionChecked[`${currentLevel}_${question.id}`] = true;

    // Feedback ko'rsatish
    // feedbackDiv.innerHTML = `
    //         <i class="fas ${isCorrect ? "fa-check-circle" : "fa-times-circle"}"></i>
    //         <strong>${isCorrect ? "To'g'ri!" : "Noto'g'ri!"}</strong>
    //         <p style="margin-top: 10px; font-size: 14px; color: #666;">${question.explanation || ""}</p>
    //     `;
    // feedbackDiv.className = `feedback-message ${isCorrect ? "correct" : "incorrect"}`;

    // Javoblarni belgilash
    markAnswers(question, isCorrect, userAnswer);

    // Natijalarni yangilash
    calculateResults(currentLevel);

    // Keyingi tugmani aktivlashtirish
    document.getElementById("next-btn").disabled = false;
    this.disabled = true;

    // Mini natijalarni ko'rsatish
    showMiniResults();
  });

  // Javoblarni belgilash
  function markAnswers(question, isCorrect, userAnswer) {
    if (question.type === "single" || question.type === "truefalse") {
      document.querySelectorAll(".option-item").forEach((item, index) => {
        item.classList.remove("correct", "incorrect");
        if (index === question.correct) {
          item.classList.add("correct");
        } else if (index === userAnswer && !isCorrect) {
          item.classList.add("incorrect");
        }
      });
    } else if (question.type === "multiple") {
      document.querySelectorAll(".option-item").forEach((item, index) => {
        item.classList.remove("correct", "incorrect");
        if (question.correct.includes(index)) {
          item.classList.add("correct");
        } else if (
          Array.isArray(userAnswer) &&
          userAnswer.includes(index) &&
          !question.correct.includes(index)
        ) {
          item.classList.add("incorrect");
        }
      });
    }
  }

  // Javob tanlanganligini tekshirish
  function hasSelectedAnswer(question) {
    switch (question.type) {
      case "single":
      case "truefalse":
        return (
          document.querySelector('input[name="question-option"]:checked') !==
          null
        );
      case "multiple":
        return (
          document.querySelectorAll('input[name="question-option"]:checked')
            .length > 0
        );
      default:
        return true;
    }
  }

  // Avvalgi javobni tiklash
  function restoreAnswer(question, answer) {
    switch (question.type) {
      case "single":
      case "truefalse":
        const radio = document.querySelector(`input[value="${answer}"]`);
        if (radio) {
          radio.checked = true;
          radio.closest(".option-item").classList.add("selected");
        }
        break;
      case "multiple":
        if (Array.isArray(answer)) {
          answer.forEach((val) => {
            const cb = document.querySelector(`input[value="${val}"]`);
            if (cb) {
              cb.checked = true;
              cb.closest(".option-item").classList.add("selected");
            }
          });
        }
        break;
    }

    if (questionChecked[`${currentLevel}_${question.id}`]) {
      const isCorrect = checkAnswer(question, answer);
      markAnswers(question, isCorrect, answer);
      document.getElementById("next-btn").disabled = false;
    }
  }

  // Javobni tekshirish (belgilamasdan)
  function checkAnswer(question, answer) {
    if (question.type === "single" || question.type === "truefalse") {
      return answer === question.correct;
    } else if (question.type === "multiple") {
      if (!Array.isArray(answer)) return false;
      const sortedAnswer = [...answer].sort((a, b) => a - b);
      const sortedCorrect = [...question.correct].sort((a, b) => a - b);
      return JSON.stringify(sortedAnswer) === JSON.stringify(sortedCorrect);
    }
    return false;
  }

  // Natijalarni hisoblash
  function calculateResults(level) {
    const levelQuestions = questions[level];
    let correct = 0;
    let total = levelQuestions.length;
    let attempted = 0;

    levelQuestions.forEach((question) => {
      const answer = userAnswers[`${level}_${question.id}`];
      if (answer !== undefined) {
        attempted++;
        if (checkAnswer(question, answer)) {
          correct++;
        }
      }
    });

    currentResults = {
      total: total,
      correct: correct,
      incorrect: attempted - correct,
      skipped: total - attempted,
      percentage: attempted > 0 ? Math.round((correct / total) * 100) : 0,
    };

    return currentResults;
  }

  // Mini natijalarni ko'rsatish
  function showMiniResults() {
    const results = calculateResults(currentLevel);
    const existingMini = document.querySelector(".mini-results");

    if (existingMini) {
      existingMini.remove();
    }

    const miniDiv = document.createElement("div");
    miniDiv.className = "mini-results";
    miniDiv.innerHTML = `
            <div class="mini-item correct">
                <i class="fas fa-check-circle"></i>
                <span>${results.correct}</span>
            </div>
            <div class="mini-item incorrect">
                <i class="fas fa-times-circle"></i>
                <span>${results.incorrect}</span>
            </div>
            <div class="mini-item skipped">
                <i class="fas fa-forward"></i>
                <span>${results.skipped}</span>
            </div>
            <div class="mini-item percentage ${results.percentage >= 70 ? "good" : results.percentage >= 50 ? "average" : "poor"}">
                <i class="fas fa-percent"></i>
                <span>${results.percentage}%</span>
            </div>
        `;

    document.querySelector(".test-header").appendChild(miniDiv);
  }

  // Keyingi savol
  document.getElementById("next-btn").addEventListener("click", function () {
    const levelQuestions = questions[currentLevel];

    if (currentQuestionIndex < levelQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
      updateProgress();
    } else {
      // Test tugadi
      showTestCompleteDialog();
    }
  });

  // Oldingi savol
  document.getElementById("prev-btn").addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
      updateProgress();
    }
  });

  // Progressni yangilash
  function updateProgress() {
    const levelQuestions = questions[currentLevel];
    const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;
    document.getElementById("progress-fill").style.width = `${progress}%`;
  }

  // Tugmalarni yangilash
  function updateNavButtons() {
    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;

    const question = questions[currentLevel][currentQuestionIndex];
    const isChecked = questionChecked[`${currentLevel}_${question.id}`];
    document.getElementById("next-btn").disabled = !isChecked;
  }

  // Test tugagan dialog
  function showTestCompleteDialog() {
    const results = calculateResults(currentLevel);
    const timeSpent = Math.floor((Date.now() - testStartTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    const dialog = document.createElement("div");
    dialog.className = "test-complete-dialog";
    dialog.innerHTML = `
            <div class="dialog-content">
                <i class="fas fa-trophy"></i>
                <h2>Tabriklaymiz!</h2>
                <p>Siz Level ${currentLevel} testini yakunladingiz</p>
                <p class="time-spent"><i class="fas fa-clock"></i> Vaqt: ${minutes}:${seconds.toString().padStart(2, "0")}</p>
                
                <div class="final-results">
                    <div class="final-result-item">
                        <span class="label">Jami savollar:</span>
                        <span class="value">${results.total}</span>
                    </div>
                    <div class="final-result-item">
                        <span class="label">To'g'ri javoblar:</span>
                        <span class="value correct">${results.correct}</span>
                    </div>
                    <div class="final-result-item">
                        <span class="label">Noto'g'ri javoblar:</span>
                        <span class="value incorrect">${results.incorrect}</span>
                    </div>
                    <div class="final-result-item">
                        <span class="label">O'tkazib yuborilgan:</span>
                        <span class="value skipped">${results.skipped}</span>
                    </div>
                    <div class="final-result-item total-score">
                        <span class="label">Umumiy natija:</span>
                        <span class="value score ${results.percentage >= 70 ? "good" : results.percentage >= 50 ? "average" : "poor"}">${results.percentage}%</span>
                    </div>
                </div>
                
                <div class="dialog-buttons">
                    <button class="view-details-btn" onclick="showResults()">
                        <i class="fas fa-chart-bar"></i> Batafsil
                    </button>
                    <button class="back-to-levels-btn" onclick="showSection('level-section')">
                        <i class="fas fa-layer-group"></i> Levellarga qaytish
                    </button>
                    <button class="restart-btn" onclick="restartLevel()">
                        <i class="fas fa-redo"></i> Qayta boshlash
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(dialog);

    // Natijalarni saqlash
    saveResultsToStorage();

    // Avtomatik yopilish
    setTimeout(() => {
      dialog.classList.add("fade-out");
      setTimeout(() => dialog.remove(), 500);
    }, 10000);
  }

  // Natijalarni saqlash
  function saveResultsToStorage() {
    const savedResults = JSON.parse(
      localStorage.getItem("testResults") || "{}",
    );
    savedResults[`level_${currentLevel}_${new Date().toISOString()}`] = {
      level: currentLevel,
      levelName: getLevelName(currentLevel),
      results: currentResults,
      date: new Date().toISOString(),
      timeSpent: Date.now() - testStartTime,
      user: currentUser?.username,
      deviceId: localStorage.getItem("deviceId"),
    };
    localStorage.setItem("testResults", JSON.stringify(savedResults));
  }

  // Natijalarni ko'rsatish
  window.showResults = function () {
    const results = calculateResults(currentLevel);
    const resultsDiv = document.createElement("div");
    resultsDiv.className = "results-panel";
    resultsDiv.innerHTML = `
            <div class="results-header">
                <i class="fas fa-chart-bar"></i>
                <h3>Level ${currentLevel} Natijalari</h3>
                <button class="close-results"><i class="fas fa-times"></i></button>
            </div>
            <div class="results-grid">
                <div class="result-item total">
                    <span class="result-label">Jami savollar:</span>
                    <span class="result-value">${results.total}</span>
                </div>
                <div class="result-item correct">
                    <span class="result-label"><i class="fas fa-check-circle"></i> To'g'ri:</span>
                    <span class="result-value">${results.correct}</span>
                </div>
                <div class="result-item incorrect">
                    <span class="result-label"><i class="fas fa-times-circle"></i> Noto'g'ri:</span>
                    <span class="result-value">${results.incorrect}</span>
                </div>
                <div class="result-item skipped">
                    <span class="result-label"><i class="fas fa-forward"></i> O'tkazib yuborilgan:</span>
                    <span class="result-value">${results.skipped}</span>
                </div>
                <div class="result-item percentage">
                    <span class="result-label"><i class="fas fa-percent"></i> Foiz:</span>
                    <span class="result-value">${results.percentage}%</span>
                </div>
            </div>
            <div class="progress-circle">
                <svg viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#eee" stroke-width="3"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#4CAF50" stroke-width="3"
                        stroke-dasharray="${results.percentage}, 100"/>
                </svg>
                <div class="percentage-text">${results.percentage}%</div>
            </div>
            <div class="results-footer">
                <button class="restart-level-btn" onclick="restartLevel()">
                    <i class="fas fa-redo"></i> Qayta boshlash
                </button>
                <button class="view-answers-btn" onclick="viewAnswers()">
                    <i class="fas fa-eye"></i> Javoblarni ko'rish
                </button>
            </div>
        `;

    document.querySelector(".question-card").appendChild(resultsDiv);

    resultsDiv
      .querySelector(".close-results")
      .addEventListener("click", function () {
        resultsDiv.remove();
      });
  };

  // Levelni qayta boshlash
  window.restartLevel = function () {
    if (
      confirm(
        "Testni qayta boshlashga ishonchingiz komilmi? Barcha javoblar o'chiriladi.",
      )
    ) {
      userAnswers = {};
      questionChecked = {};
      currentQuestionIndex = 0;
      testStartTime = Date.now();
      loadQuestion();
      updateProgress();
      document.querySelector(".results-panel")?.remove();
      document.querySelector(".test-complete-dialog")?.remove();
      showNotification("info", "Test qayta boshlandi");
    }
  };

  // Javoblarni ko'rish
  window.viewAnswers = function () {
    const answersDiv = document.createElement("div");
    answersDiv.className = "answers-panel";

    let answersHtml =
      '<div class="answers-header"><h3>Javoblar tahlili</h3><button class="close-answers"><i class="fas fa-times"></i></button></div>';
    answersHtml += '<div class="answers-list">';

    const levelQuestions = questions[currentLevel];
    levelQuestions.forEach((question, index) => {
      const answer = userAnswers[`${currentLevel}_${question.id}`];
      const isCorrect = answer !== undefined && checkAnswer(question, answer);

      answersHtml += `
                <div class="answer-item ${isCorrect ? "correct" : "incorrect"}">
                    <div class="answer-number">${index + 1}</div>
                    <div class="answer-details">
                        <div class="answer-question">${question.question.substring(0, 60)}${question.question.length > 60 ? "..." : ""}</div>
                        <div class="answer-status">
                            ${
                              isCorrect
                                ? '<i class="fas fa-check-circle" style="color:#27ae60;"></i> To\'g\'ri'
                                : '<i class="fas fa-times-circle" style="color:#e74c3c;"></i> Noto\'g\'ri / Javob berilmagan'
                            }
                        </div>
                    </div>
                </div>
            `;
    });

    answersHtml += "</div>";
    answersDiv.innerHTML = answersHtml;

    document.querySelector(".question-card").appendChild(answersDiv);

    answersDiv
      .querySelector(".close-answers")
      .addEventListener("click", function () {
        answersDiv.remove();
      });
  };

  // Back to levels
  document
    .getElementById("back-to-levels")
    .addEventListener("click", function () {
      if (confirm("Testni tark etmoqchimisiz? Barcha javoblar saqlanadi.")) {
        showSection("level-section");
      }
    });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", function () {
    if (confirm("Tizimdan chiqmoqchimisiz?")) {
      currentUser = null;
      localStorage.removeItem("currentUser");
      showSection("login-section");
      document.getElementById("login-form").reset();
      document
        .querySelectorAll(
          ".mini-results, .results-panel, .answers-panel, .test-complete-dialog",
        )
        .forEach((el) => {
          el?.remove();
        });
    }
  });

  // Bo'limni ko'rsatish
  window.showSection = function (sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");

    // Tozalash
    document
      .querySelectorAll(
        ".mini-results, .results-panel, .answers-panel, .test-complete-dialog",
      )
      .forEach((el) => {
        el?.remove();
      });
  };

  // Bildirishnoma ko'rsatish
  function showNotification(type, message) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-times-circle" : "fa-info-circle"}"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // ============================================
  // PLATFORMANI ISHGA TUSHIRISH
  // ============================================

  document.addEventListener("DOMContentLoaded", function () {
    // Device ID ni ko'rsatish
    checkDevice();

    // Bloklanganligini tekshirish
    if (localStorage.getItem("isBlocked") === "true") {
      const blockEnd = parseInt(localStorage.getItem("blockEndTime"));
      if (Date.now() < blockEnd) {
        showBlockScreen(localStorage.getItem("blockReason"));
      } else {
        localStorage.removeItem("isBlocked");
        localStorage.removeItem("blockEndTime");
      }
    }

    // Avtorizatsiyani tekshirish
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser && !localStorage.getItem("isBlocked")) {
      currentUser = JSON.parse(savedUser);
      showSection("level-section");
    }

    // CSS qo'shish
    addStyles();
  });

  // CSS qo'shish
  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
            /* Notification styles */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                animation: slideInRight 0.3s ease;
            }
            
            .notification.success { background: linear-gradient(135deg, #27ae60, #2ecc71); }
            .notification.info { background: linear-gradient(135deg, #3498db, #2980b9); }
            .notification.error { background: linear-gradient(135deg, #e74c3c, #c0392b); }
            .notification.fade-out { animation: fadeOut 0.5s ease forwards; }
            
            /* Security warning */
            .security-warning {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(231, 76, 60, 0.95);
                color: white;
                padding: 20px 40px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 18px;
                font-weight: 500;
                animation: pulse 0.5s ease;
            }
            
            .security-warning i { font-size: 24px; }
            
            /* Block screen */
            .block-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 20000;
                animation: fadeIn 0.3s ease;
            }
            
            .block-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                animation: scaleIn 0.3s ease;
            }
            
            .block-content h2 { color: #e74c3c; margin: 20px 0; }
            .block-content p { margin: 10px 0; color: #666; }
            .block-content .countdown {
                font-size: 32px;
                font-weight: 700;
                color: #e74c3c;
                margin-top: 20px;
                font-family: monospace;
            }
            
            /* Mini results */
            .mini-results {
                display: flex;
                gap: 15px;
                padding: 8px 20px;
                background: white;
                border-radius: 25px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-left: auto;
            }
            
            .mini-item {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 14px;
                font-weight: 600;
            }
            
            .mini-item.correct i { color: #27ae60; }
            .mini-item.incorrect i { color: #e74c3c; }
            .mini-item.skipped i { color: #f39c12; }
            .mini-item.percentage.good i { color: #27ae60; }
            .mini-item.percentage.average i { color: #f39c12; }
            .mini-item.percentage.poor i { color: #e74c3c; }
            
            /* Results panel */
            .results-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 1000;
                min-width: 400px;
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: fadeIn 0.3s ease;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .results-header i { font-size: 30px; color: var(--primary-color); }
            
            .close-results {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #999;
                transition: var(--transition);
            }
            
            .close-results:hover { color: var(--danger-color); }
            
            .results-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin: 20px 0;
            }
            
            .result-item {
                padding: 15px;
                border-radius: 10px;
                text-align: center;
            }
            
            .result-item.total { background: #e3f2fd; }
            .result-item.correct { background: #d4edda; }
            .result-item.incorrect { background: #f8d7da; }
            .result-item.skipped { background: #fff3cd; }
            .result-item.percentage { background: #d1ecf1; }
            
            .result-label {
                display: block;
                font-size: 12px;
                color: #666;
                margin-bottom: 5px;
            }
            
            .result-value { font-size: 24px; font-weight: 700; }
            
            .progress-circle {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 20px auto;
            }
            
            .progress-circle svg {
                width: 120px;
                height: 120px;
                transform: rotate(-90deg);
            }
            
            .percentage-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 24px;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .results-footer {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .results-footer button {
                flex: 1;
                padding: 10px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: var(--transition);
            }
            
            .restart-level-btn { background: var(--primary-color); color: white; }
            .view-answers-btn { background: var(--light-color); color: var(--text-color); }
            .results-footer button:hover { transform: translateY(-2px); }
            
            /* Answers panel */
            .answers-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                animation: fadeIn 0.3s ease;
            }
            
            .answers-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .close-answers {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #999;
            }
            
            .answers-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .answer-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 10px;
                border-radius: 8px;
                background: #f8f9fa;
            }
            
            .answer-item.correct { border-left: 4px solid #27ae60; }
            .answer-item.incorrect { border-left: 4px solid #e74c3c; }
            
            .answer-number {
                width: 30px;
                height: 30px;
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                flex-shrink: 0;
            }
            
            .answer-details { flex: 1; }
            .answer-question { font-size: 14px; margin-bottom: 5px; }
            .answer-status { font-size: 12px; color: #666; }
            
            /* Test complete dialog */
            .test-complete-dialog {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .dialog-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: scaleIn 0.3s ease;
            }
            
            .dialog-content i.fa-trophy {
                font-size: 60px;
                color: #f1c40f;
                margin-bottom: 20px;
            }
            
            .time-spent {
                color: #666;
                margin: 10px 0;
                font-size: 14px;
            }
            
            .final-results {
                margin: 20px 0;
            }
            
            .final-result-item {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            
            .final-result-item .value.correct { color: #27ae60; font-weight: bold; }
            .final-result-item .value.incorrect { color: #e74c3c; font-weight: bold; }
            .final-result-item .value.skipped { color: #f39c12; font-weight: bold; }
            
            .total-score {
                margin-top: 10px;
                font-weight: bold;
            }
            
            .value.score.good { color: #27ae60; }
            .value.score.average { color: #f39c12; }
            .value.score.poor { color: #e74c3c; }
            
            .dialog-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            
            .dialog-buttons button {
                flex: 1;
                min-width: 120px;
                padding: 10px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: var(--transition);
            }
            
            .view-details-btn { background: var(--primary-color); color: white; }
            .back-to-levels-btn { background: var(--light-color); color: var(--text-color); }
            .restart-btn { background: var(--warning-color); color: white; }
            
            .dialog-buttons button:hover { transform: translateY(-2px); }
            
            /* Category badge */
            .question-category {
                display: inline-block;
                padding: 5px 15px;
                background: var(--light-color);
                border-radius: 20px;
                font-size: 12px;
                color: #666;
                margin: 0 10px;
            }
            
            /* Animations */
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.05); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
            
            .fade-out { animation: fadeOut 0.5s ease forwards; }
            
            /* Responsive */
            @media (max-width: 768px) {
                .mini-results {
                    margin: 10px 0;
                    width: 100%;
                    justify-content: center;
                }
                
                .results-panel,
                .answers-panel {
                    width: 95%;
                    padding: 20px;
                }
                
                .dialog-content {
                    padding: 20px;
                }
                
                .dialog-buttons button {
                    min-width: 100%;
                }
            }
        `;

    document.head.appendChild(style);
  }
})();
