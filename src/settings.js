const settings = {
  patterns: {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    title: /^.{10,}$/,
    content: /^.{20,}$/,
    phone: /(^$)|(^[0-9]{9,11}$)/,
  },
  messages: {
    email: 'Email is not correct',
    title: 'Title has to have at least 10 characters',
    content: 'Content has to have at least 20 characters',
    phone: 'Phone has to contain from 9 to 11 digits only',
    photo: 'File is not an image, e.g. jpg or png',
    noChanges: 'Nothing has been changed in your post yet',
  },
};


export default settings;
