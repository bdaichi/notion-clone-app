import Page from "../../entity/Page"

type Props = {
    page: Page
}

export default function PageListTile(props: Props) {

    return(
        <>
           <p className="text-2xl my-4 tracking-wide" style={{ color: '#006db3', fontFamily: '筑紫A丸ゴシック' }}>{props.page.pageName}</p>
        </>
    )
}