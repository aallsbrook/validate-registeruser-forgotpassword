/*
    This Library contains the HTML strings for population in emails that are sent to new registrants and forgotten password requests
*/

var getForgotEmailHTML = function(portalURL, targetPage, forgotId) {
    var html= "<style>";
    html+=".header_bar {";
    html+="width:100%;";
    html+="height:20px;";
    html+="background-color:#6E8592;";
    html+="border-color:black;";
    html+="border-bottom-width:4px;";
    html+="border-bottom-style:solid;";
    html+="}";

    html+=".footer_bar {";
    html+="width:100%;";
    html+="height:20px;";
    html+="background-color:#6E8592;";
    html+="border-color:black;";
    html+="border-top-width:4px;";
    html+="border-top-style:solid;";
    html+="}";

    html+=".email_button {";
    html+="color: #fff;";
    html+="background-color: #6E8592;";
    html+="border-color: #007bff;";
    html+="display: inline-block;";
    html+="font-weight: 400;";
    html+="text-align: center;";
    html+="white-space: nowrap;";
    html+="vertical-align: middle;";
    html+="user-select: none;";
    html+="border: 1px solid transparent;";
    html+="padding: .375rem .75rem;";
    html+="font-size: 1rem;";
    html+="line-height: 1.5;";
    html+="border-radius: .25rem;";
    html+="}";

    html+=".more_text{";
    html+="font-size:12px;";
    html+="}";
    html+="</style>";

    html+="<div class='text-center'>";
    html+="<div class='header_bar'></div>";
    html+="<h2>Forgot Password</h2>";
    html+="<div>We received a request to reset your "+_application.name+" password.  Click below to access your account.</div>";
    html+="<br>";
    html+="<a href='"+portalURL+"&user_id="+forgotId+"#/"+targetPage+"' class='email_button' id='submit_input'>Reset Account</a>";
    html+="<br><br>";
    html+="<div class='more_text'>Click here to learn more or contact us at "+_support.email+"</div>";
    html+="<div class='footer_bar'></div>";
    html+="</div>";
    return html;
};


var getValidateEmailHTML = function(portalURL, targetPage, registerId) {
    var html= "<style>";
    html+=".header_bar {";
    html+="width:100%;";
    html+="height:20px;";
    html+="background-color:#6E8592;";
    html+="border-color:black;";
    html+="border-bottom-width:4px;";
    html+="border-bottom-style:solid;";
    html+="}";

    html+=".footer_bar {";
    html+="width:100%;";
    html+="height:20px;";
    html+="background-color:#6E8592;";
    html+="border-color:black;";
    html+="border-top-width:4px;";
    html+="border-top-style:solid;";
    html+="}";

    html+=".email_button {";
    html+="color: #fff;";
    html+="background-color: #6E8592;";
    html+="border-color: #007bff;";
    html+="display: inline-block;";
    html+="font-weight: 400;";
    html+="text-align: center;";
    html+="white-space: nowrap;";
    html+="vertical-align: middle;";
    html+="user-select: none;";
    html+="border: 1px solid transparent;";
    html+="padding: .375rem .75rem;";
    html+="font-size: 1rem;";
    html+="line-height: 1.5;";
    html+="border-radius: .25rem;";
    html+="}";

    html+=".more_text{";
    html+="font-size:12px;";
    html+="}";
    html+="</style>";

    html+="<div class='text-center'>";
    html+="<div class='header_bar'></div>";
    html+="<h2>Good Work!</h2>";
    html+="<div>Thanks for creating a new "+_application.name+" account. Click below to set your password and get started.</div>";
    html+="<br>";
    html+="<a href='"+portalURL+"&user_id="+registerId+"#/"+targetPage+"' class='email_button' id='submit_input'>Confirm Account</a>";
    html+="<br><br>";
    html+="<div class='more_text'>Click here to learn more or contact us at "+_support.email+"</div>";
    html+="<div class='footer_bar'></div>";
    html+="</div>";
    return html;
};