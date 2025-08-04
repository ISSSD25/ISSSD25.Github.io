const { useState, useEffect } = React;

const PdfViewerWithModal = ({ height = '50rem' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpen]);

    return (
        <div style={{ maxWidth: '100%', position: 'relative' }}>
                    
            <div
                className="pdf-thumbnail-card"
                onClick={openModal}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                    cursor: 'pointer',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isHovering 
                    ? '0 12px 28px rgba(0,0,0,0.2)' 
                    : '0 8px 24px rgba(0,0,0,0.12)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    maxWidth: '100%',
                    height: height,
                    aspectRatio: '4/3',
                    transform: isHovering ? 'translateY(-6px)' : 'none'
                }}
            >

            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <img 
                src="./img/schedule_preview.webp" 
                alt="Visualizar documento" 
                style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    transform: isHovering ? 'scale(1.05)' : 'scale(1)'
                }}
                />
                
                <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isHovering
                    ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s ease',
                padding: '24px',
                textAlign: 'center'
                }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: isHovering ? 'scale(1.2)' : 'scale(1)'
                    }}
                    >
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <div style={{
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <span style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    transform: isHovering ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isHovering ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                    Click to view
                    </span>
                    
                    <span style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem',
                    fontWeight: '400',
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    transform: isHovering ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isHovering ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s'
                    }}>
                    Full document in high quality
                    </span>
                </div>
                
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg,rgb(103, 60, 231), #3498db)',
                    transform: isHovering ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
                }}></div>
                </div>
            </div>
            </div>
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: '16px',
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            zIndex: 10
                        }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    color: 'white',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            >
                                &times;
                            </button>
                        </div>

                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '40px'
                        }}>
                            <img
                                src="./img/schedule.webp"
                                alt="PDF Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    cursor: 'zoom-out'
                                }}
                                onClick={closeModal}
                            />
                        </div>

                        <div style={{
                            position: 'fixed',
                            bottom: '20px',
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            zIndex: 10
                        }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    color: '#333',
                                    border: 'none',
                                    padding: '12px 32px',
                                    borderRadius: '50px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                body.modal-open {
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

const App = () => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <PdfViewerWithModal />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('schedule'));