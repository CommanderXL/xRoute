import {Controller} from 'jsLib/controller';
import {totalModel} from 'jsLib/model';

let modelC = totalModel.init();

modelC.name = 'modelC';

modelC.pageInit = function() {
    //console.log('This\'s is page c');
}

modelC.save();


export default modelC;