import { Stack } from "@mui/material";
import { useRef, useState } from "react";
import Image from "assets/images/Image.png";
import { toast } from "react-toastify";
import Title from "components/typography/Title";
import Text from "components/typography/Text";


const CustomImageInput= ({
	defaultValue,
	onChange: _onChange,
	defaultImg,
	sx = {},
	dontUploadImg = false,
	maxSize = 5 * 1024 * 1024
}) => {
	const fileRef = useRef(null);
	const [file, setFile] = useState(null);
	const [img, setImg] = useState(
		defaultValue ? "" : defaultImg || ""
	);

	const onChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile && selectedFile.size <= maxSize) {
			setFile(selectedFile);
			_onChange(selectedFile);
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result?.toString().split(",")[1];
				const imageUrl = `data:${selectedFile.type};base64,${base64String}`;
				setImg(imageUrl);
			};

			reader.readAsDataURL(selectedFile);
		} else if (selectedFile) {
			toast.warning(
				"File size exceeds the 5MB limit. Please choose a smaller file."
			);
			e.target.value = "";
		}
	};

	return (
		<Stack
			alignItems="center"
			spacing="0.7143rem"
			sx={{
				maxWidth: "14.2857rem",
				position: "relative"
			}}
		>
			{!dontUploadImg && (
				<input
					accept="image/*"
					type="file"
					id="img"
					hidden
					ref={fileRef}
					onChange={onChange}
				/>
			)}
			<label htmlFor="img">
				<img
					src={img || defaultImg || Image}
					style={{
						height: "7.1429rem",
						width: "7.1429rem",
						cursor: "pointer",
						objectFit: "contain",
						...sx
					}}
				/>
			</label>
			<Title>{file ? file.name : "Upload Image"}</Title>
			<Text fontSize={12}>JPG, GIF, or PNG. Max size of 5MB</Text>
		</Stack>
	);
};

export default CustomImageInput;
