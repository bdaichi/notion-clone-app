import { v4 as uuidv4 } from 'uuid';

class Page {
    
    public readonly contentId: string;
    public readonly hostPageId: string;
    public readonly text: string;
    public readonly contentType: string;

    constructor(
        contentId: string,
        hostPageId: string,
        text: string,
        contentType: string
    ) {
        this.contentId = contentId
        this.hostPageId = hostPageId;
        this.text = text;
        this.contentType = contentType;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { contentId, hostPageId, text, contentType } = Object.assign({}, json);

        return new Page(
            contentId,
            hostPageId,
            text,
            contentType,
        );
    }

    public static createContent(
        hostPageId:string,
        text: string,
        contentType: string
    ) {
        return new Page(
            uuidv4(),
            hostPageId,
            text,
            contentType
        )
    }

}

export default Page