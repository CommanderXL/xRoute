import {Route, Model, dialog} from 'jsLib/index';

const Router = new Route();

//添加全局事件绑定
const App = Model.init({name: 'App'});

App
.listen('test', function(str) {     //转场动画
    let opts = {
        icon: {
            width: '43px',
            height: '34px',
            url: "http://static.xiaojukeji.com/webapp/images/i-loading.gif"
        }
    }
    console.log('添加转场动画');
    //dialog.flatLoading(opts);
})
/*.listen('error', function(str) {    //监听错误事件
    dialog.alert(str);
})*/


Router
.home('account')
.pageLoading(function() {
    App.trigger('test', 'well done');
});


Router
.addRoute({
    path: 'account',
    viewBox: '.public-container',
    template: require('modules/account/index.html'),
    viewInit() {
        require.ensure([], () => {
            let controller = require('modules/account/controller');
            controller.init();
        }, 'account');
    },
    viewDestory() {

    }
})
.addRoute({
    path: 'verify',
    viewBox: '.public-container',
    template: require('modules//verify/index.html'),
    viewInit() {
        require.ensure([], () => {
            let controller = require('modules/verify/controller');
            controller.init();
        }, 'verify');
    }
})
.addRoute({
    path: 'password',
    viewBox: '.public-container',
    template: require('modules/password/index.html'),
    viewInit() {
        require.ensure([], function () {
            let controller = require('modules/password/controller');
            controller.init();
        }, 'password');
    }
})
.addRoute({
    path: 'info',
    viewBox: '.public-container',
    template: require('modules/info/index.html'),
    viewInit() {
        require.ensure([], function() {
            let controller = require('modules/info/controller');
            controller.init();
        }, 'info');
    }
})
.addRoute({
    path: 'info.car',
    viewBox: '.info-container',
    template: require('modules/info/car/index.html'),
    viewInit() {
        require.ensure([], function() {
            let controller = require('modules/info/car/controller');
            controller.init();
        }, 'info-car');
    }
})




//require.ensure([], function() {}, str)  
//这里接收的第三个参数用以将异步加载的模块都打包成一个文件.不同于entry和CommonChunkPlugin的作用
/*Router.addRoute({
    path: 'aaa',
    viewInit() {
        //modelA.pageInit();
        let page = document.querySelector('#container');
        //if (!controller.getInitedStatus) {
        page.innerHTML = viewA;
        controller.init();
        //}
    },
    viewDestory: controller.viewDestory
});*/

/*Router.addRoute({
    path: 'aaa.1',
    viewInit: function () {
        require.ensure([], function () {
            let controller = require('modules/pageA/a-1/controller');
            let page = document.querySelector('#container');

            page.innerHTML = require('modules/pageA/a-1/index.html');
            controller.init();
        }, 'page-a')
    }
});*/

/*Router.addRoute({
    path: 'bbb',
    viewInit() {
        //modelB.pageInit();
        //require.ensure([], function() {
        let controllerB = require('modules/pageB/b-controller');
        let page = document.querySelector('#container');

        //require('components/index');
        page.innerHTML = viewB;
        controllerB.init();
        //});
    }
})*/

/*Router.addRoute({
    path: 'ccc',
    viewInit() {
        require.ensure([], function () {
            let controllerC = require('modules/pageC/controller');
            let page = document.querySelector('#container');
            page.innerHTML = viewC;
            controllerC.init();
        }, 'page-c')
    }
})*/

/*Router.addRoute({
    path: 'ccc.1',
    viewInit() {
        let page = document.querySelector('.c-container');
        page.innerHTML = require('modules/pageC/c-1/index.html');
        console.log('This\'s pagec-1');
    }
})
*/

/*Router.addRoute({
    path: 'ccc.2',
    viewInit() {
        let page = document.querySelector('.c-container');
        page.innerHTML = require('modules/pageC/c-2/index.html');
        console.log('This\'s pagec-2');
    }
})*/

Router.bootstrap();


export default Router;