function checkID() {
    const loginUser = req.session.user
    const pageIndex = req.query.index
    const boardContent = boardData[pageIndex - 1]
    return (boardContent.username === loginUser.username)
}

module.exports = checkID