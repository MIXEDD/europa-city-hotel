//Populates google maps API
function initMap() {
    const style= "[{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e9e9e9\"},{\"lightness\":17}]},{\"featureType\":\"landscape\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"},{\"lightness\":20}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":17}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":29},{\"weight\":0.2}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":18}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":16}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"},{\"lightness\":21}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dedede\"},{\"lightness\":21}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"visibility\":\"on\"},{\"color\":\"#ffffff\"},{\"lightness\":16}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"saturation\":36},{\"color\":\"#333333\"},{\"lightness\":40}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f2f2f2\"},{\"lightness\":19}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#fefefe\"},{\"lightness\":20}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#fefefe\"},{\"lightness\":17},{\"weight\":1.2}]}]";
    const uluru = {lat: 54.687019, lng: 25.262826};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru,
        styles: JSON.parse(style)
    });
    const image = 'images/icons/location-pointer@2x.svg';
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon:image
    });
}


jQuery( document ).ready(function() {

    function displayToggler(className) {
        $('.'+className).toggle();
    };

    function dropdownSelectionHandler(object,className) {
        $('.'+className).removeClass('selected');
        object.addClass('selected');
    }
    // prevents from refreshing page after form submit
    $("#enquiry-form").submit(function(e) {
        e.preventDefault();
    });

    // toggles enquiries
    $('.enquiry-selector').click(function() {
        displayToggler('type-of-enquiry');
    });

    // handles enquiry select
    $('p.option').click(function() {
        const option = $(this);
        dropdownSelectionHandler(option,'option');
        $('.visible-option-field').text(option.text());
        $('.visible-option-field').addClass('correct');
    });

});

// validates query form
function validateQueryForm() {
    //clear previous errors
    clearAllFormErrors();

    let currentFieldObj;
    let validationResult;
    let errorFound = false;
    const errorClasses = ['error-field','error-select','error-textarea'];

    // first name validation
    const firstNameCriteria = {
        minLength:2,
        maxLength:18,
        regExpNumbers: /\d/g, // checks for numbers in a string
        regExpSC:new RegExp('[ !@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]') // check for special characters in a string
    };
    currentFieldObj = jQuery('input[name="firstname"]');
    const firstNameValue = currentFieldObj.val();
    validationResult = (firstNameValue.length < firstNameCriteria.minLength || firstNameValue.length > firstNameCriteria.maxLength || firstNameCriteria.regExpNumbers.test(firstNameValue) || firstNameCriteria.regExpSC.test(firstNameValue)) ? false : true;
    if(!validationResult) errorFound = markErrorFormFields(currentFieldObj,errorClasses[0]);


    //email validation
    const emailCriteria = {
        //email regular expression
        regExpEmail: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    };
    currentFieldObj = jQuery('input[name="email"]');
    const emailValue = currentFieldObj.val();
    validationResult = (!emailCriteria.regExpEmail.test(emailValue)) ? false : true;
    if(!validationResult) errorFound = markErrorFormFields(currentFieldObj,errorClasses[0]);

    //phone validation
    const phoneCriteria = {
        minLength:7,
        regExpPhone: new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$') //regular expression for phone no
    };
    currentFieldObj = jQuery('input[name="phone"]');
    const phoneValue = currentFieldObj.val();
    validationResult = ( phoneValue.length < phoneCriteria.minLength || !phoneCriteria.regExpPhone.test(phoneValue)) ? false : true;
    if(!validationResult) errorFound = markErrorFormFields(currentFieldObj,errorClasses[0]);

    //selection validation
    currentFieldObj = jQuery('p.option');
    const parentDiv = jQuery('.enquiry-selector');
    validationResult = currentFieldObj.hasClass('selected');
    if(!validationResult) errorFound = markErrorFormFields(parentDiv,errorClasses[1]);

    //message box validation
    const msgCriteria = {
        minLength:5
    };
    currentFieldObj = jQuery('textarea[name="message"]');
    const msgValue = currentFieldObj.val();
    validationResult = ( msgValue.length < msgCriteria.minLength) ? false : true;
    if(!validationResult) errorFound = markErrorFormFields(currentFieldObj,errorClasses[2]);

    //final for submission condition
    if(errorFound)
        return false;
     else{
        clearForm();
        jQuery('.question-form').append('<p id="confirmation-msg">Thank you! Your message has been sent.</p>');
        return true;
    }
}

// marks error fields in the form
function markErrorFormFields(currentObj,classname) {
    currentObj.addClass(classname);
    const errorElem = '<p class="error-text">*This field is compulsory</p>';
    currentObj.after(errorElem);
    return true;
}
// clears all error fields in the form
function clearAllFormErrors() {
    jQuery('.input-field').removeClass('error-field');
    jQuery('.enquiry-selector').removeClass('error-select');
    jQuery('.textarea-field').removeClass('error-textarea');
    jQuery('.error-text').remove();
}
// clears form input data
function clearForm() {
    jQuery('.form-field').val('');
    jQuery('.visible-option-field').text('Type of enquiry');
}

