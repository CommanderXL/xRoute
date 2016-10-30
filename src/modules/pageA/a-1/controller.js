import modelAA from './model';
import {util} from 'jsLib/util';

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
                value = this.value = value.substr(0, 4);
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
            if (len < 4) {
                util.addClass(that.domMap.itemArrs[len], 'red');
            }
        });

        this.domMap.inputEle.addEventListener('blur', function () {
            document.querySelector('.red') && util.removeClass(document.querySelector('.red'), 'red');
        })


    });


module.exports = controller;