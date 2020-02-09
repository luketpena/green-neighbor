import { put, takeLatest } from 'redux-saga/effects';
import writeQueries from '../../modules/writeQueries';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getPrograms(action) {
  try{
    const programs = yield axios.get(`/api/programs/${action.payload}`);
    yield put({type: 'SET_PROGRAMS', payload: programs.data});
    const geocode = yield axios.get(`/api/programs/geocode/${action.payload}`);
    yield put({type: 'SET_GEOCODE_DATA', payload: geocode.data});
  } catch (error) {
      console.log(error);
  }
}

function* getGeocodeData(action) {
  try {
    const response = yield axios.get(`/api/programs/geocode/${action.payload}`);
    yield put({type: 'SET_GEOCODE_DATA', payload: response.data});
  } catch (error) {
    console.log(error);    
  }
}

function* getUtilities(action) {
  const {zip, state, utility_name, program_name, showActive, showDrafts} = action.payload.search;
  try {
    const count = yield axios.get(`/api/utilities/count/${writeQueries(action.payload.search)}`);
    yield put({type: 'SET_UTILITIES_COUNT', payload: count.data.count});
    const summary = yield axios.get(`/api/utilities/summary/${action.payload.page}`,action.payload.search);
    yield put({type: 'SET_UTILITIES', payload: summary.data});
  } catch (error) {
    console.log(error);    
  }
}

function* setUtilityProduction(action) {
  try {
    yield axios.put(`/api/utilities/production/${action.payload.id}`, {production: action.payload.production} );
    yield put({type: 'GET_UTILITIES', payload: action.payload.page})
  } catch(error) {
    console.log(error);    
  }
}



function* programsSaga() {
  yield takeLatest('GET_PROGRAMS', getPrograms);
  yield takeLatest('GET_UTILITIES', getUtilities);
  yield takeLatest('SET_UTILITY_PRODUCTION', setUtilityProduction);
  yield takeLatest('GET_GEOCODE_DATA', getGeocodeData);
}

export default programsSaga;
