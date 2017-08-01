class PagamentoController {
  constructor(app){
    this.app = app
  }
  lista(req, res) {
    var connection = this.app.infra.connectionFactory()
    var pagamentoDao = new this.app.Dao.PagamentoDao(connection)
    //const
    pagamentoDao.lista((error, result,fields)=>{
      if(!error) {
        res.json(result)
        // var resposta = {
        //   dados_do_pagamento: pagamento,
        //   links: [
        //     {
        //       href: "http://localhost:3000/pagamento"+ pagamento.id,
        //       rel: "confirmar",
        //       method: "PUT"
        //     },
        //     {
        //       href: "http://localhost:3000/pagamento"+ pagamento.id,
        //       rel: "cancelar",
        //       method: "DELETE"
        //     },
        //     {
        //       href: "http://localhost:3000/pagamento",
        //       rel: "confirmar",
        //       method: "OPTION"
        //     },
        //     {
        //       href: "http://localhost:3000/pagamento"+ pagamento.id,
        //       rel: "confirmar",
        //       method: "PATCH"
        //     }
        //   ]
        // }
      } else {
        res.status(404).json(error)
      }
    })
  }

  buscaPorId(req, res) {
    var connection = this.app.infra.connectionFactory()
    var pagamentoDao = new this.app.Dao.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.buscaPorId(id, (error, result,fields)=>{

      if(!error){
        res.json(result)
      } else {
        res.status(404).json(error)
      }
    })

  }
  salvar (req, res) {
    var pagamento = req.body
    req.assert('forma_pagamento', "Forma de pagamento é obrigatória.").notEmpty()
    req.assert('valor', "Valor é obrigatório e deve ser um decimal.").isFloat()
    req.assert('moeda', "Moeda é obrigatória e deve ter 3 caracteres.").notEmpty()
    req.assert('moeda', "Moeda deve ter 3 caracteres.").len(3,3)

    let errors = req.validationErrors()
    if(errors){
      console.log('Erros de validação encontrados')
      res.status(400).send(errors)

    } else{
      console.log('processando pagamento...')
      var connection = this.app.infra.connectionFactory()
      var pagamentoDao = new this.app.Dao.PagamentoDao(connection)

      pagamento.status = "CRIADO"
      pagamento.date = new Date

      pagamentoDao.salva(pagamento, function(exception, result){
        res.location('/pagamento' + result.insert)
        if(!exception){
          var resposta = {
            dados_do_pagamento: pagamento,
            links: [
              {
                href: "http://localhost:3000/pagamento"+ pagamento.id,
                rel: "confirmar",
                method: "GET"
              },
              {
                href: "http://localhost:3000/pagamento"+ pagamento.id,
                rel: "confirmar",
                method: "PUT"
              },
              {
                href: "http://localhost:3000/pagamento"+ pagamento.id,
                rel: "cancelar",
                method: "DELETE"
              },
              {
                href: "http://localhost:3000/pagamento",
                rel: "confirmar",
                method: "OPTION"
              },
              {
                href: "http://localhost:3000/pagamento"+ pagamento.id,
                rel: "confirmar",
                method: "PATCH"
              }
            ]
          }
          res.status(201).json(pagamento)
        } else {
          res.status(400).json(exception)
        }
      })
    }
  }
  
}
module.exports = () => {
  return PagamentoController
}
