import Head from 'next/head'
import {useEffect, useState} from "react";
import ItemList from "@/components/item_list";
import {Config} from "@/lib/types";

export default function Home() {

  const [collection, setCollection] = useState({} as Config);
  const [collections, setCollections] = useState([] as string[]);

  useEffect(() => {
    fetch("https://api.wapuugotchi.com/collection")
        .then(value => value.json()).then(value => {
      setCollection(value)
      let collections = [];
      for(let index in collection.collections) {
        collections.push(collection.collections[index].caption)
      }
      setCollections(collections)
    });
  })

  function getCollection( type: string ) {
    return collection.collections.filter((value) => value.caption === type)[0]
  }

  function isInView( collection: string ) {
    let element = document.getElementById(collection.toLowerCase());
    if(element) {
      let rect = element.getBoundingClientRect();

      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
      );
    }
    return false;
  }

  return (
    <div className="w-full h-full bg-gray-100" key={ "home_page" }>
      <div className="w-full h-12 bg-gray-800 flex flex-row justify-between py-1 px-5 z-20 fixed">
        <h1 className="text-2xl font-bold text-white">Wapuugotchi Collection</h1>
        <ul className="flex flex-row gap-3 pr-5">
          {
            collections.map((value) => {
              return (
                <li key={ getCollection(value).caption }>
                  <a className={ isInView(getCollection(value).caption) ? "nav-item active" : "nav-item"} href={ "#" + getCollection(value).caption.toLowerCase() }>{ getCollection(value).caption }</a>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="py-12">
        {collections.map((value) => {
            return ItemList(getCollection(value))
          })}
      </div>
    </div>
  )
}
