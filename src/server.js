//import './models/index.js' //Apply relationship
import app from './app.js';
import sequelize from './utils/connection.js';

const PORT = process.env.PORT || 8080;
console.log(PORT);

const main = async () => {
    try {
        await sequelize.sync(); //{force: true} {alter: true} !Warning
        console.log("Data base connected!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Link http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
