import { useEffect, useState } from "react";

import Page from "../../entity/Page";
import { fetchPage } from "../../service/page_service";

type Props = {
    pageId: string
}

export default function PageContent(props: Props) {
    const [page, setPage] = useState<Page | null>(null)

    const fetchPageData = async () => {
        //クライアンからサーバサイドにデータを送ることができたら引数にpageIdを渡すようにする
        await fetchPage(setPage)
    }

    useEffect(() => {
        if(props.pageId){
            console.log('pageId', props.pageId)
            fetchPageData ()
        }
    },[props.pageId])

    return(
        <>
        <div>{page ?
        <p className='mx-12 text-2xl'>{page.text}</p>
            :
        <p className='mx-12 text-2xl'>使いたいページを選びましょう</p>
        }</div>
        </>
    )

}