class RequestHandler {
    constructor() {
        
    }
}


class MethodA extends RequestHandler {
    
}



class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.toString();
    }
    
    test() {
        const a = new Test(this);
        console.log(Function.prototype.toString.call(a));
    }
    
    toString() {
        
    }
}


class ClassPoint extends Point {
    toString() {
        console.log(123);
    }
}

//es6中子类继承父类时，会自动调用父类的构造函数
//即在定义es6子类时，就算没有写constructor也会默认执行
/**
 * class ClassPoint extends Point {
 *     constructor(...args) {
 *          super(...args);    
 *      }
 * }
 */
var point = new ClassPoint();




Function.prototype.bind = function() {
    let self = this,    //保存原函数
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
    return () => {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        //执行新的函数，把之前传入的context当做新函数体内的this
        //并且组合两次分别传入的参啊,作为新函数的参数
    }
}

var obj = {
    name: 'sven'
}

var func = function(a, b, c, d) {
    alert(this.name);   //输出 sven
    alert([a, b, c, d]);    //输出[1, 2, 3, 4]
}.bind(obj, 1, 2);

func(3, 4);