import {dialog} from 'jsLib/index';

export default class Route {
    constructor() {
        this.routes = [];
        this.useHash = false;
        this.pageCache = {};    //在内存中进行缓存
    }

    addRoute({path, viewInit, viewDestory, context, template, templateUrl, viewBox}) {
        path = path.split('.').join('/');

        this.routes.push({
            path,
            viewInit,
            viewDestory,
            context,
            template,
            templateUrl,
            viewBox
        });
    }
    handleRoute(path = '', isFromHistory) {
        let curContext,                     //上下文
            oldPath = location.hash.slice(2);

        //页面销毁
        this.routes.forEach((route, index) => {
            if (route.path === oldPath) {
                route.viewDestory && route.viewDestory();
            }
        });

        for (let i = 0, routeItem; routeItem = this.routes[i++];) {
            if (routeItem.path === path) {
                //如果是嵌套内的路由被匹配,那么还应该还调用外层的路由回调
                curContext = routeItem.context ? routeItem.context : window;

                let viewBox = document.querySelector(routeItem.viewBox);

                if (!viewBox) return;
                //渲染视图
                viewBox.innerHTML = routeItem.template;

                routeItem.viewInit.apply(curContext, [path]);

                if (!this.useHash) {
                    //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
                    if (!isFromHistory) {
                        history.pushState({ path: path }, null, '#/' + path);
                    }
                } else {
                    location.hash = '/' + path;
                }

                //激活状路由样式处理
                this.routeClassHandle(path);

                return true;
            }
        }
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
        this.routes.forEach((item, index) => {
            if(item.path === path) {
                item.viewDestory = ctrl.viewDestory;
            }
        })
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
            let router = this.routes[0],
                currHash = location.hash.slice(2),
                flag = false,
                viewBox = null;

            let lastArr = currHash.split('/')[0];


            //TODO 代码比较龊,可以优化的地方还很多
            this.routes.forEach((item, index) => {
                if (item.path === lastArr) {
                    flag = true;


                    viewBox = document.querySelector(item.viewBox);

                    if (!viewBox) return;
                    //渲染视图
                    viewBox.innerHTML = item.template;


                    return item.viewInit.call(item.context || window);
                }
            });

            if (lastArr !== currHash) {
                this.routes.forEach((item, index) => {
                    if (item.path === currHash) {

                        viewBox = document.querySelector(item.viewBox);

                        if (!viewBox) return;
                        //渲染视图
                        viewBox.innerHTML = item.template

                        return item.viewInit.call(item.context || window);
                    }
                })
            }

            //初始化active.route样式处理
            this.routeClassHandle(currHash);

            if (!flag) {

                viewBox = document.querySelector(item.viewBox);

                if (!viewBox) return;
                //渲染视图
                viewBox.innerHTML = item.template


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


