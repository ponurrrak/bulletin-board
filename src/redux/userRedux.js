import Axios from 'axios';
import settings from '../settings';

/* selectors */
export const isLogged = ({user}) => user.data.userId;
export const isAdmin = ({user}) => user.data.admin;
export const getName = ({user}) => user.data.displayName;
export const getEmail = ({user}) => user.data.email;
export const getPhoto = ({user}) => user.data.photo;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Promise.all(Object.keys(settings.api.endpoints.auth).map(authMode => (
      Axios.get(`${settings.api.url}/user/${settings.api.endpoints.auth[authMode]}`)
    ))).then(resArray => {
      resArray.forEach(res => {
        if(res.data && res.data.userId) {
          dispatch(fetchSuccess(res.data));
          return;
        }
        dispatch(fetchSuccess({}));
      });
    }).catch(err => {
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
