const passUserToView = (req ,res ,net)=>{
    res.locals.user = req.session.user ? req.session.user : null;
    next();
}

module.exports = passUserToView