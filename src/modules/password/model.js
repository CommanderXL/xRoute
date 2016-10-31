import {totalModel} from 'jsLib/model';

let model = totalModel.init();

model.name = 'password';

model.password = {
    num: null
}

model.save();

export default model;