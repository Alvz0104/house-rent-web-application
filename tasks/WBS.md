# Work Breakdown Structure

## Milestones

### Milestone 1: Project setup and configuration
- **Status:** done
- **Priority:** medium
- **Due:** N/A

Folder setup: 
Create frontend and
Backend folders

Installation of required tools: 

1. Open the frontend folder to install necessary tools 

For frontend, we use: 
React
Bootstrap
Material UI 
Axios 
Moment
Antd
mdb-react-ui-kit
react-bootstrap

2. Open the backend folder to install necessary tools 

For backend, we use: 
cors 
bcryptjs
express
dotenv
mongoose 
Moment
Multer
Nodemon
jsonwebtoken
After the installation of all the libraries, the package.json files for the frontend looks like the one mentioned below.

After the installation of all the libraries, the package.json files for the backend looks like the one mentioned below.

### Milestone 2: Backend Development 
- **Status:** done
- **Priority:** medium
- **Due:** N/A

Setup express server 
Create index.js file in the server (backend folder). 
define port number, mongodb connection string and JWT key in env file to access it. 
Configure the server by adding cors, body-parser.

Configure MongoDB 
Import mongoose. 
Add database connection from config.js file present in config folder 
Create a model folder to store all the DB schemas like renter, owner and booking, properties schemas. 

Add authentication: for this,
You need to make a middleware folder and in that make authMiddleware.js file for the authentication of the projects and can use it.

### Milestone 3: Database Development
- **Status:** done
- **Priority:** medium
- **Due:** N/A

Set up a MongoDB database either locally or using a cloud-based MongoDB service like MongoDB Atlas.
Create a database and define the necessary collections for users, transactions, stocks and orders.
Also let’s see the detailed description for the schemas used in the database. 
For the connection of database use the code given below

### Milestone 4: Frontend Development
- **Status:** done
- **Priority:** medium
- **Due:** N/A

Setup React Application:
Bringing SB Stocks to life involves a three-step development process. First, a solid foundation is built using React.js. This includes creating the initial application structure, installing necessary libraries, and organizing the project files for efficient development. Next, the user interface (UI) comes to life. To start the development process for the frontend, follow the below steps.
Install required libraries.
Create the structure directories.
Design UI components:
Reusable components will be created for all the interactive elements you'll see on screen, from stock listings and charts to buttons and user profiles. Next, we'll implement a layout and styling scheme to define the overall look and feel of the application. This ensures a visually-appealing and intuitive interface.  Finally, a navigation system will be integrated, allowing you to effortlessly explore different sections of SB Stocks, like viewing specific stocks or managing your virtual portfolio.
Implement frontend logic:
In the final leg of the frontend development, we'll bridge the gap between the visual interface and the underlying data. It involves the below stages.
Integration with API endpoints.
Implement data binding.

### Milestone 5: Project Implementation
- **Status:** done
- **Priority:** medium
- **Due:** N/A

Finally, after finishing coding the projects we run the whole project to test it’s working process and look for bugs. Now, let’s have a final look at the working of our  Darshan Ease.

