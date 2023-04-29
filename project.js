const express = require("express");


//setting up the student router
const usersRouter = new express.Router();
//write your code here

usersRouter.get('/courses/get', async (req, res) => {
const data = await Course.find()
res.status(200).json(data)
})

usersRouter.post('/courses/enroll/:id"', async (req, res) => {
const id = req.params.id;
const getData = await Course.findById(id)
if (!getData.isApplied) {
po = {
isApplied: true
}
await Course.findByIdAndUpdate(id, po)
res.status(200).json({ message: "Sucessfully" })
} else {
res.status(403).json({ message: "not" })
}
})

usersRouter.patch('/courses/rating/:id"', async (req, res) => {
const id = req.params.id;
const getData = await Course.findById(id)
if (lgetData.isRated && getData.isApplied) {
const body = req.body;
const noOfRatings = getData.noOfRatings + 1;
const finalRate = (((getData.noOfRatings * getData.rating) + body.rating)
/ noOfRatings).toFixed(1)
pa = {
isRated: true,
rating: finalRate,

noOfRatings: noOfRatings

}
await Course. findByIdAndUpdate(id, pa)

res.status(200).json({ message: "Sucessfully" })
} else {
res.status(403).json({ message: "Not" })

})

usersRouter.delete('/courses/drop/:id', async (req, res) => {
const id = req.params.id;
const getData = await Course.findById(id)
if (getData.isApplied) {
de = {
isApplied: false
}
await Course.findByIdAndUpdate(id, de)
res.status(200).json({ message: "Sucessfully" })
} else {
res.status(403).json({ message: "Not" })
}
})

module.exports = usersRouter;