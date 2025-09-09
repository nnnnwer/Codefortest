import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const SmallAvatar = styled("div")(({ theme }) => ({
  width: 28,
  height: 28,
  border: `2px solid ${theme.palette.background.paper}`,
  backgroundColor: "#fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[1],
  cursor: "pointer",
}));

export default function UploadImage({ defaultImage }) {
  const [preview, setPreview] = React.useState(
    defaultImage ? { image: defaultImage } : ""
  );
  const fileInputRef = React.useRef();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };
  const getAvatarSrc = () => {
    if (!preview) return "/broken-image.jpg";
    if (typeof preview === "string") return preview;
    if (preview.image)
      return `${import.meta.env.VITE_HTTP_URL}/image/${preview.image}`;
    return "/broken-image.jpg";
  };
  console.log("preview", preview);
  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar onClick={() => fileInputRef.current.click()}>
            <PhotoCameraIcon fontSize="small" sx={{ color: "#222222" }} />
          </SmallAvatar>
        }
      >
        <Avatar src={getAvatarSrc()} sx={{ width: 100, height: 100 }} />
      </Badge>
      <input
        type="file"
        accept="image/*"
        name="image"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Stack>
  );
}
