const contatosCollection = require("../model/contatoSchema")

const getAll = (request, response) => {
  console.log(request.url)
  contatosCollection.find((error,contatos) => {
    if (error){
      return response.status(500).send(error)
    } else {
      return response.status(200).send(contatos)
    }
  })
};

const add = (request, response) => {
  //novo objeto para nossa coleção
  const contatoDoBody = request.body
  const contato = new contatosCollection(contatoDoBody)

  contato.save((error) => {
    // if(error !== null && error !== undefined)
    if (error) {
      return response.status(400).send(error)
    } else {
      return response.status(200).send(contato)
    }
  })
  // let contato = request.body
  // let baseDados = model.agenda.contatos
  // contato.id = Math.random().toString(36).substr(-8)

  // if (!contato.nome || !contato.dataNascimento || !contato.celular) {
  //   response.status(400).send("Dados inválidos");
  // } else {
  //   if (baseDados.find(dado => dado.nome === contato.nome)) {
  //     response.status(400).send("Contato já cadastrado")
  //   } else {
  //     model.agenda.contatos.push(contato)
  //     response.status(201).send(contato)
  //   }
  // }

}

const getByName = (request, response) => {

  const nomeParam = request.params.nome
  // buscar nome com filtro utilizando regex (like)
  const regex = new RegExp(nomeParam)
  const filtro = { nome : regex }

  // const filtro = {nome: nomeParam} - buscar somente o nome sem filtro

  contatosCollection.find(filtro, (error, contatos) => {
    if (error) {
      return response.status(500).send(error)
    } else{
      return response.status(200).send(contatos)
    }
  })
}

const getById = (request, response) => {
  const idParam = request.params.id
  contatosCollection.findById(idParam, (error, contato) => {
    if (error) {
      return response.status(500).send(error)
    } else {
      if (contato){
        return response.status(200).send(contato)
      } else {
        return response.status(404).send('Contato não encontrado!')
      }
    }
    })

    const deleteById = (request, response) => {
      const idParam = request.params.id
      contatosCollection.findByIdAndDelete(idParam, (error, contato) => {
        if (error) {
          return response.status(500).send(error)
        } else {
          if (contato){
            return response.status(200).send('Contato apagado.')
          } else {
            return response.sendStatus(404)
          }
        }
      })
    }
}


module.exports = {
  getAll,
  add,
  getByName,
  getById,
  deleteById
}
