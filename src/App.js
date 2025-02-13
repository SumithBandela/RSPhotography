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
import { Collections } from './collections';
import { AlbumView } from './album-view';
import { ImageView } from './image-view';
function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" sticky="top" className="shadow-sm">
          <Container>
            {/* Logo Section */}
            <Navbar.Brand as={Link} to="/home">
              <img src="images/header-logo.png" width="100" alt="Rashmi Studio's Logo" />
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
                  <Nav.Link as={Link} to="/collections">Collections</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/qr">QrGenerator</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/quote">QuotoCalc</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Section with Routes */}
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='quote' element={<QuoteCalc/>}/>
            <Route path='*' element={<NotFound />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="qr" element={<QrGenerator />} />
            <Route path="collections" element={<Collections/>}/>
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path='/image/:id' element={<ImageView/>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
