import "./../App.css"
export default function Alert({type,content}){
    return (
        <div className={`alert ${type} position-absolute  fade show`}>
            <strong>{type == "alert-success" ? "success" : "error"} </strong>
            {content}
        </div>
    )
}