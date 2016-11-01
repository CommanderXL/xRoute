webpackJsonp([4],{

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(30);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerController('passwordCtrl', '#container');
	
	function pattern() {
	    console.log(222);
	}
	
	controller.getDomMap({
	    firPassWord: '.first-password',
	    confirmPassWord: '.confirm-password'
	}).getBindEvents({
	    firPassWord: {
	        actionName: 'blur',
	        action: function action() {
	            var value = this.value;
	            //show some tips
	            (value.length < 6 || value.length > 32 || _util.util.isNumAndStr(value)) && console.log(123);
	        }
	    },
	    confirmPassWord: {
	        actionName: 'blur',
	        action: function action() {
	            console.log(this.value);
	        }
	    }
	}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(12);
	
	var model = _model.totalModel.init();
	
	model.name = 'password';
	
	model.password = {
	    num: null
	};
	
	model.save();
	
	exports.default = model;

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = "<p>当前注册账号为18811002289</p>\n<input type=\"password\" maxlength=32 placeholder=\"请输入密码\" class=\"first-password\">\n<br/>\n<input type=\"password\" maxlength=32 placeholder=\"请再次输入密码\" class=\"confirm-password\">"

/***/ }

});
//# sourceMappingURL=4.4.js.map