import Button from "../Atoms/Button";

export default function InputFile({ onDelete, id, handleInputFileChange, theme = "primary" }) {
    const themeConfig = {
        primary: "file-input-primary",
        secondary: "file-input-secondary",
        accent: "file-input-accent",
        info: "file-input-info",
        success: "file-input-success",
        warning: "file-input-warning",
        error: "file-input-error",
    } [theme]
    return (
        <div className="join">
            <input
                id={id}
                type="file"
                onChange={handleInputFileChange}
                className={`${themeConfig}`}
            />
            <Button theme={theme} maxWidth="max" className="rounded-l-none" type="button" onClick={onDelete}>
                Delete &#x2715;
            </Button>
        </div>
    );
}
