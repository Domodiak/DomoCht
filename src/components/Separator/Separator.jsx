import styles from "./Separator.module.scss"

export default function Separator({ children }) {
    return(
        <div className={styles.separator}><span>{children}</span></div>
    )
}