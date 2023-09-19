import { ReactNode, useCallback, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
// @mui
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Paper, Typography } from '@mui/material';
import { Theme, alpha, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
// utils
import { fData } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: 200,
  height: 200,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadAvatarProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  value?: Blob | MediaSource;
  caption?: ReactNode;
  sx?: SxProps<Theme>;
  onChange?: Function;
}

export default function UploadAvatar({
  onChange: onFormChange,
  error,
  file,
  value,
  caption,
  sx,
  ...other
}: UploadAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      // console.log('acceptedFiles', acceptedFiles);
      const file = acceptedFiles[0];
      setImageUrl(URL.createObjectURL(file));
      console.log('URL', URL.createObjectURL(file));
      console.log('file 21', file);
      if (onFormChange) {
        onFormChange(file);
      }
    },
    [onFormChange]
  );
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

  //       // update progress
  //       // setPercent(percent);
  //     },
  //     (err) => {
  //       enqueueSnackbar(err.message ?? 'Có lỗi', {
  //         variant: 'error'
  //       });
  //       console.log(`err`, err);
  //     },
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //         onFormChange(url);
  //       });
  //     }
  //   );
  // };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    onDrop,
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        my: 2,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  console.log('value', value);

  return (
    <>
      <RootStyle sx={sx}>
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter',
            }),
          }}
        >
          <input {...getInputProps()} />

          {value && (
            <Box component="img" alt="avatar" src={value ? imageUrl : ''} sx={{ zIndex: 8, objectFit: 'cover' }} />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(value && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 },
              }),
            }}
          >
            <AddAPhotoIcon sx={{ mb: 1 }} />
            <Typography variant="caption">{value ? 'Update photo' : 'Upload photo'}</Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {caption}

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </>
  );
}