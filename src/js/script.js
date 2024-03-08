// Seleciona elementos HTML usando seletores de classe e ID
const introdP = document.querySelector('.introd-container');
const iconScroll = document.querySelector('.icon-scroll');
const toggleButton = document.getElementById('toggle-mode');
const btnMenu = document.querySelector('.menu-button');
const menuIcon = document.getElementById('menuIcon');
const chatContent = document.querySelector('.chat-content');
const chatSaves = document.querySelector('.chat-saves');
const chatHistoryContainer = document.querySelector('.chat-history');
const chatConfig = document.querySelector('.chat-config');
const darkMode = document.getElementById('darkMode');
const checkBox = document.getElementById("setting");
const deleteButton = document.getElementById('deleteChat');
const dialog = document.querySelector('dialog');
const cancelButton = dialog.querySelector('.cancelButton');
const confirmButton = dialog.querySelector('.confirmButton');
const chatPage = document.querySelector('.chat-container');
const chatStart = document.querySelector('.chat-start')
const chatLog = document.getElementById('chat-log');
const copyText = document.querySelectorAll('.copyText');
const userText = document.getElementById('user-text');
const userInput = document.querySelector('.user-input');
const sendButton = document.getElementById('send-button');
const chatOptions  = document.querySelectorAll('.chat-option');
const chatNewButton = document.querySelector('#start-chat');

// Configura consultas de mídia para diferentes tamanhos de tela
const desktopScreen = window.matchMedia("(max-width: 1110px)"); // Configura uma consulta de mídia para telas de desktop.
const mobileScreen = window.matchMedia("(max-width: 700px)"); // Configura uma consulta de mídia para telas de dispositivos móveis.

// Seleciona o elemento <body> do documento HTML
const body = document.body;

// Inicializa variáveis para controlar o estado da aplicação
let activeOption = null; // Inicializa uma variável para armazenar a opção ativa.
let existingChat = true; // Inicializa uma variável para controlar se há um chat existente.
let scrollDownButton; // Declara uma variável para o botão de rolagem.
let int = 1; // Inicializa uma variável para controlar um contador

// Define o valor inicial do campo de texto do usuário como uma string vazia
userText.value = '';


// Evento DOMContentLoaded é acionado quando o HTML foi completamente carregado e analisado
document.addEventListener('DOMContentLoaded', () => {
    // Chamar a função de ajuste inicialmente para configurar corretamente a tela
    handleSizeWidth();

    // Array com os textos dos parágrafos
    const paragrafos = [
        'Bem-vindo ao ChatTextPT - Correção Inteligente de Textos em Português',
        'O ChatTextPT é uma ferramenta de Inteligência Artificial desenvolvida para corrigir erros de português, incluindo gramática, ortografia, acentuação e outros aspectos. Se o português não é sua língua materna, estamos aqui para ajudar a aprimorá-lo e aprimorar sua comunicação escrita de maneira natural e fluente.',
        'O nome "ChatTextPT" é uma combinação de "Chat" (conversa) e "Text" (texto), refletindo nossa missão de oferecer uma plataforma de conversação dedicada à melhoria da escrita em português. Nossa ferramenta é projetada para fornecer correções e sugestões linguísticas, visando elevar a qualidade dos textos em português dos usuários.',
        'Nossa plataforma oferece uma interface amigável e responsiva, adaptando-se a diferentes dispositivos e tamanhos de tela. Apresentamos um menu em formato de hambúrguer para fácil acesso à lista de conversas e outras funcionalidades.',
        'Basta inserir seu texto na entrada de input e aguardar a resposta do ChatTextPT. Você receberá sugestões de melhoria para o texto fornecido e poderá facilmente aplicá-las, copiar o texto corrigido ou continuar a conversa. Além disso, proporcionamos a flexibilidade de alternar entre os modos claro e noturno para uma experiência visual confortável em qualquer ambiente.',
        'Valorizamos sua privacidade e segurança. Todas as conversas são automaticamente salvas no seu dispositivo local, sem armazenamento em servidores externos. Você também pode acessar facilmente o histórico de conversas anteriores e gerenciar suas conversas conforme necessário.',
        'No ChatTextPT, aprimorar seus textos em português é simples, eficaz e personalizado. Experimente agora e transforme suas palavras!'
    ];

    // Função para criar efeito de digitação para os parágrafos
    function digitarParagrafos(index) {

        // Verifica se ainda há parágrafos para digitar
        if (index < paragrafos.length) {
            // Cria um novo elemento <p>
            const novoParagrafo = document.createElement('p');

            // Adiciona o parágrafo ao contêiner
            introdP.appendChild(novoParagrafo);

            // Inicia o efeito de digitação para o novo parágrafo
            typeWriter(novoParagrafo, paragrafos[index], 10, function () {
                // Quando o efeito de digitação terminar, chama a função para o próximo parágrafo
                digitarParagrafos(index + 1);
            });
        }
    }
        
    // Inicia o efeito de digitação para o primeiro parágrafo
    digitarParagrafos(0);
});

