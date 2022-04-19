import { IconButton } from "@material-ui/core";
import { Dispatch, SetStateAction } from "react";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

type Props = {
    isOpenSubPageList: boolean
    setIsOpenSubPageList: Dispatch<SetStateAction<boolean>>
}

export default function OpenSubPageListButton(props: Props) {

    const openSubPageList = () => {
        props.setIsOpenSubPageList(true)
    }

    const closeSubPageList = () => {
        props.setIsOpenSubPageList(false)
    }

    return(
        <>{!props.isOpenSubPageList ?
            <IconButton onClick={openSubPageList}>
                <ArrowRightOutlinedIcon/>
            </IconButton>
            :
            <IconButton onClick={closeSubPageList}>
                <ArrowDropDownOutlinedIcon/>
            </IconButton>
            }</>
    )
}