import model from './model';
import {util, dialog} from 'jsLib/index';

let controller = model.registerCtrl('passwordCtrl', '.public-container');

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
        firBlur(e) {
            let value = e.target.value;
            //show some tips
            (value.length < 6 || value.length > 32 || util.isNumAndStr(value)) && (console.log(123));
        },
        confBlur(e) {
            console.log(e.target.value);
        }
    })
    .getViewInit(function () {

    })


module.exports = controller;