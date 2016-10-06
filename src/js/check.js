function getMessage(a, b) {
    if (typeof a == "boolean") {
        if (a) {
            return "Я попал в " + b;
        } else {
            return "Я никуда не попал";
        }
    } else if (typeof a == "number") {
        return "Я прыгнул на " + a * 100 + " сантиметров";
    } else if (Array.isArray(a) && typeof b == "undefined") {
        var numberOfSteps = 0;
        for (var i = 0; i < a.length; i++) {
            numberOfSteps += a[i];
        }
        return "Я прошёл " + numberOfSteps + " шагов"
    } else if (Array.isArray(a) && Array.isArray(b)) {
        var distancePath = 0;
        for (var i = 0; i < a.length; i++) {
            distancePath += a[i] * b[i];
        }
        return "Я прошёл " + distancePath + " метров";
    } else {
        return "Переданы неккоректные данные";
    }
}