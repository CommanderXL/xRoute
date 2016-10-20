(function(window) {
    
    
    
    class pageHandler {
        constructor(pageModel) {
            /**
             *  @method init    //初始化
             *  @method getInitStatus   //获取初始态
             *  @method bindEvents      //事件绑定
             *  @property state         //page state
             *  
             *  */
            this.pageModel = pageModel;
        }
        
        pageInit() {
            this.pageModel.init();
        }
        
        get getHash() {
            return location.hash || '';
        }
        
        //页面跳转
        go() {
           window.forward();
        }
        
        //页面回退        
        back() {
            window.back();    
        }
    }
    
    
    router.addRoute('aaa', (path = '') => {
        console.log(path);
    })
    
    router.addRoute('bbb', (path = '') => {
        console.log(path);
    })
    
    router.addRoute('ccc', (path = '') => {
        console.log(path);
    })
    
    router.addRoute('ddd', (path = '') => {
        console.log(path);
    })
    
    setTimeout(() => {
        //location.hash = '#/ddd';
    }, 3000);
})(window);