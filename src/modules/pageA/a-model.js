import {totalModel} from '../../lib/js/model';

require('./a.less');


var modelA = totalModel.init();


modelA.name = 'modelA';
modelA.setLocItem(modelA.name, 'HELLO WORLD');
modelA.submitData = {
    name: '',
    phone: null,
    sex: ''
};
//模型初始化
modelA.pageInit = function() {
    console.log(modelA.getLocItem(this.name));
}
modelA.save();

export default modelA;