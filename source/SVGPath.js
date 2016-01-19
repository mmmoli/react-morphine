import React, {PropTypes} from 'react';
import {Motion} from 'react-motion';

const DEFAULT_PRESERVEASPECTRATIO = 'xMinYMax slice';

const SVGPath = ({
  defaultStyle,
  style,
  path,
  width,
  height,
  preserveAspectRatio: preserveAspectRatio = DEFAULT_PRESERVEASPECTRATIO,
  }) => {
  return (
    <Motion defaultStyle={defaultStyle} style={style}>
      {delta => {
        return (
          <svg viewBox={`0 0 ${width} ${height}`}
               preserveAspectRatio={preserveAspectRatio}
               style={{transform: 'translate3d(0, 0, 0)'}}>
            <path d={path(delta)}/>
          </svg>
        );
      }}
    </Motion>
  );
};

SVGPath.propTypes = {
  defaultStyle: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  path: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  preserveAspectRatio: PropTypes.string
};

export default SVGPath;
