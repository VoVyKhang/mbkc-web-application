// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { KitchenCenter, Params, ToUpdateStatus } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteKitchenCenter,
  setEditKitchenCenter,
  updateStatusKitchenCenter,
} from 'redux/kitchenCenter/kitchenCenterSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { PATH_ADMIN_APP } from 'routes/paths';

interface KitchenCenterTableRowProps {
  kitchenCenter: KitchenCenter;
  index: number;
  page: number;
  rowsPerPage: number;
}

function KitchenCenterTableRow({ index, kitchenCenter, page, rowsPerPage }: KitchenCenterTableRowProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/detail/${kitchenCenter.kitchenCenterId}`);
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    const kitchenCenterId = kitchenCenter.kitchenCenterId;
    const params = {
      kitchenCenterId,
      navigate,
    };

    dispatch<any>(deleteKitchenCenter(params));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/update/${kitchenCenter.kitchenCenterId}`);
    dispatch(setEditKitchenCenter(kitchenCenter));
    dispatch(setRoutesToBack(pathname));
  };

  const handleChangeStatus = () => {
    const paramUpdateStatus: Params<ToUpdateStatus> = {
      data: {
        status: kitchenCenter.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        kitchenCenterId: kitchenCenter?.kitchenCenterId,
      },
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      pathname: pathname,
      navigate,
    };
    dispatch<any>(updateStatusKitchenCenter(paramUpdateStatus));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" onClick={handleNavigateDetail}>
          <Avatar alt={kitchenCenter.name} src={kitchenCenter.logo} />
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          {kitchenCenter.name}
        </TableCell>

        <TableCell align="left" onClick={handleNavigateDetail} width={400}>
          {kitchenCenter.address}
        </TableCell>
        <TableCell align="left">
          <Label
            color={
              kitchenCenter?.status === Status.ACTIVE
                ? Color.SUCCESS
                : kitchenCenter?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {kitchenCenter?.status === Status.INACTIVE
              ? translate('status.inactive')
              : kitchenCenter?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Switch
            size="small"
            onChange={handleChangeStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={kitchenCenter.status === Status.DEACTIVE}
            checked={
              kitchenCenter.status === Status.INACTIVE || kitchenCenter.status === Status.DEACTIVE ? false : true
            }
            color={kitchenCenter?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.kitchenCenter') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.kitchenCenter') })}
        />
      )}
    </>
  );
}

export default KitchenCenterTableRow;
