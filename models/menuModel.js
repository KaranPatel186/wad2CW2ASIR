const nedb = require("nedb");
class MenuItems {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  //a function to seed the database
  init() {
    this.db.insert({
      dish_Name: "Pasta",
      menu: "dinner",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "hide",
    });
    this.db.insert({
      dish_Name: "Spaghetti",
      menu: "dinner",
      chef_Special: "no",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Canelloni",
      menu: "lunch",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "6.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Orzo Pasta",
      menu: "dinner",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Homebrew Soup",
      menu: "lunch",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Tagliatelle",
      menu: "lunch",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Meatballs",
      menu: "lunch",
      chef_Special: "no",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat, Gluten",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Penne pasta",
      menu: "lunch",
      chef_Special: "no",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat",
      price: "5.00",
      show_Item: "show",
    });
    this.db.insert({
      dish_Name: "Pizza",
      menu: "dinner",
      chef_Special: "yes",
      description: "SomeTextHereAboutDish",
      allergen_Advice: "Dairy, Wheat, Garlic",
      price: "5.00",
      show_Item: "show",
    });
    //for later debugging
    console.log("db entry init inserted");
  }

  getStaffHiddenitems() {
    return new Promise((resolve, reject) => {
      this.db.find({ show_Item: "hide" }, function (err, hiddenentries) {
        if (err) {
          reject(err);
        } else {
          resolve(hiddenentries);
          console.log("function all() returns: ", hiddenentries);
        }
      });
    });
  }

  getStaffShownItems() {
    return new Promise((resolve, reject) => {
      this.db.find({ show_Item: "show" }, function (err, shownentries) {
        if (err) {
          reject(err);
        } else {
          resolve(shownentries);
          console.log("function all() returns: ", shownentries);
        }
      });
    });
  }

  getChefSpecials(menuType) {
    return new Promise((resolve, reject) => {
      this.db.find(
        { show_Item: "show", chef_Special: "yes", menu: menuType },
        function (err, chefentries) {
          if (err) {
            reject(err);
          } else {
            resolve(chefentries);
            console.log(" returns: ", chefentries);
          }
        }
      );
    });
  }

  getShownItems(menuType) {
    return new Promise((resolve, reject) => {
      this.db.find(
        { show_Item: "show", menu: menuType, chef_Special: "no" },
        function (err, entries) {
          if (err) {
            reject(err);
          } else {
            resolve(entries);
            console.log(" returns: ", entries);
          }
        }
      );
    });
  }

  removeItem(_id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: _id }, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
          console.log("Item removed from the database");
        }
      });
    });
  }

  updateItem(_id, show_Item) {
    console.log("updateItem: ", _id, show_Item);
    return new Promise((resolve, reject) => {
      this.db.update(
        { _id: _id },
        { $set: { show_Item: show_Item } },
        {},
        function (err, docs) {
          if (err) {
            reject(err);
          } else {
            resolve();
            console.log("Item removed from the database");
          }
        }
      );
    });
  }

  addEntry(
    dish_Name,
    menu,
    chef_Special,
    description,
    allergen_Advice,
    price,
    show_Item
  ) {
    var entry = {
      dish_Name: dish_Name,
      menu: menu,
      chef_Special: chef_Special,
      description: description,
      allergen_Advice: allergen_Advice,
      price: price,
      show_Item: show_Item,
    };
    this.db.insert(entry, function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("Item inserted into the database", doc);
      }
    });
  }
}
module.exports = MenuItems;
