import 'dotenv/config';
import { app } from './app.js';

const port = 3000;

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port} (IPv4/IPv6)`);
});