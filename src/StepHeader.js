import React, { Component } from 'react';

const steps = [...Array(16).keys()];

class StepHeader extends Component {
  columns() {
    return steps.map(function(index) { 
      return (
        <div className={"step-label text-center sixteenth " + (this.props.step === index ? 'active' : '')} key={index}>
          {index + 1}
        </div>
      );
    }.bind(this));
  }
  // this feels messy, but I wasn't keen on writing this div 16 times
  render() {
    return (
      <div className="row mt-4 mb-2">
        <div className="col-md-3">
          &nbsp;
        </div>
        <div className="col-md-9">
          <div className="row">
            {this.columns()}
          </div>
        </div>
      </div>
    );
  }

}

export default StepHeader;
