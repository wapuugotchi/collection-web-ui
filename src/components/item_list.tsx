import {Collection, Item} from "@/lib/types";

export default function ItemList(collection: Collection) {

    function getItems(){
        let tempArray = [] as Item[];
        for(let index in collection.items) {
            tempArray.push(collection.items[index])
        }

        tempArray = tempArray.sort((a, b) => {
           if(a.meta.priority > b.meta.priority) return -1;
           if(a.meta.priority < b.meta.priority) return 1;
           return 0;
        });

        return tempArray
    }

    function buildItem(item: Item) {
        return (
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6" key={ item.meta.name } id={ item.meta.name }>
                <div className={ item.meta.deactivated === 0 ? "item activated" : "item deactivated"} key={ item.meta.key + "_card" }>
                    <div className="description" key={ item.meta.key + "_info" }>
                        { getDescription(item) }
                        <p className="text-md" key={ item.meta.key + "_description" }>{ item.meta.description }</p>
                    </div>
                    { getStatusBadge(item) }
                    <img src={ item.preview } alt={ item.meta.name } key={ item.meta.key + "_preview" } className="w-full"/>
                </div>
            </div>
        )
    }

    function getDescription(item: Item){
        if( item.meta.author.length > 0) {
            return (
                <div>
                    <h1 className="text-xl font-bold">{item.meta.name }</h1>
                    <span className="text-blue-500 text-lg font-bold">{ item.meta.author }</span>
                </div>
            )
        }
        return (
            <h1 className="text-xl font-bold">{item.meta.name}</h1>
        )
    }

    function getStatusBadge(item: Item) {
        if(item.meta.deactivated === 1) {
            return (
                <span className="bg-red-500 text-white text-md font-bold py-2 bottom-5 left-0 absolute w-full z-10" key={ item.meta.key + "_status" }>Deactivated</span>
            )
        }
        return (
            <span></span>
        )
    }

    return (
        <div className="w-full text-center py-10" id={ collection.caption.toLowerCase() }>
            <h1 className="text-3xl font-bold">{collection.caption}</h1>
            <div className="py-3 px-4 lg:px-12 flex flex-wrap justify-center" key={ collection.caption.toLowerCase() }>
                {getItems().map((value) => {
                    return buildItem(value)
                })}
            </div>
        </div>
    )
}