webpackJsonp([1, 3], {

    /***/
    9:
        /***/
        (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: true
            });
            /* harmony import */
            var __WEBPACK_IMPORTED_MODULE_0__route__ = __webpack_require__(0);
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }



            var PageModel = function () {
                function PageModel(container) {
                    _classCallCheck(this, PageModel);

                    this.container = document.querySelector(container);
                }

                _createClass(PageModel, [{
                    key: 'init',
                    value: function init() {
                        console.log('This\'s path2 file');

                        this.container.querySelector('.route-btn').addEventListener('click', function () {
                            console.log('path2');
                            __WEBPACK_IMPORTED_MODULE_0__route__["a" /* default */ ].go('path1');
                        });
                    }
                }, {
                    key: 'viewDestory',
                    value: function viewDestory() {
                        console.log('well done');
                    }
                }]);

                return PageModel;
            }();

            //module.exports = PageModel;


            /* harmony default export */
            __webpack_exports__["default"] = PageModel;

            /***/
        })

});