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

