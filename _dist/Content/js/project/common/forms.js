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
		showErrorMsg: function (errorList, msg, parent)
		{
			console.log(" * <forms.showErrorMsg> ", errorList); 
			
			var self = this;        
			
			// get parent
			if (parent === undefined) 
			{
				parent = "";
			}
			else
			{
				parent = "[name='" + parent + "']";
			}

			var trackingErrorList = [];

			for (var i = 0; i < errorList.length; i++)
			{              
				// input red outline
				$("#" + errorList[i].id, parent).addClass("error-field");

				//field error message
				$("#" + errorList[i].id, parent).siblings(".error-msg").html(errorList[i].message).css("display", "block");

				//add to tracking list
				trackingErrorList.push(errorList[i].name);                        
			}

			if (errorList.length > 0)
			{
				msg = self.STR_ERROR_SUBMISSION;                
			}

			var pErrorMsg = $(self.CLASS_ERROR_BOX, parent);
			pErrorMsg.css("display", "block");
			pErrorMsg.html(msg);

			this.formReset();
		},

		// ______________________________________________________________
		//                                                showSubmitError
		showSubmitError: function (data, parent)
		{           
			var result = false;         

			if (parent === undefined) parent = "";

			this.formReset();
			
			if (data.error !== null && data.error !== "")
			{
				result = true;
				$(this.CLASS_ERROR_BOX, parent).html(data.error).css("display", "block");
			}
			else
			{
				$(this.CLASS_ERROR_BOX, parent).html(this.STR_SUBMISSION_SUCCESS).css("display", "block");
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
		//                                                 setCustomRules
		setCustomRules: function (validator)
		{
			// require at least one number in password
			validator.registerCallback('check_password', function(value) 
			{               
				if (/\d+/.test(value)) 
				{                   
					return true;
				}
				return false;
			});
			validator.setMessage('check_password', 'Please choose a stronger password using at least 1 number.');
			return(validator);
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
					self.showErrorMsg(errors, errors[0].message, arg.formName);                 
				}       
				else
				{
					arg.callback();
				}        
			});
			this.setCustomRules(validator);
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
