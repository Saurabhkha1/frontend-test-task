import React, { useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CloseIcon from "@mui/icons-material/Close";

const BlogEditor = (props) => {
  const [tone, setTone] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleCloseEditor = () => {
    props?.setEditorOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleCloseEditor} maxWidth="md" fullWidth>
        <div className="flex justify-end m-1">
          <CloseIcon onClick={handleCloseEditor} />
        </div>
        <DialogTitle>Blog Editor</DialogTitle>
        <DialogContent>
          <Card variant="outlined">
            <CardContent>
              <Box my={2}>
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Tone</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    label="Tone"
                    value={tone}
                    onChange={handleToneChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Formal">Formal</MenuItem>
                    <MenuItem value="Casual">Casual</MenuItem>
                    <MenuItem value="Friendly">Friendly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {tone && (
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                    clipboard: {
                      matchVisual: false,
                    },
                  }}
                />
              )}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            disabled={!tone}
            onClick={handleCloseEditor}
            className="bg-[#ff9100] py-[7px] mx-1 rounded-md w-[100px] text-sm text-white"
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogEditor;
