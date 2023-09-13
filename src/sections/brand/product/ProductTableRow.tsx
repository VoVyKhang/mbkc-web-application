import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
// @mui
import {
  Avatar,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @mui icon
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Product } from '@types';

import { Color } from 'common/enum';
import { Label } from 'components';

interface ProductTableRowProps {
  handleNavigateDetail: (productId: number) => void;
  product: Product;
  index: number;
}

function ProductTableRow(props: ProductTableRowProps) {
  const { index, product, handleNavigateDetail } = props;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={product.name} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(product.productId)}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={() => handleNavigateDetail(product.productId)}>
          <Avatar alt={product.name} src={product.imageUrl} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={() => handleNavigateDetail(product.productId)}>
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {product.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(product.productId)}>
          {product.code}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(product.productId)}>
          {product.price}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(product.productId)}>
          <Label color={Color.PRIMARY}>{sentenceCase(product.category)}</Label>
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={product.status === 'inactive' ? false : true} />}
            label={
              <Label color={(product.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(product.status)}
              </Label>
            }
          />
        </TableCell>
        <TableCell align="right">
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default ProductTableRow;