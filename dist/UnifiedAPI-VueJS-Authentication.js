import { createElementBlock as n, openBlock as r, createCommentVNode as a, toDisplayString as c, Fragment as _, renderList as d } from "vue";
const h = {
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
    error: String
  },
  watch: {
    include_text(t) {
      this._include_text = t !== void 0 ? t : !0;
    },
    include_icon(t) {
      this._include_icon = t !== void 0 ? t : !0;
    }
  },
  data() {
    var e;
    const t = (this.dc || "us").toLowerCase();
    return {
      api_url: location.href.includes("localhost:") ? "http://localhost:8000" : t === "au" ? "https://api-au.unified.to" : t === "eu" ? "https://api-eu.unified.to" : "https://api.unified.to",
      authintegrations: void 0,
      _include_text: this.include_text !== !1 ? this.include_text : !0,
      _include_icon: this.include_icon !== !1 ? this.include_icon : !0,
      _error: (e = this.error) == null ? void 0 : e.replace("_", " ")
    };
  },
  methods: {
    href(t) {
      const i = new URLSearchParams();
      return i.append("redirect", "true"), this.success_url ? i.append("success_redirect", this.success_url) : i.append("success_redirect", location.href.split("?")[0]), this.failure_url ? i.append("failure_redirect", this.failure_url) : i.append("failure_redirect", location.href.split("?")[0]), this.state && i.append("state", this.state), this.environment && this.environment !== "Production" && i.append("env", this.environment), `${this.api_url}/unified/integration/login/${this.workspace_id}/${t.type}?${i.toString()}`;
    }
  },
  async mounted() {
    this.authintegrations = await (await fetch(
      `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment || ""}`
    )).json() || [], console.log(this.authintegrations);
  }
}, p = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [u, s] of i)
    e[u] = s;
  return e;
}, f = { class: "unified-auth-container" }, g = {
  key: 0,
  class: "auth-title"
}, m = {
  key: 1,
  class: "auth-description"
}, v = {
  key: 2,
  class: "auth-error"
}, x = {
  key: 3,
  class: "button-container"
}, k = ["href", "title"], S = ["src"], y = {
  key: 1,
  class: "button-text"
};
function w(t, i, e, u, s, l) {
  return r(), n("div", f, [
    e.title ? (r(), n("h3", g, c(e.title), 1)) : a("", !0),
    e.description ? (r(), n("p", m, c(e.description), 1)) : a("", !0),
    s._error ? (r(), n("div", v, c(s._error), 1)) : (r(), n("div", x, [
      (r(!0), n(_, null, d(s.authintegrations, (o) => (r(), n("a", {
        class: "auth-button",
        href: l.href(o),
        title: e.pretext ? `${e.pretext} ${o.name}` : o.name
      }, [
        s._include_icon ? (r(), n("img", {
          key: 0,
          src: o.logo_url,
          class: "button-icon"
        }, null, 8, S)) : a("", !0),
        s._include_text ? (r(), n("div", y, c(e.pretext) + " " + c(o.name), 1)) : a("", !0)
      ], 8, k))), 256))
    ]))
  ]);
}
const B = /* @__PURE__ */ p(h, [["render", w]]);
export {
  B as default
};
