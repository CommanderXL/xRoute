(function(window) {
    route.addRoute('#/aaa', (path = '') => {
        console.log(path);
    })
    
    route.addRoute('#/bbb', (path = '') => {
        console.log(path);
    })
    
    route.addRoute('#/ccc', (path = '') => {
        console.log(path);
    })
    
    route.addRoute('#/ddd', (path = '') => {
        console.log(path);
    })
})(window);