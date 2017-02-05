/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// objects to store loaded and loading chunks
          // 代表了chunk的加载状态
          // 0: 加载成功
          // [resolve, reject, promise]: 数组代表为加载中
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
            // module是否有进行缓存
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
            // 如何之前module未进行缓存, 那么将module进行初始化后进行缓存
            // i: 代表moduleId
            // l: loaded 是否加载完成
            // exports: 输出
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
            // 执行这个module函数
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
            // 将module加载状态loaded改为true
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
            // 返回module的输出
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks 
          // 主要作用是 1.异步加载chunk, 2.提供对于chunk加载失败或者处于加载中的处理, 
          // 加载状态的判断是根据installedChunks对象chunkId是数字还是数组来进行判断的
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)      // 代表这个chunk加载成功
/******/ 			return Promise.resolve();

/******/ 		// an Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {          // 如果installedChunks[chunkId]为一个数组
/******/ 			return installedChunks[chunkId][2];   // 返回的一个promise
/******/ 		}
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;

/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "js/register/" + ({"2":"index"}[chunkId]||chunkId) + ".js";
            // 120s的超时时间
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
            // 注意这个地方script触发的时机, 当脚本加载完后,首先会执行webpackJsonp(), 然后会执行这个回调函数
            // 这个回调函数的作用主要是判断这个id对应在installedChunks中是否加载完成,
            // var chunk = installedChunks[chunkId];
            // 如果chunk对应的是一个数组,那么这个chunk就没有加载成功, 此时就会reject(new Error('Loading chunk')). 然后通过catch去捕获错误
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};

            // 异步加载的时候，就初始化了installedChunks[chunkId]为一个数组
            // installedChunks[chunkId] = [resolve, reject, promise];
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;

/******/ 		head.appendChild(script);
/******/ 		return promise;
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
          // module加载方式, 通过判断module.__esModule的属性值来进行判断
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/taxi-driver/";

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([]);