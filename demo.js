class Node {
    constructor(parent = null) {
        this._parent = parent;
        this._children = new Set();

        if (this.isRoot) {
            Node.addRoot(this);
        }
    }

    get isRoot() {
        return !this._parent;
    }

    createChild() {
        const node = new Node(this);
        this._children.add(node);

        return node;
    }

    removeFromParent() {
        this._parent = null;
        this._parent._children.delete(this);
    }

    get size() {
        let size = 0;
        for (const node of this._children) {
            size += node.size;
        }

        size = size ? size + 1 : 1;

        return size;
    }

    static addRoot(root) {
        Node.roots = !Node.roots ? [root] : Node.roots.concat([root]);
    }

    static get size() {
        return Node.roots
            .map(root => root.size)
            .reduce((a, b) => a + b);
    }
}


(function (window) {
    // 连接DidiJSBridge
    var connectDidiJSBridge = function (callback) {
        if (window.DidiJSBridge) {
            callback(DidiJSBridge);
        } else {
            document.addEventListener('DidiJSBridgeReady', function () {
                callback(DidiJSBridge);
            }, false);
        }
    };

    var btn = document.querySelector('button');

    btn.addEventListener('click', function () {
        var obj = {
            "phone": 13000000000,
            "uid": 873,
            "token": "felldoo_pofelr",
            "districtInfo": {
                "cityName": "\u5e38\u5dde\u5e02",
                "no": "0519",
                "cityId": "45"
            }
        };
        connectDidiJSBridge(function (bridge) {

            bridge.callHandler('register_success', JSON.stringify(obj));
        });
    }, false);
})(window);