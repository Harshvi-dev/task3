import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface toDosData {
    userId:number,
    id:number,
    title: string,
    completed: boolean
}

const Product : React.FC = () => {
    const navigate = useNavigate();
    const[APIdata,setAPIData] = useState<toDosData []>([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            if (!response) {
                console.log("fetch error")
            }
            const jsonData : toDosData[] = await response.json()
            setAPIData(jsonData)
            localStorage.setItem('toDos',JSON.stringify(jsonData))
        }
        if (localStorage.getItem('toDos')) {
          var copyOfAPIDataToDosData : any = localStorage.getItem('toDos')
          var parseData : toDosData[] = JSON.parse(copyOfAPIDataToDosData);
          setAPIData(parseData)
        }else{
          fetchData();
        }
        

    },[])
    const handleUpdate = (item:any) =>{
        console.log(item)
        navigate('/update',{state:{data:item}});
    }
    const handleDelete = (item:any) =>{
        const response = fetch(`https://jsonplaceholder.typicode.com/todos/${item}`,{
          method:'DELETE'
        })
        if (!response) {
          console.log("fetch issue");
        }
        var copyOfAPIData = [...APIdata];
        copyOfAPIData.splice(item,1)
        console.log("copyOfAPIData" + JSON.stringify(copyOfAPIData))
        setAPIData(copyOfAPIData)
        localStorage.setItem('toDos',JSON.stringify(copyOfAPIData))
        // printData();
    }
    const addData = () =>{
      navigate('/add')
    }
    const printData = () =>{
        return(
            <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">Title</th>
              <th scope="col">Completed</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {APIdata.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                  <button
                    style={{marginLeft:"5px"}}
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )
    }
  return (
    <>
      <h2>Product Page</h2>
<button type="button" className="btn btn-dark" onClick={addData}>ADD</button>
        {printData()}
    </>
  )
}

export default Product