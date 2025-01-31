"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import { formatPrice } from "../app/utils/formatPrice";
import { Product } from "@prisma/client";

// helpers
const formatProduct = (product: Product) => {
  return {
    currency: "USD",
    item_id: product.id,
    item_sku: product.slug,
    quantity: 1,
    price: parseInt(formatPrice(product.price)),
  };
};

export const gtmHelpers = {
  formatProduct,
};

// Purchase journey

// Start session
const sessionStartEvent = () => {
  sendGTMEvent({});
};

// Item Viewed
const viewItemEvent = (product: Product) => {
  console.log(product);

  sendGTMEvent({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      items: [formatProduct(product)],
    },
  });
};

// Add to cart
const addToCart = (product: Product) => {
  sendGTMEvent({
    event: "add_to_cart",
    ecommerce: formatProduct(product),
  });
};

// begin checkout
const beginCheckout = (event: any) => {};

// purchased item
const purchaseEvent = () => {
  sendGTMEvent({
    event: "purchase",
  });
};

// Cancel event

// export all events functions under gtm
export const gtm = {
  purchaseEvent,
  addToCart,
  sessionStartEvent,
  viewItemEvent,
  beginCheckout,
};
