
# ipm package: validate-registeruser-forgotpassword

## Overview

This package provides the ability to inject email verification for both the registration and forgot password lifecycle.  It includes services, Portal UI, and email integrations

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

To make this IPM fully work you will need to populate the CONSTANTS library with valid values.  The majority of these values come from the MailGun Integration.

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

Additionally you will also need to create a service account user with the role of ServiceRole.  All of the services should be set with the runas with this new user.

## Usage

This package provides two capabilties
1.  Its designed to be added to existing systems where new users should have their email addresses validated as active before allowing them to register.  
2.  Allow users in a system to securely request their password to be reset if forgotten without needing to know the old password

All of the user interface is available in a single portal with 4 pages.
All of the email templates are defined in the emailHTML library

### Code Services
getPendingRecord: The endpoint looks up a user who has started the registration process but not yet clicked the email link to provide their password
  params:   user_id : a unique id that maps an deidentified key to a row in the pendingUsers collection

getPendingResetRecord: The endpoint looks up a user who has started the password reset process but not yet clicked the email link to provide their password
  params:   pending_reset_id : a unique id that maps an deidentified key to a row in the pendingResetRecord collection for    mapping to a users email.

registerUser: this endpoint will use the unique id provided to look up a new user who has started the registration process.  Provided their key is correct it will then create a real user record with the role of Authenticated.  
    params: pending_reset_id : a unique id that maps to a user in the pendingReset colleciton
            password:  the new password.

resetPassword: this endpoint will reset the password of someone who has clicked on the forgot button and then clicked on the email url with the reset id provided.  The old password is not required to run this reset.
  params:   pending_reset_id : a unique id that maps to a user in the pendingReset colleciton
            password:  the new password.
sendValidationEmail: this endpoint will start the request for a user to create an accnount.  It will create a record of the registration request, then send an email with a unique deidentified key.    
params: firstname_input : First name of the registration applicant
            lastname_input:  Last name of the registration applicant
            organization_input: The organization of the new user
            email: the Unique email address of the new user

submitForgotPassword: this endpoint will start the request for a user to reset their forgotten password.  It will create a record of the event in the pending reset collection, then send an email with a unique deidentified key.    
    params: email: the Unique email address of the user who forgot their password


### Code Libraries
CONSTANTS -This library holds a series of constants that are generally private for each system.  As a developer importing this system these constants should be edited appropriately

developerAPILib - Functions in this library are specifically designed to call developer only endpoints.  Reseting a user password without the old is not an activity that is 
available or permissioned for system users.  Consequently it requires accelerated developer priveledges.  This capability may be promoted and permissioned to end
users in the future

emailHTMLLib - This Library contains the HTML strings for population in emails that are sent to new registrants and forgotten password requests

MailGun- This library contains the base capability to send emails with the mailgun service

registerLib - This library contains helper functions for calling the registration.  It provides functions for both new users and creating a new platform developer.  The default usecase
will create new users

### Portals
Register User - Provides 4 views on request a new account, validating a new account, requesting a forgot password, reseting a password

TestUser Login - A base portal that allows authenticated users into the system

### Collections
PendingPasswordReset - A collection of users who have requested their password be reset

PendingUsers - a collection of people who have requested a new account to be created


## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
