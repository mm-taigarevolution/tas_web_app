import React from 'react';
import PropTypes from 'prop-types';

const listStyle = {
  margin: '0px'
};

const detailsStyle = {
  margin: '10px 0px 0px 0px'
};

const timeRemainingActive = {
  padding: '0px',
  marginLeft: '10px',
  marginTop: '0px',
  fontWeight:'bold',
  fontSize: '16px',
  color: 'gray'
};

const timeRemainingInactive = {
  padding: '0px',
  marginLeft: '10px',
  marginTop: '0px',
  fontWeight:'bold',
  fontSize: '16px',
  color: 'darkgray'
};

const timeRemainingEnding = {
  padding: '0px',
  marginLeft: '10px',
  marginTop: '0px',
  fontWeight:'bold',
  fontSize: '16px',
  color: 'orange'
};

const TimeRemaining = ({days,hours,minutes,seconds,active}) => {
  return (
    <div>
      {active &&
        <div>
          {days > 0 &&
            <p style={timeRemainingActive}>{days}d {hours}h</p>
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
