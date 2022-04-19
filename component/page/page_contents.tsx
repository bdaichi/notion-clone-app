import { Button, TextField } from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Content from "../../entity/Content";
import { createContent, fetchContent, fetchContents, updateContent } from "../../service/content_service";
import CheckBoxContent from "../contents/check_box_content";
import TextContent from "../contents/text_content";

type Props = {
    pageId: string
}

export default function PageContent(props: Props) {
    const [contents, setContents] = useState<Content[]>([])
    const [content, setContent] = useState<Content | null>(null)
    const [contentId, setContentId] = useState('')
    //↓↓↓　pageを変更したさいにprops.pageIdも変更するのでデータ更新用のpageIdを保存しておいて更新処理がおわったらprops.pageIdをせっとする
    const [currentPageId, setCurrentPageId] = useState('')
    const [text, setText] = useState('')
    const [isTextField, setIsTextField] = useState(false)
    //↓↓↓　文字変換を確定した後の2回目のEnterKeyを拾うため
    const [isAddDataEnterKey, setIsAddDataEnterkey] = useState(false)
 
    const addContent = async () => {
        //if(text == '')ならそのcontentは削除するようにする
        console.log('addContent currentPageId', currentPageId)
        const contentData = Content.createContent(currentPageId, text, '')
        await createContent(contentData)
        await fetchContentsData()
    }

    const pushEnterKey = async () => {
        if(isAddDataEnterKey) {
            const contentData = Content.createContent(currentPageId, text, '')
            await createContent(contentData)
            await fetchContentsData()
            setIsAddDataEnterkey(false)
        } else {
            setIsAddDataEnterkey(true)
        }
    }

    const chageTextField = (contentId: string) => {
        setContentId(contentId)
        console.log('contentId', contentId)
        setIsTextField(true)
    }

    const fetchContentData = async () => {
        await fetchContent(setContent, contentId)
    }

    const fetchContentsData = async () => {
        await fetchContents(setContents, props.pageId)
    }

    const updateContentText = async () => {
        if(content) {

            const updateContentData = content.copyWith(null, null, text, null, null)

            await updateContent(updateContentData, contentId)
            await fetchContentsData()
            setIsTextField(false)
        }
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
            if(contentId) {
                fetchContentData()
            }
        } 
    },[props.pageId, contentId])

    return(
        <div>
            {!(props.pageId == '') ?
            <div className="py-56 px-32">
            <div className='flex flex-row'>
                {!(contents[0] == null) ?
                <div className='flex flex-col z-20'>{contents.map((content) =>
                    <div key={content.contentId}>{(isTextField && content.contentId == contentId) ?
                        <div className='my-2 z-20'>
                            <TextField
                                variant='standard'
                                inputProps={{style: {fontSize: '200%', margin: 8,  }}}
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
                            {
                            content.contentType == 'text' &&
                            <TextContent onClickMethod={chageTextField} content={content}/>
                            }
                            {(content.contentType == 'checkBox') &&
                                <CheckBoxContent content={content} onClickMethod={chageTextField}/>
                            }
                            {content.contentType == 'taskContent'

                            }
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
                            pushEnterKey()
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