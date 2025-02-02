import logo from './logo.svg';
import './App.css';
import { HashRouter as BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { About } from './about';
import { Contact } from './contact';
import { NotFound } from './not-found';
import { QrGenerator } from './qr-generator';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container">
            {/* Logo Section */}
            <div className="navbar-brand">
              <Link to='/home'><img src="images/header-logo.png" width="100" alt="Rashmi Studio's Logo" /></Link>
            </div>

            {/* Navbar Toggle for Mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links Section */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                <Link className="nav-link" to="/qr">
                    QrGenerator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Icons Section */}
            <div className="d-none d-lg-flex social-icons">
              <a className="bi bi-facebook mx-2 fs-4 " href='#'></a>
              <a className="bi bi-instagram mx-2 fs-4 text-dark" href='https://www.instagram.com/rs_officialphotography' target='_blank' rel="noopener noreferrer"></a>
              <a className="bi bi-youtube mx-2 fs-4 text-danger" href='https://youtube.com/@rsphotographyyy' target='_blank' rel="noopener noreferrer"></a>
            </div>
          </div>
        </header>

        {/* Main Section with Routes */}
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='*' element={<NotFound/>}/>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="qr" element={<QrGenerator/>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
