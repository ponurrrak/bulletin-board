const mime = require('mime');

exports.savePhoto = (doc, req) => {
  const photo = req.file.photoOriginal;
  if(photo){
    const mimeType = mime.getType(photo.filepath).split('/')[0];
    if(mimeType !== 'image'){
      throw new Error('Files other than images are not allowed');
    }
    doc.photoOriginal = photo.originalFilename;
    doc.photoUploaded = photo.newFilename;
  } else if(!req.body.photoOriginal){
    doc.photoOriginal = '';
    doc.photoUploaded = '';
  }
  return doc;
};

exports.completeDocument = (doc, user, isPutMethod=false) => {
  const timeNow = Date.now();
  doc.updateTime = timeNow;
  if(isPutMethod) {
    doc.version++;
    return doc;
  }
  doc.releaseTime = timeNow;
  doc.authorId = user.userId;
  doc.authBy = user.provider;
  doc.version = 1;
  return doc;
};

exports.parseErrors = err => {
  let message = '';
  if(err.errors) {
    for(const errKey in err.errors){
      message += err.errors[errKey].message + '. ';
    }
  } else {
    message = err.message;
  }
  return message;
};
