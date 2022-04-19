import { Button, IconButton, TextField } from "@material-ui/core"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";

import Page from "../../entity/Page"
import SubPage from "../../entity/SubPage";
import { createSubPage } from "../../service/subPage_service";

type Props = {
    page: Page
}

export default function PageListTile(props: Props) {
    const [isConfirmation, setIsConfimation] = useState(false)
    const [pageName, setPageName] = useState('')

    const addSubPage = async () => {
        const subPageData = SubPage.createSubPage(props.page.pageId, pageName, '') 
        await createSubPage(subPageData)
    }

    const openIsConfirmationField = () => {
        setIsConfimation(true)
    }

    const closeIsConfirmationField = () => {
        setIsConfimation(false)
    }

    return(
        <>
        <div className='flex flex-row'>
            <p className="flex items-center text-xl my-4 tracking-wide w-40 truncate" style={{ color: '#006db3', fontFamily: '筑紫A丸ゴシック' }}>
               {props.page.pageName} 
            </p>
           <IconButton onClick={openIsConfirmationField}>
                <AddBoxOutlinedIcon />
           </IconButton>
        </div>
        {/*  */}
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
                <IconButton onClick={closeIsConfirmationField} className='flex items-center'>
                    <CancelOutlinedIcon/>
                </IconButton>
            </div>
            :
            <></>
        }</div>
        </>
    )
}