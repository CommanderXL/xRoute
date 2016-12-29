import Router from '../../route';

class PageModel {
    constructor() {
        this.init();
    }
    init() {
        console.log('This\'s path1 file');

        document.querySelector('.route-btn').addEventListener('click', () => {
            console.log(123);
            Router.go('path2');
        })
    }
}

module.exports = PageModel;