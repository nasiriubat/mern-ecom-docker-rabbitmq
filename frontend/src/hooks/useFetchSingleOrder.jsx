import { useEffect, useState } from "react";

export const useFetchSingleOrder = (orderId) => {

  const [order, setOrder] = useState([null])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  

  useEffect(() => {

    const fetchOrder= async () => {
      setIsLoading(true);
      try {
        const response = await fetch( `http://localhost:8080/v1/order/${orderId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
        },
      })

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`Cant fetch the order with the given ID ${orderId}`);
        }
        const order = await response.json();
        setOrder(order);
        setIsLoading(false);
        console.log(order);
      } catch (error) {
        setError(`Cant fetch the order with the given ID ${orderId}`);
        setIsLoading(false);
      }
    };
    fetchOrder();
    const intervalId = setInterval(fetchOrder, 5000);
    return () => clearInterval(intervalId);
  }, [orderId]);

  return {order, isLoading, error}

};
