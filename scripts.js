let nome = prompt("qual seu nome?");

postarNome();

function postarNome() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", {
        name: `${nome}`
    } );
    //callback
    promise.then(manterOnline);
    promise.catch(repetirNome);
}
function manterOnline() {
    setInterval(function() {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: `${nome}`
    } )
    }, 4000);

}
function repetirNome() {
    nome = prompt("qual seu nome?");
    postarNome()
}


let mensagens = []

pegarMensagens()

function pegarMensagens() {
    setInterval(function(){
        const promise = axios.get(
            "https://mock-api.driven.com.br/api/v6/uol/messages"
          );
          //callback
          promise.then(carregarDados);
    },3000)
}

function carregarDados(response) {
    mensagens = response.data;
    renderizarMensagens();
    scroll ()
}





function renderizarMensagens() {
    let container = document.querySelector(".container");
    for(let i = 0; i < mensagens.length; i ++) {
        if(mensagens[i].type === "status") {
            container.innerHTML = container.innerHTML + `<div class="box ${mensagens[i].type} "><h1>(${mensagens[i].time}) </h1>
            <h2>${mensagens[i].from}</h2>
            <h3>${mensagens[i].text}</h3>
            </div>`
        }
        if(mensagens[i].type === "message") {
            container.innerHTML = container.innerHTML + `<div class="box ${mensagens[i].type} "><h1>(${mensagens[i].time}) </h1>
            <h2>${mensagens[i].from}</h2>
            <h3> para </h3>
            <h2>Todos</h2>
            <h3>${mensagens[i].text}</h3>
            </div>`
        }
        if(mensagens[i].type === "private_message" && mensagens[i].to === `${nome}`) {
            container.innerHTML = container.innerHTML + `<div class="box ${mensagens[i].type} "><h1>(${mensagens[i].time}) </h1>
            <h2>${mensagens[i].from}</h2>
            <h3> para </h3>
            <h2>${mensagens[i].to}</h2>
            <h3>${mensagens[i].text}</h3>
            </div>`
        }
       
        
    }
}
    scroll ()
    function scroll () {
        const elementoQueQueroQueApareca = document.querySelector(".container").lastChild;
        elementoQueQueroQueApareca.scrollIntoView();
    }

