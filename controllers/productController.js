const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find().exec();
  if (!products) return res.status(204).json({ message: "No products found!" });
  res.json(products);
};

const createProduct = async (req, res) => {
  if (
    !req?.body?.id ||
    !req?.body?.title ||
    !req?.body?.price ||
    !req?.body?.description ||
    !req?.body?.category ||
    !req?.body?.image ||
    !req?.body?.tags
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const result = await Product.create({
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      tags: req.body.tags,
    });
    res.status(201).json(result);
  } catch (err) {
    console.errror(err);
  }
};

const updateProduct = async (req, res) => {
  if (!req?.body?.title)
    return res.status(400).json({ message: "Please name a product to update." });

  try {
    const product = await Product.findOne({ title: req.body.title }).exec();
    if (!product) return res.status(204).json({ message: `No products matched${product}.` });
    if (req.body?.title) product.title = req.body.title;
    if (req.body?.price) product.price = req.body.price;
    if (req.body?.description) product.description = req.body.description;
    if (req.body?.category) product.category = req.body.category;
    if (req.body?.image) product.image = req.body.image;
    if (req.body?.tags) product.tags = req.body.tags;

    const result = await product.save();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.title)
    return res.status(400).json({ message: "Please name a product to delete." });

  const product = await Product.findOne({ title: req.body.title }).exec();

  if (!product) return res.status(204).json({ message: `No products matched${product}.` });

  const result = await product.deleteOne({ title: req.body.title });
  res.json(result);
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
