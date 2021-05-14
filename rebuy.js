const database = {
    "customer":{
       "purchases":[
          {
             "number":"B001-002306",
             "date":"2020-01-01",
             "products":[
                {
                   "sku":"101",
                   "name":"Cat Chow 1KG"
                },
                {
                   "sku":"102",
                   "name":"Tidy Cats 2KG"
                }
             ]
          },
          {
             "number":"B001-002307",
             "date":"2020-01-15",
             "products":[
                {
                   "sku":"103",
                   "name":"Royal canin cat ultra light pouch"
                }
             ]
          },
          {
             "number":"B001-002308",
             "date":"2020-02-01",
             "products":[
                {
                   "sku":"101",
                   "name":"Cat Chow 1KG"
                }
             ]
          },
          {
             "number":"B001-002309",
             "date":"2020-03-01",
             "products":[
                {
                   "sku":"101",
                   "name":"Cat Chow 1KG"
                },
                {
                   "sku":"102",
                   "name":"Tidy Cats 2KG"
                }
             ]
          }
       ]
    }
 }



let purchases = database.customer.purchases;

// Armo un objeto vacio al cual le voy a agregar las keys de sku y fecha de compra.
const compraObjeto = {
   
}

// Funcion auxiliares de fechas.

function getDifferenceInDays(date1, date2) {
   const diffInMs = Math.abs(date2 - date1);
   return diffInMs / (1000 * 60 * 60 * 24);
 }

 
 function addDays(date, days) {
   var result = new Date(date);
   result.setDate(result.getDate() + days);
   return result;
 }


// Loop para pushear las fechas con su sku.
purchases.forEach(element => {   
   (element.products).forEach(childElement => {
      childElement.date = element.date      
      if(compraObjeto.hasOwnProperty(childElement.sku)){
         compraObjeto[childElement.sku].push(childElement.date)
      }else{
         compraObjeto[childElement.sku] = [childElement.date]
      }
   });
});

// Logica para el calculo de los dias y el OUT de los calculos.
for(let sku in compraObjeto){
   if(compraObjeto[sku].length >= 2) {          
      const lastPurchase = new Date(compraObjeto[sku].slice(-1)[0])
      const beforeLastPurchase = new Date(compraObjeto[sku].slice(-2)[0])    
      const timeDifference = getDifferenceInDays(lastPurchase, beforeLastPurchase)       
      const nextPurchase = addDays(lastPurchase, timeDifference)      
      compraObjeto[sku] = new Date (nextPurchase).toISOString().split('T')[0]
      console.log(`La compra del articulo ${sku} va a ser ${nextPurchase}`)
   }else{
      delete compraObjeto[sku]
   }
}





