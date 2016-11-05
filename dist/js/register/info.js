webpackJsonp([5],{

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(32);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerCtrl('infoCtrl', '.public-container');
	
	controller.getDomMap({}).getEvents({}).getEventsFn({}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(16);
	
	var model = _model.totalModel.init();
	
	model.name = 'info';
	
	model.save();
	
	exports.default = model;

/***/ }

});
//# sourceMappingURL=info.js.map