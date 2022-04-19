import { v4 as uuidv4 } from 'uuid';

class SubPage {
    
    public readonly hostPageId: string;
    public readonly pageId: string;
    public readonly pageName: string;

    constructor(
        hostPageId: string,
        pageId: string,
        pageName: string,
    ) {
        this.hostPageId = hostPageId;
        this.pageId = pageId;
        this.pageName = pageName;
    }

    public static createSubPage(
        hostPageId: string,
        pageName: string,
    ) {
        return new SubPage(
            hostPageId,
            uuidv4(),
            pageName,
        )
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { hostPageId, pageId, pageName } = Object.assign({}, json);

        return new SubPage(
            hostPageId,
            pageId,
            pageName,
        );
    }
}

export default SubPage