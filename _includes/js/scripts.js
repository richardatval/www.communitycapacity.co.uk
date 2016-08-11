$(document).ready(function() {

		// Menu Bar

		var menuToggle = $('#js-mobile-menu').unbind();

		menuToggle.on('click', function(e) {
			e.preventDefault();
			$('#js-navigation-menu').slideToggle(function() {
				$('#js-mobile-menu').toggleClass('active');
				if ($('#js-navigation-menu').is(':hidden')) {
					$('#js-navigation-menu').removeAttr('style');
				}
			});
		})

		// Search Bar

		$('.search-tools').removeClass("show");
		$('#js-search-toggle').attr({
			href: "javascript:void(0)"
		});
		$('#js-search-toggle').addClass("show");
		$('#js-search-toggle').click(function() {
			$(".search-tools").toggle();
			$('#js-search-toggle').toggleClass('active');
		});

//Facebook Events Feed - callback string switches to JSONP mode for ie9

$.getJSON( "https://graph.facebook.com/796315400483436/events/attending/?fields=id,name,place,timezone,start_time&access_token=965566403542200|BVqedniABbAMHxMlDJ17Bym4HSw&since=now&callback=?", function( data ) {
  var items = [];
  for (var i in data["data"]) {
  var time = moment(data["data"][i]["start_time"]);
  var morelink = "";
  if ( i < 3) {
  items.push( '<li><a href="https://www.facebook.com/events/' + data["data"][i]["id"] + '">' + data["data"][i]["name"] + "</a><br />" + time.format('LLLL') + "</li>" );
  }
  else {
  morelink = '<a class="readmore" href="https://www.facebook.com/Community-Capacity-Building-Project-CCB-796315400483436">more</a>'
  }
  }
  items.reverse();
  $( "<ul/>", {
    "class": "item-list",
    html: items.join( "" )
  }).appendTo( "#fb-events" );
  $("#fb-events .item-list").append(morelink);
});

//Initialise google form

		var googleForm = $('#contact-form').jqGoogleForms({
			"formKey": "1bkk6NHX6ANzFR0awKFS5Lcnd0mF4efRCrMZrID3BPlY"
		});

		// Validate Forms

		$("#contact-form").validate({
				rules: {
					email: "required",
				},
				messages: {
					email: "We need your email to send you updates.",
				},
				submitHandler: function(form) {
					googleForm.sendFormData({
						"entry.993658079": $("input[name=name]").val(),
						"entry.1139272614": $("input[name=email]").val(),
						"entry.415731429": $("textarea[name=message]").val()
					});
					$(".flash-success").fadeIn("fast");
					$("#contact-form").fadeOut("fast");
				}
		});
});


(function(jQuery) {
	jQuery.mark = {
		jump: function(options) {
			var defaults = {
				selector: 'a.scroll-on-page-link'
			};
			if (typeof options == 'string') {
				defaults.selector = options;
			}

			options = jQuery.extend(defaults, options);
			return jQuery(options.selector).click(function(e) {
				var jumpobj = jQuery(this);
				var target = jumpobj.attr('href');
				var thespeed = 1000;
				var offset = jQuery(target).offset().top;
				jQuery('html,body').animate({
					scrollTop: offset
				}, thespeed, 'swing');
				e.preventDefault();
			});
		}
	};
})(jQuery);


jQuery(function() {
	jQuery.mark.jump();
});
