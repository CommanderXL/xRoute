export class Controller {
    constructor(container) {
        this.container = document.querySelector(container);
        this.domMap = {};
        this.init();
    }
    //init函数
    init() {
        console.log(this.container);
        return this;
    }
    //dom缓存
    setDomMap(obj = {}) {
        for(let key in obj) {
            this.domMap[key] = this.container.querySelector(obj[key]);
        }
        return this;
    }
    //事件绑定
    bindEvents(obj = {}) {
        for(let key in obj) {
            let item = obj[key];
            this.domMap[key].addEventListener(item.actionName, item.action);
        }
    }
}