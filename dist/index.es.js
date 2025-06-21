import oe, { createContext as se, useContext as ie, useMemo as X, useState as le, useEffect as ce } from "react";
var O = { exports: {} }, w = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B;
function ue() {
  if (B) return w;
  B = 1;
  var t = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function l(f, i, n) {
    var s = null;
    if (n !== void 0 && (s = "" + n), i.key !== void 0 && (s = "" + i.key), "key" in i) {
      n = {};
      for (var E in i)
        E !== "key" && (n[E] = i[E]);
    } else n = i;
    return i = n.ref, {
      $$typeof: t,
      type: f,
      key: s,
      ref: i !== void 0 ? i : null,
      props: n
    };
  }
  return w.Fragment = o, w.jsx = l, w.jsxs = l, w;
}
var g = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z;
function fe() {
  return z || (z = 1, process.env.NODE_ENV !== "production" && function() {
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
        case A:
          return "StrictMode";
        case K:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case re:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case k:
            return "Portal";
          case H:
            return (e.displayName || "Context") + ".Provider";
          case G:
            return (e._context.displayName || "Context") + ".Consumer";
          case Z:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ee:
            return r = e.displayName || null, r !== null ? r : t(e.type) || "Memo";
          case M:
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
        var a = r.error, c = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          c
        ), o(e);
      }
    }
    function f(e) {
      if (e === v) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === M)
        return "<...>";
      try {
        var r = t(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var e = N.A;
      return e === null ? null : e.getOwner();
    }
    function n() {
      return Error("react-stack-top-frame");
    }
    function s(e) {
      if (Y.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function E(e, r) {
      function a() {
        I || (I = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      a.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: a,
        configurable: !0
      });
    }
    function P() {
      var e = t(this.type);
      return F[e] || (F[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function S(e, r, a, c, p, x, C, $) {
      return a = x.ref, e = {
        $$typeof: h,
        type: e,
        key: r,
        props: x,
        _owner: p
      }, (a !== void 0 ? a : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: P
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
        value: C
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: $
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function b(e, r, a, c, p, x, C, $) {
      var u = r.children;
      if (u !== void 0)
        if (c)
          if (ne(u)) {
            for (c = 0; c < u.length; c++)
              T(u[c]);
            Object.freeze && Object.freeze(u);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else T(u);
      if (Y.call(r, "key")) {
        u = t(e);
        var _ = Object.keys(r).filter(function(ae) {
          return ae !== "key";
        });
        c = 0 < _.length ? "{key: someKey, " + _.join(": ..., ") + ": ...}" : "{key: someKey}", U[u + c] || (_ = 0 < _.length ? "{" + _.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          c,
          u,
          _,
          u
        ), U[u + c] = !0);
      }
      if (u = null, a !== void 0 && (l(a), u = "" + a), s(r) && (l(r.key), u = "" + r.key), "key" in r) {
        a = {};
        for (var L in r)
          L !== "key" && (a[L] = r[L]);
      } else a = r;
      return u && E(
        a,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), S(
        e,
        u,
        x,
        p,
        i(),
        a,
        C,
        $
      );
    }
    function T(e) {
      typeof e == "object" && e !== null && e.$$typeof === h && e._store && (e._store.validated = 1);
    }
    var R = oe, h = Symbol.for("react.transitional.element"), k = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), G = Symbol.for("react.consumer"), H = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), te = Symbol.for("react.client.reference"), N = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = Object.prototype.hasOwnProperty, ne = Array.isArray, y = console.createTask ? console.createTask : function() {
      return null;
    };
    R = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var I, F = {}, D = R["react-stack-bottom-frame"].bind(
      R,
      n
    )(), W = y(f(n)), U = {};
    g.Fragment = v, g.jsx = function(e, r, a, c, p) {
      var x = 1e4 > N.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        a,
        !1,
        c,
        p,
        x ? Error("react-stack-top-frame") : D,
        x ? y(f(e)) : W
      );
    }, g.jsxs = function(e, r, a, c, p) {
      var x = 1e4 > N.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        a,
        !0,
        c,
        p,
        x ? Error("react-stack-top-frame") : D,
        x ? y(f(e)) : W
      );
    };
  }()), g;
}
var J;
function me() {
  return J || (J = 1, process.env.NODE_ENV === "production" ? O.exports = ue() : O.exports = fe()), O.exports;
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
  lg: f,
  xs: i,
  ...n
} = {}) => ({
  xs: `(min-width: ${d(i ?? m.xs)}px)`,
  sm: `(min-width: ${d(o ?? m.sm)}px)`,
  md: `(min-width: ${d(l ?? m.md)}px)`,
  lg: `(min-width: ${d(f ?? m.lg)}px)`,
  xl: `(min-width: ${d(t ?? m.xl)}px)`,
  "2xl": `(min-width: ${d(
    n["2xl"] ?? m["2xl"]
  )}px)`
}), Ee = ({
  xl: t,
  sm: o,
  md: l,
  lg: f,
  xs: i,
  ...n
} = {}) => ({
  xs: `(max-width: ${d(i ?? m.xs)}px)`,
  sm: `(max-width: ${d(o ?? m.sm)}px)`,
  md: `(max-width: ${d(l ?? m.md)}px)`,
  lg: `(max-width: ${d(f ?? m.lg)}px)`,
  xl: `(max-width: ${d(t ?? m.xl)}px)`,
  "2xl": `(max-width: ${d(
    n["2xl"] ?? m["2xl"]
  )}px)`
}), V = (t) => {
  const [o, l] = le(
    t.map(() => !1)
  );
  return ce(
    () => {
      const f = t.map((s) => window.matchMedia(s)), i = () => f.map((s) => s.matches), n = () => l(i());
      return n(), f.forEach((s) => s.addEventListener ? s.addEventListener("change", n) : s.addListener(n)), () => f.forEach((s) => s.removeEventListener ? s.removeEventListener("change", n) : s.removeListener(n));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o;
}, pe = {
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
}, q = se(
  pe
);
function ve(t) {
  const o = ie(q);
  if (o === void 0)
    throw new Error(
      "useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider"
    );
  return t ? o[t] : o;
}
const _e = ({ children: t, breakpointOverrides: o, mediaQueryMethods: l }) => {
  const f = X(
    () => l?.min ? l.min(o) : xe(o),
    [o, l]
  ), i = X(
    () => l?.max ? l.max(o) : Ee(o),
    [o, l]
  ), [n, s, E, P, S, b] = V(
    Object.values(f)
  ), [T, R, h, k, v, A] = V(
    Object.values(i)
  ), j = X(
    () => ({
      min: {
        isXs: n,
        isSm: s,
        isMd: E,
        isLg: P,
        isXl: S,
        is2Xl: b
      },
      max: {
        isXs: T,
        isSm: R,
        isMd: h,
        isLg: k,
        isXl: v,
        is2Xl: A
      }
    }),
    [
      A,
      k,
      h,
      R,
      v,
      T,
      b,
      P,
      E,
      s,
      S,
      n
    ]
  );
  return /* @__PURE__ */ de.jsx(q.Provider, { value: j, children: t });
};
export {
  _e as BreakpointProvider,
  m as DEFAULT_BREAK_POINTS,
  pe as defaultBreakPointContext,
  d as replacePxInString,
  ve as useBreakPoint
};
