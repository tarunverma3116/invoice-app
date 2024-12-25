# Invoice App

## Live demo

Check the live demo here 👉️ [https://invoice-app-lilac-six.vercel.app/]

## Table of contents

* [Usage](#usage)
  * [Project setup](#project-setup)
  * [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  * [Compiles and minifies for production](#compiles-and-minifies-for-production)
  * [Customize configuration](#customize-configuration)
* [Project Details](#usage)
  * Authentication Pages (Login & Signup) ["/login", "/signup"]
  * Invoice List Page (Homepage) ["/"]
  * Create Invoice Page (Required design page) ["/create-invoice"]


## Usage

This project was bootstrapped with [Vite](https://vitejs.dev/).

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run dev
```

#### Compiles and minifies for production
```
npm run build
```

### Project Explanation

Project Overview
This application is designed to manage invoices with features such as user registration, authentication, creating invoices, and viewing a list of created invoices. It is built with React for the frontend and utilizes local storage to persist invoice data. The application allows users to sign up, log in, and manage their invoices in a seamless and organized way.

Features
User Authentication:

Users can sign up with their name, email, and password.
After successful authentication, users can access the invoice list and the ability to create new invoices.
Invoice Management:

Users can create invoices by providing relevant details such as vendor information, invoice number, invoice date, total amount, and other invoice details.
After creating an invoice, it is stored in local storage and can be accessed from the invoice list page.
The invoice list displays details such as serial number, vendor info, PO number, amount, invoice date, and provides a view button for each invoice. Clicking the view button opens a modal showing the full details of the selected invoice.
Responsive Design:

The application is fully responsive, ensuring that it works smoothly on all device sizes, from mobile phones to desktop computers.


Project Structure
/src/partials: Contains React components like InvoiceList, CreateInvoice, Auth, etc.
/src/pages: Contains the main pages such as Login, Home, Signup.

1. InvoiceList
This component displays the list of invoices fetched from local storage. It provides a table with the following columns:

Serial Number
Vendor Info
PO Number
Amount
Invoice Date
Actions (View button)
Clicking the "View" button opens a modal displaying the full details of the invoice.

2. CreateInvoice
This component allows users to create a new invoice by filling out a form with fields such as:

Vendor Name
Invoice Number
Invoice Date
Total Amount
Payment Terms
Invoice Due Date
Description
Once the form is submitted, the invoice is saved in local storage and the user is redirected to the invoice list page.

3. Auth
This component handles user authentication. Users can sign up with their name, email, and password. Upon successful login, they are redirected to the invoice list page.

4. Modal
This component is used to show detailed information about a particular invoice when the "View" button is clicked.

Local Storage
Invoices are stored in the browser's local storage under the key "invoices". This allows the data to persist even after the page is reloaded. The application also uses local storage to store user authentication data.

Technologies Used

Frontend:
React.js
Tailwind CSS (for styling)
React Router (for routing between pages)

State Management:
React's built-in state management (useState, useEffect)

Local Storage:
Used to persist invoices and user authentication data

Responsive Design
The application is fully responsive and adjusts to various screen sizes using Tailwind CSS utilities such as w-full, max-w-md, lg:w-3/4, and sm:text-xs. This ensures that the app provides a seamless experience on devices ranging from mobile phones to large desktop screens.

Future Enhancements
Backend Integration: Integrate with a backend to store invoices and user authentication data.
Form Validation: Enhance form validation with more detailed error handling.
User Profiles: Add the ability for users to manage their profiles.
Invoice Editing and Deletion: Allow users to edit or delete invoices.
Export Invoices: Add functionality to export invoices as PDF or Excel.

Acknowledgements
Tailwind CSS: For fast and responsive UI development.
React: For building the user interface.
LocalStorage: For persisting data on the frontend.
