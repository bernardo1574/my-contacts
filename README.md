# MY USERS

Project developed for a selection process in which the user should create a user registration rest api

## Author

- [@bernardo1574](https://www.github.com/bernardo1574)

## Badges

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

## Installation

Clone the repository:

```bash
  git clone https://github.com/bernardo1574/my-users.git
```

install dependencies:

```
yarn
or
npm install
```

After installing the dependencies insert the mongodb connection url in your .env file

```
DATABASE_URL="MONGO_URL"
```

If you don't know how to create a connection with mongodb, you can follow this tutorial step by step <br>
<a href="https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i">Click Here</a>

After placing the mongodb url execute the following commands:

```
yarn prisma generate
yarn prisma db seed
yarn dev
or
npx prisma generate
npx prisma db seed
npm run dev
```

After you have done all the installation steps and the api is running go to /api-docs to view the documents.

```
http://localhost:3000/api-docs/
```

By default the api is running on port 3000, if you want to change the port, go to src/shared/infra/http/server.ts
