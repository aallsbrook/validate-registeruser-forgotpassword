/*
This library contains helper functions for calling the registration.  It provides functions for both new users and creating a new platform developer.  The default usecase
will create new users
*/

var registerPlatformDeveloper = function(user_info, callback) {
   
    var options = {
        uri: user_info.platform_url+"/admin/reg",
        body: {
            "fname": user_info.first_name,
            "lname": user_info.last_name,
            "org": user_info.organization,
            "email": user_info.email,
            "password": user_info.password
        }
    };
        
    var requestObject = Requests();
    requestObject.post(options, function(err,response) {
        if (err != false){
            if (err.indexOf("That user already exists") !== 0) {
                callback(true, "User already exists")
            }
            else if (err.indexOf("Password is required")!==0){
                callback(true, "Password is required")
            }else {
                callback(true, err);
            }
        }
         else {
            callback(false, "developer registered with uuid "+response.user_id);
        }
        
    });
};

var registerSystemUser = function(user_info, callback) {
    ClearBlade.init({
		systemKey: req.systemKey,
		systemSecret: req.systemSecret,
		registerUser: true,
		email: user_info.email,
		password: user_info.password,
		callback: function(err, body) {
			if(err) {
				callback(true, JSON.stringify(body))
			} else {
				callback(false, "user registered "+body);
			}
		}
	});
}
