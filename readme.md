## inital setup

#### intall node package manager

```
npm install
```

#### create package.json file using following command

```
npm init
```

#### install fastify for framework

```
npm install fastify
```

#### install postgres

```
npm i pg-hstore --save
```

#### install sequelize for setup our db

```
npm i sequelize
```

#### install dotenv

```
npm i dotenv
```

#### install typescript

```
npm i typescript -D
```

#### install @types/node

```
npm i --save @types/node -D
```

#### install nodemon

```
npm i nodemon -D
```

#### install prettier

```
npm i prettier -D
```

#### install tslint-config-prettier

```
npm install --save-dev tslint-config-prettier
```

#### install tslint-config-airbnb

```
npm i tslint-config-airbnb -D
```

#### install tslint

```
npm i tslint -D
```

#### install sequelize-cli

```
npm i sequelize-cli
```

### create .env file

- this file is used for which data is important in our projet, that all data define at here

##### example:

- PORT, DATABASE_URL, etc

### create .gitignore file

- In this file, which file we won't to push into our git that file include inside of this file

### craete .sequelizerc file

- In this file, we can define the path for model, migrations, seeders and config. after define the path in .sequelizerc file, we can enter the following command for create that directories:

```
npx sequelize-cli init
```

```
npm sequelize init
```

### create app folder

- In this folder, we can define our backend-server coding

### setup our db table

- using following command for setup our db table. we can define which type of table value we want and also we can define the table type and format at there

```
npx sequelize-cli model:generate --name Users --attributes name:string,email:string,encrypted_password:string
```

```
npx sequelize-cli model:generate --name Books --attributes name:string,author:string,price:number,notes:string
```

```
npx sequelize-cli seed:generate --name Books
```

```
npx sequelize-cli seed:generate --name Books
```

- after enter this command in our terminal, the migration and model file will be generated

### create type folder

- In this folder, we can define the type of our db table attributes using typescript (interface and type)

