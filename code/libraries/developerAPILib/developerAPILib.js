/*
Functions in this library are specifically designed to call developer only endpoints.  Reseting a user password without the old is not an activity that is 
available or permissioned for system users.  Consequently it requires accelerated developer priveledges.  This capability may be promoted and permissioned to end
users in the future
*/

function authAsAdmin (callback) {
 
    var adminAuthCb = function(err, body) {
        if(err) {
            callback(true, "Error authenticating; " + JSON.stringify(err));
        } else {
            var parsedBody;
            try {
                parsedBody = JSON.parse(body);
            } catch(e) {
                callback(true, "Unable to parse dev_token; " + JSON.stringify(e) + "body= " + body);
            }

            if(parsedBody.dev_token) {
                callback(false, parsedBody);
            } else {
                throw new Error("No entry for dev_token; " + JSON.stringify(parsedBody));
            }

        }
    }

    var adminAuthOptions = {
        "uri": _platformURL+'/admin/auth',
        "body": {
            "email": _developerEmail,
            "password": _developerPassword
        }
    }
    var reqObj = Requests();
    reqObj.post(adminAuthOptions, adminAuthCb);   
    
}

function resetPasswordAsAdmin(userId, newPassword, systemKey, callback){
    authAsAdmin (function(err, resp) {
        var devToken = resp.dev_token;
        if (err){
            var ret ={
                err:true,
                message:"Failed to reset password - bad credential",
            }
            callback(ret);
        }else {
            var body = {"user":userId,"changes":{"password":newPassword}}
            var options = {
                uri: _platformURL+"/admin/user/"+systemKey,
                headers: {"ClearBlade-DevToken":devToken},
                body: body
            }
            var requestObject = Requests();
            requestObject.put(options, function(err,response) {
                if (err === false){
                    var ret ={
                        err:false,
                        message:"Password reset",
                    }
                    callback(ret);
                }
                 else {
                    var ret ={
                        err:true,
                        message:"Password failed to reset",
                    }
                    callback(ret);
                }
            });
        }
    });
    
}