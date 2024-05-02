import {useState } from 'react'

export const usePostOrder = () => {

    const [order, setOrder] = useState(null)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const addOrder = async () =>{
        setLoading(true)
        try{

            const response = await fetch("http://localhost:8080/v1/order", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                
            })

            if(!response.ok){
                setLoading(false)
                throw new Error("Cant add the new Order data")
            }

            const data = await response.json()
            console.log("From add order ", data)
            setOrder(data)
            setLoading(false)
        }
        catch(error){
            setError("Cant add the new Order data")
            setLoading(false)
        }
    }
    return { addOrder, order, error, loading }
}
