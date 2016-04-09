/**
 * Created by neshera on 2/18/2016.
 */

/**
 * TODO mark error if year (greg and hebrew) are not correct
 * TODO handle Adar A and Adar B for leap and non leap years
 * TODO Add button to the panel - "now" for setting now date
 * TODO refactor code and clean it.
 * TODO set distribution code.
 */

(function(window, $, HebGregConverter, HebYearConverter) {
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
        "dummy-zero",
        i18n("heb-day-1"), i18n("heb-day-2"), i18n("heb-day-3"), i18n("heb-day-4"), i18n("heb-day-5"),
        i18n("heb-day-6"), i18n("heb-day-7"), i18n("heb-day-8"), i18n("heb-day-9"), i18n("heb-day-10"),
        i18n("heb-day-11"), i18n("heb-day-12"), i18n("heb-day-13"), i18n("heb-day-14"), i18n("heb-day-15"),
        i18n("heb-day-16"), i18n("heb-day-17"), i18n("heb-day-18"), i18n("heb-day-19"), i18n("heb-day-20"),
        i18n("heb-day-21"), i18n("heb-day-22"), i18n("heb-day-23"), i18n("heb-day-24"), i18n("heb-day-25"),
        i18n("heb-day-26"), i18n("heb-day-27"), i18n("heb-day-28"), i18n("heb-day-29"), i18n("heb-day-30")
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

    var settings = {
        direction: "rtl",
        defaultDate: "now",
        isHebrewYearLetters: true,
        saveDate: saveDate,
        clearDate: clearDate
    };

    var alreadyConstruct = false,
        currentContainerEl = null;

    var UIManager = {
        init: function() {
            if (alreadyConstruct) {
                return;
            }

            var i,
                initSelf = this,
                html = "<div class='heb-greg-date-picker ";

            html += settings.direction;
            html += " '>";

            //hebrew date
            html += "<div class='hgdp-date-selector'>";
            html += "<span class='hgdp-label'>" + i18n("hebrew-date") + "</span>";
            //hebrew date - day
            html += "<select id='hgdp-hebrew--day' class='hgdp-day'>";
            for (i=1; i<hebrewDaysList.length; i++) {
                html += "<option value='" + i + "'>" + hebrewDaysList[i] + "</option>";
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
            html += "<span class='hgdp-buttons--btn' data-btn='save'>" + i18n("save") + "</span>";
            html += "<span class='hgdp-buttons--btn' data-btn='cancel'>" + i18n("cancel") + "</span>";
            html += "<span class='hgdp-buttons--btn' data-btn='clear'>" + i18n("clear") + "</span>";
            html += "</div>";

            html += "</div>";
            $("body").append(html);

            initSelf.hide();

            /**
             * Add buttons actions
             */
            $(".hgdp-buttons--btn").click(function() {
                var action = $(this).data("btn");
                switch (action) {
                    case "save":
                        if (settings.saveDate) {
                            settings.saveDate(settings.isHebrewYearLetters);
                        }
                        break;

                    case "cancel":
                        initSelf.hide();
                        break;

                    case "clear":
                        if (settings.clearDate) {
                            settings.clearDate();
                        }
                        break;
                }
            });

            function hidePopupOnEvent() {

            }

            /**
             * Hide date picker panel when clicking inside and outside the menu
             */
            $(document).mouseup(function (e) {
                var container = $(".heb-greg-date-picker");

                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.hide();
                }
            });

            /**
             * Hide date picker panel when pressing on the ESC key
             */
            $(document).ready(function(){
                $(document).bind('keydown', function(e) {
                    if (e.which == 27) {
                        $(".heb-greg-date-picker").hide();
                    }
                });
            });

            /**
             * Add change() listeners for all input fields in order to update greg/heb dates
             */
            $("#hgdp-hebrew--day, #hgdp-hebrew--month, #hgdp-hebrew--year").change(function() {
                updateByHebrew(settings.isHebrewYearLetters);
            });
            $("#hgdp-gregorian--day, #hgdp-gregorian--month, #hgdp-gregorian--year").change(function() {
                updateByGregorian(settings.isHebrewYearLetters);
            });

            alreadyConstruct = true;
        },

        hide: function() {
            $(".heb-greg-date-picker").hide();
        },

        show: function(containerEl, settings, date) {
            var datePickerEl = $(".heb-greg-date-picker");

            var containerPos = containerEl.offset();
            var top = containerPos.top + containerEl.height() + 1;
            if (settings.direction === "rtl") {
                var right = document.documentElement.clientWidth - containerPos.left - containerEl.outerWidth();
                datePickerEl.css('right', right);
            }
            else {
                datePickerEl.css('left', containerPos.left);
            }
            datePickerEl.css('top', top);
            datePickerEl.show();
        },

        setHebDate: function(year, month, day, isYearsLetters) {
            $("#hgdp-hebrew--year").val(isYearsLetters ? HebYearConverter.num2letters(year) : year);
            $("#hgdp-hebrew--month option[value='" + month + "']").prop("selected", true);
            $("#hgdp-hebrew--day option[value='" + day + "']").prop("selected", true);
        },

        getHebDate: function(isHebrewLetters) { //return array: DD, MM, YYYY
            var hebYear = $("#hgdp-hebrew--year").val();
            var hebMonth = $("#hgdp-hebrew--month option:selected").val() - 0; //convert to int
            var hebDay = $("#hgdp-hebrew--day option:selected").val() - 0; //convert to int
            if (isHebrewLetters) {
                hebYear = HebYearConverter.letters2num(hebYear);
            }
            hebYear = hebYear - 0; // make sure its int
            if (! HebGregConverter.isLeapYear(hebYear) && hebMonth === 6) {
                hebMonth = 7;
            }
            return [hebDay, hebMonth, hebYear];
        },

        setGregDate: function(year, month, day) {
            $("#hgdp-gregorian--year").val(year);
            $("#hgdp-gregorian--month option[value='" + month + "']").prop("selected", true);
            $("#hgdp-gregorian--day option[value='" + day + "']").prop("selected", true);
        },

        getGregDate: function() { //return array: DD, MM, YYYY
            var gregYear = $("#hgdp-gregorian--year").val() - 0;
            var gregMonth = $("#hgdp-gregorian--month option:selected").val() - 0;
            var gregDay = $("#hgdp-gregorian--day option:selected").val() - 0;
            gregMonth--;
            return [gregDay, gregMonth, gregYear];
        },

        //hebDate & gregDate format: D/M/Y
        setDateOutput: function(containerEl, hebDate, gregDate) {
            var hebYear = $("#hgdp-hebrew--year").val();
            var hebMonth = $("#hgdp-hebrew--month option:selected").html();
            var hebDay = $("#hgdp-hebrew--day option:selected").html();
            var gregYear = $("#hgdp-gregorian--year").val();
            var gregMonth = $("#hgdp-gregorian--month option:selected").html();
            var gregDay = $("#hgdp-gregorian--day option:selected").html();
            var output = hebDay + " " + hebMonth + ", " + hebYear + "; " + gregMonth + " " + gregDay + ", " + gregYear;

            containerEl.html(output);
            containerEl.data("hebdate", hebDate);
            containerEl.data("gregdate", gregDate);
        },

        clearContainerOutput: function(containerEl) {
            containerEl.html(i18n("no-date-selected"));
            containerEl.data("hebdate", "");
            containerEl.data("gregdate", "");
        }
    };

    function updateByGregorian(isHebrewLetters) {
        var gregDate = UIManager.getGregDate();
        var hebDate = HebGregConverter.greg2heb(new Date(gregDate[2], gregDate[1], gregDate[0]));
        var hebArr = hebDate.split("/"); // D/M/Y
        UIManager.setHebDate(hebArr[2], hebArr[1], hebArr[0], isHebrewLetters);
    }

    function updateByHebrew(isHebrewLetters) {
        var hebDate = UIManager.getHebDate(isHebrewLetters);
        var gregDate = HebGregConverter.heb2greg(hebDate[2], hebDate[1], hebDate[0]);
        UIManager.setGregDate(gregDate.getFullYear(), gregDate.getMonth() + 1, gregDate.getDate());
    }

    function saveDate(isHebrewYearLetters) {
        var hebDate = UIManager.getHebDate(isHebrewYearLetters);
        var gregDate = UIManager.getGregDate();
        var hebDateOutput = hebDate[0] + "/" + hebDate[1] + "/" + hebDate[2];
        var gregDateOutput = gregDate[0] + "/" + gregDate[1] + "/" + gregDate[2];
         //set container date string
        UIManager.setDateOutput(currentContainerEl, hebDateOutput, gregDateOutput);

        UIManager.hide();
    }

    function clearDate() {
        UIManager.clearContainerOutput(currentContainerEl);
        UIManager.hide();
    }

    function openDatePickerPanel(containerEl, settings) {
        currentContainerEl = containerEl;

        var hebDate,
            hebArr,
            currentDate;

        hebDate = containerEl.data("hebdate");
        hebArr = hebDate.split("/"); // D/M/Y

        currentDate = HebGregConverter.heb2greg(hebArr[2]-0, hebArr[1]-0, hebArr[0]-0);
        UIManager.setGregDate(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate());
        updateByGregorian(settings.isHebrewYearLetters);
        UIManager.show(containerEl, settings, currentDate);
    }

    function HebGregDatePicker(containerEl, _settings) {
        var containerEl = containerEl,
            settings = _settings,
            currentDate = i18n("no-date-selected");

        var hebDate = containerEl.data("hebdate");
        var gregDate = containerEl.data("gregdate");

        if (hebDate) {
            var hebArr = hebDate.split("/"); // D/M/Y
            gregDate = HebGregConverter.heb2greg(hebArr[2]-0, hebArr[1]-0, hebArr[0]-0);
            currentDate = gregDate;
        }
        else if (gregDate) {
            var gregArr = gregDate.split("/"); // D/M/Y
            currentDate = new Date(gregArr[2], gregArr[1], gregArr[0]);
            hebDate = HebGregConverter.greg2heb(currentDate);
        }
        else if (settings.defaultDate === "now") {
            currentDate = new Date();
            gregDate = currentDate.getDate() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getFullYear();
            hebDate = HebGregConverter.greg2heb(currentDate);
        }

        UIManager.init(containerEl, settings, currentDate);
        UIManager.setGregDate(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate());
        updateByGregorian(settings.isHebrewYearLetters);
        UIManager.setDateOutput(containerEl, hebDate, gregDate);

        /**
         * Add button class to the container
         */
        containerEl.addClass("heb-greg-date-picker--button");

        /**
         * Add click event on the container for openning the selector box
         */
        containerEl.click(function() {
            openDatePickerPanel(containerEl, settings);
        });
    }

    $.fn.hebGregDatePicker = function(options) {
        var _settings = $.extend({
            // These are the defaults.
            direction: "rtl",
            defaultDate: "now",
            isHebrewYearLetters: true,
            saveDate: saveDate,
            clearDate: clearDate
        }, options );

        var hebGregDP = new HebGregDatePicker(this, _settings);
        return this;
    };

    UIManager.init()



})(window, jQuery, HebGregConverter, HebYearConverter);
