import 'whatwg-fetch';
import {Controller} from './controller';
import EventEmitter from './eventEmitter';

if(typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {};
        F.prototype = o;
        return new F();
    };
};

/*class ModelClass extends EventEmitter {
    constructor() {
        super();
    }
}*/

//Model用以创建新模型父类),新模型用以创建实例
let ModelClass = {
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
        return this;
    },
    include(obj = {}) {
        let included = obj.included;
        for (let key in obj) {
            this.prototype[key] = obj[key];
        }
        if (included) included.call(this);
        return this;
    },
    prototype: {
        init() {},
        initializer() {}
    },
    //创建父类
    create(include = {}, extend = {}) {
        let object = Object.create(this);   //新模型继承至Model,调用init方法产生新实例
        object.parent = this;               //新模型.parent = ModelClass

        object.prototype = object.fn = Object.create(this.prototype);

        if(include) object.include(include);
        if(extend) object.extend(extend);

        object.created();

        return object;
    },
    //实例化
    init({name = '', pageInit = function() {}}) {
        let instance = Object.create(this.prototype);
        instance.parent = this;                     //实例.parent = 新模型

        instance.initializer.call(instance, pageInit);
        instance.init.call(instance, name);   //Model.prototype.init();
        return instance;
    }
}

//事件继承
ModelClass.include(EventEmitter);

//原型上添加方法. 父类
let Model = ModelClass.create({
    init(name = '') {
        this.name = name;
    },
    initializer(fn = function() {}) {
        this.pageInit = fn;
    }
    //initializer model初始化的方法
});


//Model类创建新子类
/*
Model.extend({
    create() {

    }
})*/

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
            }).then(data => resolve(data.json()))
        })
    },
    get(url = '') {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(data => resolve(data.json()));
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
    dup() {     //对象复制
        let result = this.parent.init({name: this.name, pageInit: this.pageInit});
        result.newRecord = this.newRecord;
        return this;
        //return Object.assign({}, this);     //对象复制
    },
    save() {
        this.newRecord ? this.create() : this.update();
        return this;
    }
});

Model.extend({
    find(name = '') {
        return this.records[name] || console.error('Unkonwn record');
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
    registerCtrl(name, containerName) {
        return this.controllers[name] || (this.controllers[name] = new Controller(name, containerName, this));
    }
})

export default Model;