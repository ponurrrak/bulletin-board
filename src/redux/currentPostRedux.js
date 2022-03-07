//import Axios from 'axios';
import testCurrentPost from './testData/currentPost.js';

/* selectors */
export const getCurrent = ({currentPost}) => currentPost.data;
export const getLoading = ({currentPost}) => currentPost.loading;

/* action name creator */
const reducerName = 'currentPost';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const CLEAR_DATA = createActionName('CLEAR_DATA');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const clearData = () => ({ type: CLEAR_DATA });

/* thunk creators */
export const fetchCurrent = postId => {
  return (dispatch, getState) => {
    dispatch(fetchSuccess(testCurrentPost));
    /*dispatch(fetchStarted());
    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });*/
  };
};

const createRequestBody = getState => {
  const currentPost = getCurrent(getState());
  const formData = new FormData();
  for(const field in currentPost){
    formData.append(field, currentPost[field]);
  }
  return formData;
};

export const postNew = () => {
  return (dispatch, getState) => {
    const requestBody = createRequestBody(getState);
    dispatch(fetchSuccess({_id: testCurrentPost._id}));
    /*dispatch(fetchStarted());
    Axios
      .post(`${api.url}/api/${api.tables}`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });*/
  };
};

export const putChanged = () => {
  return (dispatch, getState) => {
    const requestBody = createRequestBody(getState);
    const currentPost = getCurrent(getState());
    dispatch(fetchSuccess({version: currentPost.version + 1 || 1}));
    /*dispatch(fetchStarted());
    Axios
      .put(`${api.url}/api/${api.tables}`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });*/
  };
};

/* reducer */
export const reducer = (statePart = {}, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          ...action.payload,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case CLEAR_DATA: {
      const fieldsToClear = [
        'title',
        'content',
        'price',
        'phone',
        'photo',
        'email',
        'location',
      ];
      const emptyData = {};
      fieldsToClear.forEach(field => {
        emptyData[field] = '';
      });
      return {
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...emptyData,
          status: 'draft',
        },
      };
    }
    default:
      return statePart;
  }
};
