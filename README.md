## 高级浏览器使用H5 API,低级浏览器使用hash

## Router所管理的页面生命周期

* beforeEnter
* pageInit
* viewInit
* viewDestory
* beforeLeave

## 路由配置

```javascript
  const Router = new Route();

  Router
    .addRoute({
      path: 'a',
      viewBox: '',  // 容器锚点
      template: '', // 页面模板
      pageInit() {  // 异步加载ctrl,同时将ctrl挂载到route

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
      pageInit() { 

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
    constructor() {

    }
    viewInit() {

    }
    viewDestory() {
      
    }
  }
```