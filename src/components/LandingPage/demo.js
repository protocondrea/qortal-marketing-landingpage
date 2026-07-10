/** Served from `public/landing-hub-demo/` so dev/prod URLs work (avoids file:// from import.meta). */
function assetUrl(spec) {
  const q = spec.indexOf("?");
  const path = q >= 0 ? spec.slice(0, q) : spec;
  const query = q >= 0 ? spec.slice(q) : "";
  const file = path.replace(/^\.\/assets\//, "");
  return `/landing-hub-demo/${file}${query}`;
}

const hubPreviewMusicHashes = new Set(["#hub-preview", "#q-apps"]);

let hubDemoMusicGlobalListenersAttached = false;
let hubDemoInteractionsCleanup = null;

function resetHubPreviewMusicPlayback() {
  const player = document.querySelector("[data-music-player]");
  const toggle = player?.querySelector("[data-music-toggle]");
  const audio = document.querySelector("#hub-preview-audio");
  const progress = player?.querySelector("[data-music-progress]");
  if (!player || !toggle || !audio || !progress) {
    return;
  }
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Metadata may not be ready if the user leaves before the preview audio loads.
  }
  player.classList.remove("is-playing");
  toggle.setAttribute("aria-pressed", "false");
  toggle.setAttribute("aria-label", "Play lofi preview");
  progress.style.setProperty("--music-progress", "0%");
}

const quickTools = [
  {
    label: "User Search",
    icon: "search",
    viewBox: "0 0 24 24",
    path: "M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
  },
  {
    label: "Wallet",
    icon: "wallet",
    viewBox: "0 0 24 24",
    path: "M10 16V8c0-1.1.89-2 2-2h9V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-1h-9c-1.11 0-2-.9-2-2m3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
  },
  {
    label: "Apps",
    icon: "apps",
    viewBox: "0 0 30 30",
    paths: [
      "M3.76596 7.53192C5.84584 7.53192 7.53192 5.84584 7.53192 3.76596C7.53192 1.68608 5.84584 0 3.76596 0C1.68608 0 0 1.68608 0 3.76596C0 5.84584 1.68608 7.53192 3.76596 7.53192Z",
      "M15 7.53192C17.0799 7.53192 18.766 5.84584 18.766 3.76596C18.766 1.68608 17.0799 0 15 0C12.9201 0 11.2341 1.68608 11.2341 3.76596C11.2341 5.84584 12.9201 7.53192 15 7.53192Z",
      "M26.234 7.53192C28.3139 7.53192 30 5.84584 30 3.76596C30 1.68608 28.3139 0 26.234 0C24.1542 0 22.4681 1.68608 22.4681 3.76596C22.4681 5.84584 24.1542 7.53192 26.234 7.53192Z",
      "M3.76596 30.0001C5.84584 30.0001 7.53192 28.314 7.53192 26.2341C7.53192 24.1542 5.84584 22.4681 3.76596 22.4681C1.68608 22.4681 0 24.1542 0 26.2341C0 28.314 1.68608 30.0001 3.76596 30.0001Z",
      "M15 30.0002C17.0799 30.0002 18.766 28.3141 18.766 26.2342C18.766 24.1543 17.0799 22.4683 15 22.4683C12.9201 22.4683 11.2341 24.1543 11.2341 26.2342C11.2341 28.3141 12.9201 30.0002 15 30.0002Z",
      "M26.234 30.0002C28.3139 30.0002 30 28.3141 30 26.2342C30 24.1543 28.3139 22.4683 26.234 22.4683C24.1542 22.4683 22.4681 24.1543 22.4681 26.2342C22.4681 28.3141 24.1542 30.0002 26.234 30.0002Z",
      "M3.76596 18.766C5.84584 18.766 7.53192 17.08 7.53192 15.0001C7.53192 12.9202 5.84584 11.2341 3.76596 11.2341C1.68608 11.2341 0 12.9202 0 15.0001C0 17.08 1.68608 18.766 3.76596 18.766Z",
      "M15 18.766C17.0799 18.766 18.766 17.08 18.766 15.0001C18.766 12.9202 17.0799 11.2341 15 11.2341C12.9201 11.2341 11.2341 12.9202 11.2341 15.0001C11.2341 17.08 12.9201 18.766 15 18.766Z",
      "M26.234 18.766C28.3139 18.766 30 17.08 30 15.0001C30 12.9202 28.3139 11.2341 26.234 11.2341C24.1542 11.2341 22.4681 12.9202 22.4681 15.0001C22.4681 17.08 24.1542 18.766 26.234 18.766Z"
    ]
  },
  {
    label: "Q-Chat",
    icon: "qchat",
    viewBox: "0 0 24 24",
    path: "M22.6636 0.00168233C22.6127 -0.000756257 22.5614 -0.000627677 22.5099 0.00261984C22.3724 0.0112798 22.2331 0.0405753 22.0969 0.093558L1.02096 8.28971C0.362343 8.54585 -0.00366118 9.18408 2.76147e-05 9.79253C0.00371641 10.401 0.377567 11.0341 1.03925 11.2822L9.02065 14.2752C9.34631 14.3974 9.60258 14.6536 9.72471 14.9793L12.7177 22.9607C12.9658 23.6224 13.5989 23.9963 14.2074 24C14.8158 24.0037 15.454 23.6376 15.7102 22.979L23.9063 1.90295C24.1182 1.35797 23.9526 0.768987 23.5917 0.408091C23.3549 0.171254 23.02 0.0187526 22.6636 0.00168233ZM18.4022 4.99812C18.5613 4.99815 18.7139 5.06138 18.8264 5.17391C18.9389 5.28643 19.0021 5.43902 19.0021 5.59813C19.0021 5.75724 18.9389 5.90983 18.8264 6.02235L13.2239 11.6244C13.1114 11.7369 12.9588 11.8001 12.7997 11.8001C12.6406 11.8001 12.488 11.7369 12.3755 11.6244C12.263 11.5119 12.1998 11.3593 12.1998 11.2002C12.1998 11.0411 12.263 10.8885 12.3755 10.776L17.9775 5.17391C18.0333 5.11813 18.0995 5.0739 18.1724 5.04374C18.2452 5.01357 18.3233 4.99807 18.4022 4.99812Z"
  },
  {
    label: "Backup",
    icon: "download",
    viewBox: "0 0 24 24",
    path: "M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1"
  },
  {
    label: "Minting",
    icon: "mint",
    viewBox: "0 0 24 24",
    path: "M15.49 9.63c-.16-2.42-1.03-4.79-2.64-6.76-.41-.5-1.16-.5-1.57 0-1.65 1.98-2.57 4.35-2.77 6.76 1.28.68 2.46 1.56 3.49 2.63 1.03-1.06 2.21-1.94 3.49-2.63m-6.5 2.65c-.14-.1-.3-.19-.45-.29.15.11.31.19.45.29m6.42-.25c-.13.09-.27.16-.4.26.13-.1.27-.17.4-.26M12 15.45c-1.95-2.97-5.14-5.03-8.83-5.39-.64-.06-1.17.47-1.11 1.11.45 4.8 3.65 8.78 7.98 10.33.63.23 1.29.4 1.97.51.68-.12 1.33-.29 1.97-.51 4.33-1.55 7.53-5.52 7.98-10.33.06-.64-.48-1.17-1.11-1.11-3.71.36-6.9 2.42-8.85 5.39"
  },
  {
    label: "Notifications",
    icon: "notifications",
    viewBox: "0 0 24 24",
    path: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23L18 13.1zM5.41 3.35 4 4.76l2.81 2.81C6.29 8.57 6 9.73 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h12.83l1.74 1.74 1.41-1.41z"
  },
  {
    label: "More",
    icon: "plus",
    viewBox: "0 0 24 24",
    path: "M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
  }
];

const featuredApps = [
  {
    name: "Q-Tube",
    logo: "cube",
    icon: assetUrl("q-tube-icon.webp"),
    iconWidth: 128,
    iconHeight: 128,
    iconStyle: "qtube",
    detail: "decentralized.\ncat. videos.\nplatform.",
    tone: "red",
    wide: true
  },
  {
    name: "Quitter",
    logo: "quitter",
    tone: "teal",
    icon: assetUrl("quitter-icon.webp"),
    iconWidth: 128,
    iconHeight: 128
  },
  {
    name: "Q-Mail",
    logo: "mail",
    tone: "white",
    icon: assetUrl("q-mail.webp"),
    iconWidth: 100,
    iconHeight: 100
  },
  {
    name: "Q-Blog",
    logo: "blog",
    tone: "cyan",
    icon: assetUrl("q-blog-icon.webp"),
    iconWidth: 128,
    iconHeight: 88
  },
  {
    name: "Q-Trade",
    logo: "trade",
    tone: "dark",
    icon: assetUrl("q-trade.webp"),
    iconWidth: 100,
    iconHeight: 100,
    iconStyle: "trade"
  },
  {
    name: "SubWire",
    logo: "subwire",
    icon: assetUrl("subwire-icon.webp"),
    iconWidth: 128,
    iconHeight: 128,
    iconStyle: "subwire",
    detail: "write.\nown.\nearn.",
    align: "right",
    tone: "blue",
    wide: true
  }
];

const transactions = [
  {
    label: "received from",
    amount: "+5.00 QORT",
    counterparty: "George",
    time: "1 day ago",
    tone: "green"
  }
];

const walletActions = [
  {
    label: "Send",
    icon: "send",
    path: "m3.4 20.4 17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91"
  },
  {
    label: "Receive",
    icon: "receive",
    path: "M19.3 4.71a.996.996 0 0 0-1.41 0L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8.41L19.3 6.11c.38-.38.38-1.02 0-1.4"
  },
  {
    label: "Trade",
    icon: "trade",
    path: "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"
  }
];

const toolbarIcons = {
  refresh:
    "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h8V3z",
  swap: "M7 7h11l-3-3 1.4-1.4L21.8 8l-5.4 5.4L15 12l3-3H7zm10 10H6l3 3-1.4 1.4L2.2 16l5.4-5.4L9 12l-3 3h11z",
  open: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14zM5 5h6v2H7v10h10v-4h2v6H5z",
  search:
    "M9.5 3a6.5 6.5 0 0 1 5.18 10.43l4.44 4.44-1.42 1.42-4.44-4.44A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9",
  lock: "M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2m-7-2a2 2 0 1 1 4 0v2h-4z",
  chat: "M4 4h16v11H7.17L4 18.17zm2 2v7.34L6.34 13H18V6z"
};

