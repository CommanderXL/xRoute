webpackJsonp([4],{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(25);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _index = __webpack_require__(9);
	
	var _route = __webpack_require__(8);
	
	var _route2 = _interopRequireDefault(_route);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerCtrl('passwordCtrl', '.public-container');
	
	controller.getDomMap({
	    firPassWord: '.first-password',
	    confirmPassWord: '.confirm-password',
	    btn: '.btn'
	}).getEvents({
	    'firPassWord blur': 'firBlur',
	    'confirmPassWord blur': 'confBlur',
	    'btn click': 'pageGo'
	}).getEventsFn({
	    firBlur: function firBlur(e) {
	        var value = e.target.value;
	        //show some tips
	        (value.length < 6 || value.length > 32 || _index.util.isNumAndStr(value)) && console.log(123);
	    },
	    confBlur: function confBlur(e) {
	        console.log(e.target.value);
	    },
	    pageGo: function pageGo() {
	        _route2.default.go('info.car');
	    }
	}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 25:
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