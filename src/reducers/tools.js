export function updateTimeRemaining(item){
  let newItem = Object.assign({}, item);

  if(newItem.id.length > 0) {
    let end = new Date(newItem.auctionEnd);
    let current = new Date();

    if(current < end) {
      let seconds = Math.floor((end - current)/1000);
      let secondsPerDay = 3600*24;
      let secondsPerHour = 3600;
      let secondsPerMinute = 60;

      let days = Math.floor(parseFloat(seconds / secondsPerDay));
      seconds -= days*secondsPerDay;
      let hours = Math.floor(parseFloat(seconds / secondsPerHour));
      seconds -= hours*secondsPerHour;
      let minutes = Math.floor(parseFloat(seconds / secondsPerMinute));
      seconds -= minutes*secondsPerMinute;

      newItem.bid_time_remaining_days = days;
      newItem.bid_time_remaining_hours = hours;
      newItem.bid_time_remaining_minutes = minutes;
      newItem.bid_time_remaining_seconds = seconds;
      newItem.active = true;
    }

    else {
      newItem.bid_time_remaining_days = 0;
      newItem.bid_time_remaining_hours = 0;
      newItem.bid_time_remaining_minutes = 0;
      newItem.bid_time_remaining_seconds = 0;
      newItem.active = false;
    }
  }

  return newItem;
}
