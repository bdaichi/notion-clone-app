class Page {
    
    public readonly pageId: string;
    public readonly pageName: string;
    public readonly text: string;

    constructor(
        pageId: string,
        pageName: string,
        text: string
    ) {
        this.pageId = pageId;
        this.pageName = pageName;
        this.text = text;
    }

    public static fromJSON = (json: any) => {
        console.log('josn', json)
        const { pageId, pageName, text } = Object.assign({}, json);

        return new Page(
           pageId,
           pageName,
           text,
        );
    }

}

export default Page