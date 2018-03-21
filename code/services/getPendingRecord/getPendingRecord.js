/*getPendingRecord: The endpoint looks up a user who has started the registration process but not yet clicked the email link to provide their password
  params:   user_id : a unique id that maps an deidentified key to a row in the pendingUsers collection.
*/

function getPendingRecord(req, resp){
    ClearBlade.init({"request":req});
    
    var callback = function (err, data) {
   	    if (err) {
   	    	resp.error("fetch error : " + JSON.stringify(data));
   	    } else {
   	    	resp.success(data.DATA[0]);
   	    }
   	};
   	var query = ClearBlade.Query({collectionName: "PendingUsers"});
   	query.equalTo("item_id", req.params.user_id)
   	query.fetch(callback);
}