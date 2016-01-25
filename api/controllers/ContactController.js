function validate(param, action) {

  // Use defined obj to handle (default) positive messages
  var successObj = {
    create: {status: true, message: 'Contact successfully saved!'},
    update: 'Contact updated!',
    destroy: 'Contact deleted!',
    find: 'All contacts retrieved!',
    findOne: 'One contact retrieved!',
  },
    returnValue = successObj[action];

  if(action === 'create' || action === 'update') {
    if(!param.name && !param.number) {
      returnValue.status = false;
      returnValue.message = "Missing contact details";
    } else if(!param.name) {
      returnValue.status = false;
      returnValue.message = "Missing contact name";
    } else if(!param.number) {
      returnValue.status = false;
      returnValue.message = "Missing contact number";
    }
  }

  return returnValue;

}

module.exports = {
  index: function(req, res, next) {
    Contact.find(function(err, contacts) {
      if(err) return next(err);
      res.view({
        contacts: contacts
      });
    });
  },
  create: function (req, res) {
    res.send(validate(req.body, 'create'));
  },
  find: function(req, res) {
    res.send(validate(req.params, 'find'));
  },
  findOne: function(req, res) {
    res.send(validate(req.params, 'findOne'));
  },
  show: function(req, res) {
    //res.send(validate(req.params, 'findOne'));
    Contact.findOne(req.params['id'], function(err, user) {
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user: user
      });
    });
  },
  update: function(req, res) {
    res.send(validate(req.body, 'update'));
  },
  destroy: function(req, res) {
    res.send(validate(req.params, 'destroy'));
  }
};