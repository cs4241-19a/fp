# Term Project - Webware A19
 - Joe Bartone `jrbartone`
 - Chris Mercer `ctmercer`
 - Danny Sullivan `djsullivan` 

# GoatBooks <img src="https://i.imgur.com/jk03AC1.png" alt="goat" height="75" width="75">

## Purpose Statement
Students are often caught without textbooks at the beginning of every term. Usually not because the titles/ISBNs aren’t known, but because of the lack of books available at a reasonable price. 

Companies like Chegg and Amazon have leased books for quite some time to solve this problem. However, students still pay as much as 90% of the original price, and still have to wait for shipping.

By using the books students already have and allowing trade, students can simply swap for the books they want at the beginning of the term. Most students don’t have a need to retain the books they purchased for courses, so they’d be willing to part their books in exchange for the ones they need.

## Technical Outline
Our project will heavily utilize a database, with the DB being exposed by an API. With this, the webpage itself will be as static as possible to allow for quick load times. Our API will be stateless.

Students can search by course, book title, or book ISBN. The app will then give a list of contacts with the matching criteria. From here, users will be able to message other users and arrange a place to meet on campus.In addition, legally obtained digital copies of books can be uploaded to our db and accessed/shared per user. 