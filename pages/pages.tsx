import { useEffect, useState } from "react";
import Page from "../entity/Page";
import { fetchPage, fetchPages } from "../service/page_service";


export default function Pages() {
    const [pagesData, setPagesData] = useState<Page[]>([])
    const [pageData, setPageData] = useState<Page | null>(null)

    const fetchPagesData = () => {
        fetchPages(setPagesData)
    }

    const fetchPageData = () => {
        fetchPage(setPageData)
    }

    useEffect(() => {
        // if(pagesData[0]== null){
        //     fetchPagesData()
        // }
        if(pageData === null) {
            fetchPageData()
        }
        console.log('pageData', pageData)
        // console.log('pagesData', pagesData)
    },[pagesData, ])
    
    return(
        <div>
            {pagesData.map((pageData) => 
                <div key={pageData.pageId}>
                    <p>{pageData.text}</p>
                </div>
            )}
            <div>{pageData ?
                <p>{pageData.pageId}</p>
                :
                <p>nullだお</p>
            }</div>
        </div>
    )
}