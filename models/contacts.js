const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
};

async function writeFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

  return contacts;
};

async function listContacts() {
  const listContacts = await readFile();

  return listContacts;
}

const getById = async (contactId) => {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contact = await readFile().filter(
    (contact) => contact.id !== contactId
  );

  const newContacts = await writeFile(contact);

  return newContacts;
};

const addContact = async (body) => {
  const contacts = await readFile();

  const newContacts = {
    id: nanoid(8),
    ...body,
  };

  contacts.push(newContacts);

  await writeFile(contacts);

  return contacts;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
