import { alpha, Box, LinearProgress } from '@mui/material'

export const LoadingBarRoutes = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Box
      role="progressbar"
      sx={{
        backgroundColor: alpha('#DCDCDC	', 0.5),
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 99999,
      }}
    >
      <LinearProgress />
    </Box>
  ) : null
}
