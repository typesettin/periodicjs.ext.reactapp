'use strict';

function getTitle(options) {
  return (options.title) ? {
    component: 'CardHeader',
    children: [
      (options.iconLeft)
        ? {
          component: 'CardHeaderIcon',
          props: options.iconLeft,
        }
        : null,
      (typeof options.title === 'string')
        ? {
          component: 'CardHeaderTitle',
          children: options.title,
        }
        : options.title,
      (options.iconRight)
        ? {
          component: 'CardHeaderIcon',
          props: options.iconRight,
        }
        : null,
    ],
  } : null;
}

function getImage(options) {
  return (options.imageProps || options.iconProps ) ? {
    component: 'CardImage',
    children: [
      {
        component: (options.imageProps)?'Image':'Icon',
        props: options.imageProps || options.iconProps,
      },
    ],
  } : null;
}

function getContent(options) {
  return (options.content) ? {
    component: 'CardContent',
    children: (Array.isArray(options.content))
      ? options.content
      : [options.content,],
  } : null;
}

function getFooter(options) {
  return (options.footer) ? {
    component: 'CardFooter',
    children: (Array.isArray(options.footer))
      ? options.footer.map(footer => ({
        component: 'CardFooterItem',
        children: [footer,],
      }))
      : options.footer,
  } : null;
}

function getCard(options) {
  const { cardProps, } = options.props;
  // console.log('getCard',{ options,cardProps });
  return {
    component: 'Card',
    props: cardProps,
    children: [
      getTitle(options),
      getImage(options),
      getContent(options),
      getFooter(options),
    ],
  };
}

module.exports = {
  getTitle,
  getImage,
  getContent,
  getFooter,
  getCard,
};