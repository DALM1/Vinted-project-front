import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import { useState } from "react";
import "../components/CheckoutForm/CheckoutForm.scss";

const Payment = () => {
    const location = useLocation();
    const { title, price } = location.state;
    const [stripePromise] = useState(() =>
        loadStripe(
            "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
        )
    );

    return (
        <div>
            <div className="element-pay">
                <Elements stripe={stripePromise}>
                    <CheckoutForm title={title} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
