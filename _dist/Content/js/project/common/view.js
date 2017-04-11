define([
    "common/model",
    "common/services"
],

function (model, services) 
{

    // ---------------------------------------------------------------
    //
    // GLOBAL VIEW
    //
    // ---------------------------------------------------------------
   
    var constructor = function()
    {
        console.log(" * <view>");

        var self = this;
        
        // core objects
        this.oModel    = model;   
        this.oServices = services;  

        this.ui = {
            $main: $("main") 
        };

        this.init();

    };

    var methods =
    {

        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        init: function()
        {   
            this.assignListeners();    
          
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;    
        },

        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        
        // ______________________________________________________________
        //                                                   registerPage
        /*
            registerData = {
                events: [
                    "MY_EVENT_STRING_1",
                    "MY_EVENT_STRING_2",
                    "MY_EVENT_STRING_3"
                ],

                routes: {
                    index:
                    {
                        hashString : "default",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_INDEX
                    },

                    testimonials:
                    {
                        hashString : "testimonials",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_TESTIMONIALS
                    }
                }
            }
        */
        registerPage: function(registerData)
        {   
            //debugger;
            // register events
            if (registerData.events){
                for  (var i = 0; i < registerData.events.length; i++){
                    window.tEvent.eventStr[registerData.events[i]] = registerData.events[i];
                }
            }

            // register with router
            if (registerData.routes) {
                for (var key in registerData.routes){
                    if (key){
                        this.oModel.pageModel.page[key] = registerData.routes[key];
                    }
                    
                }
            }
        },

        // ______________________________________________________________
        //                                          loadPageFrameTemplate
        loadPageTemplate: function(template)
        {       
            this.ui.$main.css("opacity", "0");
            this.ui.$main.html(template);
            TweenLite.to(this.ui.$main, 1, {opacity: 1});

            this.pageLoaded();
        },


        // ______________________________________________________________
        //                                                     pageLoaded
        pageLoaded: function()
        { 
            window.tEvent.fire(window.tEvent.eventStr.EVENT_PAGE_LOADED);      
        }

    };

    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);  
});