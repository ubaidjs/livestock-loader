const PhoneNumberValidation = (number) => {
    if (/^\d{10}$/.test(number)) {
        return true;
    } else {
        return false
    }
}

export default PhoneNumberValidation;