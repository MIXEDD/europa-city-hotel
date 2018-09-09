$( document ).ready(function() {

    // set's today's date on page launch
    setCheckDates();

    //sets booking dates
    jQuery('.date-picker-check-in').daterangepicker({
        "maxYear": 3,
        "parentEl": ".check-in",
        opens: 'left',
        opens: 'right'
    },function (start,end) {
        const startDay = start.format('DD');
        const endDay = end.format('DD');
        const startMonth = start.format('MMMM');
        const endMonth = end.format('MMMM');
        updateDates(startDay,endDay,startMonth,endMonth);
    });

    // hides date picker
    jQuery('.daterangepicker').css('display','none');

    // opens date picker from the check-out tab
    $('.date-picker-check-out').click(function(){
        jQuery('.date-picker-check-in').click();
    });

    // function to update the check-in/out dates
    function updateDates(startDay,endDay,startMonth,endMonth) {
        $('#todays-date').val(startDay);
        $('#current-month').text(startMonth);
        $('#checkout-date').val(endDay);
        $('#checkout-month').text(endMonth);
    }

    // function to set dates on launch
    function setCheckDates(){
        const date = moment();
        const todaysDate = date.format('DD');
        const nextDayDate = date.add(1,'days').format('DD');
        const currentMonth = date.format('MMMM');
        const nextDayMonth = date.add(1,'days').format('MMMM');
        $('#todays-date').val(todaysDate);
        $('#current-month').text(currentMonth);
        $('#checkout-date').val(nextDayDate);
        $('#checkout-month').text(nextDayMonth);
    }

    // handles guests value increase
    $( '#guest-arrow-up' ).click(function() {
        const noOfGuest = $('#guests-count').val();
        let incGuests = parseInt(noOfGuest) + 1;
        if(incGuests < 10) incGuests = '0' + incGuests;
        $('#guests-count').val(incGuests);
    });

    // handles guest value decrement
    $( '#guest-arrow-down' ).click(function() {
        const noOfGuest = $('#guests-count').val();
        let incGuests = parseInt(noOfGuest) - 1;
        if(incGuests <= 0) return;
        if(incGuests < 10) incGuests = '0' + incGuests;
        $('#guests-count').val(incGuests);
    });

    // selects the use clicked room
    $( '.room' ).click(function() {
        const curRoom = $(this);
        $('.room').removeClass('selected');
        curRoom.addClass('selected');
    });

});