const statusRows = [
  { label: "QORT Balance", value: "8.45 QORT", emphasis: true },
  { label: "Node Status", value: "100% Synced", pill: true },
  { label: "Minter Level", value: "Level 5", minterDots: 5 }
];

const statusMetrics = [
  { label: "Peers", value: "242" },
  { label: "QDN", value: "80" },
  { label: "Hub", value: "1.0.1" }
];

const groups = [
  {
    name: "New Qortal Members Join Here",
    sender: "privateFixXer",
    time: "1h ago",
    avatar: "privatefixxer",
    avatarImage: assetUrl("siesta-410-avatar.webp"),
    avatarWidth: 192,
    avatarHeight: 371,
    unread: true
  },
  {
    name: "QNN-Chat",
    sender: "AndY",
    time: "3h ago",
    avatar: "andy",
    avatarImage: assetUrl("qort-coin-blue-avatar.webp"),
    avatarWidth: 128,
    avatarHeight: 128,
    unread: true
  },
  {
    name: "digital privacy",
    sender: "privateFixXer",
    time: "21h ago",
    avatar: "privatefixxer",
    avatarImage: assetUrl("siesta-410-avatar.webp"),
    avatarWidth: 192,
    avatarHeight: 371,
    unread: true
  }
];

const feedPosts = [
  {
    author: "Qortal Andrew",
    time: "1h ago",
    text: "",
    avatar: "robert",
    media: "meteor"
  },
  {
    author: "Qort Darth BZ",
    time: "1h ago",
    text: "John Keller | BVN, Apr 23, 2026 - China Recalibrating Sea Route Security in Light of Shocking U.S. Navy Piracy....",
    link: "qortal://APP/Q-Tube/video/Qort%20Darlood%20...",
    avatar: "darlood"
  }
];

const cards = [
  {
    id: "media",
    label: "Workspace & Qortino",
    area: "media",
    infoTitle: "Your workspace",
    infoText:
      "Start with guided setup. Later, customize this space with widgets, music, and quick Q-App shortcuts.",
    bullets: [
      "Onboarding first",
      "Custom widgets after setup",
      "Built around your daily Hub use"
    ],
    render: MediaRail
  },
  {
    id: "music",
    label: "Music Player",
    area: "music",
    infoTitle: "Widget Space",
    infoText:
      "This area can become a customizable widget space for music, hotkeys, app shortcuts, and future Hub widgets.",
    bullets: ["Music controls", "Hotkeys and shortcuts", "Future Hub widgets"],
    modal: {
      eyebrow: "Hub widgets",
      title: "A flexible space for small tools",
      body: "The Hub dashboard can reserve space for compact widgets such as music, shortcuts, hotkeys, and future utility panels. In this preview, it is purely decorative.",
      bullets: [
        "Static controls only",
        "No media playback logic",
        "Ready for future preview media"
      ]
    },
    render: MusicWidget
  },
  {
    id: "qortino",
    label: "Qortino",
    area: "qortino",
    infoTitle: "Guided Onboarding",
    infoText:
      "Qortino helps guide new users through onboarding and explains key Hub actions.",
    bullets: [
      "Plain-language guidance",
      "Onboarding prompts",
      "Context-aware help"
    ],
    modal: {
      eyebrow: "Companion panel",
      title: "Qortino as a guided first step",
      body: "Qortino gives the dashboard a friendlier onboarding layer. The preview keeps the mascot and layout only, without importing any assistant, wallet, or app-opening behavior.",
      bullets: [
        "Visual-only companion",
        "No onboarding state",
        "No app actions"
      ]
    },
    render: QortinoPanel
  },
  {
    id: "quick",
    label: "Quick Controls",
    area: "quick",
    infoTitle: "Quick Controls",
    infoText:
      "Fast access to common Hub actions, tools, and account utilities.",
    bullets: [
      "Search users and addresses",
      "Open Wallets, Q-Apps, and Q-Chat",
      "Backup, minting, and notification tools"
    ],
    render: QuickAccess
  },
  {
    id: "account",
    label: "Account Overview",
    area: "account",
    infoTitle: "Your identity, your key",
    infoText:
      "One Qortal account unlocks everything:<br />apps, chat, wallet, names, and publishing.",
    bullets: [
      "One identity across the entire network",
      "Your keys stay with you",
      "No platform account or middleman"
    ],
    ctaLabel: "Explore",
    modal: {
      eyebrow: "QORTAL IDENTITY",
      title: "One account. Everything connected.",
      body: "Your Qortal account is more than a login. It’s your identity across the entire network.",
      bullets: []
    },
    render: AccountOverview
  },
  {
    id: "apps",
    label: "Featured Q-Apps",
    area: "apps",
    infoTitle: "The Heart of Qortal",
    infoText:
      "Q-Apps are decentralized applications published to QDN and opened directly inside Hub.",
    bullets: [
      "No central hosting",
      "Published to QDN",
      "Open-source and community-built",
      "500+ Q-Apps and experiments"
    ],
    modal: {
      eyebrow: "Q-Apps",
      title: "Apps that feel native inside Hub",
      body: "Featured Q-Apps are shown with the same asymmetric dashboard grid used in the real Hub. This preview keeps the tiles read-only and does not launch apps.",
      bullets: ["Static tiles", "No QDN requests", "No app launch behavior"],
      media: "apps"
    },
    render: FeaturedApps
  },
  {
    id: "status",
    label: "status",
    area: "status",
    infoTitle: "The Qortal Network",
    infoText:
      "Qortal Hub connects to Qortal Core. You can use a public node for easy access or run your own local node for stronger participation.",
    bullets: [
      "Core syncs the blockchain",
      "QDN stores and serves decentralized data",
      "Nodes connect peer-to-peer",
      "Local node gives more control"
    ],
    modal: {
      eyebrow: "Network preview",
      title: "A snapshot of node and network health",
      body: "The status card mirrors the collapsed Hub shape with balance, sync state, minter level, peers, and QDN. These are sample values only.",
      bullets: [
        "No Core connection",
        "No live sync",
        "No public-node switching"
      ]
    },
    render: StatusCard
  },
  {
    id: "wallet",
    label: "Wallet Activity",
    area: "wallet",
    infoTitle: "Built-in Finance",
    infoText:
      "QORT powers publishing, transfers, rewards, and Q-App interactions inside the ecosystem.",
    bullets: [
      "Send and receive QORT",
      "Pay publishing fees",
      "Use QORT in apps",
      "Run a node to earn QORT"
    ],
    modal: {
      eyebrow: "Wallet preview",
      title: "Finance shown as dashboard context",
      body: "The wallet panel shows sample QORT activity and action buttons as part of the Hub identity. In this static page, the controls do not send, receive, trade, or open anything.",
      bullets: [
        "Fake transaction data",
        "No wallet behavior",
        "No balances are loaded"
      ]
    },
    render: WalletActivity
  },
  {
    id: "feed",
    label: "Quitter Feed",
    area: "feed",
    infoTitle: "Social without one platform",
    infoText:
      "Social apps on Qortal can publish and discover content across the network, without one company controlling it.",
    bullets: [
      "Posts distributed through QDN",
      "No central social platform",
      "Built by community Q-Apps"
    ],
    render: QuitterFeed
  },
  {
    id: "groups",
    label: "Group Activity",
    area: "groups",
    infoTitle: "Private, Encrypted Groups",
    infoText:
      "Qortal supports public and private group spaces for decentralized communities.",
    bullets: [
      "Public and private groups",
      "Encrypted group conversations where supported",
      "No central chat platform",
      "Built into Hub"
    ],
    modal: {
      eyebrow: "Groups preview",
      title: "Community spaces inside the dashboard",
      body: "The group card previews the layout for recent group activity. The sample rows are static and do not open Q-Chat or read group messages.",
      bullets: [
        "Preview rows only",
        "No group membership logic",
        "No chat behavior"
      ]
    },
    render: GroupActivity
  }
];

function HubPreview() {
  const cardById = (id) => HubPreviewCard(cards.find((card) => card.id === id));

  return `
      <div class="hub-shell" data-hub-preview>
        <div class="hub-topbar">
          <div>
            <span class="hub-label">Qortal Hub</span>
            <span class="hub-sub-label">Read-only website preview</span>
          </div>
          <div class="hub-controls" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="hub-grid">
          <div class="hub-column hub-column--left">
            ${cardById("media")}
            ${cardById("quick")}
          </div>
          <div class="hub-column hub-column--center">
            ${cardById("account")}
            ${cardById("apps")}
          </div>
          <div class="hub-column hub-column--right">
            ${cardById("status")}
            ${cardById("wallet")}
          </div>
          <div class="hub-widget-row">
            ${cardById("feed")}
            ${cardById("groups")}
          </div>
        </div>
      </div>
    `;
}

function HubPreviewCard(card) {
  return `
      <article
        class="hub-card hub-card--${card.id}"
        data-hub-card
        data-card-id="${card.id}"
        ${card.modal ? "" : "data-hover-only-card"}
        ${card.modal ? `data-modal-target="${card.id}"` : ""}
        ${card.modal ? `tabindex="0"` : ""}
        aria-expanded="false"
        aria-describedby="info-${card.id}"
        ${card.modal ? `aria-haspopup="dialog"` : ""}
      >
        ${card.id === "apps" ? `<span class="edge-light" aria-hidden="true"></span>` : ""}
        <div class="hub-card__header">
          <p>${card.label}</p>
          <span aria-hidden="true"></span>
        </div>
        <div class="hub-card__body">
          ${card.render()}
        </div>
        ${InfoPopover(card)}
      </article>
    `;
}

function InfoPopover(card) {
  return `
      <div class="info-popover" id="info-${card.id}" role="region" aria-label="${card.infoTitle}">
        <h3>${card.infoTitle}</h3>
        <p>${card.infoText}</p>
        <ul>
          ${card.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
        ${
          card.modal
            ? `<button class="info-cta" type="button" data-modal-target="${card.id}">
                ${card.ctaLabel || "Find out more"}
                <span aria-hidden="true"></span>
              </button>`
            : ""
        }
      </div>
    `;
}

function InfoModal() {
  return `
      <div class="info-modal" data-info-modal aria-hidden="true">
        <div class="info-modal__backdrop" data-modal-close></div>
        <section class="info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="info-modal-title" tabindex="-1">
          <button class="info-modal__close" type="button" data-modal-close aria-label="Close modal"></button>
          <div class="info-modal__content" data-modal-content></div>
        </section>
      </div>
    `;
}

