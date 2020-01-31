import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getPrograms(action) {
  try{
    const programs = yield axios.get(`/api/programs/${action.payload}`);
    yield put({type: 'SET_PROGRAMS', payload: programs});
  } catch (error) {
      console.log(error);
  }
}

function* programsSaga() {
  yield takeLatest('GET_PROGRAMS', getPrograms);
}

export default programsSaga;
