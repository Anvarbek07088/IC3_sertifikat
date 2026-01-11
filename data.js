const questions = [
  {
    id: 1,
    question:
      "What is the most efficient method to reliably transfer a 50-GB file to multiple remote users?",
    options: [
      {
        key: "A",
        text: "Attach the file to a group email message and send the message to each remote user.",
      },
      {
        key: "B",
        text: "Download the file onto a USB flash drive and send the drive to each remote user.",
      },
      {
        key: "C",
        text: "Upload the file to a cloud-based storage service and grant the remote users access to the file.",
      },
      {
        key: "D",
        text: "Back up the file and restore the file to the system of each remote user.",
      },
    ],
    correctKey: "C",
  },
  {
    id: 2,
    question:
      "What is the best way to share files that will be uploaded at a later date?",
    options: [
      { key: "A", text: "Send the files by using email." },
      { key: "B", text: "Save the files to folder in Dropbox." },
      { key: "C", text: "Send the files using Instagram." },
      { key: "D", text: "Save the files to a thumb drive." },
    ],
    correctKey: "B",
  },
  {
    id: 3,
    question:
      "When making a purchase from an online store, what indicates that you can trust submitting sensitive information?",
    options: [
      { key: "A", text: "The URL of the store's website begins with https://" },
      { key: "B", text: "The URL of the store's website contains .com" },
      { key: "C", text: "The store's website accepts PayPal" },
      { key: "D", text: "The URL of the store's website contains org" },
    ],
    correctKey: "A",
  },
  {
    id: 4,
    question:
      "What is the default folder for files downloaded from the Internet when using Chrome?",
    options: [
      { key: "A", text: "Downloads" },
      { key: "B", text: "Temporary files" },
      { key: "C", text: "Pictures" },
      { key: "D", text: "Desktop" },
      { key: "E", text: "Documents library" },
    ],
    correctKey: "A",
  },
  {
    id: 5,
    question: "Which path is a valid Windows Explorer path?",
    options: [
      { key: "A", text: "C:\\Windows\\System32\\drivers" },
      { key: "B", text: "C:-Applications-Drivers-Mouse" },
      { key: "C", text: "https://C:\\Documents\\" },
      { key: "D", text: 'C://Desktop/School/"Assignments"' },
    ],
    correctKey: "A",
  },
  {
    id: 6,
    question:
      "Which three actions can only be performed on a smartphone as compared to a basic mobile phone? Choose three.",
    options: [
      { key: "A", text: "Perform advanced Internet browsing." },
      { key: "B", text: "Use email apps." },
      { key: "C", text: "Send and receive SMS messages." },
      { key: "D", text: "Listen to music." },
      { key: "E", text: "Access voicemail." },
      { key: "F", text: "Make video calls." },
    ],
    correctKeys: ["A", "B", "F"],
  },
  {
    id: 7,
    question: "What is an advantage of a cellular network over a WiFi network?",
    options: [
      {
        key: "A",
        text: "A cellular network is more reliable inside large buildings.",
      },
      {
        key: "B",
        text: "A cellular network has significantly faster connection speeds.",
      },
      { key: "C", text: "A cellular network is less likely to be hacked." },
      {
        key: "D",
        text: "A cellular network can be accessed from more locations.",
      },
    ],
    correctKey: "D",
  },
  {
    id: 8,
    question: "Which two guidelines make a password more secure? Choose two.",
    options: [
      {
        key: "A",
        text: "A user should have the same password for all websites.",
      },
      { key: "B", text: "A password should contain personal information." },
      { key: "C", text: "A password should be long." },
      {
        key: "D",
        text: "A password should contain a random sequence of characters.",
      },
      { key: "E", text: "A password should not contain any symbols." },
    ],
    correctKeys: ["C", "D"],
  },
  {
    id: 9,
    question: "What is the most important data to back up?",
    options: [
      { key: "A", text: "Drivers" },
      { key: "B", text: "Personal files" },
      { key: "C", text: "The operating system" },
      { key: "D", text: "Apps and programs" },
    ],
    correctKey: "B",
  },
  {
    id: 10,
    question: "Select whether each statement is True or False",
    statements: [
      {
        text: "Uploading a file to Microsoft OneDrive requires Internet access",
        answer: "True",
      },
      {
        text: "When downloading a file from Microsoft OneDrive, a copy is created, and the original remains in OneDrive.",
        answer: "True",
      },
      {
        text: "A file uploaded to Microsoft OneDrive can only be accessed on the device from which the file was uploaded",
        answer: "False",
      },
    ],
  },
  {
    id: 11,
    question: "Select whether each statement is True or False",
    statements: [
      {
        text: "The Display settings from the Settings app are used to set the screen resolution.",
        answer: "True",
      },
      {
        text: "The Display settings from the Settings app are used to set the desktop background.",
        answer: "False",
      },
      {
        text: "The Display settings from the Settings app are used to extend the desktop to a second monitor.",
        answer: "True",
      },
    ],
  },
  {
    id: 12,
    question:
      "To check how much disk space is currently used by System Restore, which button should you click?",
    options: [
      { key: "A", text: "Contigure" },
      { key: "B", text: "Create" },
      { key: "C", text: "Delete" },
      { key: "D", text: "Restore" },
    ],
    correctKey: "A",
    followUp: {
      question: "On which drive is System Restore currently enabled?",
      options: [
        { key: "A", text: "C" },
        { key: "B", text: "D" },
        { key: "C", text: "E" },
        { key: "D", text: "None" },
      ],
      correctKey: "A",
    },
  },
  {
    id: 13,
    question: "Which statement accurately describes a firewall?",
    options: [
      {
        key: "A",
        text: "A firewall uses a set of rules to protect a computer from harmful network traffic.",
      },
      {
        key: "B",
        text: "When a firewall is installed, a user will not need to worry about viruses and malware.",
      },
      {
        key: "C",
        text: "A firewall is a device that protects the hard drive from fire damage.",
      },
      {
        key: "D",
        text: "Firewalls are outdated and are being replaced by anti-virus software.",
      },
    ],
    correctKey: "A",
  },
  {
    id: 14,
    question: "Select whether each statement is True or False",
    statements: [
      {
        text: "When you save a file to cloud storage, a copy is always saved to the local hard drive",
        answer: "False",
      },
      {
        text: "You must log in to the cloud storage location each time you want to save a file to the cloud.",
        answer: "False",
      },
      {
        text: "When you save a file to cloud storage, the file is saved on a remote server",
        answer: "True",
      },
    ],
  },
  {
    id: 15,
    question: "What is the cloud?",
    options: [
      { key: "A", text: "A computer that is not located in a user's home" },
      {
        key: "B",
        text: "Software and services that run on the Internet instead of your computer",
      },
      { key: "C", text: "An interconnected network of computers" },
      {
        key: "D",
        text: "A location on the hard drive of your computer where you can collaborate and share files",
      },
    ],
    correctKey: "B",
  },
  {
    id: 16,
    question:
      "Which two statements accurately describe when to zip a file? Choose two.",
    options: [
      {
        key: "A",
        text: "When sharing files online, you should zip a file to reduce its size.",
      },
      {
        key: "B",
        text: "When archiving files, you should use zip files to flag the archives.",
      },
      {
        key: "C",
        text: "When sharing files, you should zip a file to preserve the organization of the file sets or directories.",
      },
      {
        key: "D",
        text: "When performing routine backups, you should backup to zip files.",
      },
    ],
    correctKeys: ["A", "C"],
  },
  {
    id: 18,
    question: "Which statement accurately describes online backups?",
    options: [
      {
        key: "A",
        text: "Online backups are the quickest form of backing up files.",
      },
      {
        key: "B",
        text: "Online backups are the least secure method of backing up files.",
      },
      { key: "C", text: "Online backups are accessible on the Internet." },
      {
        key: "D",
        text: "Online backups store everything to the cloud instead of on hardware devices.",
      },
    ],
    correctKey: "C",
  },
  {
    id: 19,
    question:
      "In which scenario should the file be compressed to complete the task?",
    options: [
      {
        key: "A",
        text: "You must send a 30-GB file by using on Google Gmail.",
      },
      { key: "B", text: "You must share a 30-MB file by using a USB drive." },
      {
        key: "C",
        text: "You must send a 30-MB file by using Microsoft Outlook 2013.",
      },
      { key: "D", text: "You must share a 30-MB file on Google Drive." },
    ],
    correctKey: "C",
  },
  {
    id: 20,
    question:
      "What are three characteristics of a phishing email message? Choose three",
    options: [
      { key: "A", text: "The message directs you to a phony website." },
      {
        key: "B",
        text: "The message indicates that the email account of one of your contacts was hacked.",
      },
      {
        key: "C",
        text: "The message appears to come from a well-known source.",
      },
      {
        key: "D",
        text: "You will be able to identify the true sender of the message by opening any attachments.",
      },
      { key: "E", text: "The message includes a fake alert." },
    ],
    correctKeys: ["A", "C", "E"],
  },
  {
    id: 21,
    question: "Which type of mobile network is the fastest?",
    options: [
      { key: "A", text: "LTE/4G LTE" },
      { key: "B", text: "3G" },
      { key: "C", text: "4G" },
      { key: "D", text: "2G" },
    ],
    correctKey: "A",
  },
  {
    id: 22,
    question:
      "Which three methods allow you to transfer files from a smartphone to a desktop computer? Choose three.",
    options: [
      {
        key: "A",
        text: "Use a cloud service to synchronize files between the smartphone, the cloud, and the computer.",
      },
      {
        key: "B",
        text: "Connect the smartphone to the computer by using an Ethernet cable and use the computer's file system to copy or move the files.",
      },
      {
        key: "C",
        text: "Remove the SIM card from the smartphone and plug the SIM card into the computer.",
      },
      {
        key: "D",
        text: "Connect the smartphone to the computer by using a USB cable and use the computer's file system to copy or move the files.",
      },
      {
        key: "E",
        text: "Use an app on the smartphone to transfer files wirelessly from the device to the computer.",
      },
    ],
    correctKeys: ["A", "D", "E"],
  },
  {
    id: 23,
    question:
      "From which two applications can you restore an Apple iPhone backup? Choose two.",
    options: [
      { key: "A", text: "Firefox" },
      { key: "B", text: "Dropbox" },
      { key: "C", text: "iCloud" },
      { key: "D", text: "Internet Explorer" },
      { key: "E", text: "Apple iTunes" },
    ],
    correctKeys: ["C", "E"],
  },
  {
    id: 24,
    question:
      "Which three methods should you use to share a 10 MB computer file with a group of people? Choose three.",
    options: [
      {
        key: "A",
        text: "Attach the file to an email message and send the message to the group members.",
      },
      {
        key: "B",
        text: "Upload the file to a cloud service and grant the group access to the file.",
      },
      {
        key: "C",
        text: "Copy the file to a CD, a DVD, or a USB drive and send the copy to the group members.",
      },
      { key: "D", text: "Post the file to a group chat session." },
      { key: "E", text: "Save the file to a shared network folder." },
    ],
    correctKeys: ["B", "C", "E"],
  },
  {
    id: 25,
    question:
      "What are three ways an organization can use the cloud to collaborate? Choose three.",
    options: [
      {
        key: "A",
        text: "Use a web-based Customer Relationship Management (CRM) tool",
      },
      { key: "B", text: "Establish a conference call by using phone lines." },
      { key: "C", text: "Share files within a local area network (LAN)." },
      { key: "D", text: "Simultaneously work on a document." },
      { key: "E", text: "Hold a web conference." },
    ],
    correctKeys: ["A", "D", "E"],
  },
  {
    id: 26,
    question:
      "An HDMI cable is typically used to connect a desktop computer and which type of device?",
    options: [
      { key: "A", text: "A printer" },
      { key: "B", text: "A tablet" },
      { key: "C", text: "A wireless router" },
      { key: "D", text: "An external display" },
    ],
    correctKey: "D",
  },
  {
    id: 27,
    question:
      "Which three options can be configured in Windows Firewall? Choose three",
    options: [
      { key: "A", text: "Block all incoming connections." },
      { key: "B", text: "Search email messages for viruses." },
      {
        key: "C",
        text: "Allow specific programs to communicate through the firewall.",
      },
      {
        key: "D",
        text: "Allow specific types of files to be saved to the hard drive.",
      },
      { key: "E", text: "Turn the firewall on or off." },
    ],
    correctKeys: ["A", "C", "E"],
  },
  {
    id: 28,
    question: [
      {
        savol:
          "You have a single monitor connected to a computer. What should you click to configure the application window to use all the space on the desktop?",
      },
      {
        imgScr: "img/3.jpg",
      },
    ],
    options: [
      { key: "1", text: "1" },
      { key: "2", text: "2" },
      { key: "3", text: "3" },
      { key: "4", text: "4" },
      { key: "5", text: "5" },
    ],
    correctKey: "4",
  },
  {
    id: 29,
    question: "What is the most secure way to manage many passwords?",
    options: [
      {
        key: "A",
        text: "Use one password for all logins and neither record nor store it.",
      },
      {
        key: "B",
        text: "Use a password manager to encrypt and store the passwords online.",
      },
      {
        key: "C",
        text: "Write the passwords on a paper and hide the paper in an unused book.",
      },
      {
        key: "D",
        text: "Create passwords that are easy to remember and neither record nor store them.",
      },
    ],
    correctKey: "B",
  },
  {
    id: 30,
    question: [
      {
        savol:
          "To which location should you copy a file if you want to save the file on a network share?",
      },
      {
        imgScr: "img/2.jpg",
      },
    ],
    options: [
      { key: "A", text: "Рабочий стол (Desktop)" },
      { key: "B", text: "Документы (Documents)" },
      { key: "C", text: "Загрузки (Downloads)" },
      { key: "D", text: "Музыка (Music)" },
      { key: "E", text: "Изображения (Pictures)" },
      { key: "F", text: "Видео (Videos)" },
      { key: "G", text: "Локальный диск (C:) (Local Disk C:)" },
      { key: "H", text: "SDXC (D:)" },
      { key: "I", text: "USB-диск (E:) (USB Disk E:)" },
      { key: "J", text: "Данное (\\\\HR) (Z:) (Data (\\\\HR) (Z:))" },
    ],
    correctKey: "J",
  },
  {
    id: 31,
    question:
      "What are two advantages of creating a wireless network at home? Choose two.",
    options: [
      {
        key: "A",
        text: "All devices will remember the network and reconnect automatically.",
      },
      {
        key: "B",
        text: "Multiple devices can connect and communicate on the same network.",
      },
      {
        key: "C",
        text: "All devices within range will connect automatically when the network is created.",
      },
      { key: "D", text: "You can connect to a home computer remotely." },
    ],
    correctKeys: ["A", "B"],
  },
  {
    id: 32,
    question:
      "Which two options allow a smartphone to connect to the Internet? Choose two",
    options: [
      { key: "A", text: "An Ethernet connection" },
      { key: "B", text: "A WiFi network" },
      { key: "C", text: "An Internet browser app" },
      { key: "D", text: "A mobile plan that includes data" },
    ],
    correctKeys: ["B", "D"],
  },
  {
    id: 33,
    question:
      "What are two possible uses of an Ethernet port on a laptop? Choose two.",
    options: [
      { key: "A", text: "Connecting the laptop to a local area network (LAN)" },
      { key: "B", text: "Connecting the laptop to USB devices" },
      { key: "C", text: "Connecting the laptop to a nearby router" },
      { key: "D", text: "Connecting the laptop to a wireless network" },
    ],
    correctKeys: ["A", "C"],
  },
  {
    id: 34,
    question:
      "What is a disadvantage of using a cellular-enabled tablet as compared to the WiFi-only version of the same tablet?",
    options: [
      {
        key: "A",
        text: "A cellular-enabled tablet has less memory and a lower processing speed.",
      },
      { key: "B", text: "A cellular-enabled tablet is heavier." },
      {
        key: "C",
        text: "A cellular-enabled tablet and the data plan for the tablet cost more.",
      },
      { key: "D", text: "A cellular-enabled tablet cannot connect to WiFi." },
    ],
    correctKey: "C",
  },
  {
    id: 35,
    question: "What is a function of an IP address?",
    options: [
      {
        key: "A",
        text: "To identify the priority of the incoming and outgoing Internet traffic",
      },
      { key: "B", text: "To provide access to a secure wireless network" },
      { key: "C", text: "To identify the bandwidth for a device" },
      {
        key: "D",
        text: "To identify a specific device connected to a network",
      },
    ],
    correctKey: "D",
  },
  {
    id: 36,
    question:
      "What are two disadvantages of storing backups only on a local desktop computer? Choose two.",
    options: [
      { key: "A", text: "The backups cannot be encrypted." },
      {
        key: "B",
        text: "Storage capacity is limited on the desktop computer.",
      },
      {
        key: "C",
        text: "Storage on a desktop computer is slower than cloud-based storage.",
      },
      {
        key: "D",
        text: "Damage to the desktop computer can cause damage to the backups.",
      },
    ],
    correctKeys: ["B", "D"],
  },
  {
    id: 37,
    question: "Which two tasks typically require using the cloud? Choose two.",
    options: [
      { key: "A", text: "Saving a file to Google Drive" },
      { key: "B", text: "Uploading a photo to Instagram" },
      { key: "C", text: "Saving a file to an encrypted USB drive" },
      { key: "D", text: "Storing a photo on a desktop app" },
    ],
    correctKeys: ["A", "B"],
  },
  {
    id: 38,
    question:
      "Which three actions can lead to identity theft through a social media site? Choose three",
    options: [
      {
        key: "A",
        text: "Accepting an invitation to join the site from a user you do not know",
      },
      { key: "B", text: "Using low-level privacy settings" },
      {
        key: "C",
        text: "Accepting a request in an email message to update your account information",
      },
      { key: "D", text: "Watching a video from your newsfeed" },
      { key: "E", text: "Reading your email" },
    ],
    correctKeys: ["A", "B", "C"],
  },
  {
    id: 39,
    question:
      "You create a Microsoft Word document on a computer and plan to store the document in Microsoft OneDrive. What should you do?",
    options: [
      { key: "A", text: "Open a new document by using Word Online" },
      { key: "B", text: "Upload the document to your Google Drive account." },
      { key: "C", text: "Drag the document to a Microsoft OneNote notebook." },
      {
        key: "D",
        text: "Save the document in the local OneDrive folder on the computer.",
      },
    ],
    correctKey: "D",
  },
  {
    id: 40,
    question:
      "Which two statements accurately describe Software as a Service (SaaS)? Choose two.",
    options: [
      {
        key: "A",
        text: "Sometimes, SaaS is referred to as on-demand software.",
      },
      { key: "B", text: "Updates are managed by the user." },
      { key: "C", text: "SaaS applications are hosted in the cloud" },
      {
        key: "D",
        text: "SaaS applications allows users to collaborate, but not to share information",
      },
    ],
    correctKeys: ["A", "C"],
  },
  {
    id: 41,
    question:
      "In which two scenarios should you avoid transferring files by using a public wireless network? Choose two.",
    options: [
      {
        key: "A",
        text: "The information in the files is private or sensitive.",
      },
      { key: "B", text: "The files are stored using cloud-based storage." },
      {
        key: "C",
        text: "The devices or computers that will share the files use different operating systems.",
      },
      { key: "D", text: "The files are large." },
    ],
    correctKeys: ["A", "D"],
  },
  {
    id: 42,
    question:
      "Which two characteristics indicate that a website is a safe place to make a purchase? Choose two",
    options: [
      {
        key: "A",
        text: "The website has a detailed Privacy Statement or Terms and Conditions statement",
      },
      {
        key: "B",
        text: "The website is a well-known online store that has a good reputation.",
      },
      {
        key: "C",
        text: "The website's URL begins with http:// and the site receives good reviews.",
      },
      {
        key: "D",
        text: "The website asks users to send a private email message that contains payment information, rather than transmitting information through the site.",
      },
    ],
    correctKeys: ["A", "B"],
  },
  {
    id: 43,
    question:
      "Which two statements accurately describe external hard drives that are used for backups? Choose two.",
    options: [
      {
        key: "A",
        text: "Transferring data to the external hard drives takes longer than transferring data to an online storage service.",
      },
      {
        key: "B",
        text: "The external hard drives can be stored in a secure and remote location.",
      },
      {
        key: "C",
        text: "The external hard drives must be connected to the computers that will undergo the scheduled backups.",
      },
      {
        key: "D",
        text: "The external hard drives can be used to back up only small amounts of data.",
      },
    ],
    correctKeys: ["B", "C"],
  },
  {
    id: 44,
    question: "Determine whether each statement is True or False.",
    statements: [
      { text: "A standard user account can print a document.", answer: "True" },
      {
        text: "Only an administrator account can restore a document from the Recycle Bin",
        answer: "False",
      },
      {
        text: "A standard user account can save a document to the My Documents folder",
        answer: "True",
      },
    ],
  },
  
  {
    id: 46,
    question:
      "Which two statements accurately describe a compressed file? Choose two.",
    options: [
      {
        key: "A",
        text: "A user can more successfully search for a compressed file, since compressed files are indexed automatically",
      },
      {
        key: "B",
        text: "A user can compress the files within a folder and preserve the file organization.",
      },
      {
        key: "C",
        text: "A compressed file is reduced in size, speeding up both upload and download time",
      },
      {
        key: "D",
        text: "A compressed file is encrypted automatically, increasing security and privacy",
      },
    ],
    correctKeys: ["B", "C"],
  },
  {
    id: 47,
    question:
      "Which three power settings can be customized in Windows 7? Choose three",
    options: [
      { key: "A", text: "Turning off the hard disk" },
      { key: "B", text: "Sound deactivation after inactivity" },
      { key: "C", text: "Turning off the display after inactivity" },
      { key: "D", text: "Processor power management" },
      { key: "E", text: "Wireless adapter automatic shut off" },
    ],
    correctKeys: ["A", "C", "D"],
  },
  {
    id: 48,
    question:
      "Which three actions must be performed to connect the Bluetooth-enabled devices? Choose three",
    options: [
      { key: "A", text: "Ensure that there are no existing connections" },
      { key: "B", text: "Pair the devices." },
      { key: "C", text: "Turn on WiFi." },
      { key: "D", text: "Activate the Bluetooth" },
      { key: "E", text: "Ensure that the devices are discoverable" },
    ],
    correctKeys: ["B", "D", "E"],
  },
  {
    id: 49,
    question: "What is the primary function of a SIM card on a mobile phone?",
    options: [
      {
        key: "A",
        text: "The SIM card provides the ability to transfer data wirelessly from a camera or a smartphone to another device",
      },
      {
        key: "B",
        text: "The SIM card increases the data storage capacity of the phone.",
      },
      {
        key: "C",
        text: "The SIM card identifies the account holder of the phone.",
      },
      {
        key: "D",
        text: "The SIM card ensures that upload and download speeds for the phone are equal.",
      },
    ],
    correctKey: "C",
  },
  {
    id: 50,
    question: "Which address is a valid IP address?",
    options: [
      { key: "A", text: "482-KL5-5J5K" },
      { key: "B", text: "4832 2838 1988 3827" },
      { key: "C", text: "2C79BAD3BAEA9DF84A1FEA7EBC472" },
      { key: "D", text: "193.111.11.111" },
    ],
    correctKey: "D",
  },
  {
    id: 51,
    question: "What are two advantages of using anti-virus software?",
    options: [
      { key: "A", text: "eliminates and removes most viruses" },
      { key: "B", text: "prevents most known viruses from harming a computer" },
      { key: "C", text: "blocks hackers from accessing a computer" },
      { key: "D", text: "does not allow any virus or malware onto a computer" },
    ],
    correctKeys: ["A", "B"],
  },
  {
    id: 52,
    question: "What are two advantages of using cloud storage?",
    options: [
      {
        key: "A",
        text: "Cloud storage does not require a network connection to access files.",
      },
      { key: "B", text: "Cloud storage provides unlimited storage space." },
      { key: "C", text: "Cloud storage makes it easier to share files." },
      {
        key: "D",
        text: "Cloud storage allows access to files from any location that has an Internet connection.",
      },
    ],
    correctKeys: ["C", "D"],
  },
  {
    id: 53,
    question: "In which scenario should a file be compressed?",
    options: [
      {
        key: "A",
        text: "You must store a 50-KB document file on a hard drive.",
      },
      {
        key: "B",
        text: "You must transfer a 1-MB spreadsheet file to a thumb drive.",
      },
      { key: "C", text: "You must store a 20-MB graphic file in Dropbox." },
      {
        key: "D",
        text: "You must send a 30-MB database file by using Google Gmail.",
      },
    ],
    correctKey: "D",
  },
  {
    id: 54,
    question: [
      {
        savol:
          "Evaluate the graphic and answer each question by selecting the correct options from the drop-down lists",
      },
      {
        imgScr: "img/6.jpg",
      },
    ],
    imageBased: true,
    questions: [
      {
        question: "Which type of connection is Connection1?",
        options: ["Wired", "Wireless", "Bluetooth", "Cellular"],
        correctAnswer: "Wired",
      },
      {
        question: "Which type of connection is Connection4?",
        options: ["Wired", "Wireless", "Bluetooth", "Cellular"],
        correctAnswer: "Wireless",
      },
    ],
  },
  {
    id: 55,
    question:
      "To which three types of networks can you connect a tablet without incurring any additional costs?",
    options: [
      { key: "A", text: "a home wireless network" },
      { key: "B", text: "a cellular network" },
      { key: "C", text: "a public wireless network" },
      { key: "D", text: "an Ethernet network" },
      { key: "E", text: "a secure wireless network" },
    ],
    correctKeys: ["A", "C", "E"],
  },
  {
    id: 56,
    question: "Which three statements accurately describe cloud computing?",
    options: [
      {
        key: "A",
        text: "Cloud computing can refer to using Software as a Service (SaaS) as opposed to data storage.",
      },
      { key: "B", text: "Cloud-based computing services are free by default." },
      {
        key: "C",
        text: "A cloud-based storage service may separate data storage charges from other charges.",
      },
      {
        key: "D",
        text: "Apps on desktop computers and mobile devices can be synchronized by using cloud computing services.",
      },
      {
        key: "E",
        text: "Cloud computing services require access through a browser.",
      },
    ],
    correctKeys: ["A", "C", "D"],
  },
  {
    id: 57,
    question: "Which type of network is the fastest and most reliable?",
    options: [
      { key: "A", text: "WiFi" },
      { key: "B", text: "hotspot" },
      { key: "C", text: "cellular" },
      { key: "D", text: "wired" },
    ],
    correctKey: "D",
  },
  {
    id: 58,
    question:
      "Which statement accurately describes applications installed on a Mac computer?",
    options: [
      {
        key: "A",
        text: "They will work on computers that run the Apple OS X operating system.",
      },
      {
        key: "B",
        text: "They will work on any device that runs the Apple iOS operating system.",
      },
      {
        key: "C",
        text: "They will work on computers that run the Windows operating system.",
      },
      { key: "D", text: "They are called apps not applications." },
    ],
    correctKey: "A",
  },
  {
    id: 59,
    question:
      "Complete the statement by selecting the correct options from the drop-down lists",
    fillInTheBlanks: [
      {
        sentence:
          "In File Explorer, the _____ menu of a file provides the specific commands and can be accessed by _____ the file.",
        blanks: [
          { options: [ "main","context", "view", "edit"], correct: "context" },
          {
            options: [
              
              "double-clicking","right-clicking",
              "dragging",
              "renaming",
            ],
            correct: "right-clicking",
          },
        ],
      },
    ],
  },
  {
    id: 60,
    question: [
      {
        savol:
          "Based on the graphic, select whether each statement is True or False",
      },
      {
        imgScr: "img/5.jpg",
      },
    ],
    statements: [
      {
        text: "Microsoft Edge was uninstalled on April 13, 2018.",
        answer: "False",
      },
      {
        text: "Microsoft OneDrive is using 103 MB of cloud storage.",
        answer: "False",
      },
      {
        text: "Microsoft Office 365 was installed or updated on April 19, 2018.",
        answer: "True",
      },
      {
        text: "The installation files for Microsoft Power BI Desktop (x64) consume 772 MB of disk space on the computer.",
        answer: "False",
      },
    ],
    imageBased: true,
  },
  {
    id: 61,
    question:
      "Which two options can prevent a device from connecting to a secure wireless network?",
    options: [
      { key: "A", text: "The network bandwidth is too high." },
      { key: "B", text: "The network password has changed." },
      {
        key: "C",
        text: "There are more than eight devices connected to the router.",
      },
      { key: "D", text: "There is another wireless network present." },
      {
        key: "E",
        text: "The wireless network card on the device is deactivated.",
      },
    ],
    correctKeys: ["B", "E"],
  },
  {
    id: 63,
    question:
      "What are two advantages of using web applications as compared to desktop applications?",
    options: [
      { key: "A", text: "Web applications do not need to be installed." },
      {
        key: "B",
        text: "Web applications are confined to a physical location.",
      },
      { key: "C", text: "Web applications can be accessed remotely." },
      {
        key: "D",
        text: "Web applications perform better than desktop applications.",
      },
      {
        key: "E",
        text: "Web applications require significantly less network connectivity.",
      },
    ],
    correctKeys: ["A", "C"],
  },
  {
    id: 64,
    question: "Which two types of operating systems are open source?",
    options: [
      { key: "A", text: "Apple OS X" },
      { key: "B", text: "Android" },
      { key: "C", text: "Windows 7" },
      { key: "D", text: "Linux" },
    ],
    correctKeys: ["B", "D"],
  },
  {
    id: 65,
    question: "Which two scenarios make it critical to back up files?",
    options: [
      { key: "A", text: "a device restore" },
      { key: "B", text: "a virus infection" },
      { key: "C", text: "a corrupt app update" },
      { key: "D", text: "a power outage" },
      { key: "E", text: "a hard drive failure" },
    ],
    correctKeys: ["B", "E"],
  },
  {
    id: 66,
    question: "Closing an application will free up memory on which component?",
    options: [
      { key: "A", text: "the Application Interface Card (AIC)" },
      { key: "B", text: "the hard drive" },
      { key: "C", text: "Read Only Memory (ROM)" },
      { key: "D", text: "Random Access Memory (RAM)" },
    ],
    correctKey: "D",
  },
  {
    id: 67,
    question:
      "Which two options allow a smartphone to connect to the Internet?",
    options: [
      { key: "A", text: "an Ethernet connection" },
      { key: "B", text: "an Internet browser app" },
      { key: "C", text: "a WiFi network" },
      { key: "D", text: "a mobile plan that includes data" },
    ],
    correctKeys: ["C", "D"],
  },
  {
    id: 68,
    question: "What is a virtual private network (VPN)?",
    options: [
      { key: "A", text: "a secure and encrypted wireless network" },
      {
        key: "B",
        text: "a network that is private because it is set up for a single user in a building",
      },
      {
        key: "C",
        text: "a network that enables virtual connections without authentication",
      },
      {
        key: "D",
        text: "a network that extends a secure or private connection over a public network",
      },
    ],
    correctKey: "D",
  },
  {
    id: 69,
    question:
      "Which three actions conserve energy and extend battery life on a laptop?",
    options: [
      { key: "A", text: "Disable WiFi on the laptop." },
      { key: "B", text: "Dim the screen on the laptop." },
      {
        key: "C",
        text: "Close all the background programs running on the laptop.",
      },
      { key: "D", text: "Attach the laptop to an external hard drive." },
      { key: "E", text: "Increase the CPU usage of the laptop." },
    ],
    correctKeys: ["A", "B", "C"],
  },
  {
    id: 70,
    question: "Select whether each statement is True or False.",
    statements: [
      {
        text: "A standard user account can pin applications to the Start menu.",
        answer: "True",
      },
      {
        text: "Only an administrator account can change the desktop background.",
        answer: "False",
      },
      {
        text: "A standard user account can pin applications to the taskbar.",
        answer: "True",
      },
    ],
  },
  {
    id: 71,
    question:
      "Deleting a file from a computer will free up space on which component?",
    options: [
      { key: "A", text: "Read Only Memory (ROM)" },
      { key: "B", text: "the hard drive" },
      { key: "C", text: "the graphics card" },
      { key: "D", text: "Random Access Memory (RAM)" },
    ],
    correctKey: "B",
  },
  {
    id: 72,
    question: "Which two scenarios can require device driver updates?",
    options: [
      {
        key: "A",
        text: "You are reconnecting a laptop to a wireless network.",
      },
      { key: "B", text: "An application fails to open." },
      {
        key: "C",
        text: "You are upgrading from a 32-bit to a 64-bit version of Windows.",
      },
      { key: "D", text: "A hardware device fails to function properly." },
    ],
    correctKeys: ["C", "D"],
  },
  {
    id: 73,
    question:
      "Which organization benefits the most from using cellular-enabled tablets as compared to WiFi-only tablets?",
    options: [
      { key: "A", text: "a library" },
      { key: "B", text: "a flower delivery service" },
      { key: "C", text: "a grocery store" },
      { key: "D", text: "a small restaurant" },
    ],
    correctKey: "B",
  },
  {
    id: 74,
    question:
      "Which three statements accurately describe a secure backup strategy?",
    options: [
      { key: "A", text: "The backup must be a differential backup." },
      {
        key: "B",
        text: "The backup must be stored at only one secure location.",
      },
      { key: "C", text: "The backup must be encrypted." },
      { key: "D", text: "The backup must be redundant." },
      {
        key: "E",
        text: "A copy of the backup must be stored in a remote location.",
      },
    ],
    correctKeys: ["C", "D", "E"],
  },
  {
    id: 75,
    question: "Which statement accurately describes a device driver?",
    options: [
      { key: "A", text: "A device driver is software that controls hardware." },
      {
        key: "B",
        text: "A device driver is used to manage memory allocation.",
      },
      {
        key: "C",
        text: "A device driver is an interface that allows computers to connect to a network.",
      },
      {
        key: "D",
        text: "A device driver automatically drives or controls system updates.",
      },
    ],
    correctKey: "A",
  },
  {
    id: 76,
    question:
      "What is an advantage of using a cellular-enabled tablet as compared to a WiFi-only tablet?",
    options: [
      {
        key: "A",
        text: "A cellular-enabled tablet provides more ways to access the Internet.",
      },
      {
        key: "B",
        text: "A cellular-enabled tablet provides greater access to wireless networks.",
      },
      {
        key: "C",
        text: "A cellular-enabled tablet enables synchronization to other mobile devices.",
      },
      { key: "D", text: "A cellular-enabled tablet provides VoIP." },
    ],
    correctKey: "A",
  },
  {
    id: 77,
    question: "What are two advantages of securing a home WiFi network?",
    options: [
      { key: "A", text: "Provides control of access to the network" },
      { key: "B", text: "Extends the range of the network" },
      { key: "C", text: "Encrypts data transfers" },
      { key: "D", text: "Significantly increases bandwidth" },
    ],
    correctKeys: ["A", "C"],
  },
  {
    id: 78,
    question:
      "Which three actions should you perform before selling your old phone?",
    options: [
      {
        key: "A",
        text: "Perform a factory reset of the phone to delete any personal data.",
      },
      {
        key: "B",
        text: "Contact the phone service provider to arrange a transfer of ownership.",
      },
      { key: "C", text: "Transfer a proof of purchase to the new user." },
      { key: "D", text: "Remove the SIM card, if there is one." },
      {
        key: "E",
        text: "Back up any personal data and apps that are on the phone.",
      },
    ],
    correctKeys: ["A", "D", "E"],
  },
  {
    id: 79,
    question:
      "What is an advantage of using web apps or Software as a Service (SaaS) as compared to using applications stored on a local computer?",
    options: [
      { key: "A", text: "You pay only a one-time fee to use the programs." },
      {
        key: "B",
        text: "Personal data and computer applications work together better.",
      },
      {
        key: "C",
        text: "You use the most recent and reliable versions of the software.",
      },
      { key: "D", text: "Software is less complex to understand and to use." },
    ],
    correctKey: "C",
  },
  {
    id: 80,
    question: [
      {
        savol:
          "Your computer has Microsoft Office 365 installed. You notice that an Office 365 application fails to start. You need to repair the installation of Office 365. What should you click?",
      },
      {
        imgScr: "img/4.jpg",
      },
    ],
    options: [
      { key: "A", text: "1" },
      {
        key: "B",
        text: "2",
      },
      {
        key: "C",
        text: "3",
      },
    ],
    correctKey: "C",
  },
  {
    id: 82,
    question: "Which type of network can use the Internet to set remote sites?",
    options: [
      { key: "A", text: "wide area network (WAN)" },
      { key: "B", text: "virtual private network (VPN)" },
      { key: "C", text: "local area network (LAN)" },
      { key: "D", text: "wireless access network (WAN)" },
    ],
    correctKey: "B",
  },
  {
    id: 83,
    question: "Which standard is the strongest for WiFi encryption?",
    options: [
      { key: "A", text: "EAP" },
      { key: "B", text: "WPA" },
      { key: "C", text: "WPA2" },
      { key: "D", text: "WEP" },
    ],
    correctKey: "C",
  },
  {
    id: 84,
    question:
      "Which three elements can affect the bandwidth of an Internet connection? Choose three.",
    options: [
      { key: "A", text: "the processor" },
      { key: "B", text: "the cable modem" },
      { key: "C", text: "the wireless router" },
      { key: "D", text: "the ISP" },
      { key: "E", text: "the amount of memory" },
    ],
    correctKeys: ["B", "C", "D"],
  },
];
