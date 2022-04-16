import { Button, TextField } from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Content from "../../entity/Content";
import { createContent, fetchContents, updateContent } from "../../service/content_service";

type Props = {
    pageId: string
}

export default function PageContent(props: Props) {
    const [contents, setContents] = useState<Content[]>([])
    const [contentId, setContentId] = useState('')
    //↓↓↓　pageを変更したさいにprops.pageIdも変更するのでデータ更新用のpageIdを保存しておいて更新処理がおわったらprops.pageIdをせっとする
    const [currentPageId, setCurrentPageId] = useState('')
    const [text, setText] = useState('')
    const [isReloadContentData, setIsReloadContentData] = useState(false)
    const [isTextField, setIsTextField] = useState(false)

    const addContent = async () => {
        //if(text == '')ならそのcontentは削除するようにする
        console.log('addContent currentPageId', currentPageId)
        const contentData = Content.createContent(currentPageId, text)
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

    const reloadContentData = () => {
        //TextField状態が解除されてデータの追加or更新される
        setIsReloadContentData(true)
        console.log('リロードしたよ')
    }

    const updateContentText = async () => {
        await updateContent(contentId)
        await fetchContentsData()
    }    

    useEffect(() => {
        
        if(props.pageId){
            console.log('pageId', currentPageId)
            if(currentPageId == ''){
                setCurrentPageId(props.pageId)
            } else if(props.pageId != currentPageId) {
                addContent();
                updateContentText();
                setCurrentPageId(props.pageId)
            }
            fetchContentsData()
        } 
        if(isReloadContentData && props.pageId) {
            addContent();
            updateContentText();
        }
        setIsReloadContentData(false)
    },[props.pageId, isReloadContentData])

    return(
        <div>
            {/*　↓↓↓ TextField外を押したらデータを追加or更新します */}
            <Button onClick={reloadContentData}>
                <div className='flex absolute z-10 left-0 top-0'  style={{ width: '900%', height: '6600%' }}>
                </div>
            </Button>
            {/* ↑↑↑ */}
            {!(props.pageId == '') ?
            <div className="py-56 px-32">
            <div className='flex flex-row'>
                {!(contents[0] == null) ?
                <div className='flex flex-col z-20'>{contents.map((content) =>
                    <div key={content.contentId}>{(isTextField && content.contentId == contentId) ?
                        <div className='my-2 z-20'>
                            <TextField
                                variant='standard'
                                inputProps={{style: {fontSize: '200%', margin: 8}}}
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
                        <div className='flex justify-start z-20'>
                            <Button 
                                style={{ margin: 8 }}
                                onClick={() => chageTextField(content.contentId)}
                            >
                                <p className='text-3xl'>{content.text}</p>
                            </Button>
                        </div>
                    }</div>
                )}
                </div>
                 :
                <p className='my-64'>なにか書いてみよう</p>
            }</div>
            <div className='z-40'>
                <TextField 
                    variant='standard'
                    inputProps={{style: {fontSize: '200%', margin: 8}}}
                    onKeyDown={e => {
                        if(e.key === 'Enter') {
                            addContent()
                        }
                    }}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            </div>
            :
            <p className='my-64'>ページを選ぼう</p>
        }
    </div>
    )

}