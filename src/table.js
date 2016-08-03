import {select} from 'd3-selection';

function d3TableFactory() {
    var data = [];
    var columnFunctions = [];
    var rowFunction = false;
    var sel = {};

    function _makeTable() {
        sel.table.selectAll('*').remove();

        var table = sel.table
            .selectAll('tr')
            .data(data, function (d) { return d.id; });

        if (rowFunction) {
            table.enter()
                .append('tr')
                .attr('data-id', function (d) { return d.id; })
                .html(function (d) { return rowFunction(d); });
        } else {
            table.enter()
                .append('tr')
                .attr('data-id', function (d) { return d.id; })
                .selectAll('td')
                .data(function (row, i) {
                    return columnFunctions.map(function (colFn) {
                        return colFn(row, i);
                    });
                }).enter()
                .append('td')
                .html(function (d) { return d; });
        }

        table.exit()
            .remove();
    }

    /**
     * Bind the D3Table to a DOM element.
     *
     * This will insert the generated HTML for the table into the given element.
     *
     * @param {Element|string} selector - The Element object to bind to, or a CSS selector for an element within
     *                                    the document.
     * @returns {undefined}
     */
    function d3Table(selector) {
        sel.table = select(selector);
        _makeTable();
    }

    /**
     * Getter/setter for the D3Table's data
     *
     * If 1 argument is provided, acts as a setter
     * If no arguments are provided, acts as a getter
     * If the D3Table has already been bound to an element, this will update the table as needed.
     *
     * @param {Array<object>|undefined} value - The value to set as the D3Table's data. Optional.
     * @returns {Array<object>|D3Table} - The current data if called as a getter, the calling D3Table if called as
     *                                     a setter.
     */
    d3Table.data = function (value) {
        if (!arguments.length) return data;
        data = value;
        if (sel.table) _makeTable();
        return d3Table;
    };

    /**
     * Getter/setter for the D3Table's column function array
     *
     * If 1 argument is provided, acts as a setter
     * If no arguments are provided, acts as a getter
     * Note: if the row function has been set, that will take precedence over any column functions!
     *
     * @param {Array<function>|undefined} value - The value to set as the D3Table's column function array. Optional.
     * @returns {D3Table|Array<function>} - The current column function array if called as a setter. The calling
     *                                       D3Table if called as a getter.
     */
    d3Table.columns = function (value) {
        if (!arguments.length) return columnFunctions;
        columnFunctions = value;
        if (sel.table) _makeTable();
        return d3Table;
    };

    /**
     * Getter/setter for the D3Table's row function
     *
     * If 1 argument is provided, acts as a setter
     * If no arguments are provided, acts as a getter
     *
     * @param {function|undefined} value - The value to set as the D3Table's row function. Optional.
     * @returns {D3Table|function} - The current row function if called as a setter. The calling D3Table if called as
     *                               a getter.
     */
    d3Table.row = function (value) {
        if (!arguments.length) return rowFunction;
        rowFunction = value;
        if (sel.table) _makeTable();
        return d3Table;
    };

    return d3Table;
}

export default d3TableFactory;
