module.exports = function check(str, bracketsConfig) {
    var LEFT_BRACKET = 0;
    var RIGHT_BRACKET = 1;
    var bracketsInStr = [];
    var samePaired = [];
    var differentPaired = [];
    var bracketPair;

    for (bracketPair = 0; bracketPair < bracketsConfig.length; bracketPair++) {
        if (bracketsConfig[bracketPair][LEFT_BRACKET] == bracketsConfig[bracketPair][RIGHT_BRACKET]) {
            samePaired[samePaired.length] = bracketsConfig[bracketPair][LEFT_BRACKET];
        } else {
            differentPaired[differentPaired.length] = bracketsConfig[bracketPair];
        }
    }

    function isBracket(charakter) {
        for (bracketPair = 0; bracketPair < bracketsConfig.length; bracketPair++) {
            if ((bracketsConfig[bracketPair][LEFT_BRACKET] == charakter)
                || (bracketsConfig[bracketPair][RIGHT_BRACKET] == charakter))
                return true;
        }
        return false;
    }

    function hasSamePair(charakter) {
        for (bracketPair = 0; bracketPair < samePaired.length; bracketPair++) {
            if (samePaired[bracketPair] == charakter)
                return true;
        }
        return false;
    }

    function isLeftBracket(charakter) {
        for (bracketPair = 0; bracketPair < differentPaired.length; bracketPair++) {
            if (differentPaired[bracketPair][LEFT_BRACKET] == charakter)
                return true;
        }
        ;
        return false;
    }

    function getPairFor(charakter) {
        for (bracketPair = 0; bracketPair < differentPaired.length; bracketPair++) {
            if (differentPaired[bracketPair][RIGHT_BRACKET] == charakter)
                return differentPaired[bracketPair][LEFT_BRACKET];
        }
    }

    for (var i = 0; i < str.length; i++) {
        if (!isBracket(str[i]))
            continue;
        if (hasSamePair(str[i])) {
            if ((bracketsInStr.length != 0) && (bracketsInStr[bracketsInStr.length - 1] == str[i]))
                bracketsInStr.length--;
            else
                bracketsInStr[bracketsInStr.length] = str[i];
        } else {
            if (isLeftBracket(str[i])) {
                bracketsInStr[bracketsInStr.length] = str[i];
            } else {
                if ((bracketsInStr.length != 0) && (bracketsInStr[bracketsInStr.length - 1] == getPairFor(str[i])))
                    bracketsInStr.length--;
                else
                    bracketsInStr[bracketsInStr.length] = str[i];
            }
        }
    }

    if (bracketsInStr.length != 0)
        return false;
    return true;
}