import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getAdminUsers(action) {
    try{
      const response = yield axios.get(`/api/user/admins`);
      yield put({type: 'SET_ADMIN_USERS', payload: response.data});
    } catch (error) {
        console.log(error);
    }
  }
  
  function* adminUserSaga() {
    yield takeLatest('GET_ADMIN_USERS', getAdminUsers);
  }

export default adminUserSaga;