const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getAllContacts,
  createContact,
  addContactForm,
  getContact, 
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.use(cookieParser());

router.route("/").get(checkAdmin, getAllContacts);
  
router.route("/add").get(checkAdmin, addContactForm).post(checkAdmin, createContact);

router
  .route("/:id")
  .get(checkAdmin, getContact)
  .put(checkAdmin, updateContact)
  .delete(checkAdmin, deleteContact)

module.exports = router;