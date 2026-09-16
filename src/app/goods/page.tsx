import Link from "next/link";
import GoodsList from "./components/goods-list";

export default function Goods() {
    return (
        <div>
            <h3>Goods</h3>
            <Link href={'/goods/new'}>Create</Link>
            <GoodsList />
        </div>
    );
};
