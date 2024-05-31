const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts // 함수 설명
// @route GET /contacts  // 요청 방식과 URL
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
});

// @desc Create a contact
// @route POST /contacts
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
    res.status(201).send("Create Contacts");
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const name = req.params.id;
    const contact = await Contact.findOne({name: name});
    res.status(200).send(contact);
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    const name = req.params.id;
    const { email, phone } = req.body;
    const contact = await Contact.findOne({name: name});
    if(!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }

    contact.email = email;
    contact.phone = phone;

    contact.save();

    res.status(200).send(contact);
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    const name = req.params.id;
    const contact = await Contact.findOne({name: name});
    if(!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({name : name});
    res.status(200).send(`Delete Contact for name: ${req.params.id}`);
})

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