// Função para criar efeito de digitação
function typeWriter(element, text, speed, callback) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Chamada à função de callback quando a digitação terminar
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    type();
}

// Verifique o estado atual do modo (por exemplo, se o usuário preferiu o modo escuro anteriormente)
const isDarkMode = () => body.classList.contains('dark-mode');

// Função para ativar/desativar o modo escuro
function toggleDarkMode() {
    if (isDarkMode()) {
        body.classList.remove('dark-mode');
        darkMode.checked = false;
    } else {
        body.classList.add('dark-mode');
        darkMode.checked = true;
    }
}

// Adicione um ouvinte de evento para alternar o modo escuro/luz quando o botão é clicado
toggleButton.addEventListener('click', toggleDarkMode);

// Evento para alternar o modo escuro/luz quando o checkbox é clicado
darkMode.addEventListener('click', toggleDarkMode);

// Função para rolar para o final da página quando o ícone de rolagem é clicado
iconScroll.addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
    });
});

// Evento para criar um novo chat
chatNewButton.addEventListener('click', createNewChat);

// Função para criar um novo chat
function createNewChat() {
    // Limpar o log de conversa ao criar um novo chat
    chatLog.innerHTML = '';

    // Exibir mensagens iniciais
    appendMessage('bot', 'Olá! Como posso ajudar?');

    // Redefinir o contador
    int = 1;
}

// Evento para abrir/fechar o menu lateral
menuIcon.addEventListener('click', () => {
    chatSaves.style.position = (chatSaves.style.position === 'relative') ? 'absolute' : 'relative';
    chatSaves.style.left = (chatSaves.style.left === 'auto') ? '-230px': 'auto';
    btnMenu.style.left = (btnMenu.style.left === '180px') ? '11px': '180px';
});

// Evento de clique no elemento que permite ao usuário alternar entre as opções "Conversas" e "Configuração".
chatContent.addEventListener('click', (e) => {
    const target = e.target;

    // Verifica se o alvo possui a classe 'menuSelect'
    if (target.classList.contains('menuSelect')) {
        const menu = target.dataset.menu;

        if (menu === 'conversas') {
            chatHistoryContainer.style.display = 'block';
            chatConfig.style.display = 'none';
            document.querySelector('.menuSelect:first-child').style.borderBottomColor = '#b51a2b';
            document.querySelector('.menuSelect:last-child').style.borderBottomColor = 'transparent';
        } else if (menu === 'configuracao') {
            chatHistoryContainer.style.display = 'none';
            chatConfig.style.display = 'block';
            document.querySelector('.menuSelect:first-child').style.borderBottomColor = 'transparent';
            document.querySelector('.menuSelect:last-child').style.borderBottomColor = '#b51a2b';
        }
    }
});

// Atualize o estado do checkbox quando o rótulo é clicado
document.querySelector("label[for='setting']").addEventListener("click", () => {
    checkBox.checked = checkBox.checked; // Inverte o estado do checkbox
    applyStyles(checkBox.checked);
});

// Evento para mudanças no estado do checkbox
checkBox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    applyStyles(isChecked);
});

