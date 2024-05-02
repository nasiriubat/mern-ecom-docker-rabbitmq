import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { NotFoundPage } from "./components/NotFoundPage";
import { OrderPage } from "./components/OrderPage";
import { OrderDetails } from "./components/OrderDetails";
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
      <div className='App'>
        <Navbar />

        <Routes>
         <Route  path="/" element={<Home />} />
         <Route path="/order" element={<OrderPage />}/>
         <Route path="/order/:orderId" element={<OrderDetails />}/>
         <Route path="*" element={<NotFoundPage/>}/>

        </Routes>
      </div>
    </>
  )
}

export default App
