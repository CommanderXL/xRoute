(function(window) {
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