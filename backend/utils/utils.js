//const mime = require('mime');
//const formidable = require('formidable');

/*exports.savePhoto = (doc, req) => {
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
};*/

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

/*exports.useFormidable = uploadDirPath => (
  (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if(['POST', 'PUT'].includes(req.method) && contentType.startsWith('multipart/form-data')){
      const form = formidable({
        multiples: false,
        uploadDir: uploadDirPath,
        keepExtensions: true,
      });
      form.parse(req, (err, fields, file) => {
        req.body = fields;
        req.file = file;
        next();
      });
    } else {
      next();
    }
  }
);*/
