import { Button } from "@material-ui/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { fetchOriginallyPages, fetchUserPages } from "../../service/page_service"
import Page from "../../entity/Page"
import PageListTile from "./page_list_tile"

type Props = {
    setPageId: Dispatch<SetStateAction<string>>
}

export default function UserPageList(props: Props) {
    const [pagesData, setPagesData] = useState<Page[]>([])

    const fetchPagesData = () => {
        fetchUserPages(setPagesData)
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
                <Button onClick={() => openPageContents(pageData.pageId)} size='medium'>
                    <PageListTile page={pageData}/>
                </Button>
            </div>
        )}</>
    )
}