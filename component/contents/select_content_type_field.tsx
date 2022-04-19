import { Button, IconButton } from "@material-ui/core"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import { Dispatch, SetStateAction } from "react"

type Props = {
    setType: Dispatch<SetStateAction<string>>
    setIsSelectField: Dispatch<SetStateAction<boolean>>
}

export default function SelectContentTypeField(props: Props) {

    const closeSelectField = () => {
        props.setIsSelectField(false)
    }

    const setContentType = (type: string) => {
        props.setType(type)
    }

    return (
        <>
            <div className='flex flex-col fixed top-56 left-56 bg-white p-8 shadow-xl'>
                <Button
                    onClick={() => setContentType('text')}
                >
                    <p>テキストメモ</p>
                </Button>
                <Button
                    onClick={() => setContentType('checkBox')}
                >
                    <p>チェックリスト</p>
                </Button>
            </div>
            <div className='flex fixed top-48 left-48 mt-2 ml-2'>
                <IconButton onClick={closeSelectField}>
                    <HighlightOffOutlinedIcon/>
                </IconButton>
            </div>
        </>
    )
}