/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 function main(params) {
    let command = params.command || 'status';
    let ordernum= params.ordernum;
    console.log(ordernum);
//   let orderNumber = params.orderRequest.orderNumber || params.orderNumber || 'A1234';

    var ibmdb = require("ibm_db");
    dbname = 'bludb';
    hostname = `<host_name>`;
    port = <port>;
    protocol = 'TCPIP';
    uid = '<username>';
    password = '<password>';
    connStr = `DATABASE=${dbname};HOSTNAME=${hostname};PORT=${port};PROTOCOL=${protocol};UID=${uid};PWD=${password};Security=SSL`;
    
  
  let orderStatus = null;
  
  
  if(command == 'status'){
try {
      var connection = ibmdb.openSync(connStr);
      queryString = `SELECT * FROM FBL40027.ORDERS WHERE ORDER_ID='${ordernum}'`;
      console.log(queryString);
       var response = connection.querySync(queryString);
      console.log("RESPONSE: ",response[0])
      connection.closeSync();
    } catch (e) {
      console.log("some error happened here: ", e);
    }
    
    if (response.length != 0) {
    return{"response":response[0]}
    }
    else {
        return{"response":"unknown"}
    }
    
   }
}
