import { Drawer } from "@material-ui/core";
import { useEffect, useState } from "react";

import PageContent from "../component/page/page_contet";
import PageList from "../component/page/page_list";

export default function Pages() {
    const [pageId, setPageId] = useState('')
    
    return(
        <>
        <Drawer
            className=''
            variant="permanent"
            anchor="left"   
        >
            <PageList setPageId={setPageId}/>
        </Drawer>
            
            <PageContent pageId={pageId} />
        </>
    )
}