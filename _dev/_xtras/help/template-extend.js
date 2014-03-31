
/*
    for the host class...
    define(["myExtentionClass"],

        function(myExtention)
        {
            // this extends into THIS class
            myExtention(this);
        }
    );
    
*/


// file to extend

define([ 
],

function () 
{
    var extendClass = function(ObjToExtend)
    { 
        // ---------------------------------------------------------------    
        // SUBCLASS        
        // ---------------------------------------------------------------
        $.extend(ObjToExtend,
        {
                         

        });

    };

    return(extendClass);
});