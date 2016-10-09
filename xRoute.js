(function (window) {
    var Router = [],
        useHash = false,
        pageCache = {}; //在内存中进行缓存

    //一开始的判断是否支持H5 API
    if (!history.pushState) useHash = true;

    //不管是否支持H5 API, 统一的路由格式为:
    //  #/a/b/c

    //如果支持H5 API
    if (!useHash) {
        document.addEventListener('popstate', (e) => {
            let state = e.state;
            //路由的处理
            if (state && state.path) {
                handleRoute(state);
            }
        });
    } else {
        //hash发生变化时监听的方式,因为hashchange事件浏览器的支持度已经比较高了,所以使用hashchange

        //轮询
        /*
        let oldHash = location.hash;
        setInterval(() => {
            
            if(oldHash != location.hash) {
                //TODO do something
                
                //存储新的hash值
                oldHash = location.hash;
            } 
        }, 100);*/


    }

    //hashchange方式
    window.addEventListener('hashchange', (e) => {
        handleRoute(location.hash);
    });

    //添加路由
    const addRoute = (path = '', cb = () => { }, context) => {
        let routeObj = {
            path,
            cb,
            context
        }

        Router.push(routeObj);
    }

    //路由拦截处理.拦截后返回true, 拦截不成功返回false
    const handleRoute = (path) => {
        let match,
            hash = location.hash,
            curContext;
        for (let i = 0; i < Router.length; i++) {
            let routeItem = Router[i];
            if (routeItem === hash) {
                curContext = routeItem.context ? routeItem.context : window;

                routeItem.cb.apply(curContext, [path]);
                return true;
            }
        }
        return false;
    }

    //TODO 路由拦截  <a href="a.html">   <a href="#/a">  这2种写法处理起来有什么区别?
    document.addEventListener('click', (e) => {
        if (e.target.href) {
            if (handleRoute(e.target.href)) {
                //阻止默认事件
                //e.preventDefault();
            }
        }
    });

    //TODO 路由的销毁(根据时间来判断)


    window.router = {
        addRoute: addRoute,
        handleRoute: handleRoute
    }

})(window);