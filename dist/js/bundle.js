webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(22);
	__webpack_require__(24);
	__webpack_require__(26);
	__webpack_require__(28);
	
	//import 'babel-polyfill';

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _xRoute = __webpack_require__(2);
	
	var _aController = __webpack_require__(3);
	
	var viewA = __webpack_require__(20);
	//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
	/*import {modelA} from './modules/pageA/a-model';
	import {modelB} from './modules/pageB/b-model';*/
	
	var viewB = __webpack_require__(21);
	
	_xRoute.route.addRoute('aaa', function () {
	    //modelA.pageInit();
	    var page = document.querySelector('#container');
	    //if (!controller.getInitedStatus) {
	    page.innerHTML = viewA;
	    _aController.controller.init();
	    //}
	}, { cache: 'on' }, _aController.controller.viewDestory, viewA);
	
	_xRoute.route.addRoute('bbb', function () {
	    //modelB.pageInit();
	    var page = document.querySelector('#container');
	    page.innerHTML = __webpack_require__(21);
	}, { cache: 'on' });
	
	_xRoute.route.bootstrap();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Router = [],
	    useHash = false,
	    pageCache = {}; //在内存中进行缓存
	
	//一开始的判断是否支持H5 API
	if (!history.pushState) useHash = true;
	
	//不管是否支持H5 API, 统一的路由格式为:
	//  #/a/b/c
	
	//如果支持H5 API
	if (!useHash) {
	    window.addEventListener('popstate', function (e) {
	        var state = e.state;
	        //路由的处理
	        if (state && state.path) {
	            handleRoute(state.path, true);
	        }
	    });
	} else {
	    //hash发生变化时监听的方式,因为hashchange事件浏览器的支持度已经比较高了,所以使用hashchange
	
	    //低级浏览器使用 轮询
	    /*
	    let oldHash = location.hash;
	    setInterval(() => {
	        
	        if(oldHash != location.hash) {
	            //TODO do something
	            
	            //存储新的hash值
	            oldHash = location.hash;
	        } 
	    }, 100);*/
	
	    //hashchange方式
	    window.addEventListener('hashchange', function (e) {
	        handleRoute(location.hash);
	    });
	}
	
	//添加路由
	var addRoute = function addRoute() {
	    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var viewDestory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
	    var view = arguments[4];
	    var context = arguments[5];
	
	    var routeObj = {
	        path: path,
	        cb: cb,
	        config: config,
	        context: context,
	        viewDestory: viewDestory,
	        view: view
	    };
	
	    Router.push(routeObj);
	};
	
	//路由拦截处理.拦截后返回true, 拦截不成功返回false
	var handleRoute = function handleRoute(path, isFromHistory) {
	
	    var curContext = void 0,
	        oldPath = location.hash.slice(2);
	
	    //页面销毁
	    Router.forEach(function (route, index) {
	        if (route.path === oldPath) {
	
	            route.viewDestory && route.viewDestory();
	
	            //页面视图缓存？？？这个可以放到页面初始化的过程?
	            route.view && localStorage.setItem('view', route.view);
	        }
	    });
	
	    for (var i = 0; i < Router.length; i++) {
	        var routeItem = Router[i];
	        if (routeItem.path === path) {
	            curContext = routeItem.context ? routeItem.context : window;
	
	            routeItem.cb.apply(curContext, [path]);
	
	            if (!useHash) {
	                //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
	                if (!isFromHistory) {
	                    history.pushState({ path: path }, null, '#/' + path);
	                }
	            } else {
	                location.hash = '/' + path;
	            }
	
	            return true;
	        }
	    }
	    return false;
	};
	
	//TODO 事件冒泡路由拦截  <a href="a.html">   <a href="#/a">  这2种写法处理起来有什么区别?
	//路由的写法统一为:   <a data-href="aaa"></a>
	document.addEventListener('click', function (e) {
	    var href = e.target.dataset.href,
	        oldHash = location.hash.slice(2);
	
	    if (href) {
	        //添加钩子 路由进行跳转时模型model上数据的处理
	        if (href === oldHash) return;
	
	        if (handleRoute(href)) {
	            //阻止默认事件
	            e.preventDefault();
	
	            //通过class进行样式处理
	            routeClassHandle(e);
	        }
	    }
	});
	
	//路由激活状态class控制
	var routeClassHandle = function routeClassHandle(e) {
	    document.querySelector('.route-active') && document.querySelector('.route-active').classList.remove('route-active');
	    e.target.classList.add('route-active');
	};
	
	var bootstrap = function bootstrap() {
	    document.addEventListener('DOMContentLoaded', function (e) {
	        var router = Router[0],
	            currHash = location.hash.slice(2),
	            flag = false;
	
	        Router.forEach(function (item, index) {
	            if (item.path === currHash) {
	                flag = true;
	                return item.cb.call(item.context || window);
	            }
	        });
	
	        !flag ? router.cb.call(router.context || window) : '';
	    });
	};
	
	//TODO 路由的销毁(根据时间来判断)
	
	var route = {
	    addRoute: addRoute,
	    handleRoute: handleRoute,
	    bootstrap: bootstrap
	};
	
	exports.route = route;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.controller = undefined;
	
	var _controller = __webpack_require__(4);
	
	var _aModel = __webpack_require__(5);
	
	var _aModel2 = _interopRequireDefault(_aModel);
	
	var _util = __webpack_require__(12);
	
	var _index = __webpack_require__(13);
	
	var _imgResize = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var controller = _aModel2.default.registerController('#container');
	
	controller.getDomMap({
		aContainer: '.a-container',
		myName: '.myName',
		myPhone: '.myPhone'
	}).getBindEvents({
		aContainer: {
			actionName: 'click',
			action: function action() {
				_util.elementSet.css(this, { color: 'red' });
			}
		},
		myName: {
			actionName: 'input',
			action: function action(e) {
				console.log(this.value);
			}
		},
		myPhone: {
			actionName: 'input',
			action: function action(e) {
				console.log(this.value);
			}
		}
	})
	//页面状态初始化.从localstorage中获取
	.getViewInit(function () {
		var doms = this.domMap;
		doms.myName.value = _aModel2.default.submitData.name;
	
		var timeSelect = new _index.timeSelectComponent();
	
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
	
		/*let json = require('../../components/city-select/city-json'),
	 	_cityComponent = new cityComponent();*/
	
		_cityComponent.configModule({
			allCities: json.data,
			succCb: function succCb(data) {
				console.log(data);
			},
			failCb: function failCb() {
				console.log('请选择城市');
			}
		});
	
		var cityWrapper = document.querySelector('.city-wrapper'),
		    clickBtn = document.querySelector('.btn'),
		    dialogBtn = document.querySelector('.alert-btn');
	
		var dialog = _index.dd.dialog || {};
	
		_cityComponent.initModule(cityWrapper);
	
		//城市组件
		clickBtn.addEventListener('click', function () {
			_util.util.addClass(cityWrapper, 'city-box-show');
		});
	
		//弹窗组件
		dialogBtn.addEventListener('click', function () {
			dialog.alert('It\'s a good job');
		});
	
		var imgContainer = document.getElementById('file');
		imgContainer.addEventListener('change', function (e) {
			var file = this.files[0];
			if (!file) return;
	
			//图片压缩
			(0, _imgResize.canvasResize)(file, {
				crop: false,
				quality: 0.1,
				rotate: 0,
				callback: function callback(baseStr) {
					var img = new Image();
					img.src = baseStr;
					document.body.appendChild(img);
				}
			});
		});
	}).getViewDestory(function () {
		//console.log('PageA is leaving now');
		//console.log(modelA.submitData);
		var pickerEl = document.querySelector('.picker');
		document.body.removeChild(pickerEl);
	});
	
	exports.controller = controller;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = exports.Controller = function () {
	    function Controller(containerName, model) {
	        _classCallCheck(this, Controller);
	
	        this.containerName = containerName || '';
	        this.containerBox = null;
	        this.domMap = {};
	        this.domMapCache = {};
	        this.eventCache = {};
	        this.model = model || {};
	        this.viewInit = null || function () {};
	        this.viewDestory = null || function () {};
	
	        this.inited = false;
	    }
	    //init函数
	
	
	    _createClass(Controller, [{
	        key: 'init',
	        value: function init() {
	            this.containerBox = document.querySelector(this.containerName);
	            this.setDomMap();
	            this.bindEvents();
	            this.model.pageInit();
	            this.viewInit();
	
	            this.inited = true;
	
	            return this;
	        }
	    }, {
	        key: 'setModelCache',
	        value: function setModelCache() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.model = obj;
	            return this;
	        }
	    }, {
	        key: 'getDomMap',
	        value: function getDomMap() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.domMapCache = obj;
	            return this;
	        }
	        //dom缓存
	
	    }, {
	        key: 'setDomMap',
	        value: function setDomMap() {
	            var obj = this.domMapCache;
	            for (var key in obj) {
	                this.domMap[key] = this.containerBox.querySelector(obj[key]);
	            }
	            return this;
	        }
	    }, {
	        key: 'getBindEvents',
	        value: function getBindEvents() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.eventCache = obj;
	            return this;
	        }
	        //事件绑定
	
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var obj = this.eventCache;
	            for (var key in obj) {
	                var item = obj[key];
	                this.domMap[key].addEventListener(item.actionName, item.action);
	            }
	            return this;
	        }
	    }, {
	        key: 'unbindEvent',
	        value: function unbindEvent() {}
	
	        //页面初始化(willAppear阶段)
	
	    }, {
	        key: 'getViewInit',
	        value: function getViewInit(fn) {
	            this.viewInit = fn.bind(this) || function () {};
	            return this;
	        }
	
	        //页面销毁阶段(willDisappear阶段)
	
	    }, {
	        key: 'getViewDestory',
	        value: function getViewDestory(fn) {
	            this.viewDestory = fn.bind(this) || function () {};
	            return this;
	        }
	
	        //获取controller的初始化状态
	
	    }, {
	        key: 'getInitedStatus',
	        get: function get() {
	            return this.inited;
	        }
	    }]);

	    return Controller;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _model = __webpack_require__(6);
	
	__webpack_require__(8);
	
	var modelA = _model.totalModel.init();
	
	modelA.name = 'modelA';
	modelA.setLocItem(modelA.name, 'HELLO WORLD');
	modelA.submitData = {
	    name: '',
	    phone: null,
	    sex: ''
	};
	//模型初始化
	modelA.pageInit = function () {
	    this.submitData.name = modelA.getLocItem(this.name);
	};
	modelA.save();
	
	exports.default = modelA;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.totalModel = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	__webpack_require__(7);
	
	var _controller = __webpack_require__(4);
	
	var Model = {
	    records: {},
	    //model创建后的回调
	    created: function created() {
	        this.records = {}; //创建新的model后,清空records,避免records被其他的model共享而发生副作用
	    },
	    extend: function extend() {
	        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        var extended = obj.extended;
	        for (var key in obj) {
	            this[key] = obj[key];
	        }
	        if (extended) extended.call(this);
	    },
	    include: function include() {
	        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        var included = obj.included;
	        for (var key in obj) {
	            this.prototype[key] = obj[key];
	        }
	        if (included) included.call(this);
	    },
	
	    prototype: {
	        init: function init() {}
	    },
	    create: function create() {
	        var object = Object.create(this);
	        object.parent = this;
	
	        object.prototype = object.fn = Object.create(this.prototype);
	
	        object.created();
	
	        return object;
	    },
	    init: function init() {
	        var instance = Object.create(this.prototype);
	        instance.parent = this;
	        instance.init.apply(instance, arguments);
	        return instance;
	    }
	};
	
	//ajax
	Model.include({
	    post: function post() {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        return new Promise(function (resolve, reject) {
	            fetch(url, {
	                method: 'POST',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(obj)
	            }).then(function (data) {
	                //添加正确处理和错误处理的函数 reject
	                resolve(data);
	            });
	        });
	    }
	});
	
	Model.include({
	    getHash: function getHash() {
	        return window.location.hash.slice(2);
	    }
	});
	
	Model.include({
	    pageInit: function pageInit() {}
	});
	
	//Model对象记录
	Model.include({
	    newRecord: true,
	    create: function create() {
	        this.newRecord = false;
	        //parent指向Model.create()创建的model中
	        this.parent.records[this.name] = this;
	    },
	    destory: function destory() {
	        delete this.parent.records[this.name];
	    },
	    update: function update() {
	        this.parent.records[this.name] = this.name;
	    },
	    save: function save() {
	        this.newRecord ? this.create() : this.update();
	    }
	});
	
	Model.extend({
	    find: function find() {
	        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return this.records[name] || console.log('Unkonwn record');
	    }
	});
	
	//localstorage操作
	Model.include({
	    setLocItem: function setLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	        var value = arguments[1];
	
	        var itemValue = void 0,
	            type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	        if (type === 'string' || type === 'number') {
	            itemValue = value;
	        } else if (Object.prototype.toString.call(value) === '[object Object]') {
	            itemValue = JSON.stringify(value);
	        } else {
	            itemValue = undefined;
	        }
	        localStorage.setItem(key, itemValue);
	    },
	    getLocItem: function getLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return localStorage.getItem(key);
	    },
	    removeLocItem: function removeLocItem() {
	        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        return localStorage.removeItem(key);
	    }
	});
	
	//获取controller操作
	Model.include({
	    controllers: {},
	    registerController: function registerController(name) {
	        return this.controllers[name] || (this.controllers[name] = new _controller.Controller(name, this));
	    }
	});
	
	var totalModel = Model.create();
	
	exports.totalModel = totalModel;

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var BinaryFile = function BinaryFile(e, t, n) {
	    var r = e,
	        o = t || 0,
	        a = 0;this.getRawData = function () {
	        return r;
	    }, "string" == typeof e ? (a = n || r.length, this.getByteAt = function (e) {
	        return 255 & r.charCodeAt(e + o);
	    }, this.getBytesAt = function (e, t) {
	        for (var n = [], a = 0; a < t; a++) {
	            n[a] = 255 & r.charCodeAt(e + a + o);
	        }return n;
	    }) : "unknown" == typeof e && (a = n || IEBinary_getLength(r), this.getByteAt = function (e) {
	        return IEBinary_getByteAt(r, e + o);
	    }, this.getBytesAt = function (e, t) {
	        return new VBArray(IEBinary_getBytesAt(r, e + o, t)).toArray();
	    }), this.getLength = function () {
	        return a;
	    }, this.getSByteAt = function (e) {
	        var t = this.getByteAt(e);return t > 127 ? t - 256 : t;
	    }, this.getShortAt = function (e, t) {
	        var n = t ? (this.getByteAt(e) << 8) + this.getByteAt(e + 1) : (this.getByteAt(e + 1) << 8) + this.getByteAt(e);return n < 0 && (n += 65536), n;
	    }, this.getSShortAt = function (e, t) {
	        var n = this.getShortAt(e, t);return n > 32767 ? n - 65536 : n;
	    }, this.getLongAt = function (e, t) {
	        var n = this.getByteAt(e),
	            r = this.getByteAt(e + 1),
	            o = this.getByteAt(e + 2),
	            a = this.getByteAt(e + 3),
	            i = t ? (((n << 8) + r << 8) + o << 8) + a : (((a << 8) + o << 8) + r << 8) + n;return i < 0 && (i += 4294967296), i;
	    }, this.getSLongAt = function (e, t) {
	        var n = this.getLongAt(e, t);return n > 2147483647 ? n - 4294967296 : n;
	    }, this.getStringAt = function (e, t) {
	        for (var n = [], r = this.getBytesAt(e, t), o = 0; o < t; o++) {
	            n[o] = String.fromCharCode(r[o]);
	        }return n.join("");
	    }, this.getCharAt = function (e) {
	        return String.fromCharCode(this.getByteAt(e));
	    }, this.toBase64 = function () {
	        return window.btoa(r);
	    }, this.fromBase64 = function (e) {
	        r = window.atob(e);
	    };
	},
	    BinaryAjax = function () {
	    function e() {
	        var e = null;return window.ActiveXObject ? e = new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest && (e = new XMLHttpRequest()), e;
	    }function t(t, n, r) {
	        var o = e();o ? (n && ("undefined" != typeof o.onload ? o.onload = function () {
	            "200" == o.status ? n(this) : r && r(), o = null;
	        } : o.onreadystatechange = function () {
	            4 == o.readyState && ("200" == o.status ? n(this) : r && r(), o = null);
	        }), o.open("HEAD", t, !0), o.send(null)) : r && r();
	    }function n(t, n, r, o, a, i) {
	        var s = e();if (s) {
	            var u = 0;o && !a && (u = o[0]);var c = 0;o && (c = o[1] - o[0] + 1), n && ("undefined" != typeof s.onload ? s.onload = function () {
	                "200" == s.status || "206" == s.status || "0" == s.status ? (s.binaryResponse = new BinaryFile(s.responseText, u, c), s.fileSize = i || s.getResponseHeader("Content-Length"), n(s)) : r && r(), s = null;
	            } : s.onreadystatechange = function () {
	                if (4 == s.readyState) {
	                    if ("200" == s.status || "206" == s.status || "0" == s.status) {
	                        var e = { status: s.status, binaryResponse: new BinaryFile("unknown" == typeof s.responseBody ? s.responseBody : s.responseText, u, c), fileSize: i || s.getResponseHeader("Content-Length") };n(e);
	                    } else r && r();s = null;
	                }
	            }), s.open("GET", t, !0), s.overrideMimeType && s.overrideMimeType("text/plain; charset=x-user-defined"), o && a && s.setRequestHeader("Range", "bytes=" + o[0] + "-" + o[1]), s.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT"), s.send(null);
	        } else r && r();
	    }return function (e, r, o, a) {
	        a ? t(e, function (t) {
	            var i,
	                s,
	                u = parseInt(t.getResponseHeader("Content-Length"), 10),
	                c = t.getResponseHeader("Accept-Ranges");i = a[0], a[0] < 0 && (i += u), s = i + a[1] - 1, n(e, r, o, [i, s], "bytes" == c, u);
	        }) : n(e, r, o);
	    };
	}();document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n\tIEBinary_getByteAt = AscB(MidB(strBinary, iOffset + 1, 1))\r\nEnd Function\r\nFunction IEBinary_getBytesAt(strBinary, iOffset, iLength)\r\n  Dim aBytes()\r\n  ReDim aBytes(iLength - 1)\r\n  For i = 0 To iLength - 1\r\n   aBytes(i) = IEBinary_getByteAt(strBinary, iOffset + i)\r\n  Next\r\n  IEBinary_getBytesAt = aBytes\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n\tIEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n</script>\r\n"), function (e) {
	    e.EXIF = function () {
	        function e(e) {
	            return !!e.exifdata;
	        }function t(e, t) {
	            BinaryAjax(e.src, function (r) {
	                var o = n(r.binaryResponse);e.exifdata = o || {}, t && t.call(e);
	            });
	        }function n(e) {
	            if (255 != e.getByteAt(0) || 216 != e.getByteAt(1)) return !1;for (var t, n = 2, r = e.getLength(); n < r;) {
	                if (255 != e.getByteAt(n)) return l && console.log("Not a valid marker at offset " + n + ", found: " + e.getByteAt(n)), !1;if (t = e.getByteAt(n + 1), 22400 == t) return l && console.log("Found 0xFFE1 marker"), a(e, n + 4, e.getShortAt(n + 2, !0) - 2);if (225 == t) return l && console.log("Found 0xFFE1 marker"), a(e, n + 4, e.getShortAt(n + 2, !0) - 2);n += 2 + e.getShortAt(n + 2, !0);
	            }
	        }function r(e, t, n, r, a) {
	            var i,
	                s,
	                u,
	                c = e.getShortAt(n, a),
	                d = {};for (u = 0; u < c; u++) {
	                i = n + 12 * u + 2, s = r[e.getShortAt(i, a)], !s && l && console.log("Unknown tag: " + e.getShortAt(i, a)), d[s] = o(e, i, t, n, a);
	            }return d;
	        }function o(e, t, n, r, o) {
	            var a,
	                i,
	                s,
	                u,
	                c,
	                d,
	                l = e.getShortAt(t + 2, o),
	                g = e.getLongAt(t + 4, o),
	                h = e.getLongAt(t + 8, o) + n;switch (l) {case 1:case 7:
	                    if (1 == g) return e.getByteAt(t + 8, o);for (a = g > 4 ? h : t + 8, i = [], u = 0; u < g; u++) {
	                        i[u] = e.getByteAt(a + u);
	                    }return i;case 2:
	                    return a = g > 4 ? h : t + 8, e.getStringAt(a, g - 1);case 3:
	                    if (1 == g) return e.getShortAt(t + 8, o);for (a = g > 2 ? h : t + 8, i = [], u = 0; u < g; u++) {
	                        i[u] = e.getShortAt(a + 2 * u, o);
	                    }return i;case 4:
	                    if (1 == g) return e.getLongAt(t + 8, o);i = [];for (var u = 0; u < g; u++) {
	                        i[u] = e.getLongAt(h + 4 * u, o);
	                    }return i;case 5:
	                    if (1 == g) return c = e.getLongAt(h, o), d = e.getLongAt(h + 4, o), s = new Number(c / d), s.numerator = c, s.denominator = d, s;for (i = [], u = 0; u < g; u++) {
	                        c = e.getLongAt(h + 8 * u, o), d = e.getLongAt(h + 4 + 8 * u, o), i[u] = new Number(c / d), i[u].numerator = c, i[u].denominator = d;
	                    }return i;case 9:
	                    if (1 == g) return e.getSLongAt(t + 8, o);for (i = [], u = 0; u < g; u++) {
	                        i[u] = e.getSLongAt(h + 4 * u, o);
	                    }return i;case 10:
	                    if (1 == g) return e.getSLongAt(h, o) / e.getSLongAt(h + 4, o);for (i = [], u = 0; u < g; u++) {
	                        i[u] = e.getSLongAt(h + 8 * u, o) / e.getSLongAt(h + 4 + 8 * u, o);
	                    }return i;}
	        }function a(e, t) {
	            if ("Exif" != e.getStringAt(t, 4)) return l && console.log("Not valid EXIF data! " + e.getStringAt(t, 4)), !1;var n,
	                o,
	                a,
	                i,
	                s,
	                u = t + 6;if (18761 == e.getShortAt(u)) n = !1;else {
	                if (19789 != e.getShortAt(u)) return l && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;n = !0;
	            }if (42 != e.getShortAt(u + 2, n)) return l && console.log("Not valid TIFF data! (no 0x002A)"), !1;if (8 != e.getLongAt(u + 4, n)) return l && console.log("Not valid TIFF data! (First offset not 8)", e.getShortAt(u + 4, n)), !1;if (o = r(e, u, u + 8, h, n), o.ExifIFDPointer) {
	                i = r(e, u, u + o.ExifIFDPointer, g, n);for (a in i) {
	                    switch (a) {case "LightSource":case "Flash":case "MeteringMode":case "ExposureProgram":case "SensingMethod":case "SceneCaptureType":case "SceneType":case "CustomRendered":case "WhiteBalance":case "GainControl":case "Contrast":case "Saturation":case "Sharpness":case "SubjectDistanceRange":case "FileSource":
	                            i[a] = p[a][i[a]];break;case "ExifVersion":case "FlashpixVersion":
	                            i[a] = String.fromCharCode(i[a][0], i[a][1], i[a][2], i[a][3]);break;case "ComponentsConfiguration":
	                            i[a] = p.Components[i[a][0]] + p.Components[i[a][1]] + p.Components[i[a][2]] + p.Components[i[a][3]];}o[a] = i[a];
	                }
	            }if (o.GPSInfoIFDPointer) {
	                s = r(e, u, u + o.GPSInfoIFDPointer, f, n);for (a in s) {
	                    switch (a) {case "GPSVersionID":
	                            s[a] = s[a][0] + "." + s[a][1] + "." + s[a][2] + "." + s[a][3];}o[a] = s[a];
	                }
	            }return o;
	        }function i(n, r) {
	            return !!n.complete && (e(n) ? r && r.call(n) : t(n, r), !0);
	        }function s(t, n) {
	            if (e(t)) return t.exifdata[n];
	        }function u(t) {
	            if (!e(t)) return {};var n,
	                r = t.exifdata,
	                o = {};for (n in r) {
	                r.hasOwnProperty(n) && (o[n] = r[n]);
	            }return o;
	        }function c(t) {
	            if (!e(t)) return "";var n,
	                r = t.exifdata,
	                o = "";for (n in r) {
	                r.hasOwnProperty(n) && (o += "object" == _typeof(r[n]) ? r[n] instanceof Number ? n + " : " + r[n] + " [" + r[n].numerator + "/" + r[n].denominator + "]\r\n" : n + " : [" + r[n].length + " values]\r\n" : n + " : " + r[n] + "\r\n");
	            }return o;
	        }function d(e) {
	            return n(e);
	        }var l = !1,
	            g = { 36864: "ExifVersion", 40960: "FlashpixVersion", 40961: "ColorSpace", 40962: "PixelXDimension", 40963: "PixelYDimension", 37121: "ComponentsConfiguration", 37122: "CompressedBitsPerPixel", 37500: "MakerNote", 37510: "UserComment", 40964: "RelatedSoundFile", 36867: "DateTimeOriginal", 36868: "DateTimeDigitized", 37520: "SubsecTime", 37521: "SubsecTimeOriginal", 37522: "SubsecTimeDigitized", 33434: "ExposureTime", 33437: "FNumber", 34850: "ExposureProgram", 34852: "SpectralSensitivity", 34855: "ISOSpeedRatings", 34856: "OECF", 37377: "ShutterSpeedValue", 37378: "ApertureValue", 37379: "BrightnessValue", 37380: "ExposureBias", 37381: "MaxApertureValue", 37382: "SubjectDistance", 37383: "MeteringMode", 37384: "LightSource", 37385: "Flash", 37396: "SubjectArea", 37386: "FocalLength", 41483: "FlashEnergy", 41484: "SpatialFrequencyResponse", 41486: "FocalPlaneXResolution", 41487: "FocalPlaneYResolution", 41488: "FocalPlaneResolutionUnit", 41492: "SubjectLocation", 41493: "ExposureIndex", 41495: "SensingMethod", 41728: "FileSource", 41729: "SceneType", 41730: "CFAPattern", 41985: "CustomRendered", 41986: "ExposureMode", 41987: "WhiteBalance", 41988: "DigitalZoomRation", 41989: "FocalLengthIn35mmFilm", 41990: "SceneCaptureType", 41991: "GainControl", 41992: "Contrast", 41993: "Saturation", 41994: "Sharpness", 41995: "DeviceSettingDescription", 41996: "SubjectDistanceRange", 40965: "InteroperabilityIFDPointer", 42016: "ImageUniqueID" },
	            h = { 256: "ImageWidth", 257: "ImageHeight", 34665: "ExifIFDPointer", 34853: "GPSInfoIFDPointer", 40965: "InteroperabilityIFDPointer", 258: "BitsPerSample", 259: "Compression", 262: "PhotometricInterpretation", 274: "Orientation", 277: "SamplesPerPixel", 284: "PlanarConfiguration", 530: "YCbCrSubSampling", 531: "YCbCrPositioning", 282: "XResolution", 283: "YResolution", 296: "ResolutionUnit", 273: "StripOffsets", 278: "RowsPerStrip", 279: "StripByteCounts", 513: "JPEGInterchangeFormat", 514: "JPEGInterchangeFormatLength", 301: "TransferFunction", 318: "WhitePoint", 319: "PrimaryChromaticities", 529: "YCbCrCoefficients", 532: "ReferenceBlackWhite", 306: "DateTime", 270: "ImageDescription", 271: "Make", 272: "Model", 305: "Software", 315: "Artist", 33432: "Copyright" },
	            f = { 0: "GPSVersionID", 1: "GPSLatitudeRef", 2: "GPSLatitude", 3: "GPSLongitudeRef", 4: "GPSLongitude", 5: "GPSAltitudeRef", 6: "GPSAltitude", 7: "GPSTimeStamp", 8: "GPSSatellites", 9: "GPSStatus", 10: "GPSMeasureMode", 11: "GPSDOP", 12: "GPSSpeedRef", 13: "GPSSpeed", 14: "GPSTrackRef", 15: "GPSTrack", 16: "GPSImgDirectionRef", 17: "GPSImgDirection", 18: "GPSMapDatum", 19: "GPSDestLatitudeRef", 20: "GPSDestLatitude", 21: "GPSDestLongitudeRef", 22: "GPSDestLongitude", 23: "GPSDestBearingRef", 24: "GPSDestBearing", 25: "GPSDestDistanceRef", 26: "GPSDestDistance", 27: "GPSProcessingMethod", 28: "GPSAreaInformation", 29: "GPSDateStamp", 30: "GPSDifferential" },
	            p = { ExposureProgram: { 0: "Not defined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" }, MeteringMode: { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" }, LightSource: { 0: "Unknown", 1: "Daylight", 2: "Fluorescent", 3: "Tungsten (incandescent light)", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 - 5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other" }, Flash: { 0: "Flash did not fire", 1: "Flash fired", 5: "Strobe return light not detected", 7: "Strobe return light detected", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode" }, SensingMethod: { 1: "Not defined", 2: "One-chip color area sensor", 3: "Two-chip color area sensor", 4: "Three-chip color area sensor", 5: "Color sequential area sensor", 7: "Trilinear sensor", 8: "Color sequential linear sensor" }, SceneCaptureType: { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene" }, SceneType: { 1: "Directly photographed" }, CustomRendered: { 0: "Normal process", 1: "Custom process" }, WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" }, GainControl: { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" }, Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" }, Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" }, Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" }, SubjectDistanceRange: { 0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view" }, FileSource: { 3: "DSC" }, Components: { 0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" } };return { readFromBinaryFile: d, pretty: c, getTag: s, getAllTags: u, getData: i, Tags: g, TiffTags: h, GPSTags: f, StringValues: p };
	    }();
	}(window), function (e) {
	    function t(e, t) {
	        this.file = e, this.options = r.extend({}, o, t), this._defaults = o, this._name = n, this.init();
	    }var n = "canvasResize",
	        r = { newsize: function newsize(e, t, n, r, o) {
	            var a = o ? "h" : "";if (n && e > n || r && t > r) {
	                var i = e / t;(i >= 1 || 0 === r) && n && !o ? (e = n, t = n / i >> 0) : o && i <= n / r ? (e = n, t = n / i >> 0, a = "w") : (e = r * i >> 0, t = r);
	            }return { width: e, height: t, cropped: a };
	        }, dataURLtoBlob: function dataURLtoBlob(e) {
	            for (var t = e.split(",")[0].split(":")[1].split(";")[0], n = atob(e.split(",")[1]), r = new ArrayBuffer(n.length), o = new Uint8Array(r), a = 0; a < n.length; a++) {
	                o[a] = n.charCodeAt(a);
	            }var i = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;return i ? (i = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)(), i.append(r), i.getBlob(t)) : i = new Blob([r], { type: t });
	        }, detectSubsampling: function detectSubsampling(e) {
	            var t = e.width,
	                n = e.height;if (t * n > 1048576) {
	                var r = document.createElement("canvas");r.width = r.height = 1;var o = r.getContext("2d");return o.drawImage(e, -t + 1, 0), 0 === o.getImageData(0, 0, 1, 1).data[3];
	            }return !1;
	        }, rotate: function rotate(e, t) {
	            var n = { 1: { 90: 6, 180: 3, 270: 8 }, 2: { 90: 7, 180: 4, 270: 5 }, 3: { 90: 8, 180: 1, 270: 6 }, 4: { 90: 5, 180: 2, 270: 7 }, 5: { 90: 2, 180: 7, 270: 4 }, 6: { 90: 3, 180: 8, 270: 1 }, 7: { 90: 4, 180: 5, 270: 2 }, 8: { 90: 1, 180: 6, 270: 3 } };return n[e][t] ? n[e][t] : e;
	        }, transformCoordinate: function transformCoordinate(e, t, n, r) {
	            switch (r) {case 5:case 6:case 7:case 8:
	                    e.width = n, e.height = t;break;default:
	                    e.width = t, e.height = n;}var o = e.getContext("2d");switch (r) {case 1:
	                    break;case 2:
	                    o.translate(t, 0), o.scale(-1, 1);break;case 3:
	                    o.translate(t, n), o.rotate(Math.PI);break;case 4:
	                    o.translate(0, n), o.scale(1, -1);break;case 5:
	                    o.rotate(.5 * Math.PI), o.scale(1, -1);break;case 6:
	                    o.rotate(.5 * Math.PI), o.translate(0, -n);break;case 7:
	                    o.rotate(.5 * Math.PI), o.translate(t, -n), o.scale(-1, 1);break;case 8:
	                    o.rotate(-.5 * Math.PI), o.translate(-t, 0);}
	        }, detectVerticalSquash: function detectVerticalSquash(e, t, n) {
	            var r = document.createElement("canvas");r.width = 1, r.height = n;var o = r.getContext("2d");o.drawImage(e, 0, 0);for (var a = o.getImageData(0, 0, 1, n).data, i = 0, s = n, u = n; u > i;) {
	                var c = a[4 * (u - 1) + 3];0 === c ? s = u : i = u, u = s + i >> 1;
	            }var d = u / n;return 0 === d ? 1 : d;
	        }, callback: function callback(e) {
	            return e;
	        }, extend: function extend() {
	            var e = arguments[0] || {},
	                t = 1,
	                n = arguments.length,
	                o = !1;e.constructor === Boolean && (o = e, e = arguments[1] || {}), 1 === n && (e = this, t = 0);for (var a; t < n; t++) {
	                if (null !== (a = arguments[t])) for (var i in a) {
	                    e !== a[i] && (o && "object" == _typeof(a[i]) && e[i] ? r.extend(e[i], a[i]) : void 0 !== a[i] && (e[i] = a[i]));
	                }
	            }return e;
	        } },
	        o = { crop: !1, quality: 80, rotate: 0, callback: r.callback };t.prototype = { init: function init() {
	            var e = this,
	                t = this.file,
	                n = 102400,
	                o = new FileReader();o.onloadend = function (t) {
	                var o = t.target.result,
	                    a = atob(o.split(",")[1]),
	                    i = new BinaryFile(a, 0, a.length),
	                    s = EXIF.readFromBinaryFile(i),
	                    u = new Image();u.onload = function (t) {
	                    var a = s.Orientation || 1;a = r.rotate(a, e.options.rotate);var i = a >= 5 && a <= 8 ? r.newsize(u.height, u.width, e.options.width, e.options.height, e.options.crop) : r.newsize(u.width, u.height, e.options.width, e.options.height, e.options.crop),
	                        c = u.width,
	                        d = u.height,
	                        l = i.width,
	                        g = i.height,
	                        h = document.createElement("canvas"),
	                        f = h.getContext("2d");f.save(), r.transformCoordinate(h, l, g, a), r.detectSubsampling(u) && (c /= 2, d /= 2);var p = 1024,
	                        S = document.createElement("canvas");S.width = S.height = p;for (var m = S.getContext("2d"), y = r.detectVerticalSquash(u, c, d), w = 0; w < d;) {
	                        for (var A = w + p > d ? d - w : p, B = 0; B < c;) {
	                            var F = B + p > c ? c - B : p;m.clearRect(0, 0, p, p), m.drawImage(u, -B, -w);var v = Math.floor(B * l / c),
	                                P = Math.ceil(F * l / c),
	                                C = Math.floor(w * g / d / y),
	                                b = Math.ceil(A * g / d / y);f.drawImage(S, 0, 0, F, A, v, C, P, b), B += p;
	                        }w += p;
	                    }f.restore(), S = m = null;var D = document.createElement("canvas");D.width = "h" === i.cropped ? g : l, D.height = "w" === i.cropped ? l : g;var I = "h" === i.cropped ? .5 * (g - l) : 0,
	                        L = "w" === i.cropped ? .5 * (l - g) : 0;var newctx = D.getContext("2d");newctx.drawImage(h, I, L, l, g);var R = o.length > n ? D.toDataURL("image/jpeg", .1) : o;e.options.callback(R, D.width, D.height);
	                }, u.src = o;
	            }, o.readAsDataURL(t);
	        } }, window.canvasResize = function (e, n) {
	        return "string" == typeof e ? r[e](n) : void new t(e, n);
	    };
	}(window);
	
	exports.canvasResize = canvasResize;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div>This is pageA</div>\n\n<div class=\"a-container\" style=\"margin-top: 50px; height: 40px;line-height: 40px;\">\n    姓名: <input type=\"text\" class=\"myName\">\n    电话: <input type=\"number\" class=\"myPhone\">\n</div>\n\n\n<button id=\"name\">name</button>\n<button id=\"name-test\">name test</button>\n<button id=\"age\">点我</button>\n\n\n\n<div class=\"btn\" style=\"margin-top: 50px;\">\n    点击显示城市选择\n</div>\n\n\n<input type=\"file\" id=\"file\" style=\"margin-top: 20px;\"/>\n\n\n<div class=\"alert-btn\" style=\"margin-top: 30px;\">弹窗实验</div>\n\n\n\n<div class=\"city-wrapper\">\n</div>\n"

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div>This is b.html</div>"

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */,
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=bundle.js.map