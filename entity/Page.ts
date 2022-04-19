import { v4 as uuidv4 } from 'uuid';

class Page {
    
    public readonly pageId: string;
    public readonly pageName: string;
    public readonly userId: string;

    constructor(
        pageId: string,
        pageName: string,
        userId: string,
    ) {
        this.pageId = pageId;
        this.pageName = pageName;
        this.userId = userId;
    }

    public static createPage(
        pageName: string,
        userId: string
    ) {
        return new Page(
            uuidv4(),
            pageName,
            userId
        )
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { pageId, pageName, userId } = Object.assign({}, json);

        return new Page(
           pageId,
           pageName,
           userId
        );
    }
}

export default Page