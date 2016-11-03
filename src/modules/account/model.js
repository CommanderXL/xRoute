import {totalModel} from 'jsLib/model'

let model = totalModel.init();

model.name = 'account';

model.pageInit = function() {
    this.phone = this.getLocItem('phone');
};

model.save();


export default model;