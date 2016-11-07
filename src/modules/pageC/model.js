import {Controller} from 'jsLib/controller';
import {Model} from 'jsLib/model';

let modelC = Model.init();

modelC.name = 'modelC';

modelC.pageInit = function() {
    //console.log('This\'s is page c');
}

modelC.save();


export default modelC;