function MusicWidget() {
  return `
      <div class="music-player" data-music-player>
        <div class="music-topbar">
          <span class="music-search-icon" aria-hidden="true"></span>
          <strong>Music Player</strong>
          <span class="music-close-icon" aria-hidden="true"></span>
        </div>
        <button type="button" class="music-skip music-skip--back" disabled aria-label="Previous track"></button>
        <button type="button" class="music-disc" data-music-toggle aria-label="Play lofi preview" aria-pressed="false">
          <span></span>
        </button>
        <button type="button" class="music-skip music-skip--next" disabled aria-label="Next track"></button>
        <div class="music-copy">
          <strong>Lofi 2020 _ The Best Lofi Cove (...)</strong>
          <span>Lounge & LoFi</span>
        </div>
        <div class="music-progress">
          <span data-music-progress></span>
        </div>
        <div class="music-equalizer" aria-hidden="true"></div>
        <audio id="hub-preview-audio" src="${assetUrl("lofi-for-qortal-dot-dev.m4a")}" preload="metadata"></audio>
      </div>
    `;
}

function MediaRail() {
  return `
      <div class="media-rail">
        ${MusicWidget()}
        ${QortinoPanel()}
      </div>
    `;
}

function QortinoPanel() {
  return `
      <div class="qortino-panel">
        <div class="qortino-avatar" aria-hidden="true">
          <img src="${assetUrl("QortinoCurrentNoAntenna.svg")}" alt="" />
        </div>
        <div class="qortino-copy">
          <div class="qortino-title-row">
            <span>Listening</span>
            <strong>QORTINO</strong>
          </div>
          <p>Playing Lofi 2020 on repeat,<br />really chill mix!</p>
        </div>
      </div>
    `;
}

function QuickAccess() {
  return `
      <div class="quick-pad" aria-label="Read-only control panel preview">
        ${quickTools.map(QuickTool).join("")}
      </div>
    `;
}

function QuickTool(tool) {
  return `
      <div class="quick-tool" aria-label="${tool.label}">
        <span class="quick-tool__icon quick-tool__icon--svg quick-tool__icon--${tool.icon}" aria-hidden="true">
          <svg class="quick-tool__svg" viewBox="${tool.viewBox || "0 0 24 24"}" focusable="false">
            ${(tool.paths || [tool.path]).map((path) => `<path d="${path}"></path>`).join("")}
          </svg>
        </span>
      </div>
    `;
}

function AccountOverview() {
  return `
      <div class="account-card-real">
        <div class="account-avatar-wrap">
          <div class="account-avatar" aria-hidden="true"></div>
          <span class="online-pill">Online</span>
        </div>
        <div class="account-content">
          <h3>Account Overview</h3>
          <div class="account-field-row">
            <div class="account-field">
              <strong data-account-decrypt data-account-name="Qortino" data-account-address="QVosNNasvHkNBAQ6rCYVepY3ax8XQsyv1H">Qortino</strong>
              <em>QR</em>
              <i></i>
            </div>
            <div class="account-utilities" aria-hidden="true">
              <span class="account-utility account-utility--settings"></span>
            </div>
          </div>
          <p>Qortal Name &amp; Address</p>
        </div>
      </div>
    `;
}

function FeaturedApps() {
  return `
      <div class="featured-title" id="q-apps">
        <h3>Featured Q-Apps</h3>
        <p>Launch trusted community apps directly from your dashboard.</p>
      </div>
      <div class="featured-grid">
        ${featuredApps.map(FeaturedAppTile).join("")}
      </div>
      <button class="featured-view-all" type="button" data-modal-target="apps">
        <strong>Explore</strong> All Q-Apps
      </button>
    `;
}

function FeaturedAppTile(app) {
  const iconMarkup = app.icon
    ? `<img class="featured-app__logo featured-app__icon-image featured-app__icon-image--${app.iconStyle || app.logo}" src="${app.icon}" width="${app.iconWidth || 128}" height="${app.iconHeight || 128}" alt="" aria-hidden="true" />`
    : `<span class="featured-app__logo featured-app__logo--${app.logo}" aria-hidden="true"></span>`;

  if (app.wide) {
    const isRight = app.align === "right";
    return `
        <div class="featured-app featured-app--${app.tone} featured-app--wide ${isRight ? "featured-app--wide-right" : "featured-app--wide-left"}">
          <div class="featured-app__brand">
            ${iconMarkup}
            <strong>${app.name}</strong>
          </div>
          <span class="featured-app__divider" aria-hidden="true"></span>
          <small class="featured-app__tagline">${app.detail.replace(/\n/g, "<br />")}</small>
        </div>
      `;
  }

  return `
      <div class="featured-app featured-app--${app.tone}">
        ${iconMarkup}
        <strong>${app.name}</strong>
      </div>
    `;
}

function StatusCard() {
  return `
      <div class="status-list">
        ${statusRows.map(StatusRow).join("")}
      </div>
      <div class="status-metric-grid">
        ${statusMetrics.map(StatusMetric).join("")}
      </div>
    `;
}

function StatusRow(row) {
  return `
      <div class="status-row">
        <span>${row.label}</span>
        ${
          row.minterDots
            ? MinterLevelDots(row.minterDots)
            : `<strong class="${row.pill ? "status-pill" : ""}">${row.value}</strong>`
        }
      </div>
    `;
}

function MinterLevelDots(level) {
  return `
      <strong class="minter-level-dots" aria-label="Minter level ${level}">
        ${Array.from({ length: 9 })
          .map(
            (_, index) =>
              `<span class="${index < level ? "is-filled" : ""}" aria-hidden="true"></span>`
          )
          .join("")}
      </strong>
    `;
}

function StatusMetric(metric) {
  return `
      <div class="status-metric">
        <span>${metric.label}</span>
        <strong>${metric.value}</strong>
      </div>
    `;
}

