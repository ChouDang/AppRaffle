import { useRouteError } from "react-router-dom";

const Error = () => {
    const error: any = useRouteError();
    console.log(error, "error")
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
}

export default Error