// Função para aplicar estilos com base no estado do checkbox
function applyStyles(isChecked) {
    if (isChecked) {
        document.querySelector('.introd-container').style.display = "none";
        document.querySelector('.info-container section').style.display = "none";
        document.querySelector('.menu-button').style.position = "absolute";
        document.querySelector('.menu-button').style.top = "10px";
        document.querySelector('.menu-button').style.bottom = "initial";
        document.querySelector('.menu-button').style.height = "35px";
        document.getElementById('toggle-mode').style.top = '4px';
        document.getElementById('toggle-mode').style.zIndex = '4';
        document.getElementById('chat-log').style.zIndex = '5';
        document.querySelector('#toggle-mode span').style.width = '40px';
        document.querySelector('#toggle-mode span').style.height = '40px';
    } else {
        // Se o checkbox não estiver marcado, redefina as propriedades CSS
        document.querySelector('.introd-container').style.display = "";
        document.querySelector('.info-container section').style.display = "";
        document.querySelector('.menu-button').style.position = "";
        document.querySelector('.menu-button').style.top = "";
        document.querySelector('.menu-button').style.bottom = "";
        document.querySelector('.menu-button').style.height = "";
        document.getElementById('toggle-mode').style.top = '';
        document.getElementById('toggle-mode').style.zIndex = '';
        document.getElementById('chat-log').style.zIndex = '';
        document.querySelector('#toggle-mode span').style.width = '';
        document.querySelector('#toggle-mode span').style.height = '';
    }
}

// Evento de clique ao botão de exclusão
deleteButton.addEventListener('click', () => {
    dialog.showModal(); // Mostrar o diálogo ao clicar no botão de exclusão
});

// Evento de clique ao botão de cancelar
cancelButton.addEventListener('click', () => {
    dialog.close(); // Fechar o diálogo ao clicar no botão de cancelar
});

// Evento de clique ao botão de confirmar
confirmButton.addEventListener('click', () => {
    
    chatHistoryContainer.innerHTML = '';
    userText.value = '';

    createNewChat();

    dialog.close(); // Fechar o diálogo após confirmar a exclusão
});

// Função para verificar se o usuário está no final do chat
function isUserAtBottom() {
    return chatLog.scrollTop >= (chatLog.scrollHeight - chatLog.offsetHeight);
}

// Função para criar e manipular o elemento de rolagem para baixo
function createScrollDownButton() {
    const scrollDown = document.createElement('div');
    scrollDown.className = 'scrollDown';
    chatStart.append(scrollDown); // Adiciona o botão à página de chat
    return scrollDown;
}

// Cria e exibe/oculta o botão de rolagem inicialmente
scrollDownButton = createScrollDownButton();
toggleScrollDownButton();

// Verifica se o botão deve ser exibido ou oculto com base na posição de rolagem
function toggleScrollDownButton() {
    if (isUserAtBottom()) {
        scrollDownButton.classList.add('hidden'); // Adiciona a classe 'hidden' para ocultar o botão
    } else {
        scrollDownButton.classList.remove('hidden'); // Remove a classe 'hidden' para exibir o botão
    }
}

// Adiciona um ouvinte de evento de rolagem para o chatLog
chatLog.addEventListener('scroll', toggleScrollDownButton); // Verifica se o botão deve ser exibido ou oculto ao rolar

// Evento para rolar o chat para baixo quando o botão de rolagem para baixo é clicado
scrollDownButton.addEventListener('click', () => {
    chatLog.scrollTo({
        top: chatLog.scrollHeight,
        left: 0,
        behavior: "smooth",
    });
});

// Função para lidar com mudanças no tamanho da tela
function handleSizeWidth(){
    if(desktopScreen.matches){ // Verificando se a tela é de desktop
        screenSizeDesktop(); // Chamando a função específica para tela de desktop
    }
    if(mobileScreen.matches){ // Verificando se a tela é de celular
        screenSizeMobile(); // Chamando a função específica para tela de celular
    }
}

// Função para ajustar elementos na tela de desktop
function screenSizeDesktop(){
    console.group('Ajustes para tela de desktop (Resolução de 1110px)');
    if(chatSaves.style.position === 'absolute'){
        if(desktopScreen.matches){
            chatPage.style.position = 'relative';
            chatLog.style.bottom = '-45px';
            chatLog.style.height = '88vh';
            userInput.style.bottom = '-45px';
            console.log('Ajustando elementos para tela de desktop - Posição absoluta');
        }else{
            chatPage.style.position = 'relative';
            chatLog.style.bottom = '0px';
            chatLog.style.height = '93vh';
            userInput.style.bottom = '';
            console.log('Ajustando elementos para tela de desktop - Posição relativa');
        }
    }else{
        // chatLog.style.bottom = '-45px'; //'0px';
        // //chatLog.style.height = '90vh';
        chatPage.style.position = 'relative';
        console.log('Ajustando elementos para tela de desktop - Sem alterações na posição');
    }
    console.groupEnd();
}

