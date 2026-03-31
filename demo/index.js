(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/client-js/common/demo/resize.js
  var resize_exports = {};
  __export(resize_exports, {
    destroyScale: () => destroyScale,
    initScale: () => initScale
  });
  function destroyScale() {
    clearTimeout(timeout);
  }
  function initScale(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.transition = `transform ${TRANSITION_DURATION}`;
    el.style.transformOrigin = "center top";
    let type;
    if (el.classList.contains("tablet")) type = "tablet";
    else if (el.classList.contains("mobile")) type = "phone";
    else if (el.classList.contains("desktop")) type = "desktop";
    const update = () => {
      if (type === "desktop") {
        el.style.transform = "none";
        return;
      }
      const height = window.innerHeight;
      const viewParams = calcScale(type);
      const {
        minHeight,
        maxHeight,
        minScaleX,
        minScaleY,
        maxScaleX,
        maxScaleY
      } = viewParams;
      const clamped = Math.min(Math.max(height, minHeight), maxHeight);
      const heightRatio = (clamped - minHeight) / (maxHeight - minHeight);
      const scaleX = minScaleX + (maxScaleX - minScaleX) * heightRatio;
      const scaleY = minScaleY + (maxScaleY - minScaleY) * heightRatio;
      el.style.transform = `scale(${scaleX}, ${scaleY})`;
    };
    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(update, THROTTLE_DELAY);
    });
    update();
  }
  var THROTTLE_DELAY, TRANSITION_DURATION, SCALE_DESKTOP, SCALE_TABLET, SCALE_PHONE, SCALE_CONFIG, calcScale, timeout;
  var init_resize = __esm({
    "src/client-js/common/demo/resize.js"() {
      THROTTLE_DELAY = 16;
      TRANSITION_DURATION = "0.1s";
      SCALE_DESKTOP = {
        minHeight: 0,
        maxHeight: Infinity,
        minScaleX: 1,
        minScaleY: 1,
        maxScaleX: 1,
        maxScaleY: 1
      };
      SCALE_TABLET = {
        minHeight: 630,
        maxHeight: 1268,
        minScaleX: 0.462068965517,
        minScaleY: 0.462295081967,
        maxScaleX: 0.962389380531,
        maxScaleY: 0.97
      };
      SCALE_PHONE = {
        minHeight: 630,
        maxHeight: 864,
        minScaleX: 0.53,
        // orig was: 0.6
        minScaleY: 0.53,
        // orig was: 0.6
        maxScaleX: 0.79,
        // orig was: 0.9
        maxScaleY: 0.79
        // orig was: 0.9
      };
      SCALE_CONFIG = {
        desktop: SCALE_DESKTOP,
        tablet: SCALE_TABLET,
        phone: SCALE_PHONE
      };
      calcScale = (type) => SCALE_CONFIG[type] || SCALE_CONFIG.desktop;
    }
  });

  // src/client-js/common/demo/demo-resize.js
  var demo_resize_exports = {};
  function setActiveDevice(device) {
    currentDevice = device;
    desktopBtn.classList.remove("active");
    tabletBtn.classList.remove("active");
    mobileBtn.classList.remove("active");
    iframe.classList.remove("desktop", "tablet", "mobile");
    resIframeContainer.classList.remove("desktop", "tablet", "mobile");
    if (device === "desktop" || device === "tablet" && isTabletDefault) {
      desktopBtn.classList.add("active");
      iframe.classList.add("desktop");
      resIframeContainer.classList.add("desktop");
      destroyScale();
    } else if (device === "tablet") {
      tabletBtn.classList.add("active");
      iframe.classList.add("tablet");
      resIframeContainer.classList.add("tablet");
      destroyScale();
      setTimeout(() => initScale(".demo-iframe-container"));
    } else if (device === "mobile") {
      mobileBtn.classList.add("active");
      iframe.classList.add("mobile");
      resIframeContainer.classList.add("mobile");
      destroyScale();
      setTimeout(() => initScale(".demo-iframe-container"));
    }
  }
  function setDefaultDeviceOnLoad() {
    isTabletDefault = isTablet.matches && isTouchDevice;
    if (isMobile.matches) {
      setActiveDevice("mobile");
    } else if (isTabletDefault) {
      setActiveDevice("desktop");
    } else {
      setActiveDevice("desktop");
    }
  }
  function hideUnsupportedButtons() {
    if (isMobile.matches) {
      desktopBtn.style.display = "none";
      tabletBtn.style.display = "none";
      mobileBtn.style.display = "inline-block";
    } else if (isTablet.matches && isTouchDevice) {
      desktopBtn.style.display = "none";
      tabletBtn.style.display = "inline-block";
      mobileBtn.style.display = "inline-block";
    } else {
      desktopBtn.style.display = "inline-block";
      tabletBtn.style.display = "inline-block";
      mobileBtn.style.display = "inline-block";
    }
  }
  function handleResize() {
    hideUnsupportedButtons();
    isTabletDefault = isTablet.matches && isTouchDevice;
    if (currentDevice === "desktop") {
      return;
    }
    if (currentDevice === "tablet") {
      if (!isMobile.matches) {
        return;
      }
    }
    if (currentDevice === "mobile") {
      return;
    }
    if (isMobile.matches) {
      setActiveDevice("mobile");
    } else if (isTabletDefault) {
      setActiveDevice("desktop");
    } else {
      setActiveDevice("desktop");
    }
  }
  var iframe, resIframeContainer, desktopBtn, tabletBtn, mobileBtn, isTouchDevice, isMobile, isTablet, currentDevice, isTabletDefault;
  var init_demo_resize = __esm({
    "src/client-js/common/demo/demo-resize.js"() {
      init_resize();
      iframe = document.querySelector(".demo-iframe");
      resIframeContainer = document.querySelector(".demo-iframe-container");
      desktopBtn = document.querySelector(".demo-desktop-btn");
      tabletBtn = document.querySelector(".demo-tablet-btn");
      mobileBtn = document.querySelector(".demo-mobile-btn");
      isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      isMobile = window.matchMedia("(max-width: 767px)");
      isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
      currentDevice = "default";
      isTabletDefault = false;
      setDefaultDeviceOnLoad();
      hideUnsupportedButtons();
      window.addEventListener("resize", handleResize);
      desktopBtn.addEventListener("click", () => setActiveDevice("desktop"));
      tabletBtn.addEventListener("click", () => setActiveDevice("tablet"));
      mobileBtn.addEventListener("click", () => setActiveDevice("mobile"));
    }
  });

  // src/client-js/pages/demo/index.js
  document.addEventListener("DOMContentLoaded", () => {
    try {
      Promise.resolve().then(() => init_demo_resize());
      Promise.resolve().then(() => init_resize());
      console.log("DOMContentLoaded, on main page");
    } catch (error) {
      console.error("An error occurred while loading the files on main page", error);
    }
  });
})();
//# sourceMappingURL=index.js.map
