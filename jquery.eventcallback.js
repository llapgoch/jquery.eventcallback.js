// Fires an event when all of the elements in the set have also fired the same event

;(function($){
    $.fn.eventcallback = function(params){
        // Use multiple to have the event called more than once
        var defaults = {
            multiple: false
        };
        
        if(!params || !params.event || !params.callback){
            throw 'No event or callback provided';
        }
        
        var total = this.size(),
            count = 0,
            finished = false,
            callback,
            options = $.extend({}, defaults, params);
        
        var checkFinished = function(){
            if(count >= total && (finished == false || options.multiple == true)){
                finished = true;
                options.callback();
            }
        }
        
        return this.each(function(){
            var element = $(this);
      
            // Return early if this element already has a plugin instance
            if (element.data('eventcallback')) return;
            
            element.on(options.event, function(){
                count++;
                checkFinished();
            });

            // Store plugin object in this element's data
            element.data('eventcallback', true);
        });
        
        checkFinished();
    };    
}(jQuery));