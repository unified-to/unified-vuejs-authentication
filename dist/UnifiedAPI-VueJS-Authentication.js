import { inject as _, createElementBlock as n, openBlock as i, createCommentVNode as d, toDisplayString as c, Fragment as m, renderList as g } from "vue";
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var u;
(function(e) {
  e.pop = "pop", e.push = "push";
})(u || (u = {}));
var p;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(p || (p = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var h;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(h || (h = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const w = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function v(e) {
  return _(w);
}
const y = {
  name: "UnifiedAuthentication",
  props: {
    workspace_id: {
      type: String,
      required: !0
    },
    dc: String,
    // defaults to us
    environment: String,
    title: String,
    description: String,
    sUrl: String,
    // success redirect URL, defaults to location.href
    fUrl: String,
    // failure redirect URL, defaults to location.href
    scopes: Array,
    // additinonal integration-specific permissions scopes
    state: String,
    // returned back to the sUrl and fURL
    pretext: String,
    // pre-text for login buttons (eg. to "Sign with " or "Continue with " )
    includeText: Boolean,
    // defaults to true
    includeIcon: Boolean
    // defaults to true
  },
  setup() {
    var t;
    return {
      error: (((t = v().query) == null ? void 0 : t.error) || "").replace("_", " ")
    };
  },
  data() {
    return {
      api_url: this.dc === "au" ? "https://api-au.unified.to" : this.dc === "eu" ? "https://api-eu.unified.to" : "https://api.unified.to",
      authintegrations: [],
      include_text: this.includeText !== !1,
      include_icon: this.includeIcon !== !1
    };
  },
  methods: {
    href(e) {
      const r = new URLSearchParams();
      return r.append("redirect", "true"), this.sUrl ? r.append("success_redirect", this.sUrl) : r.append("success_redirect", location.href.split("?")[0]), this.fUrl ? r.append("failure_redirect", this.fUrl) : r.append("failure_redirect", location.href.split("?")[0]), this.state && r.append("state", this.state), this.environment && this.environment !== "Production" && r.append("env", this.environment), `${this.api_url}unified/integration/login/${this.workspace_id}/${e.type}?${r.toString()}`;
    }
  },
  async mounted() {
    this.authintegrations = await (await fetch(
      `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment}`
    )).json() || [];
  }
}, x = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [l, o] of r)
    t[l] = o;
  return t;
}, b = { class: "w-full ml:w-1/3 md:w-1/2 flex place-content-center min-h-screen items-center justify-center px-8 md:px-8" }, k = {
  key: 0,
  class: ""
}, S = {
  key: 1,
  class: "lg:w-2/3 sm:w-2/3 md:w-full w-full"
}, E = {
  key: 0,
  class: "text-xl font-bold"
}, U = {
  key: 1,
  class: "text-md"
}, N = {
  key: 2,
  class: "justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex"
}, O = {
  key: 3,
  class: ""
}, V = ["href", "title"], D = ["src"], j = {
  key: 1,
  class: ""
};
function B(e, r, t, l, o, f) {
  var a;
  return i(), n("div", b, [
    (a = o.authintegrations) != null && a.length ? (i(), n("div", S, [
      t.title ? (i(), n("h3", E, c(t.title), 1)) : d("", !0),
      t.description ? (i(), n("p", U, c(t.description), 1)) : d("", !0),
      l.error ? (i(), n("div", N, c(l.error), 1)) : (i(), n("div", O, [
        (i(!0), n(m, null, g(o.authintegrations, (s) => (i(), n("a", {
          class: "my-1 flex-nowrap font-medium select-none rounded-lg justify-center items-center w-full inline-flex mb-2 mr-2 border bg-blue-500 text-white hover:bg-blue-700 text-white border-gray-500 hover:border-white",
          href: f.href(s),
          title: t.pretext ? `${t.pretext} ${s.name}` : s.name
        }, [
          o.include_icon ? (i(), n("img", {
            key: 0,
            src: s.logo_url,
            class: "w-5 h-5 mr-2"
          }, null, 8, D)) : d("", !0),
          o.include_text ? (i(), n("div", j, c(t.pretext) + " " + c(s.name), 1)) : d("", !0)
        ], 8, V))), 256))
      ]))
    ])) : (i(), n("div", k, "⟳"))
  ]);
}
const L = /* @__PURE__ */ x(y, [["render", B]]);
export {
  L as default
};
