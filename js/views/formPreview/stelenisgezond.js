var cfgenwp_span_required = '<span class="cfgenwp-required">*</span>';

var cfgenwp_init_index_element = 0;

var cfgenwp_colorpicker_value;

var cfgenwp_colorpicker_target;

var cfgenwp_colorpicker_id;

var cfgenwp_colorpicker_csspropertyname;

var cfgenwp_saveform_btn_add = 'Save and create source files';

var cfgenwp_saveform_btn_update = 'Save and update';

var cfgenwp_googlewebfonts_added = Array();

var cfgenwp_elements_to_load = Array();

var cfgenwp_loaded_element_ids = Array(); // updated in index.php when a form is loaded, updated with the form's element list when clicking the save form button

var cfgenwp_element_container_default_height = {};	

var cfgenwp_bulkoptions_list_name_selected = '';

var cfgenwp_bulkoptions_element_type = '';

var cfgenwp_bulkoptions_target = '';

var cfgenwp_js_gwf_variants_url_param = '300italic,400italic,500italic,600italic,700italic,800italic,900italic,300,400,500,600,700,800,900';

// check if n is an integer
function cfgenwp_isInt(n) {
//	return typeof n === 'number' && n % 1 == 0;
	return n % 1 === 0;
}

jQuery(function(){
	jQuery('.cfgenwp-show-bulkoptions').fancybox({autoSize:false, width:450, height:420});

	jQuery('.cfgenwp-header-btn, .cfgenwp-addelement, .cfgenwp-choice-confirmationmessage').disableSelection();


	jQuery('body').on('mouseup','.cfgenwp-input-code', function(){
		jQuery(this).select();
	});
	
	
	jQuery('body').on('change', '.cfgenwp-insertfieldvalue', function(){
		//console.log(jQuery(this).val());
		
		if(jQuery(this).val()) // no val for the default option (insert value)
		{
			var cfgenwp_selectinsertfield_value = jQuery(this).val();
			
			var cfgenwp_target_insertfieldvalue = jQuery(this).closest('.cfgenwp-formconfig-r').find('.cfgenwp-target-insertfieldvalue');
			
			if(!isNaN(parseFloat(cfgenwp_selectinsertfield_value)) && isFinite(cfgenwp_selectinsertfield_value)){
				var cfgenwp_between_braces = jQuery('option:selected', this).html()+'|'+cfgenwp_selectinsertfield_value;
			} else{
				var cfgenwp_between_braces = cfgenwp_selectinsertfield_value;
			}
			
			var cfgenwp_target_braces = '{'+cfgenwp_between_braces+'}';
			
			cfgenwp_target_insertfieldvalue.cfgenwp_insertAtCaret(cfgenwp_target_braces);
			
		}
		
	});



	jQuery('#cfgenwp-activecolumns, #cfgenwp-inactivecolumns').sortable({
		placeholder: 'cfgenwp-ui-state-highlight'
		,connectWith: '.cfgenwp-connectedSortable'
		,receive: function( event, ui ){
			if(ui.item.is('.cfgenwp-column-active'))
			{
				ui.item.removeClass('cfgenwp-column-active').addClass('cfgenwp-column-inactive');
			} else{
				ui.item.removeClass('cfgenwp-column-inactive').addClass('cfgenwp-column-active');
			}
		}
		,cancel:'.cfgenwp-exclude-from-sortable'
	}).disableSelection();

	// hide the colorpicker when the user click outside of it (necessary when displaying the colorpicker from the cfgenwp-colorpicker-ico)
	jQuery(document).mouseup(function (e)
	{
		//console.log(e.target);
		var container = jQuery('.cfgenwp-colorpickerwheel-container');
	
		if(container.has(e.target).length === 0)
		{
			container.hide();
			
			// z-index default value must be 1 (check contactformeditor.css)
			// z-index is set to 2 in colorkit to put the colorpicker of the current element above the cfgenwp-element-editor-container of the element below
			container.closest('.cfgenwp-element-editor-container').css({'z-index':'1'});
			
		}
	});
	
	
	
	// SET UP DIALOG BOX
	jQuery('#cfgenwp-dialog-message').dialog({
									autoOpen: false,
									modal: true,
									resizable:false,
									draggable:false,
									position: ['center', 200], width: 380
									});
	
	
	
	
	cfgenwp_addFormElement(cfgenwp_elements_to_load);
	
	
	/**
	 * SORTABLE ELEMENTS
	 */
	jQuery('#cfgenwp-formeditor').sortable({
		placeholder: 'ui-state-highlight'
		,handle: '.cfgenwp-move-element'
		,start: function(event, ui){
			jQuery('.ui-state-highlight').css({'height':ui.item[0]['offsetHeight']});
		}

	});
	
		
	/**
	 * MOVE ELEMENT
	 */
	 
	jQuery('body').on('mousedown','.cfgenwp-move-element', function(){
		jQuery(this).closest('.cfgenwp-elementmove').addClass('cfgenwp-elementisselected');
	});
	
	jQuery('body').on('mouseup','.cfgenwp-move-element',function(){
		jQuery(this).closest('.cfgenwp-elementmove').removeClass('cfgenwp-elementisselected');
	});
 
	 
	/**
	 * ADD ELEMENTS IN THE EDITOR
	 */
	function cfgenwp_addFormElement(elements)
	{
		
		if(cfgenwp_init_index_element<elements.length)
		{
			var json_element = {};
			
			for(var element_property in elements[cfgenwp_init_index_element])
			{  
				json_element[element_property] = elements[cfgenwp_init_index_element][element_property];
			}
			
			json_element['unique_hash_form_editor'] = cfgenwp_unique_hash_form_editor;
			
			json_element['default_fontfamily_formelement'] = cfgenwp_formeditor_config['default_fontfamily_formelement'];
			json_element['default_fontfamily_label'] = cfgenwp_formeditor_config['default_fontfamily_label'];
			json_element['default_fontfamily_paragraph'] = cfgenwp_formeditor_config['default_fontfamily_paragraph'];
			json_element['default_fontfamily_submit'] = cfgenwp_formeditor_config['default_fontfamily_submit'];
			json_element['default_fontfamily_title'] = cfgenwp_formeditor_config['default_fontfamily_title'];
			
			json_element['default_fontsize_formelement'] = cfgenwp_formeditor_config['default_fontsize_formelement'];
			json_element['default_fontsize_label'] = cfgenwp_formeditor_config['default_fontsize_label'];
			json_element['default_fontsize_paragraph'] = cfgenwp_formeditor_config['default_fontsize_paragraph'];
			json_element['default_fontsize_submit'] = cfgenwp_formeditor_config['default_fontsize_submit'];
			json_element['default_fontsize_title'] = cfgenwp_formeditor_config['default_fontsize_title'];
			
			json_element['default_fontweight_formelement'] = cfgenwp_formeditor_config['default_fontweight_formelement'];
			json_element['default_fontweight_label'] = cfgenwp_formeditor_config['default_fontweight_label'];
			json_element['default_fontweight_paragraph'] = cfgenwp_formeditor_config['default_fontweight_paragraph'];
			json_element['default_fontweight_submit'] = cfgenwp_formeditor_config['default_fontweight_submit'];
			json_element['default_fontweight_title'] = cfgenwp_formeditor_config['default_fontweight_title'];
			
			json_element['default_fontstyle_formelement'] = cfgenwp_formeditor_config['default_fontstyle_formelement'];
			json_element['default_fontstyle_label'] = cfgenwp_formeditor_config['default_fontstyle_label'];
			json_element['default_fontstyle_paragraph'] = cfgenwp_formeditor_config['default_fontstyle_paragraph'];
			json_element['default_fontstyle_submit'] = cfgenwp_formeditor_config['default_fontstyle_submit'];
			json_element['default_fontstyle_title'] = cfgenwp_formeditor_config['default_fontstyle_title'];
			
			json_element['default_color_formelement'] = cfgenwp_formeditor_config['default_color_formelement'];
			json_element['default_color_label'] = cfgenwp_formeditor_config['default_color_label'];
			json_element['default_color_paragraph'] = cfgenwp_formeditor_config['default_color_paragraph'];
			json_element['default_color_submit'] = cfgenwp_formeditor_config['default_color_submit'];
			json_element['default_color_title'] = cfgenwp_formeditor_config['default_color_title'];
			
			json_element['default_backgroundcolor_submit'] = cfgenwp_formeditor_config['default_backgroundcolor_submit'];
			json_element['default_bordercolor_submit'] = cfgenwp_formeditor_config['default_bordercolor_submit'];
			
			json_element['default_width_captcha'] = cfgenwp_formeditor_config['default_width_captcha'];
			json_element['default_width_date'] = cfgenwp_formeditor_config['default_width_date'];
			json_element['default_width_email'] = cfgenwp_formeditor_config['default_width_email'];
			json_element['default_width_input'] = cfgenwp_formeditor_config['default_width_input'];
			json_element['default_width_paragraph'] = cfgenwp_formeditor_config['default_width_paragraph'];
			json_element['default_width_phone'] = cfgenwp_formeditor_config['default_width_phone'];
			json_element['default_width_submit'] = cfgenwp_formeditor_config['default_width_submit'];
			json_element['default_width_textarea'] = cfgenwp_formeditor_config['default_width_textarea'];
			json_element['default_width_url'] = cfgenwp_formeditor_config['default_width_url'];
		
			json_element['default_height_textarea'] = cfgenwp_formeditor_config['default_height_textarea'];
			
			json_element['default_marginleft_submit'] = cfgenwp_formeditor_config['default_marginleft_submit'];
			
			json_element['default_backgroundcolor_inputformat'] = cfgenwp_formeditor_config['default_backgroundcolor_inputformat'];
			json_element['default_bordercolor_inputformat'] = cfgenwp_formeditor_config['default_bordercolor_inputformat'];
			json_element['default_borderradius_inputformat'] = cfgenwp_formeditor_config['default_borderradius_inputformat'];
			json_element['default_borderwidth_inputformat'] = cfgenwp_formeditor_config['default_borderwidth_inputformat'];
			json_element['default_padding_inputformat'] = cfgenwp_formeditor_config['default_padding_inputformat'];
			
			json_element['default_rows_textarea'] = cfgenwp_formeditor_config['default_rows_textarea'];
			
			json_element['default_height_separator'] = cfgenwp_formeditor_config['default_height_separator'];
			json_element['default_backgroundcolor_separator'] = cfgenwp_formeditor_config['default_backgroundcolor_separator'];
		
			json_element = JSON.stringify(json_element);
			// ^--- json_element must be a string, not an array. PHP error if array "Warning: json_decode() expects parameter 1 to be string, array given"
			
			//console.log(json_element);
			
			var cfgenw_addelement_loading_html = '<div class="cfgenwp-addelement-loading"><img src="'+cfgenwp_js_plugin_url_editor+'img/loading.gif" /></div>';
			
			if(jQuery('#cfgenwp-formeditor').find('.cfgenwp-submit').html() != null)
			{
				jQuery('#cfgenwp-formeditor').find('.cfgenwp-submit').last().closest('.cfgenwp-elementmove').before(cfgenw_addelement_loading_html);
			} else{
				jQuery('#cfgenwp-formeditor').append(cfgenw_addelement_loading_html);
			}
			
			
			jQuery.post(cfgenwp_js_plugin_url_editor+'inc/setupcontactform.php',
					{element:json_element},
					function(data)
					{
						// 	console.log(data);
						
						var cfgenwp_new_element = jQuery(data);
						
						var cfgenwp_new_element_id = cfgenwp_new_element.find('.cfgenwp-element-id').val();
						
						jQuery('.cfgenwp-addelement-loading').remove();

						// 2 elements can't have the same id
						if(jQuery('body').find('.cfgenwp-element-id[value='+cfgenwp_new_element_id+']').length)
						{
							
							//alert('This element already exists: '+cfgenwp_new_element_id);
							cfgenwp_addFormElement(elements);
						} else{
							
							cfgenwp_init_index_element++;
								
							if(jQuery('#cfgenwp-formeditor').find('.cfgenwp-submit').html() != null)
							{
								// .last() in case there are 2+ submit buttons in the form
								jQuery('#cfgenwp-formeditor').find('.cfgenwp-submit').last().closest('.cfgenwp-elementmove').before(data);
							} else{
								jQuery('#cfgenwp-formeditor').append(data);
							}
			
							jQuery('.cfgenwp-editor-element-container').fadeIn();
							
							
							cfgenwp_addFormElement(elements);
						}
					});
		}
		
		if(cfgenwp_init_index_element==elements.length)
		{
			cfgenwp_init_index_element = 0;
		}

		jQuery('.cfgenwp-sortoption-container').sortable({
				placeholder: 'ui-state-highlight'
				,handle: '.cfgenwp-sortoption-handle'
				,update: function(event, ui)
					{
										
						var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
						
						var cfgewp_add_custom_values = false;
						
						if(editor_element_container.find('.cfgenwp-customoptionvalue-toggle').is(':checked')){
							cfgewp_add_custom_values = true;
						}
						
						if(editor_element_container.find('.cfgenwp-element-container select'))
						{
							// clean previously checked elements
							editor_element_container.find('.cfgenwp-element-container select option').each(function(){jQuery(this).prop('selected', false)});

							
							editor_element_container
									.find('.cfgenwp-editoption-container')
									.each(function(){
										
										var containerindex = jQuery(this).index();
										
										var newoptionlabel = jQuery(this).find('.cfgenwp-editoption-input-label').val();
										
										if(cfgewp_add_custom_values){
											var newoptionvalue = jQuery(this).find('.cfgenwp-editoption-input-value').val();
										} else{
											var newoptionvalue = newoptionlabel;
										}
										
										var optioncontent = editor_element_container.find('.cfgenwp-element-container select option:eq('+containerindex+')');
										
										optioncontent.val(newoptionvalue);
										
										optioncontent.html(newoptionlabel);
										
										// new check status
										if(jQuery(this).closest('.cfgenwp-editoption-container').find('.cfgenwp-option-selected').length){
											optioncontent.prop('selected', true);
										}
									});
						}
						
						if(editor_element_container.find('.cfgenwp-element-container radio') || jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container checkbox'))
						{
							// clean previously checked elements
							editor_element_container.find('.cfgenwp-option-content input').each(function(){jQuery(this).prop('checked', false)});
							
							editor_element_container
									.find('.cfgenwp-editoption-container')
									.each(function(){
										
										var containerindex = jQuery(this).index();

										var newoptionlabel = jQuery(this).find('.cfgenwp-editoption-input-label').val();
										
										if(cfgewp_add_custom_values){
											var newoptionvalue = jQuery(this).find('.cfgenwp-editoption-input-value').val();
										} else{
											var newoptionvalue = newoptionlabel;
										}
										
										var optioncontent = editor_element_container.find('.cfgenwp-option-content:eq('+containerindex+')');

										optioncontent.find('input').val(newoptionvalue);
										
										optioncontent.find('label').text(newoptionlabel);
										
										// new check status
										if(jQuery(this).closest('.cfgenwp-editoption-container').find('.cfgenwp-option-selected').length){
											optioncontent.find('input').prop('checked', true);
										}
										
									});
							
						}
					} // end update method
		}); // end sortable
		
		
		cfgen_returnToFormEdition();
	}
	
	
	
	jQuery('#cfgenwp-addCheckbox').click(function(){
		cfgenwp_addFormElement([{'type':'checkbox'}]);
	});
	
	jQuery('#cfgenwp-addDate').click(function(){
		cfgenwp_addFormElement([{'type':'date'}]);
	});
	
	jQuery('#cfgenwp-addEmail').click(function(){
		cfgenwp_addFormElement([{'type':'email'}]);
	});
	
	jQuery('#cfgenwp-addImage').click(function(){
		cfgenwp_addFormElement([{'type':'image'}]);
	});
	
	jQuery('#cfgenwp-addInputHidden').click(function(){
		cfgenwp_addFormElement([{'type':'hidden'}]);
	});
	
	jQuery('#cfgenwp-addInputText').click(function(){
		cfgenwp_addFormElement([{'type':'text'}]);
	});
	
	jQuery('#cfgenwp-addParagraph').click(function(){
		cfgenwp_addFormElement([{'type':'paragraph'}]);
	});
	
	jQuery('#cfgenwp-addPhone').click(function(){
		cfgenwp_addFormElement([{'type':'phone'}]);
	});
	
	jQuery('#cfgenwp-addRadio').click(function(){
		cfgenwp_addFormElement([{'type':'radio'}]);
	});
	
	jQuery('#cfgenwp-addSelect').click(function(){
		cfgenwp_addFormElement([{'type':'select'}]);
	});
	
	jQuery('#cfgenwp-addSelectMultiple').click(function(){
		cfgenwp_addFormElement([{'type':'selectmultiple'}]);
	});
	
	jQuery('#cfgenwp-addSeparator').click(function(){
		cfgenwp_addFormElement([{'type':'separator'}]);
	});
	
	jQuery('#cfgenwp-addSubmit').click(function(){
		if(jQuery('.cfgenwp-submit').length)
		{
			
			jQuery('#cfgenwp-dialog-message').html('<p>There can be only one submit button in the form.</p>');
			
			jQuery('#cfgenwp-dialog-message').dialog({
					autoOpen: true,
					title: 'Error',
					buttons:{
						Ok: function(){jQuery(this).dialog('close');}
					}
			});		
			
			
		} else{
			cfgenwp_addFormElement([{'type':'submit'}]);
		}
	});
	
	jQuery('#cfgenwp-addTextArea').click(function(){
		cfgenwp_addFormElement([{'type':'textarea'}]);
	});
	
	jQuery('#cfgenwp-addTitle').click(function(){
		cfgenwp_addFormElement([{'type':'title'}]);
	});
	
	jQuery('#cfgenwp-addTime').click(function(){
		cfgenwp_addFormElement([{'type':'time'}]);
	});
	
	jQuery('#cfgenwp-addUpload').click(function(){
		cfgenwp_addFormElement([{'type':'upload'}]);
	});
	
	jQuery('#cfgenwp-addUrl').click(function(){
		cfgenwp_addFormElement([{'type':'url'}]);
	});
	
	jQuery('#cfgenwp-addCaptcha').click(function(){
		
		if(jQuery('.cfgenwp-captcha-img').length)
		{
			
			jQuery('#cfgenwp-dialog-message').html('<p>There can be only one captcha field in the form.</p>');
			
				jQuery('#cfgenwp-dialog-message').dialog({
					autoOpen: true,
					title: 'Error',
					buttons:{
						Ok: function(){jQuery(this).dialog('close');}
					}
				});		
			
			
		} else{
			cfgenwp_addFormElement([{'type':'captcha'}]);
		}
	});
	
	
	
	
	/**
	 * ELEMENT ROLLOVER
	 */
	
	jQuery('body').on('mouseenter', '.cfgenwp-editor-element-container', function(){
		jQuery(this).find('.cfgenwp-element-editor-container').fadeIn(60);
		jQuery(this).addClass('cfgenwp-elementisselected');
		
	});
	
	jQuery('body').on('mouseleave', '.cfgenwp-editor-element-container', function(){
	
		if(!jQuery(this).find('.cfgenwp-content-editor').is(':visible'))
		{
			jQuery(this).find('.cfgenwp-element-editor-container').hide();
			jQuery(this).removeClass('cfgenwp-elementisselected');
		}
	});
	
	
	
	/**
	 * SELECT A STYLE ( FONTS AND COLORS )
	 */
	jQuery('#cfgenwp-select-style').click(function(){
										   
		jQuery('.cfgenwp-genericstyle-container.cfgenwp-genericstyle-input-container').hide();
		
		var cfgenwp_genericstyle_text_container = jQuery('.cfgenwp-genericstyle-container.cfgenwp-genericstyle-text-container');
		if(cfgenwp_genericstyle_text_container.is(':visible')){
			cfgenwp_genericstyle_text_container.slideUp(100);
		} else{
			cfgenwp_genericstyle_text_container.fadeIn(160);
		}
	
		cfgen_returnToFormEdition();
	});
	
	
	/**
	 * TEXT INPUT FORMAT
	 */
	jQuery('#cfgenwp-textinputformat').click(function(){
											  
		jQuery('.cfgenwp-genericstyle-container.cfgenwp-genericstyle-text-container').hide();
		
		var cfgenwp_genericstyle_input_container = jQuery('.cfgenwp-genericstyle-container.cfgenwp-genericstyle-input-container');
		
		if(cfgenwp_genericstyle_input_container.is(':visible')){
			cfgenwp_genericstyle_input_container.slideUp(100);
		} else{
			cfgenwp_genericstyle_input_container.fadeIn(160);
		}

		cfgen_returnToFormEdition();
	});
	
	
	/**
	 * EXPAND ALL / COLLAPSE ALL
	 */
	jQuery('.cfgenwp-expandall').click(function(){
		jQuery(this).hide();
		jQuery('.cfgenwp-collapseall').show();
		jQuery('.cfgenwp-editor-element-container').addClass('cfgenwp-elementisselected');
		
		jQuery('.cfgenwp-editor-element-container').each(function(){
											  
			var btn_hook = jQuery(this).find('.cfgenwp-element-btn-configuration');
			
			if(!btn_hook.length)
			{	// paragraph elements don't have elementconfiguration btn
				btn_hook = jQuery(this).find('.cfgenwp-element-btn-paragraph');
			}
			//console.log(btn_hook);
			
			cfgenwp_configureElementContainerHeight(btn_hook, 'expandall');
			
		});
	});
	
	jQuery('.cfgenwp-collapseall').click(function(){
		jQuery(this).hide();
		jQuery('.cfgenwp-expandall').show();
		jQuery('.cfgenwp-editor-element-container').removeClass('cfgenwp-elementisselected');
		
		jQuery('.cfgenwp-editor-element-container').each(function(){
											  
			var btn_hook = jQuery(this).find('.cfgenwp-element-btn-configuration');
			
			if(!btn_hook.length)
			{	// paragraph elements don't have elementconfiguration btn
				btn_hook = jQuery(this).find('.cfgenwp-element-btn-paragraph');
			}
			//console.log(btn_hook);
			
			cfgenwp_configureElementContainerHeight(btn_hook, 'collapseall');
			
		});
		
	});
	
	
	// SHOW AND SET BULK OPTIONS
	jQuery('body').on('click', '.cfgenwp-show-bulkoptions', function(){
		jQuery('.cfgenwp-bulkoptions').removeClass('cfgenwp-bulkoptions-selected');
		
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');

		cfgenwp_bulkoptions_element_type = editor_element_container.find('.cfgenwp-exportelement-type').val();
		
		if(cfgenwp_bulkoptions_element_type == 'select'){
			cfgenwp_bulkoptions_target = editor_element_container.find('.cfgenwp-type-select');
		}
		
		if(cfgenwp_bulkoptions_element_type == 'selectmultiple'){
			cfgenwp_bulkoptions_target = editor_element_container.find('.cfgenwp-type-selectmultiple');
		}
		
		if(cfgenwp_bulkoptions_element_type == 'checkbox' || cfgenwp_bulkoptions_element_type == 'radio'){
			cfgenwp_bulkoptions_target = editor_element_container.find('.cfgenwp-option-set');
		}
		
	});
	
	
	// CLEAR FORM
	jQuery('#cfgenwp-clearform').click(function(){
								   
		var html = '<p>Are you sure you want clear this form and delete all its elements? There is no undo.</p>';
		
		if(jQuery('#cfgenwp-form-id').val())
		{
			html += '<p>You are currently working on form #'+jQuery('#cfgenwp-form-id').val()+'. ';
			html += 'If you want to create a new form with a new #id, click on the "New form" button in the top right corner instead.</p>';
		};
		
		jQuery('#cfgenwp-dialog-message').html(html);
		
		jQuery('#cfgenwp-dialog-message').dialog({
			autoOpen: true,
			title: 'Clear form',
			buttons: {
								
				'Delete all items': function() {
					jQuery(this).dialog('close');
					jQuery('#cfgenwp-formeditor').empty();
					cfgen_returnToFormEdition();
				},
				Cancel: function() {
					jQuery(this).dialog('close');
				}
			}
		});
		
	});
	
	/***
	 * NEW FORM
	 */
	jQuery('#cfgenwp-newform').click(function(){

		jQuery('#cfgenwp-dialog-message').html('<p>Please select an option below to create your new form.</p>');
			
		jQuery('#cfgenwp-dialog-message').dialog({
				autoOpen: true,
				title: 'New form',
				buttons: {
							
					'Start from scratch': function() {
						jQuery(this).dialog('close');
						jQuery('#cfgenwp-formeditor').empty();
						jQuery('#cfgenwp-form-id').val('');
						cfgen_returnToFormEdition();
					},
					'Start with this template': function() {
						jQuery(this).dialog('close');
						jQuery('#cfgenwp-form-id').val('');
						cfgen_returnToFormEdition();
					},
					Cancel: function() {
						jQuery(this).dialog('close');
					}
					
				}
		});		
	});
	
	
	/**
	 * SHOW ELEMENT CONFIGURATION
	 */
	function cfgenwp_setElementContainerHeight(element_editor_to_toggle){
		

		var element_container = 	element_editor_to_toggle.closest('.cfgenwp-editor-element-container');
		//	element_container.css({'background-color': '#ff0033'});
		
		var container_default_height = parseInt(element_container.find('.cfgenwp-element-container').innerHeight());
		
		var element_editor_height = parseInt(element_container.find('.cfgenwp-element-editor-container').innerHeight());
		
		
		if(element_editor_height>container_default_height)
		{
			//	console.log('right editor >  left element');
			var new_element_container_height = element_editor_height;
		} else{
			// 	console.log('left element > right editor');
			var new_element_container_height = container_default_height;
		}
		
		element_container.css({'height':new_element_container_height});
		
		
		//	console.log('container_default_height: '+container_default_height);
		//	console.log('element_editor_height:' +element_editor_height);
		//	console.log('new_element_container_height = container_default_height+element_editor_height:' +new_element_container_height);
		// console.log('=============================');
	}
	
	
	function cfgenwp_configureElementContainerHeight(hook_target, mode)
	{
		var btn = jQuery(hook_target);
		var element_container = 	jQuery(hook_target).closest('.cfgenwp-editor-element-container');
		var element_container_id = 	element_container.find('.cfgenwp-element-id').val();
		var element_editor = element_container.find('.cfgenwp-content-editor');
		var element_editorcontainer = jQuery(hook_target).closest('.cfgenwp-element-editor-container'); // only for toggling the btn class
		
		if(!cfgenwp_element_container_default_height[element_container_id])
		{
			cfgenwp_element_container_default_height[element_container_id] = element_container.find('.cfgenwp-element-container').innerHeight();
		}
		
		if(btn.is('.cfgenwp-element-btn-configuration'))
		{
			element_container.find('.cfgenwp-edit-alignment-container').hide();
			element_container.find('.cfgenwp-edit-paragraph-container').hide();
			var element_editor_to_toggle = '.cfgenwp-edit-properties-container';
		}
		
		if(btn.is('.cfgenwp-element-btn-alignment'))
		{
			element_container.find('.cfgenwp-edit-properties-container').hide();
			element_container.find('.cfgenwp-edit-paragraph-container').hide();
			var element_editor_to_toggle = '.cfgenwp-edit-alignment-container';
		}
		
		if(btn.is('.cfgenwp-element-btn-paragraph'))
		{
			element_container.find('.cfgenwp-edit-properties-container').hide();
			element_container.find('.cfgenwp-edit-alignment-container').hide();
			var element_editor_to_toggle = '.cfgenwp-edit-paragraph-container';
		}
		element_editor_to_toggle = element_container.find(element_editor_to_toggle);
		
		var element_editor_height = parseInt(element_container.find(element_editor_to_toggle).innerHeight());

		
		if(parseInt(element_container.find('.cfgenwp-element-container').innerHeight()) >= cfgenwp_element_container_default_height[element_container_id])
		{
			//console.log('new content overlap');
			cfgenwp_element_container_default_height[element_container_id] = parseInt(element_container.find('.cfgenwp-element-container').innerHeight());
	
		}
		
		if(parseInt(element_container.find('.cfgenwp-element-container').innerHeight()) < element_editor_height)
		{
			//console.log('new content no overlap');
			cfgenwp_element_container_default_height[element_container_id] = element_container.innerHeight();

		}
		
		var slide_speed = 50;
		
		if(mode == 'toggle')
		{
			element_editor_to_toggle.slideToggle(slide_speed,
																	function(){
																		if(jQuery(this).is(':visible')){ // opened: adjust the container to the editor height
																			cfgenwp_setElementContainerHeight(element_editor_to_toggle);
																			
																			// /!\ /!\ the same adjustment must also be applied for mode = expandall
																			element_editorcontainer.find('.cfgenwp-editelement-menu-btn').removeClass('cfgenwp-editelement-menu-btn-active');
																			btn.addClass('cfgenwp-editelement-menu-btn-active');
	
																		} else{
																			// closed
																			// adjusted to cfgenwp-element-container innerHeight for the case when the height of the left content increases dynamically (paragraph value, textarea rows, adding options, paragraph value+element, etc)
																			// /!\ /!\ the same adjustment must also be applied when .cfgenwp-close-edit is clicked and for mode = collapseall
																			element_container.css({'height':parseInt(element_container.find('.cfgenwp-element-container').innerHeight())});
																			btn.removeClass('cfgenwp-editelement-menu-btn-active');
																		}
																	});
		}
		
		if(mode == 'expandall')
		{

			element_editor_to_toggle.slideDown(slide_speed,
																	function(){
																		//console.log('expand all');
																		btn.closest('.cfgenwp-element-editor-container').show(); // only for expand all
																		
																		cfgenwp_setElementContainerHeight(element_editor_to_toggle);
																		element_editorcontainer.find('.cfgenwp-editelement-menu-btn').removeClass('cfgenwp-editelement-menu-btn-active');
																		btn.addClass('cfgenwp-editelement-menu-btn-active');
																	});
		}
		
		if(mode == 'collapseall')
		{
			
			element_editor_to_toggle.slideUp(slide_speed,
																function(){
																	//console.log('collapse all');
																	btn.closest('.cfgenwp-element-editor-container').hide(); // only for collapse all
																	
																	element_container.css({'height':parseInt(element_container.find('.cfgenwp-element-container').innerHeight())});
																	btn.removeClass('cfgenwp-editelement-menu-btn-active');
																});
		}
	}
	
	
	jQuery('body').on('click', '.cfgenwp-element-btn-configuration, .cfgenwp-element-btn-alignment, .cfgenwp-element-btn-paragraph', function(){
		cfgenwp_configureElementContainerHeight(jQuery(this), 'toggle');
	});
	
	jQuery('body').on('click', '.cfgenwp-close-edit', function(){
												   
		var close_btn = jQuery(this);
		
		close_btn.css('cursor','default'); // prevent from having the hand cursor after the element slided up
		
		var element_container = 	jQuery(this).closest('.cfgenwp-editor-element-container');
		
		jQuery(this).closest('.cfgenwp-editor-element-container').removeClass('cfgenwp-elementisselected');
	
		jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-editor-container').slideUp(100,
																										function(){
																											jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-content-editor').hide();
																											close_btn.css('cursor','pointer'); // the element slidedup, the close button can gets its hand style
																											
																											// height adjustment (same adjustmen in on('click', '.cfgenwp-element-btn-configuration, .cfgenwp-element-btn-alignment, .cfgenwp-element-btn-paragraph',
																											element_container.css({'height':parseInt(element_container.find('.cfgenwp-element-container').innerHeight())});
																										});
		
	});
	
	
	
	/**
	 * EDIT LABEL
	 */

	jQuery('body').on('keyup focusout', '.cfgenwp-editlabel', function()
	{
		var element_type = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-exportelement-type').val();

		// TITLE
		if(element_type == 'title'){
			jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-title').text(jQuery(this).val());			
		}
		
		// SUBMIT
		else if(element_type == 'submit'){
			jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container input').val(jQuery(this).val());
		}
		
		else{
			jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container label:eq(0) .cfgenwp-label-value').text(jQuery(this).val());
		}
		
	});
	
	
	/**
	 * EDIT INPUT HIDDEN
	 */
	jQuery('body').on('keyup focusout', '.cfgenwp-editinputhidden', function()
	{
		jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container input').val(jQuery(this).val());
	});
	
	
	
	/**
	 * EDIT PARAGRAPH
	 */
	jQuery('body').on('keyup focusout', '.cfgenwp-edit-paragraph-content', function()
	{
		var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		var paragraph = element_container.find('.cfgenwp-paragraph');
		
		var text = jQuery(this).val().replace(/\r?\n|\r/g, '<br />');
		
		paragraph.html(text);
		
		
		if(paragraph.html())
		{ // ^-- labelfloatparagraphwidth
			paragraph.css({'width':element_container.find('.cfgenwp-slider-paragraph-width-value').val()+'px'});
		} else{
			paragraph.css({'width':''});
		}
		
		cfgenwp_adjustElementHeightToLeftContent(element_container);
	});
	
	
	
	/**
	 * EDIT IMAGE FROM URL
	 */
	jQuery('body').on('click', '.cfgenwp-addimagefromurl', function()
	{
		// get url value
		var image_url = jQuery.trim(jQuery(this).closest('.cfgenwp-content-editor').find('.cfgenwp-image-url').val());
		
		if(image_url)
		{
			var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
			
			// add image in the form
			element_container.find('.cfgenwp-addimagecontainer').remove();
			element_container.find('.cfgenwp-element-content').empty().append('<img src="'+image_url+'" />');
			jQuery(this).closest('.cfgenwp-content-editor').find('.cfgenwp-delimagefromurl').remove();
			
			// add delete button
			jQuery(this).after('<div><span class="cfgenwp-delimagefromurl">Delete</span></div>');
			
			// adjust element height after the image is loaded
			element_container.find('.cfgenwp-element-content img').load(function(){
				cfgenwp_adjustElementHeightToLeftContent(element_container);
			});
			
			
			
		}
		
	});
	
	/**
	 * DELETE IMAGE FROM URL
	 */
	jQuery('body').on('click', '.cfgenwp-delimagefromurl', function()
	{
		jQuery(this).closest('.cfgenwp-content-editor').find('.cfgenwp-image-url').val('');
		cfgenwp_resetImageContainer(jQuery(this));
		jQuery(this).closest('.cfgenwp-content-editor').find('.cfgenwp-delimagefromurl').remove(); // must come after cfgenwp_resetImageContainer as the dom element is passed as an argument in the function
		
		// the height adjustment of the element container is done inside cfgenwp_resetImageContainer
	});
	
	
	/**
	 * RESET IMAGE CONTAINER
	 */
	function cfgenwp_resetImageContainer(e){
		jQuery(e).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-content').empty().append(cfgenwp_formeditor_config['html_empty_image_container']);
		
		cfgenwp_setElementContainerHeight(jQuery(e).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
	}


	/**
	 * EDIT LABEL PLACEMENT AND ALIGNMENT
	 */
	jQuery('body').on('click', '.cfgenwp-label-positionning', function(){
		
		// display: block; already set in contactform.css for cfgenwp-label
		var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		if(jQuery(this).is('.cfgenwp-aligntop'))
		{
			// 'width':'' remove the width property if clicked after left or right alignment
			element_container.find('.cfgenwp-label').css({'float':'none', 'text-align':'left', 'width':''});
			
			element_container.find('.cfgenwp-elementeditor-label-width').slideUp(50, function(){
																								element_container
																								.find('.cfgenwp-elementeditor-option-margintop')
																								.slideUp(50, function(){
																									cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
																								});
																						  });
			
			element_container.find('.cfgenwp-sliderelement-label-width-value').val(0);
			
			// reset option margin to^^
			element_container.find('.cfgenwp-sliderelement-option-margintop-value').val(cfgenwp_formeditor_config['default_margintop_option']);
			element_container.find('.cfgenwp-elementeditor-option-margintop').find('.ui-slider').slider('option', 'value', cfgenwp_formeditor_config['default_margintop_option']);

		}
		
		if(jQuery(this).is('.cfgenwp-alignleft'))
		{
			element_container.find('.cfgenwp-label').css({'text-align':'left'});
		}
		
		if(jQuery(this).is('.cfgenwp-alignright'))
		{
			element_container.find('.cfgenwp-label').css({'text-align':'right'});
		}
		
		if(jQuery(this).is('.cfgenwp-alignleft') || jQuery(this).is('.cfgenwp-alignright'))
		{
			if(!element_container.find('.cfgenwp-elementeditor-label-width').is(':visible')) // prevents reseting the slider and element position by clicking on cfgenwp-alignleft after using the width slider
			{
				// removes the width of the paragraph (else the paragraph width will make the right content not take the full right side width. Can be verified with checkbox for example. Ref: labelfloatparagraphwidth )
				var paragraph = element_container.find('.cfgenwp-paragraph');
				if(!paragraph.html())
				{
					paragraph.css({'width':''});
					
				}
				
				element_container.find('.cfgenwp-element-set').css({'float':'left'}); 
				
				element_container.find('.cfgenwp-sliderelement-label-width-value').val(cfgenwp_formeditor_config['default_width_label']); // inserting the label width in the json data is based on the width value in the input
				
				element_container.find('.cfgenwp-elementeditor-label-width').find('.ui-slider').slider('option', 'value', cfgenwp_formeditor_config['default_width_label']);
	
				element_container.find('.cfgenwp-label').css({'float':'left', 'width':element_container.find('.cfgenwp-sliderelement-label-width-value').val()+'px'});

				element_container.find('.cfgenwp-elementeditor-label-width').slideDown(50, function(){
																									
																									// for radio and checkbox elements (the containerHeight must be set after the margin top edit box appears
																									if(element_container.find('.cfgenwp-elementeditor-option-margintop').length)
																									{
																										element_container
																										.find('.cfgenwp-elementeditor-option-margintop')
																										.slideDown(50, function(){
																											  cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
																										});
																									} 
																									// for the other input elements having labels
																									else{
																										 cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
																									}
																						
																						  		});
			}
			
		}
			
		cfgenwp_adjustElementSetWidth(jQuery(this)); // must be called in anycase to set or remove cfgenwp-element-set width

	});
	

	/**
	 * EDIT OPTION PLACEMENT AND ALIGNMENT
	 */
	jQuery('body').on('click', '.cfgenwp-option-positionning', function(){
		
		// display: block; alrady set in contactform.css for cfgenwp-label
		var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		if(jQuery(this).is('.cfgenwp-aligntop'))
		{
			// 'width':'' remove the width property if clicked after left or right alignment
			element_container.find('.cfgenwp-option-content').css({'float':'none', 'text-align':'left', 'width':''});
			
			element_container.find('.cfgenwp-elementeditor-option-width').slideUp(100, function(){
																								  		cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
																								});
			
			element_container.find('.cfgenwp-sliderelement-option-width-value').val(0); // inserting the label width in the json data is based on the width value in the input
		}
		
		if(jQuery(this).is('.cfgenwp-alignleft'))
		{
			
			if(!element_container.find('.cfgenwp-elementeditor-option-width').is(':visible')) // prevents reseting the slider and element position by clicking on cfgenwp-alignleft after using the width slider
			{
				element_container.find('.cfgenwp-sliderelement-option-width-value').val(cfgenwp_formeditor_config['default_width_option']); // inserting the label width in the json data is based on the width value in the input
				
				element_container.find('.cfgenwp-elementeditor-option-width').find('.ui-slider').slider('option', 'value', cfgenwp_formeditor_config['default_width_option']);
				
				cfgen_applyAlignLeftToOptions(element_container);
				
				element_container.find('.cfgenwp-elementeditor-option-width').slideDown(100, function(){
																								  		cfgenwp_setElementContainerHeight(element_container.find('.cfgenwp-edit-properties-container'));
																								  });
			}
			
		}

		cfgenwp_adjustElementSetWidth(jQuery(this)); // must be called in anycase to set or remove cfgenwp-element-set width
		
	
	});
	
	function cfgen_buildAlignOptionLeftCss(css)
	{
		return ({'float':'left', 'width':css['width']+'px'});
	}
	

	/**
	 * EDIT TIME - ADD REMOVE AM PM
	 */
	jQuery('body').on('click', '.cfgenwp-12hourclock', function(){
		var houroptions = cfgenwp_buildSelectHourOptions(12);
		
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		editor_element_container.find('.cfgenwp-time-ampm-container').css({'display':'inline-block'}); // not show() or the alignment with 00:00 would break
		editor_element_container.find('.cfgenwp-time-hour').empty().append(houroptions);
	});
	
	jQuery('body').on('click', '.cfgenwp-24hourclock', function(){
		var houroptions = cfgenwp_buildSelectHourOptions(24);
		
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		editor_element_container.find('.cfgenwp-time-ampm-container').hide();
		editor_element_container.find('.cfgenwp-time-hour').empty().append(houroptions);
	});
	
	
	function cfgenwp_buildSelectHourOptions(timeformat)
	{
		var houroptions = '';
		
		if(timeformat == 12){
			var i_start = 1;
			var i_end = 13;
		}
		if(timeformat == 24){
			var i_start = 0;
			var i_end = 24;
		}
		
		for(var i = i_start; i < i_end; i++){ 
			var i_zeropadding = ('00' + i.toString()).substr(i.toString().length);
			houroptions += "\r\n\t"+'<option value="'+i_zeropadding+'">'+i_zeropadding+'</option>';
		}
		
		return houroptions;
	}
	
	
	/*
	 * EDIT OPTION VALUE
	 */

	jQuery('body').on('keyup focusout', '.cfgenwp-editoption-input-label', function(){
		
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		if( jQuery(this).hasClass('cfgenwp-option-type-radio') || jQuery(this).hasClass('cfgenwp-option-type-checkbox') )
		{
			var inputindex = jQuery(this).parent().index();
			editor_element_container.find('.cfgenwp-option-content:eq('+inputindex+') label').text(jQuery(this).val());
			editor_element_container.find('.cfgenwp-option-content:eq('+inputindex+') input').val(jQuery(this).val());
		}
		
		if(jQuery(this).hasClass('cfgenwp-option-type-select') || jQuery(this).hasClass('cfgenwp-option-type-selectmultiple'))
		{
			var inputindex = jQuery(this).parent().index();
			newoption = jQuery(this).val();
	
			var selectedoption_index = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container select option:selected').index(); // FF: focus on the current selected option
	
			editor_element_container.find('.cfgenwp-element-container select option:eq('+inputindex+')').val(jQuery(this).val());
			editor_element_container.find('.cfgenwp-element-container select option:eq('+inputindex+')').text(jQuery(this).val());
			editor_element_container.find('.cfgenwp-element-container select option:eq('+selectedoption_index+')').prop('selected',true); // FF: focus on the current selected option
		}
	});
	

	
	
	/**
	 * DELETE OPTION
	 */

	jQuery('body').on('click', '.cfgenwp-deleteoption', function()
	{
		var delete_btn = jQuery(this);
		var inputindex = jQuery(this).parent().index();
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		if(editor_element_container.find('.cfgenwp-editoption-container').length ==1)
		{
			
			jQuery('#cfgenwp-dialog-message').html('<p>You can\'t delete all choices.</p>');
			
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
					}
				}
			});
				
			return false;
			
		} else
		{
			
			if( jQuery(this).hasClass('cfgenwp-option-type-radio') || jQuery(this).hasClass('cfgenwp-option-type-checkbox') )
			{
			
				editor_element_container.find('.cfgenwp-option-content:eq('+inputindex+')').remove();
			}
			
			if(jQuery(this).hasClass('cfgenwp-option-type-select') || jQuery(this).hasClass('cfgenwp-option-type-selectmultiple'))
			{
				editor_element_container.find('.cfgenwp-element-container select option:eq('+inputindex+')').remove();		
			}
			
			jQuery(this).closest('.cfgenwp-editoption-container').slideUp(100,function(){
																		  cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container')); // must be called before the removal of the button, or it won't work, since delete_btn is removed
																		  
																		  jQuery(this).remove();// must be called after inputindex, else index returns -1
																		  
																		  }); 
		}
		
		
	});



	function cfgenwp_formatOptionWithCurrentInputFormat(target){
		// apply the current style of formelement to .cfgenwp-formelement
		// if not applied, the new options added keep the loaded default format values of formelements
		target.css('font-family', cfgenwp_formeditor_config['default_fontfamily_formelement']);
		target.css('font-size', cfgenwp_formeditor_config['default_fontsize_formelement']+'px');
		target.css('color', cfgenwp_formeditor_config['default_color_formelement']);
		target.css('font-style', cfgenwp_formeditor_config['default_fontstyle_formelement']);
		target.css('font-weight', cfgenwp_formeditor_config['default_fontweight_formelement']);
	}

	function cfgenwp_updateInputAndLabelHtmlId(target_element_container){
		var element_id = target_element_container.find('.cfgenwp-element-id').val();

		target_element_container.find('.cfgenwp-option-content').each(function()
		{
			var option_container = jQuery(this).closest('.cfgenwp-option-content');
			var option_index = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-option-content').index(option_container);
			//console.log(jQuery(this).index()+ ' / '+option_index);
			
			jQuery(this).find('input').prop('id', cfgenwp_element_name_prefix+element_id+'-'+option_index)
											.prop('name', cfgenwp_element_name_prefix+element_id);
											
			// the id attribute for option label is useless
			jQuery(this).find('label').prop('for', cfgenwp_element_name_prefix+element_id+'-'+option_index);
				
		});
	}


	/**
	 * ADD OPTION
	 */
	jQuery('body').on('click', '.cfgenwp-addoption', function()
	{
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		var edit_option_container = jQuery(this).closest('.cfgenwp-editoption-container');
		
		var inputindex = jQuery(this).parent().index();
		
		var element_id = editor_element_container.find('.cfgenwp-element-id').val();
		
		if(jQuery(this).hasClass('cfgenwp-option-type-radio'))
		{
			
			// form option
			editor_element_container.find('.cfgenwp-option-content:eq('+inputindex+')').after(cfgenwp_formeditor_config['html_optionradiocontainer']);
			
			// editform option
			edit_option_container.after(cfgenwp_formeditor_config['html_editoptionradiocontainer']);
			
		}
		
		if(jQuery(this).hasClass('cfgenwp-option-type-checkbox'))
		{
			// form option
			editor_element_container.find('.cfgenwp-option-content:eq('+inputindex+')').after(cfgenwp_formeditor_config['html_optioncheckboxcontainer']);
		
			// editform option
			edit_option_container.after(cfgenwp_formeditor_config['html_editoptioncheckboxcontainer']);
		}
		
		
		// update id, name and for attributes on the input and on the label
		if(jQuery(this).hasClass('cfgenwp-option-type-radio') || jQuery(this).hasClass('cfgenwp-option-type-checkbox'))
		{
			
			cfgenwp_updateInputAndLabelHtmlId(editor_element_container);
		

			// apply the current style of formelement to .cfgenwp-formelement
			// if not applied, the new options added keep the loaded default format values of formelements
			var html_form_newoption_container = editor_element_container.find('.cfgenwp-option-content:eq('+(inputindex+1)+')');
			
			cfgenwp_formatOptionWithCurrentInputFormat(html_form_newoption_container);
			
			// alignment: only apply to current and new options when the alignment is set to left
			if(editor_element_container.find('.cfgenwp-option-positionning:checked').val() == 'cfgenwp-alignleft')
			{
				cfgen_applyAlignLeftToOptions(editor_element_container);
			}

		
		}
		
		if(jQuery(this).hasClass('cfgenwp-option-type-select') || jQuery(this).hasClass('cfgenwp-option-type-selectmultiple'))
		{
		
			// form option
			editor_element_container.find('.cfgenwp-element-container select option:eq('+inputindex+')').after(cfgenwp_formeditor_config['html_selectoption']);
			
			// editform option
			if(jQuery(this).hasClass('cfgenwp-option-type-select'))
			{
				edit_option_container.after(cfgenwp_formeditor_config['html_editselectoptioncontainer']);
			}
			
			if(jQuery(this).hasClass('cfgenwp-option-type-selectmultiple'))
			{
				edit_option_container.after(cfgenwp_formeditor_config['html_editselectmultipleoptioncontainer']);
			}
			
			
		}
		
		var next_option_container = jQuery(this).closest('.cfgenwp-editoption-container').next();
		
		// split? same procedure for addoption and addbulkoption
		if(editor_element_container.find('.cfgenwp-customoptionvalue-toggle').is(':checked'))
		{
			next_option_container.find('.cfgenwp-editoption-input-label').addClass('cfgenwp-editoption-input-split');
			next_option_container.find('.cfgenwp-editoption-input-value').addClass('cfgenwp-editoption-input-split').show();
			next_option_container.find('.cfgenwp-editoption-input-value').val(next_option_container.find('.cfgenwp-editoption-input-label').val());
		}
		
		next_option_container.hide().slideDown(100, 
																		function(){
																			cfgenwp_setElementContainerHeight(editor_element_container.find('.cfgenwp-edit-properties-container'));
																		}
																);
		
		
	});




	/**
	 * SET DEFAULT OPTION
	 */
	
	jQuery('body').on('click', '.cfgenwp-defaultoption', function()
	{
		var inputindex = jQuery(this).parent().index();
		
		var editor_element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		// RADIO CHECKBOX
		if( jQuery(this).hasClass('cfgenwp-option-type-radio') || jQuery(this).hasClass('cfgenwp-option-type-checkbox') )
		{
				// clean previously checked elements
				editor_element_container.find('.cfgenwp-option-content input').each(function(){jQuery(this).prop('checked', false)});

				if(jQuery(this).hasClass('cfgenwp-option-type-radio'))
				{
					jQuery(this).closest('.cfgenwp-sortoption-container').find('.cfgenwp-default-option-radio-check').removeClass('cfgenwp-option-selected'); // for radio, all radio buttons must be reset in the editoption container
					
					// clean previously checked elements in editor
					editor_element_container.find('.cfgenwp-default-option-radio-check').hide(); // all radio buttons must be reset in the editoption container
					editor_element_container.find('.cfgenwp-default-option-radio-uncheck').show(); // all radio buttons must be reset in the editoption container
				}
				
				
				if(jQuery(this).hasClass('cfgenwp-default-option-radio-check'))
				{
					jQuery(this).removeClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).prev().show();
					
				} else{
					jQuery(this).next().addClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).next().show();
				}
				
				// foreach option checked, we check the associated input
				jQuery(this).closest('.cfgenwp-sortoption-container').find('.cfgenwp-option-selected').each(function()
				{
					var option_selected_index = jQuery(this).parent().index();
					//console.log(option_selected_index);
					jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-option-content input:eq('+option_selected_index+')').prop('checked', true);
				});
		}
		
		// SELECT
		if(jQuery(this).hasClass('cfgenwp-option-type-select'))
		{
				jQuery(this).closest('.cfgenwp-sortoption-container').find('.cfgenwp-default-option-radio-check').removeClass('cfgenwp-option-selected'); // for select, all radio buttons must be reset in the editoption container
		
				// clean previously checked elements
				editor_element_container.find('.cfgenwp-element-container select option').each(function(){jQuery(this).prop('selected', false)});
				editor_element_container.find('.cfgenwp-default-option-radio-uncheck').show(); // 2 for radio img, every radio button must be reset in the editoption container
				editor_element_container.find('.cfgenwp-default-option-radio-check').hide(); // 2 for radio img, every radio button must be reset in the editoption container
				
				if(jQuery(this).hasClass('cfgenwp-default-option-radio-check'))
				{
					jQuery(this).removeClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).prev().show();
					
					
					// all options are unselected after cleaning, if the same option is clicked twice, the focus is lost and a blank selection appears in IE and Chrome
					
					if(!editor_element_container.find('.cfgenwp-element-container select option:selected').html()){
						editor_element_container.find('.cfgenwp-element-container select option:eq(0)').prop('selected', true);
					}
				} else{
					jQuery(this).next().addClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).next().show();
					jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container select option:eq('+inputindex+')').prop('selected', true);
				}
		}

		// SELECT MULTIPLE
		if(jQuery(this).hasClass('cfgenwp-option-type-selectmultiple'))
		{
				// clean previously checked elements
				editor_element_container.find('.cfgenwp-element-container select option').each(function(){jQuery(this).prop('selected', false)});
				
				if(jQuery(this).hasClass('cfgenwp-default-option-radio-check'))
				{
					jQuery(this).removeClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).prev().show();
					
				} else{
					jQuery(this).next().addClass('cfgenwp-option-selected');
					jQuery(this).hide();
					jQuery(this).next().show();
				}
				
				// foreach option checked, we check the associated input
				jQuery(this).closest('.cfgenwp-sortoption-container').find('.cfgenwp-option-selected').each(function()
				{
					var option_selected_index = jQuery(this).parent().index();
					jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-container select option:eq('+option_selected_index+')').prop('selected', true);
				});
				
		}

	});

	
	jQuery('body').on('click', '.defaultselectoption', function(){
		var inputindex = jQuery(this).parent().index();
		
	});

	/**
	 * DATEPICKER FORMAT
	 */
	jQuery('body').on('change', '.cfgenwp-datepickerformat', function()
	{
		var input_target = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-type-date');
		input_target.datepicker('option', 'dateFormat', jQuery(this).val());
	});

	/**
	 * DATEPICKER LANGUAGE
	 */
	jQuery('body').on('change', '.cfgenwp-datepickerlanguage', function()
	{
		
		var input_target = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-type-date');
		input_target.datepicker('option', jQuery.datepicker.regional[jQuery(this).val()]);
		
		// re-apply the selected dateFormat because the regional includes its own dateformat
		input_target.datepicker('option', 'dateFormat', jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-datepickerformat').val());
	});


	/**
	 * CAPTCHA FORMAT
	 */
	jQuery('body').on('click', '#cfgenwp-captchaformat-letters, #cfgenwp-captchaformat-numbers, #cfgenwp-captchaformat-lettersandnumbers, .cfgenwp-captcha-refresh', function(){
		cfgen_updateCaptcha();
	});
	
	jQuery('body').on('change', '#cfgenwp-captcha-length', function(){
		cfgen_updateCaptcha();
	});
	
	
	
	function cfgen_updateCaptcha(){

		var captcha_length = jQuery('#cfgenwp-captcha-length').val();
		var captcha_format = jQuery('.cfgenwp-captchaformat:checked').val();
		
		jQuery('.cfgenwp-captcha-img').prop('src', cfgenwp_js_plugin_url_editor+'sourcecontainer/'+cfgenwp_js_dir_form_inc+'/inc/captcha.php?length='+captcha_length+'&format='+captcha_format+'&r=' + Math.random());
		
		
	}
	

	/**
	 * REQUIRED FIELD
	 */

	jQuery('body').on('click', '.cfgenwp-editrequired', function(){
		var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
		
		if(jQuery(this).is(':checked'))
		{
			/**
			 * IE problem: we check if the cfgenwp-required is already there to prevent the element from being appended twice 
			 * if the user clicks on the checkbox multiple times too quickly
			 * To have it working properly, we also must have the control separated from 'is checked' above
			 */
			if(!element_container.find('.cfgenwp-required').length){
				element_container.find('.cfgenwp-label').append(cfgenwp_span_required);
			}
			
		} else{
			element_container.find('.cfgenwp-required').remove();
		}
		
	});
	
	
	/**
	 * DELETE ELEMENT FROM THE EDITOR
	 */
	function cfgenwp_deleteElement(btn){
		
		btn.css('cursor','default'); // prevent from having the hand cursor after the element slided up

		btn.closest('.cfgenwp-elementmove').slideUp(100, function(){ jQuery(this).remove(); });
	}
	
	jQuery('body').on('click', '.cfgenwp-deleteelement', function(){
		
		var cfgenwp_deleteelement_btn = jQuery(this);
		
		var cfgenwp_element_type = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-exportelement-type').val();
		
		var cfgenwp_element_id = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val();

		
		// input element?
		if(jQuery.inArray(cfgenwp_element_type, cfgenwp_isinput_list) != -1){
		
			// dialog box only for elements that belongs to a form that has been loaded
			if(jQuery.inArray(cfgenwp_element_id, cfgenwp_loaded_element_ids) != -1){
				
				jQuery('#cfgenwp-dialog-message').html('<p>If you delete this element <span style="text-decoration:underline">and</span> save the changes for this form, the data associated with this specific field won\'t appear in the form entries anymore.</p>');
					
				jQuery('#cfgenwp-dialog-message').dialog({
						autoOpen: true,
						title: 'Delete field',
						buttons: {
							'Delete this field': function() {
								
								jQuery(this).dialog('close');
								
								cfgenwp_deleteElement(cfgenwp_deleteelement_btn);
							},
							Cancel: function() {
								jQuery(this).dialog('close');
							}
							
						}
				});
			} else{
				cfgenwp_deleteElement(cfgenwp_deleteelement_btn);
			}
		} else{
			
			cfgenwp_deleteElement(cfgenwp_deleteelement_btn);
		}
	});
	
	
	/**
	 * NEXT STEP - CONFIGURATION
	 */
	jQuery('#cfgenwp-gotoformconfiguration').click(function(){
		
		// ERROR: no submit button
		if(!jQuery('.cfgenwp-submit').length)
		{
			jQuery('#cfgenwp-dialog-message').html('<p>You forgot to insert a submit button in your form.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog({
					autoOpen: true,
					title: 'Error',
					buttons:{
						Ok: function(){jQuery(this).dialog('close');}
					}
			});
				
			return false;
		}
		
		// ADJUSTMENT: if no email field after having previously added one, the delivery receipt section must be hidden by default
		if(!jQuery('.cfgenwp-type-email').length)
		{
			jQuery('#cfgenwp_config_usernotification_activate').prop('checked', false);
			jQuery('#cfgenwp-deliveryreceiptconfiguration').hide();
		}
		
		
		// ERROR: A field name must be set for all hidden input fields
		if(jQuery('.cfgenwp-type-hidden').length)
		{
			var check_cfg_type_hidden_name_nok = false;
			
			jQuery('.cfgenwp-type-hidden').each(function()
			{
				
				if(!jQuery.trim(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-editlabel').val()))
				{
					jQuery('#cfgenwp-dialog-message').html('<p>A field name must be set for all hidden input fields in your form.</p>');
						
					jQuery('#cfgenwp-dialog-message').dialog(
					{
						autoOpen: true,
						title: 'Error',
						buttons: {
							Ok: function() {
								jQuery(this).dialog('close');
							}
						}
					});
					
					check_cfg_type_hidden_name_nok = true;
					
					return false; // only stops the each function
				}
			});
			
			if(check_cfg_type_hidden_name_nok)
			{
				return false; // we stay in the 1st step of the form builder
			}
		}
		
		// ERROR: At least one phone format must be checked for phone fields
		if(jQuery('.cfgenwp-type-phone').length)
		{
			var cfgenwp_phonevalidation_checked_nok = false;
			
			jQuery('.cfgenwp-type-phone').each(function()
			{
				
				var cfgenwp_phonevalidation_checked = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp_phonevalidation:checked');
				
				if(!cfgenwp_phonevalidation_checked.length){
					jQuery('#cfgenwp-dialog-message').html('<p>You must select at leat one phone number format for all phone fields in your form.</p>');
							
					jQuery('#cfgenwp-dialog-message').dialog(
					{
						autoOpen: true,
						title: 'Error',
						buttons: {
							Ok: function() {
								jQuery(this).dialog('close');
							}
						}
					});
					
					cfgenwp_phonevalidation_checked_nok = true;
					
					return false; // only stops the each function
				}
				
			});
			
			if(cfgenwp_phonevalidation_checked_nok)
			{
				return false; // we stay in the 1st step of the form builder
			}
		}
		
		// ERROR: no input field at all
		var form_has_input = 0;
		
		jQuery('.cfgenwp-exportelement-type').each(function()
		{
			if(jQuery.inArray(jQuery(this).val(), cfgenwp_isinput_list) != -1)
			{
				form_has_input = 1;
			}
		});
		
		if(!form_has_input)
		{
			jQuery('#cfgenwp-dialog-message').html('<p>You must add at least one input field in the form to make the data submission work properly.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
					}
				}
			});
				
			return false;
		}
		
		else{
			jQuery('#cfgenwp-formeditor-container').hide(1, function()
			{
				jQuery('.cfgenwp-genericstyle-container').slideUp('fast');
				jQuery('#cfgenwp-editor-menu-top').hide();
				
				jQuery('#cfgenwp-formconfig-container').slideDown('fast');
				cfgenwp_buildSelectNotificationEmailAddress(); 
				// ^-- this function must be triggered in cfgenwp-gotoformconfiguration in order to update the labels of the email field names that will appear in the select options of #cfgenwp-notificationemailaddress
				
				if(!jQuery('#cfgenwp-form-id').val())
				{
					jQuery('#cfgenwp-saveform').html(cfgenwp_saveform_btn_add);
				} else{
					jQuery('#cfgenwp-saveform').html(cfgenwp_saveform_btn_update);
				}
				
				
				if(jQuery('.cfgenwp-editrequired:checked').length 
					|| jQuery('.cfgenwp-type-email').length 
					|| jQuery('.cfgenwp-captcha-img').length 
					|| jQuery('.cfgenwp-type-phone').length
					|| jQuery('.cfgenwp-type-url').length
					|| jQuery('.cfgenwp-replace-upload-field').length
					)
				{
					jQuery('#cfgenwp-config-errormessages-container').show();
					
					if(jQuery('.cfgenwp-editrequired:checked').length){
						jQuery('#cfgenwp-config-errorempty-container').show();
					}
					
					if(jQuery('.cfgenwp-type-phone').length){
						jQuery('#cfgenwp-config-errorphone-container').show();
					}
					
					if(jQuery('.cfgenwp-type-url').length){
						jQuery('#cfgenwp-config-errorurl-container').show();
					}
					
					if(jQuery('.cfgenwp-type-email').length){
						jQuery('#cfgenwp-config-erroremail-container').show();
					}
					
					if(jQuery('.cfgenwp-captcha-img').length){
						jQuery('#cfgenwp-config-errorcaptcha-container').show();
					}
					
					if(jQuery('.cfgenwp-replace-upload-field').length){
						jQuery('#cfgenwp-config-errorupload-container').show();
						
						if(jQuery('.cfgenwp_radio_upload_filetype_custom:checked').length)
						{
							jQuery('#cfgenwp-errormessage-uploadinvalidfiletype-container').show();
							
						} else{
							jQuery('#cfgenwp-errormessage-uploadinvalidfiletype-container').hide();
						}
					}
				}
				
				var cfgenwp_column_user_picture_gravatar_li = jQuery('.cfgenwp-column-id[value=user_picture_gravatar]').closest('li');
				if(!jQuery('.cfgenwp-type-email').length)
				{
					cfgenwp_column_user_picture_gravatar_li.addClass('cfgenwp-exclude-from-sortable')
																			.removeClass('cfgenwp-column-active')
																			.addClass('cfgenwp-column-inactive');
					
					cfgenwp_column_user_picture_gravatar_li.find('.cfgenwp-column-name').html('User Picture (requires 1 email field)');
					
					jQuery('#cfgenwp-inactivecolumns').append(cfgenwp_column_user_picture_gravatar_li); // the li is moved to the inactive columns, no need to use additional code to remove it from the active columns set
				} else{
					cfgenwp_column_user_picture_gravatar_li.removeClass('cfgenwp-exclude-from-sortable');
					
					cfgenwp_column_user_picture_gravatar_li.find('.cfgenwp-column-name').html('User Picture');
				}

				// ACTIVE INACTIVE COLUMNS: Allocate elements in the right active/inactivecolumns
				jQuery('.cfgenwp-exportelement-type').each(function()
				{
					var cfgenwp_elementbuilder = jQuery(this).closest('.cfgenwp-editor-element-container');
					var cfgenwp_elementbuilder_id = cfgenwp_elementbuilder.find('.cfgenwp-element-id').val();
					
					// the element is a form input (not a title, not a submit button, etc.)
					if(jQuery.inArray(jQuery(this).val(), cfgenwp_isinput_list) != -1)
					{
						
						/**
						  * If an element is not in cfgenwp-activecolumns and not in cfgenwp-inactivecolumns, it's a new element
						  * The element is added in cfgenwp-activecolumns (= by default, new elements are added in cfgenwp-activecolumns)
						  */
						if(!jQuery('#cfgenwp-activecolumns').find('.cfgenwp-column-id[value='+cfgenwp_elementbuilder_id+']').length
							&& !jQuery('#cfgenwp-inactivecolumns').find('.cfgenwp-column-id[value='+cfgenwp_elementbuilder_id+']').length
							)
						{
							var cfgenwp_activecolumn_li = '<li class="cfgenwp-column-active"><span class="cfgenwp-column-name">'+cfgenwp_elementbuilder.find('.cfgenwp-editlabel').val()+'</span><input type="hidden" class="cfgenwp-column-type-element cfgenwp-column-id" value="'+cfgenwp_elementbuilder_id+'" /></li>';
							jQuery('#cfgenwp-activecolumns').append(cfgenwp_activecolumn_li);
						}
						
						
					}
				});
				
				
				// ACTIVE INACTIVE COLUMNS: check the element columns ids: if the element does not exist anymore, it is removed from the column container
				// update the li column value (the user may have changed some element label after using "return to form")
				jQuery('.cfgenwp-column-type-element').each(function(){
								// ^-- .cfgenwp-column-type-standard columns can't be removed		
					if(!jQuery('#cfgenwp-formeditor').find('.cfgenwp-element-id[value='+jQuery(this).val()+']').length)
					{
						jQuery(this).closest('li').remove();
					} else{
						
						var cfgenwp_column_label = jQuery('#cfgenwp-formeditor').find('.cfgenwp-element-id[value='+jQuery(this).val()+']').closest('.cfgenwp-editor-element-container').find('.cfgenwp-editlabel').val();
						jQuery(this).closest('li').find('.cfgenwp-column-name').html(cfgenwp_column_label);
						
					}
				});
				
				// 	console.log(cfgenwp_active_columns);
				
				
				// SELECT INSERT FIELD VALUE
				jQuery('.cfgenwp-insertfieldvalue').empty();
				jQuery('.cfgenwp-insertfieldvalue').append('<option value="">Insert Field Value</option>'); // important to set value="" jQuery(cfgenwp-insertfieldvalue).val() would still return the value between option otherwise
				jQuery('.cfgenwp-exportelement-type').each(function()
				{
					var cfgenwp_elementbuilder = jQuery(this).closest('.cfgenwp-editor-element-container');
					var cfgenwp_elementbuilder_id = cfgenwp_elementbuilder.find('.cfgenwp-element-id').val();
					var cfgenwp_elementbuilder_label = cfgenwp_elementbuilder.find('.cfgenwp-editlabel').val();
					
					// the element is a form input (not a title, not a submit button, etc.)
					if(jQuery.inArray(jQuery(this).val(), cfgenwp_isinput_list) != -1)
					{
						jQuery('.cfgenwp-insertfieldvalue').append('<option value="'+cfgenwp_elementbuilder_id+'">'+cfgenwp_elementbuilder_label+'</option>');
					}
					
				});
				
				jQuery('.cfgenwp-insertfieldvalue').append('<option value="ipaddress">User IP Address</option>');
				jQuery('.cfgenwp-insertfieldvalue').append('<option value="form_name">Form Name</option>');
				jQuery('.cfgenwp-insertfieldvalue').append('<option value="form_id">Form ID</option>');
				jQuery('.cfgenwp-insertfieldvalue').append('<option value="url">Form URL</option>');
				
				
				// scroll to top
				jQuery('html, body').animate({scrollTop: 0},'fast'); 	

			});
		}
	});
	
	function cfgen_returnToFormEdition(){
		
		jQuery('#cfgenwp-formconfig-container').hide();
		jQuery('#cfgenwp-downloadsources').empty();

		jQuery('#cfgenwp-formeditor-container').slideDown('fast');
		jQuery('#cfgenwp-editor-menu-top').show();

		jQuery('#cfgenwp-config-errormessages-container').hide();
		jQuery('#cfgenwp-config-errorempty-container').hide();
		jQuery('#cfgenwp-config-errorphone-container').hide();
		jQuery('#cfgenwp-config-errorurl-container').hide();
		jQuery('#cfgenwp-config-erroremail-container').hide();
		jQuery('#cfgenwp-config-errorcaptcha-container').hide();
		jQuery('#cfgenwp-config-errorupload-container').hide();
		
		// scroll to top
		//jQuery('html, body').animate({scrollTop: 0},'fast'); 	

	}
	
	jQuery('#cfgenwp-returntoformedition').click(function(){
		cfgen_returnToFormEdition();
	});
	
	

	jQuery('body').on('click', '.cfgenwp-customoptionvalue-toggle', function(){
		var edit_option_container = jQuery(this).closest('.cfgenwp-edit-properties-container');
		var edit_option_input_value = edit_option_container.find('.cfgenwp-editoption-input-value');
		var edit_option_input_label = edit_option_container.find('.cfgenwp-editoption-input-label');
		var edit_option_header = edit_option_container.find('.cfgenwp-customoptionvalue-header');
		
		
		if(jQuery(this).is(':checked')){
			edit_option_header.show();
			edit_option_input_value.show();
			edit_option_input_value.addClass('cfgenwp-editoption-input-split');
			edit_option_input_label.addClass('cfgenwp-editoption-input-split');
			
			edit_option_input_value.each(function(){
				jQuery(this).val(jQuery(this).closest('.cfgenwp-editoption-container').find('.cfgenwp-editoption-input-label').val());
			});
			
		} else{
			edit_option_header.hide();
			edit_option_input_value.hide();
			edit_option_input_value.removeClass('cfgenwp-editoption-input-split');
			edit_option_input_label.removeClass('cfgenwp-editoption-input-split');
		}
		
		
		
	});
	
	
	
	/**
	 * NEXT STEP - SAVE
	 */
	jQuery('#cfgenwp-saveform').click(function(){
								  
		// IE8 doesn't like jQuery(this).trim()
		jQuery('#cfgenwp_config_formname').val(jQuery.trim(jQuery('#cfgenwp_config_formname').val()));

		jQuery('#cfgenwp_config_email_from').val(jQuery.trim(jQuery('#cfgenwp_config_email_from').val()));


		// EMAIL CC
		jQuery('#cfgenwp_config_email_address_cc').val(jQuery.trim(jQuery('#cfgenwp_config_email_address_cc').val()));
		
		var config_email_address_cc_split = jQuery('#cfgenwp_config_email_address_cc').val().split(',');
		//	console.log(config_email_address_cc_split);
		
		var config_email_address_cc = Array();
		
		jQuery.each(config_email_address_cc_split, function(i)
		{
			config_email_address_cc_split[i] = jQuery.trim(config_email_address_cc_split[i]);
			
			if(config_email_address_cc_split[i]){
				// config_email_address_cc is an array that will contained trimmed values
				// "config_email_address_cc":[{"emailaddress":"a@a.com"},{"emailaddress":"b@b.com"},{"emailaddress":"c@c.com"}]
				config_email_address_cc.push({'emailaddress':config_email_address_cc_split[i]})
			}
		});
		//console.log(config_email_address_cc);
		
		
		// EMAIL BCC
		jQuery('#cfgenwp_config_email_address_bcc').val(jQuery.trim(jQuery('#cfgenwp_config_email_address_bcc').val()));
			
		var config_email_address_bcc_split = jQuery('#cfgenwp_config_email_address_bcc').val().split(',');
		//	console.log(config_email_address_bcc_split);
		
		var config_email_address_bcc = Array();
		
		jQuery.each(config_email_address_bcc_split, function(i)
		{
			config_email_address_bcc_split[i] = jQuery.trim(config_email_address_bcc_split[i]);
			
			if(config_email_address_bcc_split[i]){
				config_email_address_bcc.push({'emailaddress':config_email_address_bcc_split[i]})
			}
		});
		
		//console.log(config_email_address_bcc);
	
		
		
		// EMAIL
		jQuery('#cfgenwp_config_email_address').val(jQuery.trim(jQuery('#cfgenwp_config_email_address').val()));

		/*
		// Check form name
		// Javascript check disabled because of: Uncaught SyntaxError: Invalid flags supplied to RegExp constructor 'u'
		// the /u flag is PHP-specific, the form name is validated with php in saveform.php
		if(!jQuery('#cfgenwp_config_formname').val().match(regex_pattern_formname) && jQuery('#cfgenwp_config_formname').val())
		{

			jQuery('#cfgenwp-dialog-message').html('<p>Only alphanumeric characters are authorized in the form name.</p>');
			
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
						jQuery('#cfgenwp_config_formname').focus();
					}
				}
			});
			
			return false;	
		}*/
		
		// ERROR: The form name can't be left empty
		if(!jQuery.trim(jQuery('#cfgenwp_config_formname').val()))
		{
			jQuery('#cfgenwp-dialog-message').html('<p>The form name can\'t be left empty.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
						jQuery('#cfgenwp_config_formname').focus();
					}
				}
			});
				
			return false;
		}
		
		// ERROR: The notification subject line can't be left empty
		if(!jQuery.trim(jQuery('#cfgenwp_config_adminnotification_subject').val()))
		{
			jQuery('#cfgenwp-dialog-message').html('<p>The noitification subject line can\'t be left empty.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
						jQuery('#cfgenwp_config_adminnotification_subject').focus();
					}
				}
			});
				
			return false;
		}

		
		// ERROR: Check if the url for the confirmation is empty
		if(jQuery('#cfgenwp-btn-redirecturl').is(':checked'))
		{
			
			if( !jQuery.trim(jQuery('#cfgenwp_config_redirecturl').val()) ) 
			{
				jQuery('#cfgenwp-dialog-message').html('<p>The URL field in the form validation message section can\'t be left empty.</p>');
				
				jQuery('#cfgenwp-dialog-message').dialog(
				{
					autoOpen: true,
					title: 'Error',
					buttons: {
						Ok: function() {
							jQuery(this).dialog('close');
							jQuery('#cfgenwp_config_redirecturl').focus();

						}
					}
				});
				
				return false;
			}
												  
			var config_redirecturl = jQuery.trim(jQuery('#cfgenwp_config_redirecturl').val());
			var config_validationmessage = '';
			
		} else{
			var config_redirecturl = '';
			var config_validationmessage = jQuery('#cfgenwp_config_validationmessage').val();
		}
		
		// ERROR: if delivery receipt is activated, there must be an email field in the form
		if(jQuery('#cfgenwp_config_usernotification_activate').is(':checked') && !jQuery('#cfgenwp_config_usernotification_inputid').val())
		{
			jQuery('#cfgenwp-dialog-message').html('<p>You must add at least one email field in the form to activate email notification.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
					}
				}
			});
				
			return false;
		}


		// ERROR SMTP: host or port empty
		if(jQuery('#cfgenwp_config_emailsendingmethod').val() == 'smtp'
			&& (!jQuery('#cfgenwp_config_smtp_host').val() || !jQuery('#cfgenwp_config_smtp_port').val()))
		{
			jQuery('#cfgenwp-dialog-message').html('<p>The SMTP Host and SMTP Port fields cannot be left empty.</p>');
				
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
					}
				}
			});
				
			return false;
		}
		
		
		// FORM MESSAGE : ERROR AND VALIDATION MESSAGE STYLE
		// the error check for empty color, empty background color, empty width, empty fontsize is based on export_validationmessage_style and export_errormessage_style
		var export_validationmessage_style = {};
		
		export_validationmessage_style['font-family'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-fontfamily').val();
		export_validationmessage_style['font-size'] = jQuery.trim(jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-fontsize-input-value').val())+'px';
		export_validationmessage_style['font-weight'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-fontweight').val();
		export_validationmessage_style['font-style'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-fontstyle').val();
		export_validationmessage_style['color'] = jQuery.trim(jQuery('#cfgenwp_validationmessage_color').val());
		export_validationmessage_style['background-color'] = jQuery.trim(jQuery('#cfgenwp_validationmessage_backgroundcolor').val());
		export_validationmessage_style['width'] = jQuery.trim(jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-width-input-value').val())+'px';
		export_validationmessage_style['line-height'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-lineheight').val();
		export_validationmessage_style['margin'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-margin').val();
		export_validationmessage_style['padding'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-padding').val();
		export_validationmessage_style['-webkit-box-sizing'] = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-boxsizing').val(); 
		export_validationmessage_style['-moz-box-sizing'] = export_validationmessage_style['-webkit-box-sizing'];
		export_validationmessage_style['box-sizing']= export_validationmessage_style['-webkit-box-sizing'];
		export_validationmessage_style['-webkit-border-radius'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-borderradius').val(); 
		export_validationmessage_style['-moz-border-radius'] = export_validationmessage_style['-webkit-border-radius'];
		export_validationmessage_style['border-radius'] = export_validationmessage_style['-moz-border-radius'];
		
		var export_errormessage_style = {};
		export_errormessage_style['font-family'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-fontfamily').val();
		export_errormessage_style['font-size'] = jQuery.trim(jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-fontsize-input-value').val())+'px';
		export_errormessage_style['font-weight'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-fontweight').val();
		export_errormessage_style['font-style'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-fontstyle').val();
		export_errormessage_style['color'] = jQuery.trim(jQuery('#cfgenwp_errormessage_color').val());
		export_errormessage_style['background-color'] = jQuery.trim(jQuery('#cfgenwp_errormessage_backgroundcolor').val());
		export_errormessage_style['width'] = jQuery.trim(jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-width-input-value').val())+'px';
		export_errormessage_style['line-height'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-lineheight').val();
		export_errormessage_style['margin'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-margin').val();
		export_errormessage_style['padding'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-padding').val();
		export_errormessage_style['-webkit-box-sizing'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-boxsizing').val(); 
		export_errormessage_style['-moz-box-sizing'] = export_errormessage_style['-webkit-box-sizing'];
		export_errormessage_style['box-sizing']= export_errormessage_style['-webkit-box-sizing'];
		export_errormessage_style['-webkit-border-radius'] = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-borderradius').val();
		export_errormessage_style['-moz-border-radius'] = export_errormessage_style['-webkit-border-radius'];
		export_errormessage_style['border-radius'] = export_errormessage_style['-moz-border-radius'];
		
		var cfgewp_formmessage_error_check = false;
		
		if(export_validationmessage_style['font-size'] == 'px'){
			jQuery('#cfgenwp-dialog-message').html('<p>The font size field for the validation message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(export_errormessage_style['font-size'] == 'px'){
			jQuery('#cfgenwp-dialog-message').html('<p>The font size field for the error message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(!export_validationmessage_style['color']){
			jQuery('#cfgenwp-dialog-message').html('<p>The color field for the validation message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(!export_errormessage_style['color']){
			jQuery('#cfgenwp-dialog-message').html('<p>The color field for the error message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(!export_validationmessage_style['background-color']){
			jQuery('#cfgenwp-dialog-message').html('<p>The backround color field for the validation message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(!export_errormessage_style['background-color']){
			jQuery('#cfgenwp-dialog-message').html('<p>The background color field for the error message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(export_validationmessage_style['width'] == 'px'){
			jQuery('#cfgenwp-dialog-message').html('<p>The width field for the validation message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(export_errormessage_style['width'] == 'px'){
			jQuery('#cfgenwp-dialog-message').html('<p>The width field for the error message can\'t be left empty.</p>');
			cfgewp_formmessage_error_check = true;
		}
		
		if(cfgewp_formmessage_error_check)
		{
			jQuery('#cfgenwp-dialog-message').dialog(
			{
				autoOpen: true,
				title: 'Error',
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
					}
				}
			});
				
			return false;
		}



		
		jQuery('#cfgenwp-saveform').hide();
		
		jQuery('#cfgenwp-returntoformedition').hide();
		
		jQuery('#cfgenwp-downloadsources').empty().hide();

		jQuery('#cfgenwp-creatingsourcefiles').show();


		
		// catch uploaded images file name
		var export_imageupload = Array();
		
		
		// JSON EXPORT ARRAY
		var json_export = {};
		var export_element = Array();


		// FORM PATH
		// spaces are replaced with underscores + encodeURI : encodes special characters, except , / ? : @ & = + jQuery #
		//var config_formdir = encodeURI(jQuery('#cfgenwp_config_formname').val().replace(/ /g,"_"));
		// not used anymore: var regex_formpath = new RegExp(regex_replace_formname_pattern, 'g')
		// not used anymore : var config_formdir = jQuery('#cfgenwp_config_formname').val().replace(regex_formpath, regex_replace_formname_replacement);


		// GOOGLE WEB FONTS
		var export_googlewebfonts = {};
		
		// label: catch google web fonts
		if(jQuery('.cfgenwp-newfontfamily-label').find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			var gwf_family = jQuery('.cfgenwp-newfontfamily-label').val();
				
			if(!(gwf_family in export_googlewebfonts)){
				export_googlewebfonts[gwf_family] = Array();
			}
			
			
			var gfw_container = jQuery('.cfgenwp-newfontfamily-label').closest('.cfgenwp-fontstyleeditor');
			
			var gfw_fontweight = gfw_container.find('.cfgenwp-newfontweight-label').val();
			
			var gfw_fontstyle = gfw_container.find('.cfgenwp-newfontstyle-label').val();
				
			var gwf_variant = cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle);
			
			if(jQuery.inArray(gwf_variant, export_googlewebfonts[gwf_family]) == -1){
				export_googlewebfonts[gwf_family].push(gwf_variant);
			}
				
		}
		
		
		// inputs: catch google web fonts
		if(jQuery('.cfgenwp-newfontfamily-formelement').find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			
			var gwf_family = jQuery('.cfgenwp-newfontfamily-formelement').val();
				
			if(!(gwf_family in export_googlewebfonts)){
				export_googlewebfonts[gwf_family] = Array();
			}
			
			
			var gfw_container = jQuery('.cfgenwp-newfontfamily-formelement').closest('.cfgenwp-fontstyleeditor');
			
			var gfw_fontweight = gfw_container.find('.cfgenwp-newfontweight-formelement').val();
			
			var gfw_fontstyle = gfw_container.find('.cfgenwp-newfontstyle-formelement').val();
				
			var gwf_variant = cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle);
			
			if(jQuery.inArray(gwf_variant, export_googlewebfonts[gwf_family]) == -1){
				export_googlewebfonts[gwf_family].push(gwf_variant);
			}
		}

		// validation message: catch google web fonts
		var cfgenwp_style_validationmessage_select_fontfamily = jQuery('#cfgenwp-style-validationmessage-container').find('.cfgenwp-formmessage-fontfamily');
		var cfgenwp_style_validationmessage_select_fontfamily_val = cfgenwp_style_validationmessage_select_fontfamily.val();
		if(cfgenwp_style_validationmessage_select_fontfamily.find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			
			var gwf_family = cfgenwp_style_validationmessage_select_fontfamily_val;
				
			if(!(gwf_family in export_googlewebfonts)){
				export_googlewebfonts[gwf_family] = Array();
			}
			
			
			var gfw_container = jQuery('#cfgenwp-style-validationmessage-container');
			
			var gfw_fontweight = gfw_container.find('.cfgenwp-formmessage-fontweight').val();
			
			var gfw_fontstyle = gfw_container.find('.cfgenwp-formmessage-fontstyle').val();
				
			var gwf_variant = cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle);
			
			if(jQuery.inArray(gwf_variant, export_googlewebfonts[gwf_family]) == -1){
				export_googlewebfonts[gwf_family].push(gwf_variant);
			}
		}
		
		// error message: catch google web fonts
		var cfgenwp_style_errormessage_select_fontfamily = jQuery('#cfgenwp-style-errormessage-container').find('.cfgenwp-formmessage-fontfamily');
		var cfgenwp_style_errormessage_select_fontfamily_val = cfgenwp_style_errormessage_select_fontfamily.val();
		if(cfgenwp_style_errormessage_select_fontfamily.find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			
			var gwf_family = cfgenwp_style_errormessage_select_fontfamily_val;
				
			if(!(gwf_family in export_googlewebfonts)){
				export_googlewebfonts[gwf_family] = Array();
			}
			
			
			var gfw_container = jQuery('#cfgenwp-style-errormessage-container');
			
			var gfw_fontweight = gfw_container.find('.cfgenwp-formmessage-fontweight').val();
			
			var gfw_fontstyle = gfw_container.find('.cfgenwp-formmessage-fontstyle').val();
				
			var gwf_variant = cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle);
			
			if(jQuery.inArray(gwf_variant, export_googlewebfonts[gwf_family]) == -1){
				export_googlewebfonts[gwf_family].push(gwf_variant);
			}
		}

		
		// REQUIRED EMAIL
		// catch required email element id for email validation procedure
		var export_required_email_id = Array();
		jQuery('.cfgenwp-type-email').each(function()
		{
			export_required_email_id.push(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val());
		}); 
		
		
		// REQUIRED PHONE
		// catch phone element id for phone format validation procedure
		var cfgenwp_export_formvalidation_phone = Array();
		
		jQuery('.cfgenwp-type-phone').each(function()
		{
			var cfgenwp_export_fieldvalidation_key = Array();
			
			var cfgenwp_export_fieldvalidation_length = '';
			
			jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp_phonevalidation:checked').each(function()
			{
				cfgenwp_export_fieldvalidation_key.push(jQuery(this).val());
				
				if(jQuery(this).val() == 1){
					cfgenwp_export_fieldvalidation_length = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-fieldvalidation-length').val();
				}
				
			});
			
			var cfgenwp_export_formvalidation_obj = {'id':jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val(), 'fieldvalidation':cfgenwp_export_fieldvalidation_key};
			
			if(cfgenwp_export_fieldvalidation_length){
				cfgenwp_export_formvalidation_obj['length'] = cfgenwp_export_fieldvalidation_length;
			}
			
			cfgenwp_export_formvalidation_phone.push(cfgenwp_export_formvalidation_obj);
			
		}); 
		
		
		// REQUIRED URL
		var cfgenwp_export_formvalidation_url = Array();
		
		jQuery('.cfgenwp-type-url').each(function()
		{
			cfgenwp_export_formvalidation_url.push(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val());
		}); 
		
		
		
		// REQUIRED FIELD
		// required elements ids (can't be empty fields)
		var export_required_id = Array();
		jQuery('.cfgenwp-editrequired:checked').each(function()
		{
			export_required_id.push(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val());
		}); 
		
		
		
		var export_datepicker_config = Array();
		var export_upload_config = Array();
		
		var export_captcha = {};
		
		var export_css = {};
		
		
		export_css['label'] = {
										'default':{
													'font-family':jQuery('.cfgenwp-newfontfamily-label').val(),
													'font-weight':jQuery('.cfgenwp-newfontweight-label').val(),
													'font-style':jQuery('.cfgenwp-newfontstyle-label').val(),
													'font-size':jQuery('#cfgenwp-slider-label-fontsize-value').html()+'px',
													'color':jQuery.trim(jQuery('#cfgenwp_label_color').val())
													}};
		
		
		export_css['input'] = {
										'default':{
													'font-family':jQuery('.cfgenwp-newfontfamily-formelement').val(),
													'font-weight':jQuery('.cfgenwp-newfontweight-formelement').val(),
													'font-style':jQuery('.cfgenwp-newfontstyle-formelement').val(),
													'font-size':jQuery('#cfgenwp-slider-formelement-fontsize-value').html()+'px',
													'color':jQuery.trim(jQuery('#cfgenwp_formelement_color').val()),
													'padding':jQuery('#cfgenwp-slider-textinputformat-padding-value').html()+'px',
													'-webkit-border-radius':jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html()+'px',
													'-moz-border-radius':jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html()+'px',
													'border-radius':jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html()+'px',
													'border-width':jQuery('#cfgenwp-slider-textinputformat-borderwidth-value').html()+'px',
													'border-style':'solid',
													'border-color':jQuery.trim(jQuery('#cfgenwp_inputformat_color').val()),
													'background-color':jQuery.trim(jQuery('#cfgenwp_inputformat_backgroundcolor').val())
													}
											};
		
		cfgenwp_loaded_element_ids.length = 0; // reset and prepare cfgenwp_loaded_element_ids to receive the updated element list
		
		// export elements
		jQuery('.cfgenwp-exportelement-type').each(function()
		{
			
			var export_single_css = {};
			var type = jQuery(this).val();
			var element_container = jQuery(this).closest('.cfgenwp-editor-element-container');
			var export_element_id = element_container.find('.cfgenwp-element-id').val();
			
			cfgenwp_loaded_element_ids.push(export_element_id);
			
			var export_input = {'value':'', 'css':{ 'default':{}, 'hover':{} }}; // no jQuery.trim()
			
			if(type == 'hidden')
			{	// no css for hidden input
				var export_input = {'value':''}; // no jQuery.trim()
			}
			
			
			var export_label_value = element_container.find('.cfgenwp-editlabel').val();
			
			var export_label = {'id':'', 'value':export_label_value, 'css':{'default':{}}}; // id updated in saveform.php // no jQuery.trim()
			
			var export_container = {'id':'', 'css':{ 'default':{}}}; // id updated in saveform.php
			
			
			// PHONE VALIDATION
			if(type == 'phone')
			{	
				var cfgenwp_export_element_formvalidation_obj = {}; // will be used for element{}
				
				var cfgenwp_export_fieldvalidation_key = Array();
					
				var cfgenwp_export_fieldvalidation_length = '';
					
				jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp_phonevalidation:checked').each(function()
				{
					cfgenwp_export_fieldvalidation_key.push(jQuery(this).val());
						
					if(jQuery(this).val() == 1){cfgenwp_export_fieldvalidation_length = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-fieldvalidation-length').val();}
						
				});
					
				cfgenwp_export_element_formvalidation_obj = {'fieldvalidation':cfgenwp_export_fieldvalidation_key}; // we don't save the id of the element in element{}
					
				if(cfgenwp_export_fieldvalidation_length){
					cfgenwp_export_element_formvalidation_obj['length'] = cfgenwp_export_fieldvalidation_length;
				}
			}
		
			
			
			// SINGLE CSS
			export_single_css['font-weight'] = element_container.find('.cfgenwp-selectfontweight').val(); // this value is used just below to build gwf variant
			export_single_css['font-style'] = element_container.find('.cfgenwp-selectfontstyle').val(); // this value is used just below to build gwf variant
			export_single_css['font-family'] = element_container.find('.cfgenwp-selectfontfamily').val();

			// catch google web fonts
			if(element_container.find('.cfgenwp-selectfontfamily').find('option:selected').hasClass('cfgenwp-googlewebfonts'))
			{
				
				var gwf_family = export_single_css['font-family'];
					
				if(!(gwf_family in export_googlewebfonts)){
					export_googlewebfonts[gwf_family] = Array();
				}
				
				
				// var gfw_container = jQuery('#cfgenwp-style-validationmessage-container'); // useless here, we are using values already stored in a variable
				
				var gfw_fontweight =  export_single_css['font-weight'];
				
				var gfw_fontstyle = export_single_css['font-style'];
					
				var gwf_variant = cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle);
				
				if(jQuery.inArray(gwf_variant, export_googlewebfonts[gwf_family]) == -1){
					export_googlewebfonts[gwf_family].push(gwf_variant);
				}
				
			}


			
			if(element_container.find('.cfgenwp-sliderelement-fontsize-value').html()){
				// undefinedem without if()
				export_single_css['font-size'] = element_container.find('.cfgenwp-sliderelement-fontsize-value').html()+'px';
			}
			
			if(type == 'separator'){
				export_single_css['background-color'] = element_container.find('.cfgenwp-colorpickervalue').val();
			} else{
				export_single_css['color'] = element_container.find('.cfgenwp-colorpickervalue').val();
			}
			
			if(element_container.find('.cfgenwp-edit-properties-container .cfgenwp-slider-element-width-value').val()){
				// undefinedpx without if()
				export_input['css']['default']['width'] = element_container.find('.cfgenwp-slider-element-width-value').val()+'px';
				
				export_single_css['width'] = element_container.find('.cfgenwp-slider-element-width-value').val()+'px';
			}
			
			if(element_container.find('.cfgenwp-edit-properties-container .cfgenwp-slider-element-height-value').val()){
				// undefinedpx without if()
				export_input['css']['default']['height'] = element_container.find('.cfgenwp-slider-element-height-value').val()+'px';
				
				// no export_single_css['height'] or the property would also be pushed for the paragraph
			}
			
				
			if(type == 'hidden'){
				export_container['css']['default']['display'] = 'none';
			}
	
			if(jQuery.inArray(type, [ 'checkbox', 'captcha', 'date', 'email', 'phone', 'radio', 'select', 'selectmultiple', 'text', 'textarea', 'time', 'upload', 'url' ]) != -1)
			{
				export_label['css']['default']['font-family'] = export_css['label']['default']['font-family'];
				export_label['css']['default']['font-weight'] = export_css['label']['default']['font-weight'];
				export_label['css']['default']['font-style'] = export_css['label']['default']['font-style'];
				export_label['css']['default']['font-size'] = export_css['label']['default']['font-size'];
				export_label['css']['default']['color'] = export_css['label']['default']['color'];
				
				export_input['css']['default']['font-family'] = export_css['input']['default']['font-family'];
				export_input['css']['default']['font-weight'] = export_css['input']['default']['font-weight'];
				export_input['css']['default']['font-style'] = export_css['input']['default']['font-style'];
				export_input['css']['default']['font-size'] = export_css['input']['default']['font-size'];
				export_input['css']['default']['color'] = export_css['input']['default']['color'];
				
				if(jQuery.inArray(type, [ 'captcha', 'date', 'email', 'phone', 'select', 'selectmultiple', 'text', 'time', 'textarea', 'url' ]) != -1)
				{
					
					export_input['css']['default']['padding'] = export_css['input']['default']['padding'];
					
					if(type != 'select' && type != 'selectmultiple' && type != 'time')
					{
						export_input['css']['default']['-webkit-border-radius'] = export_css['input']['default']['-webkit-border-radius'];
						export_input['css']['default']['-moz-border-radius'] = export_css['input']['default']['-moz-border-radius'];
						export_input['css']['default']['border-radius'] = export_css['input']['default']['border-radius'];
					}
					
					export_input['css']['default']['border-width'] = export_css['input']['default']['border-width'];
					export_input['css']['default']['border-style'] = export_css['input']['default']['border-style'];
					export_input['css']['default']['border-color'] = export_css['input']['default']['border-color'];
					export_input['css']['default']['background-color'] = export_css['input']['default']['background-color'];
				}
				

				if(element_container.find('.cfgenwp-label-positionning.cfgenwp-alignleft').is(':checked')
					|| element_container.find('.cfgenwp-label-positionning.cfgenwp-alignright').is(':checked')
					)
				{	// ^-- no width val when alignment set to top
					export_label['css']['default']['width'] = element_container.find('.cfgenwp-sliderelement-label-width-value').val()+'px';
					export_label['css']['default']['float'] = 'left';
					
					if(element_container.find('.cfgenwp-label-positionning.cfgenwp-alignleft').is(':checked'))
					{
						export_label['css']['default']['text-align'] = 'left';
					} else{
						export_label['css']['default']['text-align'] = 'right';
					}
					
					export_container['css']['default']['float'] = 'left';
					
					
					if(jQuery.inArray(type, [ 'checkbox', 'radio' ]) != -1)
					{
						// INSERT WIDTH NEEDS LABEL LEFT/RIGHT + OPTION LEFT
						if(element_container.find('.cfgenwp-option-positionning.cfgenwp-alignleft').is(':checked'))
						{
							export_container['css']['default']['width'] = element_container.find('.cfgenwp-element-set').innerWidth()+'px';
						}
						
						// INSERT MARGIN NEEDS LABEL LEFT/RIGHT
						var element_set_margintop = element_container.find('.cfgenwp-element-set').css('margin-top'); // no need to add +'px' because 'px' is already returned by .css()
						
						if(element_set_margintop != '0px')
						{
							export_container['css']['default']['margin-top'] = element_set_margintop;
						}
					}
					
				}
				
			}

			
			if(type == 'submit')
			{
				export_input['css']['default']['border-width'] = '1px';
				export_input['css']['default']['border-style'] = 'solid';
					
				export_input['css']['default']['font-family'] = export_single_css['font-family'];
				export_input['css']['default']['font-weight'] = export_single_css['font-weight'];
				export_input['css']['default']['font-style'] = export_single_css['font-style'];
				export_input['css']['default']['font-size'] = export_single_css['font-size'];
				
				var marginleft_submit = element_container.find('.cfgenwp-slider-marginleft-submit-value').val();
				if(marginleft_submit!='0') // prevents having margin-left:0px
				{
					export_input['css']['default']['margin-left'] = marginleft_submit+'px';
				}else{
					export_input['css']['default']['margin-left'] = marginleft_submit;
				}
			
				var submit_compare_default_hover = Array(); // used to compare default and hover values: we only insert the hover value if it is different from the default value
				
				// DEFAULT CSS
				jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp_css_default_value').each(function()
				{
					
					var css_property_name = jQuery(this).closest('.cfgenwp-elementproperty-r').find('.cfgenwp_export_css_property').val();
					var css_property_value = jQuery.trim(jQuery(this).val());
							
					export_input['css']['default'][css_property_name] = css_property_value;
					
					submit_compare_default_hover.push(css_property_value);
				});
				
				// HOVER CSS
				jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp_css_hover_value').each(function(i, l)
				{
					var css_property_name = jQuery(this).closest('.cfgenwp-elementproperty-r').find('.cfgenwp_export_css_property_hover').val();
					var css_property_value = jQuery.trim(jQuery(this).val());
					
					
					// i in each(function(i,l)
					if(css_property_value != submit_compare_default_hover[i] && jQuery(this).closest('.cfgenwp-hover-editor').is('.cfgenwp-hoveractive'))
					{// ^-- used to compare default and hover values: we only insert the hover value if it is different from the default value
						export_input['css']['hover'][css_property_name] = css_property_value;
					}
							
				});
								
			}
			
			if(type == 'select' || type == 'selectmultiple' || type == 'checkbox' || type == 'radio')
			{
				var export_option_array = Array();

				element_container.find('.cfgenwp-editoption-container').each(function()
				{
					if(jQuery(this).find('.cfgenwp-option-selected').html())
					{
						var option_checked = '1';
					} else{
						var option_checked = '';
					}
					
					
					var editoption_input_value = jQuery(this).find('.cfgenwp-editoption-input-value');
					
					if(element_container.find('.cfgenwp-customoptionvalue-toggle').is(':checked')){
						editoption_input_value = editoption_input_value.val();
					} else{
						editoption_input_value = '';
					}
					export_option_array.push({
														'id':export_element_id+'-'+jQuery(this).index(),
														'label':jQuery.trim(jQuery(this).find('.cfgenwp-editoption-input-label').val()),
														'value':jQuery.trim(editoption_input_value),
														'checked':option_checked
														});
				});
			}
			
			
			var element_obj = {};
			
			element_obj['id'] = export_element_id;
			
			element_obj['type'] = type;
			
			// VALUE SUBMIT
			if(jQuery.inArray(type, ['submit']) != -1)
			{
				export_input['value'] = element_container.find('.cfgenwp-editlabel').val();
			}
			
			// VALUE INPUT HIDDEN
			if(jQuery.inArray(type, ['hidden']) != -1)
			{
				export_input['value'] = element_container.find('.cfgenwp-editinputhidden').val();
			}
			
			// CAPTCHA
			if(type == 'captcha')
			{
				element_obj['format'] = element_container.find('.cfgenwp-captchaformat:checked').val();
				element_obj['length'] = element_container.find('.cfgenwp-captcha-length').val();
				element_obj['form_dir'] = ''; // updated in saveform.php
				element_obj['form_inc_dir'] = ''; // updated in saveform.php
				
				export_captcha['id'] = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val();
				export_captcha['format'] = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-captchaformat:checked').val();
				export_captcha['length'] = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-captcha-length').val();
			}
			
			// DATEPICKERFORMAT DATEPICKERLANGUAGE
			if(type == 'date')
			{
				export_datepicker_config.push({
															'id':export_element_id, 
															'format':element_container.find('.cfgenwp-datepickerformat').val(), 
															'regional':element_container.find('.cfgenwp-datepickerlanguage').val()
															});
				
				element_obj['format'] = element_container.find('.cfgenwp-datepickerformat').val();
				element_obj['regional'] = element_container.find('.cfgenwp-datepickerlanguage').val();
				
			}
			

			// UPLOAD
			if(type == 'upload')
			{
				
				var file_types = '';
				
				if(element_container.find('.cfgenwp_radio_upload_filetype_all').is(':checked'))
				{
					file_types = '*.*';
				}
				
				if(element_container.find('.cfgenwp_radio_upload_filetype_custom').is(':checked'))
				{
					file_types = jQuery.trim(element_container.find('.cfgenwp_upload_filetype_custom').val());
				}
				
				var export_upload_element = {};
				export_upload_element['id'] = export_element_id;
				export_upload_element['btn_upload_id'] = 'uploadbutton'; // spanButtonPlaceHolder written in class.contactformeditor.php and used in saveform.php;
				export_upload_element['file_size_limit'] = element_container.find('.cfgenwp-upload-filesizelimit').val();
				export_upload_element['file_size_unit'] = element_container.find('.cfgenwp-upload-filesizeunit:checked').val();
				export_upload_element['file_types'] = file_types;
				export_upload_element['upload_deletefile'] = element_container.find('.cfgenwp_upload_deletefile:checked').val();
				
				element_obj['btn_upload_id'] = export_upload_element['btn_upload_id'];
				element_obj['file_size_limit'] = export_upload_element['file_size_limit'];
				element_obj['file_size_unit'] = export_upload_element['file_size_unit'];
				element_obj['file_types'] = export_upload_element['file_types'];
				element_obj['upload_deletefile'] = export_upload_element['upload_deletefile'];
				
				export_upload_config.push(export_upload_element); // saveform.php
			}
			
			
			// TITLE
			if(type == 'title')
			{
				element_obj['title'] = {'value':element_container.find('.cfgenwp-editlabel').val(), 'css':{'default':export_single_css}};
			}
			
			// SEPARATOR
			if(type == 'separator')
			{
				export_single_css['height'] = element_container.find('.cfgenwp-slider-element-height-value').val()+'px';
				element_obj['separator'] = {'css':{'default':export_single_css}};
			}
			
			// PARAGRAPH
			if(element_container.find('.cfgenwp-edit-paragraph-content').length)
			{
				var paragraph_val = element_container.find('.cfgenwp-edit-paragraph-content').val();
				
				export_single_css['width'] = element_container.find('.cfgenwp-slider-paragraph-width-value').val()+'px';

				if(type == 'paragraph')
				{
					element_obj['paragraph'] = {'id':'', 'value':paragraph_val, 'css':{'default':export_single_css}}; // id updated in saveform.php
				}
				
				// for other elements, paragraph is pushed in json only if it's not empty
				if(jQuery.inArray(type, [ 'checkbox', 'captcha', 'date', 'email', 'phone', 'radio', 'select', 'selectmultiple', 'text', 'textarea', 'time', 'upload', 'url' ]) != -1)
				{
					
					if(element_container.find('.cfgenwp-edit-paragraph-content').val())
					{
						element_obj['paragraph'] = {'id':'', 'value':paragraph_val, 'css':{'default':export_single_css}}; // id updated in saveform.php
					}
				}
				
				
			}
			
			// REQUIRED
			if(element_container.find('.cfgenwp-editrequired').is(':checked')){
				element_obj['required'] = 1;
			}
			
			// AMPM TIME
			if(type == 'time'){
				element_obj['timeformat'] = element_container.find('.cfgenwp-timeformat:checked').val();
			}
			
			
			// ROWS
			if(type == 'textarea'){
				// element_obj['rows'] = element_container.find('.sliderelement-rows-value').val();
			}
			
			// FORM VALIDATION
			if(type == 'phone'){
				element_obj['formvalidation'] = cfgenwp_export_element_formvalidation_obj;
			}
			
			// LABEL
			if(jQuery.inArray(type, [ 'checkbox', 'captcha', 'date', 'hidden', 'email', 'phone', 'radio', 'select', 'selectmultiple', 'text', 'textarea', 'time', 'upload', 'url' ]) != -1){
				element_obj['label'] = export_label;
			}
			
			// INPUT CSS
			//'checkbox', 'radio', 
			if(jQuery.inArray(type, [ 'captcha', 'date', 'email', 'hidden', 'phone', 'select', 'selectmultiple', 'submit', 'text', 'textarea', 'time', 'url' ]) != -1){
				element_obj['input'] = export_input;
			}
			
			
			// OPTIONS			
			if(jQuery.inArray(type, [ 'checkbox', 'radio', 'select', 'selectmultiple' ]) != -1)
			{
				var export_optioncontainer = {'id':'', 'css':{'default':{}}}; // id updated in saveform.php
				export_optioncontainer['css'] = export_input['css'];
				
				if(jQuery.inArray(type, [ 'checkbox', 'radio' ]) != -1)
				{
					if(element_container.find('.cfgenwp-option-positionning.cfgenwp-alignleft').is(':checked'))
					{					
						export_optioncontainer['css']['default']['width'] = element_container.find('.cfgenwp-sliderelement-option-width-value').val()+'px';
						
						export_optioncontainer['css']['default']['float'] = 'left';
					}
					
					element_obj['option'] = {'set':export_option_array, 'container':export_optioncontainer};
				}
				
				
				
				
				if(jQuery.inArray(type, [ 'select', 'selectmultiple' ]) != -1)
				{
					element_obj['option'] = {'set':export_option_array};
				}
			}
			
			
			// IMAGE
			// image url
			var export_imgurl = jQuery.trim(element_container.find('.cfgenwp-image-url').val());
			if(export_imgurl){
				element_obj['url'] = export_imgurl;  // to prevent imgurl = ''
			}
			
			// image upload
			var export_imageuploadfilename = element_container.find('.uploadimagefilename').val();
			if(export_imageuploadfilename)
			{
				element_obj['filename'] = element_container.find('.uploadimagefilename').val();
				element_obj['form_dir'] = ''; // updated in saveform.php
				element_obj['form_inc_dir'] = ''; // updated in saveform.php
				
				export_imageupload.push(element_obj['filename']);
			}
			
			element_obj['container'] = export_container;
		
			
			export_element.push(element_obj);
				
		});
		
		
		/**
		 * EXPORT ENTRIES LIST COLUMNS
		 */
		
		var cfgenwp_export_columns_active = Array();
		
		var cfgenwp_export_columns_inactive = Array();
		
		jQuery('.cfgenwp-column-id').each(function(){
			
			var cfgenwp_active_column = jQuery(this).find('.cfgenwp-column-id');
			
			var cfgenwp_column_properties = {};
			
			var cfgenwp_column_li = jQuery(this).closest('li');
			
			
			cfgenwp_column_properties['id'] = jQuery(this).val();
			
			cfgenwp_column_properties['name'] = cfgenwp_column_li.find('.cfgenwp-column-name').html();
			
			if(jQuery(this).is('.cfgenwp-column-type-element'))
			{
				cfgenwp_column_properties['type']= 'element'; // this value is used index.php: cfgenwp-column-type-<?php echo $cfgwenwp_load_column_value['type'];?>
			}
			
			if(jQuery(this).is('.cfgenwp-column-type-standard'))
			{
				cfgenwp_column_properties['type']= 'standard';  // this value is used index.php: cfgenwp-column-type-<?php echo $cfgwenwp_load_column_value['type'];?>
			}
			
			
			if(cfgenwp_column_li.is('.cfgenwp-column-active'))
			{
				cfgenwp_export_columns_active.push(cfgenwp_column_properties);
			}
			
			if(cfgenwp_column_li.is('.cfgenwp-column-inactive'))
			{	
				// standard columns are not stored in inactive columns
				// inactive standard columns are generated with php in the form builder
				if(jQuery(this).is('.cfgenwp-column-type-element'))
				{
					cfgenwp_export_columns_inactive.push(cfgenwp_column_properties);
				}
			}
			
		});
		
		var cfgenwp_export_columns = {'active':cfgenwp_export_columns_active, 'inactive': cfgenwp_export_columns_inactive};
		
		
		export_css['validationmessage'] = {'default':export_validationmessage_style};
		export_css['errormessage'] = {'default':export_errormessage_style};
		
		
		// FORM CONFIG
		json_export['form_id'] = jQuery('#cfgenwp-form-id').val();
		json_export['form_name'] = jQuery('#cfgenwp_config_formname').val();
		json_export['form_dir'] = ''; // value set in saveform.php, sent through js call to prevent having to create ['form_dir'] with php, which would put the form_dir key at the end of the json array / less easy to find and read
		json_export['form_inc_dir'] = ''; // updated in saveform.php, same as above for form_dir
		json_export['config_email_address'] = jQuery('#cfgenwp_config_email_address').val();
		json_export['config_email_address_cc'] = config_email_address_cc;
		json_export['config_email_address_bcc'] = config_email_address_bcc;
		
		
		json_export['config_emailsendingmethod'] = jQuery('#cfgenwp_config_emailsendingmethod').val();
		
		json_export['config_smtp_host'] = '';
		json_export['config_smtp_port'] = '';
		json_export['config_smtp_encryption'] = '';
		json_export['config_smtp_username'] = '';
		json_export['config_smtp_password'] = '';
		
		if(json_export['config_emailsendingmethod'] == 'smtp'){
			json_export['config_smtp_host'] = jQuery('#cfgenwp_config_smtp_host').val();
			json_export['config_smtp_port'] = jQuery('#cfgenwp_config_smtp_port').val();
			json_export['config_smtp_encryption'] = jQuery('#cfgenwp_config_smtp_encryption').val();
			json_export['config_smtp_username'] = jQuery('#cfgenwp_config_smtp_username').val();
			json_export['config_smtp_password'] = jQuery('#cfgenwp_config_smtp_password').val();
		}
		
		
		json_export['config_timezone'] = jQuery('#cfgenwp_config_timezone').val(); // timezone set for the form
		json_export['wp-timezone'] = jQuery('#cfgenwp-wp-timezone').val(); // timezone set in wordpress
		json_export['config_redirecturl'] = config_redirecturl;
		json_export['config_validationmessage'] = config_validationmessage;
		
		json_export['config_errormessage_captcha'] = '';
		json_export['config_errormessage_emptyfield'] = '';
		json_export['config_errormessage_invalidemailaddress'] = '';
		json_export['config_errormessage_invalidphonenumber'] = '';
		json_export['config_errormessage_uploadfileistoobig'] = '';
		json_export['config_errormessage_uploadinvalidfiletype'] = '';
		json_export['config_errormessage_invalidurl'] = '';
		
		if(jQuery('.cfgenwp-captcha-img').length){
			json_export['config_errormessage_captcha'] = jQuery('#cfgenwp_config_errormessage_captcha').val();
		}
		
		if(jQuery('.cfgenwp-editrequired:checked').length){
			json_export['config_errormessage_emptyfield'] = jQuery('#cfgenwp_config_errormessage_emptyfield').val();
		}
		
		if(jQuery('.cfgenwp-type-email').length){
			json_export['config_errormessage_invalidemailaddress'] = jQuery('#cfgenwp_config_errormessage_invalidemailaddress').val();	
		}
		
		if(jQuery('.cfgenwp-type-phone').length){
			json_export['config_errormessage_invalidphonenumber'] = jQuery('#cfgenwp_config_errormessage_invalidphonenumber').val();	
		}
		
		if(jQuery('.cfgenwp-type-url').length){
			json_export['config_errormessage_invalidurl'] = jQuery('#cfgenwp_config_errormessage_invalidurl').val();	
		}
		
		if(jQuery('.cfgenwp-replace-upload-field').length){
			json_export['config_errormessage_uploadfileistoobig'] = jQuery('#cfgenwp_config_errormessage_uploadfileistoobig').val();
			json_export['config_errormessage_uploadinvalidfiletype'] = jQuery('#cfgenwp_config_errormessage_uploadinvalidfiletype').val();
		}
		
		
		json_export['config_adminnotification_subject'] = jQuery('#cfgenwp_config_adminnotification_subject').val();
		
		json_export['config_email_from'] = ''; // default value to prevent Undefined index
		json_export['config_usernotification_activate'] = ''; // default value to prevent Undefined index
		json_export['config_usernotification_insertformdata'] = ''; // default value to prevent Undefined index: config_usernotification_insertformdata
		json_export['config_usernotification_inputid'] = ''; // default value to prevent Undefined index
		json_export['config_usernotification_format'] = ''; // default value to prevent Undefined index
		json_export['config_usernotification_subject'] = ''; // default value to prevent Undefined index
		json_export['config_usernotification_message'] = ''; // default value to prevent Undefined index
		
		
		if(jQuery('#cfgenwp_config_usernotification_inputid').val()){
			json_export['config_usernotification_inputid'] = jQuery('#cfgenwp_config_usernotification_inputid').val();
		}

		if(jQuery('#cfgenwp_config_usernotification_activate').is(':checked') && jQuery('#cfgenwp_config_usernotification_inputid').val())
		{
			json_export['config_usernotification_activate'] = '1';
			
			if(jQuery('#cfgenwp_config_usernotification_insertformdata').is(':checked'))
			{
				json_export['config_usernotification_insertformdata'] = '1';
			}
			
			json_export['config_email_from'] = jQuery('#cfgenwp_config_email_from').val();
			json_export['config_usernotification_format'] = jQuery('input[type=radio][name=cfgenwp_config_usernotification_format]:checked').val();
			json_export['config_usernotification_subject'] = jQuery('#cfgenwp_config_usernotification_subject').val();
			json_export['config_usernotification_message'] = jQuery('#cfgenwp_config_usernotification_message').val();
			
		}
		
		
		json_export['formvalidation_email'] = export_required_email_id; // saveform.php
		json_export['formvalidation_required'] = export_required_id; // saveform.php
		json_export['formvalidation_phone'] = cfgenwp_export_formvalidation_phone; // saveform.php
		json_export['formvalidation_url'] = cfgenwp_export_formvalidation_url; // saveform.php
		json_export['imageupload'] = export_imageupload;
		json_export['upload'] = export_upload_config; // saveform.php
		json_export['datepicker'] = export_datepicker_config; // saveform.php
		
		json_export['googlewebfonts'] = Array();
		for(var gwf_k in export_googlewebfonts)
		{
			json_export['googlewebfonts'].push({'family':gwf_k, 'variants':export_googlewebfonts[gwf_k]});
		}
		
		json_export['captcha'] = export_captcha; // saveform.php
		json_export['columns'] = cfgenwp_export_columns;
		json_export['element'] = export_element;
		json_export['css'] = export_css;
		json_export['customcss'] = jQuery('#cfgenwp_config_customcss').val();

		json_export = JSON.stringify(json_export);
		
		//	console.log(json_export);
		
		var jqxhr_saveform = jQuery.post(cfgenwp_js_plugin_url_editor+'inc/saveform.php',
			   	{
					'json_export':json_export,
					'cr':jQuery('#cfgwp-copyright-header').html()

				},
				function(data)
				{	

			   		// 		console.log(data);
					var json_data = jQuery.parseJSON(data);
					
					if(json_data['response'] == 'nok')
					{
						jQuery('#cfgenwp-dialog-message').html('<p>'+json_data['response_msg']+'</p>');
					
						jQuery('#cfgenwp-dialog-message').dialog(
						{
							autoOpen: true,
							title: 'Error',
							buttons: {
								Ok: function(){jQuery(this).dialog('close');}
							}
						});		
						
					} else{
						
						
						if(json_data['form_id'])
						{
							// no form_id in demo mode, the button value must remain "save and create"
							jQuery('#cfgenwp-saveform').html(cfgenwp_saveform_btn_update);
						} else{
							jQuery('#cfgenwp-saveform').html(cfgenwp_saveform_btn_add);
						}
					   
						jQuery('#cfgenwp-downloadsources').html(json_data['response']).slideDown('fast');
						
						jQuery('html,body').animate({scrollTop: jQuery('#cfgenwp-ready').offset().top-40}, 200); 	
						
						jQuery('#cfgenwp-form-id').val(json_data['form_id']);
					}
					
					jQuery('#cfgenwp-saveform').show();
					
					jQuery('#cfgenwp-returntoformedition').show();

					jQuery('#cfgenwp-creatingsourcefiles').hide();
				
				}).error(function(){
					
					//console.log(jqxhr_saveform);
					
					if(jqxhr_saveform.status && jqxhr_saveform.status == 500)
					{
						jQuery('#cfgenwp-saveform').show();
						
						jQuery('#cfgenwp-creatingsourcefiles').hide();
						
						var cfgenwp_js_php_safemode_error_message = '<br /><br />The PHP Safe Mode is activated on your server. You must disable the Safe Mode and set the PHP safe_mode option to Off on your server in order to be able to create your forms properly.';
						
						var status_error_message = '500 Internal Server Error:<br />The server encountered an internal error or misconfiguration and was unable to complete your request.';
						
						var status_error_source = '';
						
						if(cfgenwp_js_php_safemode){
							status_error_message += cfgenwp_js_php_safemode_error_message;
							status_error_source = 1;
						}
						
						if(!status_error_source)
						{
							status_error_message += '<br /><br />Something has gone wrong on the server but the script wasn\'t able to idenfity why it is not working properly.';
							status_error_message += '<br /><br />Contact us at support@topstudiodev.com so that we can help you identify what the exact problem is.';
							status_error_message += '<br/><br/>We will get back to you in less than 24 hours.';
						}
						
						
						jQuery('#cfgenwp-dialog-message').html('<p>'+status_error_message+'</p>');
					
						jQuery('#cfgenwp-dialog-message').dialog(
						{
							autoOpen: true,
							title: 'Error',
							buttons: {
								Ok: function(){jQuery(this).dialog('close');}
							}
						});		
					}
				});

		/*
		jQuery(document).ajaxError(function(e, jqxhr, settings, exception)
		{
			//console.log(settings);
			//console.log(jqxhr);
		}); 		
		*/
	})
	
	/**
	 * DOWNLOAD DEMO
	 */
	jQuery('body').on('click', '.demodownload', function()
	{
		jQuery('#cfgenwp-dialog-message').html('<p>You are currently using a demo version of Form Generator.</p><p>The download feature is only available in the full version.</p><p>You can use the "<strong>View your form</strong>" button to see what your form looks like.</p>');
		
		jQuery('#cfgenwp-dialog-message').dialog(
		{
			autoOpen: true,
			title: 'Demo - Download sources',
			buttons: {
				Ok: function(){jQuery(this).dialog('close');}
			}
		});		
						
		
	});
	
	
	// Build google web font variant for export (300, 300italic, etc.)
	function cfgenwp_buildGwfVariant(gfw_fontweight, gfw_fontstyle){
		
			if(gfw_fontweight == 'normal'){
				gfw_fontweight = '400'; // string, not integer
			}
			
			if(gfw_fontweight == 'bold'){
				gfw_fontweight = '700'; // string, not integer
			}
			
			var gwf_variant = gfw_fontweight; // "300"
			
			if(gfw_fontstyle == 'italic'){
				gwf_variant = gwf_variant+gfw_fontstyle; // "300italic"
			}
			
			return gwf_variant;
	}
	
	
	function cfgenwp_getGoogleWebFontsUrl(font_family){
		var googleapi_font_family_url = font_family.replace(/ /g, '+');
		
		return (cfgenwp_js_http_prefix+"://fonts.googleapis.com/css?family="+googleapi_font_family_url+":"+cfgenwp_js_gwf_variants_url_param);
	}
	
	/**
	 * FONT FAMILY - LABEL, TITLE
	 */
	function cfgenwp_updateFontFamily(source, target, fontfamily)
	{
		
		if(source.find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			if(jQuery.inArray(fontfamily, cfgenwp_googlewebfonts_added) == -1)
			{
				cfgenwp_googlewebfonts_added.push(fontfamily);
		
				jQuery('body').append("<link href='"+cfgenwp_getGoogleWebFontsUrl(fontfamily)+"' rel='stylesheet' type='text/css'>");
				// don't use jQuery.get or jQuery load => Origin http://127.0.0.1 is not allowed by Access-Control-Allow-Origin.
			}
		}

		if(source.hasClass('cfgenwp-fontandcolor')){
			jQuery(target).css('font-family', fontfamily);
		} else{
			source.closest('.cfgenwp-editor-element-container').find(target).css('font-family', fontfamily);
		}
	}
	
	jQuery('.cfgenwp-newfontfamily-formelement').change(function()
	{
		cfgenwp_formeditor_config['default_fontfamily_formelement'] = jQuery(this).val();
		cfgenwp_updateFontFamily(jQuery(this), '.cfgenwp-formelement', jQuery(this).val());
	});
	
	jQuery('body').on('change', '.cfgenwp-newfontfamily-label', function()
	{
		cfgenwp_formeditor_config['default_fontfamily_label'] = jQuery(this).val();
		cfgenwp_updateFontFamily(jQuery(this), '.cfgenwp-label', jQuery(this).val());
	});
	
	jQuery('body').on('change', '.cfgenwp-newfontfamily-paragraph', function()
	{
		cfgenwp_formeditor_config['default_fontfamily_paragraph'] = jQuery(this).val();
		cfgenwp_updateFontFamily(jQuery(this), '.cfgenwp-paragraph', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor'))
		{
			jQuery('.cfgenwp-newfontfamily-paragraph').val(jQuery(this).val());
		}
	});
	
	jQuery('body').on('change', '.cfgenwp-newfontfamily-submit', function()
	{
		cfgenwp_formeditor_config['default_fontfamily_submit'] = jQuery(this).val();
		cfgenwp_updateFontFamily(jQuery(this), '.cfgenwp-submit', jQuery(this).val());
	});
	
	jQuery('body').on('change', '.cfgenwp-newfontfamily-title', function()
	{
		cfgenwp_formeditor_config['default_fontfamily_title'] = jQuery(this).val();
		cfgenwp_updateFontFamily(jQuery(this), '.cfgenwp-title', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor'))
		{
			jQuery('.cfgenwp-newfontfamily-title').val(jQuery(this).val());
		}
	});
	
	
	// FONT STYLE 
	function cfgenwp_updateFontStyle(source, target, value){
		
		if(source.hasClass('cfgenwp-fontandcolor')){
			jQuery(target).css({'font-style':value});
		} else{
			source.closest('.cfgenwp-editor-element-container').find(target).css({'font-style':value});
		}
	}
	
	// FONT STYLE : LABEL
	jQuery('body').on('change', '.cfgenwp-newfontstyle-label', function(){
																 
		cfgenwp_formeditor_config['default_fontstyle_label'] = jQuery(this).val();

		cfgenwp_updateFontStyle(jQuery(this), '.cfgenwp-label', jQuery(this).val());
	});
	
	// FONT STYLE : FORM ELEMENT
	jQuery('.cfgenwp-newfontstyle-formelement').change(function(){
														 
		cfgenwp_formeditor_config['default_fontstyle_formelement'] = jQuery(this).val();
		
		cfgenwp_updateFontStyle(jQuery(this), '.cfgenwp-formelement', jQuery(this).val());
	});

	// FONT STYLE : PARAGRAPH
	jQuery('body').on('change', '.cfgenwp-newfontstyle-paragraph', function()
	{
		cfgenwp_formeditor_config['default_fontstyle_paragraph'] = jQuery(this).val();
		
		cfgenwp_updateFontStyle(jQuery(this), '.cfgenwp-paragraph', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor')){
			
			jQuery('.cfgenwp-newfontstyle-paragraph').val(jQuery(this).val());
		}
	});

	// FONT STYLE : TITLE
	jQuery('body').on('change', '.cfgenwp-newfontstyle-title', function(){
	
		cfgenwp_formeditor_config['default_fontstyle_title'] = jQuery(this).val();
		
		cfgenwp_updateFontStyle(jQuery(this),'.cfgenwp-title', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor')){
			jQuery('.cfgenwp-newfontstyle-title').val(jQuery(this).val());
		}
	});
	
	// FONT STYLE : SUBMIT
	jQuery('body').on('change', '.newfontstyle-submit', function(){
	
		cfgenwp_formeditor_config['default_fontstyle_submit'] = jQuery(this).val();

		cfgenwp_updateFontStyle(jQuery(this), '.cfgenwp-submit', jQuery(this).val());
	});
	
	
	// FONT WEIGHT cfgenwp_updateFontWeight
	function cfgenwp_updateFontWeight(source, target, value){
		if(source.hasClass('cfgenwp-fontandcolor')){
			jQuery(target).css({'font-weight':value});
		} else{
			source.closest('.cfgenwp-editor-element-container').find(target).css({'font-weight':value});
		}
		
	}
	
	// FONT WEIGHT : LABEL
	jQuery('body').on('change', '.cfgenwp-newfontweight-label', function(){
																 
		cfgenwp_formeditor_config['default_fontweight_label'] = jQuery(this).val();

		cfgenwp_updateFontWeight(jQuery(this), '.cfgenwp-label', jQuery(this).val());
	});

	// FONT WEIGHT : FORM ELEMENT
	jQuery('.cfgenwp-newfontweight-formelement').change(function(){
														 
		cfgenwp_formeditor_config['default_fontweight_formelement'] = jQuery(this).val();
		
		cfgenwp_updateFontWeight(jQuery(this), '.cfgenwp-formelement', jQuery(this).val());
	});

	// FONT WEIGHT : PARAGRAPH
	jQuery('body').on('change', '.cfgenwp-newfontweight-paragraph', function()
	{
		cfgenwp_formeditor_config['default_fontweight_paragraph'] = jQuery(this).val();
		
		cfgenwp_updateFontWeight(jQuery(this), '.cfgenwp-paragraph', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor')){
			
			jQuery('.cfgenwp-newfontweight-paragraph').val(jQuery(this).val());
		}
	});

	// FONT WEIGHT : TITLE
	jQuery('body').on('change', '.cfgenwp-newfontweight-title', function(){
	
		cfgenwp_formeditor_config['default_fontweight_title'] = jQuery(this).val();
		
		cfgenwp_updateFontWeight(jQuery(this),'.cfgenwp-title', jQuery(this).val());
		
		// update the selected value in every element editor of this type
		// only from top editor to individual editor
		if(jQuery(this).is('.cfgenwp-fontandcolor')){
			jQuery('.cfgenwp-newfontweight-title').val(jQuery(this).val());
		}
	});

	// FONT WEIGHT : SUBMIT
	jQuery('body').on('change', '.cfgenwp-newfontweight-submit', function(){
	
		cfgenwp_formeditor_config['default_fontweight_submit'] = jQuery(this).val();

		cfgenwp_updateFontWeight(jQuery(this), '.cfgenwp-submit', jQuery(this).val());
	});
	
	
	/**
	 * FONT SIZE - LABEL, TITLE
	 */
	function cfgenwp_updateFontSize(target, fontsize)
	{
		jQuery('.cfgenwp-editor-element-container').find(target).each(function(){
			jQuery(this).css('font-size', fontsize+'px');
			
			// APPLY FONT SIZE VALUE FROM TOP PAN TO SLIDER IN ELEMENT EDITOR
			
			if(jQuery(this).hasClass('cfgenwp-title') || jQuery(this).hasClass('cfgenwp-paragraph'))
			{
				jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-sliderelement-fontsize-value').html(fontsize);
				jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-sliderelement-fontsize-value')
																	.closest('.cfgenwp-elementproperty-r')
																	.find('.ui-slider')
																	.slider('option', 'value', fontsize);
			}
			
		});

		jQuery('.cfgenwp-editor-element-container').each(function(){cfgenwp_adjustElementHeightToLeftContent(jQuery(this));});


	}
	
	// LABEL SIZE SLIDER
	jQuery('#cfgenwp-slider-label-fontsize').slider({
					range: 'min',
					min: cfgenwp_formeditor_config['slider_fontsize_min'],
					max: cfgenwp_formeditor_config['slider_fontsize_max'],
					value: cfgenwp_formeditor_config['default_fontsize_label'],
					step: cfgenwp_formeditor_config['slider_fontsize_step'],
					slide: function( event, ui ){
						jQuery('#cfgenwp-slider-label-fontsize-value').html(ui.value);
						cfgenwp_formeditor_config['default_fontsize_label'] = ui.value; 
						cfgenwp_updateFontSize('.cfgenwp-label', ui.value);
					}
	});
	jQuery('#cfgenwp-slider-label-fontsize-value').html(jQuery('#cfgenwp-slider-label-fontsize').slider('value'));
	
	
	// FORM ELEMENT SIZE SLIDER
	jQuery('#cfgenwp-slider-formelement-fontsize').slider({
					range: 'min',
					min: cfgenwp_formeditor_config['slider_fontsize_min'],
					max: cfgenwp_formeditor_config['slider_fontsize_max'],
					value: cfgenwp_formeditor_config['default_fontsize_formelement'],
					step: cfgenwp_formeditor_config['slider_fontsize_step'],
					slide: function( event, ui ){
						jQuery('#cfgenwp-slider-formelement-fontsize-value').html(ui.value);
						cfgenwp_formeditor_config['default_fontsize_formelement'] = ui.value; 
						cfgenwp_updateFontSize('.cfgenwp-formelement', ui.value);
						
					}
	});
	jQuery('#cfgenwp-slider-formelement-fontsize-value').html(jQuery('#cfgenwp-slider-formelement-fontsize').slider('value'));
	
	
	
	// TITLE SIZE SLIDER
	jQuery('#cfgenwp-slider-title-fontsize').slider({
					range: 'min',
					min: cfgenwp_formeditor_config['slider_fontsize_min'],
					max: cfgenwp_formeditor_config['slider_fontsize_max'],
					value: cfgenwp_formeditor_config['default_fontsize_title'],
					step: cfgenwp_formeditor_config['slider_fontsize_step'],
					slide: function(event, ui){
						jQuery('#cfgenwp-slider-title-fontsize-value').html(ui.value);
						cfgenwp_formeditor_config['default_fontsize_title'] = ui.value; 
						cfgenwp_updateFontSize('.cfgenwp-title', ui.value);
					}
	});
	jQuery('#cfgenwp-slider-title-fontsize-value').html( jQuery('#cfgenwp-slider-title-fontsize').slider('value') );
	
	// PARAGRAPH SIZE SLIDER
	jQuery('#cfgenwp-slider-paragraph-fontsize').slider({
					range: 'min',
					min: cfgenwp_formeditor_config['slider_fontsize_min'],
					max: cfgenwp_formeditor_config['slider_fontsize_max'],
					value: cfgenwp_formeditor_config['default_fontsize_paragraph'],
					step: cfgenwp_formeditor_config['slider_fontsize_step'],
					slide: function(event, ui){
						jQuery('#cfgenwp-slider-paragraph-fontsize-value').html(ui.value);
						cfgenwp_formeditor_config['default_fontsize_paragraph'] = ui.value; 
						cfgenwp_updateFontSize('.cfgenwp-paragraph', ui.value);
					}
	});
	jQuery('#cfgenwp-slider-paragraph-fontsize-value').html(jQuery('#cfgenwp-slider-paragraph-fontsize').slider('value'));
	
	
	
	
	/**
	 * SLIDER WIDTH VALUE FROM INPUT
	 */
	var cfgenwp_delay_keyup = (function(){
												var timer = 0;
												return function(callback, ms){
																clearTimeout(timer);
																timer = setTimeout(callback, ms);
															};
											})();
	
	jQuery('body').on('focusout', '.cfgenwp-slider-element-height-value, .cfgenwp-slider-marginleft-submit-value, .cfgenwp-slider-element-width-value, .cfgenwp-slider-paragraph-width-value, .cfgenwp-sliderelement-label-width-value, .cfgenwp-sliderelement-option-margintop-value, .cfgenwp-sliderelement-option-width-value', function(){
		if(cfgenwp_isInt(jQuery(this).val()))
		{
			jQuery(this).closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option', 'value', jQuery(this).val());
		} else{
			jQuery(this).val( jQuery(this).closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option', 'value') );
		}
	});
		
	
	jQuery('body').on('keyup', '.cfgenwp-slider-element-height-value, .cfgenwp-slider-marginleft-submit-value, .cfgenwp-slider-element-width-value, .cfgenwp-slider-paragraph-width-value, .cfgenwp-sliderelement-label-width-value, .cfgenwp-sliderelement-option-margintop-value, .cfgenwp-sliderelement-option-width-value', function(){
			
		var sliderinputvalue = jQuery(this);
			
		if(cfgenwp_isInt(sliderinputvalue.val()))
		{
			cfgenwp_delay_keyup(function(){
				sliderinputvalue.closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option', 'value', sliderinputvalue.val());
			}, 700 );
		} else{
			jQuery(this).val( sliderinputvalue.closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option', 'value') );
		}
	
	});
		
	/*
	jQuery('body').on('focusout', '.sliderelement-rows-value', function(){
		jQuery(this).closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option','value',jQuery(this).val());
	});
	
	jQuery('body').on('keyup', '.sliderelement-rows-value', function(){
			
			var sliderinputvalue = jQuery(this);
			
			cfgenwp_delay_keyup(function(){
				sliderinputvalue.closest('.cfgenwp-elementproperty-c').find('.ui-slider').slider('option','value',sliderinputvalue.val());
			}, 700 );
	
	});
	*/
	
	/**
	 * TOGGLE SMTP CONFIGURATION
	 */
	jQuery('#cfgenwp_config_emailsendingmethod').change(function()
	{
		if(jQuery(this).val() == 'smtp')
		{
			jQuery('#cfgenwp_smtpconfiguration').show();
		} else{
			jQuery('#cfgenwp_smtpconfiguration').hide();
		}
	});
	
	
	/**
	 * EMAIL NOTIFICATION CHECKBOX
	 */
	jQuery('#cfgenwp_config_usernotification_activate').click(function()
	{
		
		if(jQuery(this).is(':checked'))
		{
			jQuery('#cfgenwp-deliveryreceiptconfiguration').show();
		} else{
			jQuery('#cfgenwp-deliveryreceiptconfiguration').hide();
		}
		
	});
	
	
	function cfgenwp_buildSelectNotificationEmailAddress()
	{
		
		// if there are more than 1 email field, config_usernotification_inputid is a select field
		jQuery('#cfgenwp_config_usernotification_inputid').remove();
		
		var label_value = '';
		var emailinput_id = '';
		var count_email_field = jQuery('.cfgenwp-type-email').length;
		var select_emailnotificationinputid = '<select id="cfgenwp_config_usernotification_inputid">';
		
		jQuery('.cfgenwp-type-email').each(function(){
			label_value = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-label-value').html();
			emailinput_id = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-element-id').val();
			
			var option_selected = '';
			if(emailinput_id == cfgenwp_js_config_usernotification_inputid)
			{
				// ^-- cfgenwp_js_config_usernotification_inputid is created in index.php
				// preselect the right email field option when a form is loaded
				option_selected = 'selected="selected"';
			}
			select_emailnotificationinputid = select_emailnotificationinputid+'<option value="'+emailinput_id+'" '+option_selected+'>'+label_value+'</option>';
		});
		
		select_emailnotificationinputid = select_emailnotificationinputid+'</select>';
		
		jQuery('#cfgenwp-notificationemailaddress').empty();
		
		jQuery('#cfgenwp-atleastonemailfield').empty();
		jQuery('#cfgenwp-atleastonemailfield').closest('.cfgenwp-formconfig-c').hide();
		
		jQuery('#cfgenwp-userinformationconfiguration').hide();
		
		if(!count_email_field)
		{
			jQuery('#cfgenwp-atleastonemailfield').closest('.cfgenwp-formconfig-c').show();
			jQuery('#cfgenwp-atleastonemailfield').append('<p style="color:#ff0033; font-style:normal;">You must add at least one email field in the form to activate email notification</p>');
		}
		
		if(count_email_field)
		{
			jQuery('#cfgenwp-userinformationconfiguration').show();
			
			// append the options in the select container
			jQuery('#cfgenwp-notificationemailaddress').append(select_emailnotificationinputid);
		}
	}
	
	jQuery('body').on('change', '#cfgenwp_config_usernotification_inputid', function()
	{
		cfgenwp_js_config_usernotification_inputid = jQuery(this).val();
	});
	
	
	
	
	/**
	 * SLIDE RADIO OPTIONS IN UPLOAD EDITOR
	 */
	jQuery('body').on('click', '.cfgenwp_radio_upload_filetype', function()
	{
		jQuery(this).closest('.cfgenwp-upload-editor').find('.cfgenwp-radio-upload-slide').hide();
		jQuery(this).closest('.cfgenwp-radio-upload-container').find('.cfgenwp-radio-upload-slide').show();
		
		jQuery(this).closest('.cfgenwp-elementproperty-c').find('label').removeClass('cfgenwp-label-selected-element-editor');
		jQuery(this).closest('div').find('label').addClass('cfgenwp-label-selected-element-editor');
		
		cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
	});
	
	
	/**
	 * UPDATE DELETEFILE UPLOAD CHECKBOX
	 */
	jQuery('body').on('click', '.cfgenwp_upload_deletefile', function()
	{
		/**
		 * 1: File Attachment + Download Link
		 * 2: File Attachment Only
		 * 3: Download Link Only
		 */
		
		jQuery(this).closest('.cfgenwp-elementproperty-c').find('label').removeClass('cfgenwp-label-selected-element-editor');
		jQuery(this).closest('div').find('label').addClass('cfgenwp-label-selected-element-editor');
		
		jQuery(this).closest('.cfgenwp-elementproperty-c').find('.cfgenwp-element-editor-hint').hide();
		jQuery(this).closest('div').find('.cfgenwp-element-editor-hint').show();//slideDown('fast');
		
		cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
		
	});
	
	/**
	 * HIDE CHANGE HOVER COLOR cancelhovercolor
	 */
	jQuery('body').on('click', '.cfgenwp-cancelhovercolor', function()
	{
		var hovereditor = jQuery(this).closest('.cfgenwp-hover-editor');
		hovereditor.hide();
		hovereditor.removeClass('cfgenwp-hoveractive'); // cfgenwp-hoveractive used to know if the hovereditor is displayed for a specific css property, if hovereditor has class cfgenwp-hoveractive the hover value is inserted in the json
		
		jQuery(this).closest('.cfgenwp-elementproperty-c').find('.cfgenwp-changecoloronhover-c').show();
		
		
		cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
		
		jQuery('.cfgenwp-submit').unbind('hover');
		// console.log(jQuery('.cfgenwp-submit').data('events'));
	});
	
	/**
	 * SHOW CHANGE HOVER COLOR cancelhovercolor
	 */
	jQuery('body').on('click', '.cfgenwp-changecoloronhover', function()
	{
		jQuery(this).closest('.cfgenwp-changecoloronhover-c').hide();
		
		var hovereditor = jQuery(this).closest('.cfgenwp-elementproperty-c').find('.cfgenwp-hover-editor');
		hovereditor.show();
		hovereditor.addClass('cfgenwp-hoveractive');  // cfgenwp-hoveractive used to know if the hovereditor is displayed for a specific css property, if hovereditor has class cfgenwp-hoveractive the hover value is inserted in the json
		
		var elementproperty_container = jQuery(this).closest('.cfgenwp-elementproperty-c');
		var css_attribute = elementproperty_container.find('.cfgenwp_export_css_property_hover').val();
		var css_hover_value = elementproperty_container.find('.cfgenwp_css_hover_value').val();
		var css_default_value = elementproperty_container.find('.cfgenwp_css_default_value').val();
		
		if(css_hover_value != css_default_value)
		{
			jQuery('.cfgenwp-submit').hover(
											function(){
												jQuery(this).css(css_attribute, css_hover_value);
											},
											function(){
												jQuery(this).css(css_attribute, css_default_value);
											}
											);
		}
		
		cfgenwp_setElementContainerHeight(jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-edit-properties-container'));
		
	});
	
	

	
	
		jQuery.fn.cfgenwp_colorkit = function (arg_colorpicker_value, arg_colorpicker_target, arg_colorpicker_id,arg_colorpicker_csspropertyname)
		{
			//console.log(arg_colorpicker_value);
			
			// same function for colorpicker ico and for input value
			jQuery(this).parent().find('.cfgenwp-colorpicker-ico').add(jQuery(this)).click(function(event){
											
									// if the user erases the content of the input that displays the color code (ctrl+x), the color wheel will still appear when clicking the icon but the color code won't be added in the input
									if( !jQuery.trim(jQuery(arg_colorpicker_value).val()) ){
										
										jQuery(arg_colorpicker_value).val('#ffffff');
									}
																							
									// open CP 1 and CP2, stopPropagation make the color selected from CP2 applied to the target
									event.stopPropagation();
									
									 // added in v.5, prevents from having multiple colorpicker panel opened (if 2 colorpickers are opened the color clicked in the second colorpicker is not applied)
									var colorpickercontainer = jQuery(this).closest('.cfgenwp-color-container');
									jQuery('.cfgenwp-color-container').not(colorpickercontainer).each(function(){
										// hide all colorpickers except the one that is currently opened (prevents hide/show bumping when clicking again in the input
										jQuery(this).find('.cfgenwp-colorpickerwheel-container').hide();
									});
										
									// z-index is set to 2 to put the colorpicker of the current element above the cfgenwp-element-editor-container of the element below
									colorpickercontainer.closest('.cfgenwp-element-editor-container').css({'z-index':'2'});
									
									
									
									if(arg_colorpicker_target == 'element'){ // if equals 'element', we search which html object must have its color changed
										cfgenwp_colorpicker_target = jQuery(this).closest('.cfgenwp-editor-element-container').find('.cfgenwp-colortarget');
									} else{
										cfgenwp_colorpicker_target = arg_colorpicker_target; // else we target the specified class (index.php), like cfgenwp-title, cfgenwp-label, etc.
									}
									
									cfgenwp_colorpicker_value = arg_colorpicker_value;
									cfgenwp_colorpicker_id = arg_colorpicker_id;
									cfgenwp_colorpicker_csspropertyname = arg_colorpicker_csspropertyname;//'#cfgenwp_label_colorpicker';
									cfgen_setUpColorPicker();
									
									// hover on the submit button in the editor (must be applied when choosing color from colorpicker ico or from input value)
									var colorinput = jQuery(this);
									
									if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-submit'))
									{
											
										// the hover effect should only apply if cfgenwp-hover-editor is visible
										if(colorinput.closest('.cfgenwp-elementproperty-c').find('.cfgenwp-hover-editor').is(':visible'))
										{
											// var css_attribute: to apply the hover effect on the proper css property (color, bg, border)
											var css_attribute = colorinput.closest('.cfgenwp-elementproperty-c').find('.cfgenwp_export_css_property_hover').val();
											jQuery(cfgenwp_colorpicker_target).hover(
																				function(){
																					jQuery(this).css(css_attribute, colorinput.closest('.cfgenwp-elementproperty-c').find('.cfgenwp_css_hover_value').val());
																				},
																				function(){
																					jQuery(this).css(css_attribute, colorinput.closest('.cfgenwp-elementproperty-c').find('.cfgenwp_css_default_value').val());
																				}
																				);
											
										}
									}
									
									
									
								});

			jQuery(this).change(function(){ cfgen_updateElementColor(); });	
		
		} // end colorkit

	
	jQuery('#cfgenwp-openform').click(function(){
		var btn = jQuery(this).closest('.cfgenwp-header-btn');
		var menuheader = jQuery(this).closest('#cfgenwp-editor-menu-top');
		if(menuheader.find('#cfgenwp-open-form-list').is(':visible'))
		{
			menuheader.find('#cfgenwp-open-form-list').fadeOut(100);
			btn.addClass('cfgenwp-openform-closed');
			btn.removeClass('cfgenwp-openform-opened');
		} else{
			menuheader.find('#cfgenwp-open-form-list').fadeIn(60);
			btn.addClass('cfgenwp-openform-opened');
			btn.removeClass('cfgenwp-openform-closed');
		}
		
	});
	
	jQuery('.cfgenwp-load-form-container').click(function(){
		jQuery('#cfgenwp-open-form-list').hide();
		jQuery('#cfgenwp-openform').addClass('cfgenwp-openform-closed');
		jQuery('#cfgenwp-openform').removeClass('cfgenwp-openform-opened');
	});
	
				
	jQuery(document).mouseup(function(e)
	{
		//	console.log(e.target);
		var container = jQuery('#cfgenwp-open-form-list');
		var target = jQuery(e.target);
	
		if(container.has(e.target).length === 0 && !target.is('#cfgenwp-openform') && !target.is('#cfgenwp-open-form-list') )
		{
			jQuery('#cfgenwp-openform').addClass('cfgenwp-openform-closed');
			jQuery('#cfgenwp-openform').removeClass('cfgenwp-openform-opened');

			container.fadeOut(100);
		}
	});
	
	
				jQuery('#cfgenwp-slider-textinputformat-padding').slider({
								range: 'min',
								min: 0,
								max: 20,
								value: cfgenwp_formeditor_config['default_padding_inputformat'],
								step: 1,
								change: function( event, ui ){
									/* for FF to prevent getting -1  value */
									jQuery('#cfgenwp-slider-textinputformat-padding-value').html(ui.value);
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url, .cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input, .cfgenwp-type-select, .cfgenwp-type-selectmultiple, .cfgenwp-time-hour, .cfgenwp-time-minute, .cfgenwp-time-ampm').css('padding', ui.value);
									
									cfgenwp_formeditor_config['default_padding_inputformat'] = ui.value;
									
									jQuery('.cfgenwp-editor-element-container').each(function(){cfgenwp_adjustElementHeightToLeftContent(jQuery(this));});

								},
								slide: function( event, ui ){
									jQuery('#cfgenwp-slider-textinputformat-padding-value').html(ui.value);
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url, .cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input, .cfgenwp-type-select, .cfgenwp-type-selectmultiple, .cfgenwp-time-hour, .cfgenwp-time-minute, .cfgenwp-time-ampm').css('padding', ui.value);
									
									cfgenwp_formeditor_config['default_padding_inputformat'] = ui.value;
									
									jQuery('.cfgenwp-editor-element-container').each(function(){cfgenwp_adjustElementHeightToLeftContent(jQuery(this));});
							
							}
				});
				jQuery('#cfgenwp-slider-textinputformat-padding-value').html( jQuery('#cfgenwp-slider-textinputformat-padding').slider('value') );
				
				jQuery('#cfgenwp-slider-textinputformat-borderradius').slider({
								range: 'min',
								min: 0,
								max: 30,
								value: cfgenwp_formeditor_config['default_borderradius_inputformat'],
								step: 1,
								change: function( event, ui ){
									/* for FF to prevent getting -1  value */
									jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html(ui.value);
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url, .cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input').css('borderRadius', ui.value);
									cfgenwp_formeditor_config['default_borderradius_inputformat'] = ui.value;
								},
								slide: function( event, ui ){
									jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html(ui.value);
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url, .cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input').css('borderRadius', ui.value);
									cfgenwp_formeditor_config['default_borderradius_inputformat'] = ui.value;
								}
				});
				jQuery('#cfgenwp-slider-textinputformat-borderradius-value').html( jQuery('#cfgenwp-slider-textinputformat-borderradius').slider('value') );
				
				jQuery('#cfgenwp-slider-textinputformat-borderwidth').slider({
								range: "min",
								min: 0,
								max: 10,
								value: cfgenwp_formeditor_config['default_borderwidth_inputformat'],
								step: 1,
								change: function( event, ui ){
									/* for FF to prevent getting -1  value */
									jQuery('#cfgenwp-slider-textinputformat-borderwidth-value').html(ui.value);
									
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url, .cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input, .cfgenwp-type-select, .cfgenwp-type-selectmultiple, .cfgenwp-time-hour, .cfgenwp-time-minute, .cfgenwp-time-ampm').css('borderWidth', ui.value);
									
									cfgenwp_formeditor_config['default_borderwidth_inputformat']= ui.value;
									
									jQuery('.cfgenwp-editor-element-container').each(function(){cfgenwp_adjustElementHeightToLeftContent(jQuery(this));});
								},
								slide: function( event, ui ){
									jQuery('#cfgenwp-slider-textinputformat-borderwidth-value').html(ui.value);
									
									jQuery('.cfgenwp-type-email, .cfgenwp-type-date, .cfgenwp-type-phone, .cfgenwp-type-url,.cfgenwp-type-text, .cfgenwp-type-textarea, .cfgenwp-captcha-input, .cfgenwp-type-select, .cfgenwp-type-selectmultiple, .cfgenwp-time-hour, .cfgenwp-time-minute, .cfgenwp-time-ampm').css('borderWidth', ui.value);
									
									cfgenwp_formeditor_config['default_borderwidth_inputformat'] = ui.value;
									
									jQuery('.cfgenwp-editor-element-container').each(function(){cfgenwp_adjustElementHeightToLeftContent(jQuery(this));});
								}
				});
				jQuery('#cfgenwp-slider-textinputformat-borderwidth-value').html( jQuery('#cfgenwp-slider-textinputformat-borderwidth').slider('value') );
				
	// ADD THE VALUES IN THE TEXTAREA
	jQuery('.cfgenwp-bulkoptions').click(function(){
		
		jQuery('.cfgenwp-bulkoptions').removeClass('cfgenwp-bulkoptions-selected');
		
		jQuery(this).addClass('cfgenwp-bulkoptions-selected');
		
		cfgenwp_bulkoptions_list_name_selected = jQuery(this).closest('.cfgenwp-bulkoptions').find('.cfgenwp-bulkoptions-name').val();
		
		// use val(), not html()
		jQuery('#cfgenwp-bulkoptions-values').empty().val(cfgenwp_bulkoptions[cfgenwp_bulkoptions_list_name_selected].join("\r\n"));
		
	});
	
	
	// BULK OPTIONS ADD THE VALUES IN THE FORM BUILDER
	jQuery('.cfgenwp-bulkoptions-add').click(function(){

		if( jQuery.trim(jQuery('#cfgenwp-bulkoptions-values').val()) )
		{
		var cfgenwp_bulkoptions_values = jQuery.trim(jQuery('#cfgenwp-bulkoptions-values').val()).split('\n');
		
		var cfgenwp_element_options_edit_container = cfgenwp_bulkoptions_target.closest('.cfgenwp-editor-element-container').find('.cfgenwp-sortoption-container');

		// REPLACE EXISTING OPTIONS?
		if(jQuery('#cfgenwp-bulkoptions-replaceexistingoptions').is(':checked'))
		{
			// SELECT REMOVE ALL VALUES
			if(cfgenwp_bulkoptions_element_type == 'select' || cfgenwp_bulkoptions_element_type == 'selectmultiple')
			{
				cfgenwp_bulkoptions_target.find('option').remove();
			}
			
			// CHEBOX RADIO REMOVE ALL VALUES
			if(cfgenwp_bulkoptions_element_type == 'checkbox' || cfgenwp_bulkoptions_element_type == 'radio')
			{
				cfgenwp_bulkoptions_target.find('.cfgenwp-option-content').remove();
			}
			
			cfgenwp_element_options_edit_container.find('.cfgenwp-editoption-container').remove();
		}
		
		jQuery.each(cfgenwp_bulkoptions_values , function(index, value)
		{
		
			// SELECT ADD VALUES
			if(cfgenwp_bulkoptions_element_type == 'select' || cfgenwp_bulkoptions_element_type == 'selectmultiple')
			{
				
				// ADD THE VALUES TO THE EDIT SECTION
				if(cfgenwp_bulkoptions_element_type == 'select')
				{
					jQuery(cfgenwp_formeditor_config['html_editselectoptioncontainer']).appendTo(cfgenwp_element_options_edit_container).addClass('cfgenwp-new-bulkoption-edit');
				}
				
				if(cfgenwp_bulkoptions_element_type == 'selectmultiple')
				{
					jQuery(cfgenwp_formeditor_config['html_editselectmultipleoptioncontainer']).appendTo(cfgenwp_element_options_edit_container).addClass('cfgenwp-new-bulkoption-edit');
				}
				
				// the value is assigned to the edit input at the end of the each() loop (same procedure from select, selectmultiple, checkbox, radio
				
				
				// ADD THE VALUES TO THE ELEMENT
				jQuery(cfgenwp_formeditor_config['html_selectoption']).appendTo(cfgenwp_bulkoptions_target).addClass('cfgenwp-new-bulkoption-value');
				
				jQuery('.cfgenwp-new-bulkoption-value').html(value).prop('value', value);
				
				jQuery('.cfgenwp-new-bulkoption-value').removeClass('cfgenwp-new-bulkoption-value');

			}
			
			// CHECKBOX RADIO ADD VALUES
			if(cfgenwp_bulkoptions_element_type == 'checkbox' || cfgenwp_bulkoptions_element_type == 'radio')
			{
				// ADD THE VALUES TO THE EDIT SECTION
				if(cfgenwp_bulkoptions_element_type == 'checkbox')
				{
					jQuery(cfgenwp_formeditor_config['html_editoptioncheckboxcontainer']).appendTo(cfgenwp_element_options_edit_container).addClass('cfgenwp-new-bulkoption-edit');
				}
				
				if(cfgenwp_bulkoptions_element_type == 'radio')
				{
					jQuery(cfgenwp_formeditor_config['html_editoptionradiocontainer']).appendTo(cfgenwp_element_options_edit_container).addClass('cfgenwp-new-bulkoption-edit');
				}
				
				// the value is assigned to the edit input at the end of the each() loop (same procedure from select, selectmultiple, checkbox, radio
				
				
				// ADD THE VALUES TO THE ELEMENT
				if(cfgenwp_bulkoptions_element_type == 'checkbox')
				{
					jQuery(cfgenwp_formeditor_config['html_optioncheckboxcontainer']).appendTo(cfgenwp_bulkoptions_target).addClass('cfgenwp-new-bulkoption-value');
				}
				
				if(cfgenwp_bulkoptions_element_type == 'radio')
				{
					jQuery(cfgenwp_formeditor_config['html_optionradiocontainer']).appendTo(cfgenwp_bulkoptions_target).addClass('cfgenwp-new-bulkoption-value');
				}
				
				
				cfgenwp_formatOptionWithCurrentInputFormat(cfgenwp_bulkoptions_target.find('.cfgenwp-option-content'));
				
				
				jQuery('.cfgenwp-new-bulkoption-value').find('input').prop('value', value);
				
				jQuery('.cfgenwp-new-bulkoption-value').find('label').html(value);
				
				jQuery('.cfgenwp-new-bulkoption-value').removeClass('cfgenwp-new-bulkoption-value');
				
				
			} // checkbox || radio
				
			jQuery('.cfgenwp-new-bulkoption-edit').find('.cfgenwp-editoption-input-label').val(value);
			
			// split? same procedure for addoption and addbulkoption
			if(jQuery('.cfgenwp-new-bulkoption-edit').closest('.cfgenwp-element-editor-container').find('.cfgenwp-customoptionvalue-toggle').is(':checked'))
			{
				jQuery('.cfgenwp-new-bulkoption-edit').find('.cfgenwp-editoption-input-label').addClass('cfgenwp-editoption-input-split');
				jQuery('.cfgenwp-new-bulkoption-edit').find('.cfgenwp-editoption-input-value').addClass('cfgenwp-editoption-input-split').show();
				jQuery('.cfgenwp-new-bulkoption-edit').find('.cfgenwp-editoption-input-value').val(jQuery('.cfgenwp-new-bulkoption-edit').find('.cfgenwp-editoption-input-label').val());
			}
			
			// the removeClass must come after setting the new values
			jQuery('.cfgenwp-new-bulkoption-edit').removeClass('cfgenwp-new-bulkoption-edit');
			
		}); // each
		
		// LEFT ALIGNMENT CHECK FOR CHECKBOX AND RADIO
		if(cfgenwp_bulkoptions_element_type == 'checkbox' || cfgenwp_bulkoptions_element_type == 'radio')
		{
			// alignment: only apply to current and new options when the alignment is set to left
			var element_container = cfgenwp_bulkoptions_target.closest('.cfgenwp-editor-element-container');
			
			if(element_container.find('.cfgenwp-option-positionning:checked').val() == 'cfgenwp-alignleft')
			{
				cfgen_applyAlignLeftToOptions(element_container);
			}
		}
				
		
		cfgenwp_updateInputAndLabelHtmlId(cfgenwp_bulkoptions_target.closest('.cfgenwp-editor-element-container'));
			
			
		cfgenwp_setElementContainerHeight(cfgenwp_bulkoptions_target.closest('.cfgenwp-editor-element-container'));

		} // if trim '#cfgenwp-bulkoptions-values
		
		jQuery.fancybox.close();
		
	});
	
	
	function cfgen_applyAlignLeftToOptions(element_container){
				var css = {};
				css['width'] = element_container.find('.cfgenwp-sliderelement-option-width-value').val();
				
				element_container.find('.cfgenwp-option-content').css(cfgen_buildAlignOptionLeftCss(css));
				
	}


	
	jQuery('body').on('keyup', '.cfgenwp-formmessage-fontsize-input-value, .cfgenwp-formmessage-width-input-value', function(){
										
		var inputvalue = jQuery(this);
	
		var slider = inputvalue.closest('.cfgenwp-elementproperty-c').find('.ui-slider');
									
		if(cfgenwp_isInt(inputvalue.val()))
		{
			cfgenwp_delay_keyup(function(){
				slider.slider('option', 'value', inputvalue.val());
			}, 700 );
		} else{
			inputvalue.val( slider.slider('option', 'value') );
		}
								
	});
		
								
	// FORM MESSAGE FONT FAMILY
	jQuery('.cfgenwp-formmessage-fontfamily').change(function(){
						
		var fontfamily = jQuery(this).val();
						
		var target = jQuery(this).closest('.cfgenwp-formconfig-r').find('.cfgenwp-formmessage-preview');
		
		
		if(jQuery(this).find('option:selected').hasClass('cfgenwp-googlewebfonts'))
		{
			if(jQuery.inArray(fontfamily, cfgenwp_googlewebfonts_added) == -1)
			{
				cfgenwp_googlewebfonts_added.push(fontfamily);
			
				jQuery('body').append("<link href='"+cfgenwp_getGoogleWebFontsUrl(fontfamily)+"' rel='stylesheet' type='text/css'>");
				// don't use jQuery.get or jQuery load => Origin http://127.0.0.1 is not allowed by Access-Control-Allow-Origin.
			}
		}
						
		target.css('font-family', fontfamily);
						
	});
		
		
	// FORM MESSAGE FONT WEIGHT
	jQuery('.cfgenwp-formmessage-fontweight').change(function(){
																					
		var target = jQuery(this).closest('.cfgenwp-formconfig-r').find('.cfgenwp-formmessage-preview');
		
		target.css('font-weight', jQuery(this).val());
		
	});
	
	
	// FORM MESSAGE FONT STYLE
	jQuery('.cfgenwp-formmessage-fontstyle').change(function(){
																					
		var target = jQuery(this).closest('.cfgenwp-formconfig-r').find('.cfgenwp-formmessage-preview');
						
		target.css('font-style', jQuery(this).val());

	});
	
	jQuery('.cfgenwp-formmessage-toggle-changeformat').click(function(){
	
		var target = jQuery(this).closest('.cfgenwp-formconfig-r').find('.cfgenwp-formmessage-changeformat-container');

		
		if(target.is(':visible'))
		{
			target.slideUp(100);
		} else{
			target.slideDown(100);
		}
	});
	jQuery('.cfgenwp-accordion-content').hide();
	
	jQuery('.cfgenwp-accordion-title, .cfgenwp-bulkoptions').disableSelection();
	
	jQuery('#cfgenwp-bulkoptions-cancel').click(function(){
		jQuery.fancybox.close();
	});
	
	
	
	// ACCORDION FOR BULK OPTIONS
	// EXTEND THE FIRST ITEM OF THE ACCORDION
	jQuery('.cfgenwp-accordion-container .cfgenwp-accordion-title').first().addClass('cfgenwp-accordion-title-selected cfgenwp-accordion-arrow-down');
	
	jQuery('.cfgenwp-accordion-container .cfgenwp-accordion-content').first().show();
	
	// CLICK EVENT
	jQuery('.cfgenwp-accordion-title').click(function(){
													  
		jQuery('.cfgenwp-accordion-title').removeClass('cfgenwp-accordion-title-selected');
		
		jQuery(this).addClass('cfgenwp-accordion-title-selected');
		
		var title = jQuery(this);
		
		var accordion_container = jQuery(this).closest('.cfgenwp-accordion-container');
		
		var accordion_item = jQuery(this).closest('.cfgenwp-accordion-item');
		
		
		accordion_container.find('.cfgenwp-accordion-title').removeClass('cfgenwp-accordion-arrow-down').addClass('cfgenwp-accordion-arrow-right');
		
		accordion_container.find('.cfgenwp-accordion-content').slideUp(100);	
		
		if(!accordion_item.find('.cfgenwp-accordion-content').is(':visible'))
		{
			title.removeClass('cfgenwp-accordion-arrow-right').addClass('cfgenwp-accordion-arrow-down');
			
			accordion_item.find('.cfgenwp-accordion-content').slideDown(100);
		} else{
			title.removeClass('cfgenwp-accordion-arrow-right').removeClass('cfgenwp-accordion-arrow-down cfgenwp-accordion-title-selected').addClass('cfgenwp-accordion-arrow-right');
			
			accordion_item.find('.cfgenwp-accordion-content').slideUp(100);
		}
	});

	jQuery('#cfgenwp-scrolltotop').click(function(){
		jQuery('html, body').animate({scrollTop: 0},'fast'); 	
	})

}); // end document ready

	function cfgenwp_adjustElementSetWidth(element_container)
	{
		var element_container = jQuery(element_container).closest('.cfgenwp-editor-element-container');
		var element_set = element_container.find('.cfgenwp-element-set');
		
		if(element_container.find('.cfgenwp-option-positionning.cfgenwp-alignleft').is(':checked') 
			&& (element_container.find('.cfgenwp-label-positionning.cfgenwp-alignleft').is(':checked') || element_container.find('.cfgenwp-label-positionning.cfgenwp-alignright').is(':checked'))
			)
		{
			
			var cfg_element_container = element_container.find('.cfgenwp-element-container');
			//var cfg_element_container_width = parseInt(cfg_element_container.innerWidth());
			var cfg_element_container_width = parseInt(cfg_element_container.outerWidth(true)); //.outerWidth( [includeMargin] )
				
			var label = element_container.find('.cfgenwp-label');
			//var label_width = parseInt(label.innerWidth());
			var label_width = parseInt(label.outerWidth(true)); //.outerWidth( [includeMargin] )
			
			var element_set_width = cfg_element_container_width - label_width;
			
			element_set.css({'width':element_set_width+'px'});
			//element_set.css({'background-color':'#ff0044'});
			/*
			//console.log('label_width     element_set_width     cfg_element_container_width');
			//console.log(label_width+'                                     '+element_set_width+'                              '+cfg_element_container_width);
			//console.log('------------------------------------------------------------------');
			*/
			
		} else{
			element_set.css({'width':''});
			//element_set.css({'background-color':'#0f0'});
		}

	}

	function cfgenwp_adjustElementHeightToLeftContent(element_container)
	{
		// ^--- if updated, also update cfgenwp_adjustElementHeightToLeftContent in cfgwp.js 
		element_container = jQuery(element_container);

		if(parseInt(element_container.find('.cfgenwp-element-container').innerHeight()) + 20 > element_container.innerHeight())
		{// ^-- +20 helps adjusting the height comparison: always return the right result on focusout event for paragraphs
			var adjust_element_editor_height = parseInt(element_container.find('.cfgenwp-element-container').innerHeight());
			element_container.css({'height':adjust_element_editor_height});
			
			
			//	console.log('new height: '+adjust_element_editor_height);
		} else{
			
			var adjust_element_editor_height = parseInt(element_container.find('.cfgenwp-element-editor-container').innerHeight());
			
			element_container.css({'height':adjust_element_editor_height});
		}
	}


	
	/**
	 * Update default width values on change/slide events with WIDTH SLIDER
	 */
	function cfgen_sliderUpdateDefaultWidthValue(value, target_id, slidervaluecontainer_id)
	{
		jQuery(slidervaluecontainer_id).val(value);
								
		jQuery(target_id).css('width', value);
						
		if(jQuery(target_id).hasClass('cfgenwp-submit')){
			cfgenwp_formeditor_config['default_width_submit'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-paragraph')){
			cfgenwp_formeditor_config['default_width_paragraph'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-type-textarea')){
			cfgenwp_formeditor_config['default_width_textarea'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-type-text'))
		{
			cfgenwp_formeditor_config['default_width_input'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-type-date')){
			cfgenwp_formeditor_config['default_width_date'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-type-email')){
			cfgenwp_formeditor_config['default_width_email'] = value;
		}
		
		if(jQuery(target_id).hasClass('cfgenwp-type-phone')){
			cfgenwp_formeditor_config['default_width_phone'] = value;
		}

		if(jQuery(target_id).hasClass('cfgenwp-type-url')){
			cfgenwp_formeditor_config['default_width_url'] = value;
		}

		if(jQuery(target_id).hasClass('cfgenwp-captcha-input')){
			cfgenwp_formeditor_config['default_width_captcha'] = value;
		}

	}
	
	/**
	 * Update default width values on change/slide events with HEIGHT SLIDER
	 */
	function cfgen_sliderUpdateDefaultHeightValue(value, target_id, slidervaluecontainer_id)
	{
		jQuery(slidervaluecontainer_id).val(value);
								
		jQuery(target_id).css('height', value);
						
		
		if(jQuery(target_id).hasClass('cfgenwp-type-textarea')){
			cfgenwp_formeditor_config['default_height_textarea'] = value;
		}
		
	}
	
	
	/***
	 * COLOR PICKER
	 */
	
	function cfgen_setUpColorPicker()
	{
		f = jQuery.farbtastic(cfgenwp_colorpicker_id, '');
		f.linkTo(cfgenwp_colorpicker_value); // linked to color input value
		jQuery(cfgenwp_colorpicker_id).fadeIn('fast');
	}
	
	
	function cfgen_updateElementColor()
	{ // ^-- can't be included in colorkit, the function is also called in farbtastic js file
		
			var c = jQuery(cfgenwp_colorpicker_value).val();
			
			jQuery(cfgenwp_colorpicker_value).closest('.cfgenwp-color-container').find('.cfgenwp-colorpicker-ico').css('background-color', c);
			
			var editor_element_container = jQuery(cfgenwp_colorpicker_target).closest('.cfgenwp-editor-element-container');
			
			if(cfgenwp_colorpicker_csspropertyname['color'])
			{
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-title')){
					cfgenwp_formeditor_config['default_color_title'] = c;
					
					// APPLY COLOR VALUE FROM TOP PAN TO COLOR INPUTS IN ELEMENT EDITOR
					editor_element_container.find('.cfgenwp-colorpickervalue').val(c);
					editor_element_container.find('.cfgenwp-colorpickervalue').css('background-color',c);
					editor_element_container.find('.cfgenwp-colorpicker-ico').css('background-color',c);
					
				}
				
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-paragraph')){
					cfgenwp_formeditor_config['default_color_paragraph'] = c;
					
					// APPLY COLOR VALUE FROM TOP PAN TO COLOR INPUTS IN ELEMENT EDITOR
					editor_element_container.find('.cfgenwp-colorpickervalue').val(c);
					editor_element_container.find('.cfgenwp-colorpickervalue').css('background-color',c);
					editor_element_container.find('.cfgenwp-colorpicker-ico').css('background-color',c);
				}
				
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-label')){
					cfgenwp_formeditor_config['default_color_label'] = c;
				}
				
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-formelement')){
					cfgenwp_formeditor_config['default_color_formelement'] = c;
				}
				
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-submit')){
					cfgenwp_formeditor_config['default_color_submit'] = c;
				}
				
				jQuery(cfgenwp_colorpicker_target).css('color', c);
			}
			
			if(cfgenwp_colorpicker_csspropertyname['background-color'])
			{
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-submit')){
					cfgenwp_formeditor_config['default_backgroundcolor_submit'] = c;
				}
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-separator')){
					cfgenwp_formeditor_config['default_backgroundcolor_separator'] = c;
				}
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-formelement')){
					cfgenwp_formeditor_config['default_backgroundcolor_inputformat'] = c;
				}
				jQuery(cfgenwp_colorpicker_target).css('background-color', c);
			}
			
			if(cfgenwp_colorpicker_csspropertyname['border-color'])
			{
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-submit')){
					cfgenwp_formeditor_config['default_bordercolor_submit'] = c;
				}
				jQuery(cfgenwp_colorpicker_target).css('border-color', c);
			}
			
			if(cfgenwp_colorpicker_csspropertyname['border-color'])
			{
				if(jQuery(cfgenwp_colorpicker_target).hasClass('cfgenwp-formelement')){
					cfgenwp_formeditor_config['default_bordercolor_inputformat'] = c;
				}
				jQuery(cfgenwp_colorpicker_target).css('border-color', c);
			}
	}
	


