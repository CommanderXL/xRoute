class Node {
    constructor(parent = null) {
        this._parent = parent;
        this._children = new Set();

        if(this.isRoot) {
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
        for(const node of this._children) {
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