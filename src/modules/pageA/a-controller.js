import {Controller} from '../../lib/js/controller';
import modelA from './a-model';
import {util, elementSet} from '../../lib/js/util';

let controller = modelA.registerController('.page-container:first-child');

controller
.getDomMap({
    aContainer: '.a-container'
})
.getBindEvents({
    aContainer: {
        actionName: 'click',
        action() {
            elementSet.css(this, {color: 'red'});
        }
    }
})

export {
    controller
}
