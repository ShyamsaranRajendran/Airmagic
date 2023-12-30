const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 
const app = express();
app.use(cors()); 
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// Use express.urlencoded middleware to parse form data
//app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '1988',
    resave: false,
    saveUninitialized: true,
  }));
// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's@r@n1977',
    database: 'sign_in_data'
});

// Define routes for different pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/add',(req,res)=>{
    res.sendFile(__dirname + '/views/cart.html');
})
app.get('/buy-now', (req, res) => {
    res.sendFile(__dirname + '/views/buy-now.html');
});
app.get('/forgot-password', (req, res) => {
    res.sendFile(__dirname + '/views/forgot-password.html');
});
app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/views/sign-in.html');
});

app.get('/gallery', (req, res) => {
    res.sendFile(__dirname + '/views/gallery.html');
});

app.get('/customize', (req, res) => {
    res.sendFile(__dirname + '/views/customize.html');
});

app.post('/buy-now-item', (req, res) => {
    const imageUrl = req.body.imageUrl;
    const currentDate = new Date();
    const username = req.session.user.username;

    // Log data
    const logData = `Date: ${currentDate.toDateString()}, Username: ${username}, Image URL: ${imageUrl}\n`;
    const filePath = 'data/log.txt';

    // Append data to the log file
    fs.appendFile(filePath, logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data written to log file successfully.');
            res.json({ success: true, message: 'Buy Now success' });
        }
    });
});

app.post('/remove-item', (req, res) => {
    const imageUrl = req.body.imageUrl;
    const email = req.session.user.username; // Get the email from the session

    // Step 1: Find the user's key
    const query = 'SELECT `key` FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const userKey = results[0].key;
                const tableName = userKey; // Use the user's key as the table name

                // Step 2: Check if the table exists, if not, create it
                const createTableSQL = `
                    CREATE TABLE IF NOT EXISTS ${tableName} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        img_url VARCHAR(255) NOT NULL
                    )
                `;
                connection.query(createTableSQL, (err, result) => {
                    if (err) {
                        console.error('Error creating table:', err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        console.log(`Table ${tableName} created.`);

                        // Step 3: Delete the image from the user's cart
                        const removeSQL = `DELETE FROM ${tableName} WHERE img_url = ?`;
                        connection.query(removeSQL, [imageUrl], (err, result) => {
                            if (err) {
                                console.error('Error deleting data:', err);
                                res.status(500).send('Internal Server Error');
                            } else {
                                console.log('Image deleted from user cart successfully.');
                                res.status(200).send('Image deleted from cart successfully');
                            }
                        });
                    }
                });
            } else {
                console.log('User not found.');
                res.status(404).send('User not found');
            }
        }
    });
});


app.post('/process-form', (req, res) => {
    // Access form data from the request
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const quantity = req.body.quantity;

    // Process the form data as needed
    console.log('Received form data:');
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Phone Number:', phone);
    console.log('Quantity:', quantity);

    // You can send a response to the client here
    res.send('Form submitted successfully');
});

app.post('/forgot-password', (req, res) => {
    const userEmail = req.body.forgotEmail;
    const query = 'SELECT * FROM users WHERE email = ?';
    let pwd;
    connection.query(query, [userEmail], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (results.length === 1) {
       
        pwd= results[0].password;

        // For demonstration purposes only, sending the password (not recommended in production)
       // res.send(`User found. Password: ${user.password}`);
        res.redirect('/login');
      }
    });
    // Send reset password email
    sendResetPasswordEmail(userEmail,pwd)
        .then(() => {
            res.send('Password reset email sent successfully.');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).send('Internal Server Error');
        });
});

// Function to send reset password email
function sendResetPasswordEmail(userEmail) {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sarancode6@gmail.com', // Replace with your Gmail email
            pass: 'your' // Replace with your Gmail password or an app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'sarancode6@gmail.com',
        to: userEmail,
        subject: 'Password Reset',
        text: 'You requested a password reset.Your password ${pwd}'
    };

    // Send email
    return transporter.sendMail(mailOptions);
}

const userSessions = {};

// ... (other route handlers)
// Handle login form submission
// Handle login form submission
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      if (results.length === 1) {
        // User authenticated
        const user = { id: 1, username: email };
        req.session.user = user;
        userSessions[req.sessionID] =user; // Add user session
        res.redirect('/');
      } else {
        // Authentication failed
        console.log('Login failed');
        res.status(401).send('Unauthorized');
      }
    });
  });
  
  // Handle logout
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  });
  
  // Serve a protected route
  app.get('/op', (req, res) => {
    if (req.session.user) {
      res.send('Welcome, ' + req.session.user.username);
    } else {
      res.redirect('/login');
    }
  });
  
