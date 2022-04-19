import { Button, IconButton, TextField } from "@material-ui/core"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import CreateSubPageField from "../subPage/create_sub_page_field";
import { fecthSubPages } from "../../service/subPage_service";
import OpenSubPageListButton from "../subPage/open_sub_page_list";
import Page from "../../entity/Page"
import SubPage from "../../entity/SubPage";
import SubPageList from "../subPage/sub_page_list";

type Props = {
    page: Page
    setPageId: Dispatch<SetStateAction<string>>
}

export default function PageListTile(props: Props) {
    const [isConfirmation, setIsConfimation] = useState(false)
    const [isOpenSubPageList, setIsOpenSubPageList] = useState(false)
    const [subPages, setSubPages] = useState<SubPage[]>([])

    const fetchContentData = () => {
        props.setPageId(props.page.pageId)
    }

    const fetchSubPageData = async () => {
        await fecthSubPages(setSubPages, props.page.pageId)
    }   

    const openConfirmationField = () => {
        setIsConfimation(true)
    }

    useEffect(() => {
         fetchSubPageData()
    },[])

    return(
        <>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <>{(subPages[0] != null && subPages != [] && props.page.pageId == subPages[0].hostPageId) &&
                    <OpenSubPageListButton isOpenSubPageList={isOpenSubPageList} setIsOpenSubPageList={setIsOpenSubPageList}/>
                }</>
                <Button onClick={fetchContentData}>
                    <p className="flex items-center text-xl my-4 tracking-wide w-40 truncate" style={{ color: '#006db3', fontFamily: '筑紫A丸ゴシック' }}>
                        {props.page.pageName} 
                    </p>
                </Button>
                <IconButton onClick={openConfirmationField}>
                        <AddBoxOutlinedIcon />
                </IconButton>
            </div>
           <>{isOpenSubPageList &&
                <SubPageList subPages={subPages} setPageId={props.setPageId}/>
            }</>
        </div>
        {/* サブページ作成フィールド */}
        <div>{isConfirmation ?
            <CreateSubPageField hostPageId={props.page.pageId} setIsConfimation={setIsConfimation}/>
            :
            <></>
        }</div>
        </>
    )
}