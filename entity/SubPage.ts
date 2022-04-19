import { v4 as uuidv4 } from 'uuid';

class SubPage {
    
    public readonly hostPageId: string;
    public readonly pageId: string;
    public readonly pageName: string;
    public readonly userId: string;

    constructor(
        hostPageId: string,
        pageId: string,
        pageName: string,
        userId: string,
    ) {
        this.hostPageId = hostPageId;
        this.pageId = pageId;
        this.pageName = pageName;
        this.userId = userId;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { hostPageId, pageId, pageName, userId } = Object.assign({}, json);

        return new SubPage(
            hostPageId,
            pageId,
            pageName,
            userId
        );
    }

    public static createSubPage(
        hostPageId: string,
        pageName: string,
        userId: string
    ) {
        return new SubPage(
            hostPageId,
            uuidv4(),
            pageName,
            userId
        )
    }

}

export default SubPage