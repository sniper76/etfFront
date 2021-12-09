import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import AdSense from 'react-adsense';

function GAdSense(props) {
  
  useEffect(() => {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("Advertise is pushed");
    } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error("AdvertiseError", e);
        }
    }
  }, []);

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >{/*<ins className='adsbygoogle'
    style={{ display: 'block', height: 300 }}
    data-ad-client='ca-pub-7298000065033270'
    data-ad-slot='1549513973'
    data-ad-format='auto' />
     */}
      <AdSense.Google
  style={{ display: 'block', height: 300 }}
  format='auto'
  client="ca-pub-7298000065033270"
  slot="1549513973"
/>
    </Paper>
  );
}

export default GAdSense;