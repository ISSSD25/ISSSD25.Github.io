const { useState, useEffect } = React;

// --- FUNÇÕES DE RENDERIZAÇÃO REUTILIZÁVEIS ---

/**
 * Renderiza um campo de texto que suporta múltiplas linhas via '\n'.
 * @param {string} text - O texto a ser exibido.
 * @param {object} style - Estilos CSS para aplicar a cada linha.
 * @param {string} className - Classe CSS para aplicar a cada linha.
 * @returns {JSX.Element|null}
 */
const renderTextField = (text, style, className = "winner-title") => {
    if (!text) return null;
    
    const lines = text.split('\n');
    
    return (
        <div>
            {lines.map((line, index) => (
                <p key={index} className={className} style={style}>
                    {line}
                </p>
            ))}
        </div>
    );
};

/**
 * Renderiza imagens de perfil em uma grade (máximo de 2 por linha).
 * @param {string|string[]} profileImg - URL ou array de URLs de imagens.
 * @param {boolean} isWinner - Define o estilo da borda.
 * @returns {JSX.Element|null}
 */
const renderImageGrid = (profileImg, isWinner = false) => {
    if (!profileImg) return null;

    const images = Array.isArray(profileImg) ? profileImg : [profileImg];
    const imageRows = [];
    const avatarWrapperStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: isWinner ? '3px solid rgba(255, 215, 0, 0.7)' : '3px solid #ccc',
        position: 'relative',
        flexShrink: 0,
        backgroundColor: '#f0f0f0'
    };
    const avatarImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    for (let i = 0; i < images.length; i += 2) {
        imageRows.push(images.slice(i, i + 2));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {imageRows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {row.map((img, imgIndex) => (
                        <div key={imgIndex} style={avatarWrapperStyle}>
                            <div className="avatar-glow"></div>
                            <img src={img} alt="Foto do Palestrante" style={avatarImageStyle} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};


// --- COMPONENTE MODAL DE RESUMO ---
const ResumeModal = (props) => {
    const { closeModal, participant } = props;
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);

    const updateMedia = () => setDesktop(window.innerWidth >= 768);

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', updateMedia);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    const modalOverlayStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', animation: 'fadeIn 0.3s ease-out'
    };

    const modalContentStyle = {
        backgroundColor: 'white', borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%', maxWidth: '1024px', maxHeight: '90vh',
        display: 'flex', overflow: 'hidden',
        flexDirection: isDesktop ? 'row' : 'column',
        transform: 'scale(0.95)', animation: 'scaleIn 0.3s ease-out forwards'
    };
    
    const renderSocialIcons = () => {
        if (!participant.socialMedia) return null;
        
        return Object.entries(participant.socialMedia).map(([key, value]) => {
            if (!value) return null;
            return (
                 <a href={value} key={key} target="_blank" rel="noopener noreferrer" style={{
                    color: '#4b5563', textDecoration: 'none', padding: '8px 12px',
                    borderRadius: '6px', backgroundColor: '#f3f4f6', textTransform: 'capitalize',
                    fontWeight: '500', transition: 'background-color 0.2s'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}>
                    {key}
                 </a>
            );
        });
    };

    return (
        <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb', flexShrink: 0 }}>
                    {renderImageGrid(participant.profileImg, participant.isWinner)}
                </div>

                <div style={{ padding: '2rem', flexGrow: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>{renderTextField(participant.author, { fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', lineHeight: '1.2', margin: 0 }, '')}</div>
                        <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '2rem', color: '#6b7280', cursor: 'pointer', padding: '0', lineHeight: '1' }}>&times;</button>
                    </div>

                    <div style={{ color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Title</h3>
                            {renderTextField(participant.project.title, { margin: 0, textAlign: 'justify', color: '#444' }, '')}
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Resume</h3>
                            <p style={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>{participant.project.description || "Nenhuma descrição disponível."}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Date</h3>
                            <p style={{ textAlign: 'justify' }}>{participant.presentation.data || "Nenhuma data disponível."}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Time</h3>
                            <p style={{ textAlign: 'justify' }}>{participant.presentation.hora || "Nenhum horário disponível."}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Language</h3>
                            <p style={{ textAlign: 'justify' }}>{participant.presentation.idioma || "Nenhum idioma disponível."}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Where</h3>
                            <p style={{ textAlign: 'justify' }}>{participant.presentation.local || "Nenhum local disponível."}</p>
                        </div>
                         {participant.socialMedia && (
                             <div>
                                <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Social Media</h3>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                    {renderSocialIcons()}
                                </div>
                            </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- CARD DE PARTICIPANTE (FINAL) ---
const Card = (props) => {
    const { participant, isWinner } = props;
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const openResumeModal = () => setIsResumeModalOpen(true);
    const closeResumeModal = () => setIsResumeModalOpen(false);

    const cardClass = isWinner ? "winner-card-glass" : "non-winner-card-glass";
    
    const authorStyle = {
        fontWeight: 'bold', 
        fontSize: '1.1rem', 
        margin: '0 0 5px 0',
        color: isWinner ? 'rgba(255, 255, 255, 0.9)' : '#333' // Cor dinâmica para o autor
    };

    const titleStyle = {
        margin: '0 0 10px 0',
        color: isWinner ? 'rgba(255, 255, 255, 0.9)' : '#444' // Cor dinâmica para o título
    };

    return (
        <div className="row" style={{ marginTop: props.marginTop, padding: 0 }}>
            <div className={cardClass} style={{ position: 'relative' }}>
                <div className="light-effect"></div>
                <div className="winner-content">
                    
                    <div className="winner-avatar-container">
                        {renderImageGrid(participant.profileImg, isWinner)}
                    </div>

                    <div className="winner-info">
                        {isWinner ? (
                            <h2>
                                {participant.author.split('\\n')[0]}
                                <span className="winner-tag">#1 Champion</span>
                            </h2>
                        ) : (
                           renderTextField(participant.author, authorStyle)
                        )}
                        
                        {renderTextField(participant.project.title, titleStyle)}

                        <div className="winner-actions">
                            <div className="button-group">
                                <button className="modern-btn profile-btn" onClick={openResumeModal}>
                                    View Full Resume
                                    <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isResumeModalOpen && <ResumeModal closeModal={closeResumeModal} participant={participant} />}
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
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
                marginBottom: '2rem', marginTop: '9rem', display: 'flex', gap: '16px',
                justifyContent: 'center', flexWrap: 'wrap', padding: '16px',
            }}>
                {listKeys.map((key, index) => (
                    <button key={key} onClick={() => handleClick(index)} style={{
                        padding: '16px 28px',
                        background: index === currentListIndex ? 'linear-gradient(145deg, #6e45e2, #4a3bff)' : 'linear-gradient(145deg, #2a2a40, #1e1e30)',
                        color: index === currentListIndex ? '#fff' : '#a0a0c0',
                        border: 'none', borderRadius: '12px', cursor: 'pointer',
                        fontSize: '16px', fontWeight: '700', transition: 'all 0.3s ease',
                    }}>
                        {key}
                    </button>
                ))}
            </div>
            <div style={{ padding: '20px' }}>
                {currentItems.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: '#ccc' }}>Nenhum participante encontrado.</p>
                ) : (
                    [...currentItems]
                        .sort((a, b) => (b.isWinner === a.isWinner ? 0 : b.isWinner ? 1 : -1))
                        .map((item, index) =>
                            <Card 
                                key={`${selectedList}-${index}`} 
                                participant={item} 
                                isWinner={item.isWinner}
                                marginTop={index === 0 ? '2rem' : '1rem'} 
                            />
                        )
                )}
            </div>
        </div>
    );
};

// --- RENDERIZAÇÃO DO APP ---
ReactDOM.render(<BattleMap />, document.getElementById('map'));