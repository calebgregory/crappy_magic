import React, { Component } from 'react';
import TitleCharacter from '../components/TitleCharacter';
import Hammer from 'react-hammerjs';

function toStatefulLetter(char) {
  return {
    rt: {x: 0, y: 0, vx: 0, vy: 0},
    char
  };
}

const title = 'The Crappy Magic Experience';
const a = 0.15;
const b = 0.5;

function abs(x) {
  return x < 0 ? -x : x;
}

export default class Main extends Component {
  constructor(props) {
    super(props);

    const letters = title.split('').map(toStatefulLetter);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      timeoutId: null,
      letters,
      animationType: 'none',
    }

    this.animate = this.animate.bind(this);
    this.onAnimate = this.onAnimate.bind(this);
    this.update = this.update.bind(this);
    this.updateLetters = this.updateLetters.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  componentWillMount() {
    this.animate();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  animate() {
    const { timeoutId } = this.state;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const nextTimeoutId = setTimeout(this.onAnimate, 30);
    this.setState({ timeoutId: nextTimeoutId });
  }

  onAnimate() {
    const nextLetters = this.updateLetters();
    this.setState({ letters: nextLetters });

    const nextTimeoutId = setTimeout(this.onAnimate, 30);
    this.setState({ timeoutId: nextTimeoutId });
  }

  updateLetters() {
    const { letters, animationType  } = this.state;

    let x0 = 0, y0 = 0;

    if (animationType === 'none') {
      [x0, y0] = [250, 350];
    } else if (animationType === 'mouse') {
      const { mouseX, mouseY } = this.state;
      [x0, y0] = [mouseX, mouseY];
    }

    let lx = x0;
    let ly = y0 - 40;

    const nextLetters = letters.map((letter) => {
      const { rt } = letter;

      const ax = -(rt.x - lx) * a;
      const ay = -(rt.y - ly) * a;

      lx = rt.x;
      ly = rt.y;

      return this.update(letter, ax, ay)
    });

    return nextLetters;
  }

  update(letter, ax, ay) {
    const { rt } = letter;

    const vx = rt.vx + ax - rt.vx * b;
    const vy = rt.vy + ay - rt.vy * b;
    const x  = rt.x + vx;
    const y  = rt.y + vy;

    return { rt: {x, y, vx, vy}, char: letter['char'] }
  }

  handlePan(event) {
    if (event.isFinal) {
      return;
    }

    const { clientX, clientY } = event.srcEvent;

    if (this.state.animationType !== 'mouse') {
      this.setState({ animationType: 'mouse' });
    }

    this.setState({
      mouseX: clientX,
      mouseY: clientY,
    });
  }

  renderTitle() {
    const { mouseX, mouseY, letters } = this.state;

    return letters.map((letter, i) => {
      const { char, rt } = letter;
      return <TitleCharacter id={i} char={char} x={rt.x} y={rt.y} />
    });
  }

  render() {
    return (
      <Hammer onPan={this.handlePan}>
        <div id="main-container" className="app-container">
          <h1 id="main-title">{this.renderTitle()}</h1>
        </div>
      </Hammer>
    );
  }
}
