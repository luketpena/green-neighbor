import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEditInfoUtility(action) {
  try {
    const response = yield axios.get('/api/utilities/edit/'+action.payload);
    yield put({type: 'SET_SUBMISSION_FORM', payload: response.data});
  } catch(error) {
    console.log('error getting edit info for utility company:',error);    
  }
}

function* createUtility(action) {
  try {
    yield axios.post('/api/utilities', action.payload);
  } catch(error) {
    console.log('error trying to create new utility:',error);    
  }
}

function* submissionSaga() {
  yield takeLatest('GET_EDIT_INFO_UTILITY', getEditInfoUtility);
  yield takeLatest('CREATE_UTILITY', createUtility);
}

export default submissionSaga;
