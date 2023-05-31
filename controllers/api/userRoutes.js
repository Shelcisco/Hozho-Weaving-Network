// const router = require('express').Router();
// const { Blog, User, Comment } = require('../../models');

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        username: req.body.username
      }

    })

    if (!data) {
      res.status(400).json({ message: "incorecct username, please try again" })
      return} 
      const validPassword = await data.checkPassword(req.body.password)
      if (!validPassword){
        res.status(400).json({ message: "incorecct password, please try again" })
        return
      }
      req.session.save(()=>{
        req.session.user_id=data.id
        req.session.logged_in=true
        res.json({user:data,message:"logged in"})
      })
  }
  catch(err) {
    res.status(400).json(err)
  }
})

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(()=>{
      res.status(200).end();
    })
  }
  else {
    res.status(404).end();
  }
}) 
