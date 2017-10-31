import React from 'react';
import PropTypes from 'prop-types';

const TimeRemainingControl = ({days,hours,minutes,seconds,active,activeStyle,endingStyle,endedStyle}) => {
  return (
    <div>
      {active &&
        <div>
          {days > 0 &&
            <div>
              {hours > 0 &&
                <p style={activeStyle}>{days}d {hours}h</p>
              }
              {hours == 0 &&
                <p style={activeStyle}>{days}d</p>
              }
            </div>
          }
          {days == 0 &&
            <div>
              {hours > 0 &&
                <p style={activeStyle}>{hours}h {minutes}min</p>
              }
              {hours == 0 &&
                <p style={endingStyle}>{minutes}min {seconds}s</p>
              }
            </div>
          }
        </div>
      }
      {!active &&
        <p style={endedStyle}>Closed</p>
      }
    </div>
  );
};

TimeRemainingControl.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  active: PropTypes.bool.isRequired,
  activeStyle: PropTypes.object,
  endingStyle: PropTypes.object,
  endedStyle: PropTypes.object
};

export default TimeRemainingControl;
