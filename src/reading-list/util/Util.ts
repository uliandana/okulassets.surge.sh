export default class Util {
    static textEncode(text: string) {
        return text.toLowerCase().replace(/[^0-9A-Za-z\-\s]/g, '').replace(/\-/g, ' ').replace(/\s+/g, '-').replace(/\-$/g, '');
    }
}