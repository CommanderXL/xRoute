import 'whatwg-fetch';
import {Controller} from './controller';
import EventEmitter from './eventEmitter';

let Model = Object.create(EventEmitter);

//Model用以创建新模型,新模型用以创建实例
Model = {
    records: {},
    //model创建后的回调
    created() {
        this.records = {};  //创建新的model后,清空records,避免records被其他的model共享而发生副作用
    },
    extend(obj = {}) {
        let extended = obj.extended;
        for (let key in obj) {
            this[key] = obj[key];
        }
        if (extended) extended.call(this);
    },
    include(obj = {}) {
        let included = obj.included;
        for (let key in obj) {
            this.prototype[key] = obj[key];
        }
        if (included) included.call(this);
    },
    prototype: {
        init() {

        }
    },
    create() {
        let object = Object.create(this);   //新模型继承至Model,调用init方法产生新实例
        object.parent = this;               //新模型.parent = Model

        object.prototype = object.fn = Object.create(this.prototype);

        object.created();

        return object;
    },
    init() {
        let instance = Object.create(this.prototype);
        instance.parent = this;             //实例.parent = 新模型
        instance.init.apply(instance, arguments);   //Model.prototype.init();
        return instance;
    }
}


//ajax  实例继承
Model.include({
    post(url = '', obj = {}) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((data) => {
                //添加正确处理和错误处理的函数 reject
                resolve(data.json());
            })
        })
    },
    get(url = '') {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((data) => {
                    //正确处理的方式
                    resolve(data.json());
                })
        })
    }
});

//hash值
Model.include({
    getHash() {
        return window.location.hash.slice(2);
    }
});

//页面初始化model数据
Model.include({
    pageInit() {

    }
});

//Model对象记录
Model.include({
    newRecord: true,
    create() {
        this.newRecord = false;
        //新模型.records[this.name] = this;
        this.parent.records[this.name] = this.dup();
    },
    destory() {
        delete this.parent.records[this.name];
    },
    update() {
        this.parent.records[this.name] = this.dup();
    },
    dup() {
        return Object.assign({}, this);
    },
    save() {
        this.newRecord ? this.create() : this.update();
    }
});

Model.extend({
    find(name = '') {
        return this.records[name] || console.log('Unkonwn record');
    }
});


//localstorage操作
Model.include({
    setLocItem(key = '', value) {
        let itemValue,
            type = typeof value;
        if (type === 'string' || type === 'number') {
            itemValue = value;
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
            itemValue = JSON.stringify(value);
        } else {
            itemValue = undefined;
        }
        localStorage.setItem(key, itemValue);
    },
    getLocItem(key = '') {
        return localStorage.getItem(key);
    },
    removeLocItem(key = '') {
        return localStorage.removeItem(key);
    }
});




//controller在Model上进行注册
Model.include({
    controllers: {},
    //这里的controller不能使用容器的选择器确定
    registerController(name, containerName) {
        return this.controllers[name] || (this.controllers[name] = new Controller(name, containerName,this));
    }
})


let totalModel = Model.create();


export {totalModel}