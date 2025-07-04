const { useState, useEffect } = React;

const PdfViewerWithModal = (props) => {
    return (
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
                width: '90%',
                maxWidth: '1300px',
                height: '90%',
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                }}>
                    <button
                        onClick={props.closeModal}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            color: '#495057',
                            fontSize: '24px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        &times;
                    </button>
                </div>

                {/* Área do Conteúdo do Projeto */}
                <div style={{
                    flex: 1,
                    padding: '20px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Cabeçalho do Projeto */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '10px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={props.participant.profileImg}
                                alt="Winner"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: '#212529' }}>{props.participant.author}</h2>
                            <p style={{ margin: '5px 0 0', color: '#495057' }}>
                                {props.participant.project.title}
                            </p>
                        </div>
                    </div>

                    {/* Barra de Áudio - Ocupando 100% da largura */}
                    <div style={{
                        width: '100%',
                        padding: '10px 0',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <audio
                            controls
                            style={{
                                width: '100%',
                                height: '40px'
                            }}
                        >
                            <source src={`${props.participant.project.audioUrl}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>

                    {/* Área do PDF */}
                    <div style={{
                        flex: 1,
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '60rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <iframe
                                src={`${props.participant.project.pdfUrl}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                title="PDF Viewer"
                            />
                        </div>
                    </div>

                    {/* Área de Descrição */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        border: '1px solid #e9ecef'
                    }}>
                        <h3 style={{
                            marginTop: 0,
                            color: '#212529',
                            borderBottom: '1px solid #e9ecef',
                            paddingBottom: '10px'
                        }}>
                            Project Description
                        </h3>
                        <p style={{ color: '#495057', lineHeight: '1.6' }}>
                            {props.participant.project.description}
                        </p>
                    </div>
                </div>

                {/* Rodapé do Modal */}
                <div style={{
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #e9ecef',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={props.closeModal}
                        style={{
                            background: '#4263eb',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#364fc7'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#4263eb'}
                    >
                        Close Project
                    </button>
                </div>
            </div>
        </div>
    )
};

const NonWinnerCard = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="row" style={{ marginTop: props.marginTop, padding: 0 }}>
            <div className="non-winner-card-glass" style={{ position: 'relative' }}>
                {/* Efeito de luz */}
                <div className="light-effect"></div>

                <div className="winner-content">
                    <div className="winner-avatar">
                        <div className="avatar-glow"></div>
                        <img
                            src={props.participant.profileImg}
                        />
                    </div>

                    <div className="winner-info">

                        <p className="winner-title">
                            {props.participant.project.title}
                        </p>

                        <div className="winner-actions">
                            <div className="social-icons">
                                {
                                    props.participant.socialMedia.linkedin && (
                                        <a
                                            href={`${props.participant.socialMedia.linkedin}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <svg viewBox="0 0 24 24">
                                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                            </svg>
                                        </a>
                                    )
                                }
                                {
                                    props.participant.socialMedia.instagram && (
                                        <a
                                            href={`${props.participant.socialMedia.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <svg viewBox="0 0 24 24">
                                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
                                            </svg>
                                        </a>)
                                }
                                {
                                    props.participant.socialMedia.website && (
                                        <a
                                            href={`${props.participant.socialMedia.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <svg viewBox="0 0 24 24">
                                                <path d="M11.15 3a7.69 7.69 0 0 0-2.74.5 6.12 6.12 0 0 0-2.4 1.44Q4.67 5.85 4 7a7.33 7.33 0 0 0-.69 3.13v.24a7.54 7.54 0 0 0 .45 2.6 6.3 6.3 0 0 0 1.18 2A5.78 5.78 0 0 0 6.4 16a5.88 5.88 0 0 0 2 .87 8 8 0 0 0 2.75.16 6.55 6.55 0 0 0 2.26-.69 5.46 5.46 0 0 0 1.8-1.44 6.48 6.48 0 0 0 1.11-2.12 7.46 7.46 0 0 0 .4-2.43V10a7.63 7.63 0 0 0-.5-2.71 5.93 5.93 0 0 0-1.45-2.1 6.2 6.2 0 0 0-2.35-1.35A8.18 8.18 0 0 0 11.15 3zm0 1.44a6.08 6.08 0 0 1 2.35.47 5.19 5.19 0 0 1 1.9 1.3 5.63 5.63 0 0 1 1.16 2 6.89 6.89 0 0 1 .4 2.38v.24a6.21 6.21 0 0 1-.35 2.16 5.28 5.28 0 0 1-.94 1.72 4.73 4.73 0 0 1-1.5 1.18 5.63 5.63 0 0 1-1.94.61 6.79 6.79 0 0 1-2.31-.13 5 5 0 0 1-1.8-.73 4.86 4.86 0 0 1-1.26-1.3 5.3 5.3 0 0 1-.8-1.77 6.73 6.73 0 0 1-.27-2v-.24a6.06 6.06 0 0 1 .6-2.53 4.82 4.82 0 0 1 1.56-1.77 5.77 5.77 0 0 1 2.3-.8 7.46 7.46 0 0 1 1.15-.08zM8 8v8h1.5v-3.25h2.5a2.5 2.5 0 0 0 0-5H8zm1.5 1.5h2a1 1 0 0 1 0 2h-2z" />
                                            </svg>
                                        </a>
                                    )}
                            </div>

                            <div className="button-group">
                                {/* <button className="modern-btn profile-btn" onClick={openModal}>
                                    View Project
                                    <svg viewBox="0 0 24 24">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                    </svg>
                                </button> */}

                                <button className="modern-btn profile-btn" onClick={openModal}>
                                    View Full Resume
                                    <svg viewBox="0 0 24 24">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && <PdfViewerWithModal closeModal={closeModal} participant={props.participant} />}
        </div>
    );
};

// const WinnerCard = (props) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     return (
//         <div
//             className="row"
//             style={{ marginTop: props.marginTop, padding: 0 }}
//         >
//             <div className="winner-card-glass" style={{ position: 'relative' }}>
//                 <div className="light-effect"></div>

//                 <div className="winner-content">
//                     <div className="winner-avatar">
//                         <div className="avatar-glow"></div>
//                         <img
//                             src={props.participant.profileImg}
//                             alt="Winner"
//                         />
//                     </div>

//                     <div className="winner-info">
//                         <h2>
//                             {props.participant.author}
//                             <span className="winner-tag">#1 Champion</span>
//                         </h2>

//                         <p className="winner-title">
//                             {props.participant.project.title}
//                         </p>

//                         <div className="winner-actions">
//                             <div className="social-icons">
//                                 {props.participant.socialMedia.linkedin && (
//                                     <a
//                                         href={`${props.participant.socialMedia.linkedin}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="social-icon"
//                                     >
//                                         <svg viewBox="0 0 24 24">
//                                             <path
//                                                 d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
//                                         </svg>
//                                     </a>
//                                 )}
//                                 {props.participant.socialMedia.instagram && (
//                                     <a
//                                         href={`${props.participant.socialMedia.instagram}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="social-icon"
//                                     >
//                                         <svg viewBox="0 0 24 24">
//                                             <path
//                                                 d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
//                                         </svg>
//                                     </a>
//                                 )}
//                                 {props.participant.socialMedia.website && (
//                                     <a
//                                         href={`${props.participant.socialMedia.website}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="social-icon"
//                                     >
//                                         <svg viewBox="0 0 24 24">
//                                             <path
//                                                 d="M11.15 3a7.69 7.69 0 0 0-2.74.5 6.12 6.12 0 0 0-2.4 1.44Q4.67 5.85 4 7a7.33 7.33 0 0 0-.69 3.13v.24a7.54 7.54 0 0 0 .45 2.6 6.3 6.3 0 0 0 1.18 2A5.78 5.78 0 0 0 6.4 16a5.88 5.88 0 0 0 2 .87 8 8 0 0 0 2.75.16 6.55 6.55 0 0 0 2.26-.69 5.46 5.46 0 0 0 1.8-1.44 6.48 6.48 0 0 0 1.11-2.12 7.46 7.46 0 0 0 .4-2.43V10a7.63 7.63 0 0 0-.5-2.71 5.93 5.93 0 0 0-1.45-2.1 6.2 6.2 0 0 0-2.35-1.35A8.18 8.18 0 0 0 11.15 3zm0 1.44a6.08 6.08 0 0 1 2.35.47 5.19 5.19 0 0 1 1.9 1.3 5.63 5.63 0 0 1 1.16 2 6.89 6.89 0 0 1 .4 2.38v.24a6.21 6.21 0 0 1-.35 2.16 5.28 5.28 0 0 1-.94 1.72 4.73 4.73 0 0 1-1.5 1.18 5.63 5.63 0 0 1-1.94.61 6.79 6.79 0 0 1-2.31-.13 5 5 0 0 1-1.8-.73 4.86 4.86 0 0 1-1.26-1.3 5.3 5.3 0 0 1-.8-1.77 6.73 6.73 0 0 1-.27-2v-.24a6.06 6.06 0 0 1 .6-2.53 4.82 4.82 0 0 1 1.56-1.77 5.77 5.77 0 0 1 2.3-.8 7.46 7.46 0 0 1 1.15-.08zM8 8v8h1.5v-3.25h2.5a2.5 2.5 0 0 0 0-5H8zm1.5 1.5h2a1 1 0 0 1 0 2h-2z" />
//                                         </svg>
//                                     </a>
//                                 )}
//                             </div>

//                             <div className="button-group">
//                                 {/* <button className="modern-btn profile-btn" onClick={openModal}>
//                                     View Project
//                                     <svg viewBox="0 0 24 24">
//                                         <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
//                                     </svg>
//                                 </button> */}

//                                 <button className="modern-btn profile-btn">
//                                     View Full Profile
//                                     <svg viewBox="0 0 24 24">
//                                         <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             {isModalOpen && <PdfViewerWithModal closeModal={closeModal} participant={props.participant} />}
//         </div>
//     );
// }

const BattleMap = () => {
    const [info, setInfo] = useState({});
    const [listKeys, setListKeys] = useState([]);
    const [currentListIndex, setCurrentListIndex] = useState(0);
    const [selectedList, setSelectedList] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`./data/panelists.json`);
                const data = await response.json();
                setInfo(data);

                const keys = Object.keys(data);
                setListKeys(keys);
                setSelectedList(keys[0] || '');
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = (index) => {
        setCurrentListIndex(index);
        setSelectedList(listKeys[index]);
    };

    const currentItems = info[selectedList] || [];

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#ccc' }}>Carregando...</p>;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
                marginBottom: '2rem',
                marginTop: '9rem',
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                padding: '16px',
            }}>
                {listKeys.map((key, index) => (
                    <button
                        key={key}
                        onClick={() => handleClick(index)}
                        style={{
                            padding: '16px 28px',
                            background: index === currentListIndex
                                ? 'linear-gradient(145deg, #6e45e2, #4a3bff)'
                                : 'linear-gradient(145deg, #2a2a40, #1e1e30)',
                            color: index === currentListIndex ? '#fff' : '#a0a0c0',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '700',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {key}
                    </button>
                ))}
            </div>

            <div style={{ padding: '20px' }}>
                {currentItems.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: '#ccc' }}>
                        Nenhum participante encontrado.
                    </p>
                ) : (
                    [...currentItems]
                        .sort((a, b) => (b.isWinner === a.isWinner ? 0 : b.isWinner ? 1 : -1))
                        .map((item, index) =>
                            item.isWinner
                                ? <WinnerCard key={`${selectedList}-${index}`} participant={item} marginTop={index === 0 ? '2rem' : '1rem'} />
                                : <NonWinnerCard key={`${selectedList}-${index}`} participant={item} marginTop={index === 0 ? '2rem' : '1rem'} />
                        )
                )}
            </div>
        </div>
    );
};
ReactDOM.render(<BattleMap />, document.getElementById('map'));