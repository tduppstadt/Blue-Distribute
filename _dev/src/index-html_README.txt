The index.html here in the src folder is used for cache busting 
through a grunt task. If you are to use this MAKE SURE that this 
file is an exact copy of the one you are dev'ing in the _dist 
folder, ADDING the cach busting variables ?{{bustVersion}} for 
the files being loaded.