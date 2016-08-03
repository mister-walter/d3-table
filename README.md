# d3-table
[![NPM version](https://img.shields.io/npm/v/d3-table.svg)](https://www.npmjs.com/package/d3-table)

Create HTML tables that leverage d3 to respond to data changes by adding and removing rows as needed.

## Installing

If you use NPM, `npm install d3-table`. Otherwise, download the [latest release](https://github.com/mister-walter/d3-table/releases/latest).

If being used in a vanilla environment, make sure that the [d3-selection](https://github.com/d3/d3-selection) script is included before the d3-table script. 

## Usage

First, require d3-table according to your platform:

* In vanilla,
```xml
<script src='d3-selection.v1.min.js'></script>
<script src='d3-table.min.js'></script>
```

* Using webpack,
```javascript
let d3_table = require('d3-table');
```

* In an ES6 Module capable environment,
```javascript
import * as d3_table from 'd3-table';
```

Then, create a table and give it some data and formatting functions:

```javascript
// note: if using vanilla, replace d3_table with d3
let table = d3_table.table();
table.data([
    { id: 0, name: 'Freddie', age: 24 },
    { id: 1, name: 'Daphne', age: 25 }
]).columns([
    function (person) { return person.name; },
    function (person) { return person.age; }
]);
```

Finally, bind it to an element:

```javascript
table('#someTable');
```

This produces the following HTML:

```xml
<table id="table">
    <tr data-id="0">
        <td>Freddie</td>
        <td>24</td>
    </tr>
    <tr data-id="1">
        <td>Daphne</td>
        <td>25</td>
    </tr>
</table>
```

If you update the table's data after it has been bound to an element, the HTML table will update automatically. i.e.,
```javascript
table.data([{ id: 0, name: 'Freddie', age: 24 }, { id: 2, name: 'Velma', age: 22 });
```
will result in the table being updated to remove the row for Daphne and add a row for Velma:
```xml
<table id="table">
    <tr data-id="0">
        <td>Freddie</td>
        <td>24</td>
    </tr>
    <tr data-id="2">
        <td>Velma</td>
        <td>22</td>
    </tr>
</table>
```

A row function can be specified instead of an array of column functions. This can be useful when using templates (i.e. Mustache or Handlebars) to help generate the table. i.e.:
```xml
<script id="row-template">
    <td>
        <span>{{{id}}}</span>
    </td>
    <td>
        <i class="fa {{{icon}}}"></i>
    </td>
</script>
```
```javascript
var table = d3.table();
var template = Handlebars.compile($('#row-template').html());
table.data([
    { id: 'Harder', icon: 'fa-diamond' }, // Using font-awesome icons
    { id: 'Better', icon: 'fa-wrench' },
    { id: 'Faster', icon: 'fa-bolt' },
    { id: 'Stronger', icon: 'fa-fighter-jet' }
]).row(d => template(d));
var tableElement = document.createElement('table');
table(tableElement); // you can provide an HTMLElement instead of a selector too
```
After which, tableElement would be the following:
```xml
<table>
    <tr data-id="Harder">
        <td>
            <span>Harder</span>
        </td>
        <td>
            <i class="fa fa-diamond"></i>
        </td>
    </tr>
    <tr data-id="Better">
        <td>
            <span>Better</span>
        </td>
        <td>
            <i class="fa fa-wrench"></i>
        </td>
    </tr>
    <tr data-id="Faster">
        <td>
            <span>Faster</span>
        </td>
        <td>
            <i class="fa fa-bolt"></i>
        </td>
    </tr>
    <tr data-id="Stronger">
        <td>
            <span>Stronger</span>
        </td>
        <td>
            <i class="fa fa-fighter-jet"></i>
        </td>
    </tr>
</table>
```

**Note:** You must provide the `<td>` tags in the appropriate places if you use the row function!

## Todo
* Add support for arbitrary unique id paramter
* User-specified td/tr HTML classes/ids
* Column heading (`<th>`) support
* Integrate better with d3-collection
* Improve documentation
* More examples (i.e. with animated transitions + other fanciness)

## API Reference

<a href="#table" name="table">#</a> d3.<b>table</b>()

Creates a new table with an empty array of data and no row function or columns functions.

<a href="#_table" name="_table">#</a> <i>table</i>(<i>selector</i>)

Attaches the table to *elem*, which can be either a DOM element or a selector.

<a href="#table_data" name="table_data">#</a> <i>table</i>.<b>data</b>([<i>data</i>])

If *data* is specified, sets *data* as the *table*'s data source. If *data* is not specified, returns the *table*'s current data source.
If *table* has already been bound to an element, this will update the table to reflect any changes in *data*.
**Note: Currently, each data element must have an 'id' property which uniquely identifies it. This is how d3-table can identify if an element has been added/removed.**

<a href="#table_columns" name="table_columns">#</a> <i>table</i>.<b>columns</b>([<i>columns</i>])

If *columns* is specified, sets *columns* as the *table*'s array of cell generating functions. If *columns* is set and *row* is not, this library generates a table by creating a row for each item in *data* and creating a cell in that row for each function in *columns*, with the return value of each function determining the content that is put into each cell. If *columns* is not specified, returns the *table*'s current cell generating function array.

<a href="#table_row" name="table_row">#</a> <i>table</i>.<b>row</b>([<i>row</i>])

If *row* is specified, sets *row* as the *table*'s row generating function. If this is set to a truthy value, the table's column function array is ignored and this library generates a table by creating a row for each item in *data*, where the row's content is the return value of the *table*'s row function called with that row's *data* item. If *row* is not specified, returns the *table*'s current row generating function.
