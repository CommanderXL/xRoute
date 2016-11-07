import {Model} from 'jsLib/index'

let model = Model.init();

model.name = 'account';

model.pageInit = function() {
    this.phone = this.getLocItem('phone');
};

model.save();


export default model;