import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    description: "Lorem ipsum dolor sit amet.",
    address: "123 Main St, Anytown, AT 12345",
    mobileNumber: "123-456-7890",
  },
];
const View = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/getdata/${id}`
    );
    console.log(res, "ressss");
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data, "ttttttttttdata");
  const stripePromise = loadStripe("Publishable key");

  return (
    <div className="body-cont">
      <Grid
        container
        spacing={2}
        style={{ padding: 40, justifyContent: "center" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card raised>
            <CardContent>
              <Typography variant="h5" component="div">
                {data && data.name}
              </Typography>
              <Typography color="textSecondary">{data && data.email}</Typography>
              <Typography variant="body2">{data && data.description}</Typography>
              <Typography variant="body1">{data && data.address}</Typography>
              <Typography variant="body1">{data && data.mobileNo}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Elements stripe={stripePromise}>
        <CheckoutForm id={id} />
      </Elements>
    </div>
  );
};

export default View;
