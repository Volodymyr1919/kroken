import * as React from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { observer } from 'mobx-react';
import { useStores } from '../Stores/MainStore';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 const Snack = observer(() => {

    const { ConfigStore } = useStores();

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        ConfigStore.setIsSnackShow(false);
      };
    
      return (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={ConfigStore.isSnackShow} autoHideDuration={2500} onClose={handleClose}>
            <Alert onClose={handleClose} severity={ConfigStore.severity} sx={{ width: '100%' }}>
              {ConfigStore.textAlert}
            </Alert>
          </Snackbar>
        </Stack>
      );
 });
export default Snack;