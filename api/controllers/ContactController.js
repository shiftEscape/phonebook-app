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
    var validationResult = validate(req.body, 'create');
    if(!validationResult.status)
      return res.send(validationResult);

    Contact.create(req.params.all(), function(err, createdUser) {
      if(err) return next(err);
      res.redirect("/contact");
    });
  },
  find: function(req, res) {
    res.send(validate(req.params, 'find'));
  },
  findOne: function(req, res) {
    res.send(validate(req.params, 'findOne'));
  },
  show: function(req, res) {
    Contact.findOne(req.params['id'], function(err, contact) {
      if(err) return next(err);
      if(!contact) return next();
      res.view({
        contact: contact
      });
    });
  },
  edit: function(req, res) {
    Contact.findOne(req.params['id'], function(err, contact) {
      if(err) return next(err);
      if(!contact) return next();
      res.view({
        contact: contact
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