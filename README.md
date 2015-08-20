# jQuery-AnalyticsEvents
An simple HTML5 solution to quickly send events to Google Analytics without having to write any Javascript Code.

## Examples
```html
<script  type="text/javascript">
  EasyAnalyticsEvents.init( {debug: true} );
</script>	
```

```html
<div class="analytics-event-display" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value">
  CONTENT HERE
</div>
```

```html
<input type="button" class="analytics-event-click" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value" />
```
