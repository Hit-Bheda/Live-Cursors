import dotenv from 'dotenv';

dotenv.config()

interface configType {
    port: string
}

const config:configType = {
    port : process.env.PORT || '5000',
}

export default config;