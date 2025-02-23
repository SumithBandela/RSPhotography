import React, { useState } from 'react';
import './App.css';
import {HashRouter as BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { About } from './about';
import { Contact } from './contact-us';
import { NotFound } from './not-found';
import { QuoteCalc } from './quote-calc';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AlbumView } from './album-view';
import { Gallery } from './gallery';
import { AdminLogin } from './adminlogin';
import { AdminDashboard } from './admindashboard';
import { Invalid } from './invalid';

function App() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false); // Close the menu after clicking a nav link
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar 
          collapseOnSelect 
          expand="lg" 
          bg="white" 
          variant="light" 
          className="shadow-sm" 
          expanded={expanded} 
        >
          <Container>
            {/* Logo Section */}
            <Navbar.Brand as={Link} to="/home">
              <img src="images/header-logo.webp" width="130" alt="Rashmi Studio's Logo" />
            </Navbar.Brand>

            {/* Navbar Toggle for Mobile */}
            <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />

            {/* Navbar Links Section */}
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Item>
                  <Nav.Link as={Link} to="/home" onClick={handleNavClick}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/gallery" onClick={handleNavClick}>Gallery</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/about" onClick={handleNavClick}>About us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/contact" onClick={handleNavClick}>Contact us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" onClick={handleNavClick}>Login</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Section with Routes */}
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="home" element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="/gallery/:title" element={<AlbumView />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="quote" element={<QuoteCalc />} />
            <Route path='login' element={<AdminLogin/>}/>
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='invalid' element={<Invalid/>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
