import {totalModel} from 'jsLib/model'


var modelB = totalModel.init();
modelB.name = 'modelB';
modelB.pageInit = function() {
    console.log('This\'s is page B');
}
modelB.save();


//console.log(modelB.pageInit.valueOf());

//console.log(totalModel.find('modelA'), totalModel.find('modelB'));



export default modelB