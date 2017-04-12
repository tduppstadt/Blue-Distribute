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
		EventTarget      : "../libs/EventTarget",   
		modernizr        : "../libs/modernizr-2.6.2.min",   
		dot              : "../libs/doT",   
		notify           : "../libs/notify",
		validate         : "../libs/validate",
		videojs          : "../libs/video",
		bootstrap        : "../libs/bootstrap",
		hammer           : "../libs/hammer.min",
		jHammer          : "../libs/jquery.hammer",
		jquery           : "../libs/jquery"
	},

	shim: 
	{
		'jquery':
		{
			exports: "$"
		},
		
		'bootstrap': 
		{       
			deps: ['jquery']           
		},

		'jHammer':
		{
			deps: ['jquery', 'hammer'] 
		},



		'common/model':
		{
			deps: ['jquery'] 
		},

		'common/services':
		{
			deps: ['jquery'] 
		},

		'hammer': 
		{       
			deps: ['jquery']           
		},

		"common/router":
		{
			deps: [
				"spearfishHelpers", 
				"common/model",

				// list all pages here
				"index"
			]
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
		//"notify",
		//"bootstrap",
		//"jHammer",
		"index",	
		"mainNav",
		"common/router"	// keep last to load after the pages
	]


});
