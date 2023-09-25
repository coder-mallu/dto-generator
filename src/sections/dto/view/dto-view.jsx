// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CodeMirror from '@uiw/react-codemirror';
import { useRef, useState } from 'react';
import { json as jsonLang } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { generateDto } from '../../../utils/dto';

// ----------------------------------------------------------------------

const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    // eslint-disable-next-line no-return-assign, no-sequences
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

export default function PaymentView() {
  const param = getURLParameters(window.location.href);
  const cmRef = useRef(null);
  const [code, setCode] = useState(decodeURIComponent(param.json || ''));
  const [dtoCode, setDtoCode] = useState('');

  const setJson = (value) => {
    setCode(value);

    console.log({ value });
    if (value !== '') {
      const data = generateDto(JSON.parse(value));
      setDtoCode(data);
    } else setDtoCode('');
  };

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

      {/* <Typography align="center" sx={{ color: 'text.secondary', mb: 2 }}>
        Professional plan is right for you.
      </Typography> */}

      <Grid container rowSpacing={{ xs: 3, md: 0 }} columnSpacing={{ xs: 0, md: 3 }}>
        <Grid xs={12} md={12}>
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
                    style={{ height: '100%', width: '100%' }}
                    basicSetup={{ lineNumbers: false }}
                    extensions={[jsonLang()]}
                    onChange={(value) => {
                      setJson(value);
                    }}
                  />
                </div>
              </Stack>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <Typography variant="h6">DTO</Typography>
                <IconButton
                  onClick={() => {
                    if (dtoCode !== '') {
                      navigator.clipboard.writeText(dtoCode);
                    }
                  }}
                  sx={{ ml: 1 }}
                >
                  <FileCopyIcon />
                </IconButton>
              </div>

              <Stack spacing={3} style={{ marginTop: '10px' }}>
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

        {/* <Grid xs={12} md={4}>
          <PaymentSummary />
        </Grid> */}

        {/* <Grid xs={12} md={12} sx={{ marginTop: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <Button variant="outlined">Generate</Button>
          </div>
        </Grid> */}
      </Grid>
    </Container>
  );
}
