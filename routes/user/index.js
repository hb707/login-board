const express = require('express')
const router = express.Router()
const alertmove = require('../../util/alert.js')
const user = require('../../models/user.js')
const session = require('express-session')
const Memorystore = require('memorystore')(session)

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/login', (req, res) => {
    let { userid, userpw } = req.body
    let [item] = user.filter(v => (v.userid == userid && v.userpw == userpw))
    //array 내부의 객체만 item에 할당하고 싶어서 item을 []로 감싸줌!
    if (item != undefined) {
        //로그인 할 수 있는 경우
        req.session.user = { ...item } // 세션생성
        res.redirect('/')
    }
    else {
        //로그인 못하는 경우
        res.send(alertmove('/user/login', '아이디와 패스워드를 확인해주세요'))
        res.redirect('/user/login')
    }
})

router.get('/profile', (req, res) => {
    res.render('user/profile')
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session
    })
    res.send(alertmove('/', '로그아웃이 완료되었습니다.'))
})

module.exports = router