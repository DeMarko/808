import React, { Component } from 'react';

class InstrumentLine extends Component {
  buttons() {
    return this.props.values.map(function(on, index) {
      var rolandClass = 'roland-' + (index < 4 ? 'red' : (index < 8 ? 'orange' : (index < 12 ? 'yellow' : 'offwhite')));

      var clickHandler = function() {
        this.props.toggle(this.props.instrument, index);
      };

      return (
        <button type="button" className={"btn btn-secondary sixteenth " + rolandClass} key={index} onClick={clickHandler.bind(this)}>
          <i className={"fa fa-circle" + (on ? '' : '-o')} aria-hidden="true"></i>
        </button>
      );
    }.bind(this));
  }
  
  render() {
    return (
      <div className="row mt-4 mb-2">
        <div className="col-md-3 text-right text-uppercase font-weight-bold">
          {this.props.instrument}
        </div>
        <div className="col-md-9">
          <div className="row">
            {this.buttons()}
          </div>
        </div>
      </div>
    );
  }

}

export default InstrumentLine;
