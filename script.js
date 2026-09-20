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

  const form = documentRef.getElementById("updates-form");
  const notice = documentRef.getElementById("form-notice");
  const submitBtn = documentRef.getElementById("form-submit-btn");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    if (notice) {
      notice.hidden = true;
      notice.classList.remove("form-notice-error");
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      if (notice) {
        notice.textContent = "Thanks! Your request has been sent — we'll be in touch shortly.";
        notice.hidden = false;
      }
    } catch (error) {
      if (notice) {
        notice.textContent = "Sorry, something went wrong sending your request. Please call us at 800-988-3052.";
        notice.classList.add("form-notice-error");
        notice.hidden = false;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
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
