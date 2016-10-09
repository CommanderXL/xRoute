(function(window) {
    var Router = [],
        useHash = false;
    
    //一开始的判断是否支持H5 API
    if(!history.pushState) useHash = true;
    
    //如果支持H5 API
    if(!useHash) {
        document.addEventListener('popstate', (e) => {
            let state = e.state;
            //对不同的state进行处理
        });
    } else {
        //hash发生变化时监听的方式
        
        let oldHash = location.hash;
        
        
        //轮询
        setInterval(() => {
            
            if(oldHash != location.hash) {
                //TODO do something
                
                //存储新的hash值
                oldHash = location.hash;
            } 
        }, 100);
  
        //hashchange方式
        window.addEventListener('hashchange', (e) => {
            
        });
    }
    
    //添加路由
    const addRoute = (path = '', cb = () => {}, context) => {
        let routeObj = {
            path,
            cb,
            context
        }
        
        Router.push(routeObj);
    }
    
    //路由拦截处理
    const handleRoute = (path) => {
        
    }  
    
    //路由的销毁(根据时间来判断)
    
})(window);