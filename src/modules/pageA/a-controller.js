import {Controller} from '../../lib/controller';
import modelA from './a-model';
import {util} from '../../lib/util';

let controller = modelA.registerController('#container');

controller
.getDomMap({
    aContainer: '.a-container'
})
.getBindEvents({
    aContainer: {
        actionName: 'click',
        action() {
            console.log('Hello world');
        }
    }
})

export {
    controller
}
