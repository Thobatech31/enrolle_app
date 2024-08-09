import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    enrollee_id: '',
    email: '',
    profile_picture: '',
  });
  const [enrolleRecord, setEnrolleRecord] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setFormData({
        first_name: '',
        last_name: '',
        enrollee_id: '',
        email: '',
        profile_picture: '',
      });
      getEnrolleRecord();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getEnrolleRecord = async () => {
    try {
      const res = await fetch("https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/all");
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEnrolleRecord(data?.data || []);
    } catch (error) {
      console.error("Error fetching enrollee records:", error);
    }
  };

  useEffect(() => {
    getEnrolleRecord();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://auto-mart-apis-nodejs-mongodb.onrender.com/api/v1/enrollee/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      const data = await res.json();
      if (data?.status === "200") {
        alert("Enrollee Record Deleted Successfully");
      }
      getEnrolleRecord();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Enrollee Management System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add, view, and manage enrollee records
          </p>
        </div>
        
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-8 py-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="enrollee_id">
                  Enrollee ID
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="enrollee_id"
                  type="text"
                  placeholder="Enter your enrollee id"
                  name="enrollee_id"
                  value={formData.enrollee_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="profile_picture">
                  Profile Picture
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="profile_picture"
                  type="text"
                  placeholder="Enter profile picture URL"
                  name="profile_picture"
                  value={formData.profile_picture}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Enrollee Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrolleRecord.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data?.first_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data?.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data?.enrollee_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data?.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(data?._id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;