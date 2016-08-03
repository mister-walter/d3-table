let tape = require('tape');
let d3Table = require('../');
let jsdom = require('jsdom').jsdom;

function makeTestTable2() {
    let table = d3Table.table();
    let data = [
        { id: 0, name: 'Freddie', age: 24 },
        { id: 1, name: 'Daphne', age: 25 }
    ];
    let cols = [
        function (person) { return person.name; },
        function (person) { return person.age; }
    ];

    table.data(data).columns(cols);
    return {table, data, cols};
}

function makeTestTable() {
    let table = d3Table.table();
    let data = [
        { id: 'Harder', icon: 'fa-diamond' },
        { id: 'Better', icon: 'fa-wrench' },
        { id: 'Faster', icon: 'fa-bolt' },
        { id: 'Stronger', icon: 'fa-fighter-jet' }
    ];
    table.data(data).row(d => '<td><i class="fa ' + d.icon + '"></i></td>');

    return {table, data};
}

/*
tape('Row: HTML generation works', function (test) {
    let {table, data, cols} = makeTestTable();

    let document = jsdom();
    let element = document.createElement('table');
    table(element);

    for (let i = 0; i < data.length; i++) {
        let tr = element.children[i];
        test.equal(tr.tagName, 'TR', 'Each child should be a <tr> element');
        test.equal(tr.getAttribute('data-id'), data[i].id.toString(), 'Each child should have a data-id prop with the right value');
        for (let j = 0; j < cols.length; j++) {
            test.equal(cols[j](data[i]).toString(), tr.children[j].textContent, 'The content of each column should be correct');
        }
    }
    test.end();
});
*/

tape('Row: Adding data adds an element to the generated HTML', function (test) {
    let {table, data} = makeTestTable();

    let document = jsdom();
    let element = document.createElement('table');
    table(element);

    let preUpdateHTML = element.outerHTML;

    data.push({id: 'Technologic', icon: 'fa-laptop'});

    table.data(data);

    test.notEqual(element.outerHTML, preUpdateHTML);

    let tr = element.children[element.children.length - 1];
    test.equal(tr.tagName, 'TR');
    test.equal(tr.getAttribute('data-id'), 'Technologic');
    test.equal(tr.children[0].tagName, 'TD');
    test.equal(tr.children[0].children[0].tagName, 'I');
    test.true(tr.children[0].children[0].classList.contains('fa-laptop'));

    test.end();
});

tape('Row: Removing data removes an element from the generated HTML', function (test) {
    let {table, data} = makeTestTable();

    let document = jsdom();
    let element = document.createElement('table');
    table(element);

    let preUpdateHTML = element.outerHTML;

    data.pop();

    table.data(data);

    test.notEqual(element.outerHTML, preUpdateHTML);
    test.equal(element.children.length, 3);

    let tr = element.children[element.children.length - 1];
    test.equal(tr.tagName, 'TR');
    test.equal(tr.getAttribute('data-id'), 'Faster');

    test.end();
});
