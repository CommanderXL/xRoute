export class Controller {
    constructor(containerName, model) {
        this.containerName = containerName || '';
        this.containerBox = null;
        this.domMap = {};
        this.domMapCache = {};
        this.eventCache = {};
        this.model = model || {};
        
        this.inited = false;
    }
    //init函数
    init() {
        this.containerBox = document.querySelector(this.containerName);
        this.setDomMap();
        this.bindEvents();
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
        return this;
    }
    getBindEvents(obj = {}) {
        this.eventCache = obj;
        return this;
    }
    //事件绑定
    bindEvents() {
        let obj = this.eventCache;
        for(let key in obj) {
            let item = obj[key];
            this.domMap[key].addEventListener(item.actionName, item.action);
        }
        
        this.inited = true;
    }
    
    unbindEvent() {
        
    }
}