import React from "react"
import { HomepageHeader } from "./homepage-header";
import { HomepageContent } from "./homepage-content";

import styles from "./homepage-style.module.css"

export function HomepageContainer(): JSX.Element{

    return(
        <div className={styles["homepage-container"]}>
            <div className={styles["flex-container"]}>
                <HomepageHeader />
                <HomepageContent />
            </div>
        </div>
    );
}