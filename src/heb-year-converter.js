/**
 * Created by neshera on 7/7/2015.
 *
 */
(function(window) {

    var hebYehidot = [
        '',
        'א',
        'ב',
        'ג',
        'ד',
        'ה',
        'ו',
        'ז',
        'ח',
        'ט',
        ''
    ];

    var hebAsarot = [
        '',
        'י',
        'כ',
        'ל',
        'מ',
        'נ',
        'ס',
        'ע',
        'פ',
        'צ',
        ''
    ];

    var hebMeot = [
        '',
        'ק',
        'ר',
        'ש',
        'ת',
        'תק',
        'תר',
        'תש',
        'תת',
        'תתק',
        ''
    ];

    var hebMeotReverse = [
        '',
        'ק',
        'ר',
        'ש',
        'ת',
        'קת',
        'רת',
        'שת',
        'תת',
        'קתת',
        ''
    ];

    function reverse(s) {
        var o = '';
        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];
        return o;
    }

    function findLetterNum(letterArr, yearStr) {
        var i;
        for (i=letterArr.length-2; i>0; i--) {
            if (yearStr.indexOf(letterArr[i]) === 0) {
                break;
            }
        }
        /*if (i === letterArr.length) {
         i = 0;
         }*/
        return i;
    }

    function num2Letters(year) {
        var alafimStr="", alafim, meot, asarot, yehidot;
        alafim = Math.floor(year / 1000);

        if (alafim > 0) {
            alafimStr = hebYehidot[alafim] + "'";
        }
        meot = Math.floor(  (year % 1000)/100);
        if (meot === 0) meot=10;
        asarot= Math.floor( (year % 100) / 10);
        if (asarot === 0) asarot=10;
        yehidot = (year % 10);
        if (yehidot === 0)
            return alafimStr + hebMeot[meot]+ '"' + hebAsarot [asarot] ;
        else
            return alafimStr + hebMeot[meot]+ hebAsarot [asarot] + '"' + hebYehidot [yehidot ];
    };

    function letters2Num(yearStr) {
        var alafim, meot, asarot, yehidot;
        yearStr = yearStr.replace("'", "");
        yearStr = yearStr.replace('"', '');
        yearStr = reverse(yearStr);

        //look for yehidot
        yehidot = findLetterNum(hebYehidot, yearStr);
        if (yehidot > 0 ) {
            yearStr = yearStr.substr(1);
        }

        //look for asarot
        asarot = findLetterNum(hebAsarot, yearStr);
        if (asarot > 0) {
            yearStr = yearStr.substr(1);
        }
        //look for meot
        meot = findLetterNum(hebMeotReverse, yearStr);
        if (meot > 0) {
            yearStr = yearStr.substr(hebMeotReverse[meot].length);
        }

        //look for alafim
        alafim = findLetterNum(hebYehidot, yearStr);

        var yearResult = alafim*1000 + meot*100 + asarot*10 + yehidot;
        if (! jQuery.isNumeric(yearResult) || yearResult == 0) {
            yearResult = -1;
        }
        return yearResult
    };

    window.HebYearConverter = {
        num2letters: num2Letters,
        letters2num: letters2Num
    };

})(window);