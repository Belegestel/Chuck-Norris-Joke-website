# Running the website
In terminal 1:
```
cd backend
npm install
npm start run:dev
```
In terminal 2:
```
cd frontend
npm install
npm run dev
```
## `.env` file
To run the backend, a `.env` file is required. In my case, this was its content:
```
JWT_SECRET=this-is-my-very-secret-key-nobody-knows-about
DATABASE_NAME=database.sqlite
PORT=3000
```
It should be placed in the `./backend/` folder.
