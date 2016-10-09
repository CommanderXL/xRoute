(function (window) {
    let num = document.querySelector('#number'),
        forward = document.querySelector('#forward');

    let useHash = false,
        hashReg = /myNum=([0-9]+)/;

    const handleStateChange = (count) => {
        num.innerHTML = count;
        document.title = 'Number: ' + count;
        document.links[0].href = '?num=' + (parseInt(count, 10) + 1);
    }

    forward.addEventListener('click', e => {
        e.preventDefault();
        let myNum = num.innerHTML;
        num.innerHTML = ++myNum;

        if (!useHash) {
            history.pushState({ myNum: myNum }, null, '?myNum=' + myNum);
        } else {
            location = 'demo.html#myNum=' + myNum;
        }
        //location.hash = 'myNum=' + myNum;
        //history.pushState({ count: myNum }, null, '?myNum=' + myNum);
        document.title = 'Number: ' + myNum;
    });



    const setNumFromUrl = () => {
        if (location.search) {
            let match = location.search.match(/myNum=([0-9]+)/);
            if (match) {
                if (useHash) {
                    location = 'demo.html#myNum=' + match[1];
                } else {
                    num.innerHTML = match[1];
                    document.title = 'Number: ' + match[1];
                }
            }
        } else if (location.hash) {
            var match = location.hash.match(hashReg);

            num.innerHTML = match[1];
            document.title = 'Number: ' + location.hash;

            if (!useHash) {
                history.replaceState({ myNum: match[1] }, null, 'demo.html?myNum=' + match[1]);
            }
        } else {
            num.innerHTML = 1;
            document.title = 'Number 1';
        }
    }

    //if (!history.pushState) useHash = true;
    useHash = true;

    if (!useHash) {
        //popstate不会在pushState和replaceState情况下触发
        //仅仅在history.back()和history.go()2个事件下才触发
        window.addEventListener('popstate', (e) => {
            //监听state变化
            if (e.state && e.state.count) {
                //num.innerHTML = e.state.count;
                //document.title = 'Number: ' + e.state.count;
                handleStateChange(e.state.count);
            } else {
                setNumFromUrl();
            }
        })
    } else {
        setNumFromUrl();

        var oldHash = location.hash;

        //可以使用轮询或者H5提供了hashchange全局事件
        window.addEventListener('hashchange', function () {
            var match;
            match = location.hash.match(hashReg);
            handleStateChange(match[1]);
        });

        /* setInterval(() => {
             var match;
             if (window.hash != oldHash) {
                 match = location.hash.match(hashReg);
                 oldHash = location.hash;
                 if (match) {
                     handleStateChange(match[1]);
                 }
             }
         }, 100);*/
    }
})(window);