# Development Notes

To start the server for development, you have to first tell Parcel to watch both our server and client. This can be done by running `npm run watch`. You can then run `npm run start:dev` in another terminal. You will now have processes running that will automatically recompile any changes you make to either the server or the client. The server will then be restarted, and, if need be, the page will also be automatically refreshed if it is open.

Code can be linted with `npm run lint`, and fixed automatically (if possible) with `npm run lint:fix`.