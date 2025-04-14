import { useEffect, useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs";

const App = () => {
  const [site, setSite] = useState([])

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


  return (
    <>
      <main className="h-screen bg-slate-50 w-full flex px-[20px] flex-col items-center justify-center">
        <h1 className="p-4 text-4xl">Favourite site</h1>
        <section className=" flex flex-wrap items-center justify-between">
          {
            site ? site.map((s, index) => {
              return (
                <div className="relative hover:bg-slate-200 p-4 transition w-[24%]" key={index} >
                  <BsThreeDotsVertical className="absolute right-0 "/>
                  <div className="m-3 bg-gray-200 rounded-full p-[20px]" >
                    <a href={s.site_path} target="_blank">
                      <img src={s.img_path} alt="" />
                    </a>
                  </div>
                </div>
              )
            })
              :
              <h1>no favourite pages</h1>
          }
        </section>
      </main>
    </>
  )
}


export default App