import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// type: GET_PROGRAMS, payload: string of the zip code you want to get programs for
function* getAdminUsers() {
    try{
      const response = yield axios.get(`/api/user/admins`);
      yield put({type: 'SET_ADMIN_USERS', payload: response.data});
    } catch (error) {
        console.log(error);
    }
  }

  function* postAdminUser(action) {
    try{
      yield axios.post('/api/user/admin', action.payload);
      yield put({ type: 'SET_NEW_ADMIN', payload: action.payload });
    } catch (error) {
      console.log('error posting new admin', error);
    }
  }
  
  function* adminUserSaga() {
    yield takeLatest('GET_ADMIN_USERS', getAdminUsers);
    yield takeLatest('POST_NEW_ADMIN', postAdminUser);
  }

export default adminUserSaga;