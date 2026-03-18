(function () {
  "use strict";

  var messagesEl = document.getElementById("chat-messages");
  var inputEl = document.getElementById("chat-input");
  var sendBtn = document.getElementById("chat-send");
  var toggleBtn = document.getElementById("chat-toggle");
  var toggleIcon = document.getElementById("chat-toggle-icon");
  var closeBtn = document.getElementById("chat-close");
  var panel = document.getElementById("chat-panel");
  var suggestionsEl = document.getElementById("chat-suggestions");
  var isOpen = false;

  // ── Knowledge Base (built from CAREER_DATA + extras) ───

  var profile = {
    name: "Satish Kumar",
    title: "Manager — Enterprise GIS Analytics",
    company: "Jio Platforms Limited",
    location: "Navi Mumbai, Maharashtra",
    phone: "+91 9650069246",
    email: "satss.kr@gmail.com",
    linkedin: "linkedin.com/in/satish-kumar-1a01b3a5",
    experience: "8+",
    summary: "GIS Manager with 8+ years of experience in enterprise geospatial solutions across telecom, smart cities, and defense. Skilled in GIS architecture, real-time data integration, and location intelligence platforms."
  };

  var knowledge = [
    {
      keys: ["current", "now", "present", "today", "jio", "working", "doing now"],
      mapId: "jio",
      answer: "Satish is currently working as <strong>Manager — Enterprise GIS Analytics</strong> at <strong>Jio Platforms Limited</strong> in Navi Mumbai (2023–Present). He leads enterprise GIS platforms handling massive telecom datasets and has improved processing efficiency by ~30%."
    },
    {
      keys: ["jio", "reliance", "telecom", "navi mumbai"],
      mapId: "jio",
      answer: "At <strong>Jio Platforms Limited</strong> (2023–Present), Satish manages enterprise GIS analytics for India's largest telecom. Key work includes real-time data pipeline integration using Apache Spark and NiFi, and architecting scalable GIS solutions."
    },
    {
      keys: ["nascent", "pune", "smart city", "pcmc", "municipal", "business analyst"],
      mapId: "nascent",
      answer: "At <strong>Nascent Info Technologies</strong> (2021–2022) in Pune, Satish worked as a GIS Business Analyst on the Smart City GIS ERP for Pimpri-Chinchwad Municipal Corporation (PCMC), improving municipal service delivery through GIS integration."
    },
    {
      keys: ["sisl", "noida", "specialist", "demos", "pre-sales", "poc"],
      mapId: "sisl",
      answer: "At <strong>SISL Infotech</strong> (2019–2021) in Noida, Satish worked as a GIS Specialist, delivering 20+ client demos and GIS solutions. He designed location-based service solutions and supported pre-sales with technical demonstrations."
    },
    {
      keys: ["education", "study", "studied", "university", "degree", "amity", "college", "qualification", "msc", "m.sc"],
      mapId: "amity",
      answer: "Satish holds an <strong>M.Sc. in GIS & Remote Sensing</strong> from <strong>Amity University</strong>, Noida. He built a foundation in spatial analysis, cartography, and hands-on training with ArcGIS, ERDAS Imagine, and open-source GIS tools."
    },
    {
      keys: ["skill", "skills", "technology", "technologies", "tech stack", "tools", "know", "proficient", "expertise"],
      mapId: "skills",
      answer: "Satish's core skills include:<br>• <strong>ArcGIS Enterprise & Pro</strong> (Expert)<br>• <strong>GIS Architecture & Solution Design</strong><br>• <strong>Web GIS Development</strong><br>• <strong>Location Intelligence / LBS</strong><br>• <strong>Spatial Data Analysis</strong><br>• <strong>SQL / PL-SQL</strong><br>• <strong>Python</strong><br>• <strong>Real-time Pipelines</strong> (Spark, NiFi)<br>• <strong>Azure Cloud</strong>"
    },
    {
      keys: ["arcgis", "esri", "gis software", "arc gis"],
      mapId: "skills",
      answer: "Satish is an expert in <strong>ArcGIS Enterprise & Pro</strong> — his primary GIS platform across all roles. He has used it for enterprise-scale geospatial solutions at Jio, client demos at SISL, and smart city projects at Nascent."
    },
    {
      keys: ["python", "programming", "coding", "code"],
      mapId: "skills",
      answer: "Satish has working proficiency in <strong>Python</strong> for GIS automation and data processing. His primary programming strengths are in <strong>SQL/PL-SQL</strong> for database development."
    },
    {
      keys: ["spark", "nifi", "pipeline", "real-time", "realtime", "streaming", "data pipeline"],
      mapId: "jio",
      answer: "At Jio Platforms, Satish integrated <strong>real-time data pipelines using Apache Spark and NiFi</strong>, improving geospatial data processing efficiency by ~30%. This is part of his work on scalable, future-ready GIS architecture."
    },
    {
      keys: ["azure", "cloud", "devops", "ci/cd", "microsoft"],
      mapId: "certs",
      answer: "Satish is certified in <strong>Azure DevOps CI/CD</strong> and has exposure to Azure cloud services. He applies cloud concepts in building scalable GIS infrastructure at Jio."
    },
    {
      keys: ["certification", "certifications", "certified", "certificate"],
      mapId: "certs",
      answer: "Satish holds these certifications:<br>• <strong>Azure DevOps CI/CD</strong> — Microsoft<br>• <strong>AI Agents (MCP)</strong> — AI & Automation<br>• <strong>PL/SQL Programming</strong> — Database Development<br>• <strong>IBM Intelligent Video Analytics</strong> — IBM"
    },
    {
      keys: ["ai", "artificial intelligence", "mcp", "agent", "automation"],
      mapId: "certs",
      answer: "Satish is certified in <strong>AI Agents (MCP)</strong>, covering AI automation and intelligent agent frameworks. He's actively exploring how AI can enhance geospatial analytics."
    },
    {
      keys: ["contact", "reach", "call", "phone", "email", "connect", "hire", "linkedin"],
      mapId: "contact",
      answer: "You can reach Satish via:<br>📞 <strong>+91 9650069246</strong><br>📧 <strong>satss.kr@gmail.com</strong><br>🔗 <a href='https://linkedin.com/in/satish-kumar-1a01b3a5' target='_blank' class='map-link'>LinkedIn Profile</a><br>📍 Navi Mumbai, India"
    },
    {
      keys: ["experience", "career", "journey", "work history", "background", "resume"],
      mapId: "india",
      answer: "Satish has <strong>8+ years</strong> of GIS experience across 4 organizations:<br>1. <strong>Amity University</strong> — M.Sc. GIS (Education)<br>2. <strong>SISL Infotech</strong> — GIS Specialist (2019–2021)<br>3. <strong>Nascent Info Tech</strong> — GIS Business Analyst (2021–2022)<br>4. <strong>Jio Platforms</strong> — Manager, Enterprise GIS (2023–Present)"
    },
    {
      keys: ["location", "where", "city", "cities", "places", "worked"],
      mapId: "india",
      answer: "Satish has worked across India:<br>• <strong>Noida</strong> — Education (Amity) + SISL Infotech<br>• <strong>Pune</strong> — Nascent Info Technologies (Smart City PCMC)<br>• <strong>Navi Mumbai</strong> — Jio Platforms (Current)"
    },
    {
      keys: ["download", "resume", "pdf", "cv"],
      mapId: "contact",
      answer: "You can download Satish's resume as a PDF: <a href='assets/Satish_Kumar_Resume.pdf' download class='map-link'><i class='fas fa-download'></i> Download Resume PDF</a>"
    },
    {
      keys: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "howdy"],
      mapId: null,
      answer: "Hello! 👋 I'm Satish's GeoResume AI assistant. Ask me anything about his career, skills, education, or experience — and I'll show you on the map!"
    },
    {
      keys: ["thank", "thanks", "bye", "goodbye", "cool", "great", "awesome", "nice"],
      mapId: null,
      answer: "Glad I could help! Feel free to ask more or reach out to Satish directly. Have a great day! 🙌"
    },
    {
      keys: ["who", "about", "tell me about", "introduce", "himself"],
      mapId: "india",
      answer: "<strong>Satish Kumar</strong> is a GIS Manager with 8+ years of experience building enterprise geospatial solutions across telecom, smart cities, and defense. Currently at Jio Platforms as Manager of Enterprise GIS Analytics."
    },
    {
      keys: ["defense", "defence", "military"],
      mapId: "india",
      answer: "Satish has experience in geospatial solutions for the <strong>defense sector</strong>, alongside telecom and smart cities. His GIS architecture and location intelligence skills apply across these domains."
    },
    {
      keys: ["web gis", "webgis", "web mapping", "online map"],
      mapId: "skills",
      answer: "Satish is skilled in <strong>Web GIS Development</strong>, building online mapping applications and location-based services. This GeoResume itself is an example of his web mapping capabilities!"
    },
    {
      keys: ["sql", "pl-sql", "plsql", "database", "db"],
      mapId: "skills",
      answer: "Satish has strong proficiency in <strong>SQL and PL-SQL</strong> for database development and spatial data management. He's also certified in PL/SQL Programming."
    }
  ];

  var suggestions = [
    "What are your skills?",
    "Tell me about Jio",
    "Where did you study?",
    "Smart city experience?",
    "Certifications?",
    "How to contact?"
  ];

  // ── Initialization ──────────────────────────────

  function initChatbot() {
    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", sendMessage);
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    renderSuggestions();
  }

  function toggleChat() {
    isOpen = !isOpen;
    panel.classList.toggle("hidden", !isOpen);
    toggleBtn.classList.toggle("active", isOpen);
    toggleIcon.className = isOpen ? "fas fa-times" : "fas fa-comment-dots";

    if (isOpen && messagesEl.children.length === 0) {
      showWelcome();
    }

    if (isOpen) {
      setTimeout(function () { inputEl.focus(); }, 300);
    }
  }

  function showWelcome() {
    addBotMessage(
      "Hi! 👋 I'm <strong>GeoResume AI</strong>. Ask me anything about Satish's career, skills, or experience — and I'll show it on the map!",
      null
    );
  }

  // ── Suggestions ─────────────────────────────────

  function renderSuggestions() {
    suggestionsEl.innerHTML = "";
    suggestions.forEach(function (text) {
      var btn = document.createElement("button");
      btn.className = "chat-suggestion";
      btn.textContent = text;
      btn.addEventListener("click", function () {
        inputEl.value = text;
        sendMessage();
      });
      suggestionsEl.appendChild(btn);
    });
  }

  function hideSuggestions() {
    suggestionsEl.style.display = "none";
  }

  function showSuggestions() {
    suggestionsEl.style.display = "flex";
  }

  // ── Send & Receive ──────────────────────────────

  function sendMessage() {
    var text = inputEl.value.trim();
    if (!text) return;

    addUserMessage(text);
    inputEl.value = "";
    hideSuggestions();

    showTyping();

    var delay = 400 + Math.random() * 600;
    setTimeout(function () {
      removeTyping();
      var response = findAnswer(text);
      addBotMessage(response.answer, response.mapId);

      setTimeout(showSuggestions, 500);
    }, delay);
  }

  function addUserMessage(text) {
    var div = document.createElement("div");
    div.className = "chat-msg user";
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(html, mapId) {
    var div = document.createElement("div");
    div.className = "chat-msg bot";

    var content = html;

    if (mapId && typeof MAP_VIEWS !== "undefined" && MAP_VIEWS[mapId]) {
      var locationName = getLocationName(mapId);
      content += '<br><span class="map-link" data-map="' + mapId + '">' +
        '<i class="fas fa-location-arrow"></i> Show on map' +
        (locationName ? " (" + locationName + ")" : "") +
        "</span>";
    }

    div.innerHTML = content;

    var mapLink = div.querySelector(".map-link[data-map]");
    if (mapLink) {
      mapLink.addEventListener("click", function () {
        var id = this.getAttribute("data-map");
        flyToMapView(id);
      });
    }

    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    var div = document.createElement("div");
    div.className = "chat-typing";
    div.id = "typing-indicator";
    div.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function removeTyping() {
    var el = document.getElementById("typing-indicator");
    if (el) el.remove();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // ── Answer Engine ───────────────────────────────

  function findAnswer(query) {
    var q = query.toLowerCase().replace(/[?!.,]/g, "");
    var bestMatch = null;
    var bestScore = 0;

    for (var i = 0; i < knowledge.length; i++) {
      var entry = knowledge[i];
      var score = 0;

      for (var j = 0; j < entry.keys.length; j++) {
        var key = entry.keys[j];
        if (q.indexOf(key) !== -1) {
          score += key.length + (key.split(" ").length * 2);
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return { answer: bestMatch.answer, mapId: bestMatch.mapId };
    }

    return {
      answer: "I don't have a specific answer for that, but you can explore Satish's full resume by scrolling through the sections, or try asking about his <strong>skills</strong>, <strong>experience</strong>, <strong>education</strong>, or <strong>certifications</strong>.",
      mapId: null
    };
  }

  // ── Map Integration ─────────────────────────────

  function flyToMapView(viewId) {
    if (typeof MAP_VIEWS === "undefined" || typeof map === "undefined") return;
    var view = MAP_VIEWS[viewId];
    if (!view) return;

    map.flyTo(view.center, view.zoom, {
      duration: 2,
      easeLinearity: 0.25,
    });
  }

  function getLocationName(mapId) {
    var names = {
      india: "India Overview",
      amity: "Noida",
      sisl: "Noida",
      nascent: "Pune",
      jio: "Navi Mumbai",
      skills: "All India",
      certs: "All India",
      contact: "Navi Mumbai"
    };
    return names[mapId] || "";
  }

  // ── Start ───────────────────────────────────────

  document.addEventListener("DOMContentLoaded", initChatbot);
})();
