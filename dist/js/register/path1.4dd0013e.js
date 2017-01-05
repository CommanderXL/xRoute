webpackJsonp([1,3],{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _route = __webpack_require__(1);

	var _route2 = _interopRequireDefault(_route);

	__webpack_require__(8);

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
	            console.log('This\'s path1 file');

	            document.querySelector('.route-btn').addEventListener('click', function () {
	                _route2.default.go('path2');
	            });
	        }
	    }]);

	    return PageModel;
	}();

	module.exports = PageModel;

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.25.0@css-loader/index.js!./../../../node_modules/.2.2.3@less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../../../node_modules/.0.25.0@css-loader/index.js!./../../../node_modules/.2.2.3@less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "div {\n  font-size: 15px;\n}\n", ""]);

	// exports


/***/ }

});