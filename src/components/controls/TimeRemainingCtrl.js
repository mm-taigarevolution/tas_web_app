import React from 'react';
import PropTypes from 'prop-types';

const TimeRemainingCtrl = ({auctionItem}) => {
  let showRemainingTime = auctionItem != {} ? true : false;
  let days = showRemainingTime ? auctionItem.bid_time_remaining_days : 0;
  let hours = showRemainingTime ? auctionItem.bid_time_remaining_hours : 0;
  let minutes = showRemainingTime ? auctionItem.bid_time_remaining_minutes : 0;
  let seconds = showRemainingTime ? auctionItem.bid_time_remaining_seconds : 0;
  let active = showRemainingTime && auctionItem.status == "active" ? true : false;

  return (
    <div>
      {showRemainingTime &&
        <div>
          {active &&
            <div>
              {days > 0 &&
                <div>
                  <p>{days} d {hours} h</p>
                </div>
              }
              {days == 0 &&
                <div>
                  {hours > 0 &&
                    <div>
                      <p>{hours} h {minutes} min</p>
                    </div>
                  }
                  {hours == 0 &&
                    <div>
                        <p>{minutes} m {seconds} s</p>
                    </div>
                  }
                </div>
              }
            </div>
          }
          {!active &&
            <div>
              <p>Auction ended</p>
            </div>
          }
        </div>
      }
    </div>
  );
};

TimeRemainingCtrl.propTypes = {
  auctionItem: PropTypes.object.isRequired
};

export default TimeRemainingCtrl;
