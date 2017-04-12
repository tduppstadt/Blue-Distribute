define([
    "common/view"
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE NAME 
    //
    // ---------------------------------------------------------------

    var constr = function ()
    {
        this.eventStr = "EVENT_LOAD_INDEX"; // event string called to load page
        this.hashString = "default"; // hash string to load page
        this.pageTemplate = window.oTemplates.p_index; // template used 

        this.oView = view;
        
        this.init();
    };

    var inheritObj =
    {    
        // --------------------------------------------------------------
        // inheritObj
        // --------------------------------------------------------------
        
        // ______________________________________________________________
        //                                                           init
        init: function()
        {           
            console.log(" * <pageName>");
            
            this.registerPage();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                   registerPage
        /*
            This function should not be altered. It registers the page with
            the router and the hash module for deeplinking
        */
        registerPage: function()
        {  
            this.oView.registerPage({
                events: [this.eventStr],
                routes: {
                    index: {
                        hashString : this.hashString,
                        loadEvent  : this.eventStr
                    }
                }
            });
        },


        // ______________________________________________________________
        //                                                assignListeners
        /*
            define event listeners here
        */
        assignListeners: function()
        {          
            var self = this;
            
            // listen for page event string
            window.tEvent.addListener(this.eventStr, function(evt, data)
            {
                self.onPageLoad(data);   
            }); 

            // listen if a new page has been loaded
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
        /*
            Called from listener when page is ready to be loaded.
        */
        onPageLoad: function(data)
        {   
            console.log(" * <index.onPageLoad>");
            this.oView.loadPageTemplate(this.pageTemplate());
        },

        // ______________________________________________________________
        //                                                     onCleanUp
        /*
            clean up when new page is loaded if necessary.
        */
        onCleanUp: function(data)
        {   

        }

    };

    var Class = constr;
    Class.prototype = inheritObj;    
    var instance = new Class();
    
    return (instance);     
   
});