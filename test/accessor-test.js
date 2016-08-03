let tape = require('tape');
let d3Table = require('../');

tape('Set and get columns() works', function (test) {
    let table = d3Table.table();
    let array = [];
    table.columns(array);
    test.equal(table.columns(), array);
    test.end();
});

tape('Set and get row() works', function (test) {
    let table = d3Table.table();
    let fn = d => {};
    table.row(fn);
    test.equal(table.row(), fn);
    test.end();
});

tape('Set and get data() works', function (test) {
    let table = d3Table.table();
    let array = [];
    table.data(array);
    test.equal(table.data(), array);
    test.end();
});
