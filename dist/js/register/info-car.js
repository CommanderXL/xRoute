webpackJsonp([6],{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(35);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('infoCarCtrl', '.info-container');

	controller.getDomMap({}).getEvents({}).getEventsFn({}).getViewInit(function () {});

	module.exports = controller;

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _model = __webpack_require__(17);

	var model = _model.Model.init();

	model.name = 'infoCar';

	model.save();

	exports.default = model;

/***/ }

});