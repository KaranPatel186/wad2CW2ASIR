const tailwindcss = require("tailwindcss");
const menuDAO = require("../models/menuModel");
const userDao = require("../models/userModel.js");

const db = new menuDAO();
db.init();

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.index_page = function (req, res) {
  res.render("index");
};

exports.about_page = function (req, res) {
  res.render("about");
};

exports.handle_login = function (req, res) {
  // res.redirect("/new");
  res.render("newEntry", {
    user: "user",
  });
};

exports.menuSelector_page = function (req, res) {
  res.render("menus/menuSelect");
};

exports.dinner_menu_page = function (req, res) {
  db.getChefSpecials("dinner")
    .then((list1) => {
      db.getShownItems("dinner").then((list2) => {
        res.render("menus/dinnerMenu", {
          chefentries: list1,
          entries: list2,
        });
      });
    })

    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.lunch_menu_page = function (req, res) {
  db.getChefSpecials("lunch")
    .then((list1) => {
      db.getShownItems("lunch").then((list2) => {
        res.render("menus/lunchMenu", {
          chefentries: list1,
          entries: list2,
        });
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.staffmenu_page = function (req, res) {
  db.getStaffHiddenitems()
    .then((list1) => {
      db.getStaffShownItems().then((list2) => {
        res.render("staffMenu", {
          hiddenentries: list1,
          shownentries: list2,
        });
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.update_item = function (req, res) {
  db.updateItem(req.body.id, req.body.showItemChanger);
  res.redirect("/staffMenu");
};



exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.dish_Name) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(
    req.body.dish_Name,
    req.body.menu,
    req.body.chef_Special,
    req.body.description,
    req.body.allergen_Advice,
    req.body.price,
    req.body.show_Item
  );
  console.log("inserted new entry");
  res.redirect("/staffMenu");
};

exports.delete_item = function (req, res) {
  console.log("delete_item controller");
  console.log(req.body.id);
  db.removeItem(req.body.id);
  console.log("deleted item");
  res.redirect("/staffMenu");
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};
