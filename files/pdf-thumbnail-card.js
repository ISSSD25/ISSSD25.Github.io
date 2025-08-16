const { useState, useEffect } = React;

const PdfViewerWithModal = ({ height = '50rem' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    }, [isModalOpen]);

    // Zoom com rodinha do mouse
    const handleWheel = (e) => {
        e.preventDefault();
        zoomImage(e.deltaY < 0 ? 0.2 : -0.2);
    };

    // Função central para alterar zoom
    const zoomImage = (delta) => {
        setZoom((prev) => {
            let newZoom = prev + delta;
            return Math.min(Math.max(newZoom, 1), 5); // limite entre 1x e 5x
        });
    };

    // Início do arraste
    const handleMouseDown = (e) => {
        if (zoom > 1) {
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    // Arrastando
    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y,
            });
        }
    };

    // Fim do arraste
    const handleMouseUp = () => setIsDragging(false);

    return (
        <div style={{ maxWidth: "100%", position: "relative" }}>
            {/* Thumbnail */}
            <div
                onClick={openModal}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                    cursor: "pointer",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: isHovering
                        ? "0 12px 28px rgba(0,0,0,0.2)"
                        : "0 8px 24px rgba(0,0,0,0.12)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    height: height,
                    aspectRatio: "4/3",
                    transform: isHovering ? "translateY(-6px)" : "none",
                }}
            >
                <img
                    src="./img/schedule_preview.webp"
                    alt="Visualizar documento"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        transform: isHovering ? "scale(1.05)" : "scale(1)",
                    }}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(8px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                        
                        {/* Botão fechar */}
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "16px",
                            position: "fixed",
                            top: 0,
                            right: 0,
                            zIndex: 10
                        }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: "rgba(255,255,255,0.2)",
                                    border: "none",
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    color: "white",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Imagem */}
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                            onWheel={handleWheel}
                        >
                            <img
                                src="./img/schedule.webp"
                                alt="PDF Preview"
                                style={{
                                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                    transformOrigin: "center center",
                                    transition: isDragging ? "none" : "transform 0.2s ease",
                                    cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    userSelect: "none",
                                }}
                                onMouseDown={handleMouseDown}
                                draggable={false}
                            />
                        </div>

                        {/* Botões de Zoom */}
                        <div
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                gap: "12px",
                                zIndex: 20,
                            }}
                        >
                            <button
                                onClick={() => zoomImage(-0.2)}
                                style={{
                                    background: "rgba(255,255,255,0.9)",
                                    border: "none",
                                    padding: "12px 18px",
                                    borderRadius: "50%",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                −
                            </button>
                            <button
                                onClick={() => zoomImage(0.2)}
                                style={{
                                    background: "rgba(255,255,255,0.9)",
                                    border: "none",
                                    padding: "12px 18px",
                                    borderRadius: "50%",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const App = () => (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <PdfViewerWithModal />
    </div>
);

ReactDOM.render(<App />, document.getElementById("schedule"));
