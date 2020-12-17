/**
 * Formats a number to a string with at least 2 digits
 * @param {*} number 
 */
export default function format(number) {
  var string = number.toString();
  if(string.length < 2) string = "0" + string;
  return string;
}