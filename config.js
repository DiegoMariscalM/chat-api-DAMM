
const config = {
    api: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'http://localhost:3000',
        nodeEnv: process.env.NODE_ENV || 'development'
    },
    db: {
        development: {
            dialect: 'postgres',
            host: 'localhost',
            port: '5432',
            username: 'postgres',
            password: 'root',
            database: 'chat-db',
            define: {
                timestamps: true, // Nos obloga a q todas las tablas tengan la prop createdAt y updatedAt
                underscored: true, // Combirte todo de camelcase snakecase
                underscoredAll: true
            }
        },
        production: {
            dialect: 'postgres',
            host: 'localhost',
            port: '5432',
            username: 'postgres',
            password: 'root',
            database: 'chat-db',
            define: {
                timestamps: true, // Nos obloga a q todas las tablas tengan la prop createdAt y updatedAt
                underscored: true, // Combirte todo de camelcase snakecase
                underscoredAll: true
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        },
        testing: {
            dialect: 'postgres',
            host: 'localhost',
            port: '5432',
            username: 'postgres',
            password: 'root',
            database: 'chat-db',
            define: {
                timestamps: true, // Nos obloga a q todas las tablas tengan la prop createdAt y updatedAt
                underscored: true, // Combirte todo de camelcase snakecase
                underscoredAll: true
            }
        }
    }
}

module.exports = config