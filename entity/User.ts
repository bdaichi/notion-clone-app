//userIdはメールアドレス

class User {

    public readonly userId: Number;
    public readonly signInPassword: string;
    public readonly createdAt: Date;

    constructor(
        userId: Number,
        signInPassword: string,
        createdAt: Date,
    ) {
        this.userId = userId;
        this.signInPassword = signInPassword;
        this.createdAt = createdAt;
    }

    public static fromJSON = (json: any) => {
        const { userId, signInPassword, createdAt } = Object.assign({}, json);

        return new User(
            userId,
            signInPassword,
            createdAt,
        );
    };

}

export default User