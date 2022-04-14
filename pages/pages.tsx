import { useEffect, useState } from "react";
import Page from "../entity/Page";
import fetchPages from "../service/page_service";

export default function Pages() {
    const [pagesData, setPagesData] = useState<Page[]>([])

    useEffect(() => {
        if(pagesData[0]== null){
            fetchPages(setPagesData)
        }
        console.log('pagesData', pagesData)
    },[pagesData])
    
    return(
        <div>
            {pagesData.map((pageData) => 
                <div key={pageData.pageId}>
                    <p>{pageData.text}</p>
                </div>
            )}
        </div>
    )
}