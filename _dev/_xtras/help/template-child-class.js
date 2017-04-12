define([
    "common/view"  
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
    //
    // ---------------------------------------------------------------

    var constructr = function ()
    {
        console.log(" * <index>");
        this.oView = view;

        this.init();
    };

    var inheritMethods =
    {    
        // --------------------------------------------------------------
        // inheritMethods
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

            /*
            window.tEvent.addListener("FB_INIT", function(evt, data)
            {
                self.oFB = data;
            });
            */
        }



        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------


    };

    var Class = constructr;
    Class.prototype = inheritMethods;
   
    return (Class);        
   
});