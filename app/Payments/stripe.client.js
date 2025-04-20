"use client";

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripeCheckoutForm = ({ totalAmount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on the backend
      const { data: clientSecret } = await axios.post(
        'http://localhost:8000/api/payment/create-payment-intent',
        {
          amount: totalAmount * 100, // convert to cents
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      setIsProcessing(false);

      if (error) {
        setCheckoutError(error.message);
        onError && onError(error);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess && onSuccess(paymentIntent);
      }
    } catch (err) {
      setIsProcessing(false);
      setCheckoutError('An error occurred while processing your payment.');
      onError && onError(err);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md">
        <CardElement options={cardElementOptions} />
      </div>
      
      {checkoutError && (
        <div className="text-red-600 text-sm">{checkoutError}</div>
      )}
      
      <button 
        type="submit" 
        disabled={isProcessing || !stripe}
        className={`w-full bg-[#FDAA1C] text-white py-3 rounded-md font-medium ${
          (isProcessing || !stripe) ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;