const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({path:path.join(__dirname,"config.env")})

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use(express.json());
const PORT = 4001; 

const db = mysql.createConnection({
  host: process.env.DB_HOST,     
  user: process.env.DB_USERNAME,     
  password: process.env.DB_PASSWORD,  
  database: process.env.DB, 


});
if (db.state === 'disconnected') {
  console.error('Connection is closed. Reconnecting...');
  db.connect();
}


  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });


//   login

db.query(`
   CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
   );
`);

app.post('/register', (req, res) => {
  const { username, password, isAdmin } = req.body;

  // Check if the username already exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Insert the new user into the database with plain text password (not recommended)
    db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', [username, password, isAdmin], (insertErr, insertResults) => {
      if (insertErr) {
        return res.status(500).json({ error: 'Error creating user' });
      }

      // Create and return a JWT token for the newly registered user
      const token = jwt.sign({ userId: insertResults.insertId, isAdmin }, 'your-secret-key', { expiresIn: '1h' });
      res.status(201).json({ token });
    });
  });
});



// Login

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Username not found' });
    }

    const user = results[0];

    // Check if the provided password matches the stored password (you should use a proper password hashing library here)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
     const isAdmin = user.isAdmin;
    // If username and password are correct, create and return a JWT token
    const token = jwt.sign({ userId: user.id, isAdmin }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, isAdmin});
  });
});


app.put('/userupdate/:id', (req, res) => {
  const messageId = req.params.id;
  const { username, password } = req.body; // Corrected destructuring

  // Make sure to remove the extra 'id' here
  const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  db.query(sql, [username, password, messageId], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      res.send('Error updating data');
    } else {
      console.log('Data updated in MySQL');
      res.send('Data updated successfully');
    }
  });
});



app.delete('/userdelete/:id', (req, res) => {
  const messageId = req.params.id;

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [messageId], (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      res.send('Error deleting data');
    } else {
      console.log('Data deleted from MySQL');
      res.send('Data deleted successfully');
    }
  });
});


app.get('/fetchuser', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.send('Error fetching data');
    } else {
      
      res.json(results);
    }
  });
});

// product
app.post('/addproduct', (req, res) => {
  const {
    code,
    itemName, // Assuming itemName is the correct column name in the 'itemname' table
    tax,
    unit,
    category,
    mrp,
    retail,
    retail_dis,
    dealer_dis,
    dealer,
    openStock,
    purchasePrice,
    notes,
  } = req.body;

  const sql =
    'INSERT INTO product ( code, itemName, tax, unit, category, mrp, retail, retail_dis, dealer_dis, dealer, openStock, purchasePrice, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const sql2 =
    'INSERT INTO stock_data ( code,productName , category, active_stock) VALUES (?, ?, ?, ?)';
    
  db.query(sql, [
    code,
    itemName,
    tax,
    unit,
    category,
    mrp,
    retail,
    retail_dis,
    dealer_dis,
    dealer,
    openStock,
    purchasePrice,
    notes,
  ], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.send('Error inserting data');
    } else {
      console.log('Data inserted into MySQL');
      // Now, execute the second query
      db.query(sql2, [code, itemName, category, openStock], (err, result2) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          res.send('Error inserting data');
        } else {
          console.log('Data inserted into MySQL');
          res.send('Data inserted successfully');
        }
      });
    }
  });
});

//   fetch product

// API Route to Fetch Specific Columns
app.get('/fetchProduct', (req, res) => {
    const query = 'SELECT id, code, itemName, tax, unit, category, mrp, retail, retail_dis, dealer, dealer_dis, openStock, purchasePrice, notes, is_checked FROM product';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(result);
    });
  });

// update Product
  app.put('/update/:id', (req, res) => {
    const messageId = req.params.id;
    const {  code, itemName, tax, unit, category, mrp, retail, retail_dis, dealer, dealer_dis, openStock, purchasePrice, notes } = req.body;
  
    const sql = 'UPDATE product SET  code = ?, itemName =?, tax =?, unit =?, category =?, mrp =?, retail =?, retail_dis =?, dealer =?, dealer_dis =?, openStock =?, purchasePrice =?, notes= ?  WHERE id = ?';
    db.query(sql, [ code, itemName, tax, unit, category, mrp, retail, retail_dis, dealer, dealer_dis, openStock, purchasePrice, notes, messageId], (err, result) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        res.send('Error updating data');
      } else {
        console.log('Data updated in MySQL');
        res.send('Data updated successfully');
      }
    });
  });
  

