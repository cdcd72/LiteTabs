/*************************************************
*
*	project:  	liteTabs - Lightweight jQuery tabs plugin
*	author:   	Nicola Hibbert
*	url:	  	http://nicolahibbert.com/lightweight-jquery-tab-plugin/
*	demo:	  	http://www.nicolahibbert.com/demo/liteTabs/
*
*	Version:  	1.0.0
*	Copyright: 	(c) 2010-2011 Nicola Hibbert
*	License: 	MIT
*
/*************************************************/
;(function($) {

	$.fn.liteTabs = function(options) {
	    
	    return this.each(function() {

    		var defaults = {
    			borders : false,
    			boxed : false,
    			fadeIn : false,
    			height : 'auto',
    			hideHash : true,
    			rounded : false,
    			selectedTab : 1,
    			width : 500,
				action : 'click'
    		},
		
    		// merge defaults with options in new settings object
    		settings = $.extend({}, defaults, options),
				
    		// define key variables
    		$this = $(this),
    		$ul = $this.children('ul'),
    		$tab = $ul.find('a'),
    		$div = $('> div', $this);

    		// set liteTabs class for css & set optional overall width
    		$this.addClass('liteTabs').width(settings.width);

    		// option: set overall height
    		$div.css({
    			height : settings.height,
    			width : settings.width - (parseInt($div.css('padding-left')) + parseInt($div.css('padding-right'))),
    			position : 'absolute',
    			left : -9999
    		});

			tabSelectedFn = function(e) {

    			var filterHash = $div.removeClass('selected').filter('[name=' + this.hash + ']');
			
    			// defaults: add selected class to tab
    			$tab.removeClass('selected').filter(this).addClass('selected');

    			// option: fade in divs
    			(settings.fadeIn) ? filterHash.hide().addClass('selected').fadeIn() : filterHash.addClass('selected');

    			// option: hide hash change
    			settings.hideHash && e.preventDefault();
    		}

    		// on tab action...
			if (settings.action === 'click')
    			$tab.click(tabSelectedFn);	
			else if (settings.action === 'mouseover')
				$tab.mouseover(tabSelectedFn);	

    		// option: set selected tab
    		settings.selectedTab && $tab.eq(settings.selectedTab - 1).trigger(settings.action);

    		// option: set rounded corners
    		settings.rounded && $this.addClass('rounded');

    		// option: set borders
    		settings.borders && $this.addClass('borders') && $div.width($div.width() - (parseInt($div.css('border-left-width')) + parseInt($div.css('border-right-width'))));

    		// option: set boxed
    		settings.boxed && $this.addClass('boxed');

	    });
		
	};

})(jQuery);