var Alloy = require("alloy");

var App = {
    NavGroup: {},
    Window: {},
    Device: {
        version: Ti.Platform.version,
        versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
        versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
        width: null,
        height: null,
        dpi: Ti.Platform.displayCaps.dpi,
        orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
    },
    init: function() {
        Ti.Network.addEventListener("change", App.networkChange);
        Ti.App.addEventListener("pause", App.exit);
        Ti.App.addEventListener("close", App.exit);
        Ti.App.addEventListener("resumed", App.resume);
        Ti.Gesture.addEventListener("orientationchange", App.orientationChange);
        Ti.Android.currentActivity.addEventListener("resume", App.resume);
        App.getDeviceDimensions();
        App.Window.open();
    },
    openScreen: function(_controller, _controllerArguments) {
        var controller = null;
        _controllerArguments || (_controllerArguments = {});
        controller = "string" == typeof _controller ? Alloy.createController(_controller, _controllerArguments) : _controller;
        controller.wrapper.top = 47;
        controller.window = Ti.UI.createWindow({
            backgroundColor: Alloy.CFG.windowBackgroundColor,
            statusBarStyle: null,
            navBarHidden: true,
            barColor: "#3D3D3C",
            translucent: false,
            extendEdges: null,
            navTintColor: "#FFF",
            tintColor: "#FFF",
            color: "#FFF",
            top: 0,
            windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE,
            softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS,
            exitOnClose: _controllerArguments.goBack ? false : true
        });
        Ti.API.error(controller.window.exitOnClose);
        controller.navigation = Alloy.createWidget("com.mcongrove.navigationBar");
        controller.navigation.setBackgroundColor("#111");
        controller.navigation.setTitle(_controllerArguments && _controllerArguments.title ? _controllerArguments.title : "");
        _controllerArguments && _controllerArguments.goBack && controller.navigation.showBack(function() {
            controller.window.close();
        });
        controller.window.add(controller.navigation.getView());
        controller.window.add(controller.wrapper);
        App.setViewsForOrientation(controller);
        App.bindOrientationEvents(controller);
        controller.window.open();
        return controller;
    },
    bindOrientationEvents: function(_controller) {
        _controller.window.addEventListener("close", function() {
            _controller.handleOrientation && Ti.App.removeEventListener("orientationChange", _controller.handleOrientation);
        });
        _controller.window.addEventListener("open", function() {
            Ti.App.addEventListener("orientationChange", function(_event) {
                _controller.handleOrientation && _controller.handleOrientation(_event);
                App.setViewsForOrientation(_controller);
            });
        });
    },
    setViewsForOrientation: function(_controller) {
        if (!App.Device.orientation) return;
        if ("portrait" == App.Device.orientation || "landscape" == App.Device.orientation) for (var view in _controller.__views) _controller.__views[view][App.Device.orientation] && "function" == typeof _controller.__views[view].applyProperties ? _controller.__views[view].applyProperties(_controller.__views[view][App.Device.orientation]) : _controller.__views[view].wrapper && _controller.__views[view].wrapper[App.Device.orientation] && "function" == typeof _controller.__views[view].applyProperties && _controller.__views[view].applyProperties(_controller.__views[view].wrapper[App.Device.orientation]);
    },
    networkChange: function() {},
    exit: function() {},
    resume: function() {},
    orientationChange: function(_event) {
        if (_event.orientation === Titanium.UI.FACE_UP || _event.orientation === Titanium.UI.FACE_DOWN || _event.orientation === Titanium.UI.UNKNOWN) return;
        App.Device.orientation = _event.source.isLandscape() ? "landscape" : "portrait";
        Ti.App.fireEvent("orientationChange", {
            orientation: App.Device.orientation
        });
    },
    getDeviceDimensions: function() {
        switch (App.Device.orientation) {
          case "portrait":
            App.Device.width = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth;
            App.Device.height = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;
            break;

          case "landscape":
            App.Device.width = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight;
            App.Device.height = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth;
        }
        App.Device.width = App.Device.width / (App.Device.dpi / 160);
        App.Device.height = App.Device.height / (App.Device.dpi / 160);
        return {
            width: App.Device.width,
            height: App.Device.height
        };
    }
};

module.exports = App;