/*
 * jQuery Easy Analytics Events
 * https://github.com/taurgis/jQuery-EasyAnalyticsEvents
 *
 * Copyright 2014, Thomas Theunen
 * https://www.thomastheunen.eu
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on https://github.com/buildingblocks/Quick-Event-Tracking
 *
 * Examples:
 *	<script  type="text/javascript">
 * 		EasyAnalyticsEvents.init( {debug: true} );
 * 	</script>
 *
 * 	<div class="analytics-event-display" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value">
 * 		CONTENT HERE
 * 	</div>
 *
 * 	<input type="button" class="analytics-event-click" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value" />
 */

EasyAnalyticsEvents = {
  defaultOptions: {
    clickClass: "analytics-event-click",
    displayClass: "analytics-event-display",

    categoryAttribute: 'data-ga-category',
    actionAttribute: 'data-ga-action',
    labelAttribute: 'data-ga-label',
    valueAttribute: 'data-ga-value',
    checkedCheckboxValueAttribute: 'data-ga-checked-value',
    noninteractionAttribute: 'data-ga-noninteraction',

    debug: false
  },

  init: function(options) {
    options = $.extend({}, this.defaultOptions, options);

    if (options.debug) {
      console.log("Current options:", options);
    }

    $("." + options.clickClass).on('click', {
      options: options
    }, function(event) {
      var _this = $(this);

      EasyAnalyticsEvents.track(EasyAnalyticsEvents.createArgs(_this, event.data.options), event.data.options);
    });

    $('.' + options.displayClass).each(function(index) {
      EasyAnalyticsEvents.track(EasyAnalyticsEvents.createArgs($(this), options), options);
    });
  },

  track: function(eventArguments, options) {
    var defaultEventArguments = {
      category: 'N/A',
      action: 'N/A',
      nonInteraction: false
    };

    eventArguments = $.extend(defaultEventArguments, eventArguments);

    if (_gaq) {
      _gaq.push(['_trackEvent', eventArguments.category, eventArguments.action, eventArguments.label, eventArguments.value, eventArguments.nonInteraction]);
    } else if (ga) {
      ga('send', 'event', eventArguments.category, eventArguments.action, eventArguments.label, eventArguments.value, {
        'nonInteraction': eventArguments.nonInteraction
      });
    } else {
      throw new Error('No Google Analytics script found.')
    }

    if (options.debug) {
      console.log("Sending analytics event: ", eventArguments);
    }
  },

  createArgs: function(element, options) {
    var category = element.attr(options.categoryAttribute);
    var action = element.attr(options.actionAttribute);
    var label = element.attr(options.labelAttribute);
    var value = (element.is(':checkbox')) ? (element.is(':checked') ? element.attr(options.checkedCheckboxValueAttribute) : element.attr(options.valueAttribute)) : element.attr(options.valueAttribute);
    var nonInteraction = (element.attr(options.noninteractionAttribute) === 'true');

    var args = {
      category: category,
      action: action,
      label: label,
      value: value,
      nonInteraction: nonInteraction
    };
		
    return args;
  }
};
