import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import SubscriptionModal from './SubscriptionModal';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './tableList.css';
import ip_initials from './config'; // Import the ip_initials constant from config.js

const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function TableList({ setSubscriptionCounts, showActions, url }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for the confirmation modal
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null); // State for the row to delete
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "x-access-token": token
      }
    })
    .then(res => {
      const initialData = res.data.map((item, index) => ({
        ...item,
        subscription_id: index + 1,
        start_date: formatDateForInput(item.start_date),
        expiry_date: formatDateForInput(item.expiry_date),
      }));
      setData(initialData);
      setFilteredData(initialData);
      updateSubscriptionCounts(initialData);
      console.log("Initial Data", initialData);
    })
    .catch(error => {
      if (error.response.status === 401) {
        navigate("/login");
      }
    });
  }, [setSubscriptionCounts, navigate]);

  const updateSubscriptionCounts = (data) => {
    const counts = data.reduce(
      (acc, item) => {
        item.subscription_status ? acc['Active'] += 1 : acc['Expired'] += 1;
        return acc;
      },
      { Active: 0, Expired: 0 }
    );
    setSubscriptionCounts(counts);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter(item => (
      (item.subscription_name && item.subscription_name.toLowerCase().includes(value)) ||
      (item.start_date && item.start_date.toLowerCase().includes(value)) ||
      (item.expiry_date && item.expiry_date.toLowerCase().includes(value)) ||
      (typeof item.subscription_status === 'string' && item.subscription_status.toLowerCase().includes(value)) ||
      (item.subscription_cost && item.subscription_cost.toLowerCase().includes(value)) ||
      (item.subscription_description && item.subscription_description.toLowerCase().includes(value))
    ));

    console.log("Search Value:", value);
    console.log("Filtered Data:", filtered);

    setFilteredData(filtered);
  };

  const handleView = (row) => {
    setCurrentRow(row);
    setCurrentRow({
      ...row,
      start_date: formatDateForInput(row.start_date),
      expiry_date: formatDateForInput(row.expiry_date),
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setCurrentRow(row);
    setCurrentRow({
      ...row,
      start_date: formatDateForInput(row.start_date),
      expiry_date: formatDateForInput(row.expiry_date),
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setRowToDelete(id); // Set the row to delete
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`${ip_initials}/api/v1/subscriptions/${rowToDelete}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-access-token": token
      }
    })
    .then(() => {
      const updatedData = filteredData.filter(item => item.id !== rowToDelete);
      const reassignedData = updatedData.map((item, index) => ({
        ...item,
        id: index + 1
      }));
      setData(reassignedData);
      setFilteredData(reassignedData);
      updateSubscriptionCounts(reassignedData);

      // Reload the page to reflect changes
      window.location.reload();
    })
    .catch(error => {
      console.error('There was an error deleting the subscription!', error);
    })
    .finally(() => {
      setShowConfirmationModal(false); // Hide the confirmation modal
      setRowToDelete(null); // Clear the row to delete
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentRow(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`);
    setCurrentRow(prevRow => (
      {
      ...prevRow,
      [name]: value
    }));
    console.log("Current row", currentRow);
  };

  const handleUsersChange = (selectedOptions) => {
    setCurrentRow({
      ...currentRow,
      users: selectedOptions
    });
    console.log("Current Row", currentRow);
    console.log("Selected options", selectedOptions);
  };

  const constructPayload = (row) => {
    const payload = {...row};
    console.log("Current Row", row);
    const keysToDelete = ['id', 'start_date', 'subscription_id'];
    for (const key of keysToDelete) {
      delete payload[key];
    }
    console.log("Payload", payload);
    return payload;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log(currentRow);
    const payload = constructPayload(currentRow);
    // console.log("Payload", payload);
    axios.put(`${ip_initials}/api/v1/subscriptions/${currentRow.id}`, payload, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-access-token": token
      }
    })
    .then(() => {
      const updatedData = filteredData.map(item => (item.id === currentRow.id ? currentRow : item));
      setData(updatedData);
      setFilteredData(updatedData);
      updateSubscriptionCounts(updatedData);
    })
    .catch(error => {
      console.error('There was an error updating the subscription!', error);
    });
  };

  const columns = [
    { name: 'ID', selector: row => row.subscription_id, sortable: true },
    { name: 'Subscription Name', selector: row => row.subscription_name, sortable: true },
    { name: 'Start Date', selector: row => row.start_date, sortable: true },
    { name: 'Expiry Date', selector: row => row.expiry_date, sortable: true },
    { name: 'Subscription Cost', selector: row => row.subscription_cost, sortable: true },
    { 
      name: 'Status', 
      selector: row => row.subscription_status, 
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.subscription_status ? 'active' : 'expired'}`}>
          {row.subscription_status ? 'Active' : 'Expired'}
        </span>
      ) 
    },
    { 
      name: 'Action',
      sortable: true,
      cell: row => (
        <div className="action-buttons" style={{marginLeft: "-40px"}}>
          <span className="action-link view" onClick={() => handleView(row)}>View</span>
          {showActions && (
            <>
              <span className="action-link edit" onClick={() => handleEdit(row)}>Edit</span>
              <span className="action-link delete" onClick={() => handleDelete(row.id)}>Delete</span>
            </>
          )}
        </div>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#012970',
        color: 'white',
      },
    },
    rows: {
      style: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f3f4f6',
        },
        display: 'flex',
        alignItems: 'center'
      },
    },
    pagination: {
      style: {
        color: '#1e3a5f',
        '& a': {
          color: '#1e3a5f',
        },
        '& a:hover': {
          color: '#1e3a5f',
        },
      },
    },
  };

  return (
    <div className="table-container">
      <div>
        <h4 className='table-header' >Subscription List</h4>
        <div className="search-box">
          <input
          style={{fontFamily: "Roboto, OpenSans"}}
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <DataTable
        style={{fontFamily: "Roboto, OpenSans"}}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        customStyles={customStyles}
        highlightOnHover
      />
      {currentRow && (
        <SubscriptionModal
        style={{fontFamily: "Roboto, OpenSans"}}
          show={showModal}
          handleClose={handleClose}
          formData={currentRow}
          handleInputChange={handleInputChange}
          handleUsersChange={handleUsersChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          handleClose={() => setShowConfirmationModal(false)}
          handleConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default TableList;




































// import React, { useState, useEffect } from "react";
// import DataTable from 'react-data-table-component';
// import SubscriptionModal from './SubscriptionModal';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import './tableList.css';
// import ip_initials from './config'; // Import the ip_initials constant from config.js

// const formatDateForInput = (date) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   const hours = String(d.getHours()).padStart(2, '0');
//   const minutes = String(d.getMinutes()).padStart(2, '0');
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };

// function TableList({ setSubscriptionCounts, showActions, url }) {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentRow, setCurrentRow] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get(url, {
//       headers: {
//         "Authorization": `Bearer ${token}`, 
//         "x-access-token": token
//       }
//     })
//     .then(res => {
//       const initialData = res.data.map((item, index) => ({
//         ...item,
//         subscription_id: index + 1,
//         start_date: formatDateForInput(item.start_date),
//         expiry_date: formatDateForInput(item.expiry_date),
//       }));
//       setData(initialData);
//       setFilteredData(initialData);
//       updateSubscriptionCounts(initialData);
//       console.log("Initial Data", initialData);
//     })
//     .catch(error => {
//       if (error.response.status === 401) {
//         navigate("/login");
//       }
//     });
//   }, [setSubscriptionCounts, navigate]);

//   const updateSubscriptionCounts = (data) => {
//     const counts = data.reduce(
//       (acc, item) => {
//         item.subscription_status ? acc['Active'] += 1 : acc['Expired'] += 1;
//         return acc;
//       },
//       { Active: 0, Expired: 0 }
//     );
//     setSubscriptionCounts(counts);
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearch(value);

//     const filtered = data.filter(item => (
//       (item.subscription_name && item.subscription_name.toLowerCase().includes(value)) ||
//       (item.start_date && item.start_date.toLowerCase().includes(value)) ||
//       (item.expiry_date && item.expiry_date.toLowerCase().includes(value)) ||
//       (typeof item.subscription_status === 'string' && item.subscription_status.toLowerCase().includes(value)) ||
//       (item.subscription_cost && item.subscription_cost.toLowerCase().includes(value)) ||
//       (item.subscription_description && item.subscription_description.toLowerCase().includes(value))
//     ));

//     console.log("Search Value:", value);
//     console.log("Filtered Data:", filtered);

//     setFilteredData(filtered);
//   };

//   const handleView = (row) => {
//     setCurrentRow(row);
//     setCurrentRow({
//       ...row,
//       start_date: formatDateForInput(row.start_date),
//       expiry_date: formatDateForInput(row.expiry_date),
//     });
//     setIsEditing(false);
//     setShowModal(true);
//   };

//   const handleEdit = (row) => {
//     setCurrentRow(row);
//     setCurrentRow({
//       ...row,
//       start_date: formatDateForInput(row.start_date),
//       expiry_date: formatDateForInput(row.expiry_date),
//     });
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     const token = localStorage.getItem('token');
//     console.log(id);
//     axios.delete(`${ip_initials}/api/v1/subscriptions/${id}`, {
//       method: 'DELETE',
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "x-access-token": token
//       }
//     })
//     .then(() => {
//       const updatedData = filteredData.filter(item => item.id !== id);
//       const reassignedData = updatedData.map((item, index) => ({
//         ...item,
//         id: index + 1
//       }));
//       setData(reassignedData);
//       setFilteredData(reassignedData);
//       updateSubscriptionCounts(reassignedData);

//          // Reload the page to reflect changes
//     window.location.reload();
//     })
//     .catch(error => {
//       console.error('There was an error deleting the subscription!', error);
//     });
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setCurrentRow(null);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     console.log(`${name}: ${value}`);
//     setCurrentRow(prevRow => (
//       {
//       ...prevRow,
//       [name]: value
//     }));
//     console.log("Current row", currentRow);
//   };

//   const constructPayload = (row) => {
//     const payload = {...row};
//     console.log("Current Row", row);
//     const keysToDelete = ['id', 'start_date', 'subscription_id'];
//     for (const key of keysToDelete) {
//       delete payload[key];
//     }
//     console.log("Payload", payload);
//     return payload;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log(currentRow);
//     const payload = constructPayload(currentRow);
//     // console.log("Payload", payload);
//     axios.put(`${ip_initials}/api/v1/subscriptions/${currentRow.id}`, payload, {
//       method: 'PUT',
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "x-access-token": token
//       }
//     })
//     .then(() => {
//       const updatedData = filteredData.map(item => (item.id === currentRow.id ? currentRow : item));
//       setData(updatedData);
//       setFilteredData(updatedData);
//       updateSubscriptionCounts(updatedData);
//     })
//     .catch(error => {
//       console.error('There was an error updating the subscription!', error);
//     });
//   };

//   const columns = [
//     { name: 'ID', selector: row => row.subscription_id, sortable: true },
//     { name: 'Subscription Name', selector: row => row.subscription_name, sortable: true },
//     { name: 'Start Date', selector: row => row.start_date, sortable: true },
//     { name: 'Expiry Date', selector: row => row.expiry_date, sortable: true },
//     { name: 'Subscription Cost', selector: row => row.subscription_cost, sortable: true },
//     { 
//       name: 'Status', 
//       selector: row => row.subscription_status, 
//       sortable: true,
//       cell: row => (
//         <span className={`status-badge ${row.subscription_status ? 'active' : 'expired'}`}>
//           {row.subscription_status ? 'Active' : 'Expired'}
//         </span>
//       ) 
//     },
//     { 
//       name: 'Action',
//       sortable: true,
//       cell: row => (
//         <div className="action-buttons" style={{marginLeft: "-40px"}}>
//           <span className="action-link view" onClick={() => handleView(row)}>View</span>
//           {showActions && (
//             <>
//               <span className="action-link edit" onClick={() => handleEdit(row)}>Edit</span>
//               <span className="action-link delete" onClick={() => handleDelete(row.id)}>Delete</span>
//             </>
//           )}
//         </div>
//       )
//     }
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#012970',
//         color: 'white',
//       },
//     },
//     rows: {
//       style: {
//         '&:nth-of-type(odd)': {
//           backgroundColor: '#f3f4f6',
//         },
//         display: 'flex',
//         alignItems: 'center'
//       },
//     },
//     pagination: {
//       style: {
//         color: '#1e3a5f',
//         '& a': {
//           color: '#1e3a5f',
//         },
//         '& a:hover': {
//           color: '#1e3a5f',
//         },
//       },
//     },
//   };

//   return (
//     <div className="table-container">
//       <div>
//         <h4 className='table-header' >Subscription List</h4>
//         <div className="search-box">
//           <input
//           style={{fontFamily: "Roboto, OpenSans"}}
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={handleSearch}
//             className="search-input"
//           />
//         </div>
//       </div>
//       <DataTable
//         style={{fontFamily: "Roboto, OpenSans"}}
//         columns={columns}
//         data={filteredData}
//         pagination
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[10, 20, 30, 50]}
//         customStyles={customStyles}
//         highlightOnHover
//       />
//       {currentRow && (
//         <SubscriptionModal
//         style={{fontFamily: "Roboto, OpenSans"}}
//           show={showModal}
//           handleClose={handleClose}
//           formData={currentRow}
//           handleInputChange={handleInputChange}
//           handleSubmit={handleSubmit}
//           isEditing={isEditing}
//         />
//       )}
//     </div>
//   );
// }

// export default TableList;





















// import React, { useState, useEffect } from "react";
// import DataTable from 'react-data-table-component';
// import SubscriptionModal from './SubscriptionModal';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import './tableList.css';
// import ip_initials from './config'; // Import the ip_initials constant from config.js


// const formatDateForInput = (date) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   const hours = String(d.getHours()).padStart(2, '0');
//   const minutes = String(d.getMinutes()).padStart(2, '0');
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };


// function TableList({ setSubscriptionCounts, showActions, url }) {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentRow, setCurrentRow] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get(url, {
//       headers: {
//         "Authorization": `Bearer ${token}`, 
//         "x-access-token": token
//       }
//     })
//     .then(res => {
//       const initialData = res.data.map((item, index) => ({
//         ...item,
//         subscription_id: index + 1,
//         start_date: formatDateForInput(item.start_date),
//         expiry_date: formatDateForInput(item.expiry_date),
//       }));
//       setData(initialData);
//       setFilteredData(initialData);
//       updateSubscriptionCounts(initialData);
//       console.log("Initial Data", initialData);
//     })
//     .catch(error => {
//       if (error.response.status === 401) {
//         navigate("/login");
//       }
//     });
//   }, [setSubscriptionCounts, navigate]);

//   const updateSubscriptionCounts = (data) => {
//     const counts = data.reduce(
//       (acc, item) => {
//         item.subscription_status ? acc['Active'] += 1 : acc['Expired'] += 1;
//         return acc;
//       },
//       { Active: 0, Expired: 0 }
//     );
//     setSubscriptionCounts(counts);
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearch(value);
  
//     const filtered = data.filter(item => (
//       (item.subscription_name && item.subscription_name.toLowerCase().includes(value)) ||
//       (item.start_date && item.start_date.toLowerCase().includes(value)) ||
//       (item.expiry_date && item.expiry_date.toLowerCase().includes(value)) ||
//       (typeof item.subscription_status === 'string' && item.subscription_status.toLowerCase().includes(value)) ||
//       (item.subscription_cost && item.subscription_cost.toLowerCase().includes(value)) ||
//       (item.subscription_description && item.subscription_description.toLowerCase().includes(value))
//     ));
  
//     console.log("Search Value:", value);
//     console.log("Filtered Data:", filtered);
  
//     setFilteredData(filtered);
//   };
  

//   const handleView = (row) => {
//     setCurrentRow(row);
//     setCurrentRow({
//       ...row,
//       start_date: formatDateForInput(row.start_date),
//       expiry_date: formatDateForInput(row.expiry_date),
//     });
//     setIsEditing(false);
//     setShowModal(true);
//   };

//   const handleEdit = (row) => {
//     setCurrentRow(row);
//     setCurrentRow({
//       ...row,
//       start_date: formatDateForInput(row.start_date),
//       expiry_date: formatDateForInput(row.expiry_date),
//     });
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
    
//     const token = localStorage.getItem('token');
//     console.log(id);
//     axios.delete(`${ip_initials}/api/v1/subscriptions/${id}`, {
//       method: 'DELETE',
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "x-access-token": token
//       }
//     })
//     .then(() => {
//       const updatedData = filteredData.filter(item => item.id !== id);
//       const reassignedData = updatedData.map((item, index) => ({
//         ...item,
//         id: index + 1
//       }));
//       setData(reassignedData);
//       setFilteredData(reassignedData);
//       updateSubscriptionCounts(reassignedData);

//          // Reload the page to reflect changes
//     window.location.reload();
//     })
//     .catch(error => {
//       console.error('There was an error deleting the subscription!', error);
//     });
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setCurrentRow(null);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentRow(prevRow => ({
//       ...prevRow,
//       [name]: value
//     }));
//   };

//   const constructPayload = (row) => {
//     const payload = {...row};
//     console.log("Current Row", row);
//     const keysToDelete = ['id', 'start_date', 'subscription_id'];
//     for (const key of keysToDelete) {
//       delete payload[key];
//     }
//     console.log("Payload", payload);
//     return payload;
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log(currentRow);
//     const payload = constructPayload(currentRow);
//     // console.log("Payload", payload);
//     axios.put(`${ip_initials}/api/v1/subscriptions/${currentRow.id}`, payload, {
//       method: 'PUT',
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "x-access-token": token
//       }
//     })
//     .then(() => {
//       const updatedData = filteredData.map(item => (item.id === currentRow.id ? currentRow : item));
//       setData(updatedData);
//       setFilteredData(updatedData);
//       updateSubscriptionCounts(updatedData);
//       handleClose();
//     })
//     .catch(error => {
//       console.error('There was an error updating the subscription!', error);
//     });
//   };

//   const columns = [
//     { name: 'ID', selector: row => row.subscription_id, sortable: true },
//     { name: 'Subscription Name', selector: row => row.subscription_name, sortable: true },
//     { name: 'Start Date', selector: row => row.start_date, sortable: true },
//     { name: 'Expiry Date', selector: row => row.expiry_date, sortable: true },
//     { name: 'Subscription Cost', selector: row => row.subscription_cost, sortable: true },
//     { 
//       name: 'Status', 
//       selector: row => row.subscription_status, 
//       sortable: true,
//       cell: row => (
//         <span className={`status-badge ${row.subscription_status ? 'active' : 'expired'}`}>
//           {row.subscription_status ? 'Active' : 'Expired'}
//         </span>
//       ) 
//     },
//     { 
//       name: 'Action',
//       sortable: true,
//       cell: row => (
//         <div className="action-buttons" style={{marginLeft: "-40px"}}>
//           <span className="action-link view" onClick={() => handleView(row)}>View</span>
//           {showActions && (
//             <>
//               <span className="action-link edit" onClick={() => handleEdit(row)}>Edit</span>
//               <span className="action-link delete" onClick={() => handleDelete(row.id)}>Delete</span>
//             </>
//           )}
//         </div>
//       )
//     }
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: '#012970',
//         color: 'white',
//       },
//     },
//     rows: {
//       style: {
//         '&:nth-of-type(odd)': {
//           backgroundColor: '#f3f4f6',
//         },
//         display: 'flex',
//         alignItems: 'center'
//       },
//     },
//     pagination: {
//       style: {
//         color: '#1e3a5f',
//         '& a': {
//           color: '#1e3a5f',
//         },
//         '& a:hover': {
//           color: '#1e3a5f',
//         },
//       },
//     },
//   };

//   return (
//     <div className="table-container">
//       <div>
//         <h4 className='table-header' >Subscription List</h4>
//         <div className="search-box">
//           <input
//           style={{fontFamily: "Roboto, OpenSans"}}
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={handleSearch}
//             className="search-input"
//           />
//         </div>
//       </div>
//       <DataTable
//         style={{fontFamily: "Roboto, OpenSans"}}
//         columns={columns}
//         data={filteredData}
//         pagination
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[10, 20, 30, 50]}
//         customStyles={customStyles}
//         highlightOnHover
//       />
//       {currentRow && (
//         <SubscriptionModal
//         style={{fontFamily: "Roboto, OpenSans"}}
//           show={showModal}
//           handleClose={handleClose}
//           formData={currentRow}
//           handleInputChange={handleInputChange}
//           handleSubmit={handleSubmit}
//           isEditing={isEditing}
//         />
//       )}
//     </div>
//   );
// }

// export default TableList;
