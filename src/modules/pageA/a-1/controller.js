import modelAA from './model';
import {util, dd} from 'jsLib/util';
import {route} from 'jsLib/index';
//模块的粒度太大,打包的时候将其他组件也打包进去了

let controller = modelAA.registerController('modelAA', '#container');

controller
    .getDomMap({
        inputEle: 'input',
        itemEle1: '.arr-item:first-child',
        itemEle2: '.arr-item:nth-child(2)',
        itemEle3: '.arr-item:nth-child(3)',
        itemEle4: '.arr-item:nth-child(4)'
    })
    .getBindEvents({
        inputEle: {
            actionName: 'click',
            action() {

            }
        },
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

                    route.go('password');
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