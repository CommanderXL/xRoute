import {Model} from 'jsLib/index';

let model = Model.init();

model.name = 'password';

model.password = {
    num: null
}

model.save();

export default model;