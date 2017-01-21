一个小型的SPA框架.无依赖第三方的小型路由，搭配`webpack`作为构建工具,主要利用`webpack`的`code spilt`及异步加载功能。

## 路由

### 高级浏览器使用H5 API,低级浏览器使用hash

```javascript
  html5Mode:
  www.example.com/page1
  www.example.com/page2

  hashMode:
  www.example.com/#/page1
  www.example.com/#/page2
```

### Router所管理的页面生命周期

一共有5个阶段:

* beforeEnter
* pageInit
* viewInit
* viewDestory
* beforeLeave

### 路由配置

```javascript
  const Router = new Route();

  Router
    .addRoute({
      path: 'a',
      viewBox: '',  // 容器锚点
      template: '', // 页面模板
      animate: 'slideInRight', //转场动画
      pageInit() {  // 异步加载ctrl,同时将ctrl挂载到route
        const Controller = require('modules/path1/controller');
        Router.registerCtrl('path1', new Controller(this.viewBox));
      },
      beforeEnter() {
        
      },
      beforeLeave() {

      }
    })
    .addRoute({
      path: 'b',
      viewBox: '',  
      template: '',
      animate: 'slideInRight', //转场动画 
      pageInit() { 
        const Controller = require('modules/path2/controller');
        Router.registerCtrl('path2', new Controller(this.viewBox));
      },
      beforeEnter() {

      },
      beforeLeave() {

      }
    })
```

## 页面逻辑

```javascript
  export default class PageModel {
    constructor(container) {  
      //页面容器,获取dom通过这个容器root DOM来获取
      this.container = document.querySelector(container);
    }
    setDomMap() {
      let barDom = this.container.querySelector('.barDom');
    }
    viewInit() {

    }
    viewDestory() {
      
    }
    init() {
      this.setDomMap();
      this.viewInit();
    }
  }
```

## 转场动画

```javascript
  slideInRight
  slideInLeft
  fadeIn
  fadeOut
  zoomIn
  zoomOut
```

## 使用方法

```javascript
  npm install
  npm run dev
```