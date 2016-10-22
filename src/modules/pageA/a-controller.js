import {Controller} from '../../lib/js/controller';
import modelA from './a-model';
import {util, elementSet} from '../../lib/js/util';

let controller = modelA.registerController('.page-container:first-child');

controller
.getDomMap({
    aContainer: '.a-container',
    myName: '.myName',
    myPhone: '.myPhone'
})
.getBindEvents({
    aContainer: {
        actionName: 'click',
        action() {
            elementSet.css(this, {color: 'red'});
        }
    }
})
//页面状态初始化.从localstorage中获取
.getViewInit(function() {
    let doms = this.domMap;
    doms.myName.value = modelA.submitData.name;
});

export {
    controller
}
