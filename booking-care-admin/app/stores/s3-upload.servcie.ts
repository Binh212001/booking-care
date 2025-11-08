import axios from "axios";
import axiosInstance from "~/api/axiosInstance";

export const getUploadUrl = async (file: File) => {
  try {
    const url = await axiosInstance.post("/s3/generate-presigned-url", {
      fileName: file.name,
    });
    return url;
  } catch (error) {
    console.error("🚀 ~ generatePresignedUrl ~ error:", error);
  }
};

export const uploadFileToS3 = async (file: File, url: string) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
      // `data` is passed directly as the request body, no special transform needed for binary (File/Blob)
    });
    return response;
  } catch (error) {
    console.error("🚀 ~ uploadFileToS3 ~ error:", error);
  }
};
