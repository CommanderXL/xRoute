webpackJsonp([4],{

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(23);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _index = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerCtrl('passwordCtrl', '.public-container');
	
	controller.getDomMap({
	    firPassWord: '.first-password',
	    confirmPassWord: '.confirm-password'
	}).getEvents({
	    'firPassWord blur': 'firBlur',
	    'confirmPassWord blur': 'confBlur'
	}).getEventsFn({
	    firBlur: function firBlur(e) {
	        var value = e.target.value;
	        //show some tips
	        (value.length < 6 || value.length > 32 || _index.util.isNumAndStr(value)) && console.log(123);
	    },
	    confBlur: function confBlur(e) {
	        console.log(e.target.value);
	    }
	}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(11);
	
	var model = _model.totalModel.init();
	
	model.name = 'password';
	
	model.password = {
	    num: null
	};
	
	model.save();
	
	exports.default = model;

/***/ }

});
//# sourceMappingURL=password.js.map