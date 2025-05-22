import { DataTypes } from "sequelize";
import sequelize from "../utils/connection";

const model_name = sequelize.define('nombreModelo', {
    column1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    column2: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

export default model_name;
