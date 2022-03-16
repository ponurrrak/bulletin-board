import Axios from 'axios';
import settings from '../settings';

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
export const clearData = payload => ({ payload, type: CLEAR_DATA });

/* thunk creators */
export const fetchCurrent = postId => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`${settings.api.url}/${settings.api.endpoints.posts}/${postId}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
      });
  };
};

/*const createRequestBody = getState => {
  const currentPost = getCurrent(getState());
  const formData = new FormData();
  for(const field in currentPost){
    formData.append(field, currentPost[field]);
  }
  return formData;
};*/

const sendFile = async file => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', settings.cloudinery.upload_preset);
  const response = await Axios.post(settings.cloudinery.url, formData,  {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return response.data.secure_url.replace(settings.cloudinery.publicPhotoUrl, '');
};

export const postNew = () => {
  return async (dispatch, getState) => {
    dispatch(fetchStarted());
    try {
      const requestBody = getCurrent(getState());
      let photoOriginal = '';
      let photoUploaded = '';
      if(requestBody.photoOriginal) {
        photoOriginal = requestBody.photoOriginal.name;
        photoUploaded = await sendFile(requestBody.photoOriginal);
      }
      requestBody.photoOriginal = photoOriginal;
      requestBody.photoUploaded = photoUploaded;
      const response = await Axios.post(`${settings.api.url}/${settings.api.endpoints.posts}`, requestBody);
      dispatch(fetchSuccess(response.data));
    } catch(err) {
      dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
    }
  };
};

/*export const postNew = async () => {
  return (dispatch, getState) => {
    const requestBody = createRequestBody(getState);
    dispatch(fetchStarted());
    Axios
      .post(`${settings.api.url}/${settings.api.endpoints.posts}`, requestBody, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
      });
  };
};*/

export const putChanged = postId => {
  return async (dispatch, getState) => {
    dispatch(fetchStarted());
    try {
      const requestBody = getCurrent(getState());
      if(!requestBody.photoOriginal){
        requestBody.photoUploaded = '';
      } else if(requestBody.photoOriginal.name) {
        const photoOriginal = requestBody.photoOriginal.name;
        const photoUploaded = await sendFile(requestBody.photoOriginal);
        requestBody.photoOriginal = photoOriginal;
        requestBody.photoUploaded = photoUploaded;
      }
      const response = await Axios.put(`${settings.api.url}/${settings.api.endpoints.posts}/${postId}`, requestBody);
      dispatch(fetchSuccess(response.data));
    } catch(err) {
      dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
    }
  };
};

/*export const putChanged = postId => {
  return (dispatch, getState) => {
    const requestBody = createRequestBody(getState);
    dispatch(fetchStarted());
    Axios
      .put(`${settings.api.url}/${settings.api.endpoints.posts}/${postId}`, requestBody, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError((err.response && err.response.data && err.response.data.message) || err.message || true));
      });
  };
};*/

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
        'photoOriginal',
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
          email: (action.payload && action.payload.email) || '',
        },
      };
    }
    default:
      return statePart;
  }
};
