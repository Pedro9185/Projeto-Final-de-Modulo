// 1º capiturar elemento da tabela => tbody
// const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado')

const formularioRecados = document.
    getElementById('formularioRecados')

const tBody = document.getElementById('meus-recados')


function salvarRecados(event) {
    event.preventDefault()

    const recados = {
        descricao: formularioRecados.descricao.value,
        detalhamento: formularioRecados.detalhamento.value
    }

    const valorEmJson = JSON.stringify(recados)
    const valorConvertidoEmJson = JSON.parse(valorEmJson)

    let listaRecados = JSON.parse(localStorage.getItem('recadosSalvos'))

    if (!listaRecados) {
        listaRecados = []
    }

    listaRecados.push(recados)

    localStorage.setItem('recadosSalvos', JSON.stringify(listaRecados))

    formularioRecados.reset()
    mostrarRecadosNoHtml()
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado')

    if(!usuarioLogado) {
        window.location.href = './entrar.html'
    } else {
        montarRegistrosNoHTML()
    } 
})


function mostrarRecadosNoHtml() {
    tBody.innerHTML = ''
    const lista_recados = JSON.parse(localStorage.getItem('recadosSalvos'))

    lista_recados.forEach((valor, index) => {

        tBody.innerHTML += `
        
        
        <tr id="${index}">
        <td>${index + 1}</td>
        <td>${valor.descricao}</td>
        <td>${valor.detalhamento}</td>

        <td>
        <button class="botaoApagar"  onclick="apagar(${index})">Apagar</button>
        </td>

        <td>
        <button onclick="">Editar</button>
        </td>
        
        </tr>
        
        
        `
    })
}
function apagar(indice) {

    // listaRecados.splice(indice)

    // armazenarDadosUsuarioLocalStorage('recadosSalvos')

    let trRemover = document.getElementById(indice)
    trRemover.remove()
}

function armazenarDadosUsuarioLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)
    localStorage.setItem(chave, valorJSON)
}

function buscarDadosDoLocalStorage(chave) {
    const dadosJSON = localStorage.getItem(chave)
    if (dadosJSON) {
        const dadosConvertidos = JSON.parse(dadosJSON)
        return dadosConvertidos;
    } else {
        return {}
    }
}