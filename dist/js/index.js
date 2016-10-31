webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	
	__webpack_require__(31);
	__webpack_require__(35);
	__webpack_require__(37);
	__webpack_require__(39);
	
	__webpack_require__(41);
	__webpack_require__(43);
	
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
	
	var _xRoute = __webpack_require__(10);
	
	var _aController = __webpack_require__(11);
	
	//import {controllerB} from 'modules/pageB/b-controller';
	//import {controllerC} from 'modules/pageC/controller'
	
	var viewA = __webpack_require__(16);
	//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
	
	var viewB = __webpack_require__(17);
	var viewC = __webpack_require__(18);
	
	_xRoute.route.addRoute('aaa', function () {
	    //modelA.pageInit();
	    var page = document.querySelector('#container');
	    //if (!controller.getInitedStatus) {
	    page.innerHTML = viewA;
	    _aController.controller.init();
	    //}
	}, { cache: 'on' }, _aController.controller.viewDestory, viewA);
	
	_xRoute.route.addRoute('aaa.1', function () {
	    //require.ensure([], function() {
	    var controller = __webpack_require__(19);
	    var page = document.querySelector('#container');
	
	    page.innerHTML = __webpack_require__(21);
	    controller.init();
	    //})
	});
	
	_xRoute.route.addRoute('bbb', function () {
	    //modelB.pageInit();
	    //require.ensure([], function() {
	    var controllerB = __webpack_require__(22);
	    var page = document.querySelector('#container');
	
	    //require('components/index');
	    page.innerHTML = viewB;
	    controllerB.init();
	    //});
	}, { cache: 'on' });
	
	_xRoute.route.addRoute('ccc', function () {
	    //require.ensure([], function() {
	    var controllerC = __webpack_require__(24);
	    var page = document.querySelector('#container');
	    page.innerHTML = viewC;
	    controllerC.init();
	    //})
	});
	
	_xRoute.route.addRoute('ccc.1', function () {
	    var page = document.querySelector('.c-container');
	    page.innerHTML = __webpack_require__(26);
	    console.log('This\'s pagec-1');
	});
	
	_xRoute.route.addRoute('ccc.2', function () {
	    var page = document.querySelector('.c-container');
	    page.innerHTML = __webpack_require__(27);
	    console.log('This\'s pagec-2');
	});
	
	_xRoute.route.addRoute('password', function () {
	    //require.ensure([], function() {
	    var controller = __webpack_require__(28);
	    var page = document.querySelector('#container');
	    page.innerHTML = __webpack_require__(30);
	    controller.init();
	    //})
	});
	
	_xRoute.route.bootstrap();

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.controller = undefined;
	
	var _controller = __webpack_require__(12);
	
	var _aModel = __webpack_require__(13);
	
	var _aModel2 = _interopRequireDefault(_aModel);
	
	var _util = __webpack_require__(3);
	
	var _xRoute = __webpack_require__(10);
	
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
				_xRoute.route.go('aaa.1');
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
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(14);
	
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
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	module.exports = "<!--<div>This is pageA</div>\n\n<div class=\"a-container\" style=\"margin-top: 50px; height: 40px;line-height: 40px;\">\n    姓名: <input type=\"text\" class=\"myName\">\n    电话: <input type=\"number\" class=\"myPhone\">\n</div>\n\n\n<button id=\"name\">name</button>\n<button id=\"name-test\">name test</button>\n<button id=\"age\">点我</button>\n\n\n\n<div class=\"btn\" style=\"margin-top: 50px;\">\n    点击显示城市选择\n</div>\n\n\n<input type=\"file\" id=\"file\" style=\"margin-top: 20px;\"/>\n\n\n<div class=\"alert-btn\" style=\"margin-top: 30px;\">弹窗实验</div>\n\n\n\n<div class=\"city-wrapper\">\n</div>-->\n\n\n<input type=\"number\" maxlength=\"11\" placeholder=\"请输入手机号\" id=\"phone\">\n\n<a  class=\"btn btn-orange\">\n    获取验证码\n</a>\n\n"

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div>This is b.html</div>\n\n<button id=\"btn\">\n    点击我吧\n</button>"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<ul table class=\"pagec-route\">\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-1\">c-route-1</a>\n    </li>\n    <li table=\"cell v-m h-c\">\n        <a data-href=\"ccc-2\">c-route-2</a>\n    </li>\n</ul>\n\n<button id=\"btnc\">\n    按钮C\n</button>\n\n\n<div class=\"c-container\">\n\n</div>"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(20);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _util = __webpack_require__(3);
	
	var _index = __webpack_require__(1);
	
	var _xRoute = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//模块的粒度太大,打包的时候将其他组件也打包进去了
	
	var controller = _model2.default.registerController('modelAA', '#container');
	
	controller.getDomMap({
	    inputEle: 'input',
	    itemEle1: '.arr-item:first-child',
	    itemEle2: '.arr-item:nth-child(2)',
	    itemEle3: '.arr-item:nth-child(3)',
	    itemEle4: '.arr-item:nth-child(4)'
	}).getBindEvents({
	    inputEle: {
	        actionName: 'click',
	        action: function action() {}
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
	
	                _xRoute.route.go('password');
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(14);
	
	var modelAA = _model.totalModel.init();
	
	modelAA.name = 'AA';
	
	modelAA.save();
	
	exports.default = modelAA;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div table class=\"confirm-num\">\n    <p table=\"cell v-m h-c\">验证码已发送至 18510027836</p>\n</div>\n<div table class=\"input-arr\">\n    <input type=\"number\">\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n            \n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n</div>"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _controller = __webpack_require__(12);
	
	var _bModel = __webpack_require__(23);
	
	var _bModel2 = _interopRequireDefault(_bModel);
	
	var _index = __webpack_require__(1);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(14);
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _controller = __webpack_require__(12);
	
	var _model = __webpack_require__(25);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _controller = __webpack_require__(12);
	
	var _model = __webpack_require__(14);
	
	var modelC = _model.totalModel.init();
	
	modelC.name = 'modelC';
	
	modelC.pageInit = function () {
	    console.log('This\'s is page c');
	};
	
	modelC.save();
	
	exports.default = modelC;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<p>This is c-1 index.html</p>"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<section data-role=\"outer\" label=\"Powered by 135editor.com\" style=\"font-family: 微软雅黑; font-size: 16px;\">\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal; text-align: center;\">\n        <strong><span style=\"font-size: 14px; line-height: inherit;\"><strong style=\"color: rgb(62, 62, 62); text-align: center; white-space: normal; font-family: 微软雅黑; line-height: 25.6px;\"><span style=\"font-size: 14px; line-height: inherit;\"><strong style=\"font-family: 隶书, SimLi; line-height: 21px;\"><span style=\"color: rgb(255, 0, 0);\">【点击图片上的戳我图标，可直接下单制作哦<span style=\"line-height: inherit; font-size: 16px;\">^_^</span>】</span></strong></span></strong></span></strong>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <strong><span style=\"font-size: 14px; line-height: inherit;\"><br/></span></strong>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <strong><span style=\"font-size: 14px; line-height: inherit;\">上期的私人订制，令各位小主在欣赏京东企业文化的同时，也体会nara定制美甲的独特魅力，</span><span style=\"font-size: 14px; line-height: inherit;\">温馨服务，快速跃然于指尖，让你大家如痴如醉。</span></strong>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <section class=\"_135editor\" data-tools=\"135编辑器\" data-id=\"87758\" style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal; box-sizing: border-box;\">\n        <section style=\"margin-top: 2px; margin-bottom: 2px; box-sizing: border-box;\">\n            <section class=\"135brush\" style=\"padding: 10px; border: 1px dashed rgb(33, 33, 34); font-size: 14px; line-height: 1.75em; box-sizing: border-box;\">\n                <span style=\"color: #FF4C00;\">今年北京的夏天未免霸道，虽然nara陪着众多小主度过了一场又一场的美甲盛宴，或热辣，或爽利，或激情，或炫酷，但是终究夏天还是就这么的要走了，小编也不得不开始要感怀伤秋起来。</span>\n            </section>\n        </section>\n    </section>\n    <p style=\"white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">感怀之余，小编想起来人生还是需要尽欢，遂放下来手中空对月的金樽，赶紧跟各位小主一起品赏这让人沉醉的秋，</span><span style=\"color: #95B3D7; font-size: 14px;\">秋，无论是华美，亦或是丰盈，都可以在指尖晕染出一抹最恬醉怡人的美。</span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; text-align: center; white-space: normal;\">\n        <br/>\n    </p>\n    <table>\n        <tbody>\n            <tr class=\"firstRow\">\n                <td width=\"500\" valign=\"top\">\n                    <p class=\"product_insert\">\n                        <img src=\"http://image1.nara520.com/images/product/20160921/51f1b3f2-b07b-4796-9b3e-bc008e2b7cc3.png\"/>\n                    </p>\n                    <p style=\"text-align:center\">\n                        <a href=\"http://m.nara520.com/nara/product/itciialw\"><img class=\"gwc\" src=\"http://image2.nara520.com//images/ueditor/20160820/one-step.png\"/></a>\n                    </p>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">这款热情向日葵美甲大胆地运用了金黄色的向日葵图样，通过智能美甲彩绘机的高保真还原效果，<strong>向日葵甚至出现了让人沉醉的金属质感，再搭配火热的大红颜色跳指，整个就是提升你整体气质的利器啊亲！</strong></span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">小编私心想，和男朋友金樽对月的时候，不妨试试这款，看看你的金樽美酒和黄金美甲，他更中意哪一个？</span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; text-align: center; white-space: normal;\">\n        <br/>\n    </p>\n    <table>\n        <tbody>\n            <tr class=\"firstRow\">\n                <td width=\"500\" valign=\"top\">\n                    <p class=\"product_insert\">\n                        <img src=\"http://image1.nara520.com/images/product/20160921/edfc9f1c-91e1-4dff-a281-af5f1a35f3a5.png\"/>\n                    </p>\n                    <p style=\"text-align:center\">\n                        <a href=\"http://m.nara520.com/nara/product/itcimnr5\"><img class=\"gwc\" src=\"http://image2.nara520.com//images/ueditor/20160820/one-step.png\"/></a>\n                    </p>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"color: #95B3D7; font-size: 14px;\">秋之韵，不是萧瑟的沉沦，更应该是暖意的张扬。这款枫叶美型美甲，让可爱的枫叶图样跃然指尖的同时，还应用分量厚重温暖的橘红色，让人心里一下子温暖湿润了起来。</span><span style=\"font-size: 14px;\">秋天带来的是暗红忧伤的落叶，你却把它拾起放在指尖，难道不是因为，你的心里阳关盎然？</span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; text-align: center; white-space: normal;\">\n        <br/>\n    </p>\n    <table>\n        <tbody>\n            <tr class=\"firstRow\">\n                <td width=\"500\" valign=\"top\">\n                    <p class=\"product_insert\">\n                        <img src=\"http://image1.nara520.com/images/product/20160921/79f64a26-a757-40bd-9c91-fa62e748722f.png\"/>\n                    </p>\n                    <p style=\"text-align:center\">\n                        <a href=\"http://m.nara520.com/nara/product/itcipc1t\"><img class=\"gwc\" src=\"http://image2.nara520.com//images/ueditor/20160820/one-step.png\"/></a>\n                    </p>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">最后来看看秋韵的生机款美甲吧，作为时尚潮流的间断翘楚，相信你一定会爱上这种冲撞的美感。<strong>秋天就是要有生趣，秋天就是要红、要绿，要叱咤、要狂野。</strong></span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">这款美甲应用了秋天树木的厚重沧桑感图样，但是却大胆用质感张扬的墨绿色跳指点缀，整体上把秋的野性烘托的恰到好处，你还不赶紧联系nara线下体验店体验？</span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; text-align: center; white-space: normal;\">\n        <br/>\n    </p>\n    <table>\n        <tbody>\n            <tr class=\"firstRow\">\n                <td width=\"500\" valign=\"top\">\n                    <p class=\"product_insert\">\n                        <img src=\"http://image1.nara520.com/images/product/20160921/dd3b78fe-4e45-4f35-bd22-8eaf76451681.png\"/>\n                    </p>\n                    <p style=\"text-align:center;position: relative; top: -20px;\">\n                        <a href=\"http://m.nara520.com/nara/product/itciu27w\"><img class=\"gwc\" src=\"http://image2.nara520.com//images/ueditor/20160820/one-step.png\"/></a>\n                    </p>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"font-size: 14px;\">有一个诗人曾经无限赞叹过春风沉醉的晚上，小编觉得，秋意盎然的晚上不免更有情怀。</span><span style=\"color: #95B3D7; font-size: 14px;\">因为经过了春的沉醉和夏的激荡，秋更应该是人慢慢沉淀的好时节了。这款跳色印花美甲，就是在告诉你一个关于秋夜最美好的故事，值得你慢慢去想，慢慢去品，慢慢去赏。</span>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <br/>\n    </p>\n    <p style=\"font-family: 微软雅黑; line-height: 25.6px; white-space: normal;\">\n        <span style=\"color: #3E3E3E; font-size: 14px; line-height: 22.4px;\">欣赏完定制美甲的独特魅力！各位小主还不赶快行动，联系我们，让nara带给你独特的美甲体验吧~</span>\n    </p>\n</section>"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _model = __webpack_require__(29);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _index = __webpack_require__(1);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(14);
	
	var model = _model.totalModel.init();
	
	model.name = 'password';
	
	model.password = {
	    num: null
	};
	
	model.save();
	
	exports.default = model;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<p>当前注册账号为18811002289</p>\n<input type=\"password\" maxlength=32 placeholder=\"请输入密码\" class=\"first-password\">\n<br/>\n<input type=\"password\" maxlength=32 placeholder=\"请再次输入密码\" class=\"confirm-password\">"

/***/ },
/* 31 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 36 */,
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 38 */,
/* 39 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 40 */,
/* 41 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 42 */,
/* 43 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=index.js.map