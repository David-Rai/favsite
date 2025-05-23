import { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const App = () => {
  //server path
  const navigate = useNavigate();
  const serverPath = import.meta.env.VITE_SERVER;
  const [site, setSite] = useState([]);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const nameRef = useRef(null);
  const [updating, setUpdating] = useState(false);
  const [id, setID] = useState(null);


  //verification
  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`${serverPath}/verify`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      console.log(result)
      if (!result.auth) {
        navigate("/");
      }
    };
    verify();
  }, []);

  async function getData() {
    const res = await fetch(`${serverPath}/get`, {
      method: "get",
      credentials: "include",
    });
    const data = await res.json();
    setSite(data);
  }

  //fetching the data from the servers
  useEffect(() => {
    getData();

    return () => setSite([]);
  }, []);

  //adding new site
  const handleAdd = () => {
    console.log("adding the new ")
    formRef.current.classList.toggle("hidden");
    formRef.current.classList.toggle("flex");
  };
  //getting the data
  const handleSubmit = () => {
    handleAdd();
    postData();
  };

  //editing the site
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${serverPath}/delete/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  //posting the data
  async function postData() {
    const sitepath = inputRef.current.value;
    const name = nameRef.current.value;

    try {
      const res = await fetch(`${serverPath}/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site_path: sitepath, name }),
      });
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err);
    }

    getData();
    inputRef.current.value = "";
    nameRef.current.value = "";
  }

  //toggle updating the sites path
  const handleUpdate = async (index) => {
    setID(index);
    handleAdd();
    setUpdating(true);
  };

  const handleUpdating = async () => {
    const updatedPath = inputRef.current.value;
    const updatedName = nameRef.current.value;

    try {
      const res = await fetch(`${serverPath}/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site_path: updatedPath, id, name: updatedName }),
      });
      const results = await res.json();
    } catch (err) {
      console.log(err);
    }

    inputRef.current.value = "";
    nameRef.current.value = "";
    getData();
    handleAdd();
    setUpdating(false);
  };

  //logging out
  const handlelogout = async () => {
    const res = await fetch(`${serverPath}/logout`, {
      method: "get",
      credentials: "include",
    });
    const result = await res.json();

    navigate("/");
  };
  return (
    <>
      <main className="h-screen bg-softslate w-full flex px-[20px] flex-col items-center justify-center">

        {/* LOGOUT */}
        <div className="h-full w-full absolute top-0 right-0 flex items-start p-[20px] justify-end">
          <button className="button w-[120px]" onClick={() => handlelogout()}>
            Logout
          </button>
        </div>

        <h1 className="p-4 text-4xl text-[#BAC7E3]">Favourite site</h1>
        <section className=" flex flex-wrap items-center ">
          {/* ADDING AND UPDATING THE SITE */}
          <div
            ref={formRef}
            className="cover absolute h-full 
            hidden w-full top-0 left-0  items-center justify-center"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updating ? handleUpdating() : handleSubmit();
              }}
              className="absolute bg-black/40 h-[160px]
             translate z-50 rounded-md lg:w-[40%] flex flex-col pt-3
             w-[80%] backdrop-blur-[20px]  items-center justify-evenly"
            >
              <RxCross1
                size={24}
                onClick={handleAdd}
                className="text-white absolute top-[10px] right-[10px]"
              />
              <input
                type="text"
                ref={nameRef}
                name="inputdata"
                className="h-[40px] pl-3 rounded-md w-[80%]"
                placeholder="NAME"
              />
              <input
                type="text"
                ref={inputRef}
                name="inputdata"
                className="h-[40px] pl-3 rounded-md w-[80%]"
                placeholder="URL"
              />
              <button
                type="submit"
                className="h-[40px] w-[120px] rounded-md  text-white m-2 bg-blue-600"
              >
                {updating ? "UPDATE" : "ADD"}
              </button>
            </form>
          </div>

          {/* Favourite sites rendering */}
          {site.length > 0 ? (
            site.map((s, index) => {
              return (
                <div
                  className="rounded-sm group relative hover:bg-[#474648]/60 transition flex flex-col items-center justify-center h-[120px] w-[120px]"
                  key={index}
                >
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(s.id)}
                    className="group-hover:block text-red-500 hidden absolute m-1 right-0 top-0"
                  />
                  <MdModeEditOutline
                    onClick={() => handleUpdate(s.id)}
                    className="group-hover:block  hidden absolute m-1 right-0 bottom-0 text-white"
                  />
                  <div className="m-3 bg-[#474648] rounded-full flex items-center justify-center h-1/2 w-1/2">
                    <a href={s.site_path} target="_blank">
                      <img src={s.img_path} className="h-full object-cover" />
                    </a>
                  </div>
                  <h1 className="text-white capitalize">{s.name}</h1>
                </div>
              );
            })
          ) : (
            <h1>no favourite pages</h1>
          )}

          {/* add new favourite option */}
          <div className="hover:bg-[#474648]/60  transition flex items-center justify-center h-[120px] w-[120px]">
            <div
              onClick={handleAdd}
              className="add h-[50px] w-[50px]
               rounded-full
              bg-[#474648] flex items-center justify-center"
            >
              <IoMdAdd size={30} className="text-white" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
