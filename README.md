This project is a React-based web application that allows users to select "年", "縣/市", and "區" to generate charts based on data retrieved from an API.

##Features
Users can select the "年", "縣/市", and "區" options to generate charts.
The submit button is disabled until all fields are selected.
Autocomplete selectors are used for the "縣/市" and "區" options to help users quickly find the desired option.
The "區" option is disabled until a "縣/市" option is selected.
When the "縣/市" option is changed, the value of the "區" option is cleared.
Users can also trigger the query by entering "年", "縣/市", and "區" directly into the URL.
While waiting for the API response, a UI prompt indicating that the page is loading is displayed.
Charts are generated using the echart library.
The application is responsive and uses RWD to ensure a consistent experience across different devices.
Usage
To use this application, simply navigate to the deployed website or run the application locally by following these steps:

##Clone the repository
Install the necessary dependencies by running npm install in the project directory
Start the development server by running npm start
Navigate to localhost:3000 in your web browser
