//Criando uma conexao

const Client = require('pg').Client

const cliente = new Client({
  user: "postgres",
  password: "********",
  host: "127.0.0.1",
  port: 5432,
  database: "Carros"
})

//abrindo a conexao

//cliente.connect()

//buscar os dados do banco de dados

/**cliente.query("select * from carros")
 .then(response =>{
   const resposta = response.rows
   console.table(resposta)
  })
  .finally(() => cliente.end())
  
  */
 
 async function getCars(){
  try{
    console.log('Estabelecendo conexao')
    await cliente.connect()
    console.log('conexao bem sucedida!')
    
    const resultado = await cliente.query("select * from carros")
    console.table(resultado.rows)
  }
  catch (erro) {
    console.log(`Ocorreu um erro na operacao: ${erro}`)
  }
  finally{
    await cliente.end()
    console.log('Cliente desconectado!')
  }
}


//inserindo valor no BD

async function insertCar(marca, modelo){

  try{
    console.log('Estabelecendo conexao')
    await cliente.connect()
    console.log('conexao estabelecida')

    await cliente.query('insert into carros("marca","modelo") values('+"'"+marca+"','"+modelo+"');")
    console.log('VALOR INSERIDOO')

    const resultado = await cliente.query("select * from carros")
    console.table(resultado.rows)
  }
  catch(erro){
    console.log(`erro na conexao ${erro}`)
  }
  finally{
    await cliente.end()
    console.log('cliente desconectado!')
  }
}

// remover elemento da BD

async function removeCar(modelo){
  await cliente.connect()

  await cliente.query("delete from carros where modelo = '"+modelo+"'")

  cliente.query("select * from carros")
  .then(response => console.table(response.rows))
  .catch(erro => console.log(`Erro ao deletar: ${erro}`))
  .finally(()=> {
    cliente.end()
    console.log('Cliente Desconectado!')
  })
}



//getCars()  concluido

insertCar('', 'V8')  //concluido

//removeCar('Prado')