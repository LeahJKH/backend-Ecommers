const Product = require("../model/Product");

const getAllproducts = async (req, res) => {
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
