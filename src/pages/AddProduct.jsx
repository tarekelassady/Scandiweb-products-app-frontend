import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import "./add_product.scss"
import {Tooltip} from "@mui/material/"



const AddProduct = () => {

  const apiUrl=process.env.REACT_APP_BACKEND_URL;
  const [getSKU,setSKU]=useState("");
  const [getName,setName]=useState("");
  const [getPrice,setPrice]=useState("");
  const [getType,setType]=useState("")
  const [getTypeComponent,setTypeComponent]=useState("");
  const [getSize,setSize]=useState(null);
  const [getWeight,setWeight]=useState();
  const [getHeight,setHeight]=useState();
  const [getWidth,setWidth]=useState();
  const [getLength,setLength]=useState();
  const [getDescription,setDescription]=useState("");
  const [getMessage,setMessage]=useState("");
  const [getError, setError]=useState(false);
  const [getTip,setTip]=useState();
  const navigate=useNavigate();

  const numbersOnly = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!new RegExp("[0-9]").test(keyValue)) event.preventDefault();
    return;
  };

  const components={
    'DVD':<DVD getSize={getSize} setSize={setSize} numbersOnly={numbersOnly} />,
    'Book':<Book getWeight={getWeight} setWeight={setWeight} numbersOnly={numbersOnly} />,
    'Furniture':<Furniture getHeigh={getHeight} setHeight={setHeight} 
    getWidth={getWidth} setWidth={setWidth} getLength={getLength} setLength={setLength} 
    numbersOnly={numbersOnly}/>
  }
  
  const handleComponentsChange=(e)=>{
    setSize(null);
    setWeight(null);
    setHeight(null);
    setWidth(null);
    setLength(null);
    setType(e.target.value);
    setTypeComponent(components[e.target.value]);
  }

  const handleChangeTip=(e)=>{
    e.target.id==="sku" && setTip(<div>9 Characters:<br />xxx: Type "dvd, book or fur"
    <br />xxx: Sub Type "001, 002 ...etc"<br />xxx: Serial "001, 002 ...etc"</div>)
  }
  const handleClick=async(e)=>{
      e.preventDefault();
      if(!getSKU||!getName||!getPrice||!getType){
        setError(true);
        setMessage("You must fill in SKU, Name, Price & Type" );
        return;
      }

      switch (getType){
        case "DVD":
          if(!getSize)
            {setMessage("You must add Size" );
            setError(true);
            return;}
            break;
        case "Book":
          if(!getWeight){
            setError(true);
            setMessage("You must add Weight" );
            return;}
            break;
        case "Furniture":
          if(!getHeight||!getWidth||!getLength){
            setError(true);
            setMessage("You must add Dimenstion (Height x Width x Length)" );
            return;}
            break;
      }

    try{
      const res= await axios.get(`${apiUrl}/api/products/${getSKU}`);
        console.log(res.data);
        console.log(res.data.length);
        if(res.data.length){
          setError(true);
          setMessage(`There is one SKU have the same code (${getSKU}), please, provide a unique SKU`);
          return;
        }


      await axios.post(`${apiUrl}/api/products`,{
        getSKU, getName, getPrice, getType, getSize, getWeight, getHeight, getWidth, getLength,
        getDescription,
        date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      setError(false);
      setMessage(`Product: 
      SKU: "${getSKU}",  
      Name: "${getName}"
      has been added successfully`);
      navigate("/");
    }catch(err){
      console.log(err);
    }
  }
  
  
  return (
    <div className="product-add">
      <div className="product-add-header">
        <h1>Product Add</h1>
        <div className='action-buttons'>
        <div className="action-buttons">
          <button onClick={handleClick}>Save</button>
          <Link to="/"><button>Cancel</button></Link>
        </div>
        </div>
      </div>
      <hr />
      <form id="product_form">
      
        <div className='main-data'>
          <Tooltip title={getTip}>
          <div>
            <label htmlFor="sku">SKU</label>  
            <input id="sku" type="text" value={getSKU} placeholder='xxx-xxx-xxx' onMouseOver={handleChangeTip} onChange={e=>setSKU(e.target.value)}/>
          </div>
          </Tooltip>
          <div>
            <label htmlFor="name">Name</label>  
            <input id="name" type="text" value={getName} onChange={e=>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="price">Price ($)</label>  
            <input id="price" type="text"  placeholder="[numbers only]" value={getPrice} onChange={e=>setPrice(e.target.value)} onKeyPress={numbersOnly}/>
          </div>
        </div>
        <div className="select-type">
          <select name="" id="productType" defaultValue="type" onChange={(handleComponentsChange)}>
            <option value="type" disabled >Type</option>
            <option id="DVD" value="DVD">DVD</option>
            <option id="Furniture" vaule='Book'>Book</option>
            <option id="Book" vaule='Furniture'>Furniture</option>
          </select>
          {getTypeComponent}
        </div>
        
        <div className='description'>
          <label htmlFor="">Description: </label>
          <textarea id="description" cols="30" rows="10" onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        
        <p className={getError?"error-message":"sent-message"} style={{padding:"10px", textAlign:"center"}}>{getMessage}</p>

      </form>
    </div>
  )
}
const DVD=(props)=>{
  return(
    <div className='dvd'>
      <div className='dvd-attributes'>
        <label htmlFor="size">Size (MB)</label>
        <input id="size" type="text" placeholder="[numbers only]" value={props.getSize} onChange={(e)=>{props.setSize(e.target.value)}} onKeyPress={props.numbersOnly} />
      </div>
      <p>Please, provide size in MB</p>
    </div>
  )
}
const Book=(props)=>{
  return(
    <div className='book'>
      <div className='book-attributes'>
        <label htmlFor="weight">Weight (KG)</label>
        <input id="weight" type="text" value={props.getWeight} placeholder="[numbers only]" onChange={(e)=>{props.setWeight(e.target.value)}} onKeyPress={props.numbersOnly}/>
      </div>
      <p>Please, provide weight in KG</p>
    </div>
  )
}
const Furniture=(props)=>{
  
  return(
    <div className='furniture'>
      <div className='furniture-attributes'>
        <label htmlFor="height">Height (CM)</label>  
        <input id="height" type="text" value={props.getHeight} placeholder="[numbers only]" onChange={(e)=>{props.setHeight(e.target.value)}} onKeyPress={props.numbersOnly}/>
        <label htmlFor="widht">Width (CM)</label>  
        <input id="width" type="text" value={props.getWidth} placeholder="[numbers only]" onChange={(e)=>props.setWidth(e.target.value)} onKeyPress={props.numbersOnly}/>
        <label htmlFor="length">Length (CM)</label>  
        <input id="length" type="text" value={props.getLength} placeholder="[numbers only]" onChange={(e)=>props.setLength(e.target.value)} onKeyPress={props.numbersOnly}/>
      </div>
      <p>Please, provide dimensions "height, width and length" in CM</p>
    </div>
  )
}
export default AddProduct