import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEditInfoUtility(action) {
  try {
    
    const response = yield axios.get('/api/utilities/edit/'+action.payload);
    yield put({type: 'SET_SUBMISSION_FORM', payload: response.data});
  } catch(error) {
    console.log('error getting edit infor for utility company:',error);    
  }
}

function* submissionSaga(action) {
  yield takeLatest('GET_EDIT_INFO_UTILITY', getEditInfoUtility);
}

export default submissionSaga;
