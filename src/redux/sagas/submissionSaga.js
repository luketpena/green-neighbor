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

function* editUtility(action) {
  try {
    yield axios.put('/api/utilities/'+action.payload.id,action.payload);
  } catch(error) {
    console.log('Error trying to edit an existing utility:',error);    
  }
}

function* submissionSaga() {
  yield takeLatest('GET_EDIT_INFO_UTILITY', getEditInfoUtility);
  yield takeLatest('CREATE_UTILITY', createUtility);
  yield takeLatest('EDIT_UTILITY',editUtility);
}

export default submissionSaga;
