/*resetPassword: this endpoint will reset the password of someone who has clicked on the forgot button and then clicked on the email url with the reset id provided
            The old password is not required to run this reset.
  params:   pending_reset_id : a unique id that maps to a user in the pendingReset colleciton
            password:  the new password.
*/
function resetPassword(req, resp){
    // req.params.pending_reset_id = "6cba6702-07e2-48d8-b371-d1c7cd2db419";
    // req.params.password = "test";
    
    //1. recover pending reset record
    //2. get user id from email
    //3. reset user based on user_id
    //4. update pending reset record
    ClearBlade.init({request:req})
    
    var ret ={
        err:false,
        message:"",
        value:{}
    }
    var user_info={
    };
    
    var getPendingResetRecord = function() {
        ClearBlade.init({request:req})
    	var codeEngine = ClearBlade.Code();
    	var serviceToCall = "getPendingResetRecord";
    	var loggingEnabled = false;
    	var params = {
    		pending_reset_id:req.params.pending_reset_id
    	}		
    	codeEngine.execute(serviceToCall, params, loggingEnabled, function(err, data){
    		if(err){
    			log("Failed to get Pending Reset Record: " + JSON.stringify(data));
                var ret ={
                    err:true,
                    message:"Failed to get Pending Reset Record: " + JSON.stringify(data),
                }
                resp.error(ret);
    		}
    		else{
    		    user_info = JSON.parse(data).results;
    		    getUserRecord();
    		}
    	});
    }
    
    var getUserRecord = function() {
        var user = ClearBlade.User();
        var query = ClearBlade.Query();
        query.equalTo("email",user_info.email)
        user.allUsers(query,function(err, data) {
            if (err){
                ret ={
                    err:true,
                    message:"Failed to find user record",
                }
                resp.error(ret);
            }else {
                if (data.Data.length == 1){
                    user_info.user_id = data.Data[0].user_id;
                    resetUserPassword(); 
                } else {
                    ret ={
                        err:true,
                        message:"Failed to find user record",
                    } 
                    resp.error(ret);
                }
            }
    	});
        
    }
    
    var resetUserPassword = function() {
        
        var resetcallback = function(ret) {
            if (ret.err)   {
                updateUserInfo();
            } else{
                resp.error(ret);
            }
        }
        resetPasswordAsAdmin(user_info.user_id, req.params.password, req.systemKey, resetcallback);
    }
    
    var updateUserInfo = function() {
        ClearBlade.init({request:req})
        var d = new Date();
        var n = d.toISOString();
        var query = ClearBlade.Query({collectionName: "PendingPasswordReset"});
        query.equalTo('item_id', req.params.pending_reset_id);
        var changes = {
            is_reset: true,
            reset_date: n
        };
        var callback = function (err, data) {
            if (err) {
                ret.error=true;
                ret.message= "Failed to finalize user reset, please contact "+_support.email+": "+data;
                resp.success(ret)
            } else {
            	sendResponse();
            }
        };
        query.update(changes, callback);
    }
    var sendResponse = function() {
        ret.err=false;
        ret.message= "user password has been succesfully reset";
        resp.success(ret)  
    }
    
    // getUserInfo();
    getPendingResetRecord();
}