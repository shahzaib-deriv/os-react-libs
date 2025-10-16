var Km = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function T1(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var eh = { exports: {} }, ul = {}, th = { exports: {} }, nh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qm;
function K3() {
  return qm || (qm = 1, (function(e) {
    function n(j, te) {
      var ae = j.length;
      j.push(te);
      e: for (; 0 < ae; ) {
        var Ae = ae - 1 >>> 1, z = j[Ae];
        if (0 < s(z, te))
          j[Ae] = te, j[ae] = z, ae = Ae;
        else break e;
      }
    }
    function i(j) {
      return j.length === 0 ? null : j[0];
    }
    function o(j) {
      if (j.length === 0) return null;
      var te = j[0], ae = j.pop();
      if (ae !== te) {
        j[0] = ae;
        e: for (var Ae = 0, z = j.length, $ = z >>> 1; Ae < $; ) {
          var J = 2 * (Ae + 1) - 1, ne = j[J], ge = J + 1, ze = j[ge];
          if (0 > s(ne, ae))
            ge < z && 0 > s(ze, ne) ? (j[Ae] = ze, j[ge] = ae, Ae = ge) : (j[Ae] = ne, j[J] = ae, Ae = J);
          else if (ge < z && 0 > s(ze, ae))
            j[Ae] = ze, j[ge] = ae, Ae = ge;
          else break e;
        }
      }
      return te;
    }
    function s(j, te) {
      var ae = j.sortIndex - te.sortIndex;
      return ae !== 0 ? ae : j.id - te.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      e.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, d = f.now();
      e.unstable_now = function() {
        return f.now() - d;
      };
    }
    var v = [], g = [], p = 1, m = null, _ = 3, w = !1, C = !1, k = !1, S = !1, E = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    function D(j) {
      for (var te = i(g); te !== null; ) {
        if (te.callback === null) o(g);
        else if (te.startTime <= j)
          o(g), te.sortIndex = te.expirationTime, n(v, te);
        else break;
        te = i(g);
      }
    }
    function L(j) {
      if (k = !1, D(j), !C)
        if (i(v) !== null)
          C = !0, F || (F = !0, ee());
        else {
          var te = i(g);
          te !== null && Oe(L, te.startTime - j);
        }
    }
    var F = !1, Y = -1, ie = 5, X = -1;
    function fe() {
      return S ? !0 : !(e.unstable_now() - X < ie);
    }
    function le() {
      if (S = !1, F) {
        var j = e.unstable_now();
        X = j;
        var te = !0;
        try {
          e: {
            C = !1, k && (k = !1, O(Y), Y = -1), w = !0;
            var ae = _;
            try {
              t: {
                for (D(j), m = i(v); m !== null && !(m.expirationTime > j && fe()); ) {
                  var Ae = m.callback;
                  if (typeof Ae == "function") {
                    m.callback = null, _ = m.priorityLevel;
                    var z = Ae(
                      m.expirationTime <= j
                    );
                    if (j = e.unstable_now(), typeof z == "function") {
                      m.callback = z, D(j), te = !0;
                      break t;
                    }
                    m === i(v) && o(v), D(j);
                  } else o(v);
                  m = i(v);
                }
                if (m !== null) te = !0;
                else {
                  var $ = i(g);
                  $ !== null && Oe(
                    L,
                    $.startTime - j
                  ), te = !1;
                }
              }
              break e;
            } finally {
              m = null, _ = ae, w = !1;
            }
            te = void 0;
          }
        } finally {
          te ? ee() : F = !1;
        }
      }
    }
    var ee;
    if (typeof A == "function")
      ee = function() {
        A(le);
      };
    else if (typeof MessageChannel < "u") {
      var we = new MessageChannel(), Ee = we.port2;
      we.port1.onmessage = le, ee = function() {
        Ee.postMessage(null);
      };
    } else
      ee = function() {
        E(le, 0);
      };
    function Oe(j, te) {
      Y = E(function() {
        j(e.unstable_now());
      }, te);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, e.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ie = 0 < j ? Math.floor(1e3 / j) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return _;
    }, e.unstable_next = function(j) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var te = 3;
          break;
        default:
          te = _;
      }
      var ae = _;
      _ = te;
      try {
        return j();
      } finally {
        _ = ae;
      }
    }, e.unstable_requestPaint = function() {
      S = !0;
    }, e.unstable_runWithPriority = function(j, te) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var ae = _;
      _ = j;
      try {
        return te();
      } finally {
        _ = ae;
      }
    }, e.unstable_scheduleCallback = function(j, te, ae) {
      var Ae = e.unstable_now();
      switch (typeof ae == "object" && ae !== null ? (ae = ae.delay, ae = typeof ae == "number" && 0 < ae ? Ae + ae : Ae) : ae = Ae, j) {
        case 1:
          var z = -1;
          break;
        case 2:
          z = 250;
          break;
        case 5:
          z = 1073741823;
          break;
        case 4:
          z = 1e4;
          break;
        default:
          z = 5e3;
      }
      return z = ae + z, j = {
        id: p++,
        callback: te,
        priorityLevel: j,
        startTime: ae,
        expirationTime: z,
        sortIndex: -1
      }, ae > Ae ? (j.sortIndex = ae, n(g, j), i(v) === null && j === i(g) && (k ? (O(Y), Y = -1) : k = !0, Oe(L, ae - Ae))) : (j.sortIndex = z, n(v, j), C || w || (C = !0, F || (F = !0, ee()))), j;
    }, e.unstable_shouldYield = fe, e.unstable_wrapCallback = function(j) {
      var te = _;
      return function() {
        var ae = _;
        _ = te;
        try {
          return j.apply(this, arguments);
        } finally {
          _ = ae;
        }
      };
    };
  })(nh)), nh;
}
var Gm;
function q3() {
  return Gm || (Gm = 1, th.exports = K3()), th.exports;
}
var rh = { exports: {} }, Te = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pm;
function G3() {
  if (Pm) return Te;
  Pm = 1;
  var e = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), m = Symbol.iterator;
  function _(z) {
    return z === null || typeof z != "object" ? null : (z = m && z[m] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, k = {};
  function S(z, $, J) {
    this.props = z, this.context = $, this.refs = k, this.updater = J || w;
  }
  S.prototype.isReactComponent = {}, S.prototype.setState = function(z, $) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, $, "setState");
  }, S.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function E() {
  }
  E.prototype = S.prototype;
  function O(z, $, J) {
    this.props = z, this.context = $, this.refs = k, this.updater = J || w;
  }
  var A = O.prototype = new E();
  A.constructor = O, C(A, S.prototype), A.isPureReactComponent = !0;
  var D = Array.isArray, L = { H: null, A: null, T: null, S: null, V: null }, F = Object.prototype.hasOwnProperty;
  function Y(z, $, J, ne, ge, ze) {
    return J = ze.ref, {
      $$typeof: e,
      type: z,
      key: $,
      ref: J !== void 0 ? J : null,
      props: ze
    };
  }
  function ie(z, $) {
    return Y(
      z.type,
      $,
      void 0,
      void 0,
      void 0,
      z.props
    );
  }
  function X(z) {
    return typeof z == "object" && z !== null && z.$$typeof === e;
  }
  function fe(z) {
    var $ = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(J) {
      return $[J];
    });
  }
  var le = /\/+/g;
  function ee(z, $) {
    return typeof z == "object" && z !== null && z.key != null ? fe("" + z.key) : $.toString(36);
  }
  function we() {
  }
  function Ee(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(we, we) : (z.status = "pending", z.then(
          function($) {
            z.status === "pending" && (z.status = "fulfilled", z.value = $);
          },
          function($) {
            z.status === "pending" && (z.status = "rejected", z.reason = $);
          }
        )), z.status) {
          case "fulfilled":
            return z.value;
          case "rejected":
            throw z.reason;
        }
    }
    throw z;
  }
  function Oe(z, $, J, ne, ge) {
    var ze = typeof z;
    (ze === "undefined" || ze === "boolean") && (z = null);
    var _e = !1;
    if (z === null) _e = !0;
    else
      switch (ze) {
        case "bigint":
        case "string":
        case "number":
          _e = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case e:
            case n:
              _e = !0;
              break;
            case p:
              return _e = z._init, Oe(
                _e(z._payload),
                $,
                J,
                ne,
                ge
              );
          }
      }
    if (_e)
      return ge = ge(z), _e = ne === "" ? "." + ee(z, 0) : ne, D(ge) ? (J = "", _e != null && (J = _e.replace(le, "$&/") + "/"), Oe(ge, $, J, "", function(Or) {
        return Or;
      })) : ge != null && (X(ge) && (ge = ie(
        ge,
        J + (ge.key == null || z && z.key === ge.key ? "" : ("" + ge.key).replace(
          le,
          "$&/"
        ) + "/") + _e
      )), $.push(ge)), 1;
    _e = 0;
    var tn = ne === "" ? "." : ne + ":";
    if (D(z))
      for (var lt = 0; lt < z.length; lt++)
        ne = z[lt], ze = tn + ee(ne, lt), _e += Oe(
          ne,
          $,
          J,
          ze,
          ge
        );
    else if (lt = _(z), typeof lt == "function")
      for (z = lt.call(z), lt = 0; !(ne = z.next()).done; )
        ne = ne.value, ze = tn + ee(ne, lt++), _e += Oe(
          ne,
          $,
          J,
          ze,
          ge
        );
    else if (ze === "object") {
      if (typeof z.then == "function")
        return Oe(
          Ee(z),
          $,
          J,
          ne,
          ge
        );
      throw $ = String(z), Error(
        "Objects are not valid as a React child (found: " + ($ === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : $) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return _e;
  }
  function j(z, $, J) {
    if (z == null) return z;
    var ne = [], ge = 0;
    return Oe(z, ne, "", "", function(ze) {
      return $.call(J, ze, ge++);
    }), ne;
  }
  function te(z) {
    if (z._status === -1) {
      var $ = z._result;
      $ = $(), $.then(
        function(J) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = J);
        },
        function(J) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = J);
        }
      ), z._status === -1 && (z._status = 0, z._result = $);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var ae = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var $ = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent($)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  };
  function Ae() {
  }
  return Te.Children = {
    map: j,
    forEach: function(z, $, J) {
      j(
        z,
        function() {
          $.apply(this, arguments);
        },
        J
      );
    },
    count: function(z) {
      var $ = 0;
      return j(z, function() {
        $++;
      }), $;
    },
    toArray: function(z) {
      return j(z, function($) {
        return $;
      }) || [];
    },
    only: function(z) {
      if (!X(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  }, Te.Component = S, Te.Fragment = i, Te.Profiler = s, Te.PureComponent = O, Te.StrictMode = o, Te.Suspense = v, Te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, Te.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return L.H.useMemoCache(z);
    }
  }, Te.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, Te.cloneElement = function(z, $, J) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var ne = C({}, z.props), ge = z.key, ze = void 0;
    if ($ != null)
      for (_e in $.ref !== void 0 && (ze = void 0), $.key !== void 0 && (ge = "" + $.key), $)
        !F.call($, _e) || _e === "key" || _e === "__self" || _e === "__source" || _e === "ref" && $.ref === void 0 || (ne[_e] = $[_e]);
    var _e = arguments.length - 2;
    if (_e === 1) ne.children = J;
    else if (1 < _e) {
      for (var tn = Array(_e), lt = 0; lt < _e; lt++)
        tn[lt] = arguments[lt + 2];
      ne.children = tn;
    }
    return Y(z.type, ge, void 0, void 0, ze, ne);
  }, Te.createContext = function(z) {
    return z = {
      $$typeof: f,
      _currentValue: z,
      _currentValue2: z,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, z.Provider = z, z.Consumer = {
      $$typeof: c,
      _context: z
    }, z;
  }, Te.createElement = function(z, $, J) {
    var ne, ge = {}, ze = null;
    if ($ != null)
      for (ne in $.key !== void 0 && (ze = "" + $.key), $)
        F.call($, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (ge[ne] = $[ne]);
    var _e = arguments.length - 2;
    if (_e === 1) ge.children = J;
    else if (1 < _e) {
      for (var tn = Array(_e), lt = 0; lt < _e; lt++)
        tn[lt] = arguments[lt + 2];
      ge.children = tn;
    }
    if (z && z.defaultProps)
      for (ne in _e = z.defaultProps, _e)
        ge[ne] === void 0 && (ge[ne] = _e[ne]);
    return Y(z, ze, void 0, void 0, null, ge);
  }, Te.createRef = function() {
    return { current: null };
  }, Te.forwardRef = function(z) {
    return { $$typeof: d, render: z };
  }, Te.isValidElement = X, Te.lazy = function(z) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: z },
      _init: te
    };
  }, Te.memo = function(z, $) {
    return {
      $$typeof: g,
      type: z,
      compare: $ === void 0 ? null : $
    };
  }, Te.startTransition = function(z) {
    var $ = L.T, J = {};
    L.T = J;
    try {
      var ne = z(), ge = L.S;
      ge !== null && ge(J, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(Ae, ae);
    } catch (ze) {
      ae(ze);
    } finally {
      L.T = $;
    }
  }, Te.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, Te.use = function(z) {
    return L.H.use(z);
  }, Te.useActionState = function(z, $, J) {
    return L.H.useActionState(z, $, J);
  }, Te.useCallback = function(z, $) {
    return L.H.useCallback(z, $);
  }, Te.useContext = function(z) {
    return L.H.useContext(z);
  }, Te.useDebugValue = function() {
  }, Te.useDeferredValue = function(z, $) {
    return L.H.useDeferredValue(z, $);
  }, Te.useEffect = function(z, $, J) {
    var ne = L.H;
    if (typeof J == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return ne.useEffect(z, $);
  }, Te.useId = function() {
    return L.H.useId();
  }, Te.useImperativeHandle = function(z, $, J) {
    return L.H.useImperativeHandle(z, $, J);
  }, Te.useInsertionEffect = function(z, $) {
    return L.H.useInsertionEffect(z, $);
  }, Te.useLayoutEffect = function(z, $) {
    return L.H.useLayoutEffect(z, $);
  }, Te.useMemo = function(z, $) {
    return L.H.useMemo(z, $);
  }, Te.useOptimistic = function(z, $) {
    return L.H.useOptimistic(z, $);
  }, Te.useReducer = function(z, $, J) {
    return L.H.useReducer(z, $, J);
  }, Te.useRef = function(z) {
    return L.H.useRef(z);
  }, Te.useState = function(z) {
    return L.H.useState(z);
  }, Te.useSyncExternalStore = function(z, $, J) {
    return L.H.useSyncExternalStore(
      z,
      $,
      J
    );
  }, Te.useTransition = function() {
    return L.H.useTransition();
  }, Te.version = "19.1.1", Te;
}
var Im;
function l0() {
  return Im || (Im = 1, rh.exports = G3()), rh.exports;
}
var ih = { exports: {} }, jt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ym;
function P3() {
  if (Ym) return jt;
  Ym = 1;
  var e = l0();
  function n(v) {
    var g = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++)
        g += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return "Minified React error #" + v + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var o = {
    d: {
      f: i,
      r: function() {
        throw Error(n(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal");
  function c(v, g, p) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: m == null ? null : "" + m,
      children: v,
      containerInfo: g,
      implementation: p
    };
  }
  var f = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(v, g) {
    if (v === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return jt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, jt.createPortal = function(v, g) {
    var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(n(299));
    return c(v, g, null, p);
  }, jt.flushSync = function(v) {
    var g = f.T, p = o.p;
    try {
      if (f.T = null, o.p = 2, v) return v();
    } finally {
      f.T = g, o.p = p, o.d.f();
    }
  }, jt.preconnect = function(v, g) {
    typeof v == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(v, g));
  }, jt.prefetchDNS = function(v) {
    typeof v == "string" && o.d.D(v);
  }, jt.preinit = function(v, g) {
    if (typeof v == "string" && g && typeof g.as == "string") {
      var p = g.as, m = d(p, g.crossOrigin), _ = typeof g.integrity == "string" ? g.integrity : void 0, w = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      p === "style" ? o.d.S(
        v,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: m,
          integrity: _,
          fetchPriority: w
        }
      ) : p === "script" && o.d.X(v, {
        crossOrigin: m,
        integrity: _,
        fetchPriority: w,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, jt.preinitModule = function(v, g) {
    if (typeof v == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var p = d(
            g.as,
            g.crossOrigin
          );
          o.d.M(v, {
            crossOrigin: p,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && o.d.M(v);
  }, jt.preload = function(v, g) {
    if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var p = g.as, m = d(p, g.crossOrigin);
      o.d.L(v, p, {
        crossOrigin: m,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, jt.preloadModule = function(v, g) {
    if (typeof v == "string")
      if (g) {
        var p = d(g.as, g.crossOrigin);
        o.d.m(v, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: p,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else o.d.m(v);
  }, jt.requestFormReset = function(v) {
    o.d.r(v);
  }, jt.unstable_batchedUpdates = function(v, g) {
    return v(g);
  }, jt.useFormState = function(v, g, p) {
    return f.H.useFormState(v, g, p);
  }, jt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, jt.version = "19.1.1", jt;
}
var Zm;
function N1() {
  if (Zm) return ih.exports;
  Zm = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return e(), ih.exports = P3(), ih.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xm;
function I3() {
  if (Xm) return ul;
  Xm = 1;
  var e = q3(), n = l0(), i = N1();
  function o(t) {
    var r = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      r += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        r += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function c(t) {
    var r = t, a = t;
    if (t.alternate) for (; r.return; ) r = r.return;
    else {
      t = r;
      do
        r = t, (r.flags & 4098) !== 0 && (a = r.return), t = r.return;
      while (t);
    }
    return r.tag === 3 ? a : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r === null && (t = t.alternate, t !== null && (r = t.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (c(t) !== t)
      throw Error(o(188));
  }
  function v(t) {
    var r = t.alternate;
    if (!r) {
      if (r = c(t), r === null) throw Error(o(188));
      return r !== t ? null : t;
    }
    for (var a = t, l = r; ; ) {
      var u = a.return;
      if (u === null) break;
      var h = u.alternate;
      if (h === null) {
        if (l = u.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (u.child === h.child) {
        for (h = u.child; h; ) {
          if (h === a) return d(u), t;
          if (h === l) return d(u), r;
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== l.return) a = u, l = h;
      else {
        for (var y = !1, x = u.child; x; ) {
          if (x === a) {
            y = !0, a = u, l = h;
            break;
          }
          if (x === l) {
            y = !0, l = u, a = h;
            break;
          }
          x = x.sibling;
        }
        if (!y) {
          for (x = h.child; x; ) {
            if (x === a) {
              y = !0, a = h, l = u;
              break;
            }
            if (x === l) {
              y = !0, l = h, a = u;
              break;
            }
            x = x.sibling;
          }
          if (!y) throw Error(o(189));
        }
      }
      if (a.alternate !== l) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? t : r;
  }
  function g(t) {
    var r = t.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return t;
    for (t = t.child; t !== null; ) {
      if (r = g(t), r !== null) return r;
      t = t.sibling;
    }
    return null;
  }
  var p = Object.assign, m = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), O = Symbol.for("react.consumer"), A = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), fe = Symbol.for("react.memo_cache_sentinel"), le = Symbol.iterator;
  function ee(t) {
    return t === null || typeof t != "object" ? null : (t = le && t[le] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var we = Symbol.for("react.client.reference");
  function Ee(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === we ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case S:
        return "Profiler";
      case k:
        return "StrictMode";
      case L:
        return "Suspense";
      case F:
        return "SuspenseList";
      case X:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case A:
          return (t.displayName || "Context") + ".Provider";
        case O:
          return (t._context.displayName || "Context") + ".Consumer";
        case D:
          var r = t.render;
          return t = t.displayName, t || (t = r.displayName || r.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Y:
          return r = t.displayName || null, r !== null ? r : Ee(t.type) || "Memo";
        case ie:
          r = t._payload, t = t._init;
          try {
            return Ee(t(r));
          } catch {
          }
      }
    return null;
  }
  var Oe = Array.isArray, j = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ae = [], z = -1;
  function $(t) {
    return { current: t };
  }
  function J(t) {
    0 > z || (t.current = Ae[z], Ae[z] = null, z--);
  }
  function ne(t, r) {
    z++, Ae[z] = t.current, t.current = r;
  }
  var ge = $(null), ze = $(null), _e = $(null), tn = $(null);
  function lt(t, r) {
    switch (ne(_e, r), ne(ze, t), ne(ge, null), r.nodeType) {
      case 9:
      case 11:
        t = (t = r.documentElement) && (t = t.namespaceURI) ? pm(t) : 0;
        break;
      default:
        if (t = r.tagName, r = r.namespaceURI)
          r = pm(r), t = mm(r, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    J(ge), ne(ge, t);
  }
  function Or() {
    J(ge), J(ze), J(_e);
  }
  function Bu(t) {
    t.memoizedState !== null && ne(tn, t);
    var r = ge.current, a = mm(r, t.type);
    r !== a && (ne(ze, t), ne(ge, a));
  }
  function Gl(t) {
    ze.current === t && (J(ge), J(ze)), tn.current === t && (J(tn), al._currentValue = ae);
  }
  var Vu = Object.prototype.hasOwnProperty, ju = e.unstable_scheduleCallback, $u = e.unstable_cancelCallback, ww = e.unstable_shouldYield, _w = e.unstable_requestPaint, Hn = e.unstable_now, xw = e.unstable_getCurrentPriorityLevel, Q0 = e.unstable_ImmediatePriority, F0 = e.unstable_UserBlockingPriority, Pl = e.unstable_NormalPriority, Sw = e.unstable_LowPriority, W0 = e.unstable_IdlePriority, Cw = e.log, kw = e.unstable_setDisableYieldValue, ho = null, nn = null;
  function zr(t) {
    if (typeof Cw == "function" && kw(t), nn && typeof nn.setStrictMode == "function")
      try {
        nn.setStrictMode(ho, t);
      } catch {
      }
  }
  var rn = Math.clz32 ? Math.clz32 : Tw, Aw = Math.log, Ew = Math.LN2;
  function Tw(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Aw(t) / Ew | 0) | 0;
  }
  var Il = 256, Yl = 4194304;
  function di(t) {
    var r = t & 42;
    if (r !== 0) return r;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Zl(t, r, a) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var u = 0, h = t.suspendedLanes, y = t.pingedLanes;
    t = t.warmLanes;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~h, l !== 0 ? u = di(l) : (y &= x, y !== 0 ? u = di(y) : a || (a = x & ~t, a !== 0 && (u = di(a))))) : (x = l & ~h, x !== 0 ? u = di(x) : y !== 0 ? u = di(y) : a || (a = l & ~t, a !== 0 && (u = di(a)))), u === 0 ? 0 : r !== 0 && r !== u && (r & h) === 0 && (h = u & -u, a = r & -r, h >= a || h === 32 && (a & 4194048) !== 0) ? r : u;
  }
  function vo(t, r) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & r) === 0;
  }
  function Nw(t, r) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return r + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function J0() {
    var t = Il;
    return Il <<= 1, (Il & 4194048) === 0 && (Il = 256), t;
  }
  function ev() {
    var t = Yl;
    return Yl <<= 1, (Yl & 62914560) === 0 && (Yl = 4194304), t;
  }
  function Ku(t) {
    for (var r = [], a = 0; 31 > a; a++) r.push(t);
    return r;
  }
  function go(t, r) {
    t.pendingLanes |= r, r !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ow(t, r, a, l, u, h) {
    var y = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var x = t.entanglements, T = t.expirationTimes, H = t.hiddenUpdates;
    for (a = y & ~a; 0 < a; ) {
      var q = 31 - rn(a), I = 1 << q;
      x[q] = 0, T[q] = -1;
      var B = H[q];
      if (B !== null)
        for (H[q] = null, q = 0; q < B.length; q++) {
          var V = B[q];
          V !== null && (V.lane &= -536870913);
        }
      a &= ~I;
    }
    l !== 0 && tv(t, l, 0), h !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(y & ~r));
  }
  function tv(t, r, a) {
    t.pendingLanes |= r, t.suspendedLanes &= ~r;
    var l = 31 - rn(r);
    t.entangledLanes |= r, t.entanglements[l] = t.entanglements[l] | 1073741824 | a & 4194090;
  }
  function nv(t, r) {
    var a = t.entangledLanes |= r;
    for (t = t.entanglements; a; ) {
      var l = 31 - rn(a), u = 1 << l;
      u & r | t[l] & r && (t[l] |= r), a &= ~u;
    }
  }
  function qu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Gu(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function rv() {
    var t = te.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Um(t.type));
  }
  function zw(t, r) {
    var a = te.p;
    try {
      return te.p = t, r();
    } finally {
      te.p = a;
    }
  }
  var Mr = Math.random().toString(36).slice(2), Bt = "__reactFiber$" + Mr, It = "__reactProps$" + Mr, Fi = "__reactContainer$" + Mr, Pu = "__reactEvents$" + Mr, Mw = "__reactListeners$" + Mr, Dw = "__reactHandles$" + Mr, iv = "__reactResources$" + Mr, po = "__reactMarker$" + Mr;
  function Iu(t) {
    delete t[Bt], delete t[It], delete t[Pu], delete t[Mw], delete t[Dw];
  }
  function Wi(t) {
    var r = t[Bt];
    if (r) return r;
    for (var a = t.parentNode; a; ) {
      if (r = a[Fi] || a[Bt]) {
        if (a = r.alternate, r.child !== null || a !== null && a.child !== null)
          for (t = _m(t); t !== null; ) {
            if (a = t[Bt]) return a;
            t = _m(t);
          }
        return r;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function Ji(t) {
    if (t = t[Bt] || t[Fi]) {
      var r = t.tag;
      if (r === 5 || r === 6 || r === 13 || r === 26 || r === 27 || r === 3)
        return t;
    }
    return null;
  }
  function mo(t) {
    var r = t.tag;
    if (r === 5 || r === 26 || r === 27 || r === 6) return t.stateNode;
    throw Error(o(33));
  }
  function ea(t) {
    var r = t[iv];
    return r || (r = t[iv] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), r;
  }
  function Et(t) {
    t[po] = !0;
  }
  var av = /* @__PURE__ */ new Set(), ov = {};
  function hi(t, r) {
    ta(t, r), ta(t + "Capture", r);
  }
  function ta(t, r) {
    for (ov[t] = r, t = 0; t < r.length; t++)
      av.add(r[t]);
  }
  var Rw = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), lv = {}, sv = {};
  function Lw(t) {
    return Vu.call(sv, t) ? !0 : Vu.call(lv, t) ? !1 : Rw.test(t) ? sv[t] = !0 : (lv[t] = !0, !1);
  }
  function Xl(t, r, a) {
    if (Lw(r))
      if (a === null) t.removeAttribute(r);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(r);
            return;
          case "boolean":
            var l = r.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(r);
              return;
            }
        }
        t.setAttribute(r, "" + a);
      }
  }
  function Ql(t, r, a) {
    if (a === null) t.removeAttribute(r);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttribute(r, "" + a);
    }
  }
  function ir(t, r, a, l) {
    if (l === null) t.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(r, a, "" + l);
    }
  }
  var Yu, cv;
  function na(t) {
    if (Yu === void 0)
      try {
        throw Error();
      } catch (a) {
        var r = a.stack.trim().match(/\n( *(at )?)/);
        Yu = r && r[1] || "", cv = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Yu + t + cv;
  }
  var Zu = !1;
  function Xu(t, r) {
    if (!t || Zu) return "";
    Zu = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (r) {
              var I = function() {
                throw Error();
              };
              if (Object.defineProperty(I.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(I, []);
                } catch (V) {
                  var B = V;
                }
                Reflect.construct(t, [], I);
              } else {
                try {
                  I.call();
                } catch (V) {
                  B = V;
                }
                t.call(I.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                B = V;
              }
              (I = t()) && typeof I.catch == "function" && I.catch(function() {
              });
            }
          } catch (V) {
            if (V && B && typeof V.stack == "string")
              return [V.stack, B.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = l.DetermineComponentFrameRoot(), y = h[0], x = h[1];
      if (y && x) {
        var T = y.split(`
`), H = x.split(`
`);
        for (u = l = 0; l < T.length && !T[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < H.length && !H[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === T.length || u === H.length)
          for (l = T.length - 1, u = H.length - 1; 1 <= l && 0 <= u && T[l] !== H[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (T[l] !== H[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || T[l] !== H[u]) {
                  var q = `
` + T[l].replace(" at new ", " at ");
                  return t.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", t.displayName)), q;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Zu = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? na(a) : "";
  }
  function Uw(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return na(t.type);
      case 16:
        return na("Lazy");
      case 13:
        return na("Suspense");
      case 19:
        return na("SuspenseList");
      case 0:
      case 15:
        return Xu(t.type, !1);
      case 11:
        return Xu(t.type.render, !1);
      case 1:
        return Xu(t.type, !0);
      case 31:
        return na("Activity");
      default:
        return "";
    }
  }
  function uv(t) {
    try {
      var r = "";
      do
        r += Uw(t), t = t.return;
      while (t);
      return r;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function hn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function fv(t) {
    var r = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Hw(t) {
    var r = fv(t) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      r
    ), l = "" + t[r];
    if (!t.hasOwnProperty(r) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, h = a.set;
      return Object.defineProperty(t, r, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          l = "" + y, h.call(this, y);
        }
      }), Object.defineProperty(t, r, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(y) {
          l = "" + y;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[r];
        }
      };
    }
  }
  function Fl(t) {
    t._valueTracker || (t._valueTracker = Hw(t));
  }
  function dv(t) {
    if (!t) return !1;
    var r = t._valueTracker;
    if (!r) return !0;
    var a = r.getValue(), l = "";
    return t && (l = fv(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== a ? (r.setValue(t), !0) : !1;
  }
  function Wl(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Bw = /[\n"\\]/g;
  function vn(t) {
    return t.replace(
      Bw,
      function(r) {
        return "\\" + r.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qu(t, r, a, l, u, h, y, x) {
    t.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.type = y : t.removeAttribute("type"), r != null ? y === "number" ? (r === 0 && t.value === "" || t.value != r) && (t.value = "" + hn(r)) : t.value !== "" + hn(r) && (t.value = "" + hn(r)) : y !== "submit" && y !== "reset" || t.removeAttribute("value"), r != null ? Fu(t, y, hn(r)) : a != null ? Fu(t, y, hn(a)) : l != null && t.removeAttribute("value"), u == null && h != null && (t.defaultChecked = !!h), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.name = "" + hn(x) : t.removeAttribute("name");
  }
  function hv(t, r, a, l, u, h, y, x) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), r != null || a != null) {
      if (!(h !== "submit" && h !== "reset" || r != null))
        return;
      a = a != null ? "" + hn(a) : "", r = r != null ? "" + hn(r) : a, x || r === t.value || (t.value = r), t.defaultValue = r;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = x ? t.checked : !!l, t.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (t.name = y);
  }
  function Fu(t, r, a) {
    r === "number" && Wl(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
  }
  function ra(t, r, a, l) {
    if (t = t.options, r) {
      r = {};
      for (var u = 0; u < a.length; u++)
        r["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        u = r.hasOwnProperty("$" + t[a].value), t[a].selected !== u && (t[a].selected = u), u && l && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + hn(a), r = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          t[u].selected = !0, l && (t[u].defaultSelected = !0);
          return;
        }
        r !== null || t[u].disabled || (r = t[u]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function vv(t, r, a) {
    if (r != null && (r = "" + hn(r), r !== t.value && (t.value = r), a == null)) {
      t.defaultValue !== r && (t.defaultValue = r);
      return;
    }
    t.defaultValue = a != null ? "" + hn(a) : "";
  }
  function gv(t, r, a, l) {
    if (r == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (Oe(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), r = a;
    }
    a = hn(r), t.defaultValue = a, l = t.textContent, l === a && l !== "" && l !== null && (t.value = l);
  }
  function ia(t, r) {
    if (r) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = r;
        return;
      }
    }
    t.textContent = r;
  }
  var Vw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function pv(t, r, a) {
    var l = r.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? t.setProperty(r, "") : r === "float" ? t.cssFloat = "" : t[r] = "" : l ? t.setProperty(r, a) : typeof a != "number" || a === 0 || Vw.has(r) ? r === "float" ? t.cssFloat = a : t[r] = ("" + a).trim() : t[r] = a + "px";
  }
  function mv(t, r, a) {
    if (r != null && typeof r != "object")
      throw Error(o(62));
    if (t = t.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || r != null && r.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var u in r)
        l = r[u], r.hasOwnProperty(u) && a[u] !== l && pv(t, u, l);
    } else
      for (var h in r)
        r.hasOwnProperty(h) && pv(t, h, r[h]);
  }
  function Wu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var jw = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), $w = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jl(t) {
    return $w.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var Ju = null;
  function ef(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var aa = null, oa = null;
  function yv(t) {
    var r = Ji(t);
    if (r && (t = r.stateNode)) {
      var a = t[It] || null;
      e: switch (t = r.stateNode, r.type) {
        case "input":
          if (Qu(
            t,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), r = a.name, a.type === "radio" && r != null) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + vn(
                "" + r
              ) + '"][type="radio"]'
            ), r = 0; r < a.length; r++) {
              var l = a[r];
              if (l !== t && l.form === t.form) {
                var u = l[It] || null;
                if (!u) throw Error(o(90));
                Qu(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (r = 0; r < a.length; r++)
              l = a[r], l.form === t.form && dv(l);
          }
          break e;
        case "textarea":
          vv(t, a.value, a.defaultValue);
          break e;
        case "select":
          r = a.value, r != null && ra(t, !!a.multiple, r, !1);
      }
    }
  }
  var tf = !1;
  function bv(t, r, a) {
    if (tf) return t(r, a);
    tf = !0;
    try {
      var l = t(r);
      return l;
    } finally {
      if (tf = !1, (aa !== null || oa !== null) && (Bs(), aa && (r = aa, t = oa, oa = aa = null, yv(r), t)))
        for (r = 0; r < t.length; r++) yv(t[r]);
    }
  }
  function yo(t, r) {
    var a = t.stateNode;
    if (a === null) return null;
    var l = a[It] || null;
    if (l === null) return null;
    a = l[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function")
      throw Error(
        o(231, r, typeof a)
      );
    return a;
  }
  var ar = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nf = !1;
  if (ar)
    try {
      var bo = {};
      Object.defineProperty(bo, "passive", {
        get: function() {
          nf = !0;
        }
      }), window.addEventListener("test", bo, bo), window.removeEventListener("test", bo, bo);
    } catch {
      nf = !1;
    }
  var Dr = null, rf = null, es = null;
  function wv() {
    if (es) return es;
    var t, r = rf, a = r.length, l, u = "value" in Dr ? Dr.value : Dr.textContent, h = u.length;
    for (t = 0; t < a && r[t] === u[t]; t++) ;
    var y = a - t;
    for (l = 1; l <= y && r[a - l] === u[h - l]; l++) ;
    return es = u.slice(t, 1 < l ? 1 - l : void 0);
  }
  function ts(t) {
    var r = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && r === 13 && (t = 13)) : t = r, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ns() {
    return !0;
  }
  function _v() {
    return !1;
  }
  function Yt(t) {
    function r(a, l, u, h, y) {
      this._reactName = a, this._targetInst = u, this.type = l, this.nativeEvent = h, this.target = y, this.currentTarget = null;
      for (var x in t)
        t.hasOwnProperty(x) && (a = t[x], this[x] = a ? a(h) : h[x]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? ns : _v, this.isPropagationStopped = _v, this;
    }
    return p(r.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ns);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ns);
      },
      persist: function() {
      },
      isPersistent: ns
    }), r;
  }
  var vi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, rs = Yt(vi), wo = p({}, vi, { view: 0, detail: 0 }), Kw = Yt(wo), af, of, _o, is = p({}, wo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: sf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== _o && (_o && t.type === "mousemove" ? (af = t.screenX - _o.screenX, of = t.screenY - _o.screenY) : of = af = 0, _o = t), af);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : of;
    }
  }), xv = Yt(is), qw = p({}, is, { dataTransfer: 0 }), Gw = Yt(qw), Pw = p({}, wo, { relatedTarget: 0 }), lf = Yt(Pw), Iw = p({}, vi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yw = Yt(Iw), Zw = p({}, vi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Xw = Yt(Zw), Qw = p({}, vi, { data: 0 }), Sv = Yt(Qw), Fw = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ww = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Jw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function e5(t) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(t) : (t = Jw[t]) ? !!r[t] : !1;
  }
  function sf() {
    return e5;
  }
  var t5 = p({}, wo, {
    key: function(t) {
      if (t.key) {
        var r = Fw[t.key] || t.key;
        if (r !== "Unidentified") return r;
      }
      return t.type === "keypress" ? (t = ts(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Ww[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: sf,
    charCode: function(t) {
      return t.type === "keypress" ? ts(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ts(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), n5 = Yt(t5), r5 = p({}, is, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Cv = Yt(r5), i5 = p({}, wo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sf
  }), a5 = Yt(i5), o5 = p({}, vi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), l5 = Yt(o5), s5 = p({}, is, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), c5 = Yt(s5), u5 = p({}, vi, {
    newState: 0,
    oldState: 0
  }), f5 = Yt(u5), d5 = [9, 13, 27, 32], cf = ar && "CompositionEvent" in window, xo = null;
  ar && "documentMode" in document && (xo = document.documentMode);
  var h5 = ar && "TextEvent" in window && !xo, kv = ar && (!cf || xo && 8 < xo && 11 >= xo), Av = " ", Ev = !1;
  function Tv(t, r) {
    switch (t) {
      case "keyup":
        return d5.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Nv(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var la = !1;
  function v5(t, r) {
    switch (t) {
      case "compositionend":
        return Nv(r);
      case "keypress":
        return r.which !== 32 ? null : (Ev = !0, Av);
      case "textInput":
        return t = r.data, t === Av && Ev ? null : t;
      default:
        return null;
    }
  }
  function g5(t, r) {
    if (la)
      return t === "compositionend" || !cf && Tv(t, r) ? (t = wv(), es = rf = Dr = null, la = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length)
            return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return kv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var p5 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Ov(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r === "input" ? !!p5[t.type] : r === "textarea";
  }
  function zv(t, r, a, l) {
    aa ? oa ? oa.push(l) : oa = [l] : aa = l, r = Gs(r, "onChange"), 0 < r.length && (a = new rs(
      "onChange",
      "change",
      null,
      a,
      l
    ), t.push({ event: a, listeners: r }));
  }
  var So = null, Co = null;
  function m5(t) {
    fm(t, 0);
  }
  function as(t) {
    var r = mo(t);
    if (dv(r)) return t;
  }
  function Mv(t, r) {
    if (t === "change") return r;
  }
  var Dv = !1;
  if (ar) {
    var uf;
    if (ar) {
      var ff = "oninput" in document;
      if (!ff) {
        var Rv = document.createElement("div");
        Rv.setAttribute("oninput", "return;"), ff = typeof Rv.oninput == "function";
      }
      uf = ff;
    } else uf = !1;
    Dv = uf && (!document.documentMode || 9 < document.documentMode);
  }
  function Lv() {
    So && (So.detachEvent("onpropertychange", Uv), Co = So = null);
  }
  function Uv(t) {
    if (t.propertyName === "value" && as(Co)) {
      var r = [];
      zv(
        r,
        Co,
        t,
        ef(t)
      ), bv(m5, r);
    }
  }
  function y5(t, r, a) {
    t === "focusin" ? (Lv(), So = r, Co = a, So.attachEvent("onpropertychange", Uv)) : t === "focusout" && Lv();
  }
  function b5(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return as(Co);
  }
  function w5(t, r) {
    if (t === "click") return as(r);
  }
  function _5(t, r) {
    if (t === "input" || t === "change")
      return as(r);
  }
  function x5(t, r) {
    return t === r && (t !== 0 || 1 / t === 1 / r) || t !== t && r !== r;
  }
  var an = typeof Object.is == "function" ? Object.is : x5;
  function ko(t, r) {
    if (an(t, r)) return !0;
    if (typeof t != "object" || t === null || typeof r != "object" || r === null)
      return !1;
    var a = Object.keys(t), l = Object.keys(r);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var u = a[l];
      if (!Vu.call(r, u) || !an(t[u], r[u]))
        return !1;
    }
    return !0;
  }
  function Hv(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Bv(t, r) {
    var a = Hv(t);
    t = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = t + a.textContent.length, t <= r && l >= r)
          return { node: a, offset: r - t };
        t = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Hv(a);
    }
  }
  function Vv(t, r) {
    return t && r ? t === r ? !0 : t && t.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Vv(t, r.parentNode) : "contains" in t ? t.contains(r) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function jv(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var r = Wl(t.document); r instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof r.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = r.contentWindow;
      else break;
      r = Wl(t.document);
    }
    return r;
  }
  function df(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r && (r === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || r === "textarea" || t.contentEditable === "true");
  }
  var S5 = ar && "documentMode" in document && 11 >= document.documentMode, sa = null, hf = null, Ao = null, vf = !1;
  function $v(t, r, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    vf || sa == null || sa !== Wl(l) || (l = sa, "selectionStart" in l && df(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ao && ko(Ao, l) || (Ao = l, l = Gs(hf, "onSelect"), 0 < l.length && (r = new rs(
      "onSelect",
      "select",
      null,
      r,
      a
    ), t.push({ event: r, listeners: l }), r.target = sa)));
  }
  function gi(t, r) {
    var a = {};
    return a[t.toLowerCase()] = r.toLowerCase(), a["Webkit" + t] = "webkit" + r, a["Moz" + t] = "moz" + r, a;
  }
  var ca = {
    animationend: gi("Animation", "AnimationEnd"),
    animationiteration: gi("Animation", "AnimationIteration"),
    animationstart: gi("Animation", "AnimationStart"),
    transitionrun: gi("Transition", "TransitionRun"),
    transitionstart: gi("Transition", "TransitionStart"),
    transitioncancel: gi("Transition", "TransitionCancel"),
    transitionend: gi("Transition", "TransitionEnd")
  }, gf = {}, Kv = {};
  ar && (Kv = document.createElement("div").style, "AnimationEvent" in window || (delete ca.animationend.animation, delete ca.animationiteration.animation, delete ca.animationstart.animation), "TransitionEvent" in window || delete ca.transitionend.transition);
  function pi(t) {
    if (gf[t]) return gf[t];
    if (!ca[t]) return t;
    var r = ca[t], a;
    for (a in r)
      if (r.hasOwnProperty(a) && a in Kv)
        return gf[t] = r[a];
    return t;
  }
  var qv = pi("animationend"), Gv = pi("animationiteration"), Pv = pi("animationstart"), C5 = pi("transitionrun"), k5 = pi("transitionstart"), A5 = pi("transitioncancel"), Iv = pi("transitionend"), Yv = /* @__PURE__ */ new Map(), pf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pf.push("scrollEnd");
  function En(t, r) {
    Yv.set(t, r), hi(r, [t]);
  }
  var Zv = /* @__PURE__ */ new WeakMap();
  function gn(t, r) {
    if (typeof t == "object" && t !== null) {
      var a = Zv.get(t);
      return a !== void 0 ? a : (r = {
        value: t,
        source: r,
        stack: uv(r)
      }, Zv.set(t, r), r);
    }
    return {
      value: t,
      source: r,
      stack: uv(r)
    };
  }
  var pn = [], ua = 0, mf = 0;
  function os() {
    for (var t = ua, r = mf = ua = 0; r < t; ) {
      var a = pn[r];
      pn[r++] = null;
      var l = pn[r];
      pn[r++] = null;
      var u = pn[r];
      pn[r++] = null;
      var h = pn[r];
      if (pn[r++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      h !== 0 && Xv(a, u, h);
    }
  }
  function ls(t, r, a, l) {
    pn[ua++] = t, pn[ua++] = r, pn[ua++] = a, pn[ua++] = l, mf |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function yf(t, r, a, l) {
    return ls(t, r, a, l), ss(t);
  }
  function fa(t, r) {
    return ls(t, null, null, r), ss(t);
  }
  function Xv(t, r, a) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a);
    for (var u = !1, h = t.return; h !== null; )
      h.childLanes |= a, l = h.alternate, l !== null && (l.childLanes |= a), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (u = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, u && r !== null && (u = 31 - rn(a), t = h.hiddenUpdates, l = t[u], l === null ? t[u] = [r] : l.push(r), r.lane = a | 536870912), h) : null;
  }
  function ss(t) {
    if (50 < Fo)
      throw Fo = 0, Cd = null, Error(o(185));
    for (var r = t.return; r !== null; )
      t = r, r = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var da = {};
  function E5(t, r, a, l) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function on(t, r, a, l) {
    return new E5(t, r, a, l);
  }
  function bf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function or(t, r) {
    var a = t.alternate;
    return a === null ? (a = on(
      t.tag,
      r,
      t.key,
      t.mode
    ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = r, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 65011712, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, r = t.dependencies, a.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
  }
  function Qv(t, r) {
    t.flags &= 65011714;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = r, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, r = a.dependencies, t.dependencies = r === null ? null : {
      lanes: r.lanes,
      firstContext: r.firstContext
    }), t;
  }
  function cs(t, r, a, l, u, h) {
    var y = 0;
    if (l = t, typeof t == "function") bf(t) && (y = 1);
    else if (typeof t == "string")
      y = N3(
        t,
        a,
        ge.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case X:
          return t = on(31, a, r, u), t.elementType = X, t.lanes = h, t;
        case C:
          return mi(a.children, u, h, r);
        case k:
          y = 8, u |= 24;
          break;
        case S:
          return t = on(12, a, r, u | 2), t.elementType = S, t.lanes = h, t;
        case L:
          return t = on(13, a, r, u), t.elementType = L, t.lanes = h, t;
        case F:
          return t = on(19, a, r, u), t.elementType = F, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case E:
              case A:
                y = 10;
                break e;
              case O:
                y = 9;
                break e;
              case D:
                y = 11;
                break e;
              case Y:
                y = 14;
                break e;
              case ie:
                y = 16, l = null;
                break e;
            }
          y = 29, a = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return r = on(y, a, r, u), r.elementType = t, r.type = l, r.lanes = h, r;
  }
  function mi(t, r, a, l) {
    return t = on(7, t, l, r), t.lanes = a, t;
  }
  function wf(t, r, a) {
    return t = on(6, t, null, r), t.lanes = a, t;
  }
  function _f(t, r, a) {
    return r = on(
      4,
      t.children !== null ? t.children : [],
      t.key,
      r
    ), r.lanes = a, r.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, r;
  }
  var ha = [], va = 0, us = null, fs = 0, mn = [], yn = 0, yi = null, lr = 1, sr = "";
  function bi(t, r) {
    ha[va++] = fs, ha[va++] = us, us = t, fs = r;
  }
  function Fv(t, r, a) {
    mn[yn++] = lr, mn[yn++] = sr, mn[yn++] = yi, yi = t;
    var l = lr;
    t = sr;
    var u = 32 - rn(l) - 1;
    l &= ~(1 << u), a += 1;
    var h = 32 - rn(r) + u;
    if (30 < h) {
      var y = u - u % 5;
      h = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, lr = 1 << 32 - rn(r) + u | a << u | l, sr = h + t;
    } else
      lr = 1 << h | a << u | l, sr = t;
  }
  function xf(t) {
    t.return !== null && (bi(t, 1), Fv(t, 1, 0));
  }
  function Sf(t) {
    for (; t === us; )
      us = ha[--va], ha[va] = null, fs = ha[--va], ha[va] = null;
    for (; t === yi; )
      yi = mn[--yn], mn[yn] = null, sr = mn[--yn], mn[yn] = null, lr = mn[--yn], mn[yn] = null;
  }
  var Gt = null, ht = null, Ge = !1, wi = null, Bn = !1, Cf = Error(o(519));
  function _i(t) {
    var r = Error(o(418, ""));
    throw No(gn(r, t)), Cf;
  }
  function Wv(t) {
    var r = t.stateNode, a = t.type, l = t.memoizedProps;
    switch (r[Bt] = t, r[It] = l, a) {
      case "dialog":
        Le("cancel", r), Le("close", r);
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", r);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Jo.length; a++)
          Le(Jo[a], r);
        break;
      case "source":
        Le("error", r);
        break;
      case "img":
      case "image":
      case "link":
        Le("error", r), Le("load", r);
        break;
      case "details":
        Le("toggle", r);
        break;
      case "input":
        Le("invalid", r), hv(
          r,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), Fl(r);
        break;
      case "select":
        Le("invalid", r);
        break;
      case "textarea":
        Le("invalid", r), gv(r, l.value, l.defaultValue, l.children), Fl(r);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || r.textContent === "" + a || l.suppressHydrationWarning === !0 || gm(r.textContent, a) ? (l.popover != null && (Le("beforetoggle", r), Le("toggle", r)), l.onScroll != null && Le("scroll", r), l.onScrollEnd != null && Le("scrollend", r), l.onClick != null && (r.onclick = Ps), r = !0) : r = !1, r || _i(t);
  }
  function Jv(t) {
    for (Gt = t.return; Gt; )
      switch (Gt.tag) {
        case 5:
        case 13:
          Bn = !1;
          return;
        case 27:
        case 3:
          Bn = !0;
          return;
        default:
          Gt = Gt.return;
      }
  }
  function Eo(t) {
    if (t !== Gt) return !1;
    if (!Ge) return Jv(t), Ge = !0, !1;
    var r = t.tag, a;
    if ((a = r !== 3 && r !== 27) && ((a = r === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || jd(t.type, t.memoizedProps)), a = !a), a && ht && _i(t), Jv(t), r === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      e: {
        for (t = t.nextSibling, r = 0; t; ) {
          if (t.nodeType === 8)
            if (a = t.data, a === "/$") {
              if (r === 0) {
                ht = Nn(t.nextSibling);
                break e;
              }
              r--;
            } else
              a !== "$" && a !== "$!" && a !== "$?" || r++;
          t = t.nextSibling;
        }
        ht = null;
      }
    } else
      r === 27 ? (r = ht, Xr(t.type) ? (t = Gd, Gd = null, ht = t) : ht = r) : ht = Gt ? Nn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function To() {
    ht = Gt = null, Ge = !1;
  }
  function eg() {
    var t = wi;
    return t !== null && (Qt === null ? Qt = t : Qt.push.apply(
      Qt,
      t
    ), wi = null), t;
  }
  function No(t) {
    wi === null ? wi = [t] : wi.push(t);
  }
  var kf = $(null), xi = null, cr = null;
  function Rr(t, r, a) {
    ne(kf, r._currentValue), r._currentValue = a;
  }
  function ur(t) {
    t._currentValue = kf.current, J(kf);
  }
  function Af(t, r, a) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & r) !== r ? (t.childLanes |= r, l !== null && (l.childLanes |= r)) : l !== null && (l.childLanes & r) !== r && (l.childLanes |= r), t === a) break;
      t = t.return;
    }
  }
  function Ef(t, r, a, l) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var h = u.dependencies;
      if (h !== null) {
        var y = u.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var x = h;
          h = u;
          for (var T = 0; T < r.length; T++)
            if (x.context === r[T]) {
              h.lanes |= a, x = h.alternate, x !== null && (x.lanes |= a), Af(
                h.return,
                a,
                t
              ), l || (y = null);
              break e;
            }
          h = x.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(o(341));
        y.lanes |= a, h = y.alternate, h !== null && (h.lanes |= a), Af(y, a, t), y = null;
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === t) {
            y = null;
            break;
          }
          if (u = y.sibling, u !== null) {
            u.return = y.return, y = u;
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function Oo(t, r, a, l) {
    t = null;
    for (var u = r, h = !1; u !== null; ) {
      if (!h) {
        if ((u.flags & 524288) !== 0) h = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(o(387));
        if (y = y.memoizedProps, y !== null) {
          var x = u.type;
          an(u.pendingProps.value, y.value) || (t !== null ? t.push(x) : t = [x]);
        }
      } else if (u === tn.current) {
        if (y = u.alternate, y === null) throw Error(o(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(al) : t = [al]);
      }
      u = u.return;
    }
    t !== null && Ef(
      r,
      t,
      a,
      l
    ), r.flags |= 262144;
  }
  function ds(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!an(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Si(t) {
    xi = t, cr = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Vt(t) {
    return tg(xi, t);
  }
  function hs(t, r) {
    return xi === null && Si(t), tg(t, r);
  }
  function tg(t, r) {
    var a = r._currentValue;
    if (r = { context: r, memoizedValue: a, next: null }, cr === null) {
      if (t === null) throw Error(o(308));
      cr = r, t.dependencies = { lanes: 0, firstContext: r }, t.flags |= 524288;
    } else cr = cr.next = r;
    return a;
  }
  var T5 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], r = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      r.aborted = !0, t.forEach(function(a) {
        return a();
      });
    };
  }, N5 = e.unstable_scheduleCallback, O5 = e.unstable_NormalPriority, _t = {
    $$typeof: A,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tf() {
    return {
      controller: new T5(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zo(t) {
    t.refCount--, t.refCount === 0 && N5(O5, function() {
      t.controller.abort();
    });
  }
  var Mo = null, Nf = 0, ga = 0, pa = null;
  function z5(t, r) {
    if (Mo === null) {
      var a = Mo = [];
      Nf = 0, ga = zd(), pa = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Nf++, r.then(ng, ng), r;
  }
  function ng() {
    if (--Nf === 0 && Mo !== null) {
      pa !== null && (pa.status = "fulfilled");
      var t = Mo;
      Mo = null, ga = 0, pa = null;
      for (var r = 0; r < t.length; r++) (0, t[r])();
    }
  }
  function M5(t, r) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = r;
        for (var u = 0; u < a.length; u++) (0, a[u])(r);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), l;
  }
  var rg = j.S;
  j.S = function(t, r) {
    typeof r == "object" && r !== null && typeof r.then == "function" && z5(t, r), rg !== null && rg(t, r);
  };
  var Ci = $(null);
  function Of() {
    var t = Ci.current;
    return t !== null ? t : rt.pooledCache;
  }
  function vs(t, r) {
    r === null ? ne(Ci, Ci.current) : ne(Ci, r.pool);
  }
  function ig() {
    var t = Of();
    return t === null ? null : { parent: _t._currentValue, pool: t };
  }
  var Do = Error(o(460)), ag = Error(o(474)), gs = Error(o(542)), zf = { then: function() {
  } };
  function og(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function ps() {
  }
  function lg(t, r, a) {
    switch (a = t[a], a === void 0 ? t.push(r) : a !== r && (r.then(ps, ps), r = a), r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw t = r.reason, cg(t), t;
      default:
        if (typeof r.status == "string") r.then(ps, ps);
        else {
          if (t = rt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = r, t.status = "pending", t.then(
            function(l) {
              if (r.status === "pending") {
                var u = r;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (r.status === "pending") {
                var u = r;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw t = r.reason, cg(t), t;
        }
        throw Ro = r, Do;
    }
  }
  var Ro = null;
  function sg() {
    if (Ro === null) throw Error(o(459));
    var t = Ro;
    return Ro = null, t;
  }
  function cg(t) {
    if (t === Do || t === gs)
      throw Error(o(483));
  }
  var Lr = !1;
  function Mf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Df(t, r) {
    t = t.updateQueue, r.updateQueue === t && (r.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ur(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Hr(t, r, a) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ie & 2) !== 0) {
      var u = l.pending;
      return u === null ? r.next = r : (r.next = u.next, u.next = r), l.pending = r, r = ss(t), Xv(t, null, a), r;
    }
    return ls(t, l, r, a), ss(t);
  }
  function Lo(t, r, a) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (a & 4194048) !== 0)) {
      var l = r.lanes;
      l &= t.pendingLanes, a |= l, r.lanes = a, nv(t, a);
    }
  }
  function Rf(t, r) {
    var a = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var u = null, h = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var y = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          h === null ? u = h = y : h = h.next = y, a = a.next;
        } while (a !== null);
        h === null ? u = h = r : h = h.next = r;
      } else u = h = r;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = r : t.next = r, a.lastBaseUpdate = r;
  }
  var Lf = !1;
  function Uo() {
    if (Lf) {
      var t = pa;
      if (t !== null) throw t;
    }
  }
  function Ho(t, r, a, l) {
    Lf = !1;
    var u = t.updateQueue;
    Lr = !1;
    var h = u.firstBaseUpdate, y = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var T = x, H = T.next;
      T.next = null, y === null ? h = H : y.next = H, y = T;
      var q = t.alternate;
      q !== null && (q = q.updateQueue, x = q.lastBaseUpdate, x !== y && (x === null ? q.firstBaseUpdate = H : x.next = H, q.lastBaseUpdate = T));
    }
    if (h !== null) {
      var I = u.baseState;
      y = 0, q = H = T = null, x = h;
      do {
        var B = x.lane & -536870913, V = B !== x.lane;
        if (V ? (Ve & B) === B : (l & B) === B) {
          B !== 0 && B === ga && (Lf = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var Ce = t, ye = x;
            B = r;
            var Qe = a;
            switch (ye.tag) {
              case 1:
                if (Ce = ye.payload, typeof Ce == "function") {
                  I = Ce.call(Qe, I, B);
                  break e;
                }
                I = Ce;
                break e;
              case 3:
                Ce.flags = Ce.flags & -65537 | 128;
              case 0:
                if (Ce = ye.payload, B = typeof Ce == "function" ? Ce.call(Qe, I, B) : Ce, B == null) break e;
                I = p({}, I, B);
                break e;
              case 2:
                Lr = !0;
            }
          }
          B = x.callback, B !== null && (t.flags |= 64, V && (t.flags |= 8192), V = u.callbacks, V === null ? u.callbacks = [B] : V.push(B));
        } else
          V = {
            lane: B,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, q === null ? (H = q = V, T = I) : q = q.next = V, y |= B;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          V = x, x = V.next, V.next = null, u.lastBaseUpdate = V, u.shared.pending = null;
        }
      } while (!0);
      q === null && (T = I), u.baseState = T, u.firstBaseUpdate = H, u.lastBaseUpdate = q, h === null && (u.shared.lanes = 0), Pr |= y, t.lanes = y, t.memoizedState = I;
    }
  }
  function ug(t, r) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(r);
  }
  function fg(t, r) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        ug(a[t], r);
  }
  var ma = $(null), ms = $(0);
  function dg(t, r) {
    t = mr, ne(ms, t), ne(ma, r), mr = t | r.baseLanes;
  }
  function Uf() {
    ne(ms, mr), ne(ma, ma.current);
  }
  function Hf() {
    mr = ms.current, J(ma), J(ms);
  }
  var Br = 0, Me = null, Ze = null, yt = null, ys = !1, ya = !1, ki = !1, bs = 0, Bo = 0, ba = null, D5 = 0;
  function pt() {
    throw Error(o(321));
  }
  function Bf(t, r) {
    if (r === null) return !1;
    for (var a = 0; a < r.length && a < t.length; a++)
      if (!an(t[a], r[a])) return !1;
    return !0;
  }
  function Vf(t, r, a, l, u, h) {
    return Br = h, Me = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, j.H = t === null || t.memoizedState === null ? Xg : Qg, ki = !1, h = a(l, u), ki = !1, ya && (h = vg(
      r,
      a,
      l,
      u
    )), hg(t), h;
  }
  function hg(t) {
    j.H = ks;
    var r = Ze !== null && Ze.next !== null;
    if (Br = 0, yt = Ze = Me = null, ys = !1, Bo = 0, ba = null, r) throw Error(o(300));
    t === null || Tt || (t = t.dependencies, t !== null && ds(t) && (Tt = !0));
  }
  function vg(t, r, a, l) {
    Me = t;
    var u = 0;
    do {
      if (ya && (ba = null), Bo = 0, ya = !1, 25 <= u) throw Error(o(301));
      if (u += 1, yt = Ze = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      j.H = j5, h = r(a, l);
    } while (ya);
    return h;
  }
  function R5() {
    var t = j.H, r = t.useState()[0];
    return r = typeof r.then == "function" ? Vo(r) : r, t = t.useState()[0], (Ze !== null ? Ze.memoizedState : null) !== t && (Me.flags |= 1024), r;
  }
  function jf() {
    var t = bs !== 0;
    return bs = 0, t;
  }
  function $f(t, r, a) {
    r.updateQueue = t.updateQueue, r.flags &= -2053, t.lanes &= ~a;
  }
  function Kf(t) {
    if (ys) {
      for (t = t.memoizedState; t !== null; ) {
        var r = t.queue;
        r !== null && (r.pending = null), t = t.next;
      }
      ys = !1;
    }
    Br = 0, yt = Ze = Me = null, ya = !1, Bo = bs = 0, ba = null;
  }
  function Zt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return yt === null ? Me.memoizedState = yt = t : yt = yt.next = t, yt;
  }
  function bt() {
    if (Ze === null) {
      var t = Me.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ze.next;
    var r = yt === null ? Me.memoizedState : yt.next;
    if (r !== null)
      yt = r, Ze = t;
    else {
      if (t === null)
        throw Me.alternate === null ? Error(o(467)) : Error(o(310));
      Ze = t, t = {
        memoizedState: Ze.memoizedState,
        baseState: Ze.baseState,
        baseQueue: Ze.baseQueue,
        queue: Ze.queue,
        next: null
      }, yt === null ? Me.memoizedState = yt = t : yt = yt.next = t;
    }
    return yt;
  }
  function qf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Vo(t) {
    var r = Bo;
    return Bo += 1, ba === null && (ba = []), t = lg(ba, t, r), r = Me, (yt === null ? r.memoizedState : yt.next) === null && (r = r.alternate, j.H = r === null || r.memoizedState === null ? Xg : Qg), t;
  }
  function ws(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Vo(t);
      if (t.$$typeof === A) return Vt(t);
    }
    throw Error(o(438, String(t)));
  }
  function Gf(t) {
    var r = null, a = Me.updateQueue;
    if (a !== null && (r = a.memoCache), r == null) {
      var l = Me.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (r = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (r == null && (r = { data: [], index: 0 }), a === null && (a = qf(), Me.updateQueue = a), a.memoCache = r, a = r.data[r.index], a === void 0)
      for (a = r.data[r.index] = Array(t), l = 0; l < t; l++)
        a[l] = fe;
    return r.index++, a;
  }
  function fr(t, r) {
    return typeof r == "function" ? r(t) : r;
  }
  function _s(t) {
    var r = bt();
    return Pf(r, Ze, t);
  }
  function Pf(t, r, a) {
    var l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var u = t.baseQueue, h = l.pending;
    if (h !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = h.next, h.next = y;
      }
      r.baseQueue = u = h, l.pending = null;
    }
    if (h = t.baseState, u === null) t.memoizedState = h;
    else {
      r = u.next;
      var x = y = null, T = null, H = r, q = !1;
      do {
        var I = H.lane & -536870913;
        if (I !== H.lane ? (Ve & I) === I : (Br & I) === I) {
          var B = H.revertLane;
          if (B === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }), I === ga && (q = !0);
          else if ((Br & B) === B) {
            H = H.next, B === ga && (q = !0);
            continue;
          } else
            I = {
              lane: 0,
              revertLane: H.revertLane,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }, T === null ? (x = T = I, y = h) : T = T.next = I, Me.lanes |= B, Pr |= B;
          I = H.action, ki && a(h, I), h = H.hasEagerState ? H.eagerState : a(h, I);
        } else
          B = {
            lane: I,
            revertLane: H.revertLane,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          }, T === null ? (x = T = B, y = h) : T = T.next = B, Me.lanes |= I, Pr |= I;
        H = H.next;
      } while (H !== null && H !== r);
      if (T === null ? y = h : T.next = x, !an(h, t.memoizedState) && (Tt = !0, q && (a = pa, a !== null)))
        throw a;
      t.memoizedState = h, t.baseState = y, t.baseQueue = T, l.lastRenderedState = h;
    }
    return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function If(t) {
    var r = bt(), a = r.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = t;
    var l = a.dispatch, u = a.pending, h = r.memoizedState;
    if (u !== null) {
      a.pending = null;
      var y = u = u.next;
      do
        h = t(h, y.action), y = y.next;
      while (y !== u);
      an(h, r.memoizedState) || (Tt = !0), r.memoizedState = h, r.baseQueue === null && (r.baseState = h), a.lastRenderedState = h;
    }
    return [h, l];
  }
  function gg(t, r, a) {
    var l = Me, u = bt(), h = Ge;
    if (h) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = r();
    var y = !an(
      (Ze || u).memoizedState,
      a
    );
    y && (u.memoizedState = a, Tt = !0), u = u.queue;
    var x = yg.bind(null, l, u, t);
    if (jo(2048, 8, x, [t]), u.getSnapshot !== r || y || yt !== null && yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, wa(
        9,
        xs(),
        mg.bind(
          null,
          l,
          u,
          a,
          r
        ),
        null
      ), rt === null) throw Error(o(349));
      h || (Br & 124) !== 0 || pg(l, r, a);
    }
    return a;
  }
  function pg(t, r, a) {
    t.flags |= 16384, t = { getSnapshot: r, value: a }, r = Me.updateQueue, r === null ? (r = qf(), Me.updateQueue = r, r.stores = [t]) : (a = r.stores, a === null ? r.stores = [t] : a.push(t));
  }
  function mg(t, r, a, l) {
    r.value = a, r.getSnapshot = l, bg(r) && wg(t);
  }
  function yg(t, r, a) {
    return a(function() {
      bg(r) && wg(t);
    });
  }
  function bg(t) {
    var r = t.getSnapshot;
    t = t.value;
    try {
      var a = r();
      return !an(t, a);
    } catch {
      return !0;
    }
  }
  function wg(t) {
    var r = fa(t, 2);
    r !== null && fn(r, t, 2);
  }
  function Yf(t) {
    var r = Zt();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), ki) {
        zr(!0);
        try {
          a();
        } finally {
          zr(!1);
        }
      }
    }
    return r.memoizedState = r.baseState = t, r.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fr,
      lastRenderedState: t
    }, r;
  }
  function _g(t, r, a, l) {
    return t.baseState = a, Pf(
      t,
      Ze,
      typeof l == "function" ? l : fr
    );
  }
  function L5(t, r, a, l, u) {
    if (Cs(t)) throw Error(o(485));
    if (t = r.action, t !== null) {
      var h = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          h.listeners.push(y);
        }
      };
      j.T !== null ? a(!0) : h.isTransition = !1, l(h), a = r.pending, a === null ? (h.next = r.pending = h, xg(r, h)) : (h.next = a.next, r.pending = a.next = h);
    }
  }
  function xg(t, r) {
    var a = r.action, l = r.payload, u = t.state;
    if (r.isTransition) {
      var h = j.T, y = {};
      j.T = y;
      try {
        var x = a(u, l), T = j.S;
        T !== null && T(y, x), Sg(t, r, x);
      } catch (H) {
        Zf(t, r, H);
      } finally {
        j.T = h;
      }
    } else
      try {
        h = a(u, l), Sg(t, r, h);
      } catch (H) {
        Zf(t, r, H);
      }
  }
  function Sg(t, r, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Cg(t, r, l);
      },
      function(l) {
        return Zf(t, r, l);
      }
    ) : Cg(t, r, a);
  }
  function Cg(t, r, a) {
    r.status = "fulfilled", r.value = a, kg(r), t.state = a, r = t.pending, r !== null && (a = r.next, a === r ? t.pending = null : (a = a.next, r.next = a, xg(t, a)));
  }
  function Zf(t, r, a) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        r.status = "rejected", r.reason = a, kg(r), r = r.next;
      while (r !== l);
    }
    t.action = null;
  }
  function kg(t) {
    t = t.listeners;
    for (var r = 0; r < t.length; r++) (0, t[r])();
  }
  function Ag(t, r) {
    return r;
  }
  function Eg(t, r) {
    if (Ge) {
      var a = rt.formState;
      if (a !== null) {
        e: {
          var l = Me;
          if (Ge) {
            if (ht) {
              t: {
                for (var u = ht, h = Bn; u.nodeType !== 8; ) {
                  if (!h) {
                    u = null;
                    break t;
                  }
                  if (u = Nn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                h = u.data, u = h === "F!" || h === "F" ? u : null;
              }
              if (u) {
                ht = Nn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            _i(l);
          }
          l = !1;
        }
        l && (r = a[0]);
      }
    }
    return a = Zt(), a.memoizedState = a.baseState = r, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ag,
      lastRenderedState: r
    }, a.queue = l, a = Ig.bind(
      null,
      Me,
      l
    ), l.dispatch = a, l = Yf(!1), h = Jf.bind(
      null,
      Me,
      !1,
      l.queue
    ), l = Zt(), u = {
      state: r,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = u, a = L5.bind(
      null,
      Me,
      u,
      h,
      a
    ), u.dispatch = a, l.memoizedState = t, [r, a, !1];
  }
  function Tg(t) {
    var r = bt();
    return Ng(r, Ze, t);
  }
  function Ng(t, r, a) {
    if (r = Pf(
      t,
      r,
      Ag
    )[0], t = _s(fr)[0], typeof r == "object" && r !== null && typeof r.then == "function")
      try {
        var l = Vo(r);
      } catch (y) {
        throw y === Do ? gs : y;
      }
    else l = r;
    r = bt();
    var u = r.queue, h = u.dispatch;
    return a !== r.memoizedState && (Me.flags |= 2048, wa(
      9,
      xs(),
      U5.bind(null, u, a),
      null
    )), [l, h, t];
  }
  function U5(t, r) {
    t.action = r;
  }
  function Og(t) {
    var r = bt(), a = Ze;
    if (a !== null)
      return Ng(r, a, t);
    bt(), r = r.memoizedState, a = bt();
    var l = a.queue.dispatch;
    return a.memoizedState = t, [r, l, !1];
  }
  function wa(t, r, a, l) {
    return t = { tag: t, create: a, deps: l, inst: r, next: null }, r = Me.updateQueue, r === null && (r = qf(), Me.updateQueue = r), a = r.lastEffect, a === null ? r.lastEffect = t.next = t : (l = a.next, a.next = t, t.next = l, r.lastEffect = t), t;
  }
  function xs() {
    return { destroy: void 0, resource: void 0 };
  }
  function zg() {
    return bt().memoizedState;
  }
  function Ss(t, r, a, l) {
    var u = Zt();
    l = l === void 0 ? null : l, Me.flags |= t, u.memoizedState = wa(
      1 | r,
      xs(),
      a,
      l
    );
  }
  function jo(t, r, a, l) {
    var u = bt();
    l = l === void 0 ? null : l;
    var h = u.memoizedState.inst;
    Ze !== null && l !== null && Bf(l, Ze.memoizedState.deps) ? u.memoizedState = wa(r, h, a, l) : (Me.flags |= t, u.memoizedState = wa(
      1 | r,
      h,
      a,
      l
    ));
  }
  function Mg(t, r) {
    Ss(8390656, 8, t, r);
  }
  function Dg(t, r) {
    jo(2048, 8, t, r);
  }
  function Rg(t, r) {
    return jo(4, 2, t, r);
  }
  function Lg(t, r) {
    return jo(4, 4, t, r);
  }
  function Ug(t, r) {
    if (typeof r == "function") {
      t = t();
      var a = r(t);
      return function() {
        typeof a == "function" ? a() : r(null);
      };
    }
    if (r != null)
      return t = t(), r.current = t, function() {
        r.current = null;
      };
  }
  function Hg(t, r, a) {
    a = a != null ? a.concat([t]) : null, jo(4, 4, Ug.bind(null, r, t), a);
  }
  function Xf() {
  }
  function Bg(t, r) {
    var a = bt();
    r = r === void 0 ? null : r;
    var l = a.memoizedState;
    return r !== null && Bf(r, l[1]) ? l[0] : (a.memoizedState = [t, r], t);
  }
  function Vg(t, r) {
    var a = bt();
    r = r === void 0 ? null : r;
    var l = a.memoizedState;
    if (r !== null && Bf(r, l[1]))
      return l[0];
    if (l = t(), ki) {
      zr(!0);
      try {
        t();
      } finally {
        zr(!1);
      }
    }
    return a.memoizedState = [l, r], l;
  }
  function Qf(t, r, a) {
    return a === void 0 || (Br & 1073741824) !== 0 ? t.memoizedState = r : (t.memoizedState = a, t = Kp(), Me.lanes |= t, Pr |= t, a);
  }
  function jg(t, r, a, l) {
    return an(a, r) ? a : ma.current !== null ? (t = Qf(t, a, l), an(t, r) || (Tt = !0), t) : (Br & 42) === 0 ? (Tt = !0, t.memoizedState = a) : (t = Kp(), Me.lanes |= t, Pr |= t, r);
  }
  function $g(t, r, a, l, u) {
    var h = te.p;
    te.p = h !== 0 && 8 > h ? h : 8;
    var y = j.T, x = {};
    j.T = x, Jf(t, !1, r, a);
    try {
      var T = u(), H = j.S;
      if (H !== null && H(x, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var q = M5(
          T,
          l
        );
        $o(
          t,
          r,
          q,
          un(t)
        );
      } else
        $o(
          t,
          r,
          l,
          un(t)
        );
    } catch (I) {
      $o(
        t,
        r,
        { then: function() {
        }, status: "rejected", reason: I },
        un()
      );
    } finally {
      te.p = h, j.T = y;
    }
  }
  function H5() {
  }
  function Ff(t, r, a, l) {
    if (t.tag !== 5) throw Error(o(476));
    var u = Kg(t).queue;
    $g(
      t,
      u,
      r,
      ae,
      a === null ? H5 : function() {
        return qg(t), a(l);
      }
    );
  }
  function Kg(t) {
    var r = t.memoizedState;
    if (r !== null) return r;
    r = {
      memoizedState: ae,
      baseState: ae,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fr,
        lastRenderedState: ae
      },
      next: null
    };
    var a = {};
    return r.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fr,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = r, t = t.alternate, t !== null && (t.memoizedState = r), r;
  }
  function qg(t) {
    var r = Kg(t).next.queue;
    $o(t, r, {}, un());
  }
  function Wf() {
    return Vt(al);
  }
  function Gg() {
    return bt().memoizedState;
  }
  function Pg() {
    return bt().memoizedState;
  }
  function B5(t) {
    for (var r = t.return; r !== null; ) {
      switch (r.tag) {
        case 24:
        case 3:
          var a = un();
          t = Ur(a);
          var l = Hr(r, t, a);
          l !== null && (fn(l, r, a), Lo(l, r, a)), r = { cache: Tf() }, t.payload = r;
          return;
      }
      r = r.return;
    }
  }
  function V5(t, r, a) {
    var l = un();
    a = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(t) ? Yg(r, a) : (a = yf(t, r, a, l), a !== null && (fn(a, t, l), Zg(a, r, l)));
  }
  function Ig(t, r, a) {
    var l = un();
    $o(t, r, a, l);
  }
  function $o(t, r, a, l) {
    var u = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cs(t)) Yg(r, u);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = r.lastRenderedReducer, h !== null))
        try {
          var y = r.lastRenderedState, x = h(y, a);
          if (u.hasEagerState = !0, u.eagerState = x, an(x, y))
            return ls(t, r, u, 0), rt === null && os(), !1;
        } catch {
        } finally {
        }
      if (a = yf(t, r, u, l), a !== null)
        return fn(a, t, l), Zg(a, r, l), !0;
    }
    return !1;
  }
  function Jf(t, r, a, l) {
    if (l = {
      lane: 2,
      revertLane: zd(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(t)) {
      if (r) throw Error(o(479));
    } else
      r = yf(
        t,
        a,
        l,
        2
      ), r !== null && fn(r, t, 2);
  }
  function Cs(t) {
    var r = t.alternate;
    return t === Me || r !== null && r === Me;
  }
  function Yg(t, r) {
    ya = ys = !0;
    var a = t.pending;
    a === null ? r.next = r : (r.next = a.next, a.next = r), t.pending = r;
  }
  function Zg(t, r, a) {
    if ((a & 4194048) !== 0) {
      var l = r.lanes;
      l &= t.pendingLanes, a |= l, r.lanes = a, nv(t, a);
    }
  }
  var ks = {
    readContext: Vt,
    use: ws,
    useCallback: pt,
    useContext: pt,
    useEffect: pt,
    useImperativeHandle: pt,
    useLayoutEffect: pt,
    useInsertionEffect: pt,
    useMemo: pt,
    useReducer: pt,
    useRef: pt,
    useState: pt,
    useDebugValue: pt,
    useDeferredValue: pt,
    useTransition: pt,
    useSyncExternalStore: pt,
    useId: pt,
    useHostTransitionStatus: pt,
    useFormState: pt,
    useActionState: pt,
    useOptimistic: pt,
    useMemoCache: pt,
    useCacheRefresh: pt
  }, Xg = {
    readContext: Vt,
    use: ws,
    useCallback: function(t, r) {
      return Zt().memoizedState = [
        t,
        r === void 0 ? null : r
      ], t;
    },
    useContext: Vt,
    useEffect: Mg,
    useImperativeHandle: function(t, r, a) {
      a = a != null ? a.concat([t]) : null, Ss(
        4194308,
        4,
        Ug.bind(null, r, t),
        a
      );
    },
    useLayoutEffect: function(t, r) {
      return Ss(4194308, 4, t, r);
    },
    useInsertionEffect: function(t, r) {
      Ss(4, 2, t, r);
    },
    useMemo: function(t, r) {
      var a = Zt();
      r = r === void 0 ? null : r;
      var l = t();
      if (ki) {
        zr(!0);
        try {
          t();
        } finally {
          zr(!1);
        }
      }
      return a.memoizedState = [l, r], l;
    },
    useReducer: function(t, r, a) {
      var l = Zt();
      if (a !== void 0) {
        var u = a(r);
        if (ki) {
          zr(!0);
          try {
            a(r);
          } finally {
            zr(!1);
          }
        }
      } else u = r;
      return l.memoizedState = l.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, l.queue = t, t = t.dispatch = V5.bind(
        null,
        Me,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var r = Zt();
      return t = { current: t }, r.memoizedState = t;
    },
    useState: function(t) {
      t = Yf(t);
      var r = t.queue, a = Ig.bind(null, Me, r);
      return r.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: Xf,
    useDeferredValue: function(t, r) {
      var a = Zt();
      return Qf(a, t, r);
    },
    useTransition: function() {
      var t = Yf(!1);
      return t = $g.bind(
        null,
        Me,
        t.queue,
        !0,
        !1
      ), Zt().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, r, a) {
      var l = Me, u = Zt();
      if (Ge) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = r(), rt === null)
          throw Error(o(349));
        (Ve & 124) !== 0 || pg(l, r, a);
      }
      u.memoizedState = a;
      var h = { value: a, getSnapshot: r };
      return u.queue = h, Mg(yg.bind(null, l, h, t), [
        t
      ]), l.flags |= 2048, wa(
        9,
        xs(),
        mg.bind(
          null,
          l,
          h,
          a,
          r
        ),
        null
      ), a;
    },
    useId: function() {
      var t = Zt(), r = rt.identifierPrefix;
      if (Ge) {
        var a = sr, l = lr;
        a = (l & ~(1 << 32 - rn(l) - 1)).toString(32) + a, r = "«" + r + "R" + a, a = bs++, 0 < a && (r += "H" + a.toString(32)), r += "»";
      } else
        a = D5++, r = "«" + r + "r" + a.toString(32) + "»";
      return t.memoizedState = r;
    },
    useHostTransitionStatus: Wf,
    useFormState: Eg,
    useActionState: Eg,
    useOptimistic: function(t) {
      var r = Zt();
      r.memoizedState = r.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return r.queue = a, r = Jf.bind(
        null,
        Me,
        !0,
        a
      ), a.dispatch = r, [t, r];
    },
    useMemoCache: Gf,
    useCacheRefresh: function() {
      return Zt().memoizedState = B5.bind(
        null,
        Me
      );
    }
  }, Qg = {
    readContext: Vt,
    use: ws,
    useCallback: Bg,
    useContext: Vt,
    useEffect: Dg,
    useImperativeHandle: Hg,
    useInsertionEffect: Rg,
    useLayoutEffect: Lg,
    useMemo: Vg,
    useReducer: _s,
    useRef: zg,
    useState: function() {
      return _s(fr);
    },
    useDebugValue: Xf,
    useDeferredValue: function(t, r) {
      var a = bt();
      return jg(
        a,
        Ze.memoizedState,
        t,
        r
      );
    },
    useTransition: function() {
      var t = _s(fr)[0], r = bt().memoizedState;
      return [
        typeof t == "boolean" ? t : Vo(t),
        r
      ];
    },
    useSyncExternalStore: gg,
    useId: Gg,
    useHostTransitionStatus: Wf,
    useFormState: Tg,
    useActionState: Tg,
    useOptimistic: function(t, r) {
      var a = bt();
      return _g(a, Ze, t, r);
    },
    useMemoCache: Gf,
    useCacheRefresh: Pg
  }, j5 = {
    readContext: Vt,
    use: ws,
    useCallback: Bg,
    useContext: Vt,
    useEffect: Dg,
    useImperativeHandle: Hg,
    useInsertionEffect: Rg,
    useLayoutEffect: Lg,
    useMemo: Vg,
    useReducer: If,
    useRef: zg,
    useState: function() {
      return If(fr);
    },
    useDebugValue: Xf,
    useDeferredValue: function(t, r) {
      var a = bt();
      return Ze === null ? Qf(a, t, r) : jg(
        a,
        Ze.memoizedState,
        t,
        r
      );
    },
    useTransition: function() {
      var t = If(fr)[0], r = bt().memoizedState;
      return [
        typeof t == "boolean" ? t : Vo(t),
        r
      ];
    },
    useSyncExternalStore: gg,
    useId: Gg,
    useHostTransitionStatus: Wf,
    useFormState: Og,
    useActionState: Og,
    useOptimistic: function(t, r) {
      var a = bt();
      return Ze !== null ? _g(a, Ze, t, r) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: Gf,
    useCacheRefresh: Pg
  }, _a = null, Ko = 0;
  function As(t) {
    var r = Ko;
    return Ko += 1, _a === null && (_a = []), lg(_a, t, r);
  }
  function qo(t, r) {
    r = r.props.ref, t.ref = r !== void 0 ? r : null;
  }
  function Es(t, r) {
    throw r.$$typeof === m ? Error(o(525)) : (t = Object.prototype.toString.call(r), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : t
      )
    ));
  }
  function Fg(t) {
    var r = t._init;
    return r(t._payload);
  }
  function Wg(t) {
    function r(R, M) {
      if (t) {
        var U = R.deletions;
        U === null ? (R.deletions = [M], R.flags |= 16) : U.push(M);
      }
    }
    function a(R, M) {
      if (!t) return null;
      for (; M !== null; )
        r(R, M), M = M.sibling;
      return null;
    }
    function l(R) {
      for (var M = /* @__PURE__ */ new Map(); R !== null; )
        R.key !== null ? M.set(R.key, R) : M.set(R.index, R), R = R.sibling;
      return M;
    }
    function u(R, M) {
      return R = or(R, M), R.index = 0, R.sibling = null, R;
    }
    function h(R, M, U) {
      return R.index = U, t ? (U = R.alternate, U !== null ? (U = U.index, U < M ? (R.flags |= 67108866, M) : U) : (R.flags |= 67108866, M)) : (R.flags |= 1048576, M);
    }
    function y(R) {
      return t && R.alternate === null && (R.flags |= 67108866), R;
    }
    function x(R, M, U, G) {
      return M === null || M.tag !== 6 ? (M = wf(U, R.mode, G), M.return = R, M) : (M = u(M, U), M.return = R, M);
    }
    function T(R, M, U, G) {
      var ve = U.type;
      return ve === C ? q(
        R,
        M,
        U.props.children,
        G,
        U.key
      ) : M !== null && (M.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === ie && Fg(ve) === M.type) ? (M = u(M, U.props), qo(M, U), M.return = R, M) : (M = cs(
        U.type,
        U.key,
        U.props,
        null,
        R.mode,
        G
      ), qo(M, U), M.return = R, M);
    }
    function H(R, M, U, G) {
      return M === null || M.tag !== 4 || M.stateNode.containerInfo !== U.containerInfo || M.stateNode.implementation !== U.implementation ? (M = _f(U, R.mode, G), M.return = R, M) : (M = u(M, U.children || []), M.return = R, M);
    }
    function q(R, M, U, G, ve) {
      return M === null || M.tag !== 7 ? (M = mi(
        U,
        R.mode,
        G,
        ve
      ), M.return = R, M) : (M = u(M, U), M.return = R, M);
    }
    function I(R, M, U) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return M = wf(
          "" + M,
          R.mode,
          U
        ), M.return = R, M;
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case _:
            return U = cs(
              M.type,
              M.key,
              M.props,
              null,
              R.mode,
              U
            ), qo(U, M), U.return = R, U;
          case w:
            return M = _f(
              M,
              R.mode,
              U
            ), M.return = R, M;
          case ie:
            var G = M._init;
            return M = G(M._payload), I(R, M, U);
        }
        if (Oe(M) || ee(M))
          return M = mi(
            M,
            R.mode,
            U,
            null
          ), M.return = R, M;
        if (typeof M.then == "function")
          return I(R, As(M), U);
        if (M.$$typeof === A)
          return I(
            R,
            hs(R, M),
            U
          );
        Es(R, M);
      }
      return null;
    }
    function B(R, M, U, G) {
      var ve = M !== null ? M.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return ve !== null ? null : x(R, M, "" + U, G);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case _:
            return U.key === ve ? T(R, M, U, G) : null;
          case w:
            return U.key === ve ? H(R, M, U, G) : null;
          case ie:
            return ve = U._init, U = ve(U._payload), B(R, M, U, G);
        }
        if (Oe(U) || ee(U))
          return ve !== null ? null : q(R, M, U, G, null);
        if (typeof U.then == "function")
          return B(
            R,
            M,
            As(U),
            G
          );
        if (U.$$typeof === A)
          return B(
            R,
            M,
            hs(R, U),
            G
          );
        Es(R, U);
      }
      return null;
    }
    function V(R, M, U, G, ve) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return R = R.get(U) || null, x(M, R, "" + G, ve);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case _:
            return R = R.get(
              G.key === null ? U : G.key
            ) || null, T(M, R, G, ve);
          case w:
            return R = R.get(
              G.key === null ? U : G.key
            ) || null, H(M, R, G, ve);
          case ie:
            var De = G._init;
            return G = De(G._payload), V(
              R,
              M,
              U,
              G,
              ve
            );
        }
        if (Oe(G) || ee(G))
          return R = R.get(U) || null, q(M, R, G, ve, null);
        if (typeof G.then == "function")
          return V(
            R,
            M,
            U,
            As(G),
            ve
          );
        if (G.$$typeof === A)
          return V(
            R,
            M,
            U,
            hs(M, G),
            ve
          );
        Es(M, G);
      }
      return null;
    }
    function Ce(R, M, U, G) {
      for (var ve = null, De = null, pe = M, xe = M = 0, Ot = null; pe !== null && xe < U.length; xe++) {
        pe.index > xe ? (Ot = pe, pe = null) : Ot = pe.sibling;
        var qe = B(
          R,
          pe,
          U[xe],
          G
        );
        if (qe === null) {
          pe === null && (pe = Ot);
          break;
        }
        t && pe && qe.alternate === null && r(R, pe), M = h(qe, M, xe), De === null ? ve = qe : De.sibling = qe, De = qe, pe = Ot;
      }
      if (xe === U.length)
        return a(R, pe), Ge && bi(R, xe), ve;
      if (pe === null) {
        for (; xe < U.length; xe++)
          pe = I(R, U[xe], G), pe !== null && (M = h(
            pe,
            M,
            xe
          ), De === null ? ve = pe : De.sibling = pe, De = pe);
        return Ge && bi(R, xe), ve;
      }
      for (pe = l(pe); xe < U.length; xe++)
        Ot = V(
          pe,
          R,
          xe,
          U[xe],
          G
        ), Ot !== null && (t && Ot.alternate !== null && pe.delete(
          Ot.key === null ? xe : Ot.key
        ), M = h(
          Ot,
          M,
          xe
        ), De === null ? ve = Ot : De.sibling = Ot, De = Ot);
      return t && pe.forEach(function(ei) {
        return r(R, ei);
      }), Ge && bi(R, xe), ve;
    }
    function ye(R, M, U, G) {
      if (U == null) throw Error(o(151));
      for (var ve = null, De = null, pe = M, xe = M = 0, Ot = null, qe = U.next(); pe !== null && !qe.done; xe++, qe = U.next()) {
        pe.index > xe ? (Ot = pe, pe = null) : Ot = pe.sibling;
        var ei = B(R, pe, qe.value, G);
        if (ei === null) {
          pe === null && (pe = Ot);
          break;
        }
        t && pe && ei.alternate === null && r(R, pe), M = h(ei, M, xe), De === null ? ve = ei : De.sibling = ei, De = ei, pe = Ot;
      }
      if (qe.done)
        return a(R, pe), Ge && bi(R, xe), ve;
      if (pe === null) {
        for (; !qe.done; xe++, qe = U.next())
          qe = I(R, qe.value, G), qe !== null && (M = h(qe, M, xe), De === null ? ve = qe : De.sibling = qe, De = qe);
        return Ge && bi(R, xe), ve;
      }
      for (pe = l(pe); !qe.done; xe++, qe = U.next())
        qe = V(pe, R, xe, qe.value, G), qe !== null && (t && qe.alternate !== null && pe.delete(qe.key === null ? xe : qe.key), M = h(qe, M, xe), De === null ? ve = qe : De.sibling = qe, De = qe);
      return t && pe.forEach(function($3) {
        return r(R, $3);
      }), Ge && bi(R, xe), ve;
    }
    function Qe(R, M, U, G) {
      if (typeof U == "object" && U !== null && U.type === C && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case _:
            e: {
              for (var ve = U.key; M !== null; ) {
                if (M.key === ve) {
                  if (ve = U.type, ve === C) {
                    if (M.tag === 7) {
                      a(
                        R,
                        M.sibling
                      ), G = u(
                        M,
                        U.props.children
                      ), G.return = R, R = G;
                      break e;
                    }
                  } else if (M.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === ie && Fg(ve) === M.type) {
                    a(
                      R,
                      M.sibling
                    ), G = u(M, U.props), qo(G, U), G.return = R, R = G;
                    break e;
                  }
                  a(R, M);
                  break;
                } else r(R, M);
                M = M.sibling;
              }
              U.type === C ? (G = mi(
                U.props.children,
                R.mode,
                G,
                U.key
              ), G.return = R, R = G) : (G = cs(
                U.type,
                U.key,
                U.props,
                null,
                R.mode,
                G
              ), qo(G, U), G.return = R, R = G);
            }
            return y(R);
          case w:
            e: {
              for (ve = U.key; M !== null; ) {
                if (M.key === ve)
                  if (M.tag === 4 && M.stateNode.containerInfo === U.containerInfo && M.stateNode.implementation === U.implementation) {
                    a(
                      R,
                      M.sibling
                    ), G = u(M, U.children || []), G.return = R, R = G;
                    break e;
                  } else {
                    a(R, M);
                    break;
                  }
                else r(R, M);
                M = M.sibling;
              }
              G = _f(U, R.mode, G), G.return = R, R = G;
            }
            return y(R);
          case ie:
            return ve = U._init, U = ve(U._payload), Qe(
              R,
              M,
              U,
              G
            );
        }
        if (Oe(U))
          return Ce(
            R,
            M,
            U,
            G
          );
        if (ee(U)) {
          if (ve = ee(U), typeof ve != "function") throw Error(o(150));
          return U = ve.call(U), ye(
            R,
            M,
            U,
            G
          );
        }
        if (typeof U.then == "function")
          return Qe(
            R,
            M,
            As(U),
            G
          );
        if (U.$$typeof === A)
          return Qe(
            R,
            M,
            hs(R, U),
            G
          );
        Es(R, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, M !== null && M.tag === 6 ? (a(R, M.sibling), G = u(M, U), G.return = R, R = G) : (a(R, M), G = wf(U, R.mode, G), G.return = R, R = G), y(R)) : a(R, M);
    }
    return function(R, M, U, G) {
      try {
        Ko = 0;
        var ve = Qe(
          R,
          M,
          U,
          G
        );
        return _a = null, ve;
      } catch (pe) {
        if (pe === Do || pe === gs) throw pe;
        var De = on(29, pe, null, R.mode);
        return De.lanes = G, De.return = R, De;
      } finally {
      }
    };
  }
  var xa = Wg(!0), Jg = Wg(!1), bn = $(null), Vn = null;
  function Vr(t) {
    var r = t.alternate;
    ne(xt, xt.current & 1), ne(bn, t), Vn === null && (r === null || ma.current !== null || r.memoizedState !== null) && (Vn = t);
  }
  function ep(t) {
    if (t.tag === 22) {
      if (ne(xt, xt.current), ne(bn, t), Vn === null) {
        var r = t.alternate;
        r !== null && r.memoizedState !== null && (Vn = t);
      }
    } else jr();
  }
  function jr() {
    ne(xt, xt.current), ne(bn, bn.current);
  }
  function dr(t) {
    J(bn), Vn === t && (Vn = null), J(xt);
  }
  var xt = $(0);
  function Ts(t) {
    for (var r = t; r !== null; ) {
      if (r.tag === 13) {
        var a = r.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || qd(a)))
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  function ed(t, r, a, l) {
    r = t.memoizedState, a = a(l, r), a = a == null ? r : p({}, r, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var td = {
    enqueueSetState: function(t, r, a) {
      t = t._reactInternals;
      var l = un(), u = Ur(l);
      u.payload = r, a != null && (u.callback = a), r = Hr(t, u, l), r !== null && (fn(r, t, l), Lo(r, t, l));
    },
    enqueueReplaceState: function(t, r, a) {
      t = t._reactInternals;
      var l = un(), u = Ur(l);
      u.tag = 1, u.payload = r, a != null && (u.callback = a), r = Hr(t, u, l), r !== null && (fn(r, t, l), Lo(r, t, l));
    },
    enqueueForceUpdate: function(t, r) {
      t = t._reactInternals;
      var a = un(), l = Ur(a);
      l.tag = 2, r != null && (l.callback = r), r = Hr(t, l, a), r !== null && (fn(r, t, a), Lo(r, t, a));
    }
  };
  function tp(t, r, a, l, u, h, y) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, h, y) : r.prototype && r.prototype.isPureReactComponent ? !ko(a, l) || !ko(u, h) : !0;
  }
  function np(t, r, a, l) {
    t = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(a, l), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(a, l), r.state !== t && td.enqueueReplaceState(r, r.state, null);
  }
  function Ai(t, r) {
    var a = r;
    if ("ref" in r) {
      a = {};
      for (var l in r)
        l !== "ref" && (a[l] = r[l]);
    }
    if (t = t.defaultProps) {
      a === r && (a = p({}, a));
      for (var u in t)
        a[u] === void 0 && (a[u] = t[u]);
    }
    return a;
  }
  var Ns = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var r = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(r)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function rp(t) {
    Ns(t);
  }
  function ip(t) {
    console.error(t);
  }
  function ap(t) {
    Ns(t);
  }
  function Os(t, r) {
    try {
      var a = t.onUncaughtError;
      a(r.value, { componentStack: r.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function op(t, r, a) {
    try {
      var l = t.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: r.tag === 1 ? r.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function nd(t, r, a) {
    return a = Ur(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Os(t, r);
    }, a;
  }
  function lp(t) {
    return t = Ur(t), t.tag = 3, t;
  }
  function sp(t, r, a, l) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var h = l.value;
      t.payload = function() {
        return u(h);
      }, t.callback = function() {
        op(r, a, l);
      };
    }
    var y = a.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (t.callback = function() {
      op(r, a, l), typeof u != "function" && (Ir === null ? Ir = /* @__PURE__ */ new Set([this]) : Ir.add(this));
      var x = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function $5(t, r, a, l, u) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (r = a.alternate, r !== null && Oo(
        r,
        a,
        u,
        !0
      ), a = bn.current, a !== null) {
        switch (a.tag) {
          case 13:
            return Vn === null ? Ad() : a.alternate === null && vt === 0 && (vt = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, l === zf ? a.flags |= 16384 : (r = a.updateQueue, r === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : r.add(l), Td(t, l, u)), !1;
          case 22:
            return a.flags |= 65536, l === zf ? a.flags |= 16384 : (r = a.updateQueue, r === null ? (r = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = r) : (a = r.retryQueue, a === null ? r.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Td(t, l, u)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Td(t, l, u), Ad(), !1;
    }
    if (Ge)
      return r = bn.current, r !== null ? ((r.flags & 65536) === 0 && (r.flags |= 256), r.flags |= 65536, r.lanes = u, l !== Cf && (t = Error(o(422), { cause: l }), No(gn(t, a)))) : (l !== Cf && (r = Error(o(423), {
        cause: l
      }), No(
        gn(r, a)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, l = gn(l, a), u = nd(
        t.stateNode,
        l,
        u
      ), Rf(t, u), vt !== 4 && (vt = 2)), !1;
    var h = Error(o(520), { cause: l });
    if (h = gn(h, a), Qo === null ? Qo = [h] : Qo.push(h), vt !== 4 && (vt = 2), r === null) return !0;
    l = gn(l, a), a = r;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = u & -u, a.lanes |= t, t = nd(a.stateNode, l, t), Rf(a, t), !1;
        case 1:
          if (r = a.type, h = a.stateNode, (a.flags & 128) === 0 && (typeof r.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Ir === null || !Ir.has(h))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = lp(u), sp(
              u,
              t,
              a,
              l
            ), Rf(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var cp = Error(o(461)), Tt = !1;
  function zt(t, r, a, l) {
    r.child = t === null ? Jg(r, null, a, l) : xa(
      r,
      t.child,
      a,
      l
    );
  }
  function up(t, r, a, l, u) {
    a = a.render;
    var h = r.ref;
    if ("ref" in l) {
      var y = {};
      for (var x in l)
        x !== "ref" && (y[x] = l[x]);
    } else y = l;
    return Si(r), l = Vf(
      t,
      r,
      a,
      y,
      h,
      u
    ), x = jf(), t !== null && !Tt ? ($f(t, r, u), hr(t, r, u)) : (Ge && x && xf(r), r.flags |= 1, zt(t, r, l, u), r.child);
  }
  function fp(t, r, a, l, u) {
    if (t === null) {
      var h = a.type;
      return typeof h == "function" && !bf(h) && h.defaultProps === void 0 && a.compare === null ? (r.tag = 15, r.type = h, dp(
        t,
        r,
        h,
        l,
        u
      )) : (t = cs(
        a.type,
        null,
        l,
        r,
        r.mode,
        u
      ), t.ref = r.ref, t.return = r, r.child = t);
    }
    if (h = t.child, !ud(t, u)) {
      var y = h.memoizedProps;
      if (a = a.compare, a = a !== null ? a : ko, a(y, l) && t.ref === r.ref)
        return hr(t, r, u);
    }
    return r.flags |= 1, t = or(h, l), t.ref = r.ref, t.return = r, r.child = t;
  }
  function dp(t, r, a, l, u) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (ko(h, l) && t.ref === r.ref)
        if (Tt = !1, r.pendingProps = l = h, ud(t, u))
          (t.flags & 131072) !== 0 && (Tt = !0);
        else
          return r.lanes = t.lanes, hr(t, r, u);
    }
    return rd(
      t,
      r,
      a,
      l,
      u
    );
  }
  function hp(t, r, a) {
    var l = r.pendingProps, u = l.children, h = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((r.flags & 128) !== 0) {
        if (l = h !== null ? h.baseLanes | a : a, t !== null) {
          for (u = r.child = t.child, h = 0; u !== null; )
            h = h | u.lanes | u.childLanes, u = u.sibling;
          r.childLanes = h & ~l;
        } else r.childLanes = 0, r.child = null;
        return vp(
          t,
          r,
          l,
          a
        );
      }
      if ((a & 536870912) !== 0)
        r.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && vs(
          r,
          h !== null ? h.cachePool : null
        ), h !== null ? dg(r, h) : Uf(), ep(r);
      else
        return r.lanes = r.childLanes = 536870912, vp(
          t,
          r,
          h !== null ? h.baseLanes | a : a,
          a
        );
    } else
      h !== null ? (vs(r, h.cachePool), dg(r, h), jr(), r.memoizedState = null) : (t !== null && vs(r, null), Uf(), jr());
    return zt(t, r, u, a), r.child;
  }
  function vp(t, r, a, l) {
    var u = Of();
    return u = u === null ? null : { parent: _t._currentValue, pool: u }, r.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, t !== null && vs(r, null), Uf(), ep(r), t !== null && Oo(t, r, l, !0), null;
  }
  function zs(t, r) {
    var a = r.ref;
    if (a === null)
      t !== null && t.ref !== null && (r.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (t === null || t.ref !== a) && (r.flags |= 4194816);
    }
  }
  function rd(t, r, a, l, u) {
    return Si(r), a = Vf(
      t,
      r,
      a,
      l,
      void 0,
      u
    ), l = jf(), t !== null && !Tt ? ($f(t, r, u), hr(t, r, u)) : (Ge && l && xf(r), r.flags |= 1, zt(t, r, a, u), r.child);
  }
  function gp(t, r, a, l, u, h) {
    return Si(r), r.updateQueue = null, a = vg(
      r,
      l,
      a,
      u
    ), hg(t), l = jf(), t !== null && !Tt ? ($f(t, r, h), hr(t, r, h)) : (Ge && l && xf(r), r.flags |= 1, zt(t, r, a, h), r.child);
  }
  function pp(t, r, a, l, u) {
    if (Si(r), r.stateNode === null) {
      var h = da, y = a.contextType;
      typeof y == "object" && y !== null && (h = Vt(y)), h = new a(l, h), r.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = td, r.stateNode = h, h._reactInternals = r, h = r.stateNode, h.props = l, h.state = r.memoizedState, h.refs = {}, Mf(r), y = a.contextType, h.context = typeof y == "object" && y !== null ? Vt(y) : da, h.state = r.memoizedState, y = a.getDerivedStateFromProps, typeof y == "function" && (ed(
        r,
        a,
        y,
        l
      ), h.state = r.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (y = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), y !== h.state && td.enqueueReplaceState(h, h.state, null), Ho(r, l, h, u), Uo(), h.state = r.memoizedState), typeof h.componentDidMount == "function" && (r.flags |= 4194308), l = !0;
    } else if (t === null) {
      h = r.stateNode;
      var x = r.memoizedProps, T = Ai(a, x);
      h.props = T;
      var H = h.context, q = a.contextType;
      y = da, typeof q == "object" && q !== null && (y = Vt(q));
      var I = a.getDerivedStateFromProps;
      q = typeof I == "function" || typeof h.getSnapshotBeforeUpdate == "function", x = r.pendingProps !== x, q || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x || H !== y) && np(
        r,
        h,
        l,
        y
      ), Lr = !1;
      var B = r.memoizedState;
      h.state = B, Ho(r, l, h, u), Uo(), H = r.memoizedState, x || B !== H || Lr ? (typeof I == "function" && (ed(
        r,
        a,
        I,
        l
      ), H = r.memoizedState), (T = Lr || tp(
        r,
        a,
        T,
        l,
        B,
        H,
        y
      )) ? (q || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = l, r.memoizedState = H), h.props = l, h.state = H, h.context = y, l = T) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), l = !1);
    } else {
      h = r.stateNode, Df(t, r), y = r.memoizedProps, q = Ai(a, y), h.props = q, I = r.pendingProps, B = h.context, H = a.contextType, T = da, typeof H == "object" && H !== null && (T = Vt(H)), x = a.getDerivedStateFromProps, (H = typeof x == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== I || B !== T) && np(
        r,
        h,
        l,
        T
      ), Lr = !1, B = r.memoizedState, h.state = B, Ho(r, l, h, u), Uo();
      var V = r.memoizedState;
      y !== I || B !== V || Lr || t !== null && t.dependencies !== null && ds(t.dependencies) ? (typeof x == "function" && (ed(
        r,
        a,
        x,
        l
      ), V = r.memoizedState), (q = Lr || tp(
        r,
        a,
        q,
        l,
        B,
        V,
        T
      ) || t !== null && t.dependencies !== null && ds(t.dependencies)) ? (H || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, V, T), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        V,
        T
      )), typeof h.componentDidUpdate == "function" && (r.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === t.memoizedProps && B === t.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === t.memoizedProps && B === t.memoizedState || (r.flags |= 1024), r.memoizedProps = l, r.memoizedState = V), h.props = l, h.state = V, h.context = T, l = q) : (typeof h.componentDidUpdate != "function" || y === t.memoizedProps && B === t.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === t.memoizedProps && B === t.memoizedState || (r.flags |= 1024), l = !1);
    }
    return h = l, zs(t, r), l = (r.flags & 128) !== 0, h || l ? (h = r.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : h.render(), r.flags |= 1, t !== null && l ? (r.child = xa(
      r,
      t.child,
      null,
      u
    ), r.child = xa(
      r,
      null,
      a,
      u
    )) : zt(t, r, a, u), r.memoizedState = h.state, t = r.child) : t = hr(
      t,
      r,
      u
    ), t;
  }
  function mp(t, r, a, l) {
    return To(), r.flags |= 256, zt(t, r, a, l), r.child;
  }
  var id = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ad(t) {
    return { baseLanes: t, cachePool: ig() };
  }
  function od(t, r, a) {
    return t = t !== null ? t.childLanes & ~a : 0, r && (t |= wn), t;
  }
  function yp(t, r, a) {
    var l = r.pendingProps, u = !1, h = (r.flags & 128) !== 0, y;
    if ((y = h) || (y = t !== null && t.memoizedState === null ? !1 : (xt.current & 2) !== 0), y && (u = !0, r.flags &= -129), y = (r.flags & 32) !== 0, r.flags &= -33, t === null) {
      if (Ge) {
        if (u ? Vr(r) : jr(), Ge) {
          var x = ht, T;
          if (T = x) {
            e: {
              for (T = x, x = Bn; T.nodeType !== 8; ) {
                if (!x) {
                  x = null;
                  break e;
                }
                if (T = Nn(
                  T.nextSibling
                ), T === null) {
                  x = null;
                  break e;
                }
              }
              x = T;
            }
            x !== null ? (r.memoizedState = {
              dehydrated: x,
              treeContext: yi !== null ? { id: lr, overflow: sr } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, T = on(
              18,
              null,
              null,
              0
            ), T.stateNode = x, T.return = r, r.child = T, Gt = r, ht = null, T = !0) : T = !1;
          }
          T || _i(r);
        }
        if (x = r.memoizedState, x !== null && (x = x.dehydrated, x !== null))
          return qd(x) ? r.lanes = 32 : r.lanes = 536870912, null;
        dr(r);
      }
      return x = l.children, l = l.fallback, u ? (jr(), u = r.mode, x = Ms(
        { mode: "hidden", children: x },
        u
      ), l = mi(
        l,
        u,
        a,
        null
      ), x.return = r, l.return = r, x.sibling = l, r.child = x, u = r.child, u.memoizedState = ad(a), u.childLanes = od(
        t,
        y,
        a
      ), r.memoizedState = id, l) : (Vr(r), ld(r, x));
    }
    if (T = t.memoizedState, T !== null && (x = T.dehydrated, x !== null)) {
      if (h)
        r.flags & 256 ? (Vr(r), r.flags &= -257, r = sd(
          t,
          r,
          a
        )) : r.memoizedState !== null ? (jr(), r.child = t.child, r.flags |= 128, r = null) : (jr(), u = l.fallback, x = r.mode, l = Ms(
          { mode: "visible", children: l.children },
          x
        ), u = mi(
          u,
          x,
          a,
          null
        ), u.flags |= 2, l.return = r, u.return = r, l.sibling = u, r.child = l, xa(
          r,
          t.child,
          null,
          a
        ), l = r.child, l.memoizedState = ad(a), l.childLanes = od(
          t,
          y,
          a
        ), r.memoizedState = id, r = u);
      else if (Vr(r), qd(x)) {
        if (y = x.nextSibling && x.nextSibling.dataset, y) var H = y.dgst;
        y = H, l = Error(o(419)), l.stack = "", l.digest = y, No({ value: l, source: null, stack: null }), r = sd(
          t,
          r,
          a
        );
      } else if (Tt || Oo(t, r, a, !1), y = (a & t.childLanes) !== 0, Tt || y) {
        if (y = rt, y !== null && (l = a & -a, l = (l & 42) !== 0 ? 1 : qu(l), l = (l & (y.suspendedLanes | a)) !== 0 ? 0 : l, l !== 0 && l !== T.retryLane))
          throw T.retryLane = l, fa(t, l), fn(y, t, l), cp;
        x.data === "$?" || Ad(), r = sd(
          t,
          r,
          a
        );
      } else
        x.data === "$?" ? (r.flags |= 192, r.child = t.child, r = null) : (t = T.treeContext, ht = Nn(
          x.nextSibling
        ), Gt = r, Ge = !0, wi = null, Bn = !1, t !== null && (mn[yn++] = lr, mn[yn++] = sr, mn[yn++] = yi, lr = t.id, sr = t.overflow, yi = r), r = ld(
          r,
          l.children
        ), r.flags |= 4096);
      return r;
    }
    return u ? (jr(), u = l.fallback, x = r.mode, T = t.child, H = T.sibling, l = or(T, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = T.subtreeFlags & 65011712, H !== null ? u = or(H, u) : (u = mi(
      u,
      x,
      a,
      null
    ), u.flags |= 2), u.return = r, l.return = r, l.sibling = u, r.child = l, l = u, u = r.child, x = t.child.memoizedState, x === null ? x = ad(a) : (T = x.cachePool, T !== null ? (H = _t._currentValue, T = T.parent !== H ? { parent: H, pool: H } : T) : T = ig(), x = {
      baseLanes: x.baseLanes | a,
      cachePool: T
    }), u.memoizedState = x, u.childLanes = od(
      t,
      y,
      a
    ), r.memoizedState = id, l) : (Vr(r), a = t.child, t = a.sibling, a = or(a, {
      mode: "visible",
      children: l.children
    }), a.return = r, a.sibling = null, t !== null && (y = r.deletions, y === null ? (r.deletions = [t], r.flags |= 16) : y.push(t)), r.child = a, r.memoizedState = null, a);
  }
  function ld(t, r) {
    return r = Ms(
      { mode: "visible", children: r },
      t.mode
    ), r.return = t, t.child = r;
  }
  function Ms(t, r) {
    return t = on(22, t, null, r), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function sd(t, r, a) {
    return xa(r, t.child, null, a), t = ld(
      r,
      r.pendingProps.children
    ), t.flags |= 2, r.memoizedState = null, t;
  }
  function bp(t, r, a) {
    t.lanes |= r;
    var l = t.alternate;
    l !== null && (l.lanes |= r), Af(t.return, r, a);
  }
  function cd(t, r, a, l, u) {
    var h = t.memoizedState;
    h === null ? t.memoizedState = {
      isBackwards: r,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: u
    } : (h.isBackwards = r, h.rendering = null, h.renderingStartTime = 0, h.last = l, h.tail = a, h.tailMode = u);
  }
  function wp(t, r, a) {
    var l = r.pendingProps, u = l.revealOrder, h = l.tail;
    if (zt(t, r, l.children, a), l = xt.current, (l & 2) !== 0)
      l = l & 1 | 2, r.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = r.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && bp(t, a, r);
          else if (t.tag === 19)
            bp(t, a, r);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === r) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === r)
              break e;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      l &= 1;
    }
    switch (ne(xt, l), u) {
      case "forwards":
        for (a = r.child, u = null; a !== null; )
          t = a.alternate, t !== null && Ts(t) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = r.child, r.child = null) : (u = a.sibling, a.sibling = null), cd(
          r,
          !1,
          u,
          a,
          h
        );
        break;
      case "backwards":
        for (a = null, u = r.child, r.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Ts(t) === null) {
            r.child = u;
            break;
          }
          t = u.sibling, u.sibling = a, a = u, u = t;
        }
        cd(
          r,
          !0,
          a,
          null,
          h
        );
        break;
      case "together":
        cd(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function hr(t, r, a) {
    if (t !== null && (r.dependencies = t.dependencies), Pr |= r.lanes, (a & r.childLanes) === 0)
      if (t !== null) {
        if (Oo(
          t,
          r,
          a,
          !1
        ), (a & r.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && r.child !== t.child)
      throw Error(o(153));
    if (r.child !== null) {
      for (t = r.child, a = or(t, t.pendingProps), r.child = a, a.return = r; t.sibling !== null; )
        t = t.sibling, a = a.sibling = or(t, t.pendingProps), a.return = r;
      a.sibling = null;
    }
    return r.child;
  }
  function ud(t, r) {
    return (t.lanes & r) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ds(t)));
  }
  function K5(t, r, a) {
    switch (r.tag) {
      case 3:
        lt(r, r.stateNode.containerInfo), Rr(r, _t, t.memoizedState.cache), To();
        break;
      case 27:
      case 5:
        Bu(r);
        break;
      case 4:
        lt(r, r.stateNode.containerInfo);
        break;
      case 10:
        Rr(
          r,
          r.type,
          r.memoizedProps.value
        );
        break;
      case 13:
        var l = r.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Vr(r), r.flags |= 128, null) : (a & r.child.childLanes) !== 0 ? yp(t, r, a) : (Vr(r), t = hr(
            t,
            r,
            a
          ), t !== null ? t.sibling : null);
        Vr(r);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (l = (a & r.childLanes) !== 0, l || (Oo(
          t,
          r,
          a,
          !1
        ), l = (a & r.childLanes) !== 0), u) {
          if (l)
            return wp(
              t,
              r,
              a
            );
          r.flags |= 128;
        }
        if (u = r.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ne(xt, xt.current), l) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, hp(t, r, a);
      case 24:
        Rr(r, _t, t.memoizedState.cache);
    }
    return hr(t, r, a);
  }
  function _p(t, r, a) {
    if (t !== null)
      if (t.memoizedProps !== r.pendingProps)
        Tt = !0;
      else {
        if (!ud(t, a) && (r.flags & 128) === 0)
          return Tt = !1, K5(
            t,
            r,
            a
          );
        Tt = (t.flags & 131072) !== 0;
      }
    else
      Tt = !1, Ge && (r.flags & 1048576) !== 0 && Fv(r, fs, r.index);
    switch (r.lanes = 0, r.tag) {
      case 16:
        e: {
          t = r.pendingProps;
          var l = r.elementType, u = l._init;
          if (l = u(l._payload), r.type = l, typeof l == "function")
            bf(l) ? (t = Ai(l, t), r.tag = 1, r = pp(
              null,
              r,
              l,
              t,
              a
            )) : (r.tag = 0, r = rd(
              null,
              r,
              l,
              t,
              a
            ));
          else {
            if (l != null) {
              if (u = l.$$typeof, u === D) {
                r.tag = 11, r = up(
                  null,
                  r,
                  l,
                  t,
                  a
                );
                break e;
              } else if (u === Y) {
                r.tag = 14, r = fp(
                  null,
                  r,
                  l,
                  t,
                  a
                );
                break e;
              }
            }
            throw r = Ee(l) || l, Error(o(306, r, ""));
          }
        }
        return r;
      case 0:
        return rd(
          t,
          r,
          r.type,
          r.pendingProps,
          a
        );
      case 1:
        return l = r.type, u = Ai(
          l,
          r.pendingProps
        ), pp(
          t,
          r,
          l,
          u,
          a
        );
      case 3:
        e: {
          if (lt(
            r,
            r.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          l = r.pendingProps;
          var h = r.memoizedState;
          u = h.element, Df(t, r), Ho(r, l, null, a);
          var y = r.memoizedState;
          if (l = y.cache, Rr(r, _t, l), l !== h.cache && Ef(
            r,
            [_t],
            a,
            !0
          ), Uo(), l = y.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, r.updateQueue.baseState = h, r.memoizedState = h, r.flags & 256) {
              r = mp(
                t,
                r,
                l,
                a
              );
              break e;
            } else if (l !== u) {
              u = gn(
                Error(o(424)),
                r
              ), No(u), r = mp(
                t,
                r,
                l,
                a
              );
              break e;
            } else {
              switch (t = r.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (ht = Nn(t.firstChild), Gt = r, Ge = !0, wi = null, Bn = !0, a = Jg(
                r,
                null,
                l,
                a
              ), r.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (To(), l === u) {
              r = hr(
                t,
                r,
                a
              );
              break e;
            }
            zt(
              t,
              r,
              l,
              a
            );
          }
          r = r.child;
        }
        return r;
      case 26:
        return zs(t, r), t === null ? (a = km(
          r.type,
          null,
          r.pendingProps,
          null
        )) ? r.memoizedState = a : Ge || (a = r.type, t = r.pendingProps, l = Is(
          _e.current
        ).createElement(a), l[Bt] = r, l[It] = t, Dt(l, a, t), Et(l), r.stateNode = l) : r.memoizedState = km(
          r.type,
          t.memoizedProps,
          r.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Bu(r), t === null && Ge && (l = r.stateNode = xm(
          r.type,
          r.pendingProps,
          _e.current
        ), Gt = r, Bn = !0, u = ht, Xr(r.type) ? (Gd = u, ht = Nn(
          l.firstChild
        )) : ht = u), zt(
          t,
          r,
          r.pendingProps.children,
          a
        ), zs(t, r), t === null && (r.flags |= 4194304), r.child;
      case 5:
        return t === null && Ge && ((u = l = ht) && (l = p3(
          l,
          r.type,
          r.pendingProps,
          Bn
        ), l !== null ? (r.stateNode = l, Gt = r, ht = Nn(
          l.firstChild
        ), Bn = !1, u = !0) : u = !1), u || _i(r)), Bu(r), u = r.type, h = r.pendingProps, y = t !== null ? t.memoizedProps : null, l = h.children, jd(u, h) ? l = null : y !== null && jd(u, y) && (r.flags |= 32), r.memoizedState !== null && (u = Vf(
          t,
          r,
          R5,
          null,
          null,
          a
        ), al._currentValue = u), zs(t, r), zt(t, r, l, a), r.child;
      case 6:
        return t === null && Ge && ((t = a = ht) && (a = m3(
          a,
          r.pendingProps,
          Bn
        ), a !== null ? (r.stateNode = a, Gt = r, ht = null, t = !0) : t = !1), t || _i(r)), null;
      case 13:
        return yp(t, r, a);
      case 4:
        return lt(
          r,
          r.stateNode.containerInfo
        ), l = r.pendingProps, t === null ? r.child = xa(
          r,
          null,
          l,
          a
        ) : zt(
          t,
          r,
          l,
          a
        ), r.child;
      case 11:
        return up(
          t,
          r,
          r.type,
          r.pendingProps,
          a
        );
      case 7:
        return zt(
          t,
          r,
          r.pendingProps,
          a
        ), r.child;
      case 8:
        return zt(
          t,
          r,
          r.pendingProps.children,
          a
        ), r.child;
      case 12:
        return zt(
          t,
          r,
          r.pendingProps.children,
          a
        ), r.child;
      case 10:
        return l = r.pendingProps, Rr(r, r.type, l.value), zt(
          t,
          r,
          l.children,
          a
        ), r.child;
      case 9:
        return u = r.type._context, l = r.pendingProps.children, Si(r), u = Vt(u), l = l(u), r.flags |= 1, zt(t, r, l, a), r.child;
      case 14:
        return fp(
          t,
          r,
          r.type,
          r.pendingProps,
          a
        );
      case 15:
        return dp(
          t,
          r,
          r.type,
          r.pendingProps,
          a
        );
      case 19:
        return wp(t, r, a);
      case 31:
        return l = r.pendingProps, a = r.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (a = Ms(
          l,
          a
        ), a.ref = r.ref, r.child = a, a.return = r, r = a) : (a = or(t.child, l), a.ref = r.ref, r.child = a, a.return = r, r = a), r;
      case 22:
        return hp(t, r, a);
      case 24:
        return Si(r), l = Vt(_t), t === null ? (u = Of(), u === null && (u = rt, h = Tf(), u.pooledCache = h, h.refCount++, h !== null && (u.pooledCacheLanes |= a), u = h), r.memoizedState = {
          parent: l,
          cache: u
        }, Mf(r), Rr(r, _t, u)) : ((t.lanes & a) !== 0 && (Df(t, r), Ho(r, null, null, a), Uo()), u = t.memoizedState, h = r.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, r.memoizedState = u, r.lanes === 0 && (r.memoizedState = r.updateQueue.baseState = u), Rr(r, _t, l)) : (l = h.cache, Rr(r, _t, l), l !== u.cache && Ef(
          r,
          [_t],
          a,
          !0
        ))), zt(
          t,
          r,
          r.pendingProps.children,
          a
        ), r.child;
      case 29:
        throw r.pendingProps;
    }
    throw Error(o(156, r.tag));
  }
  function vr(t) {
    t.flags |= 4;
  }
  function xp(t, r) {
    if (r.type !== "stylesheet" || (r.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Om(r)) {
      if (r = bn.current, r !== null && ((Ve & 4194048) === Ve ? Vn !== null : (Ve & 62914560) !== Ve && (Ve & 536870912) === 0 || r !== Vn))
        throw Ro = zf, ag;
      t.flags |= 8192;
    }
  }
  function Ds(t, r) {
    r !== null && (t.flags |= 4), t.flags & 16384 && (r = t.tag !== 22 ? ev() : 536870912, t.lanes |= r, Aa |= r);
  }
  function Go(t, r) {
    if (!Ge)
      switch (t.tailMode) {
        case "hidden":
          r = t.tail;
          for (var a = null; r !== null; )
            r.alternate !== null && (a = r), r = r.sibling;
          a === null ? t.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = t.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? r || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
  }
  function ut(t) {
    var r = t.alternate !== null && t.alternate.child === t.child, a = 0, l = 0;
    if (r)
      for (var u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= l, t.childLanes = a, r;
  }
  function q5(t, r, a) {
    var l = r.pendingProps;
    switch (Sf(r), r.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ut(r), null;
      case 1:
        return ut(r), null;
      case 3:
        return a = r.stateNode, l = null, t !== null && (l = t.memoizedState.cache), r.memoizedState.cache !== l && (r.flags |= 2048), ur(_t), Or(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (Eo(r) ? vr(r) : t === null || t.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, eg())), ut(r), null;
      case 26:
        return a = r.memoizedState, t === null ? (vr(r), a !== null ? (ut(r), xp(r, a)) : (ut(r), r.flags &= -16777217)) : a ? a !== t.memoizedState ? (vr(r), ut(r), xp(r, a)) : (ut(r), r.flags &= -16777217) : (t.memoizedProps !== l && vr(r), ut(r), r.flags &= -16777217), null;
      case 27:
        Gl(r), a = _e.current;
        var u = r.type;
        if (t !== null && r.stateNode != null)
          t.memoizedProps !== l && vr(r);
        else {
          if (!l) {
            if (r.stateNode === null)
              throw Error(o(166));
            return ut(r), null;
          }
          t = ge.current, Eo(r) ? Wv(r) : (t = xm(u, l, a), r.stateNode = t, vr(r));
        }
        return ut(r), null;
      case 5:
        if (Gl(r), a = r.type, t !== null && r.stateNode != null)
          t.memoizedProps !== l && vr(r);
        else {
          if (!l) {
            if (r.stateNode === null)
              throw Error(o(166));
            return ut(r), null;
          }
          if (t = ge.current, Eo(r))
            Wv(r);
          else {
            switch (u = Is(
              _e.current
            ), t) {
              case 1:
                t = u.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                t = u.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    t = u.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    t = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    t = u.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                    break;
                  case "select":
                    t = typeof l.is == "string" ? u.createElement("select", { is: l.is }) : u.createElement("select"), l.multiple ? t.multiple = !0 : l.size && (t.size = l.size);
                    break;
                  default:
                    t = typeof l.is == "string" ? u.createElement(a, { is: l.is }) : u.createElement(a);
                }
            }
            t[Bt] = r, t[It] = l;
            e: for (u = r.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6)
                t.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                u.child.return = u, u = u.child;
                continue;
              }
              if (u === r) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === r)
                  break e;
                u = u.return;
              }
              u.sibling.return = u.return, u = u.sibling;
            }
            r.stateNode = t;
            e: switch (Dt(t, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!l.autoFocus;
                break e;
              case "img":
                t = !0;
                break e;
              default:
                t = !1;
            }
            t && vr(r);
          }
        }
        return ut(r), r.flags &= -16777217, null;
      case 6:
        if (t && r.stateNode != null)
          t.memoizedProps !== l && vr(r);
        else {
          if (typeof l != "string" && r.stateNode === null)
            throw Error(o(166));
          if (t = _e.current, Eo(r)) {
            if (t = r.stateNode, a = r.memoizedProps, l = null, u = Gt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            t[Bt] = r, t = !!(t.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || gm(t.nodeValue, a)), t || _i(r);
          } else
            t = Is(t).createTextNode(
              l
            ), t[Bt] = r, r.stateNode = t;
        }
        return ut(r), null;
      case 13:
        if (l = r.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Eo(r), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (u = r.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Bt] = r;
            } else
              To(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            ut(r), u = !1;
          } else
            u = eg(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return r.flags & 256 ? (dr(r), r) : (dr(r), null);
        }
        if (dr(r), (r.flags & 128) !== 0)
          return r.lanes = a, r;
        if (a = l !== null, t = t !== null && t.memoizedState !== null, a) {
          l = r.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool);
          var h = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== u && (l.flags |= 2048);
        }
        return a !== t && a && (r.child.flags |= 8192), Ds(r, r.updateQueue), ut(r), null;
      case 4:
        return Or(), t === null && Ld(r.stateNode.containerInfo), ut(r), null;
      case 10:
        return ur(r.type), ut(r), null;
      case 19:
        if (J(xt), u = r.memoizedState, u === null) return ut(r), null;
        if (l = (r.flags & 128) !== 0, h = u.rendering, h === null)
          if (l) Go(u, !1);
          else {
            if (vt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = r.child; t !== null; ) {
                if (h = Ts(t), h !== null) {
                  for (r.flags |= 128, Go(u, !1), t = h.updateQueue, r.updateQueue = t, Ds(r, t), r.subtreeFlags = 0, t = a, a = r.child; a !== null; )
                    Qv(a, t), a = a.sibling;
                  return ne(
                    xt,
                    xt.current & 1 | 2
                  ), r.child;
                }
                t = t.sibling;
              }
            u.tail !== null && Hn() > Us && (r.flags |= 128, l = !0, Go(u, !1), r.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = Ts(h), t !== null) {
              if (r.flags |= 128, l = !0, t = t.updateQueue, r.updateQueue = t, Ds(r, t), Go(u, !0), u.tail === null && u.tailMode === "hidden" && !h.alternate && !Ge)
                return ut(r), null;
            } else
              2 * Hn() - u.renderingStartTime > Us && a !== 536870912 && (r.flags |= 128, l = !0, Go(u, !1), r.lanes = 4194304);
          u.isBackwards ? (h.sibling = r.child, r.child = h) : (t = u.last, t !== null ? t.sibling = h : r.child = h, u.last = h);
        }
        return u.tail !== null ? (r = u.tail, u.rendering = r, u.tail = r.sibling, u.renderingStartTime = Hn(), r.sibling = null, t = xt.current, ne(xt, l ? t & 1 | 2 : t & 1), r) : (ut(r), null);
      case 22:
      case 23:
        return dr(r), Hf(), l = r.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (r.flags |= 8192) : l && (r.flags |= 8192), l ? (a & 536870912) !== 0 && (r.flags & 128) === 0 && (ut(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : ut(r), a = r.updateQueue, a !== null && Ds(r, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), l = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (l = r.memoizedState.cachePool.pool), l !== a && (r.flags |= 2048), t !== null && J(Ci), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), r.memoizedState.cache !== a && (r.flags |= 2048), ur(_t), ut(r), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, r.tag));
  }
  function G5(t, r) {
    switch (Sf(r), r.tag) {
      case 1:
        return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
      case 3:
        return ur(_t), Or(), t = r.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (r.flags = t & -65537 | 128, r) : null;
      case 26:
      case 27:
      case 5:
        return Gl(r), null;
      case 13:
        if (dr(r), t = r.memoizedState, t !== null && t.dehydrated !== null) {
          if (r.alternate === null)
            throw Error(o(340));
          To();
        }
        return t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
      case 19:
        return J(xt), null;
      case 4:
        return Or(), null;
      case 10:
        return ur(r.type), null;
      case 22:
      case 23:
        return dr(r), Hf(), t !== null && J(Ci), t = r.flags, t & 65536 ? (r.flags = t & -65537 | 128, r) : null;
      case 24:
        return ur(_t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Sp(t, r) {
    switch (Sf(r), r.tag) {
      case 3:
        ur(_t), Or();
        break;
      case 26:
      case 27:
      case 5:
        Gl(r);
        break;
      case 4:
        Or();
        break;
      case 13:
        dr(r);
        break;
      case 19:
        J(xt);
        break;
      case 10:
        ur(r.type);
        break;
      case 22:
      case 23:
        dr(r), Hf(), t !== null && J(Ci);
        break;
      case 24:
        ur(_t);
    }
  }
  function Po(t, r) {
    try {
      var a = r.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            l = void 0;
            var h = a.create, y = a.inst;
            l = h(), y.destroy = l;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (x) {
      Je(r, r.return, x);
    }
  }
  function $r(t, r, a) {
    try {
      var l = r.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var h = u.next;
        l = h;
        do {
          if ((l.tag & t) === t) {
            var y = l.inst, x = y.destroy;
            if (x !== void 0) {
              y.destroy = void 0, u = r;
              var T = a, H = x;
              try {
                H();
              } catch (q) {
                Je(
                  u,
                  T,
                  q
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (q) {
      Je(r, r.return, q);
    }
  }
  function Cp(t) {
    var r = t.updateQueue;
    if (r !== null) {
      var a = t.stateNode;
      try {
        fg(r, a);
      } catch (l) {
        Je(t, t.return, l);
      }
    }
  }
  function kp(t, r, a) {
    a.props = Ai(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Je(t, r, l);
    }
  }
  function Io(t, r) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof a == "function" ? t.refCleanup = a(l) : a.current = l;
      }
    } catch (u) {
      Je(t, r, u);
    }
  }
  function jn(t, r) {
    var a = t.ref, l = t.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Je(t, r, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Je(t, r, u);
        }
      else a.current = null;
  }
  function Ap(t) {
    var r = t.type, a = t.memoizedProps, l = t.stateNode;
    try {
      e: switch (r) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (u) {
      Je(t, t.return, u);
    }
  }
  function fd(t, r, a) {
    try {
      var l = t.stateNode;
      f3(l, t.type, a, r), l[It] = r;
    } catch (u) {
      Je(t, t.return, u);
    }
  }
  function Ep(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Xr(t.type) || t.tag === 4;
  }
  function dd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ep(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Xr(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function hd(t, r, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, r ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, r) : (r = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, r.appendChild(t), a = a._reactRootContainer, a != null || r.onclick !== null || (r.onclick = Ps));
    else if (l !== 4 && (l === 27 && Xr(t.type) && (a = t.stateNode, r = null), t = t.child, t !== null))
      for (hd(t, r, a), t = t.sibling; t !== null; )
        hd(t, r, a), t = t.sibling;
  }
  function Rs(t, r, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, r ? a.insertBefore(t, r) : a.appendChild(t);
    else if (l !== 4 && (l === 27 && Xr(t.type) && (a = t.stateNode), t = t.child, t !== null))
      for (Rs(t, r, a), t = t.sibling; t !== null; )
        Rs(t, r, a), t = t.sibling;
  }
  function Tp(t) {
    var r = t.stateNode, a = t.memoizedProps;
    try {
      for (var l = t.type, u = r.attributes; u.length; )
        r.removeAttributeNode(u[0]);
      Dt(r, l, a), r[Bt] = t, r[It] = a;
    } catch (h) {
      Je(t, t.return, h);
    }
  }
  var gr = !1, mt = !1, vd = !1, Np = typeof WeakSet == "function" ? WeakSet : Set, Nt = null;
  function P5(t, r) {
    if (t = t.containerInfo, Bd = Ws, t = jv(t), df(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        e: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var u = l.anchorOffset, h = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, h.nodeType;
            } catch {
              a = null;
              break e;
            }
            var y = 0, x = -1, T = -1, H = 0, q = 0, I = t, B = null;
            t: for (; ; ) {
              for (var V; I !== a || u !== 0 && I.nodeType !== 3 || (x = y + u), I !== h || l !== 0 && I.nodeType !== 3 || (T = y + l), I.nodeType === 3 && (y += I.nodeValue.length), (V = I.firstChild) !== null; )
                B = I, I = V;
              for (; ; ) {
                if (I === t) break t;
                if (B === a && ++H === u && (x = y), B === h && ++q === l && (T = y), (V = I.nextSibling) !== null) break;
                I = B, B = I.parentNode;
              }
              I = V;
            }
            a = x === -1 || T === -1 ? null : { start: x, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Vd = { focusedElem: t, selectionRange: a }, Ws = !1, Nt = r; Nt !== null; )
      if (r = Nt, t = r.child, (r.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = r, Nt = t;
      else
        for (; Nt !== null; ) {
          switch (r = Nt, h = r.alternate, t = r.flags, r.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, a = r, u = h.memoizedProps, h = h.memoizedState, l = a.stateNode;
                try {
                  var Ce = Ai(
                    a.type,
                    u,
                    a.elementType === a.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    Ce,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (ye) {
                  Je(
                    a,
                    a.return,
                    ye
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = r.stateNode.containerInfo, a = t.nodeType, a === 9)
                  Kd(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Kd(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = r.sibling, t !== null) {
            t.return = r.return, Nt = t;
            break;
          }
          Nt = r.return;
        }
  }
  function Op(t, r, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Kr(t, a), l & 4 && Po(5, a);
        break;
      case 1:
        if (Kr(t, a), l & 4)
          if (t = a.stateNode, r === null)
            try {
              t.componentDidMount();
            } catch (y) {
              Je(a, a.return, y);
            }
          else {
            var u = Ai(
              a.type,
              r.memoizedProps
            );
            r = r.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                r,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Je(
                a,
                a.return,
                y
              );
            }
          }
        l & 64 && Cp(a), l & 512 && Io(a, a.return);
        break;
      case 3:
        if (Kr(t, a), l & 64 && (t = a.updateQueue, t !== null)) {
          if (r = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                r = a.child.stateNode;
                break;
              case 1:
                r = a.child.stateNode;
            }
          try {
            fg(t, r);
          } catch (y) {
            Je(a, a.return, y);
          }
        }
        break;
      case 27:
        r === null && l & 4 && Tp(a);
      case 26:
      case 5:
        Kr(t, a), r === null && l & 4 && Ap(a), l & 512 && Io(a, a.return);
        break;
      case 12:
        Kr(t, a);
        break;
      case 13:
        Kr(t, a), l & 4 && Dp(t, a), l & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = e3.bind(
          null,
          a
        ), y3(t, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || gr, !l) {
          r = r !== null && r.memoizedState !== null || mt, u = gr;
          var h = mt;
          gr = l, (mt = r) && !h ? qr(
            t,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Kr(t, a), gr = u, mt = h;
        }
        break;
      case 30:
        break;
      default:
        Kr(t, a);
    }
  }
  function zp(t) {
    var r = t.alternate;
    r !== null && (t.alternate = null, zp(r)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (r = t.stateNode, r !== null && Iu(r)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var st = null, Xt = !1;
  function pr(t, r, a) {
    for (a = a.child; a !== null; )
      Mp(t, r, a), a = a.sibling;
  }
  function Mp(t, r, a) {
    if (nn && typeof nn.onCommitFiberUnmount == "function")
      try {
        nn.onCommitFiberUnmount(ho, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        mt || jn(a, r), pr(
          t,
          r,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        mt || jn(a, r);
        var l = st, u = Xt;
        Xr(a.type) && (st = a.stateNode, Xt = !1), pr(
          t,
          r,
          a
        ), tl(a.stateNode), st = l, Xt = u;
        break;
      case 5:
        mt || jn(a, r);
      case 6:
        if (l = st, u = Xt, st = null, pr(
          t,
          r,
          a
        ), st = l, Xt = u, st !== null)
          if (Xt)
            try {
              (st.nodeType === 9 ? st.body : st.nodeName === "HTML" ? st.ownerDocument.body : st).removeChild(a.stateNode);
            } catch (h) {
              Je(
                a,
                r,
                h
              );
            }
          else
            try {
              st.removeChild(a.stateNode);
            } catch (h) {
              Je(
                a,
                r,
                h
              );
            }
        break;
      case 18:
        st !== null && (Xt ? (t = st, wm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), cl(t)) : wm(st, a.stateNode));
        break;
      case 4:
        l = st, u = Xt, st = a.stateNode.containerInfo, Xt = !0, pr(
          t,
          r,
          a
        ), st = l, Xt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        mt || $r(2, a, r), mt || $r(4, a, r), pr(
          t,
          r,
          a
        );
        break;
      case 1:
        mt || (jn(a, r), l = a.stateNode, typeof l.componentWillUnmount == "function" && kp(
          a,
          r,
          l
        )), pr(
          t,
          r,
          a
        );
        break;
      case 21:
        pr(
          t,
          r,
          a
        );
        break;
      case 22:
        mt = (l = mt) || a.memoizedState !== null, pr(
          t,
          r,
          a
        ), mt = l;
        break;
      default:
        pr(
          t,
          r,
          a
        );
    }
  }
  function Dp(t, r) {
    if (r.memoizedState === null && (t = r.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        cl(t);
      } catch (a) {
        Je(r, r.return, a);
      }
  }
  function I5(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var r = t.stateNode;
        return r === null && (r = t.stateNode = new Np()), r;
      case 22:
        return t = t.stateNode, r = t._retryCache, r === null && (r = t._retryCache = new Np()), r;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function gd(t, r) {
    var a = I5(t);
    r.forEach(function(l) {
      var u = t3.bind(null, t, l);
      a.has(l) || (a.add(l), l.then(u, u));
    });
  }
  function ln(t, r) {
    var a = r.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var u = a[l], h = t, y = r, x = y;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (Xr(x.type)) {
                st = x.stateNode, Xt = !1;
                break e;
              }
              break;
            case 5:
              st = x.stateNode, Xt = !1;
              break e;
            case 3:
            case 4:
              st = x.stateNode.containerInfo, Xt = !0;
              break e;
          }
          x = x.return;
        }
        if (st === null) throw Error(o(160));
        Mp(h, y, u), st = null, Xt = !1, h = u.alternate, h !== null && (h.return = null), u.return = null;
      }
    if (r.subtreeFlags & 13878)
      for (r = r.child; r !== null; )
        Rp(r, t), r = r.sibling;
  }
  var Tn = null;
  function Rp(t, r) {
    var a = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ln(r, t), sn(t), l & 4 && ($r(3, t, t.return), Po(3, t), $r(5, t, t.return));
        break;
      case 1:
        ln(r, t), sn(t), l & 512 && (mt || a === null || jn(a, a.return)), l & 64 && gr && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var u = Tn;
        if (ln(r, t), sn(t), l & 512 && (mt || a === null || jn(a, a.return)), l & 4) {
          var h = a !== null ? a.memoizedState : null;
          if (l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null) {
                e: {
                  l = t.type, a = t.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      h = u.getElementsByTagName("title")[0], (!h || h[po] || h[Bt] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = u.createElement(l), u.head.insertBefore(
                        h,
                        u.querySelector("head > title")
                      )), Dt(h, l, a), h[Bt] = t, Et(h), l = h;
                      break e;
                    case "link":
                      var y = Tm(
                        "link",
                        "href",
                        u
                      ).get(l + (a.href || ""));
                      if (y) {
                        for (var x = 0; x < y.length; x++)
                          if (h = y[x], h.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && h.getAttribute("rel") === (a.rel == null ? null : a.rel) && h.getAttribute("title") === (a.title == null ? null : a.title) && h.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      h = u.createElement(l), Dt(h, l, a), u.head.appendChild(h);
                      break;
                    case "meta":
                      if (y = Tm(
                        "meta",
                        "content",
                        u
                      ).get(l + (a.content || ""))) {
                        for (x = 0; x < y.length; x++)
                          if (h = y[x], h.getAttribute("content") === (a.content == null ? null : "" + a.content) && h.getAttribute("name") === (a.name == null ? null : a.name) && h.getAttribute("property") === (a.property == null ? null : a.property) && h.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && h.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      h = u.createElement(l), Dt(h, l, a), u.head.appendChild(h);
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  h[Bt] = t, Et(h), l = h;
                }
                t.stateNode = l;
              } else
                Nm(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Em(
                u,
                l,
                t.memoizedProps
              );
          else
            h !== l ? (h === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : h.count--, l === null ? Nm(
              u,
              t.type,
              t.stateNode
            ) : Em(
              u,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && fd(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        ln(r, t), sn(t), l & 512 && (mt || a === null || jn(a, a.return)), a !== null && l & 4 && fd(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (ln(r, t), sn(t), l & 512 && (mt || a === null || jn(a, a.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ia(u, "");
          } catch (V) {
            Je(t, t.return, V);
          }
        }
        l & 4 && t.stateNode != null && (u = t.memoizedProps, fd(
          t,
          u,
          a !== null ? a.memoizedProps : u
        )), l & 1024 && (vd = !0);
        break;
      case 6:
        if (ln(r, t), sn(t), l & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          l = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = l;
          } catch (V) {
            Je(t, t.return, V);
          }
        }
        break;
      case 3:
        if (Xs = null, u = Tn, Tn = Ys(r.containerInfo), ln(r, t), Tn = u, sn(t), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            cl(r.containerInfo);
          } catch (V) {
            Je(t, t.return, V);
          }
        vd && (vd = !1, Lp(t));
        break;
      case 4:
        l = Tn, Tn = Ys(
          t.stateNode.containerInfo
        ), ln(r, t), sn(t), Tn = l;
        break;
      case 12:
        ln(r, t), sn(t);
        break;
      case 13:
        ln(r, t), sn(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (_d = Hn()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, gd(t, l)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var T = a !== null && a.memoizedState !== null, H = gr, q = mt;
        if (gr = H || u, mt = q || T, ln(r, t), mt = q, gr = H, sn(t), l & 8192)
          e: for (r = t.stateNode, r._visibility = u ? r._visibility & -2 : r._visibility | 1, u && (a === null || T || gr || mt || Ei(t)), a = null, r = t; ; ) {
            if (r.tag === 5 || r.tag === 26) {
              if (a === null) {
                T = a = r;
                try {
                  if (h = T.stateNode, u)
                    y = h.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    x = T.stateNode;
                    var I = T.memoizedProps.style, B = I != null && I.hasOwnProperty("display") ? I.display : null;
                    x.style.display = B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (V) {
                  Je(T, T.return, V);
                }
              }
            } else if (r.tag === 6) {
              if (a === null) {
                T = r;
                try {
                  T.stateNode.nodeValue = u ? "" : T.memoizedProps;
                } catch (V) {
                  Je(T, T.return, V);
                }
              }
            } else if ((r.tag !== 22 && r.tag !== 23 || r.memoizedState === null || r === t) && r.child !== null) {
              r.child.return = r, r = r.child;
              continue;
            }
            if (r === t) break e;
            for (; r.sibling === null; ) {
              if (r.return === null || r.return === t) break e;
              a === r && (a = null), r = r.return;
            }
            a === r && (a = null), r.sibling.return = r.return, r = r.sibling;
          }
        l & 4 && (l = t.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, gd(t, a))));
        break;
      case 19:
        ln(r, t), sn(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, gd(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ln(r, t), sn(t);
    }
  }
  function sn(t) {
    var r = t.flags;
    if (r & 2) {
      try {
        for (var a, l = t.return; l !== null; ) {
          if (Ep(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, h = dd(t);
            Rs(t, h, u);
            break;
          case 5:
            var y = a.stateNode;
            a.flags & 32 && (ia(y, ""), a.flags &= -33);
            var x = dd(t);
            Rs(t, x, y);
            break;
          case 3:
          case 4:
            var T = a.stateNode.containerInfo, H = dd(t);
            hd(
              t,
              H,
              T
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (q) {
        Je(t, t.return, q);
      }
      t.flags &= -3;
    }
    r & 4096 && (t.flags &= -4097);
  }
  function Lp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var r = t;
        Lp(r), r.tag === 5 && r.flags & 1024 && r.stateNode.reset(), t = t.sibling;
      }
  }
  function Kr(t, r) {
    if (r.subtreeFlags & 8772)
      for (r = r.child; r !== null; )
        Op(t, r.alternate, r), r = r.sibling;
  }
  function Ei(t) {
    for (t = t.child; t !== null; ) {
      var r = t;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          $r(4, r, r.return), Ei(r);
          break;
        case 1:
          jn(r, r.return);
          var a = r.stateNode;
          typeof a.componentWillUnmount == "function" && kp(
            r,
            r.return,
            a
          ), Ei(r);
          break;
        case 27:
          tl(r.stateNode);
        case 26:
        case 5:
          jn(r, r.return), Ei(r);
          break;
        case 22:
          r.memoizedState === null && Ei(r);
          break;
        case 30:
          Ei(r);
          break;
        default:
          Ei(r);
      }
      t = t.sibling;
    }
  }
  function qr(t, r, a) {
    for (a = a && (r.subtreeFlags & 8772) !== 0, r = r.child; r !== null; ) {
      var l = r.alternate, u = t, h = r, y = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          qr(
            u,
            h,
            a
          ), Po(4, h);
          break;
        case 1:
          if (qr(
            u,
            h,
            a
          ), l = h, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (H) {
              Je(l, l.return, H);
            }
          if (l = h, u = l.updateQueue, u !== null) {
            var x = l.stateNode;
            try {
              var T = u.shared.hiddenCallbacks;
              if (T !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < T.length; u++)
                  ug(T[u], x);
            } catch (H) {
              Je(l, l.return, H);
            }
          }
          a && y & 64 && Cp(h), Io(h, h.return);
          break;
        case 27:
          Tp(h);
        case 26:
        case 5:
          qr(
            u,
            h,
            a
          ), a && l === null && y & 4 && Ap(h), Io(h, h.return);
          break;
        case 12:
          qr(
            u,
            h,
            a
          );
          break;
        case 13:
          qr(
            u,
            h,
            a
          ), a && y & 4 && Dp(u, h);
          break;
        case 22:
          h.memoizedState === null && qr(
            u,
            h,
            a
          ), Io(h, h.return);
          break;
        case 30:
          break;
        default:
          qr(
            u,
            h,
            a
          );
      }
      r = r.sibling;
    }
  }
  function pd(t, r) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (t = r.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && zo(a));
  }
  function md(t, r) {
    t = null, r.alternate !== null && (t = r.alternate.memoizedState.cache), r = r.memoizedState.cache, r !== t && (r.refCount++, t != null && zo(t));
  }
  function $n(t, r, a, l) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; )
        Up(
          t,
          r,
          a,
          l
        ), r = r.sibling;
  }
  function Up(t, r, a, l) {
    var u = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        $n(
          t,
          r,
          a,
          l
        ), u & 2048 && Po(9, r);
        break;
      case 1:
        $n(
          t,
          r,
          a,
          l
        );
        break;
      case 3:
        $n(
          t,
          r,
          a,
          l
        ), u & 2048 && (t = null, r.alternate !== null && (t = r.alternate.memoizedState.cache), r = r.memoizedState.cache, r !== t && (r.refCount++, t != null && zo(t)));
        break;
      case 12:
        if (u & 2048) {
          $n(
            t,
            r,
            a,
            l
          ), t = r.stateNode;
          try {
            var h = r.memoizedProps, y = h.id, x = h.onPostCommit;
            typeof x == "function" && x(
              y,
              r.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Je(r, r.return, T);
          }
        } else
          $n(
            t,
            r,
            a,
            l
          );
        break;
      case 13:
        $n(
          t,
          r,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = r.stateNode, y = r.alternate, r.memoizedState !== null ? h._visibility & 2 ? $n(
          t,
          r,
          a,
          l
        ) : Yo(t, r) : h._visibility & 2 ? $n(
          t,
          r,
          a,
          l
        ) : (h._visibility |= 2, Sa(
          t,
          r,
          a,
          l,
          (r.subtreeFlags & 10256) !== 0
        )), u & 2048 && pd(y, r);
        break;
      case 24:
        $n(
          t,
          r,
          a,
          l
        ), u & 2048 && md(r.alternate, r);
        break;
      default:
        $n(
          t,
          r,
          a,
          l
        );
    }
  }
  function Sa(t, r, a, l, u) {
    for (u = u && (r.subtreeFlags & 10256) !== 0, r = r.child; r !== null; ) {
      var h = t, y = r, x = a, T = l, H = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Sa(
            h,
            y,
            x,
            T,
            u
          ), Po(8, y);
          break;
        case 23:
          break;
        case 22:
          var q = y.stateNode;
          y.memoizedState !== null ? q._visibility & 2 ? Sa(
            h,
            y,
            x,
            T,
            u
          ) : Yo(
            h,
            y
          ) : (q._visibility |= 2, Sa(
            h,
            y,
            x,
            T,
            u
          )), u && H & 2048 && pd(
            y.alternate,
            y
          );
          break;
        case 24:
          Sa(
            h,
            y,
            x,
            T,
            u
          ), u && H & 2048 && md(y.alternate, y);
          break;
        default:
          Sa(
            h,
            y,
            x,
            T,
            u
          );
      }
      r = r.sibling;
    }
  }
  function Yo(t, r) {
    if (r.subtreeFlags & 10256)
      for (r = r.child; r !== null; ) {
        var a = t, l = r, u = l.flags;
        switch (l.tag) {
          case 22:
            Yo(a, l), u & 2048 && pd(
              l.alternate,
              l
            );
            break;
          case 24:
            Yo(a, l), u & 2048 && md(l.alternate, l);
            break;
          default:
            Yo(a, l);
        }
        r = r.sibling;
      }
  }
  var Zo = 8192;
  function Ca(t) {
    if (t.subtreeFlags & Zo)
      for (t = t.child; t !== null; )
        Hp(t), t = t.sibling;
  }
  function Hp(t) {
    switch (t.tag) {
      case 26:
        Ca(t), t.flags & Zo && t.memoizedState !== null && z3(
          Tn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ca(t);
        break;
      case 3:
      case 4:
        var r = Tn;
        Tn = Ys(t.stateNode.containerInfo), Ca(t), Tn = r;
        break;
      case 22:
        t.memoizedState === null && (r = t.alternate, r !== null && r.memoizedState !== null ? (r = Zo, Zo = 16777216, Ca(t), Zo = r) : Ca(t));
        break;
      default:
        Ca(t);
    }
  }
  function Bp(t) {
    var r = t.alternate;
    if (r !== null && (t = r.child, t !== null)) {
      r.child = null;
      do
        r = t.sibling, t.sibling = null, t = r;
      while (t !== null);
    }
  }
  function Xo(t) {
    var r = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (r !== null)
        for (var a = 0; a < r.length; a++) {
          var l = r[a];
          Nt = l, jp(
            l,
            t
          );
        }
      Bp(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Vp(t), t = t.sibling;
  }
  function Vp(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Xo(t), t.flags & 2048 && $r(9, t, t.return);
        break;
      case 3:
        Xo(t);
        break;
      case 12:
        Xo(t);
        break;
      case 22:
        var r = t.stateNode;
        t.memoizedState !== null && r._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (r._visibility &= -3, Ls(t)) : Xo(t);
        break;
      default:
        Xo(t);
    }
  }
  function Ls(t) {
    var r = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (r !== null)
        for (var a = 0; a < r.length; a++) {
          var l = r[a];
          Nt = l, jp(
            l,
            t
          );
        }
      Bp(t);
    }
    for (t = t.child; t !== null; ) {
      switch (r = t, r.tag) {
        case 0:
        case 11:
        case 15:
          $r(8, r, r.return), Ls(r);
          break;
        case 22:
          a = r.stateNode, a._visibility & 2 && (a._visibility &= -3, Ls(r));
          break;
        default:
          Ls(r);
      }
      t = t.sibling;
    }
  }
  function jp(t, r) {
    for (; Nt !== null; ) {
      var a = Nt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          $r(8, a, r);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          zo(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, Nt = l;
      else
        e: for (a = t; Nt !== null; ) {
          l = Nt;
          var u = l.sibling, h = l.return;
          if (zp(l), l === a) {
            Nt = null;
            break e;
          }
          if (u !== null) {
            u.return = h, Nt = u;
            break e;
          }
          Nt = h;
        }
    }
  }
  var Y5 = {
    getCacheForType: function(t) {
      var r = Vt(_t), a = r.data.get(t);
      return a === void 0 && (a = t(), r.data.set(t, a)), a;
    }
  }, Z5 = typeof WeakMap == "function" ? WeakMap : Map, Ie = 0, rt = null, Re = null, Ve = 0, Ye = 0, cn = null, Gr = !1, ka = !1, yd = !1, mr = 0, vt = 0, Pr = 0, Ti = 0, bd = 0, wn = 0, Aa = 0, Qo = null, Qt = null, wd = !1, _d = 0, Us = 1 / 0, Hs = null, Ir = null, Mt = 0, Yr = null, Ea = null, Ta = 0, xd = 0, Sd = null, $p = null, Fo = 0, Cd = null;
  function un() {
    if ((Ie & 2) !== 0 && Ve !== 0)
      return Ve & -Ve;
    if (j.T !== null) {
      var t = ga;
      return t !== 0 ? t : zd();
    }
    return rv();
  }
  function Kp() {
    wn === 0 && (wn = (Ve & 536870912) === 0 || Ge ? J0() : 536870912);
    var t = bn.current;
    return t !== null && (t.flags |= 32), wn;
  }
  function fn(t, r, a) {
    (t === rt && (Ye === 2 || Ye === 9) || t.cancelPendingCommit !== null) && (Na(t, 0), Zr(
      t,
      Ve,
      wn,
      !1
    )), go(t, a), ((Ie & 2) === 0 || t !== rt) && (t === rt && ((Ie & 2) === 0 && (Ti |= a), vt === 4 && Zr(
      t,
      Ve,
      wn,
      !1
    )), Kn(t));
  }
  function qp(t, r, a) {
    if ((Ie & 6) !== 0) throw Error(o(327));
    var l = !a && (r & 124) === 0 && (r & t.expiredLanes) === 0 || vo(t, r), u = l ? F5(t, r) : Ed(t, r, !0), h = l;
    do {
      if (u === 0) {
        ka && !l && Zr(t, r, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, h && !X5(a)) {
          u = Ed(t, r, !1), h = !1;
          continue;
        }
        if (u === 2) {
          if (h = r, t.errorRecoveryDisabledLanes & h)
            var y = 0;
          else
            y = t.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            r = y;
            e: {
              var x = t;
              u = Qo;
              var T = x.current.memoizedState.isDehydrated;
              if (T && (Na(x, y).flags |= 256), y = Ed(
                x,
                y,
                !1
              ), y !== 2) {
                if (yd && !T) {
                  x.errorRecoveryDisabledLanes |= h, Ti |= h, u = 4;
                  break e;
                }
                h = Qt, Qt = u, h !== null && (Qt === null ? Qt = h : Qt.push.apply(
                  Qt,
                  h
                ));
              }
              u = y;
            }
            if (h = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Na(t, 0), Zr(t, r, 0, !0);
          break;
        }
        e: {
          switch (l = t, h = u, h) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((r & 4194048) !== r) break;
            case 6:
              Zr(
                l,
                r,
                wn,
                !Gr
              );
              break e;
            case 2:
              Qt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((r & 62914560) === r && (u = _d + 300 - Hn(), 10 < u)) {
            if (Zr(
              l,
              r,
              wn,
              !Gr
            ), Zl(l, 0, !0) !== 0) break e;
            l.timeoutHandle = ym(
              Gp.bind(
                null,
                l,
                a,
                Qt,
                Hs,
                wd,
                r,
                wn,
                Ti,
                Aa,
                Gr,
                h,
                2,
                -0,
                0
              ),
              u
            );
            break e;
          }
          Gp(
            l,
            a,
            Qt,
            Hs,
            wd,
            r,
            wn,
            Ti,
            Aa,
            Gr,
            h,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Kn(t);
  }
  function Gp(t, r, a, l, u, h, y, x, T, H, q, I, B, V) {
    if (t.timeoutHandle = -1, I = r.subtreeFlags, (I & 8192 || (I & 16785408) === 16785408) && (il = { stylesheets: null, count: 0, unsuspend: O3 }, Hp(r), I = M3(), I !== null)) {
      t.cancelPendingCommit = I(
        Fp.bind(
          null,
          t,
          r,
          h,
          a,
          l,
          u,
          y,
          x,
          T,
          q,
          1,
          B,
          V
        )
      ), Zr(t, h, y, !H);
      return;
    }
    Fp(
      t,
      r,
      h,
      a,
      l,
      u,
      y,
      x,
      T
    );
  }
  function X5(t) {
    for (var r = t; ; ) {
      var a = r.tag;
      if ((a === 0 || a === 11 || a === 15) && r.flags & 16384 && (a = r.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var u = a[l], h = u.getSnapshot;
          u = u.value;
          try {
            if (!an(h(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = r.child, r.subtreeFlags & 16384 && a !== null)
        a.return = r, r = a;
      else {
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function Zr(t, r, a, l) {
    r &= ~bd, r &= ~Ti, t.suspendedLanes |= r, t.pingedLanes &= ~r, l && (t.warmLanes |= r), l = t.expirationTimes;
    for (var u = r; 0 < u; ) {
      var h = 31 - rn(u), y = 1 << h;
      l[h] = -1, u &= ~y;
    }
    a !== 0 && tv(t, a, r);
  }
  function Bs() {
    return (Ie & 6) === 0 ? (Wo(0), !1) : !0;
  }
  function kd() {
    if (Re !== null) {
      if (Ye === 0)
        var t = Re.return;
      else
        t = Re, cr = xi = null, Kf(t), _a = null, Ko = 0, t = Re;
      for (; t !== null; )
        Sp(t.alternate, t), t = t.return;
      Re = null;
    }
  }
  function Na(t, r) {
    var a = t.timeoutHandle;
    a !== -1 && (t.timeoutHandle = -1, h3(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), kd(), rt = t, Re = a = or(t.current, null), Ve = r, Ye = 0, cn = null, Gr = !1, ka = vo(t, r), yd = !1, Aa = wn = bd = Ti = Pr = vt = 0, Qt = Qo = null, wd = !1, (r & 8) !== 0 && (r |= r & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= r; 0 < l; ) {
        var u = 31 - rn(l), h = 1 << u;
        r |= t[u], l &= ~h;
      }
    return mr = r, os(), a;
  }
  function Pp(t, r) {
    Me = null, j.H = ks, r === Do || r === gs ? (r = sg(), Ye = 3) : r === ag ? (r = sg(), Ye = 4) : Ye = r === cp ? 8 : r !== null && typeof r == "object" && typeof r.then == "function" ? 6 : 1, cn = r, Re === null && (vt = 1, Os(
      t,
      gn(r, t.current)
    ));
  }
  function Ip() {
    var t = j.H;
    return j.H = ks, t === null ? ks : t;
  }
  function Yp() {
    var t = j.A;
    return j.A = Y5, t;
  }
  function Ad() {
    vt = 4, Gr || (Ve & 4194048) !== Ve && bn.current !== null || (ka = !0), (Pr & 134217727) === 0 && (Ti & 134217727) === 0 || rt === null || Zr(
      rt,
      Ve,
      wn,
      !1
    );
  }
  function Ed(t, r, a) {
    var l = Ie;
    Ie |= 2;
    var u = Ip(), h = Yp();
    (rt !== t || Ve !== r) && (Hs = null, Na(t, r)), r = !1;
    var y = vt;
    e: do
      try {
        if (Ye !== 0 && Re !== null) {
          var x = Re, T = cn;
          switch (Ye) {
            case 8:
              kd(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              bn.current === null && (r = !0);
              var H = Ye;
              if (Ye = 0, cn = null, Oa(t, x, T, H), a && ka) {
                y = 0;
                break e;
              }
              break;
            default:
              H = Ye, Ye = 0, cn = null, Oa(t, x, T, H);
          }
        }
        Q5(), y = vt;
        break;
      } catch (q) {
        Pp(t, q);
      }
    while (!0);
    return r && t.shellSuspendCounter++, cr = xi = null, Ie = l, j.H = u, j.A = h, Re === null && (rt = null, Ve = 0, os()), y;
  }
  function Q5() {
    for (; Re !== null; ) Zp(Re);
  }
  function F5(t, r) {
    var a = Ie;
    Ie |= 2;
    var l = Ip(), u = Yp();
    rt !== t || Ve !== r ? (Hs = null, Us = Hn() + 500, Na(t, r)) : ka = vo(
      t,
      r
    );
    e: do
      try {
        if (Ye !== 0 && Re !== null) {
          r = Re;
          var h = cn;
          t: switch (Ye) {
            case 1:
              Ye = 0, cn = null, Oa(t, r, h, 1);
              break;
            case 2:
            case 9:
              if (og(h)) {
                Ye = 0, cn = null, Xp(r);
                break;
              }
              r = function() {
                Ye !== 2 && Ye !== 9 || rt !== t || (Ye = 7), Kn(t);
              }, h.then(r, r);
              break e;
            case 3:
              Ye = 7;
              break e;
            case 4:
              Ye = 5;
              break e;
            case 7:
              og(h) ? (Ye = 0, cn = null, Xp(r)) : (Ye = 0, cn = null, Oa(t, r, h, 7));
              break;
            case 5:
              var y = null;
              switch (Re.tag) {
                case 26:
                  y = Re.memoizedState;
                case 5:
                case 27:
                  var x = Re;
                  if (!y || Om(y)) {
                    Ye = 0, cn = null;
                    var T = x.sibling;
                    if (T !== null) Re = T;
                    else {
                      var H = x.return;
                      H !== null ? (Re = H, Vs(H)) : Re = null;
                    }
                    break t;
                  }
              }
              Ye = 0, cn = null, Oa(t, r, h, 5);
              break;
            case 6:
              Ye = 0, cn = null, Oa(t, r, h, 6);
              break;
            case 8:
              kd(), vt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        W5();
        break;
      } catch (q) {
        Pp(t, q);
      }
    while (!0);
    return cr = xi = null, j.H = l, j.A = u, Ie = a, Re !== null ? 0 : (rt = null, Ve = 0, os(), vt);
  }
  function W5() {
    for (; Re !== null && !ww(); )
      Zp(Re);
  }
  function Zp(t) {
    var r = _p(t.alternate, t, mr);
    t.memoizedProps = t.pendingProps, r === null ? Vs(t) : Re = r;
  }
  function Xp(t) {
    var r = t, a = r.alternate;
    switch (r.tag) {
      case 15:
      case 0:
        r = gp(
          a,
          r,
          r.pendingProps,
          r.type,
          void 0,
          Ve
        );
        break;
      case 11:
        r = gp(
          a,
          r,
          r.pendingProps,
          r.type.render,
          r.ref,
          Ve
        );
        break;
      case 5:
        Kf(r);
      default:
        Sp(a, r), r = Re = Qv(r, mr), r = _p(a, r, mr);
    }
    t.memoizedProps = t.pendingProps, r === null ? Vs(t) : Re = r;
  }
  function Oa(t, r, a, l) {
    cr = xi = null, Kf(r), _a = null, Ko = 0;
    var u = r.return;
    try {
      if ($5(
        t,
        u,
        r,
        a,
        Ve
      )) {
        vt = 1, Os(
          t,
          gn(a, t.current)
        ), Re = null;
        return;
      }
    } catch (h) {
      if (u !== null) throw Re = u, h;
      vt = 1, Os(
        t,
        gn(a, t.current)
      ), Re = null;
      return;
    }
    r.flags & 32768 ? (Ge || l === 1 ? t = !0 : ka || (Ve & 536870912) !== 0 ? t = !1 : (Gr = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = bn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Qp(r, t)) : Vs(r);
  }
  function Vs(t) {
    var r = t;
    do {
      if ((r.flags & 32768) !== 0) {
        Qp(
          r,
          Gr
        );
        return;
      }
      t = r.return;
      var a = q5(
        r.alternate,
        r,
        mr
      );
      if (a !== null) {
        Re = a;
        return;
      }
      if (r = r.sibling, r !== null) {
        Re = r;
        return;
      }
      Re = r = t;
    } while (r !== null);
    vt === 0 && (vt = 5);
  }
  function Qp(t, r) {
    do {
      var a = G5(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, Re = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !r && (t = t.sibling, t !== null)) {
        Re = t;
        return;
      }
      Re = t = a;
    } while (t !== null);
    vt = 6, Re = null;
  }
  function Fp(t, r, a, l, u, h, y, x, T) {
    t.cancelPendingCommit = null;
    do
      js();
    while (Mt !== 0);
    if ((Ie & 6) !== 0) throw Error(o(327));
    if (r !== null) {
      if (r === t.current) throw Error(o(177));
      if (h = r.lanes | r.childLanes, h |= mf, Ow(
        t,
        a,
        h,
        y,
        x,
        T
      ), t === rt && (Re = rt = null, Ve = 0), Ea = r, Yr = t, Ta = a, xd = h, Sd = u, $p = l, (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, n3(Pl, function() {
        return nm(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (r.flags & 13878) !== 0, (r.subtreeFlags & 13878) !== 0 || l) {
        l = j.T, j.T = null, u = te.p, te.p = 2, y = Ie, Ie |= 4;
        try {
          P5(t, r, a);
        } finally {
          Ie = y, te.p = u, j.T = l;
        }
      }
      Mt = 1, Wp(), Jp(), em();
    }
  }
  function Wp() {
    if (Mt === 1) {
      Mt = 0;
      var t = Yr, r = Ea, a = (r.flags & 13878) !== 0;
      if ((r.subtreeFlags & 13878) !== 0 || a) {
        a = j.T, j.T = null;
        var l = te.p;
        te.p = 2;
        var u = Ie;
        Ie |= 4;
        try {
          Rp(r, t);
          var h = Vd, y = jv(t.containerInfo), x = h.focusedElem, T = h.selectionRange;
          if (y !== x && x && x.ownerDocument && Vv(
            x.ownerDocument.documentElement,
            x
          )) {
            if (T !== null && df(x)) {
              var H = T.start, q = T.end;
              if (q === void 0 && (q = H), "selectionStart" in x)
                x.selectionStart = H, x.selectionEnd = Math.min(
                  q,
                  x.value.length
                );
              else {
                var I = x.ownerDocument || document, B = I && I.defaultView || window;
                if (B.getSelection) {
                  var V = B.getSelection(), Ce = x.textContent.length, ye = Math.min(T.start, Ce), Qe = T.end === void 0 ? ye : Math.min(T.end, Ce);
                  !V.extend && ye > Qe && (y = Qe, Qe = ye, ye = y);
                  var R = Bv(
                    x,
                    ye
                  ), M = Bv(
                    x,
                    Qe
                  );
                  if (R && M && (V.rangeCount !== 1 || V.anchorNode !== R.node || V.anchorOffset !== R.offset || V.focusNode !== M.node || V.focusOffset !== M.offset)) {
                    var U = I.createRange();
                    U.setStart(R.node, R.offset), V.removeAllRanges(), ye > Qe ? (V.addRange(U), V.extend(M.node, M.offset)) : (U.setEnd(M.node, M.offset), V.addRange(U));
                  }
                }
              }
            }
            for (I = [], V = x; V = V.parentNode; )
              V.nodeType === 1 && I.push({
                element: V,
                left: V.scrollLeft,
                top: V.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < I.length; x++) {
              var G = I[x];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          Ws = !!Bd, Vd = Bd = null;
        } finally {
          Ie = u, te.p = l, j.T = a;
        }
      }
      t.current = r, Mt = 2;
    }
  }
  function Jp() {
    if (Mt === 2) {
      Mt = 0;
      var t = Yr, r = Ea, a = (r.flags & 8772) !== 0;
      if ((r.subtreeFlags & 8772) !== 0 || a) {
        a = j.T, j.T = null;
        var l = te.p;
        te.p = 2;
        var u = Ie;
        Ie |= 4;
        try {
          Op(t, r.alternate, r);
        } finally {
          Ie = u, te.p = l, j.T = a;
        }
      }
      Mt = 3;
    }
  }
  function em() {
    if (Mt === 4 || Mt === 3) {
      Mt = 0, _w();
      var t = Yr, r = Ea, a = Ta, l = $p;
      (r.subtreeFlags & 10256) !== 0 || (r.flags & 10256) !== 0 ? Mt = 5 : (Mt = 0, Ea = Yr = null, tm(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (Ir = null), Gu(a), r = r.stateNode, nn && typeof nn.onCommitFiberRoot == "function")
        try {
          nn.onCommitFiberRoot(
            ho,
            r,
            void 0,
            (r.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        r = j.T, u = te.p, te.p = 2, j.T = null;
        try {
          for (var h = t.onRecoverableError, y = 0; y < l.length; y++) {
            var x = l[y];
            h(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          j.T = r, te.p = u;
        }
      }
      (Ta & 3) !== 0 && js(), Kn(t), u = t.pendingLanes, (a & 4194090) !== 0 && (u & 42) !== 0 ? t === Cd ? Fo++ : (Fo = 0, Cd = t) : Fo = 0, Wo(0);
    }
  }
  function tm(t, r) {
    (t.pooledCacheLanes &= r) === 0 && (r = t.pooledCache, r != null && (t.pooledCache = null, zo(r)));
  }
  function js(t) {
    return Wp(), Jp(), em(), nm();
  }
  function nm() {
    if (Mt !== 5) return !1;
    var t = Yr, r = xd;
    xd = 0;
    var a = Gu(Ta), l = j.T, u = te.p;
    try {
      te.p = 32 > a ? 32 : a, j.T = null, a = Sd, Sd = null;
      var h = Yr, y = Ta;
      if (Mt = 0, Ea = Yr = null, Ta = 0, (Ie & 6) !== 0) throw Error(o(331));
      var x = Ie;
      if (Ie |= 4, Vp(h.current), Up(
        h,
        h.current,
        y,
        a
      ), Ie = x, Wo(0, !1), nn && typeof nn.onPostCommitFiberRoot == "function")
        try {
          nn.onPostCommitFiberRoot(ho, h);
        } catch {
        }
      return !0;
    } finally {
      te.p = u, j.T = l, tm(t, r);
    }
  }
  function rm(t, r, a) {
    r = gn(a, r), r = nd(t.stateNode, r, 2), t = Hr(t, r, 2), t !== null && (go(t, 2), Kn(t));
  }
  function Je(t, r, a) {
    if (t.tag === 3)
      rm(t, t, a);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          rm(
            r,
            t,
            a
          );
          break;
        } else if (r.tag === 1) {
          var l = r.stateNode;
          if (typeof r.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ir === null || !Ir.has(l))) {
            t = gn(a, t), a = lp(2), l = Hr(r, a, 2), l !== null && (sp(
              a,
              l,
              r,
              t
            ), go(l, 2), Kn(l));
            break;
          }
        }
        r = r.return;
      }
  }
  function Td(t, r, a) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new Z5();
      var u = /* @__PURE__ */ new Set();
      l.set(r, u);
    } else
      u = l.get(r), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(r, u));
    u.has(a) || (yd = !0, u.add(a), t = J5.bind(null, t, r, a), r.then(t, t));
  }
  function J5(t, r, a) {
    var l = t.pingCache;
    l !== null && l.delete(r), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, rt === t && (Ve & a) === a && (vt === 4 || vt === 3 && (Ve & 62914560) === Ve && 300 > Hn() - _d ? (Ie & 2) === 0 && Na(t, 0) : bd |= a, Aa === Ve && (Aa = 0)), Kn(t);
  }
  function im(t, r) {
    r === 0 && (r = ev()), t = fa(t, r), t !== null && (go(t, r), Kn(t));
  }
  function e3(t) {
    var r = t.memoizedState, a = 0;
    r !== null && (a = r.retryLane), im(t, a);
  }
  function t3(t, r) {
    var a = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode, u = t.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(r), im(t, a);
  }
  function n3(t, r) {
    return ju(t, r);
  }
  var $s = null, za = null, Nd = !1, Ks = !1, Od = !1, Ni = 0;
  function Kn(t) {
    t !== za && t.next === null && (za === null ? $s = za = t : za = za.next = t), Ks = !0, Nd || (Nd = !0, i3());
  }
  function Wo(t, r) {
    if (!Od && Ks) {
      Od = !0;
      do
        for (var a = !1, l = $s; l !== null; ) {
          if (t !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var h = 0;
            else {
              var y = l.suspendedLanes, x = l.pingedLanes;
              h = (1 << 31 - rn(42 | t) + 1) - 1, h &= u & ~(y & ~x), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (a = !0, sm(l, h));
          } else
            h = Ve, h = Zl(
              l,
              l === rt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || vo(l, h) || (a = !0, sm(l, h));
          l = l.next;
        }
      while (a);
      Od = !1;
    }
  }
  function r3() {
    am();
  }
  function am() {
    Ks = Nd = !1;
    var t = 0;
    Ni !== 0 && (d3() && (t = Ni), Ni = 0);
    for (var r = Hn(), a = null, l = $s; l !== null; ) {
      var u = l.next, h = om(l, r);
      h === 0 ? (l.next = null, a === null ? $s = u : a.next = u, u === null && (za = a)) : (a = l, (t !== 0 || (h & 3) !== 0) && (Ks = !0)), l = u;
    }
    Wo(t);
  }
  function om(t, r) {
    for (var a = t.suspendedLanes, l = t.pingedLanes, u = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var y = 31 - rn(h), x = 1 << y, T = u[y];
      T === -1 ? ((x & a) === 0 || (x & l) !== 0) && (u[y] = Nw(x, r)) : T <= r && (t.expiredLanes |= x), h &= ~x;
    }
    if (r = rt, a = Ve, a = Zl(
      t,
      t === r ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, a === 0 || t === r && (Ye === 2 || Ye === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && $u(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || vo(t, a)) {
      if (r = a & -a, r === t.callbackPriority) return r;
      switch (l !== null && $u(l), Gu(a)) {
        case 2:
        case 8:
          a = F0;
          break;
        case 32:
          a = Pl;
          break;
        case 268435456:
          a = W0;
          break;
        default:
          a = Pl;
      }
      return l = lm.bind(null, t), a = ju(a, l), t.callbackPriority = r, t.callbackNode = a, r;
    }
    return l !== null && l !== null && $u(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function lm(t, r) {
    if (Mt !== 0 && Mt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (js() && t.callbackNode !== a)
      return null;
    var l = Ve;
    return l = Zl(
      t,
      t === rt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (qp(t, l, r), om(t, Hn()), t.callbackNode != null && t.callbackNode === a ? lm.bind(null, t) : null);
  }
  function sm(t, r) {
    if (js()) return null;
    qp(t, r, !0);
  }
  function i3() {
    v3(function() {
      (Ie & 6) !== 0 ? ju(
        Q0,
        r3
      ) : am();
    });
  }
  function zd() {
    return Ni === 0 && (Ni = J0()), Ni;
  }
  function cm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Jl("" + t);
  }
  function um(t, r) {
    var a = r.ownerDocument.createElement("input");
    return a.name = r.name, a.value = r.value, t.id && a.setAttribute("form", t.id), r.parentNode.insertBefore(a, r), t = new FormData(t), a.parentNode.removeChild(a), t;
  }
  function a3(t, r, a, l, u) {
    if (r === "submit" && a && a.stateNode === u) {
      var h = cm(
        (u[It] || null).action
      ), y = l.submitter;
      y && (r = (r = y[It] || null) ? cm(r.formAction) : y.getAttribute("formAction"), r !== null && (h = r, y = null));
      var x = new rs(
        "action",
        "action",
        null,
        l,
        u
      );
      t.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ni !== 0) {
                  var T = y ? um(u, y) : new FormData(u);
                  Ff(
                    a,
                    {
                      pending: !0,
                      data: T,
                      method: u.method,
                      action: h
                    },
                    null,
                    T
                  );
                }
              } else
                typeof h == "function" && (x.preventDefault(), T = y ? um(u, y) : new FormData(u), Ff(
                  a,
                  {
                    pending: !0,
                    data: T,
                    method: u.method,
                    action: h
                  },
                  h,
                  T
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Md = 0; Md < pf.length; Md++) {
    var Dd = pf[Md], o3 = Dd.toLowerCase(), l3 = Dd[0].toUpperCase() + Dd.slice(1);
    En(
      o3,
      "on" + l3
    );
  }
  En(qv, "onAnimationEnd"), En(Gv, "onAnimationIteration"), En(Pv, "onAnimationStart"), En("dblclick", "onDoubleClick"), En("focusin", "onFocus"), En("focusout", "onBlur"), En(C5, "onTransitionRun"), En(k5, "onTransitionStart"), En(A5, "onTransitionCancel"), En(Iv, "onTransitionEnd"), ta("onMouseEnter", ["mouseout", "mouseover"]), ta("onMouseLeave", ["mouseout", "mouseover"]), ta("onPointerEnter", ["pointerout", "pointerover"]), ta("onPointerLeave", ["pointerout", "pointerover"]), hi(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), hi(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), hi("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), hi(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), hi(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), hi(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Jo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), s3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jo)
  );
  function fm(t, r) {
    r = (r & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var l = t[a], u = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (r)
          for (var y = l.length - 1; 0 <= y; y--) {
            var x = l[y], T = x.instance, H = x.currentTarget;
            if (x = x.listener, T !== h && u.isPropagationStopped())
              break e;
            h = x, u.currentTarget = H;
            try {
              h(u);
            } catch (q) {
              Ns(q);
            }
            u.currentTarget = null, h = T;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (x = l[y], T = x.instance, H = x.currentTarget, x = x.listener, T !== h && u.isPropagationStopped())
              break e;
            h = x, u.currentTarget = H;
            try {
              h(u);
            } catch (q) {
              Ns(q);
            }
            u.currentTarget = null, h = T;
          }
      }
    }
  }
  function Le(t, r) {
    var a = r[Pu];
    a === void 0 && (a = r[Pu] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    a.has(l) || (dm(r, t, 2, !1), a.add(l));
  }
  function Rd(t, r, a) {
    var l = 0;
    r && (l |= 4), dm(
      a,
      t,
      l,
      r
    );
  }
  var qs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ld(t) {
    if (!t[qs]) {
      t[qs] = !0, av.forEach(function(a) {
        a !== "selectionchange" && (s3.has(a) || Rd(a, !1, t), Rd(a, !0, t));
      });
      var r = t.nodeType === 9 ? t : t.ownerDocument;
      r === null || r[qs] || (r[qs] = !0, Rd("selectionchange", !1, r));
    }
  }
  function dm(t, r, a, l) {
    switch (Um(r)) {
      case 2:
        var u = L3;
        break;
      case 8:
        u = U3;
        break;
      default:
        u = Xd;
    }
    a = u.bind(
      null,
      r,
      a,
      t
    ), u = void 0, !nf || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (u = !0), l ? u !== void 0 ? t.addEventListener(r, a, {
      capture: !0,
      passive: u
    }) : t.addEventListener(r, a, !0) : u !== void 0 ? t.addEventListener(r, a, {
      passive: u
    }) : t.addEventListener(r, a, !1);
  }
  function Ud(t, r, a, l, u) {
    var h = l;
    if ((r & 1) === 0 && (r & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var x = l.stateNode.containerInfo;
          if (x === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var T = y.tag;
              if ((T === 3 || T === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; x !== null; ) {
            if (y = Wi(x), y === null) return;
            if (T = y.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              l = h = y;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    bv(function() {
      var H = h, q = ef(a), I = [];
      e: {
        var B = Yv.get(t);
        if (B !== void 0) {
          var V = rs, Ce = t;
          switch (t) {
            case "keypress":
              if (ts(a) === 0) break e;
            case "keydown":
            case "keyup":
              V = n5;
              break;
            case "focusin":
              Ce = "focus", V = lf;
              break;
            case "focusout":
              Ce = "blur", V = lf;
              break;
            case "beforeblur":
            case "afterblur":
              V = lf;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              V = xv;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = Gw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = a5;
              break;
            case qv:
            case Gv:
            case Pv:
              V = Yw;
              break;
            case Iv:
              V = l5;
              break;
            case "scroll":
            case "scrollend":
              V = Kw;
              break;
            case "wheel":
              V = c5;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = Xw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Cv;
              break;
            case "toggle":
            case "beforetoggle":
              V = f5;
          }
          var ye = (r & 4) !== 0, Qe = !ye && (t === "scroll" || t === "scrollend"), R = ye ? B !== null ? B + "Capture" : null : B;
          ye = [];
          for (var M = H, U; M !== null; ) {
            var G = M;
            if (U = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || U === null || R === null || (G = yo(M, R), G != null && ye.push(
              el(M, G, U)
            )), Qe) break;
            M = M.return;
          }
          0 < ye.length && (B = new V(
            B,
            Ce,
            null,
            a,
            q
          ), I.push({ event: B, listeners: ye }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (B = t === "mouseover" || t === "pointerover", V = t === "mouseout" || t === "pointerout", B && a !== Ju && (Ce = a.relatedTarget || a.fromElement) && (Wi(Ce) || Ce[Fi]))
            break e;
          if ((V || B) && (B = q.window === q ? q : (B = q.ownerDocument) ? B.defaultView || B.parentWindow : window, V ? (Ce = a.relatedTarget || a.toElement, V = H, Ce = Ce ? Wi(Ce) : null, Ce !== null && (Qe = c(Ce), ye = Ce.tag, Ce !== Qe || ye !== 5 && ye !== 27 && ye !== 6) && (Ce = null)) : (V = null, Ce = H), V !== Ce)) {
            if (ye = xv, G = "onMouseLeave", R = "onMouseEnter", M = "mouse", (t === "pointerout" || t === "pointerover") && (ye = Cv, G = "onPointerLeave", R = "onPointerEnter", M = "pointer"), Qe = V == null ? B : mo(V), U = Ce == null ? B : mo(Ce), B = new ye(
              G,
              M + "leave",
              V,
              a,
              q
            ), B.target = Qe, B.relatedTarget = U, G = null, Wi(q) === H && (ye = new ye(
              R,
              M + "enter",
              Ce,
              a,
              q
            ), ye.target = U, ye.relatedTarget = Qe, G = ye), Qe = G, V && Ce)
              t: {
                for (ye = V, R = Ce, M = 0, U = ye; U; U = Ma(U))
                  M++;
                for (U = 0, G = R; G; G = Ma(G))
                  U++;
                for (; 0 < M - U; )
                  ye = Ma(ye), M--;
                for (; 0 < U - M; )
                  R = Ma(R), U--;
                for (; M--; ) {
                  if (ye === R || R !== null && ye === R.alternate)
                    break t;
                  ye = Ma(ye), R = Ma(R);
                }
                ye = null;
              }
            else ye = null;
            V !== null && hm(
              I,
              B,
              V,
              ye,
              !1
            ), Ce !== null && Qe !== null && hm(
              I,
              Qe,
              Ce,
              ye,
              !0
            );
          }
        }
        e: {
          if (B = H ? mo(H) : window, V = B.nodeName && B.nodeName.toLowerCase(), V === "select" || V === "input" && B.type === "file")
            var ve = Mv;
          else if (Ov(B))
            if (Dv)
              ve = _5;
            else {
              ve = b5;
              var De = y5;
            }
          else
            V = B.nodeName, !V || V.toLowerCase() !== "input" || B.type !== "checkbox" && B.type !== "radio" ? H && Wu(H.elementType) && (ve = Mv) : ve = w5;
          if (ve && (ve = ve(t, H))) {
            zv(
              I,
              ve,
              a,
              q
            );
            break e;
          }
          De && De(t, B, H), t === "focusout" && H && B.type === "number" && H.memoizedProps.value != null && Fu(B, "number", B.value);
        }
        switch (De = H ? mo(H) : window, t) {
          case "focusin":
            (Ov(De) || De.contentEditable === "true") && (sa = De, hf = H, Ao = null);
            break;
          case "focusout":
            Ao = hf = sa = null;
            break;
          case "mousedown":
            vf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vf = !1, $v(I, a, q);
            break;
          case "selectionchange":
            if (S5) break;
          case "keydown":
          case "keyup":
            $v(I, a, q);
        }
        var pe;
        if (cf)
          e: {
            switch (t) {
              case "compositionstart":
                var xe = "onCompositionStart";
                break e;
              case "compositionend":
                xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                xe = "onCompositionUpdate";
                break e;
            }
            xe = void 0;
          }
        else
          la ? Tv(t, a) && (xe = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (xe = "onCompositionStart");
        xe && (kv && a.locale !== "ko" && (la || xe !== "onCompositionStart" ? xe === "onCompositionEnd" && la && (pe = wv()) : (Dr = q, rf = "value" in Dr ? Dr.value : Dr.textContent, la = !0)), De = Gs(H, xe), 0 < De.length && (xe = new Sv(
          xe,
          t,
          null,
          a,
          q
        ), I.push({ event: xe, listeners: De }), pe ? xe.data = pe : (pe = Nv(a), pe !== null && (xe.data = pe)))), (pe = h5 ? v5(t, a) : g5(t, a)) && (xe = Gs(H, "onBeforeInput"), 0 < xe.length && (De = new Sv(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          q
        ), I.push({
          event: De,
          listeners: xe
        }), De.data = pe)), a3(
          I,
          t,
          H,
          a,
          q
        );
      }
      fm(I, r);
    });
  }
  function el(t, r, a) {
    return {
      instance: t,
      listener: r,
      currentTarget: a
    };
  }
  function Gs(t, r) {
    for (var a = r + "Capture", l = []; t !== null; ) {
      var u = t, h = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || h === null || (u = yo(t, a), u != null && l.unshift(
        el(t, u, h)
      ), u = yo(t, r), u != null && l.push(
        el(t, u, h)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Ma(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function hm(t, r, a, l, u) {
    for (var h = r._reactName, y = []; a !== null && a !== l; ) {
      var x = a, T = x.alternate, H = x.stateNode;
      if (x = x.tag, T !== null && T === l) break;
      x !== 5 && x !== 26 && x !== 27 || H === null || (T = H, u ? (H = yo(a, h), H != null && y.unshift(
        el(a, H, T)
      )) : u || (H = yo(a, h), H != null && y.push(
        el(a, H, T)
      ))), a = a.return;
    }
    y.length !== 0 && t.push({ event: r, listeners: y });
  }
  var c3 = /\r\n?/g, u3 = /\u0000|\uFFFD/g;
  function vm(t) {
    return (typeof t == "string" ? t : "" + t).replace(c3, `
`).replace(u3, "");
  }
  function gm(t, r) {
    return r = vm(r), vm(t) === r;
  }
  function Ps() {
  }
  function Xe(t, r, a, l, u, h) {
    switch (a) {
      case "children":
        typeof l == "string" ? r === "body" || r === "textarea" && l === "" || ia(t, l) : (typeof l == "number" || typeof l == "bigint") && r !== "body" && ia(t, "" + l);
        break;
      case "className":
        Ql(t, "class", l);
        break;
      case "tabIndex":
        Ql(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ql(t, a, l);
        break;
      case "style":
        mv(t, l, h);
        break;
      case "data":
        if (r !== "object") {
          Ql(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (r !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(a);
          break;
        }
        l = Jl("" + l), t.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (a === "formAction" ? (r !== "input" && Xe(t, r, "name", u.name, u, null), Xe(
            t,
            r,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Xe(
            t,
            r,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Xe(
            t,
            r,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Xe(t, r, "encType", u.encType, u, null), Xe(t, r, "method", u.method, u, null), Xe(t, r, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(a);
          break;
        }
        l = Jl("" + l), t.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (t.onclick = Ps);
        break;
      case "onScroll":
        l != null && Le("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        a = Jl("" + l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, "" + l) : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, l) : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(a, l) : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(a) : t.setAttribute(a, l);
        break;
      case "popover":
        Le("beforetoggle", t), Le("toggle", t), Xl(t, "popover", l);
        break;
      case "xlinkActuate":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        ir(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        ir(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        ir(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        ir(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Xl(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = jw.get(a) || a, Xl(t, a, l));
    }
  }
  function Hd(t, r, a, l, u, h) {
    switch (a) {
      case "style":
        mv(t, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (u.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ia(t, l) : (typeof l == "number" || typeof l == "bigint") && ia(t, "" + l);
        break;
      case "onScroll":
        l != null && Le("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = Ps);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ov.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), r = a.slice(2, u ? a.length - 7 : void 0), h = t[It] || null, h = h != null ? h[a] : null, typeof h == "function" && t.removeEventListener(r, h, u), typeof l == "function")) {
              typeof h != "function" && h !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(r, l, u);
              break e;
            }
            a in t ? t[a] = l : l === !0 ? t.setAttribute(a, "") : Xl(t, a, l);
          }
    }
  }
  function Dt(t, r, a) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Le("error", t), Le("load", t);
        var l = !1, u = !1, h;
        for (h in a)
          if (a.hasOwnProperty(h)) {
            var y = a[h];
            if (y != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, r));
                default:
                  Xe(t, r, h, y, a, null);
              }
          }
        u && Xe(t, r, "srcSet", a.srcSet, a, null), l && Xe(t, r, "src", a.src, a, null);
        return;
      case "input":
        Le("invalid", t);
        var x = h = y = u = null, T = null, H = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var q = a[l];
            if (q != null)
              switch (l) {
                case "name":
                  u = q;
                  break;
                case "type":
                  y = q;
                  break;
                case "checked":
                  T = q;
                  break;
                case "defaultChecked":
                  H = q;
                  break;
                case "value":
                  h = q;
                  break;
                case "defaultValue":
                  x = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null)
                    throw Error(o(137, r));
                  break;
                default:
                  Xe(t, r, l, q, a, null);
              }
          }
        hv(
          t,
          h,
          x,
          T,
          H,
          y,
          u,
          !1
        ), Fl(t);
        return;
      case "select":
        Le("invalid", t), l = y = h = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (x = a[u], x != null))
            switch (u) {
              case "value":
                h = x;
                break;
              case "defaultValue":
                y = x;
                break;
              case "multiple":
                l = x;
              default:
                Xe(t, r, u, x, a, null);
            }
        r = h, a = y, t.multiple = !!l, r != null ? ra(t, !!l, r, !1) : a != null && ra(t, !!l, a, !0);
        return;
      case "textarea":
        Le("invalid", t), h = u = l = null;
        for (y in a)
          if (a.hasOwnProperty(y) && (x = a[y], x != null))
            switch (y) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                h = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(o(91));
                break;
              default:
                Xe(t, r, y, x, a, null);
            }
        gv(t, l, u, h), Fl(t);
        return;
      case "option":
        for (T in a)
          if (a.hasOwnProperty(T) && (l = a[T], l != null))
            switch (T) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Xe(t, r, T, l, a, null);
            }
        return;
      case "dialog":
        Le("beforetoggle", t), Le("toggle", t), Le("cancel", t), Le("close", t);
        break;
      case "iframe":
      case "object":
        Le("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Jo.length; l++)
          Le(Jo[l], t);
        break;
      case "image":
        Le("error", t), Le("load", t);
        break;
      case "details":
        Le("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Le("error", t), Le("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in a)
          if (a.hasOwnProperty(H) && (l = a[H], l != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, r));
              default:
                Xe(t, r, H, l, a, null);
            }
        return;
      default:
        if (Wu(r)) {
          for (q in a)
            a.hasOwnProperty(q) && (l = a[q], l !== void 0 && Hd(
              t,
              r,
              q,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (x in a)
      a.hasOwnProperty(x) && (l = a[x], l != null && Xe(t, r, x, l, a, null));
  }
  function f3(t, r, a, l) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, h = null, y = null, x = null, T = null, H = null, q = null;
        for (V in a) {
          var I = a[V];
          if (a.hasOwnProperty(V) && I != null)
            switch (V) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = I;
              default:
                l.hasOwnProperty(V) || Xe(t, r, V, null, l, I);
            }
        }
        for (var B in l) {
          var V = l[B];
          if (I = a[B], l.hasOwnProperty(B) && (V != null || I != null))
            switch (B) {
              case "type":
                h = V;
                break;
              case "name":
                u = V;
                break;
              case "checked":
                H = V;
                break;
              case "defaultChecked":
                q = V;
                break;
              case "value":
                y = V;
                break;
              case "defaultValue":
                x = V;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(o(137, r));
                break;
              default:
                V !== I && Xe(
                  t,
                  r,
                  B,
                  V,
                  l,
                  I
                );
            }
        }
        Qu(
          t,
          y,
          x,
          T,
          H,
          q,
          h,
          u
        );
        return;
      case "select":
        V = y = x = B = null;
        for (h in a)
          if (T = a[h], a.hasOwnProperty(h) && T != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                V = T;
              default:
                l.hasOwnProperty(h) || Xe(
                  t,
                  r,
                  h,
                  null,
                  l,
                  T
                );
            }
        for (u in l)
          if (h = l[u], T = a[u], l.hasOwnProperty(u) && (h != null || T != null))
            switch (u) {
              case "value":
                B = h;
                break;
              case "defaultValue":
                x = h;
                break;
              case "multiple":
                y = h;
              default:
                h !== T && Xe(
                  t,
                  r,
                  u,
                  h,
                  l,
                  T
                );
            }
        r = x, a = y, l = V, B != null ? ra(t, !!a, B, !1) : !!l != !!a && (r != null ? ra(t, !!a, r, !0) : ra(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        V = B = null;
        for (x in a)
          if (u = a[x], a.hasOwnProperty(x) && u != null && !l.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Xe(t, r, x, null, l, u);
            }
        for (y in l)
          if (u = l[y], h = a[y], l.hasOwnProperty(y) && (u != null || h != null))
            switch (y) {
              case "value":
                B = u;
                break;
              case "defaultValue":
                V = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== h && Xe(t, r, y, u, l, h);
            }
        vv(t, B, V);
        return;
      case "option":
        for (var Ce in a)
          if (B = a[Ce], a.hasOwnProperty(Ce) && B != null && !l.hasOwnProperty(Ce))
            switch (Ce) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Xe(
                  t,
                  r,
                  Ce,
                  null,
                  l,
                  B
                );
            }
        for (T in l)
          if (B = l[T], V = a[T], l.hasOwnProperty(T) && B !== V && (B != null || V != null))
            switch (T) {
              case "selected":
                t.selected = B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Xe(
                  t,
                  r,
                  T,
                  B,
                  l,
                  V
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ye in a)
          B = a[ye], a.hasOwnProperty(ye) && B != null && !l.hasOwnProperty(ye) && Xe(t, r, ye, null, l, B);
        for (H in l)
          if (B = l[H], V = a[H], l.hasOwnProperty(H) && B !== V && (B != null || V != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(o(137, r));
                break;
              default:
                Xe(
                  t,
                  r,
                  H,
                  B,
                  l,
                  V
                );
            }
        return;
      default:
        if (Wu(r)) {
          for (var Qe in a)
            B = a[Qe], a.hasOwnProperty(Qe) && B !== void 0 && !l.hasOwnProperty(Qe) && Hd(
              t,
              r,
              Qe,
              void 0,
              l,
              B
            );
          for (q in l)
            B = l[q], V = a[q], !l.hasOwnProperty(q) || B === V || B === void 0 && V === void 0 || Hd(
              t,
              r,
              q,
              B,
              l,
              V
            );
          return;
        }
    }
    for (var R in a)
      B = a[R], a.hasOwnProperty(R) && B != null && !l.hasOwnProperty(R) && Xe(t, r, R, null, l, B);
    for (I in l)
      B = l[I], V = a[I], !l.hasOwnProperty(I) || B === V || B == null && V == null || Xe(t, r, I, B, l, V);
  }
  var Bd = null, Vd = null;
  function Is(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function pm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mm(t, r) {
    if (t === 0)
      switch (r) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && r === "foreignObject" ? 0 : t;
  }
  function jd(t, r) {
    return t === "textarea" || t === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.children == "bigint" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var $d = null;
  function d3() {
    var t = window.event;
    return t && t.type === "popstate" ? t === $d ? !1 : ($d = t, !0) : ($d = null, !1);
  }
  var ym = typeof setTimeout == "function" ? setTimeout : void 0, h3 = typeof clearTimeout == "function" ? clearTimeout : void 0, bm = typeof Promise == "function" ? Promise : void 0, v3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof bm < "u" ? function(t) {
    return bm.resolve(null).then(t).catch(g3);
  } : ym;
  function g3(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Xr(t) {
    return t === "head";
  }
  function wm(t, r) {
    var a = r, l = 0, u = 0;
    do {
      var h = a.nextSibling;
      if (t.removeChild(a), h && h.nodeType === 8)
        if (a = h.data, a === "/$") {
          if (0 < l && 8 > l) {
            a = l;
            var y = t.ownerDocument;
            if (a & 1 && tl(y.documentElement), a & 2 && tl(y.body), a & 4)
              for (a = y.head, tl(a), y = a.firstChild; y; ) {
                var x = y.nextSibling, T = y.nodeName;
                y[po] || T === "SCRIPT" || T === "STYLE" || T === "LINK" && y.rel.toLowerCase() === "stylesheet" || a.removeChild(y), y = x;
              }
          }
          if (u === 0) {
            t.removeChild(h), cl(r);
            return;
          }
          u--;
        } else
          a === "$" || a === "$?" || a === "$!" ? u++ : l = a.charCodeAt(0) - 48;
      else l = 0;
      a = h;
    } while (a);
    cl(r);
  }
  function Kd(t) {
    var r = t.firstChild;
    for (r && r.nodeType === 10 && (r = r.nextSibling); r; ) {
      var a = r;
      switch (r = r.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Kd(a), Iu(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function p3(t, r, a, l) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== r.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[po])
          switch (r) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (r === "input" && t.type === "hidden") {
        var h = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else return t;
      if (t = Nn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function m3(t, r, a) {
    if (r === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = Nn(t.nextSibling), t === null)) return null;
    return t;
  }
  function qd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function y3(t, r) {
    var a = t.ownerDocument;
    if (t.data !== "$?" || a.readyState === "complete")
      r();
    else {
      var l = function() {
        r(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function Nn(t) {
    for (; t != null; t = t.nextSibling) {
      var r = t.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = t.data, r === "$" || r === "$!" || r === "$?" || r === "F!" || r === "F")
          break;
        if (r === "/$") return null;
      }
    }
    return t;
  }
  var Gd = null;
  function _m(t) {
    t = t.previousSibling;
    for (var r = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (r === 0) return t;
          r--;
        } else a === "/$" && r++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function xm(t, r, a) {
    switch (r = Is(a), t) {
      case "html":
        if (t = r.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = r.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = r.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function tl(t) {
    for (var r = t.attributes; r.length; )
      t.removeAttributeNode(r[0]);
    Iu(t);
  }
  var _n = /* @__PURE__ */ new Map(), Sm = /* @__PURE__ */ new Set();
  function Ys(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var yr = te.d;
  te.d = {
    f: b3,
    r: w3,
    D: _3,
    C: x3,
    L: S3,
    m: C3,
    X: A3,
    S: k3,
    M: E3
  };
  function b3() {
    var t = yr.f(), r = Bs();
    return t || r;
  }
  function w3(t) {
    var r = Ji(t);
    r !== null && r.tag === 5 && r.type === "form" ? qg(r) : yr.r(t);
  }
  var Da = typeof document > "u" ? null : document;
  function Cm(t, r, a) {
    var l = Da;
    if (l && typeof r == "string" && r) {
      var u = vn(r);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), Sm.has(u) || (Sm.add(u), t = { rel: t, crossOrigin: a, href: r }, l.querySelector(u) === null && (r = l.createElement("link"), Dt(r, "link", t), Et(r), l.head.appendChild(r)));
    }
  }
  function _3(t) {
    yr.D(t), Cm("dns-prefetch", t, null);
  }
  function x3(t, r) {
    yr.C(t, r), Cm("preconnect", t, r);
  }
  function S3(t, r, a) {
    yr.L(t, r, a);
    var l = Da;
    if (l && t && r) {
      var u = 'link[rel="preload"][as="' + vn(r) + '"]';
      r === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + vn(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + vn(
        a.imageSizes
      ) + '"]')) : u += '[href="' + vn(t) + '"]';
      var h = u;
      switch (r) {
        case "style":
          h = Ra(t);
          break;
        case "script":
          h = La(t);
      }
      _n.has(h) || (t = p(
        {
          rel: "preload",
          href: r === "image" && a && a.imageSrcSet ? void 0 : t,
          as: r
        },
        a
      ), _n.set(h, t), l.querySelector(u) !== null || r === "style" && l.querySelector(nl(h)) || r === "script" && l.querySelector(rl(h)) || (r = l.createElement("link"), Dt(r, "link", t), Et(r), l.head.appendChild(r)));
    }
  }
  function C3(t, r) {
    yr.m(t, r);
    var a = Da;
    if (a && t) {
      var l = r && typeof r.as == "string" ? r.as : "script", u = 'link[rel="modulepreload"][as="' + vn(l) + '"][href="' + vn(t) + '"]', h = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = La(t);
      }
      if (!_n.has(h) && (t = p({ rel: "modulepreload", href: t }, r), _n.set(h, t), a.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(rl(h)))
              return;
        }
        l = a.createElement("link"), Dt(l, "link", t), Et(l), a.head.appendChild(l);
      }
    }
  }
  function k3(t, r, a) {
    yr.S(t, r, a);
    var l = Da;
    if (l && t) {
      var u = ea(l).hoistableStyles, h = Ra(t);
      r = r || "default";
      var y = u.get(h);
      if (!y) {
        var x = { loading: 0, preload: null };
        if (y = l.querySelector(
          nl(h)
        ))
          x.loading = 5;
        else {
          t = p(
            { rel: "stylesheet", href: t, "data-precedence": r },
            a
          ), (a = _n.get(h)) && Pd(t, a);
          var T = y = l.createElement("link");
          Et(T), Dt(T, "link", t), T._p = new Promise(function(H, q) {
            T.onload = H, T.onerror = q;
          }), T.addEventListener("load", function() {
            x.loading |= 1;
          }), T.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Zs(y, r, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: x
        }, u.set(h, y);
      }
    }
  }
  function A3(t, r) {
    yr.X(t, r);
    var a = Da;
    if (a && t) {
      var l = ea(a).hoistableScripts, u = La(t), h = l.get(u);
      h || (h = a.querySelector(rl(u)), h || (t = p({ src: t, async: !0 }, r), (r = _n.get(u)) && Id(t, r), h = a.createElement("script"), Et(h), Dt(h, "link", t), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(u, h));
    }
  }
  function E3(t, r) {
    yr.M(t, r);
    var a = Da;
    if (a && t) {
      var l = ea(a).hoistableScripts, u = La(t), h = l.get(u);
      h || (h = a.querySelector(rl(u)), h || (t = p({ src: t, async: !0, type: "module" }, r), (r = _n.get(u)) && Id(t, r), h = a.createElement("script"), Et(h), Dt(h, "link", t), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(u, h));
    }
  }
  function km(t, r, a, l) {
    var u = (u = _e.current) ? Ys(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (r = Ra(a.href), a = ea(
          u
        ).hoistableStyles, l = a.get(r), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(r, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          t = Ra(a.href);
          var h = ea(
            u
          ).hoistableStyles, y = h.get(t);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, y), (h = u.querySelector(
            nl(t)
          )) && !h._p && (y.instance = h, y.state.loading = 5), _n.has(t) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, _n.set(t, a), h || T3(
            u,
            t,
            a,
            y.state
          ))), r && l === null)
            throw Error(o(528, ""));
          return y;
        }
        if (r && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return r = a.async, a = a.src, typeof a == "string" && r && typeof r != "function" && typeof r != "symbol" ? (r = La(a), a = ea(
          u
        ).hoistableScripts, l = a.get(r), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(r, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function Ra(t) {
    return 'href="' + vn(t) + '"';
  }
  function nl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Am(t) {
    return p({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function T3(t, r, a, l) {
    t.querySelector('link[rel="preload"][as="style"][' + r + "]") ? l.loading = 1 : (r = t.createElement("link"), l.preload = r, r.addEventListener("load", function() {
      return l.loading |= 1;
    }), r.addEventListener("error", function() {
      return l.loading |= 2;
    }), Dt(r, "link", a), Et(r), t.head.appendChild(r));
  }
  function La(t) {
    return '[src="' + vn(t) + '"]';
  }
  function rl(t) {
    return "script[async]" + t;
  }
  function Em(t, r, a) {
    if (r.count++, r.instance === null)
      switch (r.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + vn(a.href) + '"]'
          );
          if (l)
            return r.instance = l, Et(l), l;
          var u = p({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), Et(l), Dt(l, "style", u), Zs(l, a.precedence, t), r.instance = l;
        case "stylesheet":
          u = Ra(a.href);
          var h = t.querySelector(
            nl(u)
          );
          if (h)
            return r.state.loading |= 4, r.instance = h, Et(h), h;
          l = Am(a), (u = _n.get(u)) && Pd(l, u), h = (t.ownerDocument || t).createElement("link"), Et(h);
          var y = h;
          return y._p = new Promise(function(x, T) {
            y.onload = x, y.onerror = T;
          }), Dt(h, "link", l), r.state.loading |= 4, Zs(h, a.precedence, t), r.instance = h;
        case "script":
          return h = La(a.src), (u = t.querySelector(
            rl(h)
          )) ? (r.instance = u, Et(u), u) : (l = a, (u = _n.get(h)) && (l = p({}, a), Id(l, u)), t = t.ownerDocument || t, u = t.createElement("script"), Et(u), Dt(u, "link", l), t.head.appendChild(u), r.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, r.type));
      }
    else
      r.type === "stylesheet" && (r.state.loading & 4) === 0 && (l = r.instance, r.state.loading |= 4, Zs(l, a.precedence, t));
    return r.instance;
  }
  function Zs(t, r, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, h = u, y = 0; y < l.length; y++) {
      var x = l[y];
      if (x.dataset.precedence === r) h = x;
      else if (h !== u) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (r = a.nodeType === 9 ? a.head : a, r.insertBefore(t, r.firstChild));
  }
  function Pd(t, r) {
    t.crossOrigin == null && (t.crossOrigin = r.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy), t.title == null && (t.title = r.title);
  }
  function Id(t, r) {
    t.crossOrigin == null && (t.crossOrigin = r.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = r.referrerPolicy), t.integrity == null && (t.integrity = r.integrity);
  }
  var Xs = null;
  function Tm(t, r, a) {
    if (Xs === null) {
      var l = /* @__PURE__ */ new Map(), u = Xs = /* @__PURE__ */ new Map();
      u.set(a, l);
    } else
      u = Xs, l = u.get(a), l || (l = /* @__PURE__ */ new Map(), u.set(a, l));
    if (l.has(t)) return l;
    for (l.set(t, null), a = a.getElementsByTagName(t), u = 0; u < a.length; u++) {
      var h = a[u];
      if (!(h[po] || h[Bt] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = h.getAttribute(r) || "";
        y = t + y;
        var x = l.get(y);
        x ? x.push(h) : l.set(y, [h]);
      }
    }
    return l;
  }
  function Nm(t, r, a) {
    t = t.ownerDocument || t, t.head.insertBefore(
      a,
      r === "title" ? t.querySelector("head > title") : null
    );
  }
  function N3(t, r, a) {
    if (a === 1 || r.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof r.precedence != "string" || typeof r.href != "string" || r.href === "")
          break;
        return !0;
      case "link":
        if (typeof r.rel != "string" || typeof r.href != "string" || r.href === "" || r.onLoad || r.onError)
          break;
        switch (r.rel) {
          case "stylesheet":
            return t = r.disabled, typeof r.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (r.async && typeof r.async != "function" && typeof r.async != "symbol" && !r.onLoad && !r.onError && r.src && typeof r.src == "string")
          return !0;
    }
    return !1;
  }
  function Om(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var il = null;
  function O3() {
  }
  function z3(t, r, a) {
    if (il === null) throw Error(o(475));
    var l = il;
    if (r.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var u = Ra(a.href), h = t.querySelector(
          nl(u)
        );
        if (h) {
          t = h._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Qs.bind(l), t.then(l, l)), r.state.loading |= 4, r.instance = h, Et(h);
          return;
        }
        h = t.ownerDocument || t, a = Am(a), (u = _n.get(u)) && Pd(a, u), h = h.createElement("link"), Et(h);
        var y = h;
        y._p = new Promise(function(x, T) {
          y.onload = x, y.onerror = T;
        }), Dt(h, "link", a), r.instance = h;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(r, t), (t = r.state.preload) && (r.state.loading & 3) === 0 && (l.count++, r = Qs.bind(l), t.addEventListener("load", r), t.addEventListener("error", r));
    }
  }
  function M3() {
    if (il === null) throw Error(o(475));
    var t = il;
    return t.stylesheets && t.count === 0 && Yd(t, t.stylesheets), 0 < t.count ? function(r) {
      var a = setTimeout(function() {
        if (t.stylesheets && Yd(t, t.stylesheets), t.unsuspend) {
          var l = t.unsuspend;
          t.unsuspend = null, l();
        }
      }, 6e4);
      return t.unsuspend = r, function() {
        t.unsuspend = null, clearTimeout(a);
      };
    } : null;
  }
  function Qs() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Yd(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Fs = null;
  function Yd(t, r) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Fs = /* @__PURE__ */ new Map(), r.forEach(D3, t), Fs = null, Qs.call(t));
  }
  function D3(t, r) {
    if (!(r.state.loading & 4)) {
      var a = Fs.get(t);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Fs.set(t, a);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < u.length; h++) {
          var y = u[h];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (a.set(y.dataset.precedence, y), l = y);
        }
        l && a.set(null, l);
      }
      u = r.instance, y = u.getAttribute("data-precedence"), h = a.get(y) || l, h === l && a.set(null, u), a.set(y, u), this.count++, l = Qs.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), h ? h.parentNode.insertBefore(u, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), r.state.loading |= 4;
    }
  }
  var al = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: ae,
    _currentValue2: ae,
    _threadCount: 0
  };
  function R3(t, r, a, l, u, h, y, x) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ku(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ku(0), this.hiddenUpdates = Ku(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = h, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function zm(t, r, a, l, u, h, y, x, T, H, q, I) {
    return t = new R3(
      t,
      r,
      a,
      y,
      x,
      T,
      H,
      I
    ), r = 1, h === !0 && (r |= 24), h = on(3, null, null, r), t.current = h, h.stateNode = t, r = Tf(), r.refCount++, t.pooledCache = r, r.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: r
    }, Mf(h), t;
  }
  function Mm(t) {
    return t ? (t = da, t) : da;
  }
  function Dm(t, r, a, l, u, h) {
    u = Mm(u), l.context === null ? l.context = u : l.pendingContext = u, l = Ur(r), l.payload = { element: a }, h = h === void 0 ? null : h, h !== null && (l.callback = h), a = Hr(t, l, r), a !== null && (fn(a, t, r), Lo(a, t, r));
  }
  function Rm(t, r) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < r ? a : r;
    }
  }
  function Zd(t, r) {
    Rm(t, r), (t = t.alternate) && Rm(t, r);
  }
  function Lm(t) {
    if (t.tag === 13) {
      var r = fa(t, 67108864);
      r !== null && fn(r, t, 67108864), Zd(t, 67108864);
    }
  }
  var Ws = !0;
  function L3(t, r, a, l) {
    var u = j.T;
    j.T = null;
    var h = te.p;
    try {
      te.p = 2, Xd(t, r, a, l);
    } finally {
      te.p = h, j.T = u;
    }
  }
  function U3(t, r, a, l) {
    var u = j.T;
    j.T = null;
    var h = te.p;
    try {
      te.p = 8, Xd(t, r, a, l);
    } finally {
      te.p = h, j.T = u;
    }
  }
  function Xd(t, r, a, l) {
    if (Ws) {
      var u = Qd(l);
      if (u === null)
        Ud(
          t,
          r,
          l,
          Js,
          a
        ), Hm(t, l);
      else if (B3(
        u,
        t,
        r,
        a,
        l
      ))
        l.stopPropagation();
      else if (Hm(t, l), r & 4 && -1 < H3.indexOf(t)) {
        for (; u !== null; ) {
          var h = Ji(u);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var y = di(h.pendingLanes);
                  if (y !== 0) {
                    var x = h;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
                      var T = 1 << 31 - rn(y);
                      x.entanglements[1] |= T, y &= ~T;
                    }
                    Kn(h), (Ie & 6) === 0 && (Us = Hn() + 500, Wo(0));
                  }
                }
                break;
              case 13:
                x = fa(h, 2), x !== null && fn(x, h, 2), Bs(), Zd(h, 2);
            }
          if (h = Qd(l), h === null && Ud(
            t,
            r,
            l,
            Js,
            a
          ), h === u) break;
          u = h;
        }
        u !== null && l.stopPropagation();
      } else
        Ud(
          t,
          r,
          l,
          null,
          a
        );
    }
  }
  function Qd(t) {
    return t = ef(t), Fd(t);
  }
  var Js = null;
  function Fd(t) {
    if (Js = null, t = Wi(t), t !== null) {
      var r = c(t);
      if (r === null) t = null;
      else {
        var a = r.tag;
        if (a === 13) {
          if (t = f(r), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (r.stateNode.current.memoizedState.isDehydrated)
            return r.tag === 3 ? r.stateNode.containerInfo : null;
          t = null;
        } else r !== t && (t = null);
      }
    }
    return Js = t, null;
  }
  function Um(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (xw()) {
          case Q0:
            return 2;
          case F0:
            return 8;
          case Pl:
          case Sw:
            return 32;
          case W0:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wd = !1, Qr = null, Fr = null, Wr = null, ol = /* @__PURE__ */ new Map(), ll = /* @__PURE__ */ new Map(), Jr = [], H3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hm(t, r) {
    switch (t) {
      case "focusin":
      case "focusout":
        Qr = null;
        break;
      case "dragenter":
      case "dragleave":
        Fr = null;
        break;
      case "mouseover":
      case "mouseout":
        Wr = null;
        break;
      case "pointerover":
      case "pointerout":
        ol.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ll.delete(r.pointerId);
    }
  }
  function sl(t, r, a, l, u, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: r,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [u]
    }, r !== null && (r = Ji(r), r !== null && Lm(r)), t) : (t.eventSystemFlags |= l, r = t.targetContainers, u !== null && r.indexOf(u) === -1 && r.push(u), t);
  }
  function B3(t, r, a, l, u) {
    switch (r) {
      case "focusin":
        return Qr = sl(
          Qr,
          t,
          r,
          a,
          l,
          u
        ), !0;
      case "dragenter":
        return Fr = sl(
          Fr,
          t,
          r,
          a,
          l,
          u
        ), !0;
      case "mouseover":
        return Wr = sl(
          Wr,
          t,
          r,
          a,
          l,
          u
        ), !0;
      case "pointerover":
        var h = u.pointerId;
        return ol.set(
          h,
          sl(
            ol.get(h) || null,
            t,
            r,
            a,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return h = u.pointerId, ll.set(
          h,
          sl(
            ll.get(h) || null,
            t,
            r,
            a,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Bm(t) {
    var r = Wi(t.target);
    if (r !== null) {
      var a = c(r);
      if (a !== null) {
        if (r = a.tag, r === 13) {
          if (r = f(a), r !== null) {
            t.blockedOn = r, zw(t.priority, function() {
              if (a.tag === 13) {
                var l = un();
                l = qu(l);
                var u = fa(a, l);
                u !== null && fn(u, a, l), Zd(a, l);
              }
            });
            return;
          }
        } else if (r === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ec(t) {
    if (t.blockedOn !== null) return !1;
    for (var r = t.targetContainers; 0 < r.length; ) {
      var a = Qd(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Ju = l, a.target.dispatchEvent(l), Ju = null;
      } else
        return r = Ji(a), r !== null && Lm(r), t.blockedOn = a, !1;
      r.shift();
    }
    return !0;
  }
  function Vm(t, r, a) {
    ec(t) && a.delete(r);
  }
  function V3() {
    Wd = !1, Qr !== null && ec(Qr) && (Qr = null), Fr !== null && ec(Fr) && (Fr = null), Wr !== null && ec(Wr) && (Wr = null), ol.forEach(Vm), ll.forEach(Vm);
  }
  function tc(t, r) {
    t.blockedOn === r && (t.blockedOn = null, Wd || (Wd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      V3
    )));
  }
  var nc = null;
  function jm(t) {
    nc !== t && (nc = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        nc === t && (nc = null);
        for (var r = 0; r < t.length; r += 3) {
          var a = t[r], l = t[r + 1], u = t[r + 2];
          if (typeof l != "function") {
            if (Fd(l || a) === null)
              continue;
            break;
          }
          var h = Ji(a);
          h !== null && (t.splice(r, 3), r -= 3, Ff(
            h,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function cl(t) {
    function r(T) {
      return tc(T, t);
    }
    Qr !== null && tc(Qr, t), Fr !== null && tc(Fr, t), Wr !== null && tc(Wr, t), ol.forEach(r), ll.forEach(r);
    for (var a = 0; a < Jr.length; a++) {
      var l = Jr[a];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Jr.length && (a = Jr[0], a.blockedOn === null); )
      Bm(a), a.blockedOn === null && Jr.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var u = a[l], h = a[l + 1], y = u[It] || null;
        if (typeof h == "function")
          y || jm(a);
        else if (y) {
          var x = null;
          if (h && h.hasAttribute("formAction")) {
            if (u = h, y = h[It] || null)
              x = y.formAction;
            else if (Fd(u) !== null) continue;
          } else x = y.action;
          typeof x == "function" ? a[l + 1] = x : (a.splice(l, 3), l -= 3), jm(a);
        }
      }
  }
  function Jd(t) {
    this._internalRoot = t;
  }
  rc.prototype.render = Jd.prototype.render = function(t) {
    var r = this._internalRoot;
    if (r === null) throw Error(o(409));
    var a = r.current, l = un();
    Dm(a, l, t, r, null, null);
  }, rc.prototype.unmount = Jd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var r = t.containerInfo;
      Dm(t.current, 2, null, t, null, null), Bs(), r[Fi] = null;
    }
  };
  function rc(t) {
    this._internalRoot = t;
  }
  rc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var r = rv();
      t = { blockedOn: null, target: t, priority: r };
      for (var a = 0; a < Jr.length && r !== 0 && r < Jr[a].priority; a++) ;
      Jr.splice(a, 0, t), a === 0 && Bm(t);
    }
  };
  var $m = n.version;
  if ($m !== "19.1.1")
    throw Error(
      o(
        527,
        $m,
        "19.1.1"
      )
    );
  te.findDOMNode = function(t) {
    var r = t._reactInternals;
    if (r === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = v(r), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var j3 = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.1.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ic = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ic.isDisabled && ic.supportsFiber)
      try {
        ho = ic.inject(
          j3
        ), nn = ic;
      } catch {
      }
  }
  return ul.createRoot = function(t, r) {
    if (!s(t)) throw Error(o(299));
    var a = !1, l = "", u = rp, h = ip, y = ap, x = null;
    return r != null && (r.unstable_strictMode === !0 && (a = !0), r.identifierPrefix !== void 0 && (l = r.identifierPrefix), r.onUncaughtError !== void 0 && (u = r.onUncaughtError), r.onCaughtError !== void 0 && (h = r.onCaughtError), r.onRecoverableError !== void 0 && (y = r.onRecoverableError), r.unstable_transitionCallbacks !== void 0 && (x = r.unstable_transitionCallbacks)), r = zm(
      t,
      1,
      !1,
      null,
      null,
      a,
      l,
      u,
      h,
      y,
      x,
      null
    ), t[Fi] = r.current, Ld(t), new Jd(r);
  }, ul.hydrateRoot = function(t, r, a) {
    if (!s(t)) throw Error(o(299));
    var l = !1, u = "", h = rp, y = ip, x = ap, T = null, H = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (h = a.onUncaughtError), a.onCaughtError !== void 0 && (y = a.onCaughtError), a.onRecoverableError !== void 0 && (x = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (T = a.unstable_transitionCallbacks), a.formState !== void 0 && (H = a.formState)), r = zm(
      t,
      1,
      !0,
      r,
      a ?? null,
      l,
      u,
      h,
      y,
      x,
      T,
      H
    ), r.context = Mm(null), a = r.current, l = un(), l = qu(l), u = Ur(l), u.callback = null, Hr(a, u, l), a = l, r.current.lanes = a, go(r, a), Kn(r), t[Fi] = r.current, Ld(t), new rc(r);
  }, ul.version = "19.1.1", ul;
}
var Qm;
function Y3() {
  if (Qm) return eh.exports;
  Qm = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return e(), eh.exports = I3(), eh.exports;
}
var Z3 = Y3();
const O1 = /* @__PURE__ */ T1(Z3);
var ke = l0();
const Ki = /* @__PURE__ */ T1(ke);
let X3 = { data: "" }, Q3 = (e) => typeof window == "object" ? ((e ? e.querySelector("#_goober") : window._goober) || Object.assign((e || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : e || X3, F3 = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, W3 = /\/\*[^]*?\*\/|  +/g, Fm = /\n+/g, ai = (e, n) => {
  let i = "", o = "", s = "";
  for (let c in e) {
    let f = e[c];
    c[0] == "@" ? c[1] == "i" ? i = c + " " + f + ";" : o += c[1] == "f" ? ai(f, c) : c + "{" + ai(f, c[1] == "k" ? "" : n) + "}" : typeof f == "object" ? o += ai(f, n ? n.replace(/([^,])+/g, (d) => c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (v) => /&/.test(v) ? v.replace(/&/g, d) : d ? d + " " + v : v)) : c) : f != null && (c = /^--/.test(c) ? c : c.replace(/[A-Z]/g, "-$&").toLowerCase(), s += ai.p ? ai.p(c, f) : c + ":" + f + ";");
  }
  return i + (n && s ? n + "{" + s + "}" : s) + o;
}, br = {}, z1 = (e) => {
  if (typeof e == "object") {
    let n = "";
    for (let i in e) n += i + z1(e[i]);
    return n;
  }
  return e;
}, J3 = (e, n, i, o, s) => {
  let c = z1(e), f = br[c] || (br[c] = ((v) => {
    let g = 0, p = 11;
    for (; g < v.length; ) p = 101 * p + v.charCodeAt(g++) >>> 0;
    return "go" + p;
  })(c));
  if (!br[f]) {
    let v = c !== e ? e : ((g) => {
      let p, m, _ = [{}];
      for (; p = F3.exec(g.replace(W3, "")); ) p[4] ? _.shift() : p[3] ? (m = p[3].replace(Fm, " ").trim(), _.unshift(_[0][m] = _[0][m] || {})) : _[0][p[1]] = p[2].replace(Fm, " ").trim();
      return _[0];
    })(e);
    br[f] = ai(s ? { ["@keyframes " + f]: v } : v, i ? "" : "." + f);
  }
  let d = i && br.g ? br.g : null;
  return i && (br.g = br[f]), ((v, g, p, m) => {
    m ? g.data = g.data.replace(m, v) : g.data.indexOf(v) === -1 && (g.data = p ? v + g.data : g.data + v);
  })(br[f], n, o, d), f;
}, e_ = (e, n, i) => e.reduce((o, s, c) => {
  let f = n[c];
  if (f && f.call) {
    let d = f(i), v = d && d.props && d.props.className || /^go/.test(d) && d;
    f = v ? "." + v : d && typeof d == "object" ? d.props ? "" : ai(d, "") : d === !1 ? "" : d;
  }
  return o + s + (f ?? "");
}, "");
function _u(e) {
  let n = this || {}, i = e.call ? e(n.p) : e;
  return J3(i.unshift ? i.raw ? e_(i, [].slice.call(arguments, 1), n.p) : i.reduce((o, s) => Object.assign(o, s && s.call ? s(n.p) : s), {}) : i, Q3(n.target), n.g, n.o, n.k);
}
let M1, Oh, zh;
_u.bind({ g: 1 });
let Ar = _u.bind({ k: 1 });
function t_(e, n, i, o) {
  ai.p = n, M1 = e, Oh = i, zh = o;
}
function fi(e, n) {
  let i = this || {};
  return function() {
    let o = arguments;
    function s(c, f) {
      let d = Object.assign({}, c), v = d.className || s.className;
      i.p = Object.assign({ theme: Oh && Oh() }, d), i.o = / *go\d+/.test(v), d.className = _u.apply(i, o) + (v ? " " + v : "");
      let g = e;
      return e[0] && (g = d.as || e, delete d.as), zh && g[0] && zh(d), M1(g, d);
    }
    return s;
  };
}
var n_ = (e) => typeof e == "function", Kc = (e, n) => n_(e) ? e(n) : e, r_ = /* @__PURE__ */ (() => {
  let e = 0;
  return () => (++e).toString();
})(), D1 = /* @__PURE__ */ (() => {
  let e;
  return () => {
    if (e === void 0 && typeof window < "u") {
      let n = matchMedia("(prefers-reduced-motion: reduce)");
      e = !n || n.matches;
    }
    return e;
  };
})(), i_ = 20, s0 = "default", R1 = (e, n) => {
  let { toastLimit: i } = e.settings;
  switch (n.type) {
    case 0:
      return { ...e, toasts: [n.toast, ...e.toasts].slice(0, i) };
    case 1:
      return { ...e, toasts: e.toasts.map((f) => f.id === n.toast.id ? { ...f, ...n.toast } : f) };
    case 2:
      let { toast: o } = n;
      return R1(e, { type: e.toasts.find((f) => f.id === o.id) ? 1 : 0, toast: o });
    case 3:
      let { toastId: s } = n;
      return { ...e, toasts: e.toasts.map((f) => f.id === s || s === void 0 ? { ...f, dismissed: !0, visible: !1 } : f) };
    case 4:
      return n.toastId === void 0 ? { ...e, toasts: [] } : { ...e, toasts: e.toasts.filter((f) => f.id !== n.toastId) };
    case 5:
      return { ...e, pausedAt: n.time };
    case 6:
      let c = n.time - (e.pausedAt || 0);
      return { ...e, pausedAt: void 0, toasts: e.toasts.map((f) => ({ ...f, pauseDuration: f.pauseDuration + c })) };
  }
}, gc = [], L1 = { toasts: [], pausedAt: void 0, settings: { toastLimit: i_ } }, Zn = {}, U1 = (e, n = s0) => {
  Zn[n] = R1(Zn[n] || L1, e), gc.forEach(([i, o]) => {
    i === n && o(Zn[n]);
  });
}, H1 = (e) => Object.keys(Zn).forEach((n) => U1(e, n)), a_ = (e) => Object.keys(Zn).find((n) => Zn[n].toasts.some((i) => i.id === e)), xu = (e = s0) => (n) => {
  U1(n, e);
}, o_ = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 }, l_ = (e = {}, n = s0) => {
  let [i, o] = ke.useState(Zn[n] || L1), s = ke.useRef(Zn[n]);
  ke.useEffect(() => (s.current !== Zn[n] && o(Zn[n]), gc.push([n, o]), () => {
    let f = gc.findIndex(([d]) => d === n);
    f > -1 && gc.splice(f, 1);
  }), [n]);
  let c = i.toasts.map((f) => {
    var d, v, g;
    return { ...e, ...e[f.type], ...f, removeDelay: f.removeDelay || ((d = e[f.type]) == null ? void 0 : d.removeDelay) || e?.removeDelay, duration: f.duration || ((v = e[f.type]) == null ? void 0 : v.duration) || e?.duration || o_[f.type], style: { ...e.style, ...(g = e[f.type]) == null ? void 0 : g.style, ...f.style } };
  });
  return { ...i, toasts: c };
}, s_ = (e, n = "blank", i) => ({ createdAt: Date.now(), visible: !0, dismissed: !1, type: n, ariaProps: { role: "status", "aria-live": "polite" }, message: e, pauseDuration: 0, ...i, id: i?.id || r_() }), Vl = (e) => (n, i) => {
  let o = s_(n, e, i);
  return xu(o.toasterId || a_(o.id))({ type: 2, toast: o }), o.id;
}, Ct = (e, n) => Vl("blank")(e, n);
Ct.error = Vl("error");
Ct.success = Vl("success");
Ct.loading = Vl("loading");
Ct.custom = Vl("custom");
Ct.dismiss = (e, n) => {
  let i = { type: 3, toastId: e };
  n ? xu(n)(i) : H1(i);
};
Ct.dismissAll = (e) => Ct.dismiss(void 0, e);
Ct.remove = (e, n) => {
  let i = { type: 4, toastId: e };
  n ? xu(n)(i) : H1(i);
};
Ct.removeAll = (e) => Ct.remove(void 0, e);
Ct.promise = (e, n, i) => {
  let o = Ct.loading(n.loading, { ...i, ...i?.loading });
  return typeof e == "function" && (e = e()), e.then((s) => {
    let c = n.success ? Kc(n.success, s) : void 0;
    return c ? Ct.success(c, { id: o, ...i, ...i?.success }) : Ct.dismiss(o), s;
  }).catch((s) => {
    let c = n.error ? Kc(n.error, s) : void 0;
    c ? Ct.error(c, { id: o, ...i, ...i?.error }) : Ct.dismiss(o);
  }), e;
};
var c_ = 1e3, u_ = (e, n = "default") => {
  let { toasts: i, pausedAt: o } = l_(e, n), s = ke.useRef(/* @__PURE__ */ new Map()).current, c = ke.useCallback((m, _ = c_) => {
    if (s.has(m)) return;
    let w = setTimeout(() => {
      s.delete(m), f({ type: 4, toastId: m });
    }, _);
    s.set(m, w);
  }, []);
  ke.useEffect(() => {
    if (o) return;
    let m = Date.now(), _ = i.map((w) => {
      if (w.duration === 1 / 0) return;
      let C = (w.duration || 0) + w.pauseDuration - (m - w.createdAt);
      if (C < 0) {
        w.visible && Ct.dismiss(w.id);
        return;
      }
      return setTimeout(() => Ct.dismiss(w.id, n), C);
    });
    return () => {
      _.forEach((w) => w && clearTimeout(w));
    };
  }, [i, o, n]);
  let f = ke.useCallback(xu(n), [n]), d = ke.useCallback(() => {
    f({ type: 5, time: Date.now() });
  }, [f]), v = ke.useCallback((m, _) => {
    f({ type: 1, toast: { id: m, height: _ } });
  }, [f]), g = ke.useCallback(() => {
    o && f({ type: 6, time: Date.now() });
  }, [o, f]), p = ke.useCallback((m, _) => {
    let { reverseOrder: w = !1, gutter: C = 8, defaultPosition: k } = _ || {}, S = i.filter((A) => (A.position || k) === (m.position || k) && A.height), E = S.findIndex((A) => A.id === m.id), O = S.filter((A, D) => D < E && A.visible).length;
    return S.filter((A) => A.visible).slice(...w ? [O + 1] : [0, O]).reduce((A, D) => A + (D.height || 0) + C, 0);
  }, [i]);
  return ke.useEffect(() => {
    i.forEach((m) => {
      if (m.dismissed) c(m.id, m.removeDelay);
      else {
        let _ = s.get(m.id);
        _ && (clearTimeout(_), s.delete(m.id));
      }
    });
  }, [i, c]), { toasts: i, handlers: { updateHeight: v, startPause: d, endPause: g, calculateOffset: p } };
}, f_ = Ar`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, d_ = Ar`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, h_ = Ar`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, v_ = fi("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${f_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${d_} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${h_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`, g_ = Ar`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, p_ = fi("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${g_} 1s linear infinite;
`, m_ = Ar`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, y_ = Ar`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, b_ = fi("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${m_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${y_} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`, w_ = fi("div")`
  position: absolute;
`, __ = fi("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, x_ = Ar`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, S_ = fi("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${x_} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, C_ = ({ toast: e }) => {
  let { icon: n, type: i, iconTheme: o } = e;
  return n !== void 0 ? typeof n == "string" ? ke.createElement(S_, null, n) : n : i === "blank" ? null : ke.createElement(__, null, ke.createElement(p_, { ...o }), i !== "loading" && ke.createElement(w_, null, i === "error" ? ke.createElement(v_, { ...o }) : ke.createElement(b_, { ...o })));
}, k_ = (e) => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, A_ = (e) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, E_ = "0%{opacity:0;} 100%{opacity:1;}", T_ = "0%{opacity:1;} 100%{opacity:0;}", N_ = fi("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, O_ = fi("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, z_ = (e, n) => {
  let i = e.includes("top") ? 1 : -1, [o, s] = D1() ? [E_, T_] : [k_(i), A_(i)];
  return { animation: n ? `${Ar(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${Ar(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
}, c0 = ke.memo(({ toast: e, position: n, style: i, children: o }) => {
  let s = e.height ? z_(e.position || n || "top-center", e.visible) : { opacity: 0 }, c = ke.createElement(C_, { toast: e }), f = ke.createElement(O_, { ...e.ariaProps }, Kc(e.message, e));
  return ke.createElement(N_, { className: e.className, style: { ...s, ...i, ...e.style } }, typeof o == "function" ? o({ icon: c, message: f }) : ke.createElement(ke.Fragment, null, c, f));
});
t_(ke.createElement);
var M_ = ({ id: e, className: n, style: i, onHeightUpdate: o, children: s }) => {
  let c = ke.useCallback((f) => {
    if (f) {
      let d = () => {
        let v = f.getBoundingClientRect().height;
        o(e, v);
      };
      d(), new MutationObserver(d).observe(f, { subtree: !0, childList: !0, characterData: !0 });
    }
  }, [e, o]);
  return ke.createElement("div", { ref: c, className: n, style: i }, s);
}, D_ = (e, n) => {
  let i = e.includes("top"), o = i ? { top: 0 } : { bottom: 0 }, s = e.includes("center") ? { justifyContent: "center" } : e.includes("right") ? { justifyContent: "flex-end" } : {};
  return { left: 0, right: 0, display: "flex", position: "absolute", transition: D1() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)", transform: `translateY(${n * (i ? 1 : -1)}px)`, ...o, ...s };
}, R_ = _u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, ac = 16, B1 = ({ reverseOrder: e, position: n = "top-center", toastOptions: i, gutter: o, children: s, toasterId: c, containerStyle: f, containerClassName: d }) => {
  let { toasts: v, handlers: g } = u_(i, c);
  return ke.createElement("div", { "data-rht-toaster": c || "", style: { position: "fixed", zIndex: 9999, top: ac, left: ac, right: ac, bottom: ac, pointerEvents: "none", ...f }, className: d, onMouseEnter: g.startPause, onMouseLeave: g.endPause }, v.map((p) => {
    let m = p.position || n, _ = g.calculateOffset(p, { reverseOrder: e, gutter: o, defaultPosition: n }), w = D_(m, _);
    return ke.createElement(M_, { id: p.id, key: p.id, onHeightUpdate: g.updateHeight, className: p.visible ? R_ : "", style: w }, p.type === "custom" ? Kc(p.message, p) : s ? s(p) : ke.createElement(c0, { toast: p, position: m }));
  }));
}, u0 = Ct;
function Su({
  subscriberId: e,
  subscriber: n
}) {
  return n ? typeof n == "string" ? { subscriberId: n } : n : e ? { subscriberId: e } : { subscriberId: "" };
}
var L_ = (e) => {
  const n = [];
  let i = "", o = !1;
  for (let s = 0; s < e.length; s += 1)
    e[s] === "\\" && e[s + 1] === "*" ? (i += "*", s += 1) : e[s] === "*" && e[s + 1] === "*" ? (i && (n.push({
      type: o ? "bold" : "text",
      content: i
    }), i = ""), o = !o, s += 1) : i += e[s];
  return i && n.push({
    type: o ? "bold" : "text",
    content: i
  }), n;
}, U_ = Object.defineProperty, H_ = Object.defineProperties, B_ = Object.getOwnPropertyDescriptors, qc = Object.getOwnPropertySymbols, V1 = Object.prototype.hasOwnProperty, j1 = Object.prototype.propertyIsEnumerable, $1 = (e) => {
  throw TypeError(e);
}, Wm = (e, n, i) => n in e ? U_(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[n] = i, re = (e, n) => {
  for (var i in n || (n = {}))
    V1.call(n, i) && Wm(e, i, n[i]);
  if (qc)
    for (var i of qc(n))
      j1.call(n, i) && Wm(e, i, n[i]);
  return e;
}, je = (e, n) => H_(e, B_(n)), Ka = (e, n) => {
  var i = {};
  for (var o in e)
    V1.call(e, o) && n.indexOf(o) < 0 && (i[o] = e[o]);
  if (e != null && qc)
    for (var o of qc(e))
      n.indexOf(o) < 0 && j1.call(e, o) && (i[o] = e[o]);
  return i;
}, f0 = (e, n, i) => n.has(e) || $1("Cannot " + i), N = (e, n, i) => (f0(e, n, "read from private field"), i ? i.call(e) : n.get(e)), ce = (e, n, i) => n.has(e) ? $1("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), de = (e, n, i, o) => (f0(e, n, "write to private field"), n.set(e, i), i), Jt = (e, n, i) => (f0(e, n, "access private method"), i), P = (e, n, i) => new Promise((o, s) => {
  var c = (v) => {
    try {
      d(i.next(v));
    } catch (g) {
      s(g);
    }
  }, f = (v) => {
    try {
      d(i.throw(v));
    } catch (g) {
      s(g);
    }
  }, d = (v) => v.done ? o(v.value) : Promise.resolve(v.value).then(c, f);
  d((i = i.apply(e, n)).next());
});
function V_(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(n, i) {
    var o = e.get(n);
    o ? o.push(i) : e.set(n, [i]);
  }, off: function(n, i) {
    var o = e.get(n);
    o && (i ? o.splice(o.indexOf(i) >>> 0, 1) : e.set(n, []));
  }, emit: function(n, i) {
    var o = e.get(n);
    o && o.slice().map(function(s) {
      s(i);
    }), (o = e.get("*")) && o.slice().map(function(s) {
      s(n, i);
    });
  } };
}
var Jm = {}, ey;
function j_() {
  if (ey) return Jm;
  ey = 1;
  const e = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Km < "u" && Km, n = (function() {
    try {
      new e.Event("");
    } catch {
      return !0;
    }
    return !1;
  })(), i = (function() {
    try {
      new e.EventTarget();
    } catch {
      return !0;
    }
    return !1;
  })();
  return n && (e.Event = /* @__PURE__ */ (function() {
    function o(s, c) {
      this.bubbles = !!c && !!c.bubbles, this.cancelable = !!c && !!c.cancelable, this.composed = !!c && !!c.composed, this.type = s;
    }
    return o;
  })()), i && (e.EventTarget = (function() {
    function o() {
      this.__listeners = /* @__PURE__ */ new Map();
    }
    return o.prototype = Object.create(Object.prototype), o.prototype.addEventListener = function(s, c, f) {
      if (arguments.length < 2)
        throw new TypeError(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
        );
      const d = this.__listeners, v = s.toString();
      d.has(v) || d.set(v, /* @__PURE__ */ new Map());
      const g = d.get(v);
      g.has(c) || g.set(c, f);
    }, o.prototype.removeEventListener = function(s, c, f) {
      if (arguments.length < 2)
        throw new TypeError(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
        );
      const d = this.__listeners, v = s.toString();
      if (d.has(v)) {
        const g = d.get(v);
        g.has(c) && g.delete(c);
      }
    }, o.prototype.dispatchEvent = function(s) {
      if (!(s instanceof Event))
        throw new TypeError(
          "Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'."
        );
      const c = s.type, d = this.__listeners.get(c);
      if (d)
        for (var v of d.entries()) {
          const g = v[0], p = v[1];
          try {
            typeof g == "function" ? g.call(this, s) : g && typeof g.handleEvent == "function" && g.handleEvent(s);
          } catch (m) {
            setTimeout(() => {
              throw m;
            });
          }
          p && p.once && d.delete(g);
        }
      return !0;
    }, o;
  })()), Jm;
}
j_();
(!globalThis.EventTarget || !globalThis.Event) && console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`);
var K1 = class extends Event {
  message;
  error;
  // biome-ignore lint/suspicious/noExplicitAny: vibes
  constructor(e, n) {
    super("error", n), this.message = e.message, this.error = e;
  }
}, q1 = class extends Event {
  code;
  reason;
  wasClean = !0;
  // biome-ignore lint/suspicious/noExplicitAny: legacy
  constructor(e = 1e3, n = "", i) {
    super("close", i), this.code = e, this.reason = n;
  }
}, ah = {
  Event,
  ErrorEvent: K1,
  CloseEvent: q1
};
function $_(e, n) {
  if (!e)
    throw new Error(n);
}
function K_(e) {
  return new e.constructor(e.type, e);
}
function q_(e) {
  return "data" in e ? new MessageEvent(e.type, e) : "code" in e || "reason" in e ? new q1(
    // @ts-expect-error we need to fix event/listener types
    e.code || 1999,
    // @ts-expect-error we need to fix event/listener types
    e.reason || "unknown reason",
    e
  ) : "error" in e ? new K1(e.error, e) : new Event(e.type, e);
}
var ty, G_ = typeof process < "u" && typeof ((ty = process.versions) == null ? void 0 : ty.node) < "u" && typeof document > "u", oc = G_ ? q_ : K_, Oi = {
  maxReconnectionDelay: 1e4,
  minReconnectionDelay: 1e3 + Math.random() * 4e3,
  minUptime: 5e3,
  reconnectionDelayGrowFactor: 1.3,
  connectionTimeout: 4e3,
  maxRetries: Number.POSITIVE_INFINITY,
  maxEnqueuedMessages: Number.POSITIVE_INFINITY
}, ny = !1, P_ = class zi extends EventTarget {
  _ws;
  _retryCount = -1;
  _uptimeTimeout;
  _connectTimeout;
  _shouldReconnect = !0;
  _connectLock = !1;
  _binaryType = "blob";
  _closeCalled = !1;
  _messageQueue = [];
  _debugLogger = console.log.bind(console);
  _url;
  _protocols;
  _options;
  constructor(n, i, o = {}) {
    super(), this._url = n, this._protocols = i, this._options = o, this._options.startClosed && (this._shouldReconnect = !1), this._options.debugLogger && (this._debugLogger = this._options.debugLogger), this._connect();
  }
  static get CONNECTING() {
    return 0;
  }
  static get OPEN() {
    return 1;
  }
  static get CLOSING() {
    return 2;
  }
  static get CLOSED() {
    return 3;
  }
  get CONNECTING() {
    return zi.CONNECTING;
  }
  get OPEN() {
    return zi.OPEN;
  }
  get CLOSING() {
    return zi.CLOSING;
  }
  get CLOSED() {
    return zi.CLOSED;
  }
  get binaryType() {
    return this._ws ? this._ws.binaryType : this._binaryType;
  }
  set binaryType(n) {
    this._binaryType = n, this._ws && (this._ws.binaryType = n);
  }
  /**
   * Returns the number or connection retries
   */
  get retryCount() {
    return Math.max(this._retryCount, 0);
  }
  /**
   * The number of bytes of data that have been queued using calls to send() but not yet
   * transmitted to the network. This value resets to zero once all queued data has been sent.
   * This value does not reset to zero when the connection is closed; if you keep calling send(),
   * this will continue to climb. Read only
   */
  get bufferedAmount() {
    return this._messageQueue.reduce((i, o) => (typeof o == "string" ? i += o.length : o instanceof Blob ? i += o.size : i += o.byteLength, i), 0) + (this._ws ? this._ws.bufferedAmount : 0);
  }
  /**
   * The extensions selected by the server. This is currently only the empty string or a list of
   * extensions as negotiated by the connection
   */
  get extensions() {
    return this._ws ? this._ws.extensions : "";
  }
  /**
   * A string indicating the name of the sub-protocol the server selected;
   * this will be one of the strings specified in the protocols parameter when creating the
   * WebSocket object
   */
  get protocol() {
    return this._ws ? this._ws.protocol : "";
  }
  /**
   * The current state of the connection; this is one of the Ready state constants
   */
  get readyState() {
    return this._ws ? this._ws.readyState : this._options.startClosed ? zi.CLOSED : zi.CONNECTING;
  }
  /**
   * The URL as resolved by the constructor
   */
  get url() {
    return this._ws ? this._ws.url : "";
  }
  /**
   * Whether the websocket object is now in reconnectable state
   */
  get shouldReconnect() {
    return this._shouldReconnect;
  }
  /**
   * An event listener to be called when the WebSocket connection's readyState changes to CLOSED
   */
  onclose = null;
  /**
   * An event listener to be called when an error occurs
   */
  onerror = null;
  /**
   * An event listener to be called when a message is received from the server
   */
  onmessage = null;
  /**
   * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
   * this indicates that the connection is ready to send and receive data
   */
  onopen = null;
  /**
   * Closes the WebSocket connection or connection attempt, if any. If the connection is already
   * CLOSED, this method does nothing
   */
  close(n = 1e3, i) {
    if (this._closeCalled = !0, this._shouldReconnect = !1, this._clearTimeouts(), !this._ws) {
      this._debug("close enqueued: no ws instance");
      return;
    }
    if (this._ws.readyState === this.CLOSED) {
      this._debug("close: already closed");
      return;
    }
    this._ws.close(n, i);
  }
  /**
   * Closes the WebSocket connection or connection attempt and connects again.
   * Resets retry counter;
   */
  reconnect(n, i) {
    this._shouldReconnect = !0, this._closeCalled = !1, this._retryCount = -1, !this._ws || this._ws.readyState === this.CLOSED ? this._connect() : (this._disconnect(n, i), this._connect());
  }
  /**
   * Enqueue specified data to be transmitted to the server over the WebSocket connection
   */
  send(n) {
    if (this._ws && this._ws.readyState === this.OPEN)
      this._debug("send", n), this._ws.send(n);
    else {
      const { maxEnqueuedMessages: i = Oi.maxEnqueuedMessages } = this._options;
      this._messageQueue.length < i && (this._debug("enqueue", n), this._messageQueue.push(n));
    }
  }
  _debug(...n) {
    this._options.debug && this._debugLogger("RWS>", ...n);
  }
  _getNextDelay() {
    const {
      reconnectionDelayGrowFactor: n = Oi.reconnectionDelayGrowFactor,
      minReconnectionDelay: i = Oi.minReconnectionDelay,
      maxReconnectionDelay: o = Oi.maxReconnectionDelay
    } = this._options;
    let s = 0;
    return this._retryCount > 0 && (s = i * n ** (this._retryCount - 1), s > o && (s = o)), this._debug("next delay", s), s;
  }
  _wait() {
    return new Promise((n) => {
      setTimeout(n, this._getNextDelay());
    });
  }
  _getNextProtocols(n) {
    if (!n) return Promise.resolve(null);
    if (typeof n == "string" || Array.isArray(n))
      return Promise.resolve(n);
    if (typeof n == "function") {
      const i = n();
      if (!i) return Promise.resolve(null);
      if (typeof i == "string" || Array.isArray(i))
        return Promise.resolve(i);
      if (i.then)
        return i;
    }
    throw Error("Invalid protocols");
  }
  _getNextUrl(n) {
    if (typeof n == "string")
      return Promise.resolve(n);
    if (typeof n == "function") {
      const i = n();
      if (typeof i == "string")
        return Promise.resolve(i);
      if (i.then)
        return i;
    }
    throw Error("Invalid URL");
  }
  _connect() {
    if (this._connectLock || !this._shouldReconnect)
      return;
    this._connectLock = !0;
    const {
      maxRetries: n = Oi.maxRetries,
      connectionTimeout: i = Oi.connectionTimeout
    } = this._options;
    if (this._retryCount >= n) {
      this._debug("max retries reached", this._retryCount, ">=", n);
      return;
    }
    this._retryCount++, this._debug("connect", this._retryCount), this._removeListeners(), this._wait().then(
      () => Promise.all([
        this._getNextUrl(this._url),
        this._getNextProtocols(this._protocols || null)
      ])
    ).then(([o, s]) => {
      if (this._closeCalled) {
        this._connectLock = !1;
        return;
      }
      !this._options.WebSocket && typeof WebSocket > "u" && !ny && (console.error(`‼️ No WebSocket implementation available. You should define options.WebSocket. 

For example, if you're using node.js, run \`npm install ws\`, and then in your code:

import PartySocket from 'partysocket';
import WS from 'ws';

const partysocket = new PartySocket({
  host: "127.0.0.1:1999",
  room: "test-room",
  WebSocket: WS
});

`), ny = !0);
      const c = this._options.WebSocket || WebSocket;
      this._debug("connect", { url: o, protocols: s }), this._ws = s ? new c(o, s) : new c(o), this._ws.binaryType = this._binaryType, this._connectLock = !1, this._addListeners(), this._connectTimeout = setTimeout(
        () => this._handleTimeout(),
        i
      );
    }).catch((o) => {
      this._connectLock = !1, this._handleError(new ah.ErrorEvent(Error(o.message), this));
    });
  }
  _handleTimeout() {
    this._debug("timeout event"), this._handleError(new ah.ErrorEvent(Error("TIMEOUT"), this));
  }
  _disconnect(n = 1e3, i) {
    if (this._clearTimeouts(), !!this._ws) {
      this._removeListeners();
      try {
        (this._ws.readyState === this.OPEN || this._ws.readyState === this.CONNECTING) && this._ws.close(n, i), this._handleClose(new ah.CloseEvent(n, i, this));
      } catch {
      }
    }
  }
  _acceptOpen() {
    this._debug("accept open"), this._retryCount = 0;
  }
  _handleOpen = (n) => {
    this._debug("open event");
    const { minUptime: i = Oi.minUptime } = this._options;
    clearTimeout(this._connectTimeout), this._uptimeTimeout = setTimeout(() => this._acceptOpen(), i), $_(this._ws, "WebSocket is not defined"), this._ws.binaryType = this._binaryType, this._messageQueue.forEach((o) => {
      var s;
      (s = this._ws) == null || s.send(o);
    }), this._messageQueue = [], this.onopen && this.onopen(n), this.dispatchEvent(oc(n));
  };
  _handleMessage = (n) => {
    this._debug("message event"), this.onmessage && this.onmessage(n), this.dispatchEvent(oc(n));
  };
  _handleError = (n) => {
    this._debug("error event", n.message), this._disconnect(void 0, n.message === "TIMEOUT" ? "timeout" : void 0), this.onerror && this.onerror(n), this._debug("exec error listeners"), this.dispatchEvent(oc(n)), this._connect();
  };
  _handleClose = (n) => {
    this._debug("close event"), this._clearTimeouts(), this._shouldReconnect && this._connect(), this.onclose && this.onclose(n), this.dispatchEvent(oc(n));
  };
  _removeListeners() {
    this._ws && (this._debug("removeListeners"), this._ws.removeEventListener("open", this._handleOpen), this._ws.removeEventListener("close", this._handleClose), this._ws.removeEventListener("message", this._handleMessage), this._ws.removeEventListener("error", this._handleError));
  }
  _addListeners() {
    this._ws && (this._debug("addListeners"), this._ws.addEventListener("open", this._handleOpen), this._ws.addEventListener("close", this._handleClose), this._ws.addEventListener("message", this._handleMessage), this._ws.addEventListener("error", this._handleError));
  }
  _clearTimeouts() {
    clearTimeout(this._connectTimeout), clearTimeout(this._uptimeTimeout);
  }
};
/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 */
const Wn = /* @__PURE__ */ Object.create(null);
Wn.open = "0";
Wn.close = "1";
Wn.ping = "2";
Wn.pong = "3";
Wn.message = "4";
Wn.upgrade = "5";
Wn.noop = "6";
const pc = /* @__PURE__ */ Object.create(null);
Object.keys(Wn).forEach((e) => {
  pc[Wn[e]] = e;
});
const Mh = { type: "error", data: "parser error" }, G1 = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", P1 = typeof ArrayBuffer == "function", I1 = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, d0 = ({ type: e, data: n }, i, o) => G1 && n instanceof Blob ? i ? o(n) : ry(n, o) : P1 && (n instanceof ArrayBuffer || I1(n)) ? i ? o(n) : ry(new Blob([n]), o) : o(Wn[e] + (n || "")), ry = (e, n) => {
  const i = new FileReader();
  return i.onload = function() {
    const o = i.result.split(",")[1];
    n("b" + (o || ""));
  }, i.readAsDataURL(e);
};
function iy(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let oh;
function I_(e, n) {
  if (G1 && e.data instanceof Blob)
    return e.data.arrayBuffer().then(iy).then(n);
  if (P1 && (e.data instanceof ArrayBuffer || I1(e.data)))
    return n(iy(e.data));
  d0(e, !1, (i) => {
    oh || (oh = new TextEncoder()), n(oh.encode(i));
  });
}
const ay = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ml = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ay.length; e++)
  ml[ay.charCodeAt(e)] = e;
const Y_ = (e) => {
  let n = e.length * 0.75, i = e.length, o, s = 0, c, f, d, v;
  e[e.length - 1] === "=" && (n--, e[e.length - 2] === "=" && n--);
  const g = new ArrayBuffer(n), p = new Uint8Array(g);
  for (o = 0; o < i; o += 4)
    c = ml[e.charCodeAt(o)], f = ml[e.charCodeAt(o + 1)], d = ml[e.charCodeAt(o + 2)], v = ml[e.charCodeAt(o + 3)], p[s++] = c << 2 | f >> 4, p[s++] = (f & 15) << 4 | d >> 2, p[s++] = (d & 3) << 6 | v & 63;
  return g;
}, Z_ = typeof ArrayBuffer == "function", h0 = (e, n) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: Y1(e, n)
    };
  const i = e.charAt(0);
  return i === "b" ? {
    type: "message",
    data: X_(e.substring(1), n)
  } : pc[i] ? e.length > 1 ? {
    type: pc[i],
    data: e.substring(1)
  } : {
    type: pc[i]
  } : Mh;
}, X_ = (e, n) => {
  if (Z_) {
    const i = Y_(e);
    return Y1(i, n);
  } else
    return { base64: !0, data: e };
}, Y1 = (e, n) => {
  switch (n) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, Z1 = "", Q_ = (e, n) => {
  const i = e.length, o = new Array(i);
  let s = 0;
  e.forEach((c, f) => {
    d0(c, !1, (d) => {
      o[f] = d, ++s === i && n(o.join(Z1));
    });
  });
}, F_ = (e, n) => {
  const i = e.split(Z1), o = [];
  for (let s = 0; s < i.length; s++) {
    const c = h0(i[s], n);
    if (o.push(c), c.type === "error")
      break;
  }
  return o;
};
function W_() {
  return new TransformStream({
    transform(e, n) {
      I_(e, (i) => {
        const o = i.length;
        let s;
        if (o < 126)
          s = new Uint8Array(1), new DataView(s.buffer).setUint8(0, o);
        else if (o < 65536) {
          s = new Uint8Array(3);
          const c = new DataView(s.buffer);
          c.setUint8(0, 126), c.setUint16(1, o);
        } else {
          s = new Uint8Array(9);
          const c = new DataView(s.buffer);
          c.setUint8(0, 127), c.setBigUint64(1, BigInt(o));
        }
        e.data && typeof e.data != "string" && (s[0] |= 128), n.enqueue(s), n.enqueue(i);
      });
    }
  });
}
let lh;
function lc(e) {
  return e.reduce((n, i) => n + i.length, 0);
}
function sc(e, n) {
  if (e[0].length === n)
    return e.shift();
  const i = new Uint8Array(n);
  let o = 0;
  for (let s = 0; s < n; s++)
    i[s] = e[0][o++], o === e[0].length && (e.shift(), o = 0);
  return e.length && o < e[0].length && (e[0] = e[0].slice(o)), i;
}
function J_(e, n) {
  lh || (lh = new TextDecoder());
  const i = [];
  let o = 0, s = -1, c = !1;
  return new TransformStream({
    transform(f, d) {
      for (i.push(f); ; ) {
        if (o === 0) {
          if (lc(i) < 1)
            break;
          const v = sc(i, 1);
          c = (v[0] & 128) === 128, s = v[0] & 127, s < 126 ? o = 3 : s === 126 ? o = 1 : o = 2;
        } else if (o === 1) {
          if (lc(i) < 2)
            break;
          const v = sc(i, 2);
          s = new DataView(v.buffer, v.byteOffset, v.length).getUint16(0), o = 3;
        } else if (o === 2) {
          if (lc(i) < 8)
            break;
          const v = sc(i, 8), g = new DataView(v.buffer, v.byteOffset, v.length), p = g.getUint32(0);
          if (p > Math.pow(2, 21) - 1) {
            d.enqueue(Mh);
            break;
          }
          s = p * Math.pow(2, 32) + g.getUint32(4), o = 3;
        } else {
          if (lc(i) < s)
            break;
          const v = sc(i, s);
          d.enqueue(h0(c ? v : lh.decode(v), n)), o = 0;
        }
        if (s === 0 || s > e) {
          d.enqueue(Mh);
          break;
        }
      }
    }
  });
}
const X1 = 4;
function wt(e) {
  if (e) return e4(e);
}
function e4(e) {
  for (var n in wt.prototype)
    e[n] = wt.prototype[n];
  return e;
}
wt.prototype.on = wt.prototype.addEventListener = function(e, n) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(n), this;
};
wt.prototype.once = function(e, n) {
  function i() {
    this.off(e, i), n.apply(this, arguments);
  }
  return i.fn = n, this.on(e, i), this;
};
wt.prototype.off = wt.prototype.removeListener = wt.prototype.removeAllListeners = wt.prototype.removeEventListener = function(e, n) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var i = this._callbacks["$" + e];
  if (!i) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + e], this;
  for (var o, s = 0; s < i.length; s++)
    if (o = i[s], o === n || o.fn === n) {
      i.splice(s, 1);
      break;
    }
  return i.length === 0 && delete this._callbacks["$" + e], this;
};
wt.prototype.emit = function(e) {
  this._callbacks = this._callbacks || {};
  for (var n = new Array(arguments.length - 1), i = this._callbacks["$" + e], o = 1; o < arguments.length; o++)
    n[o - 1] = arguments[o];
  if (i) {
    i = i.slice(0);
    for (var o = 0, s = i.length; o < s; ++o)
      i[o].apply(this, n);
  }
  return this;
};
wt.prototype.emitReserved = wt.prototype.emit;
wt.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
wt.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const Cn = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")();
function Q1(e, ...n) {
  return n.reduce((i, o) => (e.hasOwnProperty(o) && (i[o] = e[o]), i), {});
}
const t4 = Cn.setTimeout, n4 = Cn.clearTimeout;
function Cu(e, n) {
  n.useNativeTimers ? (e.setTimeoutFn = t4.bind(Cn), e.clearTimeoutFn = n4.bind(Cn)) : (e.setTimeoutFn = Cn.setTimeout.bind(Cn), e.clearTimeoutFn = Cn.clearTimeout.bind(Cn));
}
const r4 = 1.33;
function i4(e) {
  return typeof e == "string" ? a4(e) : Math.ceil((e.byteLength || e.size) * r4);
}
function a4(e) {
  let n = 0, i = 0;
  for (let o = 0, s = e.length; o < s; o++)
    n = e.charCodeAt(o), n < 128 ? i += 1 : n < 2048 ? i += 2 : n < 55296 || n >= 57344 ? i += 3 : (o++, i += 4);
  return i;
}
function o4(e) {
  let n = "";
  for (let i in e)
    e.hasOwnProperty(i) && (n.length && (n += "&"), n += encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
  return n;
}
function l4(e) {
  let n = {}, i = e.split("&");
  for (let o = 0, s = i.length; o < s; o++) {
    let c = i[o].split("=");
    n[decodeURIComponent(c[0])] = decodeURIComponent(c[1]);
  }
  return n;
}
class s4 extends Error {
  constructor(n, i, o) {
    super(n), this.description = i, this.context = o, this.type = "TransportError";
  }
}
class v0 extends wt {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(n) {
    super(), this.writable = !1, Cu(this, n), this.opts = n, this.query = n.query, this.socket = n.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(n, i, o) {
    return super.emitReserved("error", new s4(n, i, o)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(n) {
    this.readyState === "open" && this.write(n);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(n) {
    const i = h0(n, this.socket.binaryType);
    this.onPacket(i);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(n) {
    super.emitReserved("packet", n);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(n) {
    this.readyState = "closed", super.emitReserved("close", n);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(n) {
  }
  createUri(n, i = {}) {
    return n + "://" + this._hostname() + this._port() + this.opts.path + this._query(i);
  }
  _hostname() {
    const n = this.opts.hostname;
    return n.indexOf(":") === -1 ? n : "[" + n + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(n) {
    const i = o4(n);
    return i.length ? "?" + i : "";
  }
}
const F1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), Dh = 64, c4 = {};
let oy = 0, cc = 0, ly;
function sy(e) {
  let n = "";
  do
    n = F1[e % Dh] + n, e = Math.floor(e / Dh);
  while (e > 0);
  return n;
}
function W1() {
  const e = sy(+/* @__PURE__ */ new Date());
  return e !== ly ? (oy = 0, ly = e) : e + "." + sy(oy++);
}
for (; cc < Dh; cc++)
  c4[F1[cc]] = cc;
let J1 = !1;
try {
  J1 = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const u4 = J1;
function eb(e) {
  const n = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!n || u4))
      return new XMLHttpRequest();
  } catch {
  }
  if (!n)
    try {
      return new Cn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
function f4() {
}
const d4 = (function() {
  return new eb({
    xdomain: !1
  }).responseType != null;
})();
class h4 extends v0 {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(n) {
    if (super(n), this.polling = !1, typeof location < "u") {
      const o = location.protocol === "https:";
      let s = location.port;
      s || (s = o ? "443" : "80"), this.xd = typeof location < "u" && n.hostname !== location.hostname || s !== n.port;
    }
    const i = n && n.forceBase64;
    this.supportsBinary = d4 && !i, this.opts.withCredentials && (this.cookieJar = void 0);
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(n) {
    this.readyState = "pausing";
    const i = () => {
      this.readyState = "paused", n();
    };
    if (this.polling || !this.writable) {
      let o = 0;
      this.polling && (o++, this.once("pollComplete", function() {
        --o || i();
      })), this.writable || (o++, this.once("drain", function() {
        --o || i();
      }));
    } else
      i();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  poll() {
    this.polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(n) {
    const i = (o) => {
      if (this.readyState === "opening" && o.type === "open" && this.onOpen(), o.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(o);
    };
    F_(n, this.socket.binaryType).forEach(i), this.readyState !== "closed" && (this.polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this.poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const n = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? n() : this.once("open", n);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(n) {
    this.writable = !1, Q_(n, (i) => {
      this.doWrite(i, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const n = this.opts.secure ? "https" : "http", i = this.query || {};
    return this.opts.timestampRequests !== !1 && (i[this.opts.timestampParam] = W1()), !this.supportsBinary && !i.sid && (i.b64 = 1), this.createUri(n, i);
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @private
   */
  request(n = {}) {
    return Object.assign(n, { xd: this.xd, cookieJar: this.cookieJar }, this.opts), new Xn(this.uri(), n);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(n, i) {
    const o = this.request({
      method: "POST",
      data: n
    });
    o.on("success", i), o.on("error", (s, c) => {
      this.onError("xhr post error", s, c);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const n = this.request();
    n.on("data", this.onData.bind(this)), n.on("error", (i, o) => {
      this.onError("xhr poll error", i, o);
    }), this.pollXhr = n;
  }
}
class Xn extends wt {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(n, i) {
    super(), Cu(this, i), this.opts = i, this.method = i.method || "GET", this.uri = n, this.data = i.data !== void 0 ? i.data : null, this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  create() {
    var n;
    const i = Q1(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    i.xdomain = !!this.opts.xd;
    const o = this.xhr = new eb(i);
    try {
      o.open(this.method, this.uri, !0);
      try {
        if (this.opts.extraHeaders) {
          o.setDisableHeaderCheck && o.setDisableHeaderCheck(!0);
          for (let s in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(s) && o.setRequestHeader(s, this.opts.extraHeaders[s]);
        }
      } catch {
      }
      if (this.method === "POST")
        try {
          o.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        o.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (n = this.opts.cookieJar) === null || n === void 0 || n.addCookies(o), "withCredentials" in o && (o.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (o.timeout = this.opts.requestTimeout), o.onreadystatechange = () => {
        var s;
        o.readyState === 3 && ((s = this.opts.cookieJar) === null || s === void 0 || s.parseCookies(o)), o.readyState === 4 && (o.status === 200 || o.status === 1223 ? this.onLoad() : this.setTimeoutFn(() => {
          this.onError(typeof o.status == "number" ? o.status : 0);
        }, 0));
      }, o.send(this.data);
    } catch (s) {
      this.setTimeoutFn(() => {
        this.onError(s);
      }, 0);
      return;
    }
    typeof document < "u" && (this.index = Xn.requestsCount++, Xn.requests[this.index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  onError(n) {
    this.emitReserved("error", n, this.xhr), this.cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  cleanup(n) {
    if (!(typeof this.xhr > "u" || this.xhr === null)) {
      if (this.xhr.onreadystatechange = f4, n)
        try {
          this.xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Xn.requests[this.index], this.xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  onLoad() {
    const n = this.xhr.responseText;
    n !== null && (this.emitReserved("data", n), this.emitReserved("success"), this.cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this.cleanup();
  }
}
Xn.requestsCount = 0;
Xn.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", cy);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in Cn ? "pagehide" : "unload";
    addEventListener(e, cy, !1);
  }
}
function cy() {
  for (let e in Xn.requests)
    Xn.requests.hasOwnProperty(e) && Xn.requests[e].abort();
}
const g0 = typeof Promise == "function" && typeof Promise.resolve == "function" ? (n) => Promise.resolve().then(n) : (n, i) => i(n, 0), uc = Cn.WebSocket || Cn.MozWebSocket, uy = !0, v4 = "arraybuffer", fy = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class g4 extends v0 {
  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(n) {
    super(n), this.supportsBinary = !n.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check())
      return;
    const n = this.uri(), i = this.opts.protocols, o = fy ? {} : Q1(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (o.headers = this.opts.extraHeaders);
    try {
      this.ws = uy && !fy ? i ? new uc(n, i) : new uc(n) : new uc(n, i, o);
    } catch (s) {
      return this.emitReserved("error", s);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (n) => this.onClose({
      description: "websocket connection closed",
      context: n
    }), this.ws.onmessage = (n) => this.onData(n.data), this.ws.onerror = (n) => this.onError("websocket error", n);
  }
  write(n) {
    this.writable = !1;
    for (let i = 0; i < n.length; i++) {
      const o = n[i], s = i === n.length - 1;
      d0(o, this.supportsBinary, (c) => {
        const f = {};
        try {
          uy && this.ws.send(c);
        } catch {
        }
        s && g0(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const n = this.opts.secure ? "wss" : "ws", i = this.query || {};
    return this.opts.timestampRequests && (i[this.opts.timestampParam] = W1()), this.supportsBinary || (i.b64 = 1), this.createUri(n, i);
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  check() {
    return !!uc;
  }
}
class p4 extends v0 {
  get name() {
    return "webtransport";
  }
  doOpen() {
    typeof WebTransport == "function" && (this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]), this.transport.closed.then(() => {
      this.onClose();
    }).catch((n) => {
      this.onError("webtransport error", n);
    }), this.transport.ready.then(() => {
      this.transport.createBidirectionalStream().then((n) => {
        const i = J_(Number.MAX_SAFE_INTEGER, this.socket.binaryType), o = n.readable.pipeThrough(i).getReader(), s = W_();
        s.readable.pipeTo(n.writable), this.writer = s.writable.getWriter();
        const c = () => {
          o.read().then(({ done: d, value: v }) => {
            d || (this.onPacket(v), c());
          }).catch((d) => {
          });
        };
        c();
        const f = { type: "open" };
        this.query.sid && (f.data = `{"sid":"${this.query.sid}"}`), this.writer.write(f).then(() => this.onOpen());
      });
    }));
  }
  write(n) {
    this.writable = !1;
    for (let i = 0; i < n.length; i++) {
      const o = n[i], s = i === n.length - 1;
      this.writer.write(o).then(() => {
        s && g0(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var n;
    (n = this.transport) === null || n === void 0 || n.close();
  }
}
const m4 = {
  websocket: g4,
  webtransport: p4,
  polling: h4
}, y4 = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, b4 = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function Rh(e) {
  if (e.length > 2e3)
    throw "URI too long";
  const n = e, i = e.indexOf("["), o = e.indexOf("]");
  i != -1 && o != -1 && (e = e.substring(0, i) + e.substring(i, o).replace(/:/g, ";") + e.substring(o, e.length));
  let s = y4.exec(e || ""), c = {}, f = 14;
  for (; f--; )
    c[b4[f]] = s[f] || "";
  return i != -1 && o != -1 && (c.source = n, c.host = c.host.substring(1, c.host.length - 1).replace(/;/g, ":"), c.authority = c.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), c.ipv6uri = !0), c.pathNames = w4(c, c.path), c.queryKey = _4(c, c.query), c;
}
function w4(e, n) {
  const i = /\/{2,9}/g, o = n.replace(i, "/").split("/");
  return (n.slice(0, 1) == "/" || n.length === 0) && o.splice(0, 1), n.slice(-1) == "/" && o.splice(o.length - 1, 1), o;
}
function _4(e, n) {
  const i = {};
  return n.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(o, s, c) {
    s && (i[s] = c);
  }), i;
}
let tb = class Ba extends wt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(n, i = {}) {
    super(), this.binaryType = v4, this.writeBuffer = [], n && typeof n == "object" && (i = n, n = null), n ? (n = Rh(n), i.hostname = n.host, i.secure = n.protocol === "https" || n.protocol === "wss", i.port = n.port, n.query && (i.query = n.query)) : i.host && (i.hostname = Rh(i.host).host), Cu(this, i), this.secure = i.secure != null ? i.secure : typeof location < "u" && location.protocol === "https:", i.hostname && !i.port && (i.port = this.secure ? "443" : "80"), this.hostname = i.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = i.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = i.transports || [
      "polling",
      "websocket",
      "webtransport"
    ], this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, i), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = l4(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, typeof addEventListener == "function" && (this.opts.closeOnBeforeunload && (this.beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this.beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this.offlineEventListener = () => {
      this.onClose("transport close", {
        description: "network connection lost"
      });
    }, addEventListener("offline", this.offlineEventListener, !1))), this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(n) {
    const i = Object.assign({}, this.opts.query);
    i.EIO = X1, i.transport = n, this.id && (i.sid = this.id);
    const o = Object.assign({}, this.opts, {
      query: i,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[n]);
    return new m4[n](o);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  open() {
    let n;
    if (this.opts.rememberUpgrade && Ba.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
      n = "websocket";
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else
      n = this.transports[0];
    this.readyState = "opening";
    try {
      n = this.createTransport(n);
    } catch {
      this.transports.shift(), this.open();
      return;
    }
    n.open(), this.setTransport(n);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(n) {
    this.transport && this.transport.removeAllListeners(), this.transport = n, n.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (i) => this.onClose("transport close", i));
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  probe(n) {
    let i = this.createTransport(n), o = !1;
    Ba.priorWebsocketSuccess = !1;
    const s = () => {
      o || (i.send([{ type: "ping", data: "probe" }]), i.once("packet", (m) => {
        if (!o)
          if (m.type === "pong" && m.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", i), !i)
              return;
            Ba.priorWebsocketSuccess = i.name === "websocket", this.transport.pause(() => {
              o || this.readyState !== "closed" && (p(), this.setTransport(i), i.send([{ type: "upgrade" }]), this.emitReserved("upgrade", i), i = null, this.upgrading = !1, this.flush());
            });
          } else {
            const _ = new Error("probe error");
            _.transport = i.name, this.emitReserved("upgradeError", _);
          }
      }));
    };
    function c() {
      o || (o = !0, p(), i.close(), i = null);
    }
    const f = (m) => {
      const _ = new Error("probe error: " + m);
      _.transport = i.name, c(), this.emitReserved("upgradeError", _);
    };
    function d() {
      f("transport closed");
    }
    function v() {
      f("socket closed");
    }
    function g(m) {
      i && m.name !== i.name && c();
    }
    const p = () => {
      i.removeListener("open", s), i.removeListener("error", f), i.removeListener("close", d), this.off("close", v), this.off("upgrading", g);
    };
    i.once("open", s), i.once("error", f), i.once("close", d), this.once("close", v), this.once("upgrading", g), this.upgrades.indexOf("webtransport") !== -1 && n !== "webtransport" ? this.setTimeoutFn(() => {
      o || i.open();
    }, 200) : i.open();
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    if (this.readyState = "open", Ba.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush(), this.readyState === "open" && this.opts.upgrade) {
      let n = 0;
      const i = this.upgrades.length;
      for (; n < i; n++)
        this.probe(this.upgrades[n]);
    }
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  onPacket(n) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", n), this.emitReserved("heartbeat"), this.resetPingTimeout(), n.type) {
        case "open":
          this.onHandshake(JSON.parse(n.data));
          break;
        case "ping":
          this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
          break;
        case "error":
          const i = new Error("server error");
          i.code = n.data, this.onError(i);
          break;
        case "message":
          this.emitReserved("data", n.data), this.emitReserved("message", n.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(n) {
    this.emitReserved("handshake", n), this.id = n.sid, this.transport.query.sid = n.sid, this.upgrades = this.filterUpgrades(n.upgrades), this.pingInterval = n.pingInterval, this.pingTimeout = n.pingTimeout, this.maxPayload = n.maxPayload, this.onOpen(), this.readyState !== "closed" && this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const n = this.getWritablePackets();
      this.transport.send(n), this.prevBufferLen = n.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  getWritablePackets() {
    if (!(this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let i = 1;
    for (let o = 0; o < this.writeBuffer.length; o++) {
      const s = this.writeBuffer[o].data;
      if (s && (i += i4(s)), o > 0 && i > this.maxPayload)
        return this.writeBuffer.slice(0, o);
      i += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(n, i, o) {
    return this.sendPacket("message", n, i, o), this;
  }
  send(n, i, o) {
    return this.sendPacket("message", n, i, o), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  sendPacket(n, i, o, s) {
    if (typeof i == "function" && (s = i, i = void 0), typeof o == "function" && (s = o, o = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    o = o || {}, o.compress = o.compress !== !1;
    const c = {
      type: n,
      data: i,
      options: o
    };
    this.emitReserved("packetCreate", c), this.writeBuffer.push(c), s && this.once("flush", s), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const n = () => {
      this.onClose("forced close"), this.transport.close();
    }, i = () => {
      this.off("upgrade", i), this.off("upgradeError", i), n();
    }, o = () => {
      this.once("upgrade", i), this.once("upgradeError", i);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? o() : n();
    }) : this.upgrading ? o() : n()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  onError(n) {
    Ba.priorWebsocketSuccess = !1, this.emitReserved("error", n), this.onClose("transport error", n);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  onClose(n, i) {
    (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") && (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), typeof removeEventListener == "function" && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1), removeEventListener("offline", this.offlineEventListener, !1)), this.readyState = "closed", this.id = null, this.emitReserved("close", n, i), this.writeBuffer = [], this.prevBufferLen = 0);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  filterUpgrades(n) {
    const i = [];
    let o = 0;
    const s = n.length;
    for (; o < s; o++)
      ~this.transports.indexOf(n[o]) && i.push(n[o]);
    return i;
  }
};
tb.protocol = X1;
function x4(e, n = "", i) {
  let o = e;
  i = i || typeof location < "u" && location, e == null && (e = i.protocol + "//" + i.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = i.protocol + e : e = i.host + e), /^(https?|wss?):\/\//.test(e) || (typeof i < "u" ? e = i.protocol + "//" + e : e = "https://" + e), o = Rh(e)), o.port || (/^(http|ws)$/.test(o.protocol) ? o.port = "80" : /^(http|ws)s$/.test(o.protocol) && (o.port = "443")), o.path = o.path || "/";
  const c = o.host.indexOf(":") !== -1 ? "[" + o.host + "]" : o.host;
  return o.id = o.protocol + "://" + c + ":" + o.port + n, o.href = o.protocol + "://" + c + (i && i.port === o.port ? "" : ":" + o.port), o;
}
const S4 = typeof ArrayBuffer == "function", C4 = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, nb = Object.prototype.toString, k4 = typeof Blob == "function" || typeof Blob < "u" && nb.call(Blob) === "[object BlobConstructor]", A4 = typeof File == "function" || typeof File < "u" && nb.call(File) === "[object FileConstructor]";
function p0(e) {
  return S4 && (e instanceof ArrayBuffer || C4(e)) || k4 && e instanceof Blob || A4 && e instanceof File;
}
function mc(e, n) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let i = 0, o = e.length; i < o; i++)
      if (mc(e[i]))
        return !0;
    return !1;
  }
  if (p0(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return mc(e.toJSON(), !0);
  for (const i in e)
    if (Object.prototype.hasOwnProperty.call(e, i) && mc(e[i]))
      return !0;
  return !1;
}
function E4(e) {
  const n = [], i = e.data, o = e;
  return o.data = Lh(i, n), o.attachments = n.length, { packet: o, buffers: n };
}
function Lh(e, n) {
  if (!e)
    return e;
  if (p0(e)) {
    const i = { _placeholder: !0, num: n.length };
    return n.push(e), i;
  } else if (Array.isArray(e)) {
    const i = new Array(e.length);
    for (let o = 0; o < e.length; o++)
      i[o] = Lh(e[o], n);
    return i;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const i = {};
    for (const o in e)
      Object.prototype.hasOwnProperty.call(e, o) && (i[o] = Lh(e[o], n));
    return i;
  }
  return e;
}
function T4(e, n) {
  return e.data = Uh(e.data, n), delete e.attachments, e;
}
function Uh(e, n) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < n.length)
      return n[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let i = 0; i < e.length; i++)
      e[i] = Uh(e[i], n);
  else if (typeof e == "object")
    for (const i in e)
      Object.prototype.hasOwnProperty.call(e, i) && (e[i] = Uh(e[i], n));
  return e;
}
const N4 = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], O4 = 5;
var Be;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(Be || (Be = {}));
class z4 {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(n) {
    this.replacer = n;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(n) {
    return (n.type === Be.EVENT || n.type === Be.ACK) && mc(n) ? this.encodeAsBinary({
      type: n.type === Be.EVENT ? Be.BINARY_EVENT : Be.BINARY_ACK,
      nsp: n.nsp,
      data: n.data,
      id: n.id
    }) : [this.encodeAsString(n)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(n) {
    let i = "" + n.type;
    return (n.type === Be.BINARY_EVENT || n.type === Be.BINARY_ACK) && (i += n.attachments + "-"), n.nsp && n.nsp !== "/" && (i += n.nsp + ","), n.id != null && (i += n.id), n.data != null && (i += JSON.stringify(n.data, this.replacer)), i;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(n) {
    const i = E4(n), o = this.encodeAsString(i.packet), s = i.buffers;
    return s.unshift(o), s;
  }
}
function dy(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class m0 extends wt {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(n) {
    super(), this.reviver = n;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(n) {
    let i;
    if (typeof n == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      i = this.decodeString(n);
      const o = i.type === Be.BINARY_EVENT;
      o || i.type === Be.BINARY_ACK ? (i.type = o ? Be.EVENT : Be.ACK, this.reconstructor = new M4(i), i.attachments === 0 && super.emitReserved("decoded", i)) : super.emitReserved("decoded", i);
    } else if (p0(n) || n.base64)
      if (this.reconstructor)
        i = this.reconstructor.takeBinaryData(n), i && (this.reconstructor = null, super.emitReserved("decoded", i));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + n);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(n) {
    let i = 0;
    const o = {
      type: Number(n.charAt(0))
    };
    if (Be[o.type] === void 0)
      throw new Error("unknown packet type " + o.type);
    if (o.type === Be.BINARY_EVENT || o.type === Be.BINARY_ACK) {
      const c = i + 1;
      for (; n.charAt(++i) !== "-" && i != n.length; )
        ;
      const f = n.substring(c, i);
      if (f != Number(f) || n.charAt(i) !== "-")
        throw new Error("Illegal attachments");
      o.attachments = Number(f);
    }
    if (n.charAt(i + 1) === "/") {
      const c = i + 1;
      for (; ++i && !(n.charAt(i) === "," || i === n.length); )
        ;
      o.nsp = n.substring(c, i);
    } else
      o.nsp = "/";
    const s = n.charAt(i + 1);
    if (s !== "" && Number(s) == s) {
      const c = i + 1;
      for (; ++i; ) {
        const f = n.charAt(i);
        if (f == null || Number(f) != f) {
          --i;
          break;
        }
        if (i === n.length)
          break;
      }
      o.id = Number(n.substring(c, i + 1));
    }
    if (n.charAt(++i)) {
      const c = this.tryParse(n.substr(i));
      if (m0.isPayloadValid(o.type, c))
        o.data = c;
      else
        throw new Error("invalid payload");
    }
    return o;
  }
  tryParse(n) {
    try {
      return JSON.parse(n, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(n, i) {
    switch (n) {
      case Be.CONNECT:
        return dy(i);
      case Be.DISCONNECT:
        return i === void 0;
      case Be.CONNECT_ERROR:
        return typeof i == "string" || dy(i);
      case Be.EVENT:
      case Be.BINARY_EVENT:
        return Array.isArray(i) && (typeof i[0] == "number" || typeof i[0] == "string" && N4.indexOf(i[0]) === -1);
      case Be.ACK:
      case Be.BINARY_ACK:
        return Array.isArray(i);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class M4 {
  constructor(n) {
    this.packet = n, this.buffers = [], this.reconPack = n;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(n) {
    if (this.buffers.push(n), this.buffers.length === this.reconPack.attachments) {
      const i = T4(this.reconPack, this.buffers);
      return this.finishedReconstruction(), i;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
const D4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: m0,
  Encoder: z4,
  get PacketType() {
    return Be;
  },
  protocol: O4
}, Symbol.toStringTag, { value: "Module" }));
function zn(e, n, i) {
  return e.on(n, i), function() {
    e.off(n, i);
  };
}
const R4 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
let rb = class extends wt {
  /**
   * `Socket` constructor.
   */
  constructor(n, i, o) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = n, this.nsp = i, o && o.auth && (this.auth = o.auth), this._opts = Object.assign({}, o), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const n = this.io;
    this.subs = [
      zn(n, "open", this.onopen.bind(this)),
      zn(n, "packet", this.onpacket.bind(this)),
      zn(n, "error", this.onerror.bind(this)),
      zn(n, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...n) {
    return n.unshift("message"), this.emit.apply(this, n), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(n, ...i) {
    if (R4.hasOwnProperty(n))
      throw new Error('"' + n.toString() + '" is a reserved event name');
    if (i.unshift(n), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(i), this;
    const o = {
      type: Be.EVENT,
      data: i
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof i[i.length - 1] == "function") {
      const f = this.ids++, d = i.pop();
      this._registerAckCallback(f, d), o.id = f;
    }
    const s = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    return this.flags.volatile && (!s || !this.connected) || (this.connected ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(n, i) {
    var o;
    const s = (o = this.flags.timeout) !== null && o !== void 0 ? o : this._opts.ackTimeout;
    if (s === void 0) {
      this.acks[n] = i;
      return;
    }
    const c = this.io.setTimeoutFn(() => {
      delete this.acks[n];
      for (let f = 0; f < this.sendBuffer.length; f++)
        this.sendBuffer[f].id === n && this.sendBuffer.splice(f, 1);
      i.call(this, new Error("operation has timed out"));
    }, s);
    this.acks[n] = (...f) => {
      this.io.clearTimeoutFn(c), i.apply(this, [null, ...f]);
    };
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(n, ...i) {
    const o = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
    return new Promise((s, c) => {
      i.push((f, d) => o ? f ? c(f) : s(d) : s(f)), this.emit(n, ...i);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(n) {
    let i;
    typeof n[n.length - 1] == "function" && (i = n.pop());
    const o = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: n,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    n.push((s, ...c) => o !== this._queue[0] ? void 0 : (s !== null ? o.tryCount > this._opts.retries && (this._queue.shift(), i && i(s)) : (this._queue.shift(), i && i(null, ...c)), o.pending = !1, this._drainQueue())), this._queue.push(o), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(n = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const i = this._queue[0];
    i.pending && !n || (i.pending = !0, i.tryCount++, this.flags = i.flags, this.emit.apply(this, i.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(n) {
    n.nsp = this.nsp, this.io._packet(n);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((n) => {
      this._sendConnectPacket(n);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(n) {
    this.packet({
      type: Be.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, n) : n
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(n) {
    this.connected || this.emitReserved("connect_error", n);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(n, i) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", n, i);
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(n) {
    if (n.nsp === this.nsp)
      switch (n.type) {
        case Be.CONNECT:
          n.data && n.data.sid ? this.onconnect(n.data.sid, n.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case Be.EVENT:
        case Be.BINARY_EVENT:
          this.onevent(n);
          break;
        case Be.ACK:
        case Be.BINARY_ACK:
          this.onack(n);
          break;
        case Be.DISCONNECT:
          this.ondisconnect();
          break;
        case Be.CONNECT_ERROR:
          this.destroy();
          const o = new Error(n.data.message);
          o.data = n.data.data, this.emitReserved("connect_error", o);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(n) {
    const i = n.data || [];
    n.id != null && i.push(this.ack(n.id)), this.connected ? this.emitEvent(i) : this.receiveBuffer.push(Object.freeze(i));
  }
  emitEvent(n) {
    if (this._anyListeners && this._anyListeners.length) {
      const i = this._anyListeners.slice();
      for (const o of i)
        o.apply(this, n);
    }
    super.emit.apply(this, n), this._pid && n.length && typeof n[n.length - 1] == "string" && (this._lastOffset = n[n.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(n) {
    const i = this;
    let o = !1;
    return function(...s) {
      o || (o = !0, i.packet({
        type: Be.ACK,
        id: n,
        data: s
      }));
    };
  }
  /**
   * Called upon a server acknowlegement.
   *
   * @param packet
   * @private
   */
  onack(n) {
    const i = this.acks[n.id];
    typeof i == "function" && (i.apply(this, n.data), delete this.acks[n.id]);
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(n, i) {
    this.id = n, this.recovered = i && this._pid === i, this._pid = i, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((n) => this.emitEvent(n)), this.receiveBuffer = [], this.sendBuffer.forEach((n) => {
      this.notifyOutgoingListeners(n), this.packet(n);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((n) => n()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: Be.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(n) {
    return this.flags.compress = n, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(n) {
    return this.flags.timeout = n, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(n) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(n), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(n) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(n), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(n) {
    if (!this._anyListeners)
      return this;
    if (n) {
      const i = this._anyListeners;
      for (let o = 0; o < i.length; o++)
        if (n === i[o])
          return i.splice(o, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(n) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(n), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(n) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(n), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(n) {
    if (!this._anyOutgoingListeners)
      return this;
    if (n) {
      const i = this._anyOutgoingListeners;
      for (let o = 0; o < i.length; o++)
        if (n === i[o])
          return i.splice(o, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(n) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const i = this._anyOutgoingListeners.slice();
      for (const o of i)
        o.apply(this, n.data);
    }
  }
};
function ao(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
ao.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var n = Math.random(), i = Math.floor(n * this.jitter * e);
    e = (Math.floor(n * 10) & 1) == 0 ? e - i : e + i;
  }
  return Math.min(e, this.max) | 0;
};
ao.prototype.reset = function() {
  this.attempts = 0;
};
ao.prototype.setMin = function(e) {
  this.ms = e;
};
ao.prototype.setMax = function(e) {
  this.max = e;
};
ao.prototype.setJitter = function(e) {
  this.jitter = e;
};
class Hh extends wt {
  constructor(n, i) {
    var o;
    super(), this.nsps = {}, this.subs = [], n && typeof n == "object" && (i = n, n = void 0), i = i || {}, i.path = i.path || "/socket.io", this.opts = i, Cu(this, i), this.reconnection(i.reconnection !== !1), this.reconnectionAttempts(i.reconnectionAttempts || 1 / 0), this.reconnectionDelay(i.reconnectionDelay || 1e3), this.reconnectionDelayMax(i.reconnectionDelayMax || 5e3), this.randomizationFactor((o = i.randomizationFactor) !== null && o !== void 0 ? o : 0.5), this.backoff = new ao({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(i.timeout == null ? 2e4 : i.timeout), this._readyState = "closed", this.uri = n;
    const s = i.parser || D4;
    this.encoder = new s.Encoder(), this.decoder = new s.Decoder(), this._autoConnect = i.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(n) {
    return arguments.length ? (this._reconnection = !!n, this) : this._reconnection;
  }
  reconnectionAttempts(n) {
    return n === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = n, this);
  }
  reconnectionDelay(n) {
    var i;
    return n === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = n, (i = this.backoff) === null || i === void 0 || i.setMin(n), this);
  }
  randomizationFactor(n) {
    var i;
    return n === void 0 ? this._randomizationFactor : (this._randomizationFactor = n, (i = this.backoff) === null || i === void 0 || i.setJitter(n), this);
  }
  reconnectionDelayMax(n) {
    var i;
    return n === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = n, (i = this.backoff) === null || i === void 0 || i.setMax(n), this);
  }
  timeout(n) {
    return arguments.length ? (this._timeout = n, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(n) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new tb(this.uri, this.opts);
    const i = this.engine, o = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const s = zn(i, "open", function() {
      o.onopen(), n && n();
    }), c = (d) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", d), n ? n(d) : this.maybeReconnectOnOpen();
    }, f = zn(i, "error", c);
    if (this._timeout !== !1) {
      const d = this._timeout, v = this.setTimeoutFn(() => {
        s(), c(new Error("timeout")), i.close();
      }, d);
      this.opts.autoUnref && v.unref(), this.subs.push(() => {
        this.clearTimeoutFn(v);
      });
    }
    return this.subs.push(s), this.subs.push(f), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(n) {
    return this.open(n);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const n = this.engine;
    this.subs.push(zn(n, "ping", this.onping.bind(this)), zn(n, "data", this.ondata.bind(this)), zn(n, "error", this.onerror.bind(this)), zn(n, "close", this.onclose.bind(this)), zn(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(n) {
    try {
      this.decoder.add(n);
    } catch (i) {
      this.onclose("parse error", i);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(n) {
    g0(() => {
      this.emitReserved("packet", n);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(n) {
    this.emitReserved("error", n);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(n, i) {
    let o = this.nsps[n];
    return o ? this._autoConnect && !o.active && o.connect() : (o = new rb(this, n, i), this.nsps[n] = o), o;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(n) {
    const i = Object.keys(this.nsps);
    for (const o of i)
      if (this.nsps[o].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(n) {
    const i = this.encoder.encode(n);
    for (let o = 0; o < i.length; o++)
      this.engine.write(i[o], n.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((n) => n()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */
  onclose(n, i) {
    this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", n, i), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const n = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const i = this.backoff.duration();
      this._reconnecting = !0;
      const o = this.setTimeoutFn(() => {
        n.skipReconnect || (this.emitReserved("reconnect_attempt", n.backoff.attempts), !n.skipReconnect && n.open((s) => {
          s ? (n._reconnecting = !1, n.reconnect(), this.emitReserved("reconnect_error", s)) : n.onreconnect();
        }));
      }, i);
      this.opts.autoUnref && o.unref(), this.subs.push(() => {
        this.clearTimeoutFn(o);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const n = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", n);
  }
}
const fl = {};
function yc(e, n) {
  typeof e == "object" && (n = e, e = void 0), n = n || {};
  const i = x4(e, n.path || "/socket.io"), o = i.source, s = i.id, c = i.path, f = fl[s] && c in fl[s].nsps, d = n.forceNew || n["force new connection"] || n.multiplex === !1 || f;
  let v;
  return d ? v = new Hh(o, n) : (fl[s] || (fl[s] = new Hh(o, n)), v = fl[s]), i.query && !n.query && (n.query = i.queryKey), v.socket(i.path, n);
}
Object.assign(yc, {
  Manager: Hh,
  Socket: rb,
  io: yc,
  connect: yc
});
var ib = (e, n) => e === n ? !0 : !e || !n || e.length !== n.length ? !1 : e.every((i, o) => i === n[o]), ab = (e, n) => ib(e, n) || !e && n?.length === 0 || e?.length === 0 && !n, L4 = (e, n) => {
  const i = Array.isArray(e) ? e : e ? [e] : [], o = Array.isArray(n) ? n : n ? [n] : [];
  return ib(i, o);
}, ob = (e, n) => {
  if (!e && !n)
    return !0;
  if (!e || !n)
    return !1;
  try {
    return JSON.stringify(e) === JSON.stringify(n);
  } catch {
    return !1;
  }
}, Gc = (e, n) => ob(e.data, n.data) && ab(e.tags, n.tags) && e.read === n.read && e.archived === n.archived && e.snoozed === n.snoozed && e.seen === n.seen && L4(e.severity, n.severity);
function U4(e, n) {
  return !n || Object.keys(n).length === 0 ? !0 : e ? Object.entries(n).every(([i, o]) => {
    const s = e[i];
    if (s === void 0 && o !== void 0)
      return !1;
    if (Array.isArray(o))
      if (Array.isArray(s)) {
        if (o.length !== s.length) return !1;
        const c = [...o].sort(), f = [...s].sort();
        return c.every((d, v) => d === f[v]);
      } else
        return o.includes(s);
    else
      return s === o;
  }) : !1;
}
function H4(e, n) {
  return !n || n.length === 0 ? !0 : !e || e.length === 0 ? !1 : n.some((i) => e.includes(i));
}
var lb = "v1", B4 = "@novu/js@3.10.1", V4 = class {
  constructor(e = {}) {
    this.DEFAULT_BACKEND_URL = typeof window < "u" && window.NOVU_LOCAL_BACKEND_URL || "https://api.novu.co";
    const {
      apiVersion: n = lb,
      apiUrl: i = this.DEFAULT_BACKEND_URL,
      userAgent: o = B4,
      headers: s = {}
    } = e || {};
    this.apiVersion = n, this.apiUrl = `${i}/${n}`, this.headers = re({
      "Novu-API-Version": "2024-06-26",
      "Content-Type": "application/json",
      "User-Agent": o
    }, s);
  }
  setAuthorizationToken(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  setKeylessHeader(e) {
    var n;
    const i = e || typeof window < "u" && ((n = window.localStorage) == null ? void 0 : n.getItem("novu_keyless_application_identifier"));
    !i || !i.startsWith("pk_keyless_") || (this.headers["Novu-Application-Identifier"] = i);
  }
  setHeaders(e) {
    this.headers = re(re({}, this.headers), e);
  }
  get(e, n, i = !0) {
    return P(this, null, function* () {
      return this.doFetch({
        path: e,
        searchParams: n,
        options: {
          method: "GET"
        },
        unwrapEnvelope: i
      });
    });
  }
  post(e, n, i) {
    return P(this, null, function* () {
      return this.doFetch({
        path: e,
        options: {
          method: "POST",
          body: n,
          headers: i?.headers
        }
      });
    });
  }
  patch(e, n) {
    return P(this, null, function* () {
      return this.doFetch({
        path: e,
        options: {
          method: "PATCH",
          body: n
        }
      });
    });
  }
  delete(e, n) {
    return P(this, null, function* () {
      return this.doFetch({
        path: e,
        options: {
          method: "DELETE",
          body: n
        }
      });
    });
  }
  doFetch(e) {
    return P(this, arguments, function* ({
      path: n,
      searchParams: i,
      options: o,
      unwrapEnvelope: s = !0
    }) {
      const c = j4(this.apiUrl, n, i ? `?${i.toString()}` : ""), f = {
        method: o?.method || "GET",
        headers: re(re({}, this.headers), o?.headers || {}),
        body: o?.body ? JSON.stringify(o.body) : void 0
      }, d = yield fetch(c, f);
      if (!d.ok) {
        const g = yield d.json();
        throw new Error(`${this.headers["User-Agent"]} error. Status: ${d.status}, Message: ${g.message}`);
      }
      if (d.status === 204)
        return;
      const v = yield d.json();
      return s ? v.data : v;
    });
  }
};
function j4(...e) {
  return e.reduce((n, i) => (i && n.push(i.replace(new RegExp("(?<!https?:)\\/+", "g"), "/").replace(/^\/+|\/+$/g, "")), n), []).join("/").replace(/\/\?/, "?");
}
var Mi = "/inbox", $t = `${Mi}/notifications`, Fe, $4 = class {
  constructor(e = {}) {
    this.isSessionInitialized = !1, ce(this, Fe), de(this, Fe, new V4(e));
  }
  initializeSession(e) {
    return P(this, arguments, function* ({
      applicationIdentifier: n,
      subscriberHash: i,
      subscriber: o,
      defaultSchedule: s
    }) {
      const c = yield N(this, Fe).post(`${Mi}/session`, {
        applicationIdentifier: n,
        subscriberHash: i,
        subscriber: o,
        defaultSchedule: s
      });
      return N(this, Fe).setAuthorizationToken(c.token), N(this, Fe).setKeylessHeader(c.applicationIdentifier), this.isSessionInitialized = !0, c;
    });
  }
  fetchNotifications({
    after: e,
    archived: n,
    limit: i = 10,
    offset: o,
    read: s,
    tags: c,
    snoozed: f,
    seen: d,
    data: v,
    severity: g
  }) {
    const p = new URLSearchParams(`limit=${i}`);
    if (e && p.append("after", e), o && p.append("offset", `${o}`), c)
      for (const m of c)
        p.append("tags[]", m);
    if (s !== void 0 && p.append("read", `${s}`), n !== void 0 && p.append("archived", `${n}`), f !== void 0 && p.append("snoozed", `${f}`), d !== void 0 && p.append("seen", `${d}`), v !== void 0 && p.append("data", JSON.stringify(v)), g && Array.isArray(g))
      for (const m of g)
        p.append("severity[]", m);
    else g && p.append("severity", g);
    return N(this, Fe).get($t, p, !1);
  }
  count({
    filters: e
  }) {
    return N(this, Fe).get(
      `${$t}/count`,
      new URLSearchParams({
        filters: JSON.stringify(e)
      }),
      !1
    );
  }
  read(e) {
    return N(this, Fe).patch(`${$t}/${e}/read`);
  }
  unread(e) {
    return N(this, Fe).patch(`${$t}/${e}/unread`);
  }
  archive(e) {
    return N(this, Fe).patch(`${$t}/${e}/archive`);
  }
  unarchive(e) {
    return N(this, Fe).patch(`${$t}/${e}/unarchive`);
  }
  snooze(e, n) {
    return N(this, Fe).patch(`${$t}/${e}/snooze`, { snoozeUntil: n });
  }
  unsnooze(e) {
    return N(this, Fe).patch(`${$t}/${e}/unsnooze`);
  }
  readAll({ tags: e, data: n }) {
    return N(this, Fe).post(`${$t}/read`, {
      tags: e,
      data: n ? JSON.stringify(n) : void 0
    });
  }
  archiveAll({ tags: e, data: n }) {
    return N(this, Fe).post(`${$t}/archive`, {
      tags: e,
      data: n ? JSON.stringify(n) : void 0
    });
  }
  archiveAllRead({ tags: e, data: n }) {
    return N(this, Fe).post(`${$t}/read-archive`, {
      tags: e,
      data: n ? JSON.stringify(n) : void 0
    });
  }
  delete(e) {
    return N(this, Fe).delete(`${$t}/${e}/delete`);
  }
  deleteAll({ tags: e, data: n }) {
    return N(this, Fe).post(`${$t}/delete`, {
      tags: e,
      data: n ? JSON.stringify(n) : void 0
    });
  }
  markAsSeen({
    notificationIds: e,
    tags: n,
    data: i
  }) {
    return N(this, Fe).post(`${$t}/seen`, {
      notificationIds: e,
      tags: n,
      data: i ? JSON.stringify(i) : void 0
    });
  }
  seen(e) {
    return this.markAsSeen({ notificationIds: [e] });
  }
  completeAction({
    actionType: e,
    notificationId: n
  }) {
    return N(this, Fe).patch(`${$t}/${n}/complete`, {
      actionType: e
    });
  }
  revertAction({
    actionType: e,
    notificationId: n
  }) {
    return N(this, Fe).patch(`${$t}/${n}/revert`, {
      actionType: e
    });
  }
  fetchPreferences({
    tags: e,
    severity: n,
    criticality: i
  }) {
    const o = new URLSearchParams();
    if (e)
      for (const c of e)
        o.append("tags[]", c);
    if (n && Array.isArray(n))
      for (const c of n)
        o.append("severity[]", c);
    else n && o.append("severity", n);
    i && o.append("criticality", i);
    const s = o.size ? `?${o.toString()}` : "";
    return N(this, Fe).get(`${Mi}/preferences${s}`);
  }
  bulkUpdatePreferences(e) {
    return N(this, Fe).patch(`${Mi}/preferences/bulk`, { preferences: e });
  }
  updateGlobalPreferences(e) {
    return N(this, Fe).patch(`${Mi}/preferences`, e);
  }
  updateWorkflowPreferences({
    workflowId: e,
    channels: n
  }) {
    return N(this, Fe).patch(`${Mi}/preferences/${e}`, n);
  }
  fetchGlobalPreferences() {
    return N(this, Fe).get(`${Mi}/preferences/global`);
  }
  triggerHelloWorldEvent() {
    const e = {
      name: "hello-world",
      to: {
        subscriberId: "keyless-subscriber-id"
      },
      payload: {
        subject: "Novu Keyless Environment",
        body: "You're using a keyless demo environment. For full access to Novu features and cloud integration, obtain your API key.",
        primaryActionText: "Obtain API Key",
        primaryActionUrl: "https://go.novu.co/keyless",
        secondaryActionText: "Explore Documentation",
        secondaryActionUrl: "https://go.novu.co/keyless-docs"
      }
    };
    return N(this, Fe).post("/inbox/events", e);
  }
};
Fe = /* @__PURE__ */ new WeakMap();
var Va, K4 = class {
  constructor() {
    ce(this, Va), de(this, Va, V_());
  }
  on(e, n) {
    return N(this, Va).on(e, n), () => {
      this.off(e, n);
    };
  }
  off(e, n) {
    N(this, Va).off(e, n);
  }
  emit(e, n) {
    N(this, Va).emit(e, n);
  }
};
Va = /* @__PURE__ */ new WeakMap();
var nt = class extends Error {
  constructor(e, n) {
    super(e), this.originalError = n;
  }
}, sb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isRead: !0,
      readAt: (/* @__PURE__ */ new Date()).toISOString(),
      isArchived: !1,
      archivedAt: void 0
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.read.pending", {
      args: o,
      data: c
    });
    const f = yield i.read(s), d = new Ht(f, n, i);
    return n.emit("notification.read.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.read.resolved", { args: o, error: f }), { error: new nt("Failed to read notification", f) };
  }
}), cb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isRead: !1,
      readAt: null,
      isArchived: !1,
      archivedAt: void 0
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.unread.pending", {
      args: o,
      data: c
    });
    const f = yield i.unread(s), d = new Ht(f, n, i);
    return n.emit("notification.unread.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.unread.resolved", { args: o, error: f }), { error: new nt("Failed to unread notification", f) };
  }
}), ub = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isSeen: !0
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    if (n.emit("notification.seen.pending", {
      args: o,
      data: c
    }), yield i.seen(s), !c)
      throw new Error("Failed to create optimistic value for notification");
    const f = new Ht(c, n, i);
    return n.emit("notification.seen.resolved", { args: o, data: f }), { data: f };
  } catch (f) {
    return n.emit("notification.seen.resolved", { args: o, error: f }), { error: new nt("Failed to mark notification as seen", f) };
  }
}), fb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isArchived: !0,
      archivedAt: (/* @__PURE__ */ new Date()).toISOString(),
      isRead: !0,
      readAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.archive.pending", {
      args: o,
      data: c
    });
    const f = yield i.archive(s), d = new Ht(f, n, i);
    return n.emit("notification.archive.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.archive.resolved", { args: o, error: f }), { error: new nt("Failed to archive notification", f) };
  }
}), db = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isArchived: !1,
      archivedAt: null,
      isRead: !0,
      readAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.unarchive.pending", {
      args: o,
      data: c
    });
    const f = yield i.unarchive(s), d = new Ht(f, n, i);
    return n.emit("notification.unarchive.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.unarchive.resolved", { args: o, error: f }), { error: new nt("Failed to unarchive notification", f) };
  }
}), hb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isSnoozed: !0,
      snoozedUntil: o.snoozeUntil
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.snooze.pending", {
      args: o,
      data: c
    });
    const f = yield i.snooze(s, o.snoozeUntil), d = new Ht(f, n, i);
    return n.emit("notification.snooze.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.snooze.resolved", { args: o, error: f }), { error: new nt("Failed to snooze notification", f) };
  }
}), vb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s, optimisticValue: c } = tr(
    o,
    {
      isSnoozed: !1,
      snoozedUntil: null
    },
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    n.emit("notification.unsnooze.pending", {
      args: o,
      data: c
    });
    const f = yield i.unsnooze(s), d = new Ht(f, n, i);
    return n.emit("notification.unsnooze.resolved", { args: o, data: d }), { data: d };
  } catch (f) {
    return n.emit("notification.unsnooze.resolved", { args: o, error: f }), { error: new nt("Failed to unsnooze notification", f) };
  }
}), Pc = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o,
  actionType: s
}) {
  const c = s === "primary" ? {
    primaryAction: je(re({}, "notification" in o ? o.notification.primaryAction : {}), {
      isCompleted: !0
    })
  } : {
    secondaryAction: je(re({}, "notification" in o ? o.notification.secondaryAction : {}), {
      isCompleted: !0
    })
  }, { notificationId: f, optimisticValue: d } = tr(o, c, {
    emitter: n,
    apiService: i
  });
  try {
    n.emit("notification.complete_action.pending", {
      args: o,
      data: d
    });
    const v = yield i.completeAction({ actionType: s, notificationId: f }), g = new Ht(v, n, i);
    return n.emit("notification.complete_action.resolved", { args: o, data: g }), { data: g };
  } catch (v) {
    return n.emit("notification.complete_action.resolved", { args: o, error: v }), { error: new nt(`Failed to complete ${s} action on the notification`, v) };
  }
}), Ic = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o,
  actionType: s
}) {
  const c = s === "primary" ? {
    primaryAction: je(re({}, "notification" in o ? o.notification.primaryAction : {}), {
      isCompleted: !1
    })
  } : {
    secondaryAction: je(re({}, "notification" in o ? o.notification.secondaryAction : {}), {
      isCompleted: !1
    })
  }, { notificationId: f, optimisticValue: d } = tr(o, c, {
    emitter: n,
    apiService: i
  });
  try {
    n.emit("notification.revert_action.pending", {
      args: o,
      data: d
    });
    const v = yield i.revertAction({ actionType: s, notificationId: f }), g = new Ht(v, n, i);
    return n.emit("notification.revert_action.resolved", { args: o, data: g }), { data: g };
  } catch (v) {
    return n.emit("notification.revert_action.resolved", { args: o, error: v }), { error: new nt("Failed to fetch notifications", v) };
  }
}), tr = (e, n, i) => "notification" in e ? {
  notificationId: e.notification.id,
  optimisticValue: new Ht(
    re(re({}, e.notification), n),
    i.emitter,
    i.apiService
  )
} : {
  notificationId: e.notificationId
}, q4 = (e) => P(void 0, [e], function* ({
  emitter: n,
  inboxService: i,
  notificationsCache: o,
  tags: s,
  data: c
}) {
  try {
    const d = o.getUniqueNotifications({ tags: s, data: c }).map(
      (v) => new Ht(
        je(re({}, v), {
          isRead: !0,
          readAt: (/* @__PURE__ */ new Date()).toISOString(),
          isArchived: !1,
          archivedAt: void 0
        }),
        n,
        i
      )
    );
    return n.emit("notifications.read_all.pending", { args: { tags: s, data: c }, data: d }), yield i.readAll({ tags: s, data: c }), n.emit("notifications.read_all.resolved", { args: { tags: s, data: c }, data: d }), {};
  } catch (f) {
    return n.emit("notifications.read_all.resolved", { args: { tags: s, data: c }, error: f }), { error: new nt("Failed to read all notifications", f) };
  }
}), hy = (e) => P(void 0, [e], function* ({
  emitter: n,
  inboxService: i,
  notificationsCache: o,
  notificationIds: s,
  tags: c,
  data: f
}) {
  try {
    const d = o.getUniqueNotifications({ tags: c, data: f }), g = (s && s.length > 0 ? d.filter((p) => s.includes(p.id)) : d).map(
      (p) => new Ht(
        je(re({}, p), {
          isSeen: !0,
          firstSeenAt: p.firstSeenAt || (/* @__PURE__ */ new Date()).toISOString()
        }),
        n,
        i
      )
    );
    return n.emit("notifications.seen_all.pending", {
      args: { notificationIds: s, tags: c, data: f },
      data: g
    }), yield i.markAsSeen({ notificationIds: s, tags: c, data: f }), n.emit("notifications.seen_all.resolved", {
      args: { notificationIds: s, tags: c, data: f },
      data: g
    }), {};
  } catch (d) {
    return n.emit("notifications.seen_all.resolved", { args: { notificationIds: s, tags: c, data: f }, error: d }), { error: new nt("Failed to mark all notifications as seen", d) };
  }
}), G4 = (e) => P(void 0, [e], function* ({
  emitter: n,
  inboxService: i,
  notificationsCache: o,
  tags: s,
  data: c
}) {
  try {
    const d = o.getUniqueNotifications({ tags: s, data: c }).map(
      (v) => new Ht(
        je(re({}, v), {
          isRead: !0,
          readAt: (/* @__PURE__ */ new Date()).toISOString(),
          isArchived: !0,
          archivedAt: (/* @__PURE__ */ new Date()).toISOString()
        }),
        n,
        i
      )
    );
    return n.emit("notifications.archive_all.pending", { args: { tags: s, data: c }, data: d }), yield i.archiveAll({ tags: s, data: c }), n.emit("notifications.archive_all.resolved", { args: { tags: s, data: c }, data: d }), {};
  } catch (f) {
    return n.emit("notifications.archive_all.resolved", { args: { tags: s, data: c }, error: f }), { error: new nt("Failed to archive all notifications", f) };
  }
}), P4 = (e) => P(void 0, [e], function* ({
  emitter: n,
  inboxService: i,
  notificationsCache: o,
  tags: s,
  data: c
}) {
  try {
    const d = o.getUniqueNotifications({ tags: s, data: c, read: !0 }).map(
      (v) => new Ht(
        je(re({}, v), { isArchived: !0, archivedAt: (/* @__PURE__ */ new Date()).toISOString() }),
        n,
        i
      )
    );
    return n.emit("notifications.archive_all_read.pending", { args: { tags: s, data: c }, data: d }), yield i.archiveAllRead({ tags: s, data: c }), n.emit("notifications.archive_all_read.resolved", { args: { tags: s, data: c }, data: d }), {};
  } catch (f) {
    return n.emit("notifications.archive_all_read.resolved", { args: { tags: s, data: c }, error: f }), { error: new nt("Failed to archive all read notifications", f) };
  }
}), gb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  args: o
}) {
  const { notificationId: s } = tr(
    o,
    {},
    {
      emitter: n,
      apiService: i
    }
  );
  try {
    return n.emit("notification.delete.pending", {
      args: o
    }), yield i.delete(s), n.emit("notification.delete.resolved", { args: o }), {};
  } catch (c) {
    return n.emit("notification.delete.resolved", { args: o, error: c }), { error: new nt("Failed to delete notification", c) };
  }
}), I4 = (e) => P(void 0, [e], function* ({
  emitter: n,
  inboxService: i,
  notificationsCache: o,
  tags: s,
  data: c
}) {
  try {
    const f = o.getUniqueNotifications({ tags: s, data: c });
    return n.emit("notifications.delete_all.pending", { args: { tags: s, data: c }, data: f }), yield i.deleteAll({ tags: s, data: c }), n.emit("notifications.delete_all.resolved", { args: { tags: s, data: c } }), {};
  } catch (f) {
    return n.emit("notifications.delete_all.resolved", { args: { tags: s, data: c }, error: f }), { error: new nt("Failed to delete all notifications", f) };
  }
}), Rt, Pt, Ht = class {
  constructor(n, i, o) {
    ce(this, Rt), ce(this, Pt), de(this, Rt, i), de(this, Pt, o), this.id = n.id, this.transactionId = n.transactionId, this.subject = n.subject, this.body = n.body, this.to = n.to, this.isRead = n.isRead, this.isSeen = n.isSeen, this.isArchived = n.isArchived, this.isSnoozed = n.isSnoozed, this.snoozedUntil = n.snoozedUntil, this.deliveredAt = n.deliveredAt, this.createdAt = n.createdAt, this.readAt = n.readAt, this.firstSeenAt = n.firstSeenAt, this.archivedAt = n.archivedAt, this.avatar = n.avatar, this.primaryAction = n.primaryAction, this.secondaryAction = n.secondaryAction, this.channelType = n.channelType, this.tags = n.tags, this.redirect = n.redirect, this.data = n.data, this.workflow = n.workflow, this.severity = n.severity;
  }
  read() {
    return sb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  unread() {
    return cb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  seen() {
    return ub({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  archive() {
    return fb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  unarchive() {
    return db({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  delete() {
    return gb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      }
    });
  }
  snooze(n) {
    return hb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this,
        snoozeUntil: n
      }
    });
  }
  unsnooze() {
    return vb({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: { notification: this }
    });
  }
  completePrimary() {
    if (!this.primaryAction)
      throw new Error("Primary action is not available");
    return Pc({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      },
      actionType: "primary"
      /* PRIMARY */
    });
  }
  completeSecondary() {
    if (!this.primaryAction)
      throw new Error("Secondary action is not available");
    return Pc({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      },
      actionType: "secondary"
      /* SECONDARY */
    });
  }
  revertPrimary() {
    if (!this.primaryAction)
      throw new Error("Primary action is not available");
    return Ic({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      },
      actionType: "primary"
      /* PRIMARY */
    });
  }
  revertSecondary() {
    if (!this.primaryAction)
      throw new Error("Secondary action is not available");
    return Ic({
      emitter: N(this, Rt),
      apiService: N(this, Pt),
      args: {
        notification: this
      },
      actionType: "secondary"
      /* SECONDARY */
    });
  }
  on(n, i) {
    const o = N(this, Rt).on(n, i);
    return () => {
      o();
    };
  }
  /**
   * @deprecated
   * Use the cleanup function returned by the "on" method instead.
   */
  off(n, i) {
    N(this, Rt).off(n, i);
  }
};
Rt = /* @__PURE__ */ new WeakMap();
Pt = /* @__PURE__ */ new WeakMap();
var Di, yl, jl = class {
  constructor({
    inboxServiceInstance: e,
    eventEmitterInstance: n
  }) {
    ce(this, Di, []), ce(this, yl), this._emitter = n, this._inboxService = e, this._emitter.on("session.initialize.resolved", ({ error: i, data: o }) => {
      o ? (this.onSessionSuccess(o), N(this, Di).forEach((s) => P(this, [s], function* ({ fn: c, resolve: f }) {
        f(yield c());
      })), de(this, Di, [])) : i && (this.onSessionError(i), de(this, yl, i), N(this, Di).forEach(({ resolve: s }) => {
        s({ error: new nt("Failed to initialize session, please contact the support", i) });
      }), de(this, Di, []));
    });
  }
  onSessionSuccess(e) {
  }
  onSessionError(e) {
  }
  callWithSession(e) {
    return P(this, null, function* () {
      return this._inboxService.isSessionInitialized ? e() : N(this, yl) ? Promise.resolve({
        error: new nt("Failed to initialize session, please contact the support", N(this, yl))
      }) : new Promise((n, i) => {
        N(this, Di).push({ fn: e, resolve: n, reject: i });
      });
    });
  }
};
Di = /* @__PURE__ */ new WeakMap();
yl = /* @__PURE__ */ new WeakMap();
var Gn, y0 = class {
  constructor() {
    ce(this, Gn), de(this, Gn, /* @__PURE__ */ new Map());
  }
  get(e) {
    return N(this, Gn).get(e);
  }
  getValues() {
    return Array.from(N(this, Gn).values());
  }
  entries() {
    return Array.from(N(this, Gn).entries());
  }
  keys() {
    return Array.from(N(this, Gn).keys());
  }
  set(e, n) {
    N(this, Gn).set(e, n);
  }
  remove(e) {
    N(this, Gn).delete(e);
  }
  clear() {
    N(this, Gn).clear();
  }
};
Gn = /* @__PURE__ */ new WeakMap();
var pb = ({
  tags: e,
  data: n,
  read: i,
  archived: o,
  snoozed: s,
  seen: c,
  severity: f,
  limit: d,
  offset: v,
  after: g
}) => Object.entries({ tags: e, data: n, read: i, archived: o, snoozed: s, seen: c, severity: f, limit: d, offset: v, after: g }).filter(([p, m]) => m != null && !(Array.isArray(m) && m.length === 0)).reduce((p, [m, _]) => (p[m] = _, p), {}), sh = ({
  tags: e,
  data: n,
  read: i,
  archived: o,
  snoozed: s,
  seen: c,
  severity: f,
  limit: d,
  offset: v,
  after: g
}) => JSON.stringify(pb({ tags: e, data: n, read: i, archived: o, snoozed: s, seen: c, severity: f, limit: d, offset: v, after: g })), Y4 = ({
  tags: e,
  data: n,
  read: i,
  archived: o,
  snoozed: s,
  seen: c,
  severity: f
}) => JSON.stringify(pb({ tags: e, data: n, read: i, archived: o, snoozed: s, seen: c, severity: f })), Ua = (e) => JSON.parse(e), Z4 = [
  "notification.read.pending",
  "notification.read.resolved",
  "notification.unread.pending",
  "notification.unread.resolved",
  "notification.complete_action.pending",
  "notification.complete_action.resolved",
  "notification.revert_action.pending",
  "notification.revert_action.resolved",
  "notifications.read_all.pending",
  "notifications.read_all.resolved"
], X4 = [
  "notification.archive.pending",
  "notification.unarchive.pending",
  "notification.snooze.pending",
  "notification.unsnooze.pending",
  "notification.delete.pending",
  "notifications.archive_all.pending",
  "notifications.archive_all_read.pending",
  "notifications.delete_all.pending"
], Ri, St, Q4 = class {
  constructor({ emitter: e }) {
    ce(this, Ri), ce(this, St), this.updateNotification = (n, i) => {
      const o = N(this, St).get(n);
      if (!o)
        return !1;
      const s = o.notifications.findIndex((f) => f.id === i.id);
      if (s === -1)
        return !1;
      const c = [...o.notifications];
      return c[s] = i, N(this, St).set(n, je(re({}, o), { notifications: c })), !0;
    }, this.removeNotification = (n, i) => {
      const o = N(this, St).get(n);
      if (!o)
        return !1;
      const s = o.notifications.findIndex((f) => f.id === i.id);
      if (s === -1)
        return !1;
      const c = [...o.notifications];
      return c.splice(s, 1), N(this, St).set(n, je(re({}, o), {
        notifications: c
      })), !0;
    }, this.handleNotificationEvent = ({ remove: n } = { remove: !1 }) => (i) => {
      const { data: o, args: s } = i;
      let c = [];
      if (o != null)
        Array.isArray(o) && o.every((d) => typeof d == "object" && "id" in d) ? c = o : typeof o == "object" && "id" in o && (c = [o]);
      else if (n && s) {
        if ("notification" in s && s.notification)
          c = [s.notification];
        else if ("notificationId" in s && s.notificationId) {
          const d = [];
          N(this, St).keys().forEach((v) => {
            const g = N(this, St).get(v);
            if (g) {
              const p = g.notifications.find((m) => m.id === s.notificationId);
              p && d.push(p);
            }
          }), c = d;
        }
      }
      if (c.length === 0)
        return;
      const f = /* @__PURE__ */ new Set();
      N(this, St).keys().forEach((d) => {
        c.forEach((v) => {
          let g = !1;
          n ? g = this.removeNotification(d, v) : g = this.updateNotification(d, v), g && f.add(Y4(Ua(d)));
        });
      }), f.forEach((d) => {
        const v = this.getAggregated(Ua(d));
        N(this, Ri).emit("notifications.list.updated", {
          data: v
        });
      });
    }, de(this, Ri, e), Z4.forEach((n) => {
      N(this, Ri).on(n, this.handleNotificationEvent());
    }), X4.forEach((n) => {
      N(this, Ri).on(n, this.handleNotificationEvent({ remove: !0 }));
    }), de(this, St, new y0());
  }
  getAggregated(e) {
    return N(this, St).keys().filter((i) => {
      const o = Ua(i);
      return Gc(o, e);
    }).map((i) => N(this, St).get(i)).reduce(
      (i, o) => o ? {
        hasMore: o.hasMore,
        filter: o.filter,
        notifications: [...i.notifications, ...o.notifications]
      } : i,
      { hasMore: !1, filter: {}, notifications: [] }
    );
  }
  has(e) {
    return N(this, St).get(sh(e)) !== void 0;
  }
  set(e, n) {
    N(this, St).set(sh(e), n);
  }
  update(e, n) {
    this.set(e, n);
    const i = this.getAggregated(Ua(sh(e)));
    N(this, Ri).emit("notifications.list.updated", {
      data: i
    });
  }
  getAll(e) {
    if (this.has(e))
      return this.getAggregated({
        tags: e.tags,
        data: e.data,
        read: e.read,
        snoozed: e.snoozed,
        archived: e.archived,
        seen: e.seen,
        severity: e.severity
      });
  }
  /**
   * Get unique notifications based on specified filter fields.
   * The same tags and data can be applied to multiple filters which means that the same notification can be duplicated.
   */
  getUniqueNotifications({
    tags: e,
    read: n,
    data: i
  }) {
    const o = N(this, St).keys(), s = /* @__PURE__ */ new Map();
    return o.forEach((c) => {
      const f = Ua(c);
      if (ab(e, f.tags) && ob(i, f.data)) {
        const d = N(this, St).get(c);
        if (!d)
          return;
        d.notifications.filter((v) => typeof n > "u" || n === v.isRead).forEach((v) => {
          s.set(v.id, v);
        });
      }
    }), Array.from(s.values());
  }
  clear(e) {
    N(this, St).keys().forEach((i) => {
      Gc(Ua(i), e) && N(this, St).remove(i);
    });
  }
  clearAll() {
    N(this, St).clear();
  }
};
Ri = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
var bc, F4 = class extends jl {
  constructor({
    useCache: e,
    inboxServiceInstance: n,
    eventEmitterInstance: i
  }) {
    super({
      eventEmitterInstance: i,
      inboxServiceInstance: n
    }), ce(this, bc), this.cache = new Q4({
      emitter: i
    }), de(this, bc, e);
  }
  get inboxService() {
    return this._inboxService;
  }
  list() {
    return P(this, arguments, function* (e = {}) {
      var n = e, { limit: i = 10 } = n, o = Ka(n, ["limit"]);
      return this.callWithSession(() => P(this, null, function* () {
        const s = re({ limit: i }, o);
        try {
          const c = "useCache" in s ? s.useCache : N(this, bc);
          let f = c ? this.cache.getAll(s) : void 0;
          if (this._emitter.emit("notifications.list.pending", { args: s, data: f }), !f) {
            const d = yield this._inboxService.fetchNotifications(re({
              limit: i
            }, o));
            f = {
              hasMore: d.hasMore,
              filter: d.filter,
              notifications: d.data.map((v) => new Ht(v, this._emitter, this._inboxService))
            }, c && (this.cache.set(s, f), f = this.cache.getAll(s));
          }
          return this._emitter.emit("notifications.list.resolved", { args: s, data: f }), { data: f };
        } catch (c) {
          return this._emitter.emit("notifications.list.resolved", { args: s, error: c }), { error: new nt("Failed to fetch notifications", c) };
        }
      }));
    });
  }
  count(e) {
    return P(this, null, function* () {
      return this.callWithSession(() => P(this, null, function* () {
        const n = e && "filters" in e ? e.filters : [re({}, e)];
        try {
          this._emitter.emit("notifications.count.pending", { args: e });
          const i = yield this._inboxService.count({
            filters: n
          }), o = e && "filters" in e ? { counts: i.data } : i.data[0];
          return this._emitter.emit("notifications.count.resolved", {
            args: e,
            data: o
          }), { data: o };
        } catch (i) {
          return this._emitter.emit("notifications.count.resolved", { args: e, error: i }), { error: new nt("Failed to count notifications", i) };
        }
      }));
    });
  }
  read(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return sb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  unread(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return cb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  seen(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return ub({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  archive(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return fb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  unarchive(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return db({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  delete(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return gb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  snooze(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return hb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  unsnooze(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return vb({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e
          });
        })
      );
    });
  }
  completePrimary(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return Pc({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e,
            actionType: "primary"
            /* PRIMARY */
          });
        })
      );
    });
  }
  completeSecondary(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return Pc({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e,
            actionType: "secondary"
            /* SECONDARY */
          });
        })
      );
    });
  }
  revertPrimary(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return Ic({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e,
            actionType: "primary"
            /* PRIMARY */
          });
        })
      );
    });
  }
  revertSecondary(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => P(this, null, function* () {
          return Ic({
            emitter: this._emitter,
            apiService: this._inboxService,
            args: e,
            actionType: "secondary"
            /* SECONDARY */
          });
        })
      );
    });
  }
  readAll() {
    return P(this, arguments, function* ({
      tags: e,
      data: n
    } = {}) {
      return this.callWithSession(
        () => P(this, null, function* () {
          return q4({
            emitter: this._emitter,
            inboxService: this._inboxService,
            notificationsCache: this.cache,
            tags: e,
            data: n
          });
        })
      );
    });
  }
  seenAll() {
    return P(this, arguments, function* (e = {}) {
      return this.callWithSession(() => P(this, null, function* () {
        return "notificationIds" in e ? hy({
          emitter: this._emitter,
          inboxService: this._inboxService,
          notificationsCache: this.cache,
          notificationIds: e.notificationIds
        }) : hy({
          emitter: this._emitter,
          inboxService: this._inboxService,
          notificationsCache: this.cache,
          tags: "tags" in e ? e.tags : void 0,
          data: "data" in e ? e.data : void 0
        });
      }));
    });
  }
  archiveAll() {
    return P(this, arguments, function* ({
      tags: e,
      data: n
    } = {}) {
      return this.callWithSession(
        () => P(this, null, function* () {
          return G4({
            emitter: this._emitter,
            inboxService: this._inboxService,
            notificationsCache: this.cache,
            tags: e,
            data: n
          });
        })
      );
    });
  }
  archiveAllRead() {
    return P(this, arguments, function* ({ tags: e, data: n } = {}) {
      return this.callWithSession(
        () => P(this, null, function* () {
          return P4({
            emitter: this._emitter,
            inboxService: this._inboxService,
            notificationsCache: this.cache,
            tags: e,
            data: n
          });
        })
      );
    });
  }
  deleteAll() {
    return P(this, arguments, function* ({
      tags: e,
      data: n
    } = {}) {
      return this.callWithSession(
        () => P(this, null, function* () {
          return I4({
            emitter: this._emitter,
            inboxService: this._inboxService,
            notificationsCache: this.cache,
            tags: e,
            data: n
          });
        })
      );
    });
  }
  clearCache({ filter: e } = {}) {
    if (e) {
      this.cache.clear(e ?? {});
      return;
    }
    this.cache.clearAll();
  }
  triggerHelloWorldEvent() {
    return P(this, null, function* () {
      return this._inboxService.triggerHelloWorldEvent();
    });
  }
};
bc = /* @__PURE__ */ new WeakMap();
var wc, _c, xc, Sc, Yc = class {
  constructor(e, {
    emitterInstance: n,
    inboxServiceInstance: i,
    cache: o,
    useCache: s
  }) {
    ce(this, wc), ce(this, _c), ce(this, xc), ce(this, Sc), de(this, wc, n), de(this, _c, i), de(this, xc, o), de(this, Sc, s), this.isEnabled = e.isEnabled, this.weeklySchedule = e.weeklySchedule;
  }
  update(e) {
    return P(this, null, function* () {
      var n;
      const i = !!e.weeklySchedule || !!this.weeklySchedule;
      return yb({
        emitter: N(this, wc),
        apiService: N(this, _c),
        cache: N(this, xc),
        useCache: N(this, Sc),
        args: re({
          isEnabled: (n = e.isEnabled) != null ? n : this.isEnabled
        }, i && {
          weeklySchedule: re(re({}, this.weeklySchedule), e.weeklySchedule)
        })
      });
    });
  }
};
wc = /* @__PURE__ */ new WeakMap();
_c = /* @__PURE__ */ new WeakMap();
xc = /* @__PURE__ */ new WeakMap();
Sc = /* @__PURE__ */ new WeakMap();
var Cc, kc, Ac, Ec, Tc, Ja = class {
  constructor(e, {
    emitterInstance: n,
    inboxServiceInstance: i,
    cache: o,
    scheduleCache: s,
    useCache: c
  }) {
    ce(this, Cc), ce(this, kc), ce(this, Ac), ce(this, Ec), ce(this, Tc), de(this, Cc, n), de(this, kc, i), de(this, Ac, o), de(this, Ec, s), de(this, Tc, c), this.level = e.level, this.enabled = e.enabled, this.channels = e.channels, this.workflow = e.workflow, this.schedule = new Yc(
      re({}, e.schedule),
      { emitterInstance: n, inboxServiceInstance: i, cache: s, useCache: c }
    );
  }
  update({
    channels: e,
    channelPreferences: n
  }) {
    var i;
    return mb({
      emitter: N(this, Cc),
      apiService: N(this, kc),
      cache: N(this, Ac),
      scheduleCache: N(this, Ec),
      useCache: N(this, Tc),
      args: {
        workflowId: (i = this.workflow) == null ? void 0 : i.id,
        channels: e || n,
        preference: this
      }
    });
  }
};
Cc = /* @__PURE__ */ new WeakMap();
kc = /* @__PURE__ */ new WeakMap();
Ac = /* @__PURE__ */ new WeakMap();
Ec = /* @__PURE__ */ new WeakMap();
Tc = /* @__PURE__ */ new WeakMap();
var mb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  cache: o,
  scheduleCache: s,
  useCache: c,
  args: f
}) {
  var d;
  const { channels: v } = f, g = "workflowId" in f ? f.workflowId : (d = f.preference.workflow) == null ? void 0 : d.id;
  try {
    n.emit("preference.update.pending", {
      args: f,
      data: "preference" in f ? new Ja(
        je(re({}, f.preference), {
          channels: re(re({}, f.preference.channels), v)
        }),
        {
          emitterInstance: n,
          inboxServiceInstance: i,
          cache: o,
          scheduleCache: s,
          useCache: c
        }
      ) : void 0
    });
    let p;
    g ? p = yield i.updateWorkflowPreferences({ workflowId: g, channels: v }) : (J4({ emitter: n, apiService: i, cache: o, scheduleCache: s, useCache: c, args: f }), p = yield i.updateGlobalPreferences(v));
    const m = new Ja(p, {
      emitterInstance: n,
      inboxServiceInstance: i,
      cache: o,
      scheduleCache: s,
      useCache: c
    });
    return n.emit("preference.update.resolved", { args: f, data: m }), { data: m };
  } catch (p) {
    return n.emit("preference.update.resolved", { args: f, error: p }), { error: new nt("Failed to update preference", p) };
  }
}), W4 = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  cache: o,
  scheduleCache: s,
  useCache: c,
  args: f
}) {
  if (f.find(
    (v) => "preference" in v && v.preference.level === "global"
    /* GLOBAL */
  ))
    return { error: new nt("Global preference is not supported in bulk update", "") };
  try {
    const v = f.map(
      (_) => "preference" in _ ? new Ja(
        je(re({}, _.preference), {
          channels: re(re({}, _.preference.channels), _.channels)
        }),
        {
          emitterInstance: n,
          inboxServiceInstance: i,
          cache: o,
          scheduleCache: s,
          useCache: c
        }
      ) : void 0
    ).filter((_) => _ !== void 0);
    n.emit("preferences.bulk_update.pending", {
      args: f,
      data: v
    });
    const g = f.map((_) => {
      var w, C, k, S;
      return re({
        workflowId: "workflowId" in _ ? _.workflowId : (S = (k = (w = _.preference.workflow) == null ? void 0 : w.id) != null ? k : (C = _.preference.workflow) == null ? void 0 : C.identifier) != null ? S : ""
      }, _.channels);
    }), m = (yield i.bulkUpdatePreferences(g)).map(
      (_) => new Ja(_, {
        emitterInstance: n,
        inboxServiceInstance: i,
        cache: o,
        scheduleCache: s,
        useCache: c
      })
    );
    return n.emit("preferences.bulk_update.resolved", { args: f, data: m }), { data: m };
  } catch (v) {
    return n.emit("preferences.bulk_update.resolved", { args: f, error: v }), { error: new nt("Failed to bulk update preferences", v) };
  }
}), J4 = ({
  emitter: e,
  apiService: n,
  cache: i,
  scheduleCache: o,
  useCache: s,
  args: c
}) => {
  const f = s ? i?.getAll({}) : void 0;
  f?.forEach((d) => {
    var v, g;
    if (d.level === "template") {
      const p = je(re({}, d), {
        channels: Object.entries(d.channels).reduce((_, [w, C]) => {
          var k;
          const S = w;
          return _[S] = (k = c.channels[S]) != null ? k : C, _;
        }, {})
      }), m = "preference" in c ? new Ja(p, {
        emitterInstance: e,
        inboxServiceInstance: n,
        cache: i,
        scheduleCache: o,
        useCache: s
      }) : void 0;
      m && e.emit("preference.update.pending", {
        args: {
          workflowId: (g = (v = d.workflow) == null ? void 0 : v.id) != null ? g : "",
          channels: m.channels
        },
        data: m
      });
    }
  });
}, yb = (e) => P(void 0, [e], function* ({
  emitter: n,
  apiService: i,
  cache: o,
  useCache: s,
  args: c
}) {
  var f, d;
  try {
    const { isEnabled: v, weeklySchedule: g } = c, p = new Yc(
      {
        isEnabled: v,
        weeklySchedule: g
      },
      {
        emitterInstance: n,
        inboxServiceInstance: i,
        cache: o,
        useCache: s
      }
    );
    n.emit("preference.schedule.update.pending", { args: c, data: p });
    const m = yield i.updateGlobalPreferences({
      schedule: {
        isEnabled: v,
        weeklySchedule: g
      }
    }), _ = new Yc(
      {
        isEnabled: (f = m.schedule) == null ? void 0 : f.isEnabled,
        weeklySchedule: (d = m.schedule) == null ? void 0 : d.weeklySchedule
      },
      {
        emitterInstance: n,
        inboxServiceInstance: i,
        cache: o,
        useCache: s
      }
    );
    return n.emit("preference.schedule.update.resolved", {
      args: c,
      data: _
    }), { data: _ };
  } catch (v) {
    return n.emit("preference.schedule.update.resolved", { args: c, error: v }), { error: new nt("Failed to update preference", v) };
  }
}), Li, ex = class extends jl {
  constructor({
    cache: e,
    useCache: n,
    inboxServiceInstance: i,
    eventEmitterInstance: o
  }) {
    super({
      eventEmitterInstance: o,
      inboxServiceInstance: i
    }), ce(this, Li), this.cache = e, de(this, Li, n);
  }
  get() {
    return P(this, null, function* () {
      return this.callWithSession(() => P(this, null, function* () {
        var e, n;
        try {
          let i = N(this, Li) ? this.cache.getAll() : void 0;
          if (this._emitter.emit("preference.schedule.get.pending", { args: void 0, data: i }), !i) {
            const o = yield this._inboxService.fetchGlobalPreferences();
            i = new Yc(
              {
                isEnabled: (e = o?.schedule) == null ? void 0 : e.isEnabled,
                weeklySchedule: (n = o?.schedule) == null ? void 0 : n.weeklySchedule
              },
              {
                emitterInstance: this._emitter,
                inboxServiceInstance: this._inboxService,
                cache: this.cache,
                useCache: N(this, Li)
              }
            ), N(this, Li) && (this.cache.set(i), i = this.cache.getAll());
          }
          return this._emitter.emit("preference.schedule.get.resolved", {
            args: void 0,
            data: i
          }), { data: i };
        } catch (i) {
          throw this._emitter.emit("preference.schedule.get.resolved", { args: void 0, error: i }), i;
        }
      }));
    });
  }
  update(e) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => yb({
          emitter: this._emitter,
          apiService: this._inboxService,
          cache: this.cache,
          useCache: N(this, Li),
          args: e
        })
      );
    });
  }
};
Li = /* @__PURE__ */ new WeakMap();
var tx = [
  "preference.update.pending",
  "preference.update.resolved",
  "preferences.bulk_update.pending",
  "preferences.bulk_update.resolved"
], nx = [
  "preference.schedule.update.pending",
  "preference.schedule.update.resolved"
], rx = ({ tags: e, severity: n }) => Object.entries({ tags: e, severity: n }).reduce((i, [o, s]) => (s == null || Array.isArray(s) && s.length === 0 || (i[o] = s), i), {}), ch = ({ tags: e, severity: n }) => JSON.stringify(rx({ tags: e, severity: n })), Ui, Lt, ix = class {
  constructor({ emitterInstance: e }) {
    ce(this, Ui), ce(this, Lt), this.updatePreference = (n, i) => {
      const o = N(this, Lt).get(n);
      if (!o)
        return !1;
      const s = o.findIndex(
        (f) => {
          var d, v;
          return ((d = f.workflow) == null ? void 0 : d.id) === ((v = i.workflow) == null ? void 0 : v.id) || f.level === i.level && i.level === "global";
        }
      );
      if (s === -1)
        return !1;
      const c = [...o];
      return c[s] = i, N(this, Lt).set(n, c), !0;
    }, this.updatePreferenceSchedule = (n, i) => {
      const o = N(this, Lt).get(n);
      if (!o)
        return !1;
      const s = o.findIndex(
        (f) => f.level === "global"
        /* GLOBAL */
      );
      if (s === -1)
        return !1;
      const c = [...o];
      return c[s].schedule = i, N(this, Lt).set(n, c), !0;
    }, this.handleScheduleEvent = ({ data: n }) => {
      var i;
      if (!n)
        return;
      const o = N(this, Lt).keys(), s = /* @__PURE__ */ new Set();
      for (const c of o) {
        const f = this.updatePreferenceSchedule(c, n), d = N(this, Lt).get(c);
        !f || !d || s.add(c);
      }
      for (const c of s)
        N(this, Ui).emit("preferences.list.updated", {
          data: (i = N(this, Lt).get(c)) != null ? i : []
        });
    }, this.handlePreferenceEvent = ({ data: n }) => {
      if (!n)
        return;
      const i = Array.isArray(n) ? n : [n], o = /* @__PURE__ */ new Set();
      N(this, Lt).keys().forEach((s) => {
        i.forEach((c) => {
          const f = this.updatePreference(s, c), d = N(this, Lt).get(s);
          !f || !d || o.add(s);
        });
      }), o.forEach((s) => {
        var c;
        N(this, Ui).emit("preferences.list.updated", {
          data: (c = N(this, Lt).get(s)) != null ? c : []
        });
      });
    }, de(this, Ui, e);
    for (const n of tx)
      N(this, Ui).on(n, this.handlePreferenceEvent);
    for (const n of nx)
      N(this, Ui).on(n, this.handleScheduleEvent);
    de(this, Lt, new y0());
  }
  has(e) {
    return N(this, Lt).get(ch(e)) !== void 0;
  }
  set(e, n) {
    N(this, Lt).set(ch(e), n);
  }
  getAll(e) {
    if (this.has(e))
      return N(this, Lt).get(ch(e));
  }
  clearAll() {
    N(this, Lt).clear();
  }
};
Ui = /* @__PURE__ */ new WeakMap();
Lt = /* @__PURE__ */ new WeakMap();
var ax = [
  "preference.schedule.update.pending",
  "preference.schedule.update.resolved"
], uh = () => "schedule", bl, xn, ox = class {
  constructor({ emitterInstance: e }) {
    ce(this, bl), ce(this, xn), this.updateScheduleInCache = (n, i) => N(this, xn).get(n) ? (N(this, xn).set(n, i), !0) : !1, this.handleScheduleEvent = ({ data: n }) => {
      if (!n)
        return;
      const i = /* @__PURE__ */ new Set(), o = N(this, xn).keys();
      for (const s of o) {
        const c = this.updateScheduleInCache(s, n), f = N(this, xn).get(s);
        !c || !f || i.add(s);
      }
      for (const s of i)
        N(this, bl).emit("preference.schedule.get.updated", {
          data: N(this, xn).get(s)
        });
    }, de(this, bl, e);
    for (const n of ax)
      N(this, bl).on(n, this.handleScheduleEvent);
    de(this, xn, new y0());
  }
  has() {
    return N(this, xn).get(uh()) !== void 0;
  }
  set(e) {
    N(this, xn).set(uh(), e);
  }
  getAll() {
    if (this.has())
      return N(this, xn).get(uh());
  }
  clearAll() {
    N(this, xn).clear();
  }
};
bl = /* @__PURE__ */ new WeakMap();
xn = /* @__PURE__ */ new WeakMap();
var ri, lx = class extends jl {
  constructor({
    useCache: n,
    inboxServiceInstance: i,
    eventEmitterInstance: o
  }) {
    super({
      eventEmitterInstance: o,
      inboxServiceInstance: i
    }), ce(this, ri), this.cache = new ix({
      emitterInstance: this._emitter
    }), this.scheduleCache = new ox({
      emitterInstance: this._emitter
    }), de(this, ri, n), this.schedule = new ex({
      cache: this.scheduleCache,
      useCache: n,
      inboxServiceInstance: i,
      eventEmitterInstance: o
    });
  }
  list() {
    return P(this, arguments, function* (n = {}) {
      return this.callWithSession(() => P(this, null, function* () {
        var i;
        try {
          let o = N(this, ri) ? this.cache.getAll(n) : void 0;
          return this._emitter.emit("preferences.list.pending", { args: n, data: o }), o || (o = (yield this._inboxService.fetchPreferences({
            tags: n.tags,
            severity: n.severity,
            criticality: (i = n.criticality) != null ? i : "nonCritical"
            /* NON_CRITICAL */
          })).map(
            (c) => new Ja(c, {
              emitterInstance: this._emitter,
              inboxServiceInstance: this._inboxService,
              cache: this.cache,
              scheduleCache: this.scheduleCache,
              useCache: N(this, ri)
            })
          ), N(this, ri) && (this.cache.set(n, o), o = this.cache.getAll(n))), this._emitter.emit("preferences.list.resolved", { args: n, data: o }), { data: o };
        } catch (o) {
          throw this._emitter.emit("preferences.list.resolved", { args: n, error: o }), o;
        }
      }));
    });
  }
  update(n) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => mb({
          emitter: this._emitter,
          apiService: this._inboxService,
          cache: this.cache,
          scheduleCache: this.scheduleCache,
          useCache: N(this, ri),
          args: n
        })
      );
    });
  }
  bulkUpdate(n) {
    return P(this, null, function* () {
      return this.callWithSession(
        () => W4({
          emitter: this._emitter,
          apiService: this._inboxService,
          cache: this.cache,
          scheduleCache: this.scheduleCache,
          useCache: N(this, ri),
          args: n
        })
      );
    });
  }
};
ri = /* @__PURE__ */ new WeakMap();
function bb() {
  return typeof window < "u";
}
var ja, Nc, On, sx = class {
  constructor(e, n, i) {
    ce(this, ja), ce(this, Nc), ce(this, On), de(this, ja, i), de(this, Nc, n), de(this, On, e);
  }
  get applicationIdentifier() {
    return N(this, On).applicationIdentifier;
  }
  get subscriberId() {
    var e;
    return (e = N(this, On).subscriber) == null ? void 0 : e.subscriberId;
  }
  handleApplicationIdentifier(e, n) {
    if (typeof window > "u" || !window.localStorage)
      return null;
    const i = "novu_keyless_application_identifier";
    switch (e) {
      case "get":
        return window.localStorage.getItem(i);
      case "store":
        return n && window.localStorage.setItem(i, n), null;
      case "delete":
        return window.localStorage.removeItem(i), null;
      default:
        return null;
    }
  }
  initialize(e) {
    return P(this, null, function* () {
      var n, i, o, s, c, f;
      if (((n = N(this, On).subscriber) == null ? void 0 : n.subscriberId) !== ((i = e?.subscriber) == null ? void 0 : i.subscriberId))
        try {
          e && de(this, On, e);
          const { subscriber: d, subscriberHash: v, applicationIdentifier: g, defaultSchedule: p } = N(this, On);
          let m;
          bb() && (m = Intl.DateTimeFormat().resolvedOptions().timeZone);
          let _ = g;
          if (_)
            this.handleApplicationIdentifier("delete");
          else {
            const C = this.handleApplicationIdentifier("get");
            C && (_ = C);
          }
          N(this, ja).emit("session.initialize.pending", { args: N(this, On) });
          const w = yield N(this, Nc).initializeSession({
            applicationIdentifier: _,
            subscriberHash: v,
            subscriber: je(re({}, d), {
              subscriberId: (o = d?.subscriberId) != null ? o : "",
              timezone: (s = d?.timezone) != null ? s : m
            }),
            defaultSchedule: p
          });
          (c = w?.applicationIdentifier) != null && c.startsWith("pk_keyless_") && this.handleApplicationIdentifier("store", w.applicationIdentifier), (f = w?.applicationIdentifier) != null && f.startsWith("pk_keyless_") || this.handleApplicationIdentifier("delete"), N(this, ja).emit("session.initialize.resolved", { args: N(this, On), data: w });
        } catch (d) {
          N(this, ja).emit("session.initialize.resolved", { args: N(this, On), error: d });
        }
    });
  }
};
ja = /* @__PURE__ */ new WeakMap();
Nc = /* @__PURE__ */ new WeakMap();
On = /* @__PURE__ */ new WeakMap();
var ku = "wss://socket.novu.co", vy = "notifications.notification_received", gy = "notifications.unseen_count_changed", py = "notifications.unread_count_changed", cx = ({
  _id: e,
  transactionId: n,
  content: i,
  read: o,
  seen: s,
  archived: c,
  snoozedUntil: f,
  deliveredAt: d,
  createdAt: v,
  lastReadDate: g,
  firstSeenDate: p,
  archivedAt: m,
  channel: _,
  subscriber: w,
  subject: C,
  avatar: k,
  cta: S,
  tags: E,
  data: O,
  workflow: A,
  severity: D
}) => {
  var L, F, Y, ie, X, fe, le, ee;
  const we = {
    id: w?._id,
    subscriberId: w?.subscriberId,
    firstName: w?.firstName,
    lastName: w?.lastName,
    avatar: w?.avatar,
    locale: w?.locale,
    data: w?.data,
    timezone: w?.timezone,
    email: w?.email,
    phone: w?.phone
  }, Ee = (F = (L = S.action) == null ? void 0 : L.buttons) == null ? void 0 : F.find(
    (ae) => ae.type === "primary"
    /* PRIMARY */
  ), Oe = (ie = (Y = S.action) == null ? void 0 : Y.buttons) == null ? void 0 : ie.find(
    (ae) => ae.type === "secondary"
    /* SECONDARY */
  ), j = (fe = (X = S.action) == null ? void 0 : X.result) == null ? void 0 : fe.type, te = (le = S.action) == null ? void 0 : le.status;
  return je(re(re({
    id: e,
    transactionId: n,
    subject: C,
    body: i,
    to: we,
    isRead: o,
    isSeen: s,
    isArchived: c,
    isSnoozed: !!f
  }, d && {
    deliveredAt: d
  }), f && {
    snoozedUntil: f
  }), {
    createdAt: v,
    readAt: g,
    firstSeenAt: p,
    archivedAt: m,
    avatar: k,
    primaryAction: Ee && {
      label: Ee.content,
      isCompleted: j === "primary" && te === "done",
      redirect: Ee.url ? {
        target: Ee.target,
        url: Ee.url
      } : void 0
    },
    secondaryAction: Oe && {
      label: Oe.content,
      isCompleted: j === "secondary" && te === "done",
      redirect: Oe.url ? {
        target: Oe.target,
        url: Oe.url
      } : void 0
    },
    channelType: _,
    tags: E,
    redirect: (ee = S.data) != null && ee.url ? {
      url: S.data.url,
      target: S.data.target
    } : void 0,
    data: O,
    workflow: A,
    severity: D
  });
}, kl, Pn, Yn, Tl, Bh, Vh, jh, b0, Bi, wb, $h, Kh, ux = class extends jl {
  constructor({
    socketUrl: e,
    inboxServiceInstance: n,
    eventEmitterInstance: i
  }) {
    super({
      eventEmitterInstance: i,
      inboxServiceInstance: n
    }), ce(this, Bi), ce(this, kl), ce(this, Pn), ce(this, Yn), ce(this, Tl), ce(this, Bh, (o) => {
      try {
        const s = JSON.parse(o.data);
        s.event === "notification_received" && N(this, Pn).emit(vy, {
          result: new Ht(cx(s.data.message), N(this, Pn), this._inboxService)
        });
      } catch (s) {
        console.log("error", s);
      }
    }), ce(this, Vh, (o) => {
      try {
        const s = JSON.parse(o.data);
        s.event === "unseen_count_changed" && N(this, Pn).emit(gy, {
          result: s.data.unseenCount
        });
      } catch {
      }
    }), ce(this, jh, (o) => {
      try {
        const s = JSON.parse(o.data);
        s.event === "unread_count_changed" && N(this, Pn).emit(py, {
          result: s.data.counts
        });
      } catch {
      }
    }), ce(this, b0, (o) => {
      try {
        switch (JSON.parse(o.data).event) {
          case "notification_received":
            N(this, Bh).call(this, o);
            break;
          case "unseen_count_changed":
            N(this, Vh).call(this, o);
            break;
          case "unread_count_changed":
            N(this, jh).call(this, o);
            break;
          default:
        }
      } catch {
      }
    }), de(this, Pn, i), de(this, Tl, e ?? ku);
  }
  onSessionSuccess({ token: e }) {
    de(this, kl, e);
  }
  isSocketEvent(e) {
    return e === vy || e === gy || e === py;
  }
  connect() {
    return P(this, null, function* () {
      return N(this, kl) ? Jt(this, Bi, $h).call(this) : this.callWithSession(Jt(this, Bi, $h).bind(this));
    });
  }
  disconnect() {
    return P(this, null, function* () {
      return N(this, Yn) ? Jt(this, Bi, Kh).call(this) : this.callWithSession(Jt(this, Bi, Kh).bind(this));
    });
  }
};
kl = /* @__PURE__ */ new WeakMap();
Pn = /* @__PURE__ */ new WeakMap();
Yn = /* @__PURE__ */ new WeakMap();
Tl = /* @__PURE__ */ new WeakMap();
Bh = /* @__PURE__ */ new WeakMap();
Vh = /* @__PURE__ */ new WeakMap();
jh = /* @__PURE__ */ new WeakMap();
b0 = /* @__PURE__ */ new WeakMap();
Bi = /* @__PURE__ */ new WeakSet();
wb = function() {
  return P(this, null, function* () {
    if (N(this, Yn))
      return;
    const e = { socketUrl: N(this, Tl) };
    N(this, Pn).emit("socket.connect.pending", { args: e });
    const n = new URL(N(this, Tl));
    n.searchParams.set("token", N(this, kl)), de(this, Yn, new P_(n.toString())), N(this, Yn).addEventListener("open", () => {
      N(this, Pn).emit("socket.connect.resolved", { args: e });
    }), N(this, Yn).addEventListener("error", (i) => {
      N(this, Pn).emit("socket.connect.resolved", { args: e, error: i });
    }), N(this, Yn).addEventListener("message", N(this, b0));
  });
};
$h = function() {
  return P(this, null, function* () {
    try {
      return yield Jt(this, Bi, wb).call(this), {};
    } catch (e) {
      return { error: new nt("Failed to initialize the PartySocket", e) };
    }
  });
};
Kh = function() {
  return P(this, null, function* () {
    var e;
    try {
      return (e = N(this, Yn)) == null || e.close(), de(this, Yn, void 0), {};
    } catch (n) {
      return { error: new nt("Failed to disconnect from the PartySocket", n) };
    }
  });
};
var fx = "https://ws.novu.co", my = "notifications.notification_received", yy = "notifications.unseen_count_changed", by = "notifications.unread_count_changed", dx = ({
  _id: e,
  transactionId: n,
  content: i,
  read: o,
  seen: s,
  archived: c,
  snoozedUntil: f,
  deliveredAt: d,
  createdAt: v,
  lastReadDate: g,
  firstSeenDate: p,
  archivedAt: m,
  channel: _,
  subscriber: w,
  subject: C,
  avatar: k,
  cta: S,
  tags: E,
  data: O,
  workflow: A,
  severity: D
}) => {
  var L, F, Y, ie, X, fe, le, ee;
  const we = {
    id: w?._id,
    subscriberId: w?.subscriberId,
    firstName: w?.firstName,
    lastName: w?.lastName,
    avatar: w?.avatar,
    locale: w?.locale,
    data: w?.data,
    timezone: w?.timezone,
    email: w?.email,
    phone: w?.phone
  }, Ee = (F = (L = S.action) == null ? void 0 : L.buttons) == null ? void 0 : F.find(
    (ae) => ae.type === "primary"
    /* PRIMARY */
  ), Oe = (ie = (Y = S.action) == null ? void 0 : Y.buttons) == null ? void 0 : ie.find(
    (ae) => ae.type === "secondary"
    /* SECONDARY */
  ), j = (fe = (X = S.action) == null ? void 0 : X.result) == null ? void 0 : fe.type, te = (le = S.action) == null ? void 0 : le.status;
  return je(re(re({
    id: e,
    transactionId: n,
    subject: C,
    body: i,
    to: we,
    isRead: o,
    isSeen: s,
    isArchived: c,
    isSnoozed: !!f
  }, d && {
    deliveredAt: d
  }), f && {
    snoozedUntil: f
  }), {
    createdAt: v,
    readAt: g,
    firstSeenAt: p,
    archivedAt: m,
    avatar: k,
    primaryAction: Ee && {
      label: Ee.content,
      isCompleted: j === "primary" && te === "done",
      redirect: Ee.url ? {
        target: Ee.target,
        url: Ee.url
      } : void 0
    },
    secondaryAction: Oe && {
      label: Oe.content,
      isCompleted: j === "secondary" && te === "done",
      redirect: Oe.url ? {
        target: Oe.target,
        url: Oe.url
      } : void 0
    },
    channelType: _,
    tags: E,
    redirect: (ee = S.data) != null && ee.url ? {
      url: S.data.url,
      target: S.data.target
    } : void 0,
    data: O,
    workflow: A,
    severity: D
  });
}, Al, In, Sn, Nl, w0, _0, x0, Vi, _b, qh, Gh, hx = class extends jl {
  constructor({
    socketUrl: e,
    inboxServiceInstance: n,
    eventEmitterInstance: i
  }) {
    super({
      eventEmitterInstance: i,
      inboxServiceInstance: n
    }), ce(this, Vi), ce(this, Al), ce(this, In), ce(this, Sn), ce(this, Nl), ce(this, w0, ({ message: o }) => {
      N(this, In).emit(my, {
        result: new Ht(dx(o), N(this, In), this._inboxService)
      });
    }), ce(this, _0, ({ unseenCount: o }) => {
      N(this, In).emit(yy, {
        result: o
      });
    }), ce(this, x0, ({ counts: o }) => {
      N(this, In).emit(by, {
        result: o
      });
    }), de(this, In, i), de(this, Nl, e ?? fx);
  }
  onSessionSuccess({ token: e }) {
    de(this, Al, e);
  }
  isSocketEvent(e) {
    return e === my || e === yy || e === by;
  }
  connect() {
    return P(this, null, function* () {
      return N(this, Al) ? Jt(this, Vi, qh).call(this) : this.callWithSession(Jt(this, Vi, qh).bind(this));
    });
  }
  disconnect() {
    return P(this, null, function* () {
      return N(this, Sn) ? Jt(this, Vi, Gh).call(this) : this.callWithSession(Jt(this, Vi, Gh).bind(this));
    });
  }
};
Al = /* @__PURE__ */ new WeakMap();
In = /* @__PURE__ */ new WeakMap();
Sn = /* @__PURE__ */ new WeakMap();
Nl = /* @__PURE__ */ new WeakMap();
w0 = /* @__PURE__ */ new WeakMap();
_0 = /* @__PURE__ */ new WeakMap();
x0 = /* @__PURE__ */ new WeakMap();
Vi = /* @__PURE__ */ new WeakSet();
_b = function() {
  return P(this, null, function* () {
    var e, n, i;
    if (N(this, Sn))
      return;
    const o = { socketUrl: N(this, Nl) };
    N(this, In).emit("socket.connect.pending", { args: o }), de(this, Sn, yc(N(this, Nl), {
      reconnectionDelayMax: 1e4,
      transports: ["websocket"],
      query: {
        token: `${N(this, Al)}`
      }
    })), N(this, Sn).on("connect", () => {
      N(this, In).emit("socket.connect.resolved", { args: o });
    }), N(this, Sn).on("connect_error", (s) => {
      N(this, In).emit("socket.connect.resolved", { args: o, error: s });
    }), (e = N(this, Sn)) == null || e.on("notification_received", N(this, w0)), (n = N(this, Sn)) == null || n.on("unseen_count_changed", N(this, _0)), (i = N(this, Sn)) == null || i.on("unread_count_changed", N(this, x0));
  });
};
qh = function() {
  return P(this, null, function* () {
    try {
      return yield Jt(this, Vi, _b).call(this), {};
    } catch (e) {
      return { error: new nt("Failed to initialize the socket", e) };
    }
  });
};
Gh = function() {
  return P(this, null, function* () {
    var e;
    try {
      return (e = N(this, Sn)) == null || e.disconnect(), de(this, Sn, void 0), {};
    } catch (n) {
      return { error: new nt("Failed to disconnect from the socket", n) };
    }
  });
};
var vx = [
  "wss://eu.socket.novu.co",
  ku,
  "wss://socket.novu-staging.co",
  "wss://socket-worker-local.cli-shortener.workers.dev"
], gx = {
  "https://eu.ws.novu.co": "wss://eu.socket.novu.co",
  "https://ws.novu.co": ku,
  "https://dev.ws.novu.co": "wss://socket.novu-staging.co"
};
function px(e) {
  return e ? gx[e] || e : ku;
}
function mx(e) {
  return !e || vx.includes(e);
}
function yx({
  socketUrl: e,
  inboxServiceInstance: n,
  eventEmitterInstance: i
}) {
  const o = px(e);
  switch (mx(o) ? "partysocket" : "socket.io") {
    case "partysocket":
      return new ux({
        socketUrl: o,
        inboxServiceInstance: n,
        eventEmitterInstance: i
      });
    case "socket.io":
    default:
      return new hx({
        socketUrl: o,
        inboxServiceInstance: n,
        eventEmitterInstance: i
      });
  }
}
var _r, ii, Hi, xb = class {
  constructor(e) {
    ce(this, _r), ce(this, ii), ce(this, Hi);
    var n, i;
    de(this, Hi, new $4({
      apiUrl: e.apiUrl || e.backendUrl,
      userAgent: e.__userAgent
    })), de(this, _r, new K4()), de(this, ii, new sx(
      {
        applicationIdentifier: e.applicationIdentifier || "",
        subscriberHash: e.subscriberHash,
        subscriber: Su({ subscriberId: e.subscriberId, subscriber: e.subscriber }),
        defaultSchedule: e.defaultSchedule
      },
      N(this, Hi),
      N(this, _r)
    )), N(this, ii).initialize(), this.notifications = new F4({
      useCache: (n = e.useCache) != null ? n : !0,
      inboxServiceInstance: N(this, Hi),
      eventEmitterInstance: N(this, _r)
    }), this.preferences = new lx({
      useCache: (i = e.useCache) != null ? i : !0,
      inboxServiceInstance: N(this, Hi),
      eventEmitterInstance: N(this, _r)
    }), this.socket = yx({
      socketUrl: e.socketUrl,
      eventEmitterInstance: N(this, _r),
      inboxServiceInstance: N(this, Hi)
    }), this.on = (o, s) => {
      this.socket.isSocketEvent(o) && this.socket.connect();
      const c = N(this, _r).on(o, s);
      return () => {
        c();
      };
    }, this.off = (o, s) => {
      N(this, _r).off(o, s);
    };
  }
  get applicationIdentifier() {
    return N(this, ii).applicationIdentifier;
  }
  get subscriberId() {
    return N(this, ii).subscriberId;
  }
  changeSubscriber(e) {
    return P(this, null, function* () {
      yield N(this, ii).initialize({
        applicationIdentifier: N(this, ii).applicationIdentifier || "",
        subscriberHash: e.subscriberHash,
        subscriber: e.subscriber
      });
    });
  }
};
_r = /* @__PURE__ */ new WeakMap();
ii = /* @__PURE__ */ new WeakMap();
Hi = /* @__PURE__ */ new WeakMap();
var fh = { exports: {} }, dl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wy;
function bx() {
  if (wy) return dl;
  wy = 1;
  var e = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
  function i(o, s, c) {
    var f = null;
    if (c !== void 0 && (f = "" + c), s.key !== void 0 && (f = "" + s.key), "key" in s) {
      c = {};
      for (var d in s)
        d !== "key" && (c[d] = s[d]);
    } else c = s;
    return s = c.ref, {
      $$typeof: e,
      type: o,
      key: f,
      ref: s !== void 0 ? s : null,
      props: c
    };
  }
  return dl.Fragment = n, dl.jsx = i, dl.jsxs = i, dl;
}
var _y;
function wx() {
  return _y || (_y = 1, fh.exports = bx()), fh.exports;
}
var tt = wx(), _x = "3.10.1", xx = "@novu/react", Sx = `${xx}@${_x}`, S0 = ke.createContext(void 0), Cx = (e) => {
  const n = e.applicationIdentifier || "", i = Su({ subscriberId: e.subscriberId, subscriber: e.subscriber }), {
    children: o,
    subscriberId: s,
    subscriberHash: c,
    backendUrl: f,
    apiUrl: d,
    socketUrl: v,
    useCache: g,
    userAgentType: p,
    defaultSchedule: m
  } = e, _ = ke.useMemo(
    () => new xb({
      applicationIdentifier: n,
      subscriberHash: c,
      backendUrl: f,
      apiUrl: d,
      socketUrl: v,
      useCache: g,
      __userAgent: `${Sx} ${p}`,
      subscriber: i,
      defaultSchedule: m
    }),
    [n, c, f, d, v, g, p]
  );
  return ke.useEffect(() => {
    _.changeSubscriber({
      subscriber: i,
      subscriberHash: e.subscriberHash
    });
  }, [i.subscriberId, e.subscriberHash, _]), /* @__PURE__ */ tt.jsx(S0.Provider, { value: _, children: o });
}, kx = () => {
  const e = ke.useContext(S0);
  if (!e)
    throw new Error("useNovu must be used within a <NovuProvider />");
  return e;
}, Ax = () => ke.useContext(S0);
function Ex(e, n) {
  if (!e)
    throw typeof n == "string" ? new Error(n) : new Error(`${n.displayName} not found`);
}
var Sb = (e, n) => {
  const { assertCtxFn: i = Ex } = {}, o = Ki.createContext(void 0);
  return o.displayName = e, [o, () => {
    const f = Ki.useContext(o);
    return i(f, `Component must be wrapped with ${o.displayName}`), f.value;
  }, () => {
    const f = Ki.useContext(o);
    return f ? f.value : {};
  }];
}, [Tx, Nx, SE] = Sb("NovuUIContext"), Ox = (e) => /* @__PURE__ */ tt.jsx(Tx.Provider, { value: { value: e.value }, children: e.children }), [zx, Cb, CE] = Sb("RendererContext"), Mx = (e) => /* @__PURE__ */ tt.jsx(zx.Provider, { value: { value: e.value }, children: e.children });
function Dx({ mount: e }) {
  const n = ke.useRef(null);
  return ke.useEffect(() => {
    let i;
    const o = n.current;
    if (o && e) {
      const s = e(o);
      s && (i = s);
    }
    return () => {
      o && i && i(o);
    };
  }, [n, e]), /* @__PURE__ */ tt.jsx("div", { ref: n });
}
var Rx = N1(), Lx = (e) => {
  const { children: n } = e, [i, o] = ke.useState(/* @__PURE__ */ new Map()), s = ke.useCallback(
    (c, f) => (o((d) => {
      const v = new Map(d);
      return v.set(c, f), v;
    }), () => {
      o((d) => {
        const v = new Map(d);
        return v.delete(c), v;
      });
    }),
    [o]
  );
  return /* @__PURE__ */ tt.jsxs(Mx, { value: { mountElement: s }, children: [
    [...i].map(([c, f]) => Rx.createPortal(f, c)),
    n
  ] });
}, Ux = (e) => {
  const n = (i) => /* @__PURE__ */ tt.jsx(Lx, { children: /* @__PURE__ */ tt.jsx(e, { ...i }) });
  return n.displayName = `WithRenderer(${e.displayName || e.name || "Component"})`, n;
};
const Hx = !1, Bx = (e, n) => e === n, Dn = Symbol("solid-proxy"), kb = typeof Proxy == "function", Zc = Symbol("solid-track"), Xc = {
  equals: Bx
};
let Ab = Db;
const Tr = 1, Qc = 2, Eb = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, dh = {};
var Pe = null;
let hh = null, Vx = null, it = null, Kt = null, Cr = null, Au = 0;
function qi(e, n) {
  const i = it, o = Pe, s = e.length === 0, c = n === void 0 ? o : n, f = s ? Eb : {
    owned: null,
    cleanups: null,
    context: c ? c.context : null,
    owner: c
  }, d = s ? e : () => e(() => kt(() => Ol(f)));
  Pe = f, it = null;
  try {
    return Er(d, !0);
  } finally {
    it = i, Pe = o;
  }
}
function W(e, n) {
  n = n ? Object.assign({}, Xc, n) : Xc;
  const i = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, o = (s) => (typeof s == "function" && (s = s(i.value)), Mb(i, s));
  return [zb.bind(i), o];
}
function jx(e, n, i) {
  const o = Eu(e, n, !0, Tr);
  oo(o);
}
function ue(e, n, i) {
  const o = Eu(e, n, !1, Tr);
  oo(o);
}
function Ue(e, n, i) {
  Ab = Ix;
  const o = Eu(e, n, !1, Tr);
  (!i || !i.render) && (o.user = !0), Cr ? Cr.push(o) : oo(o);
}
function oe(e, n, i) {
  i = i ? Object.assign({}, Xc, i) : Xc;
  const o = Eu(e, n, !0, 0);
  return o.observers = null, o.observerSlots = null, o.comparator = i.equals || void 0, oo(o), zb.bind(o);
}
function $x(e) {
  return e && typeof e == "object" && "then" in e;
}
function Tb(e, n, i) {
  let o, s, c;
  typeof n == "function" ? (o = e, s = n, c = {}) : (o = !0, s = e, c = n || {});
  let f = null, d = dh, v = !1, g = "initialValue" in c, p = typeof o == "function" && oe(o);
  const m = /* @__PURE__ */ new Set(), [_, w] = (c.storage || W)(c.initialValue), [C, k] = W(void 0), [S, E] = W(void 0, {
    equals: !1
  }), [O, A] = W(g ? "ready" : "unresolved");
  function D(X, fe, le, ee) {
    return f === X && (f = null, ee !== void 0 && (g = !0), (X === d || fe === d) && c.onHydrated && queueMicrotask(() => c.onHydrated(ee, {
      value: fe
    })), d = dh, L(fe, le)), fe;
  }
  function L(X, fe) {
    Er(() => {
      fe === void 0 && w(() => X), A(fe !== void 0 ? "errored" : g ? "ready" : "unresolved"), k(fe);
      for (const le of m.keys()) le.decrement();
      m.clear();
    }, !1);
  }
  function F() {
    const X = qx, fe = _(), le = C();
    if (le !== void 0 && !f) throw le;
    return it && it.user, fe;
  }
  function Y(X = !0) {
    if (X !== !1 && v) return;
    v = !1;
    const fe = p ? p() : o;
    if (fe == null || fe === !1) {
      D(f, kt(_));
      return;
    }
    let le;
    const ee = d !== dh ? d : kt(() => {
      try {
        return s(fe, {
          value: _(),
          refetching: X
        });
      } catch (we) {
        le = we;
      }
    });
    if (le !== void 0) {
      D(f, void 0, Oc(le), fe);
      return;
    } else if (!$x(ee))
      return D(f, ee, void 0, fe), ee;
    return f = ee, "v" in ee ? (ee.s === 1 ? D(f, ee.v, void 0, fe) : D(f, void 0, Oc(ee.v), fe), ee) : (v = !0, queueMicrotask(() => v = !1), Er(() => {
      A(g ? "refreshing" : "pending"), E();
    }, !1), ee.then((we) => D(ee, we, void 0, fe), (we) => D(ee, void 0, Oc(we), fe)));
  }
  Object.defineProperties(F, {
    state: {
      get: () => O()
    },
    error: {
      get: () => C()
    },
    loading: {
      get() {
        const X = O();
        return X === "pending" || X === "refreshing";
      }
    },
    latest: {
      get() {
        if (!g) return F();
        const X = C();
        if (X && !f) throw X;
        return _();
      }
    }
  });
  let ie = Pe;
  return p ? jx(() => (ie = Pe, Y(!1))) : Y(!1), [F, {
    refetch: (X) => Ob(ie, () => Y(X)),
    mutate: w
  }];
}
function Nb(e) {
  return Er(e, !1);
}
function kt(e) {
  if (it === null) return e();
  const n = it;
  it = null;
  try {
    return e();
  } finally {
    it = n;
  }
}
function Ph(e, n, i) {
  const o = Array.isArray(e);
  let s, c = i && i.defer;
  return (f) => {
    let d;
    if (o) {
      d = Array(e.length);
      for (let g = 0; g < e.length; g++) d[g] = e[g]();
    } else d = e();
    if (c)
      return c = !1, f;
    const v = kt(() => n(d, s, f));
    return s = d, v;
  };
}
function qt(e) {
  Ue(() => kt(e));
}
function $e(e) {
  return Pe === null || (Pe.cleanups === null ? Pe.cleanups = [e] : Pe.cleanups.push(e)), e;
}
function Ih() {
  return it;
}
function Kx() {
  return Pe;
}
function Ob(e, n) {
  const i = Pe, o = it;
  Pe = e, it = null;
  try {
    return Er(n, !0);
  } catch (s) {
    k0(s);
  } finally {
    Pe = i, it = o;
  }
}
const [kE, AE] = /* @__PURE__ */ W(!1);
function en(e, n) {
  const i = Symbol("context");
  return {
    id: i,
    Provider: Yx(i),
    defaultValue: e
  };
}
function Ut(e) {
  let n;
  return Pe && Pe.context && (n = Pe.context[e.id]) !== void 0 ? n : e.defaultValue;
}
function C0(e) {
  const n = oe(e), i = oe(() => Yh(n()));
  return i.toArray = () => {
    const o = i();
    return Array.isArray(o) ? o : o != null ? [o] : [];
  }, i;
}
let qx;
function zb() {
  if (this.sources && this.state)
    if (this.state === Tr) oo(this);
    else {
      const e = Kt;
      Kt = null, Er(() => Wc(this), !1), Kt = e;
    }
  if (it) {
    const e = this.observers ? this.observers.length : 0;
    it.sources ? (it.sources.push(this), it.sourceSlots.push(e)) : (it.sources = [this], it.sourceSlots = [e]), this.observers ? (this.observers.push(it), this.observerSlots.push(it.sources.length - 1)) : (this.observers = [it], this.observerSlots = [it.sources.length - 1]);
  }
  return this.value;
}
function Mb(e, n, i) {
  let o = e.value;
  return (!e.comparator || !e.comparator(o, n)) && (e.value = n, e.observers && e.observers.length && Er(() => {
    for (let s = 0; s < e.observers.length; s += 1) {
      const c = e.observers[s], f = hh && hh.running;
      f && hh.disposed.has(c), (f ? !c.tState : !c.state) && (c.pure ? Kt.push(c) : Cr.push(c), c.observers && Rb(c)), f || (c.state = Tr);
    }
    if (Kt.length > 1e6)
      throw Kt = [], new Error();
  }, !1)), n;
}
function oo(e) {
  if (!e.fn) return;
  Ol(e);
  const n = Au;
  Gx(e, e.value, n);
}
function Gx(e, n, i) {
  let o;
  const s = Pe, c = it;
  it = Pe = e;
  try {
    o = e.fn(n);
  } catch (f) {
    return e.pure && (e.state = Tr, e.owned && e.owned.forEach(Ol), e.owned = null), e.updatedAt = i + 1, k0(f);
  } finally {
    it = c, Pe = s;
  }
  (!e.updatedAt || e.updatedAt <= i) && (e.updatedAt != null && "observers" in e ? Mb(e, o) : e.value = o, e.updatedAt = i);
}
function Eu(e, n, i, o = Tr, s) {
  const c = {
    fn: e,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: Pe,
    context: Pe ? Pe.context : null,
    pure: i
  };
  return Pe === null || Pe !== Eb && (Pe.owned ? Pe.owned.push(c) : Pe.owned = [c]), c;
}
function Fc(e) {
  if (e.state === 0) return;
  if (e.state === Qc) return Wc(e);
  if (e.suspense && kt(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Au); )
    e.state && n.push(e);
  for (let i = n.length - 1; i >= 0; i--)
    if (e = n[i], e.state === Tr)
      oo(e);
    else if (e.state === Qc) {
      const o = Kt;
      Kt = null, Er(() => Wc(e, n[0]), !1), Kt = o;
    }
}
function Er(e, n) {
  if (Kt) return e();
  let i = !1;
  n || (Kt = []), Cr ? i = !0 : Cr = [], Au++;
  try {
    const o = e();
    return Px(i), o;
  } catch (o) {
    i || (Cr = null), Kt = null, k0(o);
  }
}
function Px(e) {
  if (Kt && (Db(Kt), Kt = null), e) return;
  const n = Cr;
  Cr = null, n.length && Er(() => Ab(n), !1);
}
function Db(e) {
  for (let n = 0; n < e.length; n++) Fc(e[n]);
}
function Ix(e) {
  let n, i = 0;
  for (n = 0; n < e.length; n++) {
    const o = e[n];
    o.user ? e[i++] = o : Fc(o);
  }
  for (n = 0; n < i; n++) Fc(e[n]);
}
function Wc(e, n) {
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const o = e.sources[i];
    if (o.sources) {
      const s = o.state;
      s === Tr ? o !== n && (!o.updatedAt || o.updatedAt < Au) && Fc(o) : s === Qc && Wc(o, n);
    }
  }
}
function Rb(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const i = e.observers[n];
    i.state || (i.state = Qc, i.pure ? Kt.push(i) : Cr.push(i), i.observers && Rb(i));
  }
}
function Ol(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const i = e.sources.pop(), o = e.sourceSlots.pop(), s = i.observers;
      if (s && s.length) {
        const c = s.pop(), f = i.observerSlots.pop();
        o < s.length && (c.sourceSlots[f] = o, s[o] = c, i.observerSlots[o] = f);
      }
    }
  if (e.tOwned) {
    for (n = e.tOwned.length - 1; n >= 0; n--) Ol(e.tOwned[n]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--) Ol(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Oc(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function k0(e, n = Pe) {
  throw Oc(e);
}
function Yh(e) {
  if (typeof e == "function" && !e.length) return Yh(e());
  if (Array.isArray(e)) {
    const n = [];
    for (let i = 0; i < e.length; i++) {
      const o = Yh(e[i]);
      Array.isArray(o) ? n.push.apply(n, o) : n.push(o);
    }
    return n;
  }
  return e;
}
function Yx(e, n) {
  return function(o) {
    let s;
    return ue(() => s = kt(() => (Pe.context = {
      ...Pe.context,
      [e]: o.value
    }, C0(() => o.children))), void 0), s;
  };
}
const Zh = Symbol("fallback");
function Jc(e) {
  for (let n = 0; n < e.length; n++) e[n]();
}
function Zx(e, n, i = {}) {
  let o = [], s = [], c = [], f = 0, d = n.length > 1 ? [] : null;
  return $e(() => Jc(c)), () => {
    let v = e() || [], g = v.length, p, m;
    return v[Zc], kt(() => {
      let w, C, k, S, E, O, A, D, L;
      if (g === 0)
        f !== 0 && (Jc(c), c = [], o = [], s = [], f = 0, d && (d = [])), i.fallback && (o = [Zh], s[0] = qi((F) => (c[0] = F, i.fallback())), f = 1);
      else if (f === 0) {
        for (s = new Array(g), m = 0; m < g; m++)
          o[m] = v[m], s[m] = qi(_);
        f = g;
      } else {
        for (k = new Array(g), S = new Array(g), d && (E = new Array(g)), O = 0, A = Math.min(f, g); O < A && o[O] === v[O]; O++) ;
        for (A = f - 1, D = g - 1; A >= O && D >= O && o[A] === v[D]; A--, D--)
          k[D] = s[A], S[D] = c[A], d && (E[D] = d[A]);
        for (w = /* @__PURE__ */ new Map(), C = new Array(D + 1), m = D; m >= O; m--)
          L = v[m], p = w.get(L), C[m] = p === void 0 ? -1 : p, w.set(L, m);
        for (p = O; p <= A; p++)
          L = o[p], m = w.get(L), m !== void 0 && m !== -1 ? (k[m] = s[p], S[m] = c[p], d && (E[m] = d[p]), m = C[m], w.set(L, m)) : c[p]();
        for (m = O; m < g; m++)
          m in k ? (s[m] = k[m], c[m] = S[m], d && (d[m] = E[m], d[m](m))) : s[m] = qi(_);
        s = s.slice(0, f = g), o = v.slice(0);
      }
      return s;
    });
    function _(w) {
      if (c[m] = w, d) {
        const [C, k] = W(m);
        return d[m] = k, n(v[m], C);
      }
      return n(v[m]);
    }
  };
}
function Xx(e, n, i = {}) {
  let o = [], s = [], c = [], f = [], d = 0, v;
  return $e(() => Jc(c)), () => {
    const g = e() || [], p = g.length;
    return g[Zc], kt(() => {
      if (p === 0)
        return d !== 0 && (Jc(c), c = [], o = [], s = [], d = 0, f = []), i.fallback && (o = [Zh], s[0] = qi((_) => (c[0] = _, i.fallback())), d = 1), s;
      for (o[0] === Zh && (c[0](), c = [], o = [], s = [], d = 0), v = 0; v < p; v++)
        v < o.length && o[v] !== g[v] ? f[v](() => g[v]) : v >= o.length && (s[v] = qi(m));
      for (; v < o.length; v++)
        c[v]();
      return d = f.length = c.length = p, o = g.slice(0), s = s.slice(0, d);
    });
    function m(_) {
      c[v] = _;
      const [w, C] = W(g[v]);
      return f[v] = C, n(w, v);
    }
  };
}
function b(e, n) {
  return kt(() => e(n || {}));
}
function fc() {
  return !0;
}
const Xh = {
  get(e, n, i) {
    return n === Dn ? i : e.get(n);
  },
  has(e, n) {
    return n === Dn ? !0 : e.has(n);
  },
  set: fc,
  deleteProperty: fc,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: fc,
      deleteProperty: fc
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function vh(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Qx() {
  for (let e = 0, n = this.length; e < n; ++e) {
    const i = this[e]();
    if (i !== void 0) return i;
  }
}
function he(...e) {
  let n = !1;
  for (let f = 0; f < e.length; f++) {
    const d = e[f];
    n = n || !!d && Dn in d, e[f] = typeof d == "function" ? (n = !0, oe(d)) : d;
  }
  if (kb && n)
    return new Proxy({
      get(f) {
        for (let d = e.length - 1; d >= 0; d--) {
          const v = vh(e[d])[f];
          if (v !== void 0) return v;
        }
      },
      has(f) {
        for (let d = e.length - 1; d >= 0; d--)
          if (f in vh(e[d])) return !0;
        return !1;
      },
      keys() {
        const f = [];
        for (let d = 0; d < e.length; d++) f.push(...Object.keys(vh(e[d])));
        return [...new Set(f)];
      }
    }, Xh);
  const i = {}, o = /* @__PURE__ */ Object.create(null);
  for (let f = e.length - 1; f >= 0; f--) {
    const d = e[f];
    if (!d) continue;
    const v = Object.getOwnPropertyNames(d);
    for (let g = v.length - 1; g >= 0; g--) {
      const p = v[g];
      if (p === "__proto__" || p === "constructor") continue;
      const m = Object.getOwnPropertyDescriptor(d, p);
      if (!o[p])
        o[p] = m.get ? {
          enumerable: !0,
          configurable: !0,
          get: Qx.bind(i[p] = [m.get.bind(d)])
        } : m.value !== void 0 ? m : void 0;
      else {
        const _ = i[p];
        _ && (m.get ? _.push(m.get.bind(d)) : m.value !== void 0 && _.push(() => m.value));
      }
    }
  }
  const s = {}, c = Object.keys(o);
  for (let f = c.length - 1; f >= 0; f--) {
    const d = c[f], v = o[d];
    v && v.get ? Object.defineProperty(s, d, v) : s[d] = v ? v.value : void 0;
  }
  return s;
}
function Ke(e, ...n) {
  if (kb && Dn in e) {
    const s = new Set(n.length > 1 ? n.flat() : n[0]), c = n.map((f) => new Proxy({
      get(d) {
        return f.includes(d) ? e[d] : void 0;
      },
      has(d) {
        return f.includes(d) && d in e;
      },
      keys() {
        return f.filter((d) => d in e);
      }
    }, Xh));
    return c.push(new Proxy({
      get(f) {
        return s.has(f) ? void 0 : e[f];
      },
      has(f) {
        return s.has(f) ? !1 : f in e;
      },
      keys() {
        return Object.keys(e).filter((f) => !s.has(f));
      }
    }, Xh)), c;
  }
  const i = {}, o = n.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(e)) {
    const c = Object.getOwnPropertyDescriptor(e, s), f = !c.get && !c.set && c.enumerable && c.writable && c.configurable;
    let d = !1, v = 0;
    for (const g of n)
      g.includes(s) && (d = !0, f ? o[v][s] = c.value : Object.defineProperty(o[v], s, c)), ++v;
    d || (f ? i[s] = c.value : Object.defineProperty(i, s, c));
  }
  return [...o, i];
}
let Fx = 0;
function A0() {
  return `cl-${Fx++}`;
}
const Lb = (e) => `Stale read from <${e}>.`;
function Jn(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return oe(Zx(() => e.each, e.children, n || void 0));
}
function eo(e) {
  const n = "fallback" in e && {
    fallback: () => e.fallback
  };
  return oe(Xx(() => e.each, e.children, n || void 0));
}
function me(e) {
  const n = e.keyed, i = oe(() => e.when, void 0, void 0), o = n ? i : oe(i, void 0, {
    equals: (s, c) => !s == !c
  });
  return oe(() => {
    const s = o();
    if (s) {
      const c = e.children;
      return typeof c == "function" && c.length > 0 ? kt(() => c(n ? s : () => {
        if (!kt(o)) throw Lb("Show");
        return i();
      })) : c;
    }
    return e.fallback;
  }, void 0, void 0);
}
function Ub(e) {
  const n = C0(() => e.children), i = oe(() => {
    const o = n(), s = Array.isArray(o) ? o : [o];
    let c = () => {
    };
    for (let f = 0; f < s.length; f++) {
      const d = f, v = s[f], g = c, p = oe(() => g() ? void 0 : v.when, void 0, void 0), m = v.keyed ? p : oe(p, void 0, {
        equals: (_, w) => !_ == !w
      });
      c = () => g() || (m() ? [d, p, v] : void 0);
    }
    return c;
  });
  return oe(() => {
    const o = i()();
    if (!o) return e.fallback;
    const [s, c, f] = o, d = f.children;
    return typeof d == "function" && d.length > 0 ? kt(() => d(f.keyed ? c() : () => {
      if (kt(i)()?.[0] !== s) throw Lb("Match");
      return c();
    })) : d;
  }, void 0, void 0);
}
function eu(e) {
  return e;
}
const Wx = [
  "allowfullscreen",
  "async",
  "alpha",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "adauctionheaders",
  "browsingtopics",
  "credentialless",
  "defaultchecked",
  "defaultmuted",
  "defaultselected",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback",
  "preservespitch",
  "shadowrootclonable",
  "shadowrootcustomelementregistry",
  "shadowrootdelegatesfocus",
  "shadowrootserializable",
  "sharedstoragewritable"
], Jx = /* @__PURE__ */ new Set([
  "className",
  "value",
  "readOnly",
  "noValidate",
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "adAuctionHeaders",
  "allowFullscreen",
  "browsingTopics",
  "defaultChecked",
  "defaultMuted",
  "defaultSelected",
  "disablePictureInPicture",
  "disableRemotePlayback",
  "preservesPitch",
  "shadowRootClonable",
  "shadowRootCustomElementRegistry",
  "shadowRootDelegatesFocus",
  "shadowRootSerializable",
  "sharedStorageWritable",
  ...Wx
]), e6 = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), t6 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), n6 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  novalidate: {
    $: "noValidate",
    FORM: 1
  },
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  },
  adauctionheaders: {
    $: "adAuctionHeaders",
    IFRAME: 1
  },
  allowfullscreen: {
    $: "allowFullscreen",
    IFRAME: 1
  },
  browsingtopics: {
    $: "browsingTopics",
    IMG: 1
  },
  defaultchecked: {
    $: "defaultChecked",
    INPUT: 1
  },
  defaultmuted: {
    $: "defaultMuted",
    AUDIO: 1,
    VIDEO: 1
  },
  defaultselected: {
    $: "defaultSelected",
    OPTION: 1
  },
  disablepictureinpicture: {
    $: "disablePictureInPicture",
    VIDEO: 1
  },
  disableremoteplayback: {
    $: "disableRemotePlayback",
    AUDIO: 1,
    VIDEO: 1
  },
  preservespitch: {
    $: "preservesPitch",
    AUDIO: 1,
    VIDEO: 1
  },
  shadowrootclonable: {
    $: "shadowRootClonable",
    TEMPLATE: 1
  },
  shadowrootdelegatesfocus: {
    $: "shadowRootDelegatesFocus",
    TEMPLATE: 1
  },
  shadowrootserializable: {
    $: "shadowRootSerializable",
    TEMPLATE: 1
  },
  sharedstoragewritable: {
    $: "sharedStorageWritable",
    IFRAME: 1,
    IMG: 1
  }
});
function r6(e, n) {
  const i = n6[e];
  return typeof i == "object" ? i[n] ? i.$ : void 0 : i;
}
const i6 = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), a6 = /* @__PURE__ */ new Set([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "hkern",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tref",
  "tspan",
  "use",
  "view",
  "vkern"
]), o6 = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
}, ft = (e) => oe(() => e());
function l6(e, n, i) {
  let o = i.length, s = n.length, c = o, f = 0, d = 0, v = n[s - 1].nextSibling, g = null;
  for (; f < s || d < c; ) {
    if (n[f] === i[d]) {
      f++, d++;
      continue;
    }
    for (; n[s - 1] === i[c - 1]; )
      s--, c--;
    if (s === f) {
      const p = c < o ? d ? i[d - 1].nextSibling : i[c - d] : v;
      for (; d < c; ) e.insertBefore(i[d++], p);
    } else if (c === d)
      for (; f < s; )
        (!g || !g.has(n[f])) && n[f].remove(), f++;
    else if (n[f] === i[c - 1] && i[d] === n[s - 1]) {
      const p = n[--s].nextSibling;
      e.insertBefore(i[d++], n[f++].nextSibling), e.insertBefore(i[--c], p), n[s] = i[c];
    } else {
      if (!g) {
        g = /* @__PURE__ */ new Map();
        let m = d;
        for (; m < c; ) g.set(i[m], m++);
      }
      const p = g.get(n[f]);
      if (p != null)
        if (d < p && p < c) {
          let m = f, _ = 1, w;
          for (; ++m < s && m < c && !((w = g.get(n[m])) == null || w !== p + _); )
            _++;
          if (_ > p - d) {
            const C = n[f];
            for (; d < p; ) e.insertBefore(i[d++], C);
          } else e.replaceChild(i[d++], n[f++]);
        } else f++;
      else n[f++].remove();
    }
  }
}
const xy = "_$DX_DELEGATE";
function s6(e, n, i, o = {}) {
  let s;
  return qi((c) => {
    s = c, n === document ? e() : K(n, e(), n.firstChild ? null : void 0, i);
  }, o.owner), () => {
    s(), n.textContent = "";
  };
}
function Z(e, n, i, o) {
  let s;
  const c = () => {
    const d = document.createElement("template");
    return d.innerHTML = e, d.content.firstChild;
  }, f = () => (s || (s = c())).cloneNode(!0);
  return f.cloneNode = f, f;
}
function Un(e, n = window.document) {
  const i = n[xy] || (n[xy] = /* @__PURE__ */ new Set());
  for (let o = 0, s = e.length; o < s; o++) {
    const c = e[o];
    i.has(c) || (i.add(c), n.addEventListener(c, p6));
  }
}
function ct(e, n, i) {
  i == null ? e.removeAttribute(n) : e.setAttribute(n, i);
}
function c6(e, n, i, o) {
  o == null ? e.removeAttributeNS(n, i) : e.setAttributeNS(n, i, o);
}
function u6(e, n, i) {
  i ? e.setAttribute(n, "") : e.removeAttribute(n);
}
function Q(e, n) {
  n == null ? e.removeAttribute("class") : e.className = n;
}
function f6(e, n, i, o) {
  if (o)
    Array.isArray(i) ? (e[`$$${n}`] = i[0], e[`$$${n}Data`] = i[1]) : e[`$$${n}`] = i;
  else if (Array.isArray(i)) {
    const s = i[0];
    e.addEventListener(n, i[0] = (c) => s.call(e, i[1], c));
  } else e.addEventListener(n, i, typeof i != "function" && i);
}
function d6(e, n, i = {}) {
  const o = Object.keys(n || {}), s = Object.keys(i);
  let c, f;
  for (c = 0, f = s.length; c < f; c++) {
    const d = s[c];
    !d || d === "undefined" || n[d] || (Sy(e, d, !1), delete i[d]);
  }
  for (c = 0, f = o.length; c < f; c++) {
    const d = o[c], v = !!n[d];
    !d || d === "undefined" || i[d] === v || !v || (Sy(e, d, !0), i[d] = v);
  }
  return i;
}
function h6(e, n, i) {
  if (!n) return i ? ct(e, "style") : n;
  const o = e.style;
  if (typeof n == "string") return o.cssText = n;
  typeof i == "string" && (o.cssText = i = void 0), i || (i = {}), n || (n = {});
  let s, c;
  for (c in i)
    n[c] == null && o.removeProperty(c), delete i[c];
  for (c in n)
    s = n[c], s !== i[c] && (o.setProperty(c, s), i[c] = s);
  return i;
}
function Se(e, n = {}, i, o) {
  const s = {};
  return o || ue(() => s.children = zl(e, n.children, s.children)), ue(() => typeof n.ref == "function" && kn(n.ref, e)), ue(() => v6(e, n, i, !0, s, !0)), s;
}
function kn(e, n, i) {
  return kt(() => e(n, i));
}
function K(e, n, i, o) {
  if (i !== void 0 && !o && (o = []), typeof n != "function") return zl(e, n, o, i);
  ue((s) => zl(e, n(), s, i), o);
}
function v6(e, n, i, o, s = {}, c = !1) {
  n || (n = {});
  for (const f in s)
    if (!(f in n)) {
      if (f === "children") continue;
      s[f] = Cy(e, f, null, s[f], i, c, n);
    }
  for (const f in n) {
    if (f === "children")
      continue;
    const d = n[f];
    s[f] = Cy(e, f, d, s[f], i, c, n);
  }
}
function g6(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (n, i) => i.toUpperCase());
}
function Sy(e, n, i) {
  const o = n.trim().split(/\s+/);
  for (let s = 0, c = o.length; s < c; s++) e.classList.toggle(o[s], i);
}
function Cy(e, n, i, o, s, c, f) {
  let d, v, g, p, m;
  if (n === "style") return h6(e, i, o);
  if (n === "classList") return d6(e, i, o);
  if (i === o) return o;
  if (n === "ref")
    c || i(e);
  else if (n.slice(0, 3) === "on:") {
    const _ = n.slice(3);
    o && e.removeEventListener(_, o, typeof o != "function" && o), i && e.addEventListener(_, i, typeof i != "function" && i);
  } else if (n.slice(0, 10) === "oncapture:") {
    const _ = n.slice(10);
    o && e.removeEventListener(_, o, !0), i && e.addEventListener(_, i, !0);
  } else if (n.slice(0, 2) === "on") {
    const _ = n.slice(2).toLowerCase(), w = i6.has(_);
    if (!w && o) {
      const C = Array.isArray(o) ? o[0] : o;
      e.removeEventListener(_, C);
    }
    (w || i) && (f6(e, _, i, w), w && Un([_]));
  } else if (n.slice(0, 5) === "attr:")
    ct(e, n.slice(5), i);
  else if (n.slice(0, 5) === "bool:")
    u6(e, n.slice(5), i);
  else if ((m = n.slice(0, 5) === "prop:") || (g = e6.has(n)) || !s && ((p = r6(n, e.tagName)) || (v = Jx.has(n))) || (d = e.nodeName.includes("-") || "is" in f))
    m && (n = n.slice(5), v = !0), n === "class" || n === "className" ? Q(e, i) : d && !v && !g ? e[g6(n)] = i : e[p || n] = i;
  else {
    const _ = s && n.indexOf(":") > -1 && o6[n.split(":")[0]];
    _ ? c6(e, _, n, i) : ct(e, t6[n] || n, i);
  }
  return i;
}
function p6(e) {
  let n = e.target;
  const i = `$$${e.type}`, o = e.target, s = e.currentTarget, c = (v) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: v
  }), f = () => {
    const v = n[i];
    if (v && !n.disabled) {
      const g = n[`${i}Data`];
      if (g !== void 0 ? v.call(n, g, e) : v.call(n, e), e.cancelBubble) return;
    }
    return n.host && typeof n.host != "string" && !n.host._$host && n.contains(e.target) && c(n.host), !0;
  }, d = () => {
    for (; f() && (n = n._$host || n.parentNode || n.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), e.composedPath) {
    const v = e.composedPath();
    c(v[0]);
    for (let g = 0; g < v.length - 2 && (n = v[g], !!f()); g++) {
      if (n._$host) {
        n = n._$host, d();
        break;
      }
      if (n.parentNode === s)
        break;
    }
  } else d();
  c(o);
}
function zl(e, n, i, o, s) {
  for (; typeof i == "function"; ) i = i();
  if (n === i) return i;
  const c = typeof n, f = o !== void 0;
  if (e = f && i[0] && i[0].parentNode || e, c === "string" || c === "number") {
    if (c === "number" && (n = n.toString(), n === i))
      return i;
    if (f) {
      let d = i[0];
      d && d.nodeType === 3 ? d.data !== n && (d.data = n) : d = document.createTextNode(n), i = Ha(e, i, o, d);
    } else
      i !== "" && typeof i == "string" ? i = e.firstChild.data = n : i = e.textContent = n;
  } else if (n == null || c === "boolean")
    i = Ha(e, i, o);
  else {
    if (c === "function")
      return ue(() => {
        let d = n();
        for (; typeof d == "function"; ) d = d();
        i = zl(e, d, i, o);
      }), () => i;
    if (Array.isArray(n)) {
      const d = [], v = i && Array.isArray(i);
      if (Qh(d, n, i, s))
        return ue(() => i = zl(e, d, i, o, !0)), () => i;
      if (d.length === 0) {
        if (i = Ha(e, i, o), f) return i;
      } else v ? i.length === 0 ? ky(e, d, o) : l6(e, i, d) : (i && Ha(e), ky(e, d));
      i = d;
    } else if (n.nodeType) {
      if (Array.isArray(i)) {
        if (f) return i = Ha(e, i, o, n);
        Ha(e, i, null, n);
      } else i == null || i === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      i = n;
    }
  }
  return i;
}
function Qh(e, n, i, o) {
  let s = !1;
  for (let c = 0, f = n.length; c < f; c++) {
    let d = n[c], v = i && i[e.length], g;
    if (!(d == null || d === !0 || d === !1)) if ((g = typeof d) == "object" && d.nodeType)
      e.push(d);
    else if (Array.isArray(d))
      s = Qh(e, d, v) || s;
    else if (g === "function")
      if (o) {
        for (; typeof d == "function"; ) d = d();
        s = Qh(e, Array.isArray(d) ? d : [d], Array.isArray(v) ? v : [v]) || s;
      } else
        e.push(d), s = !0;
    else {
      const p = String(d);
      v && v.nodeType === 3 && v.data === p ? e.push(v) : e.push(document.createTextNode(p));
    }
  }
  return s;
}
function ky(e, n, i = null) {
  for (let o = 0, s = n.length; o < s; o++) e.insertBefore(n[o], i);
}
function Ha(e, n, i, o) {
  if (i === void 0) return e.textContent = "";
  const s = o || document.createTextNode("");
  if (n.length) {
    let c = !1;
    for (let f = n.length - 1; f >= 0; f--) {
      const d = n[f];
      if (s !== d) {
        const v = d.parentNode === e;
        !c && !f ? v ? e.replaceChild(s, d) : e.insertBefore(s, i) : v && d.remove();
      } else c = !0;
    }
  } else e.insertBefore(s, i);
  return [s];
}
const m6 = "http://www.w3.org/2000/svg";
function Hb(e, n = !1, i = void 0) {
  return n ? document.createElementNS(m6, e) : document.createElement(e, {
    is: i
  });
}
function E0(e) {
  const {
    useShadow: n
  } = e, i = document.createTextNode(""), o = () => e.mount || document.body, s = Kx();
  let c;
  return Ue(() => {
    c || (c = Ob(s, () => oe(() => e.children)));
    const f = o();
    if (f instanceof HTMLHeadElement) {
      const [d, v] = W(!1), g = () => v(!0);
      qi((p) => K(f, () => d() ? p() : c(), null)), $e(g);
    } else {
      const d = Hb(e.isSVG ? "g" : "div", e.isSVG), v = n && d.attachShadow ? d.attachShadow({
        mode: "open"
      }) : d;
      Object.defineProperty(d, "_$host", {
        get() {
          return i.parentNode;
        },
        configurable: !0
      }), K(v, c), f.appendChild(d), e.ref && e.ref(d), $e(() => f.removeChild(d));
    }
  }, void 0, {
    render: !0
  }), i;
}
function y6(e, n) {
  const i = oe(e);
  return oe(() => {
    const o = i();
    switch (typeof o) {
      case "function":
        return kt(() => o(n));
      case "string":
        const s = a6.has(o), c = Hb(o, s, kt(() => n.is));
        return Se(c, n, s), c;
    }
  });
}
function lo(e) {
  const [, n] = Ke(e, ["component"]);
  return y6(() => e.component, n);
}
const Fh = Symbol("store-raw"), Pa = Symbol("store-node"), xr = Symbol("store-has"), Bb = Symbol("store-self");
function Vb(e) {
  let n = e[Dn];
  if (!n && (Object.defineProperty(e, Dn, {
    value: n = new Proxy(e, _6)
  }), !Array.isArray(e))) {
    const i = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let s = 0, c = i.length; s < c; s++) {
      const f = i[s];
      o[f].get && Object.defineProperty(e, f, {
        enumerable: o[f].enumerable,
        get: o[f].get.bind(n)
      });
    }
  }
  return n;
}
function tu(e) {
  let n;
  return e != null && typeof e == "object" && (e[Dn] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e));
}
function Ml(e, n = /* @__PURE__ */ new Set()) {
  let i, o, s, c;
  if (i = e != null && e[Fh]) return i;
  if (!tu(e) || n.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
    for (let f = 0, d = e.length; f < d; f++)
      s = e[f], (o = Ml(s, n)) !== s && (e[f] = o);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
    const f = Object.keys(e), d = Object.getOwnPropertyDescriptors(e);
    for (let v = 0, g = f.length; v < g; v++)
      c = f[v], !d[c].get && (s = e[c], (o = Ml(s, n)) !== s && (e[c] = o));
  }
  return e;
}
function nu(e, n) {
  let i = e[n];
  return i || Object.defineProperty(e, n, {
    value: i = /* @__PURE__ */ Object.create(null)
  }), i;
}
function Dl(e, n, i) {
  if (e[n]) return e[n];
  const [o, s] = W(i, {
    equals: !1,
    internal: !0
  });
  return o.$ = s, e[n] = o;
}
function b6(e, n) {
  const i = Reflect.getOwnPropertyDescriptor(e, n);
  return !i || i.get || !i.configurable || n === Dn || n === Pa || (delete i.value, delete i.writable, i.get = () => e[Dn][n]), i;
}
function jb(e) {
  Ih() && Dl(nu(e, Pa), Bb)();
}
function w6(e) {
  return jb(e), Reflect.ownKeys(e);
}
const _6 = {
  get(e, n, i) {
    if (n === Fh) return e;
    if (n === Dn) return i;
    if (n === Zc)
      return jb(e), i;
    const o = nu(e, Pa), s = o[n];
    let c = s ? s() : e[n];
    if (n === Pa || n === xr || n === "__proto__") return c;
    if (!s) {
      const f = Object.getOwnPropertyDescriptor(e, n);
      Ih() && (typeof c != "function" || e.hasOwnProperty(n)) && !(f && f.get) && (c = Dl(o, n, c)());
    }
    return tu(c) ? Vb(c) : c;
  },
  has(e, n) {
    return n === Fh || n === Dn || n === Zc || n === Pa || n === xr || n === "__proto__" ? !0 : (Ih() && Dl(nu(e, xr), n)(), n in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: w6,
  getOwnPropertyDescriptor: b6
};
function ru(e, n, i, o = !1) {
  if (!o && e[n] === i) return;
  const s = e[n], c = e.length;
  i === void 0 ? (delete e[n], e[xr] && e[xr][n] && s !== void 0 && e[xr][n].$()) : (e[n] = i, e[xr] && e[xr][n] && s === void 0 && e[xr][n].$());
  let f = nu(e, Pa), d;
  if ((d = Dl(f, n, s)) && d.$(() => i), Array.isArray(e) && e.length !== c) {
    for (let v = e.length; v < c; v++) (d = f[v]) && d.$();
    (d = Dl(f, "length", c)) && d.$(e.length);
  }
  (d = f[Bb]) && d.$();
}
function $b(e, n) {
  const i = Object.keys(n);
  for (let o = 0; o < i.length; o += 1) {
    const s = i[o];
    ru(e, s, n[s]);
  }
}
function x6(e, n) {
  if (typeof n == "function" && (n = n(e)), n = Ml(n), Array.isArray(n)) {
    if (e === n) return;
    let i = 0, o = n.length;
    for (; i < o; i++) {
      const s = n[i];
      e[i] !== s && ru(e, i, s);
    }
    ru(e, "length", o);
  } else $b(e, n);
}
function wl(e, n, i = []) {
  let o, s = e;
  if (n.length > 1) {
    o = n.shift();
    const f = typeof o, d = Array.isArray(e);
    if (Array.isArray(o)) {
      for (let v = 0; v < o.length; v++)
        wl(e, [o[v]].concat(n), i);
      return;
    } else if (d && f === "function") {
      for (let v = 0; v < e.length; v++)
        o(e[v], v) && wl(e, [v].concat(n), i);
      return;
    } else if (d && f === "object") {
      const {
        from: v = 0,
        to: g = e.length - 1,
        by: p = 1
      } = o;
      for (let m = v; m <= g; m += p)
        wl(e, [m].concat(n), i);
      return;
    } else if (n.length > 1) {
      wl(e[o], n, [o].concat(i));
      return;
    }
    s = e[o], i = [o].concat(i);
  }
  let c = n[0];
  typeof c == "function" && (c = c(s, i), c === s) || o === void 0 && c == null || (c = Ml(c), o === void 0 || tu(s) && tu(c) && !Array.isArray(c) ? $b(s, c) : ru(e, o, c));
}
function S6(...[e, n]) {
  const i = Ml(e || {}), o = Array.isArray(i), s = Vb(i);
  function c(...f) {
    Nb(() => {
      o && f.length === 1 ? x6(i, f[0]) : wl(i, f);
    });
  }
  return [s, c];
}
function Kb(e) {
  var n, i, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (n = 0; n < s; n++) e[n] && (i = Kb(e[n])) && (o && (o += " "), o += i);
  } else for (i in e) e[i] && (o && (o += " "), o += i);
  return o;
}
function qb() {
  for (var e, n, i = 0, o = "", s = arguments.length; i < s; i++) (e = arguments[i]) && (n = Kb(e)) && (o && (o += " "), o += n);
  return o;
}
const T0 = "-", C6 = (e) => {
  const n = A6(e), {
    conflictingClassGroups: i,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (f) => {
      const d = f.split(T0);
      return d[0] === "" && d.length !== 1 && d.shift(), Gb(d, n) || k6(f);
    },
    getConflictingClassGroupIds: (f, d) => {
      const v = i[f] || [];
      return d && o[f] ? [...v, ...o[f]] : v;
    }
  };
}, Gb = (e, n) => {
  if (e.length === 0)
    return n.classGroupId;
  const i = e[0], o = n.nextPart.get(i), s = o ? Gb(e.slice(1), o) : void 0;
  if (s)
    return s;
  if (n.validators.length === 0)
    return;
  const c = e.join(T0);
  return n.validators.find(({
    validator: f
  }) => f(c))?.classGroupId;
}, Ay = /^\[(.+)\]$/, k6 = (e) => {
  if (Ay.test(e)) {
    const n = Ay.exec(e)[1], i = n?.substring(0, n.indexOf(":"));
    if (i)
      return "arbitrary.." + i;
  }
}, A6 = (e) => {
  const {
    theme: n,
    prefix: i
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return T6(Object.entries(e.classGroups), i).forEach(([c, f]) => {
    Wh(f, o, c, n);
  }), o;
}, Wh = (e, n, i, o) => {
  e.forEach((s) => {
    if (typeof s == "string") {
      const c = s === "" ? n : Ey(n, s);
      c.classGroupId = i;
      return;
    }
    if (typeof s == "function") {
      if (E6(s)) {
        Wh(s(o), n, i, o);
        return;
      }
      n.validators.push({
        validator: s,
        classGroupId: i
      });
      return;
    }
    Object.entries(s).forEach(([c, f]) => {
      Wh(f, Ey(n, c), i, o);
    });
  });
}, Ey = (e, n) => {
  let i = e;
  return n.split(T0).forEach((o) => {
    i.nextPart.has(o) || i.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), i = i.nextPart.get(o);
  }), i;
}, E6 = (e) => e.isThemeGetter, T6 = (e, n) => n ? e.map(([i, o]) => {
  const s = o.map((c) => typeof c == "string" ? n + c : typeof c == "object" ? Object.fromEntries(Object.entries(c).map(([f, d]) => [n + f, d])) : c);
  return [i, s];
}) : e, N6 = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const s = (c, f) => {
    i.set(c, f), n++, n > e && (n = 0, o = i, i = /* @__PURE__ */ new Map());
  };
  return {
    get(c) {
      let f = i.get(c);
      if (f !== void 0)
        return f;
      if ((f = o.get(c)) !== void 0)
        return s(c, f), f;
    },
    set(c, f) {
      i.has(c) ? i.set(c, f) : s(c, f);
    }
  };
}, Pb = "!", O6 = (e) => {
  const {
    separator: n,
    experimentalParseClassName: i
  } = e, o = n.length === 1, s = n[0], c = n.length, f = (d) => {
    const v = [];
    let g = 0, p = 0, m;
    for (let S = 0; S < d.length; S++) {
      let E = d[S];
      if (g === 0) {
        if (E === s && (o || d.slice(S, S + c) === n)) {
          v.push(d.slice(p, S)), p = S + c;
          continue;
        }
        if (E === "/") {
          m = S;
          continue;
        }
      }
      E === "[" ? g++ : E === "]" && g--;
    }
    const _ = v.length === 0 ? d : d.substring(p), w = _.startsWith(Pb), C = w ? _.substring(1) : _, k = m && m > p ? m - p : void 0;
    return {
      modifiers: v,
      hasImportantModifier: w,
      baseClassName: C,
      maybePostfixModifierPosition: k
    };
  };
  return i ? (d) => i({
    className: d,
    parseClassName: f
  }) : f;
}, z6 = (e) => {
  if (e.length <= 1)
    return e;
  const n = [];
  let i = [];
  return e.forEach((o) => {
    o[0] === "[" ? (n.push(...i.sort(), o), i = []) : i.push(o);
  }), n.push(...i.sort()), n;
}, M6 = (e) => ({
  cache: N6(e.cacheSize),
  parseClassName: O6(e),
  ...C6(e)
}), D6 = /\s+/, R6 = (e, n) => {
  const {
    parseClassName: i,
    getClassGroupId: o,
    getConflictingClassGroupIds: s
  } = n, c = [], f = e.trim().split(D6);
  let d = "";
  for (let v = f.length - 1; v >= 0; v -= 1) {
    const g = f[v], {
      modifiers: p,
      hasImportantModifier: m,
      baseClassName: _,
      maybePostfixModifierPosition: w
    } = i(g);
    let C = !!w, k = o(C ? _.substring(0, w) : _);
    if (!k) {
      if (!C) {
        d = g + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (k = o(_), !k) {
        d = g + (d.length > 0 ? " " + d : d);
        continue;
      }
      C = !1;
    }
    const S = z6(p).join(":"), E = m ? S + Pb : S, O = E + k;
    if (c.includes(O))
      continue;
    c.push(O);
    const A = s(k, C);
    for (let D = 0; D < A.length; ++D) {
      const L = A[D];
      c.push(E + L);
    }
    d = g + (d.length > 0 ? " " + d : d);
  }
  return d;
};
function L6() {
  let e = 0, n, i, o = "";
  for (; e < arguments.length; )
    (n = arguments[e++]) && (i = Ib(n)) && (o && (o += " "), o += i);
  return o;
}
const Ib = (e) => {
  if (typeof e == "string")
    return e;
  let n, i = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (n = Ib(e[o])) && (i && (i += " "), i += n);
  return i;
};
function Ty(e, ...n) {
  let i, o, s, c = f;
  function f(v) {
    const g = n.reduce((p, m) => m(p), e());
    return i = M6(g), o = i.cache.get, s = i.cache.set, c = d, d(v);
  }
  function d(v) {
    const g = o(v);
    if (g)
      return g;
    const p = R6(v, i);
    return s(v, p), p;
  }
  return function() {
    return c(L6.apply(null, arguments));
  };
}
const ot = (e) => {
  const n = (i) => i[e] || [];
  return n.isThemeGetter = !0, n;
}, Yb = /^\[(?:([a-z-]+):)?(.+)\]$/i, U6 = /^\d+\/\d+$/, H6 = /* @__PURE__ */ new Set(["px", "full", "screen"]), B6 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, V6 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, j6 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, $6 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, K6 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, wr = (e) => Ia(e) || H6.has(e) || U6.test(e), ti = (e) => so(e, "length", Q6), Ia = (e) => !!e && !Number.isNaN(Number(e)), gh = (e) => so(e, "number", Ia), hl = (e) => !!e && Number.isInteger(Number(e)), q6 = (e) => e.endsWith("%") && Ia(e.slice(0, -1)), Ne = (e) => Yb.test(e), ni = (e) => B6.test(e), G6 = /* @__PURE__ */ new Set(["length", "size", "percentage"]), P6 = (e) => so(e, G6, Zb), I6 = (e) => so(e, "position", Zb), Y6 = /* @__PURE__ */ new Set(["image", "url"]), Z6 = (e) => so(e, Y6, W6), X6 = (e) => so(e, "", F6), vl = () => !0, so = (e, n, i) => {
  const o = Yb.exec(e);
  return o ? o[1] ? typeof n == "string" ? o[1] === n : n.has(o[1]) : i(o[2]) : !1;
}, Q6 = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  V6.test(e) && !j6.test(e)
), Zb = () => !1, F6 = (e) => $6.test(e), W6 = (e) => K6.test(e), Ny = () => {
  const e = ot("colors"), n = ot("spacing"), i = ot("blur"), o = ot("brightness"), s = ot("borderColor"), c = ot("borderRadius"), f = ot("borderSpacing"), d = ot("borderWidth"), v = ot("contrast"), g = ot("grayscale"), p = ot("hueRotate"), m = ot("invert"), _ = ot("gap"), w = ot("gradientColorStops"), C = ot("gradientColorStopPositions"), k = ot("inset"), S = ot("margin"), E = ot("opacity"), O = ot("padding"), A = ot("saturate"), D = ot("scale"), L = ot("sepia"), F = ot("skew"), Y = ot("space"), ie = ot("translate"), X = () => ["auto", "contain", "none"], fe = () => ["auto", "hidden", "clip", "visible", "scroll"], le = () => ["auto", Ne, n], ee = () => [Ne, n], we = () => ["", wr, ti], Ee = () => ["auto", Ia, Ne], Oe = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], j = () => ["solid", "dashed", "dotted", "double", "none"], te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ae = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Ae = () => ["", "0", Ne], z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], $ = () => [Ia, Ne];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [vl],
      spacing: [wr, ti],
      blur: ["none", "", ni, Ne],
      brightness: $(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ni, Ne],
      borderSpacing: ee(),
      borderWidth: we(),
      contrast: $(),
      grayscale: Ae(),
      hueRotate: $(),
      invert: Ae(),
      gap: ee(),
      gradientColorStops: [e],
      gradientColorStopPositions: [q6, ti],
      inset: le(),
      margin: le(),
      opacity: $(),
      padding: ee(),
      saturate: $(),
      scale: $(),
      sepia: Ae(),
      skew: $(),
      space: ee(),
      translate: ee()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", Ne]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ni]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": z()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": z()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Oe(), Ne]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: fe()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": fe()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": fe()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: X()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": X()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": X()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [k]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [k]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [k]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [k]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [k]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [k]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [k]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [k]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [k]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", hl, Ne]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: le()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", Ne]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Ae()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Ae()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", hl, Ne]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [vl]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", hl, Ne]
        }, Ne]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Ee()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Ee()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [vl]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [hl, Ne]
        }, Ne]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Ee()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Ee()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", Ne]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", Ne]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [_]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [_]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [_]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...ae()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ae(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...ae(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [O]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [O]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [O]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [O]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [O]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [O]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [O]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [O]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [O]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [S]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [S]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [S]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [S]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [S]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [S]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [S]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [S]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [S]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [Y]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [Y]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Ne, n]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [Ne, n, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [Ne, n, "none", "full", "min", "max", "fit", "prose", {
          screen: [ni]
        }, ni]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [Ne, n, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [Ne, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [Ne, n, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [Ne, n, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ni, ti]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", gh]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [vl]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Ne]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ia, gh]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", wr, Ne]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Ne]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", Ne]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [E]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [E]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...j(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", wr, ti]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", wr, Ne]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: ee()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Ne]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", Ne]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [E]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Oe(), I6]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", P6]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Z6]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [C]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [C]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [C]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [w]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [w]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [w]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [c]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [c]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [c]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [c]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [c]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [c]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [c]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [c]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [c]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [c]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [c]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [c]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [c]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [c]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [c]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [d]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [d]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [d]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [d]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [d]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [d]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [d]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [d]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [d]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [E]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...j(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [d]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [d]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [E]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: j()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [s]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [s]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [s]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [s]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [s]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [s]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [s]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [s]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [s]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [s]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...j()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [wr, Ne]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [wr, ti]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: we()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [E]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [wr, ti]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", ni, X6]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [vl]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [E]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...te(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": te()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [i]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [v]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ni, Ne]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [g]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [m]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [A]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [L]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [i]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [v]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [g]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [m]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [E]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [A]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [L]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [f]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [f]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [f]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Ne]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: $()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", Ne]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: $()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", Ne]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [D]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [D]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [D]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [hl, Ne]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [ie]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [ie]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [F]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [F]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Ne]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Ne]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": ee()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": ee()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": ee()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": ee()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": ee()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": ee()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": ee()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": ee()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": ee()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": ee()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": ee()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": ee()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": ee()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": ee()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": ee()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": ee()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": ee()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": ee()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", Ne]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [wr, ti, gh]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, J6 = (e, {
  cacheSize: n,
  prefix: i,
  separator: o,
  experimentalParseClassName: s,
  extend: c = {},
  override: f = {}
}) => {
  _l(e, "cacheSize", n), _l(e, "prefix", i), _l(e, "separator", o), _l(e, "experimentalParseClassName", s);
  for (const d in f)
    e9(e[d], f[d]);
  for (const d in c)
    t9(e[d], c[d]);
  return e;
}, _l = (e, n, i) => {
  i !== void 0 && (e[n] = i);
}, e9 = (e, n) => {
  if (n)
    for (const i in n)
      _l(e, i, n[i]);
}, t9 = (e, n) => {
  if (n)
    for (const i in n) {
      const o = n[i];
      o !== void 0 && (e[i] = (e[i] || []).concat(o));
    }
}, Xb = (e, ...n) => typeof e == "function" ? Ty(Ny, e, ...n) : Ty(() => J6(Ny(), e), ...n);
function n9(e) {
  return (...n) => {
    for (const i of e)
      i && i(...n);
  };
}
const et = (e) => typeof e == "function" && !e.length ? e() : e;
function r9(e, ...n) {
  return typeof e == "function" ? e(...n) : e;
}
const i9 = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
function Oy(e) {
  const n = {};
  let i;
  for (; i = i9.exec(e); )
    n[i[1]] = i[2];
  return n;
}
function Qb(e, n) {
  if (typeof e == "string") {
    if (typeof n == "string")
      return `${e};${n}`;
    e = Oy(e);
  } else typeof n == "string" && (n = Oy(n));
  return { ...e, ...n };
}
function Fb(e, n) {
  e.indexOf(n) === -1 && e.push(n);
}
function a9(e, n) {
  const i = e.indexOf(n);
  i > -1 && e.splice(i, 1);
}
const Wb = (e, n, i) => Math.min(Math.max(i, e), n), Mn = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
}, Rl = (e) => typeof e == "number", Ya = (e) => Array.isArray(e) && !Rl(e[0]), o9 = (e, n, i) => {
  const o = n - e;
  return ((i - e) % o + o) % o + e;
};
function l9(e, n) {
  return Ya(e) ? e[o9(0, e.length, n)] : e;
}
const Jb = (e, n, i) => -i * e + i * n + e, e2 = () => {
}, si = (e) => e, N0 = (e, n, i) => n - e === 0 ? 1 : (i - e) / (n - e);
function t2(e, n) {
  const i = e[e.length - 1];
  for (let o = 1; o <= n; o++) {
    const s = N0(0, n, o);
    e.push(Jb(i, 1, s));
  }
}
function s9(e) {
  const n = [0];
  return t2(n, e - 1), n;
}
function c9(e, n = s9(e.length), i = si) {
  const o = e.length, s = o - n.length;
  return s > 0 && t2(n, s), (c) => {
    let f = 0;
    for (; f < o - 2 && !(c < n[f + 1]); f++)
      ;
    let d = Wb(0, 1, N0(n[f], n[f + 1], c));
    return d = l9(i, f)(d), Jb(e[f], e[f + 1], d);
  };
}
const n2 = (e) => Array.isArray(e) && Rl(e[0]), Jh = (e) => typeof e == "object" && !!e.createAnimation, Ll = (e) => typeof e == "function", u9 = (e) => typeof e == "string", ph = {
  ms: (e) => e * 1e3,
  s: (e) => e / 1e3
}, r2 = (e, n, i) => (((1 - 3 * i + 3 * n) * e + (3 * i - 6 * n)) * e + 3 * n) * e, f9 = 1e-7, d9 = 12;
function h9(e, n, i, o, s) {
  let c, f, d = 0;
  do
    f = n + (i - n) / 2, c = r2(f, o, s) - e, c > 0 ? i = f : n = f;
  while (Math.abs(c) > f9 && ++d < d9);
  return f;
}
function xl(e, n, i, o) {
  if (e === n && i === o)
    return si;
  const s = (c) => h9(c, 0, 1, e, i);
  return (c) => c === 0 || c === 1 ? c : r2(s(c), n, o);
}
const v9 = (e, n = "end") => (i) => {
  i = n === "end" ? Math.min(i, 0.999) : Math.max(i, 1e-3);
  const o = i * e, s = n === "end" ? Math.floor(o) : Math.ceil(o);
  return Wb(0, 1, s / e);
}, g9 = {
  ease: xl(0.25, 0.1, 0.25, 1),
  "ease-in": xl(0.42, 0, 1, 1),
  "ease-in-out": xl(0.42, 0, 0.58, 1),
  "ease-out": xl(0, 0, 0.58, 1)
}, p9 = /\((.*?)\)/;
function zy(e) {
  if (Ll(e))
    return e;
  if (n2(e))
    return xl(...e);
  const n = g9[e];
  if (n)
    return n;
  if (e.startsWith("steps")) {
    const i = p9.exec(e);
    if (i) {
      const o = i[1].split(",");
      return v9(parseFloat(o[0]), o[1].trim());
    }
  }
  return si;
}
class m9 {
  constructor(n, i = [0, 1], { easing: o, duration: s = Mn.duration, delay: c = Mn.delay, endDelay: f = Mn.endDelay, repeat: d = Mn.repeat, offset: v, direction: g = "normal", autoplay: p = !0 } = {}) {
    if (this.startTime = null, this.rate = 1, this.t = 0, this.cancelTimestamp = null, this.easing = si, this.duration = 0, this.totalDuration = 0, this.repeat = 0, this.playState = "idle", this.finished = new Promise((_, w) => {
      this.resolve = _, this.reject = w;
    }), o = o || Mn.easing, Jh(o)) {
      const _ = o.createAnimation(i);
      o = _.easing, i = _.keyframes || i, s = _.duration || s;
    }
    this.repeat = d, this.easing = Ya(o) ? si : zy(o), this.updateDuration(s);
    const m = c9(i, v, Ya(o) ? o.map(zy) : si);
    this.tick = (_) => {
      var w;
      c = c;
      let C = 0;
      this.pauseTime !== void 0 ? C = this.pauseTime : C = (_ - this.startTime) * this.rate, this.t = C, C /= 1e3, C = Math.max(C - c, 0), this.playState === "finished" && this.pauseTime === void 0 && (C = this.totalDuration);
      const k = C / this.duration;
      let S = Math.floor(k), E = k % 1;
      !E && k >= 1 && (E = 1), E === 1 && S--;
      const O = S % 2;
      (g === "reverse" || g === "alternate" && O || g === "alternate-reverse" && !O) && (E = 1 - E);
      const A = C >= this.totalDuration ? 1 : Math.min(E, 1), D = m(this.easing(A));
      n(D), this.pauseTime === void 0 && (this.playState === "finished" || C >= this.totalDuration + f) ? (this.playState = "finished", (w = this.resolve) === null || w === void 0 || w.call(this, D)) : this.playState !== "idle" && (this.frameRequestId = requestAnimationFrame(this.tick));
    }, p && this.play();
  }
  play() {
    const n = performance.now();
    this.playState = "running", this.pauseTime !== void 0 ? this.startTime = n - this.pauseTime : this.startTime || (this.startTime = n), this.cancelTimestamp = this.startTime, this.pauseTime = void 0, this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused", this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished", this.tick(0);
  }
  stop() {
    var n;
    this.playState = "idle", this.frameRequestId !== void 0 && cancelAnimationFrame(this.frameRequestId), (n = this.reject) === null || n === void 0 || n.call(this, !1);
  }
  cancel() {
    this.stop(), this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(n) {
    this.duration = n, this.totalDuration = n * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(n) {
    this.pauseTime !== void 0 || this.rate === 0 ? this.pauseTime = n : this.startTime = performance.now() - n / this.rate;
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(n) {
    this.rate = n;
  }
}
class y9 {
  setAnimation(n) {
    this.animation = n, n?.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const mh = /* @__PURE__ */ new WeakMap();
function i2(e) {
  return mh.has(e) || mh.set(e, {
    transforms: [],
    values: /* @__PURE__ */ new Map()
  }), mh.get(e);
}
function b9(e, n) {
  return e.has(n) || e.set(n, new y9()), e.get(n);
}
const w9 = ["", "X", "Y", "Z"], _9 = ["translate", "scale", "rotate", "skew"], to = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
}, My = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (e) => e + "deg"
}, x9 = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (e) => e + "px"
  },
  rotate: My,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: si
  },
  skew: My
}, no = /* @__PURE__ */ new Map(), Tu = (e) => `--motion-${e}`, iu = ["x", "y", "z"];
_9.forEach((e) => {
  w9.forEach((n) => {
    iu.push(e + n), no.set(Tu(e + n), x9[e]);
  });
});
const S9 = (e, n) => iu.indexOf(e) - iu.indexOf(n), C9 = new Set(iu), O0 = (e) => C9.has(e), k9 = (e, n) => {
  to[n] && (n = to[n]);
  const { transforms: i } = i2(e);
  Fb(i, n), e.style.transform = a2(i);
}, a2 = (e) => e.sort(S9).reduce(A9, "").trim(), A9 = (e, n) => `${e} ${n}(var(${Tu(n)}))`, e0 = (e) => e.startsWith("--"), Dy = /* @__PURE__ */ new Set();
function E9(e) {
  if (!Dy.has(e)) {
    Dy.add(e);
    try {
      const { syntax: n, initialValue: i } = no.has(e) ? no.get(e) : {};
      CSS.registerProperty({
        name: e,
        inherits: !1,
        syntax: n,
        initialValue: i
      });
    } catch {
    }
  }
}
const yh = (e, n) => document.createElement("div").animate(e, n), Ry = {
  cssRegisterProperty: () => typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      yh({ opacity: [1] });
    } catch {
      return !1;
    }
    return !0;
  },
  finished: () => !!yh({ opacity: [0, 1] }, { duration: 1e-3 }).finished,
  linearEasing: () => {
    try {
      yh({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }
}, bh = {}, qa = {};
for (const e in Ry)
  qa[e] = () => (bh[e] === void 0 && (bh[e] = Ry[e]()), bh[e]);
const T9 = 0.015, N9 = (e, n) => {
  let i = "";
  const o = Math.round(n / T9);
  for (let s = 0; s < o; s++)
    i += e(N0(0, o - 1, s)) + ", ";
  return i.substring(0, i.length - 2);
}, Ly = (e, n) => Ll(e) ? qa.linearEasing() ? `linear(${N9(e, n)})` : Mn.easing : n2(e) ? O9(e) : e, O9 = ([e, n, i, o]) => `cubic-bezier(${e}, ${n}, ${i}, ${o})`;
function z9(e, n) {
  for (let i = 0; i < e.length; i++)
    e[i] === null && (e[i] = i ? e[i - 1] : n());
  return e;
}
const M9 = (e) => Array.isArray(e) ? e : [e];
function t0(e) {
  return to[e] && (e = to[e]), O0(e) ? Tu(e) : e;
}
const Sl = {
  get: (e, n) => {
    n = t0(n);
    let i = e0(n) ? e.style.getPropertyValue(n) : getComputedStyle(e)[n];
    if (!i && i !== 0) {
      const o = no.get(n);
      o && (i = o.initialValue);
    }
    return i;
  },
  set: (e, n, i) => {
    n = t0(n), e0(n) ? e.style.setProperty(n, i) : e.style[n] = i;
  }
};
function D9(e, n = !0) {
  if (!(!e || e.playState === "finished"))
    try {
      e.stop ? e.stop() : (n && e.commitStyles(), e.cancel());
    } catch {
    }
}
function R9(e, n) {
  var i;
  let o = n?.toDefaultUnit || si;
  const s = e[e.length - 1];
  if (u9(s)) {
    const c = ((i = s.match(/(-?[\d.]+)([a-z%]*)/)) === null || i === void 0 ? void 0 : i[2]) || "";
    c && (o = (f) => f + c);
  }
  return o;
}
function L9() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function U9(e, n, i, o = {}, s) {
  const c = L9(), f = o.record !== !1 && c;
  let d, { duration: v = Mn.duration, delay: g = Mn.delay, endDelay: p = Mn.endDelay, repeat: m = Mn.repeat, easing: _ = Mn.easing, persist: w = !1, direction: C, offset: k, allowWebkitAcceleration: S = !1, autoplay: E = !0 } = o;
  const O = i2(e), A = O0(n);
  let D = qa.waapi();
  A && k9(e, n);
  const L = t0(n), F = b9(O.values, L), Y = no.get(L);
  return D9(F.animation, !(Jh(_) && F.generator) && o.record !== !1), () => {
    const ie = () => {
      var le, ee;
      return (ee = (le = Sl.get(e, L)) !== null && le !== void 0 ? le : Y?.initialValue) !== null && ee !== void 0 ? ee : 0;
    };
    let X = z9(M9(i), ie);
    const fe = R9(X, Y);
    if (Jh(_)) {
      const le = _.createAnimation(X, n !== "opacity", ie, L, F);
      _ = le.easing, X = le.keyframes || X, v = le.duration || v;
    }
    if (e0(L) && (qa.cssRegisterProperty() ? E9(L) : D = !1), A && !qa.linearEasing() && (Ll(_) || Ya(_) && _.some(Ll)) && (D = !1), D) {
      Y && (X = X.map((we) => Rl(we) ? Y.toDefaultUnit(we) : we)), X.length === 1 && (!qa.partialKeyframes() || f) && X.unshift(ie());
      const le = {
        delay: ph.ms(g),
        duration: ph.ms(v),
        endDelay: ph.ms(p),
        easing: Ya(_) ? void 0 : Ly(_, v),
        direction: C,
        iterations: m + 1,
        fill: "both"
      };
      d = e.animate({
        [L]: X,
        offset: k,
        easing: Ya(_) ? _.map((we) => Ly(we, v)) : void 0
      }, le), d.finished || (d.finished = new Promise((we, Ee) => {
        d.onfinish = we, d.oncancel = Ee;
      }));
      const ee = X[X.length - 1];
      d.finished.then(() => {
        w || (Sl.set(e, L, ee), d.cancel());
      }).catch(e2), S || (d.playbackRate = 1.000001);
    } else if (s && A)
      X = X.map((le) => typeof le == "string" ? parseFloat(le) : le), X.length === 1 && X.unshift(parseFloat(ie())), d = new s((le) => {
        Sl.set(e, L, fe ? fe(le) : le);
      }, X, Object.assign(Object.assign({}, o), {
        duration: v,
        easing: _
      }));
    else {
      const le = X[X.length - 1];
      Sl.set(e, L, Y && Rl(le) ? Y.toDefaultUnit(le) : le);
    }
    return f && c(e, n, X, {
      duration: v,
      delay: g,
      easing: _,
      repeat: m,
      offset: k
    }, "motion-one"), F.setAnimation(d), d && !E && d.pause(), d;
  };
}
const H9 = (e, n) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  e[n] ? Object.assign(Object.assign({}, e), e[n]) : Object.assign({}, e)
);
function B9(e, n) {
  return typeof e == "string" ? e = document.querySelectorAll(e) : e instanceof Element && (e = [e]), Array.from(e || []);
}
function o2(e, n) {
  var i = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && n.indexOf(o) < 0 && (i[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, o = Object.getOwnPropertySymbols(e); s < o.length; s++)
      n.indexOf(o[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[s]) && (i[o[s]] = e[o[s]]);
  return i;
}
const V9 = {
  any: 0,
  all: 1
};
function j9(e, n, { root: i, margin: o, amount: s = "any" } = {}) {
  if (typeof IntersectionObserver > "u")
    return () => {
    };
  const c = B9(e), f = /* @__PURE__ */ new WeakMap(), d = (g) => {
    g.forEach((p) => {
      const m = f.get(p.target);
      if (p.isIntersecting !== !!m)
        if (p.isIntersecting) {
          const _ = n(p);
          Ll(_) ? f.set(p.target, _) : v.unobserve(p.target);
        } else m && (m(p), f.delete(p.target));
    });
  }, v = new IntersectionObserver(d, {
    root: i,
    rootMargin: o,
    threshold: typeof s == "number" ? s : V9[s]
  });
  return c.forEach((g) => v.observe(g)), () => v.disconnect();
}
function $9(e, n) {
  return typeof e != typeof n ? !0 : Array.isArray(e) && Array.isArray(n) ? !K9(e, n) : e !== n;
}
function K9(e, n) {
  const i = n.length;
  if (i !== e.length)
    return !1;
  for (let o = 0; o < i; o++)
    if (n[o] !== e[o])
      return !1;
  return !0;
}
function q9(e) {
  return typeof e == "object";
}
function Uy(e, n) {
  if (q9(e))
    return e;
  if (e && n)
    return n[e];
}
let ci;
function G9() {
  if (!ci)
    return;
  const e = ci.sort(I9).map(Y9);
  e.forEach(Hy), e.forEach(Hy), ci = void 0;
}
function wh(e) {
  ci ? Fb(ci, e) : (ci = [e], requestAnimationFrame(G9));
}
function P9(e) {
  ci && a9(ci, e);
}
const I9 = (e, n) => e.getDepth() - n.getDepth(), Y9 = (e) => e.animateUpdates(), Hy = (e) => e.next(), By = (e, n) => new CustomEvent(e, { detail: { target: n } });
function n0(e, n, i) {
  e.dispatchEvent(new CustomEvent(n, { detail: { originalEvent: i } }));
}
function Vy(e, n, i) {
  e.dispatchEvent(new CustomEvent(n, { detail: { originalEntry: i } }));
}
const Z9 = {
  isActive: (e) => !!e.inView,
  subscribe: (e, { enable: n, disable: i }, { inViewOptions: o = {} }) => {
    const { once: s } = o, c = o2(o, ["once"]);
    return j9(e, (f) => {
      if (n(), Vy(e, "viewenter", f), !s)
        return (d) => {
          i(), Vy(e, "viewleave", d);
        };
    }, c);
  }
}, jy = (e, n, i) => (o) => {
  o.pointerType && o.pointerType !== "mouse" || (i(), n0(e, n, o));
}, X9 = {
  isActive: (e) => !!e.hover,
  subscribe: (e, { enable: n, disable: i }) => {
    const o = jy(e, "hoverstart", n), s = jy(e, "hoverend", i);
    return e.addEventListener("pointerenter", o), e.addEventListener("pointerleave", s), () => {
      e.removeEventListener("pointerenter", o), e.removeEventListener("pointerleave", s);
    };
  }
}, Q9 = {
  isActive: (e) => !!e.press,
  subscribe: (e, { enable: n, disable: i }) => {
    const o = (c) => {
      i(), n0(e, "pressend", c), window.removeEventListener("pointerup", o);
    }, s = (c) => {
      n(), n0(e, "pressstart", c), window.addEventListener("pointerup", o);
    };
    return e.addEventListener("pointerdown", s), () => {
      e.removeEventListener("pointerdown", s), window.removeEventListener("pointerup", o);
    };
  }
}, zc = { inView: Z9, hover: X9, press: Q9 }, $y = ["initial", "animate", ...Object.keys(zc), "exit"], Ky = /* @__PURE__ */ new WeakMap();
function F9(e = {}, n) {
  let i, o = n ? n.getDepth() + 1 : 0;
  const s = { initial: !0, animate: !0 }, c = {}, f = {};
  for (const k of $y)
    f[k] = typeof e[k] == "string" ? e[k] : n?.getContext()[k];
  const d = e.initial === !1 ? "animate" : "initial";
  let v = Uy(e[d] || f[d], e.variants) || {}, g = o2(v, ["transition"]);
  const p = Object.assign({}, g);
  function* m() {
    var k, S;
    const E = g;
    g = {};
    const O = {};
    for (const Y of $y) {
      if (!s[Y])
        continue;
      const ie = Uy(e[Y]);
      if (ie)
        for (const X in ie)
          X !== "transition" && (g[X] = ie[X], O[X] = H9((S = (k = ie.transition) !== null && k !== void 0 ? k : e.transition) !== null && S !== void 0 ? S : {}, X));
    }
    const A = /* @__PURE__ */ new Set([
      ...Object.keys(g),
      ...Object.keys(E)
    ]), D = [];
    A.forEach((Y) => {
      var ie;
      g[Y] === void 0 && (g[Y] = p[Y]), $9(E[Y], g[Y]) && ((ie = p[Y]) !== null && ie !== void 0 || (p[Y] = Sl.get(i, Y)), D.push(U9(i, Y, g[Y], O[Y], m9)));
    }), yield;
    const L = D.map((Y) => Y()).filter(Boolean);
    if (!L.length)
      return;
    const F = g;
    i.dispatchEvent(By("motionstart", F)), Promise.all(L.map((Y) => Y.finished)).then(() => {
      i.dispatchEvent(By("motioncomplete", F));
    }).catch(e2);
  }
  const _ = (k, S) => () => {
    s[k] = S, wh(C);
  }, w = () => {
    for (const k in zc) {
      const S = zc[k].isActive(e), E = c[k];
      S && !E ? c[k] = zc[k].subscribe(i, {
        enable: _(k, !0),
        disable: _(k, !1)
      }, e) : !S && E && (E(), delete c[k]);
    }
  }, C = {
    update: (k) => {
      i && (e = k, w(), wh(C));
    },
    setActive: (k, S) => {
      i && (s[k] = S, wh(C));
    },
    animateUpdates: m,
    getDepth: () => o,
    getTarget: () => g,
    getOptions: () => e,
    getContext: () => f,
    mount: (k) => (i = k, Ky.set(i, C), w(), () => {
      Ky.delete(i), P9(C);
      for (const S in c)
        c[S]();
    }),
    isMounted: () => !!i
  };
  return C;
}
function W9(e) {
  const n = {}, i = [];
  for (let o in e) {
    const s = e[o];
    O0(o) && (to[o] && (o = to[o]), i.push(o), o = Tu(o));
    let c = Array.isArray(s) ? s[0] : s;
    const f = no.get(o);
    f && (c = Rl(s) ? f.toDefaultUnit(s) : s), n[o] = c;
  }
  return i.length && (n.transform = a2(i)), n;
}
function Nu(...e) {
  return n9(e);
}
var J9 = en();
function e7(e, n, i, o) {
  const s = F9(
    i?.initial === !1 ? { ...n(), initial: !1 } : n(),
    o
  );
  return Ue(() => {
    if (i && !i.mount()) return;
    const c = e(), f = s.mount(c);
    Ue(() => s.update(n())), $e(() => {
      i && n().exit ? (s.setActive("exit", !0), c.addEventListener("motioncomplete", f)) : f();
    });
  }), [s, W9(s.getTarget())];
}
var t7 = ["initial", "animate", "inView", "inViewOptions", "hover", "press", "variants", "transition", "exit"], n7 = ["tag"], qy = en(), Gy = (e) => {
  const [n, , i] = Ke(e, t7, n7), [o, s] = e7(() => c, () => ({
    ...n
  }), Ut(J9), Ut(qy));
  let c;
  return b(qy.Provider, {
    value: o,
    get children() {
      return b(lo, he(i, {
        ref: (f) => {
          c = f, e.ref?.(f);
        },
        get component() {
          return e.tag || "div";
        },
        get style() {
          return Qb(e.style, s);
        }
      }));
    }
  });
}, Py = new Proxy(Gy, {
  get: (e, n) => (i) => b(Gy, he(i, {
    tag: n
  }))
});
const au = Math.min, Gi = Math.max, ou = Math.round, dc = Math.floor, Qn = (e) => ({
  x: e,
  y: e
}), r7 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, i7 = {
  start: "end",
  end: "start"
};
function Iy(e, n, i) {
  return Gi(e, au(n, i));
}
function Ou(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Ii(e) {
  return e.split("-")[0];
}
function zu(e) {
  return e.split("-")[1];
}
function l2(e) {
  return e === "x" ? "y" : "x";
}
function s2(e) {
  return e === "y" ? "height" : "width";
}
const a7 = /* @__PURE__ */ new Set(["top", "bottom"]);
function li(e) {
  return a7.has(Ii(e)) ? "y" : "x";
}
function c2(e) {
  return l2(li(e));
}
function o7(e, n, i) {
  i === void 0 && (i = !1);
  const o = zu(e), s = c2(e), c = s2(s);
  let f = s === "x" ? o === (i ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return n.reference[c] > n.floating[c] && (f = lu(f)), [f, lu(f)];
}
function l7(e) {
  const n = lu(e);
  return [r0(e), n, r0(n)];
}
function r0(e) {
  return e.replace(/start|end/g, (n) => i7[n]);
}
const Yy = ["left", "right"], Zy = ["right", "left"], s7 = ["top", "bottom"], c7 = ["bottom", "top"];
function u7(e, n, i) {
  switch (e) {
    case "top":
    case "bottom":
      return i ? n ? Zy : Yy : n ? Yy : Zy;
    case "left":
    case "right":
      return n ? s7 : c7;
    default:
      return [];
  }
}
function f7(e, n, i, o) {
  const s = zu(e);
  let c = u7(Ii(e), i === "start", o);
  return s && (c = c.map((f) => f + "-" + s), n && (c = c.concat(c.map(r0)))), c;
}
function lu(e) {
  return e.replace(/left|right|bottom|top/g, (n) => r7[n]);
}
function d7(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function h7(e) {
  return typeof e != "number" ? d7(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function su(e) {
  const {
    x: n,
    y: i,
    width: o,
    height: s
  } = e;
  return {
    width: o,
    height: s,
    top: i,
    left: n,
    right: n + o,
    bottom: i + s,
    x: n,
    y: i
  };
}
function Xy(e, n, i) {
  let {
    reference: o,
    floating: s
  } = e;
  const c = li(n), f = c2(n), d = s2(f), v = Ii(n), g = c === "y", p = o.x + o.width / 2 - s.width / 2, m = o.y + o.height / 2 - s.height / 2, _ = o[d] / 2 - s[d] / 2;
  let w;
  switch (v) {
    case "top":
      w = {
        x: p,
        y: o.y - s.height
      };
      break;
    case "bottom":
      w = {
        x: p,
        y: o.y + o.height
      };
      break;
    case "right":
      w = {
        x: o.x + o.width,
        y: m
      };
      break;
    case "left":
      w = {
        x: o.x - s.width,
        y: m
      };
      break;
    default:
      w = {
        x: o.x,
        y: o.y
      };
  }
  switch (zu(n)) {
    case "start":
      w[f] -= _ * (i && g ? -1 : 1);
      break;
    case "end":
      w[f] += _ * (i && g ? -1 : 1);
      break;
  }
  return w;
}
const v7 = async (e, n, i) => {
  const {
    placement: o = "bottom",
    strategy: s = "absolute",
    middleware: c = [],
    platform: f
  } = i, d = c.filter(Boolean), v = await (f.isRTL == null ? void 0 : f.isRTL(n));
  let g = await f.getElementRects({
    reference: e,
    floating: n,
    strategy: s
  }), {
    x: p,
    y: m
  } = Xy(g, o, v), _ = o, w = {}, C = 0;
  for (let k = 0; k < d.length; k++) {
    const {
      name: S,
      fn: E
    } = d[k], {
      x: O,
      y: A,
      data: D,
      reset: L
    } = await E({
      x: p,
      y: m,
      initialPlacement: o,
      placement: _,
      strategy: s,
      middlewareData: w,
      rects: g,
      platform: f,
      elements: {
        reference: e,
        floating: n
      }
    });
    p = O ?? p, m = A ?? m, w = {
      ...w,
      [S]: {
        ...w[S],
        ...D
      }
    }, L && C <= 50 && (C++, typeof L == "object" && (L.placement && (_ = L.placement), L.rects && (g = L.rects === !0 ? await f.getElementRects({
      reference: e,
      floating: n,
      strategy: s
    }) : L.rects), {
      x: p,
      y: m
    } = Xy(g, _, v)), k = -1);
  }
  return {
    x: p,
    y: m,
    placement: _,
    strategy: s,
    middlewareData: w
  };
};
async function u2(e, n) {
  var i;
  n === void 0 && (n = {});
  const {
    x: o,
    y: s,
    platform: c,
    rects: f,
    elements: d,
    strategy: v
  } = e, {
    boundary: g = "clippingAncestors",
    rootBoundary: p = "viewport",
    elementContext: m = "floating",
    altBoundary: _ = !1,
    padding: w = 0
  } = Ou(n, e), C = h7(w), S = d[_ ? m === "floating" ? "reference" : "floating" : m], E = su(await c.getClippingRect({
    element: (i = await (c.isElement == null ? void 0 : c.isElement(S))) == null || i ? S : S.contextElement || await (c.getDocumentElement == null ? void 0 : c.getDocumentElement(d.floating)),
    boundary: g,
    rootBoundary: p,
    strategy: v
  })), O = m === "floating" ? {
    x: o,
    y: s,
    width: f.floating.width,
    height: f.floating.height
  } : f.reference, A = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(d.floating)), D = await (c.isElement == null ? void 0 : c.isElement(A)) ? await (c.getScale == null ? void 0 : c.getScale(A)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, L = su(c.convertOffsetParentRelativeRectToViewportRelativeRect ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: O,
    offsetParent: A,
    strategy: v
  }) : O);
  return {
    top: (E.top - L.top + C.top) / D.y,
    bottom: (L.bottom - E.bottom + C.bottom) / D.y,
    left: (E.left - L.left + C.left) / D.x,
    right: (L.right - E.right + C.right) / D.x
  };
}
const g7 = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var i, o;
      const {
        placement: s,
        middlewareData: c,
        rects: f,
        initialPlacement: d,
        platform: v,
        elements: g
      } = n, {
        mainAxis: p = !0,
        crossAxis: m = !0,
        fallbackPlacements: _,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: C = "none",
        flipAlignment: k = !0,
        ...S
      } = Ou(e, n);
      if ((i = c.arrow) != null && i.alignmentOffset)
        return {};
      const E = Ii(s), O = li(d), A = Ii(d) === d, D = await (v.isRTL == null ? void 0 : v.isRTL(g.floating)), L = _ || (A || !k ? [lu(d)] : l7(d)), F = C !== "none";
      !_ && F && L.push(...f7(d, k, C, D));
      const Y = [d, ...L], ie = await u2(n, S), X = [];
      let fe = ((o = c.flip) == null ? void 0 : o.overflows) || [];
      if (p && X.push(ie[E]), m) {
        const Ee = o7(s, f, D);
        X.push(ie[Ee[0]], ie[Ee[1]]);
      }
      if (fe = [...fe, {
        placement: s,
        overflows: X
      }], !X.every((Ee) => Ee <= 0)) {
        var le, ee;
        const Ee = (((le = c.flip) == null ? void 0 : le.index) || 0) + 1, Oe = Y[Ee];
        if (Oe && (!(m === "alignment" ? O !== li(Oe) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        fe.every((ae) => li(ae.placement) === O ? ae.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Ee,
              overflows: fe
            },
            reset: {
              placement: Oe
            }
          };
        let j = (ee = fe.filter((te) => te.overflows[0] <= 0).sort((te, ae) => te.overflows[1] - ae.overflows[1])[0]) == null ? void 0 : ee.placement;
        if (!j)
          switch (w) {
            case "bestFit": {
              var we;
              const te = (we = fe.filter((ae) => {
                if (F) {
                  const Ae = li(ae.placement);
                  return Ae === O || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Ae === "y";
                }
                return !0;
              }).map((ae) => [ae.placement, ae.overflows.filter((Ae) => Ae > 0).reduce((Ae, z) => Ae + z, 0)]).sort((ae, Ae) => ae[1] - Ae[1])[0]) == null ? void 0 : we[0];
              te && (j = te);
              break;
            }
            case "initialPlacement":
              j = d;
              break;
          }
        if (s !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
}, p7 = /* @__PURE__ */ new Set(["left", "top"]);
async function m7(e, n) {
  const {
    placement: i,
    platform: o,
    elements: s
  } = e, c = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), f = Ii(i), d = zu(i), v = li(i) === "y", g = p7.has(f) ? -1 : 1, p = c && v ? -1 : 1, m = Ou(n, e);
  let {
    mainAxis: _,
    crossAxis: w,
    alignmentAxis: C
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return d && typeof C == "number" && (w = d === "end" ? C * -1 : C), v ? {
    x: w * p,
    y: _ * g
  } : {
    x: _ * g,
    y: w * p
  };
}
const y7 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(n) {
      var i, o;
      const {
        x: s,
        y: c,
        placement: f,
        middlewareData: d
      } = n, v = await m7(n, e);
      return f === ((i = d.offset) == null ? void 0 : i.placement) && (o = d.arrow) != null && o.alignmentOffset ? {} : {
        x: s + v.x,
        y: c + v.y,
        data: {
          ...v,
          placement: f
        }
      };
    }
  };
}, b7 = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: i,
        y: o,
        placement: s
      } = n, {
        mainAxis: c = !0,
        crossAxis: f = !1,
        limiter: d = {
          fn: (S) => {
            let {
              x: E,
              y: O
            } = S;
            return {
              x: E,
              y: O
            };
          }
        },
        ...v
      } = Ou(e, n), g = {
        x: i,
        y: o
      }, p = await u2(n, v), m = li(Ii(s)), _ = l2(m);
      let w = g[_], C = g[m];
      if (c) {
        const S = _ === "y" ? "top" : "left", E = _ === "y" ? "bottom" : "right", O = w + p[S], A = w - p[E];
        w = Iy(O, w, A);
      }
      if (f) {
        const S = m === "y" ? "top" : "left", E = m === "y" ? "bottom" : "right", O = C + p[S], A = C - p[E];
        C = Iy(O, C, A);
      }
      const k = d.fn({
        ...n,
        [_]: w,
        [m]: C
      });
      return {
        ...k,
        data: {
          x: k.x - i,
          y: k.y - o,
          enabled: {
            [_]: c,
            [m]: f
          }
        }
      };
    }
  };
};
function Mu() {
  return typeof window < "u";
}
function co(e) {
  return f2(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function dn(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function nr(e) {
  var n;
  return (n = (f2(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function f2(e) {
  return Mu() ? e instanceof Node || e instanceof dn(e).Node : !1;
}
function Rn(e) {
  return Mu() ? e instanceof Element || e instanceof dn(e).Element : !1;
}
function er(e) {
  return Mu() ? e instanceof HTMLElement || e instanceof dn(e).HTMLElement : !1;
}
function Qy(e) {
  return !Mu() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof dn(e).ShadowRoot;
}
const w7 = /* @__PURE__ */ new Set(["inline", "contents"]);
function $l(e) {
  const {
    overflow: n,
    overflowX: i,
    overflowY: o,
    display: s
  } = Ln(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + o + i) && !w7.has(s);
}
const _7 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function x7(e) {
  return _7.has(co(e));
}
const S7 = [":popover-open", ":modal"];
function Du(e) {
  return S7.some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
const C7 = ["transform", "translate", "scale", "rotate", "perspective"], k7 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], A7 = ["paint", "layout", "strict", "content"];
function z0(e) {
  const n = M0(), i = Rn(e) ? Ln(e) : e;
  return C7.some((o) => i[o] ? i[o] !== "none" : !1) || (i.containerType ? i.containerType !== "normal" : !1) || !n && (i.backdropFilter ? i.backdropFilter !== "none" : !1) || !n && (i.filter ? i.filter !== "none" : !1) || k7.some((o) => (i.willChange || "").includes(o)) || A7.some((o) => (i.contain || "").includes(o));
}
function E7(e) {
  let n = ui(e);
  for (; er(n) && !ro(n); ) {
    if (z0(n))
      return n;
    if (Du(n))
      return null;
    n = ui(n);
  }
  return null;
}
function M0() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const T7 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ro(e) {
  return T7.has(co(e));
}
function Ln(e) {
  return dn(e).getComputedStyle(e);
}
function Ru(e) {
  return Rn(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ui(e) {
  if (co(e) === "html")
    return e;
  const n = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Qy(e) && e.host || // Fallback.
    nr(e)
  );
  return Qy(n) ? n.host : n;
}
function d2(e) {
  const n = ui(e);
  return ro(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : er(n) && $l(n) ? n : d2(n);
}
function Ul(e, n, i) {
  var o;
  n === void 0 && (n = []), i === void 0 && (i = !0);
  const s = d2(e), c = s === ((o = e.ownerDocument) == null ? void 0 : o.body), f = dn(s);
  if (c) {
    const d = i0(f);
    return n.concat(f, f.visualViewport || [], $l(s) ? s : [], d && i ? Ul(d) : []);
  }
  return n.concat(s, Ul(s, [], i));
}
function i0(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function h2(e) {
  const n = Ln(e);
  let i = parseFloat(n.width) || 0, o = parseFloat(n.height) || 0;
  const s = er(e), c = s ? e.offsetWidth : i, f = s ? e.offsetHeight : o, d = ou(i) !== c || ou(o) !== f;
  return d && (i = c, o = f), {
    width: i,
    height: o,
    $: d
  };
}
function D0(e) {
  return Rn(e) ? e : e.contextElement;
}
function Za(e) {
  const n = D0(e);
  if (!er(n))
    return Qn(1);
  const i = n.getBoundingClientRect(), {
    width: o,
    height: s,
    $: c
  } = h2(n);
  let f = (c ? ou(i.width) : i.width) / o, d = (c ? ou(i.height) : i.height) / s;
  return (!f || !Number.isFinite(f)) && (f = 1), (!d || !Number.isFinite(d)) && (d = 1), {
    x: f,
    y: d
  };
}
const N7 = /* @__PURE__ */ Qn(0);
function v2(e) {
  const n = dn(e);
  return !M0() || !n.visualViewport ? N7 : {
    x: n.visualViewport.offsetLeft,
    y: n.visualViewport.offsetTop
  };
}
function O7(e, n, i) {
  return n === void 0 && (n = !1), !i || n && i !== dn(e) ? !1 : n;
}
function Yi(e, n, i, o) {
  n === void 0 && (n = !1), i === void 0 && (i = !1);
  const s = e.getBoundingClientRect(), c = D0(e);
  let f = Qn(1);
  n && (o ? Rn(o) && (f = Za(o)) : f = Za(e));
  const d = O7(c, i, o) ? v2(c) : Qn(0);
  let v = (s.left + d.x) / f.x, g = (s.top + d.y) / f.y, p = s.width / f.x, m = s.height / f.y;
  if (c) {
    const _ = dn(c), w = o && Rn(o) ? dn(o) : o;
    let C = _, k = i0(C);
    for (; k && o && w !== C; ) {
      const S = Za(k), E = k.getBoundingClientRect(), O = Ln(k), A = E.left + (k.clientLeft + parseFloat(O.paddingLeft)) * S.x, D = E.top + (k.clientTop + parseFloat(O.paddingTop)) * S.y;
      v *= S.x, g *= S.y, p *= S.x, m *= S.y, v += A, g += D, C = dn(k), k = i0(C);
    }
  }
  return su({
    width: p,
    height: m,
    x: v,
    y: g
  });
}
function Lu(e, n) {
  const i = Ru(e).scrollLeft;
  return n ? n.left + i : Yi(nr(e)).left + i;
}
function g2(e, n) {
  const i = e.getBoundingClientRect(), o = i.left + n.scrollLeft - Lu(e, i), s = i.top + n.scrollTop;
  return {
    x: o,
    y: s
  };
}
function z7(e) {
  let {
    elements: n,
    rect: i,
    offsetParent: o,
    strategy: s
  } = e;
  const c = s === "fixed", f = nr(o), d = n ? Du(n.floating) : !1;
  if (o === f || d && c)
    return i;
  let v = {
    scrollLeft: 0,
    scrollTop: 0
  }, g = Qn(1);
  const p = Qn(0), m = er(o);
  if ((m || !m && !c) && ((co(o) !== "body" || $l(f)) && (v = Ru(o)), er(o))) {
    const w = Yi(o);
    g = Za(o), p.x = w.x + o.clientLeft, p.y = w.y + o.clientTop;
  }
  const _ = f && !m && !c ? g2(f, v) : Qn(0);
  return {
    width: i.width * g.x,
    height: i.height * g.y,
    x: i.x * g.x - v.scrollLeft * g.x + p.x + _.x,
    y: i.y * g.y - v.scrollTop * g.y + p.y + _.y
  };
}
function M7(e) {
  return Array.from(e.getClientRects());
}
function D7(e) {
  const n = nr(e), i = Ru(e), o = e.ownerDocument.body, s = Gi(n.scrollWidth, n.clientWidth, o.scrollWidth, o.clientWidth), c = Gi(n.scrollHeight, n.clientHeight, o.scrollHeight, o.clientHeight);
  let f = -i.scrollLeft + Lu(e);
  const d = -i.scrollTop;
  return Ln(o).direction === "rtl" && (f += Gi(n.clientWidth, o.clientWidth) - s), {
    width: s,
    height: c,
    x: f,
    y: d
  };
}
const Fy = 25;
function R7(e, n) {
  const i = dn(e), o = nr(e), s = i.visualViewport;
  let c = o.clientWidth, f = o.clientHeight, d = 0, v = 0;
  if (s) {
    c = s.width, f = s.height;
    const p = M0();
    (!p || p && n === "fixed") && (d = s.offsetLeft, v = s.offsetTop);
  }
  const g = Lu(o);
  if (g <= 0) {
    const p = o.ownerDocument, m = p.body, _ = getComputedStyle(m), w = p.compatMode === "CSS1Compat" && parseFloat(_.marginLeft) + parseFloat(_.marginRight) || 0, C = Math.abs(o.clientWidth - m.clientWidth - w);
    C <= Fy && (c -= C);
  } else g <= Fy && (c += g);
  return {
    width: c,
    height: f,
    x: d,
    y: v
  };
}
const L7 = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function U7(e, n) {
  const i = Yi(e, !0, n === "fixed"), o = i.top + e.clientTop, s = i.left + e.clientLeft, c = er(e) ? Za(e) : Qn(1), f = e.clientWidth * c.x, d = e.clientHeight * c.y, v = s * c.x, g = o * c.y;
  return {
    width: f,
    height: d,
    x: v,
    y: g
  };
}
function Wy(e, n, i) {
  let o;
  if (n === "viewport")
    o = R7(e, i);
  else if (n === "document")
    o = D7(nr(e));
  else if (Rn(n))
    o = U7(n, i);
  else {
    const s = v2(e);
    o = {
      x: n.x - s.x,
      y: n.y - s.y,
      width: n.width,
      height: n.height
    };
  }
  return su(o);
}
function p2(e, n) {
  const i = ui(e);
  return i === n || !Rn(i) || ro(i) ? !1 : Ln(i).position === "fixed" || p2(i, n);
}
function H7(e, n) {
  const i = n.get(e);
  if (i)
    return i;
  let o = Ul(e, [], !1).filter((d) => Rn(d) && co(d) !== "body"), s = null;
  const c = Ln(e).position === "fixed";
  let f = c ? ui(e) : e;
  for (; Rn(f) && !ro(f); ) {
    const d = Ln(f), v = z0(f);
    !v && d.position === "fixed" && (s = null), (c ? !v && !s : !v && d.position === "static" && !!s && L7.has(s.position) || $l(f) && !v && p2(e, f)) ? o = o.filter((p) => p !== f) : s = d, f = ui(f);
  }
  return n.set(e, o), o;
}
function B7(e) {
  let {
    element: n,
    boundary: i,
    rootBoundary: o,
    strategy: s
  } = e;
  const f = [...i === "clippingAncestors" ? Du(n) ? [] : H7(n, this._c) : [].concat(i), o], d = f[0], v = f.reduce((g, p) => {
    const m = Wy(n, p, s);
    return g.top = Gi(m.top, g.top), g.right = au(m.right, g.right), g.bottom = au(m.bottom, g.bottom), g.left = Gi(m.left, g.left), g;
  }, Wy(n, d, s));
  return {
    width: v.right - v.left,
    height: v.bottom - v.top,
    x: v.left,
    y: v.top
  };
}
function V7(e) {
  const {
    width: n,
    height: i
  } = h2(e);
  return {
    width: n,
    height: i
  };
}
function j7(e, n, i) {
  const o = er(n), s = nr(n), c = i === "fixed", f = Yi(e, !0, c, n);
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const v = Qn(0);
  function g() {
    v.x = Lu(s);
  }
  if (o || !o && !c)
    if ((co(n) !== "body" || $l(s)) && (d = Ru(n)), o) {
      const w = Yi(n, !0, c, n);
      v.x = w.x + n.clientLeft, v.y = w.y + n.clientTop;
    } else s && g();
  c && !o && s && g();
  const p = s && !o && !c ? g2(s, d) : Qn(0), m = f.left + d.scrollLeft - v.x - p.x, _ = f.top + d.scrollTop - v.y - p.y;
  return {
    x: m,
    y: _,
    width: f.width,
    height: f.height
  };
}
function _h(e) {
  return Ln(e).position === "static";
}
function Jy(e, n) {
  if (!er(e) || Ln(e).position === "fixed")
    return null;
  if (n)
    return n(e);
  let i = e.offsetParent;
  return nr(e) === i && (i = i.ownerDocument.body), i;
}
function m2(e, n) {
  const i = dn(e);
  if (Du(e))
    return i;
  if (!er(e)) {
    let s = ui(e);
    for (; s && !ro(s); ) {
      if (Rn(s) && !_h(s))
        return s;
      s = ui(s);
    }
    return i;
  }
  let o = Jy(e, n);
  for (; o && x7(o) && _h(o); )
    o = Jy(o, n);
  return o && ro(o) && _h(o) && !z0(o) ? i : o || E7(e) || i;
}
const $7 = async function(e) {
  const n = this.getOffsetParent || m2, i = this.getDimensions, o = await i(e.floating);
  return {
    reference: j7(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function K7(e) {
  return Ln(e).direction === "rtl";
}
const q7 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: z7,
  getDocumentElement: nr,
  getClippingRect: B7,
  getOffsetParent: m2,
  getElementRects: $7,
  getClientRects: M7,
  getDimensions: V7,
  getScale: Za,
  isElement: Rn,
  isRTL: K7
};
function y2(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function G7(e, n) {
  let i = null, o;
  const s = nr(e);
  function c() {
    var d;
    clearTimeout(o), (d = i) == null || d.disconnect(), i = null;
  }
  function f(d, v) {
    d === void 0 && (d = !1), v === void 0 && (v = 1), c();
    const g = e.getBoundingClientRect(), {
      left: p,
      top: m,
      width: _,
      height: w
    } = g;
    if (d || n(), !_ || !w)
      return;
    const C = dc(m), k = dc(s.clientWidth - (p + _)), S = dc(s.clientHeight - (m + w)), E = dc(p), A = {
      rootMargin: -C + "px " + -k + "px " + -S + "px " + -E + "px",
      threshold: Gi(0, au(1, v)) || 1
    };
    let D = !0;
    function L(F) {
      const Y = F[0].intersectionRatio;
      if (Y !== v) {
        if (!D)
          return f();
        Y ? f(!1, Y) : o = setTimeout(() => {
          f(!1, 1e-7);
        }, 1e3);
      }
      Y === 1 && !y2(g, e.getBoundingClientRect()) && f(), D = !1;
    }
    try {
      i = new IntersectionObserver(L, {
        ...A,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(L, A);
    }
    i.observe(e);
  }
  return f(!0), c;
}
function b2(e, n, i, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: c = !0,
    elementResize: f = typeof ResizeObserver == "function",
    layoutShift: d = typeof IntersectionObserver == "function",
    animationFrame: v = !1
  } = o, g = D0(e), p = s || c ? [...g ? Ul(g) : [], ...Ul(n)] : [];
  p.forEach((E) => {
    s && E.addEventListener("scroll", i, {
      passive: !0
    }), c && E.addEventListener("resize", i);
  });
  const m = g && d ? G7(g, i) : null;
  let _ = -1, w = null;
  f && (w = new ResizeObserver((E) => {
    let [O] = E;
    O && O.target === g && w && (w.unobserve(n), cancelAnimationFrame(_), _ = requestAnimationFrame(() => {
      var A;
      (A = w) == null || A.observe(n);
    })), i();
  }), g && !v && w.observe(g), w.observe(n));
  let C, k = v ? Yi(e) : null;
  v && S();
  function S() {
    const E = Yi(e);
    k && !y2(k, E) && i(), k = E, C = requestAnimationFrame(S);
  }
  return i(), () => {
    var E;
    p.forEach((O) => {
      s && O.removeEventListener("scroll", i), c && O.removeEventListener("resize", i);
    }), m?.(), (E = w) == null || E.disconnect(), w = null, v && cancelAnimationFrame(C);
  };
}
const w2 = y7, _2 = b7, x2 = g7, P7 = (e, n, i) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: q7,
    ...i
  }, c = {
    ...s.platform,
    _c: o
  };
  return v7(e, n, {
    ...s,
    platform: c
  });
};
function S2(e, n, i) {
  let o = () => {
    var m;
    return (m = i?.placement) != null ? m : "bottom";
  }, s = () => {
    var m;
    return (m = i?.strategy) != null ? m : "absolute";
  }, [c, f] = W({ x: null, y: null, placement: o(), strategy: s(), middlewareData: {} }), [d, v] = W();
  Ue(() => {
    let m = d();
    if (m) throw m.value;
  });
  let g = oe(() => (e(), n(), {}));
  function p() {
    let m = e(), _ = n();
    if (m && _) {
      let w = g();
      P7(m, _, { middleware: i?.middleware, placement: o(), strategy: s() }).then((C) => {
        w === g() && f(C);
      }, (C) => {
        v(C);
      });
    }
  }
  return Ue(() => {
    let m = e(), _ = n();
    if (i?.middleware, o(), s(), m && _) if (i != null && i.whileElementsMounted) {
      let w = i.whileElementsMounted(m, _, p);
      w && $e(w);
    } else p();
  }), { get x() {
    return c().x;
  }, get y() {
    return c().y;
  }, get placement() {
    return c().placement;
  }, get strategy() {
    return c().strategy;
  }, get middlewareData() {
    return c().middlewareData;
  }, update: p };
}
const e1 = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, t1 = qb, R0 = (e, n) => (i) => {
  var o;
  if (n?.variants == null) return t1(e, i?.class, i?.className);
  const { variants: s, defaultVariants: c } = n, f = Object.keys(s).map((g) => {
    const p = i?.[g], m = c?.[g];
    if (p === null) return null;
    const _ = e1(p) || e1(m);
    return s[g][_];
  }), d = i && Object.entries(i).reduce((g, p) => {
    let [m, _] = p;
    return _ === void 0 || (g[m] = _), g;
  }, {}), v = n == null || (o = n.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((g, p) => {
    let { class: m, className: _, ...w } = p;
    return Object.entries(w).every((C) => {
      let [k, S] = C;
      return Array.isArray(S) ? S.includes({
        ...c,
        ...d
      }[k]) : {
        ...c,
        ...d
      }[k] === S;
    }) ? [
      ...g,
      m,
      _
    ] : g;
  }, []);
  return t1(e, f, v, i?.class, i?.className);
};
function I7(e) {
  return Object.prototype.toString.call(e) === "[object String]";
}
function C2(e) {
  return typeof e == "function";
}
function k2(e) {
  return (n) => `${e()}-${n}`;
}
var A2 = /* @__PURE__ */ ((e) => (e.Escape = "Escape", e.Enter = "Enter", e.Tab = "Tab", e.Space = " ", e.ArrowDown = "ArrowDown", e.ArrowLeft = "ArrowLeft", e.ArrowRight = "ArrowRight", e.ArrowUp = "ArrowUp", e.End = "End", e.Home = "Home", e.PageDown = "PageDown", e.PageUp = "PageUp", e))(A2 || {});
function Xa(e, n) {
  return n && (C2(n) ? n(e) : n[0](n[1], e)), e?.defaultPrevented;
}
function Nr(e, n) {
  return he(e, n);
}
var gl = /* @__PURE__ */ new Map(), n1 = /* @__PURE__ */ new Set();
function r1() {
  if (typeof window > "u")
    return;
  const e = (i) => {
    if (!i.target)
      return;
    let o = gl.get(i.target);
    o || (o = /* @__PURE__ */ new Set(), gl.set(i.target, o), i.target.addEventListener(
      "transitioncancel",
      n
    )), o.add(i.propertyName);
  }, n = (i) => {
    if (!i.target)
      return;
    const o = gl.get(i.target);
    if (o && (o.delete(i.propertyName), o.size === 0 && (i.target.removeEventListener(
      "transitioncancel",
      n
    ), gl.delete(i.target)), gl.size === 0)) {
      for (const s of n1)
        s();
      n1.clear();
    }
  };
  document.body.addEventListener("transitionrun", e), document.body.addEventListener("transitionend", n);
}
typeof document < "u" && (document.readyState !== "loading" ? r1() : document.addEventListener("DOMContentLoaded", r1));
var Y7 = {
  border: "0",
  clip: "rect(0 0 0 0)",
  "clip-path": "inset(50%)",
  height: "1px",
  margin: "0 -1px -1px 0",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  "white-space": "nowrap"
};
function Z7(e) {
  const [n, i] = W(e.defaultValue?.()), o = oe(() => e.value?.() !== void 0), s = oe(() => o() ? e.value?.() : n());
  return [s, (f) => {
    kt(() => {
      const d = r9(f, s());
      return Object.is(d, s()) || (o() || i(d), e.onChange?.(d)), d;
    });
  }];
}
function X7(e) {
  const [n, i] = Z7(e);
  return [() => n() ?? !1, i];
}
function Q7(e = {}) {
  const [n, i] = X7({
    value: () => et(e.isSelected),
    defaultValue: () => !!et(e.defaultIsSelected),
    onChange: (c) => e.onSelectedChange?.(c)
  });
  return {
    isSelected: n,
    setIsSelected: (c) => {
      !et(e.isReadOnly) && !et(e.isDisabled) && i(c);
    },
    toggle: () => {
      !et(e.isReadOnly) && !et(e.isDisabled) && i(!n());
    }
  };
}
function hc(e) {
  return (n) => (e(n), () => e(void 0));
}
function Zi(e) {
  const [n, i] = Ke(e, ["as"]);
  if (!n.as)
    throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
  return (
    // @ts-ignore: Props are valid but not worth calculating
    b(lo, he(i, {
      get component() {
        return n.as;
      }
    }))
  );
}
var F7 = ["id", "name", "validationState", "required", "disabled", "readOnly"];
function W7(e) {
  const n = `form-control-${A0()}`, i = Nr({
    id: n
  }, e), [o, s] = W(), [c, f] = W(), [d, v] = W(), [g, p] = W(), m = (k, S, E) => {
    const O = E != null || o() != null;
    return [
      E,
      o(),
      // If there is both an aria-label and aria-labelledby, add the field itself has an aria-labelledby
      O && S != null ? k : void 0
    ].filter(Boolean).join(" ") || void 0;
  }, _ = (k) => [
    d(),
    // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA.
    // See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
    g(),
    k
  ].filter(Boolean).join(" ") || void 0, w = oe(() => ({
    "data-valid": et(i.validationState) === "valid" ? "" : void 0,
    "data-invalid": et(i.validationState) === "invalid" ? "" : void 0,
    "data-required": et(i.required) ? "" : void 0,
    "data-disabled": et(i.disabled) ? "" : void 0,
    "data-readonly": et(i.readOnly) ? "" : void 0
  }));
  return {
    formControlContext: {
      name: () => et(i.name) ?? et(i.id),
      dataset: w,
      validationState: () => et(i.validationState),
      isRequired: () => et(i.required),
      isDisabled: () => et(i.disabled),
      isReadOnly: () => et(i.readOnly),
      labelId: o,
      fieldId: c,
      descriptionId: d,
      errorMessageId: g,
      getAriaLabelledBy: m,
      getAriaDescribedBy: _,
      generateId: k2(() => et(i.id)),
      registerLabel: hc(s),
      registerField: hc(f),
      registerDescription: hc(v),
      registerErrorMessage: hc(p)
    }
  };
}
var E2 = en();
function Xi() {
  const e = Ut(E2);
  if (e === void 0)
    throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");
  return e;
}
function J7(e) {
  const n = Xi(), i = Nr({
    id: n.generateId("description")
  }, e);
  return Ue(() => $e(n.registerDescription(i.id))), b(Zi, he({
    as: "div"
  }, () => n.dataset(), i));
}
var e8 = ["id", "aria-label", "aria-labelledby", "aria-describedby"];
function t8(e) {
  const n = Xi(), i = Nr({
    id: n.generateId("field")
  }, e);
  return Ue(() => $e(n.registerField(et(i.id)))), {
    fieldProps: {
      id: () => et(i.id),
      ariaLabel: () => et(i["aria-label"]),
      ariaLabelledBy: () => n.getAriaLabelledBy(et(i.id), et(i["aria-label"]), et(i["aria-labelledby"])),
      ariaDescribedBy: () => n.getAriaDescribedBy(et(i["aria-describedby"]))
    }
  };
}
function n8(e, n) {
  const [i, o] = W(i1(n?.()));
  return Ue(() => {
    o(e()?.tagName.toLowerCase() || i1(n?.()));
  }), i;
}
function i1(e) {
  return I7(e) ? e : void 0;
}
function r8(e) {
  let n;
  const i = Xi(), o = Nr({
    id: i.generateId("label")
  }, e), [s, c] = Ke(o, ["ref"]), f = n8(() => n, () => "label");
  return Ue(() => $e(i.registerLabel(c.id))), b(Zi, he({
    as: "label",
    ref(d) {
      const v = Nu((g) => n = g, s.ref);
      typeof v == "function" && v(d);
    },
    get for() {
      return ft(() => f() === "label")() ? i.fieldId() : void 0;
    }
  }, () => i.dataset(), c));
}
function i8(e, n) {
  Ue(
    Ph(e, (i) => {
      if (i == null)
        return;
      const o = a8(i);
      o != null && (o.addEventListener("reset", n, { passive: !0 }), $e(() => {
        o.removeEventListener("reset", n);
      }));
    })
  );
}
function a8(e) {
  return o8(e) ? e.form : e.closest("form");
}
function o8(e) {
  return e.matches("textarea, input, select, button");
}
function l8(e) {
  const n = Xi(), i = Nr({
    id: n.generateId("error-message")
  }, e), [o, s] = Ke(i, ["forceMount"]), c = () => n.validationState() === "invalid";
  return Ue(() => {
    c() && $e(n.registerErrorMessage(s.id));
  }), b(me, {
    get when() {
      return o.forceMount || c();
    },
    get children() {
      return b(Zi, he({
        as: "div"
      }, () => n.dataset(), s));
    }
  });
}
var s8 = Object.defineProperty, c8 = (e, n) => {
  for (var i in n)
    s8(e, i, { get: n[i], enumerable: !0 });
}, vc = (e) => typeof e == "function" ? e() : e, u8 = (e) => {
  const n = oe(() => {
    const f = vc(e.element);
    if (f)
      return getComputedStyle(f);
  }), i = () => n()?.animationName ?? "none", [o, s] = W(vc(e.show) ? "present" : "hidden");
  let c = "none";
  return Ue((f) => {
    const d = vc(e.show);
    return kt(() => {
      if (f === d) return d;
      const v = c, g = i();
      d ? s("present") : g === "none" || n()?.display === "none" ? s("hidden") : s(f === !0 && v !== g ? "hiding" : "hidden");
    }), d;
  }), Ue(() => {
    const f = vc(e.element);
    if (!f) return;
    const d = (g) => {
      g.target === f && (c = i());
    }, v = (g) => {
      const m = i().includes(
        g.animationName
      );
      g.target === f && m && o() === "hiding" && s("hidden");
    };
    f.addEventListener("animationstart", d), f.addEventListener("animationcancel", v), f.addEventListener("animationend", v), $e(() => {
      f.removeEventListener("animationstart", d), f.removeEventListener("animationcancel", v), f.removeEventListener("animationend", v);
    });
  }), {
    present: () => o() === "present" || o() === "hiding",
    state: o,
    setState: s
  };
}, f8 = u8, d8 = f8, h8 = {};
c8(h8, {
  Checkbox: () => g8,
  Control: () => L0,
  Description: () => N2,
  ErrorMessage: () => O2,
  Indicator: () => U0,
  Input: () => H0,
  Label: () => z2,
  Root: () => B0,
  useCheckboxContext: () => Qi
});
var T2 = en();
function Qi() {
  const e = Ut(T2);
  if (e === void 0)
    throw new Error("[kobalte]: `useCheckboxContext` must be used within a `Checkbox` component");
  return e;
}
function L0(e) {
  const n = Xi(), i = Qi(), o = Nr({
    id: i.generateId("control")
  }, e), [s, c] = Ke(o, ["onClick", "onKeyDown"]);
  return b(Zi, he({
    as: "div",
    onClick: (v) => {
      Xa(v, s.onClick), i.toggle(), i.inputRef()?.focus();
    },
    onKeyDown: (v) => {
      Xa(v, s.onKeyDown), v.key === A2.Space && (i.toggle(), i.inputRef()?.focus());
    }
  }, () => n.dataset(), () => i.dataset(), c));
}
function N2(e) {
  const n = Qi();
  return b(J7, he(() => n.dataset(), e));
}
function O2(e) {
  const n = Qi();
  return b(l8, he(() => n.dataset(), e));
}
function U0(e) {
  const n = Xi(), i = Qi(), [o, s] = W(), c = Nr({
    id: i.generateId("indicator")
  }, e), [f, d] = Ke(c, ["ref", "forceMount"]), {
    present: v
  } = d8({
    show: () => f.forceMount || i.indeterminate() || i.checked(),
    element: () => o() ?? null
  });
  return b(me, {
    get when() {
      return v();
    },
    get children() {
      return b(Zi, he({
        as: "div",
        ref(g) {
          const p = Nu(s, f.ref);
          typeof p == "function" && p(g);
        }
      }, () => n.dataset(), () => i.dataset(), d));
    }
  });
}
function H0(e) {
  let n;
  const i = Xi(), o = Qi(), s = Nr({
    id: o.generateId("input")
  }, e), [c, f, d] = Ke(s, ["ref", "style", "onChange", "onFocus", "onBlur"], e8), {
    fieldProps: v
  } = t8(f), [g, p] = W(!1), m = (C) => {
    if (Xa(C, c.onChange), C.stopPropagation(), !g()) {
      const k = C.target;
      o.setIsChecked(k.checked), k.checked = o.checked();
    }
    p(!1);
  }, _ = (C) => {
    Xa(C, c.onFocus), o.setIsFocused(!0);
  }, w = (C) => {
    Xa(C, c.onBlur), o.setIsFocused(!1);
  };
  return Ue(Ph([() => o.checked(), () => o.value()], () => {
    p(!0), n?.dispatchEvent(new Event("input", {
      bubbles: !0,
      cancelable: !0
    })), n?.dispatchEvent(new Event("change", {
      bubbles: !0,
      cancelable: !0
    }));
  }, {
    defer: !0
  })), Ue(Ph([() => n, () => o.indeterminate(), () => o.checked()], ([C, k]) => {
    C && (C.indeterminate = k);
  })), b(Zi, he({
    as: "input",
    ref(C) {
      const k = Nu((S) => {
        o.setInputRef(S), n = S;
      }, c.ref);
      typeof k == "function" && k(C);
    },
    type: "checkbox",
    get id() {
      return v.id();
    },
    get name() {
      return i.name();
    },
    get value() {
      return o.value();
    },
    get checked() {
      return o.checked();
    },
    get required() {
      return i.isRequired();
    },
    get disabled() {
      return i.isDisabled();
    },
    get readonly() {
      return i.isReadOnly();
    },
    get style() {
      return Qb(Y7, c.style);
    },
    get "aria-label"() {
      return v.ariaLabel();
    },
    get "aria-labelledby"() {
      return v.ariaLabelledBy();
    },
    get "aria-describedby"() {
      return v.ariaDescribedBy();
    },
    get "aria-invalid"() {
      return i.validationState() === "invalid" || void 0;
    },
    get "aria-required"() {
      return i.isRequired();
    },
    get "aria-disabled"() {
      return i.isDisabled();
    },
    get "aria-readonly"() {
      return i.isReadOnly();
    },
    onChange: m,
    onFocus: _,
    onBlur: w
  }, () => i.dataset(), () => o.dataset(), d));
}
function z2(e) {
  const n = Qi();
  return b(r8, he(() => n.dataset(), e));
}
function B0(e) {
  let n;
  const i = `checkbox-${A0()}`, o = Nr({
    value: "on",
    id: i
  }, e), [s, c, f] = Ke(o, ["ref", "children", "value", "checked", "defaultChecked", "indeterminate", "onChange", "onPointerDown"], F7), [d, v] = W(), [g, p] = W(!1), {
    formControlContext: m
  } = W7(c), _ = Q7({
    isSelected: () => s.checked,
    defaultIsSelected: () => s.defaultChecked,
    onSelectedChange: (S) => s.onChange?.(S),
    isDisabled: () => m.isDisabled(),
    isReadOnly: () => m.isReadOnly()
  });
  i8(() => n, () => _.setIsSelected(s.defaultChecked ?? !1));
  const w = (S) => {
    Xa(S, s.onPointerDown), g() && S.preventDefault();
  }, C = oe(() => ({
    "data-checked": _.isSelected() ? "" : void 0,
    "data-indeterminate": s.indeterminate ? "" : void 0
  })), k = {
    value: () => s.value,
    dataset: C,
    checked: () => _.isSelected(),
    indeterminate: () => s.indeterminate ?? !1,
    inputRef: d,
    generateId: k2(() => et(c.id)),
    toggle: () => _.toggle(),
    setIsChecked: (S) => _.setIsSelected(S),
    setIsFocused: p,
    setInputRef: v
  };
  return b(E2.Provider, {
    value: m,
    get children() {
      return b(T2.Provider, {
        value: k,
        get children() {
          return b(Zi, he({
            as: "div",
            ref(S) {
              const E = Nu((O) => n = O, s.ref);
              typeof E == "function" && E(S);
            },
            role: "group",
            get id() {
              return et(c.id);
            },
            onPointerDown: w
          }, () => m.dataset(), C, f, {
            get children() {
              return b(v8, {
                state: k,
                get children() {
                  return s.children;
                }
              });
            }
          }));
        }
      });
    }
  });
}
function v8(e) {
  const n = C0(() => {
    const i = e.children;
    return C2(i) ? i(e.state) : i;
  });
  return ft(n);
}
var g8 = Object.assign(B0, {
  Control: L0,
  Description: N2,
  ErrorMessage: O2,
  Indicator: U0,
  Input: H0,
  Label: z2
}), p8 = `.novu{scrollbar-color:var(--nv-color-secondary-foreground-alpha-300) #0000;:where(*),:where(*) :after,:where(*) :before,:where(*):after,:where(*):before{border:0 solid #e5e7eb;box-sizing:border-box}:where(html,:host){line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;tab-size:4;-webkit-tap-highlight-color:transparent}:where(body){line-height:inherit;margin:0}:where(hr){border-top-width:1px;color:inherit;height:0}:where(abbr:where([title])){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}:where(h1,h2,h3,h4,h5,h6){font-size:inherit;font-weight:inherit}:where(a){color:inherit;text-decoration:inherit}:where(b,strong){font-weight:bolder}:where(code,kbd,samp,pre){font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}:where(small){font-size:80%}:where(sub,sup){font-size:75%;line-height:0;position:relative;vertical-align:initial}:where(sub){bottom:-.25em}:where(sup){top:-.5em}:where(table){border-collapse:collapse;border-color:inherit;text-indent:0}:where(button,input,optgroup,select,textarea){color:inherit;font-family:inherit;font-feature-settings:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0}:where(button,select){text-transform:none}:where(button,input:where([type=button]),input:where([type=reset]),input:where([type=submit])){-webkit-appearance:button;background-color:initial;background-image:none}:where(:-moz-focusring){outline:auto}:where(:-moz-ui-invalid){box-shadow:none}:where(progress){vertical-align:initial}:where(*)::-webkit-inner-spin-button,:where(*)::-webkit-outer-spin-button{height:auto}:where([type=search]){-webkit-appearance:textfield;outline-offset:-2px}:where(*)::-webkit-search-decoration{-webkit-appearance:none}:where(*)::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}:where(summary){display:list-item}:where(blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre){margin:0}:where(fieldset){margin:0;padding:0}:where(legend){padding:0}:where(ol,ul,menu){list-style:none;margin:0;padding:0}:where(dialog){padding:0}:where(textarea){resize:vertical}:where(input)::placeholder,:where(textarea)::placeholder{color:#9ca3af;opacity:1}:where(button,[role=button]){cursor:pointer}:where(:disabled){cursor:default}:where(img,svg,video,canvas,audio,iframe,embed,object){display:block;vertical-align:middle}:where(img,video){height:auto;max-width:100%}:where([hidden]){display:none}:where(*),:where(*) :after,:where(*) :before,:where(*):after,:where(*):before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }:where(*) ::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::-webkit-scrollbar{height:.5rem;width:.5rem}::-webkit-scrollbar-thumb{background-clip:"padding-box";background-color:var(--nv-color-secondary-foreground-alpha-300);border-radius:.25rem}::-webkit-scrollbar-corner,::-webkit-scrollbar-track{background-color:initial}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}}.nt-sr-only{height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;clip:rect(0,0,0,0);border-width:0;white-space:nowrap}.\\!nt-pointer-events-auto{pointer-events:auto!important}.nt-invisible{visibility:hidden}.nt-absolute{position:absolute}.nt-relative{position:relative}.nt-inset-0{inset:0}.nt-inset-2{inset:.5rem}.nt-bottom-0{bottom:0}.nt-left-0{left:0}.nt-left-0\\.5{left:.125rem}.nt-right-0{right:0}.nt-right-3{right:.75rem}.nt-top-0{top:0}.nt-top-0\\.5{top:.125rem}.nt-top-3{top:.75rem}.nt-z-10{z-index:10}.nt-z-\\[-1\\]{z-index:-1}.-nt-m-1{margin:-.25rem}.nt-mx-auto{margin-left:auto;margin-right:auto}.-nt-mt-2{margin-top:-.5rem}.-nt-mt-\\[2px\\]{margin-top:-2px}.nt--mt-\\[50px\\]{margin-top:-50px}.nt-mb-1{margin-bottom:.25rem}.nt-mb-2{margin-bottom:.5rem}.nt-mb-3{margin-bottom:.75rem}.nt-mb-4{margin-bottom:1rem}.nt-mb-\\[0\\.625rem\\]{margin-bottom:.625rem}.nt-ml-1{margin-left:.25rem}.nt-ml-2{margin-left:.5rem}.nt-ml-auto{margin-left:auto}.nt-mr-2{margin-right:.5rem}.nt-mr-auto{margin-right:auto}.nt-mt-1{margin-top:.25rem}.nt-mt-1\\.5{margin-top:.375rem}.nt-mt-auto{margin-top:auto}.nt-block{display:block}.nt-flex{display:flex}.nt-inline-flex{display:inline-flex}.nt-grid{display:grid}.nt-hidden{display:none}.nt-aspect-square{aspect-ratio:1/1}.nt-size-1\\.5{height:.375rem;width:.375rem}.nt-size-2{height:.5rem;width:.5rem}.nt-size-2\\.5{height:.625rem;width:.625rem}.nt-size-3{height:.75rem;width:.75rem}.nt-size-3\\.5{height:.875rem;width:.875rem}.nt-size-4{height:1rem;width:1rem}.nt-size-5{height:1.25rem;width:1.25rem}.nt-size-8{height:2rem;width:2rem}.nt-size-fit{height:fit-content;width:fit-content}.nt-size-full{height:100%;width:100%}.nt-h-2{height:.5rem}.nt-h-3{height:.75rem}.nt-h-3\\.5{height:.875rem}.nt-h-4{height:1rem}.nt-h-5{height:1.25rem}.nt-h-7{height:1.75rem}.nt-h-8{height:2rem}.nt-h-9{height:2.25rem}.nt-h-\\[600px\\]{height:600px}.nt-h-fit{height:fit-content}.nt-h-full{height:100%}.nt-max-h-\\[160px\\]{max-height:160px}.nt-min-h-0{min-height:0}.nt-w-1\\.5{width:.375rem}.nt-w-1\\/3{width:33.333333%}.nt-w-2\\/3{width:66.666667%}.nt-w-5{width:1.25rem}.nt-w-7{width:1.75rem}.nt-w-8{width:2rem}.nt-w-\\[260px\\]{width:260px}.nt-w-\\[3px\\]{width:3px}.nt-w-\\[400px\\]{width:400px}.nt-w-\\[60px\\]{width:60px}.nt-w-\\[calc\\(2ch\\+2rem\\)\\]{width:calc(2ch + 2rem)}.nt-w-fit{width:fit-content}.nt-w-full{width:100%}.nt-w-max{width:max-content}.nt-min-w-52{min-width:13rem}.nt-min-w-\\[120px\\]{min-width:120px}.nt-min-w-\\[220px\\]{min-width:220px}.nt-min-w-\\[74px\\]{min-width:74px}.nt-max-w-56{max-width:14rem}.nt-max-w-\\[120px\\]{max-width:120px}.nt-max-w-\\[220px\\]{max-width:220px}.nt-flex-1{flex:1 1 0%}.nt-shrink-0{flex-shrink:0}.nt-translate-x-1\\/2{--tw-translate-x:50%}.nt-transform,.nt-translate-x-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.nt-cursor-default{cursor:default}.nt-cursor-not-allowed{cursor:not-allowed}.nt-cursor-pointer{cursor:pointer}.nt-grid-cols-7{grid-template-columns:repeat(7,minmax(0,1fr))}.nt-flex-row{flex-direction:row}.nt-flex-col{flex-direction:column}.nt-flex-wrap{flex-wrap:wrap}.nt-flex-nowrap{flex-wrap:nowrap}.nt-items-start{align-items:flex-start}.nt-items-center{align-items:center}.nt-justify-end{justify-content:flex-end}.nt-justify-center{justify-content:center}.nt-justify-between{justify-content:space-between}.nt-gap-0\\.5{gap:.125rem}.nt-gap-1{gap:.25rem}.nt-gap-1\\.5{gap:.375rem}.nt-gap-2{gap:.5rem}.nt-gap-3{gap:.75rem}.nt-gap-4{gap:1rem}.nt-gap-6{gap:1.5rem}.nt-gap-8{gap:2rem}.nt-self-stretch{align-self:stretch}.nt-overflow-auto{overflow:auto}.nt-overflow-hidden{overflow:hidden}.nt-overflow-y-auto{overflow-y:auto}.nt-truncate{overflow:hidden;text-overflow:ellipsis}.nt-truncate,.nt-whitespace-nowrap{white-space:nowrap}.nt-whitespace-pre-wrap{white-space:pre-wrap}.nt-rounded{border-radius:var(--nv-radius-base)}.nt-rounded-full{border-radius:var(--nv-radius-full)}.nt-rounded-lg{border-radius:var(--nv-radius-lg)}.nt-rounded-md{border-radius:var(--nv-radius-md)}.nt-rounded-sm{border-radius:var(--nv-radius-sm)}.nt-rounded-xl{border-radius:var(--nv-radius-xl)}.nt-border{border-width:1px}.nt-border-b{border-bottom-width:1px}.nt-border-t{border-top-width:1px}.nt-border-background{border-color:var(--nv-color-background)}.nt-border-border{border-color:var(--nv-color-neutral-alpha-100)}.nt-border-neutral-200{--tw-border-opacity:1;border-color:rgb(229 229 229/var(--tw-border-opacity,1))}.nt-border-neutral-alpha-100{border-color:var(--nv-color-neutral-alpha-100)}.nt-border-neutral-alpha-200{border-color:var(--nv-color-neutral-alpha-200)}.nt-border-neutral-alpha-400{border-color:var(--nv-color-neutral-alpha-400)}.nt-border-neutral-alpha-50{border-color:var(--nv-color-neutral-alpha-50)}.nt-border-primary{border-color:var(--nv-color-primary)}.nt-border-t-neutral-alpha-200{border-top-color:var(--nv-color-neutral-alpha-200)}.nt-bg-\\[oklch\\(from_var\\(--nv-color-stripes\\)_l_c_h_\\/_0\\.1\\)\\]{background-color:oklch(from var(--nv-color-stripes) l c h/.1)}.nt-bg-background{background-color:var(--nv-color-background)}.nt-bg-counter{background-color:var(--nv-color-counter)}.nt-bg-foreground{background-color:var(--nv-color-foreground)}.nt-bg-neutral-900{--tw-bg-opacity:1;background-color:rgb(23 23 23/var(--tw-bg-opacity,1))}.nt-bg-neutral-alpha-100{background-color:var(--nv-color-neutral-alpha-100)}.nt-bg-neutral-alpha-25{background-color:var(--nv-color-neutral-alpha-25)}.nt-bg-neutral-alpha-300{background-color:var(--nv-color-neutral-alpha-300)}.nt-bg-neutral-alpha-50{background-color:var(--nv-color-neutral-alpha-50)}.nt-bg-primary{background-color:var(--nv-color-primary)}.nt-bg-primary-alpha-300{background-color:var(--nv-color-primary-alpha-300)}.nt-bg-primary-alpha-400{background-color:var(--nv-color-primary-alpha-400)}.nt-bg-secondary{background-color:var(--nv-color-secondary)}.nt-bg-severity-high{background-color:var(--nv-color-severity-high)}.nt-bg-severity-high-alpha-100{background-color:var(--nv-color-severity-high-alpha-100)}.nt-bg-severity-high-alpha-200{background-color:var(--nv-color-severity-high-alpha-200)}.nt-bg-severity-high-alpha-300{background-color:var(--nv-color-severity-high-alpha-300)}.nt-bg-severity-high-alpha-50{background-color:var(--nv-color-severity-high-alpha-50)}.nt-bg-severity-low{background-color:var(--nv-color-severity-low)}.nt-bg-severity-low-alpha-100{background-color:var(--nv-color-severity-low-alpha-100)}.nt-bg-severity-low-alpha-200{background-color:var(--nv-color-severity-low-alpha-200)}.nt-bg-severity-low-alpha-300{background-color:var(--nv-color-severity-low-alpha-300)}.nt-bg-severity-low-alpha-50{background-color:var(--nv-color-severity-low-alpha-50)}.nt-bg-severity-medium{background-color:var(--nv-color-severity-medium)}.nt-bg-severity-medium-alpha-100{background-color:var(--nv-color-severity-medium-alpha-100)}.nt-bg-severity-medium-alpha-200{background-color:var(--nv-color-severity-medium-alpha-200)}.nt-bg-severity-medium-alpha-300{background-color:var(--nv-color-severity-medium-alpha-300)}.nt-bg-severity-medium-alpha-50{background-color:var(--nv-color-severity-medium-alpha-50)}.nt-bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.nt-bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.nt-bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.nt-from-foreground-alpha-50{--tw-gradient-from:var(--nv-color-foreground-alpha-50) var(--tw-gradient-from-position);--tw-gradient-to:#fff0 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.nt-from-primary-foreground-alpha-200{--tw-gradient-from:var(--nv-color-primary-foreground-alpha-200) var(--tw-gradient-from-position);--tw-gradient-to:#fff0 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.nt-from-transparent{--tw-gradient-from:#0000 var(--tw-gradient-from-position);--tw-gradient-to:#0000 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.nt-from-20\\%{--tw-gradient-from-position:20%}.nt-to-background{--tw-gradient-to:var(--nv-color-background) var(--tw-gradient-to-position)}.nt-to-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.nt-object-cover{object-fit:cover}.nt-p-0{padding:0}.nt-p-0\\.5{padding:.125rem}.nt-p-1{padding:.25rem}.nt-p-2{padding:.5rem}.nt-p-2\\.5{padding:.625rem}.nt-p-3{padding:.75rem}.nt-p-4{padding:1rem}.nt-px-1{padding-left:.25rem;padding-right:.25rem}.nt-px-2{padding-left:.5rem;padding-right:.5rem}.nt-px-3{padding-left:.75rem;padding-right:.75rem}.nt-px-4{padding-left:1rem;padding-right:1rem}.nt-px-8{padding-left:2rem;padding-right:2rem}.nt-px-\\[6px\\]{padding-left:6px;padding-right:6px}.nt-py-1{padding-bottom:.25rem;padding-top:.25rem}.nt-py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.nt-py-2{padding-bottom:.5rem;padding-top:.5rem}.nt-py-3{padding-bottom:.75rem;padding-top:.75rem}.nt-py-3\\.5{padding-bottom:.875rem;padding-top:.875rem}.nt-py-4{padding-bottom:1rem;padding-top:1rem}.nt-py-px{padding-bottom:1px;padding-top:1px}.nt-pb-2{padding-bottom:.5rem}.nt-pb-\\[0\\.625rem\\]{padding-bottom:.625rem}.nt-pr-0{padding-right:0}.nt-pt-2{padding-top:.5rem}.nt-pt-2\\.5{padding-top:.625rem}.nt-text-left{text-align:left}.nt-text-center{text-align:center}.nt-text-start{text-align:start}.nt-font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.nt-text-\\[0\\.8rem\\]{font-size:.8rem}.nt-text-\\[12px\\]{font-size:12px}.nt-text-base{font-size:var(--nv-font-size-base);line-height:var(--nv-line-height-base)}.nt-text-sm{font-size:var(--nv-font-size-sm);line-height:var(--nv-line-height-sm)}.nt-text-xl{font-size:var(--nv-font-size-xl);line-height:var(--nv-line-height-xl)}.nt-text-xs{font-size:var(--nv-font-size-xs);line-height:var(--nv-line-height-xs)}.nt-font-medium{font-weight:500}.nt-font-normal{font-weight:400}.nt-font-semibold{font-weight:600}.nt-leading-none{line-height:1}.nt-text-\\[\\#000000\\]{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity,1))}.nt-text-background{color:var(--nv-color-background)}.nt-text-counter-foreground{color:var(--nv-color-counter-foreground)}.nt-text-foreground{color:var(--nv-color-foreground)}.nt-text-foreground-alpha-300{color:var(--nv-color-foreground-alpha-300)}.nt-text-foreground-alpha-400{color:var(--nv-color-foreground-alpha-400)}.nt-text-foreground-alpha-600{color:var(--nv-color-foreground-alpha-600)}.nt-text-foreground-alpha-700{color:var(--nv-color-foreground-alpha-700)}.nt-text-neutral-600{--tw-text-opacity:1;color:rgb(82 82 82/var(--tw-text-opacity,1))}.nt-text-neutral-alpha-500{color:var(--nv-color-neutral-alpha-500)}.nt-text-primary-foreground{color:var(--nv-color-primary-foreground)}.nt-text-secondary-foreground{color:var(--nv-color-secondary-foreground)}.nt-text-stripes{color:var(--nv-color-stripes)}.nt-text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.nt-underline{text-decoration-line:underline}.nt-opacity-0{opacity:0}.nt-opacity-20{opacity:.2}.nt-opacity-50{opacity:.5}.nt-shadow{--tw-shadow:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-\\[0_0_0_0\\.5px_var\\(--nv-color-primary-600\\)\\]{--tw-shadow:0 0 0 0.5px var(--nv-color-primary-600);--tw-shadow-colored:0 0 0 0.5px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-\\[0_0_0_0\\.5px_var\\(--nv-color-secondary-600\\)\\]{--tw-shadow:0 0 0 0.5px var(--nv-color-secondary-600);--tw-shadow-colored:0 0 0 0.5px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-\\[0px_1px_2px_0px_rgba\\(10\\,13\\,20\\,0\\.03\\)\\]{--tw-shadow:0px 1px 2px 0px #0a0d1408;--tw-shadow-colored:0px 1px 2px 0px var(--tw-shadow-color)}.nt-shadow-\\[0px_1px_2px_0px_rgba\\(10\\,13\\,20\\,0\\.03\\)\\],.nt-shadow-dropdown{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-dropdown{--tw-shadow:0px 12px 16px -4px oklch(from var(--nv-color-shadow) l c h/0.08),0px 4px 6px -2px oklch(from var(--nv-color-shadow) l c h/0.03);--tw-shadow-colored:0px 12px 16px -4px var(--tw-shadow-color),0px 4px 6px -2px var(--tw-shadow-color)}.nt-shadow-lg{--tw-shadow:0 10px 15px -3px #0000001a,0 4px 6px -4px #0000001a;--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.nt-shadow-lg,.nt-shadow-none{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-none{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000}.nt-shadow-popover{--tw-shadow:0px 8px 26px 0px oklch(from var(--nv-color-shadow) l c h/0.08),0px 2px 6px 0px oklch(from var(--nv-color-shadow) l c h/0.12);--tw-shadow-colored:0px 8px 26px 0px var(--tw-shadow-color),0px 2px 6px 0px var(--tw-shadow-color)}.nt-shadow-popover,.nt-shadow-sm{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.nt-shadow-tooltip{--tw-shadow:0 5px 20px 0 oklch(from var(--nv-color-shadow) l c h/0.08);--tw-shadow-colored:0 5px 20px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.nt-outline-none{outline:2px solid #0000;outline-offset:2px}.nt-ring-offset-background{--tw-ring-offset-color:var(--nv-color-background)}.nt-backdrop-blur-lg{--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.nt-transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.nt-transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.nt-transition-colors{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1)}.nt-transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.nt-duration-100{transition-duration:.1s}.nt-duration-200{transition-duration:.2s}.nt-ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0) scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1)) rotate(var(--tw-enter-rotate,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0) scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1)) rotate(var(--tw-exit-rotate,0))}}.nt-animate-in{animation-duration:.15s;animation-name:enter;--tw-enter-opacity:initial;--tw-enter-scale:initial;--tw-enter-rotate:initial;--tw-enter-translate-x:initial;--tw-enter-translate-y:initial}.nt-fade-in{--tw-enter-opacity:0}.nt-slide-in-from-top-2{--tw-enter-translate-y:-0.5rem}.nt-duration-100{animation-duration:.1s}.nt-duration-200{animation-duration:.2s}.nt-ease-out{animation-timing-function:cubic-bezier(0,0,.2,1)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-foreground\\)_80\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-foreground) 80% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-high\\)_45\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-high) 45% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-high\\)_80\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-high) 80% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-low\\)_45\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-low) 45% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-low\\)_80\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-low) 80% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-medium\\)_45\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-medium) 45% c h)}.\\[--bell-gradient-end\\:oklch\\(from_var\\(--nv-color-severity-medium\\)_80\\%_c_h\\)\\]{--bell-gradient-end:oklch(from var(--nv-color-severity-medium) 80% c h)}.\\[--bell-gradient-start\\:var\\(--nv-color-foreground\\)\\]{--bell-gradient-start:var(--nv-color-foreground)}.\\[--bell-gradient-start\\:var\\(--nv-color-severity-high\\)\\]{--bell-gradient-start:var(--nv-color-severity-high)}.\\[--bell-gradient-start\\:var\\(--nv-color-severity-low\\)\\]{--bell-gradient-start:var(--nv-color-severity-low)}.\\[--bell-gradient-start\\:var\\(--nv-color-severity-medium\\)\\]{--bell-gradient-start:var(--nv-color-severity-medium)}.\\[interpolate-size\\:allow-keywords\\]{interpolate-size:allow-keywords}.\\[scrollbar-gutter\\:stable\\]{scrollbar-gutter:stable}.\\[word-break\\:break-word\\]{word-break:break-word}.before\\:nt-absolute:before{content:var(--tw-content);position:absolute}.before\\:nt-inset-0:before{content:var(--tw-content);inset:0}.before\\:-nt-right-\\[calc\\(0\\+var\\(--stripes-size\\)\\)\\]:before{content:var(--tw-content);right:calc(var(--stripes-size)*-1)}.before\\:nt-m-1:before{content:var(--tw-content);margin:.25rem}@keyframes nt-stripes{0%{content:var(--tw-content);transform:translateX(0)}to{content:var(--tw-content);transform:translateX(calc(var(--stripes-size)*-1))}}.before\\:nt-animate-stripes:before{animation:nt-stripes 1s linear infinite paused;content:var(--tw-content)}.before\\:nt-rounded-full:before{border-radius:var(--nv-radius-full);content:var(--tw-content)}.before\\:nt-rounded-lg:before{border-radius:var(--nv-radius-lg);content:var(--tw-content)}.before\\:nt-rounded-md:before{border-radius:var(--nv-radius-md);content:var(--tw-content)}.before\\:nt-rounded-xl:before{border-radius:var(--nv-radius-xl);content:var(--tw-content)}.before\\:nt-border:before{border-width:1px;content:var(--tw-content)}.before\\:nt-border-primary-foreground-alpha-100:before{border-color:var(--nv-color-primary-foreground-alpha-100);content:var(--tw-content)}.before\\:nt-border-secondary-foreground-alpha-100:before{border-color:var(--nv-color-secondary-foreground-alpha-100);content:var(--tw-content)}.before\\:nt-bg-severity-high-alpha-200:before{background-color:var(--nv-color-severity-high-alpha-200);content:var(--tw-content)}.before\\:nt-bg-severity-high-alpha-300:before{background-color:var(--nv-color-severity-high-alpha-300);content:var(--tw-content)}.before\\:nt-bg-severity-low-alpha-200:before{background-color:var(--nv-color-severity-low-alpha-200);content:var(--tw-content)}.before\\:nt-bg-severity-low-alpha-300:before{background-color:var(--nv-color-severity-low-alpha-300);content:var(--tw-content)}.before\\:nt-bg-severity-medium-alpha-200:before{background-color:var(--nv-color-severity-medium-alpha-200);content:var(--tw-content)}.before\\:nt-bg-severity-medium-alpha-300:before{background-color:var(--nv-color-severity-medium-alpha-300);content:var(--tw-content)}.before\\:nt-bg-dev-stripes-gradient:before{background-image:repeating-linear-gradient(135deg,oklch(from var(--nv-color-stripes) l c h/.1) 25%,oklch(from var(--nv-color-stripes) l c h/.1) 50%,oklch(from var(--nv-color-stripes) l c h/.2) 50%,oklch(from var(--nv-color-stripes) l c h/.2) 75%);content:var(--tw-content)}.before\\:nt-bg-\\[length\\:var\\(--stripes-size\\)_var\\(--stripes-size\\)\\]:before{background-size:var(--stripes-size) var(--stripes-size);content:var(--tw-content)}.before\\:nt-content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.before\\:\\[mask-image\\:linear-gradient\\(transparent_0\\%\\2c black\\)\\]:before{content:var(--tw-content);-webkit-mask-image:linear-gradient(#0000,#000);mask-image:linear-gradient(#0000,#000)}.after\\:nt-absolute:after{content:var(--tw-content);position:absolute}.after\\:nt-inset-0:after{content:var(--tw-content);inset:0}.after\\:-nt-top-12:after{content:var(--tw-content);top:-3rem}.after\\:nt-bottom-0:after{bottom:0;content:var(--tw-content)}.after\\:nt-left-0:after{content:var(--tw-content);left:0}.after\\:nt-left-0\\.5:after{content:var(--tw-content);left:.125rem}.after\\:nt-top-0\\.5:after{content:var(--tw-content);top:.125rem}.after\\:nt-size-3:after{content:var(--tw-content);height:.75rem;width:.75rem}.after\\:nt-h-\\[2px\\]:after{content:var(--tw-content);height:2px}.after\\:nt-w-full:after{content:var(--tw-content);width:100%}.after\\:nt-translate-x-1\\/2:after{--tw-translate-x:50%}.after\\:nt-translate-x-1\\/2:after,.after\\:nt-translate-x-full:after{content:var(--tw-content);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.after\\:nt-translate-x-full:after{--tw-translate-x:100%}.after\\:nt-rounded-full:after{border-radius:var(--nv-radius-full);content:var(--tw-content)}.after\\:nt-rounded-lg:after{border-radius:var(--nv-radius-lg);content:var(--tw-content)}.after\\:nt-rounded-md:after{border-radius:var(--nv-radius-md);content:var(--tw-content)}.after\\:nt-rounded-xl:after{border-radius:var(--nv-radius-xl);content:var(--tw-content)}.after\\:nt-border-b-2:after{border-bottom-width:2px;content:var(--tw-content)}.after\\:nt-border-background:after{border-color:var(--nv-color-background);content:var(--tw-content)}.after\\:nt-border-b-primary:after{border-bottom-color:var(--nv-color-primary);content:var(--tw-content)}.after\\:nt-border-b-transparent:after{border-bottom-color:#0000;content:var(--tw-content)}.after\\:nt-bg-background:after{background-color:var(--nv-color-background);content:var(--tw-content)}.after\\:nt-bg-\\[linear-gradient\\(180deg\\2c transparent\\2c oklch\\(from_var\\(--nv-color-background\\)_l_c_h_\\/_0\\.9\\)_55\\%\\2c transparent\\)\\]:after{background-image:linear-gradient(180deg,#0000,oklch(from var(--nv-color-background) l c h/.9) 55%,#0000);content:var(--tw-content)}.after\\:nt-bg-\\[linear-gradient\\(180deg\\2c transparent\\2c oklch\\(from_var\\(--nv-color-stripes\\)_l_c_h_\\/_0\\.07\\)_55\\%\\2c transparent\\)\\2c linear-gradient\\(180deg\\2c transparent\\2c oklch\\(from_var\\(--nv-color-background\\)_l_c_h_\\/_0\\.9\\)_55\\%\\2c transparent\\)\\]:after{background-image:linear-gradient(180deg,#0000,oklch(from var(--nv-color-stripes) l c h/.07) 55%,#0000),linear-gradient(180deg,#0000,oklch(from var(--nv-color-background) l c h/.9) 55%,#0000);content:var(--tw-content)}.after\\:nt-bg-gradient-to-b:after{background-image:linear-gradient(to bottom,var(--tw-gradient-stops));content:var(--tw-content)}.after\\:nt-from-primary-foreground-alpha-50:after{content:var(--tw-content);--tw-gradient-from:var(--nv-color-primary-foreground-alpha-50) var(--tw-gradient-from-position);--tw-gradient-to:#fff0 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.after\\:nt-from-secondary-foreground-alpha-50:after{content:var(--tw-content);--tw-gradient-from:var(--nv-color-secondary-foreground-alpha-50) var(--tw-gradient-from-position);--tw-gradient-to:#fff0 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.after\\:nt-to-transparent:after{content:var(--tw-content);--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.after\\:nt-opacity-0:after{content:var(--tw-content);opacity:0}.after\\:nt-transition-all:after{content:var(--tw-content);transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.after\\:nt-transition-opacity:after{content:var(--tw-content);transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.after\\:nt-duration-200:after{transition-duration:.2s}.after\\:nt-content-\\[\\"\\"\\]:after,.after\\:nt-content-\\[\\'\\'\\]:after{--tw-content:"";content:var(--tw-content)}.after\\:nt-duration-200:after{animation-duration:.2s;content:var(--tw-content)}.hover\\:nt-bg-neutral-alpha-100:hover{background-color:var(--nv-color-neutral-alpha-100)}.hover\\:nt-bg-neutral-alpha-50:hover{background-color:var(--nv-color-neutral-alpha-50)}.hover\\:nt-bg-primary-600:hover{background-color:var(--nv-color-primary-600)}.hover\\:nt-bg-primary-alpha-25:hover{background-color:var(--nv-color-primary-alpha-25)}.hover\\:nt-bg-primary-alpha-400:hover{background-color:var(--nv-color-primary-alpha-400)}.hover\\:nt-bg-severity-high-alpha-50:hover{background-color:var(--nv-color-severity-high-alpha-50)}.hover\\:nt-bg-severity-low-alpha-50:hover{background-color:var(--nv-color-severity-low-alpha-50)}.hover\\:nt-bg-severity-medium-alpha-50:hover{background-color:var(--nv-color-severity-medium-alpha-50)}.hover\\:nt-text-foreground-alpha-800:hover{color:var(--nv-color-foreground-alpha-800)}.before\\:hover\\:\\[animation-play-state\\:running\\]:hover:before{animation-play-state:running;content:var(--tw-content)}.hover\\:after\\:nt-opacity-100:hover:after{content:var(--tw-content);opacity:1}.focus\\:nt-outline-none:focus{outline:2px solid #0000;outline-offset:2px}.focus-visible\\:nt-rounded-lg:focus-visible{border-radius:var(--nv-radius-lg)}.focus-visible\\:nt-rounded-md:focus-visible{border-radius:var(--nv-radius-md)}.focus-visible\\:nt-rounded-xl:focus-visible{border-radius:var(--nv-radius-xl)}.focus-visible\\:nt-bg-neutral-alpha-50:focus-visible{background-color:var(--nv-color-neutral-alpha-50)}.focus-visible\\:nt-outline-none:focus-visible{outline:2px solid #0000;outline-offset:2px}.focus-visible\\:nt-ring-2:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible\\:nt-ring-primary:focus-visible{--tw-ring-color:var(--nv-color-primary)}.focus-visible\\:nt-ring-ring:focus-visible{--tw-ring-color:var(--nv-color-ring)}.focus-visible\\:nt-ring-offset-2:focus-visible{--tw-ring-offset-width:2px}.disabled\\:nt-pointer-events-none:disabled{pointer-events:none}.disabled\\:nt-opacity-20:disabled{opacity:.2}.disabled\\:nt-opacity-50:disabled{opacity:.5}.nt-group:focus-within .group-focus-within\\:nt-opacity-100{opacity:1}.nt-group:hover .group-hover\\:nt-bg-severity-high-alpha-500{background-color:var(--nv-color-severity-high-alpha-500)}.nt-group:hover .group-hover\\:nt-bg-severity-low-alpha-500{background-color:var(--nv-color-severity-low-alpha-500)}.nt-group:hover .group-hover\\:nt-bg-severity-medium-alpha-500{background-color:var(--nv-color-severity-medium-alpha-500)}.nt-group:hover .group-hover\\:nt-opacity-0{opacity:0}.nt-group:hover .group-hover\\:nt-opacity-100{opacity:1}.nt-peer:focus-visible~.peer-focus-visible\\:nt-outline-none{outline:2px solid #0000;outline-offset:2px}.nt-peer:focus-visible~.peer-focus-visible\\:nt-ring-2{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.nt-peer:focus-visible~.peer-focus-visible\\:nt-ring-offset-2{--tw-ring-offset-width:2px}.data-\\[open\\=true\\]\\:nt-rotate-180[data-open=true]{--tw-rotate:180deg}.data-\\[open\\=true\\]\\:nt-rotate-180[data-open=true],.data-\\[open\\=true\\]\\:nt-transform[data-open=true]{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[disabled\\]\\:nt-cursor-not-allowed[data-disabled]{cursor:not-allowed}.data-\\[checked\\]\\:nt-border-none[data-checked],.data-\\[indeterminate\\]\\:nt-border-none[data-indeterminate]{border-style:none}.data-\\[checked\\]\\:nt-bg-primary[data-checked],.data-\\[indeterminate\\]\\:nt-bg-primary[data-indeterminate]{background-color:var(--nv-color-primary)}.data-\\[checked\\]\\:nt-text-primary-foreground[data-checked]{color:var(--nv-color-primary-foreground)}.data-\\[disabled\\=true\\]\\:nt-text-foreground-alpha-400[data-disabled=true]{color:var(--nv-color-foreground-alpha-400)}.data-\\[disabled\\=true\\]\\:nt-text-foreground-alpha-600[data-disabled=true]{color:var(--nv-color-foreground-alpha-600)}.data-\\[indeterminate\\]\\:nt-text-primary-foreground[data-indeterminate]{color:var(--nv-color-primary-foreground)}.data-\\[state\\=active\\]\\:nt-text-foreground[data-state=active]{color:var(--nv-color-foreground)}.data-\\[disabled\\]\\:nt-opacity-50[data-disabled]{opacity:.5}.data-\\[state\\=active\\]\\:after\\:nt-border-b-2[data-state=active]:after{border-bottom-width:2px;content:var(--tw-content)}.data-\\[state\\=active\\]\\:after\\:nt-border-primary[data-state=active]:after{border-color:var(--nv-color-primary);content:var(--tw-content)}.data-\\[state\\=active\\]\\:after\\:nt-opacity-100[data-state=active]:after{content:var(--tw-content);opacity:1}.\\[\\&\\:not\\(\\:first-child\\)\\]\\:nt-border-t:not(:first-child){border-top-width:1px}.\\[\\&_\\.nv-notificationList\\]\\:nt-pb-12 .nv-notificationList{padding-bottom:3rem}.\\[\\&_\\.nv-notificationList\\]\\:nt-pb-8 .nv-notificationList{padding-bottom:2rem}.\\[\\&_\\.nv-preferencesContainer\\]\\:nt-pb-12 .nv-preferencesContainer{padding-bottom:3rem}.\\[\\&_\\.nv-preferencesContainer\\]\\:nt-pb-8 .nv-preferencesContainer{padding-bottom:2rem}.\\[\\&_stop\\]\\:nt-transition-\\[stop-color\\] stop{transition-duration:.15s;transition-property:stop-color;transition-timing-function:cubic-bezier(.4,0,.2,1)}.\\[\\&_svg\\]\\:nt-pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:nt-shrink-0 svg{flex-shrink:0}`, a1 = [
  // Primitives
  "button",
  "input",
  "icon",
  "badge",
  "popoverContent",
  "popoverTrigger",
  "popoverClose",
  "dropdownContent",
  "dropdownTrigger",
  "dropdownItem",
  "dropdownItemLabel",
  "dropdownItemLabelContainer",
  "dropdownItemLeft__icon",
  "dropdownItemRight__icon",
  "dropdownItem__icon",
  "collapsible",
  "tooltipContent",
  "tooltipTrigger",
  "datePicker",
  "datePickerGrid",
  "datePickerGridRow",
  "datePickerGridCell",
  "datePickerGridCellTrigger",
  "datePickerTrigger",
  "datePickerGridHeader",
  "datePickerControl",
  "datePickerControlPrevTrigger",
  "datePickerControlNextTrigger",
  "datePickerControlPrevTrigger__icon",
  "datePickerControlNextTrigger__icon",
  "datePickerCalendar",
  "datePickerHeaderMonth",
  "datePickerCalendarDay__button",
  "timePicker",
  "timePicker__hourSelect",
  "timePicker__minuteSelect",
  "timePicker__periodSelect",
  "timePicker__separator",
  "timePickerHour__input",
  "timePickerMinute__input",
  "snoozeDatePicker",
  "snoozeDatePicker__actions",
  "snoozeDatePickerCancel__button",
  "snoozeDatePickerApply__button",
  "snoozeDatePicker__timePickerContainer",
  "snoozeDatePicker__timePickerLabel",
  "back__button",
  "skeletonText",
  "skeletonAvatar",
  "skeletonSwitch",
  "skeletonSwitchThumb",
  "tabsRoot",
  "tabsList",
  "tabsContent",
  "tabsTrigger",
  "dots",
  // General
  "root",
  "bellIcon",
  "lockIcon",
  "bellContainer",
  "severityHigh__bellContainer",
  "severityMedium__bellContainer",
  "severityLow__bellContainer",
  "bellSeverityGlow",
  "severityGlowHigh__bellSeverityGlow",
  "severityGlowMedium__bellSeverityGlow",
  "severityGlowLow__bellSeverityGlow",
  "bellDot",
  "preferences__button",
  "preferencesContainer",
  "inboxHeader",
  "loading",
  // Inbox
  "inboxContent",
  "inbox__popoverTrigger",
  "inbox__popoverContent",
  // Notifications
  "notificationListContainer",
  "notificationList",
  "notificationListEmptyNoticeContainer",
  "notificationListEmptyNoticeOverlay",
  "notificationListEmptyNoticeIcon",
  "notificationListEmptyNotice",
  "notificationList__skeleton",
  "notificationList__skeletonContent",
  "notificationList__skeletonItem",
  "notificationList__skeletonAvatar",
  "notificationList__skeletonText",
  "notificationListNewNotificationsNotice__button",
  "notification",
  "severityHigh__notification",
  "severityMedium__notification",
  "severityLow__notification",
  "notificationBar",
  "severityHigh__notificationBar",
  "severityMedium__notificationBar",
  "severityLow__notificationBar",
  "notificationContent",
  "notificationTextContainer",
  "notificationDot",
  "notificationSubject",
  "notificationSubject__strong",
  "notificationBody",
  "notificationBody__strong",
  "notificationBodyContainer",
  "notificationImage",
  "notificationImageLoadingFallback",
  "notificationDate",
  "notificationDateActionsContainer",
  "notificationDefaultActions",
  "notificationCustomActions",
  "notificationPrimaryAction__button",
  "notificationSecondaryAction__button",
  "notificationRead__button",
  "notificationUnread__button",
  "notificationArchive__button",
  "notificationUnarchive__button",
  "notificationSnooze__button",
  "notificationUnsnooze__button",
  "notificationRead__icon",
  "notificationUnread__icon",
  "notificationArchive__icon",
  "notificationUnarchive__icon",
  "notificationSnooze__icon",
  "notificationUnsnooze__icon",
  // Notifications tabs
  "notificationsTabs__tabsRoot",
  "notificationsTabs__tabsList",
  "notificationsTabs__tabsContent",
  "notificationsTabs__tabsTrigger",
  "notificationsTabsTriggerLabel",
  "notificationsTabsTriggerCount",
  // Inbox status
  "inboxStatus__title",
  "inboxStatus__dropdownTrigger",
  "inboxStatus__dropdownContent",
  "inboxStatus__dropdownItem",
  "inboxStatus__dropdownItemLabel",
  "inboxStatus__dropdownItemLabelContainer",
  "inboxStatus__dropdownItemLeft__icon",
  "inboxStatus__dropdownItemRight__icon",
  "inboxStatus__dropdownItem__icon",
  "inboxStatus__dropdownItemCheck__icon",
  // More actions
  "moreActionsContainer",
  "moreActions__dropdownTrigger",
  "moreActions__dropdownContent",
  "moreActions__dropdownItem",
  "moreActions__dropdownItemLabel",
  "moreActions__dropdownItemLeft__icon",
  "moreActions__dots",
  // More tabs
  "moreTabs__button",
  "moreTabs__icon",
  "moreTabs__dropdownTrigger",
  "moreTabs__dropdownContent",
  "moreTabs__dropdownItem",
  "moreTabs__dropdownItemLabel",
  "moreTabs__dropdownItemRight__icon",
  // workflow
  "workflowContainer",
  "workflowLabel",
  "workflowLabelHeader",
  "workflowLabelHeaderContainer",
  "workflowLabelIcon",
  "workflowLabelContainer",
  "workflowContainerDisabledNotice",
  "workflowLabelDisabled__icon",
  "workflowContainerRight__icon",
  "workflowArrow__icon",
  "workflowDescription",
  // preference groups
  "preferencesGroupContainer",
  "preferencesGroupHeader",
  "preferencesGroupLabelContainer",
  "preferencesGroupLabelIcon",
  "preferencesGroupLabel",
  "preferencesGroupActionsContainer",
  "preferencesGroupActionsContainerRight__icon",
  "preferencesGroupBody",
  "preferencesGroupChannels",
  "preferencesGroupInfo",
  "preferencesGroupInfoIcon",
  "preferencesGroupWorkflows",
  // channel
  "channelContainer",
  "channelIconContainer",
  "channel__icon",
  "channelsContainerCollapsible",
  "channelsContainer",
  "channelLabel",
  "channelLabelContainer",
  "channelName",
  "channelSwitchContainer",
  "channelSwitch",
  "channelSwitchThumb",
  // Preferences Header
  "preferencesHeader",
  "preferencesHeader__back__button",
  "preferencesHeader__back__button__icon",
  "preferencesHeader__title",
  "preferencesHeader__icon",
  // Preferences Loading
  "preferencesListEmptyNoticeContainer",
  "preferencesListEmptyNotice",
  "preferencesList__skeleton",
  "preferencesList__skeletonContent",
  "preferencesList__skeletonItem",
  "preferencesList__skeletonIcon",
  "preferencesList__skeletonSwitch",
  "preferencesList__skeletonSwitchThumb",
  "preferencesList__skeletonText",
  // Schedule
  "scheduleContainer",
  "scheduleHeader",
  "scheduleLabelContainer",
  "scheduleLabelScheduleIcon",
  "scheduleLabelInfoIcon",
  "scheduleLabel",
  "scheduleActionsContainer",
  "scheduleActionsContainerRight",
  "scheduleBody",
  "scheduleDescription",
  "scheduleTable",
  "scheduleTableHeader",
  "scheduleHeaderColumn",
  "scheduleTableBody",
  "scheduleBodyRow",
  "scheduleBodyColumn",
  "scheduleInfoContainer",
  "scheduleInfoIcon",
  "scheduleInfo",
  // Day Schedule Copy
  "dayScheduleCopyTitle",
  "dayScheduleCopyIcon",
  "dayScheduleCopySelectAll",
  "dayScheduleCopyDay",
  "dayScheduleCopyFooterContainer",
  "dayScheduleCopy__dropdownTrigger",
  "dayScheduleCopy__dropdownContent",
  // Time Select
  "timeSelect__dropdownTrigger",
  "timeSelect__time",
  "timeSelect__dropdownContent",
  "timeSelect__dropdownItem",
  "timeSelect__dropdownItemLabel",
  "timeSelect__dropdownItemLabelContainer",
  "timeSelect__dropdownItemCheck__icon",
  // Notification Snooze
  "notificationSnooze__dropdownContent",
  "notificationSnooze__dropdownItem",
  "notificationSnooze__dropdownItem__icon",
  "notificationSnoozeCustomTime_popoverContent",
  // Notification Delivered At
  "notificationDeliveredAt__badge",
  "notificationDeliveredAt__icon",
  "notificationSnoozedUntil__icon",
  // Text formatting
  "strong"
], m8 = {
  locale: "en-US",
  "inbox.filters.dropdownOptions.unread": "Unread only",
  "inbox.filters.dropdownOptions.default": "Unread & read",
  "inbox.filters.dropdownOptions.archived": "Archived",
  "inbox.filters.dropdownOptions.snoozed": "Snoozed",
  "inbox.filters.labels.unread": "Unread",
  "inbox.filters.labels.default": "Inbox",
  "inbox.filters.labels.archived": "Archived",
  "inbox.filters.labels.snoozed": "Snoozed",
  "notifications.emptyNotice": "Quiet for now. Check back later.",
  "notifications.actions.readAll": "Mark all as read",
  "notifications.actions.archiveAll": "Archive all",
  "notifications.actions.archiveRead": "Archive read",
  "notifications.newNotifications": ({ notificationCount: e }) => `${e > 99 ? "99+" : e} new ${e === 1 ? "notification" : "notifications"}`,
  "notification.actions.read.tooltip": "Mark as read",
  "notification.actions.unread.tooltip": "Mark as unread",
  "notification.actions.archive.tooltip": "Archive",
  "notification.actions.unarchive.tooltip": "Unarchive",
  "notification.actions.snooze.tooltip": "Snooze",
  "notification.actions.unsnooze.tooltip": "Unsnooze",
  "notification.snoozedUntil": "Snoozed until",
  "preferences.title": "Preferences",
  "preferences.emptyNotice": "No notification specific preferences yet.",
  "preferences.global": "Global Preferences",
  "preferences.schedule.title": "Schedule",
  "preferences.schedule.description": "Allow notifications between:",
  "preferences.schedule.headerInfo": "Set your schedule. Notifications to external channels will pause outside the schedule. In-app and critical notifications are always delivered.",
  "preferences.schedule.info": "Critical and In-app notifications still reach you outside your schedule.",
  "preferences.schedule.days": "Days",
  "preferences.schedule.from": "From",
  "preferences.schedule.to": "To",
  "preferences.schedule.copyTimesTo": "Copy times to",
  "preferences.schedule.sunday": "Sunday",
  "preferences.schedule.monday": "Monday",
  "preferences.schedule.tuesday": "Tuesday",
  "preferences.schedule.wednesday": "Wednesday",
  "preferences.schedule.thursday": "Thursday",
  "preferences.schedule.friday": "Friday",
  "preferences.schedule.saturday": "Saturday",
  "preferences.schedule.dayScheduleCopy.title": "Copy times to:",
  "preferences.schedule.dayScheduleCopy.selectAll": "Select all",
  "preferences.schedule.dayScheduleCopy.apply": "Apply",
  "preferences.workflow.disabled.notice": "Contact admin to enable subscription management for this critical notification.",
  "preferences.workflow.disabled.tooltip": "Contact admin to edit",
  "preferences.group.info": "Applies to all notifications under this group.",
  "snooze.datePicker.timePickerLabel": "Time",
  "snooze.datePicker.apply": "Apply",
  "snooze.datePicker.cancel": "Cancel",
  "snooze.options.anHourFromNow": "An hour from now",
  "snooze.datePicker.pastDateTooltip": "Selected time must be at least 3 minutes in the future",
  "snooze.datePicker.noDateSelectedTooltip": "Please select a date",
  "snooze.datePicker.exceedingLimitTooltip": ({ days: e }) => `Selected time cannot exceed ${e === 1 ? "24 hours" : `${e} days`} from now`,
  "snooze.options.customTime": "Custom time...",
  "snooze.options.inOneDay": "Tomorrow",
  "snooze.options.inOneWeek": "Next week"
}, [y8, b8] = W({}), w8 = {
  colorPrimary: "#7D52F4",
  colorPrimaryForeground: "white",
  colorSecondary: "#FFFFFF",
  colorSecondaryForeground: "#646464",
  colorCounter: "#FB3748",
  colorCounterForeground: "white",
  colorBackground: "#FCFCFC",
  colorRing: "#E1E4EA",
  colorForeground: "#1A1523",
  colorNeutral: "#525252",
  colorShadow: "rgb(0,0,0)",
  fontSize: "1rem",
  borderRadius: "0.375rem",
  colorStripes: "#FF9A68",
  colorSeverityHigh: "#FB3748",
  colorSeverityMedium: "#FF8447",
  colorSeverityLow: "transparent"
}, _8 = "_blank", x8 = "noopener noreferrer";
function S8(e, n) {
  const [i, o] = W([]), [s, c] = W(!0), [f, d] = W(void 0), [v, g] = W(!1), [p, { mutate: m, refetch: _ }] = Tb(
    () => ({ trigger: !0, after: f() }),
    (O) => e(O.after)
  );
  let w = null, C = null;
  qt(() => {
    C = new IntersectionObserver(
      (O) => {
        var A;
        const D = O[0];
        if (D && D.isIntersecting && !v() && !p.loading) {
          const L = (A = p.latest) == null ? void 0 : A.data;
          L && d(L[L.length - 1][n.paginationField]);
        }
      },
      {
        threshold: 0.1
      }
    ), w && C && C.observe(w), $e(() => {
      C?.disconnect(), C = null;
    });
  }), Ue(() => {
    if (p.loading) return;
    const O = p.latest;
    O && (c(!1), Nb(() => {
      O.hasMore || g(!0), o(O.data), requestAnimationFrame(() => {
        k();
      });
    }));
  });
  const k = () => {
    if (w && !v() && !p.loading) {
      const O = new IntersectionObserver(
        (A) => {
          var D;
          if (A[0].isIntersecting) {
            const F = (D = p.latest) == null ? void 0 : D.data;
            F && d(F[F.length - 1][n.paginationField]);
          }
          O.disconnect();
        },
        {
          threshold: [0.1]
        }
      );
      O.observe(w), $e(() => {
        O.disconnect();
      });
    }
  };
  return [
    i,
    {
      initialLoading: s,
      setEl: (O) => {
        C && w && C.unobserve(w), w = O, C && O && C.observe(O), $e(() => {
          C && O && C.unobserve(O);
        });
      },
      after: f,
      end: v,
      mutate: m,
      reset: () => P(this, null, function* () {
        o([]), c(!0), g(!1), f() !== void 0 ? d(void 0) : yield _();
      })
    }
  ];
}
var M2 = "en-US", Wt = {
  inMinute: 60,
  inHour: 3600,
  inDay: 86400,
  inWeek: 604800,
  inMonth: 2592e3
};
function o1({
  fromDate: e,
  locale: n = M2,
  toDate: i = /* @__PURE__ */ new Date()
}) {
  const o = i.getTime() - e.getTime(), s = new Intl.RelativeTimeFormat(n, { style: "narrow" }), c = Math.floor(o / 1e3);
  return Math.abs(c) < Wt.inMinute ? "Just now" : Math.abs(c) < Wt.inHour ? s.format(Math.floor(-c / Wt.inMinute), "minute") : Math.abs(c) < Wt.inDay ? s.format(Math.floor(-c / Wt.inHour), "hour") : Math.abs(c) < Wt.inMonth ? s.format(Math.floor(-c / Wt.inDay), "day") : new Intl.DateTimeFormat(n, { month: "short", day: "numeric" }).format(e);
}
function C8({ untilDate: e, locale: n = M2 }) {
  const i = e.getTime() - (/* @__PURE__ */ new Date()).getTime(), o = Math.floor(i / 1e3);
  if (o < 0)
    return "soon";
  if (o < Wt.inMinute)
    return "a moment";
  if (o < Wt.inHour) {
    const s = Math.floor(o / Wt.inMinute);
    return `${s} ${s === 1 ? "minute" : "minutes"}`;
  } else if (o < Wt.inDay) {
    const s = Math.floor(o / Wt.inHour);
    return `${s} ${s === 1 ? "hour" : "hours"}`;
  } else if (o < Wt.inWeek) {
    const s = Math.floor(o / Wt.inDay);
    return `${s} ${s === 1 ? "day" : "days"}`;
  } else
    return new Intl.DateTimeFormat(n, { month: "short", day: "numeric" }).format(e);
}
var k8 = {
  intersectionThreshold: 0.5,
  visibilityDuration: 1e3,
  batchDelay: 500,
  maxBatchSize: 20,
  enabled: !0,
  rootMargin: "0px"
}, A8 = class {
  constructor(e, n = {}) {
    this.inboxService = e, this.seenNotifications = /* @__PURE__ */ new Set(), this.pendingNotifications = /* @__PURE__ */ new Map(), this.pendingBatch = /* @__PURE__ */ new Set(), this.batchTimer = null, this.visibilityTimer = null, this.observer = null, this.elementToNotificationMap = /* @__PURE__ */ new WeakMap(), this.observedElements = /* @__PURE__ */ new Set(), this.options = re(re({}, k8), n), this.initializeObserver(), this.startVisibilityTimer();
  }
  initializeObserver() {
    !this.options.enabled || typeof window > "u" || !("IntersectionObserver" in window) || (this.observer = new IntersectionObserver((e) => this.handleIntersection(e), {
      threshold: this.options.intersectionThreshold,
      rootMargin: this.options.rootMargin
    }));
  }
  startVisibilityTimer() {
    !this.options.enabled || typeof window > "u" || (this.checkAllElementsVisibility(), this.visibilityTimer = window.setInterval(() => {
      this.checkAllElementsVisibility();
    }, 1e3));
  }
  checkAllElementsVisibility() {
    this.observedElements.forEach((e) => {
      const n = this.elementToNotificationMap.get(e);
      if (!n || this.seenNotifications.has(n))
        return;
      const i = e.getBoundingClientRect();
      this.isElementVisible(i) ? this.pendingNotifications.has(n) || this.pendingNotifications.set(n, Date.now()) : this.pendingNotifications.delete(n);
    }), this.processVisibleNotifications();
  }
  isElementVisible(e) {
    const n = window.innerHeight || document.documentElement.clientHeight, i = window.innerWidth || document.documentElement.clientWidth, o = e.top < n && e.bottom > 0, s = e.left < i && e.right > 0;
    if (!o || !s)
      return !1;
    const c = Math.min(e.bottom, n) - Math.max(e.top, 0), f = Math.min(e.right, i) - Math.max(e.left, 0), d = c * f, v = e.height * e.width;
    return v > 0 && d / v >= this.options.intersectionThreshold;
  }
  handleIntersection(e) {
    const n = Date.now();
    e.forEach((i) => {
      const o = this.elementToNotificationMap.get(i.target);
      !o || this.seenNotifications.has(o) || (i.isIntersecting ? this.pendingNotifications.set(o, n) : this.pendingNotifications.delete(o));
    }), this.processVisibleNotifications();
  }
  processVisibleNotifications() {
    const e = Date.now(), n = [];
    this.pendingNotifications.forEach((i, o) => {
      e - i >= this.options.visibilityDuration && (n.push(o), this.seenNotifications.add(o));
    }), n.forEach((i) => {
      this.pendingNotifications.delete(i);
    }), n.length > 0 && this.addToBatch(n);
  }
  addToBatch(e) {
    e.forEach((n) => {
      this.pendingBatch.add(n);
    }), this.scheduleBatchProcessing();
  }
  scheduleBatchProcessing() {
    this.batchTimer === null && (this.batchTimer = window.setTimeout(() => {
      this.processBatch();
    }, this.options.batchDelay));
  }
  processBatch() {
    return P(this, null, function* () {
      this.batchTimer = null;
      const e = Array.from(this.pendingBatch);
      if (this.pendingBatch.clear(), e.length === 0)
        return;
      const n = this.chunkArray(e, this.options.maxBatchSize);
      try {
        yield Promise.all(n.map((i) => this.inboxService.markAsSeen({ notificationIds: i })));
      } catch (i) {
        e.forEach((o) => {
          this.seenNotifications.delete(o);
        }), console.error("Failed to mark notifications as seen:", i);
      }
    });
  }
  chunkArray(e, n) {
    const i = [];
    for (let o = 0; o < e.length; o += n)
      i.push(e.slice(o, o + n));
    return i;
  }
  observe(e, n) {
    !this.observer || this.seenNotifications.has(n) || (this.elementToNotificationMap.set(e, n), this.observedElements.add(e), this.observer.observe(e));
  }
  unobserve(e) {
    if (!this.observer)
      return;
    const n = this.elementToNotificationMap.get(e);
    n && (this.pendingNotifications.delete(n), this.pendingBatch.delete(n), this.elementToNotificationMap.delete(e), this.observedElements.delete(e)), this.observer.unobserve(e);
  }
  destroy() {
    this.observer && (this.observer.disconnect(), this.observer = null), this.batchTimer !== null && (window.clearTimeout(this.batchTimer), this.batchTimer = null), this.visibilityTimer !== null && (window.clearInterval(this.visibilityTimer), this.visibilityTimer = null), this.seenNotifications.clear(), this.pendingNotifications.clear(), this.pendingBatch.clear(), this.observedElements.clear();
  }
  // Force process any pending batches (useful for cleanup)
  flush() {
    return P(this, null, function* () {
      this.batchTimer !== null && (window.clearTimeout(this.batchTimer), this.batchTimer = null, yield this.processBatch());
    });
  }
};
function E8() {
  const e = An();
  let n = null;
  return qt(() => {
    n = new A8(e.notifications.inboxService), $e(() => {
      n && (n.destroy(), n = null);
    });
  }), {
    observeNotification: (s, c) => {
      n && n.observe(s, c);
    },
    unobserveNotification: (s) => {
      n && n.unobserve(s);
    }
  };
}
var T8 = Xb({
  prefix: "nt-"
}), N8 = Xb({});
function be(...e) {
  return T8(qb(e));
}
function D2(e) {
  const n = "abcdefghijklmnopqrstuvwxyz";
  let i = "";
  const o = n.length;
  for (let s = 0; s < e; s += 1)
    i += n.charAt(Math.floor(Math.random() * o));
  return i;
}
function O8(e, n) {
  let i;
  do
    i = D2(n);
  while (e.has(i));
  return i;
}
function z8(e) {
  return Object.entries(e).map(([n, i]) => `${n.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${i};`).join(" ");
}
function M8(e, n) {
  const i = `novu-css-${O8(e, 8)}`, o = `.${i} { ${n} }`;
  return e.add(i), { className: i, rule: o };
}
var D8 = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
function Ft(e) {
  return `.${e.id} { --nv-${e.key}: oklch(from ${e.color} l c h); }`;
}
function l1({ color: e, key: n, id: i }) {
  const o = [], s = (f) => f >= 0 ? `min(1, calc(l + ${f} * (1 - l)))` : `max(0, calc(l * (1 + ${f})))`, c = {
    25: s(0.475),
    50: s(0.45),
    100: s(0.4),
    200: s(0.3),
    300: s(0.2),
    400: s(0.1),
    500: "l",
    600: s(-0.1),
    700: s(-0.2),
    800: s(-0.3),
    900: s(-0.4)
  };
  return D8.forEach((f) => {
    const d = c[f], v = `.${i} { --nv-${n}-${f}: oklch(from ${e} ${d} c h); }`;
    o.push(v);
  }), o;
}
function qn({ color: e, key: n, id: i }) {
  const o = [];
  return Object.entries({
    25: 0.025,
    50: 0.05,
    100: 0.1,
    200: 0.2,
    300: 0.3,
    400: 0.4,
    500: 0.5,
    600: 0.6,
    700: 0.7,
    800: 0.8,
    900: 0.9
  }).forEach(([c, f]) => {
    const d = `.${i} { --nv-${n}-${c}: oklch(from ${e} l c h / ${f}); }`;
    o.push(d);
  }), o;
}
function R8(e) {
  const { id: n, baseFontSize: i } = e, o = {
    xs: 0.65625,
    sm: 0.765625,
    base: 0.875,
    lg: 0.984375,
    xl: 1.09375,
    "2xl": 1.3125,
    "3xl": 1.640625,
    "4xl": 1.96875
  }, s = [];
  return Object.entries(o).forEach(([c, f]) => {
    const d = `calc(${i} * ${f})`, v = `calc(${i} * ${f} * 1.33)`, g = `.${n} { --nv-font-size-${c}: ${d}; --nv-line-height-${c}: ${v}; }`;
    s.push(g);
  }), s;
}
function L8(e) {
  const { id: n, baseRadius: i } = e, o = {
    none: 0,
    xs: 0.333,
    sm: 0.667,
    md: 1,
    lg: 1.333,
    xl: 2,
    "2xl": 2.667,
    "3xl": 4,
    full: 9999
  }, s = [];
  return Object.entries(o).forEach(([c, f]) => {
    const d = c === "none" ? "0px" : c === "full" ? "9999px" : `calc(${i} * ${f})`, v = `.${n} { --nv-radius-${c}: ${d}; }`;
    s.push(v);
  }), s;
}
var U8 = (e, n) => [
  Ft({ color: e.colorBackground, key: "color-background", id: n }),
  Ft({ color: e.colorForeground, key: "color-foreground", id: n }),
  Ft({ color: e.colorPrimary, key: "color-primary", id: n }),
  Ft({ color: e.colorPrimaryForeground, key: "color-primary-foreground", id: n }),
  Ft({ color: e.colorSecondary, key: "color-secondary", id: n }),
  Ft({ color: e.colorSecondaryForeground, key: "color-secondary-foreground", id: n }),
  Ft({ color: e.colorCounter, key: "color-counter", id: n }),
  Ft({ color: e.colorCounterForeground, key: "color-counter-foreground", id: n }),
  Ft({ color: e.colorShadow, key: "color-shadow", id: n }),
  Ft({ color: e.colorRing, key: "color-ring", id: n }),
  Ft({ color: e.colorStripes, key: "color-stripes", id: n }),
  Ft({ color: e.colorSeverityHigh, key: "color-severity-high", id: n }),
  Ft({ color: e.colorSeverityMedium, key: "color-severity-medium", id: n }),
  Ft({ color: e.colorSeverityLow, key: "color-severity-low", id: n }),
  ...qn({ color: e.colorSeverityHigh, key: "color-severity-high-alpha", id: n }),
  ...qn({
    color: e.colorSeverityMedium,
    key: "color-severity-medium-alpha",
    id: n
  }),
  ...qn({ color: e.colorSeverityLow, key: "color-severity-low-alpha", id: n }),
  ...qn({ color: e.colorBackground, key: "color-background-alpha", id: n }),
  ...qn({ color: e.colorForeground, key: "color-foreground-alpha", id: n }),
  ...l1({ color: e.colorPrimary, key: "color-primary", id: n }),
  ...qn({ color: e.colorPrimary, key: "color-primary-alpha", id: n }),
  ...qn({
    color: e.colorPrimaryForeground,
    key: "color-primary-foreground-alpha",
    id: n
  }),
  ...l1({ color: e.colorSecondary, key: "color-secondary", id: n }),
  ...qn({ color: e.colorSecondary, key: "color-secondary-alpha", id: n }),
  ...qn({
    color: e.colorSecondaryForeground,
    key: "color-secondary-foreground-alpha",
    id: n
  }),
  ...qn({ color: e.colorNeutral, key: "color-neutral-alpha", id: n }),
  ...R8({ id: n, baseFontSize: e.fontSize }),
  ...L8({ id: n, baseRadius: e.borderRadius })
], H8 = (e) => {
  const n = [], i = /* @__PURE__ */ new Set();
  for (const s in e)
    if (e.hasOwnProperty(s)) {
      const c = e[s];
      if (typeof c == "object") {
        const f = z8(c), { className: d, rule: v } = M8(i, f);
        n.push({ key: s, rule: v, className: d });
      }
    }
  return n.sort((s, c) => {
    const f = (s.key.match(/__/g) || []).length, d = (c.key.match(/__/g) || []).length;
    return f - d;
  });
}, kr = (e) => {
  var n;
  return ((n = e?.filter) == null ? void 0 : n.tags) || e?.value || [];
}, R2 = "novu-default-css", se = () => {
  const e = rr(), [n, i] = W(!0);
  return qt(() => {
    i(!1);
  }), oe(
    () => ({
      key: s,
      className: c,
      iconKey: f,
      context: d
    }) => {
      const v = s.split("__");
      let g = [];
      for (let S = 0; S < v.length; S += 1) {
        const E = v.slice(S).join("__");
        a1.includes(E) && g.push(E);
      }
      const p = c?.split(/\s+/).map((S) => S.replace(/^nv-/, "")) || [], m = p.filter(
        (S) => a1.includes(S)
      );
      g = Array.from(
        /* @__PURE__ */ new Set([...g, ...m])
      ), g.sort((S, E) => {
        const O = (S.match(/__/g) || []).length;
        return (E.match(/__/g) || []).length - O;
      });
      const _ = p.filter((S) => !g.includes(S)).join(" ");
      let w = [];
      const C = g.reverse();
      for (let S = 0; S < C.length; S += 1) {
        const E = e.elements()[C[S]];
        typeof E == "string" ? w.push(E) : typeof E == "function" && w.push(E(d));
      }
      w = [N8(w)];
      const k = g.length && !n() ? g.map((S) => e.appearanceKeyToCssInJsClass[S]) : [];
      return be(
        ...g.map((S) => `nv-${S}`),
        "🔔",
        f ? `nv-${f} 🖼️` : "",
        _,
        // default styles
        w,
        ...k
      );
    }
  )();
}, B8 = ({ tabs: e }) => {
  const [n, i] = W(), [o, s] = W([]), [c, f] = W([]);
  return qt(() => {
    const d = n();
    if (!d) return;
    const v = [...d.querySelectorAll('[role="tab"]')], g = new IntersectionObserver(
      (p) => {
        let m = p.filter((_) => _.isIntersecting && _.intersectionRatio === 1).map((_) => _.target.id);
        if (v.length === m.length) {
          s(e.filter((_) => m.includes(_.label))), g.disconnect();
          return;
        }
        m = m.slice(0, -1), s(e.filter((_) => m.includes(_.label))), f(e.filter((_) => !m.includes(_.label))), g.disconnect();
      },
      { root: d }
    );
    for (const p of v)
      g.observe(p);
  }), { dropdownTabs: c, setTabsList: i, visibleTabs: o };
};
function V8(e, n) {
  let i = !1, o;
  const s = new Promise((c) => {
    o = c;
  });
  return navigator.locks.request(e, () => (i || n(e), s)), () => {
    i = !0, o();
  };
}
var j8 = ({
  channelName: e,
  onMessage: n
}) => {
  const [i] = W(new BroadcastChannel(e)), o = (s) => {
    i().postMessage(s);
  };
  return qt(() => {
    const s = (f) => {
      n(f.data);
    }, c = i();
    c.addEventListener("message", s), $e(() => {
      c.removeEventListener("message", s);
    });
  }), { postMessage: o };
}, xh = ({
  event: e,
  eventHandler: n
}) => {
  const i = An(), o = `nv_ws_connection:a=${i.applicationIdentifier}:s=${i.subscriberId}:e=${e}`, { postMessage: s } = j8({ channelName: o, onMessage: n }), c = (f) => {
    n(f), s(f);
  };
  qt(() => {
    let f;
    const d = V8(o, () => {
      f = i.on(e, c);
    });
    $e(() => {
      f && f(), d();
    });
  });
}, L2 = en(void 0), $8 = (e) => {
  const [n, i] = S6({
    appearanceKeyToCssInJsClass: {}
  }), [o, s] = W(null), [c, f] = W([]), [d, v] = W([]), g = oe(() => {
    var S, E, O;
    return Array.isArray((S = e.appearance) == null ? void 0 : S.baseTheme) ? ((E = e.appearance) == null ? void 0 : E.baseTheme) || [] : [((O = e.appearance) == null ? void 0 : O.baseTheme) || {}];
  }), p = () => e.id, m = () => {
    var S;
    return ((S = e.appearance) == null ? void 0 : S.variables) || {};
  }, _ = () => {
    var S, E;
    return (E = (S = e.appearance) == null ? void 0 : S.animations) != null ? E : !0;
  }, w = () => {
    var S;
    return ((S = e.appearance) == null ? void 0 : S.icons) || {};
  }, C = oe(() => {
    var S;
    const E = g().reduce((O, A) => re(re({}, O), A.elements || {}), {});
    return re(re({}, E), ((S = e.appearance) == null ? void 0 : S.elements) || {});
  }), k = () => e.container;
  return qt(() => {
    var S;
    const E = e.container instanceof ShadowRoot ? e.container : document, O = E.getElementById(e.id);
    if (O) {
      s(O);
      return;
    }
    const A = (S = e.container) != null ? S : document.head, D = document.createElement("style");
    D.id = e.id;
    const L = E.getElementById(R2);
    L ? A.insertBefore(D, L.nextSibling) : A.appendChild(D), s(D), $e(() => {
      D.remove();
    });
  }), Ue(() => {
    var S;
    if (!o())
      return;
    const O = re(re({}, w8), g().reduce((A, D) => re(re({}, A), D.variables || {}), {}));
    v(U8(re(re({}, O), ((S = e.appearance) == null ? void 0 : S.variables) || {}), e.id));
  }), Ue(() => {
    if (!o())
      return;
    const E = H8(C());
    i("appearanceKeyToCssInJsClass", (O) => re(re({}, O), E.reduce((A, D) => (A[D.key] = D.className, A), {}))), f(E.map((O) => O.rule));
  }), Ue(() => {
    const S = o();
    S && (S.innerHTML = [...d(), ...c()].join(" "));
  }), b(L2.Provider, {
    get value() {
      return {
        elements: C,
        variables: m,
        animations: _,
        icons: w,
        appearanceKeyToCssInJsClass: n.appearanceKeyToCssInJsClass,
        // stores are reactive
        id: p,
        container: k
      };
    },
    get children() {
      return e.children;
    }
  });
};
function rr() {
  const e = Ut(L2);
  if (!e)
    throw new Error("useAppearance must be used within an AppearanceProvider");
  return e;
}
var U2 = ({
  event: e,
  eventHandler: n
}) => {
  const i = An();
  qt(() => {
    const o = i.on(e, n);
    $e(() => {
      o();
    });
  });
}, H2 = en(void 0), K8 = (e) => {
  const n = oe(() => {
    const s = e.localization || {}, {
      dynamic: c
    } = s, f = Ka(s, [
      "dynamic"
    ]);
    return re(re(re(re({}, m8), y8()), c || {}), f);
  }), i = (s, ...c) => {
    const f = n()[s];
    return typeof f == "function" ? f(c[0]) : f;
  }, o = oe(() => n().locale);
  return b(H2.Provider, {
    value: {
      t: i,
      locale: o
    },
    get children() {
      return e.children;
    }
  });
};
function gt() {
  const e = Ut(H2);
  if (!e)
    throw new Error("useLocalization must be used within an LocalizationProvider");
  return e;
}
var B2 = en(void 0), s1 = {
  unreadRead: {
    archived: !1,
    snoozed: !1
  },
  unread: {
    read: !1,
    snoozed: !1
  },
  archived: {
    archived: !0
  },
  snoozed: {
    snoozed: !0
  }
}, V2 = 10, q8 = (e) => {
  var n, i, o, s;
  const [c, f] = W(!1), [d, v] = W(e.tabs), [g, p] = W((i = (n = e.tabs[0]) == null ? void 0 : n.label) != null ? i : ""), [m, _] = W(
    "unreadRead"
    /* UNREAD_READ */
  ), [w, C] = W(V2), [k, S] = W(je(re({}, s1.unreadRead), {
    tags: e.tabs.length > 0 ? kr(e.tabs[0]) : [],
    data: e.tabs.length > 0 ? (o = e.tabs[0].filter) == null ? void 0 : o.data : {},
    severity: e.tabs.length > 0 ? (s = e.tabs[0].filter) == null ? void 0 : s.severity : void 0
  })), [E, O] = W(!1), [A, D] = W(!1), [L, F] = W(0), Y = oe(() => L() > 0), [ie, X] = W(e.preferencesFilter), [fe, le] = W(!1), [ee, we] = W(null), [Ee, Oe] = W(e.preferenceGroups), [j, te] = W(e.preferencesSort), ae = ($) => {
    _($), S((J) => je(re({}, s1[$]), {
      tags: J.tags,
      data: J.data,
      severity: J.severity
    }));
  }, Ae = ($) => {
    const J = d().find((ge) => ge.label === $), ne = kr(J);
    ne && (p($), S((ge) => {
      var ze, _e;
      return je(re({}, ge), {
        tags: ne,
        data: (ze = J?.filter) == null ? void 0 : ze.data,
        severity: (_e = J?.filter) == null ? void 0 : _e.severity
      });
    }));
  }, z = ($, J) => {
    if (!$)
      return;
    if (!$.startsWith("/")) {
      window.open($, J ?? _8, x8);
      return;
    }
    if (e.routerPush) {
      e.routerPush($);
      return;
    }
    const ge = new URL($, window.location.href);
    window.history.pushState.bind(window.history)({}, "", ge);
  };
  return Ue(() => {
    var $;
    v(e.tabs);
    const J = e.tabs[0], ne = kr(J);
    p(($ = J?.label) != null ? $ : ""), S((ge) => {
      var ze, _e;
      return je(re({}, ge), {
        tags: ne,
        data: (ze = J?.filter) == null ? void 0 : ze.data,
        severity: (_e = J?.filter) == null ? void 0 : _e.severity
      });
    }), X(e.preferencesFilter), Oe(e.preferenceGroups);
  }), U2({
    event: "session.initialize.resolved",
    eventHandler: ({
      data: $
    }) => {
      var J, ne;
      if (!$)
        return;
      const ge = window.localStorage.getItem("novu_keyless_application_identifier");
      O($.removeNovuBranding), D($.isDevelopmentMode), F($.maxSnoozeDurationHours), $.isDevelopmentMode && !e.applicationIdentifier ? (le(!$.applicationIdentifier || !!ge?.startsWith("pk_keyless_")), we((J = $.applicationIdentifier) != null ? J : null)) : we((ne = e.applicationIdentifier) != null ? ne : null);
    }
  }), b(B2.Provider, {
    value: {
      status: m,
      setStatus: ae,
      filter: k,
      tabs: d,
      activeTab: g,
      setActiveTab: Ae,
      limit: w,
      setLimit: C,
      isOpened: c,
      setIsOpened: f,
      navigate: z,
      hideBranding: E,
      preferencesFilter: ie,
      preferenceGroups: Ee,
      preferencesSort: j,
      isDevelopmentMode: A,
      maxSnoozeDurationHours: L,
      isSnoozeEnabled: Y,
      isKeyless: fe,
      applicationIdentifier: ee
    },
    get children() {
      return e.children;
    }
  });
}, At = () => {
  const e = Ut(B2);
  if (!e)
    throw new Error("useInboxContext must be used within a InboxProvider");
  return e;
}, j2 = en(void 0);
function G8(e) {
  const n = oe(() => e.novu || new xb(e.options));
  return b(j2.Provider, {
    get value() {
      return n();
    },
    get children() {
      return e.children;
    }
  });
}
function An() {
  const e = Ut(j2);
  if (!e)
    throw new Error("useNovu must be used within a NovuProvider");
  return e;
}
var P8 = 1, Kl = en(void 0), I8 = (e) => {
  const n = An(), {
    isOpened: i,
    tabs: o,
    filter: s,
    limit: c,
    activeTab: f
  } = At(), [d, v] = W({
    total: 0,
    severity: {
      high: 0,
      medium: 0,
      low: 0,
      none: 0
    }
  }), [g, p] = W(/* @__PURE__ */ new Map()), [m, _] = W(/* @__PURE__ */ new Map()), w = () => P(void 0, null, function* () {
    if (o().length === 0)
      return;
    const S = o().map((D) => {
      var L, F;
      return {
        tags: kr(D),
        read: !1,
        archived: !1,
        snoozed: !1,
        data: (L = D.filter) == null ? void 0 : L.data,
        severity: (F = D.filter) == null ? void 0 : F.severity
      };
    }), {
      data: E
    } = yield n.notifications.count({
      filters: S
    });
    if (!E)
      return;
    const O = /* @__PURE__ */ new Map(), {
      counts: A
    } = E;
    for (let D = 0; D < A.length; D += 1) {
      const L = Qa({
        tags: A[D].filter.tags,
        data: A[D].filter.data,
        severity: A[D].filter.severity
      });
      O.set(L, E?.counts[D].count);
    }
    p(O);
  });
  qt(() => {
    w();
  }), xh({
    event: "notifications.unread_count_changed",
    eventHandler: (S) => {
      v(S.result), w();
    }
  }), U2({
    event: "session.initialize.resolved",
    eventHandler: ({
      data: S
    }) => {
      S && v(S.unreadCount);
    }
  });
  const C = (S, E, O, A, D) => {
    const L = n.notifications.cache, F = c(), Y = je(re({}, s()), {
      tags: O,
      data: A,
      severity: D,
      after: void 0,
      limit: F
    });
    if (!L.has(Y) && (!i() || f() !== S))
      return;
    const X = L.getAll(Y) || {
      hasMore: !1,
      filter: Y,
      notifications: []
    };
    if ((X?.notifications.length || 0) < P8 || !i()) {
      L.update(Y, je(re({}, X), {
        notifications: [E, ...X.notifications]
      }));
      return;
    }
    _((le) => {
      const ee = Qa({
        tags: O,
        data: A,
        severity: D
      }), we = new Map(le);
      return we.set(ee, (le.get(ee) || 0) + 1), we;
    });
  };
  xh({
    event: "notifications.notification_received",
    eventHandler: (S) => P(void 0, [S], function* ({
      result: E
    }) {
      var O, A;
      if (s().archived || s().snoozed)
        return;
      const D = o(), L = /* @__PURE__ */ new Set();
      if (D.length > 0)
        for (const F of D) {
          const Y = kr(F), ie = (O = F.filter) == null ? void 0 : O.data, X = (A = F.filter) == null ? void 0 : A.severity, fe = H4(E.tags, Y), le = U4(E.data, ie), ee = !X || Array.isArray(X) && X.length === 0 || Array.isArray(X) && X.includes(E.severity) || !Array.isArray(X) && X === E.severity;
          if (fe && le && ee) {
            const we = Qa({
              tags: Y,
              data: ie,
              severity: X
            });
            L.has(we) || (L.add(we), C(F.label, E, Y, ie, X));
          }
        }
      else
        C("", E, [], void 0, void 0);
    })
  }), xh({
    event: "notifications.notification_received",
    eventHandler: w
  });
  const k = (S) => {
    _((E) => {
      const O = new Map(E);
      return O.set(S, 0), O;
    });
  };
  return b(Kl.Provider, {
    value: {
      unreadCount: d,
      unreadCounts: g,
      newNotificationCounts: m,
      resetNewNotificationCounts: k
    },
    get children() {
      return e.children;
    }
  });
}, Qa = (e) => {
  var n, i;
  return JSON.stringify({
    tags: (n = e.tags) != null ? n : [],
    data: (i = e.data) != null ? i : {},
    severity: e.severity
  });
}, Y8 = () => {
  const e = Ut(Kl);
  if (!e)
    throw new Error("useUnreadCount must be used within a CountProvider");
  return {
    unreadCount: e.unreadCount
  };
}, Z8 = (e) => {
  const n = Ut(Kl);
  if (!n)
    throw new Error("useNewMessagesCount must be used within a CountProvider");
  const i = oe(() => Qa(e.filter));
  return {
    count: oe(() => n.newNotificationCounts().get(i()) || 0),
    reset: () => n.resetNewNotificationCounts(i())
  };
}, $2 = (e) => {
  const n = Ut(Kl);
  if (!n)
    throw new Error("useFilteredUnreadCount must be used within a CountProvider");
  return oe(() => n.unreadCounts().get(Qa(e.filter)) || 0);
}, X8 = (e) => {
  const n = Ut(Kl);
  if (!n)
    throw new Error("useUnreadCounts must be used within a CountProvider");
  return oe(() => e.filters.map((o) => n.unreadCounts().get(Qa(o)) || 0));
};
function Q8({ element: e, enabled: n }) {
  const { container: i } = rr();
  Ue(() => {
    const o = e();
    if (!o || !n()) return;
    const s = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]", c = () => Array.from(o.querySelectorAll(s)).filter(
      (v) => v.tabIndex >= 0 && !v.hasAttribute("disabled")
    ), f = (v) => {
      if (v.key !== "Tab") return;
      const g = c(), p = g[0], m = g[g.length - 1], _ = i(), w = _ instanceof ShadowRoot ? _ : document;
      v.shiftKey ? w.activeElement === p && (m.focus(), v.preventDefault()) : w.activeElement === m && (p.focus(), v.preventDefault());
    };
    o.addEventListener("keydown", f);
    const d = c();
    d.length > 0 && d[0].focus(), $e(() => {
      o.removeEventListener("keydown", f);
    });
  });
}
var F8 = Q8, K2 = en(void 0), W8 = (e) => {
  const [n, i] = W([]), o = (f) => {
    i((d) => [...d, f]);
  }, s = (f) => {
    i((d) => d.filter((v) => v !== f));
  }, c = oe(() => n().length ? n()[n().length - 1] : null);
  return F8({
    element: () => c(),
    enabled: () => !0
  }), b(K2.Provider, {
    value: {
      focusTraps: n,
      active: c,
      setActive: o,
      removeActive: s
    },
    get children() {
      return e.children;
    }
  });
};
function V0() {
  const e = Ut(K2);
  if (!e)
    throw new Error("useFocusManager must be used within an FocusManagerProvider");
  return e;
}
var J8 = /* @__PURE__ */ Z("<div>"), oi = (e) => {
  let n;
  const [i, o] = Ke(e, ["render"]);
  return Ue(() => {
    const s = i.render(n);
    $e(() => {
      s();
    });
  }), (() => {
    var s = J8();
    return kn((c) => {
      n = c;
    }, s), Se(s, o, !1, !1), s;
  })();
}, eS = /* @__PURE__ */ Z('<svg viewBox="0 0 20 20"fill=none xmlns=http://www.w3.org/2000/svg><path d="M10.0001 10.879L13.7126 7.1665L14.7731 8.227L10.0001 13L5.22705 8.227L6.28755 7.1665L10.0001 10.879Z"fill=currentColor>'), tS = (e) => (() => {
  var n = eS();
  return Se(n, e, !0, !0), n;
})(), nS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 20 20"><path fill=currentColor d="M5.833 8.333L10 12.5l4.166-4.167H5.833z">'), Uu = (e) => (() => {
  var n = nS();
  return Se(n, e, !0, !0), n;
})(), rS = /* @__PURE__ */ Z('<svg viewBox="0 0 20 20"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.20425 9.99907L12.9168 13.7116L11.8563 14.7721L7.08325 9.99907L11.8563 5.22607L12.9168 6.28657L9.20425 9.99907Z"fill=currentColor>'), q2 = (e) => (() => {
  var n = rS();
  return Se(n, e, !0, !0), n;
})(), iS = /* @__PURE__ */ Z('<svg viewBox="0 0 20 20"fill=none xmlns=http://www.w3.org/2000/svg><path d="M10.7957 10.0009L7.08325 6.2884L8.14375 5.2279L12.9168 10.0009L8.14375 14.7739L7.08325 13.7134L10.7957 10.0009Z"fill=currentColor>'), aS = (e) => (() => {
  var n = iS();
  return Se(n, e, !0, !0), n;
})(), oS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 12 14"><path fill=url(#nv_bell_gradient) d="M6 0c-.435 0-.786.391-.786.875V1.4C3.42 1.805 2.07 3.571 2.07 5.687v.515c0 1.285-.425 2.526-1.19 3.489l-.183.227a.957.957 0 0 0-.13.94c.126.315.408.517.717.517h9.429c.31 0 .589-.202.717-.517a.95.95 0 0 0-.13-.94l-.182-.227c-.766-.963-1.191-2.202-1.191-3.49v-.513c0-2.117-1.35-3.883-3.143-4.288V.875C6.785.391 6.434 0 6 0Zm1.112 13.489c.294-.329.459-.774.459-1.239H4.429c-.001.465.164.91.458 1.239.295.328.695.511 1.112.511.418 0 .818-.183 1.113-.511Z"></path><defs><linearGradient id=nv_bell_gradient x1=6 y1=0 x2=6 y2=14 gradientUnits=userSpaceOnUse><stop stop-color="var(--bell-gradient-start, currentColor)"></stop><stop offset=1 stop-color="var(--bell-gradient-end, currentColor)">');
function G2(e) {
  return (() => {
    var n = oS();
    return Se(n, e, !0, !0), n;
  })();
}
var lS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg width=14 height=14 fill=none viewBox="0 0 14 14"><path fill=currentColor d="M4.381 2.952V2h.952v.952H8.19V2h.953v.952h1.905c.263 0 .476.214.476.477v2.38h-.953V3.906H9.143v.952H8.19v-.952H5.333v.952h-.952v-.952H2.952v6.666H5.81v.953H2.476A.476.476 0 0 1 2 11.048v-7.62c0-.262.213-.476.476-.476h1.905Zm4.762 4.286a1.905 1.905 0 1 0 0 3.81 1.905 1.905 0 0 0 0-3.81ZM6.286 9.143a2.857 2.857 0 1 1 5.714 0 2.857 2.857 0 0 1-5.714 0Zm2.38-1.429V9.34l1.093 1.092.673-.673-.813-.813V7.714h-.952Z">'), sS = (e) => (() => {
  var n = lS();
  return Se(n, e, !0, !0), n;
})(), cS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M0.625 9.375L2.93989 8.86059C3.5538 9.18889 4.25516 9.375 5 9.375C7.41622 9.375 9.375 7.41622 9.375 5C9.375 2.58375 7.41622 0.625 5 0.625C2.58375 0.625 0.625 2.58375 0.625 5C0.625 5.74484 0.81113 6.4462 1.13942 7.0601L0.625 9.375ZM6.50881 2.8125L6.43224 3.68761H7.1875V4.56259H6.35568L6.27912 5.43759H7.1875V6.31259H6.2026L6.12604 7.1875H5.24771L5.32423 6.31259H4.44591L4.36934 7.1875H3.49101L3.56755 6.31259H2.8125V5.43759H3.64411L3.72066 4.56259H2.8125V3.68761H3.79721L3.87377 2.8125H4.75211L4.67555 3.68761H5.55392L5.63048 2.8125H6.50881ZM4.59899 4.56259L4.52247 5.43759H5.40079L5.47736 4.56259H4.59899Z"fill=currentColor>'), P2 = (e) => (() => {
  var n = cS();
  return Se(n, e, !0, !0), n;
})(), uS = /* @__PURE__ */ Z('<svg viewBox="0 0 8 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.99994 4.58847L7.33298 0L8 0.705765L2.99994 6L0 2.82356L0.666549 2.11779L2.99994 4.58847Z"fill=currentColor>'), j0 = (e) => (() => {
  var n = uS();
  return Se(n, e, !0, !0), n;
})(), fS = /* @__PURE__ */ Z('<svg viewBox="0 0 12 12"fill=none xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_3188_15050)><path d="M6 3V6L8 7M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"stroke=currentColor stroke-linecap=round stroke-linejoin=round>'), Hl = (e) => (() => {
  var n = fS();
  return Se(n, e, !0, !0), n;
})(), dS = /* @__PURE__ */ Z('<svg viewBox="0 0 20 20"fill=none xmlns=http://www.w3.org/2000/svg><path d="M10 1.75L17.125 5.875V14.125L10 18.25L2.875 14.125V5.875L10 1.75ZM10 3.48325L4.375 6.73975V13.2603L10 16.5167L15.625 13.2603V6.73975L10 3.48325ZM10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13ZM10 11.5C10.3978 11.5 10.7794 11.342 11.0607 11.0607C11.342 10.7794 11.5 10.3978 11.5 10C11.5 9.60218 11.342 9.22064 11.0607 8.93934C10.7794 8.65804 10.3978 8.5 10 8.5C9.60218 8.5 9.22064 8.65804 8.93934 8.93934C8.65804 9.22064 8.5 9.60218 8.5 10C8.5 10.3978 8.65804 10.7794 8.93934 11.0607C9.22064 11.342 9.60218 11.5 10 11.5Z"fill=currentColor>'), I2 = (e) => (() => {
  var n = dS();
  return Se(n, e, !0, !0), n;
})(), hS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 fill=none viewBox="0 0 12 12"><path fill=currentColor d="M3.75 3.3V1.95a.45.45 0 0 1 .45-.45h5.4a.45.45 0 0 1 .45.45v6.3a.45.45 0 0 1-.45.45H8.25v1.35c0 .248-.203.45-.453.45H2.403a.449.449 0 0 1-.453-.45l.001-6.3c0-.248.203-.45.453-.45H3.75Zm-.899.9L2.85 9.6h4.5V4.2H2.851Zm1.799-.9h3.6v4.5h.9V2.4h-4.5v.9Z">'), vS = (e) => (() => {
  var n = hS();
  return Se(n, e, !0, !0), n;
})(), gS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 20 20"><path fill=currentColor d="M5 8.333c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667c.916 0 1.666-.75 1.666-1.667S5.916 8.333 5 8.333zm10 0c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667c.916 0 1.666-.75 1.666-1.667S15.916 8.333 15 8.333zm-5 0c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667c.916 0 1.666-.75 1.666-1.667S10.916 8.333 10 8.333z">'), pS = (e) => (() => {
  var n = gS();
  return Se(n, e, !0, !0), n;
})(), mS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M4.20703 1.875H2.8125H2.10547H1.875V2.04688V2.8125V3.60156V5.33984L0.00390625 3.95508C0.0351562 3.60156 0.216797 3.27344 0.505859 3.06055L0.9375 2.74023V1.875C0.9375 1.35742 1.35742 0.9375 1.875 0.9375H3.37109L4.3457 0.216797C4.53516 0.0761719 4.76367 0 5 0C5.23633 0 5.46484 0.0761719 5.6543 0.214844L6.62891 0.9375H8.125C8.64258 0.9375 9.0625 1.35742 9.0625 1.875V2.74023L9.49414 3.06055C9.7832 3.27344 9.96484 3.60156 9.99609 3.95508L8.125 5.33984V3.60156V2.8125V2.04688V1.875H7.89453H7.1875H5.79297H4.20508H4.20703ZM0 8.75V4.72852L4.25 7.87695C4.4668 8.03711 4.73047 8.125 5 8.125C5.26953 8.125 5.5332 8.03906 5.75 7.87695L10 4.72852V8.75C10 9.43945 9.43945 10 8.75 10H1.25C0.560547 10 0 9.43945 0 8.75ZM3.4375 3.125H6.5625C6.73438 3.125 6.875 3.26562 6.875 3.4375C6.875 3.60938 6.73438 3.75 6.5625 3.75H3.4375C3.26562 3.75 3.125 3.60938 3.125 3.4375C3.125 3.26562 3.26562 3.125 3.4375 3.125ZM3.4375 4.375H6.5625C6.73438 4.375 6.875 4.51562 6.875 4.6875C6.875 4.85938 6.73438 5 6.5625 5H3.4375C3.26562 5 3.125 4.85938 3.125 4.6875C3.125 4.51562 3.26562 4.375 3.4375 4.375Z"fill=currentColor>'), Y2 = (e) => (() => {
  var n = mS();
  return Se(n, e, !0, !0), n;
})(), yS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 12"fill=none xmlns=http://www.w3.org/2000/svg><path d="M4.99962 0.856934C4.64404 0.856934 4.35676 1.14421 4.35676 1.49979V1.88551C2.89024 2.18283 1.78533 3.48059 1.78533 5.03551V5.41318C1.78533 6.35738 1.43779 7.26943 0.810999 7.97658L0.662339 8.14332C0.493589 8.33216 0.45341 8.60336 0.555865 8.83439C0.658321 9.06542 0.889348 9.21408 1.14247 9.21408H8.85676C9.10988 9.21408 9.3389 9.06542 9.44337 8.83439C9.54783 8.60336 9.50564 8.33216 9.33689 8.14332L9.18823 7.97658C8.56145 7.26943 8.2139 6.35939 8.2139 5.41318V5.03551C8.2139 3.48059 7.10899 2.18283 5.64247 1.88551V1.49979C5.64247 1.14421 5.3552 0.856934 4.99962 0.856934ZM5.90966 10.767C6.15073 10.5259 6.28533 10.1985 6.28533 9.85693H4.99962H3.7139C3.7139 10.1985 3.8485 10.5259 4.08957 10.767C4.33064 11.008 4.6581 11.1426 4.99962 11.1426C5.34113 11.1426 5.66859 11.008 5.90966 10.767Z"fill=currentColor>'), Z2 = (e) => (() => {
  var n = yS();
  return Se(n, e, !0, !0), n;
})(), bS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.29671 10C1.78742 10 1.39807 9.85716 1.12864 9.57149C0.862497 9.28581 0.729426 8.86623 0.729426 8.31274V2.64594H1.69543V8.29668C1.69543 8.52163 1.74964 8.69487 1.85806 8.81624C1.96978 8.93408 2.12914 8.99301 2.33614 8.99301H7.66389C7.86764 8.99301 8.02366 8.93408 8.13209 8.81624C8.24385 8.69487 8.29965 8.52163 8.29965 8.29668V2.64594H9.27059V8.31274C9.27059 8.8627 9.13591 9.28048 8.86648 9.56608C8.59705 9.85536 8.20931 10 7.70333 10H2.29671ZM3.41056 5.34543C3.29556 5.34543 3.20028 5.30438 3.1247 5.22226C3.04913 5.14015 3.01134 5.03304 3.01134 4.90089V4.72949C3.01134 4.59737 3.04749 4.49204 3.11977 4.41348C3.19535 4.33492 3.29227 4.29564 3.41056 4.29564H6.5944C6.71271 4.29564 6.80795 4.33492 6.88026 4.41348C6.95582 4.49204 6.9936 4.59737 6.9936 4.72949V4.90089C6.9936 5.03304 6.95582 5.14015 6.88026 5.22226C6.8047 5.30438 6.70939 5.34543 6.5944 5.34543H3.41056ZM1.05964 3.16014C0.724502 3.16014 0.463285 3.05301 0.276004 2.83877C0.0920037 2.62095 0 2.33172 0 1.97107V1.18907C0 0.824846 0.0952841 0.535614 0.28586 0.321373C0.476428 0.107124 0.734358 0 1.05964 0H8.94536C9.27715 0 9.53511 0.107124 9.71911 0.321373C9.90642 0.535614 10 0.824846 10 1.18907V1.97107C10 2.33172 9.90642 2.62095 9.71911 2.83877C9.53511 3.05301 9.27715 3.16014 8.94536 3.16014H1.05964ZM1.24693 2.19067H8.75805C8.87304 2.19067 8.95516 2.16211 9.00448 2.10497C9.05372 2.04427 9.07838 1.95322 9.07838 1.83181V1.32833C9.07838 1.20335 9.05372 1.1123 9.00448 1.05517C8.95516 0.99803 8.87304 0.969462 8.75805 0.969462H1.24693C1.13193 0.969462 1.04814 0.99803 0.995567 1.05517C0.946281 1.1123 0.921638 1.20335 0.921638 1.32833V1.83181C0.921638 1.95322 0.946281 2.04427 0.995567 2.10497C1.04814 2.16211 1.13193 2.19067 1.24693 2.19067Z"fill=currentColor>'), $0 = (e) => (() => {
  var n = bS();
  return Se(n, e, !0, !0), n;
})(), wS = /* @__PURE__ */ Z('<svg viewBox="0 0 11 11"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.17256 10.999C1.69081 10.999 1.3225 10.8562 1.06763 10.5705C0.815875 10.2848 0.689997 9.86525 0.689997 9.31177V3.64497H1.60378V9.2957C1.60378 9.52066 1.65506 9.6939 1.75763 9.81526C1.8633 9.93311 2.01405 9.99203 2.20986 9.99203H7.24963C7.44236 9.99203 7.58995 9.93311 7.69252 9.81526C7.79823 9.6939 7.85102 9.52066 7.85102 9.2957V3.64497H8.76947V9.31177C8.76947 9.86173 8.64208 10.2795 8.38721 10.5651C8.13235 10.8544 7.76556 10.999 7.28693 10.999H2.17256ZM1.00236 4.15916C0.68534 4.15916 0.438242 4.05204 0.261085 3.83779C0.0870305 3.61997 0 3.33074 0 2.97009V2.18809C0 1.82387 0.0901336 1.53464 0.270408 1.3204C0.450675 1.10615 0.694663 0.999023 1.00236 0.999023H8.46182C8.77568 0.999023 9.0197 1.10615 9.19375 1.3204C9.37094 1.53464 9.45946 1.82387 9.45946 2.18809V2.97009C9.45946 3.33074 9.37094 3.61997 9.19375 3.83779C9.0197 4.05204 8.77568 4.15916 8.46182 4.15916H1.00236ZM1.17953 3.1897H8.28464C8.39342 3.1897 8.4711 3.16113 8.51775 3.10399C8.56433 3.04329 8.58765 2.95224 8.58765 2.83083V2.32735C8.58765 2.20238 8.56433 2.11132 8.51775 2.05419C8.4711 1.99705 7.51461 1.96849 7.40583 1.96849H1.17953C1.07074 1.96849 0.991485 1.99705 0.941753 2.05419C0.895131 2.11132 0.87182 2.20238 0.87182 2.32735V2.83083C0.87182 2.95224 0.895131 3.04329 0.941753 3.10399C0.991485 3.16113 1.07074 3.1897 1.17953 3.1897Z"fill=currentColor></path><path d="M9.67298 0.553711C9.84703 0.556646 10.0146 0.614475 10.1535 0.716797L10.2208 0.771484L10.2814 0.833008C10.3958 0.960612 10.4679 1.11928 10.4913 1.28711L10.4992 1.37109L10.4982 1.45605C10.4872 1.64689 10.4124 1.8301 10.2833 1.97559L10.2843 1.97656L7.55482 5.15039L7.55384 5.14941C7.40234 5.3265 7.18382 5.43557 6.94642 5.44336L6.93861 5.44434H6.92005V5.44336C6.69203 5.44397 6.47619 5.35201 6.31947 5.19141L6.31849 5.18945L5.29505 4.13184C5.08531 3.91498 5.00658 3.60427 5.08118 3.31641L5.11634 3.21094C5.2129 2.97124 5.41476 2.78187 5.67396 2.70996L5.78626 2.68652C6.01138 2.65637 6.23763 2.72008 6.41419 2.85938L6.49818 2.93555L6.8849 3.33496L9.0138 0.859375V0.860352C9.15512 0.688807 9.35911 0.576792 9.58509 0.556641L9.67298 0.553711Z"fill=currentColor stroke=white>'), _S = (e) => (() => {
  var n = wS();
  return Se(n, e, !0, !0), n;
})(), xS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_3445_1172)><path d="M9 9.99902H1C0.867383 9.99902 0.7402 9.94635 0.64645 9.85257C0.552667 9.75882 0.5 9.63164 0.5 9.49902V0.499023C0.5 0.366407 0.552669 0.239223 0.64645 0.145473C0.7402 0.0516901 0.867383 -0.000976562 1 -0.000976562H6.25C6.42865 -0.000976562 6.59368 0.0943401 6.68301 0.249023C6.77233 0.403707 6.77233 0.59434 6.68301 0.749023C6.59368 0.903707 6.42865 0.999023 6.25 0.999023H1.5V8.99902H8.5V4.49902C8.5 4.32037 8.59532 4.15534 8.75 4.06602C8.90468 3.97669 9.09532 3.97669 9.25 4.06602C9.40468 4.15534 9.5 4.32037 9.5 4.49902V9.49902C9.5 9.63164 9.44733 9.75882 9.35355 9.85257C9.2598 9.94636 9.13262 9.99902 9 9.99902Z"fill=currentColor></path><path d="M7.5 8.24902H2.5C2.32135 8.24902 2.15632 8.15371 2.06699 7.99902C1.97767 7.84434 1.97767 7.65371 2.06699 7.49902C2.15632 7.34434 2.32135 7.24902 2.5 7.24902H7.5C7.67865 7.24902 7.84368 7.34434 7.93301 7.49902C8.02233 7.65371 8.02233 7.84434 7.93301 7.99902C7.84368 8.15371 7.67865 8.24902 7.5 8.24902Z"fill=currentColor></path><path d="M4.75 6.49901C4.61709 6.49979 4.48936 6.44761 4.39498 6.35403L2.89498 4.85403C2.76816 4.72717 2.71865 4.54235 2.76507 4.36907C2.81149 4.19583 2.94681 4.06051 3.12005 4.01409C3.29332 3.96767 3.47816 4.01718 3.60501 4.14401L4.73001 5.269L8.37501 1.16901C8.46056 1.06279 8.58578 0.996155 8.72169 0.984497C8.8576 0.972843 8.99233 1.01718 9.09474 1.10728C9.19712 1.19738 9.25825 1.32541 9.26398 1.46167C9.26968 1.59796 9.21948 1.73065 9.12502 1.82902L5.12502 6.32902C5.03371 6.43306 4.90337 6.49461 4.76502 6.49901L4.75 6.49901Z"fill=currentColor></path></g><defs><clipPath id=clip0_3445_1172><rect width=10 height=10 fill=white transform="translate(0 -0.000976562)">'), X2 = (e) => (() => {
  var n = xS();
  return Se(n, e, !0, !0), n;
})(), SS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M3.15789 2.99902V4.99902L0 2.49902L3.15789 -0.000976562V1.99902H5.78947C6.90618 1.99902 7.97714 2.42045 8.76677 3.1706C9.55639 3.92074 10 4.93816 10 5.99902C10 7.05989 9.55639 8.0773 8.76677 8.82745C7.97714 9.5776 6.90618 9.99902 5.78947 9.99902H1.05263V8.99902H5.78947C6.627 8.99902 7.43022 8.68295 8.02244 8.12034C8.61466 7.55773 8.94737 6.79467 8.94737 5.99902C8.94737 5.20337 8.61466 4.44031 8.02244 3.8777C7.43022 3.31509 6.627 2.99902 5.78947 2.99902H3.15789Z"fill=currentColor>'), CS = (e) => (() => {
  var n = SS();
  return Se(n, e, !0, !0), n;
})(), kS = /* @__PURE__ */ Z('<svg viewBox="0 0 11 11"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6.8 1.49902H1.5C0.947715 1.49902 0.5 1.94674 0.5 2.49902V9.49902C0.5 10.0513 0.947715 10.499 1.5 10.499H8.5C9.05228 10.499 9.5 10.0513 9.5 9.49902V4.19902"stroke=currentColor stroke-miterlimit=1 stroke-linecap=round></path><circle cx=9.25 cy=1.74902 r=1.25 fill=currentColor>'), Q2 = (e) => (() => {
  var n = kS();
  return Se(n, e, !0, !0), n;
})(), AS = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 13 12"><path fill=currentColor d="M9.787.98A5.972 5.972 0 006.5 0c-.668 0-1.31.11-1.911.31L9.187 4.94c.221.222.6.065.6-.248V.98z"></path><path fill=currentColor d="M2.879 1.216A5.99 5.99 0 00.5 6c0 1.134.315 2.195.862 3.1V7.309c0-1.966 2.379-2.946 3.764-1.552l4.995 5.027A5.99 5.99 0 0012.5 6a5.972 5.972 0 00-.862-3.1v1.791c0 1.966-2.379 2.946-3.764 1.552L2.879 1.216z"></path><path fill=currentColor d="M8.411 11.69L3.813 7.06a.351.351 0 00-.6.248v3.711c.944.62 2.073.98 3.287.98.668 0 1.31-.11 1.911-.31z">'), ES = (e) => (() => {
  var n = AS();
  return Se(n, e, !0, !0), n;
})(), TS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M4.12531 1.8999C3.94958 1.8999 3.80713 2.04235 3.80713 2.21808C3.80713 2.39382 3.94958 2.53627 4.12531 2.53627H6.0344C6.21013 2.53627 6.35258 2.39382 6.35258 2.21808C6.35258 2.04235 6.21013 1.8999 6.0344 1.8999H4.12531Z"fill=currentColor></path><path d="M4.12531 1.8999C3.94958 1.8999 3.80713 2.04235 3.80713 2.21808C3.80713 2.39382 3.94958 2.53627 4.12531 2.53627H6.0344C6.21013 2.53627 6.35258 2.39382 6.35258 2.21808C6.35258 2.04235 6.21013 1.8999 6.0344 1.8999H4.12531Z"stroke=currentColor></path><path d="M2.69329 1.46818H7.30693C7.75127 1.46818 8.11147 1.82839 8.11147 2.27273V13.7273C8.11147 14.1716 7.75127 14.5318 7.30693 14.5318H2.69329C2.24896 14.5318 1.88875 14.1716 1.88875 13.7273V2.27273C1.88875 1.82839 2.24896 1.46818 2.69329 1.46818ZM2.69329 0.85C1.90754 0.85 1.27057 1.48698 1.27057 2.27273V2.95695C1.17568 3.00972 1.11147 3.111 1.11147 3.22727V3.54545C1.11147 3.64155 1.15532 3.7274 1.22411 3.78409C1.15532 3.84078 1.11147 3.92663 1.11147 4.02273V4.65909C1.11147 4.75519 1.15532 4.84104 1.22411 4.89773C1.15532 4.95442 1.11147 5.04027 1.11147 5.13636V6.09091C1.11147 6.20718 1.17568 6.30846 1.27057 6.36123V13.7273C1.27057 14.513 1.90754 15.15 2.69329 15.15H7.30693C8.09268 15.15 8.72966 14.513 8.72966 13.7273V6.36123C8.82454 6.30846 8.88875 6.20718 8.88875 6.09091V4.81818C8.88875 4.70191 8.82454 4.60063 8.72966 4.54786V2.27273C8.72966 1.48698 8.09268 0.85 7.30693 0.85H2.69329Z"fill=currentColor stroke=currentColor stroke-width=0.3>'), F2 = (e) => (() => {
  var n = TS();
  return Se(n, e, !0, !0), n;
})(), NS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M5.00051 9.28364C7.76195 9.28364 10 7.20598 10 4.64182C10 2.07766 7.76195 0 5.00051 0C2.23907 0 0.00101462 2.07766 0.00101462 4.64182C0.00101462 5.64829 0.346683 6.57889 0.932561 7.33988C0.895455 7.88663 0.709927 8.37313 0.514634 8.74358C0.407223 8.94889 0.297859 9.11404 0.21779 9.22562C0.176778 9.28141 0.145531 9.32381 0.122096 9.35282C0.110379 9.36621 0.102567 9.37737 0.096708 9.38407L0.0908493 9.39076C0.00101462 9.49342 -0.0243734 9.64517 0.0244497 9.77907C0.0732729 9.91297 0.186543 10 0.313483 10C0.873973 10 1.43837 9.80138 1.90707 9.56929C2.35429 9.34613 2.73511 9.08056 2.96751 8.88641C3.58854 9.14305 4.27597 9.28587 5.00051 9.28587V9.28364ZM1.87582 4.03481C1.87582 3.58179 2.19806 3.21357 2.5945 3.21357H2.96946C3.14132 3.21357 3.28193 3.37425 3.28193 3.57063C3.28193 3.76702 3.14132 3.92769 2.96946 3.92769H2.5945C2.54177 3.92769 2.50076 3.97679 2.50076 4.03481C2.50076 4.07052 2.51638 4.10399 2.54373 4.12408L3.11789 4.56148C3.31904 4.71323 3.43817 4.96987 3.43817 5.2466C3.43817 5.69962 3.11593 6.06784 2.71949 6.06784L2.18829 6.07007C2.01644 6.07007 1.87582 5.9094 1.87582 5.71301C1.87582 5.51663 2.01644 5.35595 2.18829 5.35595H2.71949C2.77222 5.35595 2.81323 5.30685 2.81323 5.24883C2.81323 5.21312 2.79761 5.17965 2.77026 5.15956L2.1961 4.72216C1.99691 4.56818 1.87582 4.31154 1.87582 4.03481ZM7.28153 3.21357H7.65649C7.82834 3.21357 7.96896 3.37425 7.96896 3.57063C7.96896 3.76702 7.82834 3.92769 7.65649 3.92769H7.28153C7.2288 3.92769 7.18779 3.97679 7.18779 4.03481C7.18779 4.07052 7.20341 4.10399 7.23075 4.12408L7.80491 4.56148C8.00411 4.71323 8.12519 4.96987 8.12519 5.2466C8.12519 5.69962 7.80296 6.06784 7.40651 6.06784L6.87532 6.07007C6.70346 6.07007 6.56285 5.9094 6.56285 5.71301C6.56285 5.51663 6.70346 5.35595 6.87532 5.35595H7.40651C7.45924 5.35595 7.50025 5.30685 7.50025 5.24883C7.50025 5.21312 7.48463 5.17965 7.45729 5.15956L6.88313 4.72216C6.68393 4.57041 6.56285 4.31377 6.56285 4.03705C6.56285 3.58402 6.88508 3.2158 7.28153 3.2158V3.21357ZM4.31308 3.35639L5.00051 4.40304L5.68794 3.35639C5.76801 3.23365 5.90862 3.18233 6.03751 3.23142C6.1664 3.28052 6.25038 3.41665 6.25038 3.57063V5.71301C6.25038 5.9094 6.10977 6.07007 5.93791 6.07007C5.76605 6.07007 5.62544 5.9094 5.62544 5.71301V4.64182L5.25048 5.21312C5.19189 5.30239 5.09815 5.35595 5.00051 5.35595C4.90286 5.35595 4.80912 5.30239 4.75053 5.21312L4.37557 4.64182V5.71301C4.37557 5.9094 4.23496 6.07007 4.0631 6.07007C3.89124 6.07007 3.75063 5.9094 3.75063 5.71301V3.57063C3.75063 3.41665 3.83656 3.28052 3.9635 3.23142C4.09044 3.18233 4.23105 3.23365 4.31308 3.35639Z"fill=currentColor>'), W2 = (e) => (() => {
  var n = NS();
  return Se(n, e, !0, !0), n;
})(), OS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 8"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1.0119 0.347055C1.06274 0.143703 1.26565 -0.000976562 1.5 -0.000976562H8.5C8.73435 -0.000976562 8.93725 0.143703 8.9881 0.347055L9.9881 4.34707C9.996 4.37871 10 4.41102 10 4.44347V7.55458C10 7.80005 9.77615 7.99902 9.5 7.99902H0.5C0.22386 7.99902 0 7.80005 0 7.55458V4.44347C0 4.41102 0.00399495 4.37871 0.011905 4.34707L1.0119 0.347055ZM1.90108 0.887912L1.12331 3.99902H3.5C3.5 4.73542 4.17155 5.33236 5 5.33236C5.82845 5.33236 6.5 4.73542 6.5 3.99902H8.8767L8.0989 0.887912H1.90108ZM7.292 4.88791C6.9062 5.67276 6.02515 6.22125 5 6.22125C3.97484 6.22125 3.0938 5.67276 2.70802 4.88791H1V7.11013H9V4.88791H7.292Z"fill=currentColor>'), zS = (e) => (() => {
  var n = OS();
  return Se(n, e, !0, !0), n;
})(), MS = /* @__PURE__ */ Z('<svg viewBox="0 0 10 10"fill=none xmlns=http://www.w3.org/2000/svg><path d="M4.99992 2.91634V4.99967M4.79992 5.39616L3.27392 6.46553M1.66659 1.66634L8.33325 8.33301M9.16658 4.99967C9.16658 7.30086 7.30111 9.16634 4.99992 9.16634C2.69873 9.16634 0.833252 7.30086 0.833252 4.99967C0.833252 2.69849 2.69873 0.833008 4.99992 0.833008C7.30111 0.833008 9.16658 2.69849 9.16658 4.99967Z"stroke=currentColor stroke-linecap=round stroke-linejoin=round>'), DS = (e) => (() => {
  var n = MS();
  return Se(n, e, !0, !0), n;
})(), We = (e) => {
  const n = rr(), i = () => {
    var o;
    return (o = n.icons()) == null ? void 0 : o[e.iconKey];
  };
  return b(me, {
    get when() {
      return i();
    },
    get fallback() {
      return e.fallback;
    },
    get children() {
      return b(oi, {
        render: (o) => i()(o, {
          class: e.class
        })
      });
    }
  });
}, io = (e) => b(We, {
  get iconKey() {
    return e.iconKey;
  },
  get class() {
    return e.class;
  },
  get fallback() {
    return b(e.fallback, {
      get class() {
        return e.class;
      }
    });
  }
}), RS = /* @__PURE__ */ Z("<span>"), LS = /* @__PURE__ */ Z("<span><div>"), US = {
  none: "bellSeverityGlow",
  high: "severityGlowHigh__bellSeverityGlow",
  medium: "severityGlowMedium__bellSeverityGlow",
  low: "severityGlowLow__bellSeverityGlow"
}, HS = {
  none: "bellContainer",
  high: "severityHigh__bellContainer",
  medium: "severityMedium__bellContainer",
  low: "severityLow__bellContainer"
}, BS = (e) => {
  const n = se(), i = oe(() => e.unreadCount.severity.high > 0 ? "high" : e.unreadCount.severity.medium > 0 ? "medium" : e.unreadCount.severity.low > 0 ? "low" : "none"), o = oe(() => e.unreadCount);
  return (() => {
    var s = LS(), c = s.firstChild;
    return K(s, b(We, {
      iconKey: "bell",
      get class() {
        return n({
          key: "bellIcon",
          className: "nt-size-4",
          context: {
            unreadCount: o()
          }
        });
      },
      get fallback() {
        return b(G2, {
          get class() {
            return n({
              key: "bellIcon",
              className: "nt-size-4",
              context: {
                unreadCount: o()
              }
            });
          }
        });
      }
    }), null), K(s, b(me, {
      get when() {
        return e.unreadCount.total > 0;
      },
      get children() {
        var f = RS();
        return ue(() => Q(f, n({
          key: "bellDot",
          className: "nt-absolute nt-top-0 nt-right-0 nt-block nt-size-2 nt-transform nt-bg-counter nt-rounded-full nt-border nt-border-background",
          context: {
            unreadCount: o()
          }
        }))), f;
      }
    }), null), ue((f) => {
      var d = n({
        key: HS[i()],
        className: be("nt-size-4 nt-flex nt-justify-center nt-items-center nt-relative nt-text-foreground nt-cursor-pointer [&_stop]:nt-transition-[stop-color]", {
          "[--bell-gradient-start:var(--nv-color-severity-high)] [--bell-gradient-end:oklch(from_var(--nv-color-severity-high)_45%_c_h)]": i() === "high",
          "[--bell-gradient-start:var(--nv-color-severity-medium)] [--bell-gradient-end:oklch(from_var(--nv-color-severity-medium)_45%_c_h)]": i() === "medium",
          "[--bell-gradient-start:var(--nv-color-severity-low)] [--bell-gradient-end:oklch(from_var(--nv-color-severity-low)_45%_c_h)]": i() === "low"
          /* LOW */
        }),
        context: {
          unreadCount: o()
        }
      }), v = n({
        key: US[i()],
        className: be('nt-transition nt-absolute nt-inset-0 -nt-m-1 nt-rounded-full before:nt-content-[""] before:nt-absolute before:nt-inset-0 before:nt-rounded-full before:nt-m-1', {
          "nt-bg-severity-high-alpha-100 before:nt-bg-severity-high-alpha-200": i() === "high",
          "nt-bg-severity-medium-alpha-100 before:nt-bg-severity-medium-alpha-200": i() === "medium",
          "nt-bg-severity-low-alpha-100 before:nt-bg-severity-low-alpha-200": i() === "low"
          /* LOW */
        }),
        context: {
          unreadCount: o()
        }
      });
      return d !== f.e && Q(s, f.e = d), v !== f.t && Q(c, f.t = v), f;
    }, {
      e: void 0,
      t: void 0
    }), s;
  })();
}, J2 = (e) => {
  const {
    unreadCount: n
  } = Y8();
  return b(me, {
    get when() {
      return e.renderBell;
    },
    get fallback() {
      return b(BS, {
        get unreadCount() {
          return n();
        }
      });
    },
    get children() {
      return b(oi, {
        render: (i) => e.renderBell ? e.renderBell(i, n()) : () => {
        }
      });
    }
  });
}, VS = /* @__PURE__ */ Z('<svg width=6 height=6 viewBox="0 0 6 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M5.00175 1.70402L0.705765 6L0 5.29424L4.29548 0.998253H0.509608V0H6V5.49039H5.00175V1.70402Z"fill=currentColor>'), jS = (e) => (() => {
  var n = VS();
  return Se(n, e, !0, !0), n;
})(), Pi = new Proxy(Py, {
  get: (e, n) => (i) => {
    const {
      animations: o
    } = rr();
    return b(Py, he(i, {
      tag: n,
      get transition() {
        return o() ? i.transition : {
          duration: 0
        };
      }
    }));
  }
}), ew = en(void 0);
function $S(e) {
  var n;
  const [i, o] = W(null), [s, c] = W(null), {
    animations: f
  } = rr(), d = 0.2, v = () => {
    var O;
    return (O = e.animationDuration) != null ? O : d;
  }, g = oe(() => f() ? v() : 0), p = S2(i, s, {
    placement: e.placement || "top",
    strategy: "fixed",
    whileElementsMounted: b2,
    middleware: [
      w2(10),
      x2({
        fallbackPlacements: e.fallbackPlacements || ["bottom"]
      }),
      // Configure shift to prevent layout overflow and UI shifts
      _2({
        padding: 8,
        crossAxis: !1,
        // Prevent horizontal shifting that causes layout gaps
        mainAxis: !0
        // Allow vertical shifting only
      })
    ]
  }), [m, _] = W((n = e.open) != null ? n : !1), w = oe(() => e.open !== void 0 ? !!e.open : m()), C = (O) => {
    e.open === void 0 && _(O);
  }, [k, S] = W(w());
  let E;
  return Ue(() => {
    const O = w();
    E && (clearTimeout(E), E = void 0), O ? S(!0) : g() > 0 ? E = window.setTimeout(() => {
      S(!1);
    }, g() * 1e3) : S(!1);
  }), Ue(() => {
    w() && S(!0);
  }), b(ew.Provider, {
    value: {
      reference: i,
      setReference: o,
      floating: s,
      setFloating: c,
      open: w,
      shouldRender: k,
      setOpen: C,
      floatingStyles: () => {
        var O, A;
        return {
          position: p.strategy,
          top: `${(O = p.y) != null ? O : 0}px`,
          left: `${(A = p.x) != null ? A : 0}px`
        };
      },
      effectiveAnimationDuration: g
    },
    get children() {
      return e.children;
    }
  });
}
function K0() {
  const e = Ut(ew);
  if (!e)
    throw new Error("useTooltip must be used within Tooltip.Root component");
  return e;
}
var KS = () => "nt-bg-foreground nt-p-2 nt-shadow-tooltip nt-rounded-lg nt-text-background nt-text-xs", qS = (e) => {
  const {
    open: n,
    setFloating: i,
    floating: o,
    floatingStyles: s,
    effectiveAnimationDuration: c
  } = K0(), {
    setActive: f,
    removeActive: d
  } = V0(), [v, g] = Ke(e, ["class", "appearanceKey", "style"]), p = se();
  return qt(() => {
    const m = o();
    m && f(m), $e(() => {
      m && d(m);
    });
  }), b(Pi.div, he({
    initial: {
      opacity: 0,
      scale: 0.95
    },
    get animate() {
      return n() ? {
        opacity: 1,
        scale: 1
      } : {
        opacity: 0,
        scale: 0.95
      };
    },
    get transition() {
      return {
        duration: c(),
        easing: "ease-in-out"
      };
    },
    ref: i,
    get class() {
      return ft(() => !!v.class)() ? v.class : p({
        key: v.appearanceKey || "tooltipContent",
        className: KS()
      });
    },
    get style() {
      return je(re({}, s()), {
        "z-index": 99999
      });
    }
  }, g, {
    get children() {
      return e.children;
    }
  }));
}, GS = (e) => {
  const {
    shouldRender: n
  } = K0(), {
    container: i
  } = rr(), o = () => {
    var s;
    return (s = i()) != null ? s : document.body;
  };
  return b(me, {
    get when() {
      return n();
    },
    get children() {
      return b(E0, {
        get mount() {
          return o();
        },
        get children() {
          return b(vw, {
            get children() {
              return b(qS, e);
            }
          });
        }
      });
    }
  });
};
function PS(e) {
  return (...n) => {
    for (const i of e) i && i(...n);
  };
}
function tw(...e) {
  return PS(e);
}
var IS = /* @__PURE__ */ Z("<button>"), YS = (e) => {
  const {
    setReference: n,
    setOpen: i
  } = K0(), o = se(), [s, c] = Ke(e, ["appearanceKey", "asChild", "onClick", "onMouseEnter", "onMouseLeave", "ref"]), f = (g) => {
    typeof s.onMouseEnter == "function" && s.onMouseEnter(g), i(!0);
  }, d = oe(() => s.ref ? tw(n, s.ref) : n), v = (g) => {
    typeof s.onMouseLeave == "function" && s.onMouseLeave(g), i(!1);
  };
  return s.asChild ? b(lo, he({
    get component() {
      return s.asChild;
    },
    ref(g) {
      var p = d();
      typeof p == "function" && p(g);
    },
    onMouseEnter: f,
    onMouseLeave: v
  }, c)) : (() => {
    var g = IS();
    g.addEventListener("mouseleave", () => {
      i(!1);
    }), g.addEventListener("mouseenter", () => {
      i(!0);
    });
    var p = d();
    return typeof p == "function" && kn(p, g), Se(g, he({
      get class() {
        return o({
          key: s.appearanceKey || "tooltipTrigger"
        });
      }
    }, c), !1, !0), K(g, () => e.children), g;
  })();
}, He = {
  Root: $S,
  /**
   * Tooltip.Trigger renders a `button` and has no default styling.
   */
  Trigger: YS,
  /**
   * Tooltip.Content renders a `div` and has popover specific styling.
   */
  Content: GS
}, ZS = /* @__PURE__ */ Z("<button type=button>");
function XS(e) {
  const [n, i] = W(!1), o = se();
  let s;
  const c = "Copied!", f = 2e3;
  function d() {
    return P(this, null, function* () {
      var v;
      s && clearTimeout(s);
      try {
        yield navigator.clipboard.writeText(e.textToCopy), i(!0), s = window.setTimeout(() => {
          i(!1), s = void 0;
        }, (v = e.tooltipDuration) != null ? v : f);
      } catch (g) {
        console.error("Failed to copy text: ", g);
      }
    });
  }
  return b(He.Root, {
    get open() {
      return n();
    },
    placement: "top",
    animationDuration: 0.15,
    get children() {
      return [b(He.Trigger, {
        asChild: (v) => (() => {
          var g = ZS();
          return Se(g, he(v, {
            onClick: d,
            get class() {
              return o({
                key: "button",
                className: "nt-cursor-pointer"
              });
            }
          }), !1, !0), K(g, () => e.children), g;
        })()
      }), b(He.Content, {
        get children() {
          var v;
          return (v = e.tooltipText) != null ? v : c;
        }
      })];
    }
  });
}
var QS = /* @__PURE__ */ Z('<span class="nt-z-10 nt-text-xs nt-text-stripes">'), FS = /* @__PURE__ */ Z('<span class="nt-z-10 nt-text-xs">•'), WS = /* @__PURE__ */ Z('<a target=_blank class="nt-z-10 nt-flex nt-items-center nt-gap-1 nt-justify-center"><span class=nt-text-xs>Inbox by</span><span class=nt-text-xs>Novu'), JS = /* @__PURE__ */ Z("<span class=nt-underline>Copy cURL"), eC = /* @__PURE__ */ Z('<div class="nt-z-10 nt-flex nt-items-center nt-gap-1 nt-text-xs nt-text-secondary-foreground"><a href=https://go.novu.co/keyless class="nt-underline nt-flex nt-items-center nt-gap-0.5"target=_blank rel="noopener noreferrer">Get API key</a><span>•</span><span>•</span><button type=button class=nt-underline>Send notification'), tC = /* @__PURE__ */ Z('<div><div class="nt-flex nt-items-center nt-gap-1">'), nC = /* @__PURE__ */ Z('<a href="https://go.novu.co/keyless?utm_campaign=keyless-mode"target=_blank rel="noopener noreferrer">Keyless mode'), rC = /* @__PURE__ */ Z("<br>"), iC = 'before:nt-content-[""] before:nt-absolute before:nt-inset-0 before:-nt-right-[calc(0+var(--stripes-size))] before:[mask-image:linear-gradient(transparent_0%,black)] before:nt-bg-dev-stripes-gradient before:nt-bg-[length:var(--stripes-size)_var(--stripes-size)] before:nt-animate-stripes before:hover:[animation-play-state:running]', nw = 'after:nt-content-[""] after:nt-absolute after:nt-inset-0 after:-nt-top-12', aC = `${nw} after:nt-bg-[linear-gradient(180deg,transparent,oklch(from_var(--nv-color-stripes)_l_c_h_/_0.07)_55%,transparent),linear-gradient(180deg,transparent,oklch(from_var(--nv-color-background)_l_c_h_/_0.9)_55%,transparent)]`, oC = `${nw} after:nt-bg-[linear-gradient(180deg,transparent,oklch(from_var(--nv-color-background)_l_c_h_/_0.9)_55%,transparent)]`, lC = () => {
  const {
    hideBranding: e,
    isDevelopmentMode: n,
    isKeyless: i
  } = At(), o = An();
  function s() {
    return P(this, null, function* () {
      try {
        yield o.notifications.triggerHelloWorldEvent();
      } catch (c) {
        console.error("Failed to send Hello World from UI via novu.notifications:", c);
      }
    });
  }
  return b(me, {
    get when() {
      return !e() || n();
    },
    get children() {
      var c = tC(), f = c.firstChild;
      return c.style.setProperty("--stripes-size", "15px"), K(f, b(me, {
        get when() {
          return n();
        },
        get children() {
          var d = QS();
          return K(d, (() => {
            var v = ft(() => !!i());
            return () => v() ? b(He.Root, {
              get children() {
                return [b(He.Trigger, {
                  class: "",
                  get children() {
                    return nC();
                  }
                }), b(He.Content, {
                  get children() {
                    return ["Temporary <Inbox />. All data will expire in 24 hours.", rC(), "Connect API key to persist."];
                  }
                })];
              }
            }) : "Development mode";
          })()), d;
        }
      }), null), K(f, b(me, {
        get when() {
          return ft(() => !!n())() && !e();
        },
        get children() {
          return FS();
        }
      }), null), K(f, b(me, {
        get when() {
          return !e();
        },
        get children() {
          var d = WS(), v = d.firstChild, g = v.nextSibling;
          return K(d, b(ES, {
            class: "nt-size-2.5"
          }), g), ue(() => ct(d, "href", `https://go.novu.co/powered?ref=${sC()}`)), d;
        }
      }), null), K(c, b(me, {
        get when() {
          return i();
        },
        get children() {
          var d = eC(), v = d.firstChild;
          v.firstChild;
          var g = v.nextSibling, p = g.nextSibling, m = p.nextSibling;
          return K(v, b(jS, {
            class: "nt-ml-1"
          }), null), K(d, b(XS, {
            get textToCopy() {
              return cC();
            },
            get children() {
              return JS();
            }
          }), p), m.$$click = (_) => {
            _.preventDefault(), s();
          }, d;
        }
      }), null), ue(() => Q(c, be("nt-relative nt-flex nt-shrink-0 nt-flex-col nt-justify-center nt-items-center nt-gap-1 nt-mt-auto nt-py-3 nt-text-foreground-alpha-400", {
        [iC]: n(),
        [aC]: n(),
        "nt-bg-[oklch(from_var(--nv-color-stripes)_l_c_h_/_0.1)]": n(),
        [oC]: !n()
      }))), c;
    }
  });
};
function sC() {
  return bb() ? window.location.hostname : "";
}
function cC() {
  const e = window.localStorage.getItem("novu_keyless_application_identifier");
  return e ? `curl -X POST   ${typeof window < "u" && window.NOVU_LOCAL_BACKEND_URL || "https://api.novu.co"}/${lb}/events/trigger   -H 'Authorization: Keyless ${e}'   -H 'Content-Type: application/json'   -d '{
    "name": "hello-world",
    "to": {
      "subscriberId": "keyless-subscriber-id"
    },
    "payload": {
      "body": "New From Keyless Environment",
      "subject": "Hello World!"
    }
  }'` : (console.error("Novu application identifier not found for cURL command."), "");
}
Un(["click"]);
var uC = /* @__PURE__ */ Z("<button>"), rw = R0(be('nt-inline-flex nt-gap-4 nt-items-center nt-justify-center nt-whitespace-nowrap nt-text-sm nt-font-medium nt-transition-colors disabled:nt-pointer-events-none disabled:nt-opacity-50 after:nt-absolute after:nt-content-[""] before:nt-content-[""] before:nt-absolute [&_svg]:nt-pointer-events-none [&_svg]:nt-shrink-0', "focus-visible:nt-outline-none focus-visible:nt-ring-2 focus-visible:nt-rounded-md focus-visible:nt-ring-ring focus-visible:nt-ring-offset-2"), {
  variants: {
    variant: {
      default: "nt-bg-gradient-to-b nt-from-20% nt-from-primary-foreground-alpha-200 nt-to-transparent nt-bg-primary nt-text-primary-foreground nt-shadow-[0_0_0_0.5px_var(--nv-color-primary-600)] nt-relative before:nt-absolute before:nt-inset-0 before:nt-border before:nt-border-primary-foreground-alpha-100 after:nt-absolute after:nt-inset-0 after:nt-opacity-0 hover:after:nt-opacity-100 after:nt-transition-opacity after:nt-bg-gradient-to-b after:nt-from-primary-foreground-alpha-50 after:nt-to-transparent",
      secondary: "nt-bg-secondary nt-text-secondary-foreground nt-shadow-[0_0_0_0.5px_var(--nv-color-secondary-600)] nt-relative before:nt-absolute before:nt-inset-0 before:nt-border before:nt-border-secondary-foreground-alpha-100 after:nt-absolute after:nt-inset-0 after:nt-opacity-0 hover:after:nt-opacity-100 after:nt-transition-opacity after:nt-bg-gradient-to-b after:nt-from-secondary-foreground-alpha-50 after:nt-to-transparent",
      ghost: "hover:nt-bg-neutral-alpha-100 nt-text-foreground-alpha-600 hover:nt-text-foreground-alpha-800",
      unstyled: ""
    },
    size: {
      none: "",
      iconSm: "nt-p-1 nt-rounded-md after:nt-rounded-md before:nt-rounded-md focus-visible:nt-rounded-md",
      icon: "nt-p-2.5 nt-rounded-xl before:nt-rounded-xl after:nt-rounded-xl focus-visible:nt-rounded-xl",
      default: "nt-px-2 nt-py-1 nt-rounded-lg focus-visible:nt-rounded-lg before:nt-rounded-lg after:nt-rounded-lg",
      sm: "nt-px-1 nt-py-px nt-rounded-md nt-text-xs nt-px-1 before:nt-rounded-md focus-visible:nt-rounded-md after:nt-rounded-md",
      lg: "nt-px-8 nt-py-2 nt-text-base before:nt-rounded-lg after:nt-rounded-lg focus-visible:nt-rounded-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), at = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey", "context"]), o = se();
  return (() => {
    var s = uC();
    return Se(s, he({
      get "data-variant"() {
        return e.variant;
      },
      get "data-size"() {
        return e.size;
      },
      get class() {
        return o({
          key: n.appearanceKey || "button",
          className: be(rw({
            variant: e.variant,
            size: e.size
          }), n.class),
          context: n.context
        });
      }
    }, i), !1, !1), s;
  })();
}, fC = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=size-4><path d="M5 12l5 5l10 -10">'), dC = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=size-4><path d="M5 12l14 0">'), c1 = (e) => {
  const [n, i] = Ke(e, ["class"]);
  return b(B0, he({
    get class() {
      return be("nt-items-top nt-group nt-relative nt-flex", n.class);
    }
  }, i, {
    get children() {
      return [b(H0, {
        class: "nt-peer"
      }), b(L0, {
        class: "nt-size-4 nt-shrink-0 nt-rounded-sm nt-border nt-border-primary nt-ring-offset-background data-[disabled]:nt-cursor-not-allowed data-[disabled]:nt-opacity-50 peer-focus-visible:nt-outline-none peer-focus-visible:nt-ring-2 peer-focus-visible:ntring-ring peer-focus-visible:nt-ring-offset-2 data-[checked]:nt-border-none data-[indeterminate]:nt-border-none data-[checked]:nt-bg-primary data-[indeterminate]:nt-bg-primary data-[checked]:nt-text-primary-foreground data-[indeterminate]:nt-text-primary-foreground",
        get children() {
          return b(U0, {
            get children() {
              return b(Ub, {
                get children() {
                  return [b(eu, {
                    get when() {
                      return !i.indeterminate;
                    },
                    get children() {
                      return fC();
                    }
                  }), b(eu, {
                    get when() {
                      return i.indeterminate;
                    },
                    get children() {
                      return dC();
                    }
                  })];
                }
              });
            }
          });
        }
      })];
    }
  }));
}, iw = /* @__PURE__ */ Z("<div>"), hC = /* @__PURE__ */ Z("<div><span>"), aw = en({
  currentDate: () => /* @__PURE__ */ new Date(),
  setCurrentDate: () => {
  },
  viewMonth: () => /* @__PURE__ */ new Date(),
  setViewMonth: () => {
  },
  selectedDate: () => null,
  setSelectedDate: () => {
  },
  maxDays: () => 0
}), q0 = () => Ut(aw), vC = (e) => {
  const [n, i] = Ke(e, ["children", "value", "onDateChange", "class", "maxDays"]), o = se(), s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0);
  const [c, f] = W(s), [d, v] = W(s), [g, p] = W(n.value ? new Date(n.value) : null), m = (_) => {
    p(_), n.onDateChange && n.onDateChange(_);
  };
  return b(aw.Provider, {
    value: {
      currentDate: c,
      setCurrentDate: f,
      viewMonth: d,
      setViewMonth: v,
      selectedDate: g,
      setSelectedDate: m,
      maxDays: () => e.maxDays
    },
    get children() {
      var _ = iw();
      return Se(_, he({
        get class() {
          return o({
            key: "datePicker",
            className: be("nt-p-2", n.class)
          });
        }
      }, i), !1, !0), K(_, () => n.children), _;
    }
  });
}, gC = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey", "children"]), o = se(), {
    viewMonth: s,
    setViewMonth: c,
    currentDate: f,
    maxDays: d
  } = q0(), v = o({
    key: "datePickerControlPrevTrigger__icon",
    className: "nt-size-4 nt-text-foreground-alpha-700",
    iconKey: "arrowLeft"
  }), g = o({
    key: "datePickerControlNextTrigger__icon",
    className: "nt-size-4 nt-text-foreground-alpha-700",
    iconKey: "arrowRight"
  }), p = () => {
    const C = new Date(s());
    C.setMonth(C.getMonth() - 1);
    const k = f();
    C.getFullYear() < k.getFullYear() || C.getFullYear() === k.getFullYear() && C.getMonth() < k.getMonth() || c(C);
  }, m = () => {
    const C = new Date(s());
    C.setMonth(C.getMonth() + 1);
    const k = d();
    if (k > 0) {
      const S = new Date(f());
      if (S.setDate(S.getDate() + k), C.getFullYear() > S.getFullYear() || C.getFullYear() === S.getFullYear() && C.getMonth() > S.getMonth())
        return;
    }
    c(C);
  }, _ = () => {
    const C = f(), k = s();
    return k.getFullYear() === C.getFullYear() && k.getMonth() === C.getMonth();
  }, w = () => {
    const C = d();
    if (C === 0) return !1;
    const k = s(), S = new Date(f());
    return S.setDate(S.getDate() + C), k.getFullYear() === S.getFullYear() && k.getMonth() === S.getMonth();
  };
  return (() => {
    var C = hC(), k = C.firstChild;
    return Se(C, he({
      get class() {
        return o({
          key: n.appearanceKey || "datePickerControl",
          className: be("nt-flex nt-items-center nt-justify-between nt-gap-1.5 nt-h-7 nt-p-1 nt-mb-2 nt-rounded-lg nt-bg-background", n.class)
        });
      }
    }, i), !1, !0), K(C, b(at, {
      appearanceKey: "datePickerControlPrevTrigger",
      variant: "ghost",
      onClick: (S) => {
        S.stopPropagation(), p();
      },
      get disabled() {
        return _();
      },
      class: "nt-flex nt-justify-center nt-items-center nt-gap-0.5 nt-w-5 nt-h-5 nt-p-0 nt-rounded-md nt-bg-background nt-shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]",
      get children() {
        return b(We, {
          iconKey: "arrowLeft",
          class: v,
          get fallback() {
            return b(q2, {
              class: v
            });
          }
        });
      }
    }), k), K(k, () => s().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })), K(C, b(at, {
      appearanceKey: "datePickerControlNextTrigger",
      variant: "ghost",
      onClick: (S) => {
        S.stopPropagation(), m();
      },
      get disabled() {
        return w();
      },
      class: "nt-flex nt-justify-center nt-items-center nt-gap-0.5 nt-w-5 nt-h-5 nt-p-0 nt-rounded-md nt-bg-background nt-shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]",
      get children() {
        return b(We, {
          iconKey: "arrowRight",
          class: g,
          get fallback() {
            return b(aS, {
              class: g
            });
          }
        });
      }
    }), null), ue(() => Q(k, o({
      key: "datePickerHeaderMonth",
      className: "nt-text-sm nt-font-medium nt-text-foreground-alpha-700"
    }))), C;
  })();
}, pC = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey", "date"]), {
    selectedDate: o,
    viewMonth: s,
    setSelectedDate: c,
    currentDate: f,
    maxDays: d
  } = q0(), {
    t: v
  } = gt(), g = e.date.getMonth() === s().getMonth(), p = () => {
    const k = f();
    return e.date < k;
  }, m = () => {
    const k = d();
    if (k === 0) return !1;
    const S = new Date(f());
    return S.setDate(S.getDate() + k), e.date > S;
  }, _ = !g || p() || m(), w = () => g && m(), C = b(at, he({
    appearanceKey: "datePickerCalendarDay__button",
    variant: "ghost",
    disabled: _,
    onClick: (k) => {
      k.stopPropagation(), c(n.date);
    },
    get class() {
      var k;
      return be("nt-size-8 nt-w-full nt-rounded-md nt-flex nt-items-center nt-justify-center", {
        "nt-text-muted-foreground disabled:nt-opacity-20": !g || p(),
        "nt-text-foreground-alpha-700": g && !p() && !m()
      }, {
        "nt-bg-primary-alpha-300 hover:nt-bg-primary-alpha-400": ((k = o()) == null ? void 0 : k.toDateString()) === n.date.toDateString()
      });
    }
  }, i, {
    get children() {
      return n.date.getDate();
    }
  }));
  return w() ? b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        children: C
      }), b(He.Content, {
        get children() {
          return v("snooze.datePicker.exceedingLimitTooltip", {
            days: d()
          });
        }
      })];
    }
  }) : C;
}, mC = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey"]), o = se(), {
    viewMonth: s
  } = q0(), c = () => {
    const f = s().getFullYear(), d = s().getMonth(), v = new Date(f, d, 1), g = new Date(f, d + 1, 0).getDate(), p = v.getDay(), m = [];
    for (let w = 0; w < p; w += 1) {
      const C = new Date(f, d, -w);
      m.unshift(C);
    }
    for (let w = 1; w <= g; w += 1)
      m.push(new Date(f, d, w));
    const _ = 7 - m.length % 7;
    if (_ < 7)
      for (let w = 1; w <= _; w += 1)
        m.push(new Date(f, d + 1, w));
    return m;
  };
  return (() => {
    var f = iw();
    return f.$$click = (d) => d.stopPropagation(), Se(f, he({
      get class() {
        return o({
          key: n.appearanceKey || "datePickerCalendar",
          className: be("nt-grid nt-grid-cols-7 nt-gap-1", n.class)
        });
      }
    }, i), !1, !0), K(f, () => c().map((d) => b(pC, {
      date: d
    }))), f;
  })();
};
Un(["click"]);
var yC = /* @__PURE__ */ Z("<button>"), bC = (e) => {
  const {
    onClose: n
  } = ql(), i = se(), [o, s] = Ke(e, ["onClick", "asChild", "appearanceKey", "class"]), c = (f) => {
    typeof o.onClick == "function" && o.onClick(f), n();
  };
  return o.asChild ? b(lo, he({
    get component() {
      return o.asChild;
    },
    onClick: c
  }, s)) : (() => {
    var f = yC();
    return f.$$click = c, Se(f, he({
      get class() {
        return i({
          key: o.appearanceKey || "popoverClose",
          className: o.class
        });
      }
    }, s), !1, !1), f;
  })();
};
Un(["click"]);
var wC = /* @__PURE__ */ Z("<div>"), _C = (e) => {
  const n = rr();
  let i;
  return [(() => {
    var o = wC();
    return kn((s) => {
      i = s;
    }, o), o.style.setProperty("display", "none"), o;
  })(), b(E0, he({
    get mount() {
      return xC(i, n.id());
    }
  }, e))];
}, xC = (e, n) => {
  let i = e;
  for (; i && i.id !== `novu-root-${n}`; )
    i = i.parentElement;
  if (i && i.id === `novu-root-${n}`)
    return i;
}, ow = en(void 0);
function SC(e) {
  var n;
  const [i, o] = W((n = e.open) != null ? n : !1), s = () => {
    var w;
    return (w = e.open) != null ? w : i();
  }, [c, f] = W(null), [d, v] = W(null), g = S2(c, d, {
    strategy: "absolute",
    placement: e.placement,
    whileElementsMounted: b2,
    middleware: [
      w2(10),
      x2({
        fallbackPlacements: e.fallbackPlacements
      }),
      // Configure shift to prevent layout overflow and UI shifts
      _2({
        padding: 8,
        crossAxis: !1,
        // Prevent horizontal shifting that causes layout gaps
        mainAxis: !0
        // Allow vertical shifting only
      })
    ]
  }), p = oe(() => {
    var w, C;
    return {
      position: g.strategy,
      top: `${(w = g.y) != null ? w : 0}px`,
      left: `${(C = g.x) != null ? C : 0}px`
    };
  }), m = () => {
    if (e.onOpenChange) {
      e.onOpenChange(!1);
      return;
    }
    o(!1);
  }, _ = () => {
    if (e.onOpenChange) {
      e.onOpenChange(!e.open);
      return;
    }
    o((w) => !w);
  };
  return b(ow.Provider, {
    value: {
      onToggle: _,
      onClose: m,
      reference: c,
      setReference: f,
      floating: d,
      setFloating: v,
      open: s,
      floatingStyles: p
    },
    get children() {
      return e.children;
    }
  });
}
function ql() {
  const e = Ut(ow);
  if (!e)
    throw new Error("usePopover must be used within Popover.Root component");
  return e;
}
var CC = /* @__PURE__ */ Z("<div>"), kC = () => be("nt-w-[400px] nt-h-[600px] nt-rounded-xl nt-bg-background", "nt-shadow-popover nt-animate-in nt-slide-in-from-top-2 nt-fade-in nt-cursor-default nt-flex nt-flex-col nt-overflow-hidden nt-border nt-border-border nt-z-10"), AC = (e) => {
  const {
    open: n,
    setFloating: i,
    floating: o,
    floatingStyles: s
  } = ql(), {
    setActive: c,
    removeActive: f
  } = V0(), [d, v] = Ke(e, ["class", "appearanceKey", "style"]), g = se();
  return qt(() => {
    const p = o();
    c(p), $e(() => {
      f(p);
    });
  }), (() => {
    var p = CC();
    return kn(i, p), Se(p, he({
      get class() {
        return g({
          key: d.appearanceKey || "popoverContent",
          className: be(kC(), d.class)
        });
      },
      get style() {
        return s();
      },
      get "data-open"() {
        return n();
      }
    }, v), !1, !1), p;
  })();
}, EC = (e) => {
  const {
    open: n,
    onClose: i,
    reference: o,
    floating: s
  } = ql(), {
    active: c
  } = V0(), {
    container: f
  } = rr(), d = (g) => {
    var p, m;
    if ((p = o()) != null && p.contains(g.target))
      return;
    const _ = f();
    c() !== s() || (m = s()) != null && m.contains(g.target) || _ && g.target.shadowRoot === _ || i();
  }, v = (g) => {
    c() === s() && g instanceof KeyboardEvent && g.key === "Escape" && i();
  };
  return qt(() => {
    var g;
    document.body.addEventListener("click", d), (g = f()) == null || g.addEventListener("click", d), document.body.addEventListener("keydown", v);
  }), $e(() => {
    var g;
    document.body.removeEventListener("click", d), (g = f()) == null || g.removeEventListener("click", d), document.body.removeEventListener("keydown", v);
  }), b(me, {
    get when() {
      return n();
    },
    get children() {
      return b(_C, {
        get children() {
          return b(AC, e);
        }
      });
    }
  });
}, TC = /* @__PURE__ */ Z("<button>"), NC = (e) => {
  const {
    setReference: n,
    onToggle: i
  } = ql(), o = se(), [s, c] = Ke(e, ["appearanceKey", "asChild", "onClick", "ref"]), f = (v) => {
    typeof s.onClick == "function" && s.onClick(v), i();
  }, d = oe(() => s.ref ? tw(n, s.ref) : n);
  return s.asChild ? b(lo, he({
    get component() {
      return s.asChild;
    },
    ref(v) {
      var g = d();
      typeof g == "function" && g(v);
    },
    onClick: f
  }, c)) : (() => {
    var v = TC();
    v.$$click = f;
    var g = d();
    return typeof g == "function" && kn(g, v), Se(v, he({
      get class() {
        return o({
          key: s.appearanceKey || "dropdownTrigger"
        });
      }
    }, c), !1, !0), K(v, () => e.children), v;
  })();
};
Un(["click"]);
var Fn = {
  Root: SC,
  /**
   * Popover.Trigger renders a `button` and has no default styling.
   */
  Trigger: NC,
  /**
   * Popover.Content renders a `div` and has popover specific styling.
   */
  Content: EC,
  /**
   * Popover.Close renders a `button` and has no styling.
   * Closes the popover when clicked.
   * `onClick` function is propagated.
   */
  Close: bC
}, OC = () => "nt-p-1 nt-text-sm nt-min-w-52 nt-shadow-dropdown nt-h-fit nt-min-w-52 nt-w-max", zC = (e) => {
  const [n, i] = Ke(e, ["appearanceKey", "class"]);
  return b(Fn.Content, he({
    get appearanceKey() {
      return n.appearanceKey || "dropdownContent";
    },
    get class() {
      return be(OC(), n.class);
    }
  }, i));
}, uo = () => "focus:nt-outline-none nt-flex nt-items-center nt-gap-1.5 nt-text-sm nt-rounded-lg nt-items-center hover:nt-bg-neutral-alpha-50 focus-visible:nt-bg-neutral-alpha-50 nt-py-1 nt-px-2", MC = (e) => {
  const [n, i] = Ke(e, ["appearanceKey", "onClick", "class", "asChild"]), {
    onClose: o
  } = ql(), s = (c) => {
    typeof n.onClick == "function" && n.onClick(c), o();
  };
  return n.asChild ? b(lo, he({
    get component() {
      return n.asChild;
    },
    onClick: s
  }, i)) : b(Fn.Close, he({
    get appearanceKey() {
      return n.appearanceKey || "dropdownItem";
    },
    get class() {
      return be(uo(), n.class);
    },
    onClick: (c) => {
      typeof n.onClick == "function" && n.onClick(c), o();
    }
  }, i));
}, DC = (e) => b(Fn.Root, he({
  placement: "bottom",
  fallbackPlacements: ["top"]
}, e)), RC = () => "nt-relative nt-transition nt-outline-none focus-visible:nt-outline-nonefocus-visible:nt-ring-2 focus-visible:nt-ring-primary focus-visible:nt-ring-offset-2", LC = (e) => {
  const n = se(), [i, o] = Ke(e, ["appearanceKey", "class"]);
  return b(Fn.Trigger, he({
    get class() {
      return n({
        key: i.appearanceKey || "dropdownTrigger",
        className: be(RC(), i.class)
      });
    }
  }, o));
}, dt = {
  Root: DC,
  /**
   * Dropdown.Trigger renders a `button` and has no default styling.
   */
  Trigger: LC,
  /**
   * Dropdown.Content renders a `Popover.Content` by default.
   */
  Content: zC,
  /**
   * Dropdown.Item renders a `Popover.Close` with dropdown specific styling.
   * Closes the popover when clicked.
   * `onClick` function is propagated.
   */
  Item: MC
}, UC = ({
  activeTab: e,
  setActiveTab: n,
  tabsContainer: i
}) => {
  const { container: o } = rr(), [s, c] = W(!1), f = () => {
    const d = o();
    return d instanceof ShadowRoot ? d : document;
  };
  Ue(() => {
    const d = f(), v = (g) => {
      var p;
      if (!(g instanceof KeyboardEvent) || g.key !== "Tab")
        return;
      const m = (p = i()) == null ? void 0 : p.querySelectorAll('[role="tab"]');
      !m || !d.activeElement || c(Array.from(m).includes(d.activeElement));
    };
    return d.addEventListener("keyup", v), $e(() => d.removeEventListener("keyup", v));
  }), Ue(() => {
    const d = f(), v = (g) => {
      var p, m;
      if (!s() || !(g instanceof KeyboardEvent) || g.key !== "ArrowLeft" && g.key !== "ArrowRight")
        return;
      const _ = Array.from((m = (p = i()) == null ? void 0 : p.querySelectorAll('[role="tab"]')) != null ? m : []), w = _.map((O) => O.id), C = w.indexOf(e()), { length: k } = w;
      let S = C, E = e();
      g.key === "ArrowLeft" ? (S = C === 0 ? k - 1 : C - 1, E = w[S]) : g.key === "ArrowRight" && (S = C === k - 1 ? 0 : C + 1, E = w[S]), _[S].focus(), n(E);
    };
    return d.addEventListener("keydown", v), $e(() => d.removeEventListener("keydown", v));
  });
}, HC = /* @__PURE__ */ Z("<div>"), lw = en(void 0), sw = () => {
  const e = Ut(lw);
  if (!e)
    throw new Error("useTabsContext must be used within an TabsContext.Provider");
  return e;
}, BC = () => "nt-flex nt-flex-col", VC = (e) => {
  var n;
  const [i, o] = Ke(e, ["defaultValue", "value", "class", "appearanceKey", "onChange", "children"]), [s, c] = W(), [f, d] = W([]), [v, g] = W((n = i.defaultValue) != null ? n : ""), p = se();
  return UC({
    tabsContainer: s,
    activeTab: v,
    setActiveTab: g
  }), Ue(() => {
    i.value && g(i.value);
  }), Ue(() => {
    var m;
    (m = i.onChange) == null || m.call(i, v());
  }), b(lw.Provider, {
    value: {
      activeTab: v,
      setActiveTab: g,
      visibleTabs: f,
      setVisibleTabs: d
    },
    get children() {
      var m = HC();
      return kn(c, m), Se(m, he({
        get class() {
          return p({
            key: i.appearanceKey || "tabsRoot",
            className: be(BC(), i.class)
          });
        }
      }, o), !1, !0), K(m, () => i.children), m;
    }
  });
}, jC = /* @__PURE__ */ Z("<div role=tabpanel>"), $C = (e) => {
  const [n, i] = Ke(e, ["value", "class", "appearanceKey", "children"]), o = se(), {
    activeTab: s
  } = sw();
  return b(me, {
    get when() {
      return s() === n.value;
    },
    get children() {
      var c = jC();
      return Se(c, he({
        get class() {
          return o({
            key: n.appearanceKey || "tabsContent",
            className: be(n.class, s() === n.value ? "nt-block" : "nt-hidden")
          });
        },
        get id() {
          return `tabpanel-${n.value}`;
        },
        get "aria-labelledby"() {
          return n.value;
        },
        get "data-state"() {
          return s() === n.value ? "active" : "inactive";
        }
      }, i), !1, !0), K(c, () => n.children), c;
    }
  });
}, KC = /* @__PURE__ */ Z("<div role=tablist>"), qC = /* @__PURE__ */ Z('<div class="nt-relative nt-z-[-1]">'), GC = () => "nt-flex nt-gap-6", PC = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey", "ref", "children"]), o = se();
  return [(() => {
    var s = KC(), c = n.ref;
    return typeof c == "function" ? kn(c, s) : n.ref = s, Se(s, he({
      get class() {
        return o({
          key: n.appearanceKey || "tabsList",
          className: be(GC(), n.class)
        });
      }
    }, i), !1, !0), K(s, () => n.children), s;
  })(), qC()];
}, cw = () => be("nt-relative nt-transition nt-outline-none nt-text-foreground-alpha-600 nt-pb-[0.625rem]", "after:nt-absolute after:nt-content-[''] after:nt-bottom-0 after:nt-left-0 after:nt-w-full after:nt-h-[2px]", "after:nt-transition-opacity after:nt-duration-200", "data-[state=active]:after:nt-border-b-2 data-[state=active]:after:nt-border-primary data-[state=active]:after:nt-opacity-100", "data-[state=active]:nt-text-foreground after:nt-border-b-transparent after:nt-opacity-0", "focus-visible:nt-outline-none focus-visible:nt-rounded-lg focus-visible:nt-ring-2 focus-visible:nt-ring-ring focus-visible:nt-ring-offset-2"), IC = (e) => {
  const [n, i] = Ke(e, ["value", "class", "appearanceKey", "ref", "onClick", "children"]), o = se(), {
    activeTab: s,
    setActiveTab: c
  } = sw(), f = () => c(n.value);
  return b(at, he({
    variant: "unstyled",
    size: "none",
    ref(d) {
      var v = n.ref;
      typeof v == "function" ? v(d) : n.ref = d;
    },
    get id() {
      return n.value;
    },
    get appearanceKey() {
      var d;
      return (d = n.appearanceKey) != null ? d : "tabsTrigger";
    },
    get class() {
      return o({
        key: n.appearanceKey || "tabsTrigger",
        className: be(cw(), n.class)
      });
    },
    get onClick() {
      var d;
      return (d = n.onClick) != null ? d : f;
    },
    role: "tab",
    tabIndex: 0,
    get "aria-selected"() {
      return s() === n.value;
    },
    get "aria-controls"() {
      return `tabpanel-${n.value}`;
    },
    get "data-state"() {
      return s() === n.value ? "active" : "inactive";
    }
  }, i, {
    get children() {
      return n.children;
    }
  }));
}, Cl = {
  Root: VC,
  List: PC,
  Trigger: IC,
  Content: $C
}, YC = /* @__PURE__ */ Z("<input>"), G0 = R0(be("focus-visible:nt-outline-none focus-visible:nt-ring-2 focus-visible:nt-rounded-md focus-visible:nt-ring-ring focus-visible:nt-ring-offset-2"), {
  variants: {
    variant: {
      default: "nt-border nt-border-neutral-200 nt-rounded-md nt-p-1 nt-bg-background"
    },
    size: {
      default: "nt-h-9",
      sm: "nt-h-8 nt-text-sm",
      xs: "nt-h-7 nt-text-xs"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), u1 = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey"]), o = se();
  return (() => {
    var s = YC();
    return Se(s, he({
      get "data-variant"() {
        return e.variant;
      },
      get "data-size"() {
        return e.size;
      },
      get class() {
        return o({
          key: n.appearanceKey || "input",
          className: be(G0({
            variant: e.variant,
            size: e.size
          }), n.class)
        });
      }
    }, i), !1, !1), s;
  })();
}, ZC = /* @__PURE__ */ Z("<span class=nt-text-sm>"), XC = /* @__PURE__ */ Z("<span><span>"), QC = /* @__PURE__ */ Z("<span>"), FC = Array.from({
  length: 48
}, (e, n) => {
  const i = Math.floor(n / 2), o = n % 2 === 0 ? "00" : "30", s = i < 12 ? "AM" : "PM";
  return `${(i === 0 ? 12 : i > 12 ? i - 12 : i).toString().padStart(2, "0")}:${o} ${s}`;
}), WC = (e) => {
  const n = se();
  return b(dt.Item, {
    get class() {
      return n({
        key: "timeSelect__dropdownItem",
        className: be(uo(), "nt-flex nt-gap-2 nt-justify-between")
      });
    },
    get onClick() {
      return e.onClick;
    },
    get children() {
      return [(() => {
        var i = ZC();
        return K(i, () => e.hour), i;
      })(), b(me, {
        get when() {
          return e.isSelected;
        },
        get children() {
          return b(io, {
            iconKey: "check",
            get class() {
              return n({
                key: "timeSelect__dropdownItemCheck__icon",
                className: "nt-size-2.5 -nt-mt-[2px]",
                iconKey: "check"
              });
            },
            fallback: j0
          });
        }
      })];
    }
  });
}, f1 = (e) => {
  const n = se(), i = oe(() => {
    var s;
    return (s = e.value) == null ? void 0 : s.split(" ")[0];
  }), o = oe(() => {
    var s;
    return i() ? ((s = e.value) == null ? void 0 : s.split(" ")[1]) === "PM" ? "PM" : "AM" : "";
  });
  return b(dt.Root, {
    get children() {
      return [b(dt.Trigger, {
        get disabled() {
          return e.disabled;
        },
        get class() {
          return n({
            key: "timeSelect__dropdownTrigger",
            className: "nt-w-full"
          });
        },
        get children() {
          var s = XC(), c = s.firstChild;
          return K(c, () => {
            var f;
            return (f = i()) != null ? f : "-";
          }), K(s, (() => {
            var f = ft(() => !!o());
            return () => f() && (() => {
              var d = QC();
              return K(d, o), d;
            })();
          })(), null), ue(() => Q(s, n({
            key: "timeSelect__time",
            className: be(G0({
              size: "xs",
              variant: "default"
            }), "nt-min-w-[74px] nt-flex nt-px-2 nt-py-1.5 nt-items-center nt-justify-between nt-w-full nt-text-sm", {
              "nt-justify-center nt-text-neutral-alpha-500": e.disabled || !i()
            })
          }))), s;
        }
      }), b(dt.Content, {
        portal: !0,
        appearanceKey: "timeSelect__dropdownContent",
        class: "-nt-mt-2 nt-rounded-md nt-min-w-[120px] nt-max-w-[120px] nt-max-h-[160px] nt-overflow-y-auto",
        get children() {
          return b(Jn, {
            each: FC,
            children: (s) => b(WC, {
              hour: s,
              get isSelected() {
                return e.value === s;
              },
              onClick: () => {
                var c;
                return (c = e.onChange) == null ? void 0 : c.call(e, s);
              }
            })
          });
        }
      })];
    }
  });
}, JC = {
  unreadRead: "inbox.filters.dropdownOptions.default",
  unread: "inbox.filters.dropdownOptions.unread",
  archived: "inbox.filters.dropdownOptions.archived",
  snoozed: "inbox.filters.dropdownOptions.snoozed"
}, d1 = {
  unreadRead: "inbox.filters.labels.default",
  unread: "inbox.filters.labels.unread",
  archived: "inbox.filters.labels.archived",
  snoozed: "inbox.filters.labels.snoozed"
}, ek = /* @__PURE__ */ Z("<span><span>"), tk = /* @__PURE__ */ Z("<span>"), nk = [{
  status: "unreadRead",
  iconKey: "unread",
  icon: zS
}, {
  status: "unread",
  iconKey: "unread",
  icon: Q2
}, {
  status: "snoozed",
  iconKey: "clock",
  icon: Hl
}, {
  status: "archived",
  iconKey: "markAsArchived",
  icon: $0
}], rk = (e) => {
  const {
    isSnoozeEnabled: n
  } = At(), i = () => nk.filter((o) => o.status !== "snoozed" || n());
  return b(Jn, {
    get each() {
      return i();
    },
    children: (o) => b(ik, {
      get localizationKey() {
        return JC[o.status];
      },
      onClick: () => {
        e.setStatus(o.status);
      },
      get isSelected() {
        return e.status === o.status;
      },
      get icon() {
        return o.icon;
      },
      get iconKey() {
        return o.iconKey;
      }
    })
  });
}, ik = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "inboxStatus__dropdownItemLeft__icon",
    className: "nt-size-3",
    iconKey: e.iconKey
  }), s = n({
    key: "inboxStatus__dropdownItemCheck__icon",
    className: "nt-size-3",
    iconKey: "check"
  });
  return b(dt.Item, {
    get class() {
      return n({
        key: "inboxStatus__dropdownItem",
        className: be(uo(), "nt-flex nt-gap-8 nt-justify-between")
      });
    },
    get onClick() {
      return e.onClick;
    },
    get children() {
      return [(() => {
        var c = ek(), f = c.firstChild;
        return K(c, b(We, {
          get iconKey() {
            return e.iconKey;
          },
          class: o,
          get fallback() {
            return (() => {
              var d = tk();
              return Q(d, o), K(d, () => e.icon()), d;
            })();
          }
        }), f), K(f, () => i(e.localizationKey)), ue((d) => {
          var v = n({
            key: "inboxStatus__dropdownItemLabelContainer",
            className: "nt-flex nt-gap-2 nt-items-center"
          }), g = e.localizationKey, p = n({
            key: "inboxStatus__dropdownItemLabel",
            className: "nt-leading-none"
          });
          return v !== d.e && Q(c, d.e = v), g !== d.t && ct(f, "data-localization", d.t = g), p !== d.a && Q(f, d.a = p), d;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), c;
      })(), b(me, {
        get when() {
          return e.isSelected;
        },
        get children() {
          return b(We, {
            iconKey: "check",
            class: s,
            get fallback() {
              return b(j0, {
                class: s
              });
            }
          });
        }
      })];
    }
  });
}, ak = /* @__PURE__ */ Z("<span>"), ok = () => {
  const e = se(), {
    status: n,
    setStatus: i
  } = At(), {
    t: o
  } = gt(), s = e({
    key: "inboxStatus__dropdownItemRight__icon",
    className: "nt-text-foreground-alpha-600 nt-size-4",
    iconKey: "arrowDropDown"
  });
  return b(dt.Root, {
    get children() {
      return [b(dt.Trigger, {
        get class() {
          return e({
            key: "inboxStatus__dropdownTrigger",
            className: be(rw({
              variant: "unstyled",
              size: "none"
            }), "nt-gap-0.5")
          });
        },
        asChild: (c) => b(at, he({
          variant: "unstyled",
          size: "none"
        }, c, {
          get children() {
            return [(() => {
              var f = ak();
              return K(f, () => o(d1[n()])), ue((d) => {
                var v = d1[n()], g = e({
                  key: "inboxStatus__title",
                  className: "nt-text-base"
                });
                return v !== d.e && ct(f, "data-localization", d.e = v), g !== d.t && Q(f, d.t = g), d;
              }, {
                e: void 0,
                t: void 0
              }), f;
            })(), b(We, {
              iconKey: "arrowDropDown",
              class: s,
              get fallback() {
                return b(Uu, {
                  class: s
                });
              }
            })];
          }
        }))
      }), b(dt.Content, {
        appearanceKey: "inboxStatus__dropdownContent",
        get children() {
          return b(rk, {
            setStatus: i,
            get status() {
              return n();
            }
          });
        }
      })];
    }
  });
}, lk = (e) => {
  const n = An();
  return { archiveAll: (...o) => P(void 0, [...o], function* ({
    tags: s,
    data: c
  } = {}) {
    var f, d;
    try {
      yield n.notifications.archiveAll({ tags: s, data: c }), (f = e?.onSuccess) == null || f.call(e);
    } catch (v) {
      (d = void 0) == null || d.call(e, v);
    }
  }) };
}, sk = (e) => {
  const n = An();
  return { archiveAllRead: (...o) => P(void 0, [...o], function* ({
    tags: s,
    data: c
  } = {}) {
    var f, d;
    try {
      yield n.notifications.archiveAllRead({ tags: s, data: c }), (f = e?.onSuccess) == null || f.call(e);
    } catch (v) {
      (d = void 0) == null || d.call(e, v);
    }
  }) };
}, ck = (e) => {
  const n = An();
  let i = re({}, e.options());
  const [o, { initialLoading: s, setEl: c, end: f, mutate: d, reset: v }] = S8(
    (p) => P(void 0, null, function* () {
      var m, _;
      const { data: w } = yield n.notifications.list(je(re({}, e.options() || {}), { after: p }));
      return { data: (m = w?.notifications) != null ? m : [], hasMore: (_ = w?.hasMore) != null ? _ : !1 };
    }),
    {
      paginationField: "id"
    }
  );
  return qt(() => {
    const p = ({ data: _ }) => {
      !_ || !Gc(i, _.filter) || d({ data: _.notifications, hasMore: _.hasMore });
    }, m = n.on("notifications.list.updated", p);
    $e(() => m());
  }), Ue(() => P(void 0, null, function* () {
    const p = re({}, e.options());
    Gc(i, p) || (n.notifications.clearCache(), yield v(), i = p);
  })), { data: o, initialLoading: s, setEl: c, end: f, refetch: (p) => P(void 0, [p], function* ({ filter: m }) {
    n.notifications.clearCache({ filter: m }), yield v();
  }) };
}, uk = (e) => {
  const n = An(), [i, o] = W(!0), [s, { mutate: c, refetch: f }] = Tb(e || {}, (d) => P(void 0, [d], function* ({ tags: v, severity: g, criticality: p }) {
    try {
      return (yield n.preferences.list({ tags: v, severity: g, criticality: p })).data;
    } catch (m) {
      throw console.error("Error fetching preferences:", m), m;
    }
  }));
  return qt(() => {
    const d = ({ data: g }) => {
      g && c(g);
    }, v = n.on("preferences.list.updated", d);
    $e(() => v());
  }), Ue(() => {
    o(s.loading);
  }), { preferences: s, loading: i, mutate: c, refetch: f };
}, fk = (e) => {
  const n = An();
  return { readAll: (...o) => P(void 0, [...o], function* ({
    tags: s,
    data: c
  } = {}) {
    var f, d;
    try {
      yield n.notifications.readAll({ tags: s, data: c }), (f = e?.onSuccess) == null || f.call(e);
    } catch (v) {
      (d = void 0) == null || d.call(e, v);
    }
  }) };
}, dk = /* @__PURE__ */ Z("<span>"), hk = {
  markAsRead: X2,
  markAsArchived: $0,
  markAsArchivedRead: _S
}, vk = () => {
  const {
    filter: e
  } = At(), {
    readAll: n
  } = fk(), {
    archiveAll: i
  } = lk(), {
    archiveAllRead: o
  } = sk();
  return [b(Sh, {
    localizationKey: "notifications.actions.readAll",
    onClick: () => n({
      tags: e().tags,
      data: e().data
    }),
    iconKey: "markAsRead"
  }), b(Sh, {
    localizationKey: "notifications.actions.archiveAll",
    onClick: () => i({
      tags: e().tags,
      data: e().data
    }),
    iconKey: "markAsArchived"
  }), b(Sh, {
    localizationKey: "notifications.actions.archiveRead",
    onClick: () => o({
      tags: e().tags,
      data: e().data
    }),
    iconKey: "markAsArchivedRead"
  })];
}, Sh = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = hk[e.iconKey], s = n({
    key: "moreActions__dropdownItemLeft__icon",
    className: "nt-size-3",
    iconKey: e.iconKey
  });
  return b(dt.Item, {
    get class() {
      return n({
        key: "moreActions__dropdownItem",
        className: be(uo(), "nt-flex nt-gap-2")
      });
    },
    get onClick() {
      return e.onClick;
    },
    get children() {
      return [b(We, {
        get iconKey() {
          return e.iconKey;
        },
        class: s,
        get fallback() {
          return o && o({
            class: s
          });
        }
      }), (() => {
        var c = dk();
        return K(c, () => i(e.localizationKey)), ue((f) => {
          var d = e.localizationKey, v = n({
            key: "moreActions__dropdownItemLabel",
            className: "nt-leading-none"
          });
          return d !== f.e && ct(c, "data-localization", f.e = d), v !== f.t && Q(c, f.t = v), f;
        }, {
          e: void 0,
          t: void 0
        }), c;
      })()];
    }
  });
}, gk = () => {
  const e = se(), {
    status: n
  } = At(), i = e({
    key: "moreActions__dots",
    className: "nt-size-5",
    iconKey: "dots"
  });
  return b(me, {
    get when() {
      return ft(
        () => n() !== "archived"
        /* ARCHIVED */
      )() && n() !== "snoozed";
    },
    get children() {
      return b(dt.Root, {
        get children() {
          return [b(dt.Trigger, {
            get class() {
              return e({
                key: "moreActions__dropdownTrigger"
              });
            },
            asChild: (o) => b(at, he({
              variant: "ghost",
              size: "iconSm"
            }, o, {
              get children() {
                return b(We, {
                  iconKey: "dots",
                  class: i,
                  get fallback() {
                    return b(pS, {
                      class: i
                    });
                  }
                });
              }
            }))
          }), b(dt.Content, {
            appearanceKey: "moreActions__dropdownContent",
            get children() {
              return b(vk, {});
            }
          })];
        }
      });
    }
  });
}, pk = /* @__PURE__ */ Z("<div>"), mk = (e) => {
  const n = se(), i = n({
    key: "icon",
    className: "nt-size-5",
    iconKey: "cogs"
  });
  return (() => {
    var o = pk();
    return K(o, b(gk, {}), null), K(o, b(me, {
      get when() {
        return e.showPreferences;
      },
      children: (s) => b(at, {
        appearanceKey: "preferences__button",
        variant: "ghost",
        size: "iconSm",
        get onClick() {
          return s();
        },
        get children() {
          return b(We, {
            iconKey: "cogs",
            class: i,
            get fallback() {
              return b(I2, {
                class: i
              });
            }
          });
        }
      })
    }), null), ue(() => Q(o, n({
      key: "moreActionsContainer",
      className: "nt-flex nt-gap-3"
    }))), o;
  })();
}, yk = /* @__PURE__ */ Z("<div>"), bk = (e) => {
  const n = se();
  return (() => {
    var i = yk();
    return K(i, b(ok, {}), null), K(i, b(mk, {
      get showPreferences() {
        return e.navigateToPreferences;
      }
    }), null), ue(() => Q(i, n({
      key: "inboxHeader",
      className: "nt-flex nt-bg-neutral-alpha-25 nt-shrink-0 nt-justify-between nt-items-center nt-w-full nt-pb-2 nt-pt-2.5 nt-px-4"
    }))), i;
  })();
}, uw = /* @__PURE__ */ Z("<div>"), wk = /* @__PURE__ */ Z("<div><div></div><div>"), cu = (e) => {
  const n = se();
  return (() => {
    var i = uw();
    return ue(() => Q(i, n({
      key: e.appearanceKey,
      className: be("nt-w-full nt-h-3 nt-rounded nt-bg-gradient-to-r nt-from-foreground-alpha-50 nt-to-transparent", e.class)
    }))), i;
  })();
}, _k = (e) => {
  const n = se();
  return (() => {
    var i = uw();
    return ue(() => Q(i, n({
      key: e.appearanceKey,
      className: be("nt-size-8 nt-rounded-lg nt-bg-gradient-to-r nt-from-foreground-alpha-50 nt-to-transparent", e.class)
    }))), i;
  })();
}, xk = (e) => {
  const n = se();
  return (() => {
    var i = wk(), o = i.firstChild, s = o.nextSibling;
    return ue((c) => {
      var f = n({
        key: e.appearanceKey,
        className: be("nt-relative nt-inline-flex nt-items-center", e.class)
      }), d = n({
        key: e.appearanceKey,
        className: "nt-h-4 nt-w-7 nt-rounded-full nt-bg-gradient-to-r nt-from-foreground-alpha-50 nt-to-transparent"
      }), v = n({
        key: e.thumbAppearanceKey,
        className: "nt-absolute nt-top-0.5 nt-left-0.5 nt-size-3 nt-rounded-full nt-bg-background nt-shadow"
      });
      return f !== c.e && Q(i, c.e = f), d !== c.t && Q(o, c.t = d), v !== c.a && Q(s, c.a = v), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), i;
  })();
}, Ch = /* @__PURE__ */ Z("<div>"), Sk = [Z2, Y2, W2, F2, P2], P0 = (e) => {
  const n = se(), {
    t: i
  } = gt();
  return (() => {
    var o = Ch();
    return K(o, b(Pi.div, {
      get animate() {
        return {
          scale: e.loading ? 1 : 0.7
        };
      },
      transition: {
        duration: 0.6,
        easing: [0.39, 0.24, 0.3, 1],
        delay: 0.3
      },
      get class() {
        return n({
          key: "preferencesList__skeleton",
          className: "nt-flex nt-relative nt-mx-auto nt-flex-col nt-w-full nt-mb-4"
        });
      },
      get children() {
        return [ft(() => Array.from({
          length: 5
        }).map((s, c) => {
          const f = Sk[c];
          return b(Pi.div, {
            get animate() {
              return {
                marginBottom: e.loading ? 0 : "16px",
                borderWidth: e.loading ? 0 : "1px",
                borderRadius: e.loading ? 0 : "var(--nv-radius-lg)"
              };
            },
            transition: {
              duration: 0.5,
              delay: 0.3,
              easing: "ease-in-out"
            },
            get class() {
              return n({
                key: "preferencesList__skeletonContent",
                className: "nt-flex nt-border-neutral-alpha-50 nt-items-center nt-gap-3 nt-p-3 nt-bg-neutral-alpha-25"
              });
            },
            get children() {
              return [b(f, {
                get class() {
                  return n({
                    key: "preferencesList__skeletonIcon",
                    className: "nt-size-8 nt-p-2 nt-rounded-lg nt-bg-neutral-alpha-100"
                  });
                }
              }), (() => {
                var d = Ch();
                return K(d, b(cu, {
                  appearanceKey: "notificationList__skeletonText",
                  class: "nt-h-2 nt-w-1/3 nt-bg-neutral-alpha-50 nt-rounded"
                }), null), K(d, b(cu, {
                  appearanceKey: "preferencesList__skeletonText",
                  class: "nt-h-2 nt-w-2/3 nt-bg-neutral-alpha-50 nt-rounded"
                }), null), ue(() => Q(d, n({
                  key: "preferencesList__skeletonItem",
                  className: "nt-flex nt-flex-col nt-gap-2 nt-flex-1"
                }))), d;
              })(), b(xk, {
                appearanceKey: "preferencesList__skeletonSwitch",
                thumbAppearanceKey: "preferencesList__skeletonSwitchThumb"
              })];
            }
          });
        })), (() => {
          var s = Ch();
          return ue(() => Q(s, n({
            key: "notificationListEmptyNoticeOverlay",
            className: "nt-absolute nt-size-full nt-z-10 nt-inset-0 nt-bg-gradient-to-b nt-from-transparent nt-to-background"
          }))), s;
        })()];
      }
    }), null), K(o, b(me, {
      get when() {
        return !e.loading;
      },
      get children() {
        return b(Pi.p, {
          initial: {
            opacity: 0,
            y: -4,
            filter: "blur(4px)"
          },
          get animate() {
            return {
              opacity: e.loading ? 0 : 1,
              y: 0,
              filter: "blur(0px)"
            };
          },
          transition: {
            duration: 0.7,
            easing: [0.39, 0.24, 0.3, 1],
            delay: 0.6
          },
          get class() {
            return n({
              key: "preferencesListEmptyNotice",
              className: "nt-text-center"
            });
          },
          "data-localization": "preferences.emptyNotice",
          get children() {
            return i("preferences.emptyNotice");
          }
        });
      }
    }), null), ue(() => Q(o, n({
      key: "preferencesListEmptyNoticeContainer",
      className: "nt-flex nt-flex-col nt-items-center nt-h-fit nt-w-full nt-text-sm nt-text-foreground-alpha-400 nt-text-center"
    }))), o;
  })();
}, Ck = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 14 14"><path fill=currentColor d="M2.8 8.575V5.162a2.362 2.362 0 1 1 4.725 0v3.675a1.313 1.313 0 1 0 2.625 0V5.335a1.575 1.575 0 1 1 1.05 0v3.502a2.362 2.362 0 1 1-4.725 0V5.162a1.312 1.312 0 1 0-2.625 0v3.413h1.575l-2.1 2.625-2.1-2.625H2.8Z"></path><path fill=url(#a) d="M2.8 8.575V5.162a2.362 2.362 0 1 1 4.725 0v3.675a1.313 1.313 0 1 0 2.625 0V5.335a1.575 1.575 0 1 1 1.05 0v3.502a2.362 2.362 0 1 1-4.725 0V5.162a1.312 1.312 0 1 0-2.625 0v3.413h1.575l-2.1 2.625-2.1-2.625H2.8Z"></path><defs><linearGradient id=a x1=1.225 x2=12.251 y1=6.722 y2=6.779 gradientUnits=userSpaceOnUse><stop stop-color=currentColor></stop><stop offset=1 stop-color=currentColor>'), kk = (e) => (() => {
  var n = Ck();
  return Se(n, e, !0, !0), n;
})(), Ak = /* @__PURE__ */ Z("<div><div>"), Ek = () => CSS.supports("interpolate-size", "allow-keywords"), uu = (e) => {
  const n = Ek(), i = se();
  let o;
  const [s, c] = W(!1), [f, d] = W(0), v = () => {
    d(o?.scrollHeight || 0);
  };
  Ue(() => {
    requestAnimationFrame(() => c(!0));
    const p = new ResizeObserver(() => {
      v();
    });
    o && !n && p.observe(o), v(), $e(() => {
      p.disconnect();
    });
  });
  const g = () => n ? e.open ? "max-content" : "0px" : e.open ? `${f()}px` : "0px";
  return (() => {
    var p = Ak(), m = p.firstChild;
    Se(p, he({
      get class() {
        return i({
          key: "collapsible",
          className: e.class
        });
      },
      get style() {
        return {
          overflow: "hidden",
          opacity: e.open ? 1 : 0,
          transition: s() ? "height 250ms ease-in-out, opacity 250ms ease-in-out" : "none",
          height: g()
        };
      }
    }, e), !1, !0);
    var _ = o;
    return typeof _ == "function" ? kn(_, m) : o = m, K(m, () => e.children), p;
  })();
}, Tk = /* @__PURE__ */ Z("<label><input type=checkbox class=nt-sr-only><div>"), Hu = (e) => {
  const n = se(), i = () => {
    var v;
    if (e.disabled) return;
    const g = o((v = e.state) != null ? v : "disabled");
    e.onChange(g);
  }, o = (v) => {
    switch (v) {
      case "enabled":
        return "disabled";
      case "disabled":
        return "enabled";
      case "indeterminate":
        return "enabled";
      default:
        return "disabled";
    }
  }, s = () => e.state === "enabled", c = () => e.state === "indeterminate", f = () => e.state, d = () => e.disabled;
  return (() => {
    var v = Tk(), g = v.firstChild, p = g.nextSibling;
    return g.addEventListener("change", i), ue((m) => {
      var _ = n({
        key: "channelSwitch",
        className: be("nt-relative nt-inline-flex nt-cursor-pointer nt-items-center", {
          "nt-opacity-50 nt-cursor-not-allowed": d()
        })
      }), w = d(), C = n({
        key: "channelSwitchThumb",
        className: be("nt-h-4 nt-w-7 nt-rounded-full nt-bg-neutral-alpha-300 after:nt-absolute after:nt-top-0.5 after:nt-size-3 after:nt-left-0.5 after:nt-rounded-full after:nt-bg-background after:nt-transition-all after:nt-content-[''] nt-transition-all nt-duration-200 after:nt-duration-200 shadow-sm", {
          "nt-bg-primary nt-shadow-none nt-border-neutral-alpha-400 after:nt-translate-x-full after:nt-border-background": s(),
          "after:nt-translate-x-1/2": c()
        })
      }), k = f();
      return _ !== m.e && Q(v, m.e = _), w !== m.t && (g.disabled = m.t = w), C !== m.a && Q(p, m.a = C), k !== m.o && ct(p, "data-state", m.o = k), m;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), ue(() => g.checked = s()), v;
  })();
}, Nk = /* @__PURE__ */ Z("<div><div><div></div><span></span></div><div>"), fw = (e) => {
  const n = se(), i = (f) => P(void 0, null, function* () {
    e.onChange({
      [e.channel.channel]: f
    });
  }), o = (f) => P(void 0, null, function* () {
    yield i(f);
  }), s = () => e.channel.state, c = () => e.channel.channel;
  return (() => {
    var f = Nk(), d = f.firstChild, v = d.firstChild, g = v.nextSibling, p = d.nextSibling;
    return K(v, b(Ok, {
      appearanceKey: "channel__icon",
      get channel() {
        return c();
      },
      class: "nt-size-3",
      get preference() {
        return e.preference;
      },
      get preferenceGroup() {
        return e.preferenceGroup;
      }
    })), K(g, () => dw(c())), K(p, b(Hu, {
      get state() {
        return s();
      },
      onChange: (m) => o(m === "enabled"),
      get disabled() {
        var m, _;
        return (_ = (m = e.preference) == null ? void 0 : m.workflow) == null ? void 0 : _.critical;
      }
    })), ue((m) => {
      var _ = n({
        key: "channelContainer",
        className: "nt-flex nt-justify-between nt-items-center nt-gap-2 data-[disabled=true]:nt-text-foreground-alpha-600",
        context: {
          preference: e.preference,
          preferenceGroup: e.preferenceGroup
        }
      }), w = n({
        key: "channelLabelContainer",
        className: "nt-flex nt-items-center nt-gap-2 nt-text-foreground",
        context: {
          preference: e.preference,
          preferenceGroup: e.preferenceGroup
        }
      }), C = n({
        key: "channelIconContainer",
        className: "nt-p-1 nt-rounded-md nt-bg-neutral-alpha-25 nt-text-foreground-alpha-300",
        context: {
          preference: e.preference,
          preferenceGroup: e.preferenceGroup
        }
      }), k = n({
        key: "channelLabel",
        className: "nt-text-sm nt-font-semibold",
        context: {
          preference: e.preference,
          preferenceGroup: e.preferenceGroup
        }
      }), S = n({
        key: "channelSwitchContainer",
        className: "nt-flex nt-items-center",
        context: {
          preference: e.preference,
          preferenceGroup: e.preferenceGroup
        }
      });
      return _ !== m.e && Q(f, m.e = _), w !== m.t && Q(d, m.t = w), C !== m.a && Q(v, m.a = C), k !== m.o && Q(g, m.o = k), S !== m.i && Q(p, m.i = S), m;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), f;
  })();
}, Ok = (e) => {
  const n = se(), o = {
    in_app: {
      key: "inApp",
      component: b(Z2, {
        get class() {
          return n({
            key: e.appearanceKey,
            className: e.class,
            iconKey: "inApp",
            context: {
              preference: e.preference,
              preferenceGroup: e.preferenceGroup
            }
          });
        }
      })
    },
    email: {
      key: "email",
      component: b(Y2, {
        get class() {
          return n({
            key: e.appearanceKey,
            className: e.class,
            iconKey: "email",
            context: {
              preference: e.preference,
              preferenceGroup: e.preferenceGroup
            }
          });
        }
      })
    },
    push: {
      key: "push",
      component: b(F2, {
        get class() {
          return n({
            key: e.appearanceKey,
            className: e.class,
            iconKey: "push",
            context: {
              preference: e.preference,
              preferenceGroup: e.preferenceGroup
            }
          });
        }
      })
    },
    sms: {
      key: "sms",
      component: b(W2, {
        get class() {
          return n({
            key: e.appearanceKey,
            className: e.class,
            iconKey: "sms",
            context: {
              preference: e.preference,
              preferenceGroup: e.preferenceGroup
            }
          });
        }
      })
    },
    chat: {
      key: "chat",
      component: b(P2, {
        get class() {
          return n({
            key: e.appearanceKey,
            className: e.class,
            iconKey: "chat",
            context: {
              preference: e.preference,
              preferenceGroup: e.preferenceGroup
            }
          });
        }
      })
    }
  }[e.channel];
  return o ? b(We, {
    get iconKey() {
      return o.key;
    },
    get fallback() {
      return o.component;
    },
    get class() {
      return n({
        key: e.appearanceKey,
        className: e.class,
        iconKey: o.key,
        context: {
          preference: e.preference
        }
      });
    }
  }) : null;
}, dw = (e) => {
  switch (e) {
    case "in_app":
      return "In-App";
    case "email":
      return "Email";
    case "push":
      return "Push";
    case "sms":
      return "SMS";
    case "chat":
      return "Chat";
    default:
      return "";
  }
}, hw = /* @__PURE__ */ Z("<div>"), zk = /* @__PURE__ */ Z("<div><div><div><div><span></span></div></div><span>"), Mk = /* @__PURE__ */ Z("<span>"), Dk = {
  cogs: I2,
  routeFill: kk
}, I0 = (e) => {
  const n = se(), [i, o] = W(!1), {
    t: s
  } = gt(), c = oe(() => {
    var d, v;
    return Object.keys((v = (d = e.preference) == null ? void 0 : d.channels) != null ? v : {}).map((g) => {
      var p;
      return {
        channel: g,
        state: (p = e.preference) != null && p.channels[g] ? "enabled" : "disabled"
      };
    });
  }), f = Dk[e.iconKey];
  return b(me, {
    get when() {
      return c().length > 0;
    },
    get children() {
      var d = zk(), v = d.firstChild, g = v.firstChild, p = g.firstChild, m = p.firstChild, _ = g.nextSibling;
      return v.$$click = () => {
        o((w) => !w);
      }, K(p, b(We, {
        get iconKey() {
          return e.iconKey;
        },
        get class() {
          return n({
            key: "workflowLabelIcon",
            className: "nt-text-foreground-alpha-600 nt-size-3.5",
            iconKey: "cogs",
            context: {
              preference: e.preference
            }
          });
        },
        get fallback() {
          return f && f({
            class: n({
              key: "workflowLabelIcon",
              className: "nt-text-foreground-alpha-600 nt-size-3.5",
              iconKey: "cogs",
              context: {
                preference: e.preference
              }
            })
          });
        }
      }), m), K(m, () => {
        var w, C, k;
        return s((k = (C = (w = e.preference) == null ? void 0 : w.workflow) == null ? void 0 : C.identifier) != null ? k : "preferences.global");
      }), K(g, b(uu, {
        get open() {
          return !i();
        },
        get children() {
          return b(Rk, {
            get channels() {
              var w, C;
              return (C = (w = e.preference) == null ? void 0 : w.channels) != null ? C : {};
            },
            appearanceKey: "workflowDescription",
            class: "nt-overflow-hidden",
            get preference() {
              return e.preference;
            }
          });
        }
      }), null), K(_, b(We, {
        iconKey: "arrowDropDown",
        get class() {
          return n({
            key: "workflowArrow__icon",
            className: "nt-text-foreground-alpha-600 nt-size-4",
            iconKey: "arrowDropDown",
            context: {
              preference: e.preference
            }
          });
        },
        get fallback() {
          return b(Uu, {
            get class() {
              return n({
                key: "workflowArrow__icon",
                className: "nt-text-foreground-alpha-600 nt-size-4",
                iconKey: "arrowDropDown",
                context: {
                  preference: e.preference
                }
              });
            }
          });
        }
      })), K(d, b(uu, {
        get open() {
          return i();
        },
        get children() {
          var w = hw();
          return K(w, b(eo, {
            get each() {
              return c();
            },
            children: (C) => b(fw, {
              get channel() {
                return C();
              },
              get workflowId() {
                var k, S;
                return (S = (k = e.preference) == null ? void 0 : k.workflow) == null ? void 0 : S.id;
              },
              get onChange() {
                var k, S;
                return e.onChange((S = (k = e.preference) == null ? void 0 : k.workflow) == null ? void 0 : S.identifier);
              },
              get preference() {
                return e.preference;
              }
            })
          })), ue(() => Q(w, n({
            key: "channelsContainer",
            className: "nt-flex nt-bg-background nt-border nt-border-neutral-alpha-200 nt-rounded-lg nt-p-2 nt-flex-col nt-gap-1 nt-overflow-hidden",
            context: {
              preference: e.preference
            }
          }))), w;
        }
      }), null), ue((w) => {
        var C, k, S, E = n({
          key: "workflowContainer",
          className: "nt-p-1 nt-bg-neutral-alpha-25 nt-rounded-lg nt-border nt-border-neutral-alpha-50",
          context: {
            preference: e.preference
          }
        }), O = i(), A = n({
          key: "workflowLabelContainer",
          className: "nt-flex nt-justify-between nt-p-1 nt-flex-nowrap nt-self-stretch nt-cursor-pointer nt-items-center nt-overflow-hidden",
          context: {
            preference: e.preference
          }
        }), D = n({
          key: "workflowLabelHeader",
          className: "nt-overflow-hidden",
          context: {
            preference: e.preference
          }
        }), L = n({
          key: "workflowLabelHeaderContainer",
          className: "nt-flex nt-items-center nt-gap-1",
          context: {
            preference: e.preference
          }
        }), F = n({
          key: "workflowLabel",
          className: "nt-text-sm nt-font-semibold nt-truncate nt-text-start",
          context: {
            preference: e.preference
          }
        }), Y = (S = (k = (C = e.preference) == null ? void 0 : C.workflow) == null ? void 0 : k.identifier) != null ? S : "preferences.global", ie = i(), X = n({
          key: "workflowContainerRight__icon",
          className: "nt-text-foreground-alpha-600 nt-transition-all nt-duration-200 data-[open=true]:nt-transform data-[open=true]:nt-rotate-180",
          context: {
            preference: e.preference
          }
        }), fe = i();
        return E !== w.e && Q(d, w.e = E), O !== w.t && ct(d, "data-open", w.t = O), A !== w.a && Q(v, w.a = A), D !== w.o && Q(g, w.o = D), L !== w.i && Q(p, w.i = L), F !== w.n && Q(m, w.n = F), Y !== w.s && ct(m, "data-localization", w.s = Y), ie !== w.h && ct(m, "data-open", w.h = ie), X !== w.r && Q(_, w.r = X), fe !== w.d && ct(_, "data-open", w.d = fe), w;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0
      }), d;
    }
  });
}, Rk = (e) => {
  const n = se(), i = () => {
    const o = [];
    for (const s in e.channels)
      if (e.channels[s] !== void 0) {
        const c = !e.channels[s], f = (() => {
          var d = Mk();
          return ct(d, "data-disabled", c), K(d, () => dw(s)), ue(() => Q(d, n({
            key: "channelName",
            className: "data-[disabled=true]:nt-text-foreground-alpha-400",
            context: {
              preference: e.preference
            }
          }))), d;
        })();
        o.push(f);
      }
    return o.map((s, c) => [s, ft(() => c < o.length - 1 && ", ")]);
  };
  return (() => {
    var o = hw();
    return K(o, i), ue(() => Q(o, n({
      key: e.appearanceKey,
      className: be("nt-text-sm nt-text-foreground-alpha-600 nt-text-start", e.class)
    }))), o;
  })();
};
Un(["click"]);
var Lk = (e) => {
  const n = oe(() => e.workflowPreferences), i = (o) => (s) => {
    var c;
    const f = (c = n()) == null ? void 0 : c.find((d) => {
      var v;
      return ((v = d.workflow) == null ? void 0 : v.identifier) === o;
    });
    f && e.updatePreference(f)(s);
  };
  return b(me, {
    get when() {
      var o;
      return (o = n()) == null ? void 0 : o.length;
    },
    get fallback() {
      return b(P0, {
        get loading() {
          return e.loading;
        }
      });
    },
    get children() {
      return b(eo, {
        get each() {
          return n();
        },
        children: (o) => b(I0, {
          iconKey: "routeFill",
          get preference() {
            return o();
          },
          onChange: i
        })
      });
    }
  });
}, Uk = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 16 16"><path fill=currentColor d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10Zm0-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm.5-4.75V9.5H9v1H7v-1h.5V8.25H7v-1h1.5ZM8.75 6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z">'), Y0 = (e) => (() => {
  var n = Uk();
  return Se(n, e, !0, !0), n;
})(), Hk = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 14 14"><path fill=currentColor d="M5.95 1.75c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H4.9v1.05h2.625v-.525c0-.29.235-.525.525-.525h3.15c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H8.05a.525.525 0 0 1-.525-.525V7H4.9v3.15h2.625v-.525c0-.29.235-.525.525-.525h3.15c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H8.05a.525.525 0 0 1-.525-.525V11.2h-3.15a.525.525 0 0 1-.525-.525V4.9H2.8a.525.525 0 0 1-.525-.525v-2.1c0-.29.235-.525.525-.525h3.15Zm4.725 8.4h-2.1v1.05h2.1v-1.05Zm0-4.2h-2.1V7h2.1V5.95ZM5.425 2.8h-2.1v1.05h2.1V2.8Z"></path><path fill=url(#a) d="M5.95 1.75c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H4.9v1.05h2.625v-.525c0-.29.235-.525.525-.525h3.15c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H8.05a.525.525 0 0 1-.525-.525V7H4.9v3.15h2.625v-.525c0-.29.235-.525.525-.525h3.15c.29 0 .525.235.525.525v2.1c0 .29-.235.525-.525.525H8.05a.525.525 0 0 1-.525-.525V11.2h-3.15a.525.525 0 0 1-.525-.525V4.9H2.8a.525.525 0 0 1-.525-.525v-2.1c0-.29.235-.525.525-.525h3.15Zm4.725 8.4h-2.1v1.05h2.1v-1.05Zm0-4.2h-2.1V7h2.1V5.95ZM5.425 2.8h-2.1v1.05h2.1V2.8Z"></path><defs><linearGradient id=a x1=2.275 x2=11.725 y1=6.982 y2=7.018 gradientUnits=userSpaceOnUse><stop stop-color=currentColor></stop><stop offset=1 stop-color=currentColor>'), Bk = (e) => (() => {
  var n = Hk();
  return Se(n, e, !0, !0), n;
})(), Vk = /* @__PURE__ */ Z("<div><div><span data-localization=preferences.group.info></span></div><div>"), jk = /* @__PURE__ */ Z("<div><div><div><span></span></div><div><span>"), $k = (e) => {
  const n = se(), {
    t: i
  } = gt(), [o, s] = W(!1), c = oe(() => e.group.preferences.reduce((m, _) => (Object.keys(_.channels).forEach((w) => {
    const C = w, k = m[C], S = _.channels[C] ? "enabled" : "disabled";
    k ? m[C] = k !== S ? "indeterminate" : S : m[C] = S;
  }), m), {})), f = oe(() => {
    if (Object.values(c()).some((C) => C === "indeterminate"))
      return "indeterminate";
    const _ = Object.values(c()).every((C) => C === "enabled"), w = Object.values(c()).every((C) => C === "disabled");
    return _ ? "enabled" : w ? "disabled" : "indeterminate";
  }), d = (m) => {
    const _ = Object.keys(c()).reduce((w, C) => (w[C] = m === "enabled", w), {});
    e.bulkUpdatePreferences(e.group.preferences)(_);
  }, v = (m) => (_) => {
    const w = e.group.preferences.find((C) => {
      var k;
      return ((k = C.workflow) == null ? void 0 : k.identifier) === m;
    });
    w && e.updatePreference(w)(_);
  }, g = (m) => (_) => {
    const w = e.group.preferences.filter((C) => Object.keys(C.channels).some((k) => k === m));
    e.bulkUpdatePreferences(w)(_);
  }, p = oe(() => e.group.preferences);
  return b(me, {
    get when() {
      return Object.keys(c()).length > 0;
    },
    get children() {
      var m = jk(), _ = m.firstChild, w = _.firstChild, C = w.firstChild, k = w.nextSibling, S = k.firstChild;
      return _.$$click = () => {
        s((E) => !E);
      }, K(w, b(We, {
        iconKey: "nodeTree",
        get class() {
          return n({
            key: "preferencesGroupLabelIcon",
            className: "nt-text-foreground-alpha-600 nt-size-3.5",
            context: {
              preferenceGroup: e.group
            }
          });
        },
        get fallback() {
          return b(Bk, {
            get class() {
              return n({
                key: "preferencesGroupLabelIcon",
                className: "nt-text-foreground-alpha-600 nt-size-3.5",
                context: {
                  preferenceGroup: e.group
                }
              });
            }
          });
        }
      }), C), K(C, () => e.group.name), K(k, b(Hu, {
        get state() {
          return f();
        },
        onChange: d
      }), S), K(S, b(We, {
        iconKey: "arrowDropDown",
        get class() {
          return n({
            key: "moreTabs__icon",
            className: "nt-size-4"
          });
        },
        get fallback() {
          return b(Uu, {
            get class() {
              return n({
                key: "moreTabs__icon",
                className: "nt-size-4"
              });
            }
          });
        }
      })), K(m, b(uu, {
        get open() {
          return o();
        },
        get children() {
          var E = Vk(), O = E.firstChild, A = O.firstChild, D = O.nextSibling;
          return K(O, b(eo, {
            get each() {
              return Object.keys(c());
            },
            children: (L) => b(fw, {
              get channel() {
                return {
                  channel: L(),
                  state: c()[L()]
                };
              },
              get onChange() {
                return g(L());
              },
              get preferenceGroup() {
                return e.group;
              }
            })
          }), A), K(A, b(We, {
            iconKey: "info",
            get class() {
              return n({
                key: "preferencesGroupInfoIcon",
                className: "nt-size-4",
                context: {
                  preferenceGroup: e.group
                }
              });
            },
            get fallback() {
              return b(Y0, {
                get class() {
                  return n({
                    key: "preferencesGroupInfoIcon",
                    className: "nt-size-4",
                    context: {
                      preferenceGroup: e.group
                    }
                  });
                }
              });
            }
          }), null), K(A, () => i("preferences.group.info"), null), K(D, b(eo, {
            get each() {
              return p();
            },
            children: (L) => b(I0, {
              iconKey: "routeFill",
              get preference() {
                return L();
              },
              onChange: v
            })
          })), ue((L) => {
            var F = n({
              key: "preferencesGroupBody",
              className: "nt-flex nt-flex-col nt-gap-1 nt-overflow-hidden",
              context: {
                preferenceGroup: e.group
              }
            }), Y = n({
              key: "preferencesGroupChannels",
              className: "nt-flex nt-bg-background nt-border-t nt-border-b nt-border-neutral-alpha-50 nt-p-2 nt-flex-col nt-gap-1 nt-overflow-hidden",
              context: {
                preferenceGroup: e.group
              }
            }), ie = n({
              key: "preferencesGroupInfo",
              className: "nt-text-sm nt-text-start nt-text-foreground-alpha-400 nt-mt-1 nt-flex nt-items-center nt-gap-1",
              context: {
                preferenceGroup: e.group
              }
            }), X = n({
              key: "preferencesGroupWorkflows",
              className: "nt-flex nt-p-2 nt-flex-col nt-gap-1 nt-overflow-hidden",
              context: {
                preferenceGroup: e.group
              }
            });
            return F !== L.e && Q(E, L.e = F), Y !== L.t && Q(O, L.t = Y), ie !== L.a && Q(A, L.a = ie), X !== L.o && Q(D, L.o = X), L;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), E;
        }
      }), null), ue((E) => {
        var O = n({
          key: "preferencesGroupContainer",
          className: "nt-bg-neutral-alpha-25 nt-rounded-lg nt-border nt-border-neutral-alpha-50",
          context: {
            preferenceGroup: e.group
          }
        }), A = o(), D = n({
          key: "preferencesGroupHeader",
          className: "nt-flex nt-justify-between nt-p-2 nt-flex-nowrap nt-self-stretch nt-cursor-pointer nt-items-center nt-overflow-hidden",
          context: {
            preferenceGroup: e.group
          }
        }), L = n({
          key: "preferencesGroupLabelContainer",
          className: "nt-overflow-hidden nt-flex nt-items-center nt-gap-1",
          context: {
            preferenceGroup: e.group
          }
        }), F = n({
          key: "preferencesGroupLabel",
          className: "nt-text-sm nt-font-semibold nt-truncate nt-text-start",
          context: {
            preferenceGroup: e.group
          }
        }), Y = o(), ie = n({
          key: "preferencesGroupActionsContainer",
          className: "nt-flex nt-items-center nt-gap-1",
          context: {
            preferenceGroup: e.group
          }
        }), X = n({
          key: "preferencesGroupActionsContainerRight__icon",
          className: "nt-text-foreground-alpha-600 nt-transition-all nt-duration-200 data-[open=true]:nt-transform data-[open=true]:nt-rotate-180",
          context: {
            preferenceGroup: e.group
          }
        }), fe = o();
        return O !== E.e && Q(m, E.e = O), A !== E.t && ct(m, "data-open", E.t = A), D !== E.a && Q(_, E.a = D), L !== E.o && Q(w, E.o = L), F !== E.i && Q(C, E.i = F), Y !== E.n && ct(C, "data-open", E.n = Y), ie !== E.s && Q(k, E.s = ie), X !== E.h && Q(S, E.h = X), fe !== E.r && ct(S, "data-open", E.r = fe), E;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0
      }), m;
    }
  });
};
Un(["click"]);
var Kk = (e) => {
  const n = () => e.groups;
  return b(me, {
    get when() {
      return e.groups.length && !e.loading;
    },
    get fallback() {
      return b(P0, {
        get loading() {
          return e.loading;
        }
      });
    },
    get children() {
      return b(eo, {
        get each() {
          return n();
        },
        children: (i) => b($k, {
          get group() {
            return i();
          },
          get bulkUpdatePreferences() {
            return e.bulkUpdatePreferences;
          },
          get updatePreference() {
            return e.updatePreference;
          }
        })
      });
    }
  });
}, Mc = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], qk = /* @__PURE__ */ Z("<span data-localization=preferences.schedule.dayScheduleCopy.title>"), Gk = /* @__PURE__ */ Z("<span data-localization=preferences.schedule.dayScheduleCopy.selectAll>"), Pk = /* @__PURE__ */ Z("<div>"), Ik = /* @__PURE__ */ Z("<span>"), kh = "novu.close-day-schedule-copy-component", Yk = (e) => {
  const n = A0(), i = se(), {
    t: o
  } = gt(), [s, c] = W(!1), [f, d] = W([e.day()]), [v, g] = W(!1), p = oe(() => f().length === Mc.length), m = () => {
    d([e.day()]), g(!1), c(!1);
  }, _ = oe(() => (w) => {
    w && document.dispatchEvent(new CustomEvent(kh, {
      detail: {
        id: n
      }
    })), setTimeout(() => {
      w ? c(w) : m();
    }, 50);
  });
  return Ue(() => {
    const w = (C) => {
      C.detail.id !== n && m();
    };
    return document.addEventListener(kh, w), () => {
      document.removeEventListener(kh, w);
    };
  }), b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        get disabled() {
          return e.disabled;
        },
        asChild: (w) => b(dt.Root, {
          placement: "right",
          offset: 0,
          get open() {
            return s();
          },
          get onOpenChange() {
            return _();
          },
          get children() {
            return [b(dt.Trigger, {
              get disabled() {
                return e.disabled;
              },
              get class() {
                return i({
                  key: "dayScheduleCopy__dropdownTrigger",
                  className: "nt-w-full"
                });
              },
              get children() {
                return b(at, he({
                  size: "iconSm",
                  variant: "ghost"
                }, w, {
                  get children() {
                    return b(io, {
                      iconKey: "copy",
                      get class() {
                        return i({
                          key: "dayScheduleCopyIcon",
                          className: be("nt-text-foreground-alpha-600 nt-size-3.5 group-hover:nt-opacity-100 nt-opacity-0 nt-transition-opacity nt-duration-200", {
                            "group-hover:nt-opacity-0": e.disabled
                          }),
                          context: {
                            schedule: e.schedule()
                          }
                        });
                      },
                      fallback: vS
                    });
                  }
                }));
              }
            }), b(dt.Content, {
              portal: !0,
              appearanceKey: "dayScheduleCopy__dropdownContent",
              class: "nt-rounded-md nt-min-w-[220px] nt-max-w-[220px] nt-p-1",
              get children() {
                return [(() => {
                  var C = qk();
                  return K(C, () => o("preferences.schedule.dayScheduleCopy.title")), ue(() => Q(C, i({
                    key: "dayScheduleCopyTitle",
                    className: "nt-text-sm nt-text-neutral-600  nt-mb-3 nt-text-left",
                    context: {
                      schedule: e.schedule()
                    }
                  }))), C;
                })(), (() => {
                  var C = Gk();
                  return K(C, b(c1, {
                    get checked() {
                      return v() || p();
                    },
                    onChange: (k) => {
                      g(k), d(k ? Mc : [e.day()]);
                    }
                  }), null), K(C, () => o("preferences.schedule.dayScheduleCopy.selectAll"), null), ue(() => Q(C, i({
                    key: "dayScheduleCopySelectAll",
                    className: "nt-flex nt-items-center nt-gap-2 nt-text-sm nt-text-neutral-600 nt-mb-2",
                    context: {
                      schedule: e.schedule()
                    }
                  }))), C;
                })(), b(Jn, {
                  each: Mc,
                  children: (C) => (() => {
                    var k = Ik();
                    return ct(k, "data-localization", `preferences.schedule.${C}`), K(k, b(c1, {
                      value: "checked",
                      onChange: (S) => d(S ? [...f(), C] : f().filter((E) => E !== C)),
                      get checked() {
                        return f().includes(C) || C === e.day();
                      },
                      get disabled() {
                        return C === e.day();
                      }
                    }), null), K(k, () => o(`preferences.schedule.${C}`), null), ue(() => Q(k, i({
                      key: "dayScheduleCopyDay",
                      className: "nt-flex nt-items-center nt-gap-2 nt-text-sm nt-text-neutral-600 nt-mb-2",
                      context: {
                        schedule: e.schedule()
                      }
                    }))), k;
                  })()
                }), (() => {
                  var C = Pk();
                  return K(C, b(at, {
                    onClick: () => {
                      var k, S, E, O;
                      const A = e.day(), D = f().filter((F) => F !== A), L = (S = (k = e.schedule()) == null ? void 0 : k.weeklySchedule) == null ? void 0 : S[A];
                      L && ((O = e.schedule()) == null || O.update({
                        weeklySchedule: re(re({}, (E = e.schedule()) == null ? void 0 : E.weeklySchedule), D.reduce((F, Y) => (F[Y] = L, F), {}))
                      })), m();
                    },
                    "data-localization": "preferences.schedule.dayScheduleCopy.apply",
                    get children() {
                      return o("preferences.schedule.dayScheduleCopy.apply");
                    }
                  })), ue(() => Q(C, i({
                    key: "dayScheduleCopyFooterContainer",
                    className: "nt-flex nt-justify-end nt-border-t nt-border-neutral-alpha-100 nt-pt-2",
                    context: {
                      schedule: e.schedule()
                    }
                  }))), C;
                })()];
              }
            })];
          }
        })
      }), b(He.Content, {
        "data-localization": "preferences.schedule.copyTimesTo",
        get children() {
          return o("preferences.schedule.copyTimesTo");
        }
      })];
    }
  });
}, fo = /* @__PURE__ */ Z("<div>"), Zk = /* @__PURE__ */ Z("<span>"), Xk = (e) => {
  const n = se();
  return (() => {
    var i = fo();
    return K(i, () => e.children), ue(() => Q(i, n({
      key: "scheduleTableHeader",
      className: "nt-flex nt-gap-3",
      context: {
        schedule: e.schedule
      }
    }))), i;
  })();
}, Ah = (e) => {
  const n = se();
  return (() => {
    var i = fo();
    return K(i, () => e.children), ue((o) => {
      var s = n({
        key: "scheduleHeaderColumn",
        className: be("nt-text-sm nt-truncate nt-text-start", e.class),
        context: {
          schedule: e.schedule
        }
      }), c = e.dataLocalization;
      return s !== o.e && Q(i, o.e = s), c !== o.t && ct(i, "data-localization", o.t = c), o;
    }, {
      e: void 0,
      t: void 0
    }), i;
  })();
}, Qk = (e) => {
  const n = se();
  return (() => {
    var i = fo();
    return K(i, () => e.children), ue(() => Q(i, n({
      key: "scheduleTableBody",
      className: "nt-flex nt-flex-col nt-gap-1",
      context: {
        schedule: e.schedule
      }
    }))), i;
  })();
}, Fk = (e) => {
  const n = se();
  return (() => {
    var i = fo();
    return K(i, () => e.children), ue(() => Q(i, n({
      key: "scheduleBodyRow",
      className: "nt-flex nt-gap-3",
      context: {
        schedule: e.schedule
      }
    }))), i;
  })();
}, Eh = (e) => {
  const n = se();
  return (() => {
    var i = fo();
    return K(i, () => e.children), ue(() => Q(i, n({
      key: "scheduleBodyColumn",
      className: be("nt-text-sm", e.class),
      context: {
        schedule: e.schedule
      }
    }))), i;
  })();
}, Wk = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = oe(() => {
    var c, f;
    return !((f = (c = e.globalPreference) == null ? void 0 : c.schedule) != null && f.isEnabled);
  }), s = oe(() => {
    var c;
    return (c = e.globalPreference) == null ? void 0 : c.schedule;
  });
  return (() => {
    var c = fo();
    return K(c, b(Xk, {
      get schedule() {
        return s();
      },
      get children() {
        return [b(Ah, {
          get schedule() {
            return s();
          },
          class: "nt-flex-1",
          dataLocalization: "preferences.schedule.days",
          get children() {
            return i("preferences.schedule.days");
          }
        }), b(Ah, {
          get schedule() {
            return s();
          },
          class: "nt-min-w-[74px]",
          dataLocalization: "preferences.schedule.from",
          get children() {
            return i("preferences.schedule.from");
          }
        }), b(Ah, {
          get schedule() {
            return s();
          },
          class: "nt-min-w-[74px]",
          dataLocalization: "preferences.schedule.to",
          get children() {
            return i("preferences.schedule.to");
          }
        })];
      }
    }), null), K(c, b(Qk, {
      get schedule() {
        return s();
      },
      get children() {
        return b(eo, {
          each: Mc,
          children: (f) => {
            const d = oe(() => {
              var v, g, p;
              return !((p = (g = (v = s()) == null ? void 0 : v.weeklySchedule) == null ? void 0 : g[f()]) != null && p.isEnabled);
            });
            return b(Fk, {
              get schedule() {
                return s();
              },
              get children() {
                return [b(Eh, {
                  get schedule() {
                    return s();
                  },
                  class: "nt-flex-1 nt-flex nt-items-center nt-gap-2",
                  get children() {
                    return [b(Hu, {
                      get state() {
                        return d() ? "disabled" : "enabled";
                      },
                      onChange: (v) => {
                        var g, p, m, _, w, C, k, S, E;
                        const O = v === "enabled", A = ((w = (_ = (m = (p = (g = s()) == null ? void 0 : g.weeklySchedule) == null ? void 0 : p[f()]) == null ? void 0 : m.hours) == null ? void 0 : _.length) != null ? w : 0) === 0;
                        (E = s()) == null || E.update({
                          weeklySchedule: je(re({}, (C = s()) == null ? void 0 : C.weeklySchedule), {
                            [f()]: re(je(re({}, (S = (k = s()) == null ? void 0 : k.weeklySchedule) == null ? void 0 : S[f()]), {
                              isEnabled: O
                            }), A && {
                              hours: [{
                                start: "09:00 AM",
                                end: "05:00 PM"
                              }]
                            })
                          })
                        });
                      },
                      get disabled() {
                        return o();
                      }
                    }), (() => {
                      var v = Zk();
                      return K(v, () => i(`preferences.schedule.${f()}`), null), K(v, b(Yk, {
                        day: f,
                        schedule: s,
                        get disabled() {
                          return o();
                        }
                      }), null), ue((g) => {
                        var p = be("nt-group nt-flex nt-items-center nt-gap-1", {
                          "nt-text-neutral-alpha-500": o()
                        }), m = `preferences.schedule.${f()}`;
                        return p !== g.e && Q(v, g.e = p), m !== g.t && ct(v, "data-localization", g.t = m), g;
                      }, {
                        e: void 0,
                        t: void 0
                      }), v;
                    })()];
                  }
                }), b(Eh, {
                  get schedule() {
                    return s();
                  },
                  get children() {
                    return b(f1, {
                      get disabled() {
                        return o() || d();
                      },
                      get value() {
                        var v, g, p, m, _;
                        return (_ = (m = (p = (g = (v = s()) == null ? void 0 : v.weeklySchedule) == null ? void 0 : g[f()]) == null ? void 0 : p.hours) == null ? void 0 : m[0]) == null ? void 0 : _.start;
                      },
                      onChange: (v) => {
                        var g, p, m, _, w, C, k, S, E;
                        (E = s()) == null || E.update({
                          weeklySchedule: je(re({}, (g = s()) == null ? void 0 : g.weeklySchedule), {
                            [f()]: je(re({}, (m = (p = s()) == null ? void 0 : p.weeklySchedule) == null ? void 0 : m[f()]), {
                              hours: [{
                                start: v,
                                end: (S = (k = (C = (w = (_ = s()) == null ? void 0 : _.weeklySchedule) == null ? void 0 : w[f()]) == null ? void 0 : C.hours) == null ? void 0 : k[0]) == null ? void 0 : S.end
                              }]
                            })
                          })
                        });
                      }
                    });
                  }
                }), b(Eh, {
                  get schedule() {
                    return s();
                  },
                  get children() {
                    return b(f1, {
                      get disabled() {
                        return o() || d();
                      },
                      get value() {
                        var v, g, p, m, _;
                        return (_ = (m = (p = (g = (v = s()) == null ? void 0 : v.weeklySchedule) == null ? void 0 : g[f()]) == null ? void 0 : p.hours) == null ? void 0 : m[0]) == null ? void 0 : _.end;
                      },
                      onChange: (v) => {
                        var g, p, m, _, w, C, k, S, E;
                        (E = s()) == null || E.update({
                          weeklySchedule: je(re({}, (g = s()) == null ? void 0 : g.weeklySchedule), {
                            [f()]: je(re({}, (m = (p = s()) == null ? void 0 : p.weeklySchedule) == null ? void 0 : m[f()]), {
                              hours: [{
                                start: (S = (k = (C = (w = (_ = s()) == null ? void 0 : _.weeklySchedule) == null ? void 0 : w[f()]) == null ? void 0 : C.hours) == null ? void 0 : k[0]) == null ? void 0 : S.start,
                                end: v
                              }]
                            })
                          })
                        });
                      }
                    });
                  }
                })];
              }
            });
          }
        });
      }
    }), null), ue(() => Q(c, n({
      key: "scheduleTable",
      className: "nt-flex nt-flex-col nt-gap-1",
      context: {
        schedule: s()
      }
    }))), c;
  })();
}, Jk = /* @__PURE__ */ Z("<button aria-label=Schedule tabindex=0>"), eA = /* @__PURE__ */ Z("<div class=nt-max-w-56>"), tA = /* @__PURE__ */ Z("<div><span data-localization=preferences.schedule.title>"), nA = /* @__PURE__ */ Z("<div><span>"), rA = /* @__PURE__ */ Z("<div><span data-localization=preferences.schedule.description></span><div><span data-localization=preferences.schedule.info>"), iA = /* @__PURE__ */ Z("<div>"), aA = /* @__PURE__ */ Z('<div class="nt-w-full nt-border-t nt-border-neutral-alpha-100">'), oA = (e) => {
  const n = se();
  return (() => {
    var i = Jk();
    return i.$$click = () => e.setIsOpened((o) => !o), K(i, () => e.children), ue((o) => {
      var s = n({
        key: "scheduleHeader",
        className: "nt-flex nt-w-full nt-p-1 nt-justify-between nt-flex-nowrap nt-self-stretch nt-cursor-pointer nt-items-center nt-overflow-hidden",
        context: {
          schedule: e.schedule()
        }
      }), c = e.isOpened(), f = e.isOpened();
      return s !== o.e && Q(i, o.e = s), c !== o.t && ct(i, "aria-expanded", o.t = c), f !== o.a && ct(i, "data-open", o.a = f), o;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), i;
  })();
}, lA = (e) => {
  const n = se(), {
    t: i
  } = gt();
  return (() => {
    var o = tA(), s = o.firstChild;
    return K(o, b(io, {
      iconKey: "calendarSchedule",
      get class() {
        return n({
          key: "scheduleLabelScheduleIcon",
          className: "nt-text-foreground-alpha-600 nt-size-3.5",
          context: {
            schedule: e.schedule()
          }
        });
      },
      fallback: sS
    }), s), K(s, () => i("preferences.schedule.title")), K(o, b(He.Root, {
      get children() {
        return [b(He.Trigger, {
          get children() {
            return b(io, {
              iconKey: "info",
              get class() {
                return n({
                  key: "scheduleLabelInfoIcon",
                  className: "nt-text-foreground-alpha-600 nt-size-3.5",
                  context: {
                    schedule: e.schedule()
                  }
                });
              },
              fallback: Y0
            });
          }
        }), b(He.Content, {
          "data-localization": "preferences.schedule.headerInfo",
          get children() {
            var c = eA();
            return K(c, () => i("preferences.schedule.headerInfo")), c;
          }
        })];
      }
    }), null), ue((c) => {
      var f = n({
        key: "scheduleLabelContainer",
        className: "nt-overflow-hidden  nt-flex nt-items-center nt-gap-1 nt-h-3.5",
        context: {
          schedule: e.schedule()
        }
      }), d = n({
        key: "scheduleLabel",
        className: "nt-text-sm nt-font-semibold nt-truncate nt-text-start",
        context: {
          schedule: e.schedule()
        }
      }), v = e.isOpened();
      return f !== c.e && Q(o, c.e = f), d !== c.t && Q(s, c.t = d), v !== c.a && ct(s, "data-open", c.a = v), c;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), o;
  })();
}, pl = [{
  start: "09:00 AM",
  end: "05:00 PM"
}], sA = {
  monday: {
    isEnabled: !0,
    hours: pl
  },
  tuesday: {
    isEnabled: !0,
    hours: pl
  },
  wednesday: {
    isEnabled: !0,
    hours: pl
  },
  thursday: {
    isEnabled: !0,
    hours: pl
  },
  friday: {
    isEnabled: !0,
    hours: pl
  }
}, cA = (e) => {
  const n = se();
  return (() => {
    var i = nA(), o = i.firstChild;
    return K(i, b(Hu, {
      get state() {
        var s;
        return (s = e.schedule()) != null && s.isEnabled ? "enabled" : "disabled";
      },
      onChange: (s) => {
        var c, f;
        const d = s === "enabled", v = !((c = e.schedule()) != null && c.weeklySchedule);
        (f = e.schedule()) == null || f.update(re({
          isEnabled: d
        }, d && v && {
          weeklySchedule: sA
        })), e.onChange(d);
      }
    }), o), K(o, b(io, {
      iconKey: "arrowDropDown",
      get class() {
        return n({
          key: "moreTabs__icon",
          className: "nt-size-4"
        });
      },
      fallback: Uu
    })), ue((s) => {
      var c = n({
        key: "scheduleActionsContainer",
        className: "nt-flex nt-items-center nt-gap-1",
        context: {
          schedule: e.schedule()
        }
      }), f = n({
        key: "scheduleActionsContainerRight",
        className: "nt-text-foreground-alpha-600 nt-transition-all nt-duration-200 data-[open=true]:nt-transform data-[open=true]:nt-rotate-180",
        context: {
          schedule: e.schedule()
        }
      }), d = e.isOpened();
      return c !== s.e && Q(i, s.e = c), f !== s.t && Q(o, s.t = f), d !== s.a && ct(o, "data-open", s.a = d), s;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), i;
  })();
}, uA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = oe(() => {
    var s;
    return (s = e.globalPreference) == null ? void 0 : s.schedule;
  });
  return (() => {
    var s = rA(), c = s.firstChild, f = c.nextSibling, d = f.firstChild;
    return K(c, () => i("preferences.schedule.description")), K(s, b(Wk, {
      get globalPreference() {
        return e.globalPreference;
      }
    }), f), K(f, b(io, {
      iconKey: "info",
      get class() {
        return n({
          key: "scheduleInfoIcon",
          className: "nt-size-4",
          context: {
            schedule: o()
          }
        });
      },
      fallback: Y0
    }), d), K(d, () => i("preferences.schedule.info")), ue((v) => {
      var g = n({
        key: "scheduleBody",
        className: "nt-flex nt-bg-background nt-border nt-border-neutral-alpha-200 nt-rounded-lg nt-p-2 nt-flex-col nt-gap-2 nt-overflow-hidden",
        context: {
          schedule: o()
        }
      }), p = n({
        key: "scheduleDescription",
        className: "nt-text-sm nt-truncate nt-text-start",
        context: {
          schedule: o()
        }
      }), m = n({
        key: "scheduleInfoContainer",
        className: "nt-flex nt-items-start nt-mt-1.5 nt-gap-1",
        context: {
          schedule: o()
        }
      }), _ = n({
        key: "scheduleInfo",
        className: "nt-text-sm nt-text-start"
      });
      return g !== v.e && Q(s, v.e = g), p !== v.t && Q(c, v.t = p), m !== v.a && Q(f, v.a = m), _ !== v.o && Q(d, v.o = _), v;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), s;
  })();
}, fA = (e) => {
  var n, i, o;
  const s = se(), c = oe(() => {
    var v;
    return (v = e.globalPreference) == null ? void 0 : v.schedule;
  }), [f, d] = W((o = (i = (n = e.globalPreference) == null ? void 0 : n.schedule) == null ? void 0 : i.isEnabled) != null ? o : !1);
  return [(() => {
    var v = iA();
    return K(v, b(oA, {
      schedule: c,
      isOpened: f,
      setIsOpened: d,
      get children() {
        return [b(lA, {
          schedule: c,
          isOpened: f
        }), b(cA, {
          schedule: c,
          isOpened: f,
          onChange: d
        })];
      }
    }), null), K(v, b(uu, {
      get open() {
        return f();
      },
      get children() {
        return b(uA, {
          get globalPreference() {
            return e.globalPreference;
          },
          isOpened: f
        });
      }
    }), null), ue(() => Q(v, s({
      key: "scheduleContainer",
      className: "nt-p-1 nt-bg-neutral-alpha-25 nt-rounded-lg nt-border nt-border-neutral-alpha-50",
      context: {
        schedule: c()
      }
    }))), v;
  })(), aA()];
};
Un(["click"]);
var dA = /* @__PURE__ */ Z("<div>"), hA = () => {
  var e, n, i;
  const o = An(), s = se(), {
    preferencesFilter: c,
    preferenceGroups: f,
    preferencesSort: d
  } = At(), {
    preferences: v,
    loading: g
  } = uk({
    tags: (e = c()) == null ? void 0 : e.tags,
    severity: (n = c()) == null ? void 0 : n.severity,
    criticality: (i = c()) == null ? void 0 : i.criticality
  }), p = oe(() => {
    var C, k;
    const S = (C = v()) == null ? void 0 : C.find(
      (O) => O.level === "global"
      /* GLOBAL */
    );
    let E = (k = v()) == null ? void 0 : k.filter(
      (O) => O.level === "template"
      /* TEMPLATE */
    );
    return E && d() && (E = [...E].sort(d())), {
      globalPreference: S,
      workflowPreferences: E
    };
  });
  Ue(() => {
    b8((C) => {
      var k;
      return re(re({}, C), (k = p().workflowPreferences) == null ? void 0 : k.reduce((S, E) => {
        var O, A;
        return (O = E.workflow) != null && O.identifier && ((A = E.workflow) != null && A.name) && (S[E.workflow.identifier] = E.workflow.name), S;
      }, {}));
    });
  });
  const m = (C) => (k) => P(void 0, null, function* () {
    yield C?.update({
      channels: k
    });
  }), _ = (C) => (k) => P(void 0, null, function* () {
    yield o.preferences.bulkUpdate(C.map((S) => {
      const E = Object.keys(S.channels), O = Object.keys(k).filter((A) => E.includes(A)).reduce((A, D) => (A[D] = k[D], A), {});
      return {
        preference: S,
        channels: O
      };
    }));
  }), w = oe(() => {
    var C, k, S;
    const E = (C = p().workflowPreferences) != null ? C : [];
    return (S = (k = f()) == null ? void 0 : k.map((O) => {
      const {
        filter: A
      } = O;
      if (typeof A == "function") {
        const D = A({
          preferences: E
        });
        return {
          name: O.name,
          preferences: D
        };
      }
      if (typeof A == "object") {
        let D = E.filter((L) => {
          var F, Y, ie, X, fe;
          const le = ((F = L.workflow) == null ? void 0 : F.id) || ((Y = L.workflow) == null ? void 0 : Y.identifier);
          return ((ie = A.workflowIds) == null ? void 0 : ie.includes(le ?? "")) || ((X = A.tags) == null ? void 0 : X.some((ee) => {
            var we, Ee;
            return (Ee = (we = L.workflow) == null ? void 0 : we.tags) == null ? void 0 : Ee.includes(ee);
          })) || Array.isArray(A.severity) && A.severity.some((ee) => {
            var we;
            return ((we = L.workflow) == null ? void 0 : we.severity) === ee;
          }) || !Array.isArray(A.severity) && A.severity === ((fe = L.workflow) == null ? void 0 : fe.severity);
        });
        return d() && (D = [...D].sort(d())), {
          name: O.name,
          preferences: D
        };
      }
      return {
        name: O.name,
        preferences: []
      };
    })) != null ? S : [];
  });
  return (() => {
    var C = dA();
    return K(C, b(me, {
      get when() {
        return p().globalPreference;
      },
      get children() {
        return b(I0, {
          iconKey: "cogs",
          get preference() {
            return p().globalPreference;
          },
          onChange: () => m(p().globalPreference)
        });
      }
    }), null), K(C, b(me, {
      get when() {
        return p().globalPreference;
      },
      get children() {
        return b(fA, {
          get globalPreference() {
            return p().globalPreference;
          }
        });
      }
    }), null), K(C, b(me, {
      get when() {
        return w().length > 0;
      },
      get fallback() {
        return b(me, {
          get when() {
            var k;
            return (k = p().workflowPreferences) == null ? void 0 : k.length;
          },
          get fallback() {
            return b(P0, {
              get loading() {
                return g();
              }
            });
          },
          get children() {
            return b(Lk, {
              get workflowPreferences() {
                return p().workflowPreferences;
              },
              get loading() {
                return g();
              },
              updatePreference: m
            });
          }
        });
      },
      get children() {
        return b(Kk, {
          get groups() {
            return w();
          },
          get loading() {
            return g();
          },
          updatePreference: m,
          bulkUpdatePreferences: _
        });
      }
    }), null), ue(() => Q(C, s({
      key: "preferencesContainer",
      className: "nt-px-3 nt-py-4 nt-flex nt-flex-col nt-gap-2 nt-overflow-y-auto nt-h-full nt-pr-0 [scrollbar-gutter:stable]",
      context: {
        preferences: v(),
        groups: w()
      }
    }))), C;
  })();
}, vA = /* @__PURE__ */ Z("<div>"), vw = (e) => {
  const [n, i] = Ke(e, ["class"]), {
    id: o
  } = rr(), s = se(), {
    hideBranding: c
  } = At();
  return [b(me, {
    get when() {
      return !c();
    },
    children: new Comment(" Powered by Novu - https://novu.co ")
  }), (() => {
    var f = vA();
    return Se(f, he({
      get id() {
        return `novu-root-${o()}`;
      },
      get class() {
        return s({
          key: "root",
          className: be("novu", o(), "nt-text-foreground nt-h-full [interpolate-size:allow-keywords]")
        });
      }
    }, i), !1, !1), f;
  })()];
}, gA = /* @__PURE__ */ Z("<div><div data-localization=preferences.title>"), pA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "preferencesHeader__back__button__icon",
    className: "nt-size-4",
    iconKey: "arrowLeft"
  });
  return (() => {
    var s = gA(), c = s.firstChild;
    return K(s, b(me, {
      get when() {
        return e.navigateToNotifications;
      },
      children: (f) => b(at, {
        appearanceKey: "preferencesHeader__back__button",
        class: "nt-text-foreground-alpha-600",
        variant: "unstyled",
        size: "none",
        get onClick() {
          return f();
        },
        get children() {
          return b(We, {
            iconKey: "arrowLeft",
            class: o,
            get fallback() {
              return b(q2, {
                class: o
              });
            }
          });
        }
      })
    }), c), K(c, () => i("preferences.title")), ue((f) => {
      var d = n({
        key: "preferencesHeader",
        className: "nt-flex nt-bg-neutral-alpha-25 nt-shrink-0 nt-border-b nt-border-border nt-items-center nt-py-3.5 nt-px-4 nt-gap-2"
      }), v = n({
        key: "preferencesHeader__title",
        className: "nt-text-base nt-font-medium"
      });
      return d !== f.e && Q(s, f.e = d), v !== f.t && Q(c, f.t = v), f;
    }, {
      e: void 0,
      t: void 0
    }), s;
  })();
}, mA = /* @__PURE__ */ Z("<strong>"), yA = /* @__PURE__ */ Z("<p>"), bA = (e) => {
  const n = se();
  return (() => {
    var i = mA();
    return K(i, () => e.children), ue(() => Q(i, n({
      key: e.appearanceKey || "strong",
      className: "nt-font-semibold"
    }))), i;
  })();
}, wA = (e) => e.children, _A = (e) => {
  const [n, i] = Ke(e, ["class", "children", "appearanceKey", "strongAppearanceKey", "context"]), o = se(), s = oe(() => L_(n.children));
  return (() => {
    var c = yA();
    return Se(c, he({
      get class() {
        return o({
          key: n.appearanceKey,
          className: be(n.class),
          context: n.context
        });
      }
    }, i), !1, !0), K(c, b(Jn, {
      get each() {
        return s();
      },
      children: (f) => f.type === "bold" ? b(bA, {
        get appearanceKey() {
          return n.strongAppearanceKey;
        },
        get children() {
          return f.content;
        }
      }) : b(wA, {
        get children() {
          return f.content;
        }
      })
    })), c;
  })();
}, h1 = _A, xA = /* @__PURE__ */ Z("<span>"), SA = R0(be("nt-inline-flex nt-flex-row nt-gap-1 nt-items-center"), {
  variants: {
    variant: {
      secondary: "nt-bg-neutral-alpha-50"
    },
    size: {
      default: "nt-px-1 nt-py-px nt-rounded-sm nt-text-xs nt-px-1"
    }
  },
  defaultVariants: {
    variant: "secondary",
    size: "default"
  }
}), CA = (e) => {
  const [n, i] = Ke(e, ["class", "appearanceKey", "context"]), o = se();
  return (() => {
    var s = xA();
    return Se(s, he({
      get "data-variant"() {
        return e.variant;
      },
      get "data-size"() {
        return e.size;
      },
      get class() {
        return o({
          key: n.appearanceKey || "badge",
          className: be(SA({
            variant: e.variant,
            size: e.size
          }), n.class),
          context: n.context
        });
      }
    }, i), !1, !1), s;
  })();
}, kA = /* @__PURE__ */ Z("<div><span>:</span><select><option value=AM>AM</option><option value=PM>PM"), AA = (e) => {
  const [n, i] = Ke(e, ["value", "onChange", "class", "appearanceKey"]), o = se(), s = n.value || {
    hour: 12,
    minute: 0,
    isPM: !0
  }, [c, f] = W(s.hour), [d, v] = W(s.minute), [g, p] = W(s.isPM), m = () => {
    n.onChange && n.onChange({
      hour: c(),
      minute: d(),
      isPM: g()
    });
  }, _ = (S) => {
    f(S), m();
  }, w = (S) => {
    v(S), m();
  }, C = (S) => {
    p(S), m();
  }, k = (S) => {
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Backspace", "Delete", "Tab"].includes(S.key) || S.preventDefault();
  };
  return (() => {
    var S = kA(), E = S.firstChild, O = E.nextSibling;
    return S.$$click = (A) => A.stopPropagation(), Se(S, he({
      get class() {
        return o({
          key: n.appearanceKey || "timePicker",
          className: be("nt-flex nt-items-center nt-gap-1", n.class)
        });
      }
    }, i), !1, !0), K(S, b(u1, {
      size: "sm",
      type: "number",
      min: "1",
      max: "12",
      onKeyDown: (A) => {
        A.stopPropagation(), k(A);
      },
      get value() {
        return c().toString();
      },
      onInput: (A) => {
        A.stopPropagation(), v1(A.currentTarget), _(Number(A.currentTarget.value));
      },
      get class() {
        return o({
          key: "timePickerHour__input",
          className: "nt-flex nt-font-mono nt-justify-center nt-items-center nt-text-center nt-h-7 nt-w-[calc(2ch+2rem)] nt-px-2"
        });
      }
    }), E), K(S, b(u1, {
      size: "sm",
      type: "number",
      min: "0",
      max: "59",
      onKeyDown: (A) => {
        A.stopPropagation(), k(A);
      },
      get value() {
        return d().toString().padStart(2, "0");
      },
      onInput: (A) => {
        A.stopPropagation(), v1(A.currentTarget), w(Number(A.currentTarget.value));
      },
      get class() {
        return o({
          key: "timePickerHour__input",
          className: "nt-flex nt-font-mono nt-justify-center nt-items-center nt-text-center nt-h-7 nt-w-[calc(2ch+2rem)] nt-px-2"
        });
      }
    }), O), O.addEventListener("change", (A) => {
      A.stopPropagation(), C(A.target.value === "PM");
    }), O.$$click = (A) => A.stopPropagation(), ue((A) => {
      var D = o({
        key: "timePicker__separator",
        className: "nt-text-xl"
      }), L = o({
        key: "timePicker__periodSelect",
        className: be(G0({
          size: "sm"
        }), "nt-h-7 nt-font-mono")
      });
      return D !== A.e && Q(E, A.e = D), L !== A.t && Q(O, A.t = L), A;
    }, {
      e: void 0,
      t: void 0
    }), ue(() => O.value = g() ? "PM" : "AM"), S;
  })();
}, v1 = (e) => {
  if (e.value !== "") {
    const n = parseInt(e.value, 10), i = parseInt(e.min, 10), o = parseInt(e.max, 10);
    if (n < i || n > o) {
      e.value = e.value.slice(0, -1);
      const s = parseInt(e.value, 10);
      Number.isNaN(s) || s < i ? e.value = e.min : s > o && (e.value = e.max);
    }
  }
};
Un(["click"]);
var EA = /* @__PURE__ */ Z("<div><div><p></p></div><div>"), TA = () => {
  const e = new Date(Date.now() + 3e5), n = e.getHours(), i = n >= 12;
  let o;
  return n === 0 || n === 12 ? o = 12 : o = n % 12, {
    hour: o,
    minute: e.getMinutes(),
    isPM: i
  };
}, g1 = (e) => e.isPM ? e.hour === 12 ? 12 : e.hour + 12 : e.hour === 12 ? 0 : e.hour, NA = 5e3, OA = (e) => {
  const n = se(), {
    t: i
  } = gt(), [o, s] = W(null), [c, f] = W(TA()), [d, v] = W(/* @__PURE__ */ new Date());
  Ue(() => {
    const S = setInterval(() => {
      v(/* @__PURE__ */ new Date());
    }, NA);
    $e(() => clearInterval(S));
  });
  const g = () => {
    var S;
    if (o() && c()) {
      const E = new Date(o()), O = g1(c());
      E.setHours(O, c().minute, 0, 0), (S = e.onSelect) == null || S.call(e, E);
    }
  }, p = () => e.maxDurationHours ? Math.ceil(e.maxDurationHours / 24) : 0, m = () => {
    if (!o() || !c()) return null;
    const S = new Date(o()), E = g1(c());
    return S.setHours(E, c().minute, 0, 0), S;
  }, _ = oe(() => {
    const S = m();
    if (!S) return !1;
    const E = new Date(d().getTime() + 180 * 1e3);
    return S < E;
  }), w = oe(() => {
    const S = m();
    if (!S || !e.maxDurationHours) return !1;
    const E = new Date(d().getTime() + e.maxDurationHours * 60 * 60 * 1e3);
    return S > E;
  }), C = oe(() => !(!o() || !c() || _() || e.maxDurationHours && w())), k = oe(() => _() ? i("snooze.datePicker.pastDateTooltip") : w() ? i("snooze.datePicker.exceedingLimitTooltip", {
    days: p()
  }) : i("snooze.datePicker.noDateSelectedTooltip"));
  return (() => {
    var S = EA(), E = S.firstChild, O = E.firstChild, A = E.nextSibling;
    return S.$$click = (D) => D.stopPropagation(), K(S, b(vC, {
      onDateChange: (D) => s(D),
      get maxDays() {
        return p();
      },
      get children() {
        return [b(gC, {}), b(mC, {})];
      }
    }), E), K(O, () => i("snooze.datePicker.timePickerLabel")), K(E, b(AA, {
      get value() {
        return c();
      },
      onChange: f
    }), null), K(A, b(at, {
      appearanceKey: "snoozeDatePickerCancel__button",
      variant: "secondary",
      class: "nt-h-7 nt-w-[60px] nt-px-2",
      get onClick() {
        return e.onCancel;
      },
      get children() {
        return i("snooze.datePicker.cancel");
      }
    }), null), K(A, b(me, {
      get when() {
        return C();
      },
      get fallback() {
        return b(He.Root, {
          get children() {
            return [b(He.Trigger, {
              asChild: (D) => b(at, he({
                appearanceKey: "snoozeDatePickerApply__button",
                class: "nt-h-7 nt-w-[60px] nt-px-2 !nt-pointer-events-auto",
                onClick: g,
                disabled: !0
              }, D, {
                get children() {
                  return i("snooze.datePicker.apply");
                }
              }))
            }), b(He.Content, {
              get children() {
                return k();
              }
            })];
          }
        });
      },
      get children() {
        return b(at, {
          appearanceKey: "snoozeDatePickerApply__button",
          class: "nt-h-7 nt-w-[60px] nt-px-2",
          onClick: g,
          get children() {
            return i("snooze.datePicker.apply");
          }
        });
      }
    }), null), ue((D) => {
      var L = n({
        key: "snoozeDatePicker",
        className: "nt-bg-background nt-rounded-md nt-shadow-lg nt-w-[260px]"
      }), F = n({
        key: "snoozeDatePicker__timePickerContainer",
        className: "nt-flex nt-flex-row nt-justify-between nt-p-2 nt-items-center nt-border-t nt-border-neutral-200 nt-border-b"
      }), Y = n({
        key: "snoozeDatePicker__timePickerLabel",
        className: "nt-text-sm nt-font-medium nt-text-foreground-alpha-700 nt-p-2"
      }), ie = n({
        key: "snoozeDatePicker__actions",
        className: "nt-flex nt-flex-row nt-justify-end nt-gap-2 nt-p-2"
      });
      return L !== D.e && Q(S, D.e = L), F !== D.t && Q(E, D.t = F), Y !== D.a && Q(O, D.a = Y), ie !== D.o && Q(A, D.o = ie), D;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), S;
  })();
};
Un(["click"]);
var zA = /* @__PURE__ */ Z("<div><span>"), MA = /* @__PURE__ */ Z("<span>"), p1 = [{
  key: "snooze.options.anHourFromNow",
  hours: 1,
  getDate: () => new Date(Date.now() + 3600 * 1e3)
}, {
  key: "snooze.options.inOneDay",
  hours: 24,
  getDate: () => {
    const e = new Date(Date.now() + 864e5);
    return e.setHours(9, 0, 0, 0), e;
  }
}, {
  key: "snooze.options.inOneWeek",
  hours: 168,
  getDate: () => {
    const e = new Date(Date.now() + 6048e5);
    return e.setHours(9, 0, 0, 0), e;
  }
}], DA = (e, n, i) => {
  const o = e.getDate(), s = new Intl.DateTimeFormat(i, {
    weekday: "short"
  }).format(o), c = new Intl.DateTimeFormat(i, {
    day: "numeric",
    month: "short"
  }).format(o), f = new Intl.DateTimeFormat(i, {
    hour: "numeric",
    minute: "numeric"
  }).format(o);
  return {
    label: n(e.key),
    time: `${s}, ${c}, ${f}`
  };
}, m1 = (e) => {
  const n = se(), i = n({
    key: "notificationSnooze__dropdownItem__icon",
    className: "nt-size-3 nt-text-foreground-alpha-400 nt-mr-2",
    iconKey: "clock"
  }), o = [(() => {
    var s = zA(), c = s.firstChild;
    return K(s, b(We, {
      iconKey: "clock",
      class: i,
      get fallback() {
        return b(Hl, {
          class: i
        });
      }
    }), c), K(c, () => e.label), ue((f) => {
      var d = n({
        key: "dropdownItem",
        className: "nt-flex nt-items-center nt-flex-1"
      }), v = n({
        key: "dropdownItemLabel"
      });
      return d !== f.e && Q(s, f.e = d), v !== f.t && Q(c, f.t = v), f;
    }, {
      e: void 0,
      t: void 0
    }), s;
  })(), (() => {
    var s = MA();
    return K(s, () => e.time), ue(() => Q(s, n({
      key: "dropdownItemRight__icon",
      className: "nt-text-foreground-alpha-300 nt-ml-2 nt-text-xs"
    }))), s;
  })()];
  return e.asChild ? e.asChild({
    class: n({
      key: "notificationSnooze__dropdownItem",
      className: uo()
    }),
    onClick: e.onClick,
    children: o
  }) : b(dt.Item, {
    appearanceKey: "notificationSnooze__dropdownItem",
    get onClick() {
      return e.onClick;
    },
    get class() {
      return n({
        key: "dropdownItem",
        className: "nt-justify-between"
      });
    },
    children: o
  });
}, RA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "notificationRead__icon",
    className: "nt-size-3",
    iconKey: "markAsRead"
  });
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (s) => b(at, he({
          appearanceKey: "notificationRead__button",
          size: "iconSm",
          variant: "ghost"
        }, s, {
          onClick: (c) => P(this, null, function* () {
            c.stopPropagation(), yield e.notification.read();
          }),
          get children() {
            return b(We, {
              iconKey: "markAsRead",
              class: o,
              get fallback() {
                return b(X2, {
                  class: o
                });
              }
            });
          }
        }))
      }), b(He.Content, {
        "data-localization": "notification.actions.read.tooltip",
        get children() {
          return i("notification.actions.read.tooltip");
        }
      })];
    }
  });
}, LA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "notificationUnread__icon",
    className: "nt-size-3",
    iconKey: "markAsUnread"
  });
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (s) => b(at, he({
          appearanceKey: "notificationUnread__button",
          size: "iconSm",
          variant: "ghost"
        }, s, {
          onClick: (c) => P(this, null, function* () {
            c.stopPropagation(), yield e.notification.unread();
          }),
          get children() {
            return b(We, {
              iconKey: "markAsUnread",
              class: o,
              get fallback() {
                return b(Q2, {
                  class: o
                });
              }
            });
          }
        }))
      }), b(He.Content, {
        "data-localization": "notification.actions.unread.tooltip",
        get children() {
          return i("notification.actions.unread.tooltip");
        }
      })];
    }
  });
}, UA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "notificationArchive__icon",
    className: "nt-size-3",
    iconKey: "markAsArchived"
  });
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (s) => b(at, he({
          appearanceKey: "notificationArchive__button",
          size: "iconSm",
          variant: "ghost"
        }, s, {
          onClick: (c) => P(this, null, function* () {
            c.stopPropagation(), yield e.notification.archive();
          }),
          get children() {
            return b(We, {
              iconKey: "markAsArchived",
              class: o,
              get fallback() {
                return b($0, {
                  class: o
                });
              }
            });
          }
        }))
      }), b(He.Content, {
        "data-localization": "notification.actions.archive.tooltip",
        get children() {
          return i("notification.actions.archive.tooltip");
        }
      })];
    }
  });
}, HA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "notificationArchive__icon",
    className: "nt-size-3",
    iconKey: "markAsUnarchived"
  });
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (s) => b(at, he({
          appearanceKey: "notificationUnarchive__button",
          size: "iconSm",
          variant: "ghost"
        }, s, {
          onClick: (c) => P(this, null, function* () {
            c.stopPropagation(), yield e.notification.unarchive();
          }),
          get children() {
            return b(We, {
              iconKey: "markAsUnarchived",
              class: o,
              get fallback() {
                return b(CS, {
                  class: o
                });
              }
            });
          }
        }))
      }), b(He.Content, {
        "data-localization": "notification.actions.unarchive.tooltip",
        get children() {
          return i("notification.actions.unarchive.tooltip");
        }
      })];
    }
  });
}, BA = (e) => {
  const n = se(), {
    t: i
  } = gt(), o = n({
    key: "notificationUnsnooze__icon",
    className: "nt-size-3",
    iconKey: "unsnooze"
  });
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (s) => b(at, he({
          appearanceKey: "notificationUnsnooze__button",
          size: "iconSm",
          variant: "ghost"
        }, s, {
          onClick: (c) => P(this, null, function* () {
            c.stopPropagation(), yield e.notification.unsnooze();
          }),
          get children() {
            return b(We, {
              iconKey: "unsnooze",
              class: o,
              get fallback() {
                return b(DS, {
                  class: o
                });
              }
            });
          }
        }))
      }), b(He.Content, {
        "data-localization": "notification.actions.unsnooze.tooltip",
        get children() {
          return i("notification.actions.unsnooze.tooltip");
        }
      })];
    }
  });
}, VA = (e) => {
  const n = se(), {
    t: i,
    locale: o
  } = gt(), {
    maxSnoozeDurationHours: s
  } = At(), [c, f] = W(!1), d = n({
    key: "notificationSnooze__icon",
    className: "nt-size-3",
    iconKey: "clock"
  }), v = oe(() => s() ? p1.filter((g) => g.hours <= s()) : p1);
  return b(He.Root, {
    get children() {
      return [b(He.Trigger, {
        asChild: (g) => b(dt.Root, {
          get children() {
            return [b(dt.Trigger, he(g, {
              asChild: (p) => b(at, he({
                appearanceKey: "notificationSnooze__button",
                size: "iconSm",
                variant: "ghost"
              }, p, {
                onClick: (m) => {
                  var _;
                  m.stopPropagation(), (_ = p.onClick) == null || _.call(p, m);
                },
                get children() {
                  return b(We, {
                    iconKey: "clock",
                    class: d,
                    get fallback() {
                      return b(Hl, {
                        class: d
                      });
                    }
                  });
                }
              }))
            })), b(dt.Content, {
              portal: !0,
              appearanceKey: "notificationSnooze__dropdownContent",
              get children() {
                return [b(Jn, {
                  get each() {
                    return v();
                  },
                  children: (p) => {
                    const m = DA(p, i, o());
                    return b(m1, {
                      get label() {
                        return m.label;
                      },
                      get time() {
                        return m.time;
                      },
                      onClick: (_) => P(this, null, function* () {
                        _.stopPropagation(), yield e.notification.snooze(p.getDate().toISOString());
                      })
                    });
                  }
                }), b(Fn.Root, {
                  get open() {
                    return c();
                  },
                  onOpenChange: f,
                  placement: "bottom-start",
                  get children() {
                    return [b(m1, {
                      get label() {
                        return i("snooze.options.customTime");
                      },
                      time: "",
                      asChild: (p) => b(Fn.Trigger, he(p, {
                        onClick: (m) => {
                          var _;
                          m.stopPropagation(), (_ = p.onClick) == null || _.call(p, m);
                        }
                      }))
                    }), b(Fn.Content, {
                      portal: !0,
                      get class() {
                        return n({
                          key: "notificationSnoozeCustomTime_popoverContent",
                          className: "nt-size-fit nt-w-[260px]"
                        });
                      },
                      get children() {
                        return b(OA, {
                          get maxDurationHours() {
                            return s();
                          },
                          onSelect: (p) => P(this, null, function* () {
                            yield e.notification.snooze(p.toISOString());
                          }),
                          onCancel: () => {
                            f(!1);
                          }
                        });
                      }
                    })];
                  }
                })];
              }
            })];
          }
        })
      }), b(He.Content, {
        "data-localization": "notification.actions.snooze.tooltip",
        get children() {
          return i("notification.actions.snooze.tooltip");
        }
      })];
    }
  });
}, jA = (e, n) => {
  const {
    isSnoozeEnabled: i
  } = At();
  return e.isSnoozed ? b(BA, {
    notification: e
  }) : e.isArchived ? b(HA, {
    notification: e
  }) : [ft(() => ft(
    () => n() !== "archived"
    /* ARCHIVED */
  )() && (e.isRead ? b(LA, {
    notification: e
  }) : b(RA, {
    notification: e
  }))), ft(() => ft(() => !!i())() && b(VA, {
    notification: e
  })), b(UA, {
    notification: e
  })];
}, $A = /* @__PURE__ */ Z("<span>"), KA = /* @__PURE__ */ Z('<a><div></div><div><div></div><div></div></div><div class="nt-w-1.5 nt-flex nt-justify-center nt-shrink-0">'), qA = /* @__PURE__ */ Z("<img>"), Th = /* @__PURE__ */ Z("<div>"), GA = {
  none: "notificationBar",
  high: "severityHigh__notificationBar",
  medium: "severityMedium__notificationBar",
  low: "severityLow__notificationBar"
}, PA = {
  none: "notification",
  high: "severityHigh__notification",
  medium: "severityMedium__notification",
  low: "severityLow__notification"
}, IA = (e) => {
  const n = se(), {
    t: i,
    locale: o
  } = gt(), {
    navigate: s,
    status: c
  } = At(), [f, d] = W(0), v = oe(() => (f(), o1({
    fromDate: new Date(e.notification.createdAt),
    locale: o()
  }))), g = oe(() => (f(), e.notification.snoozedUntil ? C8({
    untilDate: new Date(e.notification.snoozedUntil),
    locale: o()
  }) : null)), p = oe(() => (f(), !e.notification.deliveredAt || !Array.isArray(e.notification.deliveredAt) ? null : e.notification.deliveredAt.map((w) => o1({
    fromDate: new Date(w),
    locale: o()
  }))));
  Ue(() => {
    const w = setInterval(() => {
      d((C) => C + 1);
    }, 6e4);
    return () => clearInterval(w);
  });
  const m = (w) => P(void 0, null, function* () {
    var C, k, S;
    w.stopPropagation(), w.preventDefault(), e.notification.isRead || (yield e.notification.read()), (C = e.onNotificationClick) == null || C.call(e, e.notification), s((k = e.notification.redirect) == null ? void 0 : k.url, (S = e.notification.redirect) == null ? void 0 : S.target);
  }), _ = (w, C) => P(void 0, null, function* () {
    var k, S, E, O, A, D, L, F, Y, ie;
    C.stopPropagation(), w === "primary" ? (yield e.notification.completePrimary(), (k = e.onPrimaryActionClick) == null || k.call(e, e.notification), s((E = (S = e.notification.primaryAction) == null ? void 0 : S.redirect) == null ? void 0 : E.url, (A = (O = e.notification.primaryAction) == null ? void 0 : O.redirect) == null ? void 0 : A.target)) : (yield e.notification.completeSecondary(), (D = e.onSecondaryActionClick) == null || D.call(e, e.notification), s((F = (L = e.notification.secondaryAction) == null ? void 0 : L.redirect) == null ? void 0 : F.url, (ie = (Y = e.notification.secondaryAction) == null ? void 0 : Y.redirect) == null ? void 0 : ie.target));
  });
  return (() => {
    var w = KA(), C = w.firstChild, k = C.nextSibling, S = k.firstChild, E = S.nextSibling, O = k.nextSibling;
    return w.$$click = m, K(w, b(me, {
      get when() {
        return e.renderAvatar;
      },
      get fallback() {
        return b(me, {
          get when() {
            return e.notification.avatar;
          },
          get fallback() {
            return (() => {
              var A = Th();
              return ue(() => Q(A, n({
                key: "notificationImageLoadingFallback",
                className: "nt-size-8 nt-rounded-lg nt-shrink-0 nt-aspect-square",
                context: {
                  notification: e.notification
                }
              }))), A;
            })();
          },
          get children() {
            var A = qA();
            return ue((D) => {
              var L = n({
                key: "notificationImage",
                className: "nt-size-8 nt-rounded-lg nt-object-cover nt-aspect-square",
                context: {
                  notification: e.notification
                }
              }), F = e.notification.avatar;
              return L !== D.e && Q(A, D.e = L), F !== D.t && ct(A, "src", D.t = F), D;
            }, {
              e: void 0,
              t: void 0
            }), A;
          }
        });
      },
      children: (A) => b(oi, {
        render: (D) => A()(D, e.notification)
      })
    }), k), K(S, b(me, {
      get when() {
        return e.renderSubject;
      },
      get fallback() {
        return b(me, {
          get when() {
            return e.notification.subject;
          },
          children: (A) => b(h1, {
            appearanceKey: "notificationSubject",
            class: "nt-text-start nt-font-medium nt-whitespace-pre-wrap [word-break:break-word]",
            strongAppearanceKey: "notificationSubject__strong",
            get context() {
              return {
                notification: e.notification
              };
            },
            get children() {
              return A();
            }
          })
        });
      },
      children: (A) => b(oi, {
        render: (D) => A()(D, e.notification)
      })
    }), null), K(S, b(me, {
      get when() {
        return e.renderBody;
      },
      get fallback() {
        return b(h1, {
          appearanceKey: "notificationBody",
          strongAppearanceKey: "notificationBody__strong",
          class: "nt-text-start nt-whitespace-pre-wrap nt-text-foreground-alpha-600 [word-break:break-word]",
          get context() {
            return {
              notification: e.notification
            };
          },
          get children() {
            return e.notification.body;
          }
        });
      },
      children: (A) => b(oi, {
        render: (D) => A()(D, e.notification)
      })
    }), null), K(k, b(me, {
      get when() {
        return e.renderDefaultActions;
      },
      get fallback() {
        return (() => {
          var A = Th();
          return K(A, () => jA(e.notification, c)), ue(() => Q(A, n({
            key: "notificationDefaultActions",
            className: "nt-absolute nt-transition nt-duration-100 nt-ease-out nt-gap-0.5 nt-flex nt-shrink-0 nt-opacity-0 group-hover:nt-opacity-100 group-focus-within:nt-opacity-100 nt-justify-center nt-items-center nt-bg-background/90 nt-right-3 nt-top-3 nt-border nt-border-neutral-alpha-100 nt-rounded-lg nt-backdrop-blur-lg nt-p-0.5",
            context: {
              notification: e.notification
            }
          }))), A;
        })();
      },
      children: (A) => b(oi, {
        render: (D) => A()(D, e.notification)
      })
    }), E), K(k, b(me, {
      get when() {
        return e.renderCustomActions;
      },
      get fallback() {
        return b(me, {
          get when() {
            return e.notification.primaryAction || e.notification.secondaryAction;
          },
          get children() {
            var A = Th();
            return K(A, b(me, {
              get when() {
                return e.notification.primaryAction;
              },
              keyed: !0,
              children: (D) => b(at, {
                appearanceKey: "notificationPrimaryAction__button",
                variant: "default",
                onClick: (L) => _("primary", L),
                get context() {
                  return {
                    notification: e.notification
                  };
                },
                get children() {
                  return D.label;
                }
              })
            }), null), K(A, b(me, {
              get when() {
                return e.notification.secondaryAction;
              },
              keyed: !0,
              children: (D) => b(at, {
                appearanceKey: "notificationSecondaryAction__button",
                variant: "secondary",
                onClick: (L) => _("secondary", L),
                get context() {
                  return {
                    notification: e.notification
                  };
                },
                get children() {
                  return D.label;
                }
              })
            }), null), ue(() => Q(A, n({
              key: "notificationCustomActions",
              className: "nt-flex nt-flex-wrap nt-gap-2",
              context: {
                notification: e.notification
              }
            }))), A;
          }
        });
      },
      children: (A) => b(oi, {
        render: (D) => A()(D, e.notification)
      })
    }), E), K(E, b(me, {
      get when() {
        return g();
      },
      get fallback() {
        return b(me, {
          get when() {
            return p();
          },
          get fallback() {
            return v();
          },
          children: (A) => b(me, {
            get when() {
              return A().length >= 2;
            },
            get fallback() {
              return v();
            },
            get children() {
              return [" ", b(Jn, {
                get each() {
                  return A().slice(-2);
                },
                children: (D, L) => [b(me, {
                  get when() {
                    return L() === 0;
                  },
                  get children() {
                    return [D, " ·"];
                  }
                }), b(me, {
                  get when() {
                    return L() === 1;
                  },
                  get children() {
                    return b(CA, {
                      appearanceKey: "notificationDeliveredAt__badge",
                      get context() {
                        return {
                          notification: e.notification
                        };
                      },
                      get children() {
                        return [b(We, {
                          iconKey: "clock",
                          get class() {
                            return n({
                              key: "notificationDeliveredAt__icon",
                              className: "nt-size-3",
                              iconKey: "clock",
                              context: {
                                notification: e.notification
                              }
                            });
                          },
                          get fallback() {
                            return b(Hl, {
                              get class() {
                                return n({
                                  key: "notificationDeliveredAt__icon",
                                  className: "nt-size-3",
                                  iconKey: "clock",
                                  context: {
                                    notification: e.notification
                                  }
                                });
                              }
                            });
                          }
                        }), D];
                      }
                    });
                  }
                })]
              })];
            }
          })
        });
      },
      children: (A) => [b(We, {
        iconKey: "clock",
        get class() {
          return n({
            key: "notificationSnoozedUntil__icon",
            className: "nt-size-3",
            iconKey: "clock",
            context: {
              notification: e.notification
            }
          });
        },
        get fallback() {
          return b(Hl, {
            get class() {
              return n({
                key: "notificationSnoozedUntil__icon",
                className: "nt-size-3",
                iconKey: "clock",
                context: {
                  notification: e.notification
                }
              });
            }
          });
        }
      }), ft(() => i("notification.snoozedUntil")), " · ", ft(A)]
    })), K(O, b(me, {
      get when() {
        return !e.notification.isRead;
      },
      get children() {
        var A = $A();
        return ue(() => Q(A, n({
          key: "notificationDot",
          className: "nt-size-1.5 nt-bg-primary nt-rounded-full",
          context: {
            notification: e.notification
          }
        }))), A;
      }
    })), ue((A) => {
      var D, L = n({
        key: PA[e.notification.severity],
        className: be("nt-transition nt-w-full nt-text-sm hover:nt-bg-primary-alpha-25 nt-group nt-relative nt-flex nt-items-start nt-p-4 nt-gap-2", "[&:not(:first-child)]:nt-border-t nt-border-neutral-alpha-100", {
          "nt-cursor-pointer": !e.notification.isRead || !!((D = e.notification.redirect) != null && D.url),
          "nt-bg-severity-high-alpha-100 hover:nt-bg-severity-high-alpha-50": e.notification.severity === "high",
          "nt-bg-severity-medium-alpha-100 hover:nt-bg-severity-medium-alpha-50": e.notification.severity === "medium",
          "nt-bg-severity-low-alpha-100 hover:nt-bg-severity-low-alpha-50": e.notification.severity === "low"
          /* LOW */
        }),
        context: {
          notification: e.notification
        }
      }), F = n({
        key: GA[e.notification.severity],
        className: be("nt-transition nt-absolute nt-left-0 nt-top-0 nt-bottom-0 nt-w-[3px]", {
          "nt-bg-severity-high group-hover:nt-bg-severity-high-alpha-500": e.notification.severity === "high",
          "nt-bg-severity-medium group-hover:nt-bg-severity-medium-alpha-500": e.notification.severity === "medium",
          "nt-bg-severity-low group-hover:nt-bg-severity-low-alpha-500": e.notification.severity === "low"
          /* LOW */
        }),
        context: {
          notification: e.notification
        }
      }), Y = n({
        key: "notificationContent",
        className: "nt-flex nt-flex-col nt-gap-2 nt-w-full",
        context: {
          notification: e.notification
        }
      }), ie = n({
        key: "notificationTextContainer",
        context: {
          notification: e.notification
        }
      }), X = n({
        key: "notificationDate",
        className: "nt-text-foreground-alpha-400 nt-flex nt-items-center nt-gap-1",
        context: {
          notification: e.notification
        }
      });
      return L !== A.e && Q(w, A.e = L), F !== A.t && Q(C, A.t = F), Y !== A.a && Q(k, A.a = Y), ie !== A.o && Q(S, A.o = ie), X !== A.i && Q(E, A.i = X), A;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), w;
  })();
};
Un(["click"]);
var YA = (e) => b(me, {
  get when() {
    return e.renderNotification;
  },
  get fallback() {
    return b(IA, {
      get notification() {
        return e.notification;
      },
      get renderAvatar() {
        return e.renderAvatar;
      },
      get renderSubject() {
        return e.renderSubject;
      },
      get renderBody() {
        return e.renderBody;
      },
      get renderDefaultActions() {
        return e.renderDefaultActions;
      },
      get renderCustomActions() {
        return e.renderCustomActions;
      },
      get onNotificationClick() {
        return e.onNotificationClick;
      },
      get onPrimaryActionClick() {
        return e.onPrimaryActionClick;
      },
      get onSecondaryActionClick() {
        return e.onSecondaryActionClick;
      }
    });
  },
  get children() {
    return b(oi, {
      render: (n) => e.renderNotification(n, e.notification)
    });
  }
}), ZA = (e) => {
  const n = oe(() => !!e.count), {
    t: i
  } = gt();
  return b(me, {
    get when() {
      return n();
    },
    get children() {
      return b(at, {
        appearanceKey: "notificationListNewNotificationsNotice__button",
        class: "nt-absolute nt-w-fit nt-h-fit nt-top-0 nt-mx-auto nt-inset-2 nt-z-10 nt-rounded-full hover:nt-bg-primary-600 nt-animate-in nt-slide-in-from-top-2 nt-fade-in",
        get onClick() {
          return e.onClick;
        },
        "data-localization": "notifications.newNotifications",
        get children() {
          return i("notifications.newNotifications", {
            notificationCount: e.count
          });
        }
      });
    }
  });
}, XA = /* @__PURE__ */ Z('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"fill=none><path fill=currentColor d="M12.1675 2.04492L11.5308 2.68164L11.1069 3.10645L12.9614 4.96094L12.7495 5.17383L10.894 3.31836L10.4692 3.74219L9.40967 4.80273L8.98486 5.22754L9.40967 5.65137L10.5747 6.81738L10.3628 7.03027L9.19775 5.86328L8.77295 5.43945L6.35889 7.85352L6.62744 8.26172C7.00257 8.83177 7.18147 9.50559 7.14111 10.1816L7.10986 10.4707C7.00656 11.1451 6.68818 11.7654 6.20557 12.2402L5.98877 12.4346C5.46027 12.8661 4.80786 13.1133 4.13135 13.1426L3.84033 13.1416C3.0614 13.1032 2.3236 12.7769 1.771 12.2266H1.77002C1.28602 11.744 0.974717 11.1186 0.877441 10.4473L0.849121 10.1572C0.814077 9.47419 1.00158 8.80051 1.38037 8.2373L1.55518 8.00293C2.04954 7.39769 2.75121 6.99767 3.52393 6.88086C4.29677 6.76406 5.0856 6.93884 5.73682 7.37109L6.146 7.64258L6.49268 7.29492L11.9546 1.83203L12.1675 2.04492ZM4.00537 7.10645C3.71967 7.11042 3.4363 7.15732 3.16553 7.24512L2.89893 7.34668C2.63748 7.46146 2.39532 7.61469 2.18018 7.80078L1.97803 7.99316C1.52375 8.46356 1.2476 9.0739 1.18994 9.71973L1.17822 9.99805C1.18392 10.6519 1.41417 11.2812 1.82568 11.7822L2.01318 11.9883C2.47551 12.4506 3.0805 12.7377 3.7251 12.8066L4.00342 12.8232C4.75062 12.8297 5.4708 12.5425 6.0083 12.0234L6.44775 11.5986L6.40186 11.5527C6.44537 11.4885 6.48869 11.4241 6.52686 11.3564L6.65479 11.1016C6.76956 10.84 6.84411 10.563 6.87646 10.2803L6.89404 9.99609C6.89801 9.71049 6.85899 9.42635 6.77881 9.15332L6.68506 8.88379C6.5776 8.61923 6.4315 8.3726 6.25146 8.15234L6.06006 7.94141C5.85804 7.73939 5.62719 7.56844 5.37549 7.43555L5.1167 7.31543C4.76396 7.17222 4.38604 7.10121 4.00537 7.10645Z"stroke=#525866 stroke-width=1.2>');
function QA(e) {
  return (() => {
    var n = XA();
    return Se(n, e, !0, !0), n;
  })();
}
var Nh = /* @__PURE__ */ Z("<div>"), FA = /* @__PURE__ */ Z("<p data-localization=notifications.emptyNotice>"), WA = /* @__PURE__ */ Z(`<div><p>Trigger your notification. No setup needed.</p><p>Temporary &lt;Inbox />, data will expire in 24h. Connect API key to persists messages, enable
                preferences, and connect email.</p><div><div>`), y1 = (e) => {
  const n = se(), {
    t: i
  } = gt(), {
    isKeyless: o
  } = At();
  return (() => {
    var s = Nh();
    return K(s, b(Pi.div, {
      get animate() {
        return {
          scale: e.loading ? 1 : 0.7
        };
      },
      transition: {
        duration: 0.6,
        easing: [0.39, 0.24, 0.3, 1],
        delay: 0.3
      },
      get class() {
        return n({
          key: "notificationList__skeleton",
          className: "nt-flex nt-relative nt-mx-auto nt-flex-col nt-w-full nt-mb-4"
        });
      },
      get children() {
        return [ft(() => Array.from({
          length: 5
        }).map((c, f) => b(Pi.div, {
          get animate() {
            return {
              marginBottom: e.loading ? 0 : "16px",
              borderWidth: e.loading ? 0 : "1px",
              borderRadius: e.loading ? 0 : "var(--nv-radius-lg)"
            };
          },
          transition: {
            duration: 0.5,
            delay: 0.3,
            easing: "ease-in-out"
          },
          get class() {
            return n({
              key: "notificationList__skeletonContent",
              className: "nt-flex nt-border-neutral-alpha-50 nt-items-center nt-gap-3 nt-p-3 nt-bg-neutral-alpha-25"
            });
          },
          get children() {
            return [b(_k, {
              appearanceKey: "notificationList__skeletonAvatar",
              class: "nt-w-8 nt-h-8 nt-rounded-full nt-bg-neutral-alpha-100"
            }), (() => {
              var d = Nh();
              return K(d, b(cu, {
                appearanceKey: "notificationList__skeletonText",
                class: "nt-h-2 nt-w-1/3 nt-bg-neutral-alpha-50 nt-rounded"
              }), null), K(d, b(cu, {
                appearanceKey: "notificationList__skeletonText",
                class: "nt-h-2 nt-w-2/3 nt-bg-neutral-alpha-50 nt-rounded"
              }), null), ue(() => Q(d, n({
                key: "notificationList__skeletonItem",
                className: "nt-flex nt-flex-col nt-gap-2 nt-flex-1"
              }))), d;
            })()];
          }
        }))), (() => {
          var c = Nh();
          return ue(() => Q(c, n({
            key: "notificationListEmptyNoticeOverlay",
            className: "nt-absolute nt-size-full nt-z-10 nt-inset-0 nt-bg-gradient-to-b nt-from-transparent nt-to-background"
          }))), c;
        })()];
      }
    }), null), K(s, b(me, {
      get when() {
        return !e.loading;
      },
      get children() {
        return b(Pi.p, {
          initial: {
            opacity: 0,
            y: -4,
            filter: "blur(4px)"
          },
          get animate() {
            return {
              opacity: e.loading ? 0 : 1,
              y: 0,
              filter: "blur(0px)"
            };
          },
          transition: {
            duration: 0.7,
            easing: [0.39, 0.24, 0.3, 1],
            delay: 0.6
          },
          get class() {
            return n({
              key: "notificationListEmptyNotice",
              className: "nt-text-center"
            });
          },
          get children() {
            return ft(() => !!o())() ? b(JA, {}) : (() => {
              var c = FA();
              return K(c, () => i("notifications.emptyNotice")), c;
            })();
          }
        });
      }
    }), null), ue(() => Q(s, n({
      key: "notificationListEmptyNoticeContainer",
      className: "nt-flex nt-flex-col nt-items-center nt-h-fit nt-w-full nt-text-sm nt-text-foreground-alpha-400 nt-text-center"
    }))), s;
  })();
};
function JA() {
  const e = se(), n = An();
  return (() => {
    var i = WA(), o = i.firstChild, s = o.nextSibling, c = s.nextSibling, f = c.firstChild;
    return K(c, b(at, {
      variant: "secondary",
      size: "sm",
      get class() {
        return e({
          key: "notificationListEmptyNotice",
          className: "nt-h-8 nt-px-4 nt-flex nt-items-center nt-justify-center nt-gap-2 nt-bg-white nt-border nt-border-neutral-alpha-100 nt-shadow-sm nt-text-[12px] nt-font-medium"
        });
      },
      onClick: () => window.open("https://go.novu.co/keyless", "_blank", "noopener noreferrer"),
      get children() {
        return [b(QA, {
          get class() {
            return e({
              key: "lockIcon",
              className: "nt-size-4 nt-mr-2"
            });
          }
        }), "Get API key"];
      }
    }), f), K(f, b(at, {
      variant: "default",
      size: "sm",
      get class() {
        return e({
          key: "notificationListEmptyNotice",
          className: "nt-h-8 nt-px-4 nt-flex nt-items-center nt-justify-center nt-gap-2 nt-bg-neutral-900 nt-text-white nt-shadow-sm nt-text-[12px] nt-font-medium"
        });
      },
      onClick: () => n.notifications.triggerHelloWorldEvent(),
      get children() {
        return [b(G2, {
          get class() {
            return e({
              key: "bellIcon",
              className: "nt-size-4 nt-mr-2"
            });
          }
        }), "Send 'Hello World!'"];
      }
    })), ue((d) => {
      var v = e({
        key: "notificationListEmptyNotice",
        className: "nt--mt-[50px]"
      }), g = e({
        key: "strong",
        className: "nt-text-[#000000] nt-mb-1"
      }), p = e({
        key: "notificationListEmptyNotice",
        className: "nt-mb-4"
      }), m = e({
        key: "notificationListEmptyNotice",
        className: "nt-flex nt-gap-4 nt-justify-center"
      });
      return v !== d.e && Q(i, d.e = v), g !== d.t && Q(o, d.t = g), p !== d.a && Q(s, d.a = p), m !== d.o && Q(c, d.o = m), d;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), i;
  })();
}
var b1 = /* @__PURE__ */ Z("<div>"), eE = /* @__PURE__ */ Z("<div><div>"), gw = (e) => {
  var n, i, o, s, c;
  const f = oe(() => je(re({}, e.filter), {
    limit: e.limit
  })), d = se(), {
    data: v,
    setEl: g,
    end: p,
    refetch: m,
    initialLoading: _
  } = ck({
    options: f
  }), {
    count: w,
    reset: C
  } = Z8({
    filter: {
      tags: (i = (n = e.filter) == null ? void 0 : n.tags) != null ? i : [],
      data: (s = (o = e.filter) == null ? void 0 : o.data) != null ? s : {},
      severity: (c = e.filter) == null ? void 0 : c.severity
    }
  }), {
    setLimit: k
  } = At(), S = oe(() => v().map((L) => L.id)), {
    observeNotification: E,
    unobserveNotification: O
  } = E8();
  let A;
  Ue(() => {
    k(e.limit || V2);
  });
  const D = (L) => P(void 0, null, function* () {
    L.stopPropagation(), C(), m({
      filter: e.filter
    }), A.scrollTo({
      top: 0
    });
  });
  return (() => {
    var L = eE(), F = L.firstChild;
    return K(L, b(ZA, {
      get count() {
        return w();
      },
      onClick: D
    }), F), kn((Y) => {
      A = Y;
    }, F), K(F, b(me, {
      get when() {
        return v().length > 0;
      },
      get fallback() {
        return b(y1, {
          get loading() {
            return _();
          }
        });
      },
      get children() {
        return [b(Jn, {
          get each() {
            return S();
          },
          children: (Y, ie) => {
            const X = () => v()[ie()];
            return (() => {
              var fe = b1();
              return kn((le) => {
                E(le, X().id);
                const ee = new MutationObserver((we) => {
                  we.forEach((Ee) => {
                    Ee.removedNodes.forEach((Oe) => {
                      Oe === le && (O(le), ee.disconnect());
                    });
                  });
                });
                le.parentElement && ee.observe(le.parentElement, {
                  childList: !0
                }), $e(() => {
                  ee.disconnect(), O(le);
                });
              }, fe), K(fe, b(YA, {
                get notification() {
                  return X();
                },
                get renderNotification() {
                  return e.renderNotification;
                },
                get renderAvatar() {
                  return e.renderAvatar;
                },
                get renderSubject() {
                  return e.renderSubject;
                },
                get renderBody() {
                  return e.renderBody;
                },
                get renderDefaultActions() {
                  return e.renderDefaultActions;
                },
                get renderCustomActions() {
                  return e.renderCustomActions;
                },
                get onNotificationClick() {
                  return e.onNotificationClick;
                },
                get onPrimaryActionClick() {
                  return e.onPrimaryActionClick;
                },
                get onSecondaryActionClick() {
                  return e.onSecondaryActionClick;
                }
              })), fe;
            })();
          }
        }), b(me, {
          get when() {
            return !p();
          },
          get children() {
            var Y = b1();
            return kn(g, Y), K(Y, b(y1, {
              loading: !0
            })), Y;
          }
        })];
      }
    })), ue((Y) => {
      var ie = d({
        key: "notificationListContainer",
        className: "nt-relative nt-border-t nt-border-t-neutral-alpha-200 nt-h-full nt-overflow-hidden",
        context: {
          notifications: v()
        }
      }), X = d({
        key: "notificationList",
        className: "nt-relative nt-h-full nt-flex nt-flex-col nt-overflow-y-auto",
        context: {
          notifications: v()
        }
      });
      return ie !== Y.e && Q(L, Y.e = ie), X !== Y.t && Q(F, Y.t = X), Y;
    }, {
      e: void 0,
      t: void 0
    }), L;
  })();
}, Z0 = /* @__PURE__ */ Z("<span>"), tE = (e) => e >= 100 ? "99+" : e, X0 = (e) => {
  const n = se(), i = oe(() => tE(e.count));
  return (() => {
    var o = Z0();
    return K(o, i), ue(() => Q(o, n({
      key: "notificationsTabsTriggerCount",
      className: "nt-rounded-full nt-bg-counter nt-px-[6px] nt-text-counter-foreground nt-text-sm"
    }))), o;
  })();
}, w1 = (e) => {
  var n, i;
  const {
    status: o
  } = At(), s = se(), c = $2({
    filter: {
      tags: kr(e),
      data: (n = e.filter) == null ? void 0 : n.data,
      severity: (i = e.filter) == null ? void 0 : i.severity
    }
  });
  return b(Cl.Trigger, {
    get value() {
      return e.label;
    },
    get class() {
      return s({
        key: "notificationsTabs__tabsTrigger",
        className: be(cw(), "nt-flex nt-gap-2", e.class)
      });
    },
    get children() {
      return [(() => {
        var f = Z0();
        return K(f, () => e.label), ue(() => Q(f, s({
          key: "notificationsTabsTriggerLabel",
          className: "nt-text-sm nt-font-medium"
        }))), f;
      })(), b(me, {
        get when() {
          return ft(
            () => o() !== "archived"
            /* ARCHIVED */
          )() && c();
        },
        get children() {
          return b(X0, {
            get count() {
              return c();
            }
          });
        }
      })];
    }
  });
}, nE = (e) => {
  var n, i;
  const {
    status: o
  } = At(), s = se(), c = $2({
    filter: {
      tags: kr(e),
      data: (n = e.filter) == null ? void 0 : n.data,
      severity: (i = e.filter) == null ? void 0 : i.severity
    }
  });
  return b(dt.Item, {
    get class() {
      return s({
        key: "moreTabs__dropdownItem",
        className: be(uo(), "nt-flex nt-justify-between nt-gap-2")
      });
    },
    get onClick() {
      return e.onClick;
    },
    get children() {
      return [(() => {
        var f = Z0();
        return K(f, () => e.label), ue(() => Q(f, s({
          key: "moreTabs__dropdownItemLabel",
          className: "nt-mr-auto"
        }))), f;
      })(), ft(() => e.rightIcon), b(me, {
        get when() {
          return ft(
            () => o() !== "archived"
            /* ARCHIVED */
          )() && c();
        },
        get children() {
          return b(X0, {
            get count() {
              return c();
            }
          });
        }
      })];
    }
  });
}, rE = () => "nt-relative after:nt-absolute after:nt-content-[''] after:nt-bottom-0 after:nt-left-0 after:nt-w-full after:nt-h-[2px] after:nt-border-b-2 nt-mb-[0.625rem]", iE = (e) => {
  const n = se(), {
    activeTab: i,
    status: o,
    setActiveTab: s,
    filter: c
  } = At(), {
    dropdownTabs: f,
    setTabsList: d,
    visibleTabs: v
  } = B8({
    tabs: e.tabs
  }), g = X8({
    filters: f().map((k) => {
      var S;
      return {
        tags: kr(k),
        data: (S = k.filter) == null ? void 0 : S.data
      };
    })
  }), p = n({
    key: "moreTabs__dropdownItemRight__icon",
    className: "nt-size-3",
    iconKey: "check"
  }), m = oe(() => f().map((k) => je(re({}, k), {
    rightIcon: k.label === i() ? b(We, {
      iconKey: "check",
      class: p,
      get fallback() {
        return b(j0, {
          class: p
        });
      }
    }) : void 0
  }))), _ = oe(() => g().reduce((k, S) => k + S, 0)), w = oe(() => f().map((k) => k.label).includes(i())), C = n({
    key: "moreTabs__icon",
    className: "nt-size-5",
    iconKey: "arrowDown"
  });
  return b(Cl.Root, {
    appearanceKey: "notificationsTabs__tabsRoot",
    class: "nt-flex nt-flex-col nt-flex-1 nt-min-h-0",
    get value() {
      return i();
    },
    onChange: s,
    get children() {
      return [b(me, {
        get when() {
          return v().length > 0;
        },
        get fallback() {
          return b(Cl.List, {
            ref: d,
            appearanceKey: "notificationsTabs__tabsList",
            class: "nt-bg-neutral-alpha-25 nt-px-4",
            get children() {
              return e.tabs.map((k) => b(w1, he(k, {
                class: "nt-invisible"
              })));
            }
          });
        },
        get children() {
          return b(Cl.List, {
            appearanceKey: "notificationsTabs__tabsList",
            class: "nt-bg-neutral-alpha-25 nt-px-4",
            get children() {
              return [b(Jn, {
                get each() {
                  return v();
                },
                children: (k) => b(w1, k)
              }), b(me, {
                get when() {
                  return f().length > 0;
                },
                get children() {
                  return b(dt.Root, {
                    get children() {
                      return [b(dt.Trigger, {
                        appearanceKey: "moreTabs__dropdownTrigger",
                        asChild: (k) => b(at, he({
                          variant: "unstyled",
                          size: "iconSm",
                          appearanceKey: "moreTabs__button"
                        }, k, {
                          get class() {
                            return be(rE(), "nt-ml-auto", w() ? "after:nt-border-b-primary" : "after:nt-border-b-transparent nt-text-foreground-alpha-700");
                          },
                          get children() {
                            return [b(We, {
                              iconKey: "arrowDown",
                              class: C,
                              get fallback() {
                                return b(tS, {
                                  class: C
                                });
                              }
                            }), b(me, {
                              get when() {
                                return ft(
                                  () => o() !== "archived"
                                  /* ARCHIVED */
                                )() && _();
                              },
                              get children() {
                                return b(X0, {
                                  get count() {
                                    return _();
                                  }
                                });
                              }
                            })];
                          }
                        }))
                      }), b(dt.Content, {
                        appearanceKey: "moreTabs__dropdownContent",
                        get children() {
                          return b(Jn, {
                            get each() {
                              return m();
                            },
                            children: (k) => b(nE, he({
                              onClick: () => s(k.label)
                            }, k))
                          });
                        }
                      })];
                    }
                  });
                }
              })];
            }
          });
        }
      }), ft(() => e.tabs.map((k) => b(Cl.Content, {
        get value() {
          return k.label;
        },
        get class() {
          return n({
            key: "notificationsTabs__tabsContent",
            className: be(i() === k.label ? "nt-block" : "nt-hidden", "nt-overflow-auto nt-flex-1 nt-flex nt-flex-col nt-min-h-0")
          });
        },
        get children() {
          return b(gw, {
            get renderNotification() {
              return e.renderNotification;
            },
            get renderAvatar() {
              return e.renderAvatar;
            },
            get renderSubject() {
              return e.renderSubject;
            },
            get renderBody() {
              return e.renderBody;
            },
            get renderDefaultActions() {
              return e.renderDefaultActions;
            },
            get renderCustomActions() {
              return e.renderCustomActions;
            },
            get onNotificationClick() {
              return e.onNotificationClick;
            },
            get onPrimaryActionClick() {
              return e.onPrimaryActionClick;
            },
            get onSecondaryActionClick() {
              return e.onSecondaryActionClick;
            },
            get filter() {
              var S, E;
              return je(re({}, c()), {
                tags: kr(k),
                data: (S = k.filter) == null ? void 0 : S.data,
                severity: (E = k.filter) == null ? void 0 : E.severity
              });
            }
          });
        }
      })))];
    }
  });
}, aE = /* @__PURE__ */ Z("<div>"), Sr = /* @__PURE__ */ (function(e) {
  return e.Notifications = "notifications", e.Preferences = "preferences", e;
})({}), ji = (e) => {
  const {
    isDevelopmentMode: n
  } = At(), [i, o] = W(e.initialPage || Sr.Notifications), {
    tabs: s,
    filter: c
  } = At(), f = se(), d = oe(() => (v) => {
    if (!e.hideNav)
      return () => {
        o(v);
      };
  });
  return (() => {
    var v = aE();
    return K(v, b(Ub, {
      get children() {
        return [b(eu, {
          get when() {
            return i() === Sr.Notifications;
          },
          get children() {
            return [b(bk, {
              get navigateToPreferences() {
                return d()(Sr.Preferences);
              }
            }), b(me, {
              keyed: !0,
              get when() {
                return ft(() => !!s())() && s().length > 0;
              },
              get fallback() {
                return b(gw, {
                  get renderNotification() {
                    return e.renderNotification;
                  },
                  get renderAvatar() {
                    return e.renderAvatar;
                  },
                  get renderSubject() {
                    return e.renderSubject;
                  },
                  get renderBody() {
                    return e.renderBody;
                  },
                  get renderDefaultActions() {
                    return e.renderDefaultActions;
                  },
                  get renderCustomActions() {
                    return e.renderCustomActions;
                  },
                  get onNotificationClick() {
                    return e.onNotificationClick;
                  },
                  get onPrimaryActionClick() {
                    return e.onPrimaryActionClick;
                  },
                  get onSecondaryActionClick() {
                    return e.onSecondaryActionClick;
                  },
                  get filter() {
                    return c();
                  }
                });
              },
              get children() {
                return b(iE, {
                  get renderNotification() {
                    return e.renderNotification;
                  },
                  get renderAvatar() {
                    return e.renderAvatar;
                  },
                  get renderSubject() {
                    return e.renderSubject;
                  },
                  get renderBody() {
                    return e.renderBody;
                  },
                  get renderDefaultActions() {
                    return e.renderDefaultActions;
                  },
                  get renderCustomActions() {
                    return e.renderCustomActions;
                  },
                  get onNotificationClick() {
                    return e.onNotificationClick;
                  },
                  get onPrimaryActionClick() {
                    return e.onPrimaryActionClick;
                  },
                  get onSecondaryActionClick() {
                    return e.onSecondaryActionClick;
                  },
                  get tabs() {
                    return s();
                  }
                });
              }
            })];
          }
        }), b(eu, {
          get when() {
            return i() === Sr.Preferences;
          },
          get children() {
            return [b(pA, {
              get navigateToNotifications() {
                return d()(Sr.Notifications);
              }
            }), b(hA, {})];
          }
        })];
      }
    }), null), K(v, b(lC, {}), null), ue(() => Q(v, f({
      key: "inboxContent",
      className: be("nt-h-full nt-flex nt-flex-col [&_.nv-preferencesContainer]:nt-pb-8 [&_.nv-notificationList]:nt-pb-8", {
        "[&_.nv-preferencesContainer]:nt-pb-12 [&_.nv-notificationList]:nt-pb-12": n(),
        "[&_.nv-preferencesContainer]:nt-pb-8 [&_.nv-notificationList]:nt-pb-8": !n()
      })
    }))), v;
  })();
}, oE = (e) => {
  const n = se(), {
    isOpened: i,
    setIsOpened: o
  } = At(), s = () => {
    var c;
    return (c = e?.open) != null ? c : i();
  };
  return b(Fn.Root, {
    get open() {
      return s();
    },
    onOpenChange: o,
    get placement() {
      return e.placement;
    },
    get offset() {
      return e.placementOffset;
    },
    get children() {
      return [b(Fn.Trigger, {
        asChild: (c) => b(at, he({
          get class() {
            return n({
              key: "inbox__popoverTrigger"
            });
          },
          variant: "ghost",
          size: "icon"
        }, c, {
          get children() {
            return b(J2, {
              get renderBell() {
                return e.renderBell;
              }
            });
          }
        }))
      }), b(Fn.Content, {
        appearanceKey: "inbox__popoverContent",
        portal: !0,
        get children() {
          return b(me, {
            get when() {
              return e.renderNotification;
            },
            get fallback() {
              return b(ji, {
                get renderAvatar() {
                  return e.renderAvatar;
                },
                get renderSubject() {
                  return e.renderSubject;
                },
                get renderBody() {
                  return e.renderBody;
                },
                get renderDefaultActions() {
                  return e.renderDefaultActions;
                },
                get renderCustomActions() {
                  return e.renderCustomActions;
                },
                get onNotificationClick() {
                  return e.onNotificationClick;
                },
                get onPrimaryActionClick() {
                  return e.onPrimaryActionClick;
                },
                get onSecondaryActionClick() {
                  return e.onSecondaryActionClick;
                }
              });
            },
            get children() {
              return b(ji, {
                get renderNotification() {
                  return e.renderNotification;
                },
                get onNotificationClick() {
                  return e.onNotificationClick;
                },
                get onPrimaryActionClick() {
                  return e.onPrimaryActionClick;
                },
                get onSecondaryActionClick() {
                  return e.onSecondaryActionClick;
                }
              });
            }
          });
        }
      })];
    }
  });
}, lE = {
  Inbox: oE,
  InboxContent: ji,
  Bell: J2,
  Notifications: (e) => {
    if (e.renderNotification) {
      const o = e, s = Ka(o, [
        "renderBody",
        "renderSubject",
        "renderAvatar",
        "renderDefaultActions",
        "renderCustomActions"
      ]);
      return b(ji, he(s, {
        hideNav: !0,
        get initialPage() {
          return Sr.Notifications;
        }
      }));
    }
    const n = e, i = Ka(n, [
      "renderNotification"
    ]);
    return b(ji, he(i, {
      hideNav: !0,
      get initialPage() {
        return Sr.Notifications;
      }
    }));
  },
  Preferences: (e) => {
    if (e.renderNotification) {
      const o = e, s = Ka(o, [
        "renderBody",
        "renderSubject",
        "renderAvatar",
        "renderDefaultActions",
        "renderCustomActions"
      ]);
      return b(ji, he(s, {
        hideNav: !0,
        get initialPage() {
          return Sr.Preferences;
        }
      }));
    }
    const n = e, i = Ka(n, [
      "renderNotification"
    ]);
    return b(ji, he(i, {
      hideNav: !0,
      get initialPage() {
        return Sr.Preferences;
      }
    }));
  }
}, sE = (e) => {
  const n = () => [...e.nodes.keys()];
  return qt(() => {
    var i;
    const o = R2;
    if ((e.container instanceof ShadowRoot ? e.container : document).getElementById(o))
      return;
    const f = document.createElement("style");
    f.id = o, f.innerHTML = p8;
    const d = (i = e.container) != null ? i : document.head;
    d.insertBefore(f, d.firstChild), $e(() => {
      f.remove();
    });
  }), b(G8, {
    get options() {
      return e.options;
    },
    get novu() {
      return e.novu;
    },
    get children() {
      return b(K8, {
        get localization() {
          return e.localization;
        },
        get children() {
          return b($8, {
            get id() {
              return e.novuUI.id;
            },
            get appearance() {
              return e.appearance;
            },
            get container() {
              return e.container;
            },
            get children() {
              return b(W8, {
                get children() {
                  return b(q8, {
                    get applicationIdentifier() {
                      var i;
                      return (i = e.options) == null ? void 0 : i.applicationIdentifier;
                    },
                    get tabs() {
                      return e.tabs;
                    },
                    get preferencesFilter() {
                      return e.preferencesFilter;
                    },
                    get preferenceGroups() {
                      return e.preferenceGroups;
                    },
                    get preferencesSort() {
                      return e.preferencesSort;
                    },
                    get routerPush() {
                      return e.routerPush;
                    },
                    get children() {
                      return b(I8, {
                        get children() {
                          return b(Jn, {
                            get each() {
                              return n();
                            },
                            children: (i) => {
                              const o = () => e.nodes.get(i);
                              let s;
                              const c = lE[o().name];
                              return qt(() => {
                                ["Notifications", "Preferences", "InboxContent"].includes(o().name) && (i instanceof HTMLElement && (i.style.height = "100%"), s && (s.style.height = "100%"));
                              }), b(E0, {
                                mount: i,
                                ref: (f) => {
                                  s = f;
                                },
                                get children() {
                                  return b(vw, {
                                    get children() {
                                      return b(c, he(() => o().props));
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}, Fa, Bl, Dc, $i, El, Ga, fu, Rc, du, Lc, hu, Uc, vu, Hc, gu, Bc, pu, Vc, mu, jc, yu, $c, bu, $a, a0, pw, mw, cE = class {
  constructor(n) {
    ce(this, $a), ce(this, Fa, null), ce(this, Bl), ce(this, Dc), ce(this, $i), ce(this, El), ce(this, Ga), ce(this, fu), ce(this, Rc), ce(this, du), ce(this, Lc), ce(this, hu), ce(this, Uc), ce(this, vu), ce(this, Hc), ce(this, gu), ce(this, Bc), ce(this, pu), ce(this, Vc), ce(this, mu), ce(this, jc), ce(this, yu), ce(this, $c), ce(this, bu);
    var i;
    this.id = D2(16);
    const [o, s] = W(n.appearance), [c, f] = W(n.localization), [d, v] = W(n.options), [g, p] = W(/* @__PURE__ */ new Map()), [m, _] = W((i = n.tabs) != null ? i : []), [w, C] = W(n.preferencesFilter), [k, S] = W(n.preferenceGroups), [E, O] = W(n.preferencesSort), [A, D] = W(n.routerPush), [L, F] = W(Jt(this, $a, a0).call(this, n.container));
    de(this, El, g), de(this, Ga, p), de(this, fu, o), de(this, Rc, s), de(this, du, c), de(this, Lc, f), de(this, hu, d), de(this, Uc, v), de(this, vu, m), de(this, Hc, _), de(this, gu, A), de(this, Bc, D), de(this, bu, n.novu), de(this, pu, w), de(this, Vc, C), de(this, mu, k), de(this, jc, S), de(this, yu, E), de(this, $c, O), de(this, Bl, L), de(this, Dc, F), Jt(this, $a, pw).call(this);
  }
  mountComponent({
    name: n,
    element: i,
    props: o
  }) {
    if (N(this, El).call(this).has(i))
      return Jt(this, $a, mw).call(this, i, o);
    N(this, Ga).call(this, (s) => {
      const c = new Map(s);
      return c.set(i, {
        name: n,
        props: o
      }), c;
    });
  }
  unmountComponent(n) {
    N(this, Ga).call(this, (i) => {
      const o = new Map(i);
      return o.delete(n), o;
    });
  }
  updateAppearance(n) {
    N(this, Rc).call(this, n);
  }
  updateLocalization(n) {
    N(this, Lc).call(this, n);
  }
  updateOptions(n) {
    N(this, Uc).call(this, n);
  }
  updateTabs(n) {
    N(this, Hc).call(this, n ?? []);
  }
  updatePreferencesFilter(n) {
    N(this, Vc).call(this, n);
  }
  updatePreferenceGroups(n) {
    N(this, jc).call(this, n);
  }
  updatePreferencesSort(n) {
    N(this, $c).call(this, () => n);
  }
  updateRouterPush(n) {
    N(this, Bc).call(this, () => n);
  }
  updateContainer(n) {
    N(this, Dc).call(this, Jt(this, $a, a0).call(this, n));
  }
  unmount() {
    var n, i;
    (n = N(this, Fa)) == null || n.call(this), de(this, Fa, null), (i = N(this, $i)) == null || i.remove();
  }
};
Fa = /* @__PURE__ */ new WeakMap();
Bl = /* @__PURE__ */ new WeakMap();
Dc = /* @__PURE__ */ new WeakMap();
$i = /* @__PURE__ */ new WeakMap();
El = /* @__PURE__ */ new WeakMap();
Ga = /* @__PURE__ */ new WeakMap();
fu = /* @__PURE__ */ new WeakMap();
Rc = /* @__PURE__ */ new WeakMap();
du = /* @__PURE__ */ new WeakMap();
Lc = /* @__PURE__ */ new WeakMap();
hu = /* @__PURE__ */ new WeakMap();
Uc = /* @__PURE__ */ new WeakMap();
vu = /* @__PURE__ */ new WeakMap();
Hc = /* @__PURE__ */ new WeakMap();
gu = /* @__PURE__ */ new WeakMap();
Bc = /* @__PURE__ */ new WeakMap();
pu = /* @__PURE__ */ new WeakMap();
Vc = /* @__PURE__ */ new WeakMap();
mu = /* @__PURE__ */ new WeakMap();
jc = /* @__PURE__ */ new WeakMap();
yu = /* @__PURE__ */ new WeakMap();
$c = /* @__PURE__ */ new WeakMap();
bu = /* @__PURE__ */ new WeakMap();
$a = /* @__PURE__ */ new WeakSet();
a0 = function(e) {
  var n;
  return e == null ? e : typeof e == "string" ? (n = document.querySelector(e)) != null ? n : document.getElementById(e) : e;
};
pw = function() {
  if (N(this, Fa) !== null)
    return;
  de(this, $i, document.createElement("div")), N(this, $i).setAttribute("id", `novu-ui-${this.id}`);
  const e = N(this, Bl).call(this);
  (e ?? document.body).appendChild(N(this, $i));
  const n = s6(() => {
    const i = this;
    return b(sE, {
      novuUI: i,
      get nodes() {
        var o;
        return N(o = i, El).call(o);
      },
      get options() {
        var o;
        return N(o = i, hu).call(o);
      },
      get appearance() {
        var o;
        return N(o = i, fu).call(o);
      },
      get localization() {
        var o;
        return N(o = i, du).call(o);
      },
      get tabs() {
        var o;
        return N(o = i, vu).call(o);
      },
      get preferencesFilter() {
        var o;
        return N(o = i, pu).call(o);
      },
      get preferenceGroups() {
        var o;
        return N(o = i, mu).call(o);
      },
      get preferencesSort() {
        var o;
        return N(o = i, yu).call(o);
      },
      get routerPush() {
        var o;
        return N(o = i, gu).call(o);
      },
      get novu() {
        return N(i, bu);
      },
      get container() {
        var o;
        return N(o = i, Bl).call(o);
      }
    });
  }, N(this, $i));
  de(this, Fa, n);
};
mw = function(e, n) {
  N(this, Ga).call(this, (i) => {
    const o = new Map(i), s = o.get(e);
    return s && o.set(e, je(re({}, s), {
      props: n
    })), o;
  });
};
var uE = (e) => {
  const n = ke.useRef(e);
  return n.current = e, n;
};
function fE(e, n) {
  if (!e)
    return;
  const { icons: i, ...o } = e, s = { ...o };
  if (i) {
    const c = {}, f = Object.keys(i);
    for (const d of f) {
      const v = i[d];
      v && (c[d] = (g, p) => n(g, v(p)));
    }
    s.icons = c;
  } else
    delete s.icons;
  return s;
}
var dE = Ki.forwardRef((e, n) => /* @__PURE__ */ tt.jsx(
  "div",
  {
    ref: n,
    style: {
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: 0
    },
    "data-shadow-root-detector": !0,
    ...e
  }
)), _1 = (e) => {
  if (!e)
    return null;
  let n = e;
  for (; n; ) {
    if (n instanceof Element && n.shadowRoot)
      return n.shadowRoot;
    if (n instanceof ShadowRoot)
      return n;
    if (n = n.parentNode, !n || n === document)
      break;
  }
  return null;
}, x1 = ({ options: e, novu: n, children: i }) => {
  const o = ke.useRef(null), { mountElement: s } = Cb(), c = ke.useMemo(
    () => fE(e.appearance || {}, s),
    [e.appearance, s]
  ), f = ke.useMemo(() => ({
    ...e,
    appearance: c,
    novu: n
  }), [e, n, c]), d = uE(f), [v, g] = ke.useState();
  return ke.useEffect(() => {
    const p = _1(o.current), m = new cE({
      ...d.current,
      container: d.current.container ?? p
    });
    return g(m), () => {
      m.unmount();
    };
  }, []), ke.useEffect(() => {
    if (!v)
      return;
    const p = _1(o.current);
    v.updateContainer(e.container ?? p), v.updateAppearance(c), v.updateLocalization(e.localization), v.updateTabs(e.tabs), v.updateOptions(e.options), v.updateRouterPush(e.routerPush);
  }, [
    o,
    v,
    c,
    e.localization,
    e.tabs,
    e.options,
    e.routerPush
  ]), /* @__PURE__ */ tt.jsxs(tt.Fragment, { children: [
    /* @__PURE__ */ tt.jsx(dE, { ref: o }),
    v && /* @__PURE__ */ tt.jsx(Ox, { value: { novuUI: v }, children: i })
  ] });
}, hE = (e) => {
  const {
    open: n,
    renderNotification: i,
    renderAvatar: o,
    renderSubject: s,
    renderBody: c,
    renderDefaultActions: f,
    renderCustomActions: d,
    renderBell: v,
    onNotificationClick: g,
    onPrimaryActionClick: p,
    onSecondaryActionClick: m,
    placement: _,
    placementOffset: w
  } = e, { novuUI: C } = Nx(), { mountElement: k } = Cb(), S = Ki.useCallback(
    (E) => i ? C.mountComponent({
      name: "Inbox",
      props: {
        open: n,
        renderNotification: i ? (O, A) => k(O, i(A)) : void 0,
        renderBell: v ? (O, A) => k(O, v(A)) : void 0,
        onNotificationClick: g,
        onPrimaryActionClick: p,
        onSecondaryActionClick: m,
        placementOffset: w,
        placement: _
      },
      element: E
    }) : C.mountComponent({
      name: "Inbox",
      props: {
        open: n,
        renderAvatar: o ? (O, A) => k(O, o(A)) : void 0,
        renderSubject: s ? (O, A) => k(O, s(A)) : void 0,
        renderBody: c ? (O, A) => k(O, c(A)) : void 0,
        renderDefaultActions: f ? (O, A) => k(O, f(A)) : void 0,
        renderCustomActions: d ? (O, A) => k(O, d(A)) : void 0,
        renderBell: v ? (O, A) => k(O, v(A)) : void 0,
        onNotificationClick: g,
        onPrimaryActionClick: p,
        onSecondaryActionClick: m,
        placementOffset: w,
        placement: _
      },
      element: E
    }),
    [
      n,
      i,
      o,
      s,
      c,
      f,
      d,
      v,
      g,
      p,
      m
    ]
  );
  return /* @__PURE__ */ tt.jsx(Dx, { mount: S });
}, wu = Ki.memo((e) => {
  const { subscriberId: n, ...i } = e, o = Su({ subscriberId: e.subscriberId, subscriber: e.subscriber }), s = e.applicationIdentifier ? e.applicationIdentifier : "";
  if (Ax())
    return /* @__PURE__ */ tt.jsx(S1, { ...i, applicationIdentifier: s, subscriber: o });
  const f = {
    applicationIdentifier: s,
    subscriberHash: e.subscriberHash,
    backendUrl: e.backendUrl,
    socketUrl: e.socketUrl,
    subscriber: o,
    defaultSchedule: e.defaultSchedule
  };
  return /* @__PURE__ */ tt.jsx(Cx, { ...f, userAgentType: "components", children: /* @__PURE__ */ tt.jsx(S1, { ...i, applicationIdentifier: s, subscriber: o }) });
}), S1 = Ux(
  Ki.memo((e) => {
    const {
      localization: n,
      appearance: i,
      tabs: o,
      preferencesFilter: s,
      preferenceGroups: c,
      preferencesSort: f,
      routerPush: d,
      applicationIdentifier: v = "",
      // for keyless we provide an empty string, the api will generate a identifier
      subscriberId: g,
      subscriberHash: p,
      backendUrl: m,
      socketUrl: _,
      subscriber: w,
      defaultSchedule: C
    } = e, k = kx(), S = ke.useMemo(() => ({
      localization: n,
      appearance: i,
      tabs: o,
      preferencesFilter: s,
      preferenceGroups: c,
      preferencesSort: f,
      routerPush: d,
      options: {
        applicationIdentifier: v,
        subscriberHash: p,
        backendUrl: m,
        socketUrl: _,
        subscriber: Su({ subscriberId: g, subscriber: w }),
        defaultSchedule: C
      }
    }), [
      n,
      i,
      o,
      s,
      c,
      f,
      v,
      g,
      p,
      m,
      _,
      w
    ]);
    if (vE(e))
      return /* @__PURE__ */ tt.jsx(x1, { options: S, novu: k, children: e.children });
    const {
      open: E,
      renderNotification: O,
      renderAvatar: A,
      renderSubject: D,
      renderBody: L,
      renderDefaultActions: F,
      renderCustomActions: Y,
      renderBell: ie,
      onNotificationClick: X,
      onPrimaryActionClick: fe,
      onSecondaryActionClick: le,
      placementOffset: ee,
      placement: we
    } = e;
    return /* @__PURE__ */ tt.jsx(x1, { options: S, novu: k, children: /* @__PURE__ */ tt.jsx(
      hE,
      {
        open: E,
        renderNotification: O,
        renderAvatar: A,
        renderSubject: D,
        renderBody: L,
        renderDefaultActions: F,
        renderCustomActions: Y,
        renderBell: ie,
        onNotificationClick: X,
        onPrimaryActionClick: fe,
        onSecondaryActionClick: le,
        placement: we,
        placementOffset: ee
      }
    ) });
  })
);
function vE(e) {
  return "children" in e;
}
const o0 = {
  background: "#000000",
  color: "#ffffff",
  padding: "0 20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  fontSize: "18px",
  fontWeight: "500",
  minWidth: "300px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  gap: "16px",
  cursor: "pointer"
  // Add cursor pointer to indicate it's clickable
}, yw = {
  primary: "#00E676",
  secondary: "#000000"
};
function gE(e, n = {}) {
  if (e) {
    const i = {
      position: "top-center",
      reverseOrder: !1,
      gutter: 8,
      toastOptions: {
        duration: 3e3,
        style: o0,
        success: {
          iconTheme: yw
        }
      },
      ...n
    };
    O1.createRoot(e).render(
      /* @__PURE__ */ tt.jsx(B1, { ...i, children: (s) => /* @__PURE__ */ tt.jsx(
        "div",
        {
          onClick: () => u0.dismiss(s.id),
          children: /* @__PURE__ */ tt.jsx(c0, { toast: s })
        }
      ) })
    );
  }
}
if (typeof window < "u") {
  const e = u0, n = (i, o = {}) => e(i, {
    style: o0,
    duration: 3e3,
    // Set default duration to 3000ms
    ...o
  });
  Object.keys(e).forEach((i) => {
    typeof e[i] == "function" ? n[i] = (o, s = {}) => {
      const c = {
        style: o0,
        duration: 3e3,
        // Set default duration to 3000ms
        ...s
      };
      return i === "success" && !s.iconTheme && (c.iconTheme = yw), e[i](o, c);
    } : n[i] = e[i];
  }), n.dismiss = e.dismiss, window.ReactHotToast = n;
}
const bw = () => /* @__PURE__ */ tt.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ tt.jsx("path", { d: "M12 4C12.5312 4 13 4.46875 13 5V5.625C15.2812 6.0625 17 8.09375 17 10.5V11.3125C17 12.7188 17.4688 14.0938 18.3438 15.2188L18.8125 15.7812C19 16.0312 19.0312 16.3438 18.9062 16.5938C18.7812 16.8438 18.5312 17 18.25 17H5.75C5.4375 17 5.1875 16.8438 5.0625 16.5938C4.9375 16.3438 4.96875 16.0312 5.15625 15.7812L5.625 15.2188C6.5 14.0938 7 12.7188 7 11.3125V10.5C7 8.09375 8.71875 6.0625 11 5.625V5C11 4.46875 11.4375 4 12 4ZM12 7C10.0625 7 8.5 8.59375 8.5 10.5V11.3125C8.5 12.8125 8.0625 14.25 7.25 15.5H16.7188C15.9062 14.25 15.5 12.8125 15.5 11.3125V10.5C15.5 8.59375 13.9062 7 12 7ZM14 18C14 18.5312 13.7812 19.0625 13.4062 19.4375C13.0312 19.8125 12.5312 20 12 20C11.4688 20 10.9375 19.8125 10.5625 19.4375C10.1875 19.0625 10 18.5312 10 18H12H14Z", fill: "#181C25" }) });
typeof window < "u" && (window.NovuReact = {
  Inbox: wu
});
const Wa = /* @__PURE__ */ new Map(), C1 = {
  icons: {
    bell: () => /* @__PURE__ */ tt.jsx(bw, {})
  },
  variables: {
    borderRadius: "8px",
    fontSize: "16px",
    colorShadow: "rgba(0, 0, 0, 0.1)",
    colorNeutral: "#1A1523",
    colorCounterForeground: "#ffffff",
    colorCounter: "#FF444F",
    colorSecondaryForeground: "#1A1523",
    colorPrimaryForeground: "#ffffff",
    colorPrimary: "#FF444F",
    colorForeground: "#181C25",
    colorBackground: "#ffffff"
  },
  elements: {
    popoverTrigger: {
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.04)"
    },
    bellContainer: {
      width: "24px",
      height: "24px"
    },
    bellIcon: {
      width: "24px",
      height: "24px"
    },
    preferences__button: { display: "none" },
    popoverContent: "novu-popover-content"
  }
}, pE = {
  bell: { root: { background: "transparent", color: "black" } },
  popover: { root: { zIndex: 100 } }
}, mE = {
  poweredBy: "Notifications by"
}, yE = {
  "inbox.filters.labels.default": "Notifications"
};
function k1(e, n = {}) {
  if (e) {
    const {
      appearance: i = {},
      styles: o = pE,
      colorScheme: s = "light",
      i18n: c = mE,
      placement: f = "bottom-end",
      localization: d = yE,
      ...v
    } = n, g = {
      ...C1,
      ...i,
      icons: {
        ...C1.icons,
        ...i.icons || {},
        // Always override the bell icon with our React component
        bell: () => /* @__PURE__ */ tt.jsx(bw, {})
      }
    };
    let p;
    Wa.has(e) ? p = Wa.get(e) : (p = O1.createRoot(e), Wa.set(e, p)), p.render(
      /* @__PURE__ */ tt.jsx(
        wu,
        {
          appearance: g,
          styles: o,
          colorScheme: s,
          i18n: c,
          placement: f,
          localization: d,
          ...v
        }
      )
    );
  }
}
function A1(e) {
  e && (Wa.has(e) && (Wa.get(e).unmount(), Wa.delete(e)), e.innerHTML = "");
}
const E1 = {
  background: "#000000",
  color: "#ffffff",
  padding: "0 20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  fontSize: "18px",
  fontWeight: "500",
  minWidth: "300px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  gap: "16px",
  cursor: "pointer"
}, bE = {
  primary: "#00E676",
  secondary: "#000000"
};
if (typeof window < "u") {
  const e = u0, n = (i, o = {}) => e(i, {
    style: E1,
    duration: 3e3,
    // Set default duration to 3000ms
    ...o
  });
  Object.keys(e).forEach((i) => {
    typeof e[i] == "function" ? n[i] = (o, s = {}) => {
      const c = {
        style: E1,
        duration: 3e3,
        // Set default duration to 3000ms
        ...s
      };
      return i === "success" && !s.iconTheme && (c.iconTheme = bE), e[i](o, c);
    } : n[i] = e[i];
  }), n.dismiss = e.dismiss, window.ReactLibs = {
    // React Hot Toast
    ReactHotToast: {
      toast: n,
      Toaster: B1,
      ToastBar: c0,
      renderToaster: gE
    },
    // Novu React
    NovuReact: {
      Inbox: wu,
      renderInbox: k1,
      clearInbox: A1
    }
  }, window.ReactHotToast = n, window.NovuReact = {
    Inbox: wu,
    renderInbox: k1,
    clearInbox: A1
  };
}
export {
  wu as Inbox,
  c0 as ToastBar,
  B1 as Toaster,
  A1 as clearInbox,
  k1 as renderInbox,
  gE as renderToaster,
  u0 as toast
};
