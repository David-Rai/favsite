import { useEffect,useState } from "react"

const App = () => {
const [res,setRes]=useState(null)

useEffect(()=>{

async function getData(){
const res=await fetch('http://localhost:1111')
const data=await res.json()
console.log(data)
setRes(data)
}


return getData
},[])

  return (
    <>
    <main>
      
    </main>
    </>
  )
}


export default App