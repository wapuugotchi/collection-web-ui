import {useEffect, useState} from "react";
import ItemList from "@/components/item_list";
import {Collection, Config} from "@/lib/types";

export default function Home() {

    const [config, setConfig] = useState({} as Config);
    const [collections, setCollections] = useState([] as string[]);

    useEffect(() => {
        fetch("https://api.wapuugotchi.com/collection")
            .then(value => value.json()).then(value => {
            setConfig(value as Config)
            console.log(config)
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
        <div className="w-full h-full bg-gray-100" key={"home_page"}>
            <div className="w-full h-12 bg-gray-800 flex flex-row justify-between py-1 px-5 z-20 fixed">
                <h1 className="text-2xl font-bold text-white">WapuuGotchi Collection</h1>
                <ul className="flex flex-row gap-3 pr-5 sm:hidden md:flex">
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
            </div>
            <div className="py-12">
                {
                    collections.map((value) => {
                        return ItemList(getCollection(value))
                    })
                }
            </div>
        </div>
    )
}
