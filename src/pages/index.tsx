import {useEffect, useState} from "react";
import ItemList from "@/components/item_list";
import {Collection, Config} from "@/lib/types";

export default function Home() {

    const [config, setConfig] = useState({} as Config);
    const [collections, setCollections] = useState([] as string[]);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetch("https://api.wapuugotchi.com/collection")
            .then(value => value.json()).then(value => {
            setConfig(value as Config)
            let collections = [];
            for (let index in config.collections) {
                collections.push(config.collections[index].caption)
            }
            setCollections(collections)
        });
    })

    function getCollection(type: string) {
        return config.collections.filter((value) => value.caption === type)[0]
    }

    function scrollTo(collection: Collection) {
        setMobileMenu(false);
        let element = document.getElementById(collection.caption.toLowerCase() + "_header");
        if (element) {
            element.scrollIntoView({behavior: "smooth", inline: "center", block: "center"});
        }
    }

    // Check if the collection is currently in view
    function isInView(collection: Collection) {
        let element = document.getElementById(collection.caption.toLowerCase());
        if (element) {
            let rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
    }

    return (
        <div className="w-screen h-full bg-gray-100 dark:bg-gray-700" key={"home_page"}>
            <div className={mobileMenu ? "bg-gray-800 w-screen h-full fixed z-20 translate-x-0 transition-all duration-150 ease-in-out md:-translate-x-full" : "bg-gray-800 w-screen h-full fixed z-10 -translate-x-full transition-all duration-150 ease-in-out"} key={"mobile_menu"}>
                <ul className="flex flex-col gap-3 pt-12 px-5">
                    {
                        collections.map((collection) => {
                            return (
                                <li key={getCollection(collection).caption}>
                                    <a className={isInView(getCollection(collection)) ? "nav-item active" : "nav-item"}
                                       onClick={ event => scrollTo(getCollection(collection))}>{getCollection(collection).caption }</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="w-full h-12 bg-gray-800 flex flex-row justify-between py-1 px-5 z-20 fixed">
                <div className="flex flex-row gap-2">
                    <img src="/logo.svg" className="h-8 w-8 py-2"/>
                    <h1 className="text-2xl font-bold text-white text-center">
                        WapuuGotchi Collection
                    </h1>
                </div>
                <ul className="flex-row gap-3 pr-5 hidden md:flex">
                    {
                        collections.map((collection) => {
                            return (
                                <li key={getCollection(collection).caption}>
                                    <a className={isInView(getCollection(collection)) ? "nav-item active" : "nav-item"}
                                       onClick={event => scrollTo(getCollection(collection))}>{getCollection(collection).caption}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                <a className="block md:hidden text-white py-2" onClick={ event => setMobileMenu(!mobileMenu)}>
                    {
                        mobileMenu ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>
                    }
                </a>
            </div>
            <div className="py-12 z-0">
                {
                    collections.map((value) => {
                        return ItemList(getCollection(value))
                    })
                }
            </div>
        </div>
    )
}
