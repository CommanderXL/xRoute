class Util {
    checkUserIds(uid) {
        return /^\d{17}(\d|x)$/.test(uid);
    }
    isLeapYear(year) {
        return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0));
    }
    connectDidiJSBridge(callback) {
        if (window.DidiJSBridge) {
            callback(DidiJSBridge);
        } else {
            document.addEventListener('DidiJSBridgeReady', function () {
                callback(DidiJSBridge);
            }, false);
        }
    }
    getQueryStr() {
        let item, key, val, res = {};
        let queryStr = window.location.search ? window.location.search.substring(1) : '';

        if (queryStr.indexOf('&') === -1 && queryStr.indexOf('=') > -1) {
            item = queryStr.split('=');
            key = decodeURIComponent(item[0]);
            val = decodeURIComponent(item[1]);
            if (key) res[key] = val || "";
            return res;
        }
        if (queryStr.indexOf('&') > -1) {
            items = queryStr.split('&');
            for (var i = 0, len = items.length; i < len; i++) {
                var index = items[i].indexOf('=');
                key = decodeURIComponent(items[i].slice(0, index)); //防止token中出现=号未转义的情况,截取字符出现错误
                val = decodeURIComponent(items[i].slice(index + 1));
                /*item = items[i].split('=');
                key = decodeURIComponent(item[0]);
                val = decodeURIComponent(item[1]);*/
                if (key) res[key] = val;
            };
            return res;
        }
    }
}

let util = new Util();

export {
    util
}