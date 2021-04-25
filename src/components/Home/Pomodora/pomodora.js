import React, { Component } from "react";
import Settings from "./Settings";
import Times from "./Times";
import Controller from "./Controller";
import "./pomodora.css";
import { Container, Row, Col } from "react-bootstrap";
import MultiPlayer from "./Multiplayer";

export default class pomodora2 extends Component {
  constructor(props) {
    super(props);

    this.audioBeep = React.createRef();

    this.state = {
      breakLength: 5, //Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: 25, //Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: "Session",
      timeLeftInSecond: 1500, //Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false
    };

    this.onIncreaseBreak = this.onIncreaseBreak.bind(this);
    this.onDecreaseBreak = this.onDecreaseBreak.bind(this);
    this.onIncreaseSession = this.onIncreaseSession.bind(this);
    this.onDecreaseSession = this.onDecreaseSession.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onStartStop = this.onStartStop.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
  }

  onIncreaseBreak() {
    if (this.state.breakLength < 60 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }

  onDecreaseBreak() {
    if (this.state.breakLength > 1 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  onIncreaseSession() {
    if (this.state.sessionLength < 60 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeftInSecond: (this.state.sessionLength + 1) * 60
      });
    }
  }

  onDecreaseSession() {
    if (this.state.sessionLength > 1 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeftInSecond: (this.state.sessionLength - 1) * 60
      });
    }
  }

  onReset() {
    this.setState({
      breakLength: 5, //Number.parseInt(this.props.defaultBreakLength, 10),
      sessionLength: 25, //Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: "Session",
      timeLeftInSecond: 1500, //Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    });

    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {
    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.phaseControl();
        }, 1000)
      });
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      });
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSecond: this.state.timeLeftInSecond - 1
    });
  }

  phaseControl() {
    if (this.state.timeLeftInSecond === 0) {
      this.audioBeep.current.play();
    } else if (this.state.timeLeftInSecond === -1) {
      if (this.state.timeLabel === "Session") {
        this.setState({
          timeLabel: "Break",
          timeLeftInSecond: this.state.breakLength * 60
        });
      } else {
        this.setState({
          timeLabel: "Session",
          timeLeftInSecond: this.state.sessionLength * 60
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="pomodoro-clock">
          <div className="pomodoro-clock-header">
            <h1 className="pomodoro-clock-header-name">Pomodoro Clock</h1>
          </div>

          <Settings
            breakLength={this.state.breakLength}
            sessionLength={this.state.sessionLength}
            isStart={this.state.isStart}
            onDecreaseBreak={this.onDecreaseBreak}
            onDecreaseSession={this.onDecreaseSession}
            onIncreaseBreak={this.onIncreaseBreak}
            onIncreaseSession={this.onIncreaseSession}
          />

          <Times
            timeLabel={this.state.timeLabel}
            timeLeftInSecond={this.state.timeLeftInSecond}
          />

          <Controller
            onReset={this.onReset}
            onStartStop={this.onStartStop}
            isStart={this.state.isStart}
          />

          <audio
            id="beep"
            preload="auto"
            src="https://goo.gl/65cBl1"
            ref={this.audioBeep}
          ></audio>
          <Container>
            <MultiPlayer
              urls={[
                "https://cdn.glitch.com/30aa7dcb-47e2-4b82-951e-ef4686906d6c%2Fyt1s.com%20-%20%E5%8F%A4%E7%90%B4%20%E5%8D%A7%E9%BE%99%E5%90%9FDep.mp3?v=1619206230944",
                "https://cdn.glitch.com/b32b2bd2-2e97-4726-9fc6-3c049530080e%2FMozart%20Classical%20Music%20for%20Studying%20Concentration%20Relaxation%20%20Study%20Music%20%20Piano%20Instrumental.mp3?v=1619361883678",
                "https://cdn.glitch.com/b32b2bd2-2e97-4726-9fc6-3c049530080e%2F30%20MINUTES%20Rain%20Sounds.mp3?v=1619361561614",
                "https://cdn.glitch.com/c2651fe2-7720-42b4-83b6-abf55f8285a8%2Fyt1s.com%20-%20copy%E5%AE%AE%E5%B4%8E%E9%A7%BF%E3%82%B3%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%20%E3%83%94%E3%82%A2%E3%83%8E%E3%81%A8%E3%83%8F%E3%83%BC%E3%83%97%E7%9D%A1%E7%9C%A0%E3%81%A8%E4%BD%9C%E6%A5%AD%20%E7%94%A8%E3%82%B8%E3%83%96%E3%83%AA%E7%99%92%E3%81%97.mp3?v=1619362240702"
              ]}
            />
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Guqin
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Piano
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Rain
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Ghibli
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
