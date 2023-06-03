import { Helmet } from "react-helmet";
import styles from "./NotFound.module.scss"

export default function NotFound() {
    return(
        <>
            <Helmet>
                <title>DomoCht - Not Found</title>
            </Helmet>
            <div className={styles.App}>
                <h1>404</h1>
                <div>This page was not found</div>
            </div>
        </>
    )
}