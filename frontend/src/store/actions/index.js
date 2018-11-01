export const UPDATE_STAKES = 'UPDATE_STAKES';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const CLEAR_STAKES = 'CLEAR_STAKES';


export const updateStakes = (stakes) => ({
  type: UPDATE_STAKES,
  payload: stakes
});

export const updateValue = (stakes) => ({
  type: UPDATE_VALUE,
  payload: stakes
});

export const clearStakes = () => ({
  type: CLEAR_STAKES,
});
