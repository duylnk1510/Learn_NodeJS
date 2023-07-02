'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = String(publicKey);
            
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })
            console.log("oeoeoeoeoe tokeennnn ", tokens);
            return tokens ? tokens.publicKey : null;
        } catch (err) {
            console.log("KeyTokenService error:: ", err);
            return err;
        }
    }
}

module.exports = KeyTokenService;