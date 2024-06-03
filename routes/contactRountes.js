const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
  addContactForm,
  getContact, 
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.route("/").get(getAllContacts)
  
router.route("/add").get(addContactForm).post(createContact)

router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact)

module.exports = router;