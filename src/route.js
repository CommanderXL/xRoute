import { Route } from 'jsLib/index';

const Router = new Route();

Router
    .home('path1')
    .addRoute({
        path: 'path1',
        viewBox: '.public-container',
        template: require('modules/path1/index.html'),
        pageInit() {
            require.ensure([], () => {
                let controller = require('modules/path1/controller');
                Router.registerCtrl('path1', new controller('.public-container'));
            }, 'path1');
        }
    })
    .addRoute({
        path: 'path2',
        viewBox: '.public-container',
        template: require('modules/path2/index.html'),
        pageInit() {
            require.ensure([], () => {
                let controller = require('modules/path2/controller');
                Router.registerCtrl('path2', new controller('.public-container'));
            }, 'path2');
        }
    })

Router.bootstrap();


export default Router;