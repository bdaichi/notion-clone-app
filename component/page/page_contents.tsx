import { useEffect, useState } from "react";

import Content from "../../entity/Content";
import { fetchContents } from "../../service/content_service";


type Props = {
    pageId: string
}

export default function PageContent(props: Props) {
    const [contents, setContents] = useState<Content[]>([])

    const fetchContentsData = async () => {
        //クライアンからサーバサイドにデータを送ることができたら引数にpageIdを渡すようにする
        await fetchContents(setContents, props.pageId)
    }

    useEffect(() => {
        if(props.pageId){
            console.log('pageId', props.pageId)
            fetchContentsData()
        }
    },[props.pageId])

    return(
        <>{!(props.pageId == '') ?
            <div>
                {!(contents[0] == null) ?
                <div>
                {contents.map((content) =>
                <div key={content.contentId}>
                    <p className='mx-12 text-2xl'>{content.text}</p>
                </div>
                )}
                </div> :
                <p>なにか書いてみよう</p>
            }</div>:
            <p>ページを選ぼう</p>
        }</>
    )

}