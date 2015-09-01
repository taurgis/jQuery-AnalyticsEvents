# jQuery-AnalyticsEvents
An simple HTML5 solution to quickly send events to Google Analytics without having to write any Javascript Code.

<a href="https://codeclimate.com/github/taurgis/jQuery-EasyAnalyticsEvents"><img src="https://codeclimate.com/github/taurgis/jQuery-EasyAnalyticsEvents/badges/gpa.svg" /></a>

## Examples HTML

### Initialization

```html
<script  type="text/javascript">
  EasyAnalyticsEvents.init( {debug: true} );
</script>
```

### On show

```html
<div class="analytics-event-display" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value">
  CONTENT HERE
</div>
```

### Input types

```html
<input type="button" class="analytics-event-click" data-ga-category="Category" data-ga-action="Action" data-ga-label="Label" data-ga-value="Value" />
```

```html
<input type="checkbox" class="analytics-event-click" data-ga-category="Checkbox category" data-ga-action="Checkbox Action" data-ga-label="Label" data-ga-checked-value="Value checked" data-ga-value="Value" value="checkbox" />
```

### Select

```html
<select class="analytics-event-change" data-ga-category="Change Select Category" data-ga-action="Change Select Value" data-ga-label="Value">
  <option data-ga-value="A-value" value="A-value">A</option>
  <option data-ga-value="B-value" value="B-value">B</option>
  <option data-ga-value="C-value" value="C-value">C</option>
</select>
```

## Examples JS

```javascript
EasyAnalyticsEvents.track({ category: 'Category', action: 'Action', label: 'Label' } );
```
