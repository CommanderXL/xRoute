webpackJsonp([0,2,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(13);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(2);

	var Router = new _index.Route();

	//  路由配置信息
	//  页面销毁的回调放到的controller里面
	Router.home('path1').addRoute({
	    path: 'path1',
	    viewBox: '.public-container',
	    template: __webpack_require__(4),
	    //  挂载controller
	    pageInit: function pageInit() {
	        console.time('route async path1');
	        __webpack_require__.e/* nsure */(1, function () {
	            var controller = __webpack_require__(6);
	            Router.registerCtrl('path1', new controller('.public-container'));
	            console.timeEnd('route async path1');
	        });
	    },

	    //  进入路由跳转之前
	    beforeEnter: function beforeEnter() {},

	    //  路由跳转前
	    beforeLeave: function beforeLeave() {}
	}).addRoute({
	    path: 'path2',
	    viewBox: '.public-container',
	    template: __webpack_require__(5),
	    pageInit: function pageInit() {
	        console.time('route async path2');
	        __webpack_require__.e/* nsure */(1, function () {
	            var controller = __webpack_require__(7);
	            Router.registerCtrl('path2', new controller('.public-container'));
	            console.timeEnd('route async path2');
	        });
	    }
	});

	Router.bootstrap();

	exports.default = Router;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Route = undefined;

	var _xRoute = __webpack_require__(3);

	var _xRoute2 = _interopRequireDefault(_xRoute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Route = _xRoute2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Route = function () {
	    function Route() {
	        _classCallCheck(this, Route);

	        this.routes = {};
	        this.default = '';
	        this.useHash = false;
	        this.id = 0;
	        this.pageCache = {}; //在内存中进行缓存
	        this.pathStack = []; //path stack
	        this.oldPath = '';
	    }

	    _createClass(Route, [{
	        key: 'home',
	        value: function home() {
	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

	            this.default = path;
	            return this;
	        }
	    }, {
	        key: 'pageLoading',
	        value: function pageLoading() {
	            var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

	            this.loading = fn;
	        }
	    }, {
	        key: 'addRoute',
	        value: function addRoute(_ref) {
	            var _ref$path = _ref.path,
	                path = _ref$path === undefined ? '' : _ref$path,
	                pageInit = _ref.pageInit,
	                viewDestory = _ref.viewDestory,
	                _ref$context = _ref.context,
	                context = _ref$context === undefined ? arguments[0] : _ref$context,
	                _ref$template = _ref.template,
	                template = _ref$template === undefined ? '' : _ref$template,
	                _ref$templateUrl = _ref.templateUrl,
	                templateUrl = _ref$templateUrl === undefined ? '' : _ref$templateUrl,
	                _ref$viewBox = _ref.viewBox,
	                viewBox = _ref$viewBox === undefined ? '' : _ref$viewBox,
	                _ref$isHistory = _ref.isHistory,
	                isHistory = _ref$isHistory === undefined ? true : _ref$isHistory;

	            path = path.split('.').join('/');

	            var id = this.id++;

	            this.routes[path] = {
	                path: path,
	                pageInit: pageInit,
	                viewDestory: viewDestory,
	                context: context,
	                template: template,
	                templateUrl: templateUrl,
	                viewBox: viewBox,
	                id: id,
	                inited: false //是否实例化
	            };

	            return this;
	        }

	        //通过物理键返回和前进的path和通过Router前进的所达到的效果不一样. 主要体现在oldPath的获取上.通过维护一个pathStack来保存历史path

	    }, {
	        key: 'handleRoute',
	        value: function handleRoute() {
	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            var _this = this;

	            var isFromHistory = arguments[1];
	            var stateObj = arguments[2];


	            var curContext = void 0,
	                //上下文
	            oldPath = this.oldPath,
	                oldRoute = void 0,
	                newRoute = void 0;

	            /*Event.trigger('routeChange', {
	                oldPath,
	                path
	            })*/

	            var pathArr = path.split('.');

	            //页面销毁(完全忘记怎么写的了...)
	            if (oldRoute = this.routes[oldPath]) {
	                oldRoute.inited = false;

	                if (pathArr.length === 1 && oldPath.split('/').length > 1) {
	                    var _oldPathArr = oldPath.split('/');
	                    this.routes[_oldPathArr[0]].inited = false;
	                }
	                //页面销毁回调
	                //(oldRoute.ctrl && oldRoute.ctrl.viewDestory) && oldRoute.ctrl.viewDestory();
	                if (oldRoute.ctrl && oldRoute.ctrl.viewDestory) {
	                    if (oldRoute.ctrl.viewDestory()) {
	                        var search = stateObj ? '?' + _index.util.getUrlParams(stateObj, true) : '';
	                        history.pushState({ path: oldRoute.path }, null, search + '#/' + oldRoute.path);
	                        return;
	                    }
	                }
	            }
	            //转场
	            //this.loading();

	            //path栈
	            //this.pathStack.push(pathArr.join('/'));

	            this.oldPath = pathArr.join('/');

	            pathArr.forEach(function (item, index) {

	                var _path = pathArr.filter(function (a, b) {
	                    return b <= index;
	                }).join('/');

	                var _route = void 0,
	                    _viewBox = void 0;

	                if (_route = _this.routes[_path]) {

	                    if (!_route.inited) {

	                        _route.inited = true;

	                        _viewBox = document.querySelector(_route.viewBox);

	                        if (!_viewBox) return;

	                        //先改变url
	                        if (index + 1 === pathArr.length) {
	                            if (!_this.useHash) {
	                                //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
	                                if (!isFromHistory) {

	                                    var _search = stateObj ? '?' + _index.util.getUrlParams(stateObj, true) : '';
	                                    history.pushState({ path: _path }, null, _search + '#/' + _path);
	                                    //history.pushState({ path: _path }, null, '#/' + _path);
	                                }
	                            } else {
	                                location.hash = '/' + _path;
	                            }

	                            //激活状路由样式处理
	                            _this.routeClassHandle(_path);

	                            //return true;
	                        }

	                        //调整容器的滚动轴
	                        //_viewBox.scrollTop = '0';
	                        //渲染视图
	                        _viewBox.innerHTML = _route.template;

	                        //页面逻辑初始化
	                        _route.pageInit.call(_route.context || window);
	                    }
	                }
	            });

	            return false;
	        }
	    }, {
	        key: 'routeClassHandle',
	        value: function routeClassHandle(hash) {
	            hash = hash.split('/').join('-');
	        }
	    }, {
	        key: 'go',
	        value: function go(path, stateObj) {
	            var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            //path = path.split('.').join('/');
	            this.handleRoute(path, flag, stateObj);
	        }
	    }, {
	        key: 'back',
	        value: function back() {
	            history.go(-1);
	        }

	        //  注册控制器

	    }, {
	        key: 'registerCtrl',
	        value: function registerCtrl(path, ctrl) {
	            path = path.split('.').join('/');

	            this.routes[path] ? this.routes[path].ctrl = ctrl : '';

	            //  控制器初始化
	            ctrl.init();
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this2 = this;

	            if (!history.pushState) this.useHash = true;

	            if (!this.useHash) {
	                window.addEventListener('popstate', function (e) {
	                    var state = e.state;

	                    if (state && state.path) _this2.handleRoute(state.path.split('/').join('.'), true);

	                    //TODO 添加对于state为空的情况的处理
	                });
	            } else {
	                window.addEventListener('hashchange', function (e) {
	                    var _path = location.hash.slice(2).split('/').join('.');
	                    _this2.handleRoute(_path);
	                });
	            }

	            //拦截a标签上的点击事件 
	            /**
	             * <a data-href="account"></a>       #/account
	             * <a data-href="account.info"></a>  #/account/info
	             */
	            document.addEventListener('click', function (e) {
	                var href = e.target.dataset.href || '',
	                    oldHash = location.hash.slice(2);

	                //将data-href数据形式转化为路由形式
	                href = href.split('-').join('/'); //将data-href='ccc-aaa' --->>> 转化为 ccc/aaa  外部写法可能存在出入,但是在内部统一转化为a/b/c/d的形式

	                if (href) {
	                    //添加钩子 路由进行跳转时模型model上数据的处理
	                    if (href === oldHash) return;

	                    if (_this2.handleRoute(href)) {
	                        //阻止默认事件
	                        e.preventDefault();
	                    }
	                }
	            });

	            document.addEventListener('DOMContentLoaded', function (e) {

	                var router = _this2.routes[_this2.default],
	                    currHash = location.hash.slice(2),
	                    flag = false,
	                    //是否找到对应路由完成初始化
	                viewBox = null;

	                //this.pathStack.push(currHash);
	                _this2.oldPath = currHash;

	                var pathArr = currHash.split('/');

	                //非初始化的页面刷新 
	                /**
	                 * example.com/#/account/register
	                 */
	                pathArr.forEach(function (item, index) {

	                    var _path = pathArr.filter(function (a, b) {
	                        return b <= index;
	                    }).join('/');

	                    var _route = void 0,
	                        _viewBox = void 0;

	                    if (_route = _this2.routes[_path]) {

	                        _route.inited = true;

	                        _viewBox = document.querySelector(_route.viewBox);

	                        if (!_viewBox) return;

	                        //TODO 钩子  页面加载前执行
	                        /*if(_route.ctrl && _route.ctrl.viewInit) {
	                            if(!_route.ctrl.viewInit()) return;
	                        }*/

	                        //TODO 将初始化的路由压入栈
	                        if (index + 1 === pathArr.length) {
	                            if (!_this2.useHash) {
	                                history.replaceState({ path: currHash }, null, '#/' + currHash);
	                            } else {
	                                location.hash = '/' + currHash;
	                            }
	                        }

	                        _viewBox.innerHTML = _route.template;

	                        _route.pageInit.call(_route.context || window);

	                        flag = true;
	                    }
	                });

	                //初始化active.route样式处理
	                _this2.routeClassHandle(currHash);

	                //首页渲染
	                if (!flag) {
	                    //TODO 页面初始化钩子
	                    /*if(router.ctrl && router.ctrl.viewInit) {
	                        if(!router.ctrl.viewInit()) return;
	                    }*/

	                    viewBox = document.querySelector(router.viewBox);
	                    //渲染视图
	                    viewBox.innerHTML = router.template;

	                    router.pageInit.call(router.context || window);

	                    if (!_this2.useHash) {
	                        history.replaceState({ path: router.path }, null, '#/' + router.path);
	                    } else {
	                        location.hash = '/' + router.path;
	                    }
	                }

	                //!flag ? router.pageInit.call(router.context || window) : '';
	            });
	        }
	    }]);

	    return Route;
	}();

	exports.default = Route;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"route-btn\">This is path1 file</div>";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"route-btn\">This is path2 file</div>";

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);