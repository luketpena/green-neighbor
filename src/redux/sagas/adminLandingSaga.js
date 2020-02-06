import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getAdminLandingData(action) {
  try{
    const name = yield axios.get(
        `/api/utilities/api/admin/overview`
    );
    yield put({type: 'SET_ADMIN_LANDING_DATA', payload: name.data});
  } catch (error) {
      console.log(error);
  }
}

function* adminLandingSaga() {
  yield takeLatest('GET_ADMIN_LANDING_DATA', getAdminLandingData);
}

export default adminLandingSaga;