const settings = {
  patterns: {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    title: /^[^<>]{10,}$/,
    content: /^[^<>]{20,}$/,
    phone: /(^$)|(^[0-9]{9,11}$)/,
    location: /^[^<>]*$/,
  },
  messages: {
    email: 'Email is not correct',
    title: 'Title has to have at least 10 characters (allowed only)',
    content: 'Content has to have at least 20 characters (allowed only)',
    phone: 'Phone has to contain from 9 to 11 digits only',
    location: 'Location musn\'t contain forbidden characters',
    photo: 'File is not an image, e.g. jpg or png',
    noChanges: 'Nothing has been changed in your post yet',
  },
  api: {
    url: '//' + window.location.hostname + (window.location.hostname==='localhost' ? ':8000/api' : '/api'),
    endpoints: {
      posts: 'posts',
      userPosts: 'posts/author',
      auth: {
        google: 'google',
      },
    },
  },
};


export default settings;
