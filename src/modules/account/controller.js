import model from './model';
import {util, dialog} from 'jsLib/index';
import Router from 'src/route';

let controller = model.registerCtrl('account-ctrl', '.public-container');

controller
    .getDomMap({
        phoneInputEle: '.account-phone',
        btnEle: '.btn-orange',
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
            Router.go('verify');
        }
    })
    .getViewInit(function() {
        this.domMap.phoneInputEle.value = model.phone;
    })
    .getViewDestory(function() {
        model.phone = this.domMap.phoneInputEle.value;
        model.setLocItem('phone', model.phone);
    });

Router.registerCtrl(util.getCurrPath(), controller);



module.exports = controller;