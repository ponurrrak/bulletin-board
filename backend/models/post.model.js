const mongoose = require('mongoose');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

class Price extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'Price');
  }
  cast(val) {
    const valAsNum = Number(val);
    if(!(typeof val === 'number' && val >= 0) && !(typeof val === 'string' && valAsNum >= 0)){
      throw new Error('Price ' + val + ' is neither a positive number nor empty string');
    }
    if(String(val).replace(/^.*\./, '').length > 2){
      throw new Error('Price ' + val + ' has more than 2 decimal points');
    }
    return val === '' ? '' : valAsNum;
  }
}

mongoose.Schema.Types.Price = Price;


const postSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  releaseTime: {
    type: Number,
    required: true,
  },
  updateTime: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email is not correct'],
  },
  status: {
    type: String,
    required: true,
    enum: [
      'draft',
      'published',
      'closed',
    ],
  },
  title: {
    type: String,
    required: true,
    match: [/^[^<>]{10,}$/, 'Title has to have at least 10 characters (allowed only)'],
  },
  content: {
    type: String,
    required: true,
    match: [/^[^<>]{20,}$/, 'Content has to have at least 20 characters (allowed only)'],
  },
  photoOriginal: {
    type: String,
    default: '',
  },
  photoUploaded: {
    type: String,
    default: '',
  },
  price: {
    type: Price,
  },
  phone: {
    type: String,
    match: [/(^$)|(^[0-9]{9,11}$)/, 'Phone has to contain from 9 to 11 digits only'],
    default: '',
  },
  location: {
    type: String,
    match: [/^[^<>]*$/, 'Location musn\'t contain forbidden characters'],
    default: '',
  },
  version: {
    type: Number,
    required: true,
  },
  authBy: {
    type: String,
    enum: ['google', 'facebook'],
  },
});

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

postSchema.post('validate', doc => {
  for(const field in doc.toObject()){
    doc[field] = DOMPurify.sanitize(doc[field]);
  }
  doc.validateSync(['title', 'content']);
});

module.exports = mongoose.model('Post', postSchema);
