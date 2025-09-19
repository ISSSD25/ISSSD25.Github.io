const { useState, useEffect, useRef } = React;

// --- COMPONENTE DE CHAT ---
const PosterChat = ({ projectId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [authorName, setAuthorName] = useState("");
    const chatEndRef = useRef(null);

    // Efeito para rolar para a última mensagem
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Efeito para buscar e ouvir mensagens em tempo real
    useEffect(() => {
        if (!projectId) return;

        const unsubscribe = db.collection('poster-chats')
                              .doc(projectId)
                              .collection('messages')
                              .orderBy('timestamp')
                              .onSnapshot((querySnapshot) => {
                                  const msgs = [];
                                  querySnapshot.forEach((doc) => {
                                      msgs.push({ id: doc.id, ...doc.data() });
                                  });
                                  setMessages(msgs);
                              });

        // Limpeza: para de ouvir quando o componente é desmontado
        return () => unsubscribe();

    }, [projectId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "" || authorName.trim() === "") {
            alert("Por favor, preencha seu nome e a mensagem.");
            return;
        }

        db.collection('poster-chats').doc(projectId).collection('messages').add({
            name: authorName,
            message: newMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            setNewMessage(""); // Limpa o campo de mensagem após o envio
        }).catch((error) => {
            console.error("Erro ao enviar mensagem: ", error);
            alert("Não foi possível enviar a mensagem. Tente novamente.");
        });
    };

    // Estilos para o componente de chat
    const chatStyles = {
        container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f0f2f5' },
        title: { padding: '15px', margin: 0, color: '#333', backgroundColor: '#fff', borderBottom: '1px solid #ddd', fontSize: '1.1em', fontWeight: 'bold' },
        messagesArea: { flex: 1, overflowY: 'auto', padding: '15px' },
        messageBubble: { backgroundColor: '#fff', padding: '10px 15px', borderRadius: '18px', marginBottom: '10px', maxWidth: '80%', wordBreak: 'break-word', border: '1px solid #e5e5e5' },
        author: { fontWeight: 'bold', color: '#005d5b', marginBottom: '4px', fontSize: '0.9em' },
        messageText: { margin: 0, color: '#333' },
        form: { display: 'flex', flexDirection: 'column', padding: '15px', borderTop: '1px solid #ddd', backgroundColor: '#fff' },
        input: { border: '1px solid #ccc', borderRadius: '20px', padding: '10px 15px', marginBottom: '10px', fontSize: '1em' },
        button: { background: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }
    };

    return (
        <div style={chatStyles.container}>
            {/* TÍTULO ADICIONADO AQUI */}
            <h3 style={chatStyles.title}>Comentários e Perguntas</h3>

            <div style={chatStyles.messagesArea}>
                {messages.map(msg => (
                    <div key={msg.id} style={chatStyles.messageBubble}>
                        <p style={chatStyles.author}>{msg.name}</p>
                        <p style={chatStyles.messageText}>{msg.message}</p>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} style={chatStyles.form}>
                <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Seu nome"
                    style={chatStyles.input}
                />
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite aqui..."
                    rows="3"
                    style={{...chatStyles.input, resize: 'none'}}
                />
                <button type="submit" style={chatStyles.button}>Enviar</button>
            </form>
        </div>
    );
};


// --- FUNÇÕES DE RENDERIZAÇÃO REUTILIZÁVEIS (Existentes) ---
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
    const avatarImageStyle = { width: '100%', height: '100%', objectFit: 'cover' };

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
                            <img src={img} alt="Foto do Palestrante" loading="lazy" style={avatarImageStyle} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// --- MODAL COM VISUALIZADOR DE PDF E CHAT ---
const PdfViewerWithModal = (props) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                width: '95%', maxWidth: '1400px', height: '90vh', backgroundColor: 'white', borderRadius: '16px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
                 <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px',
                    backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef'
                }}>
                    <h2 style={{ margin: 0, color: '#212529', fontSize: '1.2rem' }}>{props.participant.project.title}</h2>
                    <button
                        onClick={props.closeModal}
                        style={{
                            background: 'transparent', border: 'none', width: '40px', height: '40px', borderRadius: '50%',
                            color: '#495057', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >&times;</button>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
                    <div style={{
                        flex: 2.5, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px'
                    }}>
                        <div style={{ width: '100%', padding: '10px 0', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <audio controls style={{ width: '100%', height: '40px' }}>
                                <source src={`${props.participant.project.audioUrl}`} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div style={{ flex: 1, backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '70vh', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                                <iframe src={`${props.participant.project.pdfUrl}`} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Viewer" />
                            </div>
                        </div>
                        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e9ecef' }}>
                            <h3 style={{ marginTop: 0, color: '#212529', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
                                Project Description
                            </h3>
                            <p style={{ color: '#495057', lineHeight: '1.6' }}>{props.participant.project.description}</p>
                        </div>
                    </div>

                    <div style={{ flex: 1, borderLeft: '1px solid #e9ecef', display: 'flex', flexDirection: 'column' }}>
                        <PosterChat projectId={props.participant.project.id} />
                    </div>
                </div>
            </div>
        </div>
    )
};


// --- CARD DE PARTICIPANTE (FINAL) ---
const Card = (props) => {
    const { participant, isWinner, marginTop, onOpenModal } = props;
    const cardClass = isWinner ? "winner-card-glass" : "non-winner-card-glass";
    const authorStyle = { fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 5px 0', color: isWinner ? 'rgba(255, 255, 255, 0.9)' : '#333' };
    const titleStyle = { margin: '0 0 10px 0', color: isWinner ? 'rgba(255, 255, 255, 0.9)' : '#444' };

    return (
        <div className="row" style={{ marginTop: marginTop, padding: 0 }}>
            <div className={cardClass} style={{ position: 'relative' }}>
                <div className="light-effect"></div>
                <div className="winner-content">
                    <div className="winner-avatar-container">
                        {renderImageGrid(participant.profileImg, isWinner)}
                    </div>
                    <div className="winner-info">
                        {isWinner ? (
                            <h2>
                                {participant.author.split('\n')[0]}
                                <span className="winner-tag">#1 Champion</span>
                            </h2>
                        ) : (
                           renderTextField(participant.author, authorStyle)
                        )}
                        {renderTextField(participant.project.title, titleStyle)}
                        <div className="winner-actions">
                            <div className="button-group">
                                <button className="modern-btn profile-btn" onClick={() => onOpenModal(participant)}>
                                    View Poster & Chat
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    const [modalParticipant, setModalParticipant] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`data/posters.json`);
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

    const handleOpenModal = (participant) => {
        setModalParticipant(participant);
    };
    const handleCloseModal = () => {
        setModalParticipant(null);
    };

    const currentItems = info[selectedList] || [];

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#ccc' }}>Carregando...</p>;
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {modalParticipant && (
                <PdfViewerWithModal closeModal={handleCloseModal} participant={modalParticipant} />
            )}
            <div style={{
                marginBottom: '2rem', marginTop: '9rem', display: 'flex', gap: '16px', justifyContent: 'center',
                flexWrap: 'wrap', padding: '16px',
            }}>
                {listKeys.map((key, index) => (
                    <button key={key} onClick={() => handleClick(index)} style={{
                        padding: '16px 28px',
                        background: index === currentListIndex ? 'linear-gradient(145deg, #6e45e2, #4a3bff)' : 'linear-gradient(145deg, #2a2a40, #1e1e30)',
                        color: index === currentListIndex ? '#fff' : '#a0a0c0',
                        border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '700',
                        transition: 'all 0.3s ease',
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
                                onOpenModal={handleOpenModal}
                            />
                        )
                )}
            </div>
        </div>
    );
};

// --- RENDERIZAÇÃO DO APP ---
ReactDOM.render(<BattleMap />, document.getElementById('map'));