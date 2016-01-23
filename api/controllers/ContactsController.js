module.exports = {
  save: function (req, res) {
  	if(!req.body.contact_name)
  		return res.send("Missing contact name");
    return res.send("Contact saved!");
  }
};