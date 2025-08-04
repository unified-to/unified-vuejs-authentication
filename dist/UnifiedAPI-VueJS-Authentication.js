import { createElementBlock as n, openBlock as r, createCommentVNode as u, normalizeClass as o, toDisplayString as a, Fragment as d, renderList as h } from "vue";
const S = {
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
  setup() {
    return {
      BUTTON_CONTAINER_CLASSES: "flex flex-col gap-2",
      BUTTON_CLASSES_ICON: "w-5 h-5 mr-2",
      BUTTON_CLASSES: "px-4 py-3 flex-nowrap font-medium select-none rounded justify-center items-center w-full inline-flex border hover:bg-blue-500 hover:text-black",
      TITLE_CLASSES: "text-xl font-bold mb-4",
      DESCRIPTION_CLASSES: "text-md mb-4",
      ERROR_CLASSES: "justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex"
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
  for (const [s, c] of i)
    t[s] = c;
  return t;
}, p = { class: "w-full" }, m = ["href", "title"], g = ["src"], x = {
  key: 1,
  class: ""
};
function C(e, i, t, s, c, _) {
  return r(), n("div", p, [
    t.title ? (r(), n("h3", {
      key: 0,
      class: o(s.TITLE_CLASSES)
    }, a(t.title), 3)) : u("", !0),
    t.description ? (r(), n("p", {
      key: 1,
      class: o(s.DESCRIPTION_CLASSES)
    }, a(t.description), 3)) : u("", !0),
    c._error ? (r(), n("div", {
      key: 2,
      class: o(s.ERROR_CLASSES)
    }, a(c._error), 3)) : (r(), n("div", {
      key: 3,
      class: o(s.BUTTON_CONTAINER_CLASSES)
    }, [
      (r(!0), n(d, null, h(c.authintegrations, (l) => (r(), n("a", {
        class: o(s.BUTTON_CLASSES),
        href: _.href(l),
        title: t.pretext ? `${t.pretext} ${l.name}` : l.name
      }, [
        c._include_icon ? (r(), n("img", {
          key: 0,
          src: l.logo_url,
          class: o(s.BUTTON_CLASSES_ICON)
        }, null, 10, g)) : u("", !0),
        c._include_text ? (r(), n("div", x, a(t.pretext) + " " + a(l.name), 1)) : u("", !0)
      ], 10, m))), 256))
    ], 2))
  ]);
}
const T = /* @__PURE__ */ f(S, [["render", C]]);
export {
  T as default
};
