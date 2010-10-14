(function($) {

	$.fn.numbered = function(options) {
		
		// Get the Options
		var opts = $.extend({}, $.fn.numbered.defaults, options);
		
		
		/*
		 * Function to create the necessary number of lines to match elements
		 * height.
		 */
		var fillOutLines = function(codeLines, height, lineNo, lineHeight){
			while ( (codeLines.height() - height ) < 0 ){ // Maybe we should include ==0
				codeLines.append("<div class='lineno' style='line-height:"+lineHeight+"'>" + lineNo + "</div>");
				
				lineNo++;
			}
			return lineNo;
		};
		
		
		/*
		 * Iterate through each selector element and apply numbering.
		 */
		return this.each(function() {
			var lineNo = 1;
			var element = $(this);
			
			/* Calculate width including padding and border! */
			var originalElementWidth = element.outerWidth();

			/* Wrap the text area in the elements we need */
			element.wrap("<div class='numberedelement'></div>");
			var numberedElementDiv = element.parent().wrap("<div class='numberedwrap' style='width:" + originalElementWidth + "px'></div>");
			var numberedWrapDiv = numberedElementDiv.parent();
			
			numberedWrapDiv.prepend("<div class='lines'></div>");
			
			var linesDiv = numberedWrapDiv.find(".lines");
			linesDiv.height( element.height() );

			/* Draw the number bar; filling it out where necessary */
			linesDiv.append( "<div class='codelines'></div>" );
			var codeLinesDiv = linesDiv.find(".codelines");
			var lh = element.css('line-height');
			lineNo = fillOutLines( codeLinesDiv, linesDiv.height(), 1, lh );

			/* Set the width */
			var sidebarWidth = linesDiv.outerWidth();
			var paddingHorizontal = parseInt( numberedWrapDiv.css("border-left-width") ) + parseInt( numberedWrapDiv.css("border-right-width") ) + parseInt( numberedWrapDiv.css("padding-left") ) + parseInt( numberedWrapDiv.css("padding-right") );
			var numberedWrapDivNewWidth = originalElementWidth - paddingHorizontal;
			/* TODO: FIX this */
			//var elementNewWidth = originalElementWidth - sidebarWidth - paddingHorizontal - 20;

			//element.width( elementNewWidth );
			numberedWrapDiv.width( numberedWrapDivNewWidth );
		});
	};

  // default options
  $.fn.numbered.defaults = { };
})(jQuery);
