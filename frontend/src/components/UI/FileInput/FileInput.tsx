import React, { useRef, useState } from 'react';
import { Button, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  required: boolean;
}

const FileInput: React.FC<Props> = ({ onChange, name, label, required }) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  return (
    <>
      <input type="file" name={name} style={{ display: 'none' }} ref={inputRef} onChange={onFileChange} />
      <Grid container spacing={2} alignItems="center">
        <Grid size={9}>
          <OutlinedInput fullWidth placeholder={label} readOnly value={filename} onClick={activateInput} />
        </Grid>
        <Grid size={3}>
          <Button variant="outlined" onClick={activateInput}>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
