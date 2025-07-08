const { useState, useEffect } = React;

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const styles = {
    navContainer: {
      height: '60px',
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'space-between' : 'center',
      padding: '0 1rem',
    },
    menuIcon: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      position: 'absolute',
      right: '1rem',
    },
    navMenu: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      position: isMobile ? 'absolute' : 'static',
      top: '60px',
      left: 0,
      width: isMobile ? '100%' : 'auto',
      backgroundColor: '#fff',
      boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      height: isMobile ? 'auto' : '60px',
      justifyContent: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontWeight: 'bold',
      padding: isMobile ? '1rem' : '0 2.5rem',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    navSeparator: {
      display: isMobile ? 'none' : 'flex',
      color: '#999',
      fontWeight: 'normal',
      padding: '0 0.5rem',
      alignItems: 'center',
      height: '100%',
      fontSize: '1.2em',
    }
  };

  return (
    <nav style={styles.navContainer}>
      <button onClick={toggleMenu} style={styles.menuIcon} aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
        </svg>
      </button>

      <ul style={styles.navMenu}>
        <li style={styles.navItem}><a href="/" style={styles.navLink}>HOME</a></li>
        <li style={styles.navSeparator}>|</li>
        {/* <li style={styles.navItem}><a href="./abstracts.html" style={styles.navLink}>ABSTRACTS</a></li>
        <li style={styles.navSeparator}>|</li> */}
        {/*  <li style={styles.navItem}><a href="/panelists.html" style={styles.navLink}>PANELISTS</a></li>
        <li style={styles.navSeparator}>|</li> */}
        <li style={styles.navItem}><a href="/#invited-speakers" style={styles.navLink}>INVITED SPEAKERS</a></li>
        <li style={styles.navSeparator}>|</li>
        <li style={styles.navItem}><a href="/#history" style={styles.navLink}>HISTORY</a></li>
        <li style={styles.navSeparator}>|</li>
        {/* <li style={styles.navItem}><a href="gallery.html" style={styles.navLink}>GALLERY</a></li>
        <li style={styles.navSeparator}>|</li> */}
        <li style={styles.navItem}><a href="/#contact" style={styles.navLink}>CONTACT</a></li>
        <li style={styles.navSeparator}>|</li>
        <li style={styles.navItem}><a href="../committe.html" style={styles.navLink}>COMMITTEE</a></li>
      </ul>
    </nav>
  );
};

ReactDOM.render(<NavMenu />, document.getElementById('menu-container'));
