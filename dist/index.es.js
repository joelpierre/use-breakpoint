import oe, { createContext as se, useContext as ie, useMemo as w, useState as le, useEffect as ce } from "react";
var y = { exports: {} }, g = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var J;
function ue() {
  if (J) return g;
  J = 1;
  var t = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function l(c, s, a) {
    var i = null;
    if (a !== void 0 && (i = "" + a), s.key !== void 0 && (i = "" + s.key), "key" in s) {
      a = {};
      for (var E in s)
        E !== "key" && (a[E] = s[E]);
    } else a = s;
    return s = a.ref, {
      $$typeof: t,
      type: c,
      key: i,
      ref: s !== void 0 ? s : null,
      props: a
    };
  }
  return g.Fragment = o, g.jsx = l, g.jsxs = l, g;
}
var P = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var V;
function fe() {
  return V || (V = 1, process.env.NODE_ENV !== "production" && function() {
    function t(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === te ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case v:
          return "Fragment";
        case j:
          return "Profiler";
        case O:
          return "StrictMode";
        case Q:
          return "Suspense";
        case K:
          return "SuspenseList";
        case re:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case A:
            return "Portal";
          case C:
            return (e.displayName || "Context") + ".Provider";
          case N:
            return (e._context.displayName || "Context") + ".Consumer";
          case Z:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ee:
            return r = e.displayName || null, r !== null ? r : t(e.type) || "Memo";
          case I:
            r = e._payload, e = e._init;
            try {
              return t(e(r));
            } catch {
            }
        }
      return null;
    }
    function o(e) {
      return "" + e;
    }
    function l(e) {
      try {
        o(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var n = r.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), o(e);
      }
    }
    function c(e) {
      if (e === v) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === I)
        return "<...>";
      try {
        var r = t(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function s() {
      var e = $.A;
      return e === null ? null : e.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function i(e) {
      if (F.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function E(e, r) {
      function n() {
        D || (D = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      n.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: n,
        configurable: !0
      });
    }
    function S() {
      var e = t(this.type);
      return W[e] || (W[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function k(e, r, n, u, p, x, X, M) {
      return n = x.ref, e = {
        $$typeof: h,
        type: e,
        key: r,
        props: x,
        _owner: p
      }, (n !== void 0 ? n : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: S
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: X
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function b(e, r, n, u, p, x, X, M) {
      var f = r.children;
      if (f !== void 0)
        if (u)
          if (ne(f)) {
            for (u = 0; u < f.length; u++)
              T(f[u]);
            Object.freeze && Object.freeze(f);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else T(f);
      if (F.call(r, "key")) {
        f = t(e);
        var _ = Object.keys(r).filter(function(ae) {
          return ae !== "key";
        });
        u = 0 < _.length ? "{key: someKey, " + _.join(": ..., ") + ": ...}" : "{key: someKey}", z[f + u] || (_ = 0 < _.length ? "{" + _.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          f,
          _,
          f
        ), z[f + u] = !0);
      }
      if (f = null, n !== void 0 && (l(n), f = "" + n), i(r) && (l(r.key), f = "" + r.key), "key" in r) {
        n = {};
        for (var Y in r)
          Y !== "key" && (n[Y] = r[Y]);
      } else n = r;
      return f && E(
        n,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), k(
        e,
        f,
        x,
        p,
        s(),
        n,
        X,
        M
      );
    }
    function T(e) {
      typeof e == "object" && e !== null && e.$$typeof === h && e._store && (e._store.validated = 1);
    }
    var R = oe, h = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), C = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), te = Symbol.for("react.client.reference"), $ = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = Object.prototype.hasOwnProperty, ne = Array.isArray, L = console.createTask ? console.createTask : function() {
      return null;
    };
    R = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var D, W = {}, U = R["react-stack-bottom-frame"].bind(
      R,
      a
    )(), B = L(c(a)), z = {};
    P.Fragment = v, P.jsx = function(e, r, n, u, p) {
      var x = 1e4 > $.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        n,
        !1,
        u,
        p,
        x ? Error("react-stack-top-frame") : U,
        x ? L(c(e)) : B
      );
    }, P.jsxs = function(e, r, n, u, p) {
      var x = 1e4 > $.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        n,
        !0,
        u,
        p,
        x ? Error("react-stack-top-frame") : U,
        x ? L(c(e)) : B
      );
    };
  }()), P;
}
var q;
function me() {
  return q || (q = 1, process.env.NODE_ENV === "production" ? y.exports = ue() : y.exports = fe()), y.exports;
}
var de = me();
const m = Object.freeze({
  xs: "360",
  sm: "640",
  md: "960",
  lg: "1280",
  xl: "1440",
  "2xl": "1680"
}), d = (t) => typeof t == "string" ? t.replace(/px/gi, "") : t, xe = ({
  xl: t,
  sm: o,
  md: l,
  lg: c,
  xs: s,
  ...a
} = {}) => ({
  xs: `(min-width: ${d(s ?? m.xs)}px)`,
  sm: `(min-width: ${d(o ?? m.sm)}px)`,
  md: `(min-width: ${d(l ?? m.md)}px)`,
  lg: `(min-width: ${d(c ?? m.lg)}px)`,
  xl: `(min-width: ${d(t ?? m.xl)}px)`,
  "2xl": `(min-width: ${d(
    a["2xl"] ?? m["2xl"]
  )}px)`
}), Ee = ({
  xl: t,
  sm: o,
  md: l,
  lg: c,
  xs: s,
  ...a
} = {}) => ({
  xs: `(max-width: ${d(s ?? m.xs)}px)`,
  sm: `(max-width: ${d(o ?? m.sm)}px)`,
  md: `(max-width: ${d(l ?? m.md)}px)`,
  lg: `(max-width: ${d(c ?? m.lg)}px)`,
  xl: `(max-width: ${d(t ?? m.xl)}px)`,
  "2xl": `(max-width: ${d(
    a["2xl"] ?? m["2xl"]
  )}px)`
}), G = (t) => {
  const [o, l] = le(
    t.map(() => !1)
  );
  return ce(
    () => {
      const c = t.map((i) => window.matchMedia(i)), s = () => c.map((i) => i.matches), a = () => l(s());
      return a(), c.forEach((i) => {
        i.addEventListener ? i.addEventListener("change", a) : i.addListener(a);
      }), () => c.forEach((i) => {
        i.removeEventListener ? i.removeEventListener("change", a) : i.removeListener(a);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o;
}, Re = {
  min: {
    isXs: !1,
    isSm: !1,
    isMd: !1,
    isLg: !1,
    isXl: !1,
    is2Xl: !1
  },
  max: {
    isXs: !1,
    isSm: !1,
    isMd: !1,
    isLg: !1,
    isXl: !1,
    is2Xl: !1
  }
}, H = se(void 0);
function ve(t) {
  const o = ie(H);
  if (o === void 0)
    throw new Error(
      "useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider"
    );
  return t ? o[t] : o;
}
const _e = ({ children: t, breakpointOverrides: o, mediaQueryMethods: l }) => {
  const c = w(
    () => l?.min ? l.min(o) : xe(o),
    [o, l]
  ), s = w(
    () => l?.max ? l.max(o) : Ee(o),
    [o, l]
  ), a = w(() => Object.values(c), [c]), i = w(() => Object.values(s), [s]), [E, S, k, b, T, R] = G(a), [h, A, v, O, j, N] = G(i), C = w(
    () => ({
      min: {
        isXs: E,
        isSm: S,
        isMd: k,
        isLg: b,
        isXl: T,
        is2Xl: R
      },
      max: {
        isXs: h,
        isSm: A,
        isMd: v,
        isLg: O,
        isXl: j,
        is2Xl: N
      }
    }),
    [
      N,
      O,
      v,
      A,
      j,
      h,
      R,
      b,
      k,
      S,
      T,
      E
    ]
  );
  return /* @__PURE__ */ de.jsx(H.Provider, { value: C, children: t });
};
export {
  _e as BreakpointProvider,
  m as DEFAULT_BREAK_POINTS,
  Re as defaultBreakPointContext,
  d as replacePxInString,
  ve as useBreakPoint
};
