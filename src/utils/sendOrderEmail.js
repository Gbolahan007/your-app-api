// utils/sendOrderEmail.js
import emailjs from "emailjs-com";

emailjs.init("HUZ0GxF3GIhPzkSeU");

const sendOrderEmail = async ({ shippingInfo, cart, total }) => {
  const items = cart
    .map((item) => `${item.name} (x${item.quantity}) - $${item.price}`)
    .join("\n");

  const templateParams = {
    to_email: "seemlyprofessional@gmail.com",
    customer_email: shippingInfo.email,
    customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
    address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.country}`,
    cart_items: items,
    total: `$${total.toFixed(2)}`,
  };
  return emailjs.send(
    "service_qt51krc",
    "template_y48cvzo",
    templateParams,
    "HUZ0GxF3GIhPzkSeU",
  );
};

export default sendOrderEmail;
