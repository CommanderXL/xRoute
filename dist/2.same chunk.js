webpackJsonp([2,4],{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(25);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _util = __webpack_require__(3);
	
	var _index = __webpack_require__(10);
	
	var _index2 = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//模块的粒度太大,打包的时候将其他组件也打包进去了
	
	var controller = _model2.default.registerController('modelAA', '#container');
	
	var data1 = [{
	    text: '小美',
	    value: 1
	}, {
	    text: '猪猪',
	    value: 2
	}];
	
	var data2 = [{
	    text: '张三',
	    value: 1
	}, {
	    text: '李四',
	    value: 2
	}, {
	    text: '王五',
	    value: 3
	}, {
	    text: '赵六',
	    value: 4
	}, {
	    text: '吴七',
	    value: 5
	}, {
	    text: '陈八',
	    value: 6
	}, {
	    text: '杜九',
	    value: 7
	}, {
	    text: '黄十',
	    value: 8
	}, {
	    text: '呵呵',
	    value: 9
	}, {
	    text: '哈哈',
	    value: 10
	}, {
	    text: '嘿嘿',
	    value: 11
	}, {
	    text: '啦啦',
	    value: 12
	}];
	
	var data3 = [{
	    text: '开心',
	    value: 1
	}, {
	    text: '生气',
	    value: 2
	}, {
	    text: '搞笑',
	    value: 3
	}, {
	    text: '难过',
	    value: 4
	}];
	var picker = new _index2.Picker({
	    data: [data1, data2, data3],
	    selectedIndex: [0, 1, 2],
	    title: '我们都是小学生'
	});
	
	controller.getDomMap({
	    inputEle: 'input',
	    itemEle1: '.arr-item:first-child',
	    itemEle2: '.arr-item:nth-child(2)',
	    itemEle3: '.arr-item:nth-child(3)',
	    itemEle4: '.arr-item:nth-child(4)',
	    btn: '.btn'
	}).getBindEvents({
	    inputEle: {
	        actionName: 'click',
	        action: function action() {}
	    },
	    btn: {
	        actionName: 'click',
	        action: function action() {
	            picker.show();
	        }
	    }
	}).getViewInit(function () {
	
	    var that = this;
	
	    this.domMap.itemArrs = document.querySelectorAll('.arr-item');
	
	    this.domMap.inputEle.addEventListener('input', function () {
	        var value = String(this.value);
	
	        if (value.length < 4) {
	            document.querySelector('.red') && _util.util.removeClass(document.querySelector('.red'), 'red');
	            _util.util.addClass(that.domMap.itemArrs[value.length], 'red');
	        } else {
	            if (value.length === 4) {
	                //验证码验证
	                _model2.default.get('/api').then(function (data) {
	                    console.log(data);
	                });
	
	                _index.route.go('password');
	                //出现弹层,给以用户以提示    
	                //dd.dialog.alert('well done');
	            }
	            value.length > 4 && (value = this.value = value.substr(0, 4));
	            _util.util.removeClass(document.querySelector('.red'), 'red');
	        }
	
	        for (var i = 0; i < value.length; i++) {
	            that.domMap.itemArrs[i].innerHTML = value[i];
	        }
	
	        for (var j = value.length; j < 4; j++) {
	            that.domMap.itemArrs[j].innerHTML = '';
	        }
	    });
	
	    this.domMap.inputEle.addEventListener('focus', function () {
	        var value = String(this.value),
	            len = value.length;
	        len < 4 && _util.util.addClass(that.domMap.itemArrs[len], 'red');
	    });
	
	    this.domMap.inputEle.addEventListener('blur', function () {
	        document.querySelector('.red') && _util.util.removeClass(document.querySelector('.red'), 'red');
	    });
	});
	
	module.exports = controller;

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(12);
	
	var modelAA = _model.totalModel.init();
	
	modelAA.name = 'AA';
	
	modelAA.save();
	
	exports.default = modelAA;

/***/ },

/***/ 26:
/***/ function(module, exports) {

	module.exports = "<div table class=\"confirm-num\">\n    <p table=\"cell v-m h-c\">验证码已发送至 18510027836</p>\n</div>\n<div table class=\"input-arr\">\n    <input type=\"number\">\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n            \n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n</div>\n\n<div class=\"btn\">点击我</div>"

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(10);
	
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
	
	var _controller = __webpack_require__(11);
	
	var _model = __webpack_require__(12);
	
	var modelC = _model.totalModel.init();
	
	modelC.name = 'modelC';
	
	modelC.pageInit = function () {
	    console.log('This\'s is page c');
	};
	
	modelC.save();
	
	exports.default = modelC;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(30);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _model2.default.registerController('passwordCtrl', '#container');
	
	function pattern() {
	    console.log(222);
	}
	
	controller.getDomMap({
	    firPassWord: '.first-password',
	    confirmPassWord: '.confirm-password'
	}).getBindEvents({
	    firPassWord: {
	        actionName: 'blur',
	        action: function action() {
	            var value = this.value;
	            //show some tips
	            (value.length < 6 || value.length > 32 || _util.util.isNumAndStr(value)) && console.log(123);
	        }
	    },
	    confirmPassWord: {
	        actionName: 'blur',
	        action: function action() {
	            console.log(this.value);
	        }
	    }
	}).getViewInit(function () {});
	
	module.exports = controller;

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(12);
	
	var model = _model.totalModel.init();
	
	model.name = 'password';
	
	model.password = {
	    num: null
	};
	
	model.save();
	
	exports.default = model;

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = "<p>当前注册账号为18811002289</p>\n<input type=\"password\" maxlength=32 placeholder=\"请输入密码\" class=\"first-password\">\n<br/>\n<input type=\"password\" maxlength=32 placeholder=\"请再次输入密码\" class=\"confirm-password\">"

/***/ }

});
//# sourceMappingURL=2.same chunk.js.map