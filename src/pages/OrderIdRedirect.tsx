import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const OrderIdRedirect = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // احتفظ بالكويري سترينج كما هو
    navigate(`/order-received/${orderId}${location.search}`, { replace: true });
  }, [orderId, location.search, navigate]);

  return null;
};

export default OrderIdRedirect;
