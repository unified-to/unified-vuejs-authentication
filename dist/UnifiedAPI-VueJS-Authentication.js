import { createElementBlock as n, openBlock as r, createCommentVNode as l, toDisplayString as c, Fragment as d, renderList as _ } from "vue";
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
}, f = (e, i) => {
  const t = e.__vccOpts || e;
  for (const [a, s] of i)
    t[a] = s;
  return t;
}, p = { class: "w-full" }, m = {
  key: 0,
  class: "text-xl font-bold mb-4"
}, g = {
  key: 1,
  class: "text-md mb-4"
}, x = {
  key: 2,
  class: "justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex"
}, v = {
  key: 3,
  class: "flex flex-col gap-2"
}, y = ["href", "title"], k = ["src"], w = {
  key: 1,
  class: ""
};
function S(e, i, t, a, s, u) {
  return r(), n("div", p, [
    t.title ? (r(), n("h3", m, c(t.title), 1)) : l("", !0),
    t.description ? (r(), n("p", g, c(t.description), 1)) : l("", !0),
    s._error ? (r(), n("div", x, c(s._error), 1)) : (r(), n("div", v, [
      (r(!0), n(d, null, _(s.authintegrations, (o) => (r(), n("a", {
        class: "px-4 py-3 flex-nowrap font-medium select-none rounded justify-center items-center w-full inline-flex border hover:bg-blue-500 hover:text-black",
        href: u.href(o),
        title: t.pretext ? `${t.pretext} ${o.name}` : o.name
      }, [
        s._include_icon ? (r(), n("img", {
          key: 0,
          src: o.logo_url,
          class: "w-5 h-5 mr-2"
        }, null, 8, k)) : l("", !0),
        s._include_text ? (r(), n("div", w, c(t.pretext) + " " + c(o.name), 1)) : l("", !0)
      ], 8, y))), 256))
    ]))
  ]);
}
const B = /* @__PURE__ */ f(h, [["render", S]]);
export {
  B as default
};
