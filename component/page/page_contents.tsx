import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

import Content from "../../entity/Content";
import { createContent, fetchContents, updateContent } from "../../service/content_service";

type Props = {
    pageId: string
}

export default function PageContent(props: Props) {
    const [contents, setContents] = useState<Content[]>([])
    const [contentId, setContentId] = useState('')
    const [text, setText] = useState('')
    const [isTextField, setIsTextField] = useState(false)

    const addContent = async () => {
        //TextField以外を押したらこいつが動くようにする
        //if(text == '')ならそのcontentは削除するようにする
        console.log('addContent')
        const contentData = Content.createContent(props.pageId, text)
        await createContent(contentData)
        await fetchContentsData()
    }

    const chageTextField = (contentId: string) => {
        setContentId(contentId)
        console.log('contentId', contentId)
        setIsTextField(true)
    }

    const fetchContentsData = async () => {
        //クライアンからサーバサイドにデータを送ることができたら引数にpageIdを渡すようにする
        await fetchContents(setContents, props.pageId)
    }

    const updateContentText = async () => {
        await updateContent(contentId)
        await fetchContentsData()
    }    

    useEffect(() => {
        if(props.pageId){
            console.log('pageId', props.pageId)
            fetchContentsData()
        }
    },[props.pageId])

    return(
        <>{!(props.pageId == '') ?
            <div>
            <div className='flex felx-col'>
                {!(contents[0] == null) ?
                <div>{contents.map((content) =>
                    <div key={content.contentId}>{(isTextField && content.contentId == contentId) ?
                        <div>
                            <TextField
                                variant='standard'
                                defaultValue={content.text}
                                onKeyDown={e => {
                                    if(e.key === 'Enter') {
                                        updateContentText()
                                    }
                                }}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        :
                        <Button onClick={() => chageTextField(content.contentId)}>
                            <p className='text-3xl mb-8'>{content.text}</p>
                        </Button>
                    }</div>
                )}
                </div>
                 :
                <p>なにか書いてみよう</p>
            }</div>
            <TextField 
                variant='standard'
                onKeyDown={e => {
                    if(e.key === 'Enter') {
                        addContent()
                    }
                }}
                onChange={(e) => setText(e.target.value)}
            />
            </div>
            :
            <p>ページを選ぼう</p>
        }</>
    )

}