//   Delete Product

  app.delete('/delete/:id', (req, res) => {
    const messageId = req.params.id;
  
    const sql = 'DELETE FROM product WHERE id = ?';
    db.query(sql, [messageId], (err, result) => {
      if (err) {
        console.error('Error deleting data from MySQL:', err);
        res.send('Error deleting data');
      } else {
        console.log('Data deleted from MySQL');
        res.send('Data deleted successfully');
      }
    });
  });


  // hide Product


  app.post('/productcheckbox', (req, res) => {
    const { id, isChecked } = req.body;
  
    // Update the database based on the checkbox state
    const sql = `UPDATE  product SET is_checked = ${isChecked ? 1 : 0} WHERE id = ${id}`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(`Checkbox for row with ID ${id} toggled to ${isChecked ? 'checked' : 'unchecked'}`);
      res.json({ success: true });
    });
  });
  



// Customer
app.post('/addcustomer', (req, res) => {

  const { cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website } = req.body;

  const sql = 'INSERT INTO customer (  cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [ cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.send('Error inserting data');
    } else {
      console.log('Data inserted into MySQL');
      res.send('Data inserted successfully');
    }
  });
});


// fech customer
app.get('/fetchCustomer', (req, res) => {
  const query = 'SELECT id, cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website FROM customer';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});

// Update Customer

app.put('/updateCustomer/:id', (req, res) => {
  const messageId = req.params.id;
  const {  cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website } = req.body;

  const sql = 'UPDATE customer SET cus_name=?, cust_type=?, address=?, city=?, pincode=?, state=?, statecode=?, mobile=?, cperson=?, gstno=?, panno=?, email=?, website=? WHERE id = ?';
  db.query(sql, [ cus_name, cust_type, address, city, pincode, state, statecode, mobile, cperson, gstno, panno, email, website, messageId], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      res.send('Error updating data');
    } else {
      console.log('Data updated in MySQL');
      res.send('Data updated successfully');
    }
  });
});


//   Delete Customer

app.delete('/deleteCustomer/:id', (req, res) => {
  const messageId = req.params.id;

  const sql = 'DELETE FROM customer WHERE id = ?';
  db.query(sql, [messageId], (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      res.send('Error deleting data');
    } else {
      console.log('Data deleted from MySQL');
      res.send('Data deleted successfully');
    }
  });
});

// fetch Customer Name 

app.get('/fetch/cust_name', (req, res) => {
  const query = 'SELECT cus_name FROM customer'; // Use 'cus_name' instead of 'name'
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      const dropdownData = results.map((row) => row.cus_name); // Use 'cus_name' here
      res.json(dropdownData);
    }
  });
});


app.get('/fetchCustData/:name', (req, res) => {
  const name = req.params.name;
  const query = `SELECT * FROM customer WHERE cus_name = ?`;
 
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        const custData = results[0];
        res.json(custData);
      }
    }
  });
});


  // Add Supplier

  app.post('/addsupplier', (req, res) => {

    const { bshortName, bfullName, addr1, addr2, city, pincode, state, statecode, mobile, contactPerson, gstNo, panNo, email, website } = req.body;
  
    const sql = 'INSERT INTO suppliers ( bshortName, bfullName, addr1, addr2, city, pincode, state, statecode, mobile, contactPerson, gstNo, panNo, email, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ bshortName, bfullName, addr1, addr2, city, pincode, state, statecode, mobile, contactPerson, gstNo, panNo, email, website], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.send('Error inserting data');
      } else {
        console.log('Data inserted into MySQL');
        res.send('Data inserted successfully');
      }
    });
  });

  // fetch supplier Name

  app.get('/fetch/sup_name', (req, res) => {
    const query = 'SELECT bfullName   FROM suppliers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        const dropdownData = results.map((row) => row.bfullName);
        res.json(dropdownData);
      }
    });
  });

  // fetch Supplier

  app.get('/fetchsuppliers', (req, res) => {
    const sql = 'SELECT * FROM suppliers';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.send('Error fetching data');
      } else {
     
        res.json(results);
      }
    });
  });
  
  // update suplier 

  app.put('/updatesupplier/:id', (req, res) => {
    const supplierId = req.params.id;
    const updatedData = req.body;
    const sql = 'UPDATE suppliers SET ? WHERE id = ?';
  
    db.query(sql, [updatedData, supplierId], (err, result) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        res.send('Error updating data');
      } else {
        console.log('Data updated in MySQL');
        res.send('Data updated successfully');
      }
    });
  });
  // delete supplier

  app.delete('/deletesupplier/:id', (req, res) => {
    const supplierId = req.params.id;
    const sql = 'DELETE FROM suppliers WHERE id = ?';
  
    db.query(sql, [supplierId], (err, result) => {
      if (err) {
        console.error('Error deleting data from MySQL:', err);
        res.send('Error deleting data');
      } else {
        console.log('Data deleted from MySQL');
        res.send('Data deleted successfully');
      }
    });
  });
  

