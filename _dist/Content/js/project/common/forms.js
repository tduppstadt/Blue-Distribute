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
	"common/model",  
	"common/services",  
	"validate"
], 

function (model, services) 
{
	// ---------------------------------------------------------------
	//
	// FORMS
	//
	// ---------------------------------------------------------------
	var constructor = function()
	{
		console.log(" * <forms>");

		var self = this;

		// core objects	
		this.oModel = model;
		this.oServices = services;

		this.STR_ERROR_FIELDS       = "Please complete the fields highlighted above.";
		this.STR_ERROR_SUBMISSION   = "There is an error in your submission data.";
		this.STR_SUBMISSION_SUCCESS = "Form Saved.";

		this.CSS_COLOR_ERROR  = "red";
		this.CSS_COLOR_NORMAL = "#a09ba1";

		this.CLASS_ERROR_BOX   = ".error-box";
		this.CLASS_ERROR_MSG   = ".error-msg";
		this.CLASS_ERROR_FIELD = ".error-field";
		this.CLASS_LOADING     = ".loading";
		this.CLASS_FORM_LABEL  = ".form-label"; 
		this.CLASS_FORM_SUBMIT = ".form-submit-button";

		this.init();
	};
	
	var methods =
	{

		// ______________________________________________________________
		//                                                           init
		init: function()
		{
			this.assignListeners();
		},

		// ______________________________________________________________
		//                                                assignListeners
		assignListeners: function()
		{
			// custom checkboxes          
			$("body").on("click", ".checkbox", function(event) 
			{            
				if ($(this).val() === "checked")
				{
					$(this).val("");
					$(this).siblings("input[type='checkbox']").prop('checked', false); 
				}
				else
				{
					$(this).val("checked");
					$(this).siblings("input[type='checkbox']").prop('checked', true); 
				}
				$(this).attr("data-value", $(this).val());  
				$(this).siblings(".form-label-checkbox").attr("data-value", $(this).val());
			});
		},

		// --------------------------------------------------------------
		// HELPERS
		// --------------------------------------------------------------
		
		// ______________________________________________________________
		//                                                   showErrorMsg
		showErrorMsg: function (errorList, msg)
		{
			console.log(" * <forms.showErrorMsg> ", errorList); 
			
			var self = this;        
			
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
			pErrorMsg.css("display", "block");
			pErrorMsg.html(msg);

			this.formReset();
		},

		// ______________________________________________________________
		//                                                showSubmitError
		showSubmitError: function (data)
		{
			var result = false;			

			this.formReset();
			
			if (data.error !== null && data.error !== "")
			{
				result = true;
				$(this.CLASS_ERROR_BOX).html(data.error).css("display", "block");
			}
			else
			{
				$(this.CLASS_ERROR_BOX).html(this.STR_SUBMISSION_SUCCESS).css("display", "block");
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
			$(this.CLASS_ERROR_BOX).css("display", "none");
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
