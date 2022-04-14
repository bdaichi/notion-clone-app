class Page {
    
    public readonly pageId: string;
    public readonly text: string;

    constructor(
        pageId: string,
        text: string
    ) {
        this.pageId = pageId;
        this.text = text;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { pageId, text } = Object.assign({}, json);

        return new Page(
           pageId,
           text,
        );
    }

}

export default Page