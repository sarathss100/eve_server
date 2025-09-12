
const corsOptions = {
    origin: [`${process.env.FROND_END_URL}`],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}

export default corsOptions;
