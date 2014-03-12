/**
 * @class Controllers
 */

// App bootstrap
var App = require("core");

// Save UI windows to global
App.NavGroup = $.NavGroup;
App.Window = $.Window;

// Start application
App.init();

// Open the initial window
App.openScreen("main", {
	title: "Main Screen",
	goBack: false
});