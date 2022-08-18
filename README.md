# Ecommerce-APP-PROJECT

In this project, I created a full stack E-commerce store website.
The website is fully functional as the client is able to :
 
- View the homepage and browse several different products for sale
- View the details of each product , write a review, and give a rating out of 5
- Create an account and sign in to make orders
- Add items to cart and find out the total price
- choose payment method and pay for order
- track order

BONUS FEATURES: 

- Admin users can add, delete, and update products
- Admin users can mark order as paid or delivered 
- Admin users and view all accounts registered 


# Technology Used

For the server-side in the backend folder the following technologies and frameworks were used:

- Node JS and Express JS to build a backend REST API with routing
- MongoDB NoSQL database and mongoose to store users, products,and reviews, and also perform queries on data
- used multer middleware to be able to upload files to backend
- morgan to track requests and responses
- Custom error middleware
- Custom middleware to protect routes from users with no account and non-admin users
- JSON WEB TOKEN for authorization

For the client side in the frontend folder the following technologies and frameworks were used:

- React JS framework/library for javascript for building user interface
- React Router to implement a single page application
- React Bootstrap for styled components
- Axios for fetching data from backend API 
- Redux for state managment in a big application
- PAYPAL API to handle payments

