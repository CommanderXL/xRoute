export class Controller {
    constructor(name, containerName, model) {
        this.name = name;
        this.containerName = containerName || '';
        this.containerBox = null;
        this.domMap = {};
        this.domMapCache = {};
        this.eventCache = {};
        this.model = model || {};
        this.viewInit = null || function() {};
        this.viewDestory = null || function() {};
        
        this.inited = false;
    }
    //init函数
    init() {
        this.containerBox = document.querySelector(this.containerName);
        this.setDomMap();
        this.bindEvents();
        this.model.pageInit();
        this.viewInit();

        this.inited = true;
        
        return this;
    }
    setModelCache(obj = {}) {
        this.model = obj;
        return this;
    }
    getDomMap(obj = {}) {
        this.domMapCache = obj;
        return this;
    }
    //dom缓存
    setDomMap() {
        let obj = this.domMapCache;
        for(let key in obj) {
            this.domMap[key] = this.containerBox.querySelector(obj[key]);
        }
        console.log(this.domMap);
        return this;
    }

    getEvents(eventMap = {}) {
        this.eventMap = eventMap;
        return this;
    }

    getEventsFn(eventFnMap = {}) {
        this.eventCache = eventFnMap;
        return this;
    }
    //事件绑定
    bindEvents() {
        let eventMap = this.eventMap;

        for(let key in eventMap) {
            let [domName, eventType] = key.split(' '),
                eventName = eventMap[key];
            this.domMap[domName].addEventListener(eventType, this.eventCache[eventName]);
        }
        return this;
    }
    
    unbindEvent() {
        
    }
    
    //钩子: 页面初始化(willAppear阶段)
    getViewInit(fn) {
        this.viewInit = fn.bind(this) || function() {};
        return this;
    }

    //钩子: 页面销毁阶段(willDisappear阶段)
    getViewDestory(fn) {
        this.viewDestory = fn.bind(this) || function() {};
        return this;
    }

    //获取controller的初始化状态
    get getInitedStatus() {
        return this.inited;
    }
}