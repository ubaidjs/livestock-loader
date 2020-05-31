const TimeZone = (date) => {
    var timezone = date.toString().split("(");
    var settimezon = timezone[1].substring(0, timezone[1].toString().length - 1);
    return settimezon;
}

export default TimeZone;