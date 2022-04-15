import { Button, IconButton, List, TextField } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";

import PageContent from "../component/page/page_contents";
import PageList from "../component/page/page_list";
import Page from "../entity/Page";
import { createPage } from "../service/page_service";

export default function Pages() {
    const [pageId, setPageId] = useState('')
    const [pageName, setPageName] = useState('')
    const [isOpenAddPageField, setIsOpenAddPageField] = useState(false)
    const [isOpenPageList, setIsOpenPageList] = useState(false)

    const addPage = async () => {
        const pageData = Page.createPage(pageName, 'なにか書いてくれ！')
        await createPage(pageData)
        closeAddPageField()
    }

    const openAddPageField = () => {
        setIsOpenAddPageField(true)
    }

    const closeAddPageField = () => {
        setIsOpenAddPageField(false)
    }

    const openPageList = () => {
            setIsOpenPageList(true)
    }

    const closePageList = () => {
        setIsOpenPageList(false)
    }

    return(
        <>
        <div className='flex md:flex-row'>
            <div className='hidden md:grid' style={{ minHeight: '800px', height: '100%', backgroundColor: '#e1f5fe', width: '60%' }}>
                <List className='flex flex-col'>
                    <div className='flex justify-center items-center my-12 mx-12 flex-col'>
                    <div className='flex flex-row'>
                        <IconButton onClick={openAddPageField}>
                            <AddIcon />
                        </IconButton>
                        <p className='flex items-center mr-8'>ページを追加する</p>
                    </div>
                    <div>{isOpenAddPageField &&
                     /* ページ追加時のTextfieldとButto表示 */
                        <div className='flex flex-col'>
                            <TextField
                                variant="outlined"
                                style={{ backgroundColor: 'white' }}
                                label='ページ名'
                                onChange={(e) => setPageName(e.target.value)}
                            />
                            <div className='flex flex-row justify-center my-4'>
                                <Button
                                    variant='contained'
                                    style={{ color: 'white', backgroundColor: 'blue', margin: 4 }}
                                    onClick={addPage}
                                >
                                    <p className='mx-4'>追加</p>
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{ color: 'bule', backgroundColor: 'white', margin: 4 }}
                                    onClick={closeAddPageField}
                                >
                                    キャンセル
                                </Button>
                            </div>
                        </div>
                    }</div>
                        <PageList setPageId={setPageId}/>
                    </div>
                </List>
            </div>
            <>{!isOpenPageList ?
            <div className='flex justify-center md:my-64 z-0' style={{ width: '100%', }}>
                <PageContent pageId={pageId} />
            </div>
            :
            <div className='hidden' style={{ width: '100%', }}>
                <PageContent pageId={pageId} />
            </div>
            }</>
        </div>
        {/* sm(スマホ用のドロワー表示 isOpenで表示と非表示を切り替える) */}
        <div className='fixed top-5 left-5 md:hidden z-20'>{!isOpenPageList ?
            <IconButton onClick={openPageList}>
               <ArrowForwardIosIcon /> 
            </IconButton>
            :
            <IconButton>    
                <ArrowBackIosNewIcon onClick={closePageList}/>
            </IconButton>
        }</div>
        {isOpenPageList &&
        <div className='z-10' style={{ minHeight: '900px', height: '100%', backgroundColor: '#e1f5fe' }}>
                <List>
                    <div className='flex justify-center items-center my-12 mx-12 flex-col'>
                        <PageList setPageId={setPageId}/>
                    </div>
                </List>
        </div>
        }
        </>
    )
}