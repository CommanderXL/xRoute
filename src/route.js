import {route as Router} from 'jsLib/index';
//model只涉及到数据模型,而controller即要和model同时还要和view进行交互.因此这里应该是引入controller
import {controller} from 'modules/pageA/a-controller';
//import {controllerB} from 'modules/pageB/b-controller';
//import {controllerC} from 'modules/pageC/controller'

let viewA = require('modules/pageA/a.html');
let viewB = require('modules/pageB/b.html');
let viewC = require('modules/pageC/c.html');



//require.ensure([], function() {}, str)  
//这里接收的第三个参数用以将异步加载的模块都打包成一个文件.不同于entry和CommonChunkPlugin的作用


Router.addRoute('aaa', function () {
    //modelA.pageInit();
    let page = document.querySelector('#container');
    //if (!controller.getInitedStatus) {
        page.innerHTML = viewA;
        controller.init();
    //}
},{cache: 'on'}, controller.viewDestory, viewA);


Router.addRoute('aaa.1', function() {
    require.ensure([], function() {
        let controller = require('modules/pageA/a-1/controller');
        let page = document.querySelector('#container');

        page.innerHTML = require('modules/pageA/a-1/index.html');
        controller.init();
    })
});

Router.addRoute('bbb', () => {
    //modelB.pageInit();
    //require.ensure([], function() {
        let controllerB = require('modules/pageB/b-controller');
        let page = document.querySelector('#container');

        //require('components/index');
        page.innerHTML = viewB;
        controllerB.init();
    //});
},{cache: 'on'});


Router.addRoute('ccc', () => {
    require.ensure([], function() {
        let controllerC = require('modules/pageC/controller');
        let page = document.querySelector('#container');
        page.innerHTML = viewC;
        controllerC.init();
    })
});


Router.addRoute('ccc.1', () => {
    let page = document.querySelector('.c-container');
    page.innerHTML = require('modules/pageC/c-1/index.html');
    console.log('This\'s pagec-1');
});


Router.addRoute('ccc.2', () => {
    let page = document.querySelector('.c-container');
    page.innerHTML = require('modules/pageC/c-2/index.html');
    console.log('This\'s pagec-2');
});


Router.addRoute('password', () => {
    require.ensure([], function() {
        let controller = require('modules/password/controller');
        let page = document.querySelector('#container');
        page.innerHTML = require('modules/password/index.html');
        controller.init();
    })
})


Router.bootstrap();