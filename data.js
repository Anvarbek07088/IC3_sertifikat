// Test ma'lumotlari - Computing Fundamentals (1-modul)

const tests = [
    // Question 1: WiFi Encryption
    {
        id: 1,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which standard is the strongest for WiFi encryption?",
        question_uz: "WiFi shifrlash uchun qaysi standart eng kuchli?",
        options: [
            "WPA2",
            "WEP",
            "EAP",
            "WPA"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 2: User Account Permissions (True/False)
    {
        id: 2,
        level: "Computing Fundamentals",
        type: "true-false-list",
        question: "Select whether each statement is True or False:",
        question_uz: "Har bir gapning to'g'ri yoki noto'g'ri ekanligini tanlang:",
        items: [
            {
                text: "A standard user account can pin applications to the Start menu",
                correct: true
            },
            {
                text: "A standard user account can pin applications to the taskbar",
                correct: true
            },
            {
                text: "Only an administrator account can change the desktop background",
                correct: false
            }
        ],
        score: 10
    },

    // Question 3: Compressed Files
    {
        id: 3,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two statements accurately describe a compressed file? Choose two.",
        question_uz: "Qaysi ikkita gap siqilgan faylni to'g'ri tavsiflaydi? Ikkitasini tanlang.",
        options: [
            "A compressed file is encrypted automatically, increasing security and privacy",
            "A user can compress files within a folder and preserve the file organization",
            "A user can more successfully search for a compressed file, since compressed files are indexed automatically",
            "A compressed file is reduced in size, speeding up both upload and download time"
        ],
        correctAnswer: [1, 3],
        score: 10
    },

    // Question 4: SIM Card Function
    {
        id: 4,
        level: "Computing Fundamentals",
        type: "single",
        question: "What is the primary function of a SIM card on a mobile phone?",
        question_uz: "Mobil telefonda SIM kartaning asosiy vazifasi nima?",
        options: [
            "The SIM card increases the data storage capacity of the phone",
            "The SIM card ensures that upload and download speeds for the phone are equal",
            "The SIM card identifies the account holder of the phone",
            "The SIM card provides the ability to transfer data wirelessly from a camera or a smartphone to another device"
        ],
        correctAnswer: [2],
        score: 10
    },

    // Question 5: Mobile Phone Transfer
    {
        id: 5,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three actions should you perform before you sell or transfer ownership of your mobile phone to another user? Choose three.",
        question_uz: "Mobil telefoningizni sotish yoki boshqa foydalanuvchiga o'tkazishdan oldin qaysi uchta amalni bajarishingiz kerak? Uchtasini tanlang.",
        options: [
            "Contact the phone service provider to arrange a transfer of ownership",
            "Remove the SIM card, if there is one",
            "Back up any personal data and apps that are on the phone",
            "Perform a factory reset of the phone to delete any personal data",
            "Transfer a proof of purchase to the new user"
        ],
        correctAnswer: [1, 2, 3],
        score: 10
    },

    // Question 6: Windows 7 Power Settings
    {
        id: 6,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three power settings can be customized in Windows 7? Choose three.",
        question_uz: "Windows 7 da qaysi uchta quvvat sozlamasini sozlash mumkin? Uchtasini tanlang.",
        options: [
            "Sound deactivation after inactivity",
            "Turning off the hard disk",
            "Processor power management",
            "Wireless adapter automatic shut off",
            "Turning off the display after inactivity"
        ],
        correctAnswer: [1, 2, 4],
        score: 10
    },

    // Question 7: VPN Definition
    {
        id: 7,
        level: "Computing Fundamentals",
        type: "single",
        question: "What is a virtual private network (VPN)?",
        question_uz: "Virtual private network (VPN) nima?",
        options: [
            "A network that extends a secure or private connection over a public network",
            "A secure and encrypted wireless network",
            "A network that is private because it is set up for a single user in a building",
            "A network that enables virtual connections without authentication"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 8: Anti-virus Advantages
    {
        id: 8,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "What are two advantages of using anti-virus software? Choose two.",
        question_uz: "Antivirus dasturidan foydalanishning qanday ikkita afzalligi bor? Ikkitasini tanlang.",
        options: [
            "Prevents most known viruses from harming a computer",
            "Eliminates and removes most viruses",
            "Blocks hackers from accessing a computer",
            "Does not allow any virus or malware onto a computer"
        ],
        correctAnswer: [0, 1],
        score: 10
    },

    // Question 9: Bluetooth Connection
    {
        id: 9,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three actions must be performed to connect two Bluetooth-enabled devices? Choose three.",
        question_uz: "Ikki Bluetooth qurilmasini ulash uchun qaysi uchta amalni bajarish kerak? Uchtasini tanlang.",
        options: [
            "Turn on WiFi",
            "Ensure that there are no existing connections",
            "Activate the Bluetooth",
            "Ensure that the devices are discoverable",
            "Pair the devices"
        ],
        correctAnswer: [2, 3, 4],
        score: 10
    },

    // Question 10: File Compression Scenario
    {
        id: 10,
        level: "Computing Fundamentals",
        type: "single",
        question: "In which scenario should a file be compressed to complete the task?",
        question_uz: "Qaysi vaziyatda vazifani bajarish uchun faylni siqish kerak?",
        options: [
            "You must send a 30-MB database file by using Google Gmail",
            "You must transfer a 1-MB spreadsheet file to a thumb drive",
            "You must store a 20-MB graphic file in Dropbox",
            "You must store a 50-KB document file on a hard drive"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 11: Network Type
    {
        id: 11,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which type of network is the fastest and most reliable?",
        question_uz: "Qaysi tarmoq turi eng tez va ishonchli?",
        options: [
            "Wired",
            "Cellular",
            "WiFi",
            "Hotspot"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 12: Matching - Tools to Threats
    {
        id: 12,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Move the appropriate tool from the list on the left to the threat that it can detect or prevent on the right.",
        question_uz: "Chap ro'yxatdagi mos vositalarni o'ngdagi aniqlash yoki oldini olish mumkin bo'lgan tahdidlarga moslashtiring.",
        options: [
            "Anti-Virus Software - Trojans",
            "SSL Encryption - Credit card number theft",
            "Firewall - Hackers"
        ],
        correctAnswer: [0, 1, 2],
        score: 10
    },

    // Question 13: Identity Theft
    {
        id: 13,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three actions can lead to identity theft through a social media site? Choose three.",
        question_uz: "Qaysi uchta amal ijtimoiy media sayti orqali shaxsiy ma'lumotlarni o'g'irlashga olib kelishi mumkin? Uchtasini tanlang.",
        options: [
            "Accepting an invitation to join the site from a user you do not know",
            "Reading your email",
            "Using low-level privacy settings",
            "Accepting a request in an email message to update your account information",
            "Watching a video from your newsfeed"
        ],
        correctAnswer: [0, 2, 3],
        score: 10
    },

    // Question 14: Web Apps/SaaS Advantage
    {
        id: 14,
        level: "Computing Fundamentals",
        type: "single",
        question: "What is an advantage of using web apps or Software as a Service (SaaS) as compared to using applications stored on a local computer?",
        question_uz: "Mahalliy kompyuterga o'rnatilgan dasturlarga nisbatan veb-ilovalar yoki Software as a Service (SaaS) dan foydalanishning qanday afzalligi bor?",
        options: [
            "You pay only a one-time fee to use the programs",
            "Software is less complex to understand and to use",
            "You use the most recent and reliable versions of the software",
            "Personal data and computer applications work together better"
        ],
        correctAnswer: [2],
        score: 10
    },

    // Question 15: Most Important Data to Back Up
    {
        id: 15,
        level: "Computing Fundamentals",
        type: "single",
        question: "What is the most important data to back up?",
        question_uz: "Qaysi ma'lumotlarni zaxiralash eng muhim?",
        options: [
            "Personal files",
            "The operating system",
            "Apps and programs",
            "Drivers"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 16: Network Connections (Image-based)
    {
        id: 16,
        level: "Computing Fundamentals",
        type: "image-hotspot",
        question: "Evaluate the graphic and answer each question. Which type of connection is Connection1? Which type of connection is Connection4?",
        question_uz: "Rasmni baholang va har bir savolga javob bering. Connection1 qanday ulanish turi? Connection4 qanday ulanish turi?",
        image: "", // Rasm URL ni keyinroq qo'shing
        hotspots: [
            {
                id: 1,
                x: 200,
                y: 100,
                radius: 30,
                correct: true
            }
        ],
        score: 10
    },

    // Question 17: Tablet Networks
    {
        id: 17,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "To which three types of networks can you connect a cellular-enabled tablet without incurring any additional costs? Choose three.",
        question_uz: "Qaysi uchta tarmoq turiga qo'shimcha to'lovsiz uyali planshetni ulash mumkin? Uchtasini tanlang.",
        options: [
            "a cellular network",
            "a public wireless network",
            "a home wireless network",
            "an Ethernet network",
            "a secure wireless network"
        ],
        correctAnswer: [1, 2, 4],
        score: 10
    },

    // Question 18: Secure Backup
    {
        id: 18,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three statements accurately describe a secure backup? Choose three.",
        question_uz: "Qaysi uchta gap xavfsiz zaxirani to'g'ri tavsiflaydi? Uchtasini tanlang.",
        options: [
            "The backup must be a differential backup",
            "The backup must be stored at only one secure location",
            "The backup must be encrypted",
            "The backup must be redundant",
            "A copy of the backup must be stored in a remote location"
        ],
        correctAnswer: [2, 3, 4],
        score: 10
    },

    // Question 19: Network Type VPN
    {
        id: 19,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which type of network can use the Internet to securely connect users at remote sites?",
        question_uz: "Qaysi tarmoq turi Internet orqali masofadagi foydalanuvchilarni xavfsiz ulash uchun ishlatiladi?",
        options: [
            "Wide area network (WAN)",
            "Wireless access network (WAN)",
            "Virtual private network (VPN)",
            "Local area network (LAN)"
        ],
        correctAnswer: [2],
        score: 10
    },

    // Question 20: Device Driver Updates
    {
        id: 20,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two scenarios can require device driver updates? Choose two.",
        question_uz: "Qaysi ikkita vaziyat qurilma drayverlarini yangilashni talab qilishi mumkin? Ikkitasini tanlang.",
        options: [
            "You are upgrading from a 32-bit to a 64-bit version of Windows",
            "You are reconnecting a laptop to a wireless network",
            "An application fails to open",
            "A hardware device fails to function properly"
        ],
        correctAnswer: [0, 3],
        score: 10
    },

    // Question 21: Cloud Storage Advantages
    {
        id: 21,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "What are two advantages of using cloud storage? Choose two.",
        question_uz: "Bulutli xotira xizmatidan foydalanishning qanday ikkita afzalligi bor? Ikkitasini tanlang.",
        options: [
            "Cloud storage does not require a network connection to access files",
            "Cloud storage provides unlimited storage space",
            "Cloud storage allows access to files from any location that has an Internet connection",
            "Cloud storage makes it easier to share files"
        ],
        correctAnswer: [2, 3],
        score: 10
    },

    // Question 22: Internet Bandwidth
    {
        id: 22,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three elements can affect the bandwidth of an Internet connection? Choose three.",
        question_uz: "Qaysi uchta element Internet ulanishining tarmoq kengligiga ta'sir qilishi mumkin? Uchtasini tanlang.",
        options: [
            "The amount of memory",
            "The cable modem",
            "The wireless router",
            "The ISP",
            "The processor"
        ],
        correctAnswer: [1, 2, 3],
        score: 10
    },

    // Question 23: Desktop Background Sequence (True/False format for simplicity)
    {
        id: 23,
        level: "Computing Fundamentals",
        type: "true-false-list",
        question: "You need to change the desktop background from a solid color to a picture. The picture must use all the available space on the desktop. Which actions should you perform?",
        question_uz: "Ish stoli fonini qattiq rangdan rasmga o'zgartirishingiz kerak. Rasm ish stolining barcha mavjud joyidan foydalanishi kerak. Qaysi amallarni bajarishingiz kerak?",
        items: [
            {
                text: "Right-click the desktop, and then click Display settings",
                correct: true
            },
            {
                text: "Set Background to Picture",
                correct: true
            },
            {
                text: "Browse to a picture, and then click Choose picture",
                correct: true
            },
            {
                text: "Set Choose a fit to Stretch",
                correct: true
            },
            {
                text: "Right-click the desktop, and then click Personalize",
                correct: false
            },
            {
                text: "Set Choose a fit to Fit",
                correct: false
            }
        ],
        score: 10
    },

    // Question 24: External Hard Drives
    {
        id: 24,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two statements accurately describe external hard drives that are used for backups? Choose two.",
        question_uz: "Zaxira nusxalari uchun ishlatiladigan tashqi qattiq disklar haqida qaysi ikkita gap to'g'ri? Ikkitasini tanlang.",
        options: [
            "The external hard drives must be connected to the computers that will undergo the scheduled backups",
            "Transferring data to the external hard drives takes longer than transferring data to an online storage service",
            "The external hard drives can be stored in a secure and remote location",
            "The external hard drives can be used to back up only small amounts of data"
        ],
        correctAnswer: [0, 2],
        score: 10
    },

    // Question 25: File Explorer Location (Image-based)
    {
        id: 25,
        level: "Computing Fundamentals",
        type: "image-hotspot",
        question: "Based on the graphic showing Windows File Explorer, which location is highlighted?",
        question_uz: "Windows File Explorer rasmiga asoslanib, qaysi joy belgilangan?",
        image: "", // Rasm URL ni keyinroq qo'shing
        hotspots: [
            {
                id: 1,
                x: 150,
                y: 300,
                radius: 30,
                correct: true
            }
        ],
        score: 10
    },

    // Question 26: Open Source OS
    {
        id: 26,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two types of operating systems are open source? Choose two.",
        question_uz: "Qaysi ikkita operatsion tizim ochiq manbali? Ikkitasini tanlang.",
        options: [
            "Linux",
            "Apple OS X",
            "Android",
            "Windows 7"
        ],
        correctAnswer: [0, 2],
        score: 10
    },

    // Question 27: True/False Based on Graphic
    {
        id: 27,
        level: "Computing Fundamentals",
        type: "true-false-list",
        question: "Based on the graphic, select whether each statement is True or False:",
        question_uz: "Rasmga asoslanib, har bir gapning to'g'ri yoki noto'g'ri ekanligini tanlang:",
        items: [
            {
                text: "Microsoft Edge was uninstalled on April 13, 2018",
                correct: false
            },
            {
                text: "Microsoft OneDrive is using 103 MB of cloud storage",
                correct: false
            },
            {
                text: "The installation files for Microsoft Power BI Desktop (x64) consume 772 MB",
                correct: false
            },
            {
                text: "Microsoft Office 365 was installed on April 18, 2018",
                correct: true
            }
        ],
        score: 10
    },

    // Question 28: Web Apps Advantages
    {
        id: 28,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "What are two advantages of using web applications as compared to desktop applications? Choose two.",
        question_uz: "Ish stoli ilovalariga nisbatan veb-ilovalardan foydalanishning qanday ikkita afzalligi bor? Ikkitasini tanlang.",
        options: [
            "Web applications can be accessed remotely",
            "Web applications perform better than desktop applications",
            "Web applications do not need to be installed",
            "Web applications require significantly less network connectivity",
            "Web applications are confined to a physical location"
        ],
        correctAnswer: [0, 2],
        score: 10
    },

    // Question 29: Security Threats Matching
    {
        id: 29,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Match each security threat to its description.",
        question_uz: "Har bir xavfsizlik tahdidini uning tavsifiga moslashtiring.",
        options: [
            "Spyware - Malicious software that monitors user activity",
            "Ransomware - Malicious software that encrypts files and demands payment",
            "Phishing - Malicious software used to trick users into revealing personal info"
        ],
        correctAnswer: [0, 1, 2],
        score: 10
    },

    // Question 30: Mac Applications
    {
        id: 30,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which statement accurately describes applications that can be installed on a Mac computer?",
        question_uz: "Mac kompyuteriga o'rnatilishi mumkin bo'lgan dasturlar haqida qaysi gap to'g'ri?",
        options: [
            "They will work on computers that run the Apple OS X operating system",
            "They will work on computers that run the Windows operating system",
            "They will work on computers that run the Linux operating system",
            "They will work on all types of computers"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 31: File Deletion Component
    {
        id: 31,
        level: "Computing Fundamentals",
        type: "single",
        question: "Deleting a file from a computer will free up space on which type of component?",
        question_uz: "Kompyuterdan faylni o'chirish qaysi komponentda joy bo'shatadi?",
        options: [
            "The hard drive",
            "Random Access Memory (RAM)",
            "Read Only Memory (ROM)",
            "The processor"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 32: Closing App Memory
    {
        id: 32,
        level: "Computing Fundamentals",
        type: "single",
        question: "Closing an application will free up memory on which type of component?",
        question_uz: "Ilovani yopish qaysi komponentda xotirani bo'shatadi?",
        options: [
            "Random Access Memory (RAM)",
            "The hard drive",
            "Read Only Memory (ROM)",
            "The Application Interface Card (AIC)"
        ],
        correctAnswer: [0],
        score: 10
    },

    // Question 33: Cloud Computing Services
    {
        id: 33,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three statements accurately describe cloud computing services? Choose three.",
        question_uz: "Qaysi uchta gap bulutli hisoblash xizmatlarini to'g'ri tavsiflaydi? Uchtasini tanlang.",
        options: [
            "A cloud-based storage service may separate data storage charges from other charges",
            "Cloud computing can refer to using Software as a Service (SaaS) as opposed to data storage",
            "Apps on desktop computers and mobile devices can be synchronized by using cloud computing services",
            "Cloud computing services require access through a browser",
            "Cloud-based computing services are free by default"
        ],
        correctAnswer: [0, 1, 2],
        score: 10
    },

    // Question 34: Cellular Tablet Disadvantage
    {
        id: 34,
        level: "Computing Fundamentals",
        type: "single",
        question: "What is a disadvantage of using a cellular-enabled tablet as compared to the WiFi-only version of the same tablet?",
        question_uz: "WiFi-gina versiyasiga nisbatan uyali planshetdan foydalanishning qanday kamchiligi bor?",
        options: [
            "A cellular-enabled tablet has less memory and a lower processing speed",
            "A cellular-enabled tablet and the data plan for the tablet cost more",
            "A cellular-enabled tablet cannot connect to WiFi",
            "A cellular-enabled tablet is heavier"
        ],
        correctAnswer: [1],
        score: 10
    },

    // Question 35: Device Driver
    {
        id: 35,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which statement accurately describes a device driver?",
        question_uz: "Qaysi gap qurilma drayverini to'g'ri tavsiflaydi?",
        options: [
            "A device driver is an interface that allows computers to connect to a network",
            "A device driver is software that controls hardware",
            "A device driver is used to manage memory allocation",
            "A device driver automatically drives or controls system updates"
        ],
        correctAnswer: [1],
        score: 10
    },

    // Question 36: Valid IP Address
    {
        id: 36,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which address is a valid IP address?",
        question_uz: "Qaysi manzil to'g'ri IP manzil?",
        options: [
            "4B32:2838:1988:3827",
            "193.111.11.111",
            "2C79E6AD3BAE40FB4A1FEAEBC472",
            "482-KL5J56K"
        ],
        correctAnswer: [1],
        score: 10
    },

    // Question 37: Office 365 Repair (Image-based)
    {
        id: 37,
        level: "Computing Fundamentals",
        type: "image-hotspot",
        question: "Your computer has Microsoft Office 365 installed. You notice that an Office 365 application fails to start. You need to repair the installation of Office 365. What should you click?",
        question_uz: "Kompyuteringizda Microsoft Office 365 o'rnatilgan. Office 365 ilovasi ishlamayotganini ko'rasiz. Office 365 o'rnatilishini tuzatishingiz kerak. Nimani bosishingiz kerak?",
        image: "", // Rasm URL ni keyinroq qo'shing
        hotspots: [
            {
                id: 1,
                x: 400,
                y: 500,
                radius: 40,
                correct: true
            }
        ],
        score: 10
    },

    // Question 38: Wi-Fi Security Advantages
    {
        id: 38,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "What are two advantages of securing a home Wi-Fi network? Choose two.",
        question_uz: "Uy Wi-Fi tarmog'ini himoya qilishning qanday ikkita afzalligi bor? Ikkitasini tanlang.",
        options: [
            "extends the range of the network",
            "provides control of access to the network",
            "encrypts data transfers",
            "significantly increases bandwidth"
        ],
        correctAnswer: [1, 2],
        score: 10
    },

    // Question 39: Backup Scenarios
    {
        id: 39,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two scenarios make it critical to back up files daily? Choose two.",
        question_uz: "Qaysi ikkita vaziyat fayllarni har kuni zaxiralashni muhim qiladi? Ikkitasini tanlang.",
        options: [
            "A virus infection",
            "A corrupt app update",
            "A hard drive failure",
            "A device restore",
            "A power outage"
        ],
        correctAnswer: [0, 2],
        score: 10
    },

    // Question 40: File Explorer Context Menu (Fill-in format, using multiple choice)
    {
        id: 40,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Complete the statement by selecting the correct options. In File Explorer, the _____ the file, _____ menu of a file provides file-specific _____.",
        question_uz: "To'g'ri variantlarni tanlab gapni to'ldiring. File Explorer da faylni _____, faylning _____ menyusi faylga xos _____ ta'minlaydi.",
        options: [
            "right-clicking",
            "context",
            "options"
        ],
        correctAnswer: [0, 1, 2],
        score: 10
    },

    // Question 41: Cellular Tablet Benefits
    {
        id: 41,
        level: "Computing Fundamentals",
        type: "single",
        question: "Which organization benefits the most from using cellular-enabled tablets as compared to WiFi-only tablets?",
        question_uz: "Qaysi tashkilot WiFi-gina planshetlarga nisbatan uyali planshetlardan foydalanishdan eng ko'p foyda oladi?",
        options: [
            "A small restaurant",
            "A grocery store",
            "A flower delivery service",
            "A library"
        ],
        correctAnswer: [2],
        score: 10
    },

    // Question 42: Wireless Network Connection
    {
        id: 42,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two options can prevent a device from connecting to a specific secure wireless network? Choose two.",
        question_uz: "Qaysi ikkita variant qurilmaning ma'lum bir xavfsiz simsiz tarmoqqa ulanib bo'lmasligiga sabab bo'lishi mumkin? Ikkitasini tanlang.",
        options: [
            "The network password has changed",
            "There are more than eight devices connected to the router",
            "The network bandwidth is too high",
            "There is another wireless network present",
            "The wireless network card on the device is deactivated"
        ],
        correctAnswer: [0, 4],
        score: 10
    },

    // Question 43: Laptop Battery Conservation
    {
        id: 43,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which three actions conserve energy and extend battery life on a laptop? Choose three.",
        question_uz: "Qaysi uchta amal noutbukda energiyani tejaydi va batareya muddatini uzaytiradi? Uchtasini tanlang.",
        options: [
            "Disable WiFi on the laptop",
            "Attach the laptop to an external hard drive",
            "Close all the background programs running on the laptop",
            "Dim the screen on the laptop",
            "Increase the CPU usage of the laptop"
        ],
        correctAnswer: [0, 2, 3],
        score: 10
    },

    // Question 44: Smartphone Internet Connection
    {
        id: 44,
        level: "Computing Fundamentals",
        type: "multiple",
        question: "Which two options allow a smartphone to connect to the Internet? Choose two.",
        question_uz: "Qaysi ikkita variant smartfonga Internetga ulanish imkonini beradi? Ikkitasini tanlang.",
        options: [
            "A mobile plan that includes data",
            "An Ethernet connection",
            "A WiFi network",
            "An Internet browser app"
        ],
        correctAnswer: [0, 2],
        score: 10
    }
];
