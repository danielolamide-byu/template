

const pool = require('../database');

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
};

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
};

async function getAccountUsers(account_id) {
  try {
    const result = await pool.query(`SELECT * FROM account WHERE account_id = $1`, [account_id])
    return result.rows[0]
  } catch (error) {
    console.log("Error", error);
  }
};

async function getUserId() {
  try {
    return await pool.query(`SELECT * FROM public.account`)
    
  } catch (error) {
    console.log("Not connected", error)
  }
};



/************************ */
async function updateAccount(
  account_id,
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const sql =
      "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3, account_password = $4 WHERE account_id = $5 RETURNING *"
    const data = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
      Number(account_id)
      
    ])
    console.log(data.rowCount)
    console.log(account_id)
    console.log(account_id)
    console.log(account_id)
    console.log(account_id)
    console.log(data.rows)

    return data
  } catch (error) {
    console.error("model error: " + error)
  }
}


module.exports = { registerAccount, getAccountByEmail, getAccountUsers, getUserId, updateAccount };

