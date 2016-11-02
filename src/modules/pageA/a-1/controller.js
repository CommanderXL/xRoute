import modelAA from './model';
import {util, dd} from 'jsLib/util';
import Router from 'src/route';
import {Picker} from 'components/index';
//模块的粒度太大,打包的时候将其他组件也打包进去了

let controller = modelAA.registerController('modelAA', '#container');

var data1 = [
    {
        text: '小美',
        value: 1
    }, {
        text: '猪猪',
        value: 2
    }
];

var data2 = [
    {
        text: '张三',
        value: 1
    },
    {
        text: '李四',
        value: 2
    },
    {
        text: '王五',
        value: 3
    },
    {
        text: '赵六',
        value: 4
    },
    {
        text: '吴七',
        value: 5
    },
    {
        text: '陈八',
        value: 6
    },
    {
        text: '杜九',
        value: 7
    },
    {
        text: '黄十',
        value: 8
    },
    {
        text: '呵呵',
        value: 9
    },
    {
        text: '哈哈',
        value: 10
    },
    {
        text: '嘿嘿',
        value: 11
    },
    {
        text: '啦啦',
        value: 12
    }
];

var data3 = [
    {
        text: '开心',
        value: 1
    }, {
        text: '生气',
        value: 2
    },
    {
        text: '搞笑',
        value: 3
    }, {
        text: '难过',
        value: 4
    }
];
var picker = new Picker({
    data: [data1, data2, data3],
    selectedIndex: [0, 1, 2],
    title: '我们都是小学生'
});

controller
    .getDomMap({
        inputEle: 'input',
        itemEle1: '.arr-item:first-child',
        itemEle2: '.arr-item:nth-child(2)',
        itemEle3: '.arr-item:nth-child(3)',
        itemEle4: '.arr-item:nth-child(4)',
        btn: '.btn'
    })
    .getBindEvents({
        inputEle: {
            actionName: 'click',
            action() {

            }
        },
        btn: {
            actionName: 'click', 
            action() {
                picker.show();
            }
        }
    })
    .getViewInit(function () {

        let that = this;

        this.domMap.itemArrs = document.querySelectorAll('.arr-item');


        this.domMap.inputEle.addEventListener('input', function () {
            let value = String(this.value);

            if (value.length < 4) {
                document.querySelector('.red') && util.removeClass(document.querySelector('.red'), 'red');
                util.addClass(that.domMap.itemArrs[value.length], 'red');
            } else {
                if(value.length === 4) {
                    //验证码验证
                    modelAA.get('/api')
                        .then(function(data) {
                            console.log(data);
                        });

                    Router.go('password');
                    //出现弹层,给以用户以提示    
                    //dd.dialog.alert('well done');

                }
                value.length > 4 && (value = this.value = value.substr(0, 4));
                util.removeClass(document.querySelector('.red'), 'red');
            }

            for (let i = 0; i < value.length; i++) {
                that.domMap.itemArrs[i].innerHTML = value[i];
            }

            for (let j = value.length; j < 4; j++) {
                that.domMap.itemArrs[j].innerHTML = '';
            }

        });

        this.domMap.inputEle.addEventListener('focus', function () {
            let value = String(this.value),
                len = value.length;
            len < 4 && (util.addClass(that.domMap.itemArrs[len], 'red'));
        });

        this.domMap.inputEle.addEventListener('blur', function () {
            document.querySelector('.red') && util.removeClass(document.querySelector('.red'), 'red');
        })


    });


module.exports = controller;