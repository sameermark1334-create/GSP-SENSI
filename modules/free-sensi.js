/* ==========================================================================
   GSP ROLEX MODULE 01: FREE SENSI, CUSTOM MODEL & PC HUB (modules/free-sensi.js)
   Hook: window.GSP_MODULE_FREE_SENSI
   Includes: Global Brands + Any Custom Model Input, PC/Laptop Emulator Sensi,
             Fire Button Size & Gun Recoil Mastery.
   ========================================================================== */

window.GSP_MODULE_FREE_SENSI = function renderFreeSensiModule(mountEl) {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. DEVICE PRESETS (ALL BRANDS + CUSTOM MODEL SUPPORT)
  // ------------------------------------------------------------------------
  const DEVICE_DB = {
    "Infinix": [
      { model: "Infinix Hot 40", chip: "Helio G88", hz: 90, gen: 186, red: 180, x2: 174, x4: 168, sniper: 100, free: 165, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Infinix Hot 40 Pro", chip: "Helio G99", hz: 120, gen: 192, red: 185, x2: 178, x4: 172, sniper: 104, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Infinix Smart 9", chip: "Helio G81", hz: 120, gen: 196, red: 188, x2: 182, x4: 175, sniper: 105, free: 172, fire: "43% - 46%", gfx: "Smooth / High FPS" },
      { model: "Infinix Note 40 Pro 5G", chip: "Dimensity 7020", hz: 120, gen: 190, red: 184, x2: 177, x4: 171, sniper: 105, free: 168, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Infinix GT 20 Pro", chip: "Dimensity 8200 Ultimate", hz: 144, gen: 185, red: 179, x2: 172, x4: 166, sniper: 102, free: 164, fire: "41% - 44%", gfx: "Max / High FPS" }
    ],
    "Motorola": [
      { model: "Motorola Edge 50 Fusion", chip: "Snapdragon 7s Gen 2", hz: 144, gen: 187, red: 181, x2: 174, x4: 168, sniper: 102, free: 165, fire: "42% - 45%", gfx: "Max / High FPS" },
      { model: "Motorola Edge 40 Neo", chip: "Dimensity 7030", hz: 144, gen: 188, red: 182, x2: 175, x4: 169, sniper: 104, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Moto G85 5G", chip: "Snapdragon 6s Gen 3", hz: 120, gen: 191, red: 185, x2: 178, x4: 172, sniper: 103, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Moto G64 / G54 5G", chip: "Dimensity 7025 / 7020", hz: 120, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Moto G34 / G24 Power", chip: "Snapdragon 695 / Helio G85", hz: 120, gen: 195, red: 188, x2: 181, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Itel / Airtel": [
      { model: "Itel P55 5G (Airtel Edition)", chip: "Dimensity 6080", hz: 90, gen: 194, red: 187, x2: 180, x4: 173, sniper: 102, free: 171, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Itel S23 / S23+", chip: "Unisoc T606 / T616", hz: 90, gen: 197, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" },
      { model: "Itel A70 / A50", chip: "Unisoc T603", hz: 60, gen: 199, red: 193, x2: 186, x4: 179, sniper: 98, free: 176, fire: "46% - 49%", gfx: "Smooth / Normal FPS" },
      { model: "Itel RS4 Gaming", chip: "Helio G99 Ultimate", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 104, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "Tecno": [
      { model: "Tecno Pova 6 Pro 5G", chip: "Dimensity 6080", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 104, free: 168, fire: "43% - 46%", gfx: "Ultra / High FPS" },
      { model: "Tecno Camon 30 5G", chip: "Dimensity 7020", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 103, free: 168, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Tecno Spark 20 / Pop 8", chip: "Helio G85 / Unisoc T606", hz: 90, gen: 197, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Poco": [
      { model: "POCO X6 Pro 5G", chip: "Dimensity 8300 Ultra", hz: 120, gen: 184, red: 178, x2: 171, x4: 165, sniper: 103, free: 162, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "POCO X6 / M6 Pro 5G", chip: "Snapdragon 7s Gen 2 / 4 Gen 2", hz: 120, gen: 189, red: 183, x2: 176, x4: 169, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "POCO M6 5G / C65", chip: "Dimensity 6100+ / G85", hz: 90, gen: 194, red: 188, x2: 181, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Redmi / Xiaomi": [
      { model: "Redmi Note 13 Pro+ 5G", chip: "Dimensity 7200 Ultra", hz: 120, gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Redmi Note 13 5G", chip: "Dimensity 6080", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Redmi 13C / A3", chip: "Dimensity 6100+ / Helio G36", hz: 90, gen: 196, red: 190, x2: 183, x4: 176, sniper: 99, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Realme": [
      { model: "Realme Narzo 70 Pro 5G", chip: "Dimensity 7050", hz: 120, gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Realme 12+ / 12x 5G", chip: "Dimensity 7050 / 6100+", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 102, free: 168, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Realme C67 / C55", chip: "Dimensity 6100+ / Helio G88", hz: 90, gen: 195, red: 188, x2: 181, x4: 174, sniper: 100, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Samsung": [
      { model: "Samsung Galaxy S24 / S23 Series", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "Samsung Galaxy A55 / A35 5G", chip: "Exynos 1480 / 1380", hz: 120, gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Samsung Galaxy A15 / M15 / A05", chip: "Dimensity 6100+ / Helio G85", hz: 90, gen: 195, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Vivo": [
      { model: "Vivo T3 / T3x 5G", chip: "Dimensity 7200 / SD 6 Gen 1", hz: 120, gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo V30 / V29 5G", chip: "Snapdragon 7 Gen 3 / 778G", hz: 120, gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo Y28 / Y18", chip: "Dimensity 6020 / Helio G85", hz: 90, gen: 195, red: 188, x2: 181, x4: 174, sniper: 100, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" }
    ],
    "Oppo": [
      { model: "Oppo F27 Pro+ / Reno 11 5G", chip: "Dimensity 7050", hz: 120, gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Oppo A79 5G / K12x 5G", chip: "Dimensity 6020 / 6300", hz: 90, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Oppo A38 / A18", chip: "Helio G85", hz: 90, gen: 196, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "OnePlus": [
      { model: "OnePlus 12 / 12R", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "OnePlus Nord CE 4 / Nord 4", chip: "Snapdragon 7 Gen 3 / 7+ Gen 3", hz: 120, gen: 185, red: 179, x2: 172, x4: 166, sniper: 104, free: 163, fire: "41% - 44%", gfx: "Max / High FPS" }
    ],
    "iQOO": [
      { model: "iQOO Neo 9 Pro / Neo 7 Pro", chip: "Snapdragon 8 Gen 2 / 8+ Gen 1", hz: 144, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iQOO Z9 / Z9x 5G", chip: "Dimensity 7200 / SD 6 Gen 1", hz: 120, gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" }
    ],
    "Apple iPhone": [
      { model: "iPhone 15 / 15 Pro Max", chip: "A16 / A17 Pro", hz: 120, gen: 183, red: 178, x2: 172, x4: 166, sniper: 109, free: 162, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iPhone 14 / 13 / 12", chip: "A15 / A14 Bionic", hz: 60, gen: 188, red: 182, x2: 176, x4: 170, sniper: 106, free: 166, fire: "42% - 45%", gfx: "Max / High FPS" }
    ],
    "Other / Any Global Brand": [
      { model: "Global Standard Device", chip: "Universal Profile", hz: 90, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Smooth / High FPS" }
    ]
  };

  // ------------------------------------------------------------------------
  // 2. PC / LAPTOP EMULATOR SENSITIVITY PROFILES
  // ------------------------------------------------------------------------
  const PC_PROFILES = {
    "low-pc": {
      label: "Budget PC / Laptop (i3 / Integrated / 60-120 FPS)",
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
      tip: "Low/Mid PC par Y-axis (vertical drag) ko X-axis se thoda kam rakho taaki upward drag mein aim head ke upar na bhaage."
    },
    "mid-pc": {
      label: "Gaming Laptop / Mid PC (i5/Ryzen 5 / GTX-RTX / 144 FPS)",
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
      tip: "Smooth mousepad + medium wrist/arm movement rakho. Scope-in karte waqt X/Y balance smooth rakho."
    },
    "high-pc": {
      label: "High-End Esports PC (i7/i9/Ryzen 7-9 / 240 FPS)",
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
      tip: "High DPI par chhota aur crisp mouse lift/flick kaafi hota hai; polling rate 1000Hz par stable rakho."
    }
  };

  // ------------------------------------------------------------------------
  // 3. WEAPON MASTERY & RECOIL CONTROL DATABASE
  // ------------------------------------------------------------------------
  const WEAPON_GUIDES = [
    {
      gun: "M1887 (Two-Shooter)",
      type: "One-Tap Shotgun",
      dragStyle: "Fast J-Drag / Straight Upward Flick",
      recoilControl: "Fire button ko niche se halka right ghuma kar seedha upar flick karo. Ek shot ke baad turant gloo-wall ya weapon switch karo taaki spread na phaile.",
      bestRange: "0m - 12m (Close Range)"
    },
    {
      gun: "Desert Eagle",
      type: "One-Tap Pistol",
      dragStyle: "Crisp Rotation / Straight Snap Drag",
      recoilControl: "Enemy ke chest ke thoda niche white crosshair rakho; jaise hi crosshair red ho, tez aur chhota upward drag maaro. Spam mat karo.",
      bestRange: "5m - 25m (Clash Squad)"
    },
    {
      gun: "MP40 (Cobra / Default)",
      type: "High Fire-Rate SMG",
      dragStyle: "Smooth Controlled Upward Hold",
      recoilControl: "7-8 bullets ke baad recoil upar bhagta hai. Pehle 5 bullets chest se head ki taraf smooth drag karo, phir 0.3s fire chhod kar dubara burst maaro.",
      bestRange: "0m - 18m (Rush)"
    },
    {
      gun: "UMP",
      type: "Armor-Piercing SMG",
      dragStyle: "Medium Steady Upward Drag",
      recoilControl: "Crosshair ko enemy ke neck/chest par lock karke fire button ko steady speed se upar khincho.",
      bestRange: "8m - 28m (Close-Mid)"
    },
    {
      gun: "Woodpecker / AC80",
      type: "Marksman Rifle",
      dragStyle: "Micro-Drag (Halka Upward Tap)",
      recoilControl: "High damage aur accuracy ke liye lamba drag mat maaro. Bas fire button ko halka sa upar touch-drag karo aur 2-tap rhythm rakho.",
      bestRange: "15m - 55m (Mid-Long)"
    },
    {
      gun: "M1014 (Evo / Chip)",
      type: "Heavy Shotgun",
      dragStyle: "Wide Rotation Drag",
      recoilControl: "Close fight mein fire button ko neeche se U-shape rotation mein upar le jao. 3 bullets se zyada lagatar mat chalao.",
      bestRange: "0m - 10m (Point Blank)"
    },
    {
      gun: "AK47 / SCAR / M4A1",
      type: "Assault Rifles (AR)",
      dragStyle: "Burst Control + Scope-In Tap",
      recoilControl: "Long range mein scope open karke 4-5 goli ke bursts chalao. Lagatar spray karne se crosshair bada ho jata hai.",
      bestRange: "25m - 70m (Long Range)"
    },
    {
      gun: "AWM / M82B",
      type: "Sniper Rifles",
      dragStyle: "Quick-Scope + Fast Switch",
      recoilControl: "Sniper sensitivity par aim chest/head par le jaakar fire + quick weapon switch dabao taaki reload animation skip ho.",
      bestRange: "30m - 100m+ (Support)"
    }
  ];

  // ------------------------------------------------------------------------
  // 4. RENDER MODULE UI
  // ------------------------------------------------------------------------
  const brands = Object.keys(DEVICE_DB);

  mountEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:22px;">

      <!-- TOP MODE SWITCHER: MOBILE VS PC / LAPTOP -->
      <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:space-between; padding:14px 16px; border-radius:14px; background:rgba(10,14,22,0.92); border:1px solid var(--border-subtle);">
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <button type="button" id="fsModeMobileBtn" class="cyber-btn primary-gold-btn" style="width:auto; margin:0; padding:10px 16px; font-size:12px;">
            📱 MOBILE SENSI (ANY MODEL)
          </button>
          <button type="button" id="fsModePcBtn" class="cyber-btn ghost-btn" style="padding:10px 16px; font-size:12px;">
            💻 PC / LAPTOP EMULATOR SENSI
          </button>
        </div>
        <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">
          CUSTOM MODEL INPUT ENABLED
        </span>
      </div>

      <!-- MOBILE SENSITIVITY PANEL -->
      <div id="fsMobileSection" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-gold);">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              1. SELECT COMPANY / BRAND
            </label>
            <select id="fsBrandSelect" style="width:100%; padding:12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-family:var(--font-body); font-size:15px;">
              ${brands.map((b) => `<option value="${b}">${b}</option>`).join("")}
            </select>
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              2. PRESET MODEL (OPTIONAL)
            </label>
            <select id="fsModelSelect" style="width:100%; padding:12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-family:var(--font-body); font-size:15px;"></select>
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--neon-primary); margin-bottom:6px;">
              3. TYPE ANY MODEL YOURSELF
            </label>
            <input type="text" id="fsCustomName" placeholder="Apna phone model khud likho..." style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-neon); font-family:var(--font-body); font-size:15px;" />
          </div>

          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
              4. DEVICE TIER &amp; PLAYSTYLE
            </label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <select id="fsCustomSpec" style="padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-size:13px;">
                <option value="auto" selected>Auto / Preset</option>
                <option value="low">Low (60Hz)</option>
                <option value="mid">Mid (90/120Hz)</option>
                <option value="flagship">Flagship (120Hz+)</option>
              </select>
              <select id="fsPlaystyle" style="padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-size:13px;">
                <option value="balanced" selected>Balanced</option>
                <option value="onetap">One-Tap (+3)</option>
                <option value="control">Control (-3)</option>
              </select>
            </div>
          </div>
        </div>

        <button type="button" id="fsGenerateBtn" class="cyber-btn primary-gold-btn" style="margin-top:0;">
          <span>⚡ GENERATE GSP ROLEX SENSITIVITY &amp; FIRE BUTTON</span>
        </button>

        <div id="fsResultBox" class="hidden" style="padding:20px; border-radius:18px; background:linear-gradient(155deg, rgba(16,23,36,0.96), rgba(8,11,18,0.98)); border:1px solid var(--border-neon); box-shadow:var(--shadow-neon);"></div>
      </div>

      <!-- PC / LAPTOP SENSITIVITY SECTION -->
      <div id="fsPcSection" class="hidden" style="padding:20px; border-radius:18px; background:linear-gradient(155deg, rgba(16,23,36,0.96), rgba(8,11,18,0.98)); border:1px solid var(--border-gold);">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px;">
          <div>
            <span style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">DESKTOP &amp; LAPTOP EMULATOR TUNING</span>
            <h4 style="font-family:var(--font-display); font-size:17px; color:#fff;">💻 PC / LAPTOP SENSITIVITY &amp; DPI</h4>
          </div>
          <select id="fsPcTierSelect" style="padding:10px 14px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-gold); font-family:var(--font-body); font-size:14px;">
            <option value="low-pc">Budget PC / Laptop (i3 / Integrated)</option>
            <option value="mid-pc" selected>Gaming Laptop / Mid PC (i5/Ryzen 5)</option>
            <option value="high-pc">High-End Esports PC (i7/Ryzen 7+)</option>
          </select>
        </div>
        <div id="fsPcOutput"></div>
      </div>

      <!-- WEAPON MASTERY & RECOIL CONTROL HUB -->
      <div style="padding:18px; border-radius:16px; background:rgba(12,16,26,0.88); border:1px solid var(--border-subtle);">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
          <div>
            <h4 style="font-family:var(--font-display); font-size:15px; color:var(--gold-light);">
              🔫 WEAPON MASTERY &amp; RECOIL CONTROL GUIDE
            </h4>
            <p style="font-size:13px; color:var(--text-secondary);">
              Kaunsi gun kaise chalani hai, kitna drag karna hai aur recoil kaise control karna hai
            </p>
          </div>
          <select id="fsGunFilter" style="padding:9px 12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-gold); font-family:var(--font-body); font-size:14px;">
            <option value="ALL">All Weapons (${WEAPON_GUIDES.length})</option>
            ${WEAPON_GUIDES.map((w, idx) => `<option value="${idx}">${w.gun}</option>`).join("")}
          </select>
        </div>

        <div id="fsWeaponsGrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;"></div>
      </div>

    </div>
  `;

  // ------------------------------------------------------------------------
  // 5. INTERACTIVITY LOGIC
  // ------------------------------------------------------------------------
  const modeMobileBtn = mountEl.querySelector("#fsModeMobileBtn");
  const modePcBtn = mountEl.querySelector("#fsModePcBtn");
  const mobileSection = mountEl.querySelector("#fsMobileSection");
  const pcSection = mountEl.querySelector("#fsPcSection");
  const brandSelect = mountEl.querySelector("#fsBrandSelect");
  const modelSelect = mountEl.querySelector("#fsModelSelect");
  const customName = mountEl.querySelector("#fsCustomName");
  const customSpec = mountEl.querySelector("#fsCustomSpec");
  const playstyleSelect = mountEl.querySelector("#fsPlaystyle");
  const generateBtn = mountEl.querySelector("#fsGenerateBtn");
  const resultBox = mountEl.querySelector("#fsResultBox");
  const pcTierSelect = mountEl.querySelector("#fsPcTierSelect");
  const pcOutput = mountEl.querySelector("#fsPcOutput");
  const gunFilter = mountEl.querySelector("#fsGunFilter");
  const weaponsGrid = mountEl.querySelector("#fsWeaponsGrid");

  function setPlatformMode(isPc) {
    if (isPc) {
      mobileSection.classList.add("hidden");
      pcSection.classList.remove("hidden");
      modePcBtn.className = "cyber-btn primary-gold-btn";
      modePcBtn.style.cssText = "width:auto; margin:0; padding:10px 16px; font-size:12px;";
      modeMobileBtn.className = "cyber-btn ghost-btn";
      modeMobileBtn.style.cssText = "padding:10px 16px; font-size:12px;";
      renderPcProfile();
    } else {
      pcSection.classList.add("hidden");
      mobileSection.classList.remove("hidden");
      modeMobileBtn.className = "cyber-btn primary-gold-btn";
      modeMobileBtn.style.cssText = "width:auto; margin:0; padding:10px 16px; font-size:12px;";
      modePcBtn.className = "cyber-btn ghost-btn";
      modePcBtn.style.cssText = "padding:10px 16px; font-size:12px;";
    }
  }

  function populateModels() {
    const selectedBrand = brandSelect.value;
    const models = DEVICE_DB[selectedBrand] || [];
    modelSelect.innerHTML = models
      .map((item, idx) => `<option value="${idx}">${item.model} (${item.chip})</option>`)
      .join("");
  }

  function clamp200(val) {
    return Math.max(80, Math.min(200, Math.round(val)));
  }

  function generateSensitivity() {
    const brand = brandSelect.value;
    const idx = parseInt(modelSelect.value, 10) || 0;
    const base = { ...(DEVICE_DB[brand]?.[idx] || DEVICE_DB["Other / Any Global Brand"][0]) };

    const typedModel = customName.value.trim();
    const tierOverride = customSpec.value;
    const style = playstyleSelect.value;
    const offset = style === "onetap" ? 3 : style === "control" ? -3 : 0;

    if (tierOverride === "low") {
      base.chip = "Entry / Low Tier";
      base.hz = 60;
      base.gen = 198;
      base.red = 191;
      base.x2 = 184;
      base.x4 = 177;
      base.sniper = 99;
      base.free = 175;
      base.fire = "45% - 49%";
      base.gfx = "Smooth / Normal FPS";
    } else if (tierOverride === "mid") {
      base.chip = "Mid-Range Gaming Tier";
      base.hz = 90;
      base.gen = 192;
      base.red = 186;
      base.x2 = 179;
      base.x4 = 172;
      base.sniper = 102;
      base.free = 170;
      base.fire = "43% - 46%";
      base.gfx = "Standard / High FPS";
    } else if (tierOverride === "flagship") {
      base.chip = "Flagship / High Touch Tier";
      base.hz = 120;
      base.gen = 184;
      base.red = 178;
      base.x2 = 172;
      base.x4 = 166;
      base.sniper = 105;
      base.free = 162;
      base.fire = "40% - 43%";
      base.gfx = "Max / High FPS";
    }

    const displayName = typedModel
      ? `${brand === "Other / Any Global Brand" ? "" : brand + " "}${typedModel}`.trim()
      : base.model;

    const finalData = {
      model: displayName,
      chip: base.chip,
      hz: base.hz,
      gen: clamp200(base.gen + offset),
      red: clamp200(base.red + offset),
      x2: clamp200(base.x2 + offset),
      x4: clamp200(base.x4 + offset),
      sniper: clamp200(base.sniper + (offset > 0 ? 2 : 0)),
      free: clamp200(base.free + offset),
      fire: base.fire,
      gfx: base.gfx
    };

    const copyText = [
      `GSP ROLEX Sensitivity — ${finalData.model} (${finalData.chip} | ${finalData.hz}Hz)`,
      `General: ${finalData.gen} | Red Dot: ${finalData.red} | 2x: ${finalData.x2} | 4x: ${finalData.x4} | Sniper: ${finalData.sniper} | Free Look: ${finalData.free}`,
      `Fire Button Size: ${finalData.fire} | Graphics: ${finalData.gfx}`,
      `Drag Tip: Crosshair chest ke aas-paas set rakho aur smooth upward / J-rotation drag maaro.`
    ].join("\n");

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:16px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
        <div>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">CALIBRATED BY GSP ROLEX</span>
          <h4 style="font-family:var(--font-display); font-size:18px; color:#fff;">${finalData.model}</h4>
          <span style="font-size:13px; color:var(--text-secondary);">${finalData.chip} • ${finalData.hz}Hz Display • ${finalData.gfx}</span>
        </div>
        <button type="button" id="fsCopyBtn" class="cyber-btn neon-send-btn">📋 COPY SETUP</button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px; margin-bottom:16px;">
        ${renderMetricTile("GENERAL", finalData.gen)}
        ${renderMetricTile("RED DOT", finalData.red)}
        ${renderMetricTile("2X SCOPE", finalData.x2)}
        ${renderMetricTile("4X SCOPE", finalData.x4)}
        ${renderMetricTile("SNIPER SCOPE", finalData.sniper)}
        ${renderMetricTile("FREE LOOK", finalData.free)}
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; padding:14px; border-radius:12px; background:rgba(5,8,14,0.85); border:1px solid var(--border-gold);">
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">🎯 OPTIMAL FIRE BUTTON SIZE</div>
          <div style="font-family:var(--font-display); font-size:20px; font-weight:800; color:var(--neon-primary); margin-top:4px;">${finalData.fire}</div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">⚡ DRAG &amp; TIMING NOTE</div>
          <div style="font-size:14px; color:var(--text-secondary); margin-top:4px;">
            Crosshair chest par set karke smooth upward ya halke J-rotation mein drag karo. Enemy ke jump land hote hi fire dabao.
          </div>
        </div>
      </div>
    `;

    const copyBtn = resultBox.querySelector("#fsCopyBtn");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyText);
        copyBtn.textContent = "✅ COPIED!";
        setTimeout(() => {
          copyBtn.textContent = "📋 COPY SETUP";
        }, 1600);
      } catch {
        copyBtn.textContent = "SELECT & COPY";
      }
    });
  }

  function renderPcProfile() {
    const p = PC_PROFILES[pcTierSelect.value] || PC_PROFILES["mid-pc"];
    pcOutput.innerHTML = `
      <div style="margin-bottom:14px; color:var(--text-secondary); font-size:14px;">
        <strong style="color:#fff;">${p.label}</strong> • Target: <span style="color:var(--neon-primary);">${p.fpsTarget}</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:10px; margin-bottom:14px;">
        ${renderMetricTile("IN-GAME GEN", p.inGameGen)}
        ${renderMetricTile("RED DOT", p.redDot)}
        ${renderMetricTile("2X SCOPE", p.x2)}
        ${renderMetricTile("4X SCOPE", p.x4)}
        ${renderMetricTile("SNIPER", p.sniper)}
        ${renderMetricTile("MOUSE DPI", p.mouseDpi)}
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; padding:14px; border-radius:12px; background:rgba(5,8,14,0.85); border:1px solid var(--border-subtle);">
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--gold-light);">🖱️ EMULATOR X / Y &amp; WINDOWS</div>
          <div style="font-size:14px; color:#fff; margin-top:4px;">
            X Sens: <strong>${p.xSens}</strong> | Y Sens: <strong>${p.ySens}</strong><br>
            <span style="color:var(--text-secondary); font-size:12px;">${p.windowsPointer}</span>
          </div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">⚡ PC DRAG &amp; RECOIL TIP</div>
          <div style="font-size:14px; color:var(--text-secondary); margin-top:4px;">${p.tip}</div>
        </div>
      </div>
    `;
  }

  function renderMetricTile(label, value) {
    return `
      <div style="padding:12px; border-radius:12px; background:rgba(6,9,15,0.92); border:1px solid var(--border-subtle); text-align:center;">
        <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted); letter-spacing:1px;">${label}</div>
        <div style="font-family:var(--font-display); font-size:20px; font-weight:900; color:var(--gold-light); margin-top:4px;">${value}</div>
      </div>
    `;
  }

  function renderWeaponCards() {
    const filterVal = gunFilter.value;
    const list = filterVal === "ALL" ? WEAPON_GUIDES : [WEAPON_GUIDES[parseInt(filterVal, 10)]];

    weaponsGrid.innerHTML = list
      .map(
        (w) => `
        <div style="padding:14px; border-radius:12px; background:rgba(6,9,15,0.9); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <strong style="font-family:var(--font-display); font-size:13px; color:var(--neon-primary);">${w.gun}</strong>
            <span style="font-family:var(--font-mono); font-size:10px; padding:2px 8px; border-radius:999px; background:rgba(255,179,0,0.12); color:var(--gold-light);">${w.bestRange}</span>
          </div>
          <div style="font-size:12px; color:var(--gold-primary); font-weight:600;">Drag Style: ${w.dragStyle}</div>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.45;">${w.recoilControl}</p>
        </div>
      `
      )
      .join("");
  }

  modeMobileBtn.addEventListener("click", () => setPlatformMode(false));
  modePcBtn.addEventListener("click", () => setPlatformMode(true));
  brandSelect.addEventListener("change", populateModels);
  generateBtn.addEventListener("click", generateSensitivity);
  pcTierSelect.addEventListener("change", renderPcProfile);
  gunFilter.addEventListener("change", renderWeaponCards);

  populateModels();
  renderWeaponCards();
};
