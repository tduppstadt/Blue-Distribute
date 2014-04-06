// Set the require.js configuration for your application.
require.config(
{
	paths: 
	{
		// folders          
		modules      : "modules",
		common       : "common",
		libs         : "../libs",

		// special
		Json         : "json/json-compiled", // window.oJson
		Templates    : "templates/templates-compiled", // window.oTemplates

		// libs
		spearfishHelpers : "../libs/spearfish.helpers",         
		gsCSSPlugin      : "../libs/greensock/plugins/CSSPlugin.min",
		gsTweenLite      : "../libs/greensock/TweenLite.min",   
		fbSdk            : "../libs/fb-js-sdk", 
		fastclick        : "../libs/fastclick",
		browserDetect    : "../libs/browserDetect", 
		smoothPack       : "../libs/smooth.pack",       
		EventTarget      : "../libs/EventTarget",   
		modernizr        : "../libs/modernizr-2.6.2.min",   
		dot              : "../libs/doT",   
		notify           : "../libs/notify",
		validate         : "../libs/validate",
		videojs          : "../libs/video",
		bootstrap        : "../libs/bootstrap",
		hammer           : "../libs/jquery.hammer",
		jquery           : "../libs/jquery"
	},

	shim: 
	{
		'bootstrap': 
		{       
			deps: ['jquery']           
		}
	},

	// Initialize the application with the main application file
	deps: [     
		"jquery",
		"EventTarget",
		"Templates",
		"gsCSSPlugin",
		"gsTweenLite",
		"spearfishHelpers",
		"notify",
		"bootstrap",
		"hammer",

		"globalNav",
		"common/router"
	]


});
