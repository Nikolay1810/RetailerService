For the correct installation of our web application, you need to do the following:
1. Run scripts with the extension ".sql" to create a database and the necessary procedures for the operation.
2. In the Web.config file, in the string <stringConnection>, write the parameters for the correct connection to the database.

Description for user
This web application is implemented to account for root retailers and retailers, as well as their affiliated Retailers. 
It has the following functional:
•	Get all the retailers in the tree structure
•	Get the root retailer for the specified
•	Add a new retailer, both child and root
•	Add a new affiliated Retailers, both child and root
•	Obtain a list of valid contracts for the selected retailer (If the selected retailer has affiliated retailers, display their contracts too)
•	Conclude a new contract between several retailers
•	Obtain a list of all contracts using paged output with the possibility of applying the filter to the criteria - selected retailers, selected date of contract signing or the date range, valid or inactive contract (All, Valid, Inactive). The filter works by logic “AND”.

 When you run the project on the main page, a list with root retailers is displayed.
If you click on one, then its enterprises drop out, if clicking on the enterprise drops out the list of child retailers. And so while the data does not end.
The entire catalog of project pages is displayed at the top.
Also, when displaying contracts for a filter, the date range should be entered in the format "dd.MM.yyyy", a format check is implemented, if you enter an incorrect date, the request to the server will not be sent.
"# RetailerService" 
