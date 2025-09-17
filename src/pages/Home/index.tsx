import { Page } from "zmp-ui";
import { Welcome } from "@/components/Home/Welcome";
import UserHero from "@/components/Home/UserHero";


export default function HomePage() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <Welcome />
            <UserHero />



        </Page >


    );
}