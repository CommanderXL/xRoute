import {Controller} from '../../lib/js/controller';
import modelA from './a-model';
import {util, elementSet} from '../../lib/js/util';
///import Picker from '../../lib/js/picker.min';   //时间选择组件
import timeSelectComponent from '../../components/time-select/index';
import cityComponent from '../../components/city-select/index';

let controller = modelA.registerController('.page-container:first-child');

controller
.getDomMap({
    aContainer: '.a-container',
    myName: '.myName',
    myPhone: '.myPhone'
})
.getBindEvents({
    aContainer: {
        actionName: 'click',
        action() {
            elementSet.css(this, {color: 'red'});
        }
    },
    myName: {
        actionName: 'input',
        action(e) {
            console.log(this.value);
        }
    },
    myPhone: {
        actionName: 'input',
        action(e) {
            console.log(this.value);
        }
    }
})
//页面状态初始化.从localstorage中获取
.getViewInit(function() {
    let doms = this.domMap;
    doms.myName.value = modelA.submitData.name;

	let timeSelect = new timeSelectComponent();

    var nameEl = document.getElementById('name');

	timeSelect.configModule({
		startYearArr: [1972],
		containerArr: ['#name'],
		callbackArr: [function(time) {
			console.log(time);
		}]
	});
	//timeSelect.initTimeModule();
	timeSelect.initAlphaModule();

	let json = require('../../components/city-select/city-json'),
		_cityComponent = new cityComponent();
	


	_cityComponent.configModule({
		allCities: json.data,
		succCb(data) {
			console.log(data);
		},
		failCb() {
			console.log('请选择城市');
		}
	});


	let cityWrapper = document.querySelector('.city-wrapper'),
		clickBtn = document.querySelector('.btn');

	_cityComponent.initModule(cityWrapper);

	clickBtn.addEventListener('click', function() {
		util.addClass(cityWrapper, 'city-box-show');
	})

});

export {
    controller
}
