import {
    Route
} from 'jsLib/index';

const Router = new Route();

//  路由配置信息
//  页面销毁的回调放到的controller里面
Router
    .home('path1')
    .addRoute({
        path: 'path1',
        animate: 'zoomIn',
        viewBox: '.public-path1-container',
        template: require('modules/path1/index.html'),
        //  挂载controller
        pageInit() {
            console.time('route async path1');
            import ('modules/path1/controller')
            .then(module => {
                    let controller = module.default;
                    Router.registerCtrl('path1', new controller(this.viewBox))
                })
                .catch(e => console.log('chunk loading failed'))
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
        animate: 'zoomIn',
        template: require('modules/path2/index.html'),
        pageInit() {
            import ('modules/path2/controller')
            .then(module => {
                console.time('route async path2');
                let controller = module.default;
                Router.registerCtrl('path2', new controller(this.viewBox))
            })
            .catch(e => console.log('chunk loading failed'))
        },
        beforeEnter() {

        },
        beforeLeave() {

        }
    })

Router.bootstrap();


export default Router;