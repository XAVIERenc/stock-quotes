/* Stock Quote system created in 2019 by Jeffrey B. Madden, owner of Other Mind Paradigm. All rights reserved. */

# Stock Quote system
There are three features for the Stock Quote system. All three features are linked to each other.

   View Quotes (stock_quotes.html) - View and analyze stock quotes from the database. An HTML form sends Javascript AJAX requests to retrieve and parse XML.

   Update Symbols (update_symbols.html) - Adds new companies to the database. An HTML form sends form values via AJAX to a PHP script that creates a new XML file to store the new company. This XML will also be used to store stock quote data for that company.

   Add Quotes (add_quotes.html) - Adds a quote to a company existing in the database. Quote times are saved as current UTC time. An HTML form sends form values via AJAX to a PHP script. The PHP script searches for the company entered and stores the data into the XML file.
