import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEditInfoUtility(action) {
  try {
    const response = yield axios.get('/api/utilities/edit/'+action.payload);
    yield put({type: 'SET_SUBMISSION_FORM', payload: response.data});
    yield put({type: 'SET_EDIT_READY', payload: true});
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

function* getProgramSubmissionFormData(action){
  try {
    const response = yield axios.get(`/api/details/${action.id}`);
    yield put({type: 'SET_SUBMISSION_FORM', payload: response.data});
    action.payload.history.push('/admin/submit/edit/program');
  } catch(error) {
    console.log('error getting edit info for utility company:',error);    
  }
}

function* submissionSaga() {
  yield takeLatest('GET_EDIT_INFO_UTILITY', getEditInfoUtility);
  yield takeLatest('CREATE_UTILITY', createUtility);
  yield takeLatest('GET_PROGRAM_SUBMISSION_FORM_DATA', getProgramSubmissionFormData);
}

export default submissionSaga;