function WalletActivity() {
  const transaction = transactions[0];

  return `
      <div class="wallet-actions" aria-label="Read-only wallet actions preview">
        ${walletActions
          .map(
            (action) => `
              <button type="button" data-modal-target="wallet" aria-label="Open Wallet Activity modal: ${action.label}">
                <span class="wallet-action-icon wallet-action-icon--${action.icon}" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="${action.path}"></path>
                  </svg>
                </span>
                <span class="wallet-action-label">${action.label}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="transaction-snapshot">
        <small class="transaction-eyebrow">Recent Transaction</small>
        <div class="transaction-mainline">
          <strong>${transaction.amount}</strong>
          <span>${transaction.label} <b>${transaction.counterparty}</b></span>
        </div>
        <small>${transaction.time}</small>
      </div>
      <span class="wallet-note">Latest transaction within the past 7 days</span>
    `;
}

function TransactionRow(transaction) {
  return `
      <div class="transaction-row">
        <span class="transaction-dot transaction-dot--${transaction.tone}" aria-hidden="true"></span>
        <span>${transaction.label}</span>
        <strong>${transaction.amount}</strong>
        <small>${transaction.time}</small>
      </div>
    `;
}

function StaticIcon(path, className = "") {
  return `
      <svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="${path}"></path>
      </svg>
    `;
}

function WidgetToolbar(label) {
  return `
      <div class="widget-toolbar" aria-hidden="true">
        <span class="widget-toolbar__icon">${StaticIcon(toolbarIcons.refresh)}</span>
        <span class="widget-toolbar__icon">${StaticIcon(toolbarIcons.swap)}</span>
        <span class="widget-toolbar__action">${StaticIcon(toolbarIcons.open)}${label}</span>
      </div>
    `;
}

function GroupActivity() {
  return `
      ${WidgetToolbar("Open in Q-Chat")}
      <div class="group-tabs" aria-hidden="true">
        <span class="is-active">Notifications <em>3</em></span>
        <span>Invites</span>
        <span>Requests</span>
        <span>Promoted</span>
        <button class="group-discover" type="button" disabled>
          ${StaticIcon(toolbarIcons.search)}
          Discover Groups
        </button>
      </div>
      <div class="group-list">
        ${groups.map(GroupRow).join("")}
      </div>
    `;
}

function GroupRow(group) {
  const avatarMarkup = group.avatarImage
    ? `<span class="group-icon group-icon--image group-icon--${group.avatar}" aria-hidden="true">
          <img src="${group.avatarImage}" width="${group.avatarWidth || 128}" height="${group.avatarHeight || 128}" alt="" loading="lazy" />
        </span>`
    : `<span class="group-icon group-icon--${group.avatar}" aria-hidden="true"></span>`;

  return `
      <article class="group-row ${group.unread ? "is-unread" : ""}">
        ${avatarMarkup}
        <div class="group-row__content">
          <div class="group-row__topline">
            <strong>${group.name}</strong>
            <span class="group-chat-mark">${StaticIcon(toolbarIcons.chat)}</span>
            <time>${group.time}</time>
          </div>
          <small class="group-row__sender">from <b>${group.sender}</b></small>
          <span class="group-row__encrypted">${StaticIcon(toolbarIcons.lock)} New encrypted message</span>
          <span class="group-row__open">${StaticIcon(toolbarIcons.open)} View conversation</span>
        </div>
      </article>
    `;
}

function QuitterFeed() {
  return `
      ${WidgetToolbar("Open in Q-Apps")}
      <div class="feed-tabs" aria-hidden="true">
        <span class="is-active">General</span>
        <span>Following</span>
        <small>General feed</small>
      </div>
      <div class="feed-list">
        ${feedPosts.map(FeedPost).join("")}
      </div>
    `;
}

function FeedPost(post) {
  return `
      <article class="feed-post ${post.media ? "feed-post--media" : ""}">
        <div class="feed-post__avatar feed-post__avatar--${post.avatar}" aria-hidden="true"></div>
        <div class="feed-post__content">
          <div class="feed-post__meta">
            <strong>${post.author}</strong>
            <span aria-hidden="true"></span>
            <small>${post.time}</small>
          </div>
          ${post.text ? `<p>${post.text}</p>` : ""}
          ${post.link ? `<code>${post.link}</code>` : ""}
        </div>
        ${
          post.media
            ? `<div class="feed-post__media feed-post__media--${post.media}" aria-hidden="true">
                <span></span>
                <b>Lyrid<br />Meteor</b>
                <small>When the sky</small>
              </div>`
            : ""
        }
      </article>
    `;
}

function FeaturedQAppsModal() {
  const featureBlocks = [
    {
      icon: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5"></circle>
            <path d="M3.8 12h16.4M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5S14.6 18.1 12 20.5M12 3.5C9.4 5.9 8.1 8.7 8.1 12s1.3 6.1 3.9 8.5"></path>
          </svg>
        `,
      title: "No hosting needed",
      text: "Q-Apps run on the Qortal network."
    },
    {
      icon: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <circle cx="12" cy="8" r="3.1"></circle>
            <path d="M5.4 19.5c.8-3.5 3.1-5.4 6.6-5.4s5.8 1.9 6.6 5.4"></path>
          </svg>
        `,
      title: "No accounts to create",
      text: "Use any Q-App instantly."
    },
    {
      icon: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M12 3.6 18.5 6v5c0 4-2.5 7.4-6.5 9.1-4-1.7-6.5-5.1-6.5-9.1V6L12 3.6Z"></path>
          </svg>
        `,
      title: "No platform control",
      text: "You own your data and your experience."
    }
  ];

  const qapps = [
    {
      id: "quitter",
      title: "Quitter",
      description: "Decentralized social feed.",
      preview: "social",
      icon: assetUrl("quitter-icon.webp"),
      iconWidth: 128,
      iconHeight: 128,
      previewImage: assetUrl("quitter-preview-slot.png")
    },
    {
      id: "tube",
      title: "Q-Tube",
      description: "Video sharing without takedowns.",
      preview: "tube",
      icon: assetUrl("q-tube-icon.webp"),
      iconWidth: 128,
      iconHeight: 128,
      previewImage: assetUrl("q-tube-preview-slot.png")
    },
    {
      id: "mail",
      title: "Q-Mail",
      description: "Private, encrypted, p2p mailing",
      preview: "mail",
      icon: assetUrl("q-mail.webp"),
      iconWidth: 100,
      iconHeight: 100,
      previewImage: assetUrl("q-mail-preview-slot.png")
    },
    {
      id: "subwire",
      title: "SubWire",
      description: "Write. Publish. Earn.",
      preview: "subwire",
      icon: assetUrl("subwire-icon.webp"),
      iconWidth: 128,
      iconHeight: 128,
      previewImage: assetUrl("subwire-preview-slot.png")
    }
  ];

  return `
      <div class="qapps-modal">
        <div class="qapps-modal__intro">
          <p class="info-modal__eyebrow">Q-APPS</p>
          <h2 id="info-modal-title">Apps that run<br />on the network.</h2>
          <p class="qapps-modal__lede">
            Q-Apps are decentralized web apps built with HTML, CSS and JavaScript, published to the QDN and opened inside Hub. Actions get validated by the blockchain.
          </p>
          <div class="qapps-feature-list">
            ${featureBlocks
              .map(
                (block) => `
                  <article class="qapps-feature">
                    <span class="qapps-feature__icon" aria-hidden="true">${block.icon}</span>
                    <div>
                      <h3>${block.title}</h3>
                      <p>${block.text}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <article class="qapps-built-card">
            <span class="qapps-built-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="m7.1 7.4-5 4.6 5 4.6M16.9 7.4l5 4.6-5 4.6M13.6 4.8 10.4 19.2"></path>
              </svg>
            </span>
            <div>
              <h3>Built with what you already know</h3>
              <p>Q-Apps use standard web technologies: HTML, CSS and JavaScript.<br />You can build one and publish it directly to the network.</p>
            </div>
          </article>
          <a class="qapps-doc-link" href="https://qortal.dev/docs/q-apps" target="_blank" rel="noreferrer">
            View Documentation
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="qapps-modal__showcase">
          <div class="qapps-card-grid">
            ${qapps.map(QAppShowcaseCard).join("")}
          </div>
          <div class="qapps-modal__footer">
            <span class="qapps-modal__footer-icon" aria-hidden="true"></span>
            <p>New Q-Apps are being built and published by the community daily.</p>
          </div>
        </div>
      </div>
    `;
}

function QAppShowcaseCard(app) {
  const iconMarkup = app.icon
    ? `<img class="qapps-card__logo qapps-card__icon-image qapps-card__icon-image--${app.id}" src="${app.icon}" width="${app.iconWidth || 128}" height="${app.iconHeight || 128}" alt="" aria-hidden="true" />`
    : `<span class="qapps-card__logo qapps-card__logo--${app.id}" aria-hidden="true"></span>`;

  return `
      <article class="qapps-card qapps-card--${app.id}">
        <div class="qapps-card__top">
          ${iconMarkup}
          <div>
            <h3>${app.title}</h3>
            <p>${app.description}</p>
          </div>
        </div>
        <div class="qapps-preview qapps-preview--${app.preview}" aria-hidden="true">
          ${app.previewImage ? `<img src="${app.previewImage}" alt="" aria-hidden="true" />` : ""}
        </div>
      </article>
    `;
}

function GroupActivityModal() {
  const groupFeatures = [
    {
      icon: "people",
      title: "Create Public or Private Groups",
      text: "Build communities on your terms. Choose who can join and participate."
    },
    {
      icon: "lock",
      title: "End-to-End Encrypted",
      text: "Your conversations are encrypted and secure."
    },
    {
      icon: "shield",
      title: "Decentralized & Censorship-Resistant",
      text: "No central servers. No platform control. Just you and your community."
    },
    {
      icon: "clock",
      title: "Disappearing Messages",
      text: "Messages and media automatically disappear after 24 hours."
    },
    {
      icon: "chat",
      title: "Built into the Hub",
      text: "Seamlessly access all your groups directly from Qortal Hub."
    }
  ];

  const groupRows = [
    {
      icon: "general",
      title: "Qortal General",
      sender: "Raven",
      time: "1h ago"
    },
    {
      icon: "qnn",
      image: assetUrl("qort-coin-blue-avatar.webp"),
      imageWidth: 128,
      imageHeight: 128,
      title: "QNN-Chat",
      sender: "AndY",
      time: "3h ago"
    }
  ];

  return `
      <div class="group-activity-modal">
        <section class="group-activity-modal__copy">
          <p class="info-modal__eyebrow">GROUP ACTIVITY</p>
          <h2 id="info-modal-title">Private, Encrypted<br />Groups in Q-Chat.</h2>
          <p class="group-activity-modal__lede">
            Create public or private groups that live entirely on the Qortal network.
          </p>
          <p class="group-activity-modal__subtext">Decentralized, encrypted, and built for real privacy.</p>
          <span class="group-activity-modal__lede-separator" aria-hidden="true"></span>
          <div class="group-activity-feature-list">
            ${groupFeatures
              .map(
                (feature) => `
                  <article class="group-activity-feature group-activity-feature--${feature.icon}">
                    <span class="group-activity-feature__icon" aria-hidden="true"></span>
                    <div>
                      <h3>${feature.title}</h3>
                      <p>${feature.text}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
  
        <section class="group-activity-modal__panel" aria-label="Read-only Q-Chat group activity preview">
          <div class="group-activity-panel__header">
            <h3>GROUP ACTIVITY</h3>
            <div class="group-activity-panel__tools" aria-hidden="true">
              <span class="group-activity-tool group-activity-tool--refresh"></span>
              <span class="group-activity-tool group-activity-tool--open"></span>
              <button type="button"><i></i>Open in Q-Chat</button>
            </div>
          </div>
          <div class="group-activity-tabs" aria-hidden="true">
            <span class="is-active">All <em data-group-activity-count>2</em></span>
            <span>Invites</span>
            <span>Requests</span>
            <span>Promoted</span>
          </div>
          <div class="group-activity-thread-list">
            <article class="group-activity-thread group-activity-thread--incoming" data-group-activity-new hidden aria-hidden="true">
              <span class="group-activity-thread__avatar group-activity-thread__avatar--privatefixxer group-activity-thread__avatar--image" aria-hidden="true">
                <img src="${assetUrl("siesta-410-avatar.webp")}" width="192" height="371" alt="" loading="lazy" />
              </span>
              <div class="group-activity-thread__content">
                <div class="group-activity-thread__topline">
                  <strong>New Qortal Members Join Here</strong>
                  <i aria-hidden="true"></i>
                  <time>just now</time>
                </div>
                <p>from <b>privateFixXer</b></p>
                <span class="group-activity-thread__meta group-activity-thread__meta--lock">New encrypted message</span>
                <span class="group-activity-thread__meta group-activity-thread__meta--open">View conversation</span>
              </div>
            </article>
            ${groupRows
              .map(
                (row) => `
                  <article class="group-activity-thread">
                    ${
                      row.image
                        ? `<span class="group-activity-thread__avatar group-activity-thread__avatar--${row.icon} group-activity-thread__avatar--image" aria-hidden="true">
                            <img src="${row.image}" width="${row.imageWidth || 128}" height="${row.imageHeight || 128}" alt="" loading="lazy" />
                          </span>`
                        : `<span class="group-activity-thread__avatar group-activity-thread__avatar--${row.icon}" aria-hidden="true"></span>`
                    }
                    <div class="group-activity-thread__content">
                      <div class="group-activity-thread__topline">
                        <strong>${row.title}</strong>
                        <i aria-hidden="true"></i>
                        <time>${row.time}</time>
                      </div>
                      <p>from <b>${row.sender}</b></p>
                      <span class="group-activity-thread__meta group-activity-thread__meta--lock">New encrypted message</span>
                      <span class="group-activity-thread__meta group-activity-thread__meta--open">View conversation</span>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <button class="group-activity-discover" type="button">
            <span aria-hidden="true"></span>
            Discover Groups
          </button>
        </section>
      </div>
    `;
}

function StatusNetworkModal() {
  const statusFeatures = [
    {
      icon: "people",
      title: "Decentralized by design",
      text: "QDN has no central server. It's a network of independent nodes working together."
    },
    {
      icon: "shield",
      title: "Served by the network",
      text: "Content is distributed across nodes, not hosted on a central server."
    },
    {
      icon: "data",
      title: "Content stays available",
      text: "Data is stored across many nodes, making it resilient and always accessible."
    },
    {
      icon: "bolt",
      title: "Linked to the blockchain",
      text: "Content references are secured on the blockchain, while files live on QDN."
    },
    {
      icon: "upload",
      title: "Publish to QDN",
      text: "Your content is distributed across nodes and linked to your identity."
    }
  ];

  const graphNodes = [
    { id: "n1", x: 62, y: 146 },
    { id: "n2", x: 112, y: 78 },
    { id: "n3", x: 120, y: 218 },
    { id: "n4", x: 218, y: 135 },
    { id: "n5", x: 258, y: 70 },
    { id: "n6", x: 254, y: 218 },
    { id: "you", x: 328, y: 148, you: true },
    { id: "n7", x: 414, y: 78 },
    { id: "n8", x: 472, y: 138 },
    { id: "n9", x: 526, y: 82 },
    { id: "n10", x: 540, y: 212 },
    { id: "n11", x: 598, y: 150 }
  ];

  const graphLines = [
    [62, 146, 112, 78],
    [62, 146, 120, 218],
    [112, 78, 218, 135, "strong"],
    [120, 218, 218, 135],
    [218, 135, 258, 70],
    [218, 135, 254, 218],
    [218, 135, 328, 148, "strong"],
    [258, 70, 328, 148],
    [254, 218, 328, 148],
    [328, 148, 414, 78, "strong"],
    [328, 148, 472, 138, "strong"],
    [328, 148, 540, 212],
    [414, 78, 472, 138],
    [414, 78, 526, 82],
    [472, 138, 526, 82],
    [472, 138, 540, 212, "strong"],
    [472, 138, 598, 150],
    [526, 82, 598, 150],
    [540, 212, 598, 150],
    [120, 218, 540, 212]
  ];

  const overviewItems = [
    {
      icon: "sync",
      label: "Node Status",
      value: "Synced",
      accent: "green",
      dot: true
    },
    {
      icon: "wallet",
      label: "QORT Balance",
      value: "8.45 QORT",
      accent: "blue"
    },
    {
      icon: "peers",
      label: "Peers",
      value: "242",
      accent: "blue",
      countFrom: 218,
      countTo: 242
    },
    {
      icon: "data",
      label: "QDN Data Peers",
      value: "80",
      accent: "purple",
      countFrom: 68,
      countTo: 80
    },
    {
      icon: "block",
      label: "Block Height",
      value: "1,234,567",
      accent: "purple",
      countFrom: 1234108,
      countTo: 1234567
    },
    { icon: "core", label: "Core Version", value: "1.10.3", accent: "green" },
    { icon: "hub", label: "Hub Version", value: "1.10.1", accent: "blue" },
    { icon: "node", label: "Node Type", value: "Full Node", accent: "gold" },
    {
      icon: "medal",
      label: "Minter Level",
      value: "7",
      accent: "gold",
      badge: true,
      countFrom: 5,
      countTo: 7
    }
  ];

  return `
      <div class="status-network-modal">
        <section class="status-network-modal__copy">
          <p class="info-modal__eyebrow">NETWORK STATUS</p>
          <h2 id="info-modal-title">You are the network.<br />Together,<br /><em>we are QDN.</em></h2>
          <p class="status-network-modal__lede">
            The Qortal Data Network (QDN) is a decentralized data network. It stores and serves content across the network.
          </p>
          <div class="status-feature-list">
            ${statusFeatures
              .map(
                (feature) => `
                  <article class="status-feature status-feature--${feature.icon}">
                    <span class="status-feature__icon" aria-hidden="true"></span>
                    <div>
                      <h3>${feature.title}</h3>
                      <p>${feature.text}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
        <section class="status-network-modal__visual">
          <article class="status-qdn-card">
            <div class="status-qdn-card__intro">
              <h3>The Qortal Data Network (QDN)</h3>
              <p>QDN = content storage. Blockchain = validation.</p>
            </div>
            <div class="status-qdn-graph" aria-label="QDN node graph with your node connected to other peer nodes">
              <svg class="status-qdn-graph__lines" viewBox="0 0 660 280" aria-hidden="true">
                ${graphLines
                  .map(
                    ([x1, y1, x2, y2, strength], index) =>
                      `<line class="status-qdn-line status-qdn-line--${index % 3}${strength ? ` status-qdn-line--${strength}` : ""}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`
                  )
                  .join("")}
              </svg>
              ${graphNodes
                .map((node) => {
                  const left = ((node.x / 660) * 100).toFixed(2);
                  const top = ((node.y / 280) * 100).toFixed(2);

                  return `
                    <span
                      class="status-qdn-node ${node.you ? "status-qdn-node--you" : "status-qdn-node--other"}"
                      style="--x: ${left}%; --y: ${top}%;"
                      aria-hidden="true"
                    ></span>
                  `;
                })
                .join("")}
            </div>
            <div class="status-qdn-legend" aria-label="QDN graph legend">
              <span><i class="status-qdn-legend__dot status-qdn-legend__dot--you"></i>Your Node</span>
              <span><i class="status-qdn-legend__dot status-qdn-legend__dot--other"></i>Other Node</span>
              <span><i class="status-qdn-legend__line"></i>Peer Connection</span>
            </div>
          </article>
          <article class="status-overview-card">
            <h3>Your Network Overview</h3>
            <div class="status-overview-grid">
              ${overviewItems
                .map((item) => {
                  const countAttrs =
                    typeof item.countTo === "number"
                      ? ` data-count-up data-count-from="${item.countFrom}" data-count-target="${item.countTo}"`
                      : "";

                  return `
                    <div class="status-overview-item status-overview-item--${item.accent}">
                      <span class="status-overview-item__icon status-overview-item__icon--${item.icon}" aria-hidden="true"></span>
                      <div>
                        <p>${item.label}</p>
                        <strong${countAttrs}>${item.value}${item.dot ? `<i aria-hidden="true"></i>` : ""}${item.badge ? `<em aria-hidden="true"></em>` : ""}</strong>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </article>
          <p class="status-network-modal__note">
            <span aria-hidden="true"></span>
            All values are live from the network and may change.
          </p>
        </section>
      </div>
    `;
}

function WalletQortModal() {
  const walletFeatures = [
    {
      icon: "send",
      title: "Send and receive QORT",
      text: "Fast, secure transactions across the Qortal network."
    },
    {
      icon: "receive",
      title: "Pay publishing fees",
      text: "Every blockchain action costs 0.01 QORT and helps keep the network running."
    },
    {
      icon: "cube",
      title: "Use QORT in apps",
      text: "Pay for actions like publishing or unlock paid features in apps."
    },
    {
      icon: "trade",
      title: "Trade QORT (in-app)",
      text: "Exchange QORT directly within the ecosystem."
    },
    {
      icon: "coins",
      title: "Earn by running a node",
      text: "Validate the blockchain and earn QORT as a reward."
    }
  ];

  const walletTransactions = [
    {
      icon: "down",
      tone: "green",
      title: "Received",
      detail: "From George",
      amount: "+5.00 QORT",
      time: "1 day ago"
    },
    {
      icon: "up",
      tone: "purple",
      title: "Sent",
      detail: "To Alice",
      amount: "-2.30 QORT",
      time: "2 days ago"
    },
    {
      icon: "trade",
      tone: "green",
      title: "Traded",
      detail: "QORT &rarr; LTC",
      amount: "-1.20 QORT",
      time: "3 days ago"
    },
    {
      icon: "down",
      tone: "green",
      title: "Received",
      detail: "From Qortal Rewards (Minting)",
      amount: "+1.75 QORT",
      time: "5 days ago"
    }
  ];

  return `
      <div class="wallet-qort-modal">
        <section class="wallet-qort-modal__copy">
          <p class="info-modal__eyebrow">WALLET</p>
          <h2 id="info-modal-title">Your QORT.<br />Your control.</h2>
          <p class="wallet-qort-modal__lede">
            QORT powers transactions and publishing on the network.<br />
            Use it, earn it, and keep your control.
          </p>
          <div class="wallet-qort-feature-list">
            ${walletFeatures
              .map(
                (feature) => `
                  <article class="wallet-qort-feature wallet-qort-feature--${feature.icon}">
                    <span class="wallet-qort-icon" aria-hidden="true"></span>
                    <div>
                      <h3>${feature.title}</h3>
                      <p>${feature.text}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <aside class="wallet-qort-fee">
            <span class="wallet-qort-fee__icon" aria-hidden="true"></span>
            <div>
              <strong>0.01 QORT network fee</strong>
              <p>Each blockchain-related action incurs a 0.01 QORT fee which is used to pay the minters who validate the blocks that make up the blockchain.</p>
            </div>
          </aside>
        </section>
  
        <section class="wallet-qort-modal__main">
          <article class="wallet-qort-balance">
            <div class="wallet-qort-balance__copy">
              <p>QORT BALANCE</p>
              <strong>8.45 QORT</strong>
              <span>&asymp; $2.58 USD</span>
            </div>
            <img class="wallet-qort-coin" src="${assetUrl("qort-coin-blue-wallet.webp")}" width="512" height="512" alt="" aria-hidden="true" />
            <div class="wallet-qort-actions" aria-label="Read-only QORT wallet actions">
              <button type="button">
                <span class="wallet-qort-action-icon wallet-qort-action-icon--send" aria-hidden="true"></span>
                Send
              </button>
              <button type="button">
                <span class="wallet-qort-action-icon wallet-qort-action-icon--receive" aria-hidden="true"></span>
                Receive
              </button>
              <button type="button">
                <span class="wallet-qort-action-icon wallet-qort-action-icon--trade" aria-hidden="true"></span>
                Trade
              </button>
            </div>
          </article>
  
          <article class="wallet-qort-activity">
            <div class="wallet-qort-activity__header">
              <h3>WALLET ACTIVITY</h3>
            </div>
            <div class="wallet-qort-activity__list">
              ${walletTransactions
                .map(
                  (item) => `
                    <div class="wallet-qort-transaction">
                      <span class="wallet-qort-transaction__icon wallet-qort-transaction__icon--${item.tone} wallet-qort-transaction__icon--${item.icon}" aria-hidden="true"></span>
                      <div class="wallet-qort-transaction__meta">
                        <strong>${item.title}</strong>
                        <span>${item.detail}</span>
                      </div>
                      <div class="wallet-qort-transaction__amount wallet-qort-transaction__amount--${item.amount.startsWith("+") ? "positive" : "negative"}">
                        <strong>${item.amount}</strong>
                        <span>${item.time}</span>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
  
          <article class="wallet-qort-secure">
            <span class="wallet-qort-secure__icon" aria-hidden="true"></span>
            <div>
              <h3>Your wallet is secure</h3>
              <p>Only you control your keys and your funds.</p>
            </div>
            <span class="wallet-qort-secure__tag"><i aria-hidden="true"></i>Self-custody</span>
          </article>
        </section>
      </div>
    `;
}

function AccountIdentityModal() {
  const identityBlocks = [
    {
      icon: "apps",
      title: "Access every Q-App",
      text: "Use any Q-App with the same identity. No new signups."
    },
    {
      icon: "chat",
      title: "Chat and connect",
      text: "Message users, join groups, and stay connected."
    },
    {
      icon: "wallet",
      title: "Manage your wallet",
      text: "Send, receive and use QORT across the network."
    },
    {
      icon: "publish",
      title: "Publish freely",
      text: "Share content directly without servers or intermediaries."
    }
  ];

  const graphNodes = [
    { id: "apps", label: "Q-Apps" },
    { id: "chat", label: "Chat" },
    { id: "wallet", label: "Wallet" },
    { id: "names", label: "Names" },
    { id: "publishing", label: "Publishing" },
    { id: "more", label: "+ more" }
  ];

  const behindBlocks = [
    {
      icon: "keys",
      symbol: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path class="identity-svg-fill" d="M12 2.2 20.6 5.4v5.8c0 4.9-3.4 9-8.6 10.6-5.2-1.6-8.6-5.7-8.6-10.6V5.4L12 2.2Z" />
            <path class="identity-svg-cut" d="M12 6.9v9.7" />
          </svg>
        `,
      title: "Your keys, your control",
      text: "Keys are stored locally and used to prove ownership on the network."
    },
    {
      icon: "accounts",
      symbol: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <rect class="identity-svg-fill" x="4.6" y="9.7" width="14.8" height="10.2" rx="2.3" />
            <path class="identity-svg-line" d="M7.8 9.7V7.5a4.2 4.2 0 0 1 8.4 0v2.2" />
            <circle class="identity-svg-cut" cx="12" cy="14.8" r="1" />
          </svg>
        `,
      title: "No central accounts",
      text: "No platform database, no third-party login or account recovery."
    },
    {
      icon: "privacy",
      symbol: `
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path class="identity-svg-line" d="M2.2 12s3.8-6.2 9.8-6.2 9.8 6.2 9.8 6.2-3.8 6.2-9.8 6.2S2.2 12 2.2 12Z" />
            <circle class="identity-svg-fill" cx="12" cy="12" r="3.6" />
          </svg>
        `,
      title: "Privacy by default",
      text: "No tracking, no data shared, your identity stays yours."
    }
  ];

  return `
      <div class="account-identity-modal">
        <div class="account-identity-modal__hero">
          <div class="account-identity-modal__copy">
            <p class="info-modal__eyebrow">QORTAL IDENTITY</p>
            <h2 id="info-modal-title">One account.<br /><span>Everything connected.</span></h2>
            <p class="info-modal__body">
              Your Qortal account is more than a login.<br />
              It’s your identity across the entire network.
            </p>
            <div class="identity-feature-list">
              ${identityBlocks
                .map(
                  (block) => `
                    <article class="identity-feature">
                      <span class="identity-feature__icon identity-icon identity-icon--${block.icon}" aria-hidden="true"></span>
                      <div>
                        <h3>${block.title}</h3>
                        <p>${block.text}</p>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="account-identity-modal__visual">
            <div class="identity-profile-card">
              <div class="identity-profile-card__avatar" aria-hidden="true">
                <img src="${assetUrl("QortinoCurrentNoAntenna.svg")}" alt="" />
              </div>
              <div class="identity-profile-card__content">
                <div class="identity-profile-card__name">
                  <strong>qortaluser</strong>
                  <span class="identity-copy-icon" aria-hidden="true"></span>
                </div>
                <div class="identity-profile-card__status">
                  <span>Qortal Name</span>
                  <em><i aria-hidden="true"></i>Online</em>
                </div>
                <div class="identity-profile-card__address">
                  <span>Qortal Address</span>
                  <strong>Ge0rG3...2026</strong>
                  <span class="identity-copy-icon" aria-hidden="true"></span>
                </div>
              </div>
            </div>
            <div class="identity-network" aria-label="One Qortal identity connected to apps, chat, wallet, names, publishing, and more">
              <svg class="identity-network__lines" viewBox="0 0 560 340" aria-hidden="true">
                <polyline class="identity-line" points="280,176 214,105 112,105"></polyline>
                <polyline class="identity-line" points="280,176 198,176 92,176"></polyline>
                <polyline class="identity-line" points="280,176 214,247 112,247"></polyline>
                <polyline class="identity-line" points="280,176 346,105 448,105"></polyline>
                <polyline class="identity-line" points="280,176 362,176 468,176"></polyline>
                <polyline class="identity-line" points="280,176 346,247 448,247"></polyline>
                <circle class="identity-line-dot" cx="214" cy="105" r="3"></circle>
                <circle class="identity-line-dot" cx="112" cy="105" r="3"></circle>
                <circle class="identity-line-dot" cx="198" cy="176" r="3"></circle>
                <circle class="identity-line-dot" cx="92" cy="176" r="3"></circle>
                <circle class="identity-line-dot" cx="214" cy="247" r="3"></circle>
                <circle class="identity-line-dot" cx="112" cy="247" r="3"></circle>
                <circle class="identity-line-dot" cx="346" cy="105" r="3"></circle>
                <circle class="identity-line-dot" cx="448" cy="105" r="3"></circle>
                <circle class="identity-line-dot" cx="362" cy="176" r="3"></circle>
                <circle class="identity-line-dot" cx="468" cy="176" r="3"></circle>
                <circle class="identity-line-dot" cx="346" cy="247" r="3"></circle>
                <circle class="identity-line-dot" cx="448" cy="247" r="3"></circle>
                <circle class="identity-flow-dot identity-flow-dot--1" r="2.15">
                  <animateMotion dur="7.8s" begin="0s" repeatCount="indefinite" path="M280 176 L214 105 L112 105"></animateMotion>
                </circle>
                <circle class="identity-flow-dot identity-flow-dot--2" r="2.15">
                  <animateMotion dur="8.4s" begin="1.8s" repeatCount="indefinite" path="M280 176 L198 176 L92 176"></animateMotion>
                </circle>
                <circle class="identity-flow-dot identity-flow-dot--3" r="2.15">
                  <animateMotion dur="7.2s" begin="3.2s" repeatCount="indefinite" path="M280 176 L346 105 L448 105"></animateMotion>
                </circle>
                <circle class="identity-flow-dot identity-flow-dot--4" r="2.15">
                  <animateMotion dur="8.8s" begin="4.6s" repeatCount="indefinite" path="M280 176 L346 247 L448 247"></animateMotion>
                </circle>
              </svg>
              <div class="identity-network__label">Your Qortal Account</div>
              <div class="identity-network__center" role="img" aria-label="Qortal">
                <span class="identity-network__logo" aria-hidden="true"></span>
              </div>
              ${graphNodes
                .map(
                  (node) => `
                    <div class="identity-node identity-node--${node.id}">
                      <span class="identity-icon identity-icon--${node.id === "publishing" ? "publish" : node.id}" aria-hidden="true"></span>
                      <strong>${node.label}</strong>
                    </div>
                  `
                )
                .join("")}
            </div>
            <p class="identity-tagline">One identity. Unlimited possibilities.</p>
            <section class="identity-behind">
              <h3>Behind the scenes</h3>
              <div class="identity-behind__grid">
                ${behindBlocks
                  .map(
                    (block) => `
                      <article>
                        <span class="identity-behind__icon identity-behind__icon--${block.icon}" aria-hidden="true">${block.symbol}</span>
                        <h4>${block.title}</h4>
                        <p>${block.text}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
}

function getModalContent(card) {
  if (card.id === "status") {
    return StatusNetworkModal();
  }

  if (card.id === "account") {
    return AccountIdentityModal();
  }

  if (card.id === "apps") {
    return FeaturedQAppsModal();
  }

  if (card.id === "wallet") {
    return WalletQortModal();
  }

  if (card.id === "groups") {
    return GroupActivityModal();
  }

  return "";
}

function setupNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const header = document.querySelector(".site-header");

  if (!toggle || !nav || !header) {
    return;
  }

  if (toggle.dataset.hubDemoNavBound === "1") {
    return;
  }
  toggle.dataset.hubDemoNavBound = "1";

  const setOpen = (isOpen) => {
    header.classList.toggle("is-nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-nav-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function setupInfoModal() {
  const modal = document.querySelector("[data-info-modal]");

  if (!modal) {
    return;
  }

  if (modal.dataset.hubDemoInfoBound === "1") {
    return;
  }
  modal.dataset.hubDemoInfoBound = "1";

  const panel = modal.querySelector(".info-modal__panel");
  const content = modal.querySelector("[data-modal-content]");
  let lastTrigger = null;
  let groupActivityRevealTimer = null;

  const resetGroupActivityReveal = () => {
    window.clearTimeout(groupActivityRevealTimer);
    groupActivityRevealTimer = null;
    modal.querySelectorAll("[data-group-activity-shift]").forEach((item) => {
      item.removeAttribute("data-group-activity-shift");
      item.style.transition = "";
      item.style.transform = "";
      item.style.willChange = "";
    });
    modal.querySelectorAll("[data-group-activity-new]").forEach((item) => {
      item.classList.remove("is-visible");
      item.hidden = true;
      item.setAttribute("aria-hidden", "true");
    });

    const count = modal.querySelector("[data-group-activity-count]");

    if (count) {
      count.textContent = "2";
    }
  };

  const revealGroupActivity = () => {
    const item = modal.querySelector("[data-group-activity-new]");
    const count = modal.querySelector("[data-group-activity-count]");
    const list = item?.closest(".group-activity-thread-list");
    const discoverButton = modal.querySelector(".group-activity-discover");

    if (!item || !list) {
      return;
    }

    const revealDelay = 950;

    groupActivityRevealTimer = window.setTimeout(() => {
      const shiftedItems = [
        ...list.querySelectorAll(
          ".group-activity-thread:not([data-group-activity-new])"
        )
      ];

      if (discoverButton) {
        shiftedItems.push(discoverButton);
      }

      const beforePositions = new Map(
        shiftedItems.map((shiftedItem) => [
          shiftedItem,
          shiftedItem.getBoundingClientRect().top
        ])
      );

      item.hidden = false;
      item.setAttribute("aria-hidden", "true");

      shiftedItems.forEach((shiftedItem) => {
        const beforeTop = beforePositions.get(shiftedItem);
        const afterTop = shiftedItem.getBoundingClientRect().top;
        const deltaY = beforeTop - afterTop;

        if (Math.abs(deltaY) < 1) {
          return;
        }

        shiftedItem.dataset.groupActivityShift = "true";
        shiftedItem.style.transition = "none";
        shiftedItem.style.transform = `translateY(${deltaY}px)`;
        shiftedItem.style.willChange = "transform";
      });

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          shiftedItems.forEach((shiftedItem) => {
            shiftedItem.style.transition =
              "transform 520ms cubic-bezier(0.2, 0.72, 0.18, 1)";
            shiftedItem.style.transform = "";
          });

          item.classList.add("is-visible");
          item.setAttribute("aria-hidden", "false");

          if (count) {
            count.textContent = "3";
          }

          window.setTimeout(() => {
            shiftedItems.forEach((shiftedItem) => {
              shiftedItem.removeAttribute("data-group-activity-shift");
              shiftedItem.style.transition = "";
              shiftedItem.style.transform = "";
              shiftedItem.style.willChange = "";
            });
          }, 560);
        });
      });
    }, revealDelay);
  };

  const formatCountValue = (value) => Math.round(value).toLocaleString("en-US");

  const runStatusCountUps = () => {
    const counters = Array.from(modal.querySelectorAll("[data-count-up]"));

    counters.forEach((counter) => {
      const target = Number(counter.dataset.countTarget);
      const from = Number(counter.dataset.countFrom ?? 0);
      const textNode = Array.from(counter.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (!Number.isFinite(target) || !textNode) {
        return;
      }

      const duration = 860;
      const startedAt = performance.now();

      textNode.nodeValue = formatCountValue(from);

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (target - from) * eased;

        textNode.nodeValue = formatCountValue(current);

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    });
  };

  const clearHubPreviewState = () => {
    document
      .querySelector("[data-hub-preview]")
      ?.classList.remove("has-active-card");
    document.querySelectorAll(".is-active-layer").forEach((layer) => {
      layer.classList.remove("is-active-layer");
    });
    document.querySelectorAll("[data-hub-card]").forEach((card) => {
      card.classList.remove("is-active");
      card.classList.remove("has-viewport-popover");
      card.setAttribute("aria-expanded", "false");
    });
    document
      .querySelectorAll(".info-popover.is-viewport-positioned")
      .forEach((popover) => {
        const card = popover.closest("[data-hub-card]");

        card?.classList.add("is-popover-exiting");
        popover.classList.remove("is-viewport-positioned");
        popover.style.removeProperty("--popover-left");
        popover.style.removeProperty("--popover-top");
        delete popover.dataset.popoverPlacement;

        window.requestAnimationFrame(() => {
          card?.classList.remove("is-popover-exiting");
        });
      });
  };

  const closeModal = () => {
    const sourceCard = lastTrigger?.closest?.("[data-hub-card]");

    resetGroupActivityReveal();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open", "is-modal-opening");
    clearHubPreviewState();

    if (sourceCard) {
      sourceCard.classList.remove("is-hover-suppressed");
      sourceCard.blur();
      window.requestAnimationFrame(() => {
        if (sourceCard.matches(":hover")) {
          sourceCard.dispatchEvent(new MouseEvent("mouseenter"));
        }
      });
      return;
    }

    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  const openModal = (cardId, trigger) => {
    const card = cards.find((entry) => entry.id === cardId);

    if (!card) {
      return;
    }

    lastTrigger = trigger;
    document.body.classList.add("is-modal-opening", "is-modal-open");
    clearHubPreviewState();
    resetGroupActivityReveal();
    panel.classList.toggle("info-modal__panel--status", card.id === "status");
    panel.classList.toggle("info-modal__panel--account", card.id === "account");
    panel.classList.toggle("info-modal__panel--apps", card.id === "apps");
    panel.classList.toggle("info-modal__panel--wallet", card.id === "wallet");
    panel.classList.toggle("info-modal__panel--groups", card.id === "groups");
    content.innerHTML = getModalContent(card);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (card.id === "status") {
      runStatusCountUps();
    }

    if (card.id === "groups") {
      revealGroupActivity();
    }
    window.setTimeout(() => {
      document.body.classList.remove("is-modal-opening");
    }, 120);
    panel.focus();
  };

  modal.querySelectorAll("[data-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-modal-target]");

    if (target) {
      event.preventDefault();
      event.stopPropagation();
      openModal(target.getAttribute("data-modal-target"), target);
      return;
    }

    if (event.target.closest("[data-modal-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      event.target.matches("[data-hub-card][data-modal-target]")
    ) {
      event.preventDefault();
      openModal(event.target.getAttribute("data-modal-target"), event.target);
      return;
    }

    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupMusicPlayer() {
  const player = document.querySelector("[data-music-player]");
  const toggle = player?.querySelector("[data-music-toggle]");
  const audio = player?.querySelector("#hub-preview-audio");
  const progress = player?.querySelector("[data-music-progress]");

  if (!player || !toggle || !audio || !progress) {
    return;
  }

  if (toggle.dataset.hubDemoMusicBound === "1") {
    return;
  }

  toggle.dataset.hubDemoMusicBound = "1";

  const setPlayingState = (isPlaying) => {
    player.classList.toggle("is-playing", isPlaying);
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause lofi preview" : "Play lofi preview"
    );
  };

  const updateProgress = () => {
    const duration = audio.duration;
    const amount =
      Number.isFinite(duration) && duration > 0
        ? (audio.currentTime / duration) * 100
        : 0;

    progress.style.setProperty(
      "--music-progress",
      `${Math.max(0, Math.min(amount, 100)).toFixed(2)}%`
    );
  };

  const resetAudio = () => {
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      // Metadata may not be ready if the user leaves before the preview audio loads.
    }
    setPlayingState(false);
    updateProgress();
  };

  const shouldKeepMusicForUrl = (href) => {
    try {
      const url = new URL(href, window.location.href);

      return (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        hubPreviewMusicHashes.has(url.hash)
      );
    } catch {
      return false;
    }
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (audio.paused) {
      audio.play().catch(() => setPlayingState(false));
      return;
    }

    audio.pause();
  });

  player.addEventListener("mouseleave", () => {
    if (document.activeElement === toggle) {
      toggle.blur();
    }
  });

  audio.addEventListener("play", () => setPlayingState(true));
  audio.addEventListener("pause", () => setPlayingState(false));
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("ended", resetAudio);

  if (!hubDemoMusicGlobalListenersAttached) {
    hubDemoMusicGlobalListenersAttached = true;
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");

      if (link && !shouldKeepMusicForUrl(link.getAttribute("href"))) {
        resetHubPreviewMusicPlayback();
      }
    });

    window.addEventListener("hashchange", () => {
      if (!hubPreviewMusicHashes.has(window.location.hash)) {
        resetHubPreviewMusicPlayback();
      }
    });
  }
}

function setupAccountDecryptHover() {
  const text = document.querySelector("[data-account-decrypt]");
  const card = text?.closest(".hub-card--account");

  if (!text || !card) {
    return;
  }

  const accountName = text.dataset.accountName || text.textContent || "";
  const accountAddress = text.dataset.accountAddress || "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const charPool = Array.from(
    new Set(accountAddress.split("").filter((char) => char.trim()))
  );
  let timer = null;
  let step = 0;
  let isActive = false;

  const getScrambledChar = (fallback, index, currentStep) => {
    if (!charPool.length) {
      return fallback;
    }

    return (
      charPool[(index * 7 + currentStep * 3) % charPool.length] || fallback
    );
  };

  const clearTimer = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };

  const setText = (value) => {
    text.textContent = value;
    text.setAttribute("aria-label", value);
  };

  const resetText = () => {
    isActive = false;
    step = 0;
    clearTimer();
    text.classList.remove("is-decrypting");
    setText(accountName);
  };

  const runAnimation = () => {
    if (isActive || !accountAddress) {
      return;
    }

    isActive = true;
    clearTimer();
    text.classList.add("is-decrypting");
    const maxIterations = reduceMotion.matches ? 8 : 18;
    const speed = reduceMotion.matches ? 55 : 34;
    const revealDelay = reduceMotion.matches ? 1 : 3;
    const paddedName = accountName.padEnd(accountAddress.length, " ");

    const tick = () => {
      const revealStep = Math.max(step - revealDelay, 0);
      const revealFrames = Math.max(maxIterations - revealDelay - 1, 1);
      const progress = Math.min(
        accountAddress.length,
        Math.ceil((revealStep / revealFrames) * accountAddress.length)
      );
      const chars = accountAddress.split("").map((char, index) => {
        if (char === " " || index < progress || step >= maxIterations - 1) {
          return char;
        }

        if (
          step < revealDelay &&
          index < paddedName.length &&
          paddedName[index].trim()
        ) {
          return paddedName[index];
        }

        return getScrambledChar(char, index, step);
      });

      setText(chars.join(""));

      if (step < maxIterations - 1) {
        step += 1;
        timer = window.setTimeout(tick, speed);
        return;
      }

      step = 0;
      timer = null;
      text.classList.remove("is-decrypting");
      setText(accountAddress);
    };

    tick();
  };

  card.addEventListener("mouseenter", runAnimation);
  card.addEventListener("mouseleave", () => {
    if (!card.matches(":focus-within")) {
      resetText();
    }
  });
  card.addEventListener("focusin", runAnimation);
  card.addEventListener("focusout", (event) => {
    if (!card.contains(event.relatedTarget)) {
      resetText();
    }
  });
}

function setupHubInteractions() {
  if (hubDemoInteractionsCleanup) {
    hubDemoInteractionsCleanup();
    hubDemoInteractionsCleanup = null;
  }

  const preview = document.querySelector("[data-hub-preview]");
  const hubCards = Array.from(document.querySelectorAll("[data-hub-card]"));
  const hubLayers = Array.from(
    document.querySelectorAll(".hub-column, .hub-widget-row")
  );
  let popoverFrame = null;
  const popoverExitTimers = new WeakMap();
  const listenerDisposers = [];

  if (!preview || hubCards.length === 0) {
    return;
  }

  const addTrackedListener = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    listenerDisposers.push(() => {
      target.removeEventListener(type, handler, options);
    });
  };

  const cancelPopoverFrame = () => {
    if (popoverFrame) {
      window.cancelAnimationFrame(popoverFrame);
      popoverFrame = null;
    }
  };

  const clearPopoverExit = (card) => {
    const exitTimer = popoverExitTimers.get(card);

    if (exitTimer) {
      window.clearTimeout(exitTimer);
      popoverExitTimers.delete(card);
    }

    card.classList.remove("is-popover-exiting");
  };

  const resetPopoverPosition = (card) => {
    const popover = card?.querySelector?.(".info-popover");

    if (!popover) {
      return;
    }

    const previousExitTimer = popoverExitTimers.get(card);

    if (previousExitTimer) {
      window.clearTimeout(previousExitTimer);
    }

    card.classList.add("is-popover-exiting");
    card.classList.remove("has-viewport-popover");
    popover.classList.remove("is-viewport-positioned");
    popover.style.removeProperty("--popover-left");
    popover.style.removeProperty("--popover-top");
    delete popover.dataset.popoverPlacement;

    const exitTimer = window.setTimeout(() => {
      card.classList.remove("is-popover-exiting");
      popoverExitTimers.delete(card);
    }, 140);

    popoverExitTimers.set(card, exitTimer);
  };

  const resetAllPopoverPositions = () => {
    hubCards.forEach(resetPopoverPosition);
  };

  const clearActiveCards = () => {
    cancelPopoverFrame();
    preview.classList.remove("has-active-card");
    hubLayers.forEach((layer) => layer.classList.remove("is-active-layer"));
    hubCards.forEach((card) => {
      card.classList.remove("is-active");
      card.setAttribute("aria-expanded", "false");
    });
    resetAllPopoverPositions();
  };

  const getViewportTopMargin = () => {
    const header = document.querySelector(".site-header");

    if (!header) {
      return 14;
    }

    const headerRect = header.getBoundingClientRect();
    const headerIsPinned = headerRect.top <= 16 && headerRect.bottom > 0;

    return headerIsPinned ? Math.ceil(headerRect.bottom + 12) : 14;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getEffectiveZoom = (element) => {
    const shell = element?.closest?.(".hub-shell");
    const shellZoom = shell
      ? Number.parseFloat(window.getComputedStyle(shell).zoom)
      : 1;

    return Number.isFinite(shellZoom) && shellZoom > 0 ? shellZoom : 1;
  };

  const getPreferredPopoverPlacements = (card) => {
    if (card.matches(".hub-card--media, .hub-card--quick")) {
      return ["right", "bottom", "top", "left"];
    }

    if (card.matches(".hub-card--status, .hub-card--wallet")) {
      return ["left", "bottom", "right", "top"];
    }

    if (card.matches(".hub-card--account")) {
      return ["bottom", "top"];
    }

    return ["top", "bottom", "right", "left"];
  };

  const getLockedDesktopPopoverPlacement = (card) => {
    if (window.matchMedia("(max-width: 720px)").matches) {
      return null;
    }

    if (card.matches(".hub-card--feed")) {
      return "right";
    }

    if (card.matches(".hub-card--groups")) {
      return "left";
    }

    return null;
  };

  const choosePopoverPlacement = (
    cardRect,
    popoverRect,
    placements,
    topMargin,
    viewportMargin
  ) => {
    const spaces = {
      top: cardRect.top - topMargin,
      bottom: window.innerHeight - cardRect.bottom - viewportMargin,
      left: cardRect.left - viewportMargin,
      right: window.innerWidth - cardRect.right - viewportMargin
    };

    const fits = (placement) =>
      placement === "top" || placement === "bottom"
        ? spaces[placement] >= popoverRect.height + 10
        : spaces[placement] >= popoverRect.width + 10;

    const sideFits = (placement) =>
      (placement === "left" || placement === "right") &&
      spaces[placement] >= popoverRect.width + 10;
    const verticalFits = (placement) =>
      (placement === "top" || placement === "bottom") &&
      spaces[placement] >= popoverRect.height + 10;

    return (
      placements.find(fits) ||
      placements.find(sideFits) ||
      placements.find(verticalFits) ||
      placements.slice().sort((a, b) => spaces[b] - spaces[a])[0]
    );
  };

  const positionPopover = (card) => {
    const popover = card.querySelector(".info-popover");

    if (
      !popover ||
      !card.classList.contains("is-active") ||
      document.body.classList.contains("is-modal-open")
    ) {
      resetPopoverPosition(card);
      return;
    }

    if (window.matchMedia("(max-width: 720px)").matches) {
      resetPopoverPosition(card);
      return;
    }

    const viewportMargin = 14;
    const gap = 8;
    const topMargin = getViewportTopMargin();

    card.classList.add("has-viewport-popover");
    popover.classList.add("is-viewport-positioned");
    popover.style.setProperty("--popover-left", "0px");
    popover.style.setProperty("--popover-top", "0px");

    const zoom = getEffectiveZoom(popover);
    const cardRect = card.getBoundingClientRect();
    const measuredRect = popover.getBoundingClientRect();
    const popoverRect = {
      width: Math.min(
        measuredRect.width,
        window.innerWidth - viewportMargin * 2
      ),
      height: measuredRect.height
    };
    const placement =
      getLockedDesktopPopoverPlacement(card) ||
      choosePopoverPlacement(
        cardRect,
        popoverRect,
        getPreferredPopoverPlacements(card),
        topMargin,
        viewportMargin
      );
    const maxLeft = window.innerWidth - viewportMargin - popoverRect.width;
    const maxTop = window.innerHeight - viewportMargin - popoverRect.height;
    let left = cardRect.left + cardRect.width / 2 - popoverRect.width / 2;
    let top = cardRect.top - popoverRect.height - gap;

    if (placement === "bottom") {
      top = cardRect.bottom + gap;
    } else if (placement === "left") {
      left = cardRect.left - popoverRect.width - gap;
      top = cardRect.top + cardRect.height / 2 - popoverRect.height / 2;
    } else if (placement === "right") {
      left = cardRect.right + gap;
      top = cardRect.top + cardRect.height / 2 - popoverRect.height / 2;
    }

    left = clamp(left, viewportMargin, Math.max(viewportMargin, maxLeft));
    top = clamp(top, topMargin, Math.max(topMargin, maxTop));

    popover.dataset.popoverPlacement = placement;
    popover.style.setProperty("--popover-left", `${Math.round(left / zoom)}px`);
    popover.style.setProperty("--popover-top", `${Math.round(top / zoom)}px`);
  };

  const schedulePopoverPosition = (card) => {
    if (popoverFrame) {
      window.cancelAnimationFrame(popoverFrame);
    }

    popoverFrame = window.requestAnimationFrame(() => {
      popoverFrame = null;
      positionPopover(card);
    });
  };

  const activateCard = (activeCard) => {
    if (activeCard.classList.contains("is-hover-suppressed")) {
      return;
    }

    clearPopoverExit(activeCard);
    preview.classList.add("has-active-card");
    hubLayers.forEach((layer) => {
      layer.classList.toggle("is-active-layer", layer.contains(activeCard));
    });
    hubCards.forEach((card) => {
      const isActive = card === activeCard;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-expanded", String(isActive));

      if (!isActive) {
        resetPopoverPosition(card);
      }
    });
    schedulePopoverPosition(activeCard);
  };

  const releaseFocusedCard = (activeCard) => {
    const focusedCard = document.activeElement?.closest?.("[data-hub-card]");

    if (focusedCard && focusedCard !== activeCard) {
      document.activeElement.blur();
    }
  };

  const isDesktopPopoverMode = () =>
    !window.matchMedia("(max-width: 720px)").matches;

  hubCards.forEach((card) => {
    const handleMouseEnter = () => {
      card.classList.remove("is-hover-suppressed");
      releaseFocusedCard(card);
      activateCard(card);
    };

    const handleMouseLeave = () => {
      card.classList.remove("is-hover-suppressed");
      if (
        card.matches("[data-hover-only-card]") ||
        !card.matches(":focus-within")
      ) {
        clearActiveCards();
      }
    };

    const handleClick = () => {
      if (card.matches("[data-hover-only-card]")) {
        return;
      }

      releaseFocusedCard(card);
      activateCard(card);
    };

    const handleFocusIn = () => {
      if (card.matches("[data-hover-only-card]")) {
        return;
      }

      if (!card.classList.contains("is-hover-suppressed")) {
        activateCard(card);
      }
    };

    const handleFocusOut = (event) => {
      if (!card.contains(event.relatedTarget)) {
        setTimeout(() => {
          if (!preview.contains(document.activeElement)) {
            clearActiveCards();
          }
        }, 0);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        clearActiveCards();
        card.focus();
      }
    };

    addTrackedListener(card, "mouseenter", handleMouseEnter);
    addTrackedListener(card, "mouseleave", handleMouseLeave);
    addTrackedListener(card, "click", handleClick);
    addTrackedListener(card, "focusin", handleFocusIn);
    addTrackedListener(card, "focusout", handleFocusOut);
    addTrackedListener(card, "keydown", handleKeyDown);
  });

  const handlePreviewPointerOver = (event) => {
    if (!isDesktopPopoverMode()) {
      return;
    }

    const card = event.target.closest?.("[data-hub-card]");

    if (!card || !preview.contains(card) || card.classList.contains("is-active")) {
      return;
    }

    card.classList.remove("is-hover-suppressed");
    releaseFocusedCard(card);
    activateCard(card);
  };

  const handlePreviewPointerOut = (event) => {
    if (!isDesktopPopoverMode()) {
      return;
    }

    const card = event.target.closest?.("[data-hub-card]");

    if (!card || !preview.contains(card) || card.contains(event.relatedTarget)) {
      return;
    }

    card.classList.remove("is-hover-suppressed");
    if (
      card.matches("[data-hover-only-card]") ||
      !card.matches(":focus-within")
    ) {
      clearActiveCards();
    }
  };

  addTrackedListener(preview, "pointerover", handlePreviewPointerOver);
  addTrackedListener(preview, "pointerout", handlePreviewPointerOut);

  const updateActivePopover = () => {
    const activeCard = hubCards.find((card) =>
      card.classList.contains("is-active")
    );

    if (activeCard) {
      schedulePopoverPosition(activeCard);
    }
  };

  const scrollListenerOptions = {
    passive: true,
    capture: true
  };
  const resizeListenerOptions = { passive: true };

  addTrackedListener(window, "scroll", updateActivePopover, scrollListenerOptions);
  addTrackedListener(window, "resize", updateActivePopover, resizeListenerOptions);

  hubDemoInteractionsCleanup = () => {
    cancelPopoverFrame();
    listenerDisposers.forEach((dispose) => dispose());
  };
}

export function getHubPreviewHtml() {
  return HubPreview();
}

export function initHubPreviewAfterMount() {
  if (typeof document === "undefined") {
    return;
  }

  if (!document.querySelector("[data-info-modal]")) {
    document.body.insertAdjacentHTML("beforeend", InfoModal());
  }

  const modal = document.querySelector("[data-info-modal]");

  if (!modal?.classList.contains("is-open")) {
    document.body.classList.remove("is-modal-open", "is-modal-opening");
  }

  setupHubInteractions();
  setupInfoModal();
  setupMusicPlayer();
  setupAccountDecryptHover();
  setupNav();
}
