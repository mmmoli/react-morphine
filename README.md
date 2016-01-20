# react-morphine
Relieving the pain of morphing UIs in React.

[![Travis-CI](https://travis-ci.org/mmmoli/react-morphine.svg)](https://travis-ci.org/mmmoli/react-morphine)
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Clone the repo](#clone-the-repo)
  - [Customize package.json](#customize-packagejson)
  - [Configure your CI build](#configure-your-ci-build)
  - [Customize the README.md file](#customize-the-readmemd-file)
  - [Build your module](#build-your-module)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

React-morphine uses React-motion and SVG to help you draw shapes which can _morph_. More precisely, it allows you to 
reposition points within the SVG Path definition. 

## Guide
Just a quick guide for now. I'll write-up a better description soon. For now, follow the guide below and check out 
the example.

### 1. Installation

React-morphine is available on npm or bower:

    npm install react-mophine --save
    bower install react-mophine
    
### 2. Define your shape
    
Use whatever drawing package you want. I used Sketch.
    
Warning: it helps to tidy-up SVGs first so that you don't go insane later on. Here's some great tips I found:

- [Optimising SVGs for the Web – part 1](https://medium.com/@larsenwork/optimising-svgs-for-web-use-part-1-67e8f2d4035#.9piykd6bb)
- [Optimising SVGs for the Web – part 2](https://medium.com/@larsenwork/optimising-svgs-for-web-use-part-2-6711cc15df46#.7mm9uzb86)

The key is to note the `d` attribute of the `path` node. you're going to use this to describe how the path changes 
using React-motions spring mechanics. 

### 3. Define your component

See [example Card component](example/Card.js) but in summary:

```
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
```

See the `path` prop passed to the `SVGPath` component? It's a function that defines how the path changes based on the
 spring values by returning a string.
 
 The `path` prop function is passed a single argument that describes the current state of all the springs. You can 
 define as many parameters as you want off the back of it. I defined `tr` and `tl` to represent the rightmost and 
 leftmost points of the SVG definition.  

## Tips

### It's a pain getting the SVG path

Tell me about it. The SVG spec is pretty straightforward but just play around with your `path` prop until it draws 
what you're expecting.

I found it useful to return a constant string (ignoring the `delta` param) until I need which point I wanted to change.

Would be great to have tools to help us with this in the future. Bear with us.

### It's still too low level

I know what you mean. I like the power we have with this API, but I'm thinking of ways which are slightly more how 
designers think. 

## Contributing

- [Contributing](docs/contributing/index.md)
- [Versions: Release Names vs Version Numbers](docs/contributing/versions/index.md)
