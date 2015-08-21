/*
 * jQuery Easy Analytics Events v1.2.0 (https://github.com/taurgis/jQuery-EasyAnalyticsEvents)
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

if (typeof jQuery === 'undefined') {
  throw new Error('Easy Analytics Events\'s JavaScript requires jQuery')
}

var EasyAnalyticsEvents = {
  defaultOptions: {
    clickClass: 'analytics-event-click',
    displayClass: 'analytics-event-display',
    changeClass: 'analytics-event-change',
    submitClass: 'analytics-event-submit',

    categoryAttribute: 'data-ga-category',
    actionAttribute: 'data-ga-action',
    labelAttribute: 'data-ga-label',
    valueAttribute: 'data-ga-value',
    perpetualAttribute: 'data-ga-perpetual',
    checkedCheckboxValueAttribute: 'data-ga-checked-value',
    noninteractionAttribute: 'data-ga-noninteraction',

    debug: false
  },

  init: function (options) {
    options = $.extend({}, this.defaultOptions, options);

    if (options.debug) {
      console.log("Current options:", options);
    }

    this.initializeElementEvents(options);

    $('.' + options.displayClass).each(function(index) {
      EasyAnalyticsEvents.track(EasyAnalyticsEvents.createArgs($(this), options), options);
    });
  },

  initializeElementEvents: function(options) {
    $("." + options.clickClass).on('click', {
      options: options
    }, this.trackElement);

    $("." + options.changeClass).on('change', {
      options: options
    }, this.trackElement);

    $("." + options.submitClass).on('submit', {
      options: options
    }, this.trackElement);
  },

  trackElement: function(event) {
    var _this = $(this);

    EasyAnalyticsEvents.track(EasyAnalyticsEvents.createArgs(_this, event.data.options), event.data.options);
  },

  track: function(eventArguments, options) {
    var defaultEventArguments = {
      category: 'N/A',
      action: 'N/A',
      nonInteraction: false,
      perpetual: true
    };

    eventArguments = $.extend(defaultEventArguments, eventArguments);

    if (eventArguments.sourceElement && eventArguments.sourceElement.data('eventFired') === 'true') {
      return;
    }

    if (!eventArguments.perpetual && eventArguments.sourceElement) {
      eventArguments.sourceElement.data('eventFired', 'true');
    }

    if (_gaq) {
      _gaq.push(['_trackEvent', eventArguments.category, eventArguments.action, eventArguments.label, eventArguments.value, eventArguments.nonInteraction]);
    } else if (ga) {
      ga('send', 'event', eventArguments.category, eventArguments.action, eventArguments.label, eventArguments.value, {
        'nonInteraction': eventArguments.nonInteraction
      });
    } else {
      throw new Error('No Google Analytics script found.');
    }

    if (options && options.debug) {
      console.log("Sending analytics event: ", eventArguments);
    }
  },

  createArgs: function(element, options) {
    var category = element.attr(options.categoryAttribute);
    var action = element.attr(options.actionAttribute);
    var label = element.attr(options.labelAttribute);
    var value;
    switch (element.get(0).tagName) {
      case 'INPUT':
        switch (element.attr('type')) {
          case 'checkbox':
            value = element.is(':checked') ? element.attr(options.checkedCheckboxValueAttribute) : element.attr(options.valueAttribute);
            break;
          default:
            value = element.attr(options.valueAttribute);
        }
        break;
      case 'SELECT':
        value = element.find('option:selected').attr(options.valueAttribute);
        break;
      default:
        value = element.attr(options.valueAttribute);
    }

    var nonInteraction = (element.attr(options.noninteractionAttribute) === 'true');
    var perpetual = (element.attr(options.perpetualAttribute)) ? (element.attr(options.perpetualAttribute) === 'true') : true;

    var args = {
      category: category,
      action: action,
      label: label,
      value: value,
      nonInteraction: nonInteraction,
      perpetual: perpetual,
      sourceElement: element
    };

    return args;
  }
};
