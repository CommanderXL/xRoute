import {Controller} from 'jsLib/index';
import modelB from './b-model';
import {timeSelectComponent, cityComponent} from 'components/index';
import {dd} from 'jsLib/util';

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
    //console.log(123);
})


/*export {
    controllerB
}*/


module.exports = controllerB;


//controllerB.init();