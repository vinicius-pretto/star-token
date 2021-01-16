import * as React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";
import FileExtension from "../../consts/FileExtension";
import MediaType from "../../consts/MediaType";
import TokensFormat from "../../consts/TokensFormat";
import tokensParser from "../parsers/tokensParser";
import Input from "./Input/Input";

const ENCODING = "utf-8";

const TokensClipboard = ({ tokensFormat }) => {
  const state = useSelector((state: any) => state);
  const [isCopied, setIsCopied] = React.useState(false);
  const tokens = tokensParser.parse(state.tokens, tokensFormat);

  const downloadTokensFile = ({ fileName }) => {
    const mediaType =
      tokensFormat === TokensFormat.JSON
        ? MediaType.TEXT_JSON
        : MediaType.TEXT_CSS;
    const tokensContent = encodeURIComponent(tokens.toString());
    const hrefContent = `data:${mediaType};charset=${ENCODING},${tokensContent}`;
    const a = document.createElement("a");
    const fileExtension = FileExtension[tokensFormat];

    a.download = `${fileName}.${fileExtension}`;
    a.title = `${fileName}.${fileExtension}`;
    a.href = hrefContent;

    a.click();
  };

  const formik = useFormik({
    initialValues: {
      fileName: "tokens",
    },
    validationSchema: yup.object().shape({
      fileName: yup
        .string()
        .required("Required")
        .max(45, "Maximum 45 characters")
        .matches(
          /^[a-zA-Z]{1,1}[a-zA-Z0-9\-\_]*$/,
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)"
        ),
    }),
    onSubmit: downloadTokensFile,
  });

  const copyText = () => {
    const textArea = document.createElement("textarea");
    textArea.value = tokens.toString();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setIsCopied(true);

    const timer = setTimeout(() => {
      setIsCopied(false);
      clearInterval(timer);
    }, 700);
  };

  return (
    <div className="px-md py-sm">
      <div className="mb-md">
        <h3 className="section-title pl-0">Export</h3>

        <form onSubmit={formik.handleSubmit}>
          <Input
            id="fileName"
            type="text"
            maxLength={45}
            value={formik.values.fileName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fileName}
            touched={formik.touched.fileName}
            placeholder="tokens"
          />

          <button className="button button--secondary" type="submit">
            Export {formik.values.fileName}
          </button>
        </form>
      </div>

      <div className="highlight">
        <div className="d-flex flex-column align-items-end justify-content-end mb-sm">
          <button className="button button--primary" onClick={copyText}>
            copy
          </button>
          <p
            className={isCopied ? "mb-0 mt-md" : "mb-0 mt-md visibility-hidden"}
          >
            Copied to clipboard!
          </p>
        </div>
        <pre data-testid="tokens" id="tokens">
          {tokens}
        </pre>
      </div>
    </div>
  );
};

export default TokensClipboard;