// Função para ajustar elementos na tela de celular
function screenSizeMobile(){
    console.group('Ajustes para tela de celular (Resolução de 700px)');
    if(chatSaves.style.position === 'relative'){
        if(mobileScreen.matches){
            chatPage.style.position = 'absolute';
            chatLog.style.bottom = '-45px';
            chatLog.style.height = '88vh';
            btnMenu.style.left = '11px';
            chatSaves.style.left = '-230px';
            userInput.style.bottom = '-45px';
            console.log('Ajustando elementos para tela de celular - Posição relativa');
        }else{
            if(chatPage.style.position === 'absolute'){
                chatLog.style.bottom = '0px';
                chatLog.style.height = '93vh';
            }
            chatLog.style.height = '93vh';
            btnMenu.style.left = '180px';
            chatSaves.style.left = 'auto';
            userInput.style.bottom = '';
            console.log('Ajustando elementos para tela de celular - Posição absoluta');
        }
    }else{
        if(chatPage.style.position === 'absolute'){
            chatPage.style.position = 'relative';
            console.log('Ajustando elementos para tela de celular - Sem alterações na posição');
        }
    }
    console.groupEnd();
}

// Adicionando listeners para mudanças no tamanho da tela
desktopScreen.addEventListener('change', screenSizeDesktop);
mobileScreen.addEventListener('change', screenSizeMobile);

// Evento para enviar uma mensagem quando o botão de envio é clicado
sendButton.addEventListener('click', sendMessage);

// Evento para habilitar ou desabilitar o botão de envio com base no texto do usuário
userText.addEventListener('input', handleInput);

// Evento para enviar uma mensagem quando a tecla Enter é pressionada (sem Shift)
userText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        if (!sendButton.disabled) {
            sendMessage();
            e.preventDefault();
        }
    }
});

// Função para lidar com a entrada do usuário
function handleInput() {
    const trimmedValue = userText.value.trim();
    sendButton.disabled = trimmedValue === '';
}

// Função para enviar uma mensagem
function sendMessage() {
    // Obter o texto inserido pelo usuário e remover espaços em branco extras
    const userMessage = userText.value.trim();

    // Verificar se a mensagem do usuário não está vazia
    if (userMessage !== '') {
        // Adicionar a mensagem do usuário ao registro de mensagens, identificando-a como uma mensagem de usuário
        appendMessage('user', userMessage); // A mensagem do usuário é adicionada ao registro de mensagens com a função appendMessage()
        
        // Enviar a mensagem para o chatbot e processar a resposta
        sendToChatBot(userMessage)
            .then(botResponse => {
                // Marcar que não há mais uma conversa existente, pois uma nova mensagem foi enviada pelo usuário
                existingChat = false; 
                // Adicionar a mensagem do bot ao registro de mensagens
                appendMessage('bot', botResponse);
            })
            .catch(error => {
                // Em caso de erro ao enviar ou receber a resposta do chatbot, exibir uma mensagem de erro
                const errorMessage = 'Desculpe, ocorreu um erro ao se comunicar com o chatbot.';
                appendMessage('bot', errorMessage);
                console.error('Erro ao receber resposta do chatbot:', error);
            });
    }

    userText.value = ''; // Limpar o campo de entrada
    sendButton.disabled = true; // Desabilitar o botão de envio
    userText.focus(); // Colocar o foco de volta no campo de entrada
}

// Função para adicionar texto à mensagem de forma animada
function addTextAnimated(element, text, speed, callback) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Chamada à função de callback quando a digitação terminar
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    type();
}

// Função para criar a mensagem do usuário
function createUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.textContent = message;

    chatLog.appendChild(messageDiv);

    // Verificar se é a primeira mensagem do usuário na conversa
    if (int === 1) {
        createChatInfo(message); // Se for a primeira mensagem, criar um contêiner do chat no menu lateral
        int = 0; // Marcar que a primeira mensagem já foi processada
    }

    return messageDiv;
}

