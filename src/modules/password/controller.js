import model from './model';
import {util, dd} from 'jsLib/util';

let controller = model.registerController('passwordCtrl', '#container');

controller
    .getDomMap({
        firPassWord: '.first-password',
        confirmPassWord: '.confirm-password'
    })
    .getEvents({
        'firPassWord blur': 'firBlur',
        'confirmPassWord blur': 'confBlur'
    })
    .getEventsFn({
        firBlur() {
            let value = this.value;
            //show some tips
            (value.length < 6 || value.length > 32 || util.isNumAndStr(value)) && (console.log(123));
        },
        confBlur() {
            console.log(this.value);
        }
    })
    .getViewInit(function () {

    })


module.exports = controller;