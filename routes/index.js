const express = require('express')
const router = express.Router()
const alertmove = require('../util/alert.js')
const user = require('../models/user.js')

const userRouter = require('./user')
const boardRouter = require('./board')

router.get('/', (req, res) => {
    const { user } = req.session
    res.render('index', {
        user
    })
})

const Auth = (req, res, next) => {
    let { user } = req.session
    if (user != undefined) {
        //로그인 한 사람
        next()
    }
    else {
        res.send(alertmove('/', '로그인한 사용자만 접근 가능한 게시판입니다'))
    }
}

router.use('/user', userRouter)
router.use('/board', Auth, boardRouter)
// board

// 1. 리스트 2. 글쓰기 get,post 3. 글보기 4. 글수정 get,post 5. 글삭제 get



module.exports = router