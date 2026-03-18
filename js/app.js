(function () {
  "use strict";

  let map;
  let markers = {};
  let pathLine;
  let currentView = null;
  let currentTileLayer = null;

  var DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  var LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  // ── Initialization ──────────────────────────────

  function init() {
    initMap();
    addMarkers();
    addPathLine();
    setupScrollObserver();
    setupScrollProgress();
    setupThemeToggle();
  }

  // ── Leaflet Map ─────────────────────────────────

  function initMap() {
    map = L.map("map", {
      center: [22, 78],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false,
    });

    var savedTheme = localStorage.getItem("georesume-theme") || "dark";
    var tileUrl = savedTheme === "light" ? LIGHT_TILES : DARK_TILES;
    currentTileLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

    map.zoomControl.setPosition("bottomright");
  }

  // ── Markers ─────────────────────────────────────

  function addMarkers() {
    CAREER_DATA.features.forEach(function (f) {
      var p = f.properties;
      var lon = f.geometry.coordinates[0];
      var lat = f.geometry.coordinates[1];
      var isCurrent = p.isCurrent || false;
      var size = isCurrent ? 20 : 16;

      var html =
        '<div class="custom-marker">' +
          '<div class="marker-pulse" style="background:' + p.color + ';"></div>' +
          '<div class="marker-dot' + (isCurrent ? ' current' : '') + '"' +
            ' style="border-color:' + p.color + ';' +
            ' background:' + hexToRGBA(p.color, 0.25) + ';' +
            ' box-shadow: 0 0 10px ' + hexToRGBA(p.color, 0.4) + ';">' +
          '</div>' +
          '<div class="marker-label" id="label-' + p.id + '">' + p.name + '</div>' +
        '</div>';

      var icon = L.divIcon({
        html: html,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      var marker = L.marker([lat, lon], { icon: icon }).addTo(map);
      markers[p.id] = { marker: marker, feature: f };
    });
  }

  // ── Career Path Line ────────────────────────────

  function addPathLine() {
    var sorted = CAREER_DATA.features.slice().sort(function (a, b) {
      return a.properties.order - b.properties.order;
    });

    var latlngs = sorted.map(function (f) {
      return [f.geometry.coordinates[1], f.geometry.coordinates[0]];
    });

    pathLine = L.polyline(latlngs, {
      color: "#00d4ff",
      weight: 2.5,
      opacity: 0.35,
      dashArray: "8, 14",
      lineCap: "round",
    }).addTo(map);

    requestAnimationFrame(function tryAnimate() {
      var el = pathLine.getElement();
      if (!el) { requestAnimationFrame(tryAnimate); return; }
      var offset = 0;
      (function step() {
        offset -= 0.4;
        el.style.strokeDashoffset = offset;
        requestAnimationFrame(step);
      })();
    });
  }

  // ── Scroll-Driven Map (IntersectionObserver) ────

  function setupScrollObserver() {
    var storyPane = document.getElementById("story-pane");
    var sections = document.querySelectorAll(".story-section");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var targetId = entry.target.getAttribute("data-map");

            entry.target.classList.add("section-visible");

            sections.forEach(function (s) { s.classList.remove("section-active"); });
            entry.target.classList.add("section-active");

            flyToView(targetId);

            if (targetId === "skills") {
              animateSkillBars();
            }
          }
        });
      },
      {
        root: storyPane,
        threshold: 0.35,
      }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── Fly To Map View ─────────────────────────────

  function flyToView(viewId) {
    if (viewId === currentView) return;
    currentView = viewId;

    var view = MAP_VIEWS[viewId];
    if (!view) return;

    map.flyTo(view.center, view.zoom, {
      duration: 2,
      easeLinearity: 0.25,
    });

    highlightMarker(viewId);
    updateLabels(view.zoom);
  }

  function highlightMarker(activeId) {
    Object.keys(markers).forEach(function (id) {
      var data = markers[id];
      var el = data.marker.getElement();
      if (!el) return;
      var dot = el.querySelector(".marker-dot");
      if (!dot) return;

      var color = data.feature.properties.color;
      if (id === activeId) {
        dot.style.transform = "scale(1.6)";
        dot.style.boxShadow = "0 0 24px " + hexToRGBA(color, 0.8);
      } else {
        dot.style.transform = "";
        dot.style.boxShadow = "0 0 10px " + hexToRGBA(color, 0.4);
      }
    });
  }

  function updateLabels(zoom) {
    var show = zoom >= 8;
    CAREER_DATA.features.forEach(function (f) {
      var el = document.getElementById("label-" + f.properties.id);
      if (el) {
        if (show) { el.classList.add("visible"); }
        else { el.classList.remove("visible"); }
      }
    });
  }

  // ── Scroll Progress Bar ─────────────────────────

  function setupScrollProgress() {
    var storyPane = document.getElementById("story-pane");
    var fill = document.getElementById("scroll-fill");

    storyPane.addEventListener("scroll", function () {
      var scrollTop = storyPane.scrollTop;
      var scrollHeight = storyPane.scrollHeight - storyPane.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      fill.style.width = pct + "%";
    });
  }

  // ── Skill Bar Animation ─────────────────────────

  var skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    var fills = document.querySelectorAll(".skills-section .skill-fill");
    fills.forEach(function (fill, i) {
      var target = fill.getAttribute("data-width") || "50%";
      fill.style.transitionDelay = (i * 0.07) + "s";
      fill.style.width = target;
    });
  }

  // ── Theme Toggle ────────────────────────────────

  function setupThemeToggle() {
    var toggle = document.getElementById("theme-toggle");
    var icon = document.getElementById("theme-icon");

    var saved = localStorage.getItem("georesume-theme") || "dark";
    applyTheme(saved, false);

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
      localStorage.setItem("georesume-theme", next);
    });

    function applyTheme(theme, swapTiles) {
      document.documentElement.setAttribute("data-theme", theme);
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";

      if (swapTiles && map && currentTileLayer) {
        map.removeLayer(currentTileLayer);
        var url = theme === "light" ? LIGHT_TILES : DARK_TILES;
        currentTileLayer = L.tileLayer(url, { maxZoom: 19 }).addTo(map);
      }
    }
  }

  // ── Utilities ───────────────────────────────────

  function hexToRGBA(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  // ── Start ───────────────────────────────────────

  document.addEventListener("DOMContentLoaded", init);
})();
