webpackJsonp([2,3],{

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _route = __webpack_require__(1);

	var _route2 = _interopRequireDefault(_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PageModel = function () {
	    function PageModel() {
	        _classCallCheck(this, PageModel);

	        this.init();
	    }

	    _createClass(PageModel, [{
	        key: 'init',
	        value: function init() {
	            console.log('This\'s path2 file');

	            document.querySelector('.route-btn').addEventListener('click', function () {
	                _route2.default.go('path1');
	            });
	        }
	    }]);

	    return PageModel;
	}();

	module.exports = PageModel;

/***/ }

});