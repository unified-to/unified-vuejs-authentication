import { inject as p, createElementBlock as i, openBlock as r, createCommentVNode as l, toDisplayString as c, Fragment as f, renderList as m } from "vue";
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
var a;
(function(e) {
  e.pop = "pop", e.push = "push";
})(a || (a = {}));
var d;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(d || (d = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var _;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(_ || (_ = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const g = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function v(e) {
  return p(g);
}
const x = {
  name: "UnifiedAuthentication",
  props: {
    workspace_id: {
      type: String,
      required: !0
    },
    dc: String,
    // 'us' | 'eu' | 'au', defaults to us
    environment: String,
    title: String,
    description: String,
    success_url: String,
    // success redirect URL, defaults to location.href
    failure_url: String,
    // failure redirect URL, defaults to location.href
    state: String,
    // returned back to the sUrl and fURL
    pretext: String,
    // pre-text for login buttons (eg. to "Sign with " or "Continue with " )
    include_text: Boolean,
    // defaults to true
    include_icon: Boolean
    // defaults to true
  },
  setup() {
    var n;
    return {
      error: (((n = v().query) == null ? void 0 : n.error) || "").replace("_", " ")
    };
  },
  watch: {
    include_text(e) {
      this._include_text = e !== void 0 ? e : !0;
    },
    include_icon(e) {
      this._include_icon = e !== void 0 ? e : !0;
    }
  },
  data() {
    const e = (this.dc || "us").toLowerCase();
    return {
      api_url: location.href.includes("localhost:") ? "http://localhost:8000" : e === "au" ? "https://api-au.unified.to" : e === "eu" ? "https://api-eu.unified.to" : "https://api.unified.to",
      authintegrations: void 0,
      _include_text: this.include_text !== !1 ? this.include_text : !0,
      _include_icon: this.include_icon !== !1 ? this.include_icon : !0
    };
  },
  methods: {
    href(e) {
      const t = new URLSearchParams();
      return t.append("redirect", "true"), this.success_url ? t.append("success_redirect", this.success_url) : t.append("success_redirect", location.href.split("?")[0]), this.failure_url ? t.append("failure_redirect", this.failure_url) : t.append("failure_redirect", location.href.split("?")[0]), this.state && t.append("state", this.state), this.environment && this.environment !== "Production" && t.append("env", this.environment), `${this.api_url}/unified/integration/login/${this.workspace_id}/${e.type}?${t.toString()}`;
    }
  },
  async mounted() {
    this.authintegrations = await (await fetch(
      `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment || ""}`
    )).json() || [], console.log(this.authintegrations);
  }
}, w = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [u, o] of t)
    n[u] = o;
  return n;
}, y = { class: "w-full" }, b = {
  key: 0,
  class: "text-xl font-bold mb-4"
}, k = {
  key: 1,
  class: "text-md mb-4"
}, S = {
  key: 2,
  class: "justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex"
}, E = {
  key: 3,
  class: "flex flex-col gap-2"
}, N = ["href", "title"], O = ["src"], V = {
  key: 1,
  class: ""
};
function D(e, t, n, u, o, h) {
  return r(), i("div", y, [
    n.title ? (r(), i("h3", b, c(n.title), 1)) : l("", !0),
    n.description ? (r(), i("p", k, c(n.description), 1)) : l("", !0),
    u.error ? (r(), i("div", S, c(u.error), 1)) : (r(), i("div", E, [
      (r(!0), i(f, null, m(o.authintegrations, (s) => (r(), i("a", {
        class: "px-4 py-3 flex-nowrap font-medium select-none rounded justify-center items-center w-full inline-flex border hover:bg-blue-500 hover:text-black",
        href: h.href(s),
        title: n.pretext ? `${n.pretext} ${s.name}` : s.name
      }, [
        o._include_icon ? (r(), i("img", {
          key: 0,
          src: s.logo_url,
          class: "w-5 h-5 mr-2"
        }, null, 8, O)) : l("", !0),
        o._include_text ? (r(), i("div", V, c(n.pretext) + " " + c(s.name), 1)) : l("", !0)
      ], 8, N))), 256))
    ]))
  ]);
}
const B = /* @__PURE__ */ w(x, [["render", D]]);
export {
  B as default
};
