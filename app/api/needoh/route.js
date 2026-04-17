import { NextResponse } from 'next/server';

const SITES = [
  { name: "mykidztoys.com", url: "https://mykidztoys.com/search?q=needoh&options%5Bprefix%5D=last", blocked: false },
  { name: "fatbraintoys.com", url: "https://www.fatbraintoys.com/search.cfm?q=Needoh", blocked: false },
  { name: "bonjourfete.com", url: "https://www.bonjourfete.com/search?q=needoh&_pos=1&_psq=needoh&_ss=e&_v=1.0", blocked: false },
  { name: "scheels.com", url: "https://www.scheels.com/b/needoh?searchTerm=needoh", blocked: true },
  { name: "toysandsweets.com", url: "https://toysandsweets.com/collections/needoh", blocked: false },
  { name: "christianbook.com", url: "https://www.christianbook.com/apps/search?Ntt=Needoh&Ne=0&N=0&Ntk=keywords&action=Search&ps_exit=RETURN%7Clegacy&ps_domain=www&event=BRSRCG%7CPSEN", blocked: false },
  { name: "playtherapysupply.com", url: "https://www.playtherapysupply.com/search?q=Needoh", blocked: false },
  { name: "staples.com", url: "https://www.staples.com/needoh/directory_needoh", blocked: true },
  { name: "educationmakesthedifference.com", url: "https://educationmakesthedifference.com/collections/fidgets-for-all-ages/toys", blocked: false },
  { name: "pharmfavorites.com", url: "https://pharmfavorites.com/search?q=needoh&options%5Bprefix%5D=last", blocked: false },
  { name: "bingsdsm.com", url: "https://www.bingsdsm.com/s/search?q=Needoh", blocked: false },
  { name: "twirlsandtwigs.com", url: "https://twirlsandtwigs.com/search?q=Needoh", blocked: false },
  { name: "booksamillion.com", url: "https://www.booksamillion.com/search?query=needoh&id=9749258330610", blocked: true },
  { name: "safariltd.com", url: "https://www.safariltd.com/search?type=page%2Carticle%2Cproduct&q=needoh", blocked: false },
  { name: "redballoon.com", url: "https://www.redballoon.com/s/search?q=Needoh", blocked: false },
  { name: "barnesandnoble.com", url: "https://www.barnesandnoble.com/s/Needoh", blocked: true },
  { name: "theprizebooth.com", url: "https://www.theprizebooth.com/search?q=needoh&options%5Bprefix%5D=last", blocked: false },
  { name: "shopsmallscreendesigns.com", url: "https://www.shopsmallscreendesigns.com/pages/rapid-search-results?q=needoh", blocked: false },
  { name: "buttercuplynne.com", url: "https://www.buttercuplynne.com/collections/sensory-toys", blocked: false },
];

const OUT_OF_STOCK_SIGNALS = [
  "out of stock", "sold out", "unavailable", "notify me when available",
  "back in stock", "currently unavailable", "temporarily out of stock",
  "not available", "pre-order", "notify me",
];

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function checkSite(site) {
  if (site.blocked) {
    return { name: site.name, url: site.url, status: "CHECK_MANUALLY", productName: null };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(site.url, {
      headers: HEADERS,
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    const html = await res.text();
    const lower = html.toLowerCase();

    const hasNeedoh = lower.includes("needoh");
    const hasOutOfStock = OUT_OF_STOCK_SIGNALS.some((s) => lower.includes(s));

    let productName = null;
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    if (titleMatch) {
      const title = titleMatch[1].replace(/&#[x]?[\dA-Fa-f]+;/g, "").replace(/<[^>]*>/g, "").trim();
      if (title.toLowerCase().includes("needoh")) {
        productName = title.length > 80 ? title.slice(0, 77) + "..." : title;
      }
    }

    const status = hasNeedoh && !hasOutOfStock ? "IN_STOCK" : "OUT";
    return { name: site.name, url: site.url, status, productName };
  } catch (e) {
    return {
      name: site.name, url: site.url, status: "ERROR", productName: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export async function GET() {
  const results = await Promise.all(SITES.map(checkSite));
  return NextResponse.json(
    { sites: results, checkedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
