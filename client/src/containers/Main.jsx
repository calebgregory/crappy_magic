import React, { Component } from 'react';
import TitleCharacter from '../components/TitleCharacter';

function toStatefulLetter(char) {
  return {
    rt: {x: 0, y: 0, vx: 0, vy: 0},
    char
  };
}

const title = 'The Crappy Magic Experience';
const a = 0.15;
const b = 0.5;

export default class Main extends Component {
  constructor(props) {
    super(props);

    const letters = title.split('').map(toStatefulLetter);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      timeoutId: null,
      letters,
    }

    this.animate = this.animate.bind(this);
    this.onAnimate = this.onAnimate.bind(this);
    this.update = this.update.bind(this);
    this.updateLetters = this.updateLetters.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  componentWillMount() {
    this.animate();
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
    const { letters, mouseX, mouseY } = this.state;

    let lx = mouseX;
    let ly = mouseY - 40;

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

  handleMouseMove(event) {
    const { clientX, clientY } = event;

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
      <div id="main-container" className="app-container" onMouseMove={this.handleMouseMove}>
        <h1 id="main-title">{this.renderTitle()}</h1>
      </div>
    );
  }
}
