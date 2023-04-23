import { createStore } from 'redux';
import { combineReducers } from 'redux';

const initialState = {
    project: {
      id: 2,
    }
  };

function projectReducer(state = initialState.project, action) {
switch (action.type) {
    case 'SET_PROJECT_ID':
    return {
        ...state,
        id: action.payload,
    };
    // other project actions...
    default:
    return state;
}
}

const rootReducer = combineReducers({
    project: projectReducer,
    // other reducers...
  });
  
const store = createStore(rootReducer);

export default store;