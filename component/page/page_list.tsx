import { Button } from "@material-ui/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { fetchPages } from "../../service/page_service"
import Page from "../../entity/Page"
import PageListTile from "./page_list_tile"

type Props = {
    setPageId: Dispatch<SetStateAction<string>>
}

export default function PageList(props: Props) {
    const [pagesData, setPagesData] = useState<Page[]>([])

    const fetchPagesData = () => {
        fetchPages(setPagesData)
    }

    const openPageContents = (pageId: string) => {
        if(pageId){
            props.setPageId(pageId)
        }
    }

    useEffect(() => {
        if(pagesData[0] == null){
            fetchPagesData();
        }
    },[pagesData])
    
    return(
        <>{pagesData.map((pageData) => 
            <div key={pageData.pageId}>
                <Button onClick={() => openPageContents(pageData.pageId)}>
                    <PageListTile page={pageData}/>
                </Button>
            </div>
        )}</>
    )
}