import * as types from '../common/actionTypes';
import delay from '../common/delay';

let timer = null;

export function startTimer() {
  return function(dispatch) {
    clearInterval(timer);
    timer = setInterval(() => dispatch(tick()), delay.tickTimerTimeout);
    dispatch({ type: types.POST_TIMER_START });
    dispatch(tick());
  };
}

function tick() {
  return function(dispatch) {
    dispatch({ type: types.POST_TIMER_TICK });
  };
}

export function stopTimer() {
  return function(dispatch) {
    clearInterval(timer);
    dispatch({ type: types.POST_TIMER_STOP });
  };
}
