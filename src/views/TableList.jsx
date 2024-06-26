import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import SubscriptionModal from './SubscriptionModal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './tableList.css';

function TableList({ setSubscriptionCounts, showActions }) {
  let initialData = [{ id: 1, subscription_name: "Basic", startDate: "2023-01-01", expiryDate: "2024-01-01", status: "Active", subscription_cost: "#2,000" }];
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const navigate = useNavigate();
  console.log(initialData)
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/v1/subscriptions',
      {headers: {
        "Authorization": `Bearer ${token}`, // mind the space before your token
        "x-access-token": token
      }})
    .then(res => {
      console.log("Result data", res.data);
      let counter = 1;
      initialData = res.data;
      for (let row of initialData) {
        row['id'] = counter;
        counter++;
      }
      const counts = initialData.reduce(
        (acc, item) => {
          item.subscription_status ? acc['Active'] += 1 : acc['Expired'] += 1;
          return acc;
        },
        { Active: 0, Expired: 0 }
      );
      // console.log(counts);
      setSubscriptionCounts(counts);
      setFilteredData(initialData);
    })
    .catch(
      error => {
        if (error.response.status === 401) {
          navigate("/login")
        }
      }
    )
  }, [setSubscriptionCounts]);
  console.log("Initial Data", initialData);

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = initialData.filter(item => {
      return (
        item.subscription_name.toLowerCase().includes(value) ||
        item.start_date.toLowerCase().includes(value) ||
        item.expiry_date.toLowerCase().includes(value) ||
        item.subscription_status.toLowerCase().includes(value) ||
        item.subscription_cost.toLowerCase().includes(value) ||
        item.subscription_description.toLowerCase().includes(value)
      );
    });

    setFilteredData(filtered);
    // console.log(filteredData);
    
  };

  const handleView = (row) => {
    setCurrentRow(row);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setCurrentRow(row);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updatedData = filteredData.filter(item => item.id !== id);
    const reassignedData = updatedData.map((item, index) => ({
      ...item,
      id: index + 1
    }));
    setFilteredData(reassignedData);
    const counts = reassignedData.reduce(
      (acc, item) => {
        item.subscription_status ? acc['Active'] += 1 : acc['Expired'] += 1;
        return acc;
      },
      { Active: 0, Expired: 0 }
    );
    setSubscriptionCounts(counts);
  };
  
  const handleClose = () => {
    setShowModal(false);
    setCurrentRow(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRow({
      ...currentRow,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilteredData(filteredData.map(item => (item.id === currentRow.id ? currentRow : item)));
    handleClose();
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Subscription Name', selector: row => row.subscription_name, sortable: true },
    { name: 'Start Date', selector: row => row.start_date, sortable: true },
    { name: 'Expiry Date', selector: row => row.expiry_date, sortable: true },
    { name: 'Subscription Cost', selector: row => row.subscription_cost, sortable: true },
    { 
      name: 'Status', 
      selector: row => row.status, 
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.subscription_status}`}>
          {row.subscription_status ? 'Active' : 'Expired'}
        </span>
      ) 
    },
    { 
      name: 'Action',
      sortable: true,
      cell: row => (
        <div className="action-buttons">
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
  // console.log(columns);

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
        <h4 className='table-header'>Subscription List</h4>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <DataTable
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
          show={showModal}
          handleClose={handleClose}
          formData={currentRow}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default TableList;
