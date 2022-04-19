import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { fetchUserPages } from "../../service/page_service"
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

    useEffect(() => {
        if(pagesData[0] == null){
            fetchPagesData();
        }
    },[pagesData])
    
    return(
        <>{pagesData.map((pageData) => 
            <div key={pageData.pageId}>
                    <PageListTile page={pageData} setPageId={props.setPageId} />
            </div>
        )}</>
    )
}