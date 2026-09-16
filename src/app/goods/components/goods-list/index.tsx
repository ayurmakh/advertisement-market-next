import { fetchGoodsList } from "../../actions/fetch-goods-list";

export default async function GoodsList() {
    const goods = await fetchGoodsList();

    return (
        <>
            {goods.map((good) => (
                <div key={good.id}>
                    <div>{good.title}</div>
                    <div>{good.description}</div>
                    <div>{good.price}</div>
                </div>
            ))}
        </>
    );
}
