// eslint-disable-next-line 
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTitle(options) {
  return options.title ? {
    component: 'CardHeader',
    children: [options.iconLeft ? {
      component: 'CardHeaderIcon',
      props: options.iconLeft
    } : null, typeof options.title === 'string' ? {
      component: 'CardHeaderTitle',
      children: options.title
    } : options.title, options.iconRight ? {
      component: 'CardHeaderIcon',
      props: options.iconRight
    } : null]
  } : null;
}

function getImage(options) {
  return options.imageProps || options.iconProps ? {
    component: 'CardImage',
    children: [{
      component: options.imageProps ? 'Image' : 'Icon',
      props: options.imageProps || options.iconProps
    }]
  } : null;
}

function getContent(options) {
  return options.content ? {
    component: 'CardContent',
    props: options.contentProps,
    children: Array.isArray(options.content) ? options.content : [options.content]
  } : null;
}

function getFooter(options) {
  return options.footer ? {
    component: 'CardFooter',
    children: Array.isArray(options.footer) ? options.footer.map(function (footer) {
      return {
        component: 'CardFooterItem',
        children: [footer]
      };
    }) : options.footer
  } : null;
}

function getCard() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { props: {} };
  var componentProps = options.componentProps,
      responsive = options.responsive;
  var _options$props$cardPr = options.props.cardProps,
      cardProps = _options$props$cardPr === undefined ? {} : _options$props$cardPr;

  var Image = getImage(options);
  var Content = getContent(options);
  var Footer = getFooter(options);
  // console.log('getCard',{ options,cardProps });
  return responsive ? (0, _assign2.default)({
    component: 'ResponsiveCard',
    props: (0, _assign2.default)({
      cardTitle: options.title,
      iconRight: options.iconRight,
      iconLeft: options.iconLeft
    }, cardProps),
    children: [].concat(Image ? Image.children : []).concat(Content ? Content.children : []).concat(Footer ? Footer.children : [])
  }, componentProps) : (0, _assign2.default)({
    component: 'Card',
    props: cardProps,
    children: [getTitle(options), Image, Content, Footer]
  }, componentProps);
}

module.exports = {
  getTitle: getTitle,
  getImage: getImage,
  getContent: getContent,
  getFooter: getFooter,
  getCard: getCard
};