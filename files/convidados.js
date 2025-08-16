const { useState, useEffect } = React;

const Convidados = () => {
  const [convidados, setConvidados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [convidadoSelecionado, setConvidadoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar dados dos convidados
  useEffect(() => {
    const carregarConvidados = async () => {
      try {
        const resposta = await fetch('./data/data.json');
        if (!resposta.ok) {
          throw new Error('Falha ao carregar dados');
        }
        const dados = await resposta.json();
        setConvidados(dados);
      } catch (erro) {
        console.error('Erro ao carregar convidados:', erro);
        // Você pode definir um estado de erro aqui se quiser mostrar uma mensagem ao usuário
      } finally {
        setCarregando(false);
      }
    };

    carregarConvidados();
  }, []);

  // Funções do modal
  const abrirModal = (convidado) => {
    setConvidadoSelecionado(convidado);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  if (carregando) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        Carregando convidados...
      </div>
    );
  }

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Grid de convidados */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '30px',
        justifyItems: 'center',
        alignItems: 'start'
      }}>
        {convidados.map(convidado => (
          <div
            key={convidado.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '220px',
              transition: 'transform 0.3s',
              ':hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => abrirModal(convidado)}
          >
            {/* Container circular para o avatar */}
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '5px solid #f0f0f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f8f8f8'
            }}>
              <img
                src={convidado.avatar}
                alt={convidado.nome}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Nome do convidado */}
            <span style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '16px',
              color: '#333',
              wordBreak: 'break-word',
              lineHeight: '1.4'
            }}>
              {convidado.nome}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAberto && convidadoSelecionado && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={fecharModal}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '700px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={fecharModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                ':hover': {
                  color: '#333'
                }
              }}
            >
              ×
            </button>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '10px'
            }}>
              {/* Avatar no modal */}
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '25px',
                border: '6px solid #f5f5f5',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img
                  src={convidadoSelecionado.avatar}
                  alt={convidadoSelecionado.nome}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <h3 style={{
                margin: '0 0 15px 0',
                fontSize: '22px',
                color: '#222',
                lineHeight: '1.3'
              }}>
                {convidadoSelecionado.nome}
              </h3>

              {/* Ícones de LinkedIn e Lattes */}
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px'
              }}>
                {convidadoSelecionado.linkedin && (
                  <a
                    href={convidadoSelecionado.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0077b5',
                      fontSize: '30px',
                      transition: 'transform 0.3s',
                      ':hover': {
                        transform: 'scale(1.1)',
                        color: '#005582'
                      }
                    }}
                    title="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="38" height="38" focusable="false">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </a>
                )}

                {convidadoSelecionado.lattes && (
                  <a
                    href={convidadoSelecionado.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#006341',
                      fontSize: '30px',
                      transition: 'transform 0.3s',
                      ':hover': {
                        transform: 'scale(1.1)',
                        color: '#004a30'
                      }
                    }}
                    title="Currículo Lattes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: '-4px' }}>
                      <path d="M0 5C0 2.23858 2.23858 0 5 0H27C29.7614 0 32 2.23858 32 5V27C32 29.7614 29.7614 32 27 32H5C2.23858 32 0 29.7614 0 27V5Z" fill="#005195" />
                      <path d="M11.2933 22.658C9.56414 19.1322 8.53535 17.0029 8.53535 16.95C8.53535 16.8638 8.64102 16.8758 9.67994 17.0785C11.5072 17.4355 12.4834 17.5362 14.1108 17.5368C16.2638 17.5374 18.0171 17.1981 19.3793 16.5162C20.1 16.1555 20.5334 15.8356 20.8883 15.4025C21.3255 14.8685 21.466 14.5008 21.471 13.8819C21.4754 13.2933 21.3957 12.9829 21.0534 12.2626C20.918 11.978 20.799 11.6513 20.7877 11.5366C20.77 11.3521 20.7851 11.3257 20.9218 11.31C21.2205 11.2748 22.6946 12.6989 23.2375 13.547C24.1733 15.0095 24.2492 16.5917 23.4571 18.1217C22.9705 19.0617 22.4328 19.712 21.5324 20.4512C20.036 21.6789 18.2967 22.5339 15.895 23.2227C14.6049 23.5929 12.5189 24.0418 12.0893 24.0418C11.9982 24.0418 11.8273 23.7447 11.2946 22.6574L11.2933 22.6579L11.2933 22.658ZM11.7748 16.972C10.095 16.7554 8.68535 16.5671 8.6417 16.5533C8.56707 16.5294 8.30007 15.6429 8.14947 14.9214C8.11152 14.7388 8.05583 14.2553 8.02547 13.8461C7.89 12.0202 8.28926 10.7578 9.35914 9.62265C11.1706 7.70238 15.0491 7.46876 19.4248 9.01633C20.1929 9.28831 20.4979 9.4772 20.3568 9.59491C20.2525 9.68179 19.5451 9.68053 18.3227 9.5911C16.4119 9.45134 14.9574 9.71577 14.2076 10.3403C13.0662 11.291 13.2402 13.375 14.7125 16.3813C14.872 16.7068 15.0327 17.0254 15.0694 17.0903C15.1549 17.2395 15.0928 17.378 14.9441 17.3711C14.8808 17.368 13.4546 17.1887 11.7748 16.972V16.972ZM17.4103 15.3363C16.0696 15.0965 14.8643 14.2692 14.4752 13.3229C14.2885 12.8683 14.2974 12.2752 14.4966 11.9202C14.677 11.5991 15.1426 11.2276 15.5596 11.0721C16.2537 10.8133 17.4691 10.9166 18.3549 11.3101C19.1957 11.6835 19.9411 12.3401 20.2182 12.9509C20.5738 13.7347 20.2776 14.6092 19.5159 15.0267C19.0109 15.303 18.0296 15.4472 17.4096 15.3364H17.4103L17.4103 15.3363Z" fill="white" />
                    </svg>
                  </a>
                )}

                {convidadoSelecionado.uam && (
                  <a
                    href={convidadoSelecionado.uam}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#000', // preto, como no logo
                      fontSize: '30px',
                      transition: 'transform 0.3s',
                      ':hover': {
                        transform: 'scale(1.1)',
                        color: '#444'
                      }
                    }}
                    title="UAM"
                  >
                    {/* Novo SVG da UAM com base na imagem */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="40" viewBox="0 0 300 148" version="1.1">
                      <path d="M 30.299 72.754 C 16.439 103.964, 4.800 130.297, 4.434 131.272 C 3.810 132.935, 4.970 133.026, 23.450 132.772 L 43.131 132.500 58.815 97.133 C 67.442 77.681, 74.873 61.706, 75.328 61.633 C 75.784 61.560, 77.404 64.425, 78.928 68 L 81.699 74.500 68.849 103.495 C 61.782 119.442, 56 132.604, 56 132.745 C 56 132.885, 64.771 133, 75.490 133 L 94.980 133 97.927 126.500 C 99.548 122.925, 101.125 120, 101.432 120 C 101.739 120, 102.946 122.035, 104.115 124.522 C 108.272 133.364, 106.428 133, 147.058 133 L 182.847 133 185.743 130.563 C 187.336 129.222, 189.464 126.297, 190.472 124.063 C 191.479 121.828, 192.585 120, 192.929 120 C 193.273 120, 194.829 122.925, 196.387 126.500 L 199.218 133 218.609 133 C 229.274 133, 238 132.779, 238 132.509 C 238 132.239, 232.375 119.356, 225.500 103.881 C 218.625 88.406, 212.999 75.239, 212.997 74.622 C 212.993 72.988, 218.192 60.998, 218.900 61.010 C 219.230 61.016, 226.664 77.216, 235.421 97.010 L 251.341 133 270.671 133 C 281.302 133, 290.001 132.662, 290.002 132.250 C 290.004 131.838, 278.473 105.513, 264.378 73.750 L 238.750 16 219.017 16 L 199.283 16 196.392 22.473 C 194.801 26.033, 193.217 28.958, 192.871 28.973 C 192.526 28.988, 191.647 27.562, 190.919 25.804 C 190.191 24.047, 188.290 21.122, 186.694 19.304 L 183.793 16 147.531 16 C 111.932 16, 111.220 16.039, 108.534 18.152 C 107.030 19.335, 104.960 22.260, 103.935 24.652 C 102.910 27.043, 101.811 29, 101.494 29 C 101.176 29, 99.604 26.075, 98 22.500 L 95.084 16 75.292 16.004 L 55.500 16.007 30.299 72.754 M 63.693 20.750 C 63.459 21.163, 73.565 44.675, 86.151 73 C 101.673 107.936, 109.864 125.236, 111.616 126.788 L 114.199 129.075 148.157 128.788 L 182.116 128.500 183.808 126.216 C 184.739 124.960, 186.564 121.483, 187.864 118.489 L 190.227 113.045 183.523 97.772 C 179.835 89.373, 176.483 82.147, 176.074 81.716 C 175.666 81.284, 172.512 87.359, 169.066 95.216 C 161.449 112.583, 159.198 116.204, 154.688 118.344 C 147.749 121.637, 138.065 119.460, 133.943 113.682 C 133.087 112.482, 128.415 102.500, 123.560 91.500 C 118.705 80.500, 112.814 67.225, 110.468 62 C 108.123 56.775, 103.419 46.200, 100.015 38.500 C 90.968 18.033, 93.358 20, 77.536 20 C 70.156 20, 63.927 20.337, 63.693 20.750 M 202.267 21.250 C 200.596 23.387, 196 34.153, 196 35.930 C 196 38.071, 208.693 66.398, 209.821 66.774 C 210.844 67.115, 231.049 21.889, 230.367 20.784 C 229.516 19.407, 203.369 19.841, 202.267 21.250 M 142.500 34.386 C 140.849 35.105, 138.941 36.366, 138.259 37.188 C 137.577 38.010, 133.423 46.701, 129.027 56.501 L 121.036 74.320 129.058 92.375 C 133.470 102.306, 137.791 111.217, 138.661 112.178 C 142.901 116.864, 151.895 116.492, 155.847 111.468 C 156.880 110.154, 161.197 101.272, 165.441 91.729 L 173.156 74.378 165.417 56.939 C 157.229 38.492, 156.098 36.619, 151.802 34.398 C 148.496 32.688, 146.401 32.685, 142.500 34.386" stroke="none" fill="#000000" fill-rule="evenodd"/>
                    </svg>
                  </a>
                )}

              </div>

              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#555',
                marginBottom: '25px'
              }}>
                {convidadoSelecionado.descricao}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Renderização do app
const App = () => {
  return (
    <div>
      <Convidados />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('convidados'));