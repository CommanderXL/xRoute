import {totalModel} from '../../lib/model'
import {test} from '../pageB/b-controller'


var modelB = totalModel.init();
modelB.name = 'modelB';
modelB.save();

modelB.post('de').then((data) => {
    console.log(123);
})

export {modelB}