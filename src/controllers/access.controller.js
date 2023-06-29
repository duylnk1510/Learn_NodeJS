'use strict'

class AccessController {

    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            // 201: created (tạo thành công)// thế giới chung
            return res.status(201).json({
                code: '2001', // riêng tự định nghĩa
                metadata: {userid: 1 }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController();