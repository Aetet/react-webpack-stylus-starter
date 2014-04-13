/** @jsx React.DOM */

var React = require('react');

var Index = React.createClass({
  render: function () {
    return (
      <div>Hack, it.</div>
    );
  }
});
React.renderComponent(
    <Index /> , document.querySelector('.appl'));