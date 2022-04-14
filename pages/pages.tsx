import { useEffect, useState } from "react";
import Page from "../entity/Page";
import { fetchPage, fetchPages } from "../service/page_service";


export default function Pages() {
    const [pageData, setPageData] = useState<Page | null>(null)

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
    },[])
    
    return(
        <div>
            
            <div>{pageData ?
                <p>{pageData.pageId}</p>
                :
                <p>nullだお</p>
            }</div>
        </div>
    )
}