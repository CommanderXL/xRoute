var Router = [],
    useHash = false,
    pageCache = {}; //在内存中进行缓存

//一开始的判断是否支持H5 API
if (!history.pushState) useHash = true;

//不管是否支持H5 API, 统一的路由格式为:
//  #/a/b/c

//如果支持H5 API
if (!useHash) {
    window.addEventListener('popstate', (e) => {
        let state = e.state;
        //路由的处理
        if (state && state.path) {
            handleRoute(state.path, true);
        }
    });
} else {
    //hash发生变化时监听的方式,因为hashchange事件浏览器的支持度已经比较高了,所以使用hashchange

    //低级浏览器使用 轮询
    /*
    let oldHash = location.hash;
    setInterval(() => {
        
        if(oldHash != location.hash) {
            //TODO do something
            
            //存储新的hash值
            oldHash = location.hash;
        } 
    }, 100);*/

    //hashchange方式
    window.addEventListener('hashchange', (e) => {
        handleRoute(location.hash);
    });
}


//添加路由
const addRoute = (path = '', cb = () => { }, config = {}, viewDestory = () => {}, view, context) => {
    path = path.split('.').join('/');   //转化嵌套的路由   'ccc.aaa'  --->>>   'ccc/aaa'
    
    let routeObj = {
        path,           //路由
        cb,             //页面加载回调
        config,
        context,
        viewDestory,    //页面销毁回调
        view            //页面视图
    }

    Router.push(routeObj);
}

//路由拦截处理.拦截后返回true, 拦截不成功返回false
const handleRoute = (path, isFromHistory) => {

    let curContext,
        oldPath = location.hash.slice(2);
    
    //页面销毁
    Router.forEach(function(route, index) {
        if(route.path === oldPath) {

            route.viewDestory && route.viewDestory();
            
            //页面视图缓存？？？这个可以放到页面初始化的过程?  视图文件已经打包到了js文件里,是否还需要单独添加
            route.view && localStorage.setItem('view', route.view);
        }
    })

    for (let i = 0; i < Router.length; i++) {
        let routeItem = Router[i];
        if (routeItem.path === path) {
            //如果是嵌套内的路由被匹配,那么还应该还调用外层的路由回调
            curContext = routeItem.context ? routeItem.context : window;

            routeItem.cb.apply(curContext, [path]);

            if (!useHash) {
                //如果是从popstate中获取的状态,那么不应该将其加入历史状态栈中
                if (!isFromHistory) {
                    history.pushState({ path: path }, null, '#/' + path);
                }
            } else {
                location.hash = '/' + path;
            }
            
            //激活状路由样式处理
            routeClassHandle(path);

            return true;
        }
    }
    return false;
}

//TODO 事件冒泡路由拦截  <a href="a.html">   <a href="#/a">  这2种写法处理起来有什么区别?
//路由的写法统一为:   <a data-href="aaa"></a>
document.addEventListener('click', (e) => {
    let href = e.target.dataset.href || '',
        oldHash = location.hash.slice(2);

    //将data-href数据形式转化为路由形式
    href = href.split('-').join('/');       //将data-href='ccc-aaa' --->>> 转化为 ccc/aaa  外部写法可能存在出入,但是在内部统一转化为a/b/c/d的形式
        
    if (href) {
        //添加钩子 路由进行跳转时模型model上数据的处理
        if (href === oldHash) return;

        if (handleRoute(href)) {
            //阻止默认事件
            e.preventDefault();
            
        }
    }
});

//路由激活状态class控制
const routeClassHandle = (hash) => {
    hash = hash.split('/').join('-');
    document.querySelector('.route-active') && document.querySelector('.route-active').classList.remove('route-active');
    document.querySelector(`[data-href=${hash}]`).classList.add('route-active');
}


const bootstrap = () => {
    document.addEventListener('DOMContentLoaded', (e) => {
        let router = Router[0],
            currHash = location.hash.slice(2),
            flag = false;

        let lastArr = currHash.split('/')[0];


        //TODO 代码比较龊,可以优化的地方还很多
        Router.forEach(function(item, index) {
            if(item.path === lastArr) {
                flag = true;
                return item.cb.call(item.context || window);
            }
        });

        if(lastArr !== currHash) {
            Router.forEach(function(item, index) {
                if(item.path === currHash) {
                    return item.cb.call(item.context || window);
                }
            });
        }


        /*hashArr.forEach(function(hash, index) {
            Router.forEach(function(item) {
                if(item.path === currHash) {
                    return item.cb.call(item.context || window);
                }
            })
        })*/



        /*Router.forEach(function (item, index) {
            if (item.path === currHash) {
                flag = true;
                return item.cb.call(item.context || window);
            }
        });*/

        //初始化active.route样式处理
        routeClassHandle(currHash);

        !flag ? router.cb.call(router.context || window) : '';
    })
}


    const go = function(path) {
        handleRoute(path);
    }


    const back = function(path) {

    }



//TODO 路由的销毁(根据时间来判断)
var route = {
    addRoute,
    handleRoute,
    bootstrap,
    go
}

export {route};