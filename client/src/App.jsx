import { useEffect, useState, useRef } from "react"
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

const App = () => {
  const [site, setSite] = useState([])
  const formRef = useRef(null)
  const [site_path, setName] = useState("")
  const inputRef = useRef(null)

  //fetching the data from the servers
  useEffect(() => {
    async function getData() {
      const res = await fetch('http://localhost:1111/', {
        method: "get",
        credentials: 'include'
      })
      const data = await res.json()
      setSite(data)
    }

    getData()

    return () => setSite([])
  }, [])

  //adding new site
  const handleAdd = () => {
    formRef.current.classList.toggle("hidden");
    formRef.current.classList.toggle("flex");
  }

  //getting the data
  const handleSubmit = (e) => {
    e.preventDefault()
    setName(inputRef.current.value)
    handleAdd()
    postData()
  }

  //editing the site
  const handleDelete = async (index) => {
    try {
      alert(index)
      const res = await fetch(`http://localhost:1111/delete/${index}`, {
        method: "DELETE"
      })
      const results = await res.json()
      console.log(results)
    } catch (err) {
      console.log(err)
    }
  }
  //posting the data
  async function postData() {

    try {
      const res = await fetch("http://localhost:1111/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site_path })

      })
      inputRef.current.value = ""

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <>
      <main className="h-screen bg-slate-50 w-full flex px-[20px] flex-col items-center justify-center">
        <h1 className="p-4 text-4xl">Favourite site</h1>
        <section className=" flex flex-wrap items-center ">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="absolute bg-black/40 h-[160px]
               hidden translate z-50 rounded-md
             w-[80%] backdrop-blur-[20px]  items-center justify-center">
            <input type="text" ref={inputRef} name="inputdata" className="h-[40px] pl-3 rounded-md" placeholder="enter the site path" />
            <button type="submit" className="h-[40px] w-[120px] rounded-md  text-white m-2 bg-blue-600">ADD</button>
          </form>
          {
            site ? site.map((s, index) => {
              return (
                <div className="group relative hover:bg-slate-200 transition flex items-center justify-center h-[100px] w-[100px]" key={index} >
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(s.id)}
                    className="group-hover:block text-red-500
                  hidden absolute m-1 right-0 top-0" />
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