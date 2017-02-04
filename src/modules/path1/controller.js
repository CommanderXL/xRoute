import Router from '../../route';
import 'jsLib/imgResize';
import './index.less';

class PageModel {
    constructor(container) {
        this.container = document.querySelector(container);
    }
    init() {
        console.log('This\'s path1 file');

        this.container.querySelector('.route-btn').addEventListener('click', () => {
            console.log('path1');
            Router.go('path2');
        })
    }
}

//module.exports = PageModel;
export default PageModel;