/* ==========================================================================
   GSP ROLEX MODULE 01: FREE SENSI & WEAPON MASTERY ENGINE (modules/free-sensi.js)
   Hook: window.GSP_MODULE_FREE_SENSI
   Includes: All Brands (Infinix, Motorola, Itel/Airtel, Tecno, Poco, Redmi,
             Realme, Samsung, Vivo, Oppo, OnePlus, iQOO, Apple iPhone),
             Custom Model Fallback, Fire Button Size & Gun Recoil Mastery.
   ========================================================================== */

window.GSP_MODULE_FREE_SENSI = function renderFreeSensiModule(mountEl) {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. COMPREHENSIVE DEVICE DATABASE (ALL MISSING & POPULAR BRANDS INCLUDED)
  // ------------------------------------------------------------------------
  const DEVICE_DB = {
    "Infinix": [
      { model: "Infinix Hot 40", chip: "Helio G88", hz: 90, gen: 186, red: 180, x2: 174, x4: 168, sniper: 100, free: 165, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Infinix Hot 40 Pro", chip: "Helio G99", hz: 120, gen: 192, red: 185, x2: 178, x4: 172, sniper: 104, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Infinix Hot 30 / 30i", chip: "Helio G88 / G37", hz: 90, gen: 189, red: 182, x2: 175, x4: 169, sniper: 98, free: 166, fire: "45% - 48%", gfx: "Smooth / High FPS" },
      { model: "Infinix Smart 9", chip: "Helio G81", hz: 120, gen: 196, red: 188, x2: 182, x4: 175, sniper: 105, free: 172, fire: "43% - 46%", gfx: "Smooth / High FPS" },
      { model: "Infinix Smart 8 / 8 HD", chip: "Unisoc T606", hz: 90, gen: 197, red: 190, x2: 183, x4: 176, sniper: 102, free: 174, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Infinix Note 40 Pro 5G", chip: "Dimensity 7020", hz: 120, gen: 190, red: 184, x2: 177, x4: 171, sniper: 105, free: 168, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Infinix Note 30 5G", chip: "Dimensity 6080", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 103, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Infinix GT 20 Pro", chip: "Dimensity 8200 Ultimate", hz: 144, gen: 185, red: 179, x2: 172, x4: 166, sniper: 102, free: 164, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "Infinix GT 10 Pro", chip: "Dimensity 8050", hz: 120, gen: 188, red: 182, x2: 175, x4: 168, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" }
    ],
    "Motorola": [
      { model: "Motorola Edge 50 Fusion", chip: "Snapdragon 7s Gen 2", hz: 144, gen: 187, red: 181, x2: 174, x4: 168, sniper: 102, free: 165, fire: "42% - 45%", gfx: "Max / High FPS" },
      { model: "Motorola Edge 40 Neo", chip: "Dimensity 7030", hz: 144, gen: 188, red: 182, x2: 175, x4: 169, sniper: 104, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Moto G85 5G", chip: "Snapdragon 6s Gen 3", hz: 120, gen: 191, red: 185, x2: 178, x4: 172, sniper: 103, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Moto G64 5G", chip: "Dimensity 7025", hz: 120, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Moto G54 5G", chip: "Dimensity 7020", hz: 120, gen: 193, red: 186, x2: 179, x4: 173, sniper: 103, free: 171, fire: "44% - 47%", gfx: "Standard / High FPS" },
      { model: "Moto G34 5G / G35", chip: "Snapdragon 695", hz: 120, gen: 194, red: 187, x2: 180, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Moto G24 Power / G04", chip: "Helio G85 / T606", hz: 90, gen: 196, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Itel / Airtel": [
      { model: "Itel P55 5G (Airtel Edition)", chip: "Dimensity 6080", hz: 90, gen: 194, red: 187, x2: 180, x4: 173, sniper: 102, free: 171, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Itel S23 / S23+", chip: "Unisoc T606 / T616", hz: 90, gen: 197, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" },
      { model: "Itel A70 / A50 (Airtel Lock/Unlock)", chip: "Unisoc T603", hz: 60, gen: 199, red: 193, x2: 186, x4: 179, sniper: 98, free: 176, fire: "46% - 49%", gfx: "Smooth / Normal FPS" },
      { model: "Itel Zeno 10 / Aura 05i", chip: "Octa-Core Entry", hz: 60, gen: 200, red: 194, x2: 187, x4: 180, sniper: 98, free: 178, fire: "46% - 50%", gfx: "Smooth / Normal FPS" },
      { model: "Itel RS4 Gaming", chip: "Helio G99 Ultimate", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 104, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "Tecno": [
      { model: "Tecno Pova 6 Pro 5G", chip: "Dimensity 6080", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 104, free: 168, fire: "43% - 46%", gfx: "Ultra / High FPS" },
      { model: "Tecno Pova 5 Pro 5G", chip: "Dimensity 6080", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 103, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Tecno Camon 30 5G", chip: "Dimensity 7020", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 103, free: 168, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Tecno Spark 20 / 20C", chip: "Helio G85 / G36", hz: 90, gen: 196, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "45% - 48%", gfx: "Smooth / High FPS" },
      { model: "Tecno Pop 8 / Pop 9", chip: "Unisoc T606 / G50", hz: 90, gen: 198, red: 191, x2: 184, x4: 177, sniper: 99, free: 175, fire: "45% - 49%", gfx: "Smooth / High FPS" }
    ],
    "Poco": [
      { model: "POCO X6 Pro 5G", chip: "Dimensity 8300 Ultra", hz: 120, gen: 184, red: 178, x2: 171, x4: 165, sniper: 103, free: 162, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "POCO X6 5G", chip: "Snapdragon 7s Gen 2", hz: 120, gen: 187, red: 181, x2: 174, x4: 168, sniper: 103, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "POCO M6 Pro 5G", chip: "Snapdragon 4 Gen 2", hz: 90, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "POCO M6 5G / C65", chip: "Dimensity 6100+ / G85", hz: 90, gen: 194, red: 188, x2: 181, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "POCO F6 5G", chip: "Snapdragon 8s Gen 3", hz: 120, gen: 182, red: 176, x2: 170, x4: 164, sniper: 104, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" }
    ],
    "Redmi / Xiaomi": [
      { model: "Redmi Note 13 Pro+ 5G", chip: "Dimensity 7200 Ultra", hz: 120, gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Redmi Note 13 5G", chip: "Dimensity 6080", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Redmi 13C 5G / 12 5G", chip: "Dimensity 6100+ / SD 4 Gen 2", hz: 90, gen: 193, red: 187, x2: 180, x4: 173, sniper: 101, free: 171, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Redmi A3 / A2", chip: "Helio G36", hz: 90, gen: 198, red: 192, x2: 185, x4: 178, sniper: 98, free: 176, fire: "45% - 49%", gfx: "Smooth / Normal FPS" }
    ],
    "Realme": [
      { model: "Realme Narzo 70 Pro 5G", chip: "Dimensity 7050", hz: 120, gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Realme 12+ / 12x 5G", chip: "Dimensity 7050 / 6100+", hz: 120, gen: 190, red: 184, x2: 177, x4: 170, sniper: 102, free: 168, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Realme C67 / C55 / C53", chip: "Dimensity 6100+ / G88 / T612", hz: 90, gen: 195, red: 188, x2: 181, x4: 174, sniper: 100, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Realme GT 6T", chip: "Snapdragon 7+ Gen 3", hz: 120, gen: 183, red: 177, x2: 171, x4: 165, sniper: 104, free: 161, fire: "40% - 43%", gfx: "Max / High FPS" }
    ],
    "Samsung": [
      { model: "Samsung Galaxy S24 Ultra / S23", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "Samsung Galaxy A55 / A35 5G", chip: "Exynos 1480 / 1380", hz: 120, gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Samsung Galaxy M34 / F54 5G", chip: "Exynos 1280 / 1380", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Samsung Galaxy A15 / M15 5G", chip: "Dimensity 6100+", hz: 90, gen: 194, red: 188, x2: 181, x4: 174, sniper: 101, free: 172, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Samsung Galaxy A05 / F14", chip: "Helio G85 / Exynos 1330", hz: 90, gen: 196, red: 190, x2: 183, x4: 176, sniper: 100, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Vivo": [
      { model: "Vivo T3 5G / T3x 5G", chip: "Dimensity 7200 / SD 6 Gen 1", hz: 120, gen: 188, red: 182, x2: 175, x4: 169, sniper: 103, free: 166, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo V30 / V29 5G", chip: "Snapdragon 7 Gen 3 / 778G", hz: 120, gen: 187, red: 181, x2: 174, x4: 168, sniper: 104, free: 165, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Vivo Y28 5G / Y200e", chip: "Dimensity 6020 / SD 4 Gen 2", hz: 90, gen: 193, red: 187, x2: 180, x4: 173, sniper: 101, free: 171, fire: "44% - 47%", gfx: "Smooth / High FPS" },
      { model: "Vivo Y18 / Y16", chip: "Helio G85 / P35", hz: 90, gen: 197, red: 190, x2: 183, x4: 176, sniper: 99, free: 174, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "Oppo": [
      { model: "Oppo F27 Pro+ / Reno 11 5G", chip: "Dimensity 7050", hz: 120, gen: 189, red: 183, x2: 176, x4: 170, sniper: 103, free: 167, fire: "42% - 45%", gfx: "Ultra / High FPS" },
      { model: "Oppo A79 5G / A59 5G", chip: "Dimensity 6020", hz: 90, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Oppo K12x 5G", chip: "Dimensity 6300", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" },
      { model: "Oppo A38 / A18", chip: "Helio G85", hz: 90, gen: 196, red: 189, x2: 182, x4: 175, sniper: 100, free: 173, fire: "45% - 48%", gfx: "Smooth / High FPS" }
    ],
    "OnePlus": [
      { model: "OnePlus 12 / 12R", chip: "Snapdragon 8 Gen 3 / Gen 2", hz: 120, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "OnePlus Nord CE 4 / Nord 4", chip: "Snapdragon 7 Gen 3 / 7+ Gen 3", hz: 120, gen: 185, red: 179, x2: 172, x4: 166, sniper: 104, free: 163, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "OnePlus Nord CE 3 Lite", chip: "Snapdragon 695", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "iQOO": [
      { model: "iQOO Neo 9 Pro / Neo 7 Pro", chip: "Snapdragon 8 Gen 2 / 8+ Gen 1", hz: 144, gen: 182, red: 176, x2: 170, x4: 164, sniper: 105, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iQOO Z9 5G / Z9s Pro", chip: "Dimensity 7200 / SD 7 Gen 3", hz: 120, gen: 186, red: 180, x2: 173, x4: 167, sniper: 104, free: 164, fire: "41% - 44%", gfx: "Ultra / High FPS" },
      { model: "iQOO Z9x / Z7s 5G", chip: "Snapdragon 6 Gen 1 / 695", hz: 120, gen: 191, red: 185, x2: 178, x4: 171, sniper: 102, free: 169, fire: "43% - 46%", gfx: "Standard / High FPS" }
    ],
    "Apple iPhone": [
      { model: "iPhone 15 / 15 Plus", chip: "A16 Bionic", hz: 60, gen: 185, red: 180, x2: 174, x4: 168, sniper: 108, free: 164, fire: "41% - 44%", gfx: "Max / High FPS" },
      { model: "iPhone 15 Pro / 15 Pro Max", chip: "A17 Pro", hz: 120, gen: 181, red: 176, x2: 170, x4: 164, sniper: 110, free: 160, fire: "40% - 43%", gfx: "Max / High FPS" },
      { model: "iPhone 14 / 13", chip: "A15 Bionic", hz: 60, gen: 187, red: 181, x2: 175, x4: 169, sniper: 106, free: 165, fire: "42% - 45%", gfx: "Max / High FPS" },
      { model: "iPhone 12 / 11", chip: "A14 / A13 Bionic", hz: 60, gen: 190, red: 184, x2: 177, x4: 171, sniper: 104, free: 168, fire: "43% - 46%", gfx: "Ultra / High FPS" }
    ]
  };

  // ------------------------------------------------------------------------
  // 2. WEAPON MASTERY & RECOIL CONTROL DATABASE
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
      recoilControl: "Enemy ke chest ke thoda niche white crosshair rakho; jaise hi crosshair red ho, tez aur chhota upward drag maaro. Spam mat karo — har shot ke beech 0.4s ruk kar recoil reset hone do.",
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
      recoilControl: "Crosshair ko enemy ke neck/chest par lock karke fire button ko steady speed se upar khincho. Bahut tez jhatka dene se goli sir ke upar chali jati hai.",
      bestRange: "8m - 28m (Close-Mid)"
    },
    {
      gun: "Woodpecker / AC80",
      type: "Marksman Rifle",
      dragStyle: "Micro-Drag (Halka Upward Tap)",
      recoilControl: "Inka damage aur accuracy high hai, isliye lamba drag mat maaro. Bas fire button ko halka sa upar touch-drag karo aur 2-tap rhythm rakho.",
      bestRange: "15m - 55m (Mid-Long)"
    },
    {
      gun: "M1014 (Evo / Chip)",
      type: "Heavy Shotgun",
      dragStyle: "Wide Rotation Drag",
      recoilControl: "Close fight mein fire button ko neeche se U-shape rotation mein upar le jao. 3 bullets se zyada lagatar mat chalao warna bullet spread badh jata hai.",
      bestRange: "0m - 10m (Point Blank)"
    },
    {
      gun: "AK47 / SCAR / M4A1",
      type: "Assault Rifles (AR)",
      dragStyle: "Burst Control + Scope-In Tap",
      recoilControl: "Long range mein scope open karke 4-5 goli ke bursts chalao. Lagatar spray karne se crosshair bada ho jata hai — crouch/stand reset use karo.",
      bestRange: "25m - 70m (Long Range)"
    },
    {
      gun: "AWM / M82B",
      type: "Sniper Rifles",
      dragStyle: "Quick-Scope + Fast Switch",
      recoilControl: "Sniper sensitivity (100-110) par aim chest/head par le jaakar fire + quick weapon switch dabao taaki reload animation skip ho.",
      bestRange: "30m - 100m+ (Support)"
    }
  ];

  // ------------------------------------------------------------------------
  // 3. RENDER MODULE UI
  // ------------------------------------------------------------------------
  const brands = Object.keys(DEVICE_DB);

  mountEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:22px;">

      <!-- STEP 1: BRAND & MODEL SELECTOR -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-gold);">
        <div>
          <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
            1. SELECT PHONE BRAND
          </label>
          <select id="fsBrandSelect" style="width:100%; padding:12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-family:var(--font-body); font-size:15px;">
            ${brands.map((b) => `<option value="${b}">${b}</option>`).join("")}
            <option value="__CUSTOM__">Other / Custom Phone Model</option>
          </select>
        </div>

        <div id="fsModelSelectWrap">
          <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
            2. SELECT PHONE MODEL
          </label>
          <select id="fsModelSelect" style="width:100%; padding:12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-family:var(--font-body); font-size:15px;"></select>
        </div>

        <div id="fsCustomWrap" class="hidden" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--neon-primary); margin-bottom:6px;">
              CUSTOM MODEL NAME
            </label>
            <input type="text" id="fsCustomName" placeholder="e.g. Infinix Hot 50" style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle);" />
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--neon-primary); margin-bottom:6px;">
              RAM / REFRESH RATE
            </label>
            <select id="fsCustomSpec" style="width:100%; padding:11px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle);">
              <option value="low">2GB-4GB RAM (60Hz)</option>
              <option value="mid" selected>4GB-8GB RAM (90Hz/120Hz)</option>
              <option value="flagship">8GB-16GB Flagship (120Hz/144Hz)</option>
            </select>
          </div>
        </div>

        <div>
          <label style="display:block; font-family:var(--font-mono); font-size:11px; color:var(--gold-light); margin-bottom:6px;">
            3. PLAYSTYLE TUNING
          </label>
          <select id="fsPlaystyle" style="width:100%; padding:12px; border-radius:10px; background:#06090f; color:#fff; border:1px solid var(--border-subtle); font-family:var(--font-body); font-size:15px;">
            <option value="balanced" selected>Balanced One-Tap + Rush</option>
            <option value="onetap">Aggressive One-Tap (+3 Boost)</option>
            <option value="control">High Recoil Control (-3 Stability)</option>
          </select>
        </div>
      </div>

      <button id="fsGenerateBtn" class="cyber-btn primary-gold-btn" style="margin-top:0;">
        <span>⚡ GENERATE GSP ROLEX SENSITIVITY &amp; FIRE BUTTON</span>
      </button>

      <!-- STEP 2: GENERATED SENSITIVITY OUTPUT CARD -->
      <div id="fsResultBox" class="hidden" style="padding:20px; border-radius:18px; background:linear-gradient(155deg, rgba(16,23,36,0.96), rgba(8,11,18,0.98)); border:1px solid var(--border-neon); box-shadow:var(--shadow-neon);"></div>

      <!-- STEP 3: WEAPON MASTERY & RECOIL CONTROL HUB -->
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
  // 4. INTERACTIVITY LOGIC
  // ------------------------------------------------------------------------
  const brandSelect = mountEl.querySelector("#fsBrandSelect");
  const modelSelectWrap = mountEl.querySelector("#fsModelSelectWrap");
  const modelSelect = mountEl.querySelector("#fsModelSelect");
  const customWrap = mountEl.querySelector("#fsCustomWrap");
  const customName = mountEl.querySelector("#fsCustomName");
  const customSpec = mountEl.querySelector("#fsCustomSpec");
  const playstyleSelect = mountEl.querySelector("#fsPlaystyle");
  const generateBtn = mountEl.querySelector("#fsGenerateBtn");
  const resultBox = mountEl.querySelector("#fsResultBox");
  const gunFilter = mountEl.querySelector("#fsGunFilter");
  const weaponsGrid = mountEl.querySelector("#fsWeaponsGrid");

  function populateModels() {
    const selectedBrand = brandSelect.value;
    if (selectedBrand === "__CUSTOM__") {
      modelSelectWrap.classList.add("hidden");
      customWrap.classList.remove("hidden");
      return;
    }
    modelSelectWrap.classList.remove("hidden");
    customWrap.classList.add("hidden");

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
    const style = playstyleSelect.value;
    const offset = style === "onetap" ? 3 : style === "control" ? -3 : 0;

    let profile;
    if (brand === "__CUSTOM__") {
      const name = customName.value.trim() || "Custom Android / iOS Device";
      const tier = customSpec.value;
      if (tier === "low") {
        profile = { model: name, chip: "Entry/Budget SoC", hz: 60, gen: 198, red: 191, x2: 184, x4: 177, sniper: 99, free: 175, fire: "45% - 49%", gfx: "Smooth / Normal FPS" };
      } else if (tier === "flagship") {
        profile = { model: name, chip: "High-Touch Flagship", hz: 120, gen: 184, red: 178, x2: 172, x4: 166, sniper: 105, free: 162, fire: "40% - 43%", gfx: "Max / High FPS" };
      } else {
        profile = { model: name, chip: "Mid-Range Gaming SoC", hz: 90, gen: 192, red: 186, x2: 179, x4: 172, sniper: 102, free: 170, fire: "43% - 46%", gfx: "Standard / High FPS" };
      }
    } else {
      const idx = parseInt(modelSelect.value, 10) || 0;
      profile = { ...DEVICE_DB[brand][idx] };
    }

    const finalData = {
      model: profile.model,
      chip: profile.chip,
      hz: profile.hz,
      gen: clamp200(profile.gen + offset),
      red: clamp200(profile.red + offset),
      x2: clamp200(profile.x2 + offset),
      x4: clamp200(profile.x4 + offset),
      sniper: clamp200(profile.sniper + (offset > 0 ? 2 : 0)),
      free: clamp200(profile.free + offset),
      fire: profile.fire,
      gfx: profile.gfx
    };

    const copyText = [
      `GSP ROLEX Sensitivity — ${finalData.model} (${finalData.chip} | ${finalData.hz}Hz)`,
      `General: ${finalData.gen} | Red Dot: ${finalData.red} | 2x: ${finalData.x2} | 4x: ${finalData.x4} | Sniper: ${finalData.sniper} | Free Look: ${finalData.free}`,
      `Fire Button Size: ${finalData.fire} | Graphics: ${finalData.gfx}`,
      `Drag Tip: Aim chest ke aas-paas rakho aur smooth upward / J-rotation drag maaro.`
    ].join("\n");

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:16px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
        <div>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">CALIBRATED BY GSP ROLEX</span>
          <h4 style="font-family:var(--font-display); font-size:18px; color:#fff;">${finalData.model}</h4>
          <span style="font-size:13px; color:var(--text-secondary);">${finalData.chip} • ${finalData.hz}Hz Display • ${finalData.gfx}</span>
        </div>
        <button id="fsCopyBtn" class="cyber-btn neon-send-btn">📋 COPY SETUP</button>
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

  function renderMetricTile(label, value) {
    return `
      <div style="padding:12px; border-radius:12px; background:rgba(6,9,15,0.92); border:1px solid var(--border-subtle); text-align:center;">
        <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted); letter-spacing:1px;">${label}</div>
        <div style="font-family:var(--font-display); font-size:22px; font-weight:900; color:var(--gold-light); margin-top:4px;">${value}</div>
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

  // Event Listeners
  brandSelect.addEventListener("change", populateModels);
  generateBtn.addEventListener("click", generateSensitivity);
  gunFilter.addEventListener("change", renderWeaponCards);

  // Initialize defaults
  populateModels();
  renderWeaponCards();
};
