import { Button, IconButton } from "@material-ui/core"
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

import { useEffect, useState } from "react"

import Content from "../../entity/Content"
import { updateContent } from "../../service/content_service";

type Props = {
    onClickMethod: (contentId: string) => void
    content: Content
}

export default function CheckBoxContent(props: Props) {
    const [isCheck, setIsCheck] = useState(props.content.isCheck)

    const toCheck = () => {
        setIsCheck(true)
    }

    const unCheck = () => {
        setIsCheck(false)
    }

    const updateCheckData = async() => {
        const updateContentData = props.content.copyWith(null, null, null, null, isCheck)
        await updateContent(updateContentData, props.content.contentId)
    }

    useEffect(() => {
        updateCheckData()
    },[isCheck])

    return(
        <>{!isCheck ? 
            <div className='flex flex-row w-96'>
                <IconButton onClick={toCheck}>
                    <CheckBoxOutlineBlankOutlinedIcon/>
                </IconButton>
                <Button 
                    onClick={() => props.onClickMethod(props.content.contentId)}
                >
                    <p className='text-2xl' style={{ color: props.content.text ? 'black' : 'gray' }}>{props.content.text ? props.content.text : 'なにか書いてみよう'}</p>
                </Button>  
            </div>
            :
            <div className='flex flex-row w-96'>
                <IconButton onClick={unCheck}>
                    <CheckBoxOutlinedIcon/>
                </IconButton>
                <Button 
                    onClick={() => props.onClickMethod(props.content.contentId)}
                >
                        <p className='text-xl' style={{ color: 'gray', textDecorationLine: 'line-through' }}>{props.content.text}</p>
                </Button>  
            </div>
        }</>
    )
}