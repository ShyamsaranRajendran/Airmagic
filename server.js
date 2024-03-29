const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');
const fs = require('fs/promises');  // Use fs.promises for promises-based fs functions

const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
app.use(cors()); 
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'gallery')));
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(session({
    secret: '1988',
    resave: true,
    saveUninitialized: true,
  }));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's@r@n1977',
    database: 'sign_in_data'
});
let i;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'img'));
  },
  filename: (req, file, cb) => {
    if (req.session && req.session.user && req.session.user.username !== null) {
      // User is authenticated, use username from session
      const fileName = req.session.user.username + '.png';
      cb(null, fileName);
    } else {
      // User is not authenticated, set a default filename
      cb(null, 'default.png'); // Or any other default filename you want to use
    }
  },
});

const upload = multer({ storage: storage });

// Serve your static files (images, etc.)
app.use('/img', express.static(path.join(__dirname, 'img')));

// Define a route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Log user name, image name, and date to a log file
  if (req.session.user) {
    const logData = `${req.session.user.username} uploaded ${req.file.filename} on ${new Date().toLocaleString()}\n`;
    fs.appendFile('upload-log.txt', logData, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }

  // Return a response with the image path
  const imagePath = '/img/' + req.file.filename;
  res.json({ message: 'File uploaded successfully', imagePath });
});

// Define a route to handle redirection to the login page
app.use((err, req, res, next) => {
  if (err && err.message === 'User not authenticated') {
    res.redirect('/login');
  } else {
    next(err);
  }
});

// Route to render images matching the current user's username
app.get('/gallery--1', async (req, res) => {
  try {
      // Read the list of files in the "img" folder
      const files = await fs.readdir(path.join(__dirname, 'img'));

      // Filter for image files that match the current user's username
      const imageFiles = files.filter(file => {
          const usernameInFileName = file.split('-')[0]; // Assuming the username is before the '-' in the filename
          return usernameInFileName === req.session.user.username;
      });

      // Generate HTML directly
      const htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Image Gallery for ${req.session.user.username}</title>
          </head>
          <body>
              <h1>Image Gallery for ${req.session.user.username}</h1>
              <div>
                  ${imageFiles.map(imageFile => `<img src="/img/${imageFile}" alt="${imageFile}">`).join('')}
              </div>
          </body>
          </html>
      `;

      // Send the HTML content
      res.send(htmlContent);
  } catch (error) {
      console.error('Error reading image files:', error);
      res.status(500).send('Internal Server Error');
  }
});

var sub_gal="Gallery_1";
app.get('/customize1', (req, res) => {
    res.sendFile(__dirname + '/views/subcustom.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/add',(req,res)=>{
    res.sendFile(__dirname + '/views/cartmain.html');
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
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/Home.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/Home.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.get('/sub', (req, res) => {
    res.sendFile(__dirname + '/views/sub-gallery.html');
});

app.get('/sub-gallery/:table', (req, res) => {
    sub_gal = req.params.table;
    console.log(`Showing data from table: ${sub_gal}`);
    res.redirect('/sub');
});


app.get('/customize-view/:url(*)', (req, res, next) => {
  try {
    // Assuming you are sending the URL as a parameter in the URL
    const imageUrl = `/gallery/${req.params.url}`;
    // Set the selectedImage in sessionStorage
    res.send(`<script>window.sessionStorage.setItem('selectedImage', '${imageUrl}'); window.location.href='/customize';</script>`);
  } catch (error) {
    next(error);
  }
});

app.get('/customize', (req, res) => {
  const customizePath = path.join(__dirname, 'views', 'customize.html');
  res.sendFile(customizePath);
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


 function fetchGalleryData() {
  return new Promise((resolve, reject) => {
    var Gal_id = sub_gal;
    const query = `SELECT  * FROM ${Gal_id}`;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        reject(err);
      } else {
        const galleryItems = results.map((item) => ({
          id: item.id,
          gallery_url: item.gallery_url, // Assuming the column name is 'imageUrl'
        }));
        resolve(galleryItems);
      }
    });
  });
}

// Endpoint to retrieve gallery data
app.get('/sub-gallery-img-getter', async (req, res) => {
  try {
    const galleryData = await fetchGalleryData(); // Fetch data from the database

    // Modify the data to include both id and gallery_url properties
    const formattedData = galleryData.map(item => ({
      id: item.id,
      gallery_url: item.gallery_url,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/remove-item', (req, res) => {
  console.log("remove working");
    const imageUrl = req.body.imageUrl;
    const email = req.session.user.username; 

    const query = 'SELECT `key` FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const userKey = results[0].key;
                const tableName = userKey; 

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

    connection.query(query, [userEmail], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 1) {
            const pwd = results[0].password_hash;

            // Send reset password email
            sendResetPasswordEmail(userEmail, pwd)
                .then(() => {
                    // Redirect after successful email sending
                    res.redirect('/login');
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            res.status(404).send('User not found');
        }
    });
});


// Function to send reset password email
function sendResetPasswordEmail(userEmail, pwd) {
    const nodemailer = require('nodemailer');
    require('dotenv').config(); // Load environment variables from .env file

    // Create a transporter using your Gmail account
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shyamsaran0206@gmail.com',
            pass: 'vyki efil wiww ybav',
        },
        secure: true,
        port: 465,
    });

    // Define the email options
    const mailOptions = {
        from: 'shyamsaran0206@gmail.com',
        to: userEmail, // Use the provided user email
        subject: 'Reset Password',
        text: `Hello, this is a test email from Node.js!${userEmail} Your password is: ${pwd}`,
    };

    // Return the promise for sending the email
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
      const user = { id: results[0].id, username: email };
      req.session.user = user;
      console.log('Logged in', req.session);
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
    // Check if the session exists before trying to destroy it
    if (req.session) {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
        } else {
          // Redirect or respond as needed
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/');
    }
  });
  
  // Serve a protected route
  app.get('/shyam', (req, res) => {
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
    console.log("getting imgs working");
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