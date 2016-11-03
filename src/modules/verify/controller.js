import model from './model';
import {dialog, util} from 'jsLib/index';
import Router from 'src/route';


let controller = model.registerCtrl('verify-ctrl', '.public-container');

controller
    .getDomMap({
        inputEle: 'input'
    })
    .getEvents({
        'inputEle input': 'getInputEvent',
        'inputEle blur': 'inputBlurEvent',
        'inputEle focus': 'inputFocusEvent'
    })
    .getEventsFn({
        getInputEvent(e) {
            
            let target = e.target,
                value = String() + target.value;

            if (value.length < 4) {
                document.querySelector('.red') && util.removeClass(document.querySelector('.red'), 'red');
                util.addClass(this.domMap.itemArrs[value.length], 'red');
            } else {
                if (value.length === 4) {
                    console.log(123);
                    //验证码验证
                    model.get('/api')
                        .then(function (data) {
                            if(data) Router.go('password')
                        });
                    //出现弹层,给以用户以提示    
                    //dd.dialog.alert('well done');

                }
                value.length > 4 && (value = target.value = value.substr(0, 4));
                util.removeClass(document.querySelector('.red'), 'red');
            }

            for (let i = 0; i < value.length; i++) {
                this.domMap.itemArrs[i].innerHTML = value[i];
            }

            for (let j = value.length; j < 4; j++) {
                this.domMap.itemArrs[j].innerHTML = '';
            }

        },
        inputBlurEvent() {
            document.querySelector('.red') && util.removeClass(document.querySelector('.red'), 'red');
        },
        inputFocusEvent(e) {
            let value = String() + e.target.value,
                len = value.length;
            len < 4 && (util.addClass(this.domMap.itemArrs[len], 'red'));
        }
    })
    .getViewInit(function () {
        this.domMap.itemArrs = this.containerBox.querySelectorAll('.arr-item');
    })


module.exports = controller;
