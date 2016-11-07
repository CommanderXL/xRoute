import model from './model';

let controller = model.registerCtrl('infoCtrl', '.public-container');

controller
    .getDomMap({

    })
    .getEvents({

    })
    .getEventsFn({

    })
    .getViewInit(function() {
        for(var key in model.parent.records) {
            console.log(model.parent.records[key].pageInit.valueOf());
        }
    });


module.exports = controller;