// 세션생성
// 메인페이지
// 로그인페이지 - get, post
// 마이페이지
// 로그아웃 기능

// 추가로 설치
// npm install express-session memorystore

// -----------------------------기본설정
const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const Memorystore = require('memorystore')(session) // 클래스

const alertMove = require('./util/alert.js')
const user = require('./models/user.js')
const router = require('./routes/index.js')

const app = express()

app.set('view engine', 'html')
nunjucks.configure('views', { express: app })

// 중요한거 3가지
// 1. 암호화 : 겹치지 않게! (나중에 자세히 배울 것) 
// 2. 세션을 저장할 공간 : 서버에 저장 메모리 or 하드 or mySQL ...
// 3. 쿠키의 설정 : 유효기간 등의 설정
const maxAge = 5 * 60 * 1000
let sessionObj = {
    secret: 'hbhb',
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge }), //클래스이므로 new를 이용해서 생성. 5분으로 해둠
    cookie: {
        maxAge: maxAge
    }
}
app.use(session(sessionObj)) // session() : 로그인 시 처음 쿠키를 생성한 후 클라이언트가 매번 요청을 보낼 때 쿠키를 확인하는 미들웨어
app.use(express.urlencoded({ extended: true }))
app.use(router)
// -----------------------------라우터


// -----------------------------서버실행
app.listen(3000, () => {
    console.log("서버실행중")
})

//---------
