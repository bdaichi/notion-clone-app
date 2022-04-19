import { Button, IconButton } from "@material-ui/core"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";

import Page from "../../entity/Page"

type Props = {
    page: Page
}

export default function PageListTile(props: Props) {
    const [isConfirmation, setIsConfimation] = useState(false)

    const addSubPage = async () => {

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
           <p className="flex items-center text-2xl my-4 tracking-wide" style={{ color: '#006db3', fontFamily: '筑紫A丸ゴシック' }}>{props.page.pageName}</p>
           <IconButton onClick={openIsConfirmationField}>
                <AddBoxOutlinedIcon />
           </IconButton>
        </div>
        {/*  */}
        <div>{isConfirmation ?
            <div className='flex flex-col fixed top-40 left-60 justify-center z-50 w-56 h-32 bg-white'>
                <Button
                    onClick={addSubPage}
                >
                    サブページ作成
                </Button>
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