import React from 'react'
import sandwichImage from '../assets/sandwich.jpg';
import { useParams } from 'react-router-dom';
import { useFetchSingleOrder } from '../hooks/useFetchSingleOrder';

export const OrderDetails = () => {

  const { orderId } = useParams();
  const { order, isLoading} = useFetchSingleOrder(orderId);

  

  return (
    <div className='order-single'> 

    <div className='order-details'>
      {isLoading && <p>Loading...</p>}
      <h1>Your Order Details</h1>
      
      <img src={sandwichImage} alt="order image" />
      <h2><b>Order Id:</b> {order.id}</h2>
      <p><b>Your Selected Sandwich :</b> Vegetarian Sandwich with Finnish Rye Bread</p>
      <p><b>Sandwich Id:</b> {order.sandwichId}</p>
      <p><b>Order Status:</b> {order.status}</p>
      <p><b>Price:</b> 5€</p>

    </div>

    </div>
    

  )
}
