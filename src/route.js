import {route as Router} from 'jsLib/xRoute';
//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
/*import {modelA} from './modules/pageA/a-model';
import {modelB} from './modules/pageB/b-model';*/
import {controller} from 'modules/pageA/a-controller';
import {controllerB} from 'modules/pageB/b-controller';
import {controllerC} from 'modules/pageC/controller'

let viewA = require('modules/pageA/a.html');
let viewB = require('modules/pageB/b.html');
let viewC = require('modules/pageC/c.html');

Router.addRoute('aaa', function () {
    //modelA.pageInit();
    let page = document.querySelector('#container');
    //if (!controller.getInitedStatus) {
        page.innerHTML = viewA;
        controller.init();
    //}
},{cache: 'on'}, controller.viewDestory, viewA);

Router.addRoute('bbb', () => {
    //modelB.pageInit();
    let page = document.querySelector('#container');
    page.innerHTML = viewB;
    controllerB.init();
},{cache: 'on'});


Router.addRoute('ccc', () => {
    let page = document.querySelector('#container');
    page.innerHTML = viewC;
    controllerC.init();
})


Router.bootstrap();