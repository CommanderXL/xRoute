import {Controller} from 'jsLib/index';
import modelB from './b-model';
import {timeSelectComponent, cityComponent} from 'components/index';
import {dd} from 'jsLib/util';

let controllerB = modelB.registerController('controlB', '#container');

controllerB
.getDomMap({
    clickBtn: '#btn'
});

module.exports = controllerB;


//controllerB.init();