import { v4 as uuidv4 } from 'uuid';

class Page {
    
    public readonly pageId: string;
    public readonly pageName: string;

    constructor(
        pageId: string,
        pageName: string,
    ) {
        this.pageId = pageId;
        this.pageName = pageName;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { pageId, pageName } = Object.assign({}, json);

        return new Page(
           pageId,
           pageName,
        );
    }

    public static createPage(
        pageName: string,
        text: string
    ) {
        return new Page(
            uuidv4(),
            pageName,
        )
    }

}

export default Page