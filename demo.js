(function(window) {
    var domMap = {
        a: document.querySelector('#a'),
        b: document.querySelector('#b'),
        c: document.querySelector('#c')
    };
    
    
    //let navLinks = document.querySelectorAll("a");
    
    let pageCache = {};
    let links = document.querySelectorAll('.nav-link');
    let latinNameMap = {};
    for(let item of links) {
        let href = item.href;            
        latinNameMap[href] = href;
    }
    
    //每个路由对应的回调函数
    const handlePage = (path) => {
        console.log(path);
    }

    //这里的正则表达式把所有的情况都包含进来了
    router.addRoute(/[a-z_]]+\.html/, handlePage);
    
})(window);