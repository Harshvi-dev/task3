import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface toDosData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Update: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<toDosData | null>(null);
  const [ addNewData , setAddNewData] = useState<toDosData | null>();
  const[localStorageData,setLocalStorageData] = useState<toDosData[]>()
  const location = useLocation();
  const receivedData = location.state?.data || null ;
  console.log("receiveData : " + receivedData);
  useEffect(() => {
    
    var localStorageToDosData : any = localStorage.getItem('toDos')
    var parseData : toDosData[] = JSON.parse(localStorageToDosData);

    const getData = async () => {
      parseData.map((item :any) =>{
        if (item.id == receivedData) {
          setData(item)
        }
      })

    };
    if (receivedData!=null) {
      getData(); 
    }
    setLocalStorageData(parseData)
    console.log("local strog :"+ JSON.stringify(localStorageData));
  },[]);
  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => {
      if (prevData !== null) {
        return {
          ...prevData,
          [e.target.id]: e.target.value,
        };
      }
      return null;
    });
    if (data === null) {
      setData((prevData) => {
        if (prevData !== null) {
          return {
            ...prevData,
            [e.target.id]: e.target.value,
          };
        }
        return null;
      });
      setAddNewData((prevData: toDosData | null | undefined) => {
        if (prevData !== null) {
          return {
            ...prevData,
            [e.target.id]: e.target.value,
          } as toDosData;
        }
        return null;
      });
        
    }
  };
  const updateData = () =>{
    console.log("data" + JSON.stringify(data));
    var demo :any = localStorage.getItem('toDos')
    console.log(demo)
    const parsedDemo : toDosData[] = JSON.parse(demo);
    const updatedDemo = parsedDemo.map((item: any) => {
      console.log("item :" + JSON.stringify(item))
      if (item.id==receivedData) {
        return data; 
      }
      return item;
    });
    localStorage.setItem('toDos', JSON.stringify(updatedDemo));
    navigate('/product');
  }
  

const handleAdd = async () => {
  console.log("Add data: " + JSON.stringify(addNewData));
  console.log("Original data: " + JSON.stringify(localStorageData));

  await setLocalStorageData((prevData: toDosData[] | undefined) => {
    if (prevData) {
      return [...prevData, addNewData].filter(Boolean) as toDosData[];
    } else {
      return [addNewData].filter(Boolean) as toDosData[];
    }
  });

  const updatedData = localStorageData ? [...localStorageData, addNewData] : [addNewData];
  localStorage.setItem('toDos', JSON.stringify(updatedData));
  navigate('/product');
};
  return (
    <>
    {receivedData != null && data !== null && (
  <>
    {Object.keys(data).map((key) => (
      <React.Fragment key={key}>
        <label>{key}</label>
        <input
          type="text"
          id={key}
          onChange={getValue}
          value={(data as Record<string, any>)[key]}
        />
        <br />
      </React.Fragment>
    ))}
    <button onClick={updateData}>UPDATE</button>
  </>
)}
    {receivedData == null && 
      <>  
        <label>userId</label>
        <input type="text" onChange={getValue} id="userId"/>
        <br/>
        <label>Id</label><input type="text"  placeholder={(localStorageData?.length ?? 0 + 1).toString()} onChange={getValue} id="id"/>
        <br/>
        
        <label>Title</label>
        <input type="text" onChange={getValue} id="title"/>
        <br/>
        <label>Completed</label>
        <input type="text" onChange={getValue} id="completed"/>
        <br/>
        <button onClick={handleAdd}>Add</button>
      </>
    }
  </>
  );
};

export default Update;
