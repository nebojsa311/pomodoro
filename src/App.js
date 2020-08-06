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
    this.setState( { breakL: 300000, sessionL: 1500000, minutes: 1500000, seconds: 0, playButton: false, minutesForDisplay: 25, secondsForDisplay:"00"} )
    this.switcherToStop();
    this.pauseIcon();
    /*switcherToStop(){
      clearInterval(this.intervalId);
      this.setState({playButton: false})
    }*/
  }

  play(){
       
      //when seconds hit zero, substract one minute and seconds start from 60 again
    if(this.state.seconds === 0  && this.state.minutes > 0){
      this.setState((state) => {
        return { minutes: state.minutes - 60000, seconds: 60000, secondsForDisplay: state.seconds / 1000, minutesForDisplay: state.minutes / 60000 }
      })
    }
    
    //Timer start and goes on
    if(this.state.seconds > 0){
      this.setState((state) => {
        return {seconds: state.seconds - 1000, secondsForDisplay: (state.seconds - 1000) / 1000, minutesForDisplay: state.minutes / 60000 };
      })
    }
    // when seconds are zero
    if(this.state.seconds === 0){
      this.setState((state) => {
        return  {  secondsForDisplay: state.seconds / 1000 }
      })
    }
    // When there is no more time and session is ended
    if(this.state.minutes === 0 && this.state.seconds === 0 && this.state.sessionIs === true){
      this.setState((state) => {
        return {minutes: state.breakL - 60000,  sessionIs: false, timerLabel: "Break", minutesForDisplay: state.minutes / 60000}

      })
    }
    // when there is no more time and break is ended
    
    if(this.state.minutes === 0 && this.state.seconds === 0 && this.state.sessionIs === false){
      this.setState((state) => {
        return {minutes: state.sessionL - 60000, seconds: 60000, secondsForDisplay: state.seconds / 1000, sessionIs: true, timerLabel: "Session", minutesForDisplay: state.minutes / 60000}
      });

  //Adding leading zero
  if(this.state.minutesForDisplay < 10){
    this.setState((state) => {
      return {minutesForDisplay: "0" + state.minutes / 60000}
    })
  }

  if(this.state.minutesForDisplay === 0){
    this.setState((state) => {
      return {minutesForDisplay: "0" + state.minutes / 60000}
    })
  }

  if(this.state.secondsForDisplay === 0){
    this.setState((state) => {
      return {secondsForDisplay: "0" + state.seconds / 60000}
    })
  }
  
  if(this.state.secondsForDisplay < 10){
    this.setState((state) => {
      return {secondsForDisplay: "0" + state.seconds / 1000}
    })
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
          <div id="time-left">{this.state.minutesForDisplay.toString()}:{this.state.secondsForDisplay.toString()}</div>
          <div id="start_stop"><i id="icon" className="fas fa-play-circle fa-3x"></i></div>
          <div id="reset"><i className="fas fa-undo fa-3x"></i></div>
        </div>
      </div>

    )
  }
}
export default App;
