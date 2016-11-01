webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	
	__webpack_require__(32);
	__webpack_require__(36);
	__webpack_require__(38);
	__webpack_require__(40);
	
	__webpack_require__(42);
	__webpack_require__(44);
	
	//import 'babel-polyfill';

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(10);
	
	var _aController = __webpack_require__(15);
	
	//import {controllerB} from 'modules/pageB/b-controller';
	//import {controllerC} from 'modules/pageC/controller'
	
	var viewA = __webpack_require__(17);
	//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
	
	var viewB = __webpack_require__(18);
	var viewC = __webpack_require__(19);
	
	//require.ensure([], function() {}, str)  
	//这里接收的第三个参数用以将异步加载的模块都打包成一个文件.不同于entry和CommonChunkPlugin的作用
	
	
	_index.route.addRoute('aaa', function () {
	    //modelA.pageInit();
	    var page = document.querySelector('#container');
	    //if (!controller.getInitedStatus) {
	    page.innerHTML = viewA;
	    _aController.controller.init();
	    //}
	}, { cache: 'on' }, _aController.controller.viewDestory, viewA);
	
	_index.route.addRoute('aaa.1', function () {
	    __webpack_require__.e/* nsure */(2, function () {
	        var controller = __webpack_require__(24);
	        var page = document.querySelector('#container');
	
	        page.innerHTML = __webpack_require__(26);
	        controller.init();
	    });
	});
	
	_index.route.addRoute('bbb', function () {
	    //modelB.pageInit();
	    //require.ensure([], function() {
	    var controllerB = __webpack_require__(20);
	    var page = document.querySelector('#container');
	
	    //require('components/index');
	    page.innerHTML = viewB;
	    controllerB.init();
	    //});
	}, { cache: 'on' });
	
	_index.route.addRoute('ccc', function () {
	    __webpack_require__.e/* nsure */(3, function () {
	        var controllerC = __webpack_require__(27);
	        var page = document.querySelector('#container');
	        page.innerHTML = viewC;
	        controllerC.init();
	    });
	});
	
	_index.route.addRoute('ccc.1', function () {
	    var page = document.querySelector('.c-container');
	    page.innerHTML = __webpack_require__(22);
	    console.log('This\'s pagec-1');
	});
	
	_index.route.addRoute('ccc.2', function () {
	    var page = document.querySelector('.c-container');
	    page.innerHTML = __webpack_require__(23);
	    console.log('This\'s pagec-2');
	});
	
	_index.route.addRoute('password', function () {
	    __webpack_require__.e/* nsure */(4, function () {
	        var controller = __webpack_require__(29);
	        var page = document.querySelector('#container');
	        page.innerHTML = __webpack_require__(31);
	        controller.init();
	    });
	});
	
	_index.route.bootstrap();

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.controller = undefined;
	
	var _aModel = __webpack_require__(16);
	
	var _aModel2 = _interopRequireDefault(_aModel);
	
	var _util = __webpack_require__(3);
	
	var _index = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*import {timeSelectComponent, cityComponent, dd} from 'components/index';*/
	/*import {canvasResize} from 'jsLib/imgResize';*/
	
	var controller = _aModel2.default.registerController('controlA', '#container');
	
	controller.getDomMap({
		phoneEle: '#phone',
		registerBtnEle: '.btn'
	}).getBindEvents({
		phoneEle: {
			actionName: 'blur',
			action: function action() {
				console.log(this.value);
			}
		},
		registerBtnEle: {
			actionName: 'click',
			action: function action() {
				console.log('btn');
				_index.route.go('aaa.1');
			}
		}
	}).getViewInit(function () {
		document.title = '注册';
	});
	
	/*controller
		.getDomMap({
			aContainer: '.a-container',
			myName: '.myName',
			myPhone: '.myPhone'
		})
		.getBindEvents({
			aContainer: {
				actionName: 'click',
				action() {
					elementSet.css(this, { color: 'red' });
				}
			},
			myName: {
				actionName: 'input',
				action(e) {
					console.log(this.value);
				}
			},
			myPhone: {
				actionName: 'input',
				action(e) {
					console.log(this.value);
				}
			}
		})*/
	//页面状态初始化.从localstorage中获取
	/*	.getViewInit(function () {
			let doms = this.domMap;
			doms.myName.value = modelA.submitData.name;
	
			let timeSelect = new timeSelectComponent();
	
			var nameEl = document.getElementById('name');
	
			timeSelect.configModule({
				startYearArr: [1972],
				containerArr: ['#name', '#name-test'],
				callbackArr: [function (time) {
					console.log(time);
				}]
			});
			//timeSelect.initTimeModule();
			timeSelect.initAlphaModule();
	
			let json = require('../../components/city-select/city-json'),
				_cityComponent = new cityComponent();
	
	
	
			_cityComponent.configModule({
				allCities: json.data,
				succCb(data) {
					console.log(data);
				},
				failCb() {
					console.log('请选择城市');
				}
			});
	
	
			let cityWrapper = document.querySelector('.city-wrapper'),
				clickBtn = document.querySelector('.btn'),
				dialogBtn = document.querySelector('.alert-btn');
	
			let dialog = dd.dialog || {};
	
			_cityComponent.initModule(cityWrapper);
	
			//城市组件
			clickBtn.addEventListener('click', function () {
				util.addClass(cityWrapper, 'city-box-show');
			});
	
			//弹窗组件
			dialogBtn.addEventListener('click', function() {
				dialog.alert('It\'s a good job');
			});
	
			let imgContainer = document.getElementById('file');
			imgContainer.addEventListener('change', function (e) {
				let file = this.files[0];
				if (!file) return;
	
				//图片压缩
				canvasResize(file, {
					crop: false,
					quality: 0.1,
					rotate: 0,
					callback(baseStr) {
						let img = new Image();
						img.src = baseStr;
						document.body.appendChild(img);
					}
				})
			});
		})
		.getViewDestory(function() {
			//console.log('PageA is leaving now');
			//console.log(modelA.submitData);
			let pickerEl = document.querySelector('.picker');
			document.body.removeChild(pickerEl);
		});*/
	
	exports.controller = controller;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(12);
	
	var modelA = _model.totalModel.init();
	
	modelA.name = 'modelA';
	modelA.setLocItem(modelA.name, 'HELLO WORLD');
	modelA.submitData = {
	    name: '',
	    phone: null,
	    sex: ''
	};
	//数据模型初始化
	modelA.pageInit = function () {
	    this.submitData.name = modelA.getLocItem(this.name);
	};
	modelA.save();
	
	//console.log(totalModel);
	console.log(modelA.pageInit.valueOf());
	
	exports.default = modelA;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<!--<div>This is pageA</div>\n\n<div class=\"a-container\" style=\"margin-top: 50px; height: 40px;line-height: 40px;\">\n    姓名: <input type=\"text\" class=\"myName\">\n    电话: <input type=\"number\" class=\"myPhone\">\n</div>\n\n\n<button id=\"name\">name</button>\n<button id=\"name-test\">name test</button>\n<button id=\"age\">点我</button>\n\n\n\n<div class=\"btn\" style=\"margin-top: 50px;\">\n    点击显示城市选择\n</div>\n\n\n<input type=\"file\" id=\"file\" style=\"margin-top: 20px;\"/>\n\n\n<div class=\"alert-btn\" style=\"margin-top: 30px;\">弹窗实验</div>\n\n\n\n<div class=\"city-wrapper\">\n</div>-->\n\n\n<input type=\"number\" maxlength=\"11\" placeholder=\"请输入手机号\" id=\"phone\">\n\n<a  class=\"btn btn-orange\">\n    获取验证码\n</a>\n\n"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div>This is b.html</div>\n\n<button id=\"btn\">\n    点击我吧\n</button>"

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<ul table class=\"pagec-route\">\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-1\">c-route-1</a>\n    </li>\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-2\">c-route-2</a>\n    </li>\n</ul>\n\n<button id=\"btnc\">\n    按钮C\n</button>\n\n\n<div class=\"c-container\">\n\n</div>"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(10);
	
	var _bModel = __webpack_require__(21);
	
	var _bModel2 = _interopRequireDefault(_bModel);
	
	var _index2 = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(12);
	
	var modelB = _model.totalModel.init();
	modelB.name = 'modelB';
	modelB.pageInit = function () {
	    console.log('This\'s is page B');
	};
	modelB.save();
	
	//console.log(modelB.pageInit.valueOf());
	
	//console.log(totalModel.find('modelA'), totalModel.find('modelB'));
	
	
	exports.default = modelB;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<p>This is c-1 index.html</p>"

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=index.js.map