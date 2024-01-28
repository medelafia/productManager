
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useRef, useState} from "react";
import Cell from "./componant/Cell.jsx";
import Alert from "./componant/Alert.jsx";
import "./App.css"
import Modal from "./componant/Modal.jsx"
export default function App() {
  const [productList,setProductList] = useState([])
  const nameRef = useRef("")
  const categoryRef = useRef("")
  const descriptionRef = useRef("")
  const priceRef = useRef("")
  const countRef = useRef("")
  const [alertStatus , setAlertStatus] = useState(false)
  const [error , setError ] = useState(null)
  const [modalStatus , setModalStatus] = useState(false)
  const [toUpdate , setToUpdate ] = useState(null)
  const categories = ["Mobile phones" , "Game consoles", "Household furniture" , "Home appliances", "Clothing"]
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const description = descriptionRef.current.value
    const category = categoryRef.current.value
    const price = priceRef.current.value
    const count = countRef.current.value
    if(name == "" || description == "" || category == "" || price == "" || count == ""){
      setError("all field required")
      setAlertStatus(true)
      setTimeout(()=>{
        setAlertStatus(false)
        setError(null)
      },3000)
    }else {
      fetch('http://localhost:8080/api/product',{
        method : "post" ,
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify({
          "name" : name,
          "category" : category,
          "description" : description ,
          "count" : Number.parseInt(count),
          "price" : Number.parseFloat(price)
        })
      }).then(res => res.json())
          .then(data => setProductList(prevState =>  [...prevState , data]))
      setError(null)
      setAlertStatus(true)
      setTimeout(()=>{
        setAlertStatus(false)
      },3000)
    }
  }
  useEffect(()=>{
    fetch('http://localhost:8080/api/product')
        .then(res => res.json())
        .then(data => setProductList(data))
  },[])
  const getId = (element) => {
    return Number.parseInt(element.currentTarget.parentElement.parentElement.firstChild.textContent)
  }
  const getProductById = ( id ) => {
    return productList.filter(product => {
      return product.id == id
    }).at(0)
  }
  const closeModal = () => {
    setModalStatus(false)
  }
  const updateProduct = (e) => {
    setToUpdate(getProductById(getId(e)))
    setModalStatus(true)
  }
  const deleteProduct = (e) => {
    const id  = getId(e)
    fetch(`http://localhost:8080/api/product/delete/${id}`)
        .then(res => res.status)
        .then(state => {
          if (state == 200) {
            setProductList(prevState => {
              return prevState.filter((product,idx) => product.id !== id )
            })
          }else {
            return
          }
        })

  }
  const setNewProductInfo = (newProductInfo) => {
    setProductList(prevState =>
    {
      return prevState.map((product)=> {
        if(product.id == newProductInfo.id ) return newProductInfo
        return product
      })
    })
  }
  const displayProduct = productList.map((product,key) => <Cell key={key} product={product} deleteProduct={deleteProduct} updateProduct={updateProduct}/>)
  const displayCategories =categories.map((category , idx ) => <option value={category}>{category}</option>)
  return (
      <div className="app pt-2 px-4 position-relative">
        {alertStatus  &&
            ( error == null
            ? <Alert type="alert-success" content="the product added" />
            : <Alert type="alert-danger" content={error} /> )
        }
        <Modal isOpen={modalStatus && toUpdate } closeModal={closeModal} currentProduct={toUpdate} setNewInfo={setNewProductInfo} />
        <div className="container p-5">
          <h1 className="text-center text-danger my-3 text-uppercase">product management systeme</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <input ref={nameRef} type="text" className="form-control" id="name" placeholder="enter the name of product"/>
            </div>
            <div className= "form-group my-2">
              <select value='choose category' ref={categoryRef} className="form-select" id="category" placeholder="enter the category of product">
                {displayCategories}
              </select>
            </div>
            <div className="form-group my-2">
              <input ref={descriptionRef} type="text" className="form-control" id="description" placeholder="enter the description of product"/>
            </div>
            <div className="d-flex">
              <input ref={priceRef} type="number" className="form-control me-1" placeholder="enter the price of product"/>
              <input ref={countRef} type="number" className="form-control ms-1" placeholder="enter the count of product"/>
            </div>
            <button className="btn btn-danger w-100 my-2">add product to list</button>
          </form>
          <table className="table table-dark">
            <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">category</th>
              <th className="text-center">price</th>
              <th className="text-center">count</th>
              <th className="text-center">description</th>
              <th className="text-center">actions</th>
            </tr>
            </thead>
            <tbody>
            {productList.length != 0 ? displayProduct : <tr><th className="text-center" colSpan={7}>no items</th></tr>}
            </tbody>
          </table>
        </div>
      </div>

  )
}

