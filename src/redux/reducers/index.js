import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
// import geocode from './geocodeReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// creates a reducer that, when string is sent, sets state to action.payload.
// The parameter str sets the correct string, and type sets the starting state. Type defaults to [].
const createReducer = (str, type=[]) => {
  return (state=type, action) => action.type === str ? action.payload : state;
}

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  programs: createReducer('SET_PROGRAMS'),
  programDetails: createReducer('SET_PROGRAM_DETAILS'),
  utilityDataForReportPage: createReducer('SET_ERROR_UTILITY_INFO', {}),
  utilities: createReducer('SET_UTILITIES', []),
  utilitiesCount: createReducer('SET_UTILITIES_COUNT'),
  utilitiesSearch: createReducer('SET_UTILITIES_SEARCH', {}),
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  geocode: createReducer('SET_GEOCODE_DATA'),
});

export default rootReducer;
