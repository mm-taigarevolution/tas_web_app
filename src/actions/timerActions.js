import * as types from '../common/actionTypes';

let timer = null;

export function startTimer() {
  return function(dispatch) {
    clearInterval(timer);
    timer = setInterval(() => dispatch(tick()), 1000);
    dispatch({ type: types.TIMER_START });
    dispatch(tick());
  };
}

function tick() {
  return function(dispatch) {
    dispatch({ type: types.TIMER_TICK });
  };
}

export function stopTimer() {
  return function(dispatch) {
    clearInterval(timer);
    dispatch({ type: types.TIMER_STOP });
  };
}
