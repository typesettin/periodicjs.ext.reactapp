'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluralize = require('pluralize');
var capitalize = require('capitalize');

function getTableHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var headers = options.headers,
      headerProps = options.headerProps,
      htmlTH = options.htmlTH,
      _options$customRowPro = options.customRowProps,
      customRowProps = _options$customRowPro === undefined ? {} : _options$customRowPro;

  return {
    component: 'Thead',
    props: headerProps || {},
    children: [{
      component: 'Tr',
      children: headers.map(function (header) {
        return {
          component: htmlTH ? 'th' : 'Th',
          props: (0, _assign2.default)({
            className: '__re-bulma_th'
          }, customRowProps[0]),
          children: options.capitalizeHeaders ? capitalize(header) : header
        };
      })
    }]
  };
}

function getTableBody() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = options.data,
      bodyProps = options.bodyProps,
      tableRowProps = options.tableRowProps,
      tableColProps = options.tableColProps,
      _options$customRowPro2 = options.customRowProps,
      customRowProps = _options$customRowPro2 === undefined ? {} : _options$customRowPro2,
      htmlTD = options.htmlTD;

  return {
    component: 'Tbody',
    props: bodyProps || {},
    children: data.map(function (row, i) {
      return {
        component: 'Tr',
        props: (0, _assign2.default)({}, tableRowProps, customRowProps[i]),
        children: (0, _keys2.default)(row).map(function (col) {
          return {
            component: htmlTD ? 'td' : 'Td',
            props: (0, _assign2.default)({
              className: '__re-bulma_td'
            }, tableColProps, (0, _typeof3.default)(row[col]) === 'object' && (0, _typeof3.default)(row[col].columnProps) ? row[col].columnProps : {}),
            children: (0, _typeof3.default)(row[col]) === 'object' && typeof row[col].displayValue !== 'undefined' ? row[col].displayValue || ' ' : row[col]
          };
        })
      };
    })
  };
}

function getTableFooter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var footers = options.footers,
      footerProps = options.footerProps,
      htmlTF = options.htmlTF,
      tableRowProps = options.tableRowProps,
      customRowProps = options.customRowProps;

  return {
    component: 'Tfoot',
    props: footerProps || {},
    children: [{
      component: 'Tr',
      props: (0, _assign2.default)({}, tableRowProps),
      children: footers.map(function (footer) {
        return {
          component: htmlTF ? 'th' : 'Th',
          props: {
            className: '__re-bulma_th'
          },
          children: footer
        };
      })
    }]
  };
}

function getBasicTable() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$hasHeader = options.hasHeader,
      hasHeader = _options$hasHeader === undefined ? true : _options$hasHeader,
      _options$hasBody = options.hasBody,
      hasBody = _options$hasBody === undefined ? true : _options$hasBody,
      _options$hasFooter = options.hasFooter,
      hasFooter = _options$hasFooter === undefined ? true : _options$hasFooter,
      _options$data = options.data,
      data = _options$data === undefined ? [] : _options$data,
      bodyProps = options.bodyProps,
      header = options.header,
      headerProps = options.headerProps,
      footer = options.footer,
      footerProps = options.footerProps,
      props = options.props,
      tableRowProps = options.tableRowProps,
      tableColProps = options.tableColProps,
      capitalizeHeaders = options.capitalizeHeaders,
      htmlTH = options.htmlTH,
      htmlTD = options.htmlTD,
      htmlTF = options.htmlTF,
      _options$ignoreReduxP = options.ignoreReduxProps,
      ignoreReduxProps = _options$ignoreReduxP === undefined ? true : _options$ignoreReduxP,
      _options$customRowPro3 = options.customRowProps,
      customRowProps = _options$customRowPro3 === undefined ? {} : _options$customRowPro3;

  var headers = header || (0, _keys2.default)(data[0]);
  var footers = footer || headers;
  var tableProps = props || {};
  return {
    component: 'Table',
    ignoreReduxProps: ignoreReduxProps,
    props: tableProps,
    children: [hasHeader ? getTableHeader({ data: data, headers: headers, headerProps: headerProps, capitalizeHeaders: capitalizeHeaders, htmlTH: htmlTH, customRowProps: customRowProps }) : null, hasBody ? getTableBody({ data: data, bodyProps: bodyProps, tableRowProps: tableRowProps, tableColProps: tableColProps, htmlTD: htmlTD, customRowProps: customRowProps }) : null, hasFooter ? getTableFooter({ data: data, footers: footers, footerProps: footerProps, htmlTF: htmlTF, customRowProps: customRowProps }) : null]
  };
}

function getTable(options) {
  var schemaName = options.schemaName,
      baseUrl = options.baseUrl,
      headers = options.headers,
      tableProps = options.tableProps,
      asyncdataprops = options.asyncdataprops,
      customLayout = options.customLayout,
      customLayoutStyle = options.customLayoutStyle,
      asyncprops = options.asyncprops,
      thisprops = options.thisprops,
      dataMap = options.dataMap,
      _options$limit = options.limit,
      limit = _options$limit === undefined ? 100 : _options$limit,
      useThisProps = options.useThisProps,
      bindprops = options.bindprops;

  return {
    component: 'ResponsiveTable',
    props: (0, _assign2.default)({}, {
      style: {
        wordWrap: 'break-word'
      },
      limit: limit,
      'filterSearch': true,
      'tableSearch': true,
      flattenRowData: true,
      flattenRowDataOptions: { maxDepth: 3 },
      baseUrl: baseUrl,
      dataMap: dataMap ? dataMap : [{
        'key': 'rows',
        'value': '' + pluralize(schemaName)
      }, {
        'key': 'numItems',
        'value': pluralize(schemaName) + 'count'
      }, {
        'key': 'numPages',
        'value': schemaName + 'pages'
      }],
      'headerLinkProps': {
        'style': {
          'textDecoration': 'none'
        }
      },
      headers: headers,
      customLayout: customLayout,
      customLayoutStyle: customLayoutStyle
    }, tableProps),
    thisprops: (0, _assign2.default)({}, thisprops, useThisProps ? {
      'rows': [asyncdataprops, 'data', '' + pluralize(schemaName)],
      'numItems': [asyncdataprops, 'data', pluralize(schemaName) + 'count'],
      'numPages': [asyncdataprops, 'data', schemaName + 'pages']
    } : {}),
    bindprops: bindprops,
    asyncprops: asyncprops ? asyncprops : useThisProps ? {} : {
      'rows': [asyncdataprops, 'data', '' + pluralize(schemaName)],
      'numItems': [asyncdataprops, 'data', pluralize(schemaName) + 'count'],
      'numPages': [asyncdataprops, 'data', schemaName + 'pages']
    }
  };
}

function getSheet(options) {
  var _options$data2 = options.data,
      data = _options$data2 === undefined ? [] : _options$data2;

  var headers = (0, _keys2.default)(data[0]);
  var columns = headers.map(function (column, i) {
    return {
      title: column,
      dataIndex: column,
      key: column,
      width: 'auto'
      // fixed: (i === 0)
      //   ? 'left'
      //   : (i === (headers.length - 1))
      //     ? 'right'
      //     : undefined,
    };
  });
  return {
    component: 'RCTable',
    props: {
      columns: columns,
      data: data,
      // useFixedHeader:true,
      scroll: {
        // x: 1500,
        // x: true,
        // x: '150%',
        // y: 350,
        // y:true,
      }
    }
  };
}

module.exports = {
  getTableHeader: getTableHeader,
  getTableFooter: getTableFooter,
  getTable: getTable,
  getBasicTable: getBasicTable,
  getSheet: getSheet
};