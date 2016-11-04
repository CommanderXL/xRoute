webpackJsonp([6],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(29);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerCtrl('infoCarCtrl', '.info-container');
	
	controller.getDomMap({}).getEvents({}).getEventsFn({}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(11);
	
	var model = _model.totalModel.init();
	
	model.name = 'infoCar';
	
	model.save();
	
	exports.default = model;

/***/ }

});
//# sourceMappingURL=info-car.js.map