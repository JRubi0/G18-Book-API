// Not active yet also this top section will be in the index.js file later.
// Profile Management routes that uses the db object for handling queries
// app.post('/customer/new'), db.createNewUser)           // call to create new customers
// app.get('customer/:id', db.getUserByEmail)             // call to retrieve customer by email (ADMIN?)
// app.put('/customer/details', db.updateUserDetails)     // call to update customer details
// app.post('/customer/payment', db.addCreditCard)        // call to add credit cards
// app.get('/customer/payment', db.getCreditCard)         // call to pull all cards on account

/*
//I wrote the preliminary queries for these requirements  --Bryan
//Create user
	INSERT INT customer (username, password, name, email, home_address) VALUES
	($username, $password, $name, $email, $home_address);

//Get user
	SELECT * FROM customer WHERE username LIKE "$username";

//Update user
	UPDATE customer SET $field = $newValue WHERE username = $username;

//Add credit card
	INSERT INTO credit_card (card_number, exp_date, code, email) VALUES
	($card_number, $exp_date, $code, $email);

//Get credit cards
  SELECT * FROM credit_card WHERE email LIKE "$email";

*/



// Methods need to be created for all these
module.exports = {
    //createNewUser,
    //getUserByEmail,
    //updateUserDetails,
    //addCreditCard,
    //getCreditCar
  }