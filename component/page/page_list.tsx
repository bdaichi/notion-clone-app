import { useState } from "react"

import { fetchPages } from "../../service/page_service"
import Page from "../../entity/Page"
import PageListTile from "./page_list_tile"

export default function PageList() {
    const [pagesData, setPagesData] = useState<Page[]>([])

    const fetchPagesData = () => {
        fetchPages(setPagesData)
    }
    
    return(
        <>{pagesData.map((pageData) => 
            <div key={pageData.pageId}>
                <PageListTile page={pageData}/>
            </div>
        )}</>
    )
}