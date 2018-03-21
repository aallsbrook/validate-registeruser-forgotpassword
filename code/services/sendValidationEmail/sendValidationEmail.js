/*
    sendValidationEmail: this endpoint will start the request for a user to create an accnount.  It will create a record of the registration
                request, then send an email with a unique deidentified key.    
    params: firstname_input : First name of the registration applicant
            lastname_input:  Last name of the registration applicant
            organization_input: The organization of the new user
            email: the Unique email address of the new user
*/

function sendValidationEmail(req, resp){
    ClearBlade.init({"request":req});
    // 1. generate Event Key
    // 2. create customer record with eventKey
    // 3. send email with portal link 
    
    var first_name = req.params.firstname_input;
    var last_name = req.params.lastname_input;
    var organization = req.params.organization_input;
    var email = req.params.email;
    var user_id = "unset";

    var ret = {
        err :false,
        internal:"",
        message:"Thanks for your "+_application.name+" submission.  Please check your email to complete your registration"
    }
        
    var createPendingUserRecord = function() {
        var d = new Date();
        var n = d.toISOString();
        var newPerson = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            organization: organization,
            created_date: n
        };
        var callback = function (err, data) {
            if (err) {
                ret.err = true;
                ret.internal = data;
                ret.message ="We're sorry but something went wrong creating your account.  Please contact "+_support.email+" and we will get it resolved";
            	resp.error(ret);
            } else {
                log(data);
                user_id=data[0].item_id;
                sendEmail();
            }
        };
        var col = ClearBlade.Collection( {collectionName: "PendingUsers" } );
        col.create(newPerson, callback);
        //this inserts the the newPerson item into the collection that col represents
    };
    
    var sendEmail = function() {
        var name = first_name +" "+last_name;
        var portalURL=_portalURL; 
        var targetPage = "Register"
        var text = getValidateEmailHTML(portalURL, targetPage, user_id);
        var mg = MailGun();

        mg.setSender(_sender.email, _sender.name );
        mg.setRecipient(email, name);
        mg.setSubject("Complete your "+_application.name+" registration");
        mg.setText(text);
        mg.setHtml(text);
        mg.setCC( _CC.email, _CC.name);  
        //email.setBCC(_BCC.email, _BCC.name); 
        mg.send(function(err, result){
            if(err){
                ret.err = true;
                ret.internal = result;
                ret.message ="We're sorry but something went wrong send your email.  Please contact "+_support.email+" and we will get it resolved";
                resp.error(ret);
            } else {
                sendResponse();
            }
        });
        
    };
    
    var sendResponse = function() {
        resp.success(ret);
    }
    
   createPendingUserRecord();
}