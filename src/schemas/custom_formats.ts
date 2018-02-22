export const bigNumberFormat = function(input) {
    const regex = RegExp("^\\d+(\\.\\d+)?$");
    // The input's format only matters if the input is required, in which case
    // the validator will throw an error for an undefined input at another point. Hence, we do not
    // need to validate presence here.
    return input === undefined || (input.isBigNumber && regex.test(input.toString()));
};

export const wholeBigNumberFormat = function(input) {
    const regex = RegExp("^\\d+$");
    return input === undefined || (input.isBigNumber && regex.test(input.toString()));
};
