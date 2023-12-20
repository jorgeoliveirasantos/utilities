const Generate = {
    Key: (pass) => {
        let encoder = new TextEncoder();
        let buffer = [];
        let tmp = encoder.encode(pass);
        let i = 0;
        while (buffer.length < 32) {
            buffer.push(tmp[i]);
            if (i == (tmp.length) - 1) {
                i = 0;
            } else {
                ++i;
            }
        }
        return buffer;
    },
    IV: (pass) => {
        let encoder = new TextEncoder();
        let buffer = [];
        let tmp = encoder.encode(pass);
        let i = 0;
        while (buffer.length < 16) {
            buffer.push(tmp[i]);
            if (i == (tmp.length) - 1) {
                i = 0;
            } else {
                ++i;
            }
        }
        return buffer;
    }
};

const EasyCrypto = {
    AESEncrypt: (txt, senha) => {
        let cypher = crypto.createCipheriv("aes-256-cbc", Buffer.from(Generate.Key(senha)), Buffer.from(Generate.IV(senha)));
        let encrypted = cypher.update(txt, "utf-8", "hex");
        encrypted += cypher.final("hex");
        return encrypted;
    },
    AESDecrypt: (txt, senha) => {
        let decypher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(Generate.Key(senha)), Buffer.from(Generate.IV(senha)));
        let decrypted = decypher.update(txt, "hex", "utf-8");
        decrypted += decypher.final("utf-8");
        return decrypted;
    },
    SHA256: (txt) => {
        const hash = crypto.createHash("sha256");
        hash.update(txt);
        return hash.digest('hex');
    },
};

const EasyEncoding = {
    StringToBase64: (txt) => { return btoa(txt) },
    Base64ToString: (txt) => { return atob(txt) },
    StringToHex: (txt) => { return txt.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(""); },
    HexToString: (hex) => { return hex.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("") },
}