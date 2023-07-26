import React from 'react';

export default (Component, propName, upperBoundPropName) => {
  return class ComponentWithAutoAdvance extends React.PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

    render() {
      return <Component {...this.props} />;
    }
  };
};
