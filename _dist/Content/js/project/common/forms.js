/* ######### SAMPLE FORM ##########*/
/*
	<form id="registration-contact" name="regContact" action="#" onsubmit="">

		<div class="form-item">
			<div id="label-email" class="form-label">Email address (this will be your username)*</div>
			<input id="email" name="email" class="input-field email" type="email">
			<span class="error-msg"></span> 
		</div>

		<div class="form-item">
			<div id="label-firstName" class="form-label">First Name*</div>
			<input id="firstName" name="firstName" class="input-field firstName" type="text">
			<span class="error-msg"></span> 
		</div>

		<div class="form-item">
			<div id="label-lastName" class="form-label">Last Name*</div>
			<input id="lastName" name="lastName" class="input-field lastName" type="text">
			<span class="error-msg"></span> 
		</div>

		<div class="form-item">
			<div id="label-phone" class="form-label">Phone Number*</div>
			<input id="phone" name="phone" class="input-field phone" type="text" maxlength="10">
			<span class="error-msg"></span> 
		</div>  

		<div id="password-group">
			<div class="form-item">   
				<div id="label-password" class="form-label">Password* </div>        
				<input id="password" name="password" class="input-field required-field" type="password">
				<span class="error-msg"></span> 
			</div>

			<div class="form-item">   
				<div id="label-passwordConfirm" class="form-label">Password Verify* </div>        
				<input id="passwordConfirm" name="passwordConfirm" class="input-field required-field" type="password">
				<span class="error-msg"></span> 
			</div>
		</div>   

		<div class="form-item">
			<input id="agreeTerms" name="agreeTerms" type="checkbox"> <div id="label-agreeTerms" class="form-label">I agree to the <a id="terms-link">Terms & Conditions</a></div>
			<span class="error-msg"></span> 
		</div>


		<div class="error-box">
			The messaging for error goes here.
		</div>
		
		
		<div id="button-get-started" class="button form-submit-button"><div class="button-copy">Get Started</div></div>
		<div class="loading"></div>

	</form>
*/


/* ######### SAMPLE FORM CODE ##########*/
/*    
	createUser: function (callback)
	{  
		var self = this;   

		// hide error box
		this.oForms.prepareFormSubmit();

		var passwordConfirm = encodeURIComponent($("#passwordConfirm").val());
		var agree           = $("#agreeTerms")[0].checked;
		
		// get values
		var formData = $("#registration-contact").serializeArray();            
		formData = window.helpers.deserializeArray(formData);
		formData.password = encodeURIComponent(formData.password);

		var validateList = 
		[
			{
				name: 'email',
				display: 'Email',
				rules: 'required|valid_email'
			},
			{
				name: 'firstName',
				display: 'First Name',
				rules: 'required|alpha_numeric'
			},
			{
				name: 'lastName',
				display: 'Last Name',
				rules: 'required|alpha_numeric'
			},
			{
				name: 'password',
				display: 'Password',
				rules: 'required'
			},
			{
				name: 'passwordConfirm',
				display: 'Password Verify',
				rules: 'required|matches[password]'
			},
			{
				name: 'phone',
				display: 'Phone number',
				rules: 'required|numeric|exact_length[10]'
			},
			{
				name: 'agreeTerms',
				display: 'Agree to Terms',
				rules: 'required'
			}
		];

		this.validateForm(
		{   
			formName     : "regContact", 
			validateList : validateList, 
			callback     : function()
			{
				// call service
				self.oServices.createUser(formData, function(results)
				{
					self.showSubmitError(results);
					callback(results);
				});
			}
		});
	}
*/
define([
  
], 

function ()
{

	// ---------------------------------------------------------------
	//
	// Forms
	//
	// ---------------------------------------------------------------

	var constructor = function ()
	{       
		this.init();
	};

	var methods =
	{    
		// --------------------------------------------------------------
		// METHODS
		// --------------------------------------------------------------
		
		// ______________________________________________________________
		//                                                           init
		init: function()
		{           
			console.log(" * <forms>");
	
			this.assignListeners();
		},

		// ______________________________________________________________
		//                                                assignListeners
		assignListeners: function()
		{          
			var self = this;

			/*
			window.tEvent.addListener("FB_INIT", function(evt, data)
			{
				self.oFB = data;
			});
			*/
		},

		// ______________________________________________________________
		//                                         assignDynamicListeners
		assignDynamicListeners: function()
		{          
			var self = this;
		},


		// --------------------------------------------------------------
		// HELPERS
		// --------------------------------------------------------------        
		
		// ______________________________________________________________
		//                                                   showErrorMsg
		showErrorMsg: function (errorList, msg)
		{
			var self = this;        
			console.log(" * <forms.showErrorMsg> ", errorList);    
			var trackingErrorList = [];

			for (var i = 0; i < errorList.length; i++)
			{              
				// input red outline
				$("#" + errorList[i].id).addClass("error-field");

				//field error message
				$("#" + errorList[i].id).siblings(".error-msg").html(errorList[i].message).css("display", "block");

				//add to tracking list
				trackingErrorList.push(errorList[i].name);                        
			}

			if (errorList.length > 0)
			{
				msg = self.STR_ERROR_SUBMISSION;                
			}

			var pErrorMsg = $(self.CLASS_ERROR_BOX);
			pErrorMsg.css("visibility", "visible");
			pErrorMsg.html(msg);
		},

		// ______________________________________________________________
		//                                                showSubmitError
		showSubmitError: function (data)
		{
			var result = false;
			if (data.error !== null)
			{
				result = true;
				$(this.CLASS_ERROR_BOX).html(data.error).css("visibility", "visible");
			}
			return (result);
		},

		// ______________________________________________________________
		//                                              prepareFormSubmit
		prepareFormSubmit: function ()
		{
			// hide submit button
			$(this.CLASS_FORM_SUBMIT).css("display", "none");

			//show loading icon
			$(this.CLASS_LOADING).css("display", "block");

			// clear error fields
			$(this.CLASS_ERROR_MSG).css("display", "none");
			$(this.CLASS_ERROR_FIELD).removeClass("error-field");
			$(this.CLASS_ERROR_BOX).css("visibility", "hidden");
		},


		// ______________________________________________________________
		//                                                      formReset
		formReset: function ()
		{
			// hide submit button
			$(this.CLASS_FORM_SUBMIT).css("display", "block");

			//show loading icon
			$(this.CLASS_LOADING).css("display", "none");
		},


		// ______________________________________________________________
		//                                                   validateForm
		validateForm: function (arg)
		{
			var self = this;

			// validate
			var validator = new FormValidator(arg.formName, arg.validateList, function(errors, event) 
			{  
				// hide  loading
				self.formReset();

				if (errors.length > 0) 
				{       
					// show error message
					self.showErrorMsg(errors, errors[0].message);                 
				}       
				else
				{
					arg.callback();
				}        
			});
			validator._validateForm();
		}

		// --------------------------------------------------------------
		// EVENTS
		// --------------------------------------------------------------


	};

	var Class = constructor;
	Class.prototype = methods;

	var instance = new Class();
	
	return (instance);       
   
});