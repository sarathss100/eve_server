import bcrypt from 'bcrypt';
import IHash from '../interfaces/IHash';

class BcryptHasher implements IHash {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default BcryptHasher;
