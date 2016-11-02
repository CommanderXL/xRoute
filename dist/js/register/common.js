/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		6:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "js/register/" + ({"0":"components","1":"index","2":"page-a","3":"page-c","4":"password","5":"lib"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/taxi-driver/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dd = exports.elementSet = exports.util = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dialog = __webpack_require__(4);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, [{
	        key: 'hasClass',
	        value: function hasClass(ele, cls) {
	            return new RegExp(cls).test(ele.className || '');
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(ele, cls) {
	            var _pattern = new RegExp(cls);
	            if (!_pattern.test(ele.className)) ele.className += ' ' + cls;
	            return ele;
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(ele, cls) {
	            //添加对于DOM元素的判断
	            if (!ele || ele.nodeType !== 1) return;
	            var _pattern = new RegExp(cls);
	            if (_pattern.test(ele.className || '')) ele.className = ele.className.replace(_pattern, '');
	            return ele;
	        }
	    }, {
	        key: 'checkUserIds',
	        value: function checkUserIds(uid) {
	            return (/^\d{17}(\d|x)$/.test(uid)
	            );
	        }
	    }, {
	        key: 'isLeapYear',
	        value: function isLeapYear(year) {
	            return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0);
	        }
	    }, {
	        key: 'connectDidiJSBridge',
	        value: function connectDidiJSBridge(callback) {
	            if (window.DidiJSBridge) {
	                callback(DidiJSBridge);
	            } else {
	                document.addEventListener('DidiJSBridgeReady', function () {
	                    callback(DidiJSBridge);
	                }, false);
	            }
	        }
	    }, {
	        key: 'getQueryStr',
	        value: function getQueryStr() {
	            var item = void 0,
	                key = void 0,
	                val = void 0,
	                res = {};
	            var queryStr = window.location.search ? window.location.search.substring(1) : '';
	
	            if (queryStr.indexOf('&') === -1 && queryStr.indexOf('=') > -1) {
	                item = queryStr.split('=');
	                key = decodeURIComponent(item[0]);
	                val = decodeURIComponent(item[1]);
	                if (key) res[key] = val || "";
	                return res;
	            }
	            if (queryStr.indexOf('&') > -1) {
	                items = queryStr.split('&');
	                for (var i = 0, len = items.length; i < len; i++) {
	                    var index = items[i].indexOf('=');
	                    key = decodeURIComponent(items[i].slice(0, index)); //防止token中出现=号未转义的情况,截取字符出现错误
	                    val = decodeURIComponent(items[i].slice(index + 1));
	                    /*item = items[i].split('=');
	                    key = decodeURIComponent(item[0]);
	                    val = decodeURIComponent(item[1]);*/
	                    if (key) res[key] = val;
	                };
	                return res;
	            }
	        }
	    }, {
	        key: 'each',
	        value: function each(obj, fn) {
	            if (obj.length) {
	                for (var i = 0, l = obj.length; i < l; i++) {
	                    if (false === fn.call(obj[i] || {}, i, obj[i])) break;
	                }
	            } else if (this.isObj(obj)) {
	                for (var n in obj) {
	                    if (false === fn.call(obj[n] || {}, n, obj[n])) break;
	                }
	            }
	        }
	    }, {
	        key: 'isObj',
	        value: function isObj(obj) {
	            return Object.prototype.toString.call(obj) === '[object Object]';
	        }
	    }, {
	        key: 'isArr',
	        value: function isArr(arr) {
	            return Object.prototype.toString.call(arr) === '[object Array]';
	        }
	        //对模块进行配置
	
	    }, {
	        key: 'setConfigModule',
	        value: function setConfigModule(arg_map) {
	            var input_map = arg_map.input_map,
	                settable_map = arg_map.settable_map,
	                config_map = arg_map.config_map;
	            for (var key in input_map) {
	                if (input_map.hasOwnProperty(key)) {
	                    if (settable_map.hasOwnProperty(key)) {
	                        config_map[key] = input_map[key];
	                    }
	                } else {
	                    console.error('Require a key name');
	                }
	            }
	        }
	        //埋点配置
	
	    }, {
	        key: 'omegaCb',
	        value: function omegaCb() {
	            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	            var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
	
	            Omega.trackEvent(name, obj, cb);
	        }
	    }, {
	        key: 'isNumAndStr',
	        value: function isNumAndStr(str) {
	            var pattern = /[^0-9a-zA-Z]/;
	            return pattern.test(str);
	        }
	    }]);
	
	    return Util;
	}();
	
	var util = new Util();
	
	//可以使用继承来继承这些方法
	
	var ElementSet = function () {
	    function ElementSet() {
	        _classCallCheck(this, ElementSet);
	    }
	
	    _createClass(ElementSet, [{
	        key: 'css',
	        value: function css(dom, obj) {
	            if (!dom) return;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;
	
	                    dom.style[key] = obj[key];
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(dom, cls) {
	            return dom.classList.contains(cls);
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(dom, cls) {
	            return dom.classList.addClass(cls);
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(dom, cls) {
	            return dom.classList.removeClass(cls);
	        }
	    }]);
	
	    return ElementSet;
	}();
	
	var elementSet = new ElementSet();
	
	exports.util = util;
	exports.elementSet = elementSet;
	exports.dd = _dialog2.default;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	!function (window, undefined) {
	  var dd = window.dd || {};if (!dd || !dd.base) {
	    window.dd = dd;var b = dd.base || {},
	        isObj = function isObj(t) {
	      return "[object Object]" === Object.prototype.toString.call(t);
	    },
	        each = function each(t, e) {
	      if (t.length) for (var n = 0, i = t.length; i > n && !1 !== e.call(t[n] || {}, n, t[n]); n++) {} else if (isObj(t)) for (var o in t) {
	        if (!1 === e.call(t[o] || {}, o, t[o])) break;
	      }
	    };dd.each = each, dd.isObj = isObj, dd.extend = function (t) {
	      return each(arguments, function (e, n) {
	        if (e > 0 && n) for (var i in n) {
	          t[i] = n[i];
	        }
	      }), t;
	    }, b.diffPlatform = function (t) {
	      var e = navigator.userAgent,
	          n = function n(t) {
	        "function" == typeof t && t();
	      };e.match(/(Android)/i) ? n(t.android) : e.match(/(iPhone|iPod|ios|iPad)/i) ? n(t.ios) : e.match(/(Windows phone)/i) ? n(t.wp) : n(t.others);
	    }, b.loadJS = function (t, e) {
	      var n = document.createElement("script");n.type = "text/javascript", n.src = t, document.getElementsByTagName("head")[0].appendChild(n), n.onload = n.onreadystatechange = function () {
	        this.readyState && "loaded" != this.readyState && "complete" != this.readyState || "function" == typeof e && e();
	      };
	    }, b.jsonp = function (t, e) {
	      var n = document.createElement("script");n.type = "text/javascript", n.src = t + (t.indexOf("?") > -1 ? "&" : "?") + "callback=dd.jsonp." + e, document.getElementsByTagName("head")[0].appendChild(n);
	    }, b.touch = function (t, e) {
	      t && "function" == typeof e && (t.addEventListener("touchstart", function (t) {
	        t.target.focus(), t.stopPropagation();
	      }, !1), t.addEventListener("touchmove", function (t) {
	        t.target.setAttribute("moved", "true");
	      }, !1), t.addEventListener("touchend", function (t) {
	        t.target.blur(), "true" !== t.target.getAttribute("moved") ? e(t) : t.target.setAttribute("moved", "false");
	      }, !1));
	    }, b.getElesByKls = function (t, e) {
	      if (t = t ? t : document.body, t.getElementsByClassName) return t.getElementsByClassName(e);for (var n = [], i = t.getElementsByTagName("*"), o = 0, r = i.length; r > o; o++) {
	        i[o].getAttribute && -1 !== i[o].getAttribute("className").indexOf(e) && n.push(i[o]);
	      }return n;
	    }, b.getQueryStr = function () {
	      var t,
	          e,
	          n,
	          i = {},
	          o = location.search.length ? location.search.substring(1) : "";if (!o) return i;if (-1 === o.indexOf("&") && o.indexOf("=") > -1) return t = o.split("="), e = decodeURIComponent(t[0]), n = decodeURIComponent(t[1]), e && (i[e] = n || ""), i;if (o.indexOf("&") > -1) {
	        items = o.split("&");for (var r = 0, a = items.length; a > r; r++) {
	          t = items[r].split("="), e = decodeURIComponent(t[0]), n = decodeURIComponent(t[1]), e && (i[e] = n);
	        }return i;
	      }
	    }, b.txtToJson = function (txt) {
	      if (txt) {
	        var j = {};try {
	          j = JSON.parse(txt);
	        } catch (e) {
	          try {
	            j = eval("(" + txt + ")");
	          } catch (ee) {}
	        }return j;
	      }
	    };var _singleton = function _singleton(t) {
	      var e = null;return function () {
	        return e || (e = t.apply(this, arguments));
	      };
	    },
	        createXhr = function createXhr() {
	      if (window.XMLHttpRequest) return new XMLHttpRequest();try {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (t) {}
	    },
	        _XHR = _singleton(createXhr);b.ajax = function (t) {
	      var e = function e(t) {
	        if (t) {
	          var e = "";for (var n in t) {
	            t.hasOwnProperty(n) && (e += "&" + n + "=" + t[n]);
	          }return e.replace(/^\&/, "");
	        }
	      };if (t) {
	        var n = t.isSequenceReq === !0 ? new _XHR() : createXhr();t.isSequenceReq === !0 && 0 !== n.readyState && n.abort();var i = 0,
	            o = t.timeout;if (t.async !== !1 && (t.async = !0), n.open(t.method, t.url, t.async), n.onreadystatechange = function () {
	          4 === n.readyState && (i && clearTimeout(i), 200 === n.status ? t.succFunc(n.responseText) : t.failFunc(n.responseText));
	        }, "GET" === t.method.toUpperCase()) n.send(null);else if ("POST" === t.method.toUpperCase()) {
	          var r = t.data ? e(t.data) : "";n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(r);
	        }if (o) {
	          var a = o.millisecond || 1e4;i = setTimeout(function () {
	            n.abort(), o.callback && o.callback();
	          }, a);
	        }
	      }
	    }, b.setCookie = function (t, e, n, i) {
	      var o = new Date();n ? o.setTime(o.getTime() + n) : o.setTime(o.getTime() + 2592e6), i === !0 && (i = document.domain.replace(/[\a-\z\A-\Z]+/, ""));var r = i ? ";domain=" + i + ";path=/" : "";document.cookie = t + "=" + escape(e) + ";expires=" + o.toGMTString() + r;
	    }, b.getCookie = function (t) {
	      var e,
	          n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");return e = document.cookie.match(n), e ? unescape(e[2]) : null;
	    }, b.delCookie = function (t, e) {
	      var n = new Date();n.setTime(n.getTime() - 1);var i = b.getCookie(t);e === !0 && (e = document.domain.replace(/[\a-\z\A-\Z]+/, ""));var o = e ? ";domain=" + e + ";path=/" : "";null != i && (document.cookie = t + "=11111;expires=" + n.toGMTString() + o);
	    }, b.clearCookies = function () {
	      var t = document.cookie.match(/[^ =;]+(?=\=)/g);if (t) for (var e = t.length; e--;) {
	        document.cookie = t[e] + "=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
	      }
	    }, b.isArray = function (t) {
	      return "[object Array]" === Object.prototype.toString.call(t);
	    }, b.isObject = function (t) {
	      return "[object Object]" === Object.prototype.toString.call(t);
	    }, b.isFunc = function (t) {
	      return "[object Function]" === Object.prototype.toString.call(t);
	    }, b.collectLog = function (t, e, n) {
	      this.ajax({ method: "GET", url: "/api/v2/weixinapi/collect_log?openid=" + t + "&phone=" + e + n });
	    }, Function.prototype.method = function (t, e) {
	      return this.prototype[t] || (this.prototype[t] = e), this;
	    }, String.method("trim", function () {
	      return this.replace(/^\s+|\s$/g, "");
	    }), String.method("template", function (t) {
	      var e = this,
	          n = t.length,
	          i = "",
	          o = e;if (n) for (var r = t, t = null, a = 0; n > a; a++) {
	        t = r[a], o = e;for (var c in t) {
	          o = o.replace(new RegExp("{" + c + "}", "ig"), t[c]);
	        }i += o;
	      } else if (t) {
	        for (var c in t) {
	          e = e.replace(new RegExp("{" + c + "}", "ig"), t[c]);
	        }i = e;
	      }return i;
	    }), Array.method("contain", function (t) {
	      for (var e in this) {
	        if (this[e] === t) return !0;
	      }return !1;
	    }), dd.base = b;
	  }
	}(window), function (t) {
	  var e = t.dd || {};if (e.dialog) return e.dialog;e.dialog = {};var n = document.documentElement,
	      i = 0,
	      o = null,
	      r = null,
	      a = null,
	      c = { isArray: function isArray(t) {
	      return Array.isArray(t);
	    }, insertDom: function insertDom(t) {
	      document.body.appendChild(t);
	    }, genDom: function genDom(t, e, n) {
	      if (t) if ("[object Object]" === Object.prototype.toString.call(t, null)) {
	        t.type = t.type || "loading", e.style.cssText = t.wallCss, n.style.cssText = t.wrapCss;var i = "<div class='" + t.type + "'>";i += this.genIcon(t.icon), i += this.genTitle(t.title), i += this.genTip(t), i += this.genButtons(t.btns, t.ext) + "</div>", i += this.genClose(t.close), n.innerHTML = i;
	      } else "[object String]" === Object.prototype.toString.call(t, null) ? n.innerHTML = t : "[object HTMLDivElement]" === Object.prototype.toString.call(t, null) && (t.style.display = "inline-block", n.appendChild(t));
	    }, genIcon: function genIcon(t) {
	      if (!t) return "";var e = t.width || "8px",
	          n = t.height || "36px",
	          i = t.url || "//static.xiaojukeji.com/webapp/images/i-plaint.png",
	          o = t.cssText || "",
	          r = "<img src=" + i + ' style="width:' + e + ";height:" + n + ";vertical-align:middle;" + o + '"/>';return '<p class="d-icon">' + r + "</p>";
	    }, genTitle: function genTitle(t) {
	      t = t || {}, t.color = t.color || "", t.size = t.size || "", t.cssText = t.cssText || "";var e = "color:" + t.color + ";font-size: " + t.size + ";" + t.cssText;return t.txt ? '<p class="d-title" style="' + e + '">' + t.txt + "</p>" : "";
	    }, genTip: function genTip(t) {
	      var e = t.tip || {},
	          n = t.title || {};n.txt ? (e.color = e.color || "#666", e.size = e.size || "1.4rem") : (e.color = e.color || "#333", e.size = e.size || "1.6rem");var i = "color:" + e.color + ";font-size:" + e.size + ";";return e.txt ? '<div class="d-tip" style="' + i + '">' + e.txt + "</div>" : "";
	    }, genClose: function genClose(t) {
	      return t ? '<a class="d-close" href="javascript:void(0);" style="' + (t.cssText || "") + '"></a>' : "";
	    }, genButtons: function genButtons(t, e) {
	      var n = "";if (t && this.isArray(t)) {
	        n += '<div class="d-btns clearfix">';for (var i = 0, o = null, r = t.length; r > i; i++) {
	          o = t[i], n += '<a class="' + o.kls + '" id="' + o.id + '">' + o.val + "</a>";
	        }n += "</div>";
	      }return e && "string" == typeof e && (n += '<p class="d-ext">' + e + "</p>"), n;
	    }, addEvents: function addEvents(t) {
	      if (t.close) {
	        var e = r.getElementsByClassName("d-close")[0];e.addEventListener("touchstart", function () {
	          a.hide();
	        }, !1);
	      }if (this.isArray(t.btns) && t.btns.length) for (var n = 0, i = null, o = t.btns.length; o > n; n++) {
	        if (i = t.btns[n]) {
	          var c = i.event || "click",
	              s = document.getElementById(i.id);s && (s.removeEventListener(c, i.handler, !1), s.addEventListener(c, i.handler, !1));
	        }
	      }
	    } },
	      s = function s(t) {
	    return this instanceof s ? (new s.fn.init(t), void 0) : a = new s(t);
	  };s.fn = s.prototype = { constructor: s, init: function init(e) {
	      if (i && (clearTimeout(i), i = 0), e) {
	        var n = document.createElement("div"),
	            a = document.createElement("div");n.id = "d-wall", a.id = "d-wrap", c.genDom(e, n, a), o && document.body.removeChild(o), r && document.body.removeChild(r), c.insertDom(n), c.insertDom(a), o = n, r = a, "[object Object]" === Object.prototype.toString.call(e, null) && t.setTimeout(function () {
	          c.addEvents(e);
	        }, 400);
	      }
	    }, show: function show() {
	      function e(i) {
	        t.removeEventListener(i.type, e, !1), n.reset.call(n);
	      }var n = this;o && r && (n.reset(), o.style.display = "block", r.style.display = "inline-block", t.addEventListener("resize", e, !1), t.addEventListener("scroll", e, !1));
	    }, hide: function hide() {
	      o && r && (o.style.display = "none", r.style.display = "none");
	    }, reset: function reset() {
	      if (o && r) {
	        r.style.top = (n.clientHeight - r.clientHeight - 20) / 2 + "px", r.style.left = (n.clientWidth - r.clientWidth) / 2 + "px";var t = document.body.scrollHeight || document.documentElement.scrollHeight;o.style.width = n.clientWidth + "px", o.style.height = t + "px";
	      }
	    } }, e.dialog.alert = function (t) {
	    var e = {};return "string" == typeof arguments[0] && arguments[0] ? (e.title = arguments[1] || "", e.tip = arguments[0], e.btn = { val: arguments[2] || "我知道了" }) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (e = t), a = s({ type: "alert", icon: e.icon || { url: "//static.xiaojukeji.com/webapp/images/i-plaint.png", width: "8px", height: "36px" }, wallCss: "", wrapCss: "background: #fff;width: 280px;text-align: center;", title: { txt: e.title }, tip: { txt: e.tip }, btns: [{ id: "btn-close", kls: "btn-orange", event: "click", val: e.btn && e.btn.val || "我知道了", handler: function handler(t) {
	          a.hide(), "function" == typeof e.btn.handler && e.btn.handler(t);
	        } }] }), a.show(), a;
	  }, e.dialog.confirm = function (t) {
	    var e = {};"string" == typeof arguments[0] && arguments[0] ? (e.text = arguments[0] || "", e.confirm = {}, e.confirm.handler = arguments[1]) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (e = t);var n = e.cancel || {},
	        i = e.confirm || {},
	        o = [{ id: n.id || "btn-cancel", val: n.val || "取消", kls: n.kls || "btn-white", event: n.event || "click", handler: function handler(t) {
	        a.hide(), "function" == typeof n.handler && n.handler(t);
	      } }, { id: i.id || "btn-ok", val: i.val || "确定", kls: i.kls || "btn-orange", event: i.event || "click", handler: function handler(t) {
	        a.hide(), "function" == typeof i.handler && i.handler(t);
	      } }];return e.swapBtn && o.unshift(o.pop()), a = s({ type: "confirm", title: { txt: e.tip ? e.text : "" }, tip: { txt: e.tip ? e.tip : e.text }, icon: e.icon || { url: "//static.xiaojukeji.com/webapp/images/i-plaint.png", width: "8px", height: "36px" }, close: e.close, wallCss: "", wrapCss: "background: #fff;width: 280px;text-align: center;", btns: o, ext: e.ext }), a.show(), a;
	  }, e.dialog.loading = function (e) {
	    var n = {};return "object" != _typeof(arguments[0]) ? (n.text = arguments[0], n.time = arguments[1] || 0) : n = e, a = s({ type: "loading", wallCss: "", wrapCss: "background:#0c0d0d;opacity:0.7;width:140px;height:140px;", icon: e && e.icon || { width: "40px", height: "40px", url: "//static.xiaojukeji.com/webapp/images/loading_2.gif" }, tip: { txt: n.text || "正在加载", color: "#fff", size: "14px" } }), a.show(), n.time || (n.time = 5e3), i = t.setTimeout(function () {
	      a.hide(), console.log("function" == typeof n.hideCB), "function" == typeof n.hideCB && n.hideCB();
	    }, n.time), a;
	  }, e.dialog.flatLoading = function (e) {
	    var n = {};return "object" != _typeof(arguments[0]) ? (n.text = arguments[0], n.time = arguments[1] || 0) : n = e, a = s({ type: "loading", wallCss: "background:#fff;opacity:1;", wrapCss: "background:#fff;width:140px;height:140px;", icon: e && e.icon || { width: "43px", height: "34px", url: "//static.xiaojukeji.com/webapp/images/i-loading.gif" }, tip: { txt: n.text || "", color: "#666", size: "14px" } }), a.show(), n.time || (n.time = 5e3), i = t.setTimeout(function () {
	      a.hide(), "function" == typeof n.hideCB && n.hideCB();
	    }, n.time), a;
	  }, e.dialog.logoLoading = function (e, n) {
	    return a = s('<div class="loading-logo"></div>'), a.show(), e || (e = 5e3), i = t.setTimeout(function () {
	      a.hide(), "function" == typeof n && n();
	    }, e), a;
	  }, e.dialog.tip = function (e) {
	    var n = {};"object" != _typeof(arguments[0]) ? (n.text = arguments[0], n.time = arguments[1] || 0) : n = e, n.time = parseInt(n.time) || 600, a = s({ type: "tip", wallCss: "background:#fff;", wrapCss: "background:#0c0d0d;width:140px;height:140px;opacity:0.7;", icon: n.icon || { url: "//static.xiaojukeji.com/webapp/images/i-tip.png", width: "45px", height: "45px" }, tip: { txt: n.text || "温馨提醒", color: "#fff", size: "14px" } }), a.show(), i = t.setTimeout(function () {
	      a.hide();
	    }, n.time);
	  }, e.dialog.Fn = s, t.dd = e;
	}(window);
	
	exports.default = dd;

/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map