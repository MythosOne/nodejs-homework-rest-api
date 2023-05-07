const {
  Contact,
  addSchema,
  updateFavoriteSchema,
} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", {skip, limit});

  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findById(contactId).populate({
    path: "owner",
    match: { _id: owner },
  });

  if (!result || !result.owner) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  console.log(result);

  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing field favorite");
  }

  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner,
    },
    req.body,
    {
      new: true,
    }
  );
  console.log(result);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
