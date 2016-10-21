import {route as Router} from './lib/xRoute';
//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
/*import {modelA} from './modules/pageA/a-model';
import {modelB} from './modules/pageB/b-model';*/
import {controller} from './modules/pageA/a-controller';

Router.addRoute('aaa', () => {
    //modelA.pageInit();
    document.querySelector('#container').innerHTML = require('raw!modules/pageA/a.html');
    controller.init();
});

Router.addRoute('bbb', () => {
    //modelB.pageInit();
    document.querySelector('#container').innerHTML = require('raw!modules/pageB/b.html');
});