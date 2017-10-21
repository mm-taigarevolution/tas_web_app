import React from 'react';
import PropTypes from 'prop-types';

const listStyle = {
  margin: '0px',
};

const detailsStyle = {
  margin: '10px 0px 0px 0px',
};

const TimeRemaining = ({days,hours,minutes,seconds,active,useListStyle}) => {
  return (
    <div>
      {active &&
        <div>
          {days > 0 &&
            <div>
              {useListStyle &&
                <div style={listStyle}>
                  Ends at
                  <p className="p-time-remaining-active">
                    {days}d {hours}h
                  </p>
                </div>
              }
              {!useListStyle &&
                <div style={detailsStyle}>
                  <p className="p-list-time-remaining-active">Ends at {days}d {hours}h</p>
                </div>
              }
            </div>
          }
          {days == 0 &&
            <div>
              {hours > 0 &&
                <div>
                  {useListStyle &&
                    <div style={listStyle}>
                      Ends at
                      <p className="p-time-remaining-active">
                        {hours}h {minutes}min
                      </p>
                    </div>
                  }
                  {!useListStyle &&
                    <div style={detailsStyle}>
                      <p className="p-list-time-remaining-active">Ends at {hours}h {minutes}min</p>
                    </div>
                  }
                </div>
              }
              {hours == 0 &&
                <div>
                  {useListStyle &&
                    <div style={listStyle}>
                      Ends at
                      <p className="p-list-time-remaining-active-ending">
                        {minutes}m {seconds}s
                      </p>
                    </div>
                  }
                  {!useListStyle &&
                    <div style={detailsStyle}>
                      <p className="p-list-time-remaining-active-ending">Ends at {minutes}m {seconds}s</p>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
      {!active &&
        <div>
          {useListStyle &&
            <div style={listStyle}>
              <p className="p-list-time-remaining-inactive">
                Auction ended
              </p>
            </div>
          }
          {!useListStyle &&
            <div style={detailsStyle}>
              <p className="p-list-time-remaining-inactive">
                Auction ended
              </p>
            </div>
          }
        </div>
      }
    </div>
  );
};

TimeRemaining.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  active: PropTypes.bool.isRequired,
  useListStyle: PropTypes.bool.isRequired
};

export default TimeRemaining;
