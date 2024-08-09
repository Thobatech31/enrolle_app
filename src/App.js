import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    enrollee_id: '',
    email: '',
    profile_picture: '',
  })
  const [enrolleRecord, setEnrolleRecord] = useState([])

  const handleChange = (e) => {
    {
      setFormData({ ...formData, [e?.target?.name]: e?.target?.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    setFormData({
      first_name: '',
      last_name: '',
      enrollee_id: '',
      email: '',
      profile_picture: '',
    })
    getEnrolleRecord()

  }



  const getEnrolleRecord = async () => {
    const res = await fetch("https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/all", {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res?.json()

    setEnrolleRecord(data?.data)
  }


  useEffect(() => {
    getEnrolleRecord()
  }, [])

  const handleDelete = async (id) => {
    const res = await fetch(`https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res?.json()
    console.log("data", data)
    if (data?.status === "200") {
      alert("Enrolle Record Deleted Successfully")
    }
    getEnrolleRecord()

  }
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your name</label><br />
          <input type="text" onChange={handleChange} name="first_name" id='first_name' />
        </div>
        <div>
          <label>Enter Last Name</label><br />
          <input type="text" onChange={handleChange} name="last_name" id='last_name' />
        </div>
        <div>
          <label>Enrolle</label><br />
          <input type="text" onChange={handleChange} name="enrollee_id" id='enrollee_id' />
        </div>
        <div>
          <label>Email</label><br />
          <input type="text" onChange={handleChange} name="email" id='email' />
        </div>
        <div>
          <label>Profile Picture</label><br />
          <input type="text" onChange={handleChange} name="profile_picture" id='profile_picture' />
        </div>
        <button style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "10px", backgroundColor: "blue", color: "white" }} type="submit">Submit</button>
      </form>


      <div style={{ marginTop: "70px",  }}>
        {/* <input type="text" placeholder='filter by name' name="search" id="search" /> */}
        <table border="1">
          <tr>
            <th>First Name</th>
            <th>last Name</th>
            <th>email</th>
            <th>Enrolle ID</th>
            <th>Action</th>
          </tr>
          <tbody>
            {enrolleRecord?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data?.first_name}</td>
                  <td>{data?.last_name}</td>
                  <td>{data?.enrollee_id}</td>
                  <td>{data?.email}</td>
                  <td><button onClick={() => handleDelete(data?._id)} style={{ backgroundColor: "red", color: "white", padding: "4px 20px" }}>Delete</button></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
