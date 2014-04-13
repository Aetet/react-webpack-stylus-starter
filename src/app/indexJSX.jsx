/** @jsx React.DOM */

var React = require('react'),
    MaskedInput = require('root/MaskedInput/views/MaskedInput');
var Index = React.createClass({
  getInitialState: function () {
    return {
      maskValue: ''
    };
  },

  handleMasked: function (value) {
    this.setState({maskValue: value});
  },

  render: function () {
    return (
      <div className='masked-input'>
        <MaskedInput onChange={this.handleMasked}
                     mask="1999-9999-9999"
                     value={this.state.maskValue}/>
      </div>);
  }
});
React.renderComponent(
    <Index /> , document.querySelector('.appl'));