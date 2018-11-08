var Contact = require('./models/contacts');


exports.GetAllContacts = function(req, res, next){
    Contact.find(function(err, contacts){
        res.json(contacts);
    })
};

exports.AddContact = function(req, res, next){
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    });
    newContact.save((err, contact) =>{
        if(err)
        {
            res.json('Failed' + err);
        }
        else
        {
            res.json('Contact added');
        }
    })
};

exports.deleteContact = function(req, res, next){
    Contact.deleteOne({_id : req.params.id}, (err, result) => {
        if(err)
        {
            res.json('Error deleting' + err);
        }
        else{
            res.json(result);
        }
    })
};

exports.updateContact = function(req, res, next){
    Contact.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err){
            console.log(err);
          res.send(err);
        }
        else
            res.json('Updated Successfully');
      });
}