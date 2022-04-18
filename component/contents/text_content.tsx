import { Button } from "@material-ui/core"
import Content from "../../entity/Content"

type Props = {
    onClickMethod: (contentId: string) => void
    content: Content
}

export default function TextContent(props: Props) {

    return(
        <>
         <Button 
            style={{ margin: 8 }}
            onClick={() => props.onClickMethod(props.content.contentId)}
        >
            <p className='text-3xl'>{props.content.text}</p>
        </Button>
        </>
    )

}