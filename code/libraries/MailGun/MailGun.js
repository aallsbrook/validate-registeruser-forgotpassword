/*
    This library contains the base capability to send emails with the mailgun service
*/ 

function MailGun(config){

    if(config === undefined){ config = {}; }

    var API_URL = config.url !== undefined ? config.url  : _mailGun.url; 
    var API_USER = config.user !== undefined ? config.user : _mailGun.user; 
    var API_SECRET = config.secret !== undefined ? config.secret : _mailGun.secret; 

    var options = {};

    this.setSender = function(email, name){
        if(name !== undefined){
            options.from = name + " <"+email+">";
        } else {
            options.from = email;
        }
    }

    this.setRecipient = function(email, name){
        if(name !== undefined){
            options.to = name + " <"+email+">";
        } else {
            options.to = email;
        }
    }

    this.setCC = function(email, name){
        if(name !== undefined){
            options.cc = name + " <"+email+">";
        } else {
            options.cc = email;
        }
    }

    this.setBCC = function(email, name){
        if(name !== undefined){
            options.bcc = name + " <"+email+">";
        } else {
            options.bcc = email;
        }
    }

    this.setSubject = function(subject){
        options.subject = subject;
    }

    this.setText = function(text){
        options.text = text;
    }

    this.setHtml = function(html){
        options.html = html;
    }

    // Check that required properties exist
    this.validate = function(callback){
        if(options.from === undefined){
            callback(true, "Sender required");
        }

        if(options.to === undefined){
            callback(true, "Recipient required");
        }

        if(options.text === undefined && options.html === undefined){
            callback(true, "Message (text or html) required");
        }

        callback(false);
    }

    // Validate and send email
    this.send = function(callback){

        this.validate(function(err, result){
            if(err){
                callback(true, result);
            } else {
                log(options)
                var payload = {
                    "auth": {
                        "user": API_USER,
                        "pass" : API_SECRET
                        },
                    "uri" : API_URL,
                    "qs": options,
                    "strictSSL": false
                };

                var requestObject = ClearBlade.http().Request();
                requestObject.post(payload, function(err,result){
                    if(err){
                        callback(true, err); 
                    }else{
                        callback(false, result);
                    }
                });
            }
        });
    }  
    return this;
}

