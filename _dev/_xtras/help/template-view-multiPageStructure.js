
define([
    "common/view"  
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE
    //
    // ---------------------------------------------------------------

    var constructor = function ()
    {
        this.oView = view;
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
            console.log(" * <page>");
        
            this.assignListeners();
            this.onPageLoad();
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;        
        },

        // ______________________________________________________________
        //                                         assignDynamicListeners
        assignDynamicListeners: function()
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
        //                                                     onPageLoad
        onPageLoad: function()
        {   
            console.log(" * <index.onPageLoad>");
        }

    };

    var Class = constructor;
    Class.prototype = methods;
   
    return (Class);     
   
});