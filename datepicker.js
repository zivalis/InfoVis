function datepickerOnChange(event) {
    var parseTimeFromDatePicker = d3.timeParse("%Y-%m-%d");
    DateChange(parseTimeFromDatePicker(event.target.value));
}