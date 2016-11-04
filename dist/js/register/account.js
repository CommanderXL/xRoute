webpackJsonp([2],{

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(21);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _index = __webpack_require__(9);
	
	var _route = __webpack_require__(8);
	
	var _route2 = _interopRequireDefault(_route);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerCtrl('account-ctrl', '.public-container');
	
	controller.getDomMap({
	    phoneInputEle: '.account-phone',
	    btnEle: '.btn'
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

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(11);
	
	var model = _model.totalModel.init();
	
	model.name = 'account';
	
	model.pageInit = function () {
	    this.phone = this.getLocItem('phone');
	};
	
	model.save();
	
	exports.default = model;

/***/ }

});
//# sourceMappingURL=account.js.map