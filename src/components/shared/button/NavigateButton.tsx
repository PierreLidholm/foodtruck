import { useNavigate } from "react-router-dom";

type NavigateButtonProps = {
  text: string;
  urlPath: string;
  classes: string[];
};

function NavigateButton({ text, urlPath, classes }: NavigateButtonProps) {
    const navigate = useNavigate();

    function goToRoute () {
        navigate(urlPath)
    }

    return (
        <button className={`btn ${classes.join(" ")}`} role="button" onClick={() => goToRoute()}>{text }</button>
    )
}

export default NavigateButton;