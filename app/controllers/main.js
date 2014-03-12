/**
 * Sample controller
 * @class Controllers.main
 * @uses core
 */

var App = require("core"); 

/**
 * Handles the click event on the "Open New Window" button
 */
$.open.addEventListener("click", function(_event) {
	App.openScreen("sub", {
		title: "Sub Screen",
		goBack: true
	});
});

/**
 * Public method to handle orientation if this controller
 * is opened via {@link core#openScreen} or if
 * {@link core#bindOrientationEvents} is applied to this controller
 * @param {Object} _event
 */
$.handleOrientation = function(_event) {
	Ti.API.debug(_event.orientation);
};