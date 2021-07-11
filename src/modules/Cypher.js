'use strict';
const crypto = require('crypto')

export class Cypher {
    constructor(key) {
        this.resizedIV = Buffer.allocUnsafe(16);
        this.iv = crypto
            .createHash("sha256")
            .update("myHashedIV")
            .digest();
        this.key = key;
        this.iv.copy(this.resizedIV);
    }

    async encrypt(message) {
        const key = crypto
                .createHash("sha256")
                .update(this.key)
                .digest(),
            cipher = crypto.createCipheriv("aes256", key, this.resizedIV),
            msg = [];

        msg.push(cipher.update(message, "binary", "hex"));
        msg.push(cipher.final("hex"));
        //console.log(msg.join(""));
        return msg.join("");
    }

    async decrypt(message) {
        const key = crypto
                .createHash("sha256")
                .update(this.key)
                .digest(),
            decipher = crypto.createDecipheriv("aes256", key, this.resizedIV),
            msg = [];

        msg.push(decipher.update(message, "hex", "binary"));

        msg.push(decipher.final("binary"));
        return msg.join("");
    }
}