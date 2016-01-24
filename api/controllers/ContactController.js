function validate(param, action) {

  // Use defined obj to handle (default) positive messages
  var successObj = {
    save: 'Contact saved!',
    update: 'Contact updated!',
    destroy: 'Contact deleted!',
  },
    returnValue = successObj[action];

  if(action === 'save' || action === 'update') {
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
  save: function (req, res) {
    res.send(validate(req.body, 'save'));
  },
  update: function(req, res) {
    res.send(validate(req.body, 'update'));
  },
  destroy: function(req, res) {
    res.send(validate(req.params, 'destroy'));
  }
};