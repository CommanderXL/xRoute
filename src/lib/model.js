import 'whatwg-fetch';

let Model = {
    records: [],
    //model创建后的回调
    created() {

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
                resolve(data);
            })
        })
    }
});

Model.include({
    getHash() {
        return window.location.hash;
    }
});

Model.include({
    pageInit() {
        console.log('this\'s page ');
    }
})


export {Model}