

export function isNullOrUndefined(obj) {
    try {
        if (obj !== null && obj !== undefined) {
            return false;
        }
        return true;
    } catch (err) { return false; }
}

export function isAnyItemsNullOrUndefined() {
    for (var i = 0; i < arguments.length; ++i) {
        if (isNullOrUndefined(arguments[i])) {
            return true;
        }
    }
    return false;

}

export function isAnyItemOrArrayNullOrUndefined() {
    for (var i = 0; i < arguments.length; ++i) {
        if (Array.isArray(arguments[i]) && isArrayNullOrEmpty(arguments[i])) {
            return true
        }
        else if (isNullOrUndefined(arguments[i])) {
            return true;
        }
    }
    return false;
}

export function isArrayNullOrEmpty(arrayObject) {
    if (!isNullOrUndefined(arrayObject) && Array.isArray(arrayObject) && arrayObject.length >> 0) {
        return false;
    } else { return true; }
}