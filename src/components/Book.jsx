import { useState } from "react"

const Book = (props) => {
    const [getWeight, setWeight]=useState();
  props.bookData(getWeight);
  return(
    <div>
      <input id="book" type="text" placeholder='weight' onChange={(e)=>{setWeight(e.target.value)}}/>
    </div>
  )
}

export default Book
