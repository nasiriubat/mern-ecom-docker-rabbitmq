import React from 'react'
import { useFetchOrder } from '../hooks/useFetchOrder'
import { useNavigate } from 'react-router-dom';

export const OrderPage = () => {
  const { orders, isLoading} = useFetchOrder();
  const navigate = useNavigate();

  const handleOrder = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className='Order-page'>
    <h1>All Orders </h1>
    {isLoading && <p>Loading...</p>}
    <div className='orders'>
     {
      orders
      .sort((a,b) => b.id - a.id)
      .map((order)=>{
        return(
        <div key={order.id} className='order-box'>
          <h2>Order Id: {order.id}</h2>
          <p> <b>Your Selected Sandwich :</b> Vegetarian Sandwich with Finnish Rye Bread</p>
          <p><b>Sandwich Id:</b> {order.sandwichId}</p>
          <p><b>Order Status:</b> {order.status}</p>
          <p><b>Price:</b> 5€</p>
          <button onClick={()=>handleOrder(order.id)}className='btn'>View</button>
        </div>
        );
      })
     }
    </div>
    </div>
  )
}
