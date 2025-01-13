// 1. Struktura danych
// Zawiera różne typy danych:

// Stringi (brand, model, vin)
// Numbers (price, horsePower)
// Booleans (isAvailableForRent)
// Daty (startDate, endDate)
// Obiekty (car, user)
// Tablice (cars, rentals)

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('salon_samochodowy', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

const Car = sequelize.define('Car', {
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    vin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    horsePower: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isAvailableForRent: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    renterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: false,
});

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isDealer: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: false,
});

const Rental = sequelize.define('Rental', {
    carId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
});

User.hasMany(Car, { as: 'carsOwned', foreignKey: 'ownerId' });
Car.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

User.hasMany(Car, { as: 'carsRented', foreignKey: 'renterId' });
Car.belongsTo(User, { as: 'renter', foreignKey: 'renterId' });

Rental.belongsTo(Car, { foreignKey: 'carId' });
Car.hasMany(Rental, { foreignKey: 'carId' });

(async () => {
    await sequelize.sync({ alter: true })
        .then(() => console.log('Database synchronized'))
        .catch(err => console.error('Database synchronization error:', err));
})();

export { sequelize, Car, User, Rental };