// fetch productdata

// item code 

  app.post('/fetchitemCode', (req, res) => {
  const userInput = req.body.code; // Assuming the user input is provided as "code" field in the request body

  // Query to fetch all columns for rows matching the user input in the 'code' column
  const query = `SELECT * FROM product WHERE code = ?`;

db.query(query, [userInput], (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }

    res.status(200).json({ data: results });

    // No need to manually close the database connection here
  });
});


// item name


app.get('/api/suggestions', (req, res) => {
  const query = req.query.q.toLowerCase();
  const sql = 'SELECT DISTINCT itemName FROM product WHERE itemName LIKE ?';
  const params = [`%${query}%`];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    const itemName = results.map((row) => row.itemName);
    res.json(itemName);
  });
});


app.get("/fetchItemData/:itemName", (req, res) => {
  const itemName = req.params.itemName;
  const query = `SELECT * FROM product WHERE itemName LIKE ?`;
  
  const searchItemName = '%' + itemName + '%';
  
  db.query(query, searchItemName, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        const itemData = results[0];
        res.json(itemData);
      }
    }
  });
});



app.post('/addcategory', (req, res) => {

  const { category_name } = req.body;

  const sql = 'INSERT INTO category (category_name) VALUES (?)';
  db.query(sql, [category_name], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.send('Error inserting data');
    } else {
      console.log('Data inserted into MySQL');
      res.send('Data inserted successfully');
    }
  });
});


//   fetch product

// API Route to Fetch Specific Columns
app.get('/fetchcategory', (req, res) => {
  const query = 'SELECT id, category_name FROM category';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});

// update Category
app.put('/updatecategory/:id', (req, res) => {
  const messageId = req.params.id;
  const { category_name } = req.body;

  const sql = 'UPDATE category SET  category_name = ?  WHERE id = ?';
  db.query(sql, [category_name, messageId], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      res.send('Error updating data');
    } else {
      console.log('Data updated in MySQL');
      res.send('Data updated successfully');
    }
  });
});


//   Delete Category

app.delete('/deletecategory/:id', (req, res) => {
  const messageId = req.params.id;

  const sql = 'DELETE FROM category WHERE id = ?';
  db.query(sql, [messageId], (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      res.send('Error deleting data');
    } else {
      console.log('Data deleted from MySQL');
      res.send('Data deleted successfully');
    }
  });
});

// purchase Entry

