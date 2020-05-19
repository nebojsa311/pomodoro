import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    //states
    this.state = {
      breakL: 300000,
      sessionL: 1500000,
      timerLabel: "Session",
      timer: 1502000,
    }
    // Methods binding .this
  }

  render(){
    return(
      <div id="container">
        <div id="main-title">Pomodoro clock</div>
        <div id="slength">
          <div id="session-label">Session length</div>
          <div id="session-length">{this.state.sessionL / 60000}</div>
          <div id="session-increment">+</div>
          <div id="session-decrement">-</div>
        </div>
        <div id="blength">
          <div id="break-label">Break length</div>
          <div id="break-length">{this.state.breakL / 60000}</div>
          <div id="break-increment">+</div>
          <div id="break-decrement">-</div>
        </div>
        <div id="controls-div">
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{(this.state.timer - this.state.timer%60000)/60000}:{this.state.timer/1000 - ((this.state.timer - this.state.timer%60000)/1000)}</div>
          <div id="start_stop"></div>
          <div id="reset"></div>
        </div>
      </div>

    )
  }
}

export default App;
