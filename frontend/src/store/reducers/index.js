import {
  UPDATE_STAKES,
  UPDATE_VALUE,
  CLEAR_STAKES,
} from '../actions';

function containsObject(obj, arr) {
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].index === obj.index) {
          return i;
      }
  }
  return false;
}

let totalStakeValue = function(items, prop) {
  let cleanedArray = items.filter(v=>v!=='');
  return cleanedArray.reduce( function(a, b){
      return parseInt(a) + parseInt(b[prop]);
  }, 0);
};

const initialState = {
  stakes: [],
  totalStake: 0,
};

export default function mainReducer(state = initialState, action) {
  switch(action.type) {

    case UPDATE_STAKES:
      if(containsObject(action.payload, state.stakes)!== false) {
        let foundIndex = containsObject(action.payload, state.stakes);
        let newArray = state.stakes;
        newArray[foundIndex]= action.payload;
        return {
          ...state,
          stakes: newArray,
        };
      }
      else {
        return {
          ...state,
          stakes: [ ...state.stakes, action.payload ]
        };
      }

    case UPDATE_VALUE:
      let totalStake = totalStakeValue(action.payload, 'value');
      return {
        ...state,
        totalStake
      }

    case CLEAR_STAKES:
      return {
        ...state,
        stakes: [],
      }

    default:
      return state;
  }
}