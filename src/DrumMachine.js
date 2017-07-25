import React, { Component } from 'react';
import StepHeader from './StepHeader';
import InstrumentLine from './InstrumentLine';

class DrumMachine extends Component {
  render() {
    return (
      <div className="container">
        <StepHeader step={this.props.step} />
        {Object.getOwnPropertyNames(this.props.sequences[this.props.sequence]).map(function(instrument) {
            return (
              <InstrumentLine instrument={instrument} 
                key={instrument}
                values={this.props.sequences[this.props.sequence][instrument]}
                toggle={this.props.toggleInstrumentStep} />
            );
        }.bind(this)) }
      </div>
    );
  }
}

export default DrumMachine;
