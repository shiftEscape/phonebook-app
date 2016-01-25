function validate(param, action) {

  // Use defined obj to handle (default) positive messages
  var successObj = {
    create: 'Contact saved!',
    update: 'Contact updated!',
    destroy: 'Contact deleted!',
    find: 'All contacts retrieved!',
    findOne: 'One contact retrieved!',
  },
    returnValue = successObj[action];

  if(action === 'create' || action === 'update') {
    if(!param.contact_name && !param.contact_num)
      returnValue = "Missing contact details";
    else if(!param.contact_name)
      returnValue = "Missing contact name";
    else if(!param.contact_num)
      returnValue = "Missing contact number";
  }

  return returnValue;

}

module.exports = {
  create: function (req, res) {
    res.send(validate(req.body, 'create'));
  },
  find: function(req, res) {
    res.send(validate(req.params, 'find'));
  },
  findOne: function(req, res) {
    res.send(validate(req.params, 'findOne'));
  },
  update: function(req, res) {
    res.send(validate(req.body, 'update'));
  },
  destroy: function(req, res) {
    res.send(validate(req.params, 'destroy'));
  }
};