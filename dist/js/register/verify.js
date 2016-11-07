webpackJsonp([3],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _model = __webpack_require__(29);

	var _model2 = _interopRequireDefault(_model);

	var _index = __webpack_require__(15);

	var _route = __webpack_require__(14);

	var _route2 = _interopRequireDefault(_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var controller = _model2.default.registerCtrl('verify-ctrl', '.public-container');

	controller.getDomMap({
	    inputEle: 'input',
	    itemArrs: '.arr-item'
	}).getEvents({
	    'inputEle input': 'getInputEvent',
	    'inputEle blur': 'inputBlurEvent',
	    'inputEle focus': 'inputFocusEvent'
	}).getEventsFn({
	    getInputEvent: function getInputEvent(e) {

	        var target = e.target,
	            value = String() + target.value;

	        if (value.length < 4) {
	            document.querySelector('.red') && _index.util.removeClass(document.querySelector('.red'), 'red');
	            _index.util.addClass(this.domMap.itemArrs[value.length], 'red');
	        } else {
	            if (value.length === 4) {
	                //验证码验证
	                _model2.default.get('/api').then(function (data) {
	                    if (data) _route2.default.go('password');
	                });
	                //出现弹层,给以用户以提示    
	                //dd.dialog.alert('well done');
	            }
	            value.length > 4 && (value = target.value = value.substr(0, 4));
	            _index.util.removeClass(document.querySelector('.red'), 'red');
	        }

	        for (var i = 0; i < value.length; i++) {
	            this.domMap.itemArrs[i].innerHTML = value[i];
	        }

	        for (var j = value.length; j < 4; j++) {
	            this.domMap.itemArrs[j].innerHTML = '';
	        }
	    },
	    inputBlurEvent: function inputBlurEvent() {
	        document.querySelector('.red') && _index.util.removeClass(document.querySelector('.red'), 'red');
	    },
	    inputFocusEvent: function inputFocusEvent(e) {
	        var value = String() + e.target.value,
	            len = value.length;
	        len < 4 && _index.util.addClass(this.domMap.itemArrs[len], 'red');
	    }
	}).getViewInit(function () {});

	module.exports = controller;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(15);

	var model = _index.Model.init();

	model.name = 'verify';

	model.pageInit = function () {};

	model.save();

	exports.default = model;

/***/ }

});