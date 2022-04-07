class User {

    public readonly userName: string;
    public readonly userId: string;
    public readonly createdAt: Date;

    constructor(
        userName: string,
        userId: string,
        createdAt: Date,
    ) {
        this.userName = userName;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}

export default User