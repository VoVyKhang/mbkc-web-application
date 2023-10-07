import { Avatar, Stack, Typography, Button } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Color, Status } from 'common/enum';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import UpdateInformationModal from './UpdateInformationModal';
import { useAppDispatch } from 'redux/configStore';
import { setEditProfile } from 'redux/profile/profileSlice';

interface InformationCardProps {
  name: string | undefined;
  address: string | undefined;
  managerEmail: string | undefined;
  status: string | undefined;
  logo: string | undefined;
}

function InformationCard({ logo, name, address, managerEmail, status }: InformationCardProps) {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();

  return (
    <>
      <Stack direction="row" alignItems="end" gap={2} pl={4} pt={4}>
        <Avatar src={logo} alt={name} sx={{ width: 150, height: 150 }} />
        <Stack direction="row" alignItems="end" justifyContent="space-between" width="100%">
          <Stack rowGap={0.5}>
            <Stack direction="row" gap={5}>
              <Typography variant="h6">{name}</Typography>
              <Label color={status === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}>
                {status === Status.INACTIVE
                  ? translate('status.inactive')
                  : status === Status.ACTIVE
                  ? translate('status.active')
                  : ''}
              </Label>
            </Stack>

            <Typography variant="body1">
              {translate('table.address')}:{' '}
              <Typography component="span" variant="body1" color={(theme) => theme.palette.grey[600]}>
                {address}
              </Typography>
            </Typography>

            <Typography variant="body1">
              {translate('table.manageEmail')}:{' '}
              <Typography component="span" variant="body1" color={(theme) => theme.palette.grey[600]}>
                {managerEmail}
              </Typography>
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<SettingsOutlinedIcon />}
            onClick={() => {
              handleOpen();
              dispatch(setEditProfile);
            }}
          >
            {translate('button.setting')}
          </Button>
        </Stack>
      </Stack>

      {isOpen && <UpdateInformationModal isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default InformationCard;
