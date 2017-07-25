import React, { Component } from 'react';

class Controls extends Component {
  render() {
    let playClass = 'btn ml-1 ' + (this.props.activePlayback ? 'btn-primary' : 'btn-outline-primary');
    return (
      <div className="row">
        <div className="col-5">
          <h1>JS 808</h1>
        </div>
        <div className="col form-inline">
          <button type="button" className="btn btn-secondary" onClick={() => {this.props.togglePlayback(false)}}>
            <i className="fa fa-stop" aria-hidden="true" />
          </button>
          <button type="button" className="btn btn-secondary ml-1" onClick={() => {this.props.resetPlayback()}}>
            <i className="fa fa-fast-backward" aria-hidden="true" />
          </button>
          <button type="button" className={playClass} onClick={() => {this.props.togglePlayback(true)}}>
            <i className="fa fa-play" aria-hidden="true" />
          </button>


          <input id="bpm" className="form-control ml-1" type="number" value={this.props.bpm} onChange={(event) => { this.props.changeBPM(event.target.value) }} />
          <label htmlFor="bpm" className="ml-1">BPM</label>

          <label className="sr-only" htmlFor="seq-select">Sequence selector</label>
          <select className="custom-select ml-4" value={this.props.sequence} onChange={(event) => { this.props.loadSequence(event.target.value) }}>
            {this.props.sequences.map(function(sequence, index) {
              return (
                <option value={index}>Sequence {index + 1}</option>
              );
            }) }
          </select>
          <button type="button" className="btn btn-secondary ml-1" onClick={() => {this.props.addSequence()}}>
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
