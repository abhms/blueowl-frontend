import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !name) {
      // Add additional checks as needed
      console.log("Required information is missing.");
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { data } = await axios.post(
      "http://localhost:4242/create-payment-intent",
      { amount: 1000, id }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="body-container">
        <div className="card">
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Billing Name"
              required
            />
            <CardElement options={cardStyle} />
            <button type="submit" disabled={!stripe || loading || !name.trim()}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
