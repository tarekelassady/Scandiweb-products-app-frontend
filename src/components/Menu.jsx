import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const posts=[
    {
      id:1,
      title:"erearaosfjlvcnkadsfdsaf",
      desc: "ruaorjaerueawru9eoafj93erujajfvodasjfodfa",
      img:"https://images.pexels.com/photos/16543487/pexels-photo-16543487.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id:2,
      title:"erearaosfjlvcnkadsfdsaf",
      desc: "kghkghjkfnhgdgruaorjaerueawru9eoafj93erujajfvodasjfodfa",
      img:"https://images.pexels.com/photos/16543440/pexels-photo-16543440.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id:3,
      title:"erea234234faadraosfjlvcnkadsfdsaf",
      desc: "afasfyrdsfhgsfdgfruaorjaerueawru9eoafj93erujajfvodasjfodfa",
      img:"https://images.pexels.com/photos/16543191/pexels-photo-16543191.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id:4,
      title:"erearaosfjlvcnkadsfdsaf",
      desc: "zcvzcxcv zxcvzzxcvzxvzcvc ruaorjaerueawru9eoafj93erujajfvodasjfodfa",
      img:"https://images.pexels.com/photos/16542720/pexels-photo-16542720.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
  ]
const Menu = ({postCat,postId}) => {

  const [getPosts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{ 
        const res=await axios.get(`http://localhost:8800/api/posts/?cat=${postCat}`);
        setPosts(res.data);
      }catch (err){
        console.log(err);
      }
    };
    fetchData();
  },[postCat])

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {getPosts.map(post=>(
          post.id !== postId &&
            <div className="post" key={post.id}>
                <img src={`/upload/${post.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read</button>
                <Link to={`/post/${post.id}`}></Link>
            </div>
            


        ))}
    </div>
  )
}

export default Menu