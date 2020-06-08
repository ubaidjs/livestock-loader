import TimeZone from "./TimeZone";
import moment from 'moment'
const GetCurrentTimeZone = (date) =>
{
 var Times = moment(date).format('h:mm A')
  var timezone =   TimeZone(date)
   return Times+' '+timezone;
}

export default GetCurrentTimeZone;