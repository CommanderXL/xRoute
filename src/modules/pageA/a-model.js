import {totalModel} from '../../lib/model';
import {test} from './a-controller';


var modelA = totalModel.init();
modelA.name = 'modelA';
modelA.save();

export {modelA}