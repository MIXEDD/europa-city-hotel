$( document ).ready(function() {

    // opens closes hamburger menu
    $('.hamburger').click(function() {
        if($('.hamburger').hasClass('open')){
            this.classList.toggle("open");
            $('.mobile-menu').toggle();
            $('.responsive-navigation').removeClass('open');
            $('#current-lang').removeClass('display-none');
            $('header .paddings').removeClass('display-none');
            $('.contacts.wrapper').removeClass('display-none');
            $('body').removeClass('overflow-hidden');
        }else {
            this.classList.toggle("open");
            $('.mobile-menu').toggle();
            $('.responsive-navigation').addClass('open');
            $('#current-lang').addClass('display-none');
            $('header .paddings').addClass('display-none');
            $('.contacts.wrapper').addClass('display-none');
            $('body').addClass('overflow-hidden');
        }
    });

    // reused function for toggling certain classes
    function displayToggler(className) {
        $('.'+className).toggle();
    };

    // reusable function for handling language selection
    function dropdownSelectionHandler(object,className) {
        $('.'+className).removeClass('selected');
        object.addClass('selected');
    }

    // toggles language selector
    $('#current-lang').click(function() {
        displayToggler('dropdown');
    });

    // handles clicked language and sets it
    $('.lang-selection').click(function() {
        dropdownSelectionHandler($(this),'lang-selection');
        const langValue = $(this).data('value');
        $('#cur-lang-value').text(langValue);
        $('.mobile-lang-option').removeClass('active');
        $('.mobile-lang-option[value="'+langValue+'"]').addClass('active');
        displayToggler('dropdown');
    });

    // handles language change from the mobile menu
    $('.mobile-lang-option').click(function() {
        $('.lang-selection').removeClass('selected');
        const langValue = $(this).attr('value');
        $('.lang-selection[data-value="'+langValue+'"]').addClass('selected');
        $('#cur-lang-value').text(langValue);
        $('.mobile-lang-option').removeClass('active');
        $('.mobile-lang-option[value="'+langValue+'"]').addClass('active');
    });

    // hides the menu in case of window resize
    $( window ).resize(function() {
        const screenWidth= screen.width;
        if(screenWidth > 1135){
            $('.hamburger').removeClass('open');
            $('.mobile-menu').css('display','none');
            $('.responsive-navigation').removeClass('open');
            $('#current-lang').removeClass('display-none');
            $('header .paddings').removeClass('display-none');
            $('.contacts.wrapper').removeClass('display-none');
            $('body').removeClass('overflow-hidden');
        }
    });

    $('.europa-logo').click(function() {
        window.location.replace('index.html');
    });

});