import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import SubscriptionModal from './SubscriptionModal';
import './tableList.css';

const initialData = [
  { id: 1, subscriptionType: "Basic", startDate: "2023-01-01", expiryDate: "2024-01-01", status: "Active" },
  { id: 2, subscriptionType: "Premium", startDate: "2022-06-15", expiryDate: "2023-06-15", status: "Expired" },
  { id: 3, subscriptionType: "Pro", startDate: "2023-03-20", expiryDate: "2024-03-20", status: "Active" },
  { id: 4, subscriptionType: "Basic", startDate: "2022-08-10", expiryDate: "2023-08-10", status: "Expired" },
  { id: 5, subscriptionType: "Pro", startDate: "2023-05-05", expiryDate: "2024-05-05", status: "Active" }
];

function TableList({ setSubscriptionCounts }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    const counts = initialData.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { Active: 0, Inactive: 0, Expired: 0 }
    );
    setSubscriptionCounts(counts);
  }, [setSubscriptionCounts]);

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = initialData.filter(item => {
      return (
        item.subscriptionType.toLowerCase().includes(value) ||
        item.startDate.toLowerCase().includes(value) ||
        item.expiryDate.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
      );
    });

    setFilteredData(filtered);
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
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { Active: 0, Inactive: 0, Expired: 0 }
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
    { name: 'Subscription Name', selector: row => row.subscriptionType, sortable: true },
    { name: 'Start Date', selector: row => row.startDate, sortable: true },
    { name: 'Expiry Date', selector: row => row.expiryDate, sortable: true },
    { 
      name: 'Status', 
      selector: row => row.status, 
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ) 
    },
    { 
      name: 'Action',
      sortable: true,
      cell: row => (
        <div className="action-buttons">
          <span className="action-link view" onClick={() => handleView(row)}>View</span>
          <span className="action-link edit" onClick={() => handleEdit(row)}>Edit</span>
          <span className="action-link delete" onClick={() => handleDelete(row.id)}>Delete</span>
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

  const noDataMessage = (
    <span className="text-center">No data available</span>
  );

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
        noDataComponent={noDataMessage}
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
