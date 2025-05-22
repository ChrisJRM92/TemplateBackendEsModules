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
		"prefix": "model",
		"body": [
				"import { DataTypes } from "sequelize";",
				"import sequelize from "../utils/connection.js";",
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
		"prefix": "controller",
		"body": [
				"import catchError from "../utils/catchError.js";",
				"import ${1:modelName} from '../models/${1:modelName}';",
				"",
				"const getAll = catchError(async(req, res) => {",
				"    return res.json(/* value to be return*/)",
				"});",
				"",
				"export default {",
				"    getAll",
				"}"
		]
},
```
Create rute
```html
"create a node router file": {
		"prefix": "router",
		"body": [
				"import { getAll } from '../controllers/${1:controllerFile}';",
				"import express from 'express';",
				"",
				"const ${2:routerName} = express.Router();",
				"",
				"${2:routerName}.route('/')",
				"    .get(getAll)",
				"",
				"export default ${2:routerName};",
		]
},
```
