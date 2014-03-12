function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sub";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wrapper = Ti.UI.createView({
        landscape: {
            backgroundColor: "#EEE"
        },
        portrait: {
            backgroundColor: "#222"
        },
        id: "wrapper"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "content"
    });
    $.__views.wrapper.add($.__views.content);
    $.__views.logo = Ti.UI.createImageView({
        image: "/images/corejs.png",
        width: 100,
        height: 116,
        id: "logo"
    });
    $.__views.content.add($.__views.logo);
    $.__views.about = Ti.UI.createLabel({
        top: 20,
        left: 20,
        right: 20,
        color: "#EEE",
        textAlign: "center",
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue-Light"
        },
        landscape: {
            color: "#222"
        },
        portrait: {
            color: "#EEE"
        },
        text: "This is a sub window",
        id: "about"
    });
    $.__views.content.add($.__views.about);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.handleOrientation = function(_event) {
        Ti.API.debug(_event.orientation);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;