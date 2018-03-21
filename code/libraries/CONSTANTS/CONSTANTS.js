//This library holds a series of constants that are generally private for each system.  As a developer importing this system these constants should be edited appropriately

//Constants used specific to the platform 
var _platformURL = "https://platform.clearblade.com";

//Put the registerPortal URL here
var _portalURL   = "";

//Constants used to send the emails
var _mailGun = {url : "", user: "", secret : ""};
var _CC = { email:"", name:""};
var _BCC = { email:"", name : ""};
var _sender = {email: "", name:""};
var _support= {email:""};
var _application = { name:"" }

//required for the password reset
var _developerEmail = "";
var _developerPassword = "";