// Function to generate a unique key
function generateUniqueKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
  }
  return key;
}

// Function to check if a key already exists in the database
function isKeyInDatabase(key, callback) {
    const query = 'SELECT * FROM users WHERE `key` = ?';

    connection.query(query, [key], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results.length > 0);
        }
    });
}

// Function to create a user with a unique key
function createUserWithUniqueKey(userInformation, callback) {
    let key;
    function generateKeyAndInsert() {
        key = generateUniqueKey();
        isKeyInDatabase(key, (err, exists) => {
            if (err) {
                callback(err);
            } else if (exists) {
                generateKeyAndInsert(); // Try again if the key exists
            } else {
                callback(null, key);
            }
        });
    }

    generateKeyAndInsert();
}

app.post('/submit', (req, res) => {
    const password_hash = req.body.pwd;
    const email = req.body.email;
    const repeat_password = req.body.psw;

    if (password_hash === repeat_password) {
        const userInformation = {
            email: email,
            pwd: password_hash, // Make sure this is the correct field name
            // Add other user details
        };

        createUserWithUniqueKey(userInformation, (err, uniqueKey) => {
            if (err) {
                console.error('Error creating user with a unique key:', err);
                res.status(500).send('Error creating user');
            } else {
                console.log(`User with unique key ${uniqueKey} created successfully.`);
                req.session.user = { username: email };

                const query = 'INSERT INTO users (password_hash, email, `key`) VALUES (?, ?, ?)';

                connection.query(query, [password_hash, email, uniqueKey], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        res.status(500).send('Error inserting data');
                    } else {
                        console.log('Data inserted successfully:', result);
                        res.redirect('/');
                    }
                });
            }
        });
    } else {
        const errorMessage = "Password and Repeat Password do not match.";
        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
});

  

app.post('/addToCart', (req, res) => {
    const imageUrl = req.body.imageUrl;
    
    // Check if the user is authenticated and the email is available in the session
    if (!req.session.user || !req.session.user.username) {
      console.log('User not authenticated.');
      return res.status(401).send('User not authenticated');
    }
  
    const email = req.session.user.username;
  
    // Query to get the key associated with the user's email
    const query = 'SELECT `key` FROM users WHERE email = ?';
  
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.length > 0) {
        const userKey = results[0].key;
        const tableName = userKey; // Use the user's key as the table name
        
        // Query to create a table if it doesn't exist
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            img_url VARCHAR(255) NOT NULL
          )
        `;
  
        connection.query(createTableSQL, (err, result) => {
          if (err) {
            console.error('Error creating table:', err);
            return res.status(500).send('Internal Server Error');
          }
  
          console.log(`Table ${tableName} created or already exists.`);
  
          // Query to insert data into the user's table
          const insertDataSQL = 'INSERT INTO ' + tableName + ' (img_url) VALUES (?)';
          
          connection.query(insertDataSQL, [imageUrl], (err, result) => {
            if (err) {
              console.error('Error inserting data:', err);
              return res.status(500).send('Internal Server Error');
            }
  
            console.log('Image added to user cart successfully.');
            return res.status(200).send('Image added to cart successfully');
          });
        });
      } else {
        console.log('User not found.');
        return res.status(404).send('User not found');
      }
    });
  });
  

  
  app.get('/get-session-id', (req, res) => {
    const sessionId = req.sessionID;
    res.send(`Session ID: ${sessionId}`);
});
app.get('/user', (req, res) => {
    const user = userSessions[req.sessionID];
    if (user) {
      res.json(user);
    } else {
      res.status(401).send('Not logged in');
    }
  });


  app.get('/getImages', (req, res) => {
    const email = req.session.user.username; // Get the email from the session
    const query = 'SELECT `key` FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            if (results.length > 0) {
                const userKey = results[0].key;
                const tableName = userKey; // Use the user's key as the table name
                const query = `SELECT img_url FROM ${tableName}`;
                connection.query(query, [], (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'An error occurred' });
                    } else {
                      console.log('Fetched image URLs:', result); // Log the result
                        res.json(result);
                    }
                });
            } else {
                console.log('User not found.');
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});