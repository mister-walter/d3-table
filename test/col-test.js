let tape = require('tape');
let d3Table = require('../');
let jsdom = require('jsdom').jsdom;

function makeTestTable() {
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

tape('Col: HTML generation works', function (test) {
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

tape('Col: Adding data adds an element to the generated HTML', function (test) {
    let {table, data} = makeTestTable();

    let document = jsdom();
    let element = document.createElement('table');
    table(element);

    let preUpdateHTML = element.outerHTML;

    data.push({id: 2, name: 'Scooby', age: 7});

    table.data(data);

    test.notEqual(element.outerHTML, preUpdateHTML);

    let tr = element.children[element.children.length - 1];
    test.equal(tr.tagName, 'TR');
    test.equal(tr.getAttribute('data-id'), '2');
    test.equal(tr.children[0].textContent, 'Scooby');
    test.equal(tr.children[1].textContent, '7');

    test.end();
});

tape('Col: Removing data removes an element from the generated HTML', function (test) {
    let {table, data} = makeTestTable();

    let document = jsdom();
    let element = document.createElement('table');
    table(element);

    let preUpdateHTML = element.outerHTML;

    data.pop();

    table.data(data);

    test.notEqual(element.outerHTML, preUpdateHTML);
    test.equal(element.children.length, 1);

    let tr = element.children[0];
    test.equal(tr.tagName, 'TR');
    test.equal(tr.getAttribute('data-id'), '0');

    test.end();
});
