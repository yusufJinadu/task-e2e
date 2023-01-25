export default class Helper {
    constructor(){

    }
        getRandomEmail(length = 10) {
            let string = '';
            let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                string += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return `${string}@yahoo.com`
        }
}