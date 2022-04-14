import Page from "../../entity/Page"

type Props = {
    page: Page
}

export default function PageListTile(props: Props) {

    return(
        <>
           <p className="text-3xl">{props.page.pageName}</p>
        </>
    )
}