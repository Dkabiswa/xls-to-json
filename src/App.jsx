import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [jsonData, setJsonData] = useState("");
  const [file, setFile] = useState(null);

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        setJsonData(JSON.stringify(json, null, 2));
      };
      reader.readAsBinaryString(file);
    }
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard
      .writeText(jsonData)
      .then(() => {
        alert("JSON data copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy JSON data.");
        console.error(err);
      });
  };

  return (
    <section className="m-h-screen bg-blue-400">
      <div className="container mx-auto flex justify-center py-10 flex-col items-center">
        <div className="text-center">
          <h2 className="text-4xl text-white mb-2">XLSX to JSON Converter</h2>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 mr-3"
            onClick={handleConvert}
          >
            Convert
          </button>
          <button
            onClick={copyJsonToClipboard}
            className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
          >
            Copy JSON to Clipboard
          </button>
        </div>
        <div className="bg-white min-h-96  max-h-[600px] rounded w-6/12 mt-10 p-5  overflow-scroll text-wrap">
          <pre className=" text-wrap">{jsonData}</pre>
        </div>
      </div>
    </section>
  );
}

export default App;
