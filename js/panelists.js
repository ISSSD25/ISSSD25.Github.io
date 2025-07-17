const { useState, useEffect } = React;

// --- NOVO MODAL DE RESUMO (CORRIGIDO E MELHORADO) ---
const ResumeModal = (props) => {
    const { closeModal, participant } = props;
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);

    // Efeito para atualizar o layout com base no tamanho da tela
    const updateMedia = () => {
        setDesktop(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', updateMedia);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    // Estilos base
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
        flexDirection: isDesktop ? 'row' : 'column', // Layout dinâmico
        transform: 'scale(0.95)', animation: 'scaleIn 0.3s ease-out forwards'
    };

    const imageContainerStyle = {
        flexShrink: 0,
        width: isDesktop ? '40%' : '100%', // Largura dinâmica
        height: isDesktop ? 'auto' : '200px', // Altura dinâmica
    };
    
    // Função para renderizar os ícones de redes sociais
    const renderSocialIcons = () => {
        if (!participant.socialMedia) return null;
        
        return Object.entries(participant.socialMedia).map(([key, value]) => {
            if (!value) return null;
            return (
                 <a href={value} key={key} target="_blank" rel="noopener noreferrer" style={{
                    color: '#4b5563',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#f3f4f6',
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                 >
                    {key}
                 </a>
            );
        });
    };

    return (
        <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                {/* Imagem do Palestrante */}
                <div style={imageContainerStyle}>
                    <img
                        src={participant.profileImg || 'https://placehold.co/400x600/cccccc/ffffff?text=Imagem'}
                        alt={`Foto de ${participant.author}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                {/* Informações */}
                <div style={{ padding: '2rem', flexGrow: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', lineHeight: '1.2' }}>
                            {participant.author}
                        </h2>
                        <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '2rem', color: '#6b7280', cursor: 'pointer', padding: '0', lineHeight: '1' }}>
                            &times;
                        </button>
                    </div>

                    <div style={{ color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Title</h3>
                            <p>{participant.project.title || "Não informado."}</p>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Resume</h3>
                            <p style={{ textAlign: 'justify' }}>{participant.project.description || "Nenhuma descrição disponível."}</p>
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
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#3b82f6', marginBottom: '0.5rem' }}>Lenguage</h3>
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


// --- MODAL DE PDF (JÁ EXISTENTE) ---
const PdfViewerWithModal = (props) => {
    // ... (código original do PdfViewerWithModal sem alterações)
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                width: '90%', maxWidth: '1300px', height: '90%', backgroundColor: 'white', borderRadius: '16px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                    <button onClick={props.closeModal} style={{
                        background: 'transparent', border: 'none', width: '40px', height: '40px', borderRadius: '50%',
                        color: '#495057', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        &times;
                    </button>
                </div>
                <div style={{ flex: 1, padding: '20px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src={props.participant.profileImg} alt="Winner" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: '#212529' }}>{props.participant.author}</h2>
                            <p style={{ margin: '5px 0 0', color: '#495057' }}>{props.participant.project.title}</p>
                        </div>
                    </div>
                    {props.participant.project.audioUrl &&
                        <div style={{ width: '100%', padding: '10px 0', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <audio controls style={{ width: '100%', height: '40px' }}>
                                <source src={`${props.participant.project.audioUrl}`} type="audio/mpeg" />
                                Seu navegador não suporta o elemento de áudio.
                            </audio>
                        </div>
                    }
                    {props.participant.project.pdfUrl &&
                        <div style={{ flex: 1, backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '60rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                                <iframe src={`${props.participant.project.pdfUrl}`} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Viewer" />
                            </div>
                        </div>
                    }
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e9ecef' }}>
                        <h3 style={{ marginTop: 0, color: '#212529', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>Descrição do Projeto</h3>
                        <p style={{ color: '#495057', lineHeight: '1.6' }}>{props.participant.project.description}</p>
                    </div>
                </div>
                <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #e9ecef', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={props.closeModal} style={{
                        background: '#4263eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px',
                        cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#364fc7'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#4263eb'}>
                        Fechar Projeto
                    </button>
                </div>
            </div>
        </div>
    )
};


// --- CARD DE PARTICIPANTE (ATUALIZADO) ---
const Card = (props) => {
    const { participant, isWinner } = props;
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const openProjectModal = () => setIsProjectModalOpen(true);
    const closeProjectModal = () => setIsProjectModalOpen(false);

    const openResumeModal = () => setIsResumeModalOpen(true);
    const closeResumeModal = () => setIsResumeModalOpen(false);
    
    const cardClass = isWinner ? "winner-card-glass" : "non-winner-card-glass";

    return (
        <div className="row" style={{ marginTop: props.marginTop, padding: 0 }}>
            <div className={cardClass} style={{ position: 'relative' }}>
                <div className="light-effect"></div>
                <div className="winner-content">
                    <div className="winner-avatar">
                        <div className="avatar-glow"></div>
                        <img src={participant.profileImg} alt={`Foto de ${participant.author}`}/>
                    </div>
                    <div className="winner-info">
                        {isWinner ? (
                            <h2>
                                {participant.author}
                                <span className="winner-tag">#1 Champion</span>
                            </h2>
                        ) : (
                            <p className="winner-title" style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{participant.author}</p>
                        )}
                        <p className="winner-title">{participant.project.title}</p>
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


// --- COMPONENTE PRINCIPAL (sem alterações) ---
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
