const express = require('express')
const router = express.Router()

const { makeget } = require('../controllers/requests')

router.route('/get/:apiname/:modal').get(makeget)
//router.route('/post/:apiname/:modal').post(makepost)
//router.route('/:id').get(gettasks).patch(updatealltasks).delete(deletealltasks)

module.exports = router
