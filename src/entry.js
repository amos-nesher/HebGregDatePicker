/**
 * Created by neshera on 2/10/2016.
 */

require("heb-greg-converter.js");
require("heb-year-converter.js");
require("heb-greg-date-picker.js");

$(document).ready(function() {
    $("#date-picker-1").hebGregDatePicker({ });
    $("#date-picker-2").hebGregDatePicker({ });
    $("#date-picker-3").hebGregDatePicker({ });
    $("#date-picker-4").hebGregDatePicker({ });
    $("#date-picker-5").hebGregDatePicker({ });

    $("#output-button").click(printDates);
});

function printDates() {
    var output = "";
    var h, g;
    for (var i=1; i<=5; i++) {
        h = $("#date-picker-" + i).data("hebdate");
        g = $("#date-picker-" + i).data("gregdate");

        output += h + "; " + g + "\n";
    }

    alert( output );
}

