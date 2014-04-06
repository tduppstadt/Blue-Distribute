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

        // router page model
        this.pageModel = this.oView.oRouter.pageModel.section.index;

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
            this.preloadImages();   
        },

        // ______________________________________________________________
        //                                                  preloadImages
        preloadImages: function()
        {   
            // var str = this.oGlobalModel.PATH_RELATIVE + "Content/images/desktop/button-red_hover.png";
            // window.helpers.preloadImage(str);
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;    

            // page load event
            window.tEvent.addListener(this.pageModel.loadEvent, function(evt)
            {
                self.onPageLoad();
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
        }


    };

    var Class = constructor;
    Class.prototype = methods;

    var instance = new Class();
    
    return (instance);  
});