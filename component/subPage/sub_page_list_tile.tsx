import { Button } from "@material-ui/core"
import SubPage from "../../entity/SubPage"

type Props = {
    subPage: SubPage
}

export default function SubPageListTile(props: Props) {

    return(
        <div className='flex flex-col'>
            <p>{props.subPage.pageName}</p>
        </div>
    )
}