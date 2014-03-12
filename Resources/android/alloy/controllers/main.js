function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
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
        text: "Core.js is a boilerplate for Titanium Alloy. Use it to quickly start building applications without all the overhead of having to create screen management methods, utility functions and device detection.",
        id: "about"
    });
    $.__views.content.add($.__views.about);
    $.__views.open = Ti.UI.createButton({
        top: 20,
        width: 200,
        height: 30,
        landscape: {
            color: "#222",
            borderColor: "#222",
            backgroundColor: "#DDD"
        },
        portrait: {
            color: "#EEE",
            borderColor: "#EEE",
            backgroundColor: "#111"
        },
        borderWidth: 1,
        borderRadius: 3,
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue-Light"
        },
        title: "Open New Window",
        id: "open"
    });
    $.__views.content.add($.__views.open);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var App = require("core");
    $.open.addEventListener("click", function() {
        App.openScreen("sub", {
            title: "Sub Screen",
            goBack: true
        });
    });
    $.handleOrientation = function(_event) {
        Ti.API.debug(_event.orientation);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;