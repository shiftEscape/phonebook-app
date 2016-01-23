module.exports = {
  save: function (req, res) {
  	if(!req.body.contact_name)
  		return res.send("Missing contact name");
  	if(!req.body.contact_num)
  		return res.send("Missing contact number");
    return res.send("Contact saved!");
  }
};