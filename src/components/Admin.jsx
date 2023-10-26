
import React, { useState } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';

function Admin() {
  const [key, setKey] = useState('vacationRequests');
  

  return (
    <Container className='my-4'>
      <Tab.Container id='admin-tabs' defaultActiveKey='vacationRequests'>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='vacationRequests'>Vacation Requests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='ineligiblePeriods'>Ineligible Periods</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='userRoles'>User Roles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='vacationRequests'>
                <h3>Vacation Requests Management</h3>
                {/* Vacation Requests Management Content Goes Here */}
              </Tab.Pane>
              <Tab.Pane eventKey='ineligiblePeriods'>
                <h3>Ineligible Periods Management</h3>
                {/* Ineligible Periods Management Content Goes Here */}
              </Tab.Pane>
              <Tab.Pane eventKey='userRoles'>
                <h3>User Roles Management</h3>
                {/* User Roles Management Content Goes Here */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Admin;