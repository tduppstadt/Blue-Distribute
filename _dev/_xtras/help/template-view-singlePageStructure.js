/*
    Creating a new page. 

    create new event string for the new page in common/model.js
    create a js file to hold the page object (this page)
    - Update the assignListeners() for this pages event
    common/router.js update the initPageModel() with the hash to look for and the event to be called.
    add page to config to load the page

*/


define([
    "common/model",
    "common/services"
],

function (model, services) 
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
    //
    // ---------------------------------------------------------------
   
    var constructor = function()
    {
        console.log(" * <view>");

        var self = this;
        
        // core objects
        this.oModel    = model;   
        this.oServices = services;  

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
            console.log(" * <index>");

            this.assignListeners();   
           
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;    

            // page load event
            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_INDEX, function(evt, data)
            {
                self.onPageLoad(data);   
            }); 

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_NEW_PAGE, function(evt, data)
            {
                // clean up for new page
                self.onCleanUp(); 
            });  
        }

        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        
        // ______________________________________________________________
        //                                                     onPageLoad
        onPageLoad: function()
        {   
            var self = this;
           
            // set page hash        
            this.oView.oRouter.setHash(this.pageModel.hashString);
       
            console.log(" * <index.onPageLoad>");
        },

        // ______________________________________________________________
        //                                                     onCleanUp
        // clean up when new page is loaded.
        onCleanUp: function()
        {   

        }


    };

    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);  
});
