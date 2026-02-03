/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hamburger: function() { return /* binding */ hamburger; }
/* harmony export */ });
function hamburger() {
  var $ = window.jQuery || window.$;
  var $header = $(".siteHeader");
  var $btn = $header.find(".siteHeader__burger");
  var $menu = $header.find(".siteHeader__menu");
  var $backdrop = $header.find(".siteHeader__backdrop");
  var $icon = $btn.find(".siteHeader__burgerIcon");
  if (!$header.length || !$btn.length || !$menu.length || !$icon.length) return;
  var ICON_OPEN = $icon.data("iconOpen"); // x-ham.svg
  var ICON_CLOSE = $icon.data("iconClose"); // chevron.svg

  // preload both icons to avoid flicker
  new Image().src = ICON_OPEN;
  new Image().src = ICON_CLOSE;
  var setIcon = function setIcon(isOpen) {
    $icon.attr("src", isOpen ? ICON_OPEN : ICON_CLOSE);
  };
  var open = function open() {
    $header.addClass("is-open");
    $btn.attr({
      "aria-expanded": "true",
      "aria-label": "メニューを閉じる"
    });
    $("body").addClass("header-open");
    setIcon(true);
  };
  var close = function close() {
    $header.removeClass("is-open");
    $btn.attr({
      "aria-expanded": "false",
      "aria-label": "メニューを開く"
    });
    $("body").removeClass("header-open");
    setIcon(false);
  };

  // init icon based on current state
  setIcon($header.hasClass("is-open") || $btn.attr("aria-expanded") === "true");
  $btn.on("click", function (e) {
    e.preventDefault();
    $header.hasClass("is-open") ? close() : open();
  });
  $backdrop.on("click", close);
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  // close when any menu link is clicked
  $menu.on("click", "a", function () {
    return close();
  });

  // desktop sync
  var DESK = window.matchMedia("(min-width: 1024px)");
  var sync = function sync() {
    if (DESK.matches) close();
  };
  DESK.addEventListener ? DESK.addEventListener("change", sync) : DESK.addListener(sync);
}

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clientsMarquee: function() { return /* binding */ clientsMarquee; }
/* harmony export */ });
var clientsMarquee = function clientsMarquee() {
  //
};

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   casesVideoPopup: function() { return /* binding */ casesVideoPopup; }
/* harmony export */ });
function casesVideoPopup() {
  var $ = window.jQuery;
  if (!$) {
    console.warn("jQuery not found");
    return;
  }
  var $modal = $("#videoModal");
  if (!$modal.length) return;
  var $iframe = $modal.find("iframe");
  var getYouTubeId = function getYouTubeId(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  };
  var openModal = function openModal(url) {
    var id = getYouTubeId(url);
    if (!id) return;
    $iframe.attr("src", "https://www.youtube.com/embed/".concat(id, "?autoplay=1&rel=0"));
    $("body").addClass("modal-open");
    $modal.addClass("is-open").attr("aria-hidden", "false");
  };
  var closeModal = function closeModal() {
    $iframe.attr("src", "");
    $("body").removeClass("modal-open");
    $modal.removeClass("is-open").attr("aria-hidden", "true");
  };

  // open
  $(document).on("click", ".js-video", function (e) {
    e.preventDefault();
    var url = $(this).data("video") || $(this).attr("href");
    openModal(url);
  });

  // close
  $modal.on("click", ".videoModal__backdrop, .videoModal__close", closeModal);
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
}

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   faqAccordion: function() { return /* binding */ faqAccordion; }
/* harmony export */ });
// modules/_faqAccordion.js
function faqAccordion() {
  var items = Array.from(document.querySelectorAll(".secFaq__item"));
  if (!items.length) return;
  var close = function close(item) {
    var panel = item.querySelector(".secFaq__a");
    var btn = item.querySelector(".secFaq__q");
    if (!panel || !btn) return;

    // set current height, then to 0 for smooth collapse
    panel.style.height = panel.scrollHeight + "px";
    requestAnimationFrame(function () {
      panel.style.height = "0px";
    });
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    item.classList.remove("is-open");
  };
  var open = function open(item) {
    var panel = item.querySelector(".secFaq__a");
    var btn = item.querySelector(".secFaq__q");
    if (!panel || !btn) return;

    // from 0 to content height
    panel.style.height = panel.scrollHeight + "px";
    var _onEnd = function onEnd(e) {
      if (e.target !== panel) return;
      panel.removeEventListener("transitionend", _onEnd);
      panel.style.height = "auto"; // allow responsive height after animation
    };
    panel.addEventListener("transitionend", _onEnd);
    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    item.classList.add("is-open");
  };
  items.forEach(function (item) {
    var btn = item.querySelector(".secFaq__q");
    var panel = item.querySelector(".secFaq__a");
    if (!btn || !panel) return;

    // initial state
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    panel.style.height = "0px";
    btn.addEventListener("click", function () {
      var openNow = item.classList.contains("is-open");

      // (Optional) close others so only one is open:
      // items.filter(i => i !== item && i.classList.contains("is-open")).forEach(close);

      if (openNow) close(item);else {
        // measure from 0 again if it was auto
        panel.style.height = "0px";
        requestAnimationFrame(function () {
          return open(item);
        });
      }
    });
  });
}

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capabilitiesAccordion: function() { return /* binding */ capabilitiesAccordion; }
/* harmony export */ });
// capabilitiesAccordion.js — scoped to accordion list only
var capabilitiesAccordion = function capabilitiesAccordion() {
  var _document$fonts;
  var $ = window.jQuery || window.$;
  if (!$) return;
  var $root = $(".secCapabilities__cards--accordion"); // << only accordion
  if (!$root.length) return;
  var $cards = $root.find(".secCapabilities__card");
  var measure = function measure(el) {
    var prevDisplay = el.style.display;
    if (getComputedStyle(el).display === "none") el.style.display = "grid";
    el.style.maxHeight = "none";
    var h = el.scrollHeight;
    el.style.maxHeight = "";
    el.style.display = prevDisplay || "";
    return h;
  };
  var showBody = function showBody($body) {
    var el = $body[0];
    el.style.display = "grid";
    el.style.opacity = "0";
    el.style.maxHeight = "0px";
    void el.offsetHeight;
    el.style.maxHeight = measure(el) + "px";
    el.style.opacity = "1";
  };
  var hideBody = function hideBody($body) {
    var el = $body[0];
    el.style.maxHeight = "0px";
    el.style.opacity = "0";
    var _onEnd = function onEnd(e) {
      if (e.propertyName !== "max-height") return;
      el.style.display = "none";
      el.removeEventListener("transitionend", _onEnd);
    };
    el.addEventListener("transitionend", _onEnd);
  };
  var openCard = function openCard($card) {
    var $body = $card.find(".secCapabilities__cardBody");
    $card.addClass("is-open");
    $card.find(".secCapabilities__toggle").attr("aria-expanded", "true");
    showBody($body);
  };
  var closeCard = function closeCard($card) {
    var $body = $card.find(".secCapabilities__cardBody");
    $card.removeClass("is-open");
    $card.find(".secCapabilities__toggle").attr("aria-expanded", "false");
    hideBody($body);
  };
  var collapseAll = function collapseAll() {
    $cards.each(function () {
      closeCard($(this));
    });
  };
  $root.on("click", ".secCapabilities__toggle", function (e) {
    e.preventDefault();
    var $card = $(this).closest(".secCapabilities__card");
    var isOpen = $card.hasClass("is-open");
    collapseAll();
    if (!isOpen) openCard($card);
  });

  // re-measure open ones on resize/orientation
  var rAF = 0;
  var onResize = function onResize() {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(function () {
      $cards.filter(".is-open").each(function () {
        var el = $(this).find(".secCapabilities__cardBody")[0];
        el.style.maxHeight = "none";
        el.style.maxHeight = el.scrollHeight + "px";
      });
    });
  };
  $(window).on("resize orientationchange", onResize);

  // ensure correct after images & fonts
  var imgs = Array.from($root.find("img")).map(function (img) {
    if (img.complete) return Promise.resolve();
    if (img.decode) return img.decode().catch(function () {});
    return new Promise(function (res) {
      img.addEventListener("load", res, {
        once: true
      });
      img.addEventListener("error", res, {
        once: true
      });
    });
  });
  Promise.all(imgs).then(onResize);
  if ((_document$fonts = document.fonts) !== null && _document$fonts !== void 0 && _document$fonts.ready) document.fonts.ready.then(onResize);
};

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   casesSlider: function() { return /* binding */ casesSlider; }
/* harmony export */ });
// casesSlider.js
var casesSlider = function casesSlider() {
  var $ = window.jQuery || window.$;
  if (!$) return;
  var DESK_MQ = window.matchMedia("(min-width: 1440px)");
  var $wrap = $(".secCases__cards");
  if (!$wrap.length) return;
  var ensureTrack = function ensureTrack(wrapEl) {
    if (wrapEl.querySelector(".secCases__track")) return wrapEl.querySelector(".secCases__track");
    var track = document.createElement("div");
    track.className = "secCases__track";
    var children = Array.from(wrapEl.children);
    children.forEach(function (c) {
      return track.appendChild(c);
    });
    wrapEl.appendChild(track);
    return track;
  };
  var s = {
    track: null,
    x: 0,
    vx: 0,
    dragging: false,
    startX: 0,
    dragStartX: 0,
    minX: 0,
    maxX: 0,
    vw: 0,
    cardW: 0,
    gap: 0,
    count: 0,
    raf: 0
  };
  var measure = function measure() {
    if (!s.track) return;
    var cards = s.track.querySelectorAll(".secCases__card");
    if (!cards.length) return;
    var r1 = cards[0].getBoundingClientRect();
    var gap = 14;
    if (cards[1]) {
      var r2 = cards[1].getBoundingClientRect();
      gap = Math.round(r2.left - r1.right);
    }
    s.gap = gap;
    s.cardW = Math.round(r1.width);
    s.count = cards.length;
    s.vw = s.track.parentElement.clientWidth;
    var trackW = s.count * s.cardW + (s.count - 1) * s.gap;
    var extra = Math.max(0, trackW - s.vw);
    s.minX = -extra;
    s.maxX = 0;
    s.x = Math.max(s.minX, Math.min(s.maxX, s.x));
    apply();
  };
  var apply = function apply() {
    s.track.style.transform = "translate3d(".concat(s.x, "px,0,0)");
  };
  var _loop = function loop() {
    s.x += s.vx;
    s.vx *= 0.92;
    if (s.x < s.minX) {
      s.x += (s.minX - s.x) * 0.12;
      s.vx = 0;
    }
    if (s.x > s.maxX) {
      s.x += (s.maxX - s.x) * 0.12;
      s.vx = 0;
    }
    apply();
    s.raf = requestAnimationFrame(_loop);
  };
  var snap = function snap() {
    var center = -s.x + s.vw / 2;
    var span = s.cardW + s.gap;
    var idx = Math.round((center - s.cardW / 2) / span);
    idx = Math.max(0, Math.min(s.count - 1, idx));
    var targetCenter = idx * span + s.cardW / 2;
    var targetX = -(targetCenter - s.vw / 2);
    var clamped = Math.max(s.minX, Math.min(s.maxX, targetX));
    s.vx += (clamped - s.x) * 0.15;
  };
  var enable = function enable() {
    var el = $wrap[0];
    s.track = ensureTrack(el);
    measure();
    cancelAnimationFrame(s.raf);
    s.raf = requestAnimationFrame(_loop);
    var down = function down(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.track.setPointerCapture(e.pointerId);
      s.dragging = true;
      s.startX = e.clientX;
      s.dragStartX = s.x;
      s.vx = 0;
      s.track.classList.add("is-dragging");
    };
    var move = function move(e) {
      if (!s.dragging) return;
      var dx = e.clientX - s.startX;
      s.x = s.dragStartX + dx;
      if (s.x < s.minX) s.x = (s.x + s.minX) / 2;
      if (s.x > s.maxX) s.x = (s.x + s.maxX) / 2;
      s.vx = dx * 0.4;
      apply();
    };
    var up = function up(e) {
      if (!s.dragging) return;
      s.dragging = false;
      s.track.releasePointerCapture(e.pointerId);
      s.track.classList.remove("is-dragging");
      snap();
    };
    s.track.addEventListener("pointerdown", down);
    s.track.addEventListener("pointermove", move);
    s.track.addEventListener("pointerup", up);
    s.track.addEventListener("pointercancel", up);
    var onResize = function onResize() {
      return measure();
    };
    window.addEventListener("resize", onResize);
    $wrap.data("cases-clean", function () {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(s.raf);
      s.track.style.transform = "";
      s.track.removeEventListener("pointerdown", down);
      s.track.removeEventListener("pointermove", move);
      s.track.removeEventListener("pointerup", up);
      s.track.removeEventListener("pointercancel", up);
    });
  };
  var disable = function disable() {
    var clean = $wrap.data("cases-clean");
    if (clean) clean();
  };
  var applyMode = function applyMode() {
    if (DESK_MQ.matches) {
      disable();
      var track = ensureTrack($wrap[0]);
      track.style.transform = "none";
    } else {
      enable();
    }
  };
  applyMode();
  var onChange = function onChange() {
    return applyMode();
  };
  DESK_MQ.addEventListener ? DESK_MQ.addEventListener("change", onChange) : DESK_MQ.addListener(onChange);
};

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   footerMobileReflow: function() { return /* binding */ footerMobileReflow; }
/* harmony export */ });
function footerMobileReflow() {
  var $ = window.jQuery || window.$;
  if (!$) return;
  var DESK_MQ = window.matchMedia("(min-width: 1024px)");
  var $top = $(".siteFooter__top");
  if (!$top.length) return;
  var $left = $top.find(".siteFooter__left").first();
  var $right = $top.find(".siteFooter__right").first();
  var $brand = $top.find(".siteFooter__brand").first();
  var $company = $top.find(".siteFooter__company").first();
  var $linkCols = $top.find(".siteFooter__linkCols").first();
  var $cta = $top.find(".siteFooter__ctaGroup").first();

  // Mobile order: brand → linkCols → cta → company
  var blocks = [$brand[0], $linkCols[0], $cta[0], $company[0]].filter(Boolean);

  // Save original positions to restore on desktop
  var anchors = blocks.map(function (el) {
    return {
      el: el,
      parent: (el === null || el === void 0 ? void 0 : el.parentNode) || null,
      next: (el === null || el === void 0 ? void 0 : el.nextSibling) || null
    };
  });

  // Save original display of wrappers so we can restore later
  var leftDisplay = $left.length ? $left.css("display") : null;
  var rightDisplay = $right.length ? $right.css("display") : null;
  var collapseWrappers = function collapseWrappers() {
    // remove the blank space created by now-empty wrappers
    if ($left.length) $left.css("display", "none");
    if ($right.length) $right.css("display", "none");
    $top.addClass("is-mobileStack");
  };
  var uncollapseWrappers = function uncollapseWrappers() {
    if ($left.length && leftDisplay != null) $left.css("display", leftDisplay);
    if ($right.length && rightDisplay != null) $right.css("display", rightDisplay);
    $top.removeClass("is-mobileStack");
  };
  var mobileOrder = function mobileOrder() {
    var frag = document.createDocumentFragment();
    blocks.forEach(function (el) {
      return el && frag.appendChild(el);
    });
    $top[0].appendChild(frag);
    collapseWrappers();
  };
  var restoreDesktop = function restoreDesktop() {
    anchors.forEach(function (_ref) {
      var el = _ref.el,
        parent = _ref.parent,
        next = _ref.next;
      if (!el || !parent) return;
      if (next && next.parentNode === parent) parent.insertBefore(el, next);else parent.appendChild(el);
    });
    uncollapseWrappers();
  };
  var apply = function apply() {
    return DESK_MQ.matches ? restoreDesktop() : mobileOrder();
  };
  apply();
  DESK_MQ.addEventListener ? DESK_MQ.addEventListener("change", apply) : DESK_MQ.addListener(apply);
}

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initMemberSlider; },
/* harmony export */   initMemberDragScroll: function() { return /* binding */ initMemberDragScroll; },
/* harmony export */   initMemberSliderNow: function() { return /* binding */ initMemberSliderNow; }
/* harmony export */ });
// Non-looping member slider (no cloning, no wrap)
function initMemberSlider() {
  var viewports = document.querySelectorAll(".secMember__viewport");
  viewports.forEach(function (vp) {
    // prevent double-initialization
    if (vp.dataset.memberSliderInit === "1") return;
    vp.dataset.memberSliderInit = "1";
    var track = vp.querySelector(".secMember__track");
    if (!track) return;
    var rafId = null;
    var speed = 0.35; // px per frame
    var dir = 1; // 1 -> right, -1 -> left
    var paused = false;
    var dragging = false;
    var maxScroll = function maxScroll() {
      return Math.max(0, track.scrollWidth - vp.clientWidth);
    };
    var _tick = function tick() {
      var limit = maxScroll();
      if (!paused && !dragging && limit > 0) {
        vp.scrollLeft += speed * dir;

        // clamp and bounce
        if (vp.scrollLeft <= 0) {
          vp.scrollLeft = 0;
          dir = 1;
        } else if (vp.scrollLeft >= limit) {
          vp.scrollLeft = limit;
          dir = -1;
        }
      }
      rafId = requestAnimationFrame(_tick);
    };
    var pause = function pause() {
      return paused = true;
    };
    var resume = function resume() {
      return paused = false;
    };

    // drag-to-scroll
    var down = false;
    var startX = 0;
    var startLeft = 0;
    var onDown = function onDown(e) {
      down = true;
      dragging = true;
      track.classList.add("is-dragging");
      pause();
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startLeft = vp.scrollLeft;
    };
    var onMove = function onMove(e) {
      var _e$preventDefault;
      if (!down) return;
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      var delta = x - startX;
      var limit = maxScroll();
      vp.scrollLeft = Math.min(Math.max(startLeft - delta, 0), limit);
      (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
    };
    var onUp = function onUp() {
      if (!down) return;
      down = false;
      dragging = false;
      track.classList.remove("is-dragging");
      // small delay so it doesn't feel jumpy
      setTimeout(function () {
        if (!dragging) resume();
      }, 200);
    };

    // listeners
    track.addEventListener("mousedown", onDown);
    track.addEventListener("touchstart", onDown, {
      passive: true
    });
    window.addEventListener("mousemove", onMove, {
      passive: false
    });
    window.addEventListener("touchmove", onMove, {
      passive: false
    });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    vp.addEventListener("mouseenter", pause);
    vp.addEventListener("mouseleave", function () {
      if (!dragging) resume();
    });
    vp.addEventListener("focusin", pause);
    vp.addEventListener("focusout", function () {
      if (!dragging) resume();
    });
    var onResize = function onResize() {
      // keep scroll in range after layout changes
      vp.scrollLeft = Math.min(vp.scrollLeft, maxScroll());
    };
    window.addEventListener("resize", onResize);

    // start
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(_tick);
  });
}
function initMemberSliderNow() {
  initMemberSlider();
}
function initMemberDragScroll() {
  initMemberSlider();
}
if (typeof window !== "undefined") {
  window.initMemberSlider = initMemberSlider;
  window.initMemberDragScroll = initMemberSlider;
}

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contactSelect: function() { return /* binding */ contactSelect; }
/* harmony export */ });
// modules/_contactSelect.js
function contactSelect() {
  var wraps = Array.from(document.querySelectorAll(".js-select"));
  if (!wraps.length) return;
  wraps.forEach(function (wrap, i) {
    if (wrap.dataset.selectInited === "1") return;
    wrap.dataset.selectInited = "1";
    var native = wrap.querySelector(".form__select");
    var trigger = wrap.querySelector(".selectFake__trigger");
    var label = wrap.querySelector(".selectFake__label");
    var list = wrap.querySelector(".selectFake__list");
    if (!native || !trigger || !label || !list) return;

    // Build list from <option>s
    list.innerHTML = "";
    var opts = Array.from(native.querySelectorAll("option"));
    opts.forEach(function (opt, idx) {
      var li = document.createElement("li");
      li.className = "selectFake__item";
      li.setAttribute("role", "option");
      li.dataset.idx = String(idx);
      li.dataset.value = opt.value;
      li.innerHTML = "\n        <span class=\"selectFake__check\" aria-hidden=\"true\"></span>\n        <span class=\"selectFake__text\"></span>\n      ";
      li.querySelector(".selectFake__text").textContent = opt.textContent || "";
      if (opt.selected) li.classList.add("is-selected");
      list.appendChild(li);
    });

    // Helpers
    var items = function items() {
      return Array.from(list.querySelectorAll(".selectFake__item"));
    };
    var isOpen = function isOpen() {
      return wrap.classList.contains("is-open");
    };
    var open = function open() {
      var _ref;
      closeAllExcept(wrap);
      wrap.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      var sel = list.querySelector(".is-selected");
      (_ref = sel || items()[0]) === null || _ref === void 0 || _ref.scrollIntoView({
        block: "nearest"
      });
    };
    var close = function close() {
      wrap.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    var closeAllExcept = function closeAllExcept(keep) {
      document.querySelectorAll(".js-select.is-open").forEach(function (w) {
        if (w !== keep) {
          w.classList.remove("is-open");
          var btn = w.querySelector(".selectFake__trigger");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
    };
    var setSelected = function setSelected(idx) {
      var _opts$idx;
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      items().forEach(function (el) {
        return el.classList.remove("is-selected");
      });
      var li = list.querySelector("[data-idx=\"".concat(idx, "\"]"));
      if (li) li.classList.add("is-selected");
      native.selectedIndex = idx;
      label.textContent = ((_opts$idx = opts[idx]) === null || _opts$idx === void 0 ? void 0 : _opts$idx.textContent) || "";
      if (emit) native.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    };

    // Init label
    var initIdx = Math.max(0, native.selectedIndex || 0);
    if (opts[initIdx]) label.textContent = opts[initIdx].textContent || "";

    // Toggle
    trigger.addEventListener("click", function () {
      isOpen() ? close() : open();
    });

    // Click item
    list.addEventListener("click", function (e) {
      var li = e.target.closest(".selectFake__item");
      if (!li) return;
      var idx = parseInt(li.dataset.idx || "0", 10);
      setSelected(idx);
      close();
      trigger.focus();
    });

    // Outside click (namespaced by instance index)
    var onDocClick = function onDocClick(e) {
      if (!wrap.contains(e.target)) close();
    };
    document.addEventListener("click", onDocClick);

    // Keyboard
    wrap.addEventListener("keydown", function (e) {
      var _list$querySelector;
      var openNow = isOpen();
      if (!openNow && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === " ")) {
        e.preventDefault();
        open();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        trigger.focus();
        return;
      }
      if (!openNow) return;
      var current = parseInt(((_list$querySelector = list.querySelector(".is-selected")) === null || _list$querySelector === void 0 ? void 0 : _list$querySelector.dataset.idx) || "", 10) || native.selectedIndex || 0;
      var max = opts.length - 1;
      if (e.key === "ArrowDown") {
        var _list$querySelector2;
        e.preventDefault();
        var next = Math.min(max, current + 1);
        setSelected(next, false);
        (_list$querySelector2 = list.querySelector("[data-idx=\"".concat(next, "\"]"))) === null || _list$querySelector2 === void 0 || _list$querySelector2.scrollIntoView({
          block: "nearest"
        });
      } else if (e.key === "ArrowUp") {
        var _list$querySelector3;
        e.preventDefault();
        var prev = Math.max(0, current - 1);
        setSelected(prev, false);
        (_list$querySelector3 = list.querySelector("[data-idx=\"".concat(prev, "\"]"))) === null || _list$querySelector3 === void 0 || _list$querySelector3.scrollIntoView({
          block: "nearest"
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        close();
        trigger.focus();
        native.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
    });

    // Sync if native value changes programmatically
    native.addEventListener("change", function () {
      var _list$querySelector4, _opts$idx2;
      var idx = native.selectedIndex;
      // avoid recursion: update label/items but don't emit again
      items().forEach(function (el) {
        return el.classList.remove("is-selected");
      });
      (_list$querySelector4 = list.querySelector("[data-idx=\"".concat(idx, "\"]"))) === null || _list$querySelector4 === void 0 || _list$querySelector4.classList.add("is-selected");
      label.textContent = ((_opts$idx2 = opts[idx]) === null || _opts$idx2 === void 0 ? void 0 : _opts$idx2.textContent) || "";
    });

    // Cleanup if needed (example if you ever re-render the node)
    wrap.addEventListener("secSelect:destroy", function () {
      document.removeEventListener("click", onDocClick);
      wrap.removeAttribute("data-select-inited");
    });
  });
}

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   casePagination: function() { return /* binding */ casePagination; },
/* harmony export */   loadCasePageAjax: function() { return /* binding */ loadCasePageAjax; }
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DUR_OUT = 180;
var DUR_IN = 220;
var busy = false;
var fadeSwap = function fadeSwap($el, newHtml) {
  return new Promise(function (resolve) {
    if (!$el || !$el.length) return resolve(); // nothing to swap
    var h = $el.outerHeight();
    $el.css({
      height: h,
      overflow: "hidden"
    });
    $el.stop(true).animate({
      opacity: 0
    }, DUR_OUT, function () {
      $el.html(newHtml);
      $el.stop(true).animate({
        opacity: 1
      }, DUR_IN, function () {
        $el.css({
          height: "",
          overflow: ""
        });
        resolve();
      });
    });
  });
};
var loadCasePageAjax = function loadCasePageAjax() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (busy) return;
  busy = true;
  var $cards = jQuery(".secCase__cards");
  var $pager = jQuery(".js-colPager");
  var root = document.querySelector(".secCase__main");
  if (!root) {
    busy = false;
    return;
  }
  var per = parseInt(root.dataset.perPage || root.getAttribute("data-per-page"), 10) || 5; // default = 5
  var cpt = root.dataset.cpt || "case";
  jQuery.ajax({
    url: MyThemeAjax.ajaxurl,
    type: "POST",
    data: {
      action: "load_case_page",
      nonce: MyThemeAjax.case_nonce,
      page: page,
      per_page: per,
      cpt: cpt
    },
    success: function () {
      var _success = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(res) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(res && res.success)) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return fadeSwap($cards, res.data.cards);
            case 1:
              _context.n = 2;
              return fadeSwap($pager, res.data.pagination);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      function success(_x) {
        return _success.apply(this, arguments);
      }
      return success;
    }(),
    complete: function complete() {
      busy = false;
    },
    error: function error(err) {
      console.error("AJAX error (case):", err);
      busy = false;
    }
  });
};
var casePagination = function casePagination() {
  jQuery(document).on("click", ".js-colPager a", function (e) {
    e.preventDefault();
    if (busy) return;
    var href = jQuery(this).attr("href") || "";
    var url = new URL(href, window.location.origin);
    var page = url.searchParams.get("paged");
    if (!page) {
      var m = href.match(/\/page\/(\d+)/);
      page = m ? m[1] : "1";
    }
    loadCasePageAjax(parseInt(page, 10));
  });
};

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contactMobileOrder: function() { return /* binding */ contactMobileOrder; }
/* harmony export */ });
var contactMobileOrder = function contactMobileOrder() {
  var $ = window.jQuery || window.$;
  if (!$) return;
  var BP = 767;
  var ORDER = [".secContact__lead", ".secContact__trusted", ".secContact__formWrap", ".secContact__hero"];
  var $sec = $(".secContact");
  if (!$sec.length) return;
  var $inner = $sec.find(".secContact__inner").first();
  if (!$inner.length) return;

  // Ensure anchors exist so we can restore original positions precisely
  var ensureAnchors = function ensureAnchors() {
    ORDER.forEach(function (sel) {
      var $el = $inner.find(sel).first();
      if (!$el.length) return;

      // Skip if already anchored
      if ($el.data("anchorNode")) return;
      var anchor = document.createComment("anchor:".concat(sel));
      $el[0].parentNode.insertBefore(anchor, $el[0]); // anchor BEFORE element
      $el.data("anchorNode", anchor);
    });
  };
  var toMobileOrder = function toMobileOrder() {
    ensureAnchors();
    ORDER.forEach(function (sel) {
      var $el = $inner.find(sel).first();
      if ($el.length) $inner.append($el);
    });
    $sec.addClass("is-mobile-ordered");
  };
  var restoreDesktop = function restoreDesktop() {
    ORDER.forEach(function (sel) {
      var $el = $inner.find(sel).first();
      if (!$el.length) return;
      var anchor = $el.data("anchorNode");
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore($el[0], anchor.nextSibling);
      }
    });
    $sec.removeClass("is-mobile-ordered");
  };
  var apply = function apply() {
    if (window.innerWidth <= BP) {
      toMobileOrder();
    } else {
      restoreDesktop();
    }
  };

  // Initial apply (after fonts/images if needed)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  // Resize/orientation with rAF debounce (like your style)
  var rAF = 0;
  var onResize = function onResize() {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(apply);
  };
  $(window).on("resize orientationchange", onResize);
};

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   caseCategoryFilter: function() { return /* binding */ caseCategoryFilter; }
/* harmony export */ });
// caseFilter.js
function caseCategoryFilter() {
  var $ = window.jQuery;
  if (!$) {
    console.warn("jQuery not found");
    return;
  }
  var $root = $(".secCase");
  if (!$root.length) return;
  var $wrap = $root.find("#caseCards");
  var $btns = $root.find(".secCase__filterBtn");
  var $cards = $wrap.find(".secCase__card");
  if (!$btns.length || !$cards.length) return;

  // fallback tag for items without category
  $cards.each(function () {
    var $c = $(this);
    var cats = ($c.data("cats") || "").toString().trim();
    if (!cats) $c.attr("data-cats", "uncategorized");
  });
  var DURATION = 260; // keep in sync with CSS

  var showCard = function showCard($card) {
    $card.css("display", ""); // back to flow
    // force reflow so the transition plays
    // eslint-disable-next-line no-unused-expressions
    $card[0].offsetWidth;
    $card.removeClass("is-hidden").attr("aria-hidden", "false");
  };
  var hideCard = function hideCard($card) {
    $card.addClass("is-hidden").attr("aria-hidden", "true");
    setTimeout(function () {
      return $card.css("display", "none");
    }, DURATION);
  };
  var applyFilter = function applyFilter() {
    var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";
    slug = String(slug).toLowerCase();
    $wrap.addClass("is-busy");
    $cards.each(function () {
      var $c = $(this);
      var tokens = String($c.data("cats") || "").toLowerCase().split(/\s+/).filter(Boolean);
      var match = slug === "all" ? true : tokens.includes(slug);
      match ? showCard($c) : hideCard($c);
    });
    setTimeout(function () {
      return $wrap.removeClass("is-busy");
    }, DURATION);
  };

  // click -> filter
  $root.on("click", ".secCase__filterBtn", function () {
    var $b = $(this);
    $btns.removeClass("is-active").attr("aria-pressed", "false");
    $b.addClass("is-active").attr("aria-pressed", "true");
    var slug = $b.data("filter") || "all";
    applyFilter(slug);

    // optional: update hash for shareable state
    try {
      history.replaceState(null, "", slug === "all" ? location.pathname : "".concat(location.pathname, "#cat=").concat(encodeURIComponent(slug)));
    } catch (e) {}
  });

  // deep link support: /case#cat=press
  var m = location.hash.match(/cat=([^&]+)/i);
  if (m) {
    var slug = decodeURIComponent(m[1]);
    var $target = $btns.filter("[data-filter=\"".concat(slug, "\"]")).first();
    $target.length ? $target.trigger("click") : applyFilter("all");
  } else {
    // initial state from the active button
    applyFilter($btns.filter(".is-active").data("filter") || "all");
  }
}

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newsCategoryFilter: function() { return /* binding */ newsCategoryFilter; }
/* harmony export */ });
// newsFilter.js
function newsCategoryFilter() {
  var $ = window.jQuery;
  if (!$) {
    console.warn("jQuery not found");
    return;
  }
  var $root = $(".secNews");
  if (!$root.length) return;
  var $wrap = $root.find("#newsCards");
  var $btns = $root.find(".secNews__filterBtn");
  var $cards = $wrap.find(".secNews__card");
  if (!$btns.length || !$cards.length) return;

  // 1) Make sure every card has a data-cats attr
  $cards.each(function () {
    var $c = $(this);
    var raw = String($c.attr("data-cats") || "").trim();
    if (!raw) {
      // write attr AND jQuery cache to be extra-safe
      $c.attr("data-cats", "uncategorized").data("cats", "uncategorized");
    }
  });
  var DURATION = 260; // keep in sync with CSS

  var showCard = function showCard($card) {
    $card.css("display", ""); // back to flow
    // force reflow so the transition plays
    // eslint-disable-next-line no-unused-expressions
    $card[0].offsetWidth;
    $card.removeClass("is-hidden").attr("aria-hidden", "false");
  };
  var hideCard = function hideCard($card) {
    $card.addClass("is-hidden").attr("aria-hidden", "true");
    setTimeout(function () {
      return $card.css("display", "none");
    }, DURATION);
  };

  // 2) Always read from the RAW ATTRIBUTE (not .data()) to avoid cache issues
  var getCardTokens = function getCardTokens($card) {
    return String($card.attr("data-cats") || "").toLowerCase().split(/\s+/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
  };
  var applyFilter = function applyFilter() {
    var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";
    slug = String(slug).toLowerCase();
    $wrap.addClass("is-busy");
    $cards.each(function () {
      var $c = $(this);
      var tokens = getCardTokens($c);
      var match = slug === "all" ? true : tokens.includes(slug);
      match ? showCard($c) : hideCard($c);
    });
    setTimeout(function () {
      return $wrap.removeClass("is-busy");
    }, DURATION);
  };

  // click -> filter
  $root.on("click", ".secNews__filterBtn", function () {
    var $b = $(this);
    $btns.removeClass("is-active").attr("aria-pressed", "false");
    $b.addClass("is-active").attr("aria-pressed", "true");
    var slug = ($b.data("filter") || "all").toString().toLowerCase();
    applyFilter(slug);

    // optional: update hash for shareable state
    try {
      history.replaceState(null, "", slug === "all" ? location.pathname : "".concat(location.pathname, "#cat=").concat(encodeURIComponent(slug)));
    } catch (e) {}
  });

  // deep link support: /news#cat=press
  var m = location.hash.match(/cat=([^&]+)/i);
  if (m) {
    var slug = decodeURIComponent(m[1]).toLowerCase();
    var $target = $btns.filter("[data-filter=\"".concat(slug, "\"]")).first();
    $target.length ? $target.trigger("click") : applyFilter("all");
  } else {
    // initial state from the active button
    var initial = ($btns.filter(".is-active").data("filter") || "all").toString().toLowerCase();
    applyFilter(initial);
  }
}

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadNewsPageAjax: function() { return /* binding */ loadNewsPageAjax; },
/* harmony export */   newsPagination: function() { return /* binding */ newsPagination; }
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DUR_OUT = 180;
var DUR_IN = 220;
var busy = false;
var fadeSwap = function fadeSwap($el, newHtml) {
  return new Promise(function (resolve) {
    if (!$el || !$el.length) return resolve(); // nothing to swap
    var h = $el.outerHeight();
    $el.css({
      height: h,
      overflow: "hidden"
    });
    $el.stop(true).animate({
      opacity: 0
    }, DUR_OUT, function () {
      $el.html(newHtml);
      $el.stop(true).animate({
        opacity: 1
      }, DUR_IN, function () {
        $el.css({
          height: "",
          overflow: ""
        });
        resolve();
      });
    });
  });
};
var loadNewsPageAjax = function loadNewsPageAjax() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (busy) return;
  busy = true;
  var $cards = jQuery(".secNews__cards");
  var $pager = jQuery(".js-colPager");
  var root = document.querySelector(".secNews__main");
  if (!root) {
    busy = false;
    return;
  }
  var per = parseInt(root.dataset.perPage || root.getAttribute("data-per-page"), 10) || 5; // default = 5
  var cpt = root.dataset.cpt || "news";
  jQuery.ajax({
    url: MyThemeAjax.ajaxurl,
    type: "POST",
    data: {
      action: "load_news_page",
      nonce: MyThemeAjax.news_nonce,
      page: page,
      per_page: per,
      cpt: cpt
    },
    success: function () {
      var _success = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(res) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(res && res.success)) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return fadeSwap($cards, res.data.cards);
            case 1:
              _context.n = 2;
              return fadeSwap($pager, res.data.pagination);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      function success(_x) {
        return _success.apply(this, arguments);
      }
      return success;
    }(),
    complete: function complete() {
      busy = false;
    },
    error: function error(err) {
      console.error("AJAX error (news):", err);
      busy = false;
    }
  });
};
var newsPagination = function newsPagination() {
  jQuery(document).on("click", ".js-colPager a", function (e) {
    e.preventDefault();
    if (busy) return;
    var href = jQuery(this).attr("href") || "";
    var url = new URL(href, window.location.origin);
    var page = url.searchParams.get("paged");
    if (!page) {
      var m = href.match(/\/page\/(\d+)/);
      page = m ? m[1] : "1";
    }
    loadNewsPageAjax(parseInt(page, 10));
  });
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_hamburger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_clientsMarquee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_casesVideoPopup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _modules_faqAccordion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_capabilitiesAccordion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _modules_casesSlider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _modules_footerMobileReflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _modules_initMemberDragScroll_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _modules_contactSelect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _modules_case_casePagination_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10);
/* harmony import */ var _sections_contactMobileOrder_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
/* harmony import */ var _modules_case_caseFilter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12);
/* harmony import */ var _modules_news_newsFilter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);
/* harmony import */ var _modules_news_newsPagination_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);















