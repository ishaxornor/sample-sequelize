module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNUll: false,
            validate: {
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return User;
}