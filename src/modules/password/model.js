import {Model} from 'jsLib/index';

let model = Model.init({
    name: 'password',
    pageInit() {
        console.log('This\'s is password page');
    }
});

model.save();

export default model;