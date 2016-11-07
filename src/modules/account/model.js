import {Model} from 'jsLib/index'

let model = Model.init({
    name: 'account',
    pageInit() {
        this.phone = this.getLocItem('phone');
    }
});

console.log(model);

model.save();

export default model;