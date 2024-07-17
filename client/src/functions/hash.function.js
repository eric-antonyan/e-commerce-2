export class crypto {
    constructor(private_key) {
        this.private_key = private_key
    }
    
    static encrypt(data) {
        const mykey = crypto.createCipher('aes-128-cbc', private_key);
        const mystr = mykey.update(data, 'utf8', 'hex')
        mystr += mykey.final('hex');
    }

    static decrypt() {
        var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
        mystr += mykey.final('utf8');
    }
}