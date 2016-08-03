let tape = require('tape');
let d3Table = require('../');
let jsdom = require('jsdom').jsdom;

tape('Calling with no columns, row, or data should make an empty table', function (test) {
    let table = d3Table.table();

    let document = jsdom();
    let element = document.createElement('table');

    table(element);

    test.equal(element.outerHTML, '<table></table>', 'Table element should be empty');

    test.end();
});
