webpackJsonp([2],{

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(27);

	var _model2 = _interopRequireDefault(_model);

	var _index = __webpack_require__(15);

	var _route = __webpack_require__(14);

	var _route2 = _interopRequireDefault(_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('account-ctrl', '.public-container');

	controller.getDomMap({
	    phoneInputEle: '.account-phone',
	    btnEle: '.btn-orange'
	}).getEvents({
	    'phoneInputEle blur': 'checkPhone',
	    'btnEle click': 'getCode'
	}).getEventsFn({
	    checkPhone: function checkPhone() {
	        console.log(123);
	    },
	    getCode: function getCode() {
	        console.log(234);
	        _route2.default.go('verify');
	    }
	}).getViewInit(function () {
	    this.domMap.phoneInputEle.value = _model2.default.phone;
	}).getViewDestory(function () {
	    _model2.default.phone = this.domMap.phoneInputEle.value;
	    _model2.default.setLocItem('phone', _model2.default.phone);
	});

	_route2.default.registerCtrl(_index.util.getCurrPath(), controller);

	module.exports = controller;

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(15);

	var model = _index.Model.init({
	    name: 'account',
	    pageInit: function pageInit() {
	        this.phone = this.getLocItem('phone');
	    }
	});

	console.log(model);

	model.save();

	exports.default = model;

/***/ }

});