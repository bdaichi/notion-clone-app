import { Button, IconButton, TextField } from "@material-ui/core";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Dispatch, SetStateAction, useState } from "react";
import SubPage from "../../entity/SubPage";
import { createSubPage } from "../../service/subPage_service";

type Props = {
    hostPageId: string
    setIsConfimation: Dispatch<SetStateAction<boolean>>
}

export default function CreateSubPageField(props: Props) {
    const [pageName, setPageName] = useState('')

    const addSubPage = async () => {
        const subPageData = SubPage.createSubPage(props.hostPageId, pageName) 
        await createSubPage(subPageData)
    }

    const closeConfirmationField = () => {
        props.setIsConfimation(false)
    }

    return(
        <div className='flex flex-col fixed top-40 left-60 justify-center z-50 w-56 h-48 bg-white px-8 py-4 shadow-2xl'>
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
    )
}