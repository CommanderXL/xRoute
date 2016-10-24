import {util} from '../../lib/js/util';
import Picker from '../../lib/js/picker.min'


export default class timeSelectComponent {
    constructor() {
        this.configMap = {
            settable_map: {
                timeArr: true,
                containerArr: true,
                startYearArr: true,
                callbackArr: true
            },
            timeArr: [],
            containerArr: [],
            startYearArr: [],
            callbackArr: []
        }
        this.stateMap = {};
        this.dateNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    generateYear(startYear = 2000) {
        let _arr = [],
            i = startYear;
        for (; i < new Date().getFullYear(); i++) {
            _arr[_arr.length] = {
                text: i,
                value: i
            }
        }
        return _arr;
    }
    generateMonth() {
        let _arr = [],
            i = 1;
        for (; i <= 12; i++) {
            _arr[_arr.length] = {
                text: i,
                value: i
            }
        }
        return _arr;
    }
    generateDate(year, month) {
        let _isLeapYear = util.isLeapYear(year, month),
            _arr = [],
            _date = this.dateNum[month - 1],
            i = 1;

        if (_isLeapYear && month === 2) {
            ++_date;
        }

        for (; i <= _date; i++) {
            _arr[_arr.length] = {
                text: i,
                value: i
            }
        }
        return _arr;
    }
    configModule(input_map) {
        util.setConfigModule({
            input_map: input_map,
            settable_map: this.configMap.settable_map,
            config_map: this.configMap
        })
    }
    deleteEventFn(ele = '') {
        //TODO  删除其所绑定的事件
    }
    initModule() {
        var startYearArr = this.configMap.startYearArr,
            timeArr = this.configMap.timeArr,
            containerArr = this.configMap.containerArr,
            cbArr = this.configMap.callbackArr,
            that = this;

        //时间控件初始化
        startYearArr.forEach(function (item, index) {
            var timeObj = timeArr[index] = {};

            //初始化数据
            timeObj.year = this.generateYear(item);
            timeObj.month = this.generateMonth();
            timeObj.date = this.generateDate(item, 1);
            timeObj.selectedYear = item;
            timeObj.selectedMonth = 1;
            //timeObj.selectedDate = null;
        }.bind(this));

        containerArr.forEach(function (ele, index) {
            let timeItem = timeArr[index],
                cb = cbArr[index],
                element = document.querySelector(ele);

            let picker = new Picker({
                data: [timeItem.year, timeItem.month, timeItem.date],
                selectIndex: [0, 0, 0],
                title: '请选择时间'
            });

            picker.on('picker.select', (selectedVal, selectIndex) => {
                let _str = timeItem.year[selectIndex[0]].text + '-' + timeItem.month[selectIndex[1]].text + '-' + timeItem.date[selectIndex[2]].text;
                cb(_str);
            });

            picker.on('picker.change', (index, selectIndex) => {
                if(index != 2) {
                    index === 0 ? timeItem.selectedYear = timeItem.year[selectIndex].text : timeItem.selectedMonth = timeItem.month[selectIndex].text;
                    picker.on('refill', that.generateDate(timeItem.selectedYear, timeItem.selectedMonth), 2);
                }
            });

            picker.on('picker.valuechange', () => {});

            element.addEventListener('click', () => {
                picker.show();
            })
        })

    }
}
