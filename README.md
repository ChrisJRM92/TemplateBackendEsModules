# Basic template backend Es modules
This template is created to streamline a manual configuration process. It is designed to work with PostgreSQL and includes all the dependencies to be truly 'plug and play'.

Just create a database with any name and include it in an environment variable along with your PASSWORD, which you should have set during the PostgreSQL installation, and configure a port of your choice.

.env
```html
DATABASE_URL=postgres://postgres:12345@127.0.0.1:5432/crud_db
PORT=3000
```

✅ npm run dev

# Sippets VsCode
Create model:

```html
"create a node sequelize model": {
		"prefix": "modelES",
		"body": [
				"import { DataTypes } from 'sequelize';",
				"import sequelize from '../utils/connection.js';",
				"",
				"const ${1:ModelName} = sequelize.define('${2:modelName}', {",
				"    campo1: {",
				"        type: DataTypes.STRING,",
				"        allowNull: false",
				"    },",
				"});",
				"",
				"export default ${1:ModelName};"
		]
},
```
Create controller

```html
"create a node controller file": {
		"prefix": "controllerES",
		"body": [
				"import catchError from '../utils/catchError.js';",
				"import ${1:modelName} from '../models/${1:modelName}.js';",
				"",
				"const getAll = catchError(async(req, res) => {",
				"//sequelize operations"
				"    return res.json(/* value to be return*/)",
				"});",
				"",
				"export default {",
				"    getAll",
				"};"
		]
},
```
Create rute
```html
"create a node router file": {
		"prefix": "routerES",
		"body": [
				"import { getAll } from '../controllers/${1:controllerFile}.js';",
				"import { Router } from 'express';",
				"",
				"const ${2:routerName} = Router();",
				"",
				"${2:routerName}.route('/')",
				"    .get(getAll)",
				"",
				"export default ${2:routerName};",
		]
},
```
Create All controllers CRUD
```html
"create all the controllers for a CRUD": {
		"prefix": "controllersCrudES",
		"body": [
			"import catchError from '../utils/catchError.js';",
			"import ${1:model} from '../models/${1:model}.js';",
			"",
			"const getAll = catchError(async(req, res) => {",
			"    const results = await ${1:model}.findAll(); //{include: [model]}",
			"    return res.json(results);",
			"});",
			"",
			"const create = catchError(async(req, res) => {",
			"    const result = await ${1:model}.create(req.body);",
			"    return res.status(201).json(result);",
			"});",
			"",
			"const getOne = catchError(async(req, res) => {",
			"    const { id } = req.params;",
			"    const result = await ${1:model}.findByPk(id);",
			"    if(!result) return res.sendStatus(404);",
			"    return res.json(result);",
			"});",
			"",
			"const remove = catchError(async(req, res) => {",
			"    const { id } = req.params;",
			"    const result = await ${1:model}.destroy({ where: {id} });",
			"    if(!result) return res.sendStatus(404);",
			"    return res.sendStatus(204);",
			"});",
			"",
			"const update = catchError(async(req, res) => {",
			"    const { id } = req.params;",
			"    const result = await ${1:model}.update(",
			"        req.body,",
			"        { where: {id}, returning: true }",
			"    );",
			"    if(result[0] === 0) return res.sendStatus(404);",
			"    return res.json(result[1][0]);",
			"});",
			"",
			"export {",
			"    getAll,",
			"    create,",
			"    getOne,",
			"    remove,",
			"    update",
			"};"
		]
},
```

Create All routes CRUD
```html
"create all the routes for a CRUD":{
		"prefix": "routerCrudES",
		"body": [
			"import { getAll, create, getOne, remove, update } from '../controllers/${1:controllerFile}.js';",
			"import { Router } from 'express';",
			"",
			"const ${2:routerName} = Router();",
			"",
			"${2:routerName}.route('/')",
			"    .get(getAll)",
			"    .post(create);",
			"",
			"${2:routerName}.route('/:id')",
			"    .get(getOne)",
			"    .delete(remove)",
			"    .put(update);",
			"",
			"export default ${2:routerName};"
		]
},
```
No return user password
```html
"exclude password": {
		"prefix": "nopassword",
		"body": [
			"User.prototype.toJSON = function () {",
			"   const values = { ...this.get() };",
			"   delete values.password ;",
			"   return values;",
			"}"
		]
	};,
```
VerifyJwt
```html
"verify token middleware": {
		"prefix": "verifyJwtES",
		"body": [
			"import jwt from 'jsonwebtoken';",
			"import dotenv from 'dotenv';",
			"",
            "dotenv.config();",
			"const verifyJwt = (req, res, next) => {",
			"    const authHeader = req.headers.authorization || req.headers.Authorization;",
			"    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);",
			"    const token = authHeader.split(' ')[1];",
			"    jwt.verify(",
			"        token,",
			"        process.env.TOKEN_SECRET,",
			"        (err, decoded) => {",
			"            if (err) return res.sendStatus(403);",
			"            req.user = decoded.user;",
			"            next();",
			"        }",
			"    )",
			"}",
			"",
			"export default {verifyJwt};"
		]
	},
```
Node Emailer
```html
"Send Emails nodeEmailer": {
		"prefix": "nodemailerES",
		"body": [
			"import nodemailer from 'nodemailer';",
			"",
			"const sendEmail = (options) => {",
			"",
			"   const transporter = nodemailer.createTransport({",
			"       service: 'gmail',",
			"       auth: {",
			"           user: process.env.EMAIL,",
			"           pass: process.env.PASSWORD",
			"       },",
			"       tls: {",
			"           rejectUnauthorized: false",
			"       },",
			"   });",
			"",
			"   const mailOptions = {",
			"       from: process.env.EMAIL,",
			"        ...options",
			"}",
			"",
			"   transporter.sendMail(mailOptions, function (error, info) {",
			"       if (error) {",
			"           console.log(error);",
			"       } else {",
			"           console.log('Email sent: ' + info.response);",
			"       }",
			"   });",
			"}",
			"",
			"export defaul { sendEmail };"
		]
	},
```
Test Migrate
```html
"Test Migrate": {
		"prefix": "testMigrateES",
		"body": [
			"import sequelize from '../utils/connection.js';",
			"import '../models'",
			"",
			"const testMigrate = async () => {",
			"",
			"    try {",
			"        await sequelize.sync({ force: true })",
			"        console.log('DB reset ✅');",
			"        process.exit()",
			"    } catch (error) {",
			"        console.error(error);",
			"    }",
			"}",
			"",
			"testMigrate();",
		]
	},
```