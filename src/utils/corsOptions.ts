
const corsOptions = {
    origin: [`${process.env.FRONT_END_URL}`],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}

export default corsOptions;
