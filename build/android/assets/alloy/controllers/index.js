function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Window = Ti.UI.createWindow({
        navBarHidden: true,
        id: "Window"
    });
    $.__views.Window && $.addTopLevelView($.__views.Window);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var App = require("core");
    App.NavGroup = $.NavGroup;
    App.Window = $.Window;
    App.init();
    App.openScreen("main", {
        title: "Main Screen",
        goBack: false
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;