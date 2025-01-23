/**
 * Split ```str``` into two if there is a new line ("\r\n", "\r", or "\n") inside it.
 * The splitted strings will be stored in an array.
 *
 * For example, the string "Hello\nWorld\nfrom the other side" will turn into ["Hello\n", "World\n",
 * "from the other side\n"].
 *
 * @param str - The string which will be splitted
 * @returns the splited lines
 */
export function splitIntoNewLines(str) {
    return str
        .replace(/\n/g, "\r\n")
        .split("\n")
        .map(line => line.replace(/\r/g, "").concat("\n"));
}
export function guidGenerator() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
