webpackJsonp([2,3],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsLib_index__ = __webpack_require__(1);


var Router = new __WEBPACK_IMPORTED_MODULE_0_jsLib_index__["a" /* Route */]();

//  路由配置信息
//  页面销毁的回调放到的controller里面
Router.home('path1').addRoute({
    path: 'path1',
    animate: 'zoomIn',
    viewBox: '.public-path1-container',
    template: __webpack_require__(4),
    //  挂载controller
    pageInit: function pageInit() {
        var _this = this;

        console.time('route async path1');
        __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 7)).then(function (controller) {
            return Router.registerCtrl('path1', new controller(_this.viewBox));
        });
        /*require.ensure([], () => {
            let controller = require('modules/path1/controller');
            Router.registerCtrl('path1', new controller(this.viewBox));
            console.timeEnd('route async path1');
        }, 'path');*/
    },

    //  进入路由跳转之前
    beforeEnter: function beforeEnter() {},

    //  路由跳转前
    beforeLeave: function beforeLeave() {}
}).addRoute({
    path: 'path2',
    viewBox: '.public-path2-container',
    animate: 'zoomIn',
    template: __webpack_require__(5),
    pageInit: function pageInit() {
        var _this2 = this;

        console.time('route async path2');
        __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 8)).then(function (controller) {
            return Router.registerCtrl('path2', new controller(_this2.viewBox));
        });
        /*require.ensure([], () => {
            let controller = require('modules/path2/controller');
            Router.registerCtrl('path2', new controller(this.viewBox));
            console.timeEnd('route async path2');
        }, 'path');*/
    },
    beforeEnter: function beforeEnter() {},
    beforeLeave: function beforeLeave() {}
});

Router.bootstrap();

/* harmony default export */ __webpack_exports__["a"] = Router;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsLib_xRoute__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_jsLib_xRoute__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jsLib_index__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var noop = function noop() {};

//  动画类型映射
var animateMap = {
    slideInLeft: 'slide-in-left',
    slideInRight: 'slide-in-right',
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    zoomIn: 'zoom-in',
    zoomOut: 'zoom-out'
};

//  淡出动画类型映射
var animateOutMap = {
    slideInLeft: 'slide-out-left',
    slideInRight: 'slide-out-right',
    fadeIn: 'fade-out',
    fadeOut: 'fade-in',
    zoomIn: 'zoom-out',
    zoomOut: 'zoom-in'
};

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
            var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

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
                _ref$animate = _ref.animate,
                animate = _ref$animate === undefined ? 'default' : _ref$animate,
                _ref$isHistory = _ref.isHistory,
                isHistory = _ref$isHistory === undefined ? true : _ref$isHistory,
                _ref$beforeEnter = _ref.beforeEnter,
                beforeEnter = _ref$beforeEnter === undefined ? noop : _ref$beforeEnter,
                _ref$beforeLeave = _ref.beforeLeave,
                beforeLeave = _ref$beforeLeave === undefined ? noop : _ref$beforeLeave;

            path = path.split('.').join('/');

            var id = this.id++;

            this.routes[path] = {
                path: path,
                pageInit: pageInit,
                viewDestory: viewDestory,
                context: context,
                template: template,
                templateUrl: templateUrl,
                animate: animate,
                viewBox: viewBox,
                id: id,
                inited: false, //是否实例化
                beforeEnter: beforeEnter,
                beforeLeave: beforeLeave
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

            var oldPathMap = this.routes[oldPath];
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
                        var search = stateObj ? '?' + __WEBPACK_IMPORTED_MODULE_0_jsLib_index__["util"].getUrlParams(stateObj, true) : '';
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
                        (function () {

                            _route.inited = true;

                            var _context = _route.context || window;

                            //先改变url
                            if (index + 1 === pathArr.length) {
                                if (!_this.useHash) {
                                    //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
                                    if (!isFromHistory) {
                                        var _search = stateObj ? '?' + __WEBPACK_IMPORTED_MODULE_0_jsLib_index__["util"].getUrlParams(stateObj, true) : '';
                                        history.pushState({ path: _path }, null, _search + '#/' + _path);
                                    }
                                } else {
                                    location.hash = '/' + _path;
                                }
                                //return true;
                            }

                            var vb = _this.initContainer(_route, isFromHistory, oldPathMap);

                            //如果是浏览器触发的回退操作
                            if (isFromHistory) {
                                (function () {
                                    var oldContainer = document.querySelector(oldPathMap.viewBox);
                                    oldContainer.style.zIndex = 999;
                                    oldContainer.classList.add(animateOutMap[oldPathMap.animate]);
                                    oldContainer.addEventListener('animationend', function () {
                                        document.body.removeChild(oldContainer);
                                    });
                                })();
                            } else {
                                (function () {
                                    var viewBoxCls = oldPathMap.viewBox;
                                    vb.addEventListener('animationend', function animateEndHandler() {
                                        //  消除上一个容器
                                        document.body.removeChild(document.querySelector(viewBoxCls));
                                        //  动画结束消除绑定事件
                                        vb.removeEventListener('animationend', animateEndHandler);
                                    });
                                })();
                            }
                        })();
                    }
                }
            });

            return false;
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

                        //上下文
                        var _context = _route.context || window;

                        //TODO 将初始化的路由压入栈
                        if (index + 1 === pathArr.length) {
                            if (!_this2.useHash) {
                                history.replaceState({ path: currHash }, null, '#/' + currHash);
                            } else {
                                location.hash = '/' + currHash;
                            }
                        }

                        _this2.initContainer(_route);

                        flag = true;
                    }
                });
                //首页渲染
                if (!flag) {
                    _this2.initContainer(router);
                    if (!_this2.useHash) {
                        history.replaceState({ path: router.path }, null, '#/' + router.path);
                    } else {
                        location.hash = '/' + router.path;
                    }
                }

                //!flag ? router.pageInit.call(router.context || window) : '';
            });
        }
        //  容器初始化并挂载

    }, {
        key: 'initContainer',
        value: function initContainer(route) {
            var isFromHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var oldPathMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            //beforeEnter钩子
            route.beforeEnter.call(route.context);

            var vb = document.createElement('div');
            vb.className = 'public-container ' + route.viewBox.slice(1) + ' ' + (!isFromHistory ? animateMap[route.animate] : '');
            vb.innerHTML = route.template;
            document.body.appendChild(vb);
            route.pageInit.call(route.context || window);

            return vb;
        }
    }]);

    return Route;
}();

/* harmony default export */ __webpack_exports__["a"] = Route;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"path1-container\">\n  <div class=\"route-btn\">This is path1 file</div>\n</div>\n";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"path2-container\">\n  <div class=\"route-btn\">This is path2 file</div>\n</div>\n";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__route__ = __webpack_require__(0);
__webpack_require__(2);


/***/ })
],[6]);