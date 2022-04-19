import { Button, IconButton } from "@material-ui/core"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SubPage from "../../entity/SubPage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { fecthSubPages } from "../../service/subPage_service"
import OpenSubPageListButton from "./open_sub_page_list"
import SubPageList from "./sub_page_list"
import CreateSubPageField from "./create_sub_page_field"

type Props = {
    subPage: SubPage
    setPageId: Dispatch<SetStateAction<string>>
}

export default function SubPageListTile(props: Props) {
    const [isConfirmation, setIsConfimation] = useState(false)
    const [isOpenSubPageList, setIsOpenSubPageList] = useState(false)
    const [subPages, setSubPages] = useState<SubPage[]>([])

    const fetchSubPageData = async () => {
        await fecthSubPages(setSubPages, props.subPage.pageId)
    }   

    const openConfirmationField = () => {
        setIsConfimation(true)
    }

    useEffect(() => {
        
         fetchSubPageData()
        
    },[])

    const fetchContentData = () => {
        props.setPageId('5ad978e2-1f24-4c23-a804-6b888122de13')
    }

    return(
        <>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <>{(subPages[0] != null && subPages != [] && props.subPage.pageId == subPages[0].hostPageId) &&
                    <OpenSubPageListButton isOpenSubPageList={isOpenSubPageList} setIsOpenSubPageList={setIsOpenSubPageList}/>
                }</>
                <Button onClick={fetchContentData}>
                    <p className="flex items-center text-base my-2 tracking-wide w-40 truncate" style={{ color: '#006db3', fontFamily: '筑紫A丸ゴシック' }}>
                        {props.subPage.pageName} 
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
            <CreateSubPageField hostPageId={props.subPage.pageId} setIsConfimation={setIsConfimation}/>
            :
            <></>
        }</div>
        </>
    )
}