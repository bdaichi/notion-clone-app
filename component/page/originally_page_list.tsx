import { Button } from "@material-ui/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { fetchOriginallyPages } from "../../service/page_service"
import Page from "../../entity/Page"
import PageListTile from "./page_list_tile"

type Props = {
    setPageId: Dispatch<SetStateAction<string>>
}

export default function OriginallyPageList(props: Props) {
    const [pagesData, setPagesData] = useState<Page[]>([])

    const fetchPagesData = () => {
        fetchOriginallyPages(setPagesData)
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
                <Button onClick={() => openPageContents(pageData.pageId)} size='large'>
                    <PageListTile page={pageData}/>
                </Button>
            </div>
        )}</>
    )
}