## EYECARE: A Mobile and Web Application for Optical Care Using Descriptive Analyics

The primary goal of the application is to provide a comprehensive platform that bridges the gap between patients and healthcare providers, ensuring convenient access to essential eye care services. This project is developed using MERN Stack Components (MongoDB, Express, React, and Node.js).

![image](https://github.com/user-attachments/assets/b735414d-9b03-4578-ac14-f97e4d1c2bff)
![Screenshot 2024-10-21 002831](https://github.com/user-attachments/assets/f4940437-f3db-4339-8d22-3528b48a2fd1)

# **Features**

### **User:**
- **Virtual Try-On:**
  - This is one of the features of the system where the customer can have a virtual try-on of the available eye wear at the optical clinic.

- **Online Consultation Booking:**
  - In the consultation booking, patient can book appointment consultation with the optometrist by filling in the required fields for personal details and choosing date and time slot.

### **Admin:**
- **Descriptive Analytics:**
  - This is where the doctor can see the overview of monthly sales and monthly customers/patients of the clinic. The total count of orders, customers, and patients
are also shown on the topo area as well as the total sales of the month.

# **Project Setup**

### Prerequisites
- Node.js ( version v21.1.0 or later )
- MongoDB Atlas account

### Clone the project

```bash
  git clone https://github.com/karyllrivs/Eye-Care-Web.git
```

### Navigate to the project directory

```bash
  cd eye-care-web
```

### Install dependencies for frontend and backend separately
**Tip:** To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend and backend dependencies in a separate terminal
```bash
npm install
```

### Environment Variables
**Backend**
- Create a `.env` file in the `backend` directory.
- Add the following variables with appropriate values
```bash
# Database connection string
MONGO_URI="mongodb://localhost:27017/your-database-name"
MONGODB_NAME="your_database_name"

# Frontend URL (adjust if needed)
SERVER_URL="http://localhost:8000"
PORT=8000

# Email credentials for sending password resets and OTPs
NODEMAILER_EMAIL="your-email@example.com"
NODEMAILER_PASSWORD="your_email_password"

# Token and cookie expiration settings
AUTH_COOKIE_NAME="your_cookie_name"

# Secret key for jwt security
SECRET_KEY="your-secret-key"

# Set up Payment Gateway
PAYMONGO_PK="your_public_key"
PAYMONGO_SK="your_secret_key"

**Important**
- Replace all placeholders (e.g., your_database_name, your_email) with your actual values.
- Exclude the `.env` file from version control to protect sensitive information.

**Important:**

- **Separate terminals**: Run the commands in separate terminal windows or use `split terminal` to avoid conflicts.
- **Nodemon required**: Ensure you have `nodemon` installed globally to run the backend development servers using `npm run dev`. You can install it globally using `npm install -g nodemon`.

#### Start the backend server
- Open a new terminal window.
- Start the server: `npm start'
- You should see a message indicating the server is running, usually on port 8000 and is connected to MongoDB.
     
#### Start the frontend server:
- Open a new terminal window.
- Start the server: `npm run dev`
- You should see a message indicating the server is running, usually on port 8000.

