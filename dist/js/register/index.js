webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(14);

	__webpack_require__(36);
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(15);

	//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
	//import {controller} from 'modules/pageA/a-controller';

	var Router = new _index.Route();

	Router.home('account');

	Router.addRoute({
	    path: 'account',
	    viewBox: '.public-container',
	    template: __webpack_require__(21),
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(2, function () {
	            var controller = __webpack_require__(26);
	            controller.init();
	        });
	    },
	    viewDestory: function viewDestory() {}
	}).addRoute({
	    path: 'verify',
	    viewBox: '.public-container',
	    template: __webpack_require__(22),
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(3, function () {
	            var controller = __webpack_require__(28);
	            controller.init();
	        });
	    }
	}).addRoute({
	    path: 'password',
	    viewBox: '.public-container',
	    template: __webpack_require__(23),
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(4, function () {
	            var controller = __webpack_require__(30);
	            controller.init();
	        });
	    }
	}).addRoute({
	    path: 'info',
	    viewBox: '.public-container',
	    template: __webpack_require__(24),
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(5, function () {
	            var controller = __webpack_require__(32);
	            controller.init();
	        });
	    }
	}).addRoute({
	    path: 'info.car',
	    viewBox: '.info-container',
	    template: __webpack_require__(25),
	    viewInit: function viewInit() {
	        __webpack_require__.e/* nsure */(6, function () {
	            var controller = __webpack_require__(34);
	            controller.init();
	        });
	    }
	});

	//require.ensure([], function() {}, str)  
	//这里接收的第三个参数用以将异步加载的模块都打包成一个文件.不同于entry和CommonChunkPlugin的作用
	/*Router.addRoute({
	    path: 'aaa',
	    viewInit() {
	        //modelA.pageInit();
	        let page = document.querySelector('#container');
	        //if (!controller.getInitedStatus) {
	        page.innerHTML = viewA;
	        controller.init();
	        //}
	    },
	    viewDestory: controller.viewDestory
	});*/

	/*Router.addRoute({
	    path: 'aaa.1',
	    viewInit: function () {
	        require.ensure([], function () {
	            let controller = require('modules/pageA/a-1/controller');
	            let page = document.querySelector('#container');

	            page.innerHTML = require('modules/pageA/a-1/index.html');
	            controller.init();
	        }, 'page-a')
	    }
	});*/

	/*Router.addRoute({
	    path: 'bbb',
	    viewInit() {
	        //modelB.pageInit();
	        //require.ensure([], function() {
	        let controllerB = require('modules/pageB/b-controller');
	        let page = document.querySelector('#container');

	        //require('components/index');
	        page.innerHTML = viewB;
	        controllerB.init();
	        //});
	    }
	})*/

	/*Router.addRoute({
	    path: 'ccc',
	    viewInit() {
	        require.ensure([], function () {
	            let controllerC = require('modules/pageC/controller');
	            let page = document.querySelector('#container');
	            page.innerHTML = viewC;
	            controllerC.init();
	        }, 'page-c')
	    }
	})*/

	/*Router.addRoute({
	    path: 'ccc.1',
	    viewInit() {
	        let page = document.querySelector('.c-container');
	        page.innerHTML = require('modules/pageC/c-1/index.html');
	        console.log('This\'s pagec-1');
	    }
	})
	*/

	/*Router.addRoute({
	    path: 'ccc.2',
	    viewInit() {
	        let page = document.querySelector('.c-container');
	        page.innerHTML = require('modules/pageC/c-2/index.html');
	        console.log('This\'s pagec-2');
	    }
	})*/

	Router.bootstrap();

	exports.default = Router;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.util = exports.dialog = exports.Route = exports.Model = exports.Controller = undefined;

	var _controller = __webpack_require__(16);

	var _model = __webpack_require__(17);

	var _model2 = _interopRequireDefault(_model);

	var _xRoute = __webpack_require__(20);

	var _xRoute2 = _interopRequireDefault(_xRoute);

	var _dialog = __webpack_require__(10);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _util = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Controller = _controller.Controller;
	exports.Model = _model2.default;
	exports.Route = _xRoute2.default;
	exports.dialog = _dialog2.default;
	exports.util = _util.util;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
	    function Controller(name, containerName, model) {
	        _classCallCheck(this, Controller);

	        this.name = name;
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
	            this.model.pageInit(); //模型初始化
	            this.viewInit(); //视图初始化

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
	                try {
	                    var doms = [].concat(_toConsumableArray(this.containerBox.querySelectorAll(obj[key])));
	                    this.domMap[key] = doms.length === 1 ? doms[0] : doms;
	                } catch (e) {
	                    console.error(key + ' need the right domMap');
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'getEvents',
	        value: function getEvents() {
	            var eventMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            this.eventMap = eventMap;
	            return this;
	        }
	    }, {
	        key: 'getEventsFn',
	        value: function getEventsFn() {
	            var eventFnMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            this.eventCache = eventFnMap;
	            return this;
	        }
	        //事件绑定

	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var eventMap = this.eventMap;

	            for (var key in eventMap) {
	                var _key$split = key.split(' ');

	                var _key$split2 = _slicedToArray(_key$split, 2);

	                var domName = _key$split2[0];
	                var eventType = _key$split2[1];
	                var eventName = eventMap[key];
	                this.domMap[domName].addEventListener(eventType, this.eventCache[eventName].bind(this));
	            }
	            return this;
	        }
	    }, {
	        key: 'unbindEvent',
	        value: function unbindEvent() {}

	        //钩子: 页面初始化(willAppear阶段)

	    }, {
	        key: 'getViewInit',
	        value: function getViewInit(fn) {
	            this.viewInit = fn && fn.bind(this) || function () {};
	            return this;
	        }

	        //钩子: 页面销毁阶段(willDisappear阶段)

	    }, {
	        key: 'getViewDestory',
	        value: function getViewDestory(fn) {
	            this.viewDestory = fn && fn.bind(this) || function () {};
	            return this;
	        }

	        //获取controller的初始化状态

	    }, {
	        key: 'getInitedStatus',
	        get: function get() {
	            return this.inited;
	        }
	    }, {
	        key: 'getRoute',
	        get: function get() {
	            return location.hash.split('/').join('.');
	        }
	    }]);

	    return Controller;
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	__webpack_require__(18);

	var _controller = __webpack_require__(16);

	var _eventEmitter = __webpack_require__(19);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ModelClass = Object.create(_eventEmitter2.default);

	//Model用以创建新模型(类),新模型用以创建实例
	ModelClass = {
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
	        return this;
	    },
	    include: function include() {
	        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        var included = obj.included;
	        for (var key in obj) {
	            this.prototype[key] = obj[key];
	        }
	        if (included) included.call(this);
	        return this;
	    },

	    prototype: {
	        init: function init() {}
	    },
	    create: function create() {
	        var include = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        var object = Object.create(this); //新模型继承至Model,调用init方法产生新实例
	        object.parent = this; //新模型.parent = Model

	        object.prototype = object.fn = Object.create(this.prototype);

	        if (include) object.include(include);
	        if (extend) object.extend(extend);

	        object.created();

	        return object;
	    },
	    init: function init() {
	        var instance = Object.create(this.prototype);
	        instance.parent = this; //实例.parent = 新模型

	        instance.init.apply(instance, arguments); //Model.prototype.init();
	        return instance;
	    }
	};

	var Model = ModelClass.create();

	//ajax  实例继承
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
	                return resolve(data.json());
	            });
	        });
	    },
	    get: function get() {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	        return new Promise(function (resolve, reject) {
	            fetch(url).then(function (data) {
	                return resolve(data.json());
	            });
	        });
	    }
	});

	//hash值
	Model.include({
	    getHash: function getHash() {
	        return window.location.hash.slice(2);
	    }
	});

	//页面初始化model数据
	Model.include({
	    pageInit: function pageInit() {}
	});

	//Model对象记录
	Model.include({
	    newRecord: true,
	    create: function create() {
	        this.newRecord = false;
	        //新模型.records[this.name] = this;
	        this.parent.records[this.name] = this.dup();
	    },
	    destory: function destory() {
	        delete this.parent.records[this.name];
	    },
	    update: function update() {
	        this.parent.records[this.name] = this.dup();
	    },
	    dup: function dup() {
	        return Object.assign({}, this);
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

	//controller在Model上进行注册
	Model.include({
	    controllers: {},
	    //这里的controller不能使用容器的选择器确定
	    registerCtrl: function registerCtrl(name, containerName) {
	        return this.controllers[name] || (this.controllers[name] = new _controller.Controller(name, containerName, this));
	    }
	});

	exports.default = Model;

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
	    function EventEmitter() {
	        _classCallCheck(this, EventEmitter);

	        this.cache = {};
	    }
	    //事件订阅


	    _createClass(EventEmitter, [{
	        key: "listen",
	        value: function listen(type, fn) {
	            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

	            !this.cache[type] && (this.cache[type] = []);
	            this.cache[type].push(fn);
	        }
	        //事件触发

	    }, {
	        key: "trigger",
	        value: function trigger() {
	            var type = [].shift.call(arguments),
	                fns = this.cache[type];

	            if (!fns || fns.length === 0) return false;

	            for (var i = 0, fn; fn = fns[i++];) {
	                fn[i].apply(this, [].slice.call(arguments, 1));
	            }
	        }
	        //fn参数不传时,默认清除所有绑定事件

	    }, {
	        key: "remove",
	        value: function remove(type, fn) {
	            var fns = this.cache[type];

	            if (!fns) return false;

	            if (!fn) {
	                fns && (fns.length = 0);
	            } else {
	                for (var i = 0, _fn; _f = fns[i++];) {
	                    if (_fn === fn) {
	                        fns.splice(i, 1);
	                    }
	                }
	            }
	        }
	    }]);

	    return EventEmitter;
	}();

	exports.default = EventEmitter;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(15);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Route = function () {
	    function Route() {
	        _classCallCheck(this, Route);

	        this.routes = {};
	        this.default = '';
	        this.useHash = false;
	        this.id = 0;
	        this.pageCache = {}; //在内存中进行缓存
	    }

	    _createClass(Route, [{
	        key: 'home',
	        value: function home() {
	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

	            this.default = path;
	            return this;
	        }
	    }, {
	        key: 'addRoute',
	        value: function addRoute(_ref) {
	            var path = _ref.path;
	            var viewInit = _ref.viewInit;
	            var viewDestory = _ref.viewDestory;
	            var context = _ref.context;
	            var template = _ref.template;
	            var templateUrl = _ref.templateUrl;
	            var viewBox = _ref.viewBox;

	            path = path.split('.').join('/');

	            var id = this.id++;

	            this.routes[path] = {
	                path: path,
	                viewInit: viewInit,
	                viewDestory: viewDestory,
	                context: context,
	                template: template,
	                templateUrl: templateUrl,
	                viewBox: viewBox,
	                id: id
	            };

	            return this;
	        }
	    }, {
	        key: 'handleRoute',
	        value: function handleRoute() {
	            var _this = this;

	            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var isFromHistory = arguments[1];

	            var curContext = void 0,
	                //上下文
	            oldPath = location.hash.slice(2),
	                oldRoute = void 0,
	                newRoute = void 0;

	            //页面销毁
	            if (oldRoute = this.routes[oldPath]) {
	                oldRoute.viewDestory && oldRoute.viewDestory();
	            }

	            var pathArr = path.split('/');

	            pathArr.forEach(function (item, index) {

	                var _path = pathArr.filter(function (a, b) {
	                    return b <= index;
	                }).join('/');

	                var _route = void 0,
	                    _viewBox = void 0;

	                if (_route = _this.routes[_path]) {
	                    _viewBox = document.querySelector(_route.viewBox);

	                    if (!_viewBox) return;

	                    _viewBox.innerHTML = _route.template;

	                    _route.viewInit.call(_route.context || window);

	                    if (index + 1 === pathArr.length) {
	                        if (!_this.useHash) {
	                            //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
	                            if (!isFromHistory) {
	                                history.pushState({ path: _path }, null, '#/' + _path);
	                            }
	                        } else {
	                            location.hash = '/' + _path;
	                        }

	                        //激活状路由样式处理
	                        _this.routeClassHandle(_path);

	                        return true;
	                    }
	                }
	            });

	            return false;
	        }
	    }, {
	        key: 'routeClassHandle',
	        value: function routeClassHandle(hash) {
	            hash = hash.split('/').join('-');
	            if (hash) {
	                document.querySelector('.route-active') && document.querySelector('.route-active').classList.remove('route-active');
	                document.querySelector('[data-href=' + hash + ']') && document.querySelector('[data-href=' + hash + ']').classList.add('route-active');
	            }
	        }
	    }, {
	        key: 'go',
	        value: function go(path) {
	            path = path.split('.').join('/');
	            this.handleRoute(path);
	        }
	    }, {
	        key: 'back',
	        value: function back() {}
	    }, {
	        key: 'registerCtrl',
	        value: function registerCtrl(path, ctrl) {
	            this.routes[path] ? this.routes[path].viewDestory = ctrl.viewDestory : '';
	        }
	    }, {
	        key: 'bootstrap',
	        value: function bootstrap() {
	            var _this2 = this;

	            if (!history.pushState) this.useHash = true;

	            if (!this.useHash) {
	                window.addEventListener('popstate', function (e) {
	                    var state = e.state;

	                    if (state && state.path) _this2.handleRoute(state.path, true);

	                    //TODO 添加对于state为空的情况的处理
	                });
	            } else {
	                window.addEventListener('hashchange', function (e) {
	                    _this2.handleRoute(location.hash.slice(2));
	                });
	            }

	            document.addEventListener('click', function (e) {
	                var href = e.target.dataset.href || '',
	                    oldHash = location.hash.slice(2);

	                //将data-href数据形式转化为路由形式
	                href = href.split('-').join('/'); //将data-href='ccc-aaa' --->>> 转化为 ccc/aaa  外部写法可能存在出入,但是在内部统一转化为a/b/c/d的形式


	                if (href) {
	                    //添加钩子 路由进行跳转时模型model上数据的处理
	                    if (href === oldHash) return;

	                    if (_this2.handleRoute(href)) {
	                        //阻止默认事件
	                        e.preventDefault();
	                    }
	                }
	            });

	            document.addEventListener('DOMContentLoaded', function (e) {
	                var router = _this2.routes[_this2.default],
	                    currHash = location.hash.slice(2),
	                    flag = false,
	                    viewBox = null,
	                    lastRoute = void 0;

	                var pathArr = currHash.split('/');

	                pathArr.forEach(function (item, index) {

	                    var _path = pathArr.filter(function (a, b) {
	                        return b <= index;
	                    }).join('/');

	                    var _route = void 0,
	                        _viewBox = void 0;

	                    if (_route = _this2.routes[_path]) {
	                        _viewBox = document.querySelector(_route.viewBox);

	                        if (!_viewBox) return;

	                        _viewBox.innerHTML = _route.template;

	                        _route.viewInit.call(_route.context || window);

	                        flag = true;
	                    }
	                });

	                //初始化active.route样式处理
	                _this2.routeClassHandle(currHash);

	                if (!flag) {

	                    viewBox = document.querySelector(router.viewBox);
	                    //渲染视图
	                    viewBox.innerHTML = router.template;

	                    router.viewInit.call(router.context || window);

	                    if (!_this2.useHash) {
	                        history.pushState({ path: router.path }, null, '#/' + router.path);
	                    } else {
	                        location.hash = '/' + router.path;
	                    }
	                }

	                //!flag ? router.viewInit.call(router.context || window) : '';
	            });
	        }
	    }]);

	    return Route;
	}();

	exports.default = Route;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<input type=\"number\" maxlength=12 class=\"account-phone\" placeholder=\"请输入手机号\">\n<a class=\"btn-orange\">获取验证码</a>"

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div table class=\"confirm-num\">\n    <p table=\"cell v-m h-c\">验证码已发送至 18510027836</p>\n</div>\n<div table class=\"input-arr\">\n    <input type=\"number\">\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n            \n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n    <div table=\"cell v-m h-c p25\">\n        <div class=\"arr-item\">\n        </div>\n    </div>\n</div>\n\n"

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<p>当前注册账号为18811002289</p>\n<input type=\"password\" maxlength=32 placeholder=\"请输入密码\" class=\"first-password\">\n<br/>\n<input type=\"password\" maxlength=32 placeholder=\"请再次输入密码\" class=\"confirm-password\">\n\n<a class=\"btn-orange\">点击我跳转至info页面</a>"

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"info\" table>\n    <div table=\"cell v-m h-c\">\n        1. 身份信息\n    </div>\n    <div table=\"cell v-m h-c\">\n        2. 公司信息\n    </div>\n    <div table=\"cell v-m h-c\">\n        3. 车辆信息\n    </div>\n    <div table=\"cell v-m h-c\">\n        4. 从业信息\n    </div>\n</div>\n\n<div class=\"info-container\">\n\n</div>"

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<h1>This is info-car page</h1>"

/***/ },
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);