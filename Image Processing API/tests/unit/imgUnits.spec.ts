import { resizeImage } from '../../src/utils/utils';
import fs from 'fs';

describe('resizeImage', () => {
  const input = 'images/full/sample.jpg';
  const output = 'images/thumbs/100x100-sample.jpg';

  afterEach(() => {
    if (fs.existsSync(output)) fs.unlinkSync(output);
  });

  it('should create a resized image', async () => {
    await resizeImage(input, output, 100, 100);
    expect(fs.existsSync(output)).toBeTrue();
  });
});
