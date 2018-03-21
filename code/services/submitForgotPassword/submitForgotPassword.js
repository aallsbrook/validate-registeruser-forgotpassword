/*
    submitForgotPassword: this endpoint will start the request for a user to reset their forgotten password.  It will create a record of the event in
                the pending reset collection, then send an email with a unique deidentified key.    
    params: 
            email: the Unique email address of the user who forgot their password
*/

function submitForgotPassword(req, resp){
    ClearBlade.init({"request":req});
    
    var email = req.params.email;
    
    var ret = {
        err :false,
        internal:"",
        message:"Thanks for your "+_application.name+" submission.  Please check your email to reset your password"
    }
        
    var createPasswordResetRecord = function() {
        var d = new Date();
        var n = d.toISOString();
        var resetRecord = {
            email: email,
            created_date: n
        };
        var callback = function (err, data) {
            if (err) {
                ret.err = true;
                ret.internal = data;
                ret.message ="We're sorry but something went wrong finding your account.  Please contact "+_support.email+" to resolve the issue";
            	resp.error(ret);
            } else {
                log(data);
                user_id=data[0].item_id;
                log(user_id);
            	sendEmail();
            }
        };
        var col = ClearBlade.Collection( {collectionName: "PendingPasswordReset" } );
        col.create(resetRecord, callback);
        //this inserts the the newPerson item into the collection that col represents
    };
    
    var sendEmail = function() {
        //var name = first_name +" "+last_name;

        var portalURL=_portalURL; 
        var targetPage = "Reset"
        var text = getForgotEmailHTML(portalURL, targetPage, user_id);

        var mg = MailGun();

        mg.setSender(_sender.email, _sender.name );
        mg.setRecipient(email, "");
        mg.setSubject("Reset your "+_application.name+" password");
        mg.setText(text);
        mg.setHtml(text);
        mg.setCC( _CC.email, _CC.name);  
        //email.setBCC(_BCC.email, _BCC.name); 
        mg.send(function(err, result){
            if(err){
                ret.err = true;
                ret.internal = result;
                ret.message ="We're sorry but something went wrong send your email.  Please contact "+_support.email+" to resolve the issue";
            	resp.error(ret);
            } else {
                sendResponse();
            }
        });
        
    };
    
    var sendResponse = function() {
       
        resp.success(ret);
    }
    
   createPasswordResetRecord();
}