import {
    Controller
} from 'jsLib/index';
import modelC from './model';

let controllerC = modelC.registerController('controlC', "#container");

controllerC
.getDomMap({
    btn: '#btnc'
})

module.exports = controllerC;

//export {controllerC};