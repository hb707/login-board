const express = require('express')
const nunjucks = require('nunjucks')
const router = express.Router()
const alertmove = require('../../util/alert.js')
const boardData = require('../../models/boardData')
const app = express()

const session = require('express-session')
const Memorystore = require('memorystore')(session)

app.set('view engine', 'html')
nunjucks.configure('views', { express: app })

app.use(express.urlencoded({ extended: true }))






router.get('/list', (req, res) => {
    res.render('board/list', {
        boardData
    })
})

router.get('/write', (req, res) => {
    const loginUsername = req.session.user.username
    res.render('board/write', {
        loginUsername
    })
})

router.post('/write', (req, res) => {
    const item = { ...req.body }
    item.viewCount = parseInt(item.viewCount)
    boardData.push(item)
    res.send(alertmove(`/board/view?index=${boardData.length}`, '글작성이 완료되었습니다.'))
})

router.get('/view', (req, res) => {
    const loginUser = req.session.user
    const pageIndex = req.query.index
    const boardContent = boardData[pageIndex - 1]
    const userMatch = (boardContent.username === loginUser.username)
    boardContent.viewCount += 1
    res.render('board/view', {
        pageIndex,
        boardContent,
        userMatch
    })
})

router.get('/update', (req, res) => {
    const loginUser = req.session.user
    const pageIndex = req.query.index
    const boardContent = boardData[pageIndex - 1]
    const userMatch = (boardContent.username === loginUser.username)
    const loginUsername = req.session.user.username
    if (userMatch) {
        res.render('board/update', {
            content: boardData[pageIndex - 1],
            loginUsername
        })
    }
    else {
        res.send(alertmove(`/board/view?index=${pageIndex}`, '변경권한이 없는 글입니다.'))
    }

})

router.post('/update', (req, res) => {
    const item = { ...req.body }
    const pageIndex = req.query.index
    boardData[pageIndex - 1] = item
    res.send(alertmove('/board/view', '글작성이 완료되었습니다.'))
})


router.get('/delete', (req, res) => {
    const loginUser = req.session.user
    const pageIndex = req.query.index
    const boardContent = boardData[pageIndex - 1]
    const userMatch = (boardContent.username === loginUser.username)
    if (userMatch) {
        boardData.splice(pageIndex - 1, 1)
        res.send(alertmove('/board/list', '글이 삭제되었습니다.'))
    }
    else {
        res.send(alertmove(`/board/view?index=${pageIndex}`, '삭제권한이 없는 글입니다.'))
    }
})

module.exports = router