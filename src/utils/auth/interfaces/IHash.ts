interface IHash {
    hash(password: string): Promise<string>
    verify(password: string, hashedPassword: string): Promise<boolean>;
}

export default IHash;