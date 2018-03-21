/*
    registerUser: this endpoint will use the unique id provided to look up a new user who has started the registration process.  Provided their key is correct 
                it will then create a real user record with the role of Authenticated.  
    params: pending_reset_id : a unique id that maps to a user in the pendingReset colleciton
            password:  the new password.
*/

function registerUser(req, resp){
    // Set the below params to provide an isolated test execution
    // req.params.user_id = "873c1272-153d-4d07-bb98-0167b9aed51b";
    // req.params.password = "test";
    
    var ret ={
        err:false,
        message:"",
        value:{}
    }
    var user_info={};
    
    var getUserInfo = function() {
        ClearBlade.init({request:req})
    	var codeEngine = ClearBlade.Code();
    	var serviceToCall = "getPendingRecord";
    	var loggingEnabled = false;
    	var params = {
    		user_id:req.params.user_id
    	}		
    	codeEngine.execute(serviceToCall, params, loggingEnabled, function(err, data){
    		if(err){
    			resp.error("Failed to pedning registration record: " + JSON.stringify(data))
    		}
    		else{
    		    user_info = JSON.parse(data).results;
    		    updateUserInfo();
    		    
    		}
    	})
        
    }
    
    var updateUserInfo = function() {
        ClearBlade.init({request:req})
        var d = new Date();
        var n = d.toISOString();
        
        var query = ClearBlade.Query({collectionName: "PendingUsers"});
        query.equalTo('item_id', req.params.user_id);
        var changes = {
            is_validated: true,
            validated_date: n
        };
        var callback = function (err, data) {
            if (err) {
                ret.error=true;
                ret.message= "Failed to finalize user validation, please contact "+_support.email+": "+data;
                resp.success(ret)
            } else {
            	createUser();
            }
        };
        query.update(changes, callback);
    }
    
    
    var createUser = function() {
        var reg_callback = function(err, message) {
            if (err){
                ret.err=true;
                ret.message= message;
                resp.success(ret)  
            }else {
                sendResponse();    
            }
            
        }
        user_info.password = req.params.password;
        user_info.platform_url = _platformURL; 
        
        //registerPlatformDeveloper(user_info, reg_callback);
        registerSystemUser(user_info, reg_callback);
    }
    
    
    
    var sendResponse = function() {
        ret.err=false;
        ret.message= "user has been registered";
        resp.success(ret)  
    }
    
    getUserInfo();
}