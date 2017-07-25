import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';
import Controls from './Controls';
import DrumMachine from './DrumMachine';

const emptyInstruments = {
  'kick': Array(16).fill(false),
  'snare': Array(16).fill(false),
  'open hat': Array(16).fill(false),
  'closed hat': Array(16).fill(false),
};
class App extends Component {
  constructor () {
    super();

    var seq1 = JSON.parse(JSON.stringify(emptyInstruments));
    seq1.kick[0] = seq1.kick[4] = seq1.kick[8] = seq1.kick[12] = true;
    seq1.snare[4] = seq1.snare[12] = true;
    seq1['open hat'][2] = seq1['open hat'][6] = seq1['open hat'][10] = seq1['open hat'][14] = true;
    seq1['closed hat'][0] = seq1['closed hat'][4] = seq1['closed hat'][8] = seq1['closed hat'][12] = true;

    var seq2 = JSON.parse(JSON.stringify(emptyInstruments)); // this is supposed to be Sexual Healing
    seq2['closed hat'] = [true, false, true, true, true, false, true, false, true, false, true, false, true, false, true, true];
    seq2['open hat'][7] = true;
    seq2.snare[11] = seq2.snare[12] = true;
    seq2.kick[0] = seq2.kick[7] = seq2.kick[8] = seq2.kick[10] = seq2.kick[12] = seq2.kick[15] = true;
    this.state = {
      activePlayback: false,
      bpm: 128,
      sequence: 0,
      step: 0,
      sequences: [
        emptyInstruments,
        seq1,
        seq2,
      ]
    };
  }

  togglePlayback (active) {
    this.setState({ activePlayback: active });
  }

  changeBPM (bpm) {
    this.setState({ bpm: bpm });
  }

  nextStep () {
    this.setState({ step: ((this.state.step + 1) % 16) });
  }

  addSequence() {
    this.setState(update(this.state, {
      sequences: {$push: [emptyInstruments]}
    }));
  }

  resetPlayback () {
    this.setState({step: 0});
  }

  toggleInstrumentStep(instrument, step) {
    var currentValue = this.state.sequences[this.state.sequence][instrument][step];
    this.setState({sequences: update(this.state.sequences, {
      [this.state.sequence]: {
        [instrument]: {
          [step]: {$set: !currentValue}
        }
      }
    }) });
  }

  loadSequence(sequence) {
    this.setState({ sequence: sequence });
  }

  startInterval(bpm) {
    var interval = (60 / bpm) * 1000;
    this.interval = setInterval(function () {
      this.nextStep();
    }.bind(this), interval);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.activePlayback && this.state.activePlayback) {
      this.startInterval(this.state.bpm);
    }
    if (prevState.activePlayback && !this.state.activePlayback) {
      this.stopInterval();
    }

    // this pauses the playback slightly if you do it too quickly
    if (prevState.bpm !== this.state.bpm && this.state.activePlayback) {
      this.stopInterval();
      this.startInterval(this.state.bpm);
    }
  }

  render () {
    return (
      <div className="eightoheight container mt-4">
        <Controls {...this.state}
          togglePlayback={this.togglePlayback.bind(this)}
            changeBPM={this.changeBPM.bind(this)}
            loadSequence={this.loadSequence.bind(this)}
            resetPlayback={this.resetPlayback.bind(this)}
            addSequence={this.addSequence.bind(this)} />
        <DrumMachine {...this.state} toggleInstrumentStep={this.toggleInstrumentStep.bind(this)} />
      </div>
    );
  }
}

export default App;
