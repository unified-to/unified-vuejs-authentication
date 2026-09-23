import { createElementBlock as n, openBlock as r, createElementVNode as h, createCommentVNode as c, toDisplayString as a, Fragment as l, renderList as p, createTextVNode as d } from "vue";
const f = {
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
    include_icon: Boolean,
    // defaults to true
    error: String,
    // 'auto' follows prefers-color-scheme; 'light' | 'dark' force a theme
    theme: {
      type: String,
      default: "auto",
      validator: (e) => ["auto", "light", "dark"].includes(e)
    }
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
    var t;
    const e = (this.dc || "us").toLowerCase();
    return {
      api_url: location.href.includes("localhost:") ? "http://localhost:8000" : e === "au" ? "https://api-au.unified.to" : e === "eu" ? "https://api-eu.unified.to" : "https://api.unified.to",
      authintegrations: void 0,
      _include_text: this.include_text !== !1 ? this.include_text : !0,
      _include_icon: this.include_icon !== !1 ? this.include_icon : !0,
      _error: (t = this.error) == null ? void 0 : t.replace("_", " ")
    };
  },
  methods: {
    href(e) {
      const i = new URLSearchParams();
      return i.append("redirect", "true"), this.success_url ? i.append("success_redirect", this.success_url) : i.append("success_redirect", location.href.split("?")[0]), this.failure_url ? i.append("failure_redirect", this.failure_url) : i.append("failure_redirect", location.href.split("?")[0]), this.state && i.append("state", this.state), this.environment && this.environment !== "Production" && i.append("env", this.environment), `${this.api_url}/unified/integration/login/${this.workspace_id}/${e.type}?${i.toString()}`;
    }
  },
  async mounted() {
    this.authintegrations = await (await fetch(
      `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment || ""}`
    )).json() || [], console.log(this.authintegrations);
  }
}, m = (e, i) => {
  const t = e.__vccOpts || e;
  for (const [u, s] of i)
    t[u] = s;
  return t;
}, g = ["data-theme"], k = { class: "auth-card" }, v = {
  key: 0,
  class: "auth-header"
}, x = {
  key: 0,
  class: "auth-title"
}, y = {
  key: 1,
  class: "auth-description"
}, S = {
  key: 1,
  class: "auth-error",
  role: "alert"
}, w = {
  key: 2,
  class: "button-container"
}, b = ["href", "title"], B = ["src"], L = {
  key: 1,
  class: "button-text"
};
function N(e, i, t, u, s, _) {
  return r(), n("div", {
    class: "unified-auth-container",
    "data-theme": t.theme === "auto" ? void 0 : t.theme
  }, [
    h("div", k, [
      t.title || t.description ? (r(), n("header", v, [
        t.title ? (r(), n("h3", x, a(t.title), 1)) : c("", !0),
        t.description ? (r(), n("p", y, a(t.description), 1)) : c("", !0)
      ])) : c("", !0),
      s._error ? (r(), n("div", S, a(s._error), 1)) : (r(), n("div", w, [
        (r(!0), n(l, null, p(s.authintegrations, (o) => (r(), n("a", {
          class: "auth-button",
          key: o.type,
          href: _.href(o),
          title: t.pretext ? `${t.pretext} ${o.name}` : o.name
        }, [
          s._include_icon ? (r(), n("img", {
            key: 0,
            src: o.logo_url,
            alt: "",
            class: "button-icon"
          }, null, 8, B)) : c("", !0),
          s._include_text ? (r(), n("span", L, [
            t.pretext ? (r(), n(l, { key: 0 }, [
              d(a(t.pretext), 1)
            ], 64)) : c("", !0),
            d(a(o.name), 1)
          ])) : c("", !0)
        ], 8, b))), 128))
      ]))
    ])
  ], 8, g);
}
const V = /* @__PURE__ */ m(f, [["render", N]]);
export {
  V as default
};
