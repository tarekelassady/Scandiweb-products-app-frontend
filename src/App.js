import {createBrowserRouter,RouterProvider,Route,Outlet} from 'react-router-dom';
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import "./style.scss"



const Layout=()=>{
  return(
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}
const router=createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Home />
      },      
      {
        path:"/add-product",
        element: <AddProduct/>
      }
    ]
  },


]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
