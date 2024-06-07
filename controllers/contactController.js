const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const adminLayout = "../views/layouts/admin.ejs";
const mainLayout = "../views/layouts/main.ejs";
const path = require("path");

// @desc Get all contacts // 함수 설명
// @route GET /contacts  // 요청 방식과 URL
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.render("list", { contacts: contacts, layout: adminLayout })
});

// @desc View add contact Form
// @route GET /contacts/add
const addContactForm = (req, res) => {
    res.render("add", { layout: adminLayout }); // views/add.ejs 렌더링하기
};

// @desc Create a contact
// @route POST /contacts/add
const createContact = asyncHandler(async (req, res) => {
    console.log("req: " + req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.send(400).send("필수값이 입력되지 않았습니다.");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.redirect("/contacts");
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
    // const name = req.params.id;
    // const contact = await Contact.findOne({name: name});
    const contact = await Contact.findById(req.params.id);
    res.render("update", { contact: contact, layout: adminLayout });
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { name, email, phone } = req.body;
    // const contact = await Contact.findById(id);
    // if(!contact) {
    //     res.status(400);
    //     throw new Error("Contact not found");
    // }
    // contact.name = name;
    // contact.email = email;
    // contact.phone = phone;
    // contact.save();

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true }
    )

    res.redirect("/contacts")
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    // const name = req.params.id;
    // const contact = await Contact.findOne({name: name});
    // if(!contact) {
    //     res.status(400);
    //     throw new Error("Contact not found");
    // }
    // await Contact.deleteOne({name : name});
    // res.status(200).send(`Delete Contact for name: ${req.params.id}`);
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contacts");
})

module.exports = {
    getAllContacts,
    createContact,
    addContactForm,
    getContact,
    updateContact,
    deleteContact
};
