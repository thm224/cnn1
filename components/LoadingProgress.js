import React from "react";
import { ProgressDialog } from "react-native-simple-dialogs";

const LoadingProgressBar = () => (
  <ProgressDialog
    visible={true}
    title="Đang xử lý."
    message="Vui lòng đợi..."
  />
);

export default LoadingProgressBar;
