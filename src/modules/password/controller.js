import model from './model';
import {util, dialog} from 'jsLib/index';
import Router from 'src/route';

let controller = model.registerCtrl('passwordCtrl', '.public-container');

controller
    .getDomMap({
        firPassWord: '.first-password',
        confirmPassWord: '.confirm-password',
        btn: '.btn-orange'
    })
    .getEvents({
        'firPassWord blur': 'firBlur',
        'confirmPassWord blur': 'confBlur',
        'btn click': 'pageGo'
    })
    .getEventsFn({
        firBlur(e) {
            let value = e.target.value;
            //show some tips
            (value.length < 6 || value.length > 32 || util.isNumAndStr(value)) && (console.log(123));
        },
        confBlur(e) {
            console.log(e.target.value);
        },
        pageGo() {
            Router.go('info.car');   
        }
    })
    .getViewInit(function () {

    })


module.exports = controller;