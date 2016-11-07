webpackJsonp([5],{

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(33);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('infoCtrl', '.public-container');

	controller.getDomMap({}).getEvents({}).getEventsFn({}).getViewInit(function () {});

	module.exports = controller;

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _model = __webpack_require__(17);

	var model = _model.Model.init();

	model.name = 'info';

	model.save();

	exports.default = model;

/***/ }

});