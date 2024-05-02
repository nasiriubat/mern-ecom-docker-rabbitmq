import { useEffect, useState } from "react";

export const useFetchOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/v1/order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Cant fetch the data for that resource");
        }

        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        setError("error");
        setIsLoading(false);
      }
    };

    // Call fetchOrders immediately and then every 5 seconds
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return { orders, isLoading, error };
};