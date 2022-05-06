const express = require('express');
const router = express.Router();
const controller = require('../controllers/asirControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.post('/new', verify, controller.post_new_entry);
router.get("/staffMenu", verify, controller.staffmenu_page);
router.get("/logout", controller.logout);
router.get("/newEntry", verify, controller.handle_login);
router.post("/delete", verify, controller.delete_item);
router.post("/update", verify, controller.update_item);
router.get("/", controller.index_page);
router.get("/home", controller.index_page);
router.get("/about", controller.about_page);
router.get("/menus", controller.menuSelector_page);
router.get("/dinner-menu", controller.dinner_menu_page);
router.get("/lunch-menu", controller.lunch_menu_page);

router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });
router.use(function(err, req, res, next) {
        res.status(500);
        res.type('text/plain');
        res.send('Internal Server Error.');
    });
module.exports = router;