import {util} from 'jsLib/util';

export default class cityComponent {
    constructor() {
        this.configMap = {
            main_html: require('./index.html'),
            succCb: null,
            failCb: null,
            allCities: null,
            settable_map: {
                succCb: true,
                failCb: true,
                allCities: true
            }
        };
        this.stateMap = {
            append_target: null,
            province_id: null,
            city_id: null,
            district_id: null
        };
        this.DomMap = {};
        this.choosedAreas = [];
    }
    //省份列表
    generateCityList(cities) {
        if (!util.isArr(cities)) return '';
        var _provinceList = '';
        for (var i = 0; i < cities.length; i++) {
            _provinceList += `<li class="list-item" data-id="${cities[i]['id']}" data-name="${cities[i]['name']}">${cities[i]['name']}</li>`;
            //_provinceList += '<li class="list-item" data-id="' + cities[i]['id'] + '" data-name="' + cities[i]['name'] + '">' + cities[i]['name'] + '</li>';
        }
        return _provinceList;
    }
    //城市列表
    getCityChilds(id) {
        var allCities = this.configMap.allCities;
        for (var i = 0; i < allCities.length; i++) {
            //判断存在 es6
            if (allCities[i].id === id) {
                this.choosedAreas = allCities[i].childs;
                return allCities[i].childs;
            }
        }
    }
    //区域列表
    getAreaChilds(id) {
        for (var i = 0; i < this.choosedAreas.length; i++) {
            if (this.choosedAreas[i].id === id) return this.choosedAreas[i].childs;
        }
    }

    //注意各种this的指向.  city-active???
    //省份选择
    onProvinceListClick(that) {
        return function (e) {
            var _target = e.target,
                _citiesList = that.getCityChilds(_target.dataset.id);

            util.removeClass(this.querySelector('.city-active'), 'city-active');
            util.addClass(_target, 'city-active');
            that.DomMap.cityList.innerHTML = that.generateCityList(_citiesList);
            util.addClass(that.DomMap.cityListBox, 'city-box-show');
        }

    }

    //城市选择
    onCityListClick(that) {
        return function (e) {
            var _target = e.target,
                _areaList = that.getAreaChilds(_target.dataset.id);

            util.removeClass(this.querySelector('.city-active'), 'city-active');
            util.addClass(_target, 'city-active');
            that.DomMap.areaList.innerHTML = that.generateCityList(_areaList);
            util.addClass(that.DomMap.areaListBox, 'city-box-show');
        }

    }
    //地区选择
    onAreaListClick(that) {
        return function (e) {
            var _target = e.target,
                _province = that.DomMap.provinceList.querySelector('.city-active'),
                _city = that.DomMap.cityList.querySelector('.city-active'),
                _text = '',
                _params = {},
                cb = that.configMap.succCb;        //通过回调来和外部业务逻辑进行通讯

            if (_province === null || _city === null) return that.configMap.failCb();

            this.querySelector('.city-active') && util.removeClass(this.querySelector('.city-active'), 'city-active');
            util.addClass(_target, 'city-active');
            util.removeClass(that.DomMap.append_target, 'city-box-show');

            _text = _province.dataset.name + '-' + _city.dataset.name + '-' + _target.dataset.name;

            //TODO 1. 可利用订阅发布模式将数据传递出去
            //TODO 2. 可通过接受回调函数的方法,对于业务逻辑进行处理
            //城市选择回调

            _params = {
                text: _text,
                id_map: {
                    province_id: _province.dataset.id,
                    city_id: _city.dataset.id,
                    district_id: _target.dataset.id
                }
            };

            //
            that.stateMap.province_id = _province.dataset.id;
            that.stateMap.city_id = _province.dataset.id;
            that.stateMap.district_id = _target.dataset.id;

            typeof cb === 'function' && cb(_params);
        }
    }

    onBackBtnClick(that) {
        return function () {
            let targetDom = that.DomMap.append_target,
                stateMap = that.stateMap,
                DomMap = that.DomMap;
            util.removeClass(targetDom, 'city-box-show');

            //未完成省市区所有选择时才进行处理
            if (!(that.stateMap.province_id && that.stateMap.city_id && that.stateMap.district_id)) {

                // 城市区域列表消失
                util.removeClass(that.DomMap.cityListBox, 'city-box-show');
                util.removeClass(that.DomMap.areaListBox, 'city-box-show');

                //清除样式
                util.removeClass(targetDom.getElementsByClassName('city-active')[0], 'city-active');
                util.removeClass(targetDom.getElementsByClassName('city-active')[0], 'city-active');

                that.stateMap.province_id = null;
                that.stateMap.city_id = null;
                that.stateMap.district_id = null;
            }
        }

    }

    setDomMap() {
        var append_target = this.stateMap.append_target;
        this.DomMap = {
            append_target: append_target,
            provinceList: append_target.querySelector('.province-container .province-list'),
            cityListBox: append_target.querySelector('.city-container'),
            cityList: append_target.querySelector('.city-list'),
            areaListBox: append_target.querySelector('.area-container'),
            areaList: append_target.querySelector('.area-list'),
            backBtn: append_target.querySelector('.city-header .btn-back')
        }
    }

    configModule(input_map) {
        util.setConfigModule({
            input_map: input_map,
            settable_map: this.configMap.settable_map,
            config_map: this.configMap
        });
    }

    showCityBox() {
        //TODO dialog组件
        //if(this.configModule.allCities.length === 0) return dialog.alert('网络异常');
        util.addClass(this.DomMap.append_target, 'city-box-show');
    }

    initModule(append_target) {
        //将模板文件添加到目标DOM中
        append_target.innerHTML = this.configMap.main_html;
        this.stateMap.append_target = append_target;

        //dom缓存
        this.setDomMap();

        let DomMap = this.DomMap;

        DomMap.provinceList.innerHTML = this.generateCityList(this.configMap.allCities);

        //DOM绑定事件
        DomMap.provinceList.addEventListener('click', this.onProvinceListClick(this));
        DomMap.cityList.addEventListener('click', this.onCityListClick(this));
        DomMap.areaList.addEventListener('click', this.onAreaListClick(this));
        //选择城市后退按钮
        DomMap.backBtn.addEventListener('click', this.onBackBtnClick(this));
    }
}