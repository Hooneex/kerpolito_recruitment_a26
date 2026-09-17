(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const config = window.KER_CONFIG || {};
  const configFields = document.querySelectorAll("[data-config]");

  configFields.forEach((field) => {
    const key = field.dataset.config;
    if (config[key]) field.textContent = config[key];
  });

  const linkMap = {
    application: config.applicationUrl,
    instagram: config.instagramUrl,
    telegram: config.telegramUrl,
    tiktok: config.tiktokUrl,
    youtube: config.youtubeUrl,
    linktree: config.linktreeUrl,
    email: config.emailUrl
  };

  const notice = document.querySelector("[data-link-notice]");
  let noticeTimer;

  const showLinkNotice = (label) => {
    if (!notice) return;
    notice.textContent = `${label} link not set yet. Update it in js/config.js.`;
    notice.classList.add("is-visible");
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => notice.classList.remove("is-visible"), 3500);
  };

  document.querySelectorAll("[data-link]").forEach((link) => {
    const type = link.dataset.link;
    const url = linkMap[type];
    const isPlaceholder = !url || url.startsWith("REPLACE_");

    if (isPlaceholder) {
      link.href = "#";
      link.classList.add("is-placeholder");
      link.setAttribute("aria-label", `${type} link — not set yet`);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showLinkNotice(type.charAt(0).toUpperCase() + type.slice(1));
      });
      return;
    }

    link.href = url;
    if (/^https?:/i.test(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  const header = document.querySelector("[data-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  const setMenu = (open) => {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      menuToggle?.focus();
      return;
    }

    if (event.key !== "Tab" || menuToggle?.getAttribute("aria-expanded") !== "true") return;

    const focusable = [menuToggle, ...(menu?.querySelectorAll("a") || [])];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const faqButtons = document.querySelectorAll("[data-accordion] button[aria-controls]");

  const closeFaq = (button) => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    if (!answer) return;
    button.setAttribute("aria-expanded", "false");
    answer.classList.remove("is-open");

    if (reduceMotion) {
      answer.hidden = true;
      return;
    }

    window.setTimeout(() => {
      if (button.getAttribute("aria-expanded") === "false") answer.hidden = true;
    }, 300);
  };

  const openFaq = (button) => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    if (!answer) return;
    button.setAttribute("aria-expanded", "true");
    answer.hidden = false;
    window.requestAnimationFrame(() => answer.classList.add("is-open"));
  };

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      faqButtons.forEach((otherButton) => {
        if (otherButton !== button) closeFaq(otherButton);
      });
      if (willOpen) openFaq(button);
      else closeFaq(button);
    });
  });

  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    reveals.forEach((element) => revealObserver.observe(element));
  }
})();
