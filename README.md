# Ledger-Project
## Description
- The endpoint should have with the following values as a query string:
- Start date of the ledger - provided in ISO String (start_date)
- The end date of the ledger - provided in ISO String (end_date)
- Payment frequency of the ledger - provided as a string (frequency) - WEEKLY, FORTNIGHTLY, MONTHLY
- The weekly amount of the ledger - provided as a number (weekly_rent)
- The timezone of the property - provided as a string of TZ database name (timezone)
    
It will respond with an array of line items, each line item will include:
-   Start date of that line item - in ISO String
-   End date of that line item - in ISO String
-   Total amount of the line item - as a number
## To run this locally
 1. To run this project first you need to download and install nodejs https://nodejs.org/en/download/
 
 2. Clone the project using git clone https://github.com/abiram21/Ledger-Project or download the zip file.
 
 3. Navigate to the project parent directory.
 
 4. Create .env file and add the following
      PORT = '6000'
      BASE_URL = '/api/v1'
      
 5. Open the terminal at the project parent directory.

 6. Run the command "npm i" to install all the depencies that are needed to run the project.
 
 7. Run the command "node server" to start the server.

 8. Run the command "npm test" to check all the test cases
 
 9. Use Postman to inovke the API or use CURL command.

EG-: 

http://localhost:6000/api/v1/ledgers?start_date=2020-03-28 15:00:00.000&end_date=2020-05-27 15:00:00.000&frequency=FORTNIGHTLY&weekly_rent=550&timezone=CST
 
