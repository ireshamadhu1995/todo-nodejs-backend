const db = require("./db");
const helper = require("../helper");

async function getMultiple(search) {
  const searchCondition = search
  ? `WHERE todos.title LIKE '%${search}%' OR todos.description LIKE '%${search}%'`
  : '';

  const rows = await db.query(
    `SELECT todos.id,todos.title,todos.description,todos.status,todos.priority,todos.created_at,todos.updated_at FROM todos ${searchCondition}`
  );
  const data = helper.emptyOrRows(rows);
  if(data){
    return {
        "message": "Todo Records",
        "data":data,
        "status": 200,
        
      };
  } else {
    if(data){
        return {
            "message": "Internal Server Error",
            "data":null,
            "status": 400,
            
          };
      }
  }

 
}

async function create(todo) {

  const result = await db.query(
    `INSERT INTO todos 
    (title, description, priority, status, created_at, updated_at) 
    VALUES 
    ("${todo.title}", "${todo.description}", "${todo.priority}", "${todo.status}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  );

  let message = "Error in creating todo record";

  if (result.affectedRows) {
    message = "Todo record created successfully";
    return {"message": message, status:200 };
  }

  return { "message": message, status:400 };
}

async function getById(id) {
  const result = await db.query(
    `SELECT todos.id,todos.title,todos.description,todos.status,todos.priority,todos.created_at,todos.updated_at FROM todos WHERE id=${id}`
  );
  const data = helper.emptyOrRows(result);

  if (data) {
    return {
      message: "Todo Record Found",
      data: data,
      status: 200,
    };
  } else {
    return {
      message: "Todo Not Found",
      data: null,
      status: 404,
    };
  }

  
}

async function update(id, todo) {

  var result;

     result = await db.query(
      `UPDATE todos 
      SET title="${todo.title}", description="${todo.description}", priority="${todo.priority}", status="${todo.status}"
      WHERE id=${id}`
    );


  let message = "Error in updating todo record";

  if (result.affectedRows) {
    let message = "Successfully Updated";
    return {"message": message, status:200 };
  }

  return { "message": message, status:400 };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM todos WHERE id=${id}`
  );

  let message = "Error in deleting todo record";

  if (result.affectedRows) {
    message = "Todos record deleted successfully";
    return { "message": message,"status": 200 };
  } else {
    return { "message": message,"status": 400 }; 
  }

  
}

module.exports = {
  getMultiple,
  create,
  update,
  getById,
  remove,
};
