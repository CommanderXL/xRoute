import {totalModel} from 'jsLib/model';
require('./a.less');

let modelA = totalModel.init();

modelA.name = 'modelA';
modelA.setLocItem(modelA.name, 'HELLO WORLD');
modelA.submitData = {
    name: '',
    phone: null,
    sex: ''
};
//模型初始化
modelA.pageInit = function() {
    this.submitData.name = modelA.getLocItem(this.name);
}
modelA.save();

export default modelA;