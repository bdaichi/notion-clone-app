import { Button, IconButton, TextField } from "@material-ui/core"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Page from "../../entity/Page"
import SubPage from "../../entity/SubPage";
import { createSubPage, fecthSubPages } from "../../service/subPage_service";
import SubPageList from "../subPage/sub_page_list";

type Props = {
    page: Page
    setPageId: Dispatch<SetStateAction<string>>
}

export default function PageListTile(props: Props) {
    const [isConfirmation, setIsConfimation] = useState(false)
    const [isOpenSubPageList, setIsOpenSubPageList] = useState(false)
    const [pageName, setPageName] = useState('')
    const [subPages, setSubPages] = useState<SubPage[]>([])

    const fetchSubPageData = async () => {
        await fecthSubPages(setSubPages, props.page.pageId)
    }

    const addSubPage = async () => {
        const subPageData = SubPage.createSubPage(props.page.pageId, pageName, '') 
        await createSubPage(subPageData)
    }

    const openPageContents = () => {
        props.setPageId(props.page.pageId)
    }


    const openConfirmationField = () => {
        setIsConfimation(true)
    }

    const closeConfirmationField = () => {
        setIsConfimation(false)
    }

    const openSubPageList = () => {
        setIsOpenSubPageList(true)
    }

    const closeSubPageList = () => {
        setIsOpenSubPageList(false)
    }

    useEffect(() => {
        
         fetchSubPageData()
        
    },[])

    return(
        <>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <>{(subPages[0] != null && subPages != [] && props.page.pageId == subPages[0].hostPageId) &&
                    <>{!isOpenSubPageList ?
                    <IconButton onClick={openSubPageList}>
                        <ArrowRightOutlinedIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={closeSubPageList}>
                        <ArrowDropDownOutlinedIcon/>
                    </IconButton>
                    }</>
                }</>
                <Button onClick={openPageContents}>
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
            <div className='flex flex-col fixed top-40 left-60 justify-center z-50 w-56 h-48 bg-white px-8 py-4'>
                <TextField
                    variant='outlined'
                    style={{ backgroundColor: 'white' }}
                    label='ページ名'
                    onChange={(e) => setPageName(e.target.value)}
                />
                <div className='my-2'>{!(pageName == '') && 
                <Button
                    onClick={addSubPage}
                >
                    サブページ作成
                </Button>
                }</div>
                <IconButton onClick={closeConfirmationField} className='flex items-center'>
                    <CancelOutlinedIcon/>
                </IconButton>
            </div>
            :
            <></>
        }</div>
        </>
    )
}