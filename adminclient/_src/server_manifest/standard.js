// eslint-disable-next-line 
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var capitalize = require('capitalize');

var standard_colors = ['#6991AC', '#314D5F', '#B1DCF8', '#98D1F8', '#5F4827', '#292C44', '#18CDCA', '#3A86BA', '#4DB3F8', '#4A6679'];
var sansSerif = '"Helvetica Neue",Helvetica,Arial,sans-serif'; // "#f0f0f0"

function getPageWrapper() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$children = options.children,
      children = _options$children === undefined ? ' ' : _options$children;
  //tabs={name,layout}

  return {
    component: 'div',
    children: [{
      component: 'Hero',
      props: {
        size: 'isFullheight',
        isBold: true,
        color: 'isWhite'
      },
      children: [{
        component: 'HeroBody',
        props: {
          style: {
            marginTop: '2rem',
            marginBottom: '2rem',
            alignItems: 'flex-start'
          }
        },
        children: [{
          component: 'Container',
          props: {},
          children: children
        }]
      }]
    }]
  };
}

function getLayout() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rows = options.rows;

  return rows.map(function (row) {
    return {
      component: 'Columns',
      children: row.map(function (col) {
        return {
          component: 'Column',
          props: col.columnProps,
          children: Array.isArray(col) ? col : [col]
        };
      })
      // children:'ok'
    };
  });
}

function getAreaChart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var x = options.x,
      y = options.y,
      data = options.data,
      i = options.i,
      stacked = options.stacked,
      labels = options.labels;

  var colors = options.colors || standard_colors;

  return {
    component: 'victory.VictoryArea',
    props: {
      style: {
        data: stacked === false ? { stroke: colors[i % colors.length] } : undefined

        // data: {
        //   stroke: 'black',
        //   strokeWidth: 1,
        //   // strokeLinecap: 'round',
        // },
      },
      data: data,
      x: x,
      y: y
      // labelComponent:true,
    },
    __dangerouslyEvalProps: {
      labels: labels[y]
    }
  };
}

function getLineChart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var x = options.x,
      y = options.y,
      data = options.data,
      i = options.i,
      stacked = options.stacked,
      labels = options.labels;

  var colors = options.colors || standard_colors;

  return {
    component: 'victory.VictoryLine',
    props: {
      style: {
        data: stacked === false ? { stroke: colors[i % colors.length] } : undefined
      },
      data: data,
      x: x,
      y: y
      // labelComponent:true,
    },
    __dangerouslyEvalProps: {
      // labels:'"1"'
      labels: labels[y]
    },
    __dangerouslyInsertComponents: {
      labelComponent: {
        component: 'victory.VictoryTooltip'
        // props: {
        //   active:true
        // }
      }
    }
  };
}

