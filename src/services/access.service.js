'use strict'

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
    SHOP: 'SHOP',
    WRITTER: 'WRITTER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({name, email, password}) => {
        try {
            //b1: check email tồn tại
            const holderShop = await shopModel.findOne({ email }).lean(); 
            //.lean() giúp truy vấn nhanh hơn

            if (holderShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);// tham số t2 là độ khó bao nhiêu
            const newShop = await shopModel.create({
                name: name, email: email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                // create private key, public key
                //private key 
                //tạo xong để cho người dùng và dev k lưu vào hệ thống
                // để asign token

                //public key 
                //sẽ lưu vào hệ thống
                //verify token
                
                const {privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });

                console.log({privateKey, publicKey });// save vào collection keyStore
                
                console.log("kmmmmmmmmm ",  newShop.id);
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                
                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                
                //create token pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey)
                console.log(`Created Token Successed::`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fileds: ["_id", "name", "email"], object: newShop}),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;