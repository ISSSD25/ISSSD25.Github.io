// Função para abrir e fechar o popup
document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById('popupOverlay');
  const btnClose = document.getElementById('popupBtnClose');
  const spanClose = document.getElementById('popupClose');

  // Abre o popup automaticamente ou via função
  function abrirPopup() {
    popup.style.display = 'flex';
  }

  // Fecha o popup
  function fecharPopup() {
    popup.style.display = 'none';
  }

  btnClose.addEventListener('click', fecharPopup);
  spanClose.addEventListener('click', fecharPopup);

  // Fecha se clicar fora do container
  popup.addEventListener('click', function(e) {
    if(e.target === popup) fecharPopup();
  });

  // Abrir automaticamente ao carregar a página
  abrirPopup();

  // Se quiser abrir manualmente, chame: abrirPopup();
});
