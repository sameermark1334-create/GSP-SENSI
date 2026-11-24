/* ==========================================================================
   GSP ROLEX MODULE 02: CUSTOM HUD MASTER ENGINE (modules/hud-master.js)
   Hook: window.GSP_MODULE_HUD_MASTER
   Includes: 2-Finger, 3-Finger & 4-Finger Claw Visual Layouts, Button Sizes,
             Transparency Values & Sit-Up Gloo Wall Placement Guide.
   ========================================================================== */

window.GSP_MODULE_HUD_MASTER = function renderHudMasterModule(mountEl) {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. HUD PRESETS DATABASE
  // ------------------------------------------------------------------------
  const HUD_PRESETS = {
    "2finger": {
      title: "2-FINGER PRO THUMB HUD (ONE-TAP & FAST DRAG)",
      badge: "BEGINNER TO PRO • HIGH ACCURACY",
      summary: "Agar tum dono thumbs se khelte ho toh right side mein drag space khula rakhna zaroori hai taaki upar flick karte waqt thumb kisi button se na takraye.",
      buttons: [
        { name: "Right Fire Button", size: "44%", opacity: "65%", pos: "Bottom-Right (Thoda niche taaki upward drag ke liye poori jagah mile)", x: 80, y: 74, color: "#39FF14" },
        { name: "Left Fire Button", size: "55%", opacity: "75%", pos: "Top-Left (Always On — Fast Sit-Up Gloo Wall ke liye)", x: 14, y: 30, color: "#FFB300" },
        { name: "Gloo Wall Slot", size: "62%", opacity: "85%", pos: "Bottom-Left (Thumb ke paas turant select karne ke liye)", x: 16, y: 74, color: "#00E5FF" },
        { name: "Crouch / Sit Button", size: "58%", opacity: "80%", pos: "Bottom-Right (Fire button ke left side mein)", x: 64, y: 78, color: "#FFE082" },
        { name: "Jump Button", size: "56%", opacity: "75%", pos: "Middle-Right (Drag space ke upar-right corner par)", x: 88, y: 50, color: "#FFFFFF" },
        { name: "Quick Weapon Switch", size: "54%", opacity: "80%", pos: "Top-Left (Left Fire Button ke bilkul niche)", x: 15, y: 48, color: "#FF6F00" },
        { name: "Scope Button", size: "52%", opacity: "75%", pos: "Right-Center (Jump ke thoda left-upar)", x: 76, y: 42, color: "#A4B0C6" }
      ],
      comboSteps: [
        "1. Right Fire Button se upar drag karke headshot shot maaro.",
        "2. Turant Crouch button dabao aur Gloo Wall select karo.",
        "3. Left Fire Button se instant Gloo Wall laga kar sprint dabao."
      ]
    },
    "3finger": {
      title: "3-FINGER CLAW HUD (LEFT INDEX GLOO & SWITCH)",
      badge: "RUSH & CLASH SQUAD DOMINANCE",
      summary: "Is HUD mein left index finger se Quick Switch aur Left Fire Button control hota hai, jisse M1887 aur Desert Eagle ke baad 0.2s mein gloo wall lagti hai.",
      buttons: [
        { name: "Right Fire Button", size: "42%", opacity: "60%", pos: "Bottom-Right (Clean drag zone)", x: 82, y: 75, color: "#39FF14" },
        { name: "Left Fire Button", size: "64%", opacity: "85%", pos: "Top-Left Corner (Left Index finger ke liye)", x: 12, y: 20, color: "#FFB300" },
        { name: "Quick Weapon Switch", size: "60%", opacity: "85%", pos: "Top-Left (Left Fire ke right side mein)", x: 26, y: 22, color: "#FF6F00" },
        { name: "Gloo Wall Slot", size: "64%", opacity: "85%", pos: "Bottom-Left (Left Thumb control)", x: 15, y: 76, color: "#00E5FF" },
        { name: "Crouch / Sit Button", size: "60%", opacity: "80%", pos: "Bottom-Right (Fire ke left mein)", x: 65, y: 79, color: "#FFE082" },
        { name: "Jump Button", size: "58%", opacity: "80%", pos: "Mid-Right (Fast movement jump-shots ke liye)", x: 88, y: 48, color: "#FFFFFF" },
        { name: "Sprint Button", size: "56%", opacity: "75%", pos: "Upper-Left Mid (Joystick ke upar)", x: 14, y: 46, color: "#39FF14" }
      ],
      comboSteps: [
        "1. Right thumb se fire + drag karo.",
        "2. Left index se Quick Switch dabao taaki gun reload skip ho.",
        "3. Left thumb se Gloo Wall + Left index se Left Fire dabao."
      ]
    },
    "4finger": {
      title: "4-FINGER FULL CLAW HUD (ESPORTS TOURNAMENT STYLE)",
      badge: "MAX SPEED • 360° GLOO WALL",
      summary: "Dono index fingers top corners handle karti hain — ek taraf Left Fire + Switch aur doosri taraf Jump + Scope, jisse movement aur aim bilkul alag ho jate hain.",
      buttons: [
        { name: "Right Fire Button", size: "41%", opacity: "55%", pos: "Bottom-Right (Pure drag space)", x: 81, y: 76, color: "#39FF14" },
        { name: "Left Fire Button", size: "65%", opacity: "85%", pos: "Top-Left (Left Index Finger)", x: 12, y: 19, color: "#FFB300" },
        { name: "Quick Weapon Switch", size: "60%", opacity: "85%", pos: "Top-Left Next to Fire", x: 26, y: 20, color: "#FF6F00" },
        { name: "Jump Button", size: "62%", opacity: "85%", pos: "Top-Right (Right Index Finger)", x: 86, y: 20, color: "#FFFFFF" },
        { name: "Scope Button", size: "58%", opacity: "80%", pos: "Top-Right Left of Jump", x: 73, y: 22, color: "#A4B0C6" },
        { name: "Gloo Wall Slot", size: "64%", opacity: "85%", pos: "Bottom-Left (Left Thumb)", x: 15, y: 76, color: "#00E5FF" },
        { name: "Crouch / Sit Button", size: "62%", opacity: "85%", pos: "Bottom-Right (Left of Fire)", x: 65, y: 79, color: "#FFE082" }
      ],
      comboSteps: [
        "1. Right index se Jump + Right thumb se 180° turn drag.",
        "2. Left index se weapon switch + Crouch.",
        "3. Left thumb Gloo + Left index Fire for instant 360° wall."
      ]
    }
  };

  // ------------------------------------------------------------------------
  // 2. RENDER MODULE UI
  // ------------------------------------------------------------------------
  mountEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">

      <!-- MODE SELECTOR TABS -->
      <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:space-between; padding:16px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-gold);">
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <button type="button" class="hud-tab-btn cyber-btn primary-gold-btn" data-mode="2finger" style="width:auto; margin:0; padding:10px 16px; font-size:12px;">
            👆 2-FINGER PRO
          </button>
          <button type="button" class="hud-tab-btn cyber-btn ghost-btn" data-mode="3finger" style="padding:10px 16px; font-size:12px;">
            ✌️ 3-FINGER CLAW
          </button>
          <button type="button" class="hud-tab-btn cyber-btn ghost-btn" data-mode="4finger" style="padding:10px 16px; font-size:12px;">
            🖖 4-FINGER ESPORTS
          </button>
        </div>

        <button type="button" id="hudCopyBtn" class="cyber-btn neon-send-btn">
          📋 COPY HUD SETTINGS
        </button>
      </div>

      <!-- HEADER & SUMMARY -->
      <div id="hudMetaCard" style="padding:18px; border-radius:16px; background:rgba(10,14,22,0.92); border:1px solid var(--border-subtle);"></div>

      <!-- INTERACTIVE VISUAL PHONE SCREEN RADAR -->
      <div style="padding:16px; border-radius:18px; background:rgba(6,9,15,0.95); border:1px solid var(--border-neon);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary); letter-spacing:1px;">
            📱 LIVE SCREEN PLACEMENT PREVIEW (LANDSCAPE HUD MAP)
          </span>
          <span style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">
            DRAG ZONE KEPT CLEAR ON RIGHT
          </span>
        </div>

        <div id="hudScreenCanvas" style="position:relative; width:100%; height:260px; border-radius:14px; background:radial-gradient(circle at center, #121a2b 0%, #05070c 100%); border:1px dashed rgba(255,179,0,0.4); overflow:hidden;"></div>
      </div>

      <!-- BUTTON SIZE & OPACITY TABLE + COMBO STEPS -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
        <div style="padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-subtle);">
          <h4 style="font-family:var(--font-display); font-size:14px; color:var(--gold-light); margin-bottom:12px;">
            🎛️ EXACT BUTTON SIZE &amp; TRANSPARENCY
          </h4>
          <div id="hudButtonsList" style="display:flex; flex-direction:column; gap:8px;"></div>
        </div>

        <div style="padding:18px; border-radius:16px; background:rgba(12,16,26,0.9); border:1px solid var(--border-subtle);">
          <h4 style="font-family:var(--font-display); font-size:14px; color:var(--neon-primary); margin-bottom:12px;">
            ⚡ FAST SIT-UP GLOO WALL COMBO
          </h4>
          <div id="hudComboList" style="display:flex; flex-direction:column; gap:10px;"></div>
        </div>
      </div>

    </div>
  `;

  // ------------------------------------------------------------------------
  // 3. INTERACTIVITY & RENDER ENGINE
  // ------------------------------------------------------------------------
  let activeMode = "2finger";
  const tabBtns = mountEl.querySelectorAll(".hud-tab-btn");
  const metaCard = mountEl.querySelector("#hudMetaCard");
  const screenCanvas = mountEl.querySelector("#hudScreenCanvas");
  const buttonsList = mountEl.querySelector("#hudButtonsList");
  const comboList = mountEl.querySelector("#hudComboList");
  const copyBtn = mountEl.querySelector("#hudCopyBtn");

  function renderMode(modeKey) {
    activeMode = modeKey;
    const data = HUD_PRESETS[modeKey];

    // Update tab button styles
    tabBtns.forEach((btn) => {
      const isSelected = btn.dataset.mode === modeKey;
      btn.className = `hud-tab-btn cyber-btn ${isSelected ? "primary-gold-btn" : "ghost-btn"}`;
    });

    // Render Meta Card
    metaCard.innerHTML = `
      <span style="font-family:var(--font-mono); font-size:10px; padding:4px 10px; border-radius:999px; background:rgba(255,179,0,0.14); color:var(--gold-light); border:1px solid var(--border-gold);">
        ${data.badge}
      </span>
      <h4 style="font-family:var(--font-display); font-size:17px; color:#fff; margin:10px 0 6px;">${data.title}</h4>
      <p style="font-size:14px; color:var(--text-secondary);">${data.summary}</p>
    `;

    // Render Visual Screen Canvas
    screenCanvas.innerHTML = `
      <div style="position:absolute; right:8%; top:24%; width:26%; height:64%; border:1px dashed rgba(57,255,20,0.28); border-radius:12px; display:flex; align-items:flex-start; justify-content:center; padding-top:8px; font-family:var(--font-mono); font-size:9px; color:rgba(57,255,20,0.65); pointer-events:none;">
        UPWARD DRAG ZONE
      </div>
      ${data.buttons
        .map(
          (b) => `
          <div style="position:absolute; left:${b.x}%; top:${b.y}%; transform:translate(-50%, -50%); padding:6px 10px; border-radius:999px; background:rgba(8,12,20,0.92); border:1.5px solid ${b.color}; color:${b.color}; font-family:var(--font-mono); font-size:10px; font-weight:700; white-space:nowrap; box-shadow:0 0 12px rgba(0,0,0,0.8);">
            ${b.name.split(" ")[0]} (${b.size})
          </div>
        `
        )
        .join("")}
    `;

    // Render Button Details List
    buttonsList.innerHTML = data.buttons
      .map(
        (b) => `
        <div style="padding:10px 12px; border-radius:10px; background:rgba(6,9,15,0.9); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:14px;">${b.name}</div>
            <div style="font-size:12px; color:var(--text-secondary);">${b.pos}</div>
          </div>
          <div style="text-align:right; font-family:var(--font-mono); font-size:11px; flex-shrink:0;">
            <div style="color:var(--neon-primary); font-weight:700;">Size: ${b.size}</div>
            <div style="color:var(--text-muted);">Opacity: ${b.opacity}</div>
          </div>
        </div>
      `
      )
      .join("");

    // Render Combo Steps
    comboList.innerHTML = data.comboSteps
      .map(
        (step) => `
        <div style="padding:12px; border-radius:10px; background:rgba(6,9,15,0.9); border-left:3px solid var(--gold-primary); font-size:14px; color:var(--text-primary);">
          ${step}
        </div>
      `
      )
      .join("");
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => renderMode(btn.dataset.mode));
  });

  copyBtn.addEventListener("click", async () => {
    const data = HUD_PRESETS[activeMode];
    const text = [
      `GSP ROLEX — ${data.title}`,
      ...data.buttons.map((b) => `• ${b.name}: Size ${b.size} | Opacity ${b.opacity} (${b.pos})`),
      `Combo: ${data.comboSteps.join(" -> ")}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "✅ HUD COPIED!";
      setTimeout(() => {
        copyBtn.textContent = "📋 COPY HUD SETTINGS";
      }, 1600);
    } catch {
      copyBtn.textContent = "COPY FAILED";
    }
  });

  renderMode("2finger");
};
