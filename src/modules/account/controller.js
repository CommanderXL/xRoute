import model from './model';
import {util, dialog} from 'jsLib/index';
import Router from 'src/route';

let controller = model.registerCtrl('account-ctrl', '.public-container');


controller
    .getDomMap({
        phoneInputEle: '.account-phone',
        btnEle: '.btn',
    })
    .getEvents({
        'phoneInputEle blur': 'checkPhone',
        'btnEle click': 'getCode'
    })
    .getEventsFn({
        checkPhone() {
            console.log(123);
        },
        getCode() {
            console.log(234);
            Router.go('account/verify')
        }
    });

module.exports = controller;