/** @jsx React.DOM */

var React = require('react');

var Index = React.createClass({displayName: 'Index',
  render: function () {
    return (
      React.DOM.div(null, "Hack it!")
    );
  }
});
React.renderComponent(
    Index(null ) , document.querySelector('.appl'));