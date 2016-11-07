import {Model} from 'jsLib/model';

let modelA = Model.init();

modelA.name = 'modelA';
modelA.setLocItem(modelA.name, 'HELLO WORLD');
modelA.submitData = {
    name: '',
    phone: null,
    sex: ''
};
//数据模型初始化
modelA.pageInit = function() {
    this.submitData.name = modelA.getLocItem(this.name);
}
modelA.save();

//console.log(Model);
//console.log(modelA.pageInit.valueOf());

export default modelA;