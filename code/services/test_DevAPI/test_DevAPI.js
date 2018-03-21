function test_DevAPI(req, resp){
    user_info = {user_id:"d2df83ab0bc0f6abcce2e3a19bb601"};
    req.params.password = "newPassword";
    
    var callback = function(ret) {
        if (ret.err)   {
            resp.success(ret);
        } else{
            resp.error(ret);
        }
    }
    resetUserPassword(user_info.user_id, req.params.password, req.systemKey, callback)
}