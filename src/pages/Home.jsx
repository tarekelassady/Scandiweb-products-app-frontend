import React,{useState,useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import "./home.scss";

const Home = () => {
  const apiUrl=process.env.REACT_APP_BACKEND_URL;
  const [getProducts, setProducts]=useState([]);
  const [getItems,setItems]=useState([]);

  
  const fetchData=async()=>{
    try{
      const res=await axios.get(`${apiUrl}/api/products`);
      setProducts(res.data);

    }catch(err){
      console.log(err);
    }
  }
  
    fetchData();
  

  const itemsToDelete=(e)=>{
    setItems(prev=>e.target.checked? [...prev,e.target.value]:prev.filter(val=>val!==e.target.value));
    console.log(getItems);
  }

  const deleteSelected=async()=>{
    try{
      getItems.map(id=>{
        axios.delete(`${apiUrl}/api/products/${id}`)
      })
      fetchData();
      console.log(getItems);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='home'>
      <div className="home-header">
        <h1>Product List</h1>
        <div className='action-buttons'>
          <Link to="/add-product"><button className='add-product'>Add</button></Link>
          <button id="delete-product-btn" className='delete-selected' disabled={getItems.length===0? true:false } onClick={deleteSelected}>Mass Delete</button>
        </div>
        
      </div>
      <hr />
      <div className='products-container'>
        {getProducts.map(product=>(
          <div className='product-card' key={product.id}>
            <input className="delete-checkbox" type="checkbox" value={product.id} onChange={itemsToDelete}/>
            <div className='content'>
              <p>{product.sku}</p>
              <p>{product.name}</p>
              <p>{product.price} $</p>
              {product.size&&<p><strong>Size: </strong>{product.size}MB</p>}
              {product.weight&&<p><strong>Weight: </strong>{product.weight}KG</p>}
              {product.height&&<p><strong>Dimension: </strong>{product.height}CM x {product.width}CM x {product.length}CM</p>}
              <p>{product.description}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home