import { sendGTMEvent } from "@next/third-parties/google";

const purchaseEvent = () => {
  sendGTMEvent({
    event: "purchase",
  });
};

const viewItemEvent = () => {
  sendGTMEvent({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      items: [],
    },
  });
};

const addToCart = (product: any) => {
  sendGTMEvent({
    event: "add_to_cart",
    ecommerce: product,
  });
};

export const gtm = {
  purchaseEvent,
  addToCart,
};
