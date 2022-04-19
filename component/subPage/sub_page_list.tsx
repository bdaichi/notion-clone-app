import { Button } from "@material-ui/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SubPage from "../../entity/SubPage"
import SubPageListTile from "./sub_page_list_tile"

type Props = { 
    subPages: SubPage[]
    setPageId: Dispatch<SetStateAction<string>>
}

export default function SubPageList(props: Props) {

    const fetchContentData = (pageId: string) => {
        props.setPageId('5ad978e2-1f24-4c23-a804-6b888122de13')
    }

    return(
        <>
        <div>{props.subPages.map((subPage) =>
            <div key={subPage.pageId}>
                <Button 
                    onClick={() => fetchContentData(subPage.pageId)}
                >
                    <SubPageListTile subPage={subPage} />
                </Button>
            </div>
        )}</div>
        </>
    )
}