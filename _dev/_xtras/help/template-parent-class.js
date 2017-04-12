define([
    "common/model"
],

function (model) 
{

    // ---------------------------------------------------------------
    //
    // GLOBAL VIEW
    //
    // ---------------------------------------------------------------
   
    var constructr = function()
    {
        console.log(" * <new Class>");

        var self = this;
        
        // core objects
        this.oModel    = model;   
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

    var instance = new Class();
    
    return (instance);  
});