import model from './model';

let controller = model.registerCtrl('infoCarCtrl', '.info-container');


controller
    .getDomMap({

    })
    .getEvents({

    })
    .getEventsFn({

    })
    .getViewInit(function() {
        //触发事件
        //model.trigger('test', 'well done');
    });


module.exports = controller;