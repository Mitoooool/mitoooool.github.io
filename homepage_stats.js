(() => {
  "use strict";
  const service = "https://hitscounter.dev/api/";
  const canonical = "https://mitoooool.github.io/";
  const start = "2026-10-25";
  const production = location.hostname === "mitoooool.github.io" &&
    (location.pathname === "/" || location.pathname === "/index.html");
  const privateSignal = navigator.doNotTrack === "1" ||
    navigator.globalPrivacyControl === true ||
    navigator.webdriver === true;
  const key = kind => `${canonical}?statistics-since=${start}#${kind}`;
  const nodes = new Map([
    ["page-views", document.querySelector('[data-stat="views"]')],
    ["resource-clicks", document.querySelector('[data-stat="resources"]')],
    ["download-clicks", document.querySelector('[data-stat="downloads"]')]
  ]);
  if (!production || privateSignal || !nodes.get("page-views")) return;

  async function request(kind, count) {
    const url = new URL(kind === "hit" ? "hit" : "history", service);
    url.searchParams.set("url", count);
    if (kind === "hit") {
      url.searchParams.set("output", "json");
      url.searchParams.set("tz", "America/Los_Angeles");
    }
    const response = await fetch(url.href, {
      mode: "cors", credentials: "omit", referrerPolicy: "no-referrer",
      cache: "no-store", keepalive: kind === "hit"
    });
    if (!response.ok) throw Error("statistics unavailable");
    const data = await response.json();
    if (!Number.isSafeInteger(data.total_hits) || data.total_hits < 0) {
      throw Error("invalid statistics response");
    }
    return data.total_hits;
  }

  function paint(kind, value) {
    const node = nodes.get(kind);
    if (node) node.textContent = Number(value).toLocaleString("en-US");
  }

  function refresh(kind) {
    request("history", key(kind)).then(value => paint(kind, value)).catch(() => {});
  }

  refresh("page-views");
  refresh("resource-clicks");
  refresh("download-clicks");
  request("hit", key("page-views")).catch(() => {});

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.hasAttribute("download")) {
      request("hit", key("download-clicks")).catch(() => {});
      return;
    }
    const href = link.getAttribute("href") || "";
    const isResource = link.matches(".site-entry, .button, .text-link") ||
      /^https?:\/\//.test(href);
    if (isResource && !href.startsWith("mailto:")) {
      request("hit", key("resource-clicks")).catch(() => {});
    }
  }, {passive: true});
})();
