import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getPrograms(action) {
  try{
    const programs = yield axios.get(`/api/programs/${action.payload}`);
    yield put({type: 'SET_PROGRAMS', payload: programs.data});
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

function* programsSaga() {
  yield takeLatest('GET_PROGRAMS', getPrograms);
  yield takeLatest('GET_GEOCODE_DATA', getGeocodeData);
}

export default programsSaga;
