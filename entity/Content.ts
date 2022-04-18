import { v4 as uuidv4 } from 'uuid';

class Content {
    
    public readonly contentId: string;
    public readonly hostPageId: string;
    public readonly text: string;
    public readonly contentType: string;
    public readonly isCheck: boolean;

    constructor(
        contentId: string,
        hostPageId: string,
        text: string,
        contentType: string,
        isCheck: boolean
    ) {
        this.contentId = contentId
        this.hostPageId = hostPageId;
        this.text = text;
        this.contentType = contentType;
        this.isCheck = isCheck
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { contentId, hostPageId, text, contentType, isCheck } = Object.assign({}, json);

        return new Content(
            contentId,
            hostPageId,
            text,
            contentType,
            isCheck
        );
    }

    public static createContent(
        hostPageId:string,
        text: string,
        contentType: string
    ) {
        return new Content(
            uuidv4(),
            hostPageId,
            text,
            contentType,
            false
        )
    }

    copyWith(
        contentId: string | null,
        hostPageId: string | null,
        text: string | null,
        contentType: string | null,
        isCheck: boolean | null
    ) {
        return new Content(
        contentId ?? this.contentId,
        hostPageId ?? this.hostPageId,
        text ?? this.text,
        contentType ?? this.contentType,
        isCheck ?? this.isCheck
        )
    }

}

export default Content