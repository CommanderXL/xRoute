import {dialog} from 'jsLib/index';

export default class Route {
    constructor() {
        this.routes = {};
        this.default = '';
        this.useHash = false;
        this.id = 0;
        this.pageCache = {};    //在内存中进行缓存
    }

    home(path = '/') {
        this.default = path;
        return this;
    }

    addRoute({path, viewInit, viewDestory, context, template, templateUrl, viewBox}) {
        path = path.split('.').join('/');

        let id = this.id++;

        this.routes[path] = {
            path,
            viewInit,
            viewDestory,
            context,
            template,
            templateUrl,
            viewBox,
            id
        }

        return this;
    }
    handleRoute(path = '', isFromHistory) {
        let curContext,                     //上下文
            oldPath = location.hash.slice(2),
            oldRoute, newRoute;

        //页面销毁
        if (oldRoute = this.routes[oldPath]) {
            oldRoute.viewDestory && oldRoute.viewDestory();
        }

        let pathArr = path.split('/');

        pathArr.forEach((item, index) => {

            let _path = pathArr.filter((a, b) => b <= index).join('/');

            let _route, _viewBox;

            if (_route = this.routes[_path]) {
                _viewBox = document.querySelector(_route.viewBox);

                if (!_viewBox) return;

                _viewBox.innerHTML = _route.template;

                _route.viewInit.call(_route.context || window);


                if ((index + 1) === pathArr.length) {
                    if (!this.useHash) {
                        //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
                        if (!isFromHistory) {
                            history.pushState({ path: _path }, null, '#/' + _path);
                        }
                    } else {
                        location.hash = '/' + _path;
                    }

                    //激活状路由样式处理
                    this.routeClassHandle(_path);

                    return true;
                }
            }
        })

        return false;
        
    }

    routeClassHandle(hash) {
        hash = hash.split('/').join('-');
        if (hash) {
            document.querySelector('.route-active') && document.querySelector('.route-active').classList.remove('route-active');
            document.querySelector(`[data-href=${hash}]`) && document.querySelector(`[data-href=${hash}]`).classList.add('route-active');
        }
    }

    go(path) {
        path = path.split('.').join('/');
        this.handleRoute(path);
    }

    back() {

    }

    registerCtrl(path, ctrl) {
        this.routes[path] ? this.routes[path].viewDestory = ctrl.viewDestory : '';
    }

    bootstrap() {

        if (!history.pushState) this.useHash = true;

        if (!this.useHash) {
            window.addEventListener('popstate', (e) => {
                let state = e.state;

                if (state && state.path) this.handleRoute(state.path, true);

                //TODO 添加对于state为空的情况的处理
            })
        } else {
            window.addEventListener('hashchange', (e) => {
                this.handleRoute(location.hash.slice(2));
            });
        }


        document.addEventListener('click', (e) => {
            let href = e.target.dataset.href || '',
                oldHash = location.hash.slice(2);

            //将data-href数据形式转化为路由形式
            href = href.split('-').join('/');       //将data-href='ccc-aaa' --->>> 转化为 ccc/aaa  外部写法可能存在出入,但是在内部统一转化为a/b/c/d的形式


            if (href) {
                //添加钩子 路由进行跳转时模型model上数据的处理
                if (href === oldHash) return;

                if (this.handleRoute(href)) {
                    //阻止默认事件
                    e.preventDefault();

                }
            }
        })

        document.addEventListener('DOMContentLoaded', (e) => {
            let router = this.routes[this.default],
                currHash = location.hash.slice(2),
                flag = false,
                viewBox = null,
                lastRoute;

            let pathArr = currHash.split('/');

            pathArr.forEach((item, index) => {


                let _path = pathArr.filter((a, b) => b <= index).join('/');

                let _route, _viewBox;

                if (_route = this.routes[_path]) {
                    _viewBox = document.querySelector(_route.viewBox);

                    if (!_viewBox) return;

                    _viewBox.innerHTML = _route.template;

                    _route.viewInit.call(_route.context || window);

                    flag = true;
                }
            })

            //初始化active.route样式处理
            this.routeClassHandle(currHash);

            if (!flag) {

                viewBox = document.querySelector(router.viewBox);
                //渲染视图
                viewBox.innerHTML = router.template;

                router.viewInit.call(router.context || window);

                if (!this.useHash) {
                    history.pushState({ path: router.path }, null, '#/' + router.path);
                } else {
                    location.hash = '/' + router.path;
                }
            }

            //!flag ? router.viewInit.call(router.context || window) : '';
        })
    }

}


