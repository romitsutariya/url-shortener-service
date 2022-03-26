const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
require("dotenv").config();
const router = express.Router()

const Url = require('../models/Url')

const baseUrl = process.env.BASE_URL || 'http:localhost:5000'

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body 
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }
    const urlCode = shortid.generate()

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })
             if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router