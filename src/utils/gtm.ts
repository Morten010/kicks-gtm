import { sendGTMEvent } from "@next/third-parties/google";
import { formatPrice } from "../app/utils/formatPrice";

// Purchase journey

// Start session
const sessionStartEvent = () => {
  sendGTMEvent({});
};

// Item Viewed
const viewItemEvent = (product: any) => {
  console.log(product);

  sendGTMEvent({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      items: [
        {
          currency: "USD",
          item_id: product.id,
          item_sku: product.slug,
          quantity: 1,
          price: parseInt(formatPrice(product.price)),
        },
      ],
    },
  });
};

// Add to cart
const addToCart = (product: any) => {
  sendGTMEvent({
    event: "add_to_cart",
    ecommerce: product,
  });
};

// begin checkout
const beginCheckout = () => {};

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