function getVictoryChart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var chartType = options.chartType,
      data = options.data,
      charts = options.charts,
      padding = options.padding,
      props = options.props,
      _options$displayXAxis = options.displayXAxis,
      displayXAxis = _options$displayXAxis === undefined ? true : _options$displayXAxis,
      _options$displayLegen = options.displayLegend,
      displayLegend = _options$displayLegen === undefined ? true : _options$displayLegen,
      legendProps = options.legendProps,
      _options$stacked = options.stacked,
      stacked = _options$stacked === undefined ? true : _options$stacked,
      _options$labels = options.labels,
      labels = _options$labels === undefined ? {} : _options$labels,
      externalLegend = options.externalLegend;

  var chartTypeLookup = {
    'area': chartType === 'area' ? charts.map(function (chart, i) {
      return getAreaChart({ data: data, x: chart.x, y: chart.y, i: i, stacked: stacked, labels: labels });
    }) : null,
    'line': chartType === 'line' ? charts.map(function (chart, i) {
      return getLineChart({ data: data, x: chart.x, y: chart.y, i: i, stacked: stacked, labels: labels });
    }) : null
  };
  var colors = options.colors || standard_colors;

  return {
    component: 'div',
    props: {
      style: {
        display: 'flex'
      }
    },
    children: [{
      component: 'victory.VictoryChart',
      props: (0, _assign2.default)({
        domainPadding: padding || 20,
        style: {
          fontFamily: sansSerif,
          flex: 1
        }
      }, props),
      children: [displayXAxis ? {
        component: 'victory.VictoryAxis',
        props: {
          tickValues: displayXAxis ? data.map(function (datum) {
            return datum.date;
          }) : undefined,
          label: options.xAxisTitle
        }
      } : null, {
        component: 'victory.VictoryAxis',
        props: {
          dependentAxis: true,
          label: options.yAxisTitle
        }
      }, displayLegend ? {
        component: 'victory.VictoryLegend',
        props: (0, _assign2.default)({
          title: options.legendTitle,
          centerTitle: true,
          colorScale: colors,
          // gutter:20,
          orientation: 'horizontal',
          style: { border: { stroke: 'black' }, title: { fontSize: 20, fontFamily: sansSerif } },
          data: charts.map(function (chart) {
            return { name: chart.y };
          })
        }, legendProps)
      } : null, stacked ? {
        component: 'victory.VictoryStack',
        props: {
          colorScale: colors,
          style: {
            fontFamily: sansSerif
          }
        },
        children: chartTypeLookup[chartType] || null
      } : null].concat(stacked === false ? chartTypeLookup[chartType] : [])
    }, externalLegend ? {
      component: 'div',
      children: [{
        component: 'victory.VictoryLegend',
        props: (0, _assign2.default)({
          title: options.legendTitle,
          centerTitle: true,
          colorScale: colors,
          standalone: true,
          // gutter:20,
          orientation: 'vertical',
          style: { border: { stroke: 'black' }, title: { fontSize: 20, fontFamily: sansSerif } },
          data: charts.map(function (chart) {
            return { name: chart.y };
          })
        }, legendProps),
        __dangerouslyInsertComponents: {
          containerComponent: {
            component: 'victory.VictoryContainer',
            props: {
              responsive: false
            }
          }
        }
      }]
    } : null]
  };
}

