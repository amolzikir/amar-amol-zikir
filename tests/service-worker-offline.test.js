const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "sw.js"), "utf8");

class FakeRequest {
  constructor(input, options = {}) {
    this.url = typeof input === "string" ? input : input.url;
    this.method = options.method || input.method || "GET";
    this.mode = options.mode || input.mode || "cors";
    this.cache = options.cache || input.cache || "default";
  }
}

function makeWorker({ cached = {}, fetchImpl = async () => { throw new Error("offline"); } } = {}) {
  const entries = new Map(Object.entries(cached).map(([url, body]) => [
    new URL(url, "https://app.test").href,
    new Response(body, { status: 200, headers: { "content-type": "text/html" } })
  ]));
  const keyOf = value => new URL(typeof value === "string" ? value : value.url, "https://app.test").href;
  const caches = {
    match: async value => entries.get(keyOf(value)) || null,
    open: async () => ({
      put: async (request, response) => { entries.set(keyOf(request), response.clone()); }
    }),
    keys: async () => ["amol-zikir-v153"],
    delete: async () => true
  };
  let fetchHandler;
  const context = {
    self: {
      addEventListener: (name, handler) => { if (name === "fetch") fetchHandler = handler; },
      skipWaiting: async () => {},
      clients: { claim: async () => {} }
    },
    caches,
    fetch: fetchImpl,
    URL,
    Request: FakeRequest,
    Response,
    location: { origin: "https://app.test" },
    Promise
  };
  vm.runInNewContext(source, context, { filename: "sw.js" });
  return async request => {
    let responsePromise;
    fetchHandler({
      request,
      respondWith: promise => { responsePromise = Promise.resolve(promise); },
      waitUntil: () => {}
    });
    return responsePromise;
  };
}

test("navigation falls back to the cached app shell when the server is unreachable", async () => {
  const dispatch = makeWorker({ cached: { "./index.html": "<html>cached app</html>" } });
  const response = await dispatch(new FakeRequest("https://app.test/app/", { mode: "navigate" }));
  assert.equal(response.status, 200);
  assert.match(await response.text(), /cached app/);
});

test("navigation falls back to the cached app shell on server errors", async () => {
  const dispatch = makeWorker({
    cached: { "./index.html": "<html>cached app</html>" },
    fetchImpl: async () => new Response("server error", { status: 503 })
  });
  const response = await dispatch(new FakeRequest("https://app.test/app/", { mode: "navigate" }));
  assert.equal(response.status, 200);
  assert.match(await response.text(), /cached app/);
});

test("an uncached Firebase script never receives the app HTML as a fallback", async () => {
  const dispatch = makeWorker();
  const response = await dispatch(new FakeRequest("https://www.gstatic.com/firebase/missing.js"));
  assert.equal(response.status, 503);
  assert.equal(await response.text(), "");
});

test("an uncached same-origin asset never receives the app HTML as a fallback", async () => {
  const dispatch = makeWorker();
  const response = await dispatch(new FakeRequest("https://app.test/manifest.webmanifest"));
  assert.equal(response.status, 503);
  assert.equal(await response.text(), "");
});
