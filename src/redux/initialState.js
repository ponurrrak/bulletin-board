export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    data: {
      logged: false,
      admin: false,
    },
    loading: {
      active: false,
      error: false,
    },
  },
  currentPost: {
    data: {},
    loading: {
      active: false,
      error: false,
    },
  },
};
