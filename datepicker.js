function datepickerOnChange(dateStr) {
    console.log("datepickerOnChange called");
    var parseTimeFromDatePicker = d3.timeParse("%m/%d/%Y");
    DateChange(parseTimeFromDatePicker(dateStr));
}
/* Init Datepicker */
$( function() {
    $( "#input-datepicker" ).datepicker( {
        onSelect: function(dateStr) {
            datepickerOnChange(dateStr);
        },
        dateFormat: "mm/dd/yy",
        maxDate: "12/31/2020",
        minDate: "01/01/2020",
        defaultDate: "01/01/2020",
    });
    $("#calendar_button").click(function () {
        console.log("called");
        $( "#input-datepicker" ).datepicker("show");
    });
} );
