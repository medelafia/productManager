
export default function Cell({product,updateProduct,deleteProduct}) {
    return (
        <tr>
            <th className="text-center">{product.id}</th>
            <th className="text-center">{product.name}</th>
            <th className="text-center">{product.category}</th>
            <th className="text-center">{product.price}</th>
            <th className="text-center">{product.count}</th>
            <th className="text-center">{product.description}</th>
            <th className="text-center">
                <button className="btn btn-danger mx-2" onClick={deleteProduct}><i className="fa-solid fa-trash"></i></button>
                <button className="btn btn-primary mx-2" onClick={updateProduct}><i className="fa-solid fa-pen-to-square"></i></button>
            </th>
        </tr>
    )
}