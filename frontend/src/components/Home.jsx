import React from 'react'
import { useNavigate } from 'react-router-dom';
import sandwichImage from '../assets/sandwich.jpg';
import { usePostOrder } from '../hooks/usePostOrder';

export const Home = () => {

  const navigate = useNavigate();
  const { addOrder, order, loading } = usePostOrder();

  const sandwich = [
    {
      id: 1,
      title: "Vegetarian Sandwich with Finnish Rye Bread",
      ingredients: "Small Rye Bread rounds and Plain goat cheese",
      image: sandwichImage
    }
  ];

  const handleSubmit = () => {
    addOrder()
  
  };

  const handleOrderPage = () => {
    navigate('/order');
  }
 


  return (
    <div className='home'>
      <h1>Today's Suosikki</h1>
      <div className="sandwiches">
        {sandwich.map((sandwich) => (
          <div key={sandwich.id} className="sandwich">
            <img src={sandwich.image} alt={sandwich.title} />
            <h2>{sandwich.title}</h2>
            <p>{sandwich.ingredients}</p>
            <p className='price'>Price: 5€</p>
          </div>
        ))}
      </div>  
      <button onClick={handleSubmit} className="btn">Order Now</button>
      <button onClick={handleOrderPage} className="btn">See all order</button>

      {order && (
        <div className='post-order'>
          {loading && <p>Loading...</p>}
          {!loading && <p>Order submitted successfully! Your order Id is {order.id}.
           Your inital status of the order is ordered</p>}
        </div>
      )}
    
    </div>
  )
}