// Função para criar a mensagem do bot com a opção de copiar
function createBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';

    const div = document.createElement("div");
    div.className = 'copyText';
    
    if (existingChat === false) {
        // Se for uma nova conversa, adicionar a mensagem de forma animada
        addTextAnimated(messageDiv, message, 10, () => {
            messageDiv.appendChild(div); // Após adicionar o texto, adicionar a opção de cópia
        });
        existingChat = true; // Marcar que a conversa já existe
    } else {
        messageDiv.textContent = message;
        messageDiv.appendChild(div);
    }
    
    copyTextOnClick(div); // Adicionar um evento de clique para a opção de cópia

    return messageDiv;
}

// Função para adicionar uma mensagem ao chat log
function appendMessage(type, message) {
    let messageDiv;

    if (type === 'bot') {
        messageDiv = createBotMessage(message);
    } else {
        messageDiv = createUserMessage(message);
    }

    chatLog.appendChild(messageDiv);

    // Mantém o chat log rolando para baixo para mostrar a última mensagem
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Função para lidar com a cópia de texto ao clicar em um elemento
function copyTextOnClick(element) {
    element.addEventListener('click', () => {
        const getText = element.parentElement.innerText;
        navigator.clipboard.writeText(getText)
            .then(() => {
                element.classList.add('copied');
                setTimeout(() => {
                    element.classList.remove('copied');
                }, 3000); // Remove a classe "copied" após 3 segundos
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
                element.classList.add('error');
                setTimeout(() => {
                    element.classList.remove('error');
                }, 3000); // Remove a classe "error" após 3 segundos
            });
    });
}

// Adiciona o evento de cópia de texto para cada elemento da lista
copyText.forEach(text => {
    copyTextOnClick(text);
});

// Função para criar informações de chat
function createChatInfo(message) {
    const chatInfo = document.createElement('div');
    chatInfo.className = 'chat-info';

    const chatName = document.createElement('span');
    chatName.className = 'chat-name';
    chatName.textContent = message;

    const chatOption = document.createElement('span');
    chatOption.className = 'chat-option';

    chatOption.addEventListener('click', handleChatOptionClick);

    chatInfo.appendChild(chatName);
    chatInfo.appendChild(chatOption);

    document.querySelector('.chat-history').appendChild(chatInfo);
}

// Função para criar a opção de exclusão ativa
function createOptionActive() {
    const optionActive = document.createElement('div');
    optionActive.className = 'optionActive';

    const spanExcluir = document.createElement('span');
    spanExcluir.textContent = 'Excluir';

    optionActive.appendChild(spanExcluir);

    return optionActive;
}

// Manipula o clique na opção de chat
function handleChatOptionClick(e) {
    e.stopPropagation();
    const clickedOption = e.currentTarget;

    removeActiveOption();

    const optionActive = createOptionActive();
    const chatInfo = clickedOption.closest('.chat-info');
    chatInfo.appendChild(optionActive);

    optionActive.querySelector('span').addEventListener('click', () => {
        chatInfo.remove();
    });

    activeOption = clickedOption;
}

// Evento para remover a opção ativa quando se clica fora dela
document.addEventListener('click', (e) => {
    if (!e.target.closest('.optionActive')) {
        removeActiveOption();
    }
});

// Função para remover a opção ativa
function removeActiveOption() {
    const optionActive = document.querySelector('.optionActive');
    if (optionActive) {
        optionActive.remove();
        activeOption = null;
    }
}

// Adiciona o evento de manipulação da opção de chat para cada opção
chatOptions.forEach((option) => {
    option.addEventListener('click', handleChatOptionClick);
});

// Função assíncrona para enviar mensagem ao chatbot
async function sendToChatBot(message) {
    try {
        // Envia uma solicitação HTTP POST para o endpoint do chatbot
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST', // Método POST é usado para enviar dados ao servidor
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ message }), // Envia a mensagem no corpo da solicitação em formato JSON
        });

        // Aguarda a resposta da solicitação HTTP e a converte para JSON
        const data = await response.json();

        // Retorna a mensagem recebida do chatbot contida no corpo da resposta
        return data.message;
    } catch (error) {
        // Se ocorrer um erro durante o envio da mensagem para o chatbot, este bloco é executado
        console.error('Erro ao enviar mensagem para o chatbot:', error);
        
        // Lança novamente o erro para que quem chamou a função possa lidar com ele
        throw error;
    }
}