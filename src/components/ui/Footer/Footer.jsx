import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: 'row', justifyContent: 'space-between' },
        alignItems: { sm: 'centre' },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy;{new Date().getFullYear()} &laquo;KinoOnline&raquo; 18+ <br />
        Данный сайт создан в обучающих целях. <br />
        Все права принадлежат правообладателям.
      </Typography>
      <Typography variant="h4" color="primary.main">
        KinoOnline
      </Typography>
    </Stack>
  );
}
