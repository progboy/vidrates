const express =  require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google'),(req,res) => {
    res.send("google api endpoint");
});
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/?login=failed' }),(req, res) => {
    res.redirect('/?login=success');
});

module.exports = router;