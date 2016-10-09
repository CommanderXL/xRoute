(function (window) {
    //popstate
    //pushState
    //replaceState
    var routes = [];
    
    const addRoute = (route = '', cb = () => {}, scope) => {
        let routeObj = {
            route,
            cb,
            scope
        };
        
        routes.push(routeObj);
    }
    
    //拦截路由后的回调函数
    const handleRoute = (path, noHistory) => {
        let len = routes.length,
            scope;
           
        for(let i = 0; i < len; i++) {
            if(path.match(routes[i].route)) {
                if(routes[i].scope) {
                    scope = routes[i].scope;
                } else {
                    scope = window;
                }
                
                //如果是从popstate进行触发的,那么不应该将其加入浏览器历史栈当中
                if(!noHistory) {
                    history.pushState({}, null, path);
                }
                
                routes[i].cb.apply(scope, [path]);
                return true;
            }
        }
        return false;
    }
    
   /* window.addEventListener('popstate', function(e) {
        console.log(location.href);
        handleRoute(location.href, true);
    });*/
   
   
    //路由的拦截 handleRoute()
    document.addEventListener('click', (e) => {
        if(e.target.href) {
            if(handleRoute(e.target.href, true)) {
                e.preventDefault();
            }
        } 
    });
   
    
    window.router = {
        handleRoute: handleRoute,
        addRoute: addRoute
    }

})(window);