'use strict';
const pluralize = require('pluralize');
const capitalize = require('capitalize');

function getTableHeader(options = {}) { 
  const { headers, headerProps, } = options;
  return {
    component: 'Thead',
    props:headerProps,
    children: [
      {
        component: 'Tr',
        children: headers.map(header => ({
          component: 'Th',
          children: (options.capitalizeHeaders) ? capitalize(header) : header, 
        })),
      },
    ],
  };
}

function getTableBody(options = {}) {
  const { data, bodyProps, tableRowProps, tableColProps, } = options;
  return {
    component: 'Tbody',
    props:bodyProps,
    children: data.map(row => ({
      component: 'Tr',
      props: tableRowProps,
      children: Object.keys(row).map(col => ({
        component: 'Td',
        props: tableColProps,
        children:row[col],
      })),  
    })),
  };
}

function getTableFooter(options = {}) {
  const { footers, footerProps, } = options;
  return {
    component: 'Tfoot',
    props:footerProps,
    children: [
      {
        component: 'Tr',
        children: footers.map(footer => ({
          component: 'Th',
          children: footer,  
        })),
      },
    ],
  };
}

function getBasicTable(options = {}) {
  const {
    hasHeader = true,
    hasFooter = true,
    data = [],
    bodyProps,
    header,
    headerProps,
    footer,
    footerProps,
    props,
    tableRowProps,
    tableColProps,
    capitalizeHeaders,
  } = options;
  const headers = header || Object.keys(data[ 0 ]);
  const footers = footer || headers;
  const tableProps = props || {};
  return {
    component: 'Table',
    props: tableProps,
    children: [
      hasHeader ? getTableHeader({ data, headers, headerProps, capitalizeHeaders, }) : null,
      getTableBody({ data, bodyProps, tableRowProps, tableColProps, }),
      hasFooter ? getTableFooter({ data, footers, footerProps, }) : null,
    ],
  };
}

function getTable(options) {
  const { schemaName, baseUrl, headers, tableProps, asyncdataprops, customLayout, customLayoutStyle, asyncprops, thisprops, dataMap, limit=100,} = options;
  return {
    component: 'ResponsiveTable',
    props: Object.assign({},{
      style: {
        wordWrap: 'break-word',
      },
      limit,
      'filterSearch': true,
      'tableSearch': true,
      flattenRowData: true,
      flattenRowDataOptions: { maxDepth: 3, },
      baseUrl,
      dataMap: (dataMap) ? dataMap : [ {
        'key': 'rows',
        'value': `${pluralize(schemaName)}`,
      }, {
        'key': 'numItems',
        'value': `${pluralize(schemaName)}count`,
      }, {
        'key': 'numPages',
        'value': `${schemaName}pages`,
      }, ],
      'headerLinkProps': {
        'style': {
          'textDecoration': 'none',
        },
      },
      headers,
      customLayout,
      customLayoutStyle,
    },tableProps),
    thisprops,
    asyncprops: (asyncprops) ? asyncprops : {
      'rows': [
        asyncdataprops, 'data', `${pluralize(schemaName)}`,
      ],
      'numItems': [
        asyncdataprops, 'data', `${pluralize(schemaName)}count`,
      ],
      'numPages': [
        asyncdataprops, 'data', `${schemaName}pages`,
      ],
    },
  };
}

function getSheet(options) {
  const { data = [], } = options;
  const headers = Object.keys(data[ 0 ]);
  const columns = headers.map((column,i) => ({
    title: column,
    dataIndex: column,
    key: column,
    width:'auto',
    // fixed: (i === 0)
    //   ? 'left'
    //   : (i === (headers.length - 1))
    //     ? 'right'
    //     : undefined,
  }));
  return {
    component: 'RCTable',
    props: {
      columns,
      data,
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
  getTableHeader,
  getTableFooter,
  getTable,
  getBasicTable,
  getSheet,
};