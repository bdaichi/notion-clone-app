import { Dispatch, SetStateAction } from "react"
import SubPage from "../../entity/SubPage"
import SubPageListTile from "./sub_page_list_tile"

type Props = { 
    subPages: SubPage[]
    setPageId: Dispatch<SetStateAction<string>>
}

export default function SubPageList(props: Props) {

    return(
        <>
        <div>{props.subPages.map((subPage) =>
            <div key={subPage.pageId} className='flex flex-col'>
                    <SubPageListTile subPage={subPage} setPageId={props.setPageId}/>
            </div>
        )}</div>
        </>
    )
}