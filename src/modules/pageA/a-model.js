import {totalModel} from '../../lib/js/model';

require('./a.less');


var modelA = totalModel.init();
modelA.name = 'modelA';
modelA.submitData = {
    name: '',
    phone: null,
    sex: ''
}
modelA.save();

export default modelA;