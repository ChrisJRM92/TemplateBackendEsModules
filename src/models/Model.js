import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";

const Model_name = sequelize.define('modelname', {
    column1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    column2: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    column3: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    }
});

export default Model_name;
