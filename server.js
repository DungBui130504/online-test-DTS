const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/mySwagger.yaml');

const connectDB = require('./db/config');
const api = require('./api');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

connectDB();

app.get('/', (req, res) => {
    res.status(200).json('Vui lòng truy cập tiếp đến /api/v1');
})

app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}/api/v1`);
    console.log(`Tài liệu Swagger tại: http://localhost:${PORT}/api-docs/v1`);
});
