import React from 'react';
import TestUtils from 'react-addons-test-utils';
import test from 'blue-tape';
import SVGPath from '../source/index';


test('SVGPath SVG node', assert => {

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <SVGPath defaultStyle={{}}
             style={{}}
             width={10}
             path={() => `M0,20 L220,40 L220,300 L0,300 Z`}
             height={10} />
  );
  const output = renderer.getRenderOutput();

  const actual = output.props.children().type;
  const expected = 'svg';

  assert.equal(actual, expected,
    'Should render an SVG child node');

  assert.end();
});


test('SVGPath viewbox attr', assert => {

  const width = 10;
  const height = 10;

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <SVGPath defaultStyle={{}}
             style={{}}
             width={width}
             path={() => `M0,20 L220,40 L220,300 L0,300 Z`}
             height={height} />
  );
  const output = renderer.getRenderOutput();

  const actual = output.props.children().props.viewBox;
  const expected = '0 0 10 10';

  assert.equal(actual, expected,
    'Should render a viewBox attr');

  assert.end();
});

test('SVGPath default preserveAspectRatio attr', assert => {

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <SVGPath defaultStyle={{}}
             style={{}}
             width={10}
             path={() => `M0,20 L220,40 L220,300 L0,300 Z`}
             height={20} />
  );
  const output = renderer.getRenderOutput();

  const actual = output.props.children().props.preserveAspectRatio;
  const expected = 'xMinYMax slice';

  assert.equal(actual, expected,
    'Should render a default preserveAspectRatio attr');
  assert.end();
});

test('SVGPath custom preserveAspectRatio attr', assert => {

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <SVGPath defaultStyle={{}}
             style={{}}
             width={10}
             preserveAspectRatio={`xMinYMid`}
             path={() => `M0,20 L220,40 L220,300 L0,300 Z`}
             height={20} />
  );
  const output = renderer.getRenderOutput();

  const actual = output.props.children().props.preserveAspectRatio;
  const expected = 'xMinYMid';

  assert.equal(actual, expected,
    'Should render custom preserveAspectRatio attr');

  assert.end();
});

test('SVGPath forces CSS hardware acceleration', assert => {

  const renderer = TestUtils.createRenderer();
  renderer.render(
    <SVGPath defaultStyle={{}}
             style={{}}
             width={10}
             path={() => `M0,20 L220,40 L220,300 L0,300 Z`}
             height={20} />
  );
  const output = renderer.getRenderOutput();

  const actual = output.props.children().props.style.transform;
  const expected = 'translate3d(0, 0, 0)';

  assert.equal(actual, expected,
    'Should render a transform3d style to force hardware acceleration');

  assert.end();
});
