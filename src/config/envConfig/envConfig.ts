import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Export an empty object from module execution 
export default {};
