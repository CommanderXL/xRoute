webpackJsonp([3],{

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(9);
	
	var _model = __webpack_require__(28);
	
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

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _controller = __webpack_require__(10);
	
	var _model = __webpack_require__(11);
	
	var modelC = _model.totalModel.init();
	
	modelC.name = 'modelC';
	
	modelC.pageInit = function () {
	    //console.log('This\'s is page c');
	};
	
	modelC.save();
	
	exports.default = modelC;

/***/ }

});
//# sourceMappingURL=page-c.js.map