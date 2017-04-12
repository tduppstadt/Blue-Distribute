define([
    "modules/hash",
    "common/view"  
], 

function (hash, view)
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
    //
    // ---------------------------------------------------------------

    var MainNav = function ()
    {
        console.log(" * <mainNav>");

        this.oView = view;
        this.oHash = hash;

        this.ui = {
            anchor: ".anchor-trigger"
        };

        this.init();
    };

    MainNav.prototype =
    {    
       
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

            // new page action
            window.tEvent.addListener( window.tEvent.eventStr.EVENT_NEW_PAGE, function(evt, newPageData)
            {   
                self.onNewPage(newPageData);
            });

            // page is loaded, check for anchor and scroll to anchor
            window.tEvent.addListener(window.tEvent.eventStr.EVENT_PAGE_LOADED, function(evt, data)
            {
                setTimeout(function(){ self.hashCheck(); }, 300);
            });

            // add anchor click to the hash
            $("body").on("click", this.ui.anchor, function(){
                var anchor = $(this).attr("data-anchor");
                var myHash = location.hash.split("#")[1].split(";")[0];
                myHash += ";anchor=" + anchor;

                // update hash
                self.oHash.setHash(myHash);

                // scroll to anchor
                self.onScrollToAnchor(anchor);
            });
            
        },

        


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                      hashCheck
        hashCheck: function()
        {
            var hashObj = this.oHash.parseHashObj();
            if (hashObj.anchor){
                this.onScrollToAnchor(hashObj.anchor);
            }

        },

        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------

        // ______________________________________________________________
        //                                               onScrollToAnchor
        onScrollToAnchor: function(anchorName)
        {
            var target = $('[name=' + anchorName + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 40
                }, 1000);
                return false;
            }
        },

        // ______________________________________________________________
        //                                                    onUpdateNav
        onUpdateNav: function(newPageData)
        {
            var self = this;

            // if no hash set home page button active
            if (newPageData.page === "") {
                newPageData.page = "default";
            }

            $(".js-nav-button").each(function(){
                $(this).removeClass("active");
                if (newPageData.page === $(this).attr("data-id")) {
                    $(this).addClass("active");
                } 
            });
        },


        // ______________________________________________________________
        //                                                      onNewPage
        // close panels, modals, update navigation
        onNewPage: function(newPageData)
        {   
            // sample on updating global navigation
            //this.onUpdateNav(newPageData);

        }



    };

    var oMainNav = new MainNav();
        
    return (oMainNav);        
   
});