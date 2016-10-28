import {
    Controller
} from 'jsLib/controller';
import modelB from './b-model';

let controllerB = modelB.registerController('controlB', '#container');

controllerB
.getDomMap({
    clickBtn: '#btn'
})
.getBindEvents({
    clickBtn: {
        actionName: 'click',
        action() {
            console.log('Well done');
        }
    }
})
.getViewInit(function() {
    console.log(123);
})


/*export {
    controllerB
}*/


module.exports = controllerB;


//controllerB.init();