/*getPendingResetRecord: The endpoint looks up a user who has started the password reset process but not yet clicked the email link to provide their password
  params:   pending_reset_id : a unique id that maps an deidentified key to a row in the pendingResetRecord collection for mapping to a users email.
*/

function getPendingResetRecord(req, resp){
    
    ClearBlade.init({"request":req});
    
    var callback = function (err, data) {
   	    if (err) {
   	    	resp.error("fetch error : " + JSON.stringify(data));
   	    } else {
   	    	resp.success(data.DATA[0]);
   	    }
   	};
   	var query = ClearBlade.Query({collectionName: "PendingPasswordReset"});
   	query.equalTo("item_id", req.params.pending_reset_id)
   	query.fetch(callback);
}
