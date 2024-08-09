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

    setEnrolleRecord(res?.data)

  }



  const getEnrolleRecord = async () => {
    const res = await fetch("https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    console.log("res", res)
    setEnrolleRecord(res?.data)
  }
  useEffect(() => {
    getEnrolleRecord()
  }, [])
  console.log("enrolleRecord", enrolleRecord)
  return (
    <div className="App">
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
        <button type="submit">Submit</button>
      </form>


      <div>
        <input type="text" placeholder='filter by name' name="search" id="search" />
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
                  <td>{data?.email}</td>
                  <td>{data?.enrollee_id}</td>
                  <td><button style={{ backgroundColor: "red", color: "white", padding: "4px 20px" }}>Delete</button></td>
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
