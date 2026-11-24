/* ==========================================================================
   GSP ROLEX COMMAND PORTAL — CORE APPLICATION ENGINE (app.js)
   Handles: Dual Auth, Owner Admin Controls, Live Gemini AI Bot & Module Router
   ========================================================================== */

(() => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. ACCESS CREDENTIALS & DEFAULT CONFIGURATION
  // ------------------------------------------------------------------------
  const AUTH_CONFIG = {
    USER_PASSWORDS: ["gsprolex", "GSPROLEX"],
    ADMIN_PASSWORD: "gspsam123",
    SESSION_KEY: "gsp_rolex_session_v4"
  };

  const STORAGE_KEYS = {
    MODULES_STATE: "gsp_rolex_modules_registry_v4",
    API_KEY: "gsp_rolex_gemini_api_key_v4"
  };

  // Pre-loaded Gemini API Key (Editable anytime from Owner Panel)
  const DEFAULT_GEMINI_KEY = "AIzaSyBkrZwiM7XpNBLCb0xM2Soo2GaaAdJR534";

  // Master Registry of All 8 Modular Files
  const DEFAULT_MODULES = [
    {
      id: "free-sensi",
      name: "FREE SENSI ENGINE",
      icon: "🎯",
      file: "modules/free-sensi.js",
      globalHook: "GSP_MODULE_FREE_SENSI",
      tag: "300+ Devices • Fire Button • Gun Recoil Guide",
      desc: "All-brand sensitivity generator (Infinix, Motorola, Itel, Tecno, Poco, Redmi, Samsung, Vivo, Oppo, iQOO, iPhone) with fire button size & weapon mastery.",
      enabled: true
    },
    {
      id: "hud-master",
      name: "CUSTOM HUD MASTER",
      icon: "🎮",
      file: "modules/hud-master.js",
      globalHook: "GSP_MODULE_HUD_MASTER",
      tag: "2-Finger • 3-Finger • 4-Finger Claw Layouts",
      desc: "Pro HUD finger placement, fire button positioning, and fast gloo-wall control layouts.",
      enabled: true
    },
    {
      id: "paid-sensi",
      name: "PAID SENSI",
      icon: "👑",
      file: "modules/paid-sensi.js",
      globalHook: "GSP_MODULE_PAID_SENSI",
      tag: "VIP Precision & Pro Drag Tuning",
      desc: "Exclusive high-precision sensitivity presets tuned for competitive rush & one-tap players.",
      enabled: false
    },
    {
      id: "paid-sensi-config",
      name: "PAID SENSI CONFIG",
      icon: "⚙️",
      file: "modules/paid-sensi-config.js",
      globalHook: "GSP_MODULE_PAID_SENSI_CONFIG",
      tag: "Device Calibration & Touch Optimization",
      desc: "Legitimate system touch-response, pointer speed, and display calibration setups.",
      enabled: false
    },
    {
      id: "id-like",
      name: "FREE FIRE ID LIKE",
      icon: "❤️",
      file: "modules/id-like.js",
      globalHook: "GSP_MODULE_ID_LIKE",
      tag: "Profile Engagement & Squad Boost",
      desc: "Automated profile like queue and squad showcase tools.",
      enabled: false
    },
    {
      id: "level-up-bot",
      name: "FREE FIRE LEVEL UP BOT",
      icon: "⚡",
      file: "modules/level-up-bot.js",
      globalHook: "GSP_MODULE_LEVEL_UP_BOT",
      tag: "EXP & Match Grinding Tracker",
      desc: "Smart EXP progression calculator and grinding session manager.",
      enabled: false
    },
    {
      id: "tcp-bot",
      name: "TCP BOT",
      icon: "📡",
      file: "modules/tcp-bot.js",
      globalHook: "GSP_MODULE_TCP_BOT",
      tag: "Network & Packet Latency Utility",
      desc: "Ping stability monitor and connection routing diagnostics.",
      enabled: false
    },
    {
      id: "guild-glory-bot",
      name: "GUILD GLORY BOT",
      icon: "🛡️",
      file: "modules/guild-glory-bot.js",
      globalHook: "GSP_MODULE_GUILD_GLORY_BOT",
      tag: "GSP Guild Dog-Tag & Glory Manager",
      desc: "Guild tournament tracking, member activity logs, and weekly glory planner.",
      enabled: false
    }
  ];

  // ------------------------------------------------------------------------
  // 2. STATE & DOM REFERENCES
  // ------------------------------------------------------------------------
  let modulesState = loadModulesState();
  let currentRole = null; // "user" | "admin"
  const loadedScripts = new Set();

  const dom = {
    body: document.body,
    gateScreen: document.getElementById("gateScreen"),
    loginForm: document.getElementById("loginForm"),
    accessKeyInput: document.getElementById("accessKeyInput"),
    togglePassVis: document.getElementById("togglePassVis"),
    loginFeedback: document.getElementById("loginFeedback"),
    portalShell: document.getElementById("portalShell"),
    roleBadgeText: document.getElementById("roleBadgeText"),
    openChatBtn: document.getElementById("openChatBtn"),
    openAdminBtn: document.getElementById("openAdminBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    activeModulesCount: document.getElementById("activeModulesCount"),
    aiChatDrawer: document.getElementById("aiChatDrawer"),
    collapseChatBtn: document.getElementById("collapseChatBtn"),
    chatMessages: document.getElementById("chatMessages"),
    chatForm: document.getElementById("chatForm"),
    chatInput: document.getElementById("chatInput"),
    sendChatBtn: document.getElementById("sendChatBtn"),
    modulesGrid: document.getElementById("modulesGrid"),
    moduleViewport: document.getElementById("moduleViewport"),
    activeModuleIcon: document.getElementById("activeModuleIcon"),
    activeModuleTitle: document.getElementById("activeModuleTitle"),
    activeModuleTag: document.getElementById("activeModuleTag"),
    closeModuleBtn: document.getElementById("closeModuleBtn"),
    moduleMountPoint: document.getElementById("moduleMountPoint"),
    adminDrawer: document.getElementById("adminDrawer"),
    closeAdminBtn: document.getElementById("closeAdminBtn"),
    doneAdminBtn: document.getElementById("doneAdminBtn"),
    resetModulesBtn: document.getElementById("resetModulesBtn"),
    adminModuleToggles: document.getElementById("adminModuleToggles"),
    adminApiKeyInput: document.getElementById("adminApiKeyInput"),
    saveApiKeyBtn: document.getElementById("saveApiKeyBtn")
  };

  // ------------------------------------------------------------------------
  // 3. STORAGE HELPERS
  // ------------------------------------------------------------------------
  function loadModulesState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULES_STATE);
      if (!saved) return JSON.parse(JSON.stringify(DEFAULT_MODULES));
      const parsed = JSON.parse(saved);
      // Merge with defaults in case new modules are added later
      return DEFAULT_MODULES.map((defMod) => {
        const found = parsed.find((m) => m.id === defMod.id);
        return found ? { ...defMod, enabled: Boolean(found.enabled) } : { ...defMod };
      });
    } catch (err) {
      console.warn("Module state load fallback:", err);
      return JSON.parse(JSON.stringify(DEFAULT_MODULES));
    }
  }

  function saveModulesState() {
    try {
      localStorage.setItem(STORAGE_KEYS.MODULES_STATE, JSON.stringify(modulesState));
    } catch (err) {
      console.error("Failed to save modules state:", err);
    }
  }

  function getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || DEFAULT_GEMINI_KEY;
  }

  function setApiKey(newKey) {
    localStorage.setItem(STORAGE_KEYS.API_KEY, newKey.trim());
  }

  // ------------------------------------------------------------------------
  // 4. DUAL ACCESS GATE & AUTHENTICATION
  // ------------------------------------------------------------------------
  function initAuth() {
    // Check existing session
    const savedRole = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY);
    if (savedRole === "admin" || savedRole === "user") {
      unlockPortal(savedRole, true);
    }

    // Toggle password visibility
    dom.togglePassVis.addEventListener("click", () => {
      const isPass = dom.accessKeyInput.type === "password";
      dom.accessKeyInput.type = isPass ? "text" : "password";
      dom.togglePassVis.textContent = isPass ? "🙈" : "👁";
    });

    // Handle Passcode Submit
    dom.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = dom.accessKeyInput.value.trim();

      if (entered === AUTH_CONFIG.ADMIN_PASSWORD) {
        showLoginStatus("👑 OWNER ACCESS VERIFIED — INITIALIZING ROOT COMMAND...", true);
        setTimeout(() => unlockPortal("admin", false), 550);
      } else if (AUTH_CONFIG.USER_PASSWORDS.includes(entered)) {
        showLoginStatus("⚡ ACCESS GRANTED — WELCOME TO GSP ROLEX ARENA!", true);
        setTimeout(() => unlockPortal("user", false), 550);
      } else {
        showLoginStatus("❌ INVALID ACCESS KEY! CHECK PASSCODE & TRY AGAIN.", false);
        dom.loginForm.classList.remove("shake-anim");
        void dom.loginForm.offsetWidth; // trigger reflow
        dom.loginForm.classList.add("shake-anim");
        dom.accessKeyInput.value = "";
        dom.accessKeyInput.focus();
      }
    });

    // Lock / Logout Button
    dom.logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
      currentRole = null;
      dom.accessKeyInput.value = "";
      dom.loginFeedback.textContent = "";
      dom.portalShell.classList.add("hidden");
      dom.adminDrawer.classList.add("hidden");
      dom.gateScreen.classList.remove("hidden", "exit-anim");
      dom.body.classList.add("locked-state");
    });
  }

  function showLoginStatus(msg, isSuccess) {
    dom.loginFeedback.textContent = msg;
    dom.loginFeedback.classList.toggle("success", isSuccess);
  }

  function unlockPortal(role, instant) {
    currentRole = role;
    sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, role);

    if (role === "admin") {
      dom.roleBadgeText.textContent = "OWNER / ADMIN ROOT";
      dom.openAdminBtn.classList.remove("hidden");
    } else {
      dom.roleBadgeText.textContent = "VERIFIED USER ACCESS";
      dom.openAdminBtn.classList.add("hidden");
    }

    if (instant) {
      dom.gateScreen.classList.add("hidden");
      dom.body.classList.remove("locked-state");
      dom.portalShell.classList.remove("hidden");
    } else {
      dom.gateScreen.classList.add("exit-anim");
      setTimeout(() => {
        dom.gateScreen.classList.add("hidden");
        dom.body.classList.remove("locked-state");
        dom.portalShell.classList.remove("hidden");
      }, 420);
    }

    renderModulesGrid();
    renderAdminToggles();
  }

  // ------------------------------------------------------------------------
  // 5. MODULES GRID & DYNAMIC SCRIPT ROUTER
  // ------------------------------------------------------------------------
  function renderModulesGrid() {
    const activeCount = modulesState.filter((m) => m.enabled).length;
    dom.activeModulesCount.textContent = String(activeCount);
    dom.modulesGrid.innerHTML = "";

    modulesState.forEach((mod) => {
      const card = document.createElement("article");
      card.className = `module-card ${mod.enabled ? "is-active" : "is-disabled"}`;

      card.innerHTML = `
        <div>
          <div class="module-card-top">
            <div class="module-icon-box">${mod.icon}</div>
            <span class="module-badge ${mod.enabled ? "badge-live" : "badge-off"}">
              ${mod.enabled ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
          <h4 class="module-name" style="margin-top:14px;">${mod.name}</h4>
          <p class="module-desc">${mod.desc}</p>
        </div>
        <div class="module-launch-row">
          <span>${mod.enabled ? "LAUNCH MODULE" : "DISABLED BY OWNER"}</span>
          <span>${mod.enabled ? "⚡ ➤" : "🔒"}</span>
        </div>
      `;

      if (mod.enabled) {
        card.addEventListener("click", () => launchModule(mod));
      } else {
        card.addEventListener("click", () => {
          if (currentRole === "admin") {
            openAdminDrawer();
          } else {
            appendChatMessage(
              "GSP AI",
              `<strong>${mod.name}</strong> abhi Owner ne OFF rakha hua hai. Active modules use karo ya update ka wait karo! ⚡`,
              false
            );
          }
        });
      }

      dom.modulesGrid.appendChild(card);
    });
  }

  function launchModule(mod) {
    dom.activeModuleIcon.textContent = mod.icon;
    dom.activeModuleTitle.textContent = mod.name;
    dom.activeModuleTag.textContent = mod.tag;
    dom.moduleViewport.classList.remove("hidden");
    dom.moduleMountPoint.innerHTML = `
      <div style="text-align:center; padding:34px 16px; color:var(--text-secondary);">
        <div style="font-size:28px; margin-bottom:10px;">⚡</div>
        <div style="font-family:var(--font-display); font-size:14px; color:var(--gold-light);">
          LOADING ${mod.name}...
        </div>
        <div style="font-family:var(--font-mono); font-size:11px; margin-top:6px; color:var(--text-muted);">
          File: ${mod.file}
        </div>
      </div>
    `;

    dom.moduleViewport.scrollIntoView({ behavior: "smooth", block: "start" });

    // If module hook already registered on window, render immediately
    if (typeof window[mod.globalHook] === "function") {
      window[mod.globalHook](dom.moduleMountPoint);
      return;
    }

    // Dynamically load external module file from /modules/
    if (!loadedScripts.has(mod.file)) {
      const script = document.createElement("script");
      script.src = `${mod.file}?v=${Date.now()}`;
      script.onload = () => {
        loadedScripts.add(mod.file);
        if (typeof window[mod.globalHook] === "function") {
          window[mod.globalHook](dom.moduleMountPoint);
        } else {
          renderModuleMissingNotice(mod);
        }
      };
      script.onerror = () => {
        renderModuleMissingNotice(mod);
      };
      document.body.appendChild(script);
    } else {
      renderModuleMissingNotice(mod);
    }
  }

  function renderModuleMissingNotice(mod) {
    dom.moduleMountPoint.innerHTML = `
      <div style="padding:26px; border-radius:14px; background:rgba(255,179,0,0.07); border:1px dashed var(--border-gold); text-align:center;">
        <div style="font-size:32px; margin-bottom:10px;">🛠️</div>
        <h4 style="font-family:var(--font-display); color:var(--gold-light); margin-bottom:8px;">
          ${mod.name} FILE READY FOR DEPLOYMENT
        </h4>
        <p style="color:var(--text-secondary); max-width:540px; margin:0 auto 12px;">
          Is module ke liye alag file path <code>${mod.file}</code> set hai. Jaise hi tum <strong>${mod.file}</strong> folder mein upload karoge, yeh module bina main website ko chhede turant live chalne lagega!
        </p>
        <div style="font-family:var(--font-mono); font-size:11px; color:var(--neon-primary);">
          Hook Target: window.${mod.globalHook}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 6. OWNER ADMIN PANEL (ON / OFF TOGGLES & API KEY CONFIG)
  // ------------------------------------------------------------------------
  function renderAdminToggles() {
    dom.adminModuleToggles.innerHTML = "";
    dom.adminApiKeyInput.value = getApiKey();

    modulesState.forEach((mod) => {
      const row = document.createElement("div");
      row.className = "admin-toggle-item";
      row.innerHTML = `
        <div>
          <div class="admin-toggle-title">${mod.icon} ${mod.name}</div>
          <div class="admin-toggle-file">${mod.file}</div>
        </div>
        <label class="switch-ui" title="Toggle ${mod.name}">
          <input type="checkbox" data-mod-id="${mod.id}" ${mod.enabled ? "checked" : ""} />
          <span class="slider-ui"></span>
        </label>
      `;

      const checkbox = row.querySelector("input");
      checkbox.addEventListener("change", (e) => {
        mod.enabled = e.target.checked;
        saveModulesState();
        renderModulesGrid();
      });

      dom.adminModuleToggles.appendChild(row);
    });
  }

  function openAdminDrawer() {
    if (currentRole !== "admin") return;
    renderAdminToggles();
    dom.adminDrawer.classList.remove("hidden");
  }

  function closeAdminDrawer() {
    dom.adminDrawer.classList.add("hidden");
  }

  function initAdminControls() {
    dom.openAdminBtn.addEventListener("click", openAdminDrawer);
    dom.closeAdminBtn.addEventListener("click", closeAdminDrawer);
    dom.doneAdminBtn.addEventListener("click", closeAdminDrawer);

    dom.saveApiKeyBtn.addEventListener("click", () => {
      const val = dom.adminApiKeyInput.value.trim();
      if (!val) return;
      setApiKey(val);
      dom.saveApiKeyBtn.textContent = "SAVED ✓";
      setTimeout(() => {
        dom.saveApiKeyBtn.textContent = "SAVE KEY";
      }, 1500);
    });

    dom.resetModulesBtn.addEventListener("click", () => {
      modulesState = JSON.parse(JSON.stringify(DEFAULT_MODULES));
      saveModulesState();
      renderAdminToggles();
      renderModulesGrid();
    });

    dom.closeModuleBtn.addEventListener("click", () => {
      dom.moduleViewport.classList.add("hidden");
      dom.moduleMountPoint.innerHTML = "";
    });
  }

  // ------------------------------------------------------------------------
  // 7. LIVE GSP AI CHATBOT (GEMINI API INTEGRATION)
  // ------------------------------------------------------------------------
  function initChatbot() {
    dom.openChatBtn.addEventListener("click", () => {
      dom.aiChatDrawer.classList.remove("collapsed");
      dom.collapseChatBtn.textContent = "Minimize";
      dom.aiChatDrawer.scrollIntoView({ behavior: "smooth", block: "center" });
      dom.chatInput.focus();
    });

    dom.collapseChatBtn.addEventListener("click", () => {
      const isCollapsed = dom.aiChatDrawer.classList.toggle("collapsed");
      dom.collapseChatBtn.textContent = isCollapsed ? "Expand" : "Minimize";
    });

    dom.chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userText = dom.chatInput.value.trim();
      if (!userText) return;

      appendChatMessage("YOU", escapeHtml(userText), true);
      dom.chatInput.value = "";
      dom.sendChatBtn.disabled = true;
      dom.sendChatBtn.textContent = "...";

      const typingId = appendChatMessage("GSP AI", "Analyzing your query... ⚡", false);

      try {
        const reply = await queryGeminiAI(userText);
        updateChatMessage(typingId, formatBotReply(reply));
      } catch (err) {
        console.error("GSP AI Error:", err);
        updateChatMessage(
          typingId,
          "⚠️ Network ya API response mein temporary issue aaya. Thodi der baad try karo ya Owner Panel se API key verify karo."
        );
      } finally {
        dom.sendChatBtn.disabled = false;
        dom.sendChatBtn.textContent = "SEND ➤";
      }
    });
  }

  async function queryGeminiAI(promptText) {
    const apiKey = getApiKey();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const systemInstruction =
      "You are GSP ROLEX AI Assistant, the official esports & Free Fire MAX sensitivity coach for GSP ROLEX. " +
      "Give sharp, accurate, practical gaming, sensitivity (0-200 scale), fire button size, drag timing, and gun recoil advice in Hinglish/Hindi. " +
      "Strictly promote fair play and pure skill only — never recommend hacks, panels, injectors, or cheats. Keep answers concise, energetic, and helpful.";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 450
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "Bhai, is sawal ka jawab abhi generate nahi ho paya — thoda clear pucho!";
  }

  function appendChatMessage(sender, htmlContent, isUser) {
    const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const div = document.createElement("div");
    div.id = id;
    div.className = `msg ${isUser ? "user-msg" : "bot-msg"}`;
    div.innerHTML = `
      <div class="msg-sender">${sender}</div>
      <div class="msg-bubble">${htmlContent}</div>
    `;
    dom.chatMessages.appendChild(div);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
    return id;
  }

  function updateChatMessage(id, htmlContent) {
    const el = document.getElementById(id);
    if (!el) return;
    const bubble = el.querySelector(".msg-bubble");
    if (bubble) bubble.innerHTML = htmlContent;
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatBotReply(text) {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  // ------------------------------------------------------------------------
  // 8. BOOTSTRAP APPLICATION
  // ------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initAdminControls();
    initChatbot();
  });
})();
