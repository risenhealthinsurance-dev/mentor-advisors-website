const supportedPages = new Set(["home", "privacy", "sms-terms"]);

export function normalizePageId(hash = "") {
  const candidate = hash.replace(/^#/, "");
  return supportedPages.has(candidate) ? candidate : "home";
}

export function showPage(pageId, documentRef = document, windowRef = window) {
  const normalized = supportedPages.has(pageId) ? pageId : "home";
  documentRef.querySelectorAll(".page-content").forEach((page) => page.classList.remove("active"));
  documentRef.getElementById(`${normalized}-page`)?.classList.add("active");
  windowRef.scrollTo(0, 0);
  return normalized;
}

export function initializeSite(documentRef = document, windowRef = window) {
  const activateHash = () => showPage(normalizePageId(windowRef.location.hash), documentRef, windowRef);

  documentRef.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const pageId = link.dataset.page;
      showPage(pageId, documentRef, windowRef);
      windowRef.history.replaceState(null, "", `#${pageId}`);
    });
  });

  documentRef.querySelectorAll("[data-scroll-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage("home", documentRef, windowRef);
      windowRef.history.replaceState(null, "", "#home");
      documentRef.getElementById(link.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  documentRef.getElementById("updates-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  windowRef.addEventListener("hashchange", activateHash);
  activateHash();
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeSite());
  } else {
    initializeSite();
  }
}
