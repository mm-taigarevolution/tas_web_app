import React from 'react';
import PropTypes from 'prop-types';

const timeRemainingActive = {
  fontSize: '16px'
};

const timeRemainingInactive = {
  fontSize: '16px'
};

const timeRemainingEnding = {
  fontSize: '16px',
  color: 'red'
};

const TimeRemaining = ({days,hours,minutes,seconds,active}) => {
  return (
    <div>
      {active &&
        <div>
          {days > 0 &&
            <div>
              {hours > 0 &&
                <p style={timeRemainingActive}>{days}d {hours}h</p>
              }
              {hours == 0 &&
                <p style={timeRemainingActive}>{days}d</p>                
              }
            </div>
          }
          {days == 0 &&
            <div>
              {hours > 0 &&
                <p style={timeRemainingActive}>{hours}h {minutes}min</p>
              }
              {hours == 0 &&
                <p style={timeRemainingEnding}>{minutes}min {seconds}s</p>
              }
            </div>
          }
        </div>
      }
      {!active &&
        <p style={timeRemainingInactive}>Closed</p>
      }
    </div>
  );
};

TimeRemaining.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  active: PropTypes.bool.isRequired
};

export default TimeRemaining;
