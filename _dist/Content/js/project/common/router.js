/*
    INSTRUCTIONS:

    For Single Page apps:
    Use the pageModel to organize the hash and event strings.
    NOTE: pre-instantiate your page classes

    For Multi Page apps:
    Use the loadActivePage method to instantiate the active page.
    NOTE: Do not instantiate your page classes, the router will do this as needed 
*/

define([
    "common/model",
    "index"  
],

function (model, PageIndex) 
{

    // ---------------------------------------------------------------
    //
    // ROUTER
    //
    // ---------------------------------------------------------------
    

    var Router = function()
    {       
        console.log(" * <router>");

        var self = this;

        // defined in data-page-structure
        this.PAGE_STRUCTURE_SINGLE = "single";
        this.PAGE_STRUCTURE_MULTI  = "multi";
        this.PAGE_STRUCTURE_HYBRID = "hybrid";

        // core objects
        this.oModel = model;                  

        this.pageModel = {};
        this.oActivePage = {};

        this.init();  
    };

    Router.prototype =
    {

        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                                           init
        init: function()
        {   
            
            /* 
                Used for single page apps,
                Use pageModel to define hash strings and page load events
                this.initHash();
            
                Used for multi page apps,
                instantiate  the class based on html data-pageId
                this.loadActivePage();  
            */ 

            var structure = $("[data-page-structure]").attr("data-page-structure");
            console.log(" * <router.init> data-page-structure: " + structure);
            switch(structure)
            {
                case this.PAGE_STRUCTURE_SINGLE:
                    this.initHash();                     
                    break;

                case this.PAGE_STRUCTURE_MULTI:
                    this.loadActivePage();  
                    break;

                case this.PAGE_STRUCTURE_HYBRID:
                    this.initHash();
                    this.loadActivePage(); 
                    break;  
            }
                     
        },
        
        // ______________________________________________________________
        //                                                  initPageModel
        /* 
                Used for multi page apps,
                instantiate the class based on html data-page-id
        */
        initPageModel: function()
        {
             this.pageModel = 
            {
                section:
                {
                    index:
                    {
                        hashString : "index",
                        loadEvent  : window.tEvent.eventStr.EVENT_LOAD_INDEX
                    }
                }
            };

            // give model page model ref
            this.oModel.pageModel = this.pageModel;
        },

        // ______________________________________________________________
        //                                                       initHash
        /* 
                Used for multi page apps,
                instantiate the class based on html data-page-id
        */
        loadActivePage: function()
        {
            // load the appropriate page based on data-page-id attribute and call init();
            var self = this;

            this.oActivePage = {};
            var pageId = $("script[data-page-id]").attr("data-page-id");


            console.log(" * <router.loadActivePage> " + pageId);

            switch(pageId)
            {
                // init index page
                case "index":
                    self.oActivePage = new PageIndex();           
                    break;
            }
        },


        // ______________________________________________________________
        //                                                       initHash
        initHash: function()
        {      
            var self = this;

            // init page model (cotains available hash strings)
            this.initPageModel();

            window.allowHash = true;
            window.onhashchange = function()
            {      
                window.tEvent.fire(window.tEvent.eventStr.EVENT_NEW_PAGE);
                
                // check for allowing updates based on hash                
                if (!window.allowHash) 
                {
                    window.allowHash = true;
                    return;
                }

                // find hash string and call event
                var result = false;
                exitIter:
                for (var sectionKey in self.oModel.pageModel)
                {
                    for (var key in self.oModel.pageModel[sectionKey])
                    {                        
                        if (location.hash === "#" + self.oModel.pageModel[sectionKey][key].hashString)
                        {                           
                            result = true;                        
                            window.tEvent.fire(self.oModel.pageModel[sectionKey][key].loadEvent);
                            break exitIter;
                        }
                    }
                }
                return(result);
            };          
            
        },


        // ______________________________________________________________
        //                                                    processHash
        // Will return false if no hash is used. This can be used to determine
        // anothe course of action.
        processHash: function()
        {
            return(window.onhashchange());
        },

        // ______________________________________________________________
        //                                                         setHash
        setHash: function(str)
        {
            window.allowHash = false;
            location.hash = str;
        }


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------        


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------      
        

    };


    var oRouter = new Router();
    
    return (oRouter);
});