// $(document).ready(() => {
// document.addEventListener("DOMContentLoaded", function () {
// 	hamburger();
// 	// clientsMarquee();

// 	contactSelect();
// 	contactMobileOrder();
// });

(function waitForJQ() {
  if (!window.jQuery || typeof window.$ !== "function") {
    return setTimeout(waitForJQ, 30);
  }
  jQuery(function ($) {
    (0,_modules_hamburger_js__WEBPACK_IMPORTED_MODULE_0__.hamburger)();
    (0,_modules_casesVideoPopup_js__WEBPACK_IMPORTED_MODULE_2__.casesVideoPopup)();
    (0,_modules_faqAccordion_js__WEBPACK_IMPORTED_MODULE_3__.faqAccordion)();
    (0,_modules_capabilitiesAccordion_js__WEBPACK_IMPORTED_MODULE_4__.capabilitiesAccordion)();
    (0,_modules_casesSlider_js__WEBPACK_IMPORTED_MODULE_5__.casesSlider)();
    (0,_modules_footerMobileReflow_js__WEBPACK_IMPORTED_MODULE_6__.footerMobileReflow)();
    (0,_modules_initMemberDragScroll_js__WEBPACK_IMPORTED_MODULE_7__.initMemberDragScroll)();
    (0,_modules_case_casePagination_js__WEBPACK_IMPORTED_MODULE_9__.casePagination)();
    (0,_modules_case_caseFilter_js__WEBPACK_IMPORTED_MODULE_11__.caseCategoryFilter)();
    (0,_sections_contactMobileOrder_js__WEBPACK_IMPORTED_MODULE_10__.contactMobileOrder)($); // or no param if vanilla
    (0,_modules_contactSelect_js__WEBPACK_IMPORTED_MODULE_8__.contactSelect)();
    (0,_modules_news_newsFilter_js__WEBPACK_IMPORTED_MODULE_12__.newsCategoryFilter)();
    (0,_modules_news_newsPagination_js__WEBPACK_IMPORTED_MODULE_13__.newsPagination)();
  });
})();
}();
/******/ })()
;