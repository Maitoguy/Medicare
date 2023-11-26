import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  } from "react-router-dom";

import Start from './components/start'
import Home from './components/home'
import AddMedicine from "./components/addMedicine";


function App() {

  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<Start />} />  
      <Route path="/home" element={<Home/>}/> 
      <Route path="/add-medicine" element={<AddMedicine />}/> 
    </>
  );

  const router = createBrowserRouter(routes);


  return (
    <>
      <RouterProvider router={router}/>
    </>
    
  );
}

export default App;
