
export default function Quiz(props){
    let questionString = props.question
    return(
        <div className="question">
            <h4>{questionString}</h4>
        </div>
    )
}