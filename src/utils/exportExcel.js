import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

const exportXls = async (data) => {
  // Convert to sheet and workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transaction");
  const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
  const fileName = `Transaction_${Date.now()}.xlsx`;
  const uri = FileSystem.cacheDirectory + fileName;
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // it's optional
  if (Platform.OS !== "web") {
    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Download Excel",
      UTI: "com.microsoft.excel.xlsx",
    });
  } else {
    Alert.alert("Success ", "File Saved On : " + uri);
  }
};
export default exportXls;
