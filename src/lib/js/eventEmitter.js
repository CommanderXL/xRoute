export default class EventEmitter {
    constructor() {
        this.cache = [];
    }

    listen(type, fn, context = this) {
        !this.cache[type] && (this.cache[type] = []);
        this.cache[type].push(fn);
    }

    trigger() {
        let type = [].shift.call(arguments),
            fns = this.cache[type];

        if(!fns || fns.length === 0) return false;

        for(let i = 0, fn; fn = fns[i++];) {
            fn[i].apply(this, [].slice.call(arguments, 1));
        }    
        
    }

    //fn参数不传时,默认清除所有绑定事件
    remove(type, fn) {
        let fns = this.cache[type];

        if(!fns) return false;

        if(!fn) {
            fns && (fns.length = 0);
        } else {
            for(let i = 0, _fn; _f = fns[i++];) {
                if(_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }
}