webpackJsonp([1,3],{

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__route__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



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
                __WEBPACK_IMPORTED_MODULE_0__route__["a" /* default */].go('path1');
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

module.exports = PageModel;
//export default PageModel;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)(module)))

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = function (originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ })

});