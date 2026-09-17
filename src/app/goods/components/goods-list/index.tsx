import { GoodFetch } from "@/types/good";
import { fetchGoodsList } from "../../actions/fetch-goods-list";
import Image from "next/image";

const formatPrice = (priceCents: GoodFetch['priceCents']) =>
    new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
    }).format(priceCents / 100);

export default async function GoodsList() {
    const goods = await fetchGoodsList();

    return (
        <>
            {goods.map((good) => (
                <div key={good.id}>
                    <div>{good.title}</div>
                    <div>{good.description}</div>
                    <div>{formatPrice(good.priceCents)}</div>
                    {good.imageUrls.map((imageUrl, index) => (
                        <Image key={index} src={imageUrl} alt={imageUrl} width={100} height={100} />
                    ))}
                </div>
            ))}
        </>
    );
}
