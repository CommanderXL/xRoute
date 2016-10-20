import 'babel-polyfill';
import {Model} from './lib/model';
import './route';


var PageA = Model.create();
var handler = PageA.init();


//pageHandle
handler.post('').then((data) => {
    console.log(data);
})