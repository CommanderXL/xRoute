webpackJsonp([5],{

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(33);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('infoCtrl', '.public-container');

	controller.getDomMap({}).getEvents({}).getEventsFn({}).getViewInit(function () {
	    for (var key in _model2.default.parent.records) {
	        console.log(_model2.default.parent.records[key].pageInit.valueOf());
	    }
	});

	module.exports = controller;

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(15);

	var model = _index.Model.init({
	    name: 'info',
	    pageInit: function pageInit() {}
	});

	model.save();

	exports.default = model;

/***/ }

});