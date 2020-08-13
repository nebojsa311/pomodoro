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
      timer: 1500000,
      playButton: false,
      minutes: 1500000,
      seconds: 0,
      minutesForDisplay: 25,
      secondsForDisplay:"00",
      sessionIs: true,
    }
    // Methods binding .this
    this.incrementS = this.incrementS.bind(this);
    this.decrementS = this.decrementS.bind(this);
    this.incrementB = this.incrementB.bind(this);
    this.decrementB = this.decrementB.bind(this);
    this.reset = this.reset.bind(this);
    this.play = this.play.bind(this);
    this.switcherToPlay = this.switcherToPlay.bind(this);
    this.switcherToStop = this.switcherToStop.bind(this);
    this.changePause = this.changePause.bind(this);
    this.pauseIcon = this.pauseIcon.bind(this);
  }

  // Methods

  // Increment and decrement methods for session and break lengths
  incrementS(){
    if(this.state.sessionL <= 3599999){
      this.setState( { sessionL: this.state.sessionL + 60000, minutes: this.state.sessionL + 60000, seconds: 0, minutesForDisplay: (this.state.sessionL + 60000)/ 60000 } )
    }
  }

  decrementS(){
    if(this.state.sessionL >= 60001){
      this.setState( { sessionL: this.state.sessionL - 60000, minutes: this.state.sessionL - 60000, seconds: 0, minutesForDisplay: (this.state.sessionL - 60000) / 60000  } )
    }
  }

  incrementB(){
    if(this.state.breakL <= 3599999){
      this.setState( { breakL: this.state.breakL + 60000, seconds: 0 } )
    }
  }

  decrementB(){
    if(this.state.breakL >= 60001){
      this.setState( { breakL: this.state.breakL - 60000, seconds: 0 } )
    }
  }

  // Reset and play/pause buttons
  reset() {
    this.setState( { breakL: 300000, sessionL: 1500000, minutes: 1500000, seconds: 0, playButton: false, minutesForDisplay: 25, secondsForDisplay:"00", timerLabel: "Session"} )
    this.switcherToStop();
    this.pauseIcon();
    /*switcherToStop(){
      clearInterval(this.intervalId);
      this.setState({playButton: false})
    }*/
  }

  play(){
    //adding leading zero if muntes are under 10
    if(this.state.minutes / 60000 < 10 && this.state.minutes / 60000 >= 1){

      if(this.state.seconds === 0 && this.state.playButton === false ){
        return this.setState( { minutes: this.state.minutes - 60000, seconds: 60000 ,  minutesForDisplay: "0" + this.state.minutes / 60000, secondsForDisplay: "00" } )
        } else if(this.state.seconds === 0 && this.state.playButton === true){
          return this.setState( { minutes: this.state.minutes - 60000, seconds: 59000 ,  minutesForDisplay: "0" + (this.state.minutes - 60000) / 60000, secondsForDisplay: 59 } )
        } else if(this.state.seconds > 0){

        if(this.state.seconds / 1000 <= 10 && this.state.seconds / 1000 >= 1){
          return this.setState( { minutesForDisplay: "0" + this.state.minutes / 60000, seconds: this.state.seconds - 1000, secondsForDisplay: "0" + (this.state.seconds - 1000) / 1000 } )
        } else if(this.state.seconds / 1000 > 10){
          return this.setState( { minutesForDisplay: "0" + this.state.minutes / 60000, seconds: this.state.seconds - 1000, secondsForDisplay: (this.state.seconds - 1000) / 1000} )
        }
        
      }
    }

    // when is more than 9 minutes left
    if(this.state.minutes / 60000 > 10){

      if(this.state.seconds === 0 && this.state.playButton === false ){
        return this.setState( { minutes: this.state.minutes - 60000, seconds: 60000 ,  minutesForDisplay: this.state.minutes / 60000, secondsForDisplay: "00" } )
        } else if(this.state.seconds === 0 && this.state.playButton === true){
          return this.setState( { minutes: this.state.minutes - 60000, seconds: 59000 ,  minutesForDisplay: (this.state.minutes - 60000) / 60000, secondsForDisplay: 59 } )
        } else if(this.state.seconds > 0){

        if(this.state.seconds / 1000 <= 10 && this.state.seconds / 1000 >= 1){
          return this.setState( { minutesForDisplay: this.state.minutes / 60000, seconds: this.state.seconds - 1000, secondsForDisplay: "0" + (this.state.seconds - 1000) / 1000 } )
        } else if(this.state.seconds / 1000 > 10){
          return this.setState( { minutesForDisplay: this.state.minutes / 60000, seconds: this.state.seconds - 1000, secondsForDisplay: (this.state.seconds - 1000) / 1000} )
        }
        
      }
    }

    // When countdown reaches one minute, going for 00:00
    if(this.state.minutes === 60000 && this.state.seconds === 0){
      return this.setState( { minutes: 0, seconds: 59000, secondsForDisplay: 59, minutesForDisplay: "00" } )
    } else if(this.state.minutes === 0 && this.state.seconds / 1000 > 10){
      return this.setState( { seconds: this.state.seconds - 1000, secondsForDisplay: (this.state.seconds - 1000) / 1000 } )
    } else if(this.state.minutes === 0 && this.state.seconds / 1000 <= 10 && this.state.seconds / 1000 > 0){
      return this.setState( { seconds: this.state.seconds - 1000, secondsForDisplay: "0" + (this.state.seconds - 1000) / 1000 } )
    }

    // switching session and break when timer reaches zero
    if(this.state.minutes === 0 && this.state.seconds === 0){
      if(this.state.sessionIs === true){
        return this.setState( { minutes: this.state.breakL - 60000, seconds: 60000, sessionIs: false, timerLabel: "Break", playButton: false } )
      } else if(this.state.sessionIs === false){
        return this.setState( { minutes: this.state.sessionL - 60000, seconds: 60000, sessionIs: true, timerLabel: "Session", playButton: false } )
      }
    }
}
// Down there is three functions, 1st is for playing, second is pause that clears interval and stops, and 3rd is switch for first two
  switcherToPlay(){
    this.intervalId = setInterval(this.play, 1000);
    this.setState({playButton:true})
  }

  switcherToStop(){
    clearInterval(this.intervalId);
    this.setState({playButton: false})
  }

  changePause() {
    if (this.state.playButton){
      this.switcherToStop()
    } else {
      this.switcherToPlay()
    }
  }

  // Functions that change icons

  pauseIcon() {
    if(this.state.playButton){
      document.getElementById("icon").classList.remove("fa-play-circle");
      document.getElementById("icon").classList.add("fas");
      document.getElementById("icon").classList.add("fa-pause");
      document.getElementById("icon").classList.add("fa-3x");
    } else {
      document.getElementById("icon").classList.remove("fa-pause");
      document.getElementById("icon").classList.add("fas");
      document.getElementById("icon").classList.add("fa-play-circle");
      document.getElementById("icon").classList.add("fa-3x");
    }
  }

  // Events
  componentDidMount(){
    document.getElementById("session-increment").addEventListener("click", this.incrementS);
    document.getElementById("session-decrement").addEventListener("click", this.decrementS);
    document.getElementById("break-increment").addEventListener("click", this.incrementB);
    document.getElementById("break-decrement").addEventListener("click", this.decrementB);
    document.getElementById("reset").addEventListener("click", this.reset);
    document.getElementById("start_stop").addEventListener("click", this.changePause);
    document.getElementById("start_stop").addEventListener("click", this.pauseIcon);
  }

  
  render(){
    return(
      <div id="container">
        <div id="main-title">Pomodoro clock</div>
        <div id="slength">
          <div id="session-label">Session length</div>
          <div id="session-length">{this.state.sessionL / 60000}</div>
          <div id="session-increment">
            <i className="fas fa-plus-square fa-3x"></i>
          </div>
          <div id="session-decrement">
            <i className="fas fa-minus-square fa-3x"></i>
          </div>
        </div>
        <div id="blength">
          <div id="break-label">Break length</div>
          <div id="break-length">{this.state.breakL / 60000}</div>
          <div id="break-increment">
            <i className="fas fa-plus-square fa-3x"></i>
          </div>
          <div id="break-decrement">
            <i className="fas fa-minus-square fa-3x"></i>
          </div>
        </div>
        <div id="controls-div">
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{this.state.minutesForDisplay}:{this.state.secondsForDisplay}</div>
          <div id="start_stop"><i id="icon" className="fas fa-play-circle fa-3x"></i></div>
          <div id="reset"><i className="fas fa-undo fa-3x"></i></div>
        </div>
      </div>

    )
  }
}
export default App;