function getRechart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = options.data,
      charts = options.charts,
      _options$minHeight = options.minHeight,
      minHeight = _options$minHeight === undefined ? 300 : _options$minHeight,
      props = options.props,
      chartType = options.chartType,
      includeScale = options.includeScale,
      _options$xAxis = options.xAxis,
      xAxis = _options$xAxis === undefined ? true : _options$xAxis,
      _options$yAxis = options.yAxis,
      yAxis = _options$yAxis === undefined ? true : _options$yAxis,
      _options$legend = options.legend,
      legend = _options$legend === undefined ? true : _options$legend,
      _options$children2 = options.children,
      children = _options$children2 === undefined ? [] : _options$children2,
      _options$tooltipProps = options.tooltipProps,
      tooltipProps = _options$tooltipProps === undefined ? {} : _options$tooltipProps,
      _options$tooltip = options.tooltip,
      tooltip = _options$tooltip === undefined ? true : _options$tooltip,
      _options$tooltipEvalP = options.tooltipEvalProps,
      tooltipEvalProps = _options$tooltipEvalP === undefined ? {} : _options$tooltipEvalP,
      _options$containerPro = options.containerProps,
      containerProps = _options$containerPro === undefined ? {} : _options$containerPro,
      _options$ignoreReduxP = options.ignoreReduxProps,
      ignoreReduxProps = _options$ignoreReduxP === undefined ? true : _options$ignoreReduxP,
      _options$legendProps = options.legendProps,
      legendProps = _options$legendProps === undefined ? {} : _options$legendProps;

  var colors = options.colors || standard_colors;

  var chartComponents = Array.isArray(charts) ? charts.map(function (chart, i) {
    return {
      component: 'recharts.' + capitalize(chart.type),

      ignoreReduxProps: ignoreReduxProps,
      bindprops: false,
      props: (0, _assign2.default)({
        dataKey: chart.dataKey,
        fill: chart.fill || chart.fillColor ? chart.fillColor || colors[i % colors.length] : undefined,
        stroke: chart.stroke || chart.strokeColor || chart.type === 'line' ? chart.strokeColor || colors[i % colors.length] : undefined
      }, chart.props)
    };
  }) : [];
  var rechartType = chartType || Array.isArray(charts) && charts.length === 1 ? charts[0].type : Array.isArray(charts) && charts.length > 1 && charts.filter(function (chart) {
    return chart.type !== charts[0].type;
  }).length === 0 ? charts[0].type : 'composed';
  // const util = require('util');
  // console.log(util.inspect(chartComponents, {depth:20}),{  rechartType });

  return {
    component: 'recharts.ResponsiveContainer',
    ignoreReduxProps: ignoreReduxProps,
    bindprops: false,
    props: (0, _assign2.default)({
      minHeight: minHeight
    }, containerProps),
    __dangerouslyInsertComponents: {
      _children: {
        ignoreReduxProps: ignoreReduxProps,
        bindprops: false,
        component: 'recharts.' + capitalize(rechartType) + 'Chart',
        props: (0, _assign2.default)({
          data: data
        }, props),
        children: chartComponents.concat([legend ? {
          component: 'recharts.Legend',
          ignoreReduxProps: ignoreReduxProps,
          bindprops: false,
          props: (0, _assign2.default)({
            align: 'right'
          }, legendProps)
        } : null, xAxis ? {
          component: 'recharts.XAxis',

          ignoreReduxProps: ignoreReduxProps,
          bindprops: false,
          props: (0, _assign2.default)({
            dataKey: 'date'
          }, xAxis.props),
          children: [{
            component: 'recharts.Label',
            props: (0, _assign2.default)({
              // value: 'Sales $',
              position: 'insideBottom'
            }, xAxis.labelProps)
          }]
        } : null, yAxis ? {
          component: 'recharts.YAxis',

          ignoreReduxProps: ignoreReduxProps,
          bindprops: false,
          props: (0, _assign2.default)({}, yAxis.props),

          __dangerouslyEvalProps: (0, _assign2.default)({
            tickFormatter: '(tick)=> window.__reactapp.__ra_helpers.numeral(tick).format("0.0a")'
          }, yAxis.evalProps),
          children: [{
            component: 'recharts.Label',

            ignoreReduxProps: ignoreReduxProps,
            bindprops: false,
            props: (0, _assign2.default)({
              // value: 'Sales $',
              position: 'insideLeft',
              angle: -90
            }, yAxis.labelProps)
          }]
        } : null, tooltip ? {
          component: 'recharts.Tooltip',

          ignoreReduxProps: ignoreReduxProps,
          bindprops: false,
          props: (0, _assign2.default)({
            // dataKey:'actual',
          }, tooltipProps),
          __dangerouslyEvalProps: (0, _assign2.default)({
            formatter: '(tick)=> window.__reactapp.__ra_helpers.numeral(tick).format("$0,0.00")'
          }, tooltipEvalProps)
        } : null, includeScale ? {
          component: 'recharts.Brush',

          ignoreReduxProps: ignoreReduxProps,
          bindprops: false
        } : null]).concat(children)
      }
    }
  };
}

function getLevel() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var levelProps = options.levelProps,
      _options$itemProps = options.itemProps,
      itemProps = _options$itemProps === undefined ? { hasTextCentered: true } : _options$itemProps,
      labelProps = options.labelProps,
      valueProps = options.valueProps,
      _options$items = options.items,
      items = _options$items === undefined ? [] : _options$items;

  return {
    component: 'Level',
    props: levelProps,
    children: items.map(function (item) {
      return {
        component: 'LevelItem',
        props: itemProps,
        children: [{
          component: 'Heading',
          props: labelProps,
          children: item.label
        }, {
          component: 'Title',
          props: (0, _assign2.default)({}, valueProps, item.valueProps),
          children: item.value
        }]
      };
    })
  };
}

module.exports = {
  getPageWrapper: getPageWrapper,
  getLayout: getLayout,
  getAreaChart: getAreaChart,
  getVictoryChart: getVictoryChart,
  getLineChart: getLineChart,
  getRechart: getRechart,
  getLevel: getLevel
};