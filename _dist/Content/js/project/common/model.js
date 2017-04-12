define([
    "spearfishHelpers"
], 

function (helpers) 
{

    // ---------------------------------------------------------------
    //
    // Model
    //
    // ---------------------------------------------------------------
   
    var Model = function ()
    {   
        console.log(" * <model>");

        // events
        window.tEvent.eventStr.EVENT_JSON_LOADED = "EVENT_JSON_LOADED";

        // page events
        window.tEvent.eventStr.EVENT_NEW_PAGE     = "EVENT_NEW_PAGE";
        window.tEvent.eventStr.EVENT_PAGE_LOADED  = "EVENT_PAGE_LOADED";

        // maintains page data for router
        this.pageModel = { page:{} };

        // query string object
        this.queryString = window.helpers.parseQuerystring();     

        // debug mode   
        this.debugMode = this.getDebugMode();
        

        this.jConfig = {};



        this.init();
    };
       
    Model.prototype =
    {
        
        // ______________________________________________________________
        //                                                           init
        init: function()
        {
            this.assignListeners();
            this.loadJson();
        },

        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {
            var self = this;

        }, 

        // ______________________________________________________________
        //                                                   getDebugMode
        getDebugMode: function()
        {
            var debug = false;
            if (this.queryString.devdebug && this.queryString.devdebug === "1") 
                debug = true;

            return debug;

        },

        // ______________________________________________________________
        //                                                       loadJson
        loadJson: function()
        {
            var self = this;
            $.getJSON($("[data-json]").attr("data-json"), function(data)
            {   
                self.jConfig = data;
                self.manageEnv();
                window.tEvent.fire(window.tEvent.eventStr.EVENT_JSON_LOADED, data);
                
                console.log(" * <model.loadJson>", data); 
            });    

        },

        // ______________________________________________________________
        //                                                      manageEnv
        manageEnv: function()
        {            
            // get environment
            var env = this.jConfig.environment;
            
            var targetEnv;
            if (document.URL.indexOf(env.development.url) != -1)
            {
                console.log(" * <model.manageEnv> using development environment");
                targetEnv = "development";
            }
            else if (document.URL.indexOf(env.stage.url) != -1)
            {
                console.log(" * <model.manageEnv> using stage environment");
                targetEnv = "stage";
            }
            else if (document.URL.indexOf(env.production.url) != -1)
            {
                console.log(" * <model.manageEnv> using production environment");
                targetEnv = "production";
            }
            else if (document.URL.indexOf(env.local.url) != -1)
            {
                console.log(" * <model.manageEnv> using local environment");
                targetEnv = "local";
            }
            else
            {                    
                console.warn("current Url:", document.URL, " does not match environment params in config file. Fallback to development settings");
                targetEnv = "local";
            }

            // block console log for production                   
            if (targetEnv === "production")
            {                        
                if (!this.debugMode)
                {            
                    console = 
                    {           
                        log   :function(){},
                        warn  :function(){},
                        error :function(){},
                        trace :function(){}
                    };
                }
                                 
            }

        }


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------
       

        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------  

        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
       


    };

    var oModel = new Model(); 
    
    return (oModel);    
});