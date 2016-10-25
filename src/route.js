import {route as Router} from './lib/js/xRoute';
//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
/*import {modelA} from './modules/pageA/a-model';
import {modelB} from './modules/pageB/b-model';*/
import {controller} from './modules/pageA/a-controller';


Router.addRoute('aaa', function () {
    //modelA.pageInit();
    let page = document.querySelector('.page-container:first-child');
    if (!controller.getInitedStatus) {
        page.innerHTML = require('modules/pageA/a.html');
        controller.init();
    }
},{cache: 'on'}, controller.viewDestory);

Router.addRoute('bbb', () => {
    //modelB.pageInit();
    let page = document.querySelector('.page-container:nth-child(2)');
    page.innerHTML = require('modules/pageB/b.html');
},{cache: 'on'});


Router.bootstrap();