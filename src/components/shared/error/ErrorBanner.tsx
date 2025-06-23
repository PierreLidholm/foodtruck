type ErrorBannerProps = {
  text: string;
};

function ErrorBanner({ text }: ErrorBannerProps) {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-center"
      style={{ height: "75vh" }}
    >
      <div className="d-flex d-inline-flex flex-column">
        <i
          className="fa fa-exclamation-triangle fa-2x text-danger mb-2"
          aria-hidden="true"
        ></i>
        <p className="text-danger">{text}</p>
      </div>
    </div>
  );
}

export default ErrorBanner;
