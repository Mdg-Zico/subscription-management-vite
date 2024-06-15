import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import SubscriptionModal from './SubscriptionModal';

const initialData = [
  { id: 1, subscriptionType: "Basic", startDate: "2023-01-01", expiryDate: "2024-01-01", status: "Active" },
  { id: 2, subscriptionType: "Premium", startDate: "2022-06-15", expiryDate: "2023-06-15", status: "Expired" },
  { id: 3, subscriptionType: "Pro", startDate: "2023-03-20", expiryDate: "2024-03-20", status: "Active" },
  { id: 4, subscriptionType: "Basic", startDate: "2022-08-10", expiryDate: "2023-08-10", status: "Expired" },
  { id: 5, subscriptionType: "Premium", startDate: "2023-11-01", expiryDate: "2024-11-01", status: "Inactive" },
  { id: 6, subscriptionType: "Pro", startDate: "2023-05-05", expiryDate: "2024-05-05", status: "Active" }
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
    // Filter the data to exclude the deleted row
    const updatedData = filteredData.filter(item => item.id !== id);
  
    // Reassign IDs to maintain sequential order
    const reassignedData = updatedData.map((item, index) => ({
      ...item,
      id: index + 1
    }));
  
    // Update the filtered data state
    setFilteredData(reassignedData);
  
    // Update the subscription counts (optional)
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
        <span style={{
          backgroundColor: row.status === 'Active' ? 'green' : row.status === 'Expired' ? 'red' : 'grey',
          color: 'white',
          padding: '2px 6px', 
          borderRadius: '5px',
          display: 'inline-block',
          width: '60px', 
          textAlign: 'center'
        }}>
          {row.status}
        </span>
      ) 
    },
    { 
      name: 'Action',
      sortable: true,
      cell: row => (
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: 'wrap' }}>
          <Button variant="info" size="xs" style={{ minWidth: '40px' }} onClick={() => handleView(row)}>View</Button>
          <Button variant="primary" size="xs" style={{ minWidth: '40px' }} onClick={() => handleEdit(row)}>Edit</Button>
          <Button variant="danger" size="xs" style={{ minWidth: '40px' }} onClick={() => handleDelete(row.id)}>Delete</Button>
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
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <div>
                  <Card.Title as="h4" style={{ color:"#012970", fontFamily: "Roboto" }}>Subscription List</Card.Title>
                </div>
                <InputGroup className="ml-auto" style={{ width: '300px' }}>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={search}
                    onChange={handleSearch}
                    style={{
                      borderColor: 'grey',
                      boxShadow: '0 0 5px rgba(30, 58, 95, 0.5)',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '7px'
                    }}
                  />
                </InputGroup>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30, 50]}
                  customStyles={customStyles}
                  highlightOnHover
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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
    </>
  );
}

export default TableList;
