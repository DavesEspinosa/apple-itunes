import { Box } from '@mui/material'
import Head from 'next/head'

type HeaderProps = {
  children: React.ReactNode
  title: string
  header?: React.ReactNode
  display?: boolean
}
export const Header = ({ children, title, header }: HeaderProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        id="main"
        sx={{
          mx: '40px',
        }}
      >
        <Box
          component="header"
          sx={{
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'grey.300',
            px: 2,
            mb: 1.5,
          }}
        >
          {header}
        </Box>
        <Box
          sx={{
            px: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}
