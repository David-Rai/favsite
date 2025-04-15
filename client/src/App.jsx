import { useEffect, useState, useRef } from "react"
import { RxCross1 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const App = () => {
  const [site, setSite] = useState([])
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const [updating,setUpdating]=useState(false)
  const [id,setID]=useState(null)
  async function getData() {
    const res = await fetch('http://localhost:1111/', {
      method: "get",
    })
    const data = await res.json()
    setSite(data)
  }

  //fetching the data from the servers
  useEffect(() => {
    getData()

    return () => setSite([])
  }, [])

  //adding new site
  const handleAdd = () => {
    formRef.current.classList.toggle("hidden");
    formRef.current.classList.toggle("flex");
  }

  //getting the data
  const handleSubmit = () => {
    handleAdd()
    postData()
  }

  //editing the site
  const handleDelete = async (index) => {
    try {
      const res = await fetch(`http://localhost:1111/delete/${index}`, {
        method: "DELETE"
      })
      const results = await res.json()
      getData()
    } catch (err) {
      console.log(err)
    }
  }
  //posting the data
  async function postData() {
const name=inputRef.current.value

    try {
      const res = await fetch("http://localhost:1111/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site_path:name })
      })

    } catch (err) {
      console.log(err)
    }

    getData()
          inputRef.current.value = ""
  }

  //toggle updating the sites path
  const handleUpdate = async (index) => {
    setID(index)
    handleAdd()
    setUpdating(true)
  }

  const handleUpdating=async ()=>{
    const updatedName=inputRef.current.value
    inputRef.current.value=""

    try {
      const res = await fetch(`http://localhost:1111/update`, {
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({site_path:updatedName,id})
      })
      const results=await res.json()
    } catch (err) {
      console.log(err)
    }


    getData()
    handleAdd()
    setUpdating(false)
  }

  return (
    <>
      <main className="h-screen bg-slate-50 w-full flex px-[20px] flex-col items-center justify-center">
        <h1 className="p-4 text-4xl">Favourite site</h1>
        <section className=" flex flex-wrap items-center ">
          <div
            ref={formRef}
            className="cover absolute h-full 
            hidden w-full top-0 left-0  items-center justify-center">
            <form
              onSubmit={(e)=>{
                e.preventDefault()
                updating ? handleUpdating() : handleSubmit() 
              }}
              className="absolute bg-black/40 h-[160px]
             translate z-50 rounded-md lg:w-[40%] flex
             w-[80%] backdrop-blur-[20px]  items-center justify-center">
              <RxCross1 size={24} onClick={handleAdd} className="absolute top-[10px] right-[10px]"/>
              <input type="text" ref={inputRef} name="inputdata" className="h-[40px] pl-3 rounded-md" placeholder="enter the site path" />
              <button type="submit" className="h-[40px] w-[120px] rounded-md  text-white m-2 bg-blue-600">{updating ? "UPDATE" : "ADD"}</button>
            </form>
          </div>

          {
            site.length > 0 ? site.map((s, index) => {
              return (
                <div className="group relative hover:bg-slate-200 transition flex items-center justify-center h-[100px] w-[100px]" key={index} >
                  <RiDeleteBin6Line onClick={() => handleDelete(s.id)} className="group-hover:block text-red-500 hidden absolute m-1 right-0 top-0" />
                  <MdModeEditOutline onClick={() => handleUpdate(s.id)} className="group-hover:block  hidden absolute m-1 right-0 bottom-0" />
                  <div className="m-3 bg-gray-300 rounded-full flex items-center justify-center h-1/2 w-1/2" >
                    <a href={s.site_path} target="_blank">
                      <img src={s.img_path} className="" />
                    </a>
                  </div>
                </div>
              )
            })
              :
              <h1>no favourite pages</h1>
          }
          <div
            onClick={handleAdd}
            className="add h-[50px] w-[50px]
            rounded-full
             bg-red-400 flex items-center justify-center">
            <IoMdAdd size={40} />
          </div>
        </section>
      </main>
    </>
  )
}


export default App