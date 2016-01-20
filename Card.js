import React, {Component} from 'react';
import {spring, presets} from 'react-motion';

import './Card.css';
import SVGPath from '../source/SVGPath';

const DEFAULT = {
  tr: 20,
  tl: 120
};

const SECONDARY = {
  tr: 210,
  tl: 240
};

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  onEnter() {
    this.setState({
      isHovering: true
    });
  }

  onLeave() {
    this.setState({
      isHovering: false
    });
  }

  render() {
    const {isHovering} = this.state;

    const destination = isHovering ? SECONDARY : DEFAULT;

    return (
      <div className="Card"
           onMouseEnter={this.onEnter.bind(this)}
           onMouseLeave={this.onLeave.bind(this)}>
        <SVGPath defaultStyle={ DEFAULT }
                 style={{
                   tr: spring(destination.tr, presets.wobbly),
                   tl: spring(destination.tl, presets.wobbly)
                 }}
                 width={500}
                 height={300}
                 path={(delta) => `M0,${delta.tl} L220,${delta.tr} L220,300 L0,300 Z`}/>
      </div>
    );
  }
}

export default Card;
