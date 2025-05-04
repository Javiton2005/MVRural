import React from "react";
import Layout from "../components/layout";
import VillageGrid from "../components/villagegrid";

const Villages = () => {
    return (
        <Layout>
            <VillageGrid cantidad={16}/>
        </Layout>
    )
}

export default Villages;
