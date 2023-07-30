import React , {useState, useEffect} from 'react'

function Message({setMessage , type , text}) {
  useEffect(() => {
    console.log(text)
    setTimeout(()=>{
      setMessage({type : "" , text : ""})
    }, 2500)
  }, [text])
  return (<>
    {<div className={`w-full h-9 bg-${type ==="success" ? "green" : "red"}-200 text-${type ==="success" ? "green" : "red"}-500 rounded-lg flex items-center px-2 `}>
      {text}
    </div>}
  </>
  )
}

export default Message