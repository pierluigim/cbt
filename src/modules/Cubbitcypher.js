export class Cubbitcypher {
    constructor(key) {
        this.asciiStart = 32;
        this.asciiEnd = 125;
        this.asciiInterval = this.asciiEnd - (this.asciiStart - 1);
        this.chunkSize = key.length;
        // set shifting positions
        this.shifting = this.asciiSum(key) % this.asciiInterval;
    }

    decrypt(message) {
        // split message in chunks
        let arrayChunks = message.match(new RegExp(".{1," + this.chunkSize + "}", 'g'))

        //console.log("decrypt: " + message);
        for (let i = 0; i < arrayChunks.length; i += 1) {
            var tmpChunk = arrayChunks[i].split("").reverse().join("");
            arrayChunks[i] = this.charShiftToRight(this.shifting, tmpChunk).split("").reverse().join("");
        }
        return arrayChunks.join('');
    }

    encrypt(message) {
        // split message in chunks
        let arrayChunks = message.match(new RegExp(".{1," + this.chunkSize + "}", 'g'))

        for (let i = 0; i < arrayChunks.length; i += 1) {
            var tmpChunk = arrayChunks[i].split("").reverse().join("");
            arrayChunks[i] = this.charShiftToLeft(this.shifting, tmpChunk).split("").reverse().join("");
        }
        return arrayChunks.join('');
    }

    asciiSum(str) {
        let sum = 0;
        for (let i = 0; i < str.length; i += 1) {
            sum += str[i].charCodeAt(0);
        }
        return sum;
    }

    charShiftToLeft(shiftingPos, str) {
        let arrayStr = str.split('');
        let rawPos, asciiCode = '';

        for (let i = 0; i < arrayStr.length; i += 1) {
            rawPos = arrayStr[i].charCodeAt(0) + shiftingPos;
            if (rawPos <= this.asciiEnd) {
                arrayStr[i] = String.fromCharCode(rawPos);

            } else {
                asciiCode = this.asciiStart + (rawPos - (this.asciiEnd + 1));
                arrayStr[i] = String.fromCharCode(asciiCode);
            }
        }
        return arrayStr.join('');
    }

    charShiftToRight(shiftingPos, str) {
        let arrayStr = str.split('');
        let rawPos, asciiCode = '';

        for (let i = 0; i < arrayStr.length; i += 1) {
            rawPos = arrayStr[i].charCodeAt(0) - shiftingPos;
            if (rawPos >= this.asciiStart) {
                arrayStr[i] = String.fromCharCode(rawPos);

            } else {
                asciiCode = this.asciiEnd - (this.asciiStart - (rawPos + 1));
                arrayStr[i] = String.fromCharCode(asciiCode);
            }
        }
        return arrayStr.join('');
    }
}