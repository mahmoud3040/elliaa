import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import OrderReceived from "./OrderReceived";
import NotFound from "./NotFound";
import OrderIdRedirect from "./OrderIdRedirect";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/thank-you" element={<ThankYou />} /> */}
      <Route path="/order-received/:orderId" element={<OrderReceived />} />
      {/* دعم الروابط الرقمية فقط مثل /1050 */}
      <Route path=":orderId" element={<OrderIdRedirect />} />
      {/* إعادة توجيه أي رابط رقمي فقط إلى OrderIdRedirect */}
      <Route path="/:orderId" element={<OrderIdRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;