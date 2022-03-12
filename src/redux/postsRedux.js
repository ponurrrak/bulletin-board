import Axios from 'axios';
import settings from '../settings';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getLoading = ({posts}) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchAll = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`${settings.api.url}/${settings.api.endpoints.posts}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
      });
  };
};

export const fetchMyPosts = userId => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`${settings.api.url}/${settings.api.endpoints.userPosts}/${userId}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
      });
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
        data: action.payload,
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
    default:
      return statePart;
  }
};
