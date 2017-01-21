import { Route } from 'jsLib/index';

const Router = new Route();

//  路由配置信息
//  页面销毁的回调放到的controller里面
Router
    .home('path1')
    .addRoute({
        path: 'path1',
        animate: 'slideInRight',
        viewBox: '.public-path1-container',
        template: require('modules/path1/index.html'),
        //  挂载controller
        pageInit() {
            console.time('route async path1');
            require.ensure([], () => {
                let controller = require('modules/path1/controller');
                Router.registerCtrl('path1', new controller(this.viewBox));
                console.timeEnd('route async path1');
            }, 'path');
        },
        //  进入路由跳转之前
        beforeEnter() {

        },
        //  路由跳转前
        beforeLeave() {

        }
    })
    .addRoute({
        path: 'path2',
        viewBox: '.public-path2-container',
        animate: 'slideInRight',
        template: require('modules/path2/index.html'),
        pageInit() {
            console.time('route async path2');
            require.ensure([], () => {
                let controller = require('modules/path2/controller');
                Router.registerCtrl('path2', new controller(this.viewBox));
                console.timeEnd('route async path2');
            }, 'path');
        }
    })

Router.bootstrap();


export default Router;