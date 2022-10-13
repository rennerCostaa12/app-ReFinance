export default function AlertMessages({ messageText, size, weight }){

    const styleMessage = {
        fontSize: size ,
        textAlign: "center",
        fontWeight: weight ? "bold" : "normal"
    }

    return(
        <div style={styleMessage}>
            <span>{messageText}</span>
        </div>
    )
}