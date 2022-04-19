//userIdはメールアドレス

class User {

    public readonly userId: string;
    public readonly signInPassword: string;
    // public readonly createdAt: Date;

    constructor(
        userId: string,
        signInPassword: string,
        // createdAt: Date,
    ) {
        this.userId = userId;
        this.signInPassword = signInPassword;
        // this.createdAt = createdAt;
    }

    public static fromJSON = (json: any) => {
        const { userId, signInPassword,  } = Object.assign({}, json);

        return new User(
            userId,
            signInPassword,
            // createdAt,
        );
    };

    public static createUser (
        userId: string,
        signInPassword: string
    ) {
        return new User(
            userId, 
            signInPassword
        )
    }

    public static initUser = () => {
        return new User(
            '',
            'init',
        );
    }


}

export default User