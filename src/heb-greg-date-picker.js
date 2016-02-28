/**
 * Created by neshera on 2/18/2016.
 */

(function(window, $) {
    "use restrict";

    var i18n_he_IL = {
        "title": "בחר תאריך",
        "no-date-selected": "לא נבחר תאריך",
        "hebrew-date": "עברי",
        "gregorian-date": "לועזי",
        "save": "שמור",
        "cancel": "בטל",
        "clear": "נקה",
        "tishri": "תשרי",
        "heshvan": "חשוון",
        "kislev": "כסלו",
        "tevet": "טבת",
        "shevat": "שבט",
        "adar": "אדר",
        "adar_b": "אדר ב'",
        "nisan": "ניסן",
        "iyar": "אייר",
        "sivan": "סיון",
        "tammuz": "תמוז",
        "av": "אב",
        "elul": "אלול",
        "heb-day-1": "א'",
        "heb-day-2": "ב'",
        "heb-day-3": "ג'",
        "heb-day-4": "ד'",
        "heb-day-5": "ה'",
        "heb-day-6": "ו'",
        "heb-day-7": "ז'",
        "heb-day-8": "ח'",
        "heb-day-9": "ט'",
        "heb-day-10": "י'",
        "heb-day-11": 'י"א',
        "heb-day-12": 'י"ב',
        "heb-day-13": 'י"ג',
        "heb-day-14": 'י"ד',
        "heb-day-15": 'ט"ו',
        "heb-day-16": 'ט"ז',
        "heb-day-17": 'י"ז',
        "heb-day-18": 'י"ח',
        "heb-day-19": 'י"ט',
        "heb-day-20": "כ'",
        "heb-day-21": 'כ"א',
        "heb-day-22": 'כ"ב',
        "heb-day-23": 'כ"ג',
        "heb-day-24": 'כ"ד',
        "heb-day-25": 'כ"ה',
        "heb-day-26": 'כ"ו',
        "heb-day-27": 'כ"ז',
        "heb-day-28": 'כ"ח',
        "heb-day-29": 'כ"ט',
        "heb-day-30": "ל'",
        "january": "ינואר",
        "february": "פברואר",
        "march": "מרץ",
        "april": "אפריל",
        "may": "מאי",
        "june": "יוני",
        "july": "יולי",
        "august": "אוגוסט",
        "september": "ספטמבר",
        "october": "אוקטובר",
        "november": "נובמבר",
        "december": "דצמבר"
    };

    var i18n_strings = i18n_he_IL;

    function i18n(textkey) {
        if (i18n_strings[textkey]) {
            return i18n_strings[textkey];
        }
        return textkey;
    }

    var hebrewMonthsList = [
        {name: i18n("tishri"), value: 1},
        {name: i18n("heshvan"), value: 2},
        {name: i18n("kislev"), value: 3},
        {name: i18n("tevet"), value: 4},
        {name: i18n("shevat"), value: 5},
        {name: i18n("adar"), value: 6},
        {name: i18n("adar_b"), value: 7},
        {name: i18n("nisan"), value: 8},
        {name: i18n("iyar"), value: 9},
        {name: i18n("sivan"), value: 10},
        {name: i18n("tammuz"), value: 11},
        {name: i18n("av"), value: 12},
        {name: i18n("elul"), value: 13}
    ];

    var hebrewDaysList = [
        i18n("heb-day-1"), i18n("heb-day-2"), i18n("heb-day-3"), i18n("heb-day-4"), i18n("heb-day-5"),
        i18n("heb-day-6"), i18n("heb-day-7"), i18n("heb-day-8"), i18n("heb-day-9"), i18n("heb-day-10"),
        i18n("heb-day-11"), i18n("heb-day-12"), i18n("heb-day-13"), i18n("heb-day-14"), i18n("heb-day-15"),
        i18n("heb-day-16"), i18n("heb-day-17"), i18n("heb-day-18"), i18n("heb-day-19"), i18n("heb-day-20"),
        i18n("heb-day-21"), i18n("heb-day-22"), i18n("heb-day-23"), i18n("heb-day-24"), i18n("heb-day-25"),
        i18n("heb-day-26"), i18n("heb-day-27"), i18n("heb-day-28"), i18n("heb-day-29"), i18n("heb-day-30"),
    ];

    var gregMonthsList = [
        {name: i18n("january"), value: 1},
        {name: i18n("february"), value: 2},
        {name: i18n("march"), value: 3},
        {name: i18n("april"), value: 4},
        {name: i18n("may"), value: 5},
        {name: i18n("june"), value: 6},
        {name: i18n("july"), value: 7},
        {name: i18n("august"), value: 8},
        {name: i18n("september"), value: 9},
        {name: i18n("october"), value: 10},
        {name: i18n("november"), value: 11},
        {name: i18n("december"), value: 12}
    ];

    var alreadyConstruct = false;

    var UIManager = {
        init: function(containerEl, settings) {
            if (alreadyConstruct) {
                return;
            }

            var i;
            var html = "<div class='heb-greg-date-picker ";
            html += settings.direction;
            html += " '>";

            //hebrew date
            html += "<div class='hgdp-date-selector'>";
            html += "<span class='hgdp-label'>" + i18n("hebrew-date") + "</span>";
            //hebrew date - day
            html += "<select id='hgdp-hebrew--day' class='hgdp-day'>";
            for (i=0; i<hebrewDaysList.length; i++) {
                html += "<option value='" + (i+1) + "'>" + hebrewDaysList[i] + "</option>";
            }
            html += "</select>";
            //hebrew date - month
            html += "<select id='hgdp-hebrew--month' class='hgdp-month'>";
            for (i=0; i<hebrewMonthsList.length; i++) {
                html += "<option value='" + hebrewMonthsList[i].value + "'>" + hebrewMonthsList[i].name + "</option>";
            }
            html += "</select>";
            //hebrew date - year
            html += "<input type='text' id='hgdp-hebrew--year' size='6'  class='hgdp-year'/>";
            html += "</div>";

            //gregorian date
            html += "<div class='hgdp-date-selector'>";
            html += "<span class='hgdp-label'>" + i18n("gregorian-date") + "</span>";
            //gregorian date - day
            html += "<select id='hgdp-gregorian--day' class='hgdp-day'>";
            for (i=1; i<=31; i++) {
                html += "<option value='" + i + "'>" + i + "</option>";
            }
            html += "</select>";
            //gregorian date - month
            html += "<select id='hgdp-gregorian--month' class='hgdp-month'>";
            for (i=0; i<gregMonthsList.length; i++) {
                html += "<option value='" + gregMonthsList[i].value + "'>" + gregMonthsList[i].name + "</option>";
            }
            html += "</select>";
            //gregorian date - year
            html += "<input type='text' id='hgdp-gregorian--year' size='5'  class='hgdp-year'/>";
            html += "</div>";

            html += "<div class='hgdp-buttons'>";
            html += "<span class='hgdp-buttons--btn'>" + i18n("save") + "</span>";
            html += "<span class='hgdp-buttons--btn'>" + i18n("cancel") + "</span>";
            html += "<span class='hgdp-buttons--btn'>" + i18n("clear") + "</span>";
            html += "</div>";

            html += "</div>";
            $("body").append(html);

            containerEl.addClass("heb-greg-date-picker--button");

            alreadyConstruct = true;
        },
        setDateOutput: function(containerEl, currentDate) {
            containerEl.html(currentDate);
        }
    };

    function HebGregDatePicker(containerEl, _settings) {
        var containerEl = containerEl,
            settings = _settings,
            currentDate = i18n("no-date-selected");

        if (settings.defaultDate === "now") {
            currentDate = new Date();
        }

        UIManager.init(containerEl, settings);
        UIManager.setDateOutput(containerEl, currentDate);
    }

    $.fn.hebGregDatePicker = function(options) {
        var _settings = $.extend({
            // These are the defaults.
            direction: "rtl",
            defaultDate: "now"
        }, options );

        var hebGregDP = new HebGregDatePicker(this, _settings);
        return this;
    }



})(window, jQuery);
