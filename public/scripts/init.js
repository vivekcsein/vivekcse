/*
 * init.js — tiny blocking script loaded from <head> (see src/app/layout.tsx).
 *
 * It is a static file on purpose: the site is a static export with a strict
 * CSP (script-src 'self' + per-page hashes), so no inline script and no
 * dangerouslySetInnerHTML is needed.
 *
 * 1. Applies the saved colour theme and sidebar state before first paint
 *    (keys must match STORAGE_KEY in StyleProvider.tsx and
 *    SIDEBAR_STORAGE_KEY in shell/sidebar-state.ts).
 * 2. Clickjacking defence. A static host cannot send X-Frame-Options or
 *    frame-ancestors (that CSP directive is ignored in a <meta> tag), so if
 *    the page is embedded in a foreign frame it hides itself and breaks out.
 */
(() => {
  var root = document.documentElement;

  try {
    if (window.top !== window.self) {
      root.style.display = "none";
      window.top.location.href = window.self.location.href;
      return;
    }
  } catch (_e) {
    // Cross-origin parent blocked the redirect: stay hidden.
    root.style.display = "none";
    return;
  }

  try {
    const theme = localStorage.getItem("style-theme");
    // Only accept a plain slug; StyleProvider re-validates against the real list.
    if (theme && /^[a-z0-9-]{1,40}$/.test(theme)) {
      root.setAttribute("data-theme", theme);
    }
    if (localStorage.getItem("kb:sidebar") === "collapsed") {
      root.setAttribute("data-sidebar", "collapsed");
    }
  } catch (_e) {
    // Storage blocked (private mode): defaults apply.
  }
})();
