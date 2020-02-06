import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import programsSaga from './programsSaga';
import programDetailsSaga from './programDetailsSaga';
import utilityNameSaga from './utilityNameSaga';
import adminLandingSaga from './adminLandingSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// function createSaga({actionType, axiosAction, url, body}){
//   return function* (action){
//     try{
//       if(axiosAction){
//         const response = yield axiosAction(url, body);
//         yield put({type: set, payload: response});
//       }
//     } catch(error){
//       console.log(error);
//     }
//   }
// }



function* simpleSagas(action){
  yield takeLatest
}

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    utilityNameSaga(),
    programDetailsSaga(),
    programsSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
    adminLandingSaga()
  ]);
}