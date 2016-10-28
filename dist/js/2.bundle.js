webpackJsonp([2],{

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _controller = __webpack_require__(4);
	
	var _model = __webpack_require__(24);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controllerC = _model2.default.registerController('controlC', "#container");
	
	controllerC.getDomMap({
	    btn: '#btnc'
	}).getBindEvents({
	    btn: {
	        actionName: 'click',
	        action: function action() {
	            console.log('C按钮点击');
	        }
	    }
	});
	
	module.exports = controllerC;
	
	//export {controllerC};

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _controller = __webpack_require__(4);
	
	var _model = __webpack_require__(6);
	
	var modelC = _model.totalModel.init();
	
	modelC.name = 'modelC';
	
	modelC.pageInit = function () {
	    console.log('This\'s is page c');
	};
	
	modelC.save();
	
	exports.default = modelC;

/***/ }

});
//# sourceMappingURL=2.bundle.js.map