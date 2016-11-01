import model from './model';
import {util, dd} from 'jsLib/util';

let controller = model.registerController('passwordCtrl', '#container');

controller
    .getDomMap({
        firPassWord: '.first-password',
        confirmPassWord: '.confirm-password'
    })
    .getBindEvents({
        firPassWord: {
            actionName: 'blur',
            action() {
                let value = this.value;
                //show some tips
                (value.length < 6 || value.length > 32 || util.isNumAndStr(value)) && (console.log(123));
            }
        },
        confirmPassWord: {
            actionName: 'blur',
            action() {
                console.log(this.value);
            }
        }
    })
    .getViewInit(function() {
        
    })

module.exports = controller;