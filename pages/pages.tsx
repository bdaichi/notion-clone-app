import { Drawer, List } from "@material-ui/core";
import { useEffect, useState } from "react";

import PageContent from "../component/page/page_contet";
import PageList from "../component/page/page_list";

export default function Pages() {
    const [pageId, setPageId] = useState('')
    
    return(
        <>
        <div className='flex md:flex-row'>
            <div className='hidden md:grid' style={{ minHeight: '900px', height: '100%', backgroundColor: '#e1f5fe' }}>
                <List>
                    <div className='flex justify-center items-center my-12 mx-12 flex-col'>
                        <PageList setPageId={setPageId}/>
                    </div>
                </List>
            </div>
            <div className='flex justify-center items-center' style={{ width: '60%' }}>
                <PageContent pageId={pageId} />
            </div>
        </div>
        </>
    )
}