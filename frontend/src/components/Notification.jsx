const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={isError ? "error" : "notif"}>
            {message}
        </div>
    )
}

export default Notification