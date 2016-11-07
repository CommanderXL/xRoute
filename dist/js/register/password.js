webpackJsonp([4],{

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(31);

	var _model2 = _interopRequireDefault(_model);

	var _index = __webpack_require__(15);

	var _route = __webpack_require__(14);

	var _route2 = _interopRequireDefault(_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('passwordCtrl', '.public-container');

	controller.getDomMap({
	    firPassWord: '.first-password',
	    confirmPassWord: '.confirm-password',
	    btn: '.btn-orange'
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

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(15);

	var model = _index.Model.init({
	    name: 'password',
	    pageInit: function pageInit() {
	        console.log('This\'s is password page');
	    }
	});

	model.save();

	exports.default = model;

/***/ }

});