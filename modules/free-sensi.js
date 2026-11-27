/* ==========================================================================
   GSP ROLEX MODULE 01: GSP SENSI / BRAZIL 🇧🇷 / FREESTYLE ENGINE
   Supports:
   - 3 Modes at Top: GSP SENSI | BRAZIL 🇧🇷 | FREESTYLE
   - Any Brand + Custom Typed Model Name (Auto-Calibrated Processor & Tier)
   - DPI Recommendation for Non-iPhone Devices (iPhone DPI explicitly N/A)
   - iPhone Accessibility / Pointer / Switch Control Guide + Android Touch/DPI Tips
   - PC / Laptop Emulator Sensitivity Section
   - Full Weapon Guide (How to play each gun, drag style & recoil control)
   ========================================================================== */

window.GSP_MODULE_FREE_SENSI = function renderFreeSensiModule(mountEl) {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. SENSITIVITY MODES (GSP SENSI | BRAZIL 🇧🇷 | FREESTYLE)
  // ------------------------------------------------------------------------
  const MODES = {
    "GSP SENSI": {
      id: "GSP SENSI",
      badge: "GSP SENSI",
      subtitle: "High-Precision All-Rounder & Rank/Rush Calibration",
      desc: "Balanced high drag speed with clean recoil lock for close-to-mid range fights.",
      genOffset: 0,
      redOffset: 0,
      x2Offset: 0,
      x4Offset: 0,
      sniperOffset: 0,
      freeOffset: 0,
      fireShift: "Balanced (42% - 46%)",
      modeTip: "Chest ke thoda niche aim set karke smooth upward drag maaro; har fight ke baad crosshair reset rakho."
    },
    "BRAZIL 🇧🇷": {
      id: "BRAZIL 🇧🇷",
      badge: "BRAZIL 🇧🇷",
      subtitle: "Fast Snap Flick, Aggressive Movement & High-Speed Drag",
      desc: "Higher snap feel tuned for quick flicks, fast gloo-wall/movement rhythm, and aggressive one-tap timing.",
      genOffset: 4,
      redOffset: 4,
      x2Offset: 3,
      x4Offset: 3,
      sniperOffset: 4,
      freeOffset: 4,
      fireShift: "Fast Snap (40% - 44%)",
      modeTip: "Brazil style mein snap fast hota hai—over-drag se bachne ke liye upward flick crisp aur controlled rakho."
    },
    "FREESTYLE": {
      id: "FREESTYLE",
      badge: "FREESTYLE",
      subtitle: "Creative Movement, Rotation Drag & Fluid Playstyle",
      desc: "Tuned for creative movement, jump/strafe angles, rotation drags, and smooth multi-gun transitions.",
      genOffset: 2,
      redOffset: 3,
      x2Offset: 2,
      x4Offset: 2,
      sniperOffset: 2,
      freeOffset: 6,
      fireShift: "Fluid (42% - 45%)",
      modeTip: "Free Look aur camera movement smooth rakho taaki angle banate waqt enemy ki position track karna aasaan rahe."
    }
  };

  // ------------------------------------------------------------------------
  // 2. BRAND & DEVICE DATABASE (ALL MAJOR BRANDS + ANY CUSTOM MODEL)
  // ------------------------------------------------------------------------
  const DEVICE_DB = {
    "Infinix": [
      { model: "Infinix Hot 40", chip: "MediaTek Helio G88", hz: 90, dpi: "520 - 640 DPI", gen: 186, red: 180, x2: 174, x4: 168, sniper: 100, free: 165, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Infinix Hot 40 Pro", chip: "MediaTek Helio G99", hz: 120, dpi: "560 - 720 DPI", gen: 192, red: 185, x2: 178, x4: 172, sniper: 104, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Infinix GT 20 Pro", chip: "Dimensity 8200 Ultimate", hz: 144, dpi: "600 - 800 DPI", gen: 185, red: 179, x2: 172, x4: 166, sniper: 102, free: 164, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "Infinix Smart 8 / Smart 9", chip: "Unisoc T606 / Helio G81", hz: 90, dpi: "500 - 600 DPI", gen: 196, red: 188, x2: 182, x4: 175, sniper: 105, free: 172, fire: "43% - 46%", gfx: "Smooth / High FPS" }
    ],
    "Motorola": [
      { model: "Motorola Edge 50 Fusion", chip: "Snapdragon 7s Gen 2", hz: 144, dpi: "580 - 760 DPI", gen: 187, red: 181, x2: 174, x4: 168, sniper: 102, free: 165, fire: "42% - 45%", gfx: "Max / High FPS" },
      { model: "Motorola Edge 40 Neo", chip: "MediaTek Dimensity 7030", hz: 144, dpi: "580 - 760 DPI", gen: 188, red: 182, x2: 175, x4: 169, sniper: 104, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Moto G85 5G", chip: "Snapdragon 6s Gen 3", hz: 120, dpi: "560 - 720 DPI", gen: 191, red: 185, x2: 178, x4: 172, sniper: 103, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Moto G54 / G64 5G", chip: "Dimensity 7020 / 7025", hz: 120, dpi: "560 - 720 DPI", gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "Itel / Airtel": [
      { model: "Itel P55 5G (Airtel Edition)", chip: "MediaTek Dimensity 6080", hz: 90, dpi: "520 - 650 DPI", gen: 194, red: 187, x2: 180, x4: 173, sniper: 102, free: 171, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Itel S23 / S23+", chip: "Unisoc T606 / T616", hz: 90, dpi: "500 - 620 DPI", gen: 197, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" },
      { model: "Itel RS4 Gaming", chip: "MediaTek Helio G99 Ultimate", hz: 120, dpi: "550 - 700 DPI", gen: 191, red: 185, x2: 178, x4: 171, sniper: 104, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "Tecno": [
      { model: "Tecno Pova 6 Pro 5G", chip: "MediaTek Dimensity 6080", hz: 120, dpi: "560 - 720 DPI", gen: 190, red: 184, x2: 177, x4: 170, sniper: 104, free: 168, fire: "43% - 46%", gfx: "Ultra / High FPS" },
      { model: "Tecno Camon 30 5G", chip: "MediaTek Dimensity 7020", hz: 120, dpi: "550 - 700 DPI", gen: 190, red: 184, x2: 177, x4: 170, sniper: 103, free: 168, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Tecno Spark 20", chip: "MediaTek Helio G85", hz: 90, dpi: "500 - 620 DPI", gen: 197, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Poco": [
      { model: "POCO X6 Pro 5G", chip: "Dimensity 8300 Ultra", hz: 120, dpi: "600 - 800 DPI", gen: 184, red: 178, x2: 171, x4: 165, sniper: 103, free: 162, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "POCO X6 / M6 Pro 5G", chip: "Snapdragon 7s Gen 2 / 4 Gen 2", hz: 120, dpi: "580 - 760 DPI", gen: 189, red: 183, x2: 176, x4: 169, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "POCO M6 5G", chip: "MediaTek Dimensity 6100+", hz: 90, dpi: "520 - 650 DPI", gen: 194, red: 188, x2: 181, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Redmi / Xiaomi": [
      { model: "Redmi Note 13 Pro+ 5G", chip: "Dimensity 7200 Ultra", hz: 120, dpi: "580 - 760 DPI", gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Redmi Note 13 5G", chip: "MediaTek Dimensity 6080", hz: 120, dpi: "550 - 700 DPI", gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Redmi 13C", chip: "MediaTek Helio G85", hz: 90, dpi: "500 - 620 DPI", gen: 196, red: 190, x2: 183, x4: 176, sniper: 99, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Realme": [
      { model: "Realme Narzo 70 Pro 5G", chip: "MediaTek Dimensity 7050", hz: 120, dpi: "580 - 750 DPI", gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Realme 12+ 5G", chip: "MediaTek Dimensity 7050", hz: 120, dpi: "560 - 720 DPI", gen: 190, red: 184, x2: 177, x4: 170, sniper: 102, free: 168, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Realme C67", chip: "Snapdragon 685", hz: 90, dpi: "520 - 640 DPI", gen: 195, red: 188, x2: 181, x4: 174, sniper: 100, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Samsung": [
      { model: "Samsung Galaxy S24 / S23", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, dpi: "600 - 800 DPI", gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "Samsung Galaxy A55 / A35", chip: "Exynos 1480 / 1380", hz: 120, dpi: "560 - 720 DPI", gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Samsung Galaxy A15 / M15", chip: "Dimensity 6100+", hz: 90, dpi: "520 - 640 DPI", gen: 195, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Vivo": [
      { model: "Vivo T3 / T3x 5G", chip: "Dimensity 7200 / SD 6 Gen 1", hz: 120, dpi: "580 - 750 DPI", gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo V30 / V29", chip: "Snapdragon 7 Gen 3 / 778G", hz: 120, dpi: "580 - 750 DPI", gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo Y28 / Y18", chip: "Dimensity 6020 / Helio G85", hz: 90, dpi: "500 - 620 DPI", gen: 195, red: 188, x2: 181, x4: 174, sniper: 100, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Oppo": [
      { model: "Oppo F27 Pro+ / Reno 11", chip: "MediaTek Dimensity 7050", hz: 120, dpi: "560 - 720 DPI", gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Oppo A79 5G / K12x", chip: "Dimensity 6020 / 6300", hz: 90, dpi: "520 - 650 DPI", gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Oppo A38 / A18", chip: "MediaTek Helio G85", hz: 90, dpi: "500 - 620 DPI", gen: 196, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "OnePlus": [
      { model: "OnePlus 12 / 12R", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, dpi: "600 - 800 DPI", gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "OnePlus Nord CE 4 / Nord 4", chip: "Snapdragon 7 Gen 3 / 7+ Gen 3", hz: 120, dpi: "580 - 760 DPI", gen: 185, red: 179, x2: 172, x4: 166, sniper: 104, free: 163, fire: "41% - 44%", gfx: "Max / High FPS" }
    ],
    "iQOO": [
      { model: "iQOO Neo 9 Pro / Neo 7 Pro", chip: "Snapdragon 8 Gen 2 / 8+ Gen 1", hz: 144, dpi: "600 - 820 DPI", gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iQOO Z9 / Z9x 5G", chip: "Dimensity 7200 / SD 6 Gen 1", hz: 120, dpi: "580 - 750 DPI", gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" }
    ],
    "Apple iPhone": [
      { model: "iPhone 15 / 15 Pro Max", chip: "Apple A16 / A17 Pro", hz: 120, dpi: "N/A (iOS No DPI)", gen: 183, red: 178, x2: 172, x4: 166, sniper: 109, free: 162, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iPhone 14 / 13 / 12", chip: "Apple A15 / A14 Bionic", hz: 60, dpi: "N/A (iOS No DPI)", gen: 188, red: 182, x2: 176, x4: 170, sniper: 106, free: 166, fire: "42% - 45%", gfx: "Max / High FPS" }
    ],
    "Other / Any Global Brand": [
      { model: "Custom Global Device", chip: "Auto-Calibrated Gaming SoC", hz: 90, dpi: "520 - 660 DPI", gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Smooth / High FPS" }
    ]
  };

  // ------------------------------------------------------------------------
  // 3. PHONE SYSTEM SETTINGS GUIDE (IPHONE ACCESSIBILITY/POINTER & ANDROID)
  // ------------------------------------------------------------------------
  const PHONE_SETTINGS_GUIDE = {
    iphone: {
      title: "🍎 iPhone Accessibility, Pointer & Touch Settings (Fair Gameplay Tuning)",
      points: [
        "Settings > Accessibility > Touch > Touch Accommodations: agar accidental double-touch aata hai toh Hold Duration / Tap Assistance ko clean level par test karke rakho.",
        "Settings > Accessibility > Pointer Control: Pointer Size aur Scrolling Speed / Contrast ko apne comfortable visibility aur smooth movement ke hisaab se set karo.",
        "Settings > Accessibility > Switch Control: agar Switch Control use karte ho toh Auto Scanning / Tap Behavior ko comfortable timing par rakho taaki movement stutters na aayein.",
        "Settings > Accessibility > Motion: Reduce Motion aur Frame Rate limit ko check karke smooth display response rakho.",
        "Note: iPhone mein Android jaisa 'Smallest Width DPI' option nahi hota, isliye sensitivity aur fire button placement ko fine-tune karna zyada zaroori hota hai."
      ]
    },
    android: {
      title: "🤖 Android DPI & Touch Response Guidelines (Safe & Balanced)",
      points: [
        "Developer Options > Smallest Width (DPI): sirf supported Android phones mein hota hai; extreme high DPI se UI chhota aur touch/heat issue aa sakta hai, isliye recommended range ke andar hi rakho.",
        "Battery & Performance: Game Mode / Performance Mode ON rakho aur background heavy apps band rakho taaki frame drops na aayein.",
        "Screen Protector & Finger Dryness: tempered glass thick ho ya ungliyan zyada sweaty/dry hon toh drag smoothness kam hoti hai—screen clean rakho."
      ]
    }
  };

  // ------------------------------------------------------------------------
  // 4. PC / LAPTOP EMULATOR SENSITIVITY PROFILES
  // ------------------------------------------------------------------------
  const PC_PROFILES = {
    "low-pc": {
      label: "Budget PC / Laptop (i3 / Integrated / 90-120 FPS)",
      mouseDpi: "800 DPI",
      windowsPointer: "6 / 11 (Enhance Pointer Precision OFF)",
      inGameGen: 158,
      redDot: 152,
      x2: 146,
      x4: 140,
      sniper: 95,
      xSens: "0.42",
      ySens: "0.34",
      fpsTarget: "90 - 120 FPS (Smooth Graphics)",
      tip: "Low/Mid PC par Y-axis ko X-axis se thoda kam rakho taaki upward drag mein aim head ke upar na bhaage."
    },
    "mid-pc": {
      label: "Gaming Laptop / Mid PC (i5/Ryzen 5 / 144 FPS)",
      mouseDpi: "1000 - 1200 DPI",
      windowsPointer: "6 / 11 (Enhance Pointer Precision OFF)",
      inGameGen: 148,
      redDot: 142,
      x2: 136,
      x4: 130,
      sniper: 98,
      xSens: "0.48",
      ySens: "0.38",
      fpsTarget: "144 FPS (Standard / Ultra)",
      tip: "Clean mousepad aur steady wrist/arm movement rakho; scope-in karte waqt X/Y balance smooth rakho."
    },
    "high-pc": {
      label: "High-End Esports PC (i7/i9/Ryzen 7+ / 240 FPS)",
      mouseDpi: "1200 - 1600 DPI",
      windowsPointer: "6 / 11 (Enhance Pointer Precision OFF)",
      inGameGen: 138,
      redDot: 132,
      x2: 126,
      x4: 120,
      sniper: 100,
      xSens: "0.52",
      ySens: "0.41",
      fpsTarget: "240 FPS (High FPS Mode)",
      tip: "High DPI par crisp flick kaafi hota hai; mouse polling rate stable aur surface clean rakho."
    }
  };

  // ------------------------------------------------------------------------
  // 5. FULL WEAPON MASTERY & RECOIL CONTROL DATABASE
  // ------------------------------------------------------------------------
  const WEAPON_GUIDES = [
    {
      gun: "M1887 (Two-Shooter)",
      type: "Close Shotgun",
      dragStyle: "Fast J-Drag / Straight Upward Flick",
      recoilControl: "Fire button ko neeche se halka right ghuma kar seedha upar flick karo. Ek shot ke baad gloo-wall ya weapon switch karo taaki spread na phaile.",
      bestRange: "0m - 12m"
    },
    {
      gun: "Desert Eagle",
      type: "One-Tap Pistol",
      dragStyle: "Crisp Rotation / Snap Drag",
      recoilControl: "Enemy ke chest ke thoda neeche crosshair rakho; jaise hi aim red ho, tez aur chhota upward drag maaro. Blind spam mat karo.",
      bestRange: "5m - 25m"
    },
    {
      gun: "MP40",
      type: "Fast SMG",
      dragStyle: "Smooth Controlled Upward Hold",
      recoilControl: "5-7 bullets ke baad recoil upar bhaagta hai. Pehle smooth drag se head lock karo, phir chhota burst pause dekar dubara fire karo.",
      bestRange: "0m - 18m"
    },
    {
      gun: "UMP",
      type: "Armor-Piercing SMG",
      dragStyle: "Steady Medium Upward Drag",
      recoilControl: "Chest/neck par aim set karke steady speed se fire button upar khincho.",
      bestRange: "8m - 28m"
    },
    {
      gun: "Woodpecker / AC80",
      type: "Marksman Rifle",
      dragStyle: "Micro-Drag (Halka Upward Tap)",
      recoilControl: "Lamba drag mat maaro; halke upward flick ke saath 2-tap rhythm rakho.",
      bestRange: "15m - 55m"
    },
    {
      gun: "M1014",
      type: "Heavy Shotgun",
      dragStyle: "Wide Rotation Drag",
      recoilControl: "Close fight mein neeche se curved/rotation drag maaro aur 2-3 bullets ke baad cover/switch lo.",
      bestRange: "0m - 10m"
    },
    {
      gun: "AK47 / SCAR / M4A1",
      type: "Assault Rifles (AR)",
      dragStyle: "4-5 Bullet Burst + Scope Tap",
      recoilControl: "Long range mein scope open karke chhote bursts chalao; lagatar spray se recoil badhta hai.",
      bestRange: "25m - 70m"
    },
    {
      gun: "AWM / M82B",
      type: "Sniper Rifles",
      dragStyle: "Quick-Scope + Fast Switch",
      recoilControl: "Scope lock karke fire + fast weapon switch/jump use karo taaki fire rate smooth rahe.",
      bestRange: "30m - 100m+"
    }
  ];

  // ------------------------------------------------------------------------
  // 6. UI RENDER
  // ------------------------------------------------------------------------
  const brands = Object.keys(DEVICE_DB);

  mountEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">

      <!-- 3 MAIN MODES: GSP SENSI | BRAZIL 🇧🇷 | FREESTYLE -->
      <div style="padding:16px; border-radius:16px; background:rgba(10,14,22,0.94); border:1px solid var(--border-gold);">
        <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:10px;">
          SELECT SENSITIVITY MODE
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:10px;">
          <button type="button" data-mode="GSP SENSI" class="fs-mode-btn cyber-btn primary-gold-btn" style="margin:0; padding:12px;">
            GSP SENSI
          </button>
          <button type="button" data-mode="BRAZIL 🇧🇷" class="fs-mode-btn cyber-btn ghost-btn" style="padding:12px;">
            BRAZIL 🇧🇷
          </button>
          <button type="button" data-mode="FREESTYLE" class="fs-mode-btn cyber-btn ghost-btn" style="padding:12px;">
            FREESTYLE
          </button>
        </div>
        <div id="fsModeBanner" style="margin-top:12px; padding:12px 14px; border-radius:12px; background:rgba(6,9,15,0.9); border:1px solid var(--border-subtle);"></div>
      </div>

      <!-- PLATFORM SWITCHER: MOBILE VS PC / LAPTOP -->
      <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:space-between; padding:12px 16px; border-radius:14px; background:rgba(10,14,22,0.9); border:1px solid var(--border-subtle);">
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <button type="button" id="fsPlatMobileBtn" class="cyber-btn primary-gold-btn" style="width:auto; margin:0; padding:9px 14px; font-size:12px;">
            📱 MOBILE (ANY BRAND + CUSTOM MODEL)
          </button>
          <button type="button" id="fsPlatPcBtn" class="cyber-btn ghost-btn" style="padding:9px 14px; font-size:12px;">
            💻 PC / LAPTOP EMULATOR
          </button>
        </div>
        <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">
          DPI + FIRE BTN + PHONE SETTINGS
        </span>
      </div>

      <!-- MOBILE SECTION -->
      <div id="fsMobileWrap" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:14px; padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-gold);">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              1. COMPANY / BRAND
            </label>
            <select id="fsBrandSelect" style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-size:14px;">
              ${brands.map((b) => `<option value="${b}">${b}</option>`).join("")}
            </select>
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              2. PRESET MODEL
            </label>
            <select id="fsModelSelect" style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-size:14px;"></select>
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--neon-primary); margin-bottom:6px;">
              3. TYPE ANY PHONE MODEL YOURSELF
            </label>
            <input type="text" id="fsCustomModelInput" placeholder="Apna phone model khud likho..." style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-neon); font-size:14px;" />
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              4. PROCESSOR / TIER OVERRIDE
            </label>
            <select id="fsTierOverride" style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-size:14px;">
              <option value="auto" selected>Auto (Based on Selected / Brand)</option>
              <option value="low">Budget / Entry (60Hz - 90Hz)</option>
              <option value="mid">Mid-Range Gaming (90Hz - 120Hz)</option>
              <option value="flagship">Flagship / High Touch (120Hz - 144Hz)</option>
            </select>
          </div>
        </div>

        <button type="button" id="fsGenerateBtn" class="cyber-btn primary-gold-btn" style="margin-top:0;">
          <span>⚡ GENERATE FULL SENSITIVITY, DPI &amp; FIRE BUTTON</span>
        </button>

        <div id="fsResultBox" class="hidden" style="padding:20px; border-radius:18px; background:linear-gradient(155deg, rgba(16,23,36,0.96), rgba(8,11,18,0.98)); border:1px solid var(--border-neon); box-shadow:var(--shadow-neon);"></div>

        <!-- PHONE SYSTEM SETTINGS (IPHONE POINTER/ACCESSIBILITY & ANDROID DPI) -->
        <div style="padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-subtle);">
          <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px;">
            <h4 style="font-family:var(--font-display); font-size:15px; color:var(--gold-light);">
              ⚙️ PHONE SYSTEM SETTINGS (IPHONE &amp; ANDROID)
            </h4>
            <div style="display:flex; gap:8px;">
              <button type="button" id="fsSysIphoneBtn" class="cyber-btn primary-gold-btn" style="width:auto; margin:0; padding:7px 12px; font-size:11px;">
                iPhone Settings
              </button>
              <button type="button" id="fsSysAndroidBtn" class="cyber-btn ghost-btn" style="padding:7px 12px; font-size:11px;">
                Android DPI Guide
              </button>
            </div>
          </div>
          <div id="fsSysGuideBox"></div>
        </div>
      </div>

      <!-- PC / LAPTOP EMULATOR SECTION -->
      <div id="fsPcWrap" class="hidden" style="padding:20px; border-radius:18px; background:linear-gradient(155deg, rgba(16,23,36,0.96), rgba(8,11,18,0.98)); border:1px solid var(--border-gold);">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px;">
          <div>
            <span style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">PC &amp; LAPTOP EMULATOR</span>
            <h4 style="font-family:var(--font-display); font-size:17px; color:#fff;">💻 PC / LAPTOP SENSITIVITY &amp; DPI</h4>
          </div>
          <select id="fsPcTierSelect" style="padding:10px 14px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-gold); font-size:14px;">
            <option value="low-pc">Budget PC / Laptop (i3 / Integrated)</option>
            <option value="mid-pc" selected>Gaming Laptop / Mid PC (i5/Ryzen 5)</option>
            <option value="high-pc">High-End Esports PC (i7/Ryzen 7+)</option>
          </select>
        </div>
        <div id="fsPcOutput"></div>
      </div>

      <!-- FULL WEAPON GUIDE -->
      <div style="padding:18px; border-radius:16px; background:rgba(12,16,26,0.88); border:1px solid var(--border-subtle);">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
          <div>
            <h4 style="font-family:var(--font-display); font-size:15px; color:var(--gold-light);">
              🔫 ALL WEAPONS DRAG &amp; RECOIL GUIDE
            </h4>
            <p style="font-size:13px; color:var(--text-secondary);">
              Kaunsi gun kaise chalani hai, kitna drag karna hai aur recoil kaise control karna hai
            </p>
          </div>
          <select id="fsGunFilter" style="padding:9px 12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-gold); font-size:14px;">
            <option value="ALL">All Weapons (${WEAPON_GUIDES.length})</option>
            ${WEAPON_GUIDES.map((w, idx) => `<option value="${idx}">${w.gun}</option>`).join("")}
          </select>
        </div>
        <div id="fsWeaponsGrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:12px;"></div>
      </div>

    </div>
  `;

  // ------------------------------------------------------------------------
  // 7. STATE & EVENT WIRING
  // ------------------------------------------------------------------------
  let activeMode = "GSP SENSI";

  const modeButtons = Array.from(mountEl.querySelectorAll(".fs-mode-btn"));
  const modeBanner = mountEl.querySelector("#fsModeBanner");
  const platMobileBtn = mountEl.querySelector("#fsPlatMobileBtn");
  const platPcBtn = mountEl.querySelector("#fsPlatPcBtn");
  const mobileWrap = mountEl.querySelector("#fsMobileWrap");
  const pcWrap = mountEl.querySelector("#fsPcWrap");
  const brandSelect = mountEl.querySelector("#fsBrandSelect");
  const modelSelect = mountEl.querySelector("#fsModelSelect");
  const customModelInput = mountEl.querySelector("#fsCustomModelInput");
  const tierOverride = mountEl.querySelector("#fsTierOverride");
  const generateBtn = mountEl.querySelector("#fsGenerateBtn");
  const resultBox = mountEl.querySelector("#fsResultBox");
  const sysIphoneBtn = mountEl.querySelector("#fsSysIphoneBtn");
  const sysAndroidBtn = mountEl.querySelector("#fsSysAndroidBtn");
  const sysGuideBox = mountEl.querySelector("#fsSysGuideBox");
  const pcTierSelect = mountEl.querySelector("#fsPcTierSelect");
  const pcOutput = mountEl.querySelector("#fsPcOutput");
  const gunFilter = mountEl.querySelector("#fsGunFilter");
  const weaponsGrid = mountEl.querySelector("#fsWeaponsGrid");

  function clamp200(n) {
    return Math.max(70, Math.min(200, Math.round(n)));
  }

  function renderModeBanner() {
    const m = MODES[activeMode];
    modeBanner.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px;">
        <strong style="font-family:var(--font-display); font-size:14px; color:var(--neon-primary);">${m.badge} — ${m.subtitle}</strong>
        <span style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">Fire Shift: ${m.fireShift}</span>
      </div>
      <p style="font-size:13px; color:var(--text-secondary); margin-top:6px;">${m.desc}</p>
      <p style="font-size:12px; color:#fff; margin-top:4px;">💡 Tip: ${m.modeTip}</p>
    `;
  }

  function setMode(modeName) {
    activeMode = MODES[modeName] ? modeName : "GSP SENSI";
    modeButtons.forEach((btn) => {
      const isSelected = btn.dataset.mode === activeMode;
      btn.className = isSelected ? "fs-mode-btn cyber-btn primary-gold-btn" : "fs-mode-btn cyber-btn ghost-btn";
      btn.style.cssText = isSelected ? "margin:0; padding:12px;" : "padding:12px;";
    });
    renderModeBanner();
    if (!resultBox.classList.contains("hidden")) {
      generateSensitivity();
    }
  }

  function setPlatform(isPc) {
    if (isPc) {
      mobileWrap.classList.add("hidden");
      pcWrap.classList.remove("hidden");
      platPcBtn.className = "cyber-btn primary-gold-btn";
      platPcBtn.style.cssText = "width:auto; margin:0; padding:9px 14px; font-size:12px;";
      platMobileBtn.className = "cyber-btn ghost-btn";
      platMobileBtn.style.cssText = "padding:9px 14px; font-size:12px;";
      renderPc();
    } else {
      pcWrap.classList.add("hidden");
      mobileWrap.classList.remove("hidden");
      platMobileBtn.className = "cyber-btn primary-gold-btn";
      platMobileBtn.style.cssText = "width:auto; margin:0; padding:9px 14px; font-size:12px;";
      platPcBtn.className = "cyber-btn ghost-btn";
      platPcBtn.style.cssText = "padding:9px 14px; font-size:12px;";
    }
  }

  function populateModels() {
    const brand = brandSelect.value;
    const list = DEVICE_DB[brand] || DEVICE_DB["Other / Any Global Brand"];
    modelSelect.innerHTML = list
      .map((item, idx) => `<option value="${idx}">${item.model} • ${item.chip}</option>`)
      .join("");
  }

  function metricCard(label, val) {
    return `
      <div style="padding:12px; border-radius:12px; background:rgba(6,9,15,0.92); border:1px solid var(--border-subtle); text-align:center;">
        <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">${label}</div>
        <div style="font-family:var(--font-display); font-size:19px; font-weight:900; color:var(--gold-light); margin-top:4px;">${val}</div>
      </div>
    `;
  }

  function generateSensitivity() {
    const brand = brandSelect.value;
    const idx = parseInt(modelSelect.value, 10) || 0;
    const list = DEVICE_DB[brand] || DEVICE_DB["Other / Any Global Brand"];
    const base = { ...(list[idx] || list[0]) };
    const modeCfg = MODES[activeMode];
    const isIphone = brand === "Apple iPhone";
    const override = tierOverride.value;

    if (override === "low") {
      base.chip = isIphone ? "iPhone Standard A-Series" : "Budget SoC (Helio / Unisoc / Entry)";
      base.hz = 60;
      base.dpi = isIphone ? "N/A (iOS No DPI)" : "500 - 620 DPI";
      base.gen = 197;
      base.red = 190;
      base.x2 = 183;
      base.x4 = 176;
      base.sniper = 99;
      base.free = 174;
      base.fire = "45% - 48%";
      base.gfx = "Smooth / Normal FPS";
    } else if (override === "mid") {
      base.chip = isIphone ? "iPhone ProMotion / Mid A-Series" : "Mid Gaming SoC (G99 / Dimensity / SD 7-series)";
      base.hz = 120;
      base.dpi = isIphone ? "N/A (iOS No DPI)" : "560 - 740 DPI";
      base.gen = 191;
      base.red = 185;
      base.x2 = 178;
      base.x4 = 171;
      base.sniper = 103;
      base.free = 169;
      base.fire = "42% - 46%";
      base.gfx = "Standard / High FPS";
    } else if (override === "flagship") {
      base.chip = isIphone ? "iPhone Pro Max (A17 Pro / Flagship)" : "Flagship SoC (Snapdragon 8 Gen / Dimensity 8-9k)";
      base.hz = 120;
      base.dpi = isIphone ? "N/A (iOS No DPI)" : "600 - 800 DPI";
      base.gen = 183;
      base.red = 177;
      base.x2 = 171;
      base.x4 = 165;
      base.sniper = 105;
      base.free = 161;
      base.fire = "40% - 43%";
      base.gfx = "Max / High FPS";
    }

    const typed = customModelInput.value.trim();
    const displayModel = typed
      ? `${brand === "Other / Any Global Brand" ? "" : brand + " "}${typed}`.trim()
      : base.model;

    const finalVals = {
      gen: clamp200(base.gen + modeCfg.genOffset),
      red: clamp200(base.red + modeCfg.redOffset),
      x2: clamp200(base.x2 + modeCfg.x2Offset),
      x4: clamp200(base.x4 + modeCfg.x4Offset),
      sniper: clamp200(base.sniper + modeCfg.sniperOffset),
      free: clamp200(base.free + modeCfg.freeOffset)
    };

    const copyPayload = [
      `[${modeCfg.badge}] ${displayModel} (${base.chip} | ${base.hz}Hz)`,
      `General: ${finalVals.gen} | Red Dot: ${finalVals.red} | 2x: ${finalVals.x2} | 4x: ${finalVals.x4} | Sniper: ${finalVals.sniper} | Free Look: ${finalVals.free}`,
      `DPI: ${base.dpi} | Fire Button: ${base.fire} | Graphics: ${base.gfx}`,
      `Tip: ${modeCfg.modeTip}`
    ].join("\n");

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
        <div>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">${modeCfg.badge} PROFILE</span>
          <h4 style="font-family:var(--font-display); font-size:18px; color:#fff;">${displayModel}</h4>
          <div style="font-size:13px; color:var(--text-secondary);">
            Processor: <strong style="color:#fff;">${base.chip}</strong> • ${base.hz}Hz • ${base.gfx}
          </div>
        </div>
        <button type="button" id="fsCopyResultBtn" class="cyber-btn neon-send-btn">📋 COPY SETUP</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:10px; margin-bottom:14px;">
        ${metricCard("GENERAL", finalVals.gen)}
        ${metricCard("RED DOT", finalVals.red)}
        ${metricCard("2X SCOPE", finalVals.x2)}
        ${metricCard("4X SCOPE", finalVals.x4)}
        ${metricCard("SNIPER", finalVals.sniper)}
        ${metricCard("FREE LOOK", finalVals.free)}
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; padding:14px; border-radius:12px; background:rgba(5,8,14,0.88); border:1px solid var(--border-gold);">
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">📐 RECOMMENDED DPI</div>
          <div style="font-family:var(--font-display); font-size:17px; font-weight:800; color:var(--neon-primary); margin-top:4px;">${base.dpi}</div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">🎯 FIRE BUTTON SIZE</div>
          <div style="font-family:var(--font-display); font-size:17px; font-weight:800; color:var(--gold-light); margin-top:4px;">${base.fire}</div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">⚡ DRAG &amp; RECOIL NOTE</div>
          <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${modeCfg.modeTip}</div>
        </div>
      </div>
    `;

    const copyBtn = resultBox.querySelector("#fsCopyResultBtn");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyPayload);
        copyBtn.textContent = "✅ COPIED!";
        setTimeout(() => {
          copyBtn.textContent = "📋 COPY SETUP";
        }, 1600);
      } catch {
        copyBtn.textContent = "SELECT & COPY";
      }
    });
  }

  function renderSystemGuide(type) {
    const g = PHONE_SETTINGS_GUIDE[type] || PHONE_SETTINGS_GUIDE.iphone;
    sysGuideBox.innerHTML = `
      <div style="font-weight:700; color:#fff; font-size:14px; margin-bottom:8px;">${g.title}</div>
      <ul style="margin:0; padding-left:18px; display:flex; flex-direction:column; gap:6px; font-size:13px; color:var(--text-secondary);">
        ${g.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    `;
  }

  function renderPc() {
    const p = PC_PROFILES[pcTierSelect.value] || PC_PROFILES["mid-pc"];
    const modeShift = MODES[activeMode].genOffset;
    pcOutput.innerHTML = `
      <div style="margin-bottom:14px; font-size:14px; color:var(--text-secondary);">
        <strong style="color:#fff;">${p.label}</strong> • Mode: <strong style="color:var(--neon-primary);">${activeMode}</strong> • ${p.fpsTarget}
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:10px; margin-bottom:14px;">
        ${metricCard("IN-GAME GEN", clamp200(p.inGameGen + modeShift))}
        ${metricCard("RED DOT", clamp200(p.redDot + modeShift))}
        ${metricCard("2X SCOPE", clamp200(p.x2 + modeShift))}
        ${metricCard("4X SCOPE", clamp200(p.x4 + modeShift))}
        ${metricCard("SNIPER", p.sniper)}
        ${metricCard("MOUSE DPI", p.mouseDpi)}
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; padding:14px; border-radius:12px; background:rgba(5,8,14,0.88); border:1px solid var(--border-subtle);">
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">🖱️ X / Y &amp; WINDOWS</div>
          <div style="font-size:13px; color:#fff; margin-top:4px;">
            X Sens: <strong>${p.xSens}</strong> | Y Sens: <strong>${p.ySens}</strong><br>
            <span style="color:var(--text-secondary); font-size:12px;">${p.windowsPointer}</span>
          </div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">⚡ EMULATOR DRAG TIP</div>
          <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${p.tip}</div>
        </div>
      </div>
    `;
  }

  function renderWeapons() {
    const f = gunFilter.value;
    const rows = f === "ALL" ? WEAPON_GUIDES : [WEAPON_GUIDES[parseInt(f, 10)]];
    weaponsGrid.innerHTML = rows
      .map(
        (w) => `
        <div style="padding:14px; border-radius:12px; background:rgba(6,9,15,0.92); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <strong style="font-family:var(--font-display); font-size:13px; color:var(--neon-primary);">${w.gun}</strong>
            <span style="font-family:var(--font-mono); font-size:10px; padding:2px 8px; border-radius:999px; background:rgba(255,179,0,0.12); color:var(--gold-light);">${w.bestRange}</span>
          </div>
          <div style="font-size:12px; color:var(--gold-primary); font-weight:600;">${w.type} • ${w.dragStyle}</div>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.45;">${w.recoilControl}</p>
        </div>
      `
      )
      .join("");
  }

  modeButtons.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
  platMobileBtn.addEventListener("click", () => setPlatform(false));
  platPcBtn.addEventListener("click", () => setPlatform(true));
  brandSelect.addEventListener("change", () => {
    populateModels();
    if (brandSelect.value === "Apple iPhone") {
      sysIphoneBtn.click();
    } else {
      sysAndroidBtn.click();
    }
  });
  generateBtn.addEventListener("click", generateSensitivity);
  sysIphoneBtn.addEventListener("click", () => {
    sysIphoneBtn.className = "cyber-btn primary-gold-btn";
    sysIphoneBtn.style.cssText = "width:auto; margin:0; padding:7px 12px; font-size:11px;";
    sysAndroidBtn.className = "cyber-btn ghost-btn";
    sysAndroidBtn.style.cssText = "padding:7px 12px; font-size:11px;";
    renderSystemGuide("iphone");
  });
  sysAndroidBtn.addEventListener("click", () => {
    sysAndroidBtn.className = "cyber-btn primary-gold-btn";
    sysAndroidBtn.style.cssText = "width:auto; margin:0; padding:7px 12px; font-size:11px;";
    sysIphoneBtn.className = "cyber-btn ghost-btn";
    sysIphoneBtn.style.cssText = "padding:7px 12px; font-size:11px;";
    renderSystemGuide("android");
  });
  pcTierSelect.addEventListener("change", renderPc);
  gunFilter.addEventListener("change", renderWeapons);

  renderModeBanner();
  populateModels();
  renderSystemGuide("iphone");
  renderWeapons();
};
