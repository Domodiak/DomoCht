import { Helmet } from "react-helmet";

export default function Index() {
    return(
        <>
            <Helmet>
                <title>DomoCht - Index</title>
            </Helmet>
            <div>
                <div>Hello World!</div>
                <a href="/register/">Register</a>
            </div>
        </>
    )
}