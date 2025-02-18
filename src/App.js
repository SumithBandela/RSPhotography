import React from 'react';
import './App.css';
import { HashRouter as BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { About } from './about';
import { Contact } from './contact';
import { NotFound } from './not-found';
import { QrGenerator } from './qr-generator';
import {QuoteCalc} from './quote-calc';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AlbumView } from './album-view';
import { ImageView } from './image-view';
import { Gallery } from './gallery';
function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light"  className="shadow-sm">
          <Container>
            {/* Logo Section */}
            <Navbar.Brand as={Link} to="/home">
              <img src="images/header-logo.webp" width="120" alt="Rashmi Studio's Logo"  />
            </Navbar.Brand>

            {/* Navbar Toggle for Mobile */}
            <Navbar.Toggle aria-controls="navbar-nav" />

            {/* Navbar Links Section */}
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Item>
                  <Nav.Link as={Link} to="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/about">About us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Section with Routes */}
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path="home" element={<Home />} />
            <Route path='/home/:id' element={<ImageView/>}/>
            <Route path="gallery" element={<Gallery/>}/>
            <Route path="/gallery/:title" element={<AlbumView />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="qr" element={<QrGenerator />} />
            <Route path='quote' element={<QuoteCalc/>}/>
           
            
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
