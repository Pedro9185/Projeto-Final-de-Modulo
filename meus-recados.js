const usuarioLogado = buscarDadosLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {
    if(!usuarioLogado.nome){
        window.location.href = 'entrar.html'
    }else{
        mostrarRecados()
    }
})

const listaRecados = usuarioLogado.recados 

const formularioHTML = document.getElementById('formularioRecados') 

const tBody = document.getElementById('meus-recados')

formularioHTML.addEventListener('submit', (evento) => {

    evento.preventDefault()

    const descricao = document.getElementById('descricao-id').value
    const detalhamento = document.getElementById('detalhamento-id').value

    const novoRecado = {
        descricao: descricao,
        detalhamento: detalhamento
    }

    listaRecados.push(novoRecado)

    salvarRecados()

    mostrarRecados()

    formularioHTML.reset()

})




function salvarRecados(){
    const listaUsuario = buscarDadosLocalStorage('usuarios')
    
    const acharUsuario = listaUsuario.findIndex((valor) => valor.nome === usuarioLogado.nome)
 
    listaUsuario[acharUsuario].recados = listaRecados
 
    guardarLocalStorage('usuarios', listaUsuario)

}


function mostrarRecados(){
    tBody.innerHTML = ''

    listaRecados.forEach((valor, index) => {
        tBody.innerHTML += `
        <tr id='${index}'>
        <td>${index + 1}</td>
        <td>${valor.descricao}</td>
        <td>${valor.detalhamento}</td>
        <td>
            <button onclick="apagar(${index})">Apagar</button>
            <button onclick="editar(${index})">Editar</button>
        </td>
    </tr>`
    })
}




function guardarLocalStorage(chave, valor){
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}
function buscarDadosLocalStorage(chave){

    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON){
    const dadosConvertidos = JSON.parse(dadoJSON)
        return dadosConvertidos
    }
    else{
        return {}
    }
}

