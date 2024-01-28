import './modal.css'
import {useRef} from "react";
export default function Modal({isOpen , closeModal , currentProduct , setNewInfo })  {
    const name = useRef()
    const description = useRef()
    const category = useRef()
    const count = useRef()
    const categories = ["Mobile phones" , "Game consoles", "Household furniture" , "Home appliances", "Clothing"]
    const price = useRef()
    const update = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/api/product/update/${currentProduct.id}`,{
            method : "post" ,
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                "name" : name.current.value ,
                "category" : category.current.value ,
                "description" : description.current.value ,
                "count" : Number.parseInt(count.current.value ),
                "price" : Number.parseFloat(price.current.value )
            })
        }).then(res => res.json())
            .then(data => setNewInfo(data))
        closeModal()
        
    }
    const displayCategories =categories.map((category , idx ) => <option value={category}>{category}</option>)
    if(!isOpen) return null
    return (
        <div className="modal-container">
            <div className="custom-modal">
                <button className="btn-modal-close text-dark" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
                <h1 className='text-center text-danger text-uppercase mb-3'>update product </h1>
                <form>
                    <div className="form-group my-2">
                        <input disabled type="number" className="form-control" value={currentProduct.id}/>
                    </div>
                    <div className="form-group my-2">
                        <input ref={name}  defaultValue={currentProduct.name} type="text" className="form-control" placeholder="enter the name of product"/>
                    </div>
                    <div className= "form-group my-2">
                        <select ref={category} value={currentProduct.category} type="text" className="form-select" id="category" >
                            {displayCategories}
                        </select>
                    </div>
                    <div className="form-group my-2">
                        <input ref={description} defaultValue={currentProduct.description} type="text" className="form-control" id="description" placeholder="enter the description of product"/>
                    </div>
                    <div className="d-flex">
                        <input ref={price} defaultValue={currentProduct.price} type="number" className="form-control me-1" placeholder="enter the price of product"/>
                        <input ref={count} defaultValue={currentProduct.count} type="number" className="form-control ms-1" placeholder="enter the count of product"/>
                    </div>
                    <button className="btn btn-danger w-100 my-5" onClick={update}>update</button>
                </form>
            </div>
        </div>
    )
}