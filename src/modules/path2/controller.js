import Router from '../../route';

class PageModel {
    constructor(container){
        this.container = document.querySelector(container);
    }
    init() {
        console.log('This\'s path2 file');

        this.container.querySelector('.route-btn').addEventListener('click', () => {
            console.log('path2');
            Router.go('path1');
        })
    }
    viewDestory() {
        console.log('well done');
    }
}

//module.exports = PageModel;
export default PageModel;