import Router from '../../route';

class PageModel {
    constructor(){
        //this.init();
    }
    init() {
        console.log('This\'s path2 file');

        document.querySelector('.route-btn').addEventListener('click', () => {
            console.log('path2');
            Router.go('path1');
        })
    }
    viewDestory() {
        console.log('well done');
    }
}

module.exports = PageModel;