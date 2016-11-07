import {Model} from 'jsLib/model'


var modelB = Model.init();
modelB.name = 'modelB';
modelB.pageInit = function() {
    //console.log('This\'s is page B');
}
modelB.save();


//console.log(modelB.pageInit.valueOf());

//console.log(Model.find('modelA'), Model.find('modelB'));



export default modelB