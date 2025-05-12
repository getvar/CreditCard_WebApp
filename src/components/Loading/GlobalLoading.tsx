import { Backdrop, CircularProgress } from '@mui/material';
import { useLoading } from './Loading';

export default function GlobalLoader() {
  const { loading } = useLoading();

  return (
    <Backdrop open={loading} sx={{ color: '#fff', zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