app.post('/purchase', async (req, res) => {
  const purchaseData = req.body.data;

  // Validate and format date fields
  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    if (year < 1000 || year > 9999 || month === 0 || month > 12) return false;
    const maxDays = new Date(year, month, 0).getDate();
    if (day === 0 || day > maxDays) return false;
    return true;
  }

  const invoice_date = isValidDate(req.body.invoice_date) ? req.body.invoice_date : null;
  const pur_order_date = isValidDate(req.body.pur_order_date) ? req.body.pur_order_date : null;
  const eway_bill_date = isValidDate(req.body.eway_bill_date) ? req.body.eway_bill_date : null;
  const due_date = isValidDate(req.body.due_date) ? req.body.due_date : null;
  const current_date= isValidDate(req.body.current_date) ? req.body.current_date : null;
  
  // ... (Your date validation logic here) ...

  // Map and format data for insertion into the database
  const formattedData = purchaseData.map((item) => {
    return [
      req.body.bill_No,
      req.body.sup_name,
      item.code,
      item.itemName,
      item.inputQtyText,
      item.inputPriceText,
      item.discount,
      item.Transportcost,
      item.tax,
      item.totalValue,
      req.body.lr_no,
      req.body.trans_name,
      req.body.pur_order_no,
      pur_order_date,
      due_date,
      req.body.eCom_gst,
      req.body.eway_bill_no,
      eway_bill_date,
      req.body.notes,
      invoice_date,
      current_date,
      req.body.current_time
    ];
  });

  // Define the SQL query with placeholders for a single row
  const query = `
    INSERT INTO purchaseentry (
      bill_no, sup_name, code, itemName, item_qty, item_price, discount, transportCost, tax, totalValue, lr_no, transportName, po_num, po_date, due_date, ecom_gstn, eway_billno, eway_bill_date, notes, invoice_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const insertPromises = formattedData.map((element) => {
      return new Promise((resolve, reject) => {
        db.query(query, element, (err, result) => {
          if (err) {
            console.error('Error inserting purchase data: ' + err.message);
            reject(err);
          } else {
            console.log('Purchase data saved successfully');
            resolve(result);
          }
        });
      });
    });

    // Wait for all insertions to complete
    await Promise.all(insertPromises);

    // Perform the stock updates
    const values1 = purchaseData.map((item) => [item.inputQtyText, item.code]);
    console.log('Item Codes to Update:', values1.map(item => item[1])); // Log the item codes

    const query2 = `UPDATE stock_data SET active_stock = active_stock + ? WHERE code LIKE ?`;
    
    const updatePromises = values1.map((element2) => {
      return new Promise((resolve, reject) => {
        db.query(query2, element2, (error2, result2) => {
          if (error2) {
            console.error('Error executing the query:', error2);
            reject(error2);
          } else {
            console.log('Query results:', result2);
            resolve(result2);
          }
        });
      });
    });
    
   

    // Wait for all stock updates to complete
    await Promise.all(updatePromises);

    const values2 = purchaseData.map((item) => [item.code]);

    const query3 = `SELECT code, active_stock FROM stock_data WHERE code = ?`;

    for (let index = 0; index < values2.length; index++) {
      const element2 = values2[index];
      db.query(query3, element2, (err, result3) => {
        if (err) {
          console.error('Error inserting item code: ' + err.message);
          // reject(err);
        } else {
          console.log('active Stock', result3);

 
          const values3 = purchaseData.map((item) =>{
            const matchingResult = result3.find((resultItem) => resultItem.code === item.code);
            return [
              item.code,
              item.itemName,
              item.inputQtyText,
              matchingResult ? matchingResult.active_stock : null,
              current_date,
              req.body.current_time
            ];
          }
          );
          const filteredValues3 = values3.filter((row) => row[3] !== null);
          

            console.log("value3:", filteredValues3);

          const insertQuery = `INSERT INTO stock_history (itemCode, itemName, purchase, currentStock, date, time) VALUES (?, ?, ?, ?, ?, ?)`;
         for (let index = 0; index < filteredValues3.length; index++) {
          const element4 = filteredValues3[index];

        

          db.query(insertQuery,element4, (error4, result4) => {
            if (error4) {
              console.error('Error executing the query:', error4);
              
            } else {
              console.log('add succesfull:', result4);
             
            }
          });
          
         }
        }
      });
      
    }

  

    res.status(200).json({ message: 'Purchase data and stock updates saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).json({ error: 'Error saving data' });
  }
});

// Bill Entry
app.post('/billEntey', async (req, res) => {

  try {

    if (!Array.isArray(req.body.data)) {
      throw new Error("req.body.data is not an array");
    }
    const billData = req.body.data;
    console.log("req.body:", req.body);

  
    console.log("billdata",billData)
  
    // Validate and format date fields
    function isValidDate(dateString) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateString)) return false;
      const parts = dateString.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      if (year < 1000 || year > 9999 || month === 0 || month > 12) return false;
      const maxDays = new Date(year, month, 0).getDate();
      if (day === 0 || day > maxDays) return false;
      return true;
    }
  
    const date = isValidDate(req.body.date) ? req.body.date : null;
  
    // Map and format data for insertion into the database
    const formattedData = billData.map((item) => {
      return [
        date,
        req.body.time,
        req.body.bill_No,
        req.body.cus_name,
        item.code,
        item.itemName,
        item.price,
        item.inputQtyText,
        item.totalValue,
        req.body.bill_date
      ];
    });
  
    // Define the SQL query with placeholders for a single row
    const query = ` INSERT INTO  salesbill(
      date, time, bill_no,  cus_name,  code, itemName, qty, sell, total, bill_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const insertPromises = formattedData.map((element) => {
      return new Promise((resolve, reject) => {
        db.query(query, element, (err, result) => {
          if (err) {
            console.error('Error inserting purchase data: ' + err.message);
            reject(err);
          } else {
            console.log('bill data saved successfully');
            resolve(result);
            // console.log(result);
          }
        });
      });
    });

    // Wait for all insertions to complete
    await Promise.all(insertPromises);

    // Perform the stock updates
    const values1 = billData.map((item) => [item.inputQtyText, item.code]);

    
    console.log('Item Codes to Update:', values1.map(item => item[1])); // Log the item codes

    const query2 = `UPDATE stock_data SET active_stock = active_stock - ? WHERE code = ?`;
    
    const updatePromises = values1.map((element2) => {
      return new Promise((resolve, reject) => {
        db.query(query2, element2, (error2, result2) => {
          if (error2) {
            console.error('Error executing the query:', error2);
            reject(error2);
          } else {
            // console.log('Query results:', result2);
            resolve(result2);
          }
        });
      });
    });
    
   

    // Wait for all stock updates to complete
    await Promise.all(updatePromises);

    const values2 = billData.map((item) => [item.code]);

    const query3 = `SELECT code, active_stock FROM stock_data WHERE code = ?`;

    for (let index = 0; index < values2.length; index++) {
      const element2 = values2[index];
      db.query(query3, element2, (err, result3) => {
        if (err) {
          console.error('Error inserting item code: ' + err.message);
          // reject(err);
        } else {
          console.log('active Stock', result3);

 
          const values3 = billData.map((item) =>{
            const matchingResult = result3.find((resultItem) => resultItem.code === item.code);
            return [
              item.code,
              item.itemName,
              item.inputQtyText,
              matchingResult ? matchingResult.active_stock : null,
              date,
              req.body.time,
            ];
          }
          );
          const filteredValues3 = values3.filter((row) => row[3] !== null);
          

            console.log("value3:", filteredValues3);

          const insertQuery = `INSERT INTO stock_history (itemCode, itemName, sales, currentStock, date, time) VALUES (?, ?, ?, ?, ?, ?)`;
         for (let index = 0; index < filteredValues3.length; index++) {
          const element4 = filteredValues3[index];

        

          db.query(insertQuery,element4, (error4, result4) => {
            if (error4) {
              console.error('Error executing the query:', error4);
              
            } else {
              console.log('add succesfull:', result4);
             
            }
          });
          
         }
        }
      });
      
    }

    res.status(200).json({ message: 'bill data and stock updates saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).json({ error: 'Error saving data' });
  }
});


app.post('/salesBillDetails', (req, res) =>{
 
  const {
    bill_num ,
    cust_Name ,
    subTotal ,
    discount ,
    taxable_value ,
    cgst ,
    sgst ,
    tot_item ,
    total_qty ,
    delivery_charge ,
    round_off ,
    total_bill_ammount ,
    mobile_num ,
    payment_type ,
    bill_pay_amt ,
    upi_ammount ,
    total_paid,
    balance_amt ,
    Bill_Time ,
  } = req.body;




  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    if (year < 1000 || year > 9999 || month === 0 || month > 12) return false;
    const maxDays = new Date(year, month, 0).getDate();
    if (day === 0 || day > maxDays) return false;
    return true;
  };

  const Bill_Date =  isValidDate(req.body.Bill_Date) ? req.body.Bill_Date : null;

  const query = ` INSERT INTO  salesbill_details (
    bill_no,
    cus_name, 
    sub_total, 
    cash_discount, 
    taxable_value, 
    cgst, 
    sgst, 
    total_item, 
    total_qty, 
    delivery_charge, 
    round_off, 
    total_bill_ammount, 
    mobile, 
    payment_type, 
    bill_cash_amount, 
    upi_ammunt, 
    total_paid,
    balance, 
    date, 
    time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [ 
      bill_num ,
      cust_Name ,
      subTotal ,
      discount ,
      taxable_value ,
      cgst ,
      sgst ,
      tot_item ,
      total_qty ,
      delivery_charge ,
      round_off ,
      total_bill_ammount ,
      mobile_num ,
      payment_type ,
      bill_pay_amt ,
      upi_ammount ,
      total_paid,
      balance_amt ,
      Bill_Date,
      Bill_Time ], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.send('Error inserting data');
      } else {
        console.log('Data inserted into MySQL');
        res.send('Data inserted successfully');
      }
    });
});


app.get('/fetchSalesBill', (req, res) => {
  const query1 = 'SELECT  date, time, bill_no, cus_name, code, itemName, qty, sell, total, bill_date FROM salesbill';
  db.query(query1, (err, result1) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result1);
  });
});

app.get('/fetchBillWise', (req, res) => {
  const query = 'SELECT  bill_no, cus_name, sub_total, cash_discount, taxable_value, cgst, sgst, total_item, total_qty, delivery_charge, round_off, total_bill_ammount, mobile, payment_type, bill_cash_amount, upi_ammunt, balance, date, time FROM salesbill_details';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});

// stock view

app.get('/fetchBillWise', (req, res) => {
  const query = 'SELECT  bill_no, cus_name, sub_total, cash_discount, taxable_value, cgst, sgst, total_item, total_qty, delivery_charge, round_off, total_bill_ammount, mobile, payment_type, bill_cash_amount, upi_ammunt, balance, date, time FROM salesbill_details';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});


app.get('/fetchStockViewData', (req, res) => {
  const query = 'SELECT  code, productName, category, active_stock  FROM stock_data';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});

app.get('/fetchStockHistoryData', (req, res) => {
  const query = 'SELECT  itemCode, itemName, purchase, sales, machine_use, currentStock, date, time  FROM stock_history';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(result);
  });
});

app.get('/api/billDataview', (req, res) => {
  const { cus_name, date } = req.query;

  // Perform SQL query to fetch sales data
  const salesSql = `
    SELECT c.cus_name, s.date,s.time, c.itemName, c.sell, c.qty, c.total, s.sub_total, s.taxable_value, s.total_item, s.total_qty, s.payment_type, s.bill_no, s.balance, s.cash_discount, s.round_off, s.total_paid, s.bill_cash_amount, s.upi_ammunt, s.total_bill_ammount
    FROM salesbill AS c
    INNER JOIN salesbill_details AS s ON c.cus_name = s.cus_name
    WHERE c.cus_name = ? AND s.date = ?;
  `;

  // Execute the salesSql query
  db.query(salesSql, [cus_name, date], (salesErr, salesResults) => {
    if (salesErr) {
      console.error('Error executing SQL query for sales data: ', salesErr);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the sales results as a JSON response
    res.json(salesResults);
  });
});

// machine
app.get('/api/search', (req, res) => {
  const itemName = req.query.itemName || '';
  const category = req.query.category || '';
  const searchItemName = '%' + itemName + '%';
  const searchCategory = '%' + category + '%';

  const sql = `
    SELECT itemName
    FROM product
    WHERE category LIKE ? AND itemName LIKE ?
  `;

  const params = [searchCategory, searchItemName];

  // Execute the query
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Send the results as JSON
    res.json(results);
  });




});

app.get('/machinePrice', (req, res) => {
  const itemName = req.query.itemName ;
  const searchItemName = '%' + itemName + '%';
  console.log("searchItemPrice",itemName)
  const sql = 'SELECT  dealer, code FROM product WHERE itemName LIKE ?';
  db.query(sql, searchItemName, (err, results) => {
   if (err) {
     console.error(err);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
   // Send the results as JSON
   res.json(results);
 });

})

app.put('/updateMachineStock',async (req, res) => {
  const machineData = req.body.data;
  const mergedData = machineData.map(item => ({
    code: item.cabinet_code || item.pump_code || item.pumpPlate_code || item.pumpElbow_code || item.sv_code || item.svElbow_code || item.smps_code || item.preCarbon_code || item.sediment_code || item.postCarbon_code || item.copper_code || item.uv_code || item.uf_code || item.alkline_code || item.doublePushElbow_code || item.membraneHousing_code || item.membraneElbow_code || item.fr_code || item.dolphinFloat_code || item.dolphin_code || item.bulkit_code || item.tap_code || item.taflon_code || item.tube_code || item.cupLink_code || item.onof_code || item.wire_code || item.clamp_code,
    ItemName: item.cabinet_name || item.pump_name || item.pumpPlate_name || item.pump_elbow || item.sv_name || item.svElbow_name || item.smps_name || item.preCarbon_name || item.sediment_name || item.postCarbon_name || item.copper_name || item.uv_name || item.uf_name || item.alkline_name || item.doublePushElbow_name || item.membraneHousing_name || item.membraneElbow_name || item.fr_name || item.dolphinFloat_name || item.dolphin_name || item.bulkit_name || item.tap_name || item.taflon_name || item.tube_name || item.cupLink_name || item.onof_name || item.wire_name || item.clamp_name,
    qty: item.cabinet_qty || item.pump_qty || item.pumpPlate_qty || item.pump_elbow_qty || item.sv_qty || item.svElbow_qty || item.smps_qty || item.preCarbon_qty || item.sediment_qty || item.postCarbon_qty || item.copper_qty || item.uv_qty || item.uf_qty || item.alkline_qty || item.doublePushElbow_qty || item.membraneHousing_qty || item.membraneElbow_qty || item.fr_qty || item.dolphinFloat_qty || item.dolphin_qty || item.bulkit_qty || item.tap_qty || item.taflon_qty || item.tube_qty || item.cupLink_qty || item.onof_qty || item.wire_qty || item.clamp_qty,
  }));
console.log("machine data", mergedData);

const values = mergedData.map((item) => [item.qty, `%${item.code}%`]);

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (year < 1000 || year > 9999 || month === 0 || month > 12) return false;
  const maxDays = new Date(year, month, 0).getDate();
  if (day === 0 || day > maxDays) return false;
  return true;
}

const date = isValidDate(req.body.date) ? req.body.date : null;

console.log("values", values)



const query2 = `UPDATE stock_data SET active_stock = active_stock - ? WHERE code LIKE ?`;
    
const updatePromises = values.map((element2) => {
  return new Promise((resolve, reject) => {
    db.query(query2, element2, (error2, result2) => {
      if (error2) {
        console.error('Error executing the query:', error2);
        reject(error2);
      } else {
         console.log('Query results:', result2);
        resolve(result2);
      }
    });
  });
});



// Wait for all stock updates to complete
await Promise.all(updatePromises);

const values2 = mergedData.map((item) => [`%${item.code.trim()}%`]);

console.log("value2", values2)
const query3 = `SELECT code, active_stock FROM stock_data WHERE code LIKE ?`;

for (let index = 0; index < values2.length; index++) {
  const element2 = values2[index];
  db.query(query3, element2, (err, result3) => {
    if (err) {
      console.error('Error inserting item code: ' + err.message);
      // reject(err);
    } else {
      console.log('active Stock', result3);


      const values3 = mergedData.map((item) =>{
        const matchingResult = result3.find((resultItem) => resultItem.code === item.code);
        return [
          item.code,
          item.ItemName,
          item.qty,
          matchingResult ? matchingResult.active_stock : null,
          date,
          req.body.time,
        ];
      }
      );
      const filteredValues3 = values3.filter((row) => row[3] !== null);
      

        console.log("value3:", filteredValues3);

      const insertQuery = `INSERT INTO stock_history (itemCode, itemName, machine_use, currentStock, date, time) VALUES (?, ?, ?, ?, ?, ?)`;
     for (let index = 0; index < filteredValues3.length; index++) {
      const element4 = filteredValues3[index];

    

      db.query(insertQuery,element4, (error4, result4) => {
        if (error4) {
          console.error('Error executing the query:', error4);
          
        } else {
          console.log('add succesfull:', result4);
         
        }
      });
      
     }
    }
  });
  
}

res.status(200).json({ message: 'bill data and stock updates saved successfully' });


});
db.end();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
