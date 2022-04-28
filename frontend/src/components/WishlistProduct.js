import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useAppContext } from "../context/appContext";

const WishlistProduct = ({
  product,
  wishlistImages,
  wishlistNames,
  index,
  wishlistColors,
  wishlistSizes,
  wishlistWidths,
}) => {
  const {
    removeCartItem,
    sendProductToCart,
    increaseCartItem,
    decreaseCartItem,
  } = useAppContext();

  const addProductToCart = () => {};

  return (
    <Card className="my-3 p-3 rounded ">
      <Card.Img
        src={`images/${wishlistImages[index]}`}
        style={{ height: "300px" }}
      />

      <Card.Body>
        <Card.Title as="div">
          <b>{wishlistNames[index]}</b>
        </Card.Title>
        <Row className="my-auto">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {Object.keys(wishlistColors[index]).length > 0 && (
              <div>
                <span style={{ fontWeight: "bold" }}>Color: </span>
                {wishlistColors[index].color}
              </div>
            )}
            {Object.keys(wishlistSizes[index]).length > 0 && (
              <div>
                <span style={{ fontWeight: "bold" }}>Size: </span>
                {wishlistSizes[index].size}
              </div>
            )}
            {Object.keys(wishlistWidths[index]).length > 0 && (
              <div>
                <span style={{ fontWeight: "bold" }}>Width: </span>
                {wishlistWidths[index].width}
              </div>
            )}
          </div>
        </Row>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Col>
            <div className="quantity-container">
              <span
                className="quantity-cursor"
                onClick={() =>
                  increaseCartItem(
                    product.productId,
                    product.variant.product_id,
                    product.quantity,
                    "wishlist"
                  )
                }
              >
                +
              </span>
              <div className="quantity-amount">{product.quantity}</div>
              <span
                className="quantity-cursor"
                onClick={() =>
                  decreaseCartItem(
                    product.productId,
                    product.variant.product_id,
                    product.quantity,
                    "wishlist"
                  )
                }
              >
                -
              </span>
            </div>
          </Col>
          <Card.Text as="h4">{product.variant.price}$</Card.Text>
        </Col>
        <Row>
          <Button
            variant="danger"
            className="my-3"
            onClick={() =>
              removeCartItem(
                product.productId,
                product.variant.product_id,
                "wishlist"
              )
            }
          >
            Remove{" "}
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              addProductToCart(product.id, product.quantity, "cart")
            }
          >
            Add to Cart{" "}
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WishlistProduct;
