import {
    Controller
} from 'jsLib/index';
import modelC from './model';

let controllerC = modelC.registerController('controlC', "#container");

controllerC
.getDomMap({
    btn: '#btnc'
})
.getBindEvents({
    btn: {
        actionName: 'click',
        action() {
            console.log('C按钮点击');
        }
    }
})

module.exports = controllerC;

//export {controllerC};