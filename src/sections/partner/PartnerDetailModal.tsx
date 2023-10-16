// @mui
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Partner } from '@types';
import { Color, Language, Status } from 'common/enum';
import { ConfirmDialog, ContentLabel, Popover } from 'components';
import { useLocales, useModal, usePagination, usePopover } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { deletePartner, setEditPartner } from 'redux/partner/partnerSlice';
import { useAppDispatch } from 'redux/configStore';
import CreatePartnerModal from './CreatePartnerModal';

interface PartnerDetailModalProps {
  partner?: Partner | null;
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function PartnerDetailModal({ partner, isOpen, handleOpen }: PartnerDetailModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { page, rowsPerPage } = usePagination();
  const { translate, currentLang } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { handleOpen: handleOpenDelete, isOpen: isOpenDelete } = useModal();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditPartner(partner));
  };

  const handleDelete = () => {
    handleOpenDelete();
    dispatch(
      deletePartner({
        idParams: { partnerId: partner?.partnerId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page + 1,
        },
        navigate,
      })
    );
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalize.partner')
                      : translate('model.lowercase.partner'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack width="100%" direction="row" alignItems="center" gap={4}>
              <Avatar alt={partner?.name} src={partner?.logo} sx={{ height: 150, width: 150 }} />
              <Stack width="100%" gap={0.5}>
                <ContentLabel
                  divider={false}
                  title={translate('table.status')}
                  color={
                    partner?.status === Status.ACTIVE
                      ? Color.SUCCESS
                      : partner?.status === Status.INACTIVE
                      ? Color.WARNING
                      : Color.ERROR
                  }
                  content={
                    partner?.status === Status.INACTIVE
                      ? translate('status.inactive')
                      : partner?.status === Status.ACTIVE
                      ? translate('status.active')
                      : translate('status.deactive')
                  }
                />
                <Typography variant="subtitle1">
                  {translate('table.name')}:{' '}
                  <Typography component="span" variant="body1">
                    {partner?.name}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1">
                  {translate('page.form.webUrl')}:{' '}
                  <Typography component="span" variant="body1">
                    {partner?.webUrl}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              {translate('button.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpenDelete} />

      {isOpenCreate && (
        <CreatePartnerModal page={page} rowsPerPage={rowsPerPage} isOpen={isOpenCreate} handleOpen={handleOpenCreate} />
      )}

      {isOpenDelete && (
        <ConfirmDialog
          open={isOpenDelete}
          onClose={handleOpenDelete}
          onAction={handleDelete}
          model={partner?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partner') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partner') })}
        />
      )}
    </>
  );
}

export default PartnerDetailModal;