const router = require("express").Router();

const passport = require("passport")


const CLIENT_URL = "http://localhost:3000/login"


//for success
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user
        });
    }
})


//for failure
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    })
})



//logout
// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(CLIENT_URL);                          //need to add something......added

// })

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("http://localhost:3000/login");
    });
});



router.get("/twitter", passport.authenticate("twitter", { scope: ['profile'] }));

router.get("/twitter/callback", passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed"
}))



module.exports = router;