import { util } from 'jsLib/index';

export default class Route {
    constructor() {
        this.routes = {};
        this.default = '';
        this.useHash = false;
        this.id = 0;
        this.pageCache = {};    //在内存中进行缓存
        this.pathStack = [];    //path stack
        this.oldPath = '';
    }

    home(path = '/') {
        this.default = path;
        return this;
    }

    pageLoading(fn = function () { }) {
        this.loading = fn;
    }

    addRoute({
        path = '',
        pageInit,
        viewDestory,
        context = arguments[0],
        template = '',
        templateUrl = '',
        viewBox = '',
        isHistory = true
    }) {
        path = path.split('.').join('/');

        let id = this.id++;

        this.routes[path] = {
            path,
            pageInit,
            viewDestory,
            context,
            template,
            templateUrl,
            viewBox,
            id,
            inited: false   //是否实例化
        }

        return this;
    }

    //通过物理键返回和前进的path和通过Router前进的所达到的效果不一样. 主要体现在oldPath的获取上.通过维护一个pathStack来保存历史path
    handleRoute(path = '', isFromHistory, stateObj) {

        let curContext,                     //上下文
            oldPath = this.oldPath,
            oldRoute, newRoute;

        /*Event.trigger('routeChange', {
            oldPath,
            path
        })*/

        let pathArr = path.split('.');

        //页面销毁(完全忘记怎么写的了...)
        if (oldRoute = this.routes[oldPath]) {
            oldRoute.inited = false;

            if (pathArr.length === 1 && oldPath.split('/').length > 1) {
                let _oldPathArr = oldPath.split('/');
                this.routes[_oldPathArr[0]].inited = false;
            }
            //页面销毁回调
            //(oldRoute.ctrl && oldRoute.ctrl.viewDestory) && oldRoute.ctrl.viewDestory();
            if(oldRoute.ctrl && oldRoute.ctrl.viewDestory) {
                if(oldRoute.ctrl.viewDestory()) {
                    let search = stateObj ? `?${util.getUrlParams(stateObj, true)}` : '';
                    history.pushState({path: oldRoute.path}, null, `${search}#/${oldRoute.path}`);
                    return;
                }
            }
        }
        //转场
        //this.loading();

        //path栈
        //this.pathStack.push(pathArr.join('/'));

        this.oldPath = pathArr.join('/');

        pathArr.forEach((item, index) => {

            let _path = pathArr.filter((a, b) => b <= index).join('/');

            let _route, _viewBox;

            if (_route = this.routes[_path]) {

                if (!_route.inited) {

                    _route.inited = true;

                    _viewBox = document.querySelector(_route.viewBox);


                    if (!_viewBox) return;

                    //先改变url
                    if ((index + 1) === pathArr.length) {
                        if (!this.useHash) {
                            //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
                            if (!isFromHistory) {

                                let search = stateObj ? `?${util.getUrlParams(stateObj, true)}` : '';
                                history.pushState({ path: _path }, null, `${search}#/${_path}`);
                                //history.pushState({ path: _path }, null, '#/' + _path);
                            }
                        } else {
                            location.hash = '/' + _path;
                        }

                        //激活状路由样式处理
                        this.routeClassHandle(_path);

                        //return true;
                    }

                    //调整容器的滚动轴
                    //_viewBox.scrollTop = '0';
                    //渲染视图
                    _viewBox.innerHTML = _route.template;

                    //页面逻辑初始化
                    _route.pageInit.call(_route.context || window);

                }

            }
        })

        return false;

    }

    routeClassHandle(hash) {
        hash = hash.split('/').join('-');
    }

    go(path, stateObj, flag = false) {
        //path = path.split('.').join('/');
        this.handleRoute(path, flag, stateObj);
    }

    back() {
        history.go(-1);
    }
    
    //  注册控制器
    registerCtrl(path, ctrl) {
        path = path.split('.').join('/');

        this.routes[path] ? this.routes[path].ctrl = ctrl : '';

        //  控制器初始化
        ctrl.init();
    }

    bootstrap() {

        if (!history.pushState) this.useHash = true;

        if (!this.useHash) {
            window.addEventListener('popstate', (e) => {
                let state = e.state;

                if (state && state.path) this.handleRoute(state.path.split('/').join('.'), true);

                //TODO 添加对于state为空的情况的处理
            });
        } else {
            window.addEventListener('hashchange', (e) => {
                let _path = location.hash.slice(2).split('/').join('.');
                this.handleRoute(_path);
            });
        }

        //拦截a标签上的点击事件 
        /**
         * <a data-href="account"></a>       #/account
         * <a data-href="account.info"></a>  #/account/info
         */
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
                flag = false,   //是否找到对应路由完成初始化
                viewBox = null;

            //this.pathStack.push(currHash);
            this.oldPath = currHash;

            let pathArr = currHash.split('/');

            //非初始化的页面刷新 
            /**
             * example.com/#/account/register
             */
            pathArr.forEach((item, index) => {

                let _path = pathArr.filter((a, b) => b <= index).join('/');

                let _route, _viewBox;

                if (_route = this.routes[_path]) {

                    _route.inited = true;

                    _viewBox = document.querySelector(_route.viewBox);

                    if (!_viewBox) return;

                    //TODO 钩子  页面加载前执行
                    /*if(_route.ctrl && _route.ctrl.viewInit) {
                        if(!_route.ctrl.viewInit()) return;
                    }*/

                    //TODO 将初始化的路由压入栈
                    if ((index + 1) === pathArr.length) {
                        if (!this.useHash) {
                            history.replaceState({path: currHash}, null, '#/' + currHash);
                        } else {
                            location.hash = '/' + currHash;
                        }
                    }

                    _viewBox.innerHTML = _route.template;

                    _route.pageInit.call(_route.context || window);

                    flag = true;
                }
            })

            //初始化active.route样式处理
            this.routeClassHandle(currHash);

            //首页渲染
            if (!flag) {
                //TODO 页面初始化钩子
                /*if(router.ctrl && router.ctrl.viewInit) {
                    if(!router.ctrl.viewInit()) return;
                }*/

                viewBox = document.querySelector(router.viewBox);
                //渲染视图
                viewBox.innerHTML = router.template;

                router.pageInit.call(router.context || window);

                if (!this.useHash) {
                    history.replaceState({path: router.path}, null, '#/' + router.path);
                } else {
                    location.hash = '/' + router.path;
                }
            }

            //!flag ? router.pageInit.call(router.context || window) : '';
        })
    }

}


