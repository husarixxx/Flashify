import { CiImageOn } from "react-icons/ci";

function UploadButton() {
  return (
    <div className="">
      <input type="file" id="fileUpload" accept="image/*" className="hidden" />
      <label
        htmlFor="fileUpload"
        className=" text-xs flex items-center gap-1 hover:cursor-pointer border-1 p-2 rounded-lg shadow-md border-purple-400 text-purple-600 opacity-80 hover:opacity-100 transition-opacity"
      >
        <CiImageOn size={16} /> <span>Upload image</span>
      </label>
    </div>
  );
}

export default UploadButton;
