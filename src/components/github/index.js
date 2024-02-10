import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function GithubStar() {
  return (
    <Box>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=coder-mallu&repo=dto-generator&type=star&count=true&size=large"
        style={{ border: 0, overflow: 'hidden', zIndex: 1 }}
        width="170"
        height="30"
        title="GitHub"
      />
    </Box>
  );
}
