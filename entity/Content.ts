class Page {
    
    public readonly contentId: string;
    public readonly text: string;

    constructor(
        contentId: string,
        text: string,
    ) {
        this.contentId = contentId;
        this.text = text;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { contentId, text } = Object.assign({}, json);

        return new Page(
           contentId,
           text,
        );
    }

    public static createPage(
        contentId: string,
        text: string,
    ) {
        return new Page(
            contentId,
            text,
        )
    }

}

export default Page