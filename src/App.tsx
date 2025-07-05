import React, { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Metropolitan Bridge Complex",
      description: "A state-of-the-art suspension bridge connecting downtown districts with innovative seismic safety features.",
      image: "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "completed",
      category: "infrastructure",
      location: "Metro City",
      duration: "36 months",
      progress: 100
    },
    {
      id: 2,
      title: "Green Valley Residential Complex",
      description: "Sustainable housing development featuring 200 eco-friendly homes with solar integration.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "ongoing",
      category: "residential",
      location: "Green Valley",
      duration: "24 months",
      progress: 75
    },
    {
      id: 3,
      title: "Tech Hub Office Tower",
      description: "45-story commercial tower with cutting-edge technology and LEED certification.",
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "ongoing",
      category: "commercial",
      location: "Business District",
      duration: "30 months",
      progress: 60
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Project Director",
      company: "Metro Transportation Authority",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
      text: "Terra Build delivered exceptional results on our bridge project. Their attention to detail and commitment to safety standards exceeded all expectations.",
      rating: 5,
      project: "Metropolitan Bridge Complex"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Development Manager",
      company: "Green Valley Communities",
      avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200",
      text: "The sustainable approach Terra Build brought to our residential project was outstanding. They truly understand modern construction needs.",
      rating: 5,
      project: "Green Valley Residential"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Facility Manager",
      company: "Tech Innovations Corp",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      text: "Working with Terra Build was seamless. Their expertise in commercial construction and technology integration is unmatched.",
      rating: 5,
      project: "Tech Hub Office Tower"
    }
  ];

  const filteredProjects = currentFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === currentFilter);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-brand">
            <i className="fas fa-hammer nav-logo"></i>
            <span className="nav-title">Terra Build</span>
          </a>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link active" onClick={handleNavClick}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
            <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#testimonials" className="nav-link" onClick={handleNavClick}>Testimonials</a></li>
            <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
          </ul>
          <div 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Building Tomorrow's <span className="hero-highlight">Infrastructure</span> Today
          </h1>
          <p className="hero-subtitle">
            Leading construction and infrastructure development with 25+ years of excellence in creating sustainable, innovative solutions for communities worldwide.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-play"></i>
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-phone"></i>
              Get Quote
            </a>
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="highlights">
        <div className="container">
          <div className="section-header">
            <h2>Proven Excellence in Construction</h2>
            <p>Over two decades of delivering world-class infrastructure projects with uncompromising quality and innovation.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon award">
                <i className="fas fa-award"></i>
              </div>
              <h3>250+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon building">
                <i className="fas fa-building"></i>
              </div>
              <h3>15</h3>
              <p>Cities Transformed</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon clock">
                <i className="fas fa-clock"></i>
              </div>
              <h3>25+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon users">
                <i className="fas fa-users"></i>
              </div>
              <h3>500+</h3>
              <p>Expert Team Members</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon check">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>98%</h3>
              <p>On-Time Delivery</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon star">
                <i className="fas fa-star"></i>
              </div>
              <h3>4.9/5</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section id="about" className="company-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <h2>Building the Future with Sustainable Excellence</h2>
              <p>
                Terra Build stands at the forefront of modern construction and infrastructure development. 
                Since 1998, we've been transforming communities through innovative engineering solutions 
                that prioritize sustainability, safety, and long-term value.
              </p>
              <p>
                Our comprehensive approach combines cutting-edge technology with time-tested construction 
                principles, ensuring every project we undertake not only meets today's needs but 
                anticipates tomorrow's challenges.
              </p>
              <a href="#projects" className="btn btn-success">
                <i className="fas fa-arrow-right"></i>
                Explore Our Work
              </a>
            </div>
            <div className="intro-image">
              <img 
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Construction team at work"
              />
              <div className="image-badge">
                <p>Established</p>
                <h3>1998</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="project-filters">
          <div className="container">
            <div className="filter-header">
              <h2>Featured Projects</h2>
              <div className="filter-buttons">
                <i className="fas fa-filter"></i>
                <button 
                  className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCurrentFilter('all')}
                >
                  All Projects
                </button>
                <button 
                  className={`filter-btn ${currentFilter === 'infrastructure' ? 'active' : ''}`}
                  onClick={() => setCurrentFilter('infrastructure')}
                >
                  Infrastructure
                </button>
                <button 
                  className={`filter-btn ${currentFilter === 'residential' ? 'active' : ''}`}
                  onClick={() => setCurrentFilter('residential')}
                >
                  Residential
                </button>
                <button 
                  className={`filter-btn ${currentFilter === 'commercial' ? 'active' : ''}`}
                  onClick={() => setCurrentFilter('commercial')}
                >
                  Commercial
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          <div className="container">
            <div className="grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className={`project-status ${project.status}`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-details">
                      <div className="project-detail">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{project.location}</span>
                      </div>
                      <div className="project-detail">
                        <i className="fas fa-calendar"></i>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    <div className="project-progress">
                      <div className="progress-header">
                        <span>Progress</span>
                        <span className="progress-percent">{project.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="testimonials-grid">
          <div className="container">
            <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Hear from the partners and communities we've had the privilege to serve throughout our journey.</p>
            </div>
            <div className="testimonials-container">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <div className="testimonial-header">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-info">
                      <h3>{testimonial.name}</h3>
                      <p className="testimonial-position">{testimonial.position}</p>
                      <p className="testimonial-company">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star star ${i >= testimonial.rating ? 'empty' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-project">
                    <span>Project:</span> {testimonial.project}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-content">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Head Office</h3>
                    <p>1234 Construction Blvd<br />Metro City, MC 12345<br />United States</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>info@terrabuild.com<br />projects@terrabuild.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <h2>Start Your Project</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input type="tel" id="phone" name="phone" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select id="projectType" name="projectType" required>
                      <option value="">Select Project Type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="renovation">Renovation</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tell us about your project requirements..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <i className="fas fa-paper-plane"></i>
                    Submit Project Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <i className="fas fa-hammer"></i>
                <span>Terra Build</span>
              </div>
              <p>
                Leading the future of construction and infrastructure development with innovative, 
                sustainable solutions that build stronger communities for generations to come.
              </p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Commercial Construction</a></li>
                <li><a href="#">Residential Development</a></li>
                <li><a href="#">Infrastructure Projects</a></li>
                <li><a href="#">Project Management</a></li>
                <li><a href="#">Consultation Services</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2024 Terra Build. All rights reserved.</p>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;