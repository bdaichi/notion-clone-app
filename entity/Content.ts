import { v4 as uuidv4 } from 'uuid';

class Page {
    
    public readonly contentId: string;
    public readonly hostPageId: string;
    public readonly text: string;

    constructor(
        contentId: string,
        hostPageId: string,
        text: string,
    ) {
        this.contentId = contentId
        this.hostPageId = hostPageId;
        this.text = text;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { contentId, hostPageId, text } = Object.assign({}, json);

        return new Page(
            contentId,
            hostPageId,
            text,
        );
    }

    public static createContent(
        hostPageId:string,
        text: string,
    ) {
        return new Page(
            uuidv4(),
            hostPageId,
            text,
        )
    }

}

export default Page