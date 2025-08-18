// Dentro do seu arquivo de componentes (ex: Card.js ou um novo ProjectChat.js)

const { useState, useEffect } = React;

const PostersChats = ({ projectId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Acesso direto ao `db` que foi inicializado no HTML
        const query = db.collection("chats").doc(projectId).collection("messages").orderBy("timestamp", "asc");

        const unsubscribe = query.onSnapshot((querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [projectId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        let currentUserName = userName;

        if (!currentUserName) {
            const name = prompt("Por favor, digite seu nome:");
            if (!name) return;
            currentUserName = name;
            setUserName(name);
            localStorage.setItem('chatUserName', name);
        }

        if (newMessage.trim() === "") return;

        // Acesso direto ao `db` e `firebase`
        await db.collection("chats").doc(projectId).collection("messages").add({
            text: newMessage,
            sender: currentUserName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Pega a data do servidor
        });

        setNewMessage("");
    };
    
    useEffect(() => {
        const savedName = localStorage.getItem('chatUserName');
        if (savedName) setUserName(savedName);
    }, []);

    // ... seu JSX para renderizar o chat
    return (
        <div className="chat-container">
        {/* ... */}
        </div>
    );
};