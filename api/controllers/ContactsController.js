function validate(param) {
	var result = 'Contact saved!';

	if(!param.contact_name && !param.contact_num)
  		result = "Missing contact details";
  	else if(!param.contact_name)
  		result = "Missing contact name";
  	else if(!param.contact_num)
  		result = "Missing contact number";

  	return result;
}

module.exports = {
  save: function (req, res) {
  	return res.send(validate(req.body));
  }
};