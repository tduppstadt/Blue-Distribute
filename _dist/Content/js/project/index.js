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
        this.eventString = "EVENT_LOAD_INDEX";
        this.hashString = "default";
        this.pageTemplate = window.oTemplates.p_index;
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
            console.log(" * <index>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        registerPage: function()
        {  
            this.oView.registerPage({
                events: [this.eventString],
                routes: {
                    index: {
                        hashString : this.hashString,
                        loadEvent  : this.eventString
                    }
                }
            });
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;
            
            window.tEvent.addListener(this.eventString, function(evt, data)
            {
                self.onPageLoad(data);   
            }); 

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_NEW_PAGE, function(evt, data)
            {
                // clean up for new page
                self.onCleanUp(data); 
            });                
        },  

        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                     onPageLoad
        onPageLoad: function(data)
        {   
            console.log(" * <index.onPageLoad>");
            this.oView.loadPageTemplate(this.pageTemplate());
        },

        // ______________________________________________________________
        //                                                     onCleanUp
        // clean up when new page is loaded.
        onCleanUp: function(data)
        {   

        }

    };

    var Class = constructr;
    Class.prototype = inheritMethods;    
    var instance = new Class();
    
    return (instance);     
   
});