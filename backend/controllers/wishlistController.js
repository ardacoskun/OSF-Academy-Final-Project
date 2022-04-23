const axios = require("axios");
const CartServices = require("../services/CartServices");
const OutOfStockError = require("../errors/outOfStockError");

const getWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${process.env.BASE_URL}/wishlist?secretKey=${process.env.SECRET_KEY}`,
    config
  );

  const wishlistProducts = await CartServices.getCartProducts(response);
  const wishlistProductsIds = CartServices.getProductIds(wishlistProducts);
  const productInfo = CartServices.getProductInfos(wishlistProductsIds);

  res.status(200).send({
    productImages: (await productInfo).productImages,
    productNames: (await productInfo).productsNames,
    response: response.data.items,
  });
};
const addItemToWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (!req.body.variantId) {
    throw new OutOfStockError("This item is out of stock.");
  }

  const { productId, variantId, quantity } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/wishlist/addItem`,
    productData,
    config
  );
  res.status(200).json(response.data);
};

const removeItemFromWishlist = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, variantId } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
  };

  await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/wishlist/removeItem`,
    data: productData,
    headers: config.headers,
  });

  res.status(202).json({ msg: "Item removed from the cart" });
};

const changeQuantityOfWishlistItem = async (req, res) => {
  const token = req.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { productId, variantId, quantity } = req.body;

  const productData = {
    secretKey: process.env.SECRET_KEY,
    productId,
    variantId,
    quantity,
  };

  const response = await axios.post(
    `${process.env.BASE_URL}/wishlist/changeItemQuantity`,
    productData,
    config
  );
  res.status(202).json(response.data);
};

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  changeQuantityOfWishlistItem,
};