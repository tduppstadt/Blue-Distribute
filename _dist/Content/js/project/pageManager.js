//https://github.com/ded/klass

define([    
    "EventTarget",
    "index",
    "Templates",   
    "modules/eventTracking",  
    "gsCSSPlugin",
    "gsTweenLite",
    "spearfishHelpers",
    "notify",
    "bootstrap",
    "hammer"
],

function (a, PageIndex)
{
    // hides url navbar on mobile devices
    window.helpers.hideUrlBar();
    

    //____________________________________ templates
    // window.oTemplates
    

    // ---------------------------------------------------------------
    //
    // PAGE MANAGER
    //
    // ---------------------------------------------------------------
    var PageManager = function ()
    {
        // load the appropriate page based on data-pageId attribute and call init();
        var self = this;

        this.oActivePage = {};
        var pageId = $("script[data-pageId]").attr("data-pageId");

        switch(pageId)
        {
            // init index page
            case "index":
                self.oActivePage = new PageIndex();           
                break;
        }
    };

    PageManager();

});