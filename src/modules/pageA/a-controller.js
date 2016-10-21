import {Controller} from '../../lib/controller';
import {modelA} from './a-model';


let controller = modelA.registerController('#container');

export {
    controller
}
