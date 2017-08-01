const express = require ('express')
const app = express()
const request = require('request')
const port = 3000

app.get('/v1/pagamento', (req,res)=>{
  request.get('http://localhost:3001/pagamento', (error,result)=>{
    console.log('Passou aqui')
    res.json(JSON.parse(result.body))
  })
})

app.delete('/v2/pagamento/:id', (req,res)=>{
  request.get('http://localhost:3002/pagamento', (error,result)=>{
    res.json(JSON.parse(result.body))
  })
})

app.listen(port,function(){
  console.log(`Servidor de pé em http://localhost:${port}`)
  console.log('Para derrubar o servidor: ctrl+c')
})
