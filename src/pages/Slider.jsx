import React, { useEffect, useState } from 'react'
import axios from "axios";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
function Slider({imgUrl}) {
    const[error, setError] = useState(null)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    
  async function fetchImages(Url){
     try{
      setLoading(true)
      const res = await axios.get(Url)
      setImages(res.data)
     }
     catch(err){
        setError(err.message)
     }
     finally{
      setLoading(false)
     }
  }

  useEffect(()=>{
    if(imgUrl !=="") fetchImages(imgUrl)
  },[imgUrl])

  if(loading){
    return <p>Loading Please wait</p>
  }

  if(error){
     return <p>Error Occured</p>
  }

  function handlePrevious(){
     setCurrentSlide(currentSlide === 0 ? images.length -1 : currentSlide -1 )
  }

  function handleNext(){
    setCurrentSlide(currentSlide === images.length -1 ? 0 : currentSlide + 1)
  }
  console.log(images);
  
  return (
<div className='h-screen flex items-center justify-center'>
      <div className='relative w-[600px] h-[400px] flex justify-center items-center'>
      <BsArrowLeftCircleFill
      onClick={handlePrevious}
      className='absolute left-4 w-8 h-8 text-white drop-shadow-md cursor-pointer'
      />
      {images && images.length ? images.map((item, index)=>(
        <img
        key={item.id}
        src={item.download_url}
         alt={item.download_url}
         className={`w-full h-full rounded-lg ${currentSlide === index ? "block" : "hidden"}`}
        />
      )) : "null"}

      <BsArrowRightCircleFill
      onClick={handleNext}
      className='absolute right-4 w-8 h-8 text-white drop-shadow-md cursor-pointer'
      />
      
    <div className='absolute bottom-4 space-x-2'>
      {
        images && images.length>0 ? images.map((_,index)=>{
          return(
           <button
           key={index}
           onClick={()=>setCurrentSlide(index)}
           className={`h-3 w-3 rounded-full cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"} `}
           />)
        }) : null
      }
    </div>
    </div>
</div>
  )
}

export default Slider