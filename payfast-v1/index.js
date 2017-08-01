const app = require ('./config/custom-express')()

app.listen(3001,function(){
  console.log('Servidor de pé em hhtp://localhost:3001')
  console.log('Para derrubar o servidor: ctrl+c')
})
