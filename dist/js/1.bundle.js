webpackJsonp([1],{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _controller = __webpack_require__(4);
	
	var _bModel = __webpack_require__(25);
	
	var _bModel2 = _interopRequireDefault(_bModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controllerB = _bModel2.default.registerController('controlB', '#container');
	
	controllerB.getDomMap({
	    clickBtn: '#btn'
	}).getBindEvents({
	    clickBtn: {
	        actionName: 'click',
	        action: function action() {
	            console.log('Well done');
	        }
	    }
	}).getViewInit(function () {
	    console.log(123);
	});
	
	/*export {
	    controllerB
	}*/
	
	module.exports = controllerB;
	
	//controllerB.init();

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(6);
	
	var modelB = _model.totalModel.init();
	modelB.name = 'modelB';
	modelB.pageInit = function () {
	    console.log('This\'s is page B');
	};
	modelB.save();
	
	//console.log(modelB.pageInit.valueOf());
	
	//console.log(totalModel.find('modelA'), totalModel.find('modelB'));
	
	
	exports.default = modelB;

/***/ }

});
//# sourceMappingURL=1.bundle.js.map