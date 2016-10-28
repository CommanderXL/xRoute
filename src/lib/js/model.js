import 'whatwg-fetch';
import {Controller} from './controller';

let Model = {
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
        let object = Object.create(this);
        object.parent = this;

        object.prototype = object.fn = Object.create(this.prototype);

        object.created();

        return object;
    },
    init() {
        let instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
        return instance;
    }
}


//ajax
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

//页面初始化内容
Model.include({
    pageInit() {

    }
});

//Model对象记录
Model.include({
    newRecord: true,
    create() {
        this.newRecord = false;
        //parent指向Model.create()创建的model中
        this.parent.records[this.name] = this;
    },
    destory() {
        delete this.parent.records[this.name];
    },
    update() {
        this.parent.records[this.name] = this.name;
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

//获取controller操作
Model.include({
    controllers: {},
    //这里的controller不能使用容器的选择器确定
    registerController(name, containerName) {
        return this.controllers[name] || (this.controllers[name] = new Controller(name, containerName,this));
    }
})


let totalModel = Model.create();


export {totalModel}