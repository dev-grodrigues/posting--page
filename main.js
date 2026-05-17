
// Formulário
const postForm = document.querySelector('#post-form');
const titulo   = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');

// Renderizadores
const renderizadorTitulo   = document.querySelector('#renderizador-titulo');
const renderizadorConteudo = document.querySelector('#renderizador-conteudo');

// Elementos auxiliares
const outputSection = document.querySelector('#output-section');
const btnSubmit     = document.querySelector('#btn-submit');
const postTime      = document.querySelector('#post-time');

// URL DA API 
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

//  FUNÇÃO: CRIAR POST 
async function criarPost(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

//  FUNÇÃO: RENDERIZAR POST 
function renderizarPost(data) {
  
  renderizadorTitulo.innerHTML   = data.title;
  renderizadorConteudo.innerHTML = data.body;

  
  const agora = new Date();
  postTime.textContent = `Agora mesmo · ${agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  // Exibe o card de saída com animação
  outputSection.classList.add('visible');
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

//  FUNÇÃO: ESTADO DO BOTÃO 
function setBotaoCarregando(carregando) {
  btnSubmit.classList.toggle('loading', carregando);
}

// EVENTO: SUBMIT 
postForm.addEventListener('submit', async (e) => {
  // Previne o comportamento padrão do formulário (recarregar a página)
  e.preventDefault();

  // Validação básica
  if (!titulo.value.trim() || !conteudo.value.trim()) {
    alert('Por favor, preencha o título e o conteúdo antes de publicar!');
    return;
  }


  const data = {
    title:  titulo.value,
    body:   conteudo.value,
    userId: 1,
  };

  setBotaoCarregando(true);

  try {
    // Chama a API com POST
    const resultado = await criarPost(data);

    console.log('Post criado com sucesso:', resultado);

    // Renderiza o conteúdo retornado
    renderizarPost(data); 

    // Limpa o formulário após publicar
    postForm.reset();

  } catch (erro) {
    console.error('Falha ao criar o post:', erro);
    alert('Ops! Algo deu errado ao publicar. Tente novamente.');
  } finally {
    setBotaoCarregando(false);
  }
});
