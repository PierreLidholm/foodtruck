import { useNavigate } from "react-router-dom";

type NavigateButtonProps = {
  text: string;
  urlPath: string;
  classes: string[];
};

function NavigationButton({
  text,
  urlPath,
  classes = [],
}: NavigateButtonProps) {
  const navigate = useNavigate();
  const navigateToUrl = (url: string) => {
    navigate(url);
  };
  return (
    <button
      role="button"
      className={`btn ${classes.join(" ")}`}
      onClick={() => navigateToUrl(urlPath)}
    >
      {text}
    </button>
  );
}

export { NavigationButton };
