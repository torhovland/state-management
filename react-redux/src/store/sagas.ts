import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { loadTodos } from "./actions";

async function callApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(url + path, {
    method,
    headers: {
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}

function* handleFetch() {
  try {
    const res = yield call(callApi, "get", "http://localhost:3009", "/");

    if (res.error) {
      yield put(loadTodos.failure(res.error));
    } else {
      yield put(loadTodos.success(res));
    }
  } catch (err) {
    yield put(loadTodos.failure(err));
  }
}

function* watchFetchRequest() {
  yield takeEvery(loadTodos.request, handleFetch);
}

export function* todoSaga() {
  yield all([fork(watchFetchRequest)]);
}
