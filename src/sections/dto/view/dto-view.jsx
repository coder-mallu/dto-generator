/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
import React, { useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CodeMirror from '@uiw/react-codemirror';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { json as jsonLang } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { generateDto } from '../../../utils/dto';

const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

const isJSON = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

const PaymentView = () => {
  const param = getURLParameters(window.location.href);
  const [code] = useState(decodeURIComponent(param.json || ''));
  const [dtoCode, setDtoCode] = useState('');
  const [error, setError] = useState(false);
  const cmRef = useRef(null);

  const setJson = useCallback((value) => {
    if (value !== '') {
      if (!isJSON(value)) {
        setError(true);
        setDtoCode('');
      } else {
        const data = generateDto(JSON.parse(value));
        console.log(data);
        setError(false);
        setDtoCode(data);
      }
    } else {
      setError(false);
      setDtoCode('');
    }
  }, []);

  const handleCopyDTO = useCallback(() => {
    if (dtoCode !== '') {
      navigator.clipboard.writeText(dtoCode);
    }
  }, [dtoCode]);

  return (
    <Container
      sx={{
        pt: 8,
        pb: 8,
        minHeight: 1,
      }}
    >
      <Typography variant="h3" align="center" sx={{ mb: 3 }}>
        {`🚀 Convert your JSONs to DTOs 🚀`}
      </Typography>

      <Grid container rowSpacing={{ xs: 3, md: 0 }} columnSpacing={{ xs: 0, md: 3 }}>
        <Grid item xs={12} md={12}>
          <Box
            gap={5}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
            sx={{
              p: { md: 2 },
              borderRadius: 2,
            }}
          >
            <div>
              <Typography variant="h6">JSON</Typography>

              <Stack spacing={3} mt={3}>
                <div style={{ width: '100%', overflow: 'auto', borderRadius: '0.5rem' }}>
                  <CodeMirror
                    theme={'dark'}
                    value={code}
                    ref={cmRef}
                    height="28rem"
                    width="35rem"
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    basicSetup={{ lineNumbers: false }}
                    extensions={[jsonLang()]}
                    onChange={setJson}
                  />
                </div>
              </Stack>
              {error && (
                <Typography align="center" sx={{ color: 'red', mt: 1.5 }}>
                  JSON Validation Error: Please review and correct your input.
                </Typography>
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <Typography variant="h6">DTO</Typography>
                <IconButton onClick={handleCopyDTO} sx={{ ml: 1 }}>
                  <FileCopyIcon />
                </IconButton>
              </div>
              <Stack spacing={3} style={{ marginTop: '11px' }}>
                <div style={{ width: '100%', overflow: 'auto', borderRadius: '0.5rem' }}>
                  <CodeMirror
                    theme={'dark'}
                    value={dtoCode}
                    ref={cmRef}
                    height="28rem"
                    width="35rem"
                    style={{ height: '100%', width: '100%' }}
                    basicSetup={{ lineNumbers: false }}
                    extensions={[javascript()]}
                    editable={false}
                  />
                </div>
              </Stack